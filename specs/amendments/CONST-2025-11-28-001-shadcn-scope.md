# Constitution Amendment Proposal: Shadcn UI Scope Clarification

**Proposal ID**: CONST-2025-11-28-001  
**Type**: MINOR (strengthens existing principle, adds operational constraint)  
**Proposed By**: SpecKit Analysis  
**Date**: 2025-11-28  
**Target Version**: 1.1.0

---

## Problem Statement

Current constitution states:

> `pnpm check:shadcn` enforces that Shadcn UI lives only inside `domains/studio/src/app/{studio,dashboard}/`.

However:
1. **Actual directory structure** uses `domains/studio/` (correct) but statement appears to reference outdated paths
2. **Design System Consolidation Plan** proposes **complete Shadcn removal**, conflicting with constitution's permission
3. **Ambiguity exists** on whether dashboard MUST use Shadcn or MAY use Shadcn

This creates a **CRITICAL** compliance blocker (C7 in SpecKit analysis) preventing DS consolidation work from proceeding.

---

## Proposed Amendment

### Section to Modify
`.specify/memory/constitution.md` → **Operational Constraints & Stack Mandates** (paragraph 2, line ~38)

### Current Text (v1.0.0)
```markdown
`pnpm check:shadcn` enforces that Shadcn UI lives only inside `domains/studio/src/app/{studio,dashboard}/`.
```

### Proposed Text (v1.1.0)
```markdown
`pnpm check:shadcn` enforces that Shadcn UI, if present, lives only inside `domains/studio/src/app/dashboard/` (the dashboard root is grandfathered for backward compatibility with existing widgets). New development SHOULD use `@prototipo/design-system` exclusively; teams MAY remove Shadcn completely via a formal spec (002-design-system-consolidation or similar) that demonstrates equivalent functionality, zero regressions, and bundle size improvement. Once Shadcn is removed, `pnpm check:shadcn` script MUST be deleted and this clause updated to reflect "Shadcn prohibited project-wide."
```

---

## Rationale

1. **Path correction**: Clarifies actual permitted location
2. **Grandfather clause**: Existing dashboard widgets can keep Shadcn temporarily (avoids forced rewrite)
3. **Preference signal**: "SHOULD use DS exclusively" guides new development without breaking existing code
4. **Removal pathway**: Explicitly permits full Shadcn removal via spec process (unblocks 002-design-system-consolidation)
5. **Future-proofing**: Self-updating clause after removal

---

## Impacted Principles

### Primary
- **Single Design System Surface** - Clarifies that DS is preferred, Shadcn is legacy/transitional

### Secondary
- **Automation-First Quality Gates** - Reinforces that Shadcn removal requires spec/plan/tasks (not ad-hoc)

### No Violations
- Amendment does NOT weaken any MUST principle
- Amendment does NOT remove any quality gate
- Amendment STRENGTHENS consistency by providing explicit transition path

---

## Dependent Updates Required

If this amendment is ratified, the following files MUST be updated in the same commit:

1. **`.specify/memory/constitution.md`**
   - Update version: 1.0.0 → 1.1.0
   - Update "Last Amended" date: 2025-11-25 → 2025-11-28
   - Apply proposed text change

2. **`.specify/templates/plan-template.md`**
   - Update Constitution Check section to reference new Shadcn policy
   - Add example: "If removing Shadcn, cite this plan as the formal spec required by constitution v1.1.0"

3. **`.github/copilot-instructions.md`**
   - Update Shadcn guardrails section: "Shadcn allowed only in domains/studio/src/app/dashboard/ (legacy); prefer @prototipo/design-system for new code"

4. **`scripts/check-shadcn-usage.mjs` (IF still exists)**
   - Update path check to match new policy
   - Add comment: "This script may be removed per constitution v1.1.0 after Shadcn fully removed"

5. **`specs/002-design-system-consolidation/spec.md`** (when created)
   - Add note in Constitution Check: "This spec satisfies the formal removal pathway defined in constitution v1.1.0"

---

## Semantic Versioning Justification

**Why MINOR (1.0.0 → 1.1.0) not PATCH?**
- Adds new operational constraint ("SHOULD use DS exclusively")
- Introduces transition pathway (removal via spec)
- Materially strengthens "Single Design System Surface" principle
- Does NOT break existing work (grandfather clause preserves current state)

**Why NOT MAJOR?**
- Does NOT remove or weaken existing MUST principles
- Does NOT change governance process
- Does NOT break backward compatibility (current Shadcn usage remains valid temporarily)

---

## Rollout Plan

### Phase 1: Ratification (Day 1)
- [ ] Review proposal in team meeting or async PR
- [ ] Vote: APPROVE | REJECT | REQUEST_CHANGES
- [ ] If approved, assign implementer

### Phase 2: Implementation (Day 1-2)
- [ ] Create branch `constitution/shadcn-scope-clarification`
- [ ] Update 5 dependent files listed above
- [ ] Run `pnpm lint`, `pnpm -r type-check`, `pnpm build` (must pass)
- [ ] Run `pnpm check:shadcn` (should still pass with updated paths)
- [ ] Commit with message: `docs(constitution): clarify Shadcn scope and removal pathway (v1.1.0)`

### Phase 3: Validation (Day 2)
- [ ] Open PR with `/spec` validation attached
- [ ] Verify all dependent docs updated
- [ ] Merge to `main`
- [ ] Tag commit: `constitution-v1.1.0`

### Phase 4: Communication (Day 3)
- [ ] Update `CHANGELOG.md` with amendment summary
- [ ] Notify team: "Constitution v1.1.0 ratified - Shadcn removal now formally supported"
- [ ] Unblock `specs/002-design-system-consolidation` work

---

## Alternatives Considered

### Alternative A: Ban Shadcn Immediately (REJECTED)
**Pros**: Simplest, enforces DS-only  
**Cons**: Forces rewrite of dashboard widgets blocking current Sprint 3 work; violates "Run-Ready Prototypes" (breaks existing builds)

### Alternative B: Keep Constitution As-Is, Ignore Conflict (REJECTED)
**Pros**: No process overhead  
**Cons**: Creates precedent of ignoring constitution; SpecKit analysis flags CRITICAL violations indefinitely; team loses trust in governance

### Alternative C: Make Shadcn Fully Optional (REJECTED)
**Pros**: Maximum flexibility  
**Cons**: Weakens "Single Design System Surface"; allows indefinite coexistence of two UI libraries; increases maintenance burden

### **SELECTED: Alternative D (This Proposal)**
**Pros**: Balances pragmatism (grandfather existing code) with long-term goal (DS-only); provides explicit transition path; unblocks DS consolidation work  
**Cons**: Requires 5-file update; adds complexity to constitution text

---

## Success Criteria

This amendment is considered successful if:

1. **Compliance restored**: SpecKit analysis shows 0 CRITICAL constitution violations related to Shadcn after amendment
2. **Work unblocked**: `specs/002-design-system-consolidation` proceeds without needing further constitution changes
3. **Clarity achieved**: Developers can answer "Can I use Shadcn?" with definitive yes/no based on context
4. **Transition completed**: Within 2 sprints, either (a) Shadcn fully removed OR (b) decision made to keep dashboard Shadcn with explicit justification documented

---

## Appendix: Diff Preview

```diff
--- a/.specify/memory/constitution.md
+++ b/.specify/memory/constitution.md
@@ -1,7 +1,7 @@
 <!--
 Sync Impact Report
-- Version change: N/A -> 1.0.0
-- Modified principles:
+- Version change: 1.0.0 -> 1.1.0
+- Modified sections: Operational Constraints (Shadcn scope clarified)
 -->
 
 # EDUCACROSS Prototipação Constitution
@@ -38,7 +38,7 @@
 
 ## Operational Constraints & Stack Mandates
-The stack is locked to Node 22.21.1 (`.nvmrc`) and pnpm 9.14.4+. Next.js 15 (App Router), React 18, SWR, tsup, and Storybook 8 are non-negotiable. The canonical build order is tokens → design-system → studio/storybook, and CI mirrors that order. `pnpm check:shadcn` enforces that Shadcn UI lives only inside `domains/studio/src/app/{studio,dashboard}/`. CSS Modules consume tokens via CSS variables, and new tokens originate in `packages/tokens/src/tokens.json` before code references exist.
+The stack is locked to Node 22.21.1 (`.nvmrc`) and pnpm 9.14.4+. Next.js 15 (App Router), React 18, SWR, tsup, and Storybook 8 are non-negotiable. The canonical build order is tokens → design-system → studio/storybook, and CI mirrors that order. `pnpm check:shadcn` enforces that Shadcn UI, if present, lives only inside `domains/studio/src/app/dashboard/` (the dashboard root is grandfathered for backward compatibility with existing widgets). New development SHOULD use `@prototipo/design-system` exclusively; teams MAY remove Shadcn completely via a formal spec (002-design-system-consolidation or similar) that demonstrates equivalent functionality, zero regressions, and bundle size improvement. Once Shadcn is removed, `pnpm check:shadcn` script MUST be deleted and this clause updated to reflect "Shadcn prohibited project-wide." CSS Modules consume tokens via CSS variables, and new tokens originate in `packages/tokens/src/tokens.json` before code references exist.
 
-**Version**: 1.0.0 | **Ratified**: 2025-11-25 | **Last Amended**: 2025-11-25
+**Version**: 1.1.0 | **Ratified**: 2025-11-25 | **Last Amended**: 2025-11-28
```

---

**VOTE**: Please respond with APPROVE, REJECT, or REQUEST_CHANGES (with specific feedback).
