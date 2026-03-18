# Full Recovery Guide

Use this guide if the machine fails and you need to rebuild the OpenClaw content-team environment.

## Recovery Goals
Restore:
1. repository workspace files
2. standalone content-team agents
3. Gateway config
4. local runtime state (sessions, auth, identity, memory, cron, device pairing)

## What You Need
- Git access to `https://github.com/suksomsri7/openclaw`
- The latest local full backup archive created from `/data/.openclaw/`
- Any required secrets/tokens if not restoring the full secure archive

## Fastest Recovery Path

### Option A — Full restore from local full backup archive
Use this when you still have the archive from the old machine.

1. Install OpenClaw on the new machine.
2. Stop Gateway.
3. Restore the backed-up `/data/.openclaw/` contents from the archive to the same path.
4. Verify that `/data/.openclaw/openclaw.json` exists.
5. Verify that `/data/.openclaw/workspace` exists.
6. Start or restart Gateway.
7. Open Control UI and confirm the agents appear:
   - main
   - shark
   - octopus
   - seaturtle
   - whale
   - manta

### Option B — Rebuild from Git only
Use this when the full backup archive is unavailable.

1. Install OpenClaw on the new machine.
2. Clone the repo into the intended workspace path.
3. Restore workspace content under `/data/.openclaw/workspace`.
4. Recreate or apply Gateway config using `CONFIG-SANITIZED.json5` plus current secrets.
5. Re-enter tokens / auth where needed.
6. Restart Gateway.
7. Reconnect channels if required.
8. Accept that session history and some runtime state may be missing.

## Critical Files
- Live config: `/data/.openclaw/openclaw.json`
- Workspace: `/data/.openclaw/workspace`
- Agent runtime state: `/data/.openclaw/agents/`
- Device/auth/runtime state: `/data/.openclaw/{identity,devices,cron,memory}`

## Verification Checklist After Restore
- Gateway starts successfully
- Control UI opens
- All six agents are visible
- The content-team workspaces exist
- Git remote is reachable
- Messaging channels reconnect correctly
- Sessions/auth present if full archive was restored

## Best Practice Going Forward
- Keep the repo current
- Keep a fresh local full backup archive
- Rotate secrets if a machine compromise is suspected
- Avoid storing raw secrets inside the git repo
