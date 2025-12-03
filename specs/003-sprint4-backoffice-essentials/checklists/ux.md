# UX Requirements Quality Checklist — Sprint 4: BackOffice Essentials & Storybook Branding

Purpose: Unit tests for requirements writing (quality & completeness)  
Created: 2025-12-03  
Feature Dir: specs/003-sprint4-backoffice-essentials  
Sources: plan.md, tasks.md, constitution.md

## Requirement Completeness
- [ ] CHK001 Are component variant requirements documented for all 6 components (Alert, Badge, Chip, Avatar(+Group), StatsCard, Dropdown)? [Completeness, Plan §Summary]
- [ ] CHK002 Are keyboard interaction requirements specified for Alert close, Chip select/delete, and Dropdown navigation? [Completeness, Tasks §Phases 3–8]
- [ ] CHK003 Are Storybook branding requirements covering manager, preview, head, introduction, and globals fully listed? [Completeness, Tasks §Phase 9]
- [ ] CHK004 Are token usage requirements defined for every visual prop (color, radius, spacing, typography) across components? [Completeness, Plan §Constraints]
- [ ] CHK005 Is build order and pre-PR checklist documented as requirements (not just process notes)? [Completeness, Plan §Run-Ready Prototypes]
- [ ] CHK006 Are loading/skeleton requirements specified where applicable (e.g., StatsCard)? [Completeness, Tasks §US5]
- [ ] CHK007 Are zero/empty-state requirements documented for UI components that present lists or content? [Gap]

## Requirement Clarity
- [ ] CHK008 Is “fidelidade ≥90–95%” defined with measurement method, targets per component, and comparison approach? [Ambiguity, Plan §Summary]
- [ ] CHK009 Are performance goals (render <500ms, interactions <200ms, build <3min) specified with measurement points/tools and baselines? [Ambiguity, Plan §Performance Goals]
- [ ] CHK010 Is “WCAG 2.1 AA mínimo” scoped per component with explicit keyboard paths, focus rings, roles, and labeling requirements? [Ambiguity, Plan §Constraints]
- [ ] CHK011 Is Dropdown placement/collision behaviour defined clearly (preferred placements, collision handling rules)? [Clarity, Plan §Technical Context]
- [ ] CHK012 Is “console errors” defined (sources included/excluded, severity) for acceptance? [Clarity, Plan §Run-Ready Prototypes]

## Requirement Consistency
- [ ] CHK013 Are storybook paths consistent with repository structure (apps/storybook vs domains/storybook) across plan and tasks? [Conflict, Plan §Project Structure; Tasks §Phase 9]
- [ ] CHK014 Do token consumption constraints align across all components (CSS Modules + CSS variables only)? [Consistency, Plan §Constraints]
- [ ] CHK015 Is the Radix exception consistently documented and justified across plan/spec/tasks per Single Design System Surface? [Consistency, Plan §Single DS Surface; Constitution §Single Design System Surface]

## Acceptance Criteria Quality
- [ ] CHK016 Are acceptance criteria for each US (US1–US6) objectively verifiable and independent (one-story demo suffices)? [Acceptance Criteria, Tasks §Phases 3–8]
- [ ] CHK017 Do acceptance criteria specify observable signals (focus visibility, ARIA correctness, no console errors, token mapping) and pass/fail conditions? [Acceptance Criteria, Plan §Run-Ready Prototypes; Tasks §Phases 3–8]
- [ ] CHK018 Is evidence format standardized (logs/screenshots/metrics) to support AC measurability? [Acceptance Criteria, Plan §Run-Ready Prototypes]

## Scenario Coverage
- [ ] CHK019 Are primary, alternate, and exception flows defined for Dropdown (mouse, keyboard arrows, Escape, focus trap) per Radix? [Coverage, Tasks §US6]
- [ ] CHK020 Are alternate flows for Avatar fallback (src→initials→icon→default) documented, including failure cases? [Coverage, Tasks §US4]
- [ ] CHK021 Are interaction scenarios covered for Chip (selected/disabled/deletable) with keyboard and pointer? [Coverage, Tasks §US3]
- [ ] CHK022 Are loading and trend scenarios covered for StatsCard (skeletons, positive/negative trend, subtitling)? [Coverage, Tasks §US5]

## Edge Case Coverage
- [ ] CHK023 Is Alert close behaviour specified for focus retention and re-entry (after close)? [Edge Case, Gap]
- [ ] CHK024 Is Dropdown collision near viewport edges and scrollable containers defined (e.g., flip/offset strategies)? [Edge Case, Plan §Technical Context]
- [ ] CHK025 Is Chip deletion behaviour defined under disabled state and keyboard-only contexts? [Edge Case, Tasks §US3]
- [ ] CHK026 Is Avatar group overflow (+N) behaviour and accessibility labeling defined? [Edge Case, Tasks §US4]

## Non-Functional Requirements
- [ ] CHK027 Are performance metrics collection methods (tooling, thresholds, sampling strategy) clearly specified? [Clarity, Plan §Performance Goals]
- [ ] CHK028 Are accessibility verification methods (keyboard paths, ARIA audit, focus indicators) documented per component? [Gap, Plan §Constraints]
- [ ] CHK029 Are build time thresholds tied to a documented baseline and variance acceptance? [Gap, Plan §Performance Goals]

## Dependencies & Assumptions
- [ ] CHK030 Is Radix UI dependency version pinned and rationale documented as “accessibility implementation” (headless styling)? [Dependency, Plan §Technical Context; Plan §Single DS Surface]
- [ ] CHK031 Are Vuexy token dependencies/assumptions documented (source-of-truth, mapping rules)? [Assumption, Plan §Constraints]
- [ ] CHK032 Is “NO API TOUCH” assumption documented with consequences (no dashboard integration changes)? [Assumption, Plan §Typed APIs]

## Ambiguities & Conflicts
- [ ] CHK033 Does the Popper.js mention conflict with Radix/Floating UI decision, and is the conflict resolved explicitly? [Conflict, Plan §Technical Context]
- [ ] CHK034 Are evidence requirements (what to attach, naming) ambiguous or inconsistent across docs? [Ambiguity, Plan §Run-Ready Prototypes]
- [ ] CHK035 Is story order/backgrounds definition consistent between plan and tasks? [Consistency, Tasks §Phase 2 & 9]

## Traceability
- [ ] CHK036 Is a requirement & acceptance criteria ID scheme established for spec.md (linkable to tasks)? [Traceability, Gap]
- [ ] CHK037 Are tasks (T001–T058) mapped to user stories and requirement IDs for review traceability? [Traceability, Tasks §All]
- [ ] CHK038 Is Constitution alignment explicitly traced in spec/plan (Run-Ready, Single DS Surface, Journeys, APIs, Automation)? [Traceability, Plan §Constitution Check]

---

Notes:
- This checklist validates the quality of written requirements; it does not test implementation.  
- References: use [Plan §…], [Tasks §…], [Constitution §…], or mark [Gap]/[Ambiguity]/[Conflict]/[Assumption] when missing.
