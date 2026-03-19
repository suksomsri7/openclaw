# Automation MVP

## kanban-dispatcher.mjs

Polling dispatcher MVP that:
- reads cards from the Content Master board
- detects current stage from `[Stage: ...]` comments or fallback by column
- maps stage to target agents
- invokes real OpenClaw agents via `openclaw agent --agent <id>`
- stores dispatch fingerprints locally to avoid duplicate re-dispatch

## Required env

```bash
export KANBAN_API_KEY='...'
export KANBAN_BASE_URL='https://kanban.suksomsri.cloud/api/v1'
export KANBAN_BOARD_ID='cmmwc0f5a000z04l22xn31qka'
```

## Whitelist behavior

Dispatcher will only auto-run cards that match the whitelist in `automation/dispatcher-config.json`.
Default allowed signals:
- title starts with `AUTO:` or `[AUTO]`
- description contains `AUTO-RUN: true` or `[AUTO-RUN:ON]`
- comments contain `[AUTO-RUN:ON]`

## Run once

```bash
node automation/kanban-dispatcher.mjs --verbose
```

## Dry run

```bash
node automation/kanban-dispatcher.mjs --dry-run --verbose
```

## Dashboard

```bash
node automation/dispatcher-dashboard.mjs
```

## Notes

- Current version dispatches work to configured agents, parses their structured replies, and posts autorun comments back into Kanban.
- Column movement is supported based on `NEXT_STAGE` mapping.
- Subtask creation/closure automation is partially implemented and should continue to be validated on live cards.
- State file: `automation/state/dispatcher-state.json`
- Run log file: `automation/logs/dispatcher-runs.jsonl`
