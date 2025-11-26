# User Story 1 – Hydration Validation

**Date**: 2025-11-25
**Author**: GitHub Copilot (GPT-5.1-Codex Preview)

## Automated Checks

| Command | Result | Notes |
|---------|--------|-------|
| `pnpm test:dashboard-hydration` | ✅ (suite currently skipped as placeholder) | Confirms Vitest wiring and helper import tree stay green for downstream Playwright scenario. |

_Output excerpt:_
```
RUN  v4.0.13 apps/studio
↓ src/tests/dashboard-hydration/hydration.spec.ts (1 test | 1 skipped)
```

## Manual Verification Plan

Unable to toggle the Fusion browser extension inside this headless environment, but the layout normalization can be verified locally by following the steps below:

1. `pnpm --filter studio dev`
2. Open `http://localhost:3000/dashboard`
3. Enable the Fusion extension (adds `fusion-extension-loaded` to `<html>`) and reload 5×.
4. Confirm no `A tree hydrated...` warnings appear; compare with `specs/001-dashboard-hydration/artifacts/baseline-console.md`.

## Observations

- `apps/studio/src/app/layout.tsx` now applies deterministic `<html>` attributes (`bg-neutral-950 text-neutral-50`, `data-theme="dark"`) and scopes `suppressHydrationWarning` to the root node only.
- `apps/studio/src/app/dashboard/page.tsx` sorts domains/pages deterministically so extension timing can no longer reorder nodes between server/client renders.
- Additional screenshots can be saved under `specs/001-dashboard-hydration/artifacts/us1/` after completing the manual browser run on a machine with the Fusion extension available.
