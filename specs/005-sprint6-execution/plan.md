# Sprint 6 Execution — Implementation Plan

**Feature:** Sprint 6 Complete Execution (20 items, 17.25 person-days)  
**Tech Stack:** Node 22.21.1, pnpm 9.14.4+, TypeScript 5, Next.js 15 (App Router), SWR, Storybook 8, Playwright, Sentry, Vitest  
**Timeline:** 2025-12-09 to 2025-12-20 (2-3 weeks)  

---

## Technical Context

### Stack & Dependencies
- **Runtime:** Node 22.21.1 (`.nvmrc`), pnpm 9.14.4+ workspaces
- **Framework:** Next.js 15 App Router, React 18, TypeScript 5 strict mode
- **Testing:** Vitest (unit), Playwright (E2E), axe-core (accessibility)
- **Monitoring:** Sentry SDK for error tracking
- **Analytics:** Google Analytics 4 or Mixpanel SDK
- **Data Fetching:** SWR for client-side, async/await for server components
- **Styling:** CSS Modules consuming tokens from `packages/tokens/src/tokens.json`
- **Design System:** `@prototipo/design-system` with Radix UI primitives
- **Build:** Turbo for monorepo orchestration, tsup for package builds
- **CI/CD:** GitHub Actions (`.github/workflows/sprint-2-validation.yml`)

### Build Order (Critical)
```bash
1. pnpm build:tokens          # Generate CSS variables
2. pnpm build:design-system   # Compile DS components
3. pnpm build                 # Build studio + storybook
```

### Current Known Issues
1. **CI/CD:** 2 non-critical workflow failures (manual override active)
2. **TypeScript:** 22 type warnings across Storybook and Design System
3. **Tests:** 2/76 unit tests failing (97.4% pass rate)
4. **Chunks:** Storybook preview bundle >1MB (performance warning)

---

## Constitution Check

### Principle 1: Run-Ready Prototypes Only ✅
**Compliance:** FULL  
**Evidence (Quantified):**
- P1-001 (CI/CD Fix) reduces manual override count from 2→0, workflow run time from 12min→<10min
- P1-002 (Type Safety) eliminates TypeScript warnings from 22→0 across all packages
- P1-003 (Test Fixes) increases test pass rate from 97.4% (74/76)→100% (76/76)
- Every PR validated via `pnpm build && pnpm lint && pnpm -r type-check` (automated gates)
- Documentation includes setup scripts and validation commands (quickstart.md 2,340 lines)
- Foundational phase (T011) verifies build stays green after all dependency installs

**Justification:** Sprint 6 P1 items specifically target "run-ready" state by removing all build/lint/test blockers. The 3-step build order is enforced via CI and documented in QUICK_START guides. Before Sprint 6: CI pass rate ~80%, 22 type warnings, 97.4% test pass. After Sprint 6: 100% CI, 0 warnings, 100% tests.

---

### Principle 2: Single Design System Surface ✅
**Compliance:** FULL  
**Evidence (Quantified):**
- P2-S3-001 (Progress) and P2-S3-002 (Leaderboard) increase DS component count from 18→20
- All components use CSS Modules with token variables (100% token coverage)
- P2-S3-004/005/006 (Journeys) exclusively use DS components (11 screens: 3+5+3)
- P3-001 (Storybook Coverage) ensures all DS components have stories (target: 20/20 = 100%)
- Registration in `puck.config.tsx` for Studio integration (2 new components registered)
- Storybook story count increases from ~60→~80 stories (estimated)

**Justification:** New components follow established patterns: `'use client'`, `React.forwardRef`, JSDoc props, CSS Modules, Storybook stories. No inline Tailwind or CSS-in-JS outside Studio's dashboard/studio directories. Before Sprint 6: 18 DS components, ~60 stories. After Sprint 6: 20 components, ~80 stories.

---

### Principle 3: Documented Journeys Stay Traceable ✅
**Compliance:** FULL  
**Evidence:**
- P2-004 creates standardized journey templates (README, notes, links)
- P2-S3-004 (BackOffice), P2-S3-005 (FrontOffice), P2-S3-006 (Game Hub) include README files
- P3-S3-007 updates dashboard health metrics to reflect journey status
- P3-S3-009 maintains Code-to-Figma documentation for design sync
- SPRINT6_ROADMAP.md and SPRINT6_EXECUTION_PLAN.md provide cross-references

