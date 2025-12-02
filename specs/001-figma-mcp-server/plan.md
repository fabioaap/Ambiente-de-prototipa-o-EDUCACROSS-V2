# Implementation Plan: Figma MCP Token Server

**Branch**: `001-figma-mcp-server` | **Date**: 2025-11-27 | **Spec**: [`specs/001-figma-mcp-server/spec.md`](./spec.md)
**Input**: Feature specification from `/specs/001-figma-mcp-server/spec.md`

## Summary

Build a run-ready MCP server (STDIO) that calls the official Figma REST API to extract tokens and frame metadata for Jornada #4800, then wires those exports into the existing tokens → design-system → Studio/Storybook flow. The work also adds observability hooks (`/api/health`), scripts for pnpm developers, and documentation so Design Ops can self-serve token refreshes without touching mock data.

## Technical Context

**Language/Version**: TypeScript 5.6 on Node.js 22.21.1 (pnpm workspace)  
**Primary Dependencies**: `@modelcontextprotocol/sdk`, `undici`, Figma REST API v1, `dotenv`, `zod`  
**Storage**: In-memory processing only; outputs escritos em `packages/tokens/src/tokens.json` e `domains/BackOffice/journeys/exibir-campo-uso/assets/*`  
**Testing**: `vitest` + `supertest` para handlers MCP, contratos/snapshots para tokens, smoke scripts `pnpm mcp:figma:test`  
**Target Platform**: Hosts MCP (VS Code, Cursor, Claude Code, Windsurf, Amazon Q, Warp etc.) em Windows/macOS/Linux. Servidor local expõe STDIO + shim HTTP em `http://127.0.0.1:3845/mcp`; modo remoto opcional aponta para `https://mcp.figma.com/mcp`.  
**Project Type**: Monorepo Next.js + code-to-figma utilities + design-system  
**Performance Goals**: `get_design_tokens` <5s, `get_selection_snapshot` <30s (SC-002) e todas as ferramentas respeitam `<=60 req/min` (rate limit nível 1) e notificam quando contas Starter/Visualizador atingem 6 chamadas/mês (limite documentado).  
**Constraints**: Manter ordem `pnpm build:tokens → build:design-system → build`, não logar em stdout no STDIO, proteger segredos e refletir avisos do guia MCP (feedback popup, limites por plano, fallback remoto).  
**Scale/Scope**: ≤5 usuários MCP locais para Jornada 4800; toca `code-to-figma`, `packages/tokens`, `packages/design-system`, `apps/studio`, `apps/storybook`, `domains/BackOffice/journeys/exibir-campo-uso`.  
**Fork Provenance**: `code-to-figma/` continua sendo o fork do plugin externo; customizações MCP permanecem aqui e PRs upstream podem ser abertos a partir deste workspace.  
**Client Catalog Reference**: Quickstart trará instruções específicas para VS Code, Cursor, Claude Code e demais clientes listados no catálogo oficial MCP (atualizar ao detectar novos suportes).

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
│   │   ├── services/figmaClient.ts
│   │   └── instrumentation/metrics.ts
│   ├── scripts/
│   │   ├── writeTokensFromMcp.ts  # orchestrates tokens pipeline + build order
│   │   └── saveSnapshotArtifact.ts # persists snapshots + SLA instrumentation
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

**Structure Decision**: Extend the existing `code-to-figma` workspace with a dedicated `figma-mcp-server` package so tooling lives alongside figma-sync-engine, while downstream packages (`packages/tokens`, `apps/studio`, docs/domains) consume the generated artifacts. The new `scripts/` subpasta concentra orquestrações que escrevem arquivos (tokens, snapshots) e hospeda instrumentações de SLA usadas pelos testes e pelo CLI de saúde.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| _None_ | Constitution satisfied without exceptions | N/A |
