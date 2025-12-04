# Sprint 6 Execution — Spec

**Feature:** Sprint 6 Complete Execution Plan  
**Timeline:** 2025-12-09 to 2025-12-20 (2-3 weeks)  
**Priority:** P1 (Critical Path) + P2 (Features) + P3 (Enhancements)  
**Depends On:** Sprint 3 completion, Sprint 5 deliverables, PR #125 merge  

---

## Executive Summary

Sprint 6 consolidates technical debt elimination (P1), production readiness features (P2), and Sprint 3 deferred items (8 items moved for scope optimization). The sprint targets 20 total items across 17.25 person-days with 5-6 team members. Success criteria: 100% P1 completion by Week 1 end, 80%+ P2 completion by Week 2 end, P3 items optional.

**Key Outcomes:**
- Zero TypeScript warnings, 100% CI pass rate, 100% test coverage
- E2E testing framework with 80%+ coverage
- Monitoring (Sentry) and analytics (GA/Mixpanel) active
- 2 new Design System components (Progress, Leaderboard)
- 3 Journey implementations (BackOffice, FrontOffice, Game Hub)
- Enhanced documentation templates and tooling

---

## User Stories

### Phase 1: Critical Fixes (P1 - Week 1)

#### US1.1 (P1-001): CI/CD Fix
**As a** DevOps engineer  
**I want** all GitHub Actions checks passing without manual override  
**So that** every PR validates automatically and merge blockers are visible  

**Acceptance Criteria:**
- AC1: `.github/workflows/sprint-2-validation.yml` passes on main branch
- AC2: All workflow jobs (build, lint, test, type-check) complete successfully
- AC3: No `continue-on-error: true` overrides remain
- AC4: Workflow run time <10 minutes
- AC5: Documentation updated with CI fix details

**Priority:** P1 (Blocker)  
**Effort:** 1 day  
**Dependencies:** None  

---

#### US1.2 (P1-002): TypeScript Type Safety
**As a** TypeScript developer  
**I want** zero type warnings across all packages  
**So that** type safety is guaranteed and IDE experience is clean  

**Acceptance Criteria:**
- AC1: `pnpm -r type-check` returns 0 warnings (currently 22)
- AC2: Storybook types fully resolved (remove `@ts-expect-error` annotations)
- AC3: Design System component prop types complete with JSDoc
- AC4: API route handlers have explicit return types
- AC5: No usage of `any` type without justification comment

**Priority:** P1 (Quality Gate)  
**Effort:** 2 days  
**Dependencies:** None  

---

#### US1.3 (P1-003): Unit Test Fixes
**As a** QA engineer  
**I want** all 76 unit tests passing consistently  
**So that** test suite is reliable and regressions are caught  

**Acceptance Criteria:**
- AC1: `pnpm test` passes 76/76 tests (currently 74/76 = 97.4%)
- AC2: Flaky tests stabilized or rewritten
- AC3: Test coverage maintained at ≥95%
- AC4: No skipped tests without documented reason
- AC5: CI test step completes in <2 minutes

**Priority:** P1 (Quality Gate)  
**Effort:** 1 day  
**Dependencies:** None  

---

### Phase 2: Production Readiness (P2 - Week 1-2)

#### US2.1 (P2-001): E2E Test Suite
**As a** QA engineer  
**I want** end-to-end tests covering critical user journeys  
**So that** production deployments are validated automatically  

**Acceptance Criteria:**
- AC1: Playwright configured with 3 browsers (Chromium, Firefox, WebKit)
- AC2: Dashboard journey tested (KPIs load, health metrics render, pages list works)
- AC3: Studio journey tested (page create, edit, save, publish)
- AC4: Test coverage ≥80% of user-facing features
- AC5: E2E tests run in CI with screenshot/video artifacts on failure
- AC6: Test execution time <5 minutes

**Priority:** P2  
**Effort:** 2 days  
**Dependencies:** P1-001 (CI/CD must be stable)  

---

#### US2.2 (P2-002): Monitoring Setup
**As a** DevOps engineer  
**I want** Sentry integrated for error tracking  
**So that** production issues are caught and triaged automatically  

**Acceptance Criteria:**
- AC1: Sentry SDK installed and configured in Next.js app
- AC2: Error boundaries send exceptions to Sentry
- AC3: API route errors tracked with context (user, endpoint, payload)
- AC4: Source maps uploaded for production builds
- AC5: Alert rules configured for critical errors (>10/hour)
- AC6: Dashboard widget shows error rate (optional)

