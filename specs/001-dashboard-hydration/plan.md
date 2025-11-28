# Implementation Plan: Dashboard Hydration Resilience

**Branch**: `001-dashboard-hydration` | **Date**: 2025-11-25 | **Spec**: `specs/001-dashboard-hydration/spec.md`
**Input**: Feature specification from `/specs/001-dashboard-hydration/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command (implemented via `.specify/scripts/powershell/setup-plan.ps1`).

## Summary

`/dashboard` exhibits React hydration warnings whenever browser extensions inject classes/attributes into `<html>`, blocking QA and masking regressions. The feature ensures the root layout emits deterministic attributes, hardens `/dashboard` against client mutations, adds structured telemetry for any recoverable hydration errors, and updates QA/journey docs plus automated checks so dashboard loads remain error-free even on slow networks or extension-heavy browsers.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x + Next.js 15 (React 18)  
**Primary Dependencies**: Next.js App Router, SWR, Shadcn UI (scoped to Studio/Dashboard), `@prototipo/design-system`, `dashboardLogger` telemetry utilities  
**Storage**: N/A (client state only; data fetched from existing `/api/dashboard/*` routes)  
**Testing**: Existing pnpm scripts (`pnpm lint`, `pnpm -r type-check`, `pnpm --filter studio test`), plus dashboard hydration automation (end-to-end or integration)  
**Target Platform**: Web (Studio app at `apps/studio`, served via Next.js)  
**Project Type**: Web monorepo (pnpm workspaces with apps/packages)  
**Performance Goals**: Eliminate hydration warnings in ≥95% of automated runs; maintain skeleton render under 400 ms on Slow 3G per SC-003  
**Constraints**: Must keep dev/build pipeline green (tokens → design-system → studio/storybook), honor Node 22.21.1/pnpm 9.14.4, avoid console errors, and respect Shadcn scope  
**Scale/Scope**: Limited to BackOffice Dashboard journey (`domains/BackOffice/journeys/Dashboard`), `/dashboard` route, and associated QA/telemetry docs

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.* Violations require entries in **Complexity Tracking**.

1. **Run-Ready Prototypes Only** – Work happens inside `apps/studio` (layout + `/dashboard`). Builds stay green by running the mandated sequence (`pnpm build:tokens`, `pnpm build:design-system`, `pnpm build --filter studio`, then lint/type-check). Hydration fix removes console noise that currently blocks QA, and new automated test will run in CI to prevent regressions.
2. **Single Design System Surface** – `/dashboard` already uses Shadcn + DS primitives; fixes will keep UI within `apps/studio/src/app/{dashboard}` and reuse existing components (Card, Badge, Skeleton, Progress). No new tokens needed; `'use client'` boundaries remain in page-level client component only.
3. **Documented Journeys Stay Traceable** – Update `domains/BackOffice/journeys/Dashboard/README.md`, `docs/qa-dashboard-testing.md`, and referenced sprint docs (e.g., `SPRINT3_HEALTH_INDICATORS_REPORT.md`) to describe the hydration resiliency steps and new QA checklist items.
4. **Typed APIs & Observable Dashboards** – No API schema changes, but telemetry contracts expand: `dashboardLogger` (or companion utility) will emit structured `HydrationSnapshot` entries. `/api/health` does not change directly; instrumentation remains client-side but documented for observability consumers.
5. **Automation-First Quality Gates** – This plan/spec pair precedes `/speckit.tasks`. We will capture Phase 0 research + Phase 1 design artifacts here, then ensure `/spec` passes on the PR. CI evidence: attach screenshots/logs from hydration test plus build/lint/type-check outputs per constitution.

**Post-Phase-1 Review**: Research/data-model/contracts/quickstart artifacts now exist, so no constitution violations remain. Any drift will be tracked in Complexity Tracking if new constraints appear during implementation.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
apps/
  studio/
    src/app/layout.tsx             # Normalize <html> attributes + logging hook
    src/app/dashboard/page.tsx     # Client component consuming summary API
    src/app/api/dashboard/summary/ # Existing data dependency (read-only)
    src/tests/dashboard-hydration/  # New automation (Playwright or Vitest harness)
    src/lib/logger/dashboardLogger.ts # Structured telemetry helper

docs/
  qa-dashboard-testing.md          # QA checklist updates for extensions + throttling
  SPRINT3_HEALTH_INDICATORS_REPORT.md

domains/
  BackOffice/journeys/Dashboard/README.md  # Journey traceability updates
```

**Structure Decision**: Single Next.js app inside `apps/studio` with supporting documentation under `docs/` and journey metadata under `domains/BackOffice/journeys/Dashboard`. No backend/package changes required beyond telemetry utilities already colocated with Studio.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
