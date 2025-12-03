# Tasks: Dashboard Hydration Resilience

**Input**: Design documents from `/specs/001-dashboard-hydration/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Run `pnpm install --frozen-lockfile` using the workspace manifest `package.json` (repo root) to ensure dependencies match Node 22.21.1/pnpm 9.14.4.
- [ ] T002 Capture baseline `pnpm lint`, `pnpm -r type-check`, and `pnpm build` output from repository root (referencing `pnpm-workspace.yaml`) and archive the results in `specs/001-dashboard-hydration/artifacts/baseline-ci.md`.
- [ ] T003 Record the current `/dashboard` hydration mismatch console trace while running `pnpm --filter studio dev` and save the log to `specs/001-dashboard-hydration/artifacts/baseline-console.md` for before/after comparison.

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T004 [P] Create `domains/studio/src/lib/hydration/types.ts` exporting the `HydrationSnapshot` and `DashboardRenderCheck` interfaces defined in `specs/001-dashboard-hydration/data-model.md`.
- [ ] T005 [P] Scaffold `domains/studio/src/tests/dashboard-hydration/hydration.spec.ts` with a failing placeholder test plus shared helpers in `domains/studio/src/tests/dashboard-hydration/helpers.ts` so the automation suite exists before story work begins.
- [ ] T006 Update `domains/studio/package.json` (and, if needed, root `package.json`) to expose a `test:dashboard-hydration` script that runs the new spec (`pnpm --filter studio test -- --group dashboard-hydration`) and document the command usage in `specs/001-dashboard-hydration/quickstart.md`.

**Checkpoint**: Foundation ready — user stories can begin.

---

## Phase 3: User Story 1 – Dashboard loads without hydration mismatch (Priority: P1) 🎯 MVP

**Goal**: `/dashboard` renders without React hydration warnings even when browser extensions mutate `<html>`.

**Independent Test**: With and without the Fusion (or equivalent) extension enabled, reload `/dashboard` five times and verify that no `A tree hydrated...` logs appear in the DevTools console, attaching evidence to `specs/001-dashboard-hydration/artifacts/us1-hydration-validation.md`.

### Implementation Tasks

- [x] T007 [US1] Implement `domains/studio/src/lib/hydration/normalizeRootAttributes.ts` to produce deterministic `<html>` class/data attributes and strip any extension-injected tokens before hydration.
- [x] T008 [US1] Update `domains/studio/src/app/layout.tsx` to call the normalization helper, set the canonical `lang`, `data-theme`, and class list, and add a scoped `suppressHydrationWarning` only on the `<html>` element.
- [x] T009 [P] [US1] Refactor `domains/studio/src/app/dashboard/page.tsx` to replace non-deterministic initial values (timestamps, random ordering) with static placeholders until SWR populates data, ensuring skeletons use consistent totals.
- [x] T010 [P] [US1] Add unit coverage for the normalization helper in `domains/studio/src/lib/hydration/__tests__/normalizeRootAttributes.test.ts` to lock the deterministic attribute contract.
- [x] T011 [US1] Rerun `/dashboard` with the targeted extension enabled and update `specs/001-dashboard-hydration/artifacts/us1-hydration-validation.md` (plus screenshots in `specs/001-dashboard-hydration/artifacts/us1/`) to prove the console stays clean.

**Checkpoint**: User Story 1 delivers a hydration-warning-free dashboard view.

---

## Phase 4: User Story 2 – Observability sinaliza divergências estruturais (Priority: P2)

**Goal**: Capture and surface `HydrationSnapshot` telemetry plus an automated regression test that fails on any hydration warning.

**Independent Test**: Run `pnpm --filter studio test -- --group dashboard-hydration` to inject a mock extension class; confirm the test fails when warnings exist and passes once fixes land, while new logs appear in `domains/studio/.next/logs/dashboard.log` with correlation IDs.

### Tests for User Story 2

- [ ] T012 [P] [US2] Implement the Playwright (or equivalent) scenario in `domains/studio/src/tests/dashboard-hydration/hydration.spec.ts` that mounts `/dashboard`, injects `fusion-extension-loaded`, toggles Slow 3G throttling, and asserts no hydration warnings are emitted.
- [ ] T013 [P] [US2] Extend the test helpers in `domains/studio/src/tests/dashboard-hydration/helpers.ts` to capture console output and serialize `DashboardRenderCheck` artifacts into `specs/001-dashboard-hydration/artifacts/us2-test-results.json`.

### Implementation for User Story 2

- [ ] T014 [US2] Enhance `domains/studio/src/lib/logger/dashboardLogger.ts` (or the module that exports it) to accept a `HydrationSnapshot` payload and persist structured JSON logs with `correlationId`.
- [ ] T015 [US2] Wire a global `onRecoverableError` handler inside `domains/studio/src/app/layout.tsx` that normalizes server/client attributes, builds a `HydrationSnapshot`, and forwards it to `dashboardLogger` without throwing.
- [ ] T016 [P] [US2] Create `domains/studio/src/lib/hydration/extensionFingerprint.ts` to derive fingerprints (e.g., `fusion-extension-loaded`) from attribute diffs so telemetry can group incidents.
- [ ] T017 [US2] Document the new telemetry + automated test workflow inside `docs/SPRINT3_HEALTH_INDICATORS_REPORT.md` (observability chapter) referencing log locations and the `test:dashboard-hydration` command.

**Checkpoint**: User Story 2 provides automated detection plus structured logs for any future hydration mismatch.

---

## Phase 5: User Story 3 – Documentação e QA cobrem extensões e redes lentas (Priority: P3)

**Goal**: QA and journey docs teach testers how to validate `/dashboard` under extension interference and throttled networks.

**Independent Test**: Follow the updated `docs/qa-dashboard-testing.md` checklist (including extension toggles and Slow 3G throttle) to reproduce the clean console result; ensure `domains/BackOffice/journeys/Dashboard/README.md` references the new resilience behavior and Studio slug.

### Implementation Tasks

- [ ] T018 [US3] Expand `docs/qa-dashboard-testing.md` with a dedicated section covering extension toggles, throttling setup, and evidence capture for hydration warnings.
- [ ] T019 [US3] Update `domains/BackOffice/journeys/Dashboard/README.md` to describe the hydration resilience flow, include the `/dashboard` slug link, and reference the automation artifacts.
- [ ] T020 [US3] Append the new QA steps and telemetry touchpoints to `SPRINT3_HEALTH_INDICATORS_REPORT.md`, ensuring the sprint report highlights the hydration regression guard.
- [ ] T021 [US3] Add a short troubleshooting note plus links to artifacts inside `specs/001-dashboard-hydration/quickstart.md` so future agents know how to reproduce the QA scenario.

**Checkpoint**: Documentation fully equips QA to validate hydration resilience independently.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T022 [P] Run the full quickstart workflow (`specs/001-dashboard-hydration/quickstart.md`) end-to-end, capturing logs/screenshots that prove clean consoles and passing tests, and store them in `specs/001-dashboard-hydration/artifacts/final-verification.md`.
- [ ] T023 Verify `pnpm lint`, `pnpm -r type-check`, `pnpm build`, and `pnpm --filter studio test -- --group dashboard-hydration` all pass after the changes, attaching summaries to `specs/001-dashboard-hydration/artifacts/final-ci.md`.
- [ ] T024 [P] Run `/spec` on the eventual PR and ensure SpecKit reports ✅ for documentation, tests, and dashboards, linking the output inside `specs/001-dashboard-hydration/artifacts/spec-report.md`.

---

## Dependencies & Execution Order

1. **Setup (Phase 1)** must complete before foundational work begins.
2. **Foundational (Phase 2)** blocks all user stories; it creates shared types, scripts, and test scaffolding.
3. **User Story 1 (P1)** can start immediately after Phase 2 and delivers the MVP (hydration-safe dashboard).
4. **User Story 2 (P2)** depends on the logging hooks created in Phases 2–3 and introduces telemetry + automated tests.
5. **User Story 3 (P3)** relies on User Stories 1 and 2 to be complete so documentation reflects the final behavior.
6. **Polish (Phase 6)** runs only after all desired stories are complete to validate CI, quickstart, and SpecKit gates.

## Parallel Execution Examples

- **Setup**: T001 (install) must precede others, but T002 and T003 can run in parallel once dependencies are ready.
- **Foundational**: T004 (types) and T005 (test scaffolding) touch separate directories and can proceed concurrently; T006 can run once T005 defines the test entry point.
- **User Story 1**: T007 (helper) and T009 (dashboard render refactor) operate on different files, so they can be parallelized after T008 lands; T010 (unit tests) can run alongside T009 since it targets the helper module only.
- **User Story 2**: T012 and T013 are parallel test tasks; T014–T016 modify distinct modules (logger vs fingerprint util) and can proceed simultaneously after T004 types exist.
- **User Story 3**: T018–T021 each update different docs (`docs/`, `domains/`, `specs/`), allowing parallel editing once story prerequisites are satisfied.

## Implementation Strategy

1. Deliver **MVP** by finishing Phases 1–3 so `/dashboard` loads cleanly without hydration warnings.
2. Layer observability (Phase 4) immediately after MVP to ensure regressions are caught automatically.
3. Update documentation (Phase 5) so QA and journey stakeholders can validate the new flow independently.
4. Close with Polish tasks (Phase 6) to validate CI, run quickstart, and capture SpecKit `/spec` evidence before opening the PR.
