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
   - Check `domains/studio/.next/logs/dashboard.log` (or configured logger destination) for `HydrationSnapshot` entries.
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

---

## Troubleshooting

### Issue: Hydration warnings still appear

**Symptoms**:
- Console shows `Hydration failed` or `Did not expect server HTML` errors
- Warnings occur even with `suppressHydrationWarning` on `<html>`

**Debug Steps**:
1. **Check if warning is for root element or deeper in tree**:
   - `suppressHydrationWarning` only covers the `<html>` element
   - If warning is inside `/dashboard` content, review `page.tsx` for non-deterministic values

2. **Verify extension class filtering**:
   - Open DevTools → Elements → Inspect `<html>`
   - Check for extension classes (fusion, darkreader, etc.)
   - Verify `normalizeRootAttributes` is stripping these classes

3. **Check for timing issues**:
   - Extensions may inject classes after initial hydration
   - Monitor console during first 5 seconds after page load

4. **Review telemetry logs**:
   ```javascript
   // In browser console
   JSON.parse(localStorage.getItem('dashboard-logger'))
   ```
   - Check for `HydrationSnapshot` entries
   - Review `extensionFingerprint` to identify culprit

**Solutions**:
- **Extension not in blocklist**: Add pattern to `normalizeRootAttributes` blocklist
- **Non-deterministic content**: Replace timestamps/random values with static placeholders
- **Race condition**: Increase hydration timeout or adjust SWR configuration

---

### Issue: Automated tests fail

**Symptoms**:
- `pnpm test:dashboard-hydration` exits with errors
- Specific test cases fail: `passes with fusion extension mock`, etc.

**Debug Steps**:
1. **Run tests with verbose output**:
   ```pwsh
   pnpm --filter studio test:dashboard-hydration -- --reporter=verbose
   ```

2. **Check test helper implementation**:
   - Review `domains/studio/src/tests/dashboard-hydration/helpers.ts`
   - Verify console capture logic is working

3. **Inspect DashboardRenderCheck artifact**:
   ```typescript
   // Test output shows:
   {
     hasMismatch: true,
     warnings: ["Hydration failed because..."],
     networkProfile: "slow-3g",
     extensionProfile: "fusion-mock",
     durationMs: 1234
   }
   ```
   - Check `warnings` array for specific error messages

4. **Validate happy-dom environment**:
   - Ensure `vitest.config.ts` specifies `environment: 'happy-dom'`
   - Check that DOM APIs are available in test

**Solutions**:
- **Console capture not working**: Verify `console.error` override in test helper
- **Timing issues**: Increase `durationMs` threshold or add explicit waits
- **Environment mismatch**: Ensure test runs in browser-like environment

---

### Issue: Dashboard loads slowly on Slow 3G

**Symptoms**:
- Dashboard takes >10 seconds to show data on throttled network
- Skeleton placeholders visible for extended period

**Expected Behavior**:
- Skeleton render: < 400ms
- Full data load: < 10s on Slow 3G

**Debug Steps**:
1. **Check network waterfall**:
   - DevTools → Network tab
   - Review request timing for `/api/dashboard/summary`
   - Look for blocking requests or cascading fetches

2. **Verify SWR configuration**:
   - Check `useSWR` options in `dashboard/page.tsx`
   - Ensure no unnecessary `revalidateOnFocus` or `revalidateOnReconnect`

3. **Inspect payload sizes**:
   - Review API response sizes
   - Check if data can be paginated or reduced

**Solutions**:
- **Large payloads**: Implement pagination for pages table
- **Cascading fetches**: Combine APIs into single summary endpoint
- **No caching**: Enable SWR caching with appropriate `dedupingInterval`

---

### Issue: Extension fingerprint not detected

**Symptoms**:
- Telemetry logs show `extensionFingerprint: undefined`
- Expected extension class present in `<html>` but not captured

**Debug Steps**:
1. **Check attribute snapshot timing**:
   - `HydrationErrorObserver` captures snapshot early
   - Some extensions inject classes after React hydration

2. **Verify extension patterns**:
   - Review `extensionFingerprint.ts` detection patterns
   - Check if extension uses different naming convention

3. **Inspect serverAttributes vs clientAttributes**:
   ```javascript
   // In HydrationSnapshot log
   serverAttributes: { class: "bg-neutral-950 text-neutral-50" }
   clientAttributes: { class: "bg-neutral-950 text-neutral-50 my-extension" }
   ```
   - Verify difference exists between server and client

**Solutions**:
- **Pattern mismatch**: Add extension pattern to `isExtensionToken()` function
- **Timing issue**: Adjust snapshot capture timing in `HydrationErrorObserver`
- **Extension not mutating `<html>`**: Expected behavior - no fingerprint needed

---

## Quick Reference

### File Locations

| File | Purpose |
|------|---------|
| `domains/studio/src/app/layout.tsx` | Root layout with normalization |
| `domains/studio/src/app/dashboard/page.tsx` | Dashboard page component |
| `domains/studio/src/lib/hydration/types.ts` | TypeScript interfaces |
| `domains/studio/src/lib/hydration/normalizeRootAttributes.ts` | Attribute normalization |
| `domains/studio/src/lib/hydration/extensionFingerprint.ts` | Fingerprint derivation |
| `domains/studio/src/lib/logger/dashboardLogger.ts` | Structured logger |
| `domains/studio/src/components/HydrationErrorObserver.tsx` | Error capture component |
| `domains/studio/src/tests/dashboard-hydration/` | Test suite |

### Commands

| Command | Purpose |
|---------|---------|
| `pnpm test:dashboard-hydration` | Run hydration regression tests |
| `pnpm --filter studio dev` | Start Studio dev server |
| `pnpm --filter studio build` | Build Studio for production |
| `pnpm lint` | Lint all workspaces |
| `pnpm -r type-check` | Type-check all packages |

### Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `NODE_ENV` | `development` | Enables console logging in dashboardLogger |

---

**Last Updated**: 2025-11-29  
**Feature**: Dashboard Hydration Resilience  
**Spec**: `specs/001-dashboard-hydration/`
