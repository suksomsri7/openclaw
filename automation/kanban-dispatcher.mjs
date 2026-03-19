#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const BASE_URL = process.env.KANBAN_BASE_URL || 'https://kanban.suksomsri.cloud/api/v1';
const API_KEY = process.env.KANBAN_API_KEY || '';
const BOARD_ID = process.env.KANBAN_BOARD_ID || 'cmmwc0f5a000z04l22xn31qka'; // Content Master
const STATE_PATH = process.env.DISPATCHER_STATE_PATH || path.resolve('automation/state/dispatcher-state.json');
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

if (!API_KEY) {
  console.error('Missing KANBAN_API_KEY');
  process.exit(1);
}

fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true });

function loadState() {
  if (!fs.existsSync(STATE_PATH)) return { dispatches: {} };
  return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
}

function saveState(state) {
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

async function api(p, options = {}) {
  const res = await fetch(`${BASE_URL}${p}`, {
    ...options,
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  const json = await res.json();
  if (!json.success) throw new Error(`API ${p} failed: ${json.error || res.status}`);
  return json.data;
}

function mapStageToAgent(stage, card) {
  if (stage === 'Strategy' || stage === 'Synthesis' || stage === 'Review') return ['shark'];
  if (stage === 'Drafting') return ['octopus'];
  if (stage === 'Approval') return ['main'];
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
    'Reply in this exact structure:',
    'STATUS: done | needs_clarification | blocked',
    'SUMMARY: ...',
    'DELIVERABLE:',
    '...',
    'NEXT_STAGE: ...',
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

(async function main() {
  const state = loadState();
  const board = await api(`/boards/${BOARD_ID}`);
  let dispatched = 0;

  for (const column of board.columns || []) {
    for (const card of column.cards || []) {
      const detail = await api(`/cards/${card.id}`);
      const stage = detectStage(detail);
      if (!stage || stage === 'Done' || stage === 'Blocked') continue;
      const targets = mapStageToAgent(stage, detail);
      if (targets.length === 0) continue;

      const fingerprint = `${detail.id}:${stage}:${(detail.comments || []).length}:${(detail.subtasks || []).length}`;
      for (const agentId of targets) {
        const key = `${detail.id}:${agentId}`;
        if (state.dispatches[key] === fingerprint) continue;

        const prompt = buildPrompt(detail, stage, agentId);
        const result = dispatchAgent(agentId, prompt);
        state.dispatches[key] = fingerprint;
        dispatched += 1;

        if (VERBOSE) {
          console.log(JSON.stringify({ cardId: detail.id, stage, agentId, result }, null, 2));
        } else {
          console.log(`[dispatch] ${detail.title} -> ${agentId} (${stage})`);
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
