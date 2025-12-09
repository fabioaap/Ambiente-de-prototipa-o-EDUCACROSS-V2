# Tasks: Sprint 6 Execution

**Input**: Design documents from `specs/feature/sprint6-execution/`  
**Prerequisites**: spec.md (required), plan.md (implicit via copilot-instructions.md)  
**Timeline**: 2025-12-09 to 2025-12-20 (2-3 weeks)  
**Team Size**: 5-6 developers  
**Success Criteria**: P1 100% by Week 1 end, P2 80%+ by Week 2 end, P3 optional  

---

## Overview

Sprint 6 execution includes 20 total user stories across 4 phases:
- **Phase 1 (P1)**: 3 Critical fixes (CI/CD, TypeScript, Unit Tests) — ~4 days
- **Phase 2 (P2)**: 5 Production readiness features (E2E, Monitoring, Analytics, Docs, CSV) — ~5 days
- **Phase 3 (P2)**: 7 Sprint 3 moved items (2 DS components, 1 Puck integration, 3 journeys, 1 index refactor) — ~6 days
- **Phase 4 (P3)**: Enhancements (optional, deferred)

**Total Effort**: 17.25 person-days across 5-6 team members.

---

## Phase 1: Critical Fixes (P1 - Week 1)

### US1.1: CI/CD Fix (1 day)

- [ ] T001 [P] [US1.1] Debug GitHub Actions workflow at `.github/workflows/sprint-2-validation.yml` — identify why jobs are failing or skipped
- [ ] T002 [P] [US1.1] Remove `continue-on-error: true` overrides from all workflow jobs to expose real failures
- [ ] T003 [P] [US1.1] Fix build step errors: ensure `pnpm build:tokens`, `pnpm build:design-system`, `pnpm build` succeed locally
- [ ] T004 [US1.1] Update `.github/workflows/sprint-2-validation.yml` with corrected steps and reduce run time to <10 min total
- [ ] T005 [US1.1] Test CI workflow on feature branch — merge trigger should run and validate cleanly (0 failures)
- [ ] T006 [US1.1] Update `docs/github-actions-guide.md` with fixes applied and troubleshooting section

**Dependencies**: None  
**Test Criteria**: All workflow jobs pass on feature branch, `git push` triggers green checks, run time <10 min

---

### US1.2: TypeScript Type Safety (2 days)

- [ ] T007 [P] [US1.2] Run `pnpm -r type-check 2>&1 | grep "error"` to identify all 22 type warnings (current count)
- [ ] T008 [P] [US1.2] Audit Storybook type errors in `apps/storybook/` — likely `@ts-expect-error` annotations or missing prop types
- [ ] T009 [P] [US1.2] Review Design System component prop types in `packages/design-system/src/components/*/` — ensure all props documented with JSDoc
- [ ] T010 [P] [US1.2] Check API route handlers in `apps/admin/src/app/api/` for missing return type annotations
- [ ] T011 [US1.2] Fix Storybook import/type issues: resolve circular dependencies, add missing `React` imports, type story args
- [ ] T012 [US1.2] Fix Design System prop type gaps: add JSDoc comments, use proper TypeScript interfaces instead of `any`
- [ ] T013 [US1.2] Fix API route return types: annotate handlers with `Response`, specify response shape interfaces
- [ ] T014 [US1.2] Run `pnpm -r type-check` and verify 0 warnings (was 22 before sprint)
- [ ] T015 [US1.2] Verify TypeScript configuration in `tsconfig.json` — strict mode enabled (noImplicitAny, strictNullChecks, etc.)

**Dependencies**: None  
**Test Criteria**: `pnpm -r type-check` returns 0 warnings, no `@ts-expect-error` annotations remain

---

### US1.3: Unit Test Fixes (1 day)

- [ ] T016 [P] [US1.3] Run `pnpm test` and identify which 2 of 76 tests are failing (currently 74/76 = 97.4%)
- [ ] T017 [P] [US1.3] Analyze failing test output: flaky assertions, missing mocks, environment setup issues
- [ ] T018 [P] [US1.3] Fix flaky tests: increase timeouts, mock async operations, stabilize randomness (seeds, fixed data)
- [ ] T019 [US1.3] Fix broken assertions: update test expectations to match current implementation
- [ ] T020 [US1.3] Run `pnpm test` and verify 76/76 passing consistently (rerun 3x to confirm no flakiness)
- [ ] T021 [US1.3] Verify test coverage maintained at ≥95% via `pnpm test --coverage`
- [ ] T022 [US1.3] Check for skipped tests (`it.skip`, `xit`): document reason in comment if intentional

