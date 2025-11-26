# Quickstart – Dashboard Hydration Resilience

## Prerequisites
1. Node 22.21.1 (`nvm use` reads `.nvmrc`).
2. pnpm 9.14.4+ (`pnpm --version`).
3. Dependencies installed with `pnpm install --frozen-lockfile`.
4. Clean workspace (no failing `pnpm lint`, `pnpm -r type-check`, or `pnpm build`).

## Local Workflow
1. **Bootstrap dev servers**
   ```pwsh
   pnpm build:tokens
   pnpm build:design-system
   pnpm --filter studio dev
   ```
   - Keep console open to observe hydration warnings.

2. **Trigger hydration scenario**
   - Open `http://localhost:3000/dashboard`.
   - Toggle the Fusion (or comparable) extension that injects `fusion-extension-loaded` into `<html>`.
   - Reload the page 5x; confirm no warnings appear after fixes.

3. **Run automated hydration test**
   ```pwsh
   pnpm test:dashboard-hydration
   ```
   _Alias_: `pnpm --filter studio test:dashboard-hydration` (runs `vitest run src/tests/dashboard-hydration/hydration.spec.ts`).
   - The test injects a mock extension class and throttles network if configured.
   - Output artifact (`DashboardRenderCheck`) stored under `./artifacts/dashboard-hydration/`.

4. **Review telemetry logs**
   - Check `apps/studio/.next/logs/dashboard.log` (or configured logger destination) for `HydrationSnapshot` entries.
   - Ensure `severity` stays `info` after fixes; any `warn/error` must be triaged.

5. **Update documentation**
   - `docs/qa-dashboard-testing.md`: add the new hydration checklist.
   - `domains/BackOffice/journeys/Dashboard/README.md`: document resiliency behavior + Studio slug link.
   - `SPRINT3_HEALTH_INDICATORS_REPORT.md`: note automation coverage.

6. **Before pushing**
   ```pwsh
   pnpm lint
   pnpm -r type-check
   pnpm build
   pnpm test:dashboard-hydration
   ```
   - Capture screenshots/logs showing clean `/dashboard` console for SpecKit evidence.
