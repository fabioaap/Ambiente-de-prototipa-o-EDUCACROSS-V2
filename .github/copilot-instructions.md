# EDUCACROSS Copilot Playbook
- Status: Sprint 3 Fase 3/4 (Dashboard & Game Hub); use `SPRINT3_DOCUMENTATION_INDEX.md` + `docs/SPRINT3_EXECUTION_MASTER.md` para escolher próxima issue (#53, #54, #55, #58).

## Arquitetura & Mapa
- Monorepo pnpm com Node `22.21.1` (`.nvmrc`), TypeScript 5, Next.js 15.
- `domains/studio`: app Next (Studio + Dashboard) com Puck; rotas-chave: `/dashboard`, `/studio`, `[[...slug]]` (renderiza JSON em `data/pages` via `[[...slug]]/page.tsx` + `puck.config.tsx`).
- `domains/storybook`: Storybook 8 (ESM) que documenta apenas `@prototipo/design-system`.
- `packages/design-system` + `packages/tokens`: única fonte de UI reutilizável; Storybook e Studio dependem deles.
- Jornadas vivem em `domains/{BackOffice,FrontOffice,Game}/journeys/*` e são indexadas por `scripts/gen-journeys-index.js` em `domains/INDEX.md`.

## Setup & Comandos
- Sempre: `nvm use` (garante Node 22) e depois `pnpm install --frozen-lockfile`.
- Build raiz: `pnpm build` (ordem interna: tokens → design-system → hub/storybook → studio → admin).
- Desenvolvimento:
  - Studio: `pnpm dev:studio` (`domains/studio` em http://localhost:3000).
  - Storybook/Hub: `pnpm dev:hub` ou `pnpm dev:storybook` (porta 6006).
- Qualidade rápida: `pnpm lint`, `pnpm type-check`, `pnpm test:dashboard-hydration` (hidratação do Dashboard em `domains/studio`).

## Workflow & CI
- Branch: `feature/{area}-{descricao}`; commits: `type(scope): resumo (issue #XX)`.
- CI principal: `.github/workflows/sprint-2-validation.yml` (usa `pnpm build`, `pnpm lint`, `pnpm -r type-check` + checks de C2/G4/G6/B4/D2).
- Antes de abrir/atualizar PR, rode localmente: `pnpm build && pnpm lint && pnpm -r type-check`.
- Para Sprint 3, siga sempre as dependências descritas em `SPRINT3_EXECUTION_DETAILED.md` + `AGENT_PHASE2_DASHBOARD.md` (cadeia #53→#54→#55 e paralelo #58).

## Design System, Shadcn & Guardrails
- Em `packages/design-system/src/components/*`: usar `'use client'`, `React.forwardRef`, CSS Modules, props tipadas e documentadas; exportar em `packages/design-system/src/index.ts` e criar stories em `domains/storybook/src/stories/*`.
- Tokens vêm de `@prototipo/tokens` (`tokens.css` ou import JS); se alterar tokens, rode `pnpm build:tokens` antes de qualquer build.
- Guardrail Shadcn: `@/components/ui/*` é permitido apenas em `domains/studio/src/app/studio/*` e `domains/studio/src/app/dashboard/*`; todas as jornadas em `domains/**` e páginas dinâmicas devem usar só `@prototipo/design-system`.
- Após mexer em UI fora do design-system, execute `pnpm check:shadcn` (script `scripts/check-shadcn-usage.mjs` bloqueia imports indevidos).

## Studio, Dashboard & APIs
- Tipos compartilhados dos endpoints vivem em `domains/studio/src/lib/types/dashboard.ts`; handlers devem usar esses tipos nas respostas.
- Padrão de API: rotas em `domains/studio/src/app/api/{segment}/route.ts` com `NextResponse.json`, try/catch e erros padronizados via `handleDashboardError` (`/api/dashboard/summary`, `/api/dashboard/health` já seguem isso).
- Dashboard Summary:
  - Back-end: `domains/studio/src/app/api/dashboard/summary/route.ts` agrega JSONs em `data/pages`, calcula KPIs/health e expõe `navigationLinks`.
  - Front-end: `domains/studio/src/hooks/useDashboardSummary.ts` com SWR (refresh 30s, skeletons + ErrorBanner em `domains/studio/src/app/dashboard/page.tsx`).
- Game Hub:
  - Jornada: `domains/Game/journeys/game-hub/README.md` (fluxos, mocks, componentes DS).
  - Puck: componentes `GameCard`, `GameFilter`, `GameGrid` já configurados em `domains/studio/src/config/puck.config.tsx`; use `Progress` e `Leaderboard` do design-system como blocos principais.

## Jornadas & Documentação
- Cada jornada deve ter `README.md` (objetivo, contexto, componentes DS, links Studio/Storybook), `notas.md` (decisões) e `links.md` (URLs Studio + Hub).
- Ao criar/renomear jornadas:
  - Atualize `domains/README.md` (mapa de jornadas) e rode `pnpm gen:journeys` para regenerar `domains/INDEX.md`.
  - Sincronize links com slugs reais de Studio (`/studio?slug=...` e `/{slug}`) e, quando existir, com o Hub/Storybook.
- Para qualquer mudança em dashboard ou Game Hub, valide também a experiência descrita em `SPRINT3_FINAL_STATUS.md` e `PROGRESS_DASHBOARD.md`.

## Validation Checklist
- Antes de merge: `pnpm build`, `pnpm lint`, `pnpm -r type-check`, Storybook stories renderizam, `/dashboard` sem erros no console.
- SpecKit report verde; documente decisões em `README.md` ou `SPRINT3_FINAL_STATUS.md` para rastreabilidade.
