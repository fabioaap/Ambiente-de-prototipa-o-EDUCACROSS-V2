# Research: Dashboard Hydration Resilience

## Decision 1 – Root layout normalization strategy
- **Decision**: Constrain `<html>` attributes inside `apps/studio/src/app/layout.tsx` by emitting a deterministic class list (`bg-neutral-950 text-neutral-50`, data-theme) and add a scoped `suppressHydrationWarning` on the `<html>` element only, so browser extensions that append classes (ex.: `fusion-extension-loaded`) no longer cause React to compare mismatched trees.
- **Rationale**: Next.js 15 App Router renders the root layout server-side; controlling the class list there ensures both server and client share identical markup before hydration. Restricting `suppressHydrationWarning` to the root maintains visibility into genuine mismatches deeper in the tree while preventing false positives triggered by third-party scripts.
- **Alternatives considered**:
  1. **Strip third-party classes via mutation observer** – Rejected because it fights user extensions and can create race conditions before hydration completes.
  2. **Disable problematic extensions in QA** – Rejected because designers/PMs cannot rely on all stakeholders disabling security tooling; we need resilient code instead.

## Decision 2 – Telemetry + observability path
- **Decision**: Capture `HydrationSnapshot` data whenever React fires `onRecoverableError` in dev/prod builds and send it through the existing `dashboardLogger` utility (JSON log with `route`, `serverAttributes`, `clientAttributes`, `extensionFingerprint`, `correlationId`). Surface summaries in the QA dashboard report referenced by `SPRINT3_HEALTH_INDICATORS_REPORT.md`.
- **Rationale**: Constitution principle “Typed APIs & Observable Dashboards” requires typed telemetry. `dashboardLogger` already feeds `/api/health` widgets; extending it keeps observability centralized and makes it easy for QA to diff server vs client DOM states without digging into local consoles.
- **Alternatives considered**:
  1. **Ad-hoc `console.warn` statements** – Rejected; they disappear in production builds and cannot be aggregated.
  2. **New API endpoint for hydration incidents** – Deferred; existing logging channel is enough and avoids schema churn.

## Decision 3 – Automated hydration regression test
- **Decision**: Add a dashboard hydration scenario to the Studio test suite that launches the app (either via Playwright or the existing integration harness under `pnpm --filter studio test`), injects a mock extension class before hydration, and fails if any `console.error` or `console.warn` messages match the React hydration signature.
- **Rationale**: QA guide (`docs/qa-dashboard-testing.md`) already mandates checking browser consoles. Automating that step prevents regressions and produces shareable evidence for SpecKit/CI.
- **Alternatives considered**:
  1. **Pure unit test with `renderToPipeableStream`** – Useful for deterministic HTML, but it would not catch integration issues with Next.js runtime or SWR; kept as optional helper, not primary gate.
  2. **Manual QA-only checklist** – Rejected since the constitution enforces automation-first quality gates.

## Decision 4 – Documentation + journey updates
- **Decision**: Update `docs/qa-dashboard-testing.md` with a new section covering extensions + slow network throttling, and add a “Hydration Resilience” note plus Studio slug link inside `domains/BackOffice/journeys/Dashboard/README.md`. Reference the new automation in sprint documents (e.g., `SPRINT3_HEALTH_INDICATORS_REPORT.md`).
- **Rationale**: “Documented Journeys Stay Traceable” demands that every change to `/dashboard` cross-links the responsible journey and QA process. Explicit instructions keep QA from mislabeling extension-caused warnings as product bugs.
- **Alternatives considered**:
  1. **Rely on commit messages/PR descriptions** – Not discoverable for PMs/Designers browsing the documentation tree.
  2. **Update only sprint summary files** – Insufficient because journey indexes remain the canonical source for feature-level traceability.
