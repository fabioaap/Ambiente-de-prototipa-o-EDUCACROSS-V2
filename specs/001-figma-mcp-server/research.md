# Phase 0 Research – Figma MCP Token Server

## Task 1 – MCP server stack & transport
- **Decision**: Implement the server in TypeScript using `@modelcontextprotocol/sdk` with STDIO transport, mirroring the Model Context Protocol guidance from [modelcontextprotocol.io/docs/develop/build-server](https://modelcontextprotocol.io/docs/develop/build-server).
- **Rationale**: TypeScript matches the repo toolchain (Node 22 + pnpm) and keeps lint/type-check in the same pipeline. STDIO transport avoids extra HTTP surface, satisfies the constitution’s logging rule (no stdout), and keeps the server compatible with VS Code + Claude Desktop hosts.
- **Alternatives considered**: Python FastMCP sample (would add pyproject tooling inconsistent with pnpm); extending the existing mock HTTP server (fails to integrate with MCP clients and still returns static data).

## Task 2 – Figma data extraction patterns
- **Decision**: Use the official Figma REST API (`GET /v1/files/{file_key}/nodes?ids=...` and `GET /v1/files/{file_key}`) with personal access tokens scoped to files, then normalize fills/typography into the current `tokens.json` structure.
- **Rationale**: These endpoints are documented in [developers.figma.com/docs/api#accessing-files](https://www.figma.com/developers/api#accessing-files) and allow deterministic queries for specific frames (Jornada #4800). Staying on REST keeps us below the 60 req/min limit and avoids GraphQL beta features. The payload is already JSON, so mapping to token sets is straightforward.
- **Alternatives considered**: Figma GraphQL (still limited access, adds new tooling) and the `/v1/styles` endpoint (does not include layout metadata needed for badge extraction).

## Task 3 – Health & observability integration
- **Decision**: Extend `apps/studio/src/app/api/health/route.ts` to add a `figmaMcpServer` entry that polls the server’s `/health` HTTP shim (or catches STDIO errors) and expose the same structure on `/api/dashboard/health` for the dashboard SWR hook.
- **Rationale**: Constitution demands typed APIs and observable dashboards; reusing the existing health endpoint ensures dashboards, SpecKit, and sprint health docs stay in sync. Surfacing `status`, `lastSync`, and `lastPayloadVersion` gives designers quick diagnostics.
- **Alternatives considered**: A standalone CLI log file (not observable in Studio) or adding a new API route (creates redundant telemetry surface without benefit).

## Task 4 – Token regeneration workflow
- **Decision**: After each MCP token export, automatically run `pnpm build:tokens` followed by `pnpm build:design-system` before touching Studio/Storybook, logging the run inside `PROGRESS_DASHBOARD.md`.
- **Rationale**: Upholds the Run-Ready Prototypes principle and matches the stack mandate (tokens → design-system → apps). Documenting the run inside PROGRESS keeps traceability for Jornada #4800.
- **Alternatives considered**: Deferring builds to CI (slower feedback, violates principle) or running only design-system build (risks outdated tokens during Studio dev).
