# Sprint 6 Implementation Execution Plan — Day-by-Day Breakdown

**Date:** 2025-12-09  
**Duration:** Week 1 (Day 1 only, 7 hours), Week 2 (10 days), Week 3 (optional)  
**Team:** 6 developers (Dev1-6)  
**Status:** 🚀 Ready for execution

---

## ⚡ QUICK START

### Day 1 (Mon 09/12) — Foundation Setup

**09:00-12:00:** Phase 1-2 Setup (4 devs parallel)  
**13:00-17:00:** Phase 3-5 P1 Stories (3 parallel tracks)  
**EOD:** Quality gate validation

**Expected Result:** ✅ Foundation ready, P1 complete (100%), team can proceed to P2 in Week 2

---

## Phase 1-2 Detailed Execution (Day 1)

### 09:00-09:15 — Sprint Kickoff Meeting

**Owner:** Tech Lead  
**Attendees:** All 6 developers  
**Deliverables:**
- Review SPRINT6_EXECUTION_READY_REPORT.md
- Assign Phase 1-2 volunteers
- Confirm blockers/questions
- Setup Slack channel #sprint6-execution

**Output:** Team aligned, ready to execute

---

### 09:15-10:30 — Phase 1: Setup (T001-T005)

**Owner:** Dev1 (DevOps Lead)  
**Tasks:**

```
T001: Verify Node 22.21.1 / pnpm 9.14.4+
      Command: node --version && pnpm --version
      Expected: v22.21.1, 9.14.4+ (current 9.14.4 is OK)
      
T002: Run `pnpm install --frozen-lockfile`
      Expected: All deps installed, pnpm-lock.yaml unchanged
      
T003: [P] Verify build order
      Commands: 
        pnpm build:tokens
        pnpm build:design-system
        pnpm build
      Expected: All 3 succeed, 0 errors
      
T004: [P] Create feature/sprint6-execution branch
      Command: git checkout -b feature/sprint6-execution
      Expected: New branch created from current
      
T005: [P] Create GitHub milestone "Sprint 6"
      Via GitHub UI: Issues → Milestones → New
      Expected: Milestone created, linked to 15 user story issues
```

**Parallel Opportunities:**
- T003 (3-step build, Dev1 can start these in sequence)
- T004 (git branch, Dev1 executes)
- T005 (GitHub UI, can be done by any dev)

**Checkpoint (10:15 am):**
```bash
node --version              # v22.21.1 (or 22.20.0 if upgrade pending)
pnpm --version             # 9.14.4+
pnpm build:tokens          # ✓ success
pnpm build:design-system   # ✓ success
pnpm build                 # ✓ success
git branch -a | grep sprint6-execution   # ✓ branch exists
```

**Time: 1h 15 min** ✅

---

### 10:30-12:00 — Phase 2: Foundational (T006-T011, 3-Way Parallel)

**Core Gate:** Installs + build validation

#### Track A: Playwright (Dev1, 1.5 hours)

```
T006: Backup workflows
      Command: cp .github/workflows/sprint-2-validation.yml sprint-2-validation.yml.bak
      
T007: Install Playwright
      Command: pnpm add -D -w @playwright/test
      Expected: @playwright/test added to pnpm-lock.yaml
      
T008: Create playwright.config.ts
      File: playwright.config.ts (root)
      Content: Config for Chromium, Firefox, WebKit, 30s timeout, screenshots on failure
      Expected: File exists with all 3 browsers configured
      
Part of T011: Quality validation (see below)
```

**Checkpoint (11:30 am):**
```bash
ls -la playwright.config.ts
# Expected: File exists, >200 bytes
```

**Time: 1.5h** ✅

---

#### Track B: Monitoring (Dev2, 1.5 hours)

```
T009: Install Sentry
      Command: pnpm add -w @sentry/nextjs
      Expected: @sentry/nextjs in apps/studio/package.json
      
Part of T011: Quality validation (see below)
```