**Dependencies**: None  
**Test Criteria**: `pnpm test` returns 76/76 PASS, coverage ≥95%, CI test step <2 min

---

## Phase 2: Production Readiness (P2 - Week 1-2)

### US2.1: E2E Test Suite (2 days)

- [ ] T023 [P] [US2.1] Install Playwright dependencies: `pnpm add -D @playwright/test @testing-library/playwright`
- [ ] T024 [P] [US2.1] Create `apps/admin/e2e/playwright.config.ts` with 3 browsers (Chromium, Firefox, WebKit) and base URL
- [ ] T025 [P] [US2.1] Create e2e test structure: `apps/admin/e2e/tests/` folder with `dashboard.spec.ts`, `studio.spec.ts`
- [ ] T026 [US2.1] Implement Dashboard journey E2E test: navigate to `/dashboard`, verify KPI grid loads, health metrics render, page list displays
- [ ] T027 [US2.1] Implement Studio journey E2E test: navigate to Studio, create page, edit title, save, verify in list, publish (if applicable)
- [ ] T028 [US2.1] Add screenshot/video capture on failure in playwright config: `screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`
- [ ] T029 [US2.1] Update `pnpm.yaml` with test:e2e script: `"test:e2e": "playwright test"`
- [ ] T030 [US2.1] Run `pnpm test:e2e` locally and verify all tests pass (<5 min total execution)
- [ ] T031 [US2.1] Add E2E step to `.github/workflows/sprint-2-validation.yml` (runs after build, stores artifacts)

**Dependencies**: US1.1 (CI/CD must be stable)  
**Test Criteria**: ≥80% feature coverage, 0 test failures, execution <5 min, screenshot artifacts on failure

---

### US2.2: Monitoring Setup (1 day)

- [ ] T032 [P] [US2.2] Install Sentry SDK: `pnpm add @sentry/nextjs` in `apps/admin/`
- [ ] T033 [P] [US2.2] Create `apps/admin/instrumentation.ts` with Sentry initialization (DSN from env var, environment = staging/prod)
- [ ] T034 [P] [US2.2] Configure Sentry in `apps/admin/next.config.js`: use `withSentryConfig()` wrapper
- [ ] T035 [US2.2] Create Error Boundary at `apps/admin/src/app/error.tsx` that sends exceptions to Sentry
- [ ] T036 [US2.2] Update API route handlers in `apps/admin/src/app/api/` to catch errors and send to Sentry with context (user, endpoint, timestamp)
- [ ] T037 [US2.2] Configure source map upload in CI: add `@sentry/cli` release step in `.github/workflows/`
- [ ] T038 [US2.2] Set up Sentry alert rules: trigger notification when error rate >10/hour
- [ ] T039 [US2.2] Test locally: simulate error in dashboard, verify Sentry dashboard receives event with source map
- [ ] T040 [US2.2] Document Sentry setup in `docs/monitoring.md` (DSN setup, error context, alerts, retention policy)

**Dependencies**: None  
**Test Criteria**: Errors tracked in Sentry dashboard, source maps resolved, alert rules configured, doc complete

---

### US2.3: Analytics Integration (1 day)

- [ ] T041 [P] [US2.3] Choose analytics platform (GA4 or Mixpanel) — recommend GA4 for simplicity
- [ ] T042 [P] [US2.3] Install GA4 package: `pnpm add @react-ga/core @react-ga/hooks` in `apps/admin/`
- [ ] T043 [P] [US2.3] Initialize GA4 in `apps/admin/src/app/layout.tsx` with Measurement ID (from env var)
- [ ] T044 [US2.3] Set up auto page view tracking: wrap app with GA PageView hook or use Next.js middleware
- [ ] T045 [US2.3] Add custom event tracking for key actions:
  - Dashboard load: `event('dashboard_view', { load_time_ms })`
  - Page create: `event('page_created', { page_type, template })`
  - Export CSV: `event('export_csv', { count, format })`
