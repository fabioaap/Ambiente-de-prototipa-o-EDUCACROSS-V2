# Next Sprint — Tasks (Dashboard, A11y/NFRs, Storybook Ops, Backoffice Hub)

Feature: Next Sprint Execution Plan

## Phase 1 — Setup
- [ ] T001 Create feature directory `specs/004-next-sprint/`
- [ ] T002 Add `plan.md` with tech stack, libraries, structure `specs/004-next-sprint/plan.md`
- [ ] T003 Add `research.md` capturing NFR targets and a11y decisions `specs/004-next-sprint/research.md`
- [ ] T004 Add `data-model.md` for Dashboard KPIs/Health/Pages `specs/004-next-sprint/data-model.md`
- [ ] T005 Add `contracts/` with OpenAPI stubs for `/api/dashboard/*` `specs/004-next-sprint/contracts/dashboard.yaml`
- [ ] T006 Add `quickstart.md` with validation commands `specs/004-next-sprint/quickstart.md`

## Phase 2 — Foundational
- [ ] T007 Define a11y checklist for interactive components `specs/004-next-sprint/research.md`
- [ ] T008 Establish NFR thresholds (render <500ms, interaction <200ms, build <90s) `specs/004-next-sprint/research.md`
- [ ] T009 [P] Configure Storybook manualChunks in `domains/storybook/.storybook/main.ts`

## Phase 3 — US1 Dashboard APIs (P1)
Goal: Provide real endpoints for KPIs/Health/Pages replacing mocks.
Test criteria: Endpoints return data with 99% uptime locally; SWR hooks show data without console errors.
- [ ] T010 [P] [US1] Implement KPIs endpoint `apps/studio/src/app/api/dashboard/summary/route.ts`
- [ ] T011 [P] [US1] Implement Health endpoint `apps/studio/src/app/api/dashboard/health/route.ts`
- [ ] T012 [P] [US1] Implement Pages endpoint `apps/studio/src/app/api/dashboard/pages/route.ts`
- [ ] T013 [US1] Add response types and error handling (try/catch) `apps/studio/src/app/api/dashboard/*/route.ts`
- [ ] T014 [US1] Wire SWR hooks and replace mocks `apps/studio/src/app/dashboard/useDashboardData.ts`

## Phase 4 — US2 A11y & High-Contrast (P1)
Goal: Achieve WCAG 2.1 AA across interactive components.
Test criteria: Keyboard-only navigation; focus visible; contrast ≥ 4.5:1; a11y addon passes.
- [ ] T015 [P] [US2] Add high-contrast tokens `packages/tokens/src/tokens.json`
- [ ] T016 [US2] Apply contrast tokens in DS components (Dropdown, DataTable, Modal, StatsCard) `packages/design-system/src/components/*/*.module.css`
- [ ] T017 [US2] Add keyboard navigation notes/stories "edge" `domains/storybook/src/stories/*/*.stories.tsx`

## Phase 5 — US3 Storybook Ops (P2)
Goal: Optimize preview bundle and document edge stories.
Test criteria: Storybook build without chunk warnings; edge stories render.
- [ ] T018 [P] [US3] Configure rollup manualChunks `domains/storybook/.storybook/main.ts`
- [ ] T019 [US3] Add edge stories (error/empty/loading/long labels) `domains/storybook/src/stories/*/*.stories.tsx`
- [ ] T020 [US3] Update a11y parameters and docs `domains/storybook/.storybook/preview.ts`

## Phase 6 — US4 Backoffice Hub Enhancements (P2)
Goal: Improve pagination/filter/export/import flows.
Test criteria: Flows operate with mock data; no console errors; UX documented.
- [ ] T021 [US4] Implement server-side pagination contract `specs/004-next-sprint/contracts/pages.yaml`
- [ ] T022 [US4] Refactor Backoffice pages to use server pagination `domains/studio/src/app/backoffice/banco-questoes/page.tsx`
- [ ] T023 [US4] Robust export/import with validation `domains/studio/src/app/api/pages/export/route.ts`

## Final Phase — Polish
- [ ] T024 Update docs and dashboards `PROGRESS_DASHBOARD.md`
- [ ] T025 Record NFR measurements in status file `SPRINT3_FINAL_STATUS.md`
- [ ] T026 Prepare `CHANGELOG.md` entry for Sprint `CHANGELOG.md`

## Dependencies
- US1 → US2: A11y tokens depend on some endpoints usage contexts (can start in parallel).
- US1 → US3: Storybook edge stories benefit from real data; manualChunks is parallelizable.
- US2 independent of US3; US4 can start after US1 basic endpoints.

## Parallel Examples
- T010/T011/T012 (US1 endpoints) in paralelo.
- T015 (tokens) e T018 (manualChunks) em paralelo.
- T019 edge stories em paralelo com T014 SWR wiring.

## Implementation Strategy
- MVP: Completar US1 (endpoints + SWR) para dados reais.
- Incremental: aplicar A11y/contrast, otimizações de Storybook, e melhorias de Backoffice.