**Justification:** Every new journey includes `README.md` with objective, status, components used, and links to Studio pages. Dashboard references updated in same PR when journeys change.

---

### Principle 4: Typed APIs & Observable Dashboards ✅
**Compliance:** FULL  
**Evidence (Quantified):**
- P3-S3-007 extends `/api/dashboard/health` with 8 new metrics (4 existing→12 total)
- P2-002 (Monitoring) adds Sentry for error observability (tracks exceptions with context)
- P2-003 (Analytics) provides usage metrics (≥5 events: page_view, dashboard_load, page_create, csv_export, journey_complete)
- P1-002 enforces explicit return types on all API route handlers (22 implicit any→0)
- Dashboard uses SWR with loading/error/empty states (100% endpoint coverage)
- Health dashboard score target: 92/100→95/100 (+3 points)

**Justification:** All API handlers use TypeScript interfaces, explicit error handling, and observability via Sentry/Analytics. Dashboard consumes typed responses with skeleton placeholders during loading. Before Sprint 6: 4 health metrics, no monitoring, no analytics. After Sprint 6: 12 metrics, Sentry active, GA4 tracking 5+ events.

---

### Principle 5: Automation-First Quality Gates ✅
**Compliance:** FULL  
**Evidence:**
- P3-S3-008 adds SpecKit PR validation workflow (`.github/workflows/speckit-validation.yml`)
- P2-001 (E2E Tests) automates regression detection with Playwright
- P1-001 ensures CI pipeline is reliable and non-overridable
- This spec follows SpecKit structure: `specs/005-sprint6-execution/spec.md`, `plan.md`, `tasks.md`
- Every PR requires: (1) passing CI, (2) SpecKit validation, (3) updated docs

**Justification:** Automated gates enforce structure before human review. CI validates build/lint/type-check; SpecKit validates spec compliance; E2E validates user journeys. Manual reviewers focus on behaviour and design.

---

### Complexity Tracking
**Overall Complexity:** MEDIUM-HIGH  
**Rationale:**
- **P1 items (Medium):** Fixing 22 type warnings requires careful TypeScript refactoring across multiple packages
- **P2 items (Medium):** E2E testing framework setup is straightforward but time-consuming
- **P3 items (Low):** Most are documentation or incremental enhancements
- **Dependencies:** Linear dependency chain (P2-S3-001 → P2-S3-002 → P2-S3-006) well-defined
- **Risks:** TypeScript fixes and E2E coverage are most likely to exceed estimates

**Mitigation:**
- Pair programming for P1-002 (Type Safety) starting Day 2
- QA + Frontend collaboration for P2-001 (E2E) to accelerate coverage
- Daily standups to identify blockers early

---

## Project Structure

### Key Directories
```
apps/
├── studio/
│   ├── src/app/api/dashboard/          # API route handlers
│   ├── src/app/dashboard/              # Dashboard UI
│   ├── src/config/puck.config.tsx      # Puck component registry
│   └── src/lib/hooks/                  # SWR hooks

packages/
├── design-system/
│   ├── src/components/                 # UI components
│   │   ├── Progress/                   # NEW (P2-S3-001)
│   │   └── Leaderboard/                # NEW (P2-S3-002)
│   └── src/index.ts                    # Public exports

├── tokens/
│   └── src/tokens.json                 # Design tokens source

domains/
├── storybook/
│   ├── .storybook/main.ts              # Storybook config
│   └── src/stories/                    # Component stories

├── BackOffice/journeys/admin-workflow/ # NEW (P2-S3-004)
├── FrontOffice/journeys/
│   ├── onboarding-flow/                # NEW (P2-S3-005)
│   └── game-hub/                       # NEW (P2-S3-006)

.github/
├── workflows/
│   ├── sprint-2-validation.yml         # Main CI workflow (P1-001)
│   └── speckit-validation.yml          # NEW (P3-S3-008)

specs/
└── 005-sprint6-execution/
    ├── spec.md                         # This feature spec
    ├── plan.md                         # This implementation plan
    ├── tasks.md                        # Execution backlog
    ├── research.md                     # Technical decisions
    ├── data-model.md                   # Data structures
    ├── quickstart.md                   # Setup guide
    └── contracts/                      # API schemas
```

