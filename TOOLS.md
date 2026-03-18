---
summary: "Workspace template for TOOLS.md"
read_when:
  - Bootstrapping a workspace manually
---

# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## Kanban

- URL: `https://kanban.suksomsri.cloud`
- Username: `Kraken`
- Password: `@Kraken`
- API key: `kbn_2a648bc0210e3872ffc8f672bd6951dad1451e0c250c817b93cc7578733cd7a4`
- Preferred auth header: `x-api-key: <key>`
- Base API URL: `https://kanban.suksomsri.cloud/api/v1`
- Quick verify endpoint: `GET /me`
- Main docs:
  - API: `https://github.com/suksomsri7/kanban/blob/main/AGENT_API.md`
  - Prompt: `https://github.com/suksomsri7/kanban/blob/main/AGENT_PROMPT.md`

### Kanban API Notes
- Auth supports per-user API key and legacy bearer token.
- Per-user API key is recommended and scope-limited.
- Core hierarchy: `Brand → Board → Column → Card`
- Common first calls:
  - `GET /api/v1/me`
  - `GET /api/v1/boards`
  - `GET /api/v1/users`
- Key card actions:
  - create: `POST /api/v1/cards`
  - update: `PATCH /api/v1/cards/{cardId}`
  - move: `POST /api/v1/cards/{cardId}/move`
  - comment: `POST /api/v1/cards/{cardId}/comments`
  - subtasks: create/list/update/delete under `/cards/{cardId}/subtasks`
- Priority enum: `LOW | MEDIUM | HIGH | URGENT`
- Response envelope:
  - success: `{ "success": true, "data": ... }`
  - error: `{ "success": false, "error": "..." }`
- Important practice: fetch boards first to resolve `boardId`, `columnId`, and `labelId`; fetch users before assigning.

### Agent Credentials
- Shark
  - Username: `Shark`
  - Password: `@Shark`
  - API key: `kbn_fe77557f11c3ed81ce604e074646aac074b11826b97195507604c036ed32e0da`
- Octopus
  - Username: `Octopus`
  - Password: `@Octopus`
  - API key: `kbn_3908b9f266d379525c95d1d4f2cb7a071c8db0fdfdc9a125951d5a97d34b86a5`
- SeaTurtle
  - Username: `SeaTurtle`
  - Password: `@SeaTurtle`
  - API key: `kbn_6d4de9b9ae353f78e490c15d8929f9e0b1fcb96a14dee4620d24818ed53f6d53`
- Whale
  - Username: `Whale`
  - Password: `@Whale`
  - API key: `kbn_ba2cdc9fa8753ed00a8dca2d2e945a88766787a2faa328cbcf1a3e23a228a846`
- Manta
  - Username: `Manta`
  - Password: `@Manta`
  - API key: `kbn_0f2cfa7ab189c58fb262749f05d33a1c56fcd511c8100d9668632a39f173511a`

### Agent Reminder
- Each content agent should keep its own Kanban credentials and docs in its local `TOOLS.md`.