# Implementation Plan: Experience Hub Consolidation

**Branch**: `001-experience-hub-consolidation` | **Date**: 2025-11-26 | **Spec**: `specs/001-experience-hub-consolidation/spec.md`
**Input**: Feature specification consolidando Storybook/Dashboard em um Experience Hub único, conforme issues #92 e #94.

## Summary

Criar um "Experience Hub" dedicado (nova pasta sob `apps/experience-hub/`) para hospedar Storybook e futuras páginas utilitárias (dashboard demo, catálogos) sem interferir no Studio. O plano inclui: (1) mover o Storybook que hoje vive em `apps/storybook` para dentro do hub e garantir que ele consuma apenas componentes documentados nas pastas `domains/*`; (2) remover o CSS global que estava vazando para `/dashboard`; (3) reconfigurar o dashboard raiz para usar Shadcn apenas depois dessa limpeza; (4) atualizar documentação de jornadas para que Storybook/HUB/Studio usem os mesmos links e slugs.

## Technical Context

**Language/Version**: TypeScript 5.x / Next.js 15 (React 18) / Node 22.21.1  
**Primary Dependencies**: `@prototipo/design-system`, `@prototipo/tokens`, SWR, pnpm workspace tooling, Storybook 8, Shadcn (restrito ao dashboard/hub), tsup  
**Storage**: Local JSON mocks + localStorage (nenhum backend persistente)  
**Testing**: `pnpm lint`, `pnpm -r type-check`, `pnpm build`, Storybook visual inspection, `/spec` via SpecKit  
**Target Platform**: Web (Next.js App Router + Storybook dev server)  
**Project Type**: Monorepo pnpm com apps/packages  
**Performance Goals**: Build completo < 4 min; `/dashboard` render < 3 s sem console errors  
**Constraints**: Guardrail `pnpm check:shadcn`, build order tokens → design-system → hub/studio/storybook; dashboards não podem depender de CSS global  
**Scale/Scope**: 3 domínios principais (BackOffice, FrontOffice, Game) e até 10 jornadas documentadas nesta sprint.

## Constitution Check

1. **Run-Ready Prototypes Only** – Scripts impactados: `pnpm build:tokens`, `pnpm build:design-system`, `pnpm build:hub`, `pnpm build:studio`. Vamos ajustar `package.json` para refletir a nova ordem e garantir que `pnpm lint`/`pnpm -r type-check` rodem antes de cada commit. Também validaremos que `/dashboard` e o novo Storybook não exibem `console.error` após o split.
2. **Single Design System Surface** – Storybook e Studio continuam usando apenas `@prototipo/design-system`; Shadcn ficará restrito ao hub/dash (scripts `pnpm check:shadcn` continuam obrigatórios). Qualquer componente client terá `'use client'`, `React.forwardRef` e será registrado em `puck.config.tsx` quando aplicável.
3. **Documented Journeys Stay Traceable** – Atualizaremos `domains/README.md`, `domains/INDEX.md`, `domains/*/journeys/*/README.md|links.md|notas.md`, `PROGRESS_DASHBOARD.md` e `SPRINT3_EXECUTION_DETAILED.md` para refletir o novo hub e manter links para Studio e Storybook sincronizados.
4. **Typed APIs & Observable Dashboards** – Não esperamos alterar `/api/dashboard/*` diretamente, mas caso algum widget do dashboard seja adaptado, atualizaremos os tipos em `apps/studio/src/app/api/dashboard/*/route.ts`, `docs/health-metrics-widgets.md` e `/api/health`. Monitorar logs e `dashboardLogger` para garantir mensagens claras se endpoints estiverem indisponíveis durante a migração.
5. **Automation-First Quality Gates** – Este plan.md e spec.md estão atualizados; geraremos tasks.md via `/speckit.tasks`. Cada PR publica `/spec`, inclui evidências (`pnpm lint`, `pnpm -r type-check`, `pnpm build`) e descreve como o hub foi validado.
## Project Structure

### Documentation (this feature)

```text
specs/001-experience-hub-consolidation/
├── plan.md
├── spec.md
├── tasks.md (a gerar via /speckit.tasks)
├── research.md (Phase 0, se necessário)
├── data-model.md (caso definamos novos contratos)
└── quickstart.md (guia para rodar o Experience Hub)
```

### Source Code (monorepo)

```text
apps/
├── studio/                     # Puck + dashboards existentes
│   ├── src/app/dashboard       # Limpo do CSS antigo, pronto para Shadcn controlado
│   └── src/app/[[...slug]]     # Continua servindo jornadas de domains/
├── experience-hub/             # NOVO (Storybook + futuras páginas utilitárias)
│   ├── storybook/              # Configuração movida de apps/storybook
│   └── README.md               # Guia de execução
└── storybook/ (legacy)         # A ser removido após migração

domains/
├── BackOffice/
├── FrontOffice/
└── Game/

packages/
├── design-system/
└── tokens/

docs/
├── PROGRESS_DASHBOARD.md
├── SPRINT3_EXECUTION_DETAILED.md
└── health-metrics-widgets.md
```

**Structure Decision**: Adotar um novo subdiretório `apps/experience-hub/` para consolidar Storybook/dashboards utilitários, mantendo `apps/studio/` focado em Puck/Journeys. Durante a execução removeremos o antigo `apps/storybook` e ajustaremos scripts para apontarem para o hub.
directories captured above]

## Complexity Tracking

Nenhuma violação planejada. A criação do `apps/experience-hub/` é considerada reorganização necessária para cumprir o princípio "Run-Ready Prototypes" (evitar CSS vazando) e "Single Design System Surface" (Storybook/Studio continuam em sincronia).
