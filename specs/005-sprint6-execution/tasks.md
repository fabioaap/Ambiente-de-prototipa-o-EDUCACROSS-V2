# Tasks: Sprint 6 Execution

**Feature:** Sprint 6 Complete Execution Plan (20 items, 17.25 person-days)  
**Input:** Design documents from `/specs/005-sprint6-execution/`  
**Prerequisites:** plan.md, spec.md (20 user stories), research.md (8 decisions), data-model.md (8 entities), contracts/openapi.yaml (3 endpoints)  

**Tests:** E2E tests are explicitly requested in spec.md (US2.1); unit tests exist and need fixes (US1.3). Test tasks included per specification requirements.

**Organization:** Tasks grouped by user story to enable independent implementation and testing. Each story represents a complete, deliverable increment.

**Constitution Alignment:**
- Quality Gates: P1 items ensure `pnpm build/lint/type-check` always green
- Journey Docs: P2 items update `domains/{domain}/journeys/{journey}/README.md`
- Storybook: P2 DS components require stories in `domains/storybook/src/stories/`
- Puck Registry: New components registered in `apps/studio/src/config/puck.config.tsx`
- Health API: P3 items refresh `/api/dashboard/health` when metrics change

**Path Conventions:**
- Monorepo structure: `apps/studio/`, `packages/design-system/`, `packages/tokens/`, `domains/storybook/`
- UI constraints: Only `apps/studio/src/app/{dashboard,studio}/` may import `@/components/ui`; everywhere else uses `@prototipo/design-system`
- Design System: Components must use CSS Modules consuming tokens (no inline Tailwind/CSS-in-JS)
- Journey docs: Live in `domains/{domain}/journeys/{journey}/` with README.md per template

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose:** Project initialization, dependencies, and environment verification

- [X] T001 Verify Node 22.21.1 and pnpm 9.14.4+ installed per .nvmrc
- [X] T002 Run `pnpm install --frozen-lockfile` to restore dependencies
- [X] T003 [P] Verify build order: `pnpm build:tokens && pnpm build:design-system && pnpm build`
- [X] T004 [P] Create Sprint 6 feature branch: `git checkout -b feature/sprint6-execution`
- [ ] T005 [P] Create GitHub milestone "Sprint 6" and 20 issues from spec.md user stories

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose:** Core infrastructure that MUST be complete before any user story implementation

**⚠️ CRITICAL:** No user story work can begin until this phase is complete

- [ ] T006 Backup current .github/workflows/sprint-2-validation.yml before modifications
- [X] T007 [P] Install Playwright: `pnpm add -D -w @playwright/test` and run `pnpm exec playwright install`
- [X] T008 [P] Create playwright.config.ts at workspace root with Chromium/Firefox/WebKit configs
- [X] T009 [P] Install Sentry: `pnpm add -w @sentry/nextjs` in apps/studio
- [X] T010 [P] Install Analytics SDK: `pnpm add -w react-ga4` or `pnpm add -w mixpanel-browser` in apps/studio
- [ ] T011 Verify all foundational installs pass quality gates:
  - Run `pnpm install --frozen-lockfile` to ensure all deps resolved
  - Run `pnpm build:tokens && pnpm build:design-system && pnpm build` (verify SUCCESS)
  - Run `pnpm lint` (verify 0 errors)
  - Run `pnpm -r type-check` (verify 0 warnings)
  - Check dev servers start: `pnpm dev:studio` and `pnpm dev:storybook` (no console errors)
  - **Constitution Principle 1 Check:** Environment remains "run-ready" after all installs

**Checkpoint:** Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1.1 - CI/CD Fix (Priority: P1) 🎯 BLOCKER

**Goal:** All GitHub Actions checks passing without manual override, <10min run time

**Independent Test:** Push to branch, verify `.github/workflows/sprint-2-validation.yml` completes successfully with all green checks

### Implementation for US1.1

- [X] T012 [US1.1] Remove `continue-on-error: true` from .github/workflows/sprint-2-validation.yml
- [X] T013 [US1.1] Fix workflow syntax errors causing failures (check YAML indentation, job dependencies)
- [X] T014 [US1.1] Optimize workflow: cache node_modules, use `pnpm install --frozen-lockfile`
- [X] T015 [US1.1] Add timeout limits: jobs max 15min, workflow max 20min
- [X] T016 [US1.1] Test workflow locally with `act` or push to feature branch
- [X] T017 [US1.1] Update SPRINT6_EXECUTION_PLAN.md with CI fix details and validation evidence
- [X] T018 [US1.1] Verify: Push commit, confirm workflow completes in <10min with all steps green

**Checkpoint:** CI/CD reliable - P1-001 complete, commit with `fix(ci): Remove workflow overrides, optimize run time (#P1-001)`

---

## Phase 4: User Story 1.2 - TypeScript Type Safety (Priority: P1) 🎯 BLOCKER

**Goal:** Zero TypeScript warnings across all packages (eliminate 22 warnings)

**Independent Test:** Run `pnpm -r type-check` and verify output shows 0 errors, 0 warnings

### Implementation for US1.2

- [X] T019 [US1.2] Audit current warnings: `pnpm -r type-check 2>&1 | tee type-warnings.log`
- [X] T020 [P] [US1.2] Fix Storybook type warnings: Remove `@ts-expect-error`, add explicit types in domains/storybook/
- [X] T021 [P] [US1.2] Fix Design System warnings: Add JSDoc to all component props in packages/design-system/src/components/
- [X] T022 [P] [US1.2] Fix API route handlers: Add explicit return types to apps/studio/src/app/api/**/route.ts
- [X] T023 [US1.2] Replace `any` types with proper interfaces or add `// @ts-expect-error: <justification>` comments
- [X] T024 [US1.2] Update tsconfig.json: Ensure `strict: true`, `noImplicitAny: true`, `strictNullChecks: true`
- [X] T025 [US1.2] Pair programming session: Review remaining complex type issues with team
- [X] T026 [US1.2] Verify: `pnpm -r type-check` outputs "Found 0 errors" across all packages
- [ ] T027 [US1.2] Update .github/copilot-instructions.md to enforce explicit types in code reviews

