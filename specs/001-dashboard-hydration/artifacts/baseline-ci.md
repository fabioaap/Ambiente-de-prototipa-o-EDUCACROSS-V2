# Baseline CI Results – 2025-11-25

_All commands executed from repo root after `pnpm install --frozen-lockfile`._

## pnpm lint
- Command: `pnpm lint`
- Result: Completed with **0 errors / 1 warning** (`Tokens.stories.tsx:127:52` – `@typescript-eslint/no-explicit-any`).
- Notes: Turbo cache warm-up emitted stale pid warning (expected).

## pnpm -r type-check
- Command: `pnpm -r type-check`
- Result: ✅ All workspace type-checks passed.

## pnpm build
- Command: `pnpm build` (runs tokens → design-system → studio → storybook).
- Result: ✅ Successful.
- Warnings:
  - tsup reported condition order warning for `packages/design-system/package.json` (`types` condition after `import`/`require`).
  - Next.js build noted ESLint plugin detection warning (existing config forwards to shared preset).
  - Storybook build emitted Rollup chunk-size and `use client` directive bundling warnings (unchanged from baseline).

Artifacts captured to establish before/after comparison for dashboard hydration work.