**Checkpoint (11:30 am):**
```bash
cat apps/studio/package.json | grep @sentry/nextjs
# Expected: Present in dependencies
```

**Time: 0.5h** (installs are fast)  
⏳ Wait for others until 11:30

---

#### Track C: Analytics (Dev3, 1.5 hours)

```
T010: Install Analytics SDK
      Command: pnpm add -w react-ga4
      Expected: react-ga4 in apps/studio/package.json
      
Part of T011: Quality validation (see below)
```

**Checkpoint (11:30 am):**
```bash
cat apps/studio/package.json | grep react-ga4
# Expected: Present in dependencies
```

**Time: 0.5h** (installs are fast)  
⏳ Wait for others until 11:30

---

#### Coordinated Quality Validation (All 3 tracks, 11:30-12:00)

```
T011: Run quality gates (coordinated)

STEP 1 (Parallel, 5 min, Dev1/2/3 prepare):
  pnpm install --frozen-lockfile
  # Should already be done, just confirm no conflicts

STEP 2 (Sequential, dev1 runs):
  pnpm build:tokens           # 30s
  pnpm build:design-system    # 30s
  pnpm build                  # 90s
  Total: ~2.5 min
  Expected: 0 errors

STEP 3 (Sequential, any dev):
  pnpm lint                   # 2 min
  Expected: 0 errors
  
STEP 4 (Sequential, any dev):
  pnpm -r type-check         # 2 min
  Expected: 0 errors (we'll fix the 22 warnings in US1.2)
  
STEP 5 (Sequential, any dev):
  pnpm test                  # 3 min
  Expected: 74/76 pass (we'll fix 2 failing tests in US1.3)
  
STEP 6 (Parallel, dev1 + dev2, optional):
  # Terminal 1: pnpm dev:studio
  # Terminal 2: pnpm dev:storybook
  Expected: Both start, no console errors
  
TOTAL TIME: ~11 min coordinated
```

**EOG Phase 2 Checkpoint (12:00 noon):**

```bash
# Expected outputs:
✓ pnpm build succeeds
✓ pnpm lint: 0 errors
✓ pnpm -r type-check: 0 errors (22 warnings to be fixed)
✓ pnpm test: 74/76 pass (2 failures to be fixed)
✓ pnpm dev:studio starts (localhost:3000)
✓ pnpm dev:storybook starts (localhost:6006)

# Status: Foundation ready ✅
# Go/No-Go: Can proceed to P1 stories? ✅ YES
```

**Time: 1.5h** ✅

**Total Phase 1-2: 2h 45m** (under 3h budget)

---

### 13:00-13:30 — Lunch + Debrief (30 min)

**Activity:**
- Team lunch/break
- Tech lead reviews Phase 1-2 quality gate results
- Any install issues resolved

**Expected Result:** All blockers cleared, Team ready for P1 stories

---

### 13:30-17:00 — Phase 3-5: P1 Stories (3.5 hours, 3 Parallel Tracks)

#### **TRACK 1: US1.1 CI/CD Fix (Dev1, 6 hours, 13:30-19:30 evening work)**

**Owner:** Dev1 (DevOps)  
**Timeline:** 13:30-17:00 (3.5h) + evening if needed

**Tasks (T012-T018):**

```
T012: Remove `continue-on-error: true` from workflow
      File: .github/workflows/sprint-2-validation.yml
      Action: Find and delete all `continue-on-error: true` lines
      Verification: grep -c "continue-on-error" (should be 0)
      Time: 15 min

T013: Fix workflow syntax errors
      File: .github/workflows/sprint-2-validation.yml
      Action: Check YAML indentation, job dependencies
      Tool: yamllint or online validator
      Time: 15 min

T014: Optimize workflow
      File: .github/workflows/sprint-2-validation.yml
      Action: 
        - Add cache for node_modules
        - Use `pnpm install --frozen-lockfile`
        - Add timeout limits (15 min per job, 20 min total)
      Time: 30 min

T015: Add timeout limits
      File: .github/workflows/sprint-2-validation.yml
      Action: Add timeout-minutes to each job
      Time: 15 min

T016: Test locally
      Command: pnpm install -g act  # GitHub Actions CLI
      Command: act -l                 # List workflows
      Command: act push -j build      # Run build job locally
      Time: 30 min

T017: Update documentation
      File: SPRINT6_EXECUTION_PLAN.md (or separate file)
      Action: Document CI changes made, verification steps
      Time: 30 min

T018: Verify on feature branch
      Command: git push origin feature/sprint6-execution
      Action: Wait for GitHub Actions to complete
      Expected: <10 min runtime, all steps green
      Time: 5 min (wait 10 min for GH Actions)
```