---

## Libraries & Decisions

### Testing
- **Unit:** Vitest (existing, stable)
- **E2E:** Playwright (NEW, P2-001)
  - **Rationale:** Official Next.js recommendation, supports 3 browsers, screenshot/video on failure
  - **Alternatives Considered:** Cypress (older, less Next.js integration), Puppeteer (Chromium-only)
- **Accessibility:** axe-core (existing, WCAG 2.1 AA+ validated)

### Monitoring
- **Error Tracking:** Sentry SDK (NEW, P2-002)
  - **Rationale:** Industry standard, source maps support, Next.js integration guide
  - **Alternatives Considered:** Rollbar (less mature Next.js support), LogRocket (more expensive)

### Analytics
- **Product Analytics:** Google Analytics 4 (preferred) or Mixpanel (NEW, P2-003)
  - **Rationale:** GA4 free tier, stakeholder familiarity, GDPR compliance tooling
  - **Alternatives Considered:** Plausible (simpler but fewer features), Amplitude (enterprise focus)

### Design System Components
- **Progress:** Custom implementation (linear/circular variants)
  - **Rationale:** Lightweight, specific to EDUCACROSS branding, no external dependency bloat
  - **Alternatives Considered:** Radix Progress (less flexible styling), Recharts (overkill for simple progress)
- **Leaderboard:** Custom implementation using existing DS primitives
  - **Rationale:** Domain-specific component, reuses Avatar/Badge/Progress from DS

---

## Phasing

### Phase 0: Pre-Sprint Preparation (04/12 - 08/12)
- [x] Sprint 3 completion validated and documented
- [x] Sprint 6 roadmap created (SPRINT6_ROADMAP.md)
- [x] Sprint 6 execution plan created (SPRINT6_EXECUTION_PLAN.md)
- [ ] Team notified of Sprint 6 kickoff (09/12)
- [ ] GitHub issues created for all 20 items
- [ ] Calendar invites sent for ceremonies

### Phase 1: Critical Fixes (Week 1: 09/12 - 13/12)
**P1 Items (Blockers):**
- P1-001: CI/CD Fix (1 day)
- P1-002: TypeScript Type Safety (2 days)
- P1-003: Unit Test Fixes (1 day)

**Success Criteria:**
- 100% CI pass rate (no manual overrides)
- 0 TypeScript warnings
- 76/76 tests passing

### Phase 2: Production Readiness (Week 1-2: 09/12 - 17/12)
**P2 Items (Features):**
- P2-001: E2E Test Suite (2 days)
- P2-002: Monitoring Setup (1 day)
- P2-003: Analytics Integration (1 day)
- P2-004: Documentation Templates (1 day)
- P2-005: CSV Enhancement (1.5 days)

**Success Criteria:**
- E2E coverage ≥80%
- Sentry sending error events
- Analytics tracking ≥5 key actions

### Phase 3: Sprint 3 Moved Items (Week 2: 13/12 - 19/12)
**P2 Sprint 3 Items:**
- P2-S3-001: Progress Component (2h)
- P2-S3-002: Leaderboard Component (2.5h)
- P2-S3-003: Puck DropZone (2.5h - optional)
- P2-S3-004: BackOffice Journeys (5h)
- P2-S3-005: FrontOffice Journeys (4h)
- P2-S3-006: Game Hub (3h)

**Success Criteria:**
- 2 DS components published
- 3 journey implementations complete

### Phase 4: Enhancements (Week 2-3: 16/12 - 20/12+)
**P3 Items (Nice-to-Have):**
- P3-001: Storybook Coverage Expansion (1 day)
- P3-002: WCAG AAA Audit (1 day)
- P3-003: Image Optimization (0.5 day)
- P3-S3-007: Health Indicators (4h)
- P3-S3-008: SpecKit PR Validation (1h)
- P3-S3-009: Code-to-Figma Docs (2h)

**Success Criteria:**
- Storybook stories for all DS components
- WCAG AAA compliance achieved
- Health dashboard enhanced

### Phase 5: Sprint Closure (20/12)
- Sprint retrospective
- Completion report
- Sprint 7 planning (optional)

---

## Deliverables

### P1 Deliverables (Week 1)
1. **CI/CD Fix (P1-001):**
   - Modified: `.github/workflows/sprint-2-validation.yml`
   - Result: All workflow steps passing, 0 manual overrides

