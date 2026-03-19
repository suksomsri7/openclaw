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

## Run once

```bash
node automation/kanban-dispatcher.mjs --verbose
```

## Dry run

```bash
node automation/kanban-dispatcher.mjs --dry-run --verbose
```

## Notes

- Current version dispatches work to configured agents, parses their structured replies, and posts autorun comments back into Kanban.
- Column movement is supported based on `NEXT_STAGE` mapping.
- Subtask refresh/closure is **not yet** automatic.
- State file: `automation/state/dispatcher-state.json`