**Quality Gate (17:00):**
```bash
# GitHub Actions dashboard
# Expected:
# - workflow-name: sprint-2-validation.yml
# - Status: ✓ passed
# - Duration: <10 minutes
# - All jobs green (build, lint, type-check, tests)
```

**Checkpoint:** US1.1 CI/CD complete ✅

**Time: 6h total** (3.5h today + 2.5h evening if workflow debug needed)

---

#### **TRACK 2: US1.2 Type Safety (Dev2 + Dev3 pairing, 8-10 hours, 13:30-21:30)**

**Owner:** Dev2 + Dev3 (Frontend pair)  
**Timeline:** 13:30-17:00 (3.5h) + extend if needed

**Tasks (T019-T027):**

```
T019: Audit current warnings (30 min, both)
      Command: pnpm -r type-check 2>&1 | tee type-warnings.log
      Action: Save output, categorize by package (storybook, design-system, api)
      Output: File with list of all 22 warnings
      
T020: [P] Fix Storybook types (Dev2, 3-4h)
      File: domains/storybook/src/
      Action: 
        - Find @ts-expect-error comments
        - Replace with proper types or add JSDoc
        - Import types from @prototipo/design-system if needed
      Target: Reduce storybook type errors by ~8-10
      
T021: [P] Fix Design System types (Dev3, 3-4h)
      File: packages/design-system/src/components/*/
      Action:
        - Add JSDoc comments to props
        - Replace `any` with proper interfaces
        - Add return type annotations to functions
      Target: Reduce design-system type errors by ~10-12
      
T022: [P] Fix API route handlers (Dev2 or Dev3, 2-3h)
      File: apps/studio/src/app/api/**/route.ts
      Action: Add explicit return type annotations (Response<T>)
      Target: Reduce api route errors by ~2-3
      
T023: Replace `any` types globally (1h, either dev)
      Command: grep -r "any" packages/design-system/src/ domains/storybook/src/ apps/studio/src/app/api/
      Action: Review and replace with proper types
      
T024: Update tsconfig.json (20 min, either dev)
      File: tsconfig.json (root)
      Verify: strict: true, noImplicitAny: true, strictNullChecks: true
      Expected: Already set, no changes needed
      
T025: Pair review complex issues (1h, both)
      Process: Dev2 + Dev3 review remaining complex type issues together
      Goal: Ensure understanding, document solutions
      
T026: Final verification (20 min, both)
      Command: pnpm -r type-check
      Expected: Found 0 errors (down from 22)
      
T027: Update documentation (30 min, either dev)
      File: .github/copilot-instructions.md
      Action: Add section on type safety enforcement
      Requirement: "All component props must have explicit JSDoc"
```

**Quality Gate (17:00 + extension):**
```bash
pnpm -r type-check
# Expected: Found 0 errors in all packages
#
# Before: 22 warnings
# After: 0 warnings
#
# Packages checked:
#  - apps/studio: 0 errors
#  - domains/storybook: 0 errors
#  - packages/design-system: 0 errors
#  - packages/tokens: 0 errors
```

**Checkpoint:** US1.2 type safety complete ✅

**Time: 8-10h total** (3.5h today + 4-6.5h evening)

---

#### **TRACK 3: US1.3 Test Fixes (Dev4, 6-8 hours, 13:30-21:30)**