2. **Type Safety (P1-002):**
   - Modified: Multiple files across `packages/design-system/`, `domains/storybook/`
   - Result: `pnpm -r type-check` returns 0 warnings

3. **Test Fixes (P1-003):**
   - Modified: Test files causing failures
   - Result: `pnpm test` passes 76/76 tests

### P2 Deliverables (Week 1-2)
1. **E2E Test Suite (P2-001):**
   - New: `tests/e2e/` directory with Playwright config
   - Files: `dashboard.spec.ts`, `studio.spec.ts`, `playwright.config.ts`

2. **Monitoring Setup (P2-002):**
   - Modified: `apps/studio/src/app/layout.tsx` (Sentry init)
   - New: `sentry.client.config.ts`, `sentry.server.config.ts`

3. **Analytics Integration (P2-003):**
   - New: `apps/studio/src/lib/analytics.ts`
   - Modified: `apps/studio/src/app/layout.tsx` (GA4/Mixpanel init)

4. **Documentation Templates (P2-004):**
   - New: `docs/templates/journey-template.md`, `feature-spec-template.md`, `api-doc-template.md`

5. **CSV Enhancement (P2-005):**
   - Modified: `apps/studio/src/lib/export.ts`, `apps/studio/src/lib/import.ts`
   - New: JSON and XML export/import functions

### P2 Sprint 3 Deliverables (Week 2)
1. **Progress Component (P2-S3-001):**
   - New: `packages/design-system/src/components/Progress/`
   - Files: `Progress.tsx`, `Progress.module.css`, `Progress.stories.tsx`

2. **Leaderboard Component (P2-S3-002):**
   - New: `packages/design-system/src/components/Leaderboard/`
   - Files: `Leaderboard.tsx`, `Leaderboard.module.css`, `Leaderboard.stories.tsx`

3. **Puck DropZone (P2-S3-003):**
   - Modified: `apps/studio/src/config/puck.config.tsx`

4. **BackOffice Journeys (P2-S3-004):**
   - New: `domains/BackOffice/journeys/admin-workflow/`
   - Files: `README.md`, `tela-1-login.tsx`, `tela-2-dashboard.tsx`, `tela-3-perfil.tsx`

5. **FrontOffice Journeys (P2-S3-005):**
   - New: `domains/FrontOffice/journeys/onboarding-flow/`
   - Files: `README.md`, `tela-1-boas-vindas.tsx`, ..., `tela-5-parabens.tsx`

6. **Game Hub (P2-S3-006):**
   - New: `domains/FrontOffice/journeys/game-hub/`
   - Files: `README.md`, `hub-home.tsx`, `game-detail.tsx`, `leaderboard-global.tsx`

### P3 Deliverables (Week 2-3)
1. **Storybook Coverage (P3-001):**
   - New: Stories for remaining DS components

2. **WCAG AAA Audit (P3-002):**
   - New: `docs/accessibility/wcag-aaa-audit.md`

3. **Image Optimization (P3-003):**
   - Modified: All `<img>` tags replaced with Next.js `<Image>`

4. **Health Indicators (P3-S3-007):**
   - Modified: `apps/studio/src/app/api/dashboard/health/route.ts`
   - Modified: `apps/studio/src/app/dashboard/page.tsx`

5. **SpecKit PR Validation (P3-S3-008):**
   - New: `.github/workflows/speckit-validation.yml`

6. **Code-to-Figma Docs (P3-S3-009):**
   - Modified: `code-to-figma/README.md`
   - New: `code-to-figma/BACKLOG.md`, `INTEGRATION_GUIDE.md`, `TROUBLESHOOTING.md`

---

## Development Workflow

### Local Development
```bash
# 1. Pull latest from main
git checkout main && git pull origin main

# 2. Create feature branch
git checkout -b feature/sprint6-{item-name}

# 3. Install dependencies
pnpm install --frozen-lockfile

# 4. Build in correct order
pnpm build:tokens
pnpm build:design-system
pnpm build

# 5. Run dev servers
pnpm dev:studio     # http://localhost:3000
pnpm dev:storybook  # http://localhost:6006

# 6. Make changes and validate
pnpm lint
pnpm -r type-check
pnpm test

# 7. Commit with conventional commits
git add .
git commit -m "feat(scope): description (#issue)"

# 8. Push and create PR
git push origin feature/sprint6-{item-name}
gh pr create --title "feat: description" --body "Closes #issue"

# 9. Post /spec comment on PR
# (GitHub Action will run SpecKit validation)
```

