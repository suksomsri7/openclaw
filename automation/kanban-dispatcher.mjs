#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const BASE_URL = process.env.KANBAN_BASE_URL || 'https://kanban.suksomsri.cloud/api/v1';
const API_KEY = process.env.KANBAN_API_KEY || '';
const BOARD_ID = process.env.KANBAN_BOARD_ID || 'cmmwc0f5a000z04l22xn31qka'; // Content Master
const CONFIG_PATH = process.env.DISPATCHER_CONFIG_PATH || path.resolve('automation/dispatcher-config.json');
const STATE_PATH = process.env.DISPATCHER_STATE_PATH || path.resolve('automation/state/dispatcher-state.json');
const RUN_LOG_PATH = process.env.DISPATCHER_RUN_LOG_PATH || path.resolve('automation/logs/dispatcher-runs.jsonl');
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

if (!API_KEY) {
  console.error('Missing KANBAN_API_KEY');
  process.exit(1);
}

fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true });
fs.mkdirSync(path.dirname(RUN_LOG_PATH), { recursive: true });

function loadJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function loadState() {
  return loadJson(STATE_PATH, { dispatches: {} });
}

function loadConfig() {
  return loadJson(CONFIG_PATH, {
    allowedBoardIds: [BOARD_ID],
    titlePrefixes: ['AUTO:', '[AUTO]'],
    descriptionFlags: ['AUTO-RUN: true', '[AUTO-RUN:ON]'],
    commentFlags: ['[AUTO-RUN:ON]'],
    requireWhitelist: true
  });
}

function saveState(state) {
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

function appendRunLog(record) {
  fs.appendFileSync(RUN_LOG_PATH, JSON.stringify(record) + '\n');
}

async function api(p, options = {}) {
  const apiKey = options.apiKey || API_KEY;
  const { apiKey: _ignored, ...rest } = options;
  const res = await fetch(`${BASE_URL}${p}`, {
    ...rest,
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      ...(rest.headers || {})
    }
  });
  const json = await res.json();
  if (!json.success) throw new Error(`API ${p} failed: ${json.error || res.status}`);
  return json.data;
}

function mapStageToAgent(stage, card) {
  if (stage === 'Strategy' || stage === 'Synthesis' || stage === 'Review') return ['shark'];
  if (stage === 'Drafting') return ['octopus'];
  if (stage === 'Approval') return []; // Boss/Kraken decision gate remains manual for now
  if (stage === 'Research') {
    const targets = new Set();
    for (const s of card.subtasks || []) {
      const t = s.title || '';
      if (t.startsWith('Whale:')) targets.add('whale');
      if (t.startsWith('Manta:')) targets.add('manta');
      if (t.startsWith('SeaTurtle:')) targets.add('seaturtle');
    }
    return [...targets];
  }
  return [];
}

function simpleHash(input) {
  let hash = 0;
  const s = String(input || '');
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i);
    hash |= 0;
  }
  return String(hash);
}

function isLooping(state, cardId, agentId, stage) {
  const now = Date.now();
  const hourAgo = now - (60 * 60 * 1000);
  const history = (state.runHistory || []).filter(r => r.ts >= hourAgo);
  state.runHistory = history;
  const count = history.filter(r => r.cardId === cardId && r.agentId === agentId && r.stage === stage).length;
  return count >= 3;
}

function recordRunHistory(state, cardId, agentId, stage) {
  state.runHistory = state.runHistory || [];
  state.runHistory.push({ ts: Date.now(), cardId, agentId, stage });
}

function sortedComments(card) {
  return [...(card.comments || [])].sort((a, b) => {
    const ta = new Date(a.createdAt || 0).getTime();
    const tb = new Date(b.createdAt || 0).getTime();
    return ta - tb;
  });
}

function detectStage(card) {
  const comments = sortedComments(card).map(c => c.content || '');
  const stageRegex = /^\[Stage: ([^\]]+)\]/m;
  for (let i = comments.length - 1; i >= 0; i--) {
    const m = comments[i].match(stageRegex);
    if (m) return m[1].trim();
  }

  const col = card.column?.title || '';
  if (col === 'Brief') return 'Strategy';
  if (col === 'Creating') return 'Drafting';
  if (col === 'Review') return 'Review';
  return null;
}

