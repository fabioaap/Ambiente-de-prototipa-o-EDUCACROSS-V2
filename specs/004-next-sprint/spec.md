# Next Sprint — Spec

## User Stories

### US1 (P1): As an operator, I see live KPIs and health on the dashboard with fast loading and skeletons.
- Acceptance: KPIs render <500ms on cached data; skeleton visible <100ms; API errors show ErrorBanner.

### US2 (P1): As a user with low vision, I can enable high-contrast mode for DS components.
- Acceptance: Toggle persists via localStorage; WCAG 2.1 AA contrast; no layout break.

### US3 (P2): As a developer, Storybook loads quickly and chunks are manageable.
- Acceptance: SB build <90s, preview initial load <2s; manualChunks reduces largest chunk <1MB.

### US4 (P2): As an admin, I manage Backoffice pages list with pagination and CSV export/import.
- Acceptance: Pages list paginates server-side; CSV export/import flows succeed with validation.

## Non-Functional Requirements
- Performance: render <500ms, interaction <200ms, SB build <90s
- Accessibility: WCAG 2.1 AA; keyboard navigable; high-contrast available
- Branding Fidelity: ≥90% alignment to EDUCACROSS tokens
- Rollback: branding can be disabled; fallback tokens apply
