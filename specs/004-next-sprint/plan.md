# Next Sprint — Implementation Plan

Feature: Dashboard Finalization, A11y/NFRs, Storybook Ops, Backoffice Hub
Tech Stack: Node 22, pnpm 9.14+, TypeScript 5, Next.js 15 (App Router), SWR, Storybook 8 (Vite), tsup, Radix UI.

## Libraries & Decisions
- Data fetching: SWR with retry/backoff for dashboard endpoints.
- UI: Design System components, Radix for Dropdown/menus.
- Storybook: Vite builder; custom `viteFinal` + manualChunks to optimize bundles.
- A11y: a11y addon; WCAG 2.1 AA targets; high-contrast tokens.

## Project Structure
- APIs: `apps/studio/src/app/api/dashboard/*/route.ts`
- Hooks: `apps/studio/src/app/dashboard/useDashboardData.ts`
- DS Styles: `packages/design-system/src/components/*/*.module.css`
- Tokens: `packages/tokens/src/tokens.json`
- Storybook config: `domains/storybook/.storybook/main.ts`, `preview.ts`
- Stories: `domains/storybook/src/stories/*/*.stories.tsx`

## Phasing
- P1: US1 Dashboard APIs, US2 A11y & High-Contrast
- P2: US3 Storybook Ops, US4 Backoffice Hub Enhancements

## Deliverables
- Real endpoints for KPIs/Health/Pages
- High-contrast support in DS
- Optimized Storybook preview bundle + edge stories
- Improved Backoffice flows (pagination/export/import)
