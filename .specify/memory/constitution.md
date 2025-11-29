<!--
Sync Impact Report
- Version change: 1.0.0 -> 1.1.0
- Modified principles:
	- EXPANDED: Single Design System Surface (added Figma Vuexy fidelity requirements)
	- NEW: Figma Vuexy as Single Source of Truth
- Added sections: Figma Reference & Visual Fidelity Standards
- Removed sections: None
- Templates requiring updates:
	- ✅ .specify/templates/plan-template.md (constitution check)
	- ✅ .specify/templates/spec-template.md (acceptance criteria)
	- ✅ .specify/templates/tasks-template.md (validation tasks)
	- ✅ .specify/memory/figma-vuexy-reference.md (NEW - component inventory)
- Follow-up TODOs:
	- Implement remaining 22 Vuexy components (see figma-vuexy-reference.md)
	- Create automated Figma fidelity CI check
	- Update all existing components to 100% Vuexy fidelity
-->

# EDUCACROSS Prototipação Constitution

## Core Principles

### Run-Ready Prototypes Only
All deliverables MUST behave like production-ready demos: if designers or PMs pull the branch and run the documented scripts, everything builds, type-checks, and runs without console errors. Contributors MUST run `pnpm build`, `pnpm lint`, and `pnpm -r type-check` locally before every PR, respect the build order (tokens → design-system → studio/storybook), and fix any warning surfaced in Studio or Storybook consoles. Keeping the environment green is a release blocker—breakers own the fix and cannot merge until the dashboard, studio, and storybook all load cleanly. *Rationale: the prototyping environment is shared and any broken build blocks multiple parallel discovery streams.*

### Single Design System Surface
The design system and tokens are the single source of UI truth, with **Figma Vuexy v4** as the authoritative visual specification (documented in `.specify/memory/figma-vuexy-reference.md`). Outside of `domains/studio/src/app/{studio,dashboard}/`, components MUST come exclusively from `@prototipo/design-system` (or semantic HTML) and consume tokens via CSS Modules. Client components include `'use client'`, forward refs, JSDoc on props, stories in Storybook, and registration inside `puck.config.tsx`. Every new UI primitive requires: (1) Figma node-id mapping, (2) visual fidelity validation ≥90%, (3) tokens coverage, (4) Storybook stories, (5) documentation, and (6) Puck registration before it can be used in journeys. Components MUST use **Montserrat font**, **primary-600 color (rgb(95, 77, 229))** for primary actions, **6px border-radius (md)** as standard, and match Figma hover/active/disabled states. Visual validation uses Playwright scripts comparing computed styles against Vuexy tokens. *Rationale: consistent UI primitives keep Storybook ↔︎ Studio ↔︎ Figma in sync; 93.75% current fidelity (15/16 components) demonstrates feasibility; preventing drift when code is exported to design tools.*

### Documented Journeys Stay Traceable
Every flow lives inside `domains/{domain}/journeys/{journey}` with README, notes, and links kept current. When a feature touches a journey, the developer MUST update the journey docs, link to the Studio page slug, and ensure dashboards referencing that journey (e.g., `/dashboard` cards) reflect the latest status. Cross-cutting documents (SPRINT3 index, health indicators, execution guides) must be updated in the same PR when their referenced journeys change. *Rationale: PMs and designers rely on the documentation tree to understand coverage; untraceable changes create orphaned prototypes.*

### Typed APIs & Observable Dashboards
All route handlers (e.g., `/api/dashboard/*`, `/api/health`) MUST expose typed responses, explicit error handling, and health metrics that the dashboard can consume. Client code uses SWR (or server components) with loading, error, and empty states. Any API/schema change must update TypeScript interfaces, QA dashboards, and health metrics docs. Logs, metrics, and `/api/health` responses need to explain degraded status, not just pass/fail. *Rationale: dashboards drive decision making—silent schema changes or missing metrics make data useless and erode trust in the environment.*

### Automation-First Quality Gates
SpecKit plus the plan/spec/tasks templates are mandatory. Every meaningful change MUST: (1) refresh `plan.md`, `spec.md`, and `tasks.md` for its feature, (2) pass `/spec` validation in PR comments, and (3) document CI steps (build, lint, type-check) in the PR. Manual reviewers focus on behaviour because automation enforces structure. *Rationale: automated gates keep the monorepo healthy even with multiple agents working in parallel.*

