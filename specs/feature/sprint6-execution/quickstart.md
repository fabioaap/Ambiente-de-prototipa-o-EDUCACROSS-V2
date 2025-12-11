# Quickstart (Phase 1)

## Prereqs
- Node 22.21.1 (`.nvmrc`), pnpm 9.14.4+
- Install deps: `pnpm install --frozen-lockfile`
 - Env (quando aplicável): `SENTRY_DSN`, `SENTRY_ENVIRONMENT`, `GA4_MEASUREMENT_ID` ou `MIXPANEL_TOKEN`

## Build order
1) `pnpm build:tokens`
2) `pnpm build:design-system`
3) `pnpm build`

## Dev servers
- Admin: `pnpm dev:admin` (http://localhost:3000)
- Storybook: `pnpm dev:hub` (http://localhost:6006)

## Lint/Types
- `pnpm lint`
- `pnpm type-check`
- `pnpm check:shadcn`

## Tests
- Unit: `pnpm test` (meta ≥95% cobertura, zero skipped/flaky)
- E2E: `pnpm exec playwright test --project=all` (Chromium/Firefox/WebKit; meta ≥80% cobertura E2E; artefatos em falha)

## Observabilidade / Analytics
- Sentry: confirmar `SENTRY_DSN`, release/version e upload de source maps (`next build`)
- GA4 ou Mixpanel: configurar ID/token e validar page views + eventos (dashboard load, criar/editar/publish página, export CSV/JSON/XML)

## Documentação & jornadas
- Gerar/atualizar índices: `pnpm gen:journeys` após alterações nas journeys (BackOffice, FrontOffice, Game Hub)
- Atualizar READMEs/notas/links em `domains/{domain}/journeys/{journey}`