function latestHandoff(card) {
  const comments = sortedComments(card).map(c => c.content || '').reverse();
  return comments.find(c => /ส่งต่อ|มอบหมาย|Handoff/i.test(c)) || '';
}

function latestStageComment(card, stageName) {
  const comments = sortedComments(card).filter(c => (c.content || '').includes(`[Stage: ${stageName}]`));
  return comments.length ? comments[comments.length - 1] : null;
}

function isWhitelisted(card, config) {
  const title = card.title || '';
  const desc = card.description || '';
  const comments = (card.comments || []).map(c => c.content || '');

  if ((config.allowedBoardIds || []).length > 0 && !config.allowedBoardIds.includes(card.column?.boardId || BOARD_ID)) {
    return false;
  }
  if (!config.requireWhitelist) return true;
  if ((config.titlePrefixes || []).some(p => title.startsWith(p))) return true;
  if ((config.descriptionFlags || []).some(flag => desc.includes(flag))) return true;
  if ((config.commentFlags || []).some(flag => comments.some(c => c.includes(flag)))) return true;
  return false;
}

function isDispatchable(card, stage, config) {
  const desc = (card.description || '').trim();
  const handoff = latestHandoff(card);
  if (!desc) return false;
  if (!isWhitelisted(card, config)) return false;
  if (['Strategy', 'Research', 'Synthesis', 'Drafting'].includes(stage) && !handoff && !(card.comments || []).some(c => /\[Stage:/i.test(c.content || ''))) {
    return false;
  }
  return true;
}

function collectRelevantPackets(card, stage, targetAgent) {
  const comments = sortedComments(card);
  let packetAgents = [];
  let sinceStage = null;

  if (targetAgent === 'shark' && stage === 'Synthesis') {
    packetAgents = ['whale', 'manta', 'seaturtle'];
    sinceStage = latestStageComment(card, 'Research');
  } else if (targetAgent === 'shark' && stage === 'Review') {
    packetAgents = ['octopus'];
    sinceStage = latestStageComment(card, 'Drafting');
  } else if (targetAgent === 'octopus' && stage === 'Drafting') {
    packetAgents = ['shark'];
    sinceStage = latestStageComment(card, 'Synthesis') || latestStageComment(card, 'Strategy');
  }

  const sinceTime = new Date(sinceStage?.createdAt || 0).getTime();
  const packets = comments
    .filter(c => new Date(c.createdAt || 0).getTime() >= sinceTime)
    .filter(c => {
      const m = (c.content || '').match(/^\[AUTORUN:([^\]]+)\]/i);
      return m && packetAgents.includes(m[1].toLowerCase());
    })
    .map(c => {
      const m = (c.content || '').match(/^\[AUTORUN:([^\]]+)\]/i);
      const agent = m ? m[1].toLowerCase() : 'unknown';
      const content = (c.content || '').slice(0, 6000);
      return `### PACKET FROM ${agent.toUpperCase()}\n${content}`;
    });

  return packets.join('\n\n');
}

function buildPrompt(card, stage, targetAgent) {
  const relevantSubtasks = (card.subtasks || [])
    .filter(s => {
      const t = s.title || '';
      if (targetAgent === 'whale') return t.startsWith('Whale:');
      if (targetAgent === 'manta') return t.startsWith('Manta:');
      if (targetAgent === 'seaturtle') return t.startsWith('SeaTurtle:');
      if (targetAgent === 'octopus') return t.startsWith('Octopus:');
      if (targetAgent === 'shark') return t.startsWith('Shark:');
      return true;
    })
    .map(s => `- ${s.title}`)
    .join('\n');
  const packetBundle = collectRelevantPackets(card, stage, targetAgent);

  return [
    `You are receiving a Kanban dispatch.`,
    `Card ID: ${card.id}`,
    `Card Title: ${card.title}`,
    `Board: ${card.column?.boardId || BOARD_ID}`,
    `Column: ${card.column?.title || ''}`,
    `Detected Stage: ${stage}`,
    '',
    'Description:',
    card.description || '(none)',
    '',
    'Relevant Subtasks:',
    relevantSubtasks || '(none)',
    '',
    'Latest Handoff Comment:',
    latestHandoff(card) || '(none)',
    '',
    'Relevant Prior Agent Packets:',
    packetBundle || '(none)',
    '',
    'Reply in this exact structure:',
    'STATUS: done | needs_clarification | blocked',
    'SUMMARY: ...',
    'DELIVERABLE:',
    '...',
    'NEXT_STAGE: choose exactly one of Intake | Strategy | Research | Synthesis | Drafting | Review | Approval | Done | Blocked',
    'COMMENT:',
    '...',
    'RETURN_TO: Shark | Kraken | Dispatcher'
  ].join('\n');
}