## Operational Constraints & Stack Mandates
The stack is locked to Node 22.21.1 (`.nvmrc`) and pnpm 9.14.4+. Next.js 15 (App Router), React 18, SWR, tsup, and Storybook 8 are non-negotiable. The canonical build order is tokens → design-system → studio/storybook, and CI mirrors that order. `pnpm check:shadcn` enforces that Shadcn UI lives only inside `domains/studio/src/app/{studio,dashboard}/`. CSS Modules consume tokens via CSS variables, and new tokens originate in `packages/tokens/src/tokens.json` before code references exist. Code-to-Figma tooling depends on Storybook HTML, so components must render without relying on browser-only globals unless properly guarded. Local storage persistence (for Puck pages) is the only approved persistence layer in this prototyping environment unless the constitution is amended.

## Figma Reference & Visual Fidelity Standards
**Figma Vuexy v4** ([UstdVUNj2isUdfucUj5EAx](https://www.figma.com/design/UstdVUNj2isUdfucUj5EAx/vuexy-figma-dashboard-ui-kit-and-builder-v4?node-id=870-37366)) is the canonical design specification for all BackOffice and FrontOffice components. The complete component inventory with 46+ node-id references is maintained in `.specify/memory/figma-vuexy-reference.md`. Contributors MUST:

1. **Reference Before Implementation**: Identify the correct Figma node-id from the reference doc before creating any component.
2. **Token Adherence**: Use ONLY design tokens from `packages/tokens/` that map to Vuexy specifications (Montserrat font, primary-600 #5f4de5, 6px radius standard).
3. **Visual Validation**: Run Playwright validation scripts (`/tmp/figma-visual-comparison.mjs`) achieving ≥90% fidelity score before marking component "implemented".
4. **State Coverage**: Implement all Figma-documented states (default, hover, active, disabled, focus, error) with exact visual matching.
5. **Documentation**: Update `.specify/memory/figma-vuexy-reference.md` status column (⏳ Pendente → ✅ Implementado) with validation evidence.
6. **Duplicate File Prevention**: Maintain ONLY `.module.css` files or ensure `.css` duplicates stay synchronized (tsup compilation issue documented in lessons learned).

Acceptance criteria for component PRs MUST include: (a) Figma node-id citation, (b) Playwright validation report showing ≥90% fidelity, (c) screenshots comparing Storybook vs Figma side-by-side, (d) confirmation of Montserrat font and correct color tokens in all states. Components failing validation below 90% cannot be merged or used in journeys until corrected. *Rationale: 93.75% fidelity achieved in Sprint 3 (15/16 components) demonstrates this standard is achievable; visual consistency is critical for stakeholder demos and code-to-Figma sync.*

## Workflow & Quality Gates
Work begins with `/speckit.plan` (implementation plan), `/speckit.spec` (user stories + acceptance), and `/speckit.tasks` (execution backlog). Plans MUST include a Constitution Check describing how each principle is satisfied or justified in Complexity Tracking. Specs enumerate independently testable journeys with priorities, and tasks stay story-scoped so each journey can be demoed on its own. Before requesting review, contributors run build/lint/type-check, update affected docs (journeys, sprint indexes, QA checklists), and attach evidence (screenshots, curls, logs). `/spec` is posted on every PR; a ❌ requires fixes before reviewers engage. No merge is allowed while dashboards, Studio, or Storybook exhibit regressions or console errors.

## Governance
This constitution supersedes conflicting guidance in other docs. Amendments require: (1) a written proposal referencing the impacted principles, (2) updates to all dependent templates/guides in `.specify/` and runtime docs, (3) a successful `/spec` run demonstrating compliance, and (4) semantic version bump logged in this file. Versioning uses semantic rules: MAJOR for breaking/removing principles or governance, MINOR for new principles/sections or materially stronger requirements, PATCH for clarifications. Compliance reviews happen at PR level (reviewer checklist + SpecKit report) and during sprint checkpoints; unresolved violations block releases. The ratification date marks initial adoption; the last amended date updates whenever this file or dependent templates change.

**Version**: 1.1.0 | **Ratified**: 2025-11-25 | **Last Amended**: 2025-11-29