### PR Review Checklist
- [ ] CI checks passing (build, lint, type-check, test)
- [ ] SpecKit validation passing (green checkmark)
- [ ] No console errors in dev mode
- [ ] Documentation updated (README, journey docs, API schemas)
- [ ] Storybook stories added for new components
- [ ] Manual testing completed (screenshot/video attached)
- [ ] 1+ code review approval

### Merge Process
1. Squash and merge to main (keep linear history)
2. Delete feature branch
3. Update related issues and docs
4. Notify team in Slack #sprint6

---

## Testing Strategy

### Unit Tests (Vitest)
- **Coverage Target:** ≥95%
- **Focus Areas:**
  - Component rendering (Progress, Leaderboard)
  - API route handlers (health, summary, pages)
  - Utility functions (export, import, analytics)
- **Example:**
```typescript
// Progress.test.tsx
describe('Progress', () => {
  it('renders linear variant with value', () => {
    render(<Progress value={50} variant="linear" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
  });
});
```

### E2E Tests (Playwright)
- **Coverage Target:** ≥80% of user journeys
- **Focus Areas:**
  - Dashboard: KPIs load, health metrics render, pages list paginated
  - Studio: Page create, edit, save, publish workflow
  - Journeys: FrontOffice onboarding flow, Game Hub navigation
- **Example:**
```typescript
// dashboard.spec.ts
test('dashboard loads KPIs within 500ms', async ({ page }) => {
  const start = Date.now();
  await page.goto('http://localhost:3000/dashboard');
  await page.waitForSelector('[data-testid="kpi-grid"]');
  const duration = Date.now() - start;
  expect(duration).toBeLessThan(500);
});
```

### Accessibility Tests (axe-core)
- **Target:** WCAG 2.1 AA (mandatory), AAA (P3-002 stretch)
- **Automation:** Run on every Storybook story
- **Manual Testing:** Keyboard navigation, screen reader (NVDA/JAWS)

---

## Monitoring & Observability

### Error Tracking (Sentry)
```typescript
// sentry.client.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  integrations: [new Sentry.BrowserTracing()],
});
```

**Key Metrics:**
- Error rate (errors per hour)
- Top error types (by frequency)
- Affected users (by session ID)

### Analytics (Google Analytics 4)
```typescript
// lib/analytics.ts
export function trackEvent(eventName: string, params: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}
```

**Tracked Events:**
- `page_view`: Automatic page navigation
- `dashboard_load`: Dashboard KPIs rendered
- `page_create`: Studio page created
- `csv_export`: Data exported to CSV/JSON/XML
- `journey_complete`: User completed onboarding flow

### Health Dashboard
**Endpoint:** `GET /api/dashboard/health`  
**Response:**
```typescript
{
  buildStatus: 'passing',
  testCoverage: 97.4,
  typeErrors: 0,
  lintWarnings: 0,
  codeQualityScore: 92,
  technicalDebtHours: 8,
  performanceScore: 95,
  securityVulnerabilities: 0,
  lastDeployment: '2025-12-09T10:30:00Z',
  uptime: 99.9,
  errorRate: 2.5
}
```

---

## Performance Targets

### Dashboard (US1.1 - NFR-P1, NFR-P2)
- **API Response Time:** <200ms (cached data via SWR)
- **Initial Render:** <300ms (skeleton visible <100ms)
- **Time to Interactive:** <500ms

### Storybook (US3.1 - NFR-P3)
- **Build Time:** <90 seconds (currently ~60s, target maintained)
- **Preview Initial Load:** <2 seconds
- **Largest Chunk:** <1MB (via `manualChunks` optimization)

### E2E Tests (P2-001 - NFR-P4)
- **Suite Execution:** <5 minutes for full run
- **Individual Test:** <30 seconds per spec

### Production App (P3-003 - NFR-P5)
- **Lighthouse Performance:** ≥90 (baseline), ≥95 (stretch)
- **First Contentful Paint:** <1.5s
- **Largest Contentful Paint:** <2.5s

---

## Security Considerations

