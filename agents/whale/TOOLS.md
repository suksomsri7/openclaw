# TOOLS.md - Local Notes

## Kanban

- URL: `https://kanban.suksomsri.cloud`
- Username: `Whale`
- Password: `@Whale`
- API key: `kbn_ba2cdc9fa8753ed00a8dca2d2e945a88766787a2faa328cbcf1a3e23a228a846`
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
