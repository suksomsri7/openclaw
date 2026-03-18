# TOOLS.md - Local Notes

## Kanban

- URL: `https://kanban.suksomsri.cloud`
- Username: `Shark`
- Password: `@Shark`
- API key: `kbn_fe77557f11c3ed81ce604e074646aac074b11826b97195507604c036ed32e0da`
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
