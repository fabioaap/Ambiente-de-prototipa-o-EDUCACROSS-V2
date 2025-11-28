# Tasks: Figma MCP Token Server

**Input**: Design documents from `/specs/001-figma-mcp-server/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: FR-009 requires contract/integration hooks for the MCP tools and health API, so targeted tests are included for each affected user story.

**Organization**: Tasks are grouped by user story to keep each journey independently implementable and testable.

**Constitution alignment**: Tasks call out build/lint/type-check gates, journey doc updates, Storybook/Studio alignment, and `/api/health` telemetry changes wherever relevant.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story ownership (US1, US2, US3). Setup/Foundational/Polish omit this label.
- Include exact file paths so contributors can jump straight into implementation.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the new `figma-mcp-server` workspace, scripts, and environment scaffolding before any feature code lands.

- [ ] T001 Create `code-to-figma/figma-mcp-server/` package scaffold (package.json, tsconfig.json, src/index.ts placeholder) per plan structure.
- [ ] T002 Update root `pnpm-workspace.yaml`, `package.json`, and `turbo.json` to register the new package plus scripts `mcp:figma:start|test|health`.
- [ ] T003 Document required secrets (`FIGMA_PERSONAL_TOKEN`, `FIGMA_FILE_ID`) in `.env.local.example` and ensure `.gitignore`/Playbook references mention the new MCP server.
- [ ] T004 Garantir script `pnpm mcp:figma:stop` (Windows/macOS) antes das histórias, adicionando instruções em `SPRINT3_DOCUMENTATION_INDEX.md` e `quickstart.md` para completar o ciclo start/stop/test.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that every user story depends on. No story work can begin until these are complete.

- [X] T005 Implement `code-to-figma/figma-mcp-server/src/config.ts` to load/validate env vars with zod and expose safe config helpers.
- [X] T006 [P] Create reusable Figma REST client (`services/figmaClient.ts`) using `undici`, covering `/files/{file}/nodes` and `/images` endpoints with retry/backoff.
- [X] T007 [P] Wire `@modelcontextprotocol/sdk` STDIO runner (`src/server.ts`) with structured logging to stderr/pino so tool handlers can register safely.
- [X] T008 Configure Vitest + test utilities (`figma-mcp-server/vitest.config.ts`, `tests/helpers/mockFigma.ts`) to support contract/integration tests required by FR-009.
- [X] T009 Add placeholder entry in `.vscode/mcp.json` pointing to `pnpm mcp:figma:start` so local hosts discover the server once stories land.

**Checkpoint**: After T005–T009, the package boots (even with stub tools) and testing infrastructure exists; user stories may now execute in parallel.

---

## Phase 3: User Story 1 – Importar tokens reais da Jornada 4800 (Priority: P1) 🎯 MVP

**Goal**: Provide a `get_design_tokens` MCP tool that extracts Jornada #4800 colors/typography/spacing from Figma and writes them into `packages/tokens` + downstream surfaces.

**Independent Test**: Run `get_design_tokens` against frame `8565:17355` and confirm Storybook badges render with the same colors as Figma after regenerating tokens.

### Tests for User Story 1

- [X] T010 [P] [US1] Add contract test `code-to-figma/figma-mcp-server/tests/tokenSet.contract.test.ts` validating the Zod schema against fixture payloads.
- [X] T011 [P] [US1] Create integration test `tests/getDesignTokens.integration.test.ts` that stubs Figma API responses and asserts the tool writes the correct `packages/tokens/src/tokens.json` diff.

### Implementation for User Story 1

- [X] T012 [P] [US1] Define `tokenSetSchema` + layer-to-token mappers in `src/schemas/tokenSet.ts`, covering colors, typography, spacing, and metadata fields.
- [X] T013 [US1] Implement `tools/getDesignTokens.ts` to fetch layers via `figmaClient`, normalize values, and emit the schema-safe payload.
- [X] T014 [US1] Register the `get_design_tokens` tool within `src/index.ts` so the STDIO server exposes it to MCP hosts.
- [X] T015 [US1] Implement file-writer orchestration (`scripts/writeTokensFromMcp.ts`) that persists JSON under `packages/tokens/src/tokens.json` and triggers `pnpm build:tokens && pnpm build:design-system` per Quickstart.
- [X] T016 [US1] Update Design System consumption (e.g., `packages/design-system/src/theme/tokens.ts` and Jornada #4800 components) to read the new token keys without manual mapping.
- [X] T017 [US1] Refresh Storybook artifacts (`domains/storybook/src/stories/*` and `apps/storybook/.storybook/preview.ts`) so Jornada #4800 stories visually reflect the exported tokens.
- [X] T018 [US1] Document the automated token flow in `domains/BackOffice/journeys/exibir-campo-uso/README.md` and `docs/FIGMA_INTEGRATION_PLAN.md`, including the command sequence from Quickstart Section 4.

**Checkpoint**: `get_design_tokens` is independently usable, updates propagate through tokens → design-system → Storybook, and documentation reflects the workflow.

---

## Phase 4: User Story 2 – Capturar snapshot de seleção para revisão (Priority: P2)

**Goal**: Deliver `get_selection_snapshot` so curators can grab metadata + preview of the active Figma selection and archive it alongside the journey docs.

**Independent Test**: Invoke the tool with a valid selection ID and confirm JSON + base64 preview land in `domains/BackOffice/journeys/exibir-campo-uso/assets/` and are referenced in the README without touching Figma manually.

### Tests for User Story 2

- [ ] T019 [P] [US2] Add integration test `tests/getSelectionSnapshot.integration.test.ts` mocking `/files` + `/images` calls and ensuring the tool returns SnapshotArtifact schema.
- [ ] T020 [P] [US2] Create file-system test `tests/snapshotWriter.test.ts` that verifies assets are saved with timestamped filenames under `domains/BackOffice/journeys/exibir-campo-uso/assets/`.

### Implementation for User Story 2

- [ ] T021 [P] [US2] Define `snapshotArtifactSchema` plus helper serializers in `src/schemas/snapshotArtifact.ts`.
- [ ] T022 [US2] Implement `tools/getSelectionSnapshot.ts` pulling document/layer metadata and requesting preview images via Figma image API when `includePreview=true`.
- [ ] T023 [US2] Build asset writer (`scripts/saveSnapshotArtifact.ts`) that stores JSON + PNG, updates `domains/BackOffice/journeys/exibir-campo-uso/assets/index.json`, and returns paths to the MCP client.
- [ ] T024 [US2] Update `domains/BackOffice/journeys/exibir-campo-uso/README.md` and `notas.md` to embed the latest snapshot preview + metadata tables.
- [ ] T025 [US2] Extend `docs/FIGMA_INTEGRATION_PLAN.md` Section “Troubleshooting” with snapshot-specific failure modes (missing preview, large payload) and recovery steps.

**Checkpoint**: Documentation and assets prove the snapshot workflow works independently of token export.

---

## Phase 5: User Story 3 – Monitorar e versionar o servidor MCP (Priority: P3)

**Goal**: Surface MCP health + versioning data through `/api/health`, dashboard widgets, and CLI scripts so devs know when tokens/snapshots are fresh.

**Independent Test**: Start `pnpm mcp:figma:start`, run `pnpm mcp:figma:health`, and confirm `/api/health` plus the dashboard HealthSection show `figmaMcpServer.status = ok`; kill the process and observe `degraded` messaging.

### Tests for User Story 3

- [ ] T026 [P] [US3] Extend API contract test `apps/studio/tests/api/health.figmapcp.test.ts` ensuring the new `figmaMcpServer` block matches `contracts/api-health-extension.yaml`.
- [ ] T027 [P] [US3] Add component test `apps/studio/src/app/dashboard/components/__tests__/HealthSection.figmaMcp.test.tsx` verifying banners/rendering for ok/degraded states.

### Implementation for User Story 3

- [ ] T028 [US3] Update `apps/studio/src/app/api/health/route.ts` and `/api/dashboard/health/route.ts` to compute `figmaMcpServer` status (ok/degraded/offline) using the CLI health probe output.
- [ ] T029 [US3] Enhance `apps/studio/src/app/dashboard/components/HealthSection.tsx` (and related SWR hooks) to render MCP status, timestamps, and recovery guidance per spec.
- [ ] T030 [US3] Add `pnpm mcp:figma:health` script + CLI helper that pings the server/shim and writes `docs/PROGRESS_DASHBOARD.md` entries after each sync.
- [ ] T031 [US3] Finalize `.vscode/mcp.json` and `SPRINT3_DOCUMENTATION_INDEX.md` with instructions for enabling the server in VS Code/Claude plus historical sync logs.

**Checkpoint**: Dashboards, docs, and scripts accurately represent MCP availability without requiring stories 1–2 to be rerun.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Repo-wide finishing steps after the three stories demonstrate independent value.

- [ ] T032 [P] Run full quality gate (`pnpm lint`, `pnpm -r type-check`, `pnpm build`, `pnpm test:mcp`) and fix any regressions introduced by the new package.
- [ ] T033 [P] Update `docs/SPRINT3_DOCUMENTATION_INDEX.md`, `SPRINT3_FINAL_STATUS.md`, and `PROGRESS_DASHBOARD.md` with final outcomes, linking to journey assets and health metrics.
- [ ] T034 Refresh `.github/CODEOWNERS` or workflow docs if ownership or CI steps changed due to the MCP server (document in `WORKFLOW.md`).

---

## Phase 7: Controles Adicionais & Qualidade Contínua

**Propósito**: Garantir que requisitos transversais (SLA, resiliência e Run-Ready) sejam evidenciados em tarefas explícitas antes da implementação.

- [ ] T035 [US2] Instrumentar `scripts/saveSnapshotArtifact.ts` e `tools/getSelectionSnapshot.ts` com coleta de duração, expondo métricas de SLA (<30s) em logs/CLI e preparando dados para `/api/health` (SC-002).
- [ ] T036 [P] [US2] Acrescentar teste de SLA (`tests/getSelectionSnapshot.performance.test.ts`) e atualizar `docs/FIGMA_INTEGRATION_PLAN.md` com o procedimento de verificação do tempo máximo, falhando quando o mock ultrapassa 30s.
- [ ] T037 Implementar camada de tratamento para rate limit, seleções ocultas e falta de `FIGMA_PERSONAL_TOKEN` (config + mensagens amigáveis), cobrindo `src/services/figmaClient.ts`, ferramentas e documentando recovery em `domains/BackOffice/journeys/exibir-campo-uso/README.md`.
- [ ] T038 [US1] Após fechar os itens da história, rodar `pnpm lint && pnpm -r type-check && pnpm build` e anexar evidências no PR para comprovar o princípio Run-Ready.
- [ ] T039 [US2] Repetir o quality gate (`pnpm lint && pnpm -r type-check && pnpm build`) incluindo provas de que o SLA instrumentado permanece verde antes de mergear a história.
- [ ] T040 [US3] Executar o mesmo quality gate e anexar logs que mostrem `/api/health` e o painel consumindo o status `figmaMcpServer` sem regressões.
- [ ] T041 Atualizar `specs/001-figma-mcp-server/quickstart.md` e `docs/FIGMA_INTEGRATION_PLAN.md` com instruções para conectar o servidor MCP local (`http://127.0.0.1:3845/mcp`) e o endpoint remoto (`https://mcp.figma.com/mcp`), incluindo exemplos de `.vscode/mcp.json` para VS Code, Cursor e Claude Code.
- [ ] T042 Instrumentar `src/instrumentation/metrics.ts` e `scripts/writeTokensFromMcp.ts` para registrar contagem mensal de chamadas por usuário (alertando quando atingir 6 execuções em planos Starter/Viewer) e os eventos de rate limit 60 req/min, refletindo esses avisos nos logs e no troubleshooting dos docs.
- [ ] T043 [US3] Consolidar métricas de uptime gravando execuções em `.code-to-figma/.cache/mcp-sync.json`, calculando percentual semanal (>=90%) e publicando o resumo em `/api/health` logs e `docs/PROGRESS_DASHBOARD.md`.

---

## Dependencies & Execution Order

- **Phase 1 → Phase 2**: Setup (incluindo T004) must finish before foundational infrastructure work starts.
- **Phase 2 → User Stories**: T005–T009 unblock all user stories; once complete, US1–US3 can proceed in parallel (respecting artifact dependencies such as tokens feeding docs).
- **User Story sequencing**:
  - US1 (P1) delivers MVP and should ship first to satisfy SC-001; US2/US3 may start once Foundational is ready but cannot merge until US1 validates tokens.
  - US2 depends on the shared Figma client and asset writer from Phase 2 but not on US1 outputs.
  - US3 consumes CLI artifacts introduced in US1/US2 only via status/version metadata, keeping tests independent.
- **Phase 6** runs after desired user stories close, ensuring documentation + CI evidence are finalized.

## Parallel Execution Examples

- **Within Phase 2**: T006 (Figma client) and T007 (STDIO runner) operate on separate files and can proceed concurrently once config scaffolding (T005) exists.
- **User Story 1**: After schemas (T012) land, T013 (tool implementation) and T017 (Storybook updates) may progress concurrently because they touch different packages.
- **User Story 2**: T022 (tool) and T024 (README/notas updates) can happen in parallel once the snapshot schema (T021) is ready.
- **User Story 3**: T028 (API routes) and T029 (dashboard UI) can be built simultaneously, coordinating only on the shared TypeScript interface.

## Implementation Strategy

### MVP First (User Story 1)
1. Finish Phases 1–2.
2. Complete US1 tasks (T010–T018) and validate tokens via Storybook + tests.
3. Ship/demonstrate the automated token pipeline as the MVP delivering immediate value.

### Incremental Delivery
1. After MVP, tackle US2 (snapshots) to aid reviews, then US3 (monitoring).
2. Each story has its own independent test criteria, so you can release after each checkpoint without waiting for subsequent stories.

### Parallel Team Strategy
- Assign separate owners per story once Foundational tasks close: e.g., Developer A owns US1, Developer B owns US2, Developer C owns US3.
- Reuse the parallel opportunities list to avoid merge conflicts (schemas before tools, docs after assets), ensuring each deliverable remains independently testable as required.