**Owner:** Dev4 (QA Engineer)  
**Timeline:** 13:30-17:00 (3.5h) + extend if needed

**Tasks (T028-T036):**

```
T028: Identify failing tests (15 min)
      Command: pnpm test 2>&1 | grep -A 5 "FAIL"
      Output: Identify 2 failing tests, save to file
      
T029: [P] Fix test 1 (2-3h, Dev4)
      Process:
        1. Run individual test: pnpm test -- <test-name>
        2. Read error message carefully
        3. Debug: Add console.log, check assertions
        4. Fix: Update test logic or test data
        5. Verify: Run 3 times to ensure not flaky
      Expected: Test passes consistently
      
T030: [P] Fix test 2 (2-3h, Dev4)
      Same process as T029
      Expected: Test passes consistently
      
T031: Check for flaky tests (1h, Dev4)
      Command: for i in {1..5}; do pnpm test; done
      Action: Run full test suite 5 times
      Expected: 76/76 pass all 5 runs
      Issue if: Tests pass sometimes, fail others
      
T032: Stabilize flaky tests (if found, 1-2h)
      Process:
        - Increase timeouts if timing issues
        - Add explicit waits for async operations
        - Mock random data if needed
        - Rerun 5x verification
      
T033: Verify coverage (15 min)
      Command: pnpm test -- --coverage
      Expected: >=95% coverage maintained
      
T034: Remove skipped tests (15 min)
      Command: grep -r "skip\|only" packages/design-system/src/ domains/storybook/src/
      Action: Either remove skip or document reason in comment
      Expected: 0 skipped tests
      
T035: Optimize CI execution (15 min)
      File: vitest.config.ts (if exists)
      Action: Ensure maxConcurrency is reasonable
      Target: Test suite completes in <2 min
      
T036: Final verification (30 min)
      Command: pnpm test
      Expected: Tests:     76 passed (up from 74)
      Command: pnpm test  (run 2 more times)
      Expected: All 3 consecutive runs show 76/76 pass
```

**Quality Gate (17:00 + extension):**
```bash
pnpm test
# Expected: Tests:     76 passed
#          Passed: 76
#          Failed: 0
#          Skipped: 0
#
# Run 2 more times:
pnpm test  # ✓ 76 passed
pnpm test  # ✓ 76 passed
```

**Checkpoint:** US1.3 test fixes complete ✅

**Time: 6-8h total** (3.5h today + 2.5-4.5h evening)

---

### 17:00-17:30 — EOD Review & Validation Gate

**Owner:** Tech Lead  
**Activity:** Verify all 3 tracks complete

**Final Quality Gate (EOD):**

```bash
# Run comprehensive validation
pnpm build && pnpm lint && pnpm -r type-check && pnpm test

# Expected output:
#
# ✓ build: 0 errors
# ✓ lint: 0 errors  
# ✓ type-check: 0 errors, 0 warnings
# ✓ tests: 76 passed
# ✓ CI workflow: <10 min runtime
#
# Final Score: Foundation ✅ + P1 ✅
```

**If All Gates Pass (17:30):**
```bash
# Commit all changes
git add -A
git commit -m "feat(sprint6): Complete P1 foundation (CI/CD, Types, Tests)"
git push origin feature/sprint6-execution

# Status: ✅ Week 1 complete, ready for Week 2 P2 execution
```

**If Any Gate Fails (17:30):**
- Identify which track failed (Track 1, 2, or 3)
- Schedule evening debug session
- Typical issues: Workflow syntax, type mismatches, flaky tests
- Resolve and revalidate before Day 2

---

## Week 1 Summary (Day 1)

| Phase | Tasks | Owner | Time | Status |
|-------|-------|-------|------|--------|
| **1: Setup** | T001-T005 | Dev1 | 1h 15m | ✅ Complete |
| **2: Foundational** | T006-T011 | Dev1, Dev2, Dev3 | 1h 30m | ✅ Complete |
| **3: US1.1 CI/CD** | T012-T018 | Dev1 | 6h | ✅ Complete |
| **4: US1.2 Types** | T019-T027 | Dev2, Dev3 | 8-10h | ✅ Complete |
| **5: US1.3 Tests** | T028-T036 | Dev4 | 6-8h | ✅ Complete |