- [ ] T046 [US2.3] Set user properties: session ID, journey context (admin/studio), role
- [ ] T047 [US2.3] Verify Google Analytics privacy compliance: add privacy policy link, document cookie consent (if applicable)
- [ ] T048 [US2.3] Test locally: open GA debug view, navigate dashboard, verify events logged in GA4 real-time dashboard
- [ ] T049 [US2.3] Document analytics setup in `docs/analytics.md` (events list, property schema, dashboard access)

**Dependencies**: None  
**Test Criteria**: GA4 real-time dashboard shows page views + custom events, doc complete, privacy policy reviewed

---

### US2.4: Documentation Templates (1 day)

- [ ] T050 [P] [US2.4] Create `docs/JOURNEY_TEMPLATE.md` with sections: Objective, Status, Components Used, Architecture Diagram, Testing Checklist, Performance Metrics, Links
- [ ] T051 [P] [US2.4] Create `docs/FEATURE_SPEC_TEMPLATE.md` with sections: User Stories, Acceptance Criteria, Dependencies, Epic, Priority, Effort, Notes
- [ ] T052 [P] [US2.4] Create `docs/API_TEMPLATE.md` with sections: Endpoint, Method, Query/Body Schema, Response Schema, Error Codes, Example
- [ ] T053 [US2.4] Migrate 3 existing journeys to new template: `domains/BackOffice/journeys/profile-journey/README.md`, `domains/studio/docs/`, `domains/storybook/docs/`
- [ ] T054 [US2.4] Create migration script `scripts/migrate-docs.sh`: batch updates journey READMEs to new template structure
- [ ] T055 [US2.4] Document template usage in `docs/README.md`: when to use each template, how to keep synchronized
- [ ] T056 [US2.4] Verify all migrated journeys build/lint clean: no broken links, valid markdown

**Dependencies**: None  
**Test Criteria**: 3+ journeys migrated, templates in `docs/`, migration script executable, links valid

---

### US2.5: CSV Enhancement (1.5 days)

- [ ] T057 [P] [US2.5] Create export format selector UI in dashboard: add dropdown with CSV, JSON, XML options next to Export button
- [ ] T058 [P] [US2.5] Implement CSV exporter: `src/lib/exporters/csv.ts` — convert data array to CSV string
- [ ] T059 [P] [US2.5] Implement JSON exporter: `src/lib/exporters/json.ts` — ensure schema matches OpenAPI spec
- [ ] T060 [P] [US2.5] Implement XML exporter: `src/lib/exporters/xml.ts` — validate against XSD (if applicable)
- [ ] T061 [US2.5] Create importer router at `apps/admin/src/app/api/import/route.ts` that detects format and calls appropriate parser
- [ ] T062 [US2.5] Implement JSON importer: `src/lib/importers/json.ts` with schema validation via Zod
- [ ] T063 [US2.5] Implement XML importer: `src/lib/importers/xml.ts` with schema validation
- [ ] T064 [US2.5] Add file upload UI in dashboard: accept CSV, JSON, XML files, parse and preview before confirm
- [ ] T065 [US2.5] Create unit tests for each exporter/importer: test 5+ valid scenarios + 3 error scenarios per format
- [ ] T066 [US2.5] Update `apps/admin/src/app/dashboard/page.tsx` with export/import UI integration
- [ ] T067 [US2.5] Test end-to-end: export CSV → import JSON → export XML → verify data integrity (round-trip)

**Dependencies**: None  
**Test Criteria**: All 3 formats export/import correctly, error messages specify format issues, 8+ test cases per format, round-trip pass

---

## Phase 3: Sprint 3 Moved Items (P2 - Week 2)

### US3.1: Progress Component (2 hours)

- [ ] T068 [P] [US3.1] Create `packages/design-system/src/components/Progress/Progress.tsx` with:
  - Props: `value` (0-100, required), `variant` ('primary'|'success'|'warning'|'danger'), `size` ('sm'|'md'|'lg'), `animated` (boolean), `className`
  - Linear progress bar (default) + circular variant (via variant prop)
  - ARIA attributes: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
  - Responsive sizing based on `size` prop
