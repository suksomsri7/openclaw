#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const RUN_LOG_PATH = process.env.DISPATCHER_RUN_LOG_PATH || path.resolve('automation/logs/dispatcher-runs.jsonl');
const limit = Number(process.argv[2] || 50);

if (!fs.existsSync(RUN_LOG_PATH)) {
  console.log('No dispatcher run log found.');
  process.exit(0);
}

const lines = fs.readFileSync(RUN_LOG_PATH, 'utf8')
  .split('\n')
  .filter(Boolean)
  .map(line => JSON.parse(line));

const recent = lines.slice(-limit);
const counts = {};
for (const row of recent) {
  const key = `${row.type}:${row.agentId || '-'}:${row.stage || '-'}`;
  counts[key] = (counts[key] || 0) + 1;
}

console.log('=== Dispatcher Dashboard ===');
console.log(`Log file: ${RUN_LOG_PATH}`);
console.log(`Rows loaded: ${recent.length}`);
console.log('');
console.log('Recent events:');
for (const row of recent.slice(-20)) {
  console.log(`- ${row.ts} | ${row.type} | ${row.agentId || '-'} | ${row.stage || '-'} | ${row.title || row.cardId || '-'}`);
}
console.log('');
console.log('Summary counts:');
for (const [key, value] of Object.entries(counts).sort()) {
  console.log(`- ${key} = ${value}`);
}