### Dependency Scanning
- `pnpm audit` run weekly (currently 0 high/critical vulnerabilities)
- Dependabot enabled for automated security PRs

### Authentication
- Not in Sprint 6 scope (prototyping environment uses local storage)
- Future: OAuth 2.0 integration for production

### Data Privacy
- Analytics: Cookie consent required (P2-003 includes GDPR compliance check)
- Error Tracking: PII scrubbing in Sentry config (no email/password in logs)

### API Security
- Rate limiting not enforced (prototyping only)
- Future: Next.js middleware for rate limiting + CORS

---

## Documentation Updates

### Files to Update
1. **SPRINT6_ROADMAP.md** (already created)
2. **SPRINT6_EXECUTION_PLAN.md** (already created)
3. **docs/backlog.md** (mark items in progress/complete)
4. **PROGRESS_DASHBOARD.md** (Sprint 6 status tracking)
5. **Journey READMEs** (for P2-S3-004/005/006)
6. **Code-to-Figma docs** (P3-S3-009)
7. **Sprint retrospective** (created 20/12/2025)

### Documentation Standards
- **Journey README:** Objective, Status, Components, Links (4 sections minimum)
- **API Schema:** TypeScript interface + example request/response
- **Component Props:** JSDoc with types, default values, examples
- **Sprint Docs:** Executive summary, deliverables, metrics, lessons learned

---

## Risk Mitigation Details

### RISK-1: TypeScript fixes overrun (P1-002)
**If detected on Day 2:**
1. Pair programming: Frontend Lead + 1 other developer
2. Focus on highest-impact warnings first (Storybook config, DS component types)
3. Use `@ts-expect-error` with justification for low-priority items
4. Defer non-critical warnings to Sprint 7 if >3 days

**Monitoring:** Daily standup check on warning count (target: reduce by 8+ per day)

### RISK-2: E2E coverage gap (P2-001)
**If coverage <80% by Day 6:**
1. Prioritize critical paths only (dashboard, Studio create/edit)
2. Accept 60-70% coverage, document uncovered journeys for Sprint 7
3. QA + Frontend pairing to accelerate test writing

**Monitoring:** Track coverage daily via Playwright report

### RISK-3: Holiday absences (23-27/12)
**If P2 items incomplete by 20/12:**
1. Emergency Week 3 extension (only if ≤3 P2 items remain)
2. Defer all P3 items to Sprint 7
3. Freeze merges after 20/12 except critical hotfixes

**Monitoring:** Sprint health check on 18/12 (mid-Week 2)

---

## Success Criteria (Detailed)

### Phase 1 Success (P1 Complete by 13/12)
- ✅ `.github/workflows/sprint-2-validation.yml` passes on main
- ✅ `pnpm -r type-check` returns 0 warnings
- ✅ `pnpm test` passes 76/76 tests
- ✅ No console errors in Studio/Storybook dev mode
- ✅ PR #125 merged (Sprint 5 deliverables)

### Phase 2 Success (P2 ≥80% by 17/12)
- ✅ E2E test suite with ≥80% coverage
- ✅ Sentry sending error events (validated with test error)
- ✅ Analytics tracking ≥5 events
- ✅ 3+ journey templates migrated
- ✅ CSV/JSON/XML export/import functional

### Phase 3 Success (Sprint 3 Items ≥60% by 19/12)
- ✅ Progress and Leaderboard components in DS
- ✅ ≥2 of 3 journey implementations complete (BackOffice, FrontOffice, Game Hub)
- ✅ Storybook stories for new components

### Phase 4 Success (P3 Optional by 20/12)
- ✅ Storybook coverage expanded (all DS components)
- ✅ WCAG AAA audit complete (or deferred to Sprint 7)
- ✅ Health dashboard enhanced (8 new metrics)

### Sprint Closure Criteria (20/12)
- ✅ All P1 items merged to main
- ✅ ≥8/10 P2 items merged (80%)
- ✅ Health score ≥95/100
- ✅ Sprint retrospective published
- ✅ Sprint 7 planning initiated (if needed)

---

**Version:** 1.0.0  
**Author:** GitHub Copilot + EDUCACROSS Team  
**Date:** 2025-12-04  
**Status:** Ready for Execution  
**Next Action:** Sprint 6 Kickoff Meeting (09/12/2025 @ 09:00)  