- [ ] T069 [P] [US3.1] Create `packages/design-system/src/components/Progress/Progress.module.css` with:
  - Linear bar: flex container, colored background, transition animations
  - Circular: SVG-based or CSS border-radius based, color variants
  - Sizes: sm (24px), md (32px), lg (48px)
  - Tokens used: `--color-primary`, `--color-success`, `--color-warning`, `--color-danger`
  - Dark mode support
- [ ] T070 [US3.1] Export Progress from `packages/design-system/src/index.ts`
- [ ] T071 [US3.1] Create Storybook story file at `domains/storybook/src/stories/Progress.stories.tsx`:
  - 5 stories: Default (linear 50%), Circular, AllVariants (4 colors × linear + circular), Animated, AllSizes
  - Accessibility test: verify ARIA attributes present
- [ ] T072 [US3.1] Run `pnpm build:design-system` and verify Progress exports correctly
- [ ] T073 [US3.1] Run `pnpm dev:hub` and verify all Progress stories render without errors

**Dependencies**: None  
**Test Criteria**: Component compiles, all 5 stories visible in Storybook, ARIA attributes correct, CSS Modules used

---

### US3.2: Leaderboard Component (2.5 hours)

- [ ] T074 [P] [US3.2] Create `packages/design-system/src/components/Leaderboard/Leaderboard.tsx` with:
  - Props: `entries` (LeaderboardEntry[]), `maxEntries` (default 10), `loading` (boolean), `emptyMessage` (string)
  - Type: `LeaderboardEntry = { rank, playerId, name, avatar?, score, progress, isCurrentUser? }`
  - Render: ranked list with avatar, name, score, progress bar (uses Progress component)
  - Highlight current user: distinct background/border color
  - Keyboard nav: arrow keys move focus between entries, Enter to select
  - Loading state: skeleton loaders for each entry
- [ ] T075 [P] [US3.2] Create `packages/design-system/src/components/Leaderboard/Leaderboard.module.css` with:
  - Grid layout: rank (narrow), avatar (square), name (flex), score (narrow), progress bar (flex)
  - Mobile: stack layout (avatar → name/score on second line, progress below)
  - Tablet: hybrid (rank + name on left, score + progress on right)
  - Current user: background highlight, bold font
  - Hover state: light background, focus outline
  - Uses `Progress` component for progress bars
  - Tokens: `--color-primary`, `--space-*`, `--typography-*`
- [ ] T076 [US3.2] Export Leaderboard from `packages/design-system/src/index.ts`
- [ ] T077 [US3.2] Create Storybook story file at `domains/storybook/src/stories/Leaderboard.stories.tsx`:
  - 4 stories: Default (10 entries, current user highlighted), Top5, WithLoading (skeleton), Empty
  - Test keyboard nav in accessibility story
- [ ] T078 [US3.2] Run `pnpm build:design-system` and verify Leaderboard + Progress exports correctly
- [ ] T079 [US3.2] Run `pnpm dev:hub` and verify all Leaderboard stories render, Progress bars visible

**Dependencies**: US3.1 (Progress component must exist)  
**Test Criteria**: Component compiles, uses Progress internally, all 4 stories visible, keyboard nav functional

---

### US3.3: Puck DropZone Integration (2.5 hours)

**VALIDATION NOTE**: Technical audit (04/12/2025) confirmed this is NOT a blocker — dashboard works without DropZone. Consider deferring to Sprint 7+ if visual zone editing not immediately needed.

- [ ] T080 [P] [US3.3] Review Puck documentation: `@measured/puck/DropZone` API, zone structure, integration patterns
- [ ] T081 [P] [US3.3] Update `apps/studio/src/config/puck.config.tsx`: import DropZone, define zones for each component that needs editing
- [ ] T082 [US3.3] Test DropZone in Studio editor: verify no console errors, components can be dragged into zones, JSON reflects zone structure
- [ ] T083 [US3.3] Update puck.config schema: ensure `zones` array in component definitions (if using DropZone)
- [ ] T084 [US3.3] Create test file `apps/studio/src/config/puck.config.test.ts`: verify DropZone imports, component schema valid
- [ ] T085 [US3.3] Document DropZone usage in `docs/puck-zones-implementation.md`: when to use zones, example component, troubleshooting
- [ ] T086 [US3.3] Run `pnpm build` and verify studio builds without errors
- [ ] T087 [US3.3] Verify dashboard still works (no regression): navigate to `/dashboard`, load KPIs, verify no console errors

