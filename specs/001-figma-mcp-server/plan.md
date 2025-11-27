# Implementation Plan: Figma MCP Token Server

**Branch**: `001-figma-mcp-server` | **Date**: 2025-11-27 | **Spec**: [`specs/001-figma-mcp-server/spec.md`](./spec.md)
**Input**: Feature specification from `/specs/001-figma-mcp-server/spec.md`

## Summary

Build a run-ready MCP server (STDIO) that calls the official Figma REST API to extract tokens and frame metadata for Jornada #4800, then wires those exports into the existing tokens → design-system → Studio/Storybook flow. The work also adds observability hooks (`/api/health`), scripts for pnpm developers, and documentation so Design Ops can self-serve token refreshes without touching mock data.

## Technical Context

**Language/Version**: TypeScript 5.6 on Node.js 22.21.1 (pnpm workspace)  
**Primary Dependencies**: `@modelcontextprotocol/sdk` (TypeScript server utilities), `undici` (HTTP client), Figma REST API v1, `dotenv` for secrets, `zod` for validating tool IO payloads  
**Storage**: In-memory processing only; outputs written to repo files (`packages/tokens/src/tokens.json`, `domains/BackOffice/journeys/exibir-campo-uso/assets/*`)  
**Testing**: `vitest` + `supertest` for MCP handlers, contract snapshot tests for generated token payloads, smoke scripts invoking CLI via `pnpm mcp:figma:test`  
**Target Platform**: Local MCP hosts (VS Code + Claude Desktop) running on Windows/macOS; server exposed via STDIO or `node` child process  
**Project Type**: Multi-app monorepo (Next.js dashboards + code-to-figma utilities + design-system packages)  
**Performance Goals**: `get_design_tokens` returns payload < 5s for Jornada frame; `get_selection_snapshot` delivers preview < 30s as per SC-002; no tool call exceeds Figma 60 req/min quota  
**Constraints**: Must keep pnpm `build:tokens → build:design-system → build` order green, avoid stdout logging in STDIO mode, respect FIGMA API rate limits and secrets, keep generated files ASCII/JSON stable for Storybook exports  
**Scale/Scope**: Supports ≤5 concurrent MCP users refreshing Jornada 4800 artifacts; touches `code-to-figma`, `packages/tokens`, `packages/design-system`, `apps/studio`, `apps/storybook`, and `domains/BackOffice/journeys/exibir-campo-uso`

## Constitution Check

1. **Run-Ready Prototypes Only** – Plan adds pnpm scripts (`mcp:figma:start|test`) plus documentation ensuring contributors run the MCP server before `pnpm build`. Tokens regen follows mandated order (tokens → design-system → studio/storybook) and `/api/health` fails fast if MCP is offline, preventing silent red builds.
2. **Single Design System Surface** – Tokens exported from Figma feed `packages/tokens`, then `packages/design-system` + Storybook stories; no bespoke styling outside DS. Any new component still registers with `puck.config.tsx` if Studio needs to render badges.
3. **Documented Journeys Stay Traceable** – Journey `domains/BackOffice/journeys/exibir-campo-uso` gains refreshed README assets + notes, Sprint indexes (`SPRINT3_DOCUMENTATION_INDEX.md`, `PROGRESS_DASHBOARD.md`) log each sync, and Studio slug `/backoffice/exibir-campo-uso` references the new automation.
4. **Typed APIs & Observable Dashboards** – `/api/health` and `/api/dashboard/health` gain `figmaMcpServer` typed contract plus SWR client updates. Tool IO schemas validated with `zod`, and logs route through `stderr` for STDIO safety.
5. **Automation-First Quality Gates** – Spec/plan/tasks managed via SpecKit; CI evidence includes `pnpm lint`, `pnpm -r type-check`, `pnpm build`, and `pnpm test:mcp`. `/spec` report will cite new docs and contracts so reviewers only verify behaviour.

## Project Structure

### Documentation (this feature)

```text
specs/001-figma-mcp-server/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── figma-mcp-tools.yaml
│   └── api-health-extension.yaml
└── tasks.md (Phase 2)
```

### Source Code (repository root)

```text
code-to-figma/
├── figma-mcp-server/
│   ├── src/
│   │   ├── index.ts              # FastMCP server entry
│   │   ├── tools/getDesignTokens.ts
│   │   ├── tools/getSelectionSnapshot.ts
│   │   └── services/figmaClient.ts
│   ├── package.json (workspace)
│   └── tests/
│       ├── tokens.test.ts
│       └── snapshot.test.ts
├── figma-sync-engine/
│   └── ... (reused utilities for parsing Figma nodes)

packages/
├── tokens/src/tokens.json        # overwritten via MCP export
├── design-system/src/...         # relies on regenerated tokens
└── design-system/stories/...     # Storybook coverage for Jornada badges

apps/studio/
├── src/app/api/health/route.ts   # expose figmaMcpServer metric
├── src/app/dashboard/components/HealthSection.tsx (SWR wiring)
└── src/config/puck.config.tsx    # ensure components reference synced tokens

docs/
├── FIGMA_INTEGRATION_PLAN.md     # updated runbook
├── PROGRESS_DASHBOARD.md         # execution status entry
└── SPRINT3_DOCUMENTATION_INDEX.md

domains/BackOffice/journeys/exibir-campo-uso/
├── README.md / notas.md / links.md
└── assets/figma-snapshots/*      # artifacts from get_selection_snapshot
```

**Structure Decision**: Extend the existing `code-to-figma` workspace with a dedicated `figma-mcp-server` package so tooling lives alongside figma-sync-engine, while downstream packages (`packages/tokens`, `apps/studio`, docs/domains) consume the generated artifacts.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| _None_ | Constitution satisfied without exceptions | N/A |
