# OpenClaw Recovery Pack

This folder contains the safe-to-store recovery materials for rebuilding the current OpenClaw setup if the machine fails.

## Included
- `RESTORE.md` — step-by-step restoration guide
- `CONFIG-SANITIZED.json5` — sanitized Gateway config structure with agent registration preserved and secrets removed
- `STATE-INVENTORY.md` — what exists in local OpenClaw state and what is / is not backed up to git
- `AGENT-REGISTRY.md` — current registered content-team agents and workspace paths
- `BACKUP-STATUS.md` — current backup status and latest commit references

## Important
This recovery pack is safe for git storage because secrets are removed.
It does NOT replace the local full backup archive for credentials, sessions, and private runtime state.
