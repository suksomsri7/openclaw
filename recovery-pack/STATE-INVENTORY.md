# State Inventory

## Safe in Git
These are stored in the git repository and can be restored by cloning the repo:
- workspace files under `/data/.openclaw/workspace`
- content-team agent packs under `/data/.openclaw/workspace/agents`
- this recovery-pack folder

## Not Fully Protected By Git Alone
These live under `/data/.openclaw/` and should be backed up separately:
- `openclaw.json` — live Gateway config with secrets
- `openclaw.json.bak`
- `agents/<agentId>/sessions/` — conversation/session history
- `agents/<agentId>/agent/auth-profiles.json` — per-agent auth state
- `memory/` databases and runtime stores
- `cron/`, `devices/`, `identity/`, `logs/`, and other runtime state
- `.git/credentials` in the workspace repo if local git credential storage is enabled

## Practical Meaning
Git restores the team definition.
Local backup restores the running system state.
You want both.