**Checkpoint:** Type safety 100% - P1-002 complete, commit with `fix(types): Eliminate 22 TypeScript warnings (#P1-002)`

---

## Phase 5: User Story 1.3 - Unit Test Fixes (Priority: P1) 🎯 BLOCKER

**Goal:** All 76 unit tests passing consistently (currently 74/76 = 97.4%)

**Independent Test:** Run `pnpm test` and verify "Tests passed: 76/76"

### Implementation for US1.3

- [X] T028 [US1.3] Identify failing tests: `pnpm test 2>&1 | grep -A 5 "FAIL"`
- [X] T029 [P] [US1.3] Fix test 1: Debug failure, update assertions or test data
- [X] T030 [P] [US1.3] Fix test 2: Debug failure, update assertions or test data
- [X] T031 [US1.3] Check for flaky tests: Run suite 5 times `for i in {1..5}; do pnpm test; done`
- [X] T032 [US1.3] Stabilize flaky tests: Add explicit waits, mock timers, or rewrite test logic
- [X] T033 [US1.3] Verify coverage maintained: `pnpm test --coverage` shows ≥95%
- [X] T034 [US1.3] Remove skipped tests or document reason in test file comments
- [X] T035 [US1.3] Optimize CI test execution: Ensure completes in <2min
- [X] T036 [US1.3] Verify: `pnpm test` passes 76/76 tests on 3 consecutive runs

**Checkpoint:** Test suite 100% reliable - P1-003 complete, commit with `fix(tests): Resolve 2 failing unit tests, stabilize suite (#P1-003)` ✅ DONE (b48e420)

---

## Phase 6: User Story 2.1 - E2E Test Suite (Priority: P2)

**Goal:** Playwright E2E tests covering critical journeys (≥80% coverage), runs in CI with artifacts

**Independent Test:** Run `pnpm exec playwright test` and verify all Dashboard + Studio journeys pass in 3 browsers

**Dependencies:** US1.1 (CI/CD must be stable before adding E2E to workflow)

### Tests for US2.1 ✅

**NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T037 [P] [US2.1] Contract test: Dashboard API returns valid JSON in tests/e2e/dashboard-api.spec.ts
- [X] T038 [P] [US2.1] E2E test: Dashboard loads KPIs in tests/e2e/dashboard-kpis.spec.ts
- [X] T039 [P] [US2.1] E2E test: Studio page create/edit/save workflow in tests/e2e/studio-page-crud.spec.ts

### Implementation for US2.1

- [X] T040 [US2.1] Configure playwright.config.ts: 3 browsers (Chromium, Firefox, WebKit), screenshots on failure
- [X] T041 [US2.1] Create tests/e2e/ directory structure at workspace root
- [X] T042 [P] [US2.1] Implement Dashboard journey test: Visit /dashboard, assert KPIs visible, check health metrics
- [X] T043 [P] [US2.1] Implement Studio journey test: Create page, add component, save, verify JSON schema
- [X] T044 [P] [US2.1] Add accessibility checks with @axe-core/playwright in all E2E tests
- [X] T045 [US2.1] Configure test artifacts: screenshots in tests/e2e/screenshots/, videos in tests/e2e/videos/
- [X] T046 [US2.1] Add E2E step to .github/workflows/sprint-2-validation.yml with artifact upload
- [X] T047 [US2.1] Optimize test execution: Run in parallel, target <5min total runtime
- [X] T048 [US2.1] Document E2E testing in specs/005-sprint6-execution/quickstart.md (how to run, debug, add tests)
- [X] T049 [US2.1] Verify: `pnpm exec playwright test` passes 3/3 suites across 3 browsers in <5min

**Checkpoint:** E2E testing active - US2.1 complete, commit with `feat(tests): Add Playwright E2E suite with Dashboard + Studio journeys (#P2-001)`

---

## Phase 7: User Story 2.2 - Monitoring Setup (Priority: P2)

**Goal:** Sentry integrated for error tracking with source maps and alert rules

**Independent Test:** Trigger test error in Studio, verify Sentry dashboard shows exception with context

### Implementation for US2.2

- [X] T050 [US2.2] Create Sentry project at sentry.io (or self-hosted instance)
- [X] T051 [US2.2] Configure sentry.client.config.ts in apps/studio/src/ with DSN and environment
- [X] T052 [US2.2] Configure sentry.server.config.ts in apps/studio/src/ for API route errors
- [X] T053 [P] [US2.2] Add ErrorBoundary component in apps/studio/src/components/ErrorBoundary.tsx
- [X] T054 [P] [US2.2] Wrap app/layout.tsx with ErrorBoundary to catch React errors
- [X] T055 [US2.2] Add Sentry.captureException() to API route error handlers in apps/studio/src/app/api/**/route.ts
- [X] T056 [US2.2] Configure source maps upload in next.config.mjs with @sentry/nextjs plugin
- [X] T057 [US2.2] Set up alert rules in Sentry: >10 errors/hour triggers Slack notification
- [X] T058 [US2.2] Add Sentry error rate widget to Dashboard (optional): Display in apps/studio/src/app/dashboard/page.tsx
- [X] T059 [US2.2] Document Sentry setup in specs/005-sprint6-execution/quickstart.md (how to test, view errors)
- [ ] T060 [US2.2] Verify: Trigger test error `throw new Error('Test Sentry')`, confirm appears in Sentry dashboard with source map context

**Checkpoint:** Error monitoring live - US2.2 complete, commit with `feat(monitoring): Integrate Sentry for error tracking (#P2-002)`

---

## Phase 8: User Story 2.3 - Analytics Integration (Priority: P2)

**Goal:** Google Analytics 4 tracking page views and custom events (dashboard load, page create, CSV export)

**Independent Test:** Use GA4 DebugView to verify events appear in real-time

### Implementation for US2.3