**Priority:** P2  
**Effort:** 1 day  
**Dependencies:** None  

---

#### US2.3 (P2-003): Analytics Integration
**As a** product manager  
**I want** Google Analytics or Mixpanel tracking user interactions  
**So that** we understand feature usage and optimize journeys  

**Acceptance Criteria:**
- AC1: GA4 or Mixpanel SDK integrated
- AC2: Page views tracked automatically
- AC3: Custom events for key actions (dashboard load, page create, export CSV)
- AC4: User properties tracked (session ID, journey context)
- AC5: Privacy compliance checked (cookie consent, data retention)
- AC6: Analytics dashboard accessible to PMs

**Priority:** P2  
**Effort:** 1 day  
**Dependencies:** None  

---

#### US2.4 (P2-004): Documentation Templates
**As a** developer  
**I want** standardized templates for journeys and features  
**So that** documentation is consistent and discoverable  

**Acceptance Criteria:**
- AC1: Journey template with sections (objective, status, components, links)
- AC2: Feature spec template with user stories, acceptance criteria, dependencies
- AC3: API documentation template with OpenAPI/GraphQL schema
- AC4: 3+ existing journeys migrated to new templates
- AC5: README generator script (optional) for batch updates

**Priority:** P2  
**Effort:** 1 day  
**Dependencies:** None  

---

#### US2.5 (P2-005): CSV Enhancement (JSON/XML)
**As an** admin  
**I want** export/import supporting JSON and XML formats  
**So that** data interchange works with diverse systems  

**Acceptance Criteria:**
- AC1: Export button offers CSV, JSON, XML format selection
- AC2: JSON export matches OpenAPI schema
- AC3: XML export validates against XSD (if applicable)
- AC4: Import accepts all 3 formats with schema validation
- AC5: Error messages specify format issues (line number, field name)
- AC6: Unit tests for each format converter

**Priority:** P2  
**Effort:** 1.5 days  
**Dependencies:** None  

---

### Phase 3: Sprint 3 Moved Items (P2 - Week 2)

#### US3.1 (P2-S3-001): Progress Component
**As a** UI developer  
**I want** a reusable Progress component in the Design System  
**So that** loading states and completion tracking are consistent  

**Acceptance Criteria:**
- AC1: `Progress.tsx` with linear and circular variants
- AC2: Props: `value` (0-100), `variant`, `size`, `color`, `animated`
- AC3: 4 color variants (primary, success, warning, danger)
- AC4: 3 sizes (sm, md, lg)
- AC5: ARIA `role="progressbar"` with `aria-valuenow`
- AC6: Storybook story with all variants
- AC7: Exported via `packages/design-system/src/index.ts`
- AC8: CSS Modules consuming tokens

**Priority:** P2  
**Effort:** 2 hours  
**Dependencies:** None  

**File Paths:**
```
packages/design-system/src/components/Progress/
├── Progress.tsx
├── Progress.module.css
└── Progress.stories.tsx (in domains/storybook/)
```

---

#### US3.2 (P2-S3-002): Leaderboard Component
**As a** game designer  
**I want** a Leaderboard component displaying ranked players  
**So that** competitive features are easy to implement  

**Acceptance Criteria:**
- AC1: `Leaderboard.tsx` with `LeaderboardEntry[]` prop
- AC2: Each entry shows: rank, avatar, name, score, progress
- AC3: Highlight current user with distinct styling
- AC4: Top 10 entries displayed by default (configurable)
- AC5: Uses `Progress` component for progress bars
- AC6: Responsive layout (stacks on mobile)
- AC7: Keyboard navigation (arrow keys move focus)
- AC8: Skeleton loading state for async data

**Priority:** P2  
**Effort:** 2.5 hours  
**Dependencies:** P2-S3-001 (Progress component)  

**TypeScript Interface:**
```typescript
type LeaderboardEntry = {
  rank: number;
  playerId: string;
  name: string;
  avatar?: string;
  score: number;
  progress: number; // 0-100
  isCurrentUser?: boolean;
};

type LeaderboardProps = {
  entries: LeaderboardEntry[];
  maxEntries?: number;
  loading?: boolean;
  emptyMessage?: string;
};
```

**File Paths:**
```
packages/design-system/src/components/Leaderboard/
├── Leaderboard.tsx
├── Leaderboard.module.css
└── Leaderboard.stories.tsx (in domains/storybook/)
```

