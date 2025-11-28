# EDUCACROSS Copilot Playbook
- Status: Sprint 3 Fase 3/4 (Dashboard & Game Hub); sync context via SPRINT3_DOCUMENTATION_INDEX.md before coding.

## Platform Overview
- Stack: Node 22.21.1 (.nvmrc enforced), pnpm 9.14.4+, TypeScript 5 strict, Next.js 15 App Router, SWR, React 18.
- Repo map: domains/studio (Next app + Puck), domains/storybook (ESM catalog), packages/design-system, packages/tokens, code-to-figma/, domains/ journeys.
- Data flow: design-system exports feed Storybook and Studio; Studio dashboard consumes /api/dashboard/* handlers backed by local JSON mocks.

## Setup & Commands
- Verify node --version and pnpm --version before installs; always run pnpm install --frozen-lockfile.
- Build order matters: pnpm build:tokens -> pnpm build:design-system -> pnpm build (studio + storybook).
- Quality gate every PR: pnpm lint, pnpm -r type-check, pnpm build; fix warnings before commit.
- Dev servers: pnpm dev:studio (3000) and pnpm dev:storybook (6006); kill stray node processes if ports stay busy.

## Workflow Expectations
- Branch names feature/{area}-{desc}; commits follow type(scope): summary (issue #XX).
- After opening a PR, comment /spec to trigger SpecKit and address every reported gap before merge.
- sprint-2-validation.yml mirrors build/lint/type-check and additional API/a11y checks; reproduce locally when CI fails.
- Sprint prompts live in SPRINT3_EXECUTION_DETAILED.md; keep dashboard context docs (SPRINT3_FINAL_STATUS.md, PROGRESS_DASHBOARD.md) updated as you work.

## Design System & Tokens
- Components in packages/design-system/src/components/* require 'use client', React.forwardRef, CSS Modules, and fully documented props.
- Export new components via packages/design-system/src/index.ts and add matching stories under domains/storybook.
- Styling must reference tokens from packages/tokens/src/tokens.json; regenerate with pnpm build:tokens after edits.
- Register DS components in domains/studio/src/config/puck.config.tsx so Puck and Studio pages stay in sync.

## Studio, Dashboard, APIs
- domains/studio/src/app/dashboard uses client components with SWR, skeleton placeholders, and ErrorBanner fallbacks; mirror existing KPIGrid/HealthSection patterns.
- APIs live under domains/studio/src/app/api/{segment}/route.ts; declare response interfaces, wrap in try/catch, and Response.json errors with status codes.
- Maintain parity across /api/dashboard/summary, /api/dashboard/health, /api/dashboard/pages, /api/health, and /api/health/metrics when adjusting data shapes.
- Keep Studio pages (domains/studio/src/app/[[...slug]]/page.tsx) aligned with domains docs so dashboard links resolve.

## Journeys & Content
- Each domains/{domain}/journeys/{journey}/ folder needs README.md (objective, status, components, links), notas.md, and links.md per template.
- Update domains/README.md and PROGRESS_DASHBOARD.md whenever you add or rename a journey so stakeholders can find it.

## Code-to-Figma
- code-to-figma/figma-sync-engine converts Storybook markup to Figma JSON; follow README (pnpm install, pnpm dev, pnpm test) before changing parsers.
- Maintain semantic markup in Storybook stories, because the sync engine only understands design-system components and predictable HTML.

## Validation Checklist
- Before merge: pnpm build, pnpm lint, pnpm -r type-check, Storybook stories render, /dashboard works without console errors.
- Ensure SpecKit report is fully green and document decisions in README.md or SPRINT3_FINAL_STATUS.md to keep history traceable.