function dispatchAgent(agentId, prompt) {
  const args = ['agent', '--agent', agentId, '--message', prompt, '--json', '--timeout', '240'];
  if (VERBOSE) console.log(`Dispatching to ${agentId}...`);
  if (DRY_RUN) return { dryRun: true, agentId, prompt };
  const out = execFileSync('openclaw', args, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  return JSON.parse(out);
}

function extractText(result) {
  if (!result || !result.result || !result.result.payloads || !result.result.payloads[0]) return '';
  return result.result.payloads[0].text || '';
}

function parseAgentResponse(text) {
  const getBlock = (label, nextLabels = []) => {
    const labels = [label, ...nextLabels].map(l => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const re = new RegExp(`${labels[0]}:\\s*([\\s\\S]*?)(?=\\n(?:${labels.slice(1).join('|')}):|$)`, 'i');
    const m = text.match(re);
    return m ? m[1].trim() : '';
  };
  return {
    status: getBlock('STATUS', ['SUMMARY', 'DELIVERABLE', 'NEXT_STAGE', 'COMMENT', 'RETURN_TO', 'BLOCKERS', 'NOTES']) || 'done',
    summary: getBlock('SUMMARY', ['DELIVERABLE', 'NEXT_STAGE', 'COMMENT', 'RETURN_TO', 'BLOCKERS', 'NOTES']),
    deliverable: getBlock('DELIVERABLE', ['NEXT_STAGE', 'COMMENT', 'RETURN_TO', 'BLOCKERS', 'NOTES']),
    nextStage: getBlock('NEXT_STAGE', ['COMMENT', 'RETURN_TO', 'BLOCKERS', 'NOTES']),
    comment: getBlock('COMMENT', ['RETURN_TO', 'BLOCKERS', 'NOTES']),
    returnTo: getBlock('RETURN_TO', ['BLOCKERS', 'NOTES'])
  };
}

function normalizeStageValue(text = '') {
  const t = String(text || '').trim();
  if (!t) return '';
  const exact = ['Intake', 'Strategy', 'Research', 'Synthesis', 'Drafting', 'Review', 'Approval', 'Done', 'Blocked'];
  for (const s of exact) {
    const re = new RegExp(`\\b${s}\\b`, 'i');
    if (re.test(t)) return s;
  }
  if (/draft/i.test(t)) return 'Drafting';
  if (/review/i.test(t)) return 'Review';
  if (/approve|approval|boss/i.test(t)) return 'Approval';
  if (/research/i.test(t)) return 'Research';
  if (/synthesis/i.test(t)) return 'Synthesis';
  return '';
}

function stageToColumnTitle(stage) {
  if (['Strategy'].includes(stage)) return 'Brief';
  if (['Research', 'Synthesis', 'Drafting'].includes(stage)) return 'Creating';
  if (['Review', 'Approval'].includes(stage)) return 'Review';
  if (stage === 'Done') return 'Published';
  return null;
}

async function postComment(cardId, content, apiKey = API_KEY) {
  return api(`/cards/${cardId}/comments`, {
    method: 'POST',
    apiKey,
    body: JSON.stringify({ content })
  });
}

async function moveCard(cardId, columnId, apiKey = API_KEY) {
  return api(`/cards/${cardId}/move`, {
    method: 'POST',
    apiKey,
    body: JSON.stringify({ columnId, position: 'top' })
  });
}

async function updateSubtask(cardId, subtaskId, patch, apiKey = API_KEY) {
  return api(`/cards/${cardId}/subtasks/${subtaskId}`, {
    method: 'PATCH',
    apiKey,
    body: JSON.stringify(patch)
  });
}

async function createSubtask(cardId, title, apiKey = API_KEY) {
  return api(`/cards/${cardId}/subtasks`, {
    method: 'POST',
    apiKey,
    body: JSON.stringify({ title })
  });
}

function stagePresetSubtasks(stage) {
  const map = {
    Strategy: [
      'Shark: วิเคราะห์ audience fit และ pain point',
      'Shark: กำหนด angle / hook / message hierarchy'
    ],
    Research: [
      'Whale: ส่ง research packet ตามโจทย์',
      'Manta: ส่ง research packet ตามโจทย์',
      'SeaTurtle: ส่ง research packet ตามโจทย์'
    ],
    Synthesis: [
      'Shark: สังเคราะห์ research packets เป็น synthesis packet'
    ],
    Drafting: [
      'Octopus: ทำ draft ตาม synthesis packet'
    ],
    Review: [
      'Shark: review draft และสรุป minor edits / approval'
    ],
    Approval: [
      'Kraken: สรุป final recommendation เพื่อ Boss review'
    ]
  };
  return map[stage] || [];
}

async function markAgentSubtasksComplete(card, agentId) {
  const prefixes = {
    shark: 'Shark:',
    octopus: 'Octopus:',
    whale: 'Whale:',
    manta: 'Manta:',
    seaturtle: 'SeaTurtle:',
    main: 'Kraken:'
  };
  const prefix = prefixes[agentId];
  if (!prefix) return;
  for (const s of (card.subtasks || [])) {
    if (!s.isCompleted && (s.title || '').startsWith(prefix)) {
      await updateSubtask(card.id, s.id, { isCompleted: true });
    }
  }
}

async function ensureStageSubtasks(card, stage) {
  const wanted = stagePresetSubtasks(stage);
  const existingTitles = new Set((card.subtasks || []).map(s => s.title || ''));
  for (const title of wanted) {
    if (!existingTitles.has(title)) {
      await createSubtask(card.id, title);
    }
  }
}

async function maybeAdvanceResearchToSynthesis(card, board) {
  const required = mapStageToAgent('Research', card);
  if (required.length === 0) return false;
  const researchStage = latestStageComment(card, 'Research');
  const stageTime = new Date(researchStage?.createdAt || 0).getTime();
  const comments = sortedComments(card);

  const completed = new Set();
  for (const c of comments) {
    const t = new Date(c.createdAt || 0).getTime();
    if (t < stageTime) continue;
    const m = (c.content || '').match(/^\[AUTORUN:([^\]]+)\]/i);
    if (m) completed.add(m[1].toLowerCase());
  }

  if (!required.every(agent => completed.has(agent))) return false;
  const existingSynthesis = latestStageComment(card, 'Synthesis');
  if (existingSynthesis && new Date(existingSynthesis.createdAt || 0).getTime() >= stageTime) return false;

  await postComment(card.id, '[Stage: Synthesis]\n\n[AUTOMATION] All required research packets received. Routing back to Shark for synthesis.');
  const targetColumn = (board.columns || []).find(c => c.title === 'Creating');
  if (targetColumn && targetColumn.id !== card.columnId) {
    await moveCard(card.id, targetColumn.id);
  }
  return true;
}

(async function main() {
  const state = loadState();
  const config = loadConfig();
  const board = await api(`/boards/${BOARD_ID}`);
  const agentApiKeys = config.agentApiKeys || {};
  let dispatched = 0;

  for (const column of board.columns || []) {
    for (const card of column.cards || []) {
      const detail = await api(`/cards/${card.id}`);
      const stage = detectStage(detail);
      if (!stage || stage === 'Done' || stage === 'Blocked') continue;
      if (!isDispatchable(detail, stage, config)) continue;
      const targets = mapStageToAgent(stage, detail);
      if (targets.length === 0) continue;

      const handoff = latestHandoff(detail);
      const relevantTitles = (detail.subtasks || []).map(s => s.title || '').join('|');
      const fingerprint = `${detail.id}:${stage}:${simpleHash(handoff)}:${simpleHash(relevantTitles)}`;
      for (const agentId of targets) {
        const key = `${detail.id}:${agentId}`;
        if (state.dispatches[key] === fingerprint) continue;
        if (isLooping(state, detail.id, agentId, stage)) {
          appendRunLog({
            ts: new Date().toISOString(),
            type: 'loop-skip',
            cardId: detail.id,
            title: detail.title,
            stage,
            agentId
          });
          continue;
        }

        const prompt = buildPrompt(detail, stage, agentId);
        const result = dispatchAgent(agentId, prompt);
        const text = extractText(result);
        const parsed = parseAgentResponse(text);
        state.dispatches[key] = fingerprint;
        recordRunHistory(state, detail.id, agentId, stage);
        dispatched += 1;

        if (!DRY_RUN && text) {
          const normalizedNextStage = normalizeStageValue(parsed.nextStage);
          const autoComment = [
            `[AUTORUN:${agentId}]`,
            `STATUS: ${parsed.status || 'done'}`,
            parsed.summary ? `SUMMARY: ${parsed.summary}` : '',
            parsed.deliverable ? `DELIVERABLE:\n${parsed.deliverable}` : '',
            parsed.nextStage ? `NEXT_STAGE_RAW: ${parsed.nextStage}` : '',
            normalizedNextStage ? `NEXT_STAGE: ${normalizedNextStage}` : '',
            parsed.comment ? `COMMENT:\n${parsed.comment}` : '',
            parsed.returnTo ? `RETURN_TO: ${parsed.returnTo}` : ''
          ].filter(Boolean).join('\n\n');
          const actorApiKey = agentApiKeys[agentId] || API_KEY;
          const krakenApiKey = agentApiKeys.kraken || API_KEY;
          await postComment(detail.id, autoComment, actorApiKey);
          const refreshedForCompletion = await api(`/cards/${detail.id}`);
          await markAgentSubtasksComplete(refreshedForCompletion, agentId);

          if (normalizedNextStage && normalizedNextStage !== stage) {
            await postComment(detail.id, `[Stage: ${normalizedNextStage}]\n\n[AUTOMATION] Transitioned from ${stage} to ${normalizedNextStage}`, krakenApiKey);
            const refreshedForStage = await api(`/cards/${detail.id}`);
            await ensureStageSubtasks(refreshedForStage, normalizedNextStage);
          }

          const targetColumnTitle = stageToColumnTitle(normalizedNextStage);
          if (targetColumnTitle) {
            const targetColumn = (board.columns || []).find(c => c.title === targetColumnTitle);
            if (targetColumn && targetColumn.id !== detail.columnId) {
              await moveCard(detail.id, targetColumn.id, krakenApiKey);
            }
          }
        }

        appendRunLog({
          ts: new Date().toISOString(),
          type: 'dispatch',
          cardId: detail.id,
          title: detail.title,
          stage,
          agentId,
          status: parsed.status || 'done',
          nextStage: normalizeStageValue(parsed.nextStage) || parsed.nextStage || '',
          returnTo: parsed.returnTo || ''
        });

        if (VERBOSE) {
          console.log(JSON.stringify({ cardId: detail.id, stage, agentId, parsed, result }, null, 2));
        } else {
          console.log(`[dispatch] ${detail.title} -> ${agentId} (${stage})`);
        }
      }

      if (!DRY_RUN && stage === 'Research') {
        const refreshed = await api(`/cards/${detail.id}`);
        const advanced = await maybeAdvanceResearchToSynthesis(refreshed, board);
        if (advanced) {
          console.log(`[automation] ${detail.title} advanced from Research to Synthesis`);
        }
      }
    }
  }

  saveState(state);
  console.log(`Done. Dispatched ${dispatched} task(s).`);
})().catch(err => {
  console.error(err.stack || String(err));
  process.exit(1);
});
