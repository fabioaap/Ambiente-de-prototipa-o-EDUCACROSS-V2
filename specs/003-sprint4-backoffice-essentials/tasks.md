# Tasks — Sprint 4: BackOffice Essentials & Storybook Branding

Feature: Sprint 4 — BackOffice Essentials & Storybook Branding  
Branch: `feature/sprint4-backoffice-essentials`  
Spec: `specs/003-sprint4-backoffice-essentials/spec.md`  
Plan: `specs/003-sprint4-backoffice-essentials/plan.md`

## Phase 0: Spec & Prerequisites

Goal: Create spec.md and ensure SpecKit compliance before implementation.

- [ ] T000 Create `specs/003-sprint4-backoffice-essentials/spec.md` (US/AC/NFR/Edge Cases per constitution)

## Phase 1: Setup

Goal: Prepare environment and baseline to build components cleanly.

- [ ] T001 Verify Node and pnpm versions via `.nvmrc` and lockfile
- [ ] T002 Create feature branch scaffold in `feature/sprint4-backoffice-essentials` (already created)
- [ ] T003 Install Radix UI dependency in `packages/design-system/package.json`
- [ ] T004 Baseline build order: `pnpm build:tokens` → DS build → Storybook build
- [ ] T005 Ensure Montserrat fonts are self-hosted for Storybook (`domains/storybook/public/fonts/`)

## Phase 2: Foundational

Goal: Blocking prerequisites required by all user stories.

- [ ] T006 Add `preview-fonts.css` and import in `domains/storybook/.storybook/preview.ts`
- [ ] T007 Add `manager-head.html` with dual favicon links (SVG+ICO)
- [ ] T008 Add `public/branding/{favicon.svg,favicon.ico,apple-touch-icon.png}`
- [ ] T009 Update `domains/storybook/.storybook/manager.ts` with EDUCACROSS theme
- [ ] T010 Update `domains/storybook/.storybook/preview.ts` story order and backgrounds

## Phase 3: [US1] Alert Component

Goal: Implement Alert with variants, icons, close, outlined.

Independent Test: Storybook demonstrates success/warning/error/info, with icon, closable, action button.

- [ ] T011 [P] [US1] Create `packages/design-system/src/components/Alert/Alert.tsx`
- [ ] T012 [P] [US1] Create `packages/design-system/src/components/Alert/Alert.module.css`
- [ ] T013 [US1] Export in `packages/design-system/src/index.ts`
- [ ] T014 [US1] Story: `domains/storybook/src/stories/Feedback/Alert.stories.tsx`
- [ ] T015 [US1] Props JSDoc + forwardRef + 'use client'
- [ ] T016 [US1] Validate tokens usage (colors, radius, spacing)
- [ ] T016a [US1] A11y: Tab to close button, Space/Enter close, aria-label "Close alert"

## Phase 4: [US2] Badge Component (Expand)

Goal: Expand Badge variants/styles/sizes, dot and icon.

Independent Test: Storybook shows filled/outlined/soft, sm/md/lg, icon and dot.

- [ ] T017 [P] [US2] Update `packages/design-system/src/components/Badge/Badge.tsx` with props
- [ ] T018 [P] [US2] Add `packages/design-system/src/components/Badge/Badge.module.css`
- [ ] T019 [US2] Export unchanged in `packages/design-system/src/index.ts`
- [ ] T020 [US2] Story: `domains/storybook/src/stories/DataDisplay/Badge.stories.tsx`
- [ ] T021 [US2] Validate tokens mapping per variant/style

## Phase 5: [US3] Chip Component

Goal: Implement Chip with icon/avatar, clickable/deletable, selected/disabled.

Independent Test: Storybook shows filter chips, delete behavior, avatar chip.

- [ ] T022 [P] [US3] Create `packages/design-system/src/components/Chip/Chip.tsx`
- [ ] T023 [P] [US3] Create `packages/design-system/src/components/Chip/Chip.module.css`
- [ ] T024 [US3] Export in `packages/design-system/src/index.ts`
- [ ] T025 [US3] Story: `domains/storybook/src/stories/DataDisplay/Chip.stories.tsx`
- [ ] T026 [US3] Add delete and click handlers with a11y focus/keyboard
- [ ] T026a [US3] A11y: Enter/Space select, Delete removes, aria-pressed when selected

## Phase 6: [US4] Avatar Component (+Group)

Goal: Implement Avatar with image/initials/icon, status, badge, sizes; AvatarGroup.

Independent Test: Storybook for sizes, status, badge, group overflow (+N).

- [ ] T027 [P] [US4] Create `packages/design-system/src/components/Avatar/Avatar.tsx`
- [ ] T028 [P] [US4] Create `packages/design-system/src/components/Avatar/AvatarGroup.tsx`
- [ ] T029 [P] [US4] Create `packages/design-system/src/components/Avatar/Avatar.module.css`
- [ ] T030 [US4] Export in `packages/design-system/src/index.ts`
- [ ] T031 [US4] Story: `domains/storybook/src/stories/DataDisplay/Avatar.stories.tsx`
- [ ] T032 [US4] Implement fallback chain: src → initials → icon → default
- [ ] T032a [US4] A11y: aria-label for initials/icon, alt for images, status with aria-describedby

## Phase 7: [US5] Stats Card Component

Goal: Implement StatsCard with title/value/trend/icon/subtitle and `children` slot for charts.