- [X] T061 [US2.3] Create GA4 property at analytics.google.com or set up Mixpanel project
- [X] T062 [US2.3] Add gtag.js script to apps/studio/src/app/layout.tsx with measurement ID
- [X] T063 [P] [US2.3] Create AnalyticsProvider component in apps/studio/src/lib/analytics/AnalyticsProvider.tsx
- [X] T064 [P] [US2.3] Implement trackEvent() function for custom events (event name, params)
- [X] T065 [US2.3] Track page_view: Automatic in GA4 gtag.js (verify in DebugView)
- [X] T066 [P] [US2.3] Track dashboard_load: Call trackEvent() in apps/studio/src/app/dashboard/page.tsx useEffect
- [X] T067 [P] [US2.3] Track page_create: Call trackEvent() in Studio page creation handler
- [X] T068 [P] [US2.3] Track csv_export: Call trackEvent() in CSV export button onClick
- [X] T069 [US2.3] Add cookie consent banner (optional): Use @cookie-consent/react or custom implementation
- [X] T070 [US2.3] Configure data retention: 14 months in GA4 settings, document GDPR compliance
- [X] T071 [US2.3] Create analytics dashboard view for PMs (GA4 web interface or custom iframe)
- [X] T072 [US2.3] Document analytics in specs/005-sprint6-execution/quickstart.md (tracked events, testing with DebugView)
- [X] T073 [US2.3] Verify: Open GA4 DebugView, perform actions in Studio, confirm 5+ events tracked with params

**Checkpoint:** Analytics active - US2.3 complete, commit with `feat(analytics): Integrate Google Analytics 4 for usage tracking (#P2-003)`

---

## Phase 9: User Story 2.4 - Documentation Templates (Priority: P2)

**Goal:** Standardized templates for journeys (README) and features (spec), migrate 3+ existing journeys

**Independent Test:** Create new journey using template, verify all sections present and links functional

### Implementation for US2.4

- [X] T074 [P] [US2.4] Create journey template in .specify/templates/journey-template.md with 5 sections
- [X] T075 [P] [US2.4] Create feature spec template in .specify/templates/feature-spec-template.md with user stories section
- [X] T076 [P] [US2.4] Create API doc template in .specify/templates/api-doc-template.md with OpenAPI structure
- [X] T077 [US2.4] Migrate domains/BackOffice/journeys/banco-questoes/README.md to new template
- [X] T078 [US2.4] Migrate domains/FrontOffice/journeys/onboarding/README.md to new template
- [X] T079 [US2.4] Migrate domains/Game/journeys/game-hub/README.md to new template
- [X] T080 [US2.4] Migrate domains/BackOffice/journeys/revisao-questoes/README.md to new template
- [X] T081 [US2.4] Migrate domains/BackOffice/journeys/exibir-campo-uso/README.md to new template

**Checkpoint:** Documentation standardized - US2.4 complete, commit with `docs(templates): Add journey and feature templates, migrate 3 journeys (#P2-004)`

---

## Phase 10: User Story 2.5 - CSV Enhancement (JSON/XML) (Priority: P2)

**Goal:** Export/import supporting CSV, JSON, XML formats with schema validation

**Independent Test:** Export Dashboard data in JSON, validate against OpenAPI schema, import successfully

### Implementation for US2.5