**Total Day 1: ~25-27 hours of effort (with parallelization)**

**Week 1 Result:** 🟢 **P1 COMPLETE** (Foundation + US1.1 + US1.2 + US1.3)

---

## Week 2 Quick Timeline (High-Level)

**Days 2-4 (Tue-Thu 10-12/12):**
- US2.1 E2E Tests (Dev4)
- US2.2 Monitoring (Dev1)
- US2.3 Analytics (Dev5)
- US2.4 Templates (Dev5)
- US2.5 Export (Dev2, Dev3)
- US3.1 Progress (Dev6, Dev5)
- US3.2 Leaderboard (Dev6, Dev5)

**Days 5-9 (Fri 13-Mon 16-20/12):**
- US3.4 BackOffice (Dev1, Dev3)
- US3.5 FrontOffice (Dev6)
- US3.6 Game Hub (Dev6 if time)

**End of Week 2:** P2 ≥85% complete ✅

---

## Key Dates & Milestones

| Date | Milestone | Status |
|------|-----------|--------|
| **Mon 09/12, EOD** | P1 Complete (US1.1, US1.2, US1.3) | ✅ Day 1 |
| **Thu 12/12, EOD** | Phase 2-3 Infrastructure (US2.1-2.5) | ✅ P2 Infrastructure |
| **Fri 13/12, EOD** | Components + early Journeys (US3.1-3.2, US3.4) | ✅ Mid-week checkpoint |
| **Mon 16/12, EOD** | All core P2 (US2.1-2.5, US3.1-3.2, US3.4) | ✅ 80% P2 done |
| **Wed 18/12, EOD** | Core + FrontOffice (add US3.5) | ✅ 85% P2 done |
| **Fri 20/12, EOD** | P2 Complete + P3 start (if time) | ✅ P2 done, P3 optional |
| **Fri 27/12, EOD** | P3 Complete + Polish (optional) | ⏳ Stretch goal |

---

## Daily Standup Format (09:00 every day)

**15 minutes, all 6 developers + Tech Lead**

```
Dev1: "Completed [T###-T###]. Today: [T###-T###]. Blockers: [None/X]"
Dev2: "Completed [T###]. Today: [T###-T###]. Blockers: [None/X]"
Dev3: "Completed [T###]. Today: [T###]. Blockers: [None/X]"
Dev4: "Completed [T###-T###]. Today: [T###-T###]. Blockers: [None/X]"
Dev5: "Completed [T###]. Today: [T###-T###]. Blockers: [None/X]"
Dev6: "Completed [T###]. Today: [T###-T###]. Blockers: [None/X]"

Tech Lead: "Confirm: No critical blockers? → Proceed. Adjust if needed."
```

---

## Documentation Checklist

Before each day, confirm these files are updated:

- [ ] `SPRINT6_EXECUTION_READY_REPORT.md` (overall status)
- [ ] `SPRINT6_EXECUTION_PLAN.md` (daily assignments)
- [ ] `specs/005-sprint6-execution/tasks.md` (mark tasks [X] when complete)
- [ ] `PROGRESS_DASHBOARD.md` (journey status)
- [ ] Slack `#sprint6-execution` (daily updates)

---

## Success = Green Gates + Completed P1

```
✅ pnpm build       → 0 errors
✅ pnpm lint        → 0 errors
✅ pnpm type-check  → 0 errors
✅ pnpm test        → 76/76 pass
✅ CI workflow      → <10 min
✅ Dev servers      → Start cleanly

When all ✅: Ready for Week 2 P2 Execution 🚀
```

---

**Prepared:** 2025-12-09  
**Next:** Schedule kickoff meeting @ 09:00, share plan with team, begin Day 1 execution  
**Contact:** Tech Lead for blockers