Independent Test: Storybook examples for simple/trend/subtitle and chart slot.

- [ ] T033 [P] [US5] Create `packages/design-system/src/components/StatsCard/StatsCard.tsx`
- [ ] T034 [P] [US5] Create `packages/design-system/src/components/StatsCard/StatsCard.module.css`
- [ ] T035 [US5] Export in `packages/design-system/src/index.ts`
- [ ] T036 [US5] Story: `domains/storybook/src/stories/Dashboard/StatsCard.stories.tsx`
- [ ] T037 [US5] Trend badge color mapping and loading skeletons
- [ ] T037a [US5] A11y: title as heading (h3 or role="heading"), trend with aria-label

## Phase 8: [US6] Dropdown Component (Radix)

Goal: Implement Dropdown with Radix UI: trigger, content, items, separators, labels, placement, collision detection.

Independent Test: Storybook shows icons, shortcuts, destructive items, controlled open.

- [ ] T038 [P] [US6] Create `packages/design-system/src/components/Dropdown/Dropdown.tsx`
- [ ] T039 [P] [US6] Create `packages/design-system/src/components/Dropdown/DropdownMenu.tsx`
- [ ] T040 [P] [US6] Create `packages/design-system/src/components/Dropdown/DropdownItem.tsx`
- [ ] T041 [P] [US6] Create `packages/design-system/src/components/Dropdown/Dropdown.module.css`
- [ ] T042 [US6] Export in `packages/design-system/src/index.ts`
- [ ] T043 [US6] Story: `domains/storybook/src/stories/Navigation/Dropdown.stories.tsx`
- [ ] T044 [US6] Ensure keyboard navigation and ARIA roles via Radix primitives

## Phase 9: Storybook Branding

Goal: Apply EDUCACROSS branding across Storybook (manager, head, preview, introduction).

Independent Test: Logo visible, Montserrat applied, primary color #5f4de5, story order, backgrounds.

- [ ] T045 [P] Create `domains/storybook/.storybook/manager.ts`
- [ ] T046 [P] Create `domains/storybook/.storybook/manager-head.html`
- [ ] T047 [P] Update `domains/storybook/.storybook/preview.ts` (order/backgrounds)
- [ ] T048 [P] Create `domains/storybook/src/stories/Introduction.mdx`
- [ ] T049 [P] Create `domains/storybook/src/styles/storybook-globals.css`
- [ ] T049a [P] Add CSS variable `--brand-primary: #5f4de5` in storybook-globals.css and use in manager.ts

## Phase 10: Validation & Evidence

Goal: Ensure everything builds, stories render, and fidelity ≥90%.

- [ ] T050 Build tokens/design-system/storybook (build logs attached)
- [ ] T051 Lint + type-check across workspace (ESLint/TS strict)
- [ ] T052 Screenshot stories for 6 components + intro page
- [ ] T053 Document fidelity scores vs Figma in `figma-vuexy-reference.md`
- [ ] T054 Prepare PR with SpecKit `/spec` comment and evidence
- [ ] T054a Execute `/spec` command and attach report to PR
- [ ] T054b Organize evidence in `evidence/` folder (build.log, lint.txt, type-check.txt, storybook-screenshots/*.png, metrics.json)

## Phase 11: Polish & Cross-Cutting Concerns

Goal: Final touches, docs updates, and Puck registration if needed.

- [ ] T055 Update `domains/studio/src/config/puck.config.tsx` (register Alert, Dropdown)
- [ ] T056 Update `.specify/memory/SPRINT4_PLANNING.md` status (⏳ → ✅ for implemented components)
- [ ] T057 Update `.specify/memory/figma-vuexy-reference.md` (component checklist)
- [ ] T058 Add README notes in `packages/design-system` for Dropdown Radix dependency

---

## Dependencies & Order

- Sprint story order: US1 → US2 → US3 → US4 → US5 → US6
- Foundational branding (Phase 2, 9) can proceed in parallel with components after initial setup
- Parallelizable tasks marked with [P]

### Parallel Execution Examples
- [P] T011 (Alert.tsx) + T018 (Badge CSS) + T023 (Chip CSS) — different files, no conflicts
- [P] T027 (Avatar.tsx) + T033 (StatsCard.tsx) — separate components
- [P] T038–T041 (Dropdown implementation files) — internal module-level parallel if coordinated
- [P] T045–T049 (Storybook branding) — all in `.storybook/` and `src/styles/`

---

## Implementation Strategy

- MVP first: Complete US1–US3 (Alert, Badge, Chip) to enable early BackOffice UI usage
- Incremental delivery: Merge components as they pass Validation (Phase 10), avoid big-bang PRs
- Keep build green: Run `pnpm build`, `pnpm lint`, `pnpm -r type-check` before each PR

---

## Format Validation

- All tasks follow: `- [ ] T### [P] [US#] Description with file path`
- Story labels present only for phases 3–8
- File paths are explicit
- [P] used only when safe to parallelize

---

## Summary

- Total tasks: 64 (was 58; added T000, T016a, T026a, T032a, T037a, T049a, T054a, T054b)
- Tasks per user story: US1 (7), US2 (5), US3 (6), US4 (7), US5 (6), US6 (7), US7 (6)
- Parallel opportunities: 16
- Independent tests: Defined per story
- Suggested MVP: US1–US3 (Alert, Badge, Chip)