---

#### US3.3 (P2-S3-003): Puck DropZone Integration
**As a** Studio user  
**I want** visual zone editing in Puck  
**So that** layouts can be adjusted without code  

**Acceptance Criteria:**
- AC1: `@measured/puck/DropZone` imported in `puck.config.tsx`
- AC2: Studio editor shows zone placeholders visually
- AC3: Components can be dragged into zones
- AC4: JSON schema includes `zones` array per component
- AC5: No console errors when using DropZone
- AC6: Documentation updated with DropZone usage examples

**Priority:** P2 (Optional - validated as non-blocker)  
**Effort:** 2.5 hours  
**Dependencies:** None  

**VALIDATION NOTE:** Technical validation (04/12/2025) proved #59 is NOT a blocker:
- `grep -r "DropZone" apps/studio/` → 0 matches
- `pnpm build` → SUCCESS without DropZone
- Dashboard (#53/#54) → FUNCTIONAL without DropZone
- Conclusion: This is an enhancement, not a fix. Consider deferring to Sprint 7+ if visual zone editing not immediately needed.

**File Paths:**
```
apps/studio/src/config/puck.config.tsx (update imports)
apps/studio/src/app/[[...slug]]/page.tsx (optional usage)
```

---

#### US3.4 (P2-S3-004): BackOffice Journeys (3 Screens)
**As an** admin  
**I want** 3 BackOffice screens for admin workflows  
**So that** admin tasks are discoverable and functional  

**Acceptance Criteria:**
- AC1: Login screen with form validation
- AC2: Dashboard screen with admin KPIs
- AC3: Profile management screen with edit functionality
- AC4: Each screen has README with screenshots
- AC5: Responsive layout (mobile, tablet, desktop)
- AC6: Uses Design System components exclusively

**Priority:** P2  
**Effort:** 5 hours  
**Dependencies:** None  

**File Structure:**
```
domains/BackOffice/journeys/admin-workflow/
├── README.md
├── tela-1-login.tsx
├── tela-2-dashboard.tsx
└── tela-3-perfil.tsx
```

**Components per Screen:**
- **Login:** Form, Input, Button, ErrorBanner
- **Dashboard:** KPIGrid, StatsCard, Navigation
- **Profile:** Form, Avatar, Input, Button

---

#### US3.5 (P2-S3-005): FrontOffice Journeys (5 Screens)
**As a** player  
**I want** 5 FrontOffice onboarding screens  
**So that** the game experience is intuitive from first launch  

**Acceptance Criteria:**
- AC1: Welcome screen with brand visuals
- AC2: Character selection with interactive previews
- AC3: First quest tutorial with step-by-step guidance
- AC4: Leaderboard screen using `Leaderboard` component
- AC5: Celebration screen with confetti animation
- AC6: Flow documented in README with navigation diagram
- AC7: Each screen responsive and keyboard navigable

**Priority:** P2  
**Effort:** 4 hours  
**Dependencies:** P2-S3-002 (Leaderboard component)  

**File Structure:**
```
domains/FrontOffice/journeys/onboarding-flow/
├── README.md
├── tela-1-boas-vindas.tsx
├── tela-2-personagem.tsx
├── tela-3-primeira-missao.tsx
├── tela-4-leaderboard.tsx (uses Leaderboard component)
└── tela-5-parabens.tsx
```

---

#### US3.6 (P2-S3-006): Game Hub
**As a** player  
**I want** a Game Hub showcasing available games  
**So that** I can discover and launch experiences  

**Acceptance Criteria:**
- AC1: Hub home with game catalog (grid layout)
- AC2: Game detail page with description, progress, leaderboard
- AC3: Global leaderboard page with filters (by game, by time period)
- AC4: Uses `Progress` and `Leaderboard` components
- AC5: 12 mock game entries for demo
- AC6: Search and filter functionality

**Priority:** P2  
**Effort:** 3 hours  
**Dependencies:** P2-S3-001 (Progress), P2-S3-002 (Leaderboard)  

**File Structure:**
```
domains/FrontOffice/journeys/game-hub/
├── README.md
├── hub-home.tsx (game catalog)
├── game-detail.tsx (individual game)
└── leaderboard-global.tsx (cross-game rankings)
```

---

### Phase 4: Enhancements (P3 - Week 2-3)

#### US4.1 (P3-001): Storybook Coverage Expansion
**As a** UI developer  
**I want** stories for all Design System components  
**So that** component catalog is complete and explorable  

**Acceptance Criteria:**
- AC1: Every component in `packages/design-system/src/components/` has ≥1 story
- AC2: Edge cases covered (empty states, long text, errors)
- AC3: Interactive controls via Storybook Controls addon
- AC4: Accessibility checks enabled for all stories
- AC5: Autodocs generated from JSDoc comments

**Priority:** P3  
**Effort:** 1 day  
**Dependencies:** None  

---

#### US4.2 (P3-002): WCAG 2.1 AAA Audit
**As an** accessibility specialist  
**I want** AAA compliance audit results  
**So that** we exceed minimum accessibility standards  

**Acceptance Criteria:**
- AC1: axe-core checks pass at AAA level (currently AA+)
- AC2: Color contrast ratios ≥7:1 for normal text
- AC3: Focus indicators meet enhanced visibility requirements
- AC4: Animation respects `prefers-reduced-motion`
- AC5: Audit report generated with findings and fixes

**Priority:** P3  
**Effort:** 1 day  
**Dependencies:** None  

---

#### US4.3 (P3-003): Image Optimization
**As a** performance engineer  
**I want** images served in modern formats with lazy loading  
**So that** page load times are minimized  

**Acceptance Criteria:**
- AC1: Next.js `<Image>` component used for all static images
- AC2: WebP format with PNG/JPEG fallback
- AC3: Lazy loading enabled for below-the-fold images
- AC4: Lighthouse Performance score ≥90
- AC5: Image assets <500KB total per page

**Priority:** P3  
**Effort:** 0.5 days  
**Dependencies:** None  

---

#### US4.4 (P3-S3-007): Health Indicators Enhancement
**As an** operator  
**I want** 8 additional health metrics in the dashboard  
**So that** system status is comprehensive  

**Acceptance Criteria:**
- AC1: New metrics: `codeQualityScore`, `testCoverage`, `technicalDebtHours`, `performanceScore`, `securityVulnerabilities`, `lastDeployment`, `uptime`, `errorRate`
- AC2: API endpoint `/api/dashboard/health` extended with new fields
- AC3: Dashboard UI displays 12 total metrics (4 existing + 8 new) in grid
- AC4: Color-coded thresholds (green/yellow/red) per metric
- AC5: Historical trend graphs (optional)

**Priority:** P3  
**Effort:** 4 hours  
**Dependencies:** None  

**API Schema Extension:**
```typescript
type HealthMetrics = {
  // Existing
  buildStatus: 'passing' | 'failing';
  testCoverage: number; // 0-100
  typeErrors: number;
  lintWarnings: number;
  
  // New
  codeQualityScore: number; // 0-100
  technicalDebtHours: number;
  performanceScore: number; // 0-100
  securityVulnerabilities: number;
  lastDeployment: string; // ISO 8601
  uptime: number; // percentage 0-100
  errorRate: number; // errors per hour
};
```

---

#### US4.5 (P3-S3-008): SpecKit PR Validation
**As a** reviewer  
**I want** automated SpecKit validation on every PR  
**So that** quality standards are enforced before merge  

**Acceptance Criteria:**
- AC1: GitHub Action workflow `.github/workflows/speckit-validation.yml`
- AC2: Validates: PR has linked issue, spec.md exists, commit messages follow convention
- AC3: Checks: test coverage not decreased, no TODO/FIXME in diff
- AC4: Posts validation report as PR comment
- AC5: Configurable as blocking or non-blocking check
- AC6: Documentation for team on validation rules

**Priority:** P3  
**Effort:** 1 hour  
**Dependencies:** None  

**Validation Rules:**
1. PR title follows pattern: `type(scope): description (#issue)`
2. Linked issue exists in GitHub
3. For feature PRs: `specs/NNN-feature/spec.md` exists
4. Test coverage delta ≥0%
5. No `TODO` or `FIXME` in PR diff (unless documented)
6. Documentation updated if API changed

---

#### US4.6 (P3-S3-009): Code-to-Figma Documentation
**As a** designer  
**I want** complete documentation for Code-to-Figma sync  
**So that** I can maintain Storybook ↔ Figma parity  

**Acceptance Criteria:**
- AC1: `code-to-figma/README.md` updated with Sprint 6 roadmap
- AC2: `code-to-figma/BACKLOG.md` with 25+ categorized items (P0-P3)
- AC3: `code-to-figma/INTEGRATION_GUIDE.md` with step-by-step setup
- AC4: `code-to-figma/TROUBLESHOOTING.md` with common issues and fixes
- AC5: New contributor can run sync in <30 minutes following docs

**Priority:** P3  
**Effort:** 2 hours  
**Dependencies:** None  

**File Structure:**
```
code-to-figma/
├── README.md (updated)
├── BACKLOG.md (new)
├── INTEGRATION_GUIDE.md (new)
└── TROUBLESHOOTING.md (new)
```

---

## Non-Functional Requirements

### Performance
- **NFR-P1:** Dashboard API responses <200ms (cached data)
- **NFR-P2:** Dashboard UI initial render <300ms
- **NFR-P3:** Storybook build time <90 seconds
- **NFR-P4:** E2E test suite execution <5 minutes
- **NFR-P5:** Lighthouse Performance score ≥90

### Accessibility
- **NFR-A1:** WCAG 2.1 AA compliance mandatory (AAA target for P3-002)
- **NFR-A2:** Keyboard navigation for all interactive elements
- **NFR-A3:** Screen reader tested with NVDA/JAWS
- **NFR-A4:** Focus indicators visible with ≥3:1 contrast
- **NFR-A5:** `prefers-reduced-motion` respected

### Quality
- **NFR-Q1:** 100% CI pass rate (no overrides)
- **NFR-Q2:** 0 TypeScript type warnings
- **NFR-Q3:** ≥95% test coverage
- **NFR-Q4:** No console errors in production builds
- **NFR-Q5:** All Storybook stories render without errors

### Documentation
- **NFR-D1:** Every journey has README with objective, status, components, links
- **NFR-D2:** API schemas documented with TypeScript interfaces
- **NFR-D3:** Component props documented with JSDoc
- **NFR-D4:** Sprint retrospective published by 20/12/2025
- **NFR-D5:** Health dashboard reflects real-time status

---

## Dependencies & Constraints

### External Dependencies
- **DEP-1:** PR #125 merge (Sprint 5 deliverables)
- **DEP-2:** Sentry account and project setup (P2-002)
- **DEP-3:** Google Analytics or Mixpanel account (P2-003)
- **DEP-4:** Playwright browsers installed (P2-001)

### Internal Dependencies
- **DEP-5:** P2-S3-001 (Progress) → P2-S3-002 (Leaderboard) → P2-S3-006 (Game Hub)
- **DEP-6:** P2-S3-002 (Leaderboard) → P2-S3-005 (FrontOffice tela-4)
- **DEP-7:** P1-001 (CI/CD) → All subsequent items (stable pipeline required)

### Technical Constraints
- **CON-1:** Node 22.21.1, pnpm 9.14.4+ (locked)
- **CON-2:** Next.js 15 App Router (no Pages Router)
- **CON-3:** Design System components only (no inline Tailwind outside Studio)
- **CON-4:** CSS Modules consuming tokens (no CSS-in-JS)
- **CON-5:** Build order: tokens → design-system → studio/storybook

### Timeline Constraints
- **TC-1:** Sprint start: 09/12/2025 (Monday kickoff)
- **TC-2:** P1 items due: 13/12/2025 (end of Week 1)
- **TC-3:** Sprint end: 20/12/2025 (baseline) or 27/12/2025 (buffer)
- **TC-4:** Holiday period: 23-27/12 (limited availability)

---

## Success Metrics

### Mandatory (Sprint Closure Criteria)
- ✅ All P1 items complete and merged
- ✅ CI/CD passing 100% (no overrides)
- ✅ 0 TypeScript warnings
- ✅ 76/76 unit tests passing
- ✅ Health score ≥95/100 (up from 92/100)

### Target (80% Threshold)
- ✅ ≥8/10 P2 items complete (80%)
- ✅ E2E coverage ≥80%
- ✅ Monitoring active (Sentry sending events)
- ✅ Analytics tracking ≥5 key actions
- ✅ ≥2 Design System components delivered

### Stretch (Nice-to-Have)
- ✅ All 20 items complete (100%)
- ✅ WCAG 2.1 AAA compliance
- ✅ Sprint 3 moved items 100% complete
- ✅ Lighthouse Performance ≥95

---

## Risk Management

### High-Impact Risks

**RISK-1: P1-002 TypeScript fixes exceed 2 days**
- **Probability:** Medium
- **Impact:** High (blocks Week 2 progress)
- **Mitigation:** Allocate 2 developers for pairing on Day 2
- **Contingency:** Extend to Day 3, defer P3-003 (Image Opt)

**RISK-2: E2E tests don't reach 80% coverage**
- **Probability:** Medium
- **Impact:** Medium (NFR miss but not blocker)
- **Mitigation:** QA + Frontend pairing on Day 4
- **Contingency:** Accept 60-70%, plan Sprint 7 continuation

**RISK-3: Holiday absences (23-27/12)**
- **Probability:** High
- **Impact:** Medium (only if Week 3 needed)
- **Mitigation:** Complete P1/P2 by 20/12
- **Contingency:** Use Week 3 only for polish, defer P3 to Sprint 7

**RISK-4: PR review bottleneck**
- **Probability:** Medium
- **Impact:** Medium (slows merge velocity)
- **Mitigation:** Tech Lead dedicates 1 day to reviews
- **Contingency:** Async reviews, allow self-merge with 1 approval

**RISK-5: Sprint 3 moved items overrun**
- **Probability:** Low
- **Impact:** Low (all are P2/P3, deferrable)
- **Mitigation:** Start early (Day 4), prioritize #60/#61
- **Contingency:** Defer #56/#57 journeys to Sprint 7

---

## Constitution Alignment

### Run-Ready Prototypes Only ✅
All deliverables validated via:
- P1-001 ensures CI/CD gates enforce build/lint/type-check
- P1-002/P1-003 eliminate warnings and test failures
- Every PR requires passing quality gates before merge
- Documentation includes setup steps and validation commands

### Single Design System Surface ✅
- P2-S3-001/P2-S3-002 add components to `@prototipo/design-system`
- P2-S3-004/P2-S3-005 journeys use DS components exclusively
- P3-001 expands Storybook coverage for all DS components
- CSS Modules consume tokens (no inline styles)

### Documented Journeys Stay Traceable ✅
- P2-004 creates standardized journey templates
- P2-S3-004/P2-S3-005/P2-S3-006 include README files
- P3-S3-007 updates dashboard to reflect health metrics
- P3-S3-009 maintains Code-to-Figma documentation

### Typed APIs & Observable Dashboards ✅
- P2-S3-007 extends health API with typed interfaces
- P2-002 monitoring tracks errors with context
- P2-003 analytics provides usage observability
- All API handlers use explicit TypeScript return types (enforced by P1-002)

### Automation-First Quality Gates ✅
- P3-S3-008 adds SpecKit PR validation workflow
- P2-001 E2E tests automate regression detection
- P1-001 ensures CI pipeline is reliable
- This spec follows SpecKit plan/spec/tasks structure

---

## Rollback & Mitigation

### P1 Item Rollback
- **P1-001 (CI/CD):** Revert workflow changes, re-enable manual overrides temporarily
- **P1-002 (Types):** Use `@ts-expect-error` with justification comments, defer to Sprint 7
- **P1-003 (Tests):** Skip failing tests with `test.skip()`, open issues for investigation

### P2 Feature Rollback
- **P2-001 (E2E):** Disable E2E workflow step, continue with unit tests only
- **P2-002 (Monitoring):** Remove Sentry SDK, rely on console logs for debugging
- **P2-003 (Analytics):** Disable tracking, defer analytics to Sprint 7
- **P2-S3-001/002:** Unpublish components from design-system, remove from exports

### General Mitigation
- Feature flags for new components (enable/disable via env var)
- Branch protection allows emergency bypasses with 2 approvals
- Hotfix process: create `hotfix/` branch, fast-track review, deploy to staging first
- Communication: Slack #sprint6 for immediate alerts, email for stakeholder updates

---

## Glossary

- **DS:** Design System (`packages/design-system`)
- **E2E:** End-to-End (testing full user journeys)
- **KPI:** Key Performance Indicator (metric on dashboard)
- **NFR:** Non-Functional Requirement (performance, accessibility, quality)
- **P1/P2/P3:** Priority levels (P1=Critical, P2=Important, P3=Nice-to-have)
- **PR:** Pull Request (GitHub code review workflow)
- **SWR:** Stale-While-Revalidate (data fetching library)
- **WCAG:** Web Content Accessibility Guidelines

---

**Version:** 1.0.0  
**Author:** GitHub Copilot + EDUCACROSS Team  
**Date:** 2025-12-04  
**Status:** Ready for Execution  
