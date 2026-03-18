# TOOLS.md - Local Notes

## Kanban

- URL: `https://kanban.suksomsri.cloud`
- Username: `SeaTurtle`
- Password: `@SeaTurtle`
- API key: `kbn_6d4de9b9ae353f78e490c15d8929f9e0b1fcb96a14dee4620d24818ed53f6d53`
- Preferred auth header: `x-api-key: <key>`
- Base API URL: `https://kanban.suksomsri.cloud/api/v1`
- Quick verify endpoint: `GET /me`
- Main docs:
  - API: `https://github.com/suksomsri7/kanban/blob/main/AGENT_API.md`
  - Prompt: `https://github.com/suksomsri7/kanban/blob/main/AGENT_PROMPT.md`

### Notes
- Fetch `/boards` first to resolve boardId / columnId / labelId.
- Fetch `/users` before assigning.
- Core hierarchy: `Brand → Board → Column → Card`
- Priority enum: `LOW | MEDIUM | HIGH | URGENT`