- [X] T084 [US2.5] Add format selector to export UI in apps/studio/src/app/dashboard/ExportButton.tsx
- [X] T085 [P] [US2.5] Implement JSON converter in apps/studio/src/lib/export/json.ts (matches OpenAPI schema)
- [X] T086 [P] [US2.5] Implement XML converter in apps/studio/src/lib/export/xml.ts (add XSD schema optional)
- [X] T087 [P] [US2.5] Implement CSV converter in apps/studio/src/lib/export/csv.ts (existing, enhance with headers)
- [X] T088 [US2.5] Add schema validation: Use ajv for JSON, fast-xml-parser for XML
- [X] T089 [US2.5] Implement import handlers for all 3 formats in apps/studio/src/app/api/import/route.ts
- [X] T090 [US2.5] Add error handling: Show line number, field name, validation error to user
- [X] T091 [P] [US2.5] Write unit tests for converters in apps/studio/src/lib/export/*.test.ts (6 tests: export + import per format)
- [X] T092 [US2.5] Update API documentation: Document /api/export and /api/import endpoints in specs/005-sprint6-execution/contracts/openapi.yaml
- [X] T093 [US2.5] Document export/import in specs/005-sprint6-execution/quickstart.md (formats, validation rules)
- [X] T094 [US2.5] Verify: Export Dashboard data in JSON, validate with ajv, import successfully with no errors

**Checkpoint:** ✅ Multi-format export/import live - US2.5 complete, commit `bfd42b9` with `feat(export): Add JSON and XML export/import with validation (#P2-005)`

---

## Phase 11: User Story 3.1 - Progress Component (Priority: P2)

**Goal:** Reusable Progress component with linear/circular variants, 4 colors, 3 sizes, ARIA support

**Independent Test:** Render Progress in Storybook, verify all variants render correctly and ARIA attributes present

### Implementation for US3.1

- [X] T095 [P] [US3.1] Create packages/design-system/src/components/Progress/Progress.tsx with linear/circular logic
- [X] T096 [P] [US3.1] Create packages/design-system/src/components/Progress/Progress.module.css consuming tokens
- [X] T097 [US3.1] Implement props interface: value (0-100), variant, size, color, animated, showValue, ariaLabel
- [X] T098 [US3.1] Add ARIA attributes: role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax
- [X] T099 [US3.1] Implement 4 color variants: primary, success, warning, danger (using tokens)
- [X] T100 [US3.1] Implement 3 sizes: sm, md, lg (width/height from tokens)
- [X] T101 [US3.1] Export via packages/design-system/src/index.ts
- [X] T102 [P] [US3.1] Create Storybook story in domains/storybook/src/stories/Progress.stories.tsx (all variants)
- [X] T103 [P] [US3.1] Write unit tests in packages/design-system/src/components/Progress/Progress.test.tsx
- [X] T104 [US3.1] Register in apps/studio/src/config/puck.config.tsx for Studio usage
- [X] T105 [US3.1] Build and verify: `pnpm build:design-system && pnpm dev:storybook`, check all Progress variants render
- [X] T106 [US3.1] Document component in packages/design-system/README.md (props, usage examples)

**Checkpoint:** ✅ Progress component complete - US3.1 complete (component existed, added tests), commit TBD

---

## Phase 12: User Story 3.2 - Leaderboard Component (Priority: P2)

**Goal:** Leaderboard component displaying ranked players with score, progress, highlight current user

**Independent Test:** Render Leaderboard in Storybook with mock data, verify ranking, progress bars, and highlighting

**Dependencies:** US3.1 (Progress component required for progress bars)

### Implementation for US3.2

- [ ] T107 [P] [US3.2] Define LeaderboardEntry TypeScript interface in packages/design-system/src/components/Leaderboard/types.ts
- [ ] T108 [P] [US3.2] Create packages/design-system/src/components/Leaderboard/Leaderboard.tsx using Avatar + Progress from DS
- [ ] T109 [P] [US3.2] Create packages/design-system/src/components/Leaderboard/Leaderboard.module.css with responsive CSS Grid
- [ ] T110 [US3.2] Implement props: entries, maxEntries (default 10), loading, emptyMessage
- [ ] T111 [US3.2] Add current user highlighting: Check isCurrentUser flag, apply distinct CSS class
- [ ] T112 [US3.2] Implement skeleton loading state: Show placeholder entries when loading=true
- [ ] T113 [US3.2] Add keyboard navigation: Arrow keys move focus between entries
- [ ] T114 [US3.2] Export via packages/design-system/src/index.ts
- [ ] T115 [P] [US3.2] Create Storybook story in domains/storybook/src/stories/Leaderboard.stories.tsx (empty, loading, 10 entries, current user)
- [ ] T116 [P] [US3.2] Write unit tests in packages/design-system/src/components/Leaderboard/Leaderboard.test.tsx
- [ ] T117 [US3.2] Register in apps/studio/src/config/puck.config.tsx
- [ ] T118 [US3.2] Build and verify: `pnpm build:design-system && pnpm dev:storybook`, check all Leaderboard variants
- [ ] T119 [US3.2] Document component in packages/design-system/README.md

**Checkpoint:** Leaderboard component complete - US3.2 complete, commit with `feat(ds): Add Leaderboard component with ranking and progress (#P2-S3-002)`

---

## Phase 13: User Story 3.3 - Puck DropZone Integration (Priority: P2 - OPTIONAL)

**Goal:** Visual zone editing in Puck Studio (enhancement, not blocker per validation 04/12/2025)

**Independent Test:** Open Studio editor, verify zones visible and components draggable into zones

**VALIDATION NOTE:** Technical validation proved #59 is NOT a blocker. Consider deferring to Sprint 7+ if not immediately needed.

### Implementation for US3.3 (OPTIONAL)

- [ ] T120 [P] [US3.3] Import DropZone from @measured/puck in apps/studio/src/config/puck.config.tsx
- [ ] T121 [P] [US3.3] Add DropZone support to 2-3 existing components (e.g., Hero, Section, Grid)
- [ ] T122 [US3.3] Update component schemas to include zones array field
- [ ] T123 [US3.3] Test in Studio editor: Drag component into zone, verify JSON includes zone data
- [ ] T124 [US3.3] Document DropZone usage in apps/studio/README.md (how to add zones to components)
- [ ] T125 [US3.3] Verify: No console errors, zones render visually, components draggable

**Checkpoint:** DropZone integration (optional) - US3.3 complete if implemented, commit with `feat(studio): Add Puck DropZone for visual layout editing (#P2-S3-003)`

---

## Phase 14: User Story 3.4 - BackOffice Journeys (Priority: P2)

**Goal:** 3 BackOffice admin screens (Login, Dashboard, Profile) with README documentation

**Independent Test:** Navigate through 3 screens in Studio, verify forms work and DS components used

### Implementation for US3.4

- [ ] T126 [US3.4] Create domains/BackOffice/journeys/admin-workflow/ directory structure
- [ ] T127 [P] [US3.4] Create README.md in domains/BackOffice/journeys/admin-workflow/ using journey template
- [ ] T128 [P] [US3.4] Implement tela-1-login.tsx: Form with Input (email/password), Button (submit), ErrorBanner
- [ ] T129 [P] [US3.4] Implement tela-2-dashboard.tsx: KPIGrid, StatsCard, Navigation (admin metrics)
- [ ] T130 [P] [US3.4] Implement tela-3-perfil.tsx: Form, Avatar, Input (name/email/bio), Button (save)
- [ ] T131 [US3.4] Add responsive CSS: Mobile (stacked), Tablet (2-col), Desktop (3-col) using CSS Grid
- [ ] T132 [US3.4] Add screenshots to README.md: Capture 3 screens, save in domains/BackOffice/journeys/admin-workflow/screenshots/
- [ ] T133 [US3.4] Link screens in Studio: Create Studio pages for each screen in apps/studio/src/app/[[...slug]]/page.tsx
- [ ] T134 [US3.4] Update PROGRESS_DASHBOARD.md: Add BackOffice admin-workflow entry
- [ ] T135 [US3.4] Verify: Navigate through 3 screens, forms functional, DS components render correctly

**Checkpoint:** BackOffice journeys complete - US3.4 complete, commit with `feat(journeys): Add BackOffice admin workflow (3 screens) (#P2-S3-004)`

---

## Phase 15: User Story 3.5 - FrontOffice Journeys (Priority: P2)

**Goal:** 5 FrontOffice onboarding screens (Welcome, Character, Quest, Leaderboard, Celebration) with README

**Independent Test:** Navigate through 5-screen flow, verify Leaderboard component used, animations smooth

**Dependencies:** US3.2 (Leaderboard component required for tela-4-leaderboard.tsx)

### Implementation for US3.5

- [ ] T136 [US3.5] Create domains/FrontOffice/journeys/onboarding-flow/ directory structure
- [ ] T137 [P] [US3.5] Create README.md in domains/FrontOffice/journeys/onboarding-flow/ with navigation diagram
- [ ] T138 [P] [US3.5] Implement tela-1-boas-vindas.tsx: Hero, logo, welcome text, "Start" Button
- [ ] T139 [P] [US3.5] Implement tela-2-personagem.tsx: Avatar selection grid, interactive preview, "Next" Button
- [ ] T140 [P] [US3.5] Implement tela-3-primeira-missao.tsx: Step-by-step tutorial with Progress component
- [ ] T141 [P] [US3.5] Implement tela-4-leaderboard.tsx: Use Leaderboard component with mock top 10 data
- [ ] T142 [P] [US3.5] Implement tela-5-parabens.tsx: Celebration message, confetti animation (react-confetti), "Continue" Button
- [ ] T143 [US3.5] Add navigation flow: Buttons link to next screen in sequence
- [ ] T144 [US3.5] Add responsive design: All screens work on mobile, tablet, desktop
- [ ] T145 [US3.5] Add keyboard navigation: Tab order logical, Enter submits forms
- [ ] T146 [US3.5] Add screenshots to README.md: Capture 5 screens, save in domains/FrontOffice/journeys/onboarding-flow/screenshots/
- [ ] T147 [US3.5] Link screens in Studio: Create Studio pages for each screen
- [ ] T148 [US3.5] Update PROGRESS_DASHBOARD.md: Add FrontOffice onboarding-flow entry
- [ ] T149 [US3.5] Verify: Complete 5-screen flow, Leaderboard renders with data, animations smooth

**Checkpoint:** FrontOffice onboarding complete - US3.5 complete, commit with `feat(journeys): Add FrontOffice onboarding flow (5 screens) (#P2-S3-005)`

---

## Phase 16: User Story 3.6 - Game Hub (Priority: P2)

**Goal:** Game Hub with catalog (home), game detail page, global leaderboard using Progress + Leaderboard components

**Independent Test:** Browse hub home, view game detail, check global leaderboard with filters

**Dependencies:** US3.1 (Progress), US3.2 (Leaderboard)

### Implementation for US3.6

- [ ] T150 [US3.6] Create domains/FrontOffice/journeys/game-hub/ directory structure
- [ ] T151 [P] [US3.6] Create README.md in domains/FrontOffice/journeys/game-hub/ with hub architecture
- [ ] T152 [P] [US3.6] Implement hub-home.tsx: Game catalog grid (12 mock games), search bar, filter dropdowns
- [ ] T153 [P] [US3.6] Implement game-detail.tsx: Game header, description, Progress component (completion %), Leaderboard (top 10 for game)
- [ ] T154 [P] [US3.6] Implement leaderboard-global.tsx: Leaderboard component (cross-game rankings), filters (by game, by time period)
- [ ] T155 [US3.6] Create mock data: 12 games in apps/studio/src/lib/mocks/games.json (name, description, image, progress, leaderboard)
- [ ] T156 [US3.6] Add search functionality: Filter games by name/description on hub-home
- [ ] T157 [US3.6] Add filter functionality: Dropdowns for genre, difficulty on hub-home
- [ ] T158 [US3.6] Add responsive design: Grid 1-col mobile, 2-col tablet, 3-col desktop
- [ ] T159 [US3.6] Add screenshots to README.md: Capture 3 pages, save in domains/FrontOffice/journeys/game-hub/screenshots/
- [ ] T160 [US3.6] Link screens in Studio: Create Studio pages for each hub page
- [ ] T161 [US3.6] Update PROGRESS_DASHBOARD.md: Add FrontOffice game-hub entry
- [ ] T162 [US3.6] Verify: Browse hub, view game detail with leaderboard, check global leaderboard filters work

**Checkpoint:** Game Hub complete - US3.6 complete, commit with `feat(journeys): Add FrontOffice Game Hub with catalog and leaderboard (#P2-S3-006)`

---

## Phase 17: User Story 4.1 - Storybook Coverage Expansion (Priority: P3)

**Goal:** All Design System components have Storybook stories with edge cases and interactive controls

**Independent Test:** Browse Storybook catalog, verify every DS component has ≥1 story with Controls addon

### Implementation for US4.1

- [ ] T163 [US4.1] Audit current Storybook coverage: List all components in packages/design-system/src/components/, compare with domains/storybook/src/stories/
- [ ] T164 [P] [US4.1] Create stories for missing components (estimate 5-10 components)
- [ ] T165 [P] [US4.1] Add edge case variants to existing stories: Empty states, long text, error states
- [ ] T166 [US4.1] Enable Storybook Controls addon for all stories: Use `argTypes` to expose props
- [ ] T167 [US4.1] Enable accessibility checks: Add @storybook/addon-a11y to all stories
- [ ] T168 [US4.1] Generate autodocs: Add JSDoc comments to all component props
- [ ] T169 [US4.1] Build Storybook: `pnpm build:storybook`, verify no errors
- [ ] T170 [US4.1] Deploy Storybook (optional): Use Chromatic or GitHub Pages
- [ ] T171 [US4.1] Document Storybook coverage in specs/005-sprint6-execution/quickstart.md (how to add stories)
- [ ] T172 [US4.1] Verify: Open `pnpm dev:storybook`, browse catalog, every component has ≥1 story with controls

**Checkpoint:** Storybook coverage complete - US4.1 complete, commit with `docs(storybook): Expand coverage to all DS components with edge cases (#P3-001)`

---

## Phase 18: User Story 4.2 - WCAG 2.1 AAA Audit (Priority: P3)

**Goal:** AAA compliance audit with 7:1 contrast ratios, enhanced focus indicators, reduced motion support

**Independent Test:** Run axe-core at AAA level, verify 0 violations

### Implementation for US4.2

- [ ] T173 [US4.2] Configure axe-core for AAA: Update test config to check AAA rules
- [ ] T174 [US4.2] Audit color contrast: Use browser DevTools contrast checker, target ≥7:1 for normal text
- [ ] T175 [P] [US4.2] Fix low-contrast colors in packages/tokens/src/tokens.json (adjust primary/secondary colors)
- [ ] T176 [P] [US4.2] Enhance focus indicators: Add 2px solid outline with high contrast in CSS Modules
- [ ] T177 [US4.2] Add `prefers-reduced-motion` support: Disable animations when media query matches
- [ ] T178 [US4.2] Test with screen reader: NVDA on Windows or VoiceOver on macOS, verify navigation smooth
- [ ] T179 [US4.2] Run axe-core audit: `pnpm exec playwright test --project=accessibility`
- [ ] T180 [US4.2] Generate audit report: Save axe results to specs/005-sprint6-execution/accessibility-audit-report.md
- [ ] T181 [US4.2] Fix remaining violations: Address any AAA issues found
- [ ] T182 [US4.2] Verify: axe-core outputs 0 violations at AAA level

**Checkpoint:** WCAG AAA compliance achieved - US4.2 complete, commit with `feat(a11y): Achieve WCAG 2.1 AAA compliance (#P3-002)`

---

## Phase 19: User Story 4.3 - Image Optimization (Priority: P3)

**Goal:** Next.js Image component for all images, WebP format, lazy loading, Lighthouse score ≥90

**Independent Test:** Run Lighthouse audit, verify Performance score ≥90 and image assets <500KB

### Implementation for US4.3

- [ ] T183 [US4.3] Audit current images: Find all `<img>` tags in apps/studio/src/
- [ ] T184 [P] [US4.3] Replace `<img>` with `<Image>` from next/image (batch replace in 5-10 files)
- [ ] T185 [US4.3] Convert images to WebP: Use ImageMagick or online converter for public/images/
- [ ] T186 [US4.3] Configure next.config.mjs: Add image domains if loading from external URLs
- [ ] T187 [US4.3] Enable lazy loading: Verify `<Image>` has `loading="lazy"` for below-fold images
- [ ] T188 [US4.3] Optimize image dimensions: Set `width` and `height` props to avoid layout shift
- [ ] T189 [US4.3] Run Lighthouse audit: Chrome DevTools → Lighthouse → Performance
- [ ] T190 [US4.3] Fix Lighthouse issues: Address any remaining image-related warnings
- [ ] T191 [US4.3] Verify: Lighthouse Performance ≥90, image assets <500KB per page

**Checkpoint:** Image optimization complete - US4.3 complete, commit with `perf(images): Optimize with Next.js Image and WebP format (#P3-003)`

---

## Phase 20: User Story 4.4 - Health Indicators Enhancement (Priority: P3)

**Goal:** 8 additional health metrics in Dashboard (total 12: 4 existing + 8 new) with color-coded thresholds

**Independent Test:** Visit /dashboard/health, verify 12 metrics displayed in grid with green/yellow/red colors

### Implementation for US4.4

- [ ] T192 [US4.4] Extend HealthMetrics interface in apps/studio/src/lib/types/health.ts with 8 new fields
- [ ] T193 [P] [US4.4] Update /api/dashboard/health route handler in apps/studio/src/app/api/dashboard/health/route.ts
- [ ] T194 [P] [US4.4] Add mock data for new metrics in apps/studio/src/lib/mocks/health.json
- [ ] T195 [US4.4] Implement metric calculations: codeQualityScore (from ESLint), testCoverage (from Vitest), technicalDebtHours (estimate)
- [ ] T196 [US4.4] Implement performanceScore: Use Lighthouse CLI or manual calculation
- [ ] T197 [US4.4] Implement securityVulnerabilities: Parse `pnpm audit` output
- [ ] T198 [US4.4] Implement lastDeployment, uptime, errorRate: Use Sentry API or mock data
- [ ] T199 [US4.4] Update Dashboard UI in apps/studio/src/app/dashboard/HealthSection.tsx to display 12 metrics in 3x4 grid
- [ ] T200 [US4.4] Add color-coded thresholds: Green (≥90), Yellow (70-89), Red (<70) per metric
- [ ] T201 [US4.4] Add historical trend graphs (optional): Use Recharts to show 7-day trends
- [ ] T202 [US4.4] Update API documentation in specs/005-sprint6-execution/contracts/openapi.yaml (extend HealthMetricsResponse schema)
- [ ] T203 [US4.4] Document metrics in specs/005-sprint6-execution/data-model.md (formulas, thresholds)
- [ ] T204 [US4.4] Verify: Visit /dashboard/health, see 12 metrics with correct colors and values

**Checkpoint:** Health indicators enhanced - US4.4 complete, commit with `feat(dashboard): Add 8 health metrics with color-coded thresholds (#P3-S3-007)`

---

## Phase 21: User Story 4.5 - SpecKit PR Validation (Priority: P3)

**Goal:** Automated SpecKit validation workflow checking PRs for linked issues, spec files, test coverage, clean diff

**Independent Test:** Open PR without linked issue, verify workflow posts validation report comment

### Implementation for US4.5

- [ ] T205 [P] [US4.5] Create .github/workflows/speckit-validation.yml workflow file
- [ ] T206 [P] [US4.5] Add validation step 1: Check PR title follows pattern `type(scope): description (#issue)`
- [ ] T207 [P] [US4.5] Add validation step 2: Check linked issue exists via GitHub API
- [ ] T208 [P] [US4.5] Add validation step 3: For feature PRs, verify specs/NNN-feature/spec.md exists
- [ ] T209 [P] [US4.5] Add validation step 4: Check test coverage delta ≥0% (compare main vs branch)
- [ ] T210 [P] [US4.5] Add validation step 5: Scan diff for TODO/FIXME (fail if found without comment)
- [ ] T211 [US4.5] Add validation step 6: Check documentation updated if API changed (scan for api/ in diff)
- [ ] T212 [US4.5] Generate validation report: Format as markdown table with pass/fail per rule
- [ ] T213 [US4.5] Post report as PR comment: Use github-script action to comment
- [ ] T214 [US4.5] Configure as blocking check (optional): Set workflow to required in branch protection
- [ ] T215 [US4.5] Document validation rules in specs/005-sprint6-execution/quickstart.md (what triggers failure, how to fix)
- [ ] T216 [US4.5] Verify: Open test PR without linked issue, workflow runs and posts validation report

**Checkpoint:** SpecKit PR validation active - US4.5 complete, commit with `feat(ci): Add SpecKit PR validation workflow (#P3-S3-008)`

---

## Phase 22: Polish & Cross-Cutting Concerns

**Purpose:** Final improvements affecting multiple user stories

- [ ] T217 [P] Documentation: Update SPRINT6_EXECUTION_PLAN.md with completion status
- [ ] T218 [P] Documentation: Update PROGRESS_DASHBOARD.md with all 3 new journeys
- [ ] T219 [P] Documentation: Update .github/copilot-instructions.md with Sprint 6 learnings
- [ ] T220 Code cleanup: Remove unused imports, commented code, console.logs across all packages
- [ ] T221 Refactoring: Extract duplicate logic into shared utilities (e.g., export converters)
- [ ] T222 Performance: Verify Storybook build time <90s, Studio page load <2s
- [ ] T223 [P] Unit tests: Add missing tests to reach 100% coverage (optional)
- [ ] T224 Security: Run `pnpm audit --production`, fix high/critical vulnerabilities
- [ ] T225 Run quickstart.md validation: Follow guide from fresh clone, ensure steps work
- [ ] T226 Final build: `pnpm build && pnpm lint && pnpm -r type-check && pnpm test`
- [ ] T227 Generate Sprint 6 summary: Create SPRINT6_COMPLETION_REPORT.md with metrics (before/after)
- [ ] T228 Open Sprint 6 PR: Merge feature/sprint6-execution → copilot/apply-educacross-branding with comprehensive description

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1):** No dependencies - start immediately ✅
- **Foundational (Phase 2):** Depends on Setup - BLOCKS all user stories ⚠️
- **User Stories (Phases 3-21):** All depend on Foundational phase completion
  - **P1 Stories (US1.1-1.3):** Can run in parallel after Foundational (Week 1)
  - **P2 Stories (US2.1-2.5):** Can start after P1; US2.1 depends on US1.1 (CI stable)
  - **P2 Sprint 3 Stories (US3.1-3.6):** Can run in parallel; US3.2 depends on US3.1; US3.5/3.6 depend on US3.2
  - **P3 Stories (US4.1-4.5):** Can start anytime; independent enhancements
- **Polish (Phase 22):** Depends on all desired user stories being complete

### User Story Dependencies

**Linear Dependencies (MUST complete in order):**
- US3.1 (Progress) → US3.2 (Leaderboard) → US3.5 (FrontOffice uses Leaderboard) → US3.6 (Game Hub uses Progress + Leaderboard)
- US1.1 (CI/CD Fix) → US2.1 (E2E tests need stable CI)

**Independent Stories (can run in parallel):**
- US1.2 (Type Safety), US1.3 (Test Fixes) - different files
- US2.2 (Monitoring), US2.3 (Analytics), US2.4 (Templates), US2.5 (Export) - different domains
- US3.3 (DropZone), US3.4 (BackOffice) - independent of other stories
- US4.1 (Storybook), US4.2 (WCAG), US4.3 (Images), US4.4 (Health), US4.5 (Validation) - all independent

### Within Each User Story

1. **Tests first** (if included): Write E2E/contract tests, ensure they FAIL
2. **Models/Types**: Define interfaces and data structures
3. **Implementation**: Core logic, API handlers, UI components
4. **Integration**: Wire up dependencies (e.g., Leaderboard uses Progress)
5. **Verification**: Build, lint, type-check, test pass, Storybook renders
6. **Documentation**: Update README, quickstart, comments
7. **Story complete**: Commit with feat/fix message, open PR

### Parallel Opportunities

**Phase 2 (Foundational):**
- T007 (Playwright install) + T009 (Sentry install) + T010 (Analytics install) = 3 parallel

**Phase 4 (US1.2 Type Safety):**
- T020 (Storybook types) + T021 (DS types) + T022 (API types) = 3 parallel

**Phase 6 (US2.1 E2E Tests):**
- T037 (Dashboard API test) + T038 (Dashboard UI test) + T039 (Studio test) = 3 parallel
- T042 (Dashboard journey) + T043 (Studio journey) + T044 (Accessibility checks) = 3 parallel

**Phase 11 (US3.1 Progress):**
- T095 (TSX) + T096 (CSS) = 2 parallel
- T102 (Stories) + T103 (Tests) = 2 parallel

**Phase 12 (US3.2 Leaderboard):**
- T107 (Types) + T108 (TSX) + T109 (CSS) = 3 parallel
- T115 (Stories) + T116 (Tests) = 2 parallel

**Phase 14 (US3.4 BackOffice):**
- T128 (Login) + T129 (Dashboard) + T130 (Profile) = 3 parallel screens

**Phase 15 (US3.5 FrontOffice):**
- T138 (Welcome) + T139 (Character) + T140 (Quest) + T141 (Leaderboard) + T142 (Celebration) = 5 parallel screens

**Phase 16 (US3.6 Game Hub):**
- T152 (Hub home) + T153 (Game detail) + T154 (Global leaderboard) = 3 parallel pages

**Phase 22 (Polish):**
- T217 (Docs) + T218 (Dashboard) + T219 (Copilot) + T223 (Tests) = 4 parallel

---

## Parallel Example: User Story 3.1 (Progress Component)

```bash
# Launch UI files together:
Task T095: "Create Progress.tsx with linear/circular logic"
Task T096: "Create Progress.module.css consuming tokens"

# After implementation, launch verification together:
Task T102: "Create Storybook story with all variants"
Task T103: "Write unit tests in Progress.test.tsx"
```

---

## Parallel Example: User Story 3.5 (FrontOffice Journeys)

```bash
# Launch all 5 screen implementations together (different files):
Task T138: "Implement tela-1-boas-vindas.tsx (Welcome screen)"
Task T139: "Implement tela-2-personagem.tsx (Character selection)"
Task T140: "Implement tela-3-primeira-missao.tsx (Quest tutorial)"
Task T141: "Implement tela-4-leaderboard.tsx (Leaderboard)"
Task T142: "Implement tela-5-parabens.tsx (Celebration)"
```

---

## Implementation Strategy

### MVP First (P1 Only - Week 1)

1. Complete Phase 1: Setup ✅
2. Complete Phase 2: Foundational (installs) ✅
3. Complete Phase 3-5: P1 Items (CI/CD, Types, Tests) 🎯
4. **STOP and VALIDATE:** Run full quality gate `pnpm build && pnpm lint && pnpm -r type-check && pnpm test`
5. Deploy/merge if ready (zero warnings, 100% CI pass, 76/76 tests)

**Success Criteria:** Health score 95/100, zero blockers

### Incremental Delivery (P1 → P2 → P3)

**Week 1 (P1):**
1. Setup + Foundational → Foundation ready ✅
2. US1.1 (CI/CD) → CI reliable ✅
3. US1.2 (Types) → Type safety 100% ✅
4. US1.3 (Tests) → Test suite 100% ✅
5. **Deploy/Demo P1:** Show stakeholders clean build/test results

**Week 2 (P2):**
6. US2.1 (E2E) → Regression protection ✅
7. US2.2 (Monitoring) → Error visibility ✅
8. US2.3 (Analytics) → Usage insights ✅
9. US2.4 (Templates) → Documentation standards ✅
10. US2.5 (Export) → Multi-format support ✅
11. US3.1 (Progress) → DS component ready ✅
12. US3.2 (Leaderboard) → DS component ready ✅
13. US3.4 (BackOffice) → Admin workflows ✅
14. US3.5 (FrontOffice) → Player onboarding ✅
15. US3.6 (Game Hub) → Game catalog ✅
16. **Deploy/Demo P2:** Show stakeholders complete features (≥80% P2 done)

**Week 3 (P3 - Optional):**
17. US4.1 (Storybook) → Complete DS catalog ✅
18. US4.2 (WCAG AAA) → Accessibility enhanced ✅
19. US4.3 (Images) → Performance optimized ✅
20. US4.4 (Health) → Dashboard enhanced ✅
21. US4.5 (Validation) → PR quality automated ✅
22. Polish phase → Clean up, final docs ✅
23. **Deploy/Demo P3:** Show stakeholders polish items (50-80% P3 done)

### Parallel Team Strategy

With 6 team members (from SPRINT6_EXECUTION_PLAN.md):

**Week 1 (P1 - All Hands):**
- **DevOps Lead:** US1.1 (CI/CD Fix) - 1 day
- **Frontend Lead + QA Engineer (Pairing):** US1.2 (Type Safety) - 2 days
- **QA Engineer:** US1.3 (Test Fixes) - 1 day
- **Backend Engineer:** Support US1.2 with API route types - 1 day

**Week 2 (P2 - Parallel Execution):**
- **DevOps Lead:** US2.2 (Monitoring), US2.3 (Analytics) - 2 days
- **QA Engineer:** US2.1 (E2E Tests) - 2 days
- **Frontend Lead:** US2.5 (Export), US3.1 (Progress), US3.2 (Leaderboard) - 3.5 days
- **Backend Engineer:** US2.5 (Export backend), US3.4 (BackOffice) - 2.5 days
- **DS Lead:** US3.1 (Progress), US3.2 (Leaderboard) - 4.5h, then US2.4 (Templates) - 1 day
- **Journey Designer:** US3.4 (BackOffice), US3.5 (FrontOffice), US3.6 (Game Hub) - 12h total

**Week 3 (P3 - Optional Enhancements):**
- **DS Lead:** US4.1 (Storybook Coverage) - 1 day
- **Frontend Lead:** US4.2 (WCAG AAA), US4.3 (Images) - 1.5 days
- **Backend Engineer:** US4.4 (Health Indicators) - 4h
- **DevOps Lead:** US4.5 (SpecKit Validation) - 1h, then Polish - 0.5 days
- **All Team:** Code review, testing, final validation - 1 day

---

## Task Summary

**Total Tasks:** 228 tasks across 22 phases
- **Setup (Phase 1):** 5 tasks
- **Foundational (Phase 2):** 6 tasks (BLOCKING)
- **P1 Stories (Phases 3-5):** 28 tasks (3 user stories)
- **P2 Stories (Phases 6-16):** 151 tasks (11 user stories)
- **P3 Stories (Phases 17-21):** 26 tasks (5 user stories)
- **Polish (Phase 22):** 12 tasks

**Effort Breakdown:**
- P1: 4 days (32 hours)
- P2: 10.5 days (84 hours)
- P3: 2.75 days (22 hours)
- Total: 17.25 person-days (138 hours)

**Parallelization:**
- 89 tasks marked [P] can run in parallel within their phase
- Maximum parallel tasks per phase: 5 tasks (Phase 15 - FrontOffice screens)
- Effective parallelization can reduce calendar time from 17 days → 10-12 days with 6 team members

**Quality Gates:**
- Every phase ends with verification checkpoint
- Phases 3-5 (P1) have explicit `pnpm build && pnpm lint && pnpm -r type-check && pnpm test` verification
- Phases 6-21 include Storybook render checks for UI components
- Phase 22 includes full quickstart validation from fresh clone

---

## Notes

- **[P] Tasks:** Different files or independent operations, safe to parallelize
- **[Story] Labels:** Map tasks to user stories (US1.1, US2.1, etc.) for traceability
- **Task IDs:** Sequential T001-T228 for execution tracking and dependency management
- **Constitution:** Every task respects principles (run-ready, single DS, documented journeys, typed APIs, automation)
- **Commits:** Use conventional format `type(scope): description (#issue)` linking to user story issue
- **Verification:** Test story independently at each checkpoint before proceeding
- **Dependencies:** Linear chains (US3.1 → US3.2 → US3.5 → US3.6) enforced via task order
- **Quality:** No task considered "done" until `pnpm build && pnpm lint && pnpm -r type-check` passes
- **Documentation:** Every user story ends with README/quickstart updates for traceability

**Success Metrics (Sprint 6 Target):**
- 100% P1 completion (3/3 stories)
- ≥80% P2 completion (9-10/11 stories)
- 50-80% P3 completion (3-4/5 stories)
- Health score: 95/100 (up from 92/100)
- Zero type warnings (down from 22)
- 100% test pass rate (up from 97.4%)
- 100% CI pass rate (up from ~80%)
- E2E coverage ≥80% (new)
- Monitoring active (Sentry, new)
- Analytics tracking ≥5 events (new)

**Ready for Sprint 6 Execution:** Monday, 09/12/2025 @ 09:00 🚀
