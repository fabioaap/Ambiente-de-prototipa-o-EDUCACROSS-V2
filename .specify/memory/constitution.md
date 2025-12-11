<!--
Sync Impact Report
- Version change: N/A -> 1.0.0
- Modified principles:
	- (new) Run-Ready Prototypes Only
	- (new) Single Design System Surface
	- (new) Documented Journeys Stay Traceable
	- (new) Typed APIs & Observable Dashboards
	- (new) Automation-First Quality Gates
- Added sections: Core Principles (populated), Operational Constraints & Stack Mandates, Workflow & Quality Gates
- Removed sections: None
- Templates requiring updates:
	- ✅ .specify/templates/plan-template.md
	- ✅ .specify/templates/spec-template.md
	- ✅ .specify/templates/tasks-template.md
- Follow-up TODOs: None
-->

# EDUCACROSS Prototipação Constitution

## Core Principles

### Run-Ready Prototypes Only
All deliverables MUST behave like production-ready demos: if designers or PMs pull the branch and run the documented scripts, everything builds, type-checks, and runs without console errors. Contributors MUST run `pnpm build`, `pnpm lint`, and `pnpm -r type-check` locally before every PR, respect the build order (tokens → design-system → studio/storybook), and fix any warning surfaced in Studio or Storybook consoles. Keeping the environment green is a release blocker—breakers own the fix and cannot merge until the dashboard, studio, and storybook all load cleanly. *Rationale: the prototyping environment is shared and any broken build blocks multiple parallel discovery streams.*

### Single Design System Surface
The design system and tokens are the single source of UI truth. Outside of `apps/admin/src/app/dashboard/` and `domains/studio/src/app/dashboard/` (editor-specific screens), components MUST come exclusively from `@prototipo/design-system` (or semantic HTML) and consume tokens via CSS Modules. Client components include `'use client'`, forward refs, JSDoc on props, stories in Storybook, and registration inside `domains/studio/src/config/puck.config.tsx`. Every new UI primitive requires tokens coverage, stories, documentation, and Puck registration before it can be used in journeys. *Rationale: consistent UI primitives keep Storybook ↔︎ Studio ↔︎ Figma in sync and prevent drift when code is exported to design tools.*

### Design System Continuous Evolution
The Design System grows incrementally as new screens are prototyped. When a screen requires component capabilities not yet available, contributors MUST (1) document gaps in a screen-specific analysis file (`docs/TELA_{NAME}_DS_ANALYSIS.md`), (2) create GitHub issues (label: `ds-enhancement`) for each gap, (3) implement extensions via feature branches (`feature/ds-{component}-{prop}`), (4) add Storybook stories showing real usage from the screen, and (5) merge only after CI passes and documentation is updated. Each gap is solved once and reused by subsequent screens; no duplicating custom implementations for the same design need. *Rationale: this pipeline ensures the DS scales naturally with prototyping velocity, eliminates technical debt from parallel reimplementation, and maintains a single source of truth for component capabilities across all journeys.*

### Documented Journeys Stay Traceable
Every flow lives inside `domains/{domain}/journeys/{journey}` with README, notes, and links kept current. When a feature touches a journey, the developer MUST update the journey docs, link to the Studio page slug, and ensure dashboards referencing that journey (e.g., `/dashboard` cards) reflect the latest status. Cross-cutting documents (SPRINT3 index, health indicators, execution guides) must be updated in the same PR when their referenced journeys change. *Rationale: PMs and designers rely on the documentation tree to understand coverage; untraceable changes create orphaned prototypes.*

### Typed APIs & Observable Dashboards
All route handlers (e.g., `/api/dashboard/*`, `/api/health`) MUST expose typed responses, explicit error handling, and health metrics that the dashboard can consume. Client code uses SWR (or server components) with loading, error, and empty states. Any API/schema change must update TypeScript interfaces, QA dashboards, and health metrics docs. Logs, metrics, and `/api/health` responses need to explain degraded status, not just pass/fail. *Rationale: dashboards drive decision making—silent schema changes or missing metrics make data useless and erode trust in the environment.*

### Automation-First Quality Gates
SpecKit plus the plan/spec/tasks templates are mandatory. Every meaningful change MUST: (1) refresh `plan.md`, `spec.md`, and `tasks.md` for its feature, (2) pass `/spec` validation in PR comments, and (3) document CI steps (build, lint, type-check) in the PR. Manual reviewers focus on behaviour because automation enforces structure. *Rationale: automated gates keep the monorepo healthy even with multiple agents working in parallel.*

## Operational Constraints & Stack Mandates
The stack is locked to Node 22.21.1 (`.nvmrc`) and pnpm 9.14.4+. Next.js 15 (App Router), React 18, SWR, tsup, and Storybook 8 are non-negotiable. The canonical build order is tokens → design-system → admin/storybook, and CI mirrors that order. `pnpm check:shadcn` enforces that Shadcn UI lives only inside `apps/admin/src/app/dashboard/**` (one-off dashboard screens with advanced interactions). CSS Modules consume tokens via CSS variables, and new tokens originate in `packages/tokens/src/tokens.json` before code references exist. Code-to-Figma tooling depends on Storybook HTML, so components must render without relying on browser-only globals unless properly guarded. Local storage persistence (for Puck pages in `domains/studio/data/pages/`) is the only approved persistence layer in this prototyping environment unless the constitution is amended.

## Workflow & Quality Gates
Work begins with `/speckit.plan` (implementation plan), `/speckit.spec` (user stories + acceptance), and `/speckit.tasks` (execution backlog). Plans MUST include a Constitution Check describing how each principle is satisfied or justified in Complexity Tracking. Specs enumerate independently testable journeys with priorities, and tasks stay story-scoped so each journey can be demoed on its own. Before requesting review, contributors run build/lint/type-check, update affected docs (journeys, sprint indexes, QA checklists), and attach evidence (screenshots, curls, logs). `/spec` is posted on every PR; a ❌ requires fixes before reviewers engage. No merge is allowed while dashboards, Studio, or Storybook exhibit regressions or console errors.

## Governance
This constitution supersedes conflicting guidance in other docs. Amendments require: (1) a written proposal referencing the impacted principles, (2) updates to all dependent templates/guides in `.specify/` and runtime docs, (3) a successful `/spec` run demonstrating compliance, and (4) semantic version bump logged in this file. Versioning uses semantic rules: MAJOR for breaking/removing principles or governance, MINOR for new principles/sections or materially stronger requirements, PATCH for clarifications. Compliance reviews happen at PR level (reviewer checklist + SpecKit report) and during sprint checkpoints; unresolved violations block releases. The ratification date marks initial adoption; the last amended date updates whenever this file or dependent templates change.

**Version**: 1.0.2 | **Ratified**: 2025-11-25 | **Last Amended**: 2025-12-09
