# TOOLS.md - Local Notes

## Kanban

- URL: `https://kanban.suksomsri.cloud`
- Username: `Manta`
- Password: `@Manta`
- API key: `kbn_0f2cfa7ab189c58fb262749f05d33a1c56fcd511c8100d9668632a39f173511a`
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
