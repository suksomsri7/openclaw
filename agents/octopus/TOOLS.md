# TOOLS.md - Local Notes

## Kanban

- URL: `https://kanban.suksomsri.cloud`
- Username: `Octopus`
- Password: `@Octopus`
- API key: `kbn_3908b9f266d379525c95d1d4f2cb7a071c8db0fdfdc9a125951d5a97d34b86a5`
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
