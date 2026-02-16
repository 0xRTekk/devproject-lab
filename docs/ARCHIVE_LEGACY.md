# Archive / Notes for `legacy-ddd`

This repository contains a `legacy-ddd/` directory with an older NestJS backend and related artifacts.

Why it exists
- Historical prototype of the backend and data migration assets.

Recommendation
- Treat `legacy-ddd/` as archived. Do not mix runtime code from this folder into the main `src/` app.
- Add a short README (this file) explaining its purpose and whether it should be removed in future.
- Before removing or integrating any code, ensure migrations and data models are ported and covered by tests.

Immediate actions taken
- Documented the folder purpose here to avoid accidental changes.

Follow-ups
- If the folder is no longer needed, propose a PR that moves relevant migration SQL files to `prisma/migrations/` or `migrations/` and then deletes the folder.
- If parts need to be reused, create a well-scoped extraction plan and add unit tests.