**Dependencies**: None (Optional — deferred if not immediately needed)  
**Test Criteria**: DropZone imports work, no console errors, component schema valid, dashboard regression test pass

---

### US3.4: BackOffice Journeys (5 hours)

- [ ] T088 [P] [US3.4] Create folder structure: `domains/BackOffice/journeys/admin-workflow/` with subfolders for 3 screens
- [ ] T089 [P] [US3.4] Create Screen 1 (Login): `domains/BackOffice/journeys/admin-workflow/login.tsx`
  - Form with email + password inputs
  - Form validation: email format, password length ≥8
  - Submit button with loading state
  - Error banner for invalid credentials
  - Uses: Input, Button, ErrorBanner components from @prototipo/design-system
- [ ] T090 [P] [US3.4] Create Screen 2 (Dashboard): `domains/BackOffice/journeys/admin-workflow/dashboard.tsx`
  - KPI grid (4 cards: users, content, errors, uptime)
  - Stats cards with sparklines (if Progress component available)
  - Navigation menu on sidebar
  - Uses: KPIGrid, StatsCard, Navigation components
- [ ] T091 [P] [US3.4] Create Screen 3 (Profile): `domains/BackOffice/journeys/admin-workflow/profile.tsx`
  - Profile form with: name, email, role, avatar upload
  - Edit mode toggle
  - Save/cancel buttons
  - Success/error messages
  - Uses: Form, Avatar, Input, Button from @prototipo/design-system
- [ ] T092 [US3.4] Create `domains/BackOffice/journeys/admin-workflow/index.tsx`: exports all 3 screens as named exports or default
- [ ] T093 [US3.4] Create `domains/BackOffice/journeys/admin-workflow/README.md`:
  - Objective: Enable admin workflows
  - Status: ✅ Complete
  - Components: Lists Design System components used
  - Responsive layout verified (mobile, tablet, desktop)
  - Testing checklist: E2E test each screen
  - Screenshots: 3 screens × 3 viewports = 9 images
- [ ] T094 [US3.4] Create responsive CSS Module per screen: mobile-first, breakpoints at 768px (tablet) and 1024px (desktop)
- [ ] T095 [US3.4] Ensure WCAG 2.1 AA: semantic HTML, ARIA labels, color contrast, keyboard navigation
- [ ] T096 [US3.4] Test locally: `pnpm dev:admin`, navigate to screens, verify forms work, responsive layout responds

**Dependencies**: None  
**Test Criteria**: 3 screens build/lint clean, responsive layout verified, WCAG 2.1 AA pass, README complete with screenshots

---

### US3.5: FrontOffice Journeys (4 hours)

- [ ] T097 [P] [US3.5] Create folder structure: `domains/FrontOffice/journeys/onboarding-flow/` with 5 screens
- [ ] T098 [P] [US3.5] Create Screen 1 (Welcome): `domains/FrontOffice/journeys/onboarding-flow/welcome.tsx`
  - Brand logo + tagline
  - Welcome message with CTA button ("Start Adventure")
  - Background with brand colors
  - Uses: Button, Text components
- [ ] T099 [P] [US3.5] Create Screen 2 (Character Selection): `domains/FrontOffice/journeys/onboarding-flow/character-selection.tsx`
  - 4 character options with interactive previews (hover effect, click to select)
  - Selected character highlighted
  - Next button to proceed
  - Uses: Card, Button, Image (or Avatar fallback)
- [ ] T100 [P] [US3.5] Create Screen 3 (First Quest): `domains/FrontOffice/journeys/onboarding-flow/first-quest.tsx`
  - Step-by-step tutorial: 3-5 numbered steps with descriptions
  - Progress indicator (uses Progress component from US3.1)
  - Action buttons to complete steps
  - Uses: Progress, Button, Text, Card
