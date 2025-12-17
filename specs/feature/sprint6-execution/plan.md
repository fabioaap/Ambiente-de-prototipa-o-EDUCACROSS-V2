# Implementation Plan: sprint6-execution

**Branch**: `feature/sprint6-execution` | **Date**: 2025-12-08 | **Spec**: `specs/feature/sprint6-execution/spec.md`
**Input**: Feature specification from `/specs/feature/sprint6-execution/spec.md`

## Summary

Sprint 6 entrega a consolidação de qualidade e prontidão de produção: corrigir CI/CD (workflow sprint-2-validation), zerar warnings de TypeScript e estabilizar 76/76 testes (P1); habilitar suíte E2E com Playwright 3 browsers, integrar Sentry e GA/Mixpanel, padronizar templates e ampliar export/import para JSON/XML (P2); adicionar componentes Progress e Leaderboard ao design-system, journeys BackOffice/FrontOffice/Game Hub, DropZone no Puck e reindexar jornadas (P2/P3). Sucesso = 100% P1 na semana 1 e 80%+ P2 na semana 2 com todos os gates verdes.

## Technical Context

**Language/Version**: TypeScript 5 (strict), Next.js 15 (App Router), React 18, Node 22.21.1, pnpm 9.14.4  
**Primary Dependencies**: `@prototipo/design-system`, `@prototipo/tokens`, Storybook 8, SWR, Vitest, Playwright (Chromium/Firefox/WebKit), tsup, Sentry SDK, GA4/Mixpanel SDK, CSV/JSON/XML converters  
**Storage**: Arquivos/JSON mock (prototipação); sem BD  
**Testing**: Vitest (unit), Storybook interaction tests, Playwright (E2E 3 browsers)  
**Target Platform**: Web (apps/admin, apps/storybook, domains journeys)  
**Project Type**: Monorepo web (apps + packages + domains)  
**Performance Goals**: NFRs da spec – Page load ≤2s; API GET <200ms / POST <500ms; Storybook build <90s; Studio interação <100ms; bundle main <500KB gz; peso <2MB  
**Constraints**: Build order tokens → design-system → apps; shadcn apenas em dashboards aprovados; `'use client'` em componentes de UI; frozen lockfile; evitar logs de dados sensíveis; Sentry sem PII  
**Scale/Scope**: 20 itens (P1/P2/P3) em 17.25 pd com 5-6 pessoas; Journeys BackOffice (3 telas), FrontOffice (5 telas), Game Hub (3 páginas), novos componentes + E2E/observabilidade

## Constitution Check

1. **Run-Ready Prototypes Only** – Manter `pnpm build`, `pnpm lint`, `pnpm -r type-check` verdes seguindo ordem tokens → design-system → apps; corrigir workflow `.github/workflows/sprint-2-validation.yml`; eliminar warnings TS e estabilizar testes; monitorar console em admin/studio/storybook; usar lockfile congelado.  
2. **Single Design System Surface** – Novos componentes Progress/Leaderboard no `packages/design-system` com CSS Modules + tokens; stories em `domains/storybook`; journeys usam apenas design-system; shadcn restrito às rotas permitidas; `'use client'` e forwardRef nos componentes novos.  
3. **Documented Journeys Stay Traceable** – Atualizar `domains/BackOffice/journeys/admin-workflow`, `domains/FrontOffice/journeys/onboarding-flow`, `domains/GameHub/journeys/*` e `domains/README.md`/`domains/INDEX.md` via `pnpm gen:journeys`; incluir README, notas e links conforme templates.  
4. **Typed APIs & Observable Dashboards** – Tipar contratos de export/import (CSV/JSON/XML), rotas de dashboard/health, telemetry para Sentry/GA/Mixpanel; garantir source maps e alertas; manter SWR com estados de loading/error/empty; atualizar interfaces e schemas em `contracts/`.  
5. **Automation-First Quality Gates** – Refrescar plan/spec/tasks; rodar `/spec` na PR; evidenciar `pnpm build && pnpm lint && pnpm -r type-check && pnpm test && pnpm exec playwright test`; coberturas: unit ≥95%, E2E ≥80%; documentação dos resultados no quickstart.

## Project Structure

### Documentation (this feature)

```text
specs/feature/sprint6-execution/
├── plan.md          # Plano (este arquivo)
├── spec.md          # Especificação Sprint 6
├── research.md      # Fase 0
├── data-model.md    # Fase 1 entidades
├── quickstart.md    # Fase 1 instruções
├── contracts/       # Fase 1 APIs/formatos
└── tasks.md         # Fase 2 backlog executivo
```

### Source Code (repository root)

```text
apps/
├── admin/                 # Next.js 15; integra Sentry/GA; rotas CSV/JSON/XML; dashboards
└── storybook/             # Catálogo dos componentes (Progress, Leaderboard, journeys mocks)

packages/
├── design-system/         # Novos componentes Progress e Leaderboard
├── tokens/                # CSS vars; build antes do design-system
└── eslint-config/         # Lints compartilhados

domains/
├── BackOffice/journeys/admin-workflow/   # 3 telas + README/notas/links
├── FrontOffice/journeys/onboarding-flow/ # 5 telas + README/notas/links
├── GameHub/journeys/game-hub/            # hub, detalhe, leaderboard global
└── INDEX.md / README.md                  # índice gerado e documentação

.github/workflows/sprint-2-validation.yml # CI (build/lint/type-check/test/E2E)
contracts/ (specs/feature/sprint6-execution/contracts/) # OpenAPI/formatos export/import
```

**Structure Decision**: Monorepo web com apps (admin, storybook), packages (design-system, tokens, eslint-config) e domains (journeys BackOffice/FrontOffice/Game Hub), mais docs de feature em `specs/feature/sprint6-execution` e CI em `.github/workflows`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | – | – |
