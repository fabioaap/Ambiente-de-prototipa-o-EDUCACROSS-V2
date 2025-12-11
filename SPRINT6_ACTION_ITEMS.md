# Sprint 6 — Action Items from Consistency Analysis

**Analysis Date**: 2025-12-09  
**Overall Status**: HIGH QUALITY ✅ | Score: 8.7/10 | Blockers: NONE

---

## ⚡ Quick Summary

The Sprint 6 specification, plan, and task breakdown are **99% complete and ready for execution**. Analysis identified 4 action items (2 HIGH priority, 2 MEDIUM) for quick resolution before sprint starts. All can be completed in 30-45 minutes.

---

## 🔴 HIGH PRIORITY (Complete Before Sprint Kick-off)

### Action H1: Add `/api/health` Route Specification

**Why**: Observable Dashboards principle requires health metrics. Dashboard cannot monitor system health without this endpoint.

**Files to Update**:
1. `specs/feature/sprint6-execution/spec.md` — Add new acceptance criteria under US2.2 OR create US2.6
2. `specs/feature/sprint6-execution/tasks.md` — Add task after T040 (call it T041 or T041a)

**Task Template**:
```markdown
- [ ] T041 [P] [US2.2 or US2.6] Create `/api/health` route at 
  `apps/admin/src/app/api/health/route.ts` with typed response:
  - Metrics: uptime, error rate, response times
  - Dependencies: check databases (if any), external APIs
  - Return: { status: 'healthy'|'degraded'|'down', metrics: {...} }
  - Response time: <50ms (synchronous)
  - ARIA: Accessible to dashboard widgets (SWR integration)
```

**Acceptance Criteria**:
- [ ] Route returns 200 with metrics (healthy state)
- [ ] Route returns 503 with degraded state (>1% error rate)
- [ ] Source maps included in production build
- [ ] Documented in `docs/monitoring.md`

**Effort**: 30-45 minutes  
**Owner**: DevOps/Backend (whoever does US2.2 Sentry)

---

### Action H2: Add Puck Component Registration Tasks

**Why**: Progress and Leaderboard components must be editable in Studio. Without Puck registration, designers cannot use them in page layouts.

**Files to Update**:
1. `specs/feature/sprint6-execution/spec.md` — Add AC to US3.1 and US3.2
2. `specs/feature/sprint6-execution/tasks.md` — Add T072a and T078a (or renumber)

**AC Template for spec.md**:

**US3.1 (Progress)** — Add after AC8:
```markdown
- AC9: Component registered in `apps/studio/src/config/puck.config.tsx` 
  with Puck field types: `value` (text/slider), `variant` (select: 
  primary/success/warning/danger), `size` (select: sm/md/lg), `animated` 
  (checkbox)
```

**US3.2 (Leaderboard)** — Add after AC8:
```markdown
- AC9: Component registered in `apps/studio/src/config/puck.config.tsx` 
  with Puck field types: `entries` (textarea JSON), `maxEntries` (text), 
  `loading` (checkbox), `emptyMessage` (text)
```

**Task Template for tasks.md**:
```markdown
- [ ] T072a [US3.1] Register Progress component in Puck config:
  Edit `apps/studio/src/config/puck.config.tsx`
  - Add Progress import from @prototipo/design-system
  - Define Progress type with props: value, variant, size, animated
  - Map Puck field types: slider for value, select for variant/size
  - Test: Save Puck page with Progress, verify JSON includes Progress config

- [ ] T078a [US3.2] Register Leaderboard component in Puck config:
  Edit `apps/studio/src/config/puck.config.tsx`
  - Add Leaderboard import from @prototipo/design-system
  - Define Leaderboard type with props: entries, maxEntries, loading
  - Map Puck field types: textarea for entries (JSON), text fields
  - Test: Save Puck page with Leaderboard, verify JSON includes config
```

**Effort**: 30-45 minutes (15 min per component)  
**Owner**: Studio/Frontend (whoever does US3.1/3.2)

---

## 🟡 MEDIUM PRIORITY (Complete Before PR Review)

### Action M1: Add Dark Mode Acceptance Criteria

**Why**: Consistency with design system standards. All components must support dark mode via `prefers-color-scheme: dark`.

**File to Update**:
`specs/feature/sprint6-execution/spec.md`

**Update US3.1 (Progress)** — Add after AC8:
```markdown
- AC9: Dark mode support via `prefers-color-scheme: dark` CSS media query
```

**Update US3.2 (Leaderboard)** — Add after AC8:
```markdown
- AC9: Dark mode support via `prefers-color-scheme: dark` CSS media query
```

**Implementation Note** (for tasks):
- Progress.module.css should have: `@media (prefers-color-scheme: dark) { ... }`
- Leaderboard.module.css should have: `@media (prefers-color-scheme: dark) { ... }`
- Use token colors that have dark variants (e.g., `--color-primary-dark`)

**Effort**: 5 minutes (add 2 lines to spec)  
**Owner**: Spec/Planning (or include in component implementation tasks)

---

### Action M2: Add `/spec` Validation Task

**Why**: Automation-First principle requires documented validation. PR should include evidence of `/spec` compliance.

**File to Update**:
`specs/feature/sprint6-execution/tasks.md` — Add after T126 as final task

**Task Template**:
```markdown
- [ ] T127 [US All] Run `/spec` validation and attach report to PR:
  Command: `./.specify/scripts/powershell/check-prerequisites.ps1 -Json -RequireTasks`
  - Verify: FEATURE_DIR points to specs/feature/sprint6-execution
  - Verify: All docs present (spec.md, plan.md, tasks.md)
  - Evidence: Screenshot or log output showing JSON output
  - Attach: `/spec` report as PR comment with results
  - Gate: Zero CRITICAL violations required before merge
  
  This is the final quality gate. No merge allowed until ALL violations 
  addressed.
```

**Success Criteria**:
- [ ] `/spec` report runs without errors
- [ ] JSON output shows FEATURE_DIR and AVAILABLE_DOCS
- [ ] All 3 artifacts (spec, plan, tasks) detected
- [ ] Report attached to PR as evidence

**Effort**: 10 minutes  
**Owner**: Sprint Lead/QA (before PR review)

---

## 🟢 LOW PRIORITY (Optional, can defer to Week 2)

### Action L1: Detail P3 Enhancements (Optional)
**Current**: spec.md Phase 4 is placeholder  
**Option A**: Move tasks T121-T126 to spec.md with full user story format  
**Option B**: Explicitly defer to Sprint 7 with rationale  
**Effort**: 30-45 minutes  
**Owner**: Planning (optional)

### Action L2: Add Effort Estimate to US3.6 (Optional)
**Current**: US3.6 (Game Hub) missing effort estimate  
**Action**: Add "Effort: 3-4 hours" to spec.md line 453  
**Effort**: 2 minutes  
**Owner**: Planning (optional)

---

## 📋 Summary Table

| ID | Priority | Action | File | Effort | Status |
|----|----------|--------|------|--------|--------|
| H1 | 🔴 HIGH | Add `/api/health` route spec | spec.md, tasks.md | 30-45 min | ⏳ TODO |
| H2 | 🔴 HIGH | Add Puck registration tasks | spec.md, tasks.md | 30-45 min | ⏳ TODO |
| M1 | 🟡 MEDIUM | Add dark mode AC to US3.1/3.2 | spec.md | 5 min | ⏳ TODO |
| M2 | 🟡 MEDIUM | Add `/spec` validation task | tasks.md | 10 min | ⏳ TODO |
| L1 | 🟢 LOW | Detail P3 Enhancements | spec.md | 30-45 min | 🔲 OPTIONAL |
| L2 | 🟢 LOW | Add US3.6 effort estimate | spec.md | 2 min | 🔲 OPTIONAL |

**Total Time (HIGH + MEDIUM)**: ~1.5 hours  
**Total Time (All)**: ~2 hours

---

## ✅ Sign-Off Checklist

Before sprint kick-off:
- [ ] Complete Action H1 (Health Route)
- [ ] Complete Action H2 (Puck Registration)
- [ ] Complete Action M1 (Dark Mode AC)
- [ ] Complete Action M2 (`/spec` validation)
- [ ] Verify spec.md, plan.md, tasks.md updated
- [ ] Run `pnpm build && pnpm lint && pnpm -r type-check` locally
- [ ] Share updated artifacts with team
- [ ] Kick off sprint with updated specs

---

## Next Steps

1. **Now (5 min)**: Read this action plan
2. **Next (1.5 hours)**: Implement HIGH + MEDIUM actions
3. **Before Kick-off (5 min)**: Verify artifacts and sign off
4. **Sprint Execution**: Reference full report at `SPRINT6_CONSISTENCY_ANALYSIS.md`

---

**Prepared By**: SpecKit Analysis  
**Date**: 2025-12-09  
**Status**: Ready for Implementation ✅