- [ ] T101 [P] [US3.5] Create Screen 4 (Leaderboard): `domains/FrontOffice/journeys/onboarding-flow/leaderboard.tsx`
  - Uses Leaderboard component (US3.2)
  - Shows top 10 players
  - Filters by game/time period (optional)
  - Uses: Leaderboard component
- [ ] T102 [P] [US3.5] Create Screen 5 (Celebration): `domains/FrontOffice/journeys/onboarding-flow/celebration.tsx`
  - Celebration message ("Quest Complete!")
  - Confetti animation (CSS-based or simple particle effect)
  - Stats summary (XP earned, level gained)
  - Next CTA button
  - Uses: Button, Text, Badge (for stats)
- [ ] T103 [US3.5] Create navigation flow: ensure all screens connect with Next/Back buttons, flow completable end-to-end
- [ ] T104 [US3.5] Create `domains/FrontOffice/journeys/onboarding-flow/README.md`:
  - Objective: Intuitive onboarding for new players
  - Status: ✅ Complete
  - Flow diagram: 5 screens with navigation arrows
  - Components: Lists all Design System components used
  - Responsive layout: tested on 3 viewports
  - Testing checklist: E2E test each screen + flow
- [ ] T105 [US3.5] Create responsive CSS Module per screen: mobile-first responsive layout
- [ ] T106 [US3.5] Ensure keyboard navigable: Tab through all inputs/buttons, Enter to activate
- [ ] T107 [US3.5] Test locally: `pnpm dev:admin`, navigate through all 5 screens, verify flow completable, responsive layout verified

**Dependencies**: US3.1 (Progress component), US3.2 (Leaderboard component)  
**Test Criteria**: 5 screens build/lint clean, flow completable, Progress/Leaderboard integrated, README with flow diagram, responsive verified

---

### US3.6: Game Hub (Deferred - See Note)

**NOTE**: Game Hub is marked as P2-S3-006 with no explicit effort estimate. Based on complexity (game catalog, detail page, leaderboard), estimate 3-4 hours. Implement after US3.1-3.5 complete, or defer to Sprint 7 if time-constrained.

- [ ] T108 [P] [US3.6] Create `domains/FrontOffice/journeys/game-hub/` structure
- [ ] T109 [US3.6] Create game catalog page: grid layout (responsive 2-col mobile → 4-col desktop), 12 mock game entries with images, titles, progress
- [ ] T110 [US3.6] Create game detail page: game info, description, progress bar (uses Progress component), leaderboard section (uses Leaderboard component), play button
- [ ] T111 [US3.6] Create global leaderboard page: all games, filters by game/time period, top 50 players across all games
- [ ] T112 [US3.6] Create `domains/FrontOffice/journeys/game-hub/README.md` with catalog/detail/leaderboard overview
- [ ] T113 [US3.6] Test integration: navigate catalog → select game → view detail → view leaderboard, responsive layout verified

**Dependencies**: US3.1 (Progress), US3.2 (Leaderboard)  
**Test Criteria**: 3 pages render, Progress/Leaderboard integrated, responsive layout, README complete

---

### US3.7: Journey Index Refactor (1 hour)

- [ ] T114 [P] [US3.7] Create `domains/INDEX.md` (auto-generated or manual index of all journeys)
- [ ] T115 [P] [US3.7] Update `domains/README.md` to list all journeys with status, effort, and links:
  ```
  ## Journeys
  
  ### BackOffice
  - profile-journey ✅ Complete (2h)
  - admin-workflow ✅ Complete (5h)
  
  ### FrontOffice
  - onboarding-flow ✅ Complete (4h)
  - game-hub ✅ Complete (4h)
  ```
- [ ] T116 [US3.7] Update `domains/BackOffice/journeys/profile-journey/README.md`: add Sprint 6 tag, link to overview
- [ ] T117 [US3.7] Update `domains/FrontOffice/journeys/onboarding-flow/README.md`: add Sprint 6 tag
- [ ] T118 [US3.7] Create/update `domains/BackOffice/journeys/admin-workflow/README.md`: add Sprint 6 tag
- [ ] T119 [US3.7] Create optional script `scripts/gen-journeys.sh`: generates INDEX.md from folder structure (optional automation)
- [ ] T120 [US3.7] Verify all journey links work: `pnpm build`, check no broken markdown references

**Dependencies**: US3.4, US3.5, US3.6  
**Test Criteria**: INDEX.md/README.md updated with all journeys, links valid, no broken markdown references

---

## Phase 4: Polish & Cross-Cutting Concerns (P3 - Optional)

*(Deferred to Sprint 7 or optional if time permits)*

- [ ] T121 [P] [P3] Update design tokens: refresh color palette if feedback from implementation suggests changes
- [ ] T122 [P] [P3] Add Figma sync integration: auto-export from Figma to code via code-to-figma/figma-mcp-server
- [ ] T123 [P] [P3] Performance optimization: audit bundle sizes, tree-shake unused code, optimize images
- [ ] T124 [P] [P3] SEO/Meta tags: update Open Graph, Twitter Card, canonical URLs in Studio pages
- [ ] T125 [P] [P3] Dark mode theming: ensure all new components have dark mode CSS
- [ ] T126 [P] [P3] Accessibility audit: run axe-core or WAVE on all screens, fix AAA issues

---

## Summary: Task Counts & Dependencies

| Phase | User Story | Task Count | Effort | Dependencies |
|-------|-----------|-----------|--------|--------------|
| P1 | US1.1 CI/CD | 6 | 1 day | None |
| P1 | US1.2 TypeScript | 9 | 2 days | None |
| P1 | US1.3 Unit Tests | 7 | 1 day | None |
| **P1 Total** | | 22 | **4 days** | |
| P2 | US2.1 E2E | 9 | 2 days | US1.1 ✓ |
| P2 | US2.2 Monitoring | 9 | 1 day | None |
| P2 | US2.3 Analytics | 9 | 1 day | None |
| P2 | US2.4 Docs Templates | 7 | 1 day | None |
| P2 | US2.5 CSV Export/Import | 11 | 1.5 days | None |
| P2 | US3.1 Progress Component | 6 | 2 hours | None |
| P2 | US3.2 Leaderboard Component | 7 | 2.5 hours | US3.1 ✓ |
| P2 | US3.3 Puck DropZone | 8 | 2.5 hours (Optional) | None |
| P2 | US3.4 BackOffice Journeys | 9 | 5 hours | None |
| P2 | US3.5 FrontOffice Journeys | 11 | 4 hours | US3.1 ✓, US3.2 ✓ |
| P2 | US3.6 Game Hub | 6 | 3-4 hours (Deferred) | US3.1 ✓, US3.2 ✓ |
| P2 | US3.7 Journey Index | 7 | 1 hour | US3.4, US3.5 |
| **P2 Total** | | **100** | **~17 person-days** | |
| P3 | Enhancements | 6 | TBD | Various |
| **Grand Total** | | **128** | **~21 person-days** | |

---

## Parallelization Strategy

### Week 1 (P1 + Early P2)
**Team Size**: 3-4 developers

**Parallel Track 1 (CI/CD + Quality)**
- T001-T006: US1.1 CI/CD Fix (1 dev, 1 day)
- T016-T022: US1.3 Unit Tests (1 dev, 1 day)

**Parallel Track 2 (TypeScript)**
- T007-T015: US1.2 TypeScript (1 dev, 2 days)

**Parallel Track 3 (Infrastructure)**
- T032-T040: US2.2 Monitoring (1 dev, 1 day)
- T041-T049: US2.3 Analytics (1 dev, 1 day)

**Parallel Track 4 (Design System)**
- T068-T073: US3.1 Progress Component (1 dev, 0.5 day)

**Blockers**: US1.1 must complete before US2.1 (E2E testing)

### Week 2 (P2 Full Sprint)
**Team Size**: 5-6 developers

**Parallel Track 1 (Components)**
- T074-T079: US3.2 Leaderboard (1 dev, 1.25 hours)
- T088-T096: US3.4 BackOffice (1-2 devs, 5 hours)

**Parallel Track 2 (Journeys)**
- T097-T107: US3.5 FrontOffice (1-2 devs, 4 hours)
- T108-T113: US3.6 Game Hub (optional, 1 dev, 4 hours)

**Parallel Track 3 (Infrastructure)**
- T023-T031: US2.1 E2E (1 dev, 2 days)
- T050-T056: US2.4 Docs (1 dev, 1 day)
- T057-T067: US2.5 CSV (1 dev, 1.5 days)

**Parallel Track 4 (Optional)**
- T080-T087: US3.3 Puck DropZone (0.5 dev, 2.5 hours)

**Completion**: All P1 + 80%+ P2 by end of Week 2

---

## Dependency Graph

```
┌─ US1.1 (CI/CD) ──────┐
│                       ├─→ US2.1 (E2E Tests)
│                       │
├─ US1.2 (TypeScript) ─┤
│                       │
├─ US1.3 (Unit Tests) ─┤
│                       ├─→ [Week 2 Foundation]
├─ US2.2 (Monitoring) ─┤
│                       │
├─ US2.3 (Analytics) ──┤
│                       │
├─ US2.4 (Docs) ───────┤
│                       │
├─ US2.5 (CSV) ────────┤
│                       │
├─ US3.1 (Progress) ───┤
│                       ├─→ US3.2 (Leaderboard)
│                       │   ├─→ US3.5 (FrontOffice)
│                       │   └─→ US3.6 (Game Hub)
├─ US3.3 (DropZone) ───┤ (Optional)
│                       │
├─ US3.4 (BackOffice) ─┤
│                       ├─→ US3.7 (Journey Index)
├─ US3.5 (FrontOffice) ┤
│                       │
└─ US3.6 (Game Hub) ───┘
```

---

## Success Criteria

✅ **P1 (Week 1 End)**:
- [ ] US1.1: CI/CD workflow 100% passing, <10 min run time
- [ ] US1.2: TypeScript 0 warnings, `pnpm type-check` PASS
- [ ] US1.3: 76/76 unit tests PASS, coverage ≥95%

✅ **P2 (Week 2 End)**:
- [ ] US2.1: E2E tests running in CI, 80%+ coverage, <5 min execution
- [ ] US2.2: Sentry active, errors tracked, alert rules configured
- [ ] US2.3: GA4 active, page views + custom events logged
- [ ] US2.4: 3+ journeys migrated to new templates
- [ ] US2.5: Export/import works for CSV/JSON/XML
- [ ] US3.1-3.2: Progress + Leaderboard exported, 9 stories in Storybook
- [ ] US3.3: DropZone optional (defer if not needed)
- [ ] US3.4-3.5: 8 journeys implemented (3 BackOffice + 5 FrontOffice), responsive, accessible
- [ ] US3.7: All journeys indexed and linked

✅ **Build Pipeline**:
- [ ] `pnpm build` — 0 errors, all packages compile
- [ ] `pnpm lint` — 0 errors
- [ ] `pnpm type-check` — 0 warnings
- [ ] `pnpm test` — 76/76 PASS
- [ ] `pnpm test:e2e` — all scenarios PASS

---

## Notes

1. **Parallelization**: Most P1 tasks can run in parallel (different files, no dependencies). Recommend 3-4 devs Week 1, scale to 5-6 Week 2.

2. **US3.3 (DropZone) Status**: Marked optional because technical audit (04/12/2025) confirmed dashboard works without it. Implement only if visual zone editing required immediately.

3. **US3.6 (Game Hub) Status**: No explicit effort in spec. Deferred to Sprint 7 or Week 2 optional based on capacity. Estimated 3-4 hours.

4. **Testing**: Tests are integral to each task (unit test in T067 for CSV, E2E in T031 for workflows). No separate test phase.

5. **Documentation**: Each user story has a documentation task (journey README, guide, template migration).

6. **Token Budget**: All file paths use absolute paths from repo root (`domains/`, `packages/`, `apps/`, `specs/`, `docs/`, `scripts/`).

---

**Last Generated**: 2025-12-09  
**Sprint Duration**: 2-3 weeks (12/09-12/20)  
**Team Size**: 5-6 developers  
**Target Completion**: 100% P1 by 12/13, 80%+ P2 by 12/20

---

## Estratégia
- Semana 1: Fechar P1 (T004–T007) e iniciar Playwright/Sentry/Analytics (T008–T010)
- Semana 2: Fechar templates/export-import (T011–T012), componentes (T013–T014) e journeys (T015–T018); opcional T019 se houver folga; finalizar com gates e evidências (T020–T023)
