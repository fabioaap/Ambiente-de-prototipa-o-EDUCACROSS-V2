# Tasks: sprint6-execution

**Input**: plan.md, spec.md, research.md, data-model.md, quickstart.md, contracts/
**Prerequisites**: Node 22.21.1, pnpm 9.14.4+

## Fase 1: Setup
- [ ] T001 Verificar versões (node 22.21.1, pnpm 9.14.4) em `.nvmrc` e ambiente local
- [ ] T002 Instalar dependências com `pnpm install --frozen-lockfile`
- [ ] T003 Build inicial: `pnpm build:tokens` e `pnpm build:design-system`

## Fase 2: Fundamentos (P1)
- [ ] T004 Rodar checagens base (`pnpm lint`, `pnpm -r type-check`, `pnpm check:shadcn`) e registrar pendências
- [ ] T005 [US1.1] Corrigir workflow `.github/workflows/sprint-2-validation.yml` (remover `continue-on-error`, garantir build/lint/test/type-check <10min)
- [ ] T006 [US1.2] Zerar warnings TS (Storybook, design-system, APIs) e remover `@ts-expect-error`/`any` injustificados
- [ ] T007 [US1.3] Fazer `pnpm test` passar 76/76, eliminar flaky/skip e manter cobertura ≥95%

## Fase 3: Prontidão de Produção (P2)
- [ ] T008 [US2.1] Configurar Playwright (Chromium/Firefox/WebKit), cobrir dashboard e studio, atingir ≥80% E2E, artifacts em falha
- [ ] T009 [US2.2] Integrar Sentry (DSN/env/release, source maps, boundaries em admin), criar alerta >10 erros/h
- [ ] T010 [US2.3] Integrar GA4 ou Mixpanel (page views + eventos: dashboard load, criar/editar/publish página, export CSV/JSON/XML; propriedades de sessão)
- [ ] T011 [US2.4] Criar templates (journey, feature spec, API doc) e migrar 3+ journeys para novo formato
- [ ] T012 [US2.5] Implementar export/import CSV/JSON/XML com validação de schema e mensagens de erro detalhadas; testes por formato

## Fase 4: Componentes Design System (P2)
- [ ] T013 [US3.1] Implementar `Progress` (linear/circular, props value/variant/size/animated, ARIA) + story + export em `src/index.ts`
- [ ] T014 [US3.2] Implementar `Leaderboard` (usa Progress, top 10 default, highlight current user, responsivo, teclado) + story + export

## Fase 5: Journeys (FrontOffice/BackOffice/Game Hub) (P2)
- [ ] T015 [US3.4] BackOffice: telas login, dashboard, perfil usando design-system; README/notas/links completos
- [ ] T016 [US3.5] FrontOffice onboarding (5 telas) usando design-system e Leaderboard: incluir tela Figma node-id=6480-4789 (Painel inicial) fiel ao design, responsiva e acessível
- [ ] T017 [US3.6] Game Hub: hub de jogos, detalhe, leaderboard global (usa Progress/Leaderboard), 12 mocks
- [ ] T018 [US3.7] Atualizar `domains/INDEX.md` via `pnpm gen:journeys`, READMEs e tagging Sprint 6

## Fase 6: Puck Enhancement (Opcional P2)
- [ ] T019 [US3.3] Integrar `@measured/puck/DropZone` em `puck.config.tsx` e documentar uso sem erros de console

## Fase 7: Polish & Quality Gates
- [ ] T020 Rodar ciclo final (`pnpm lint && pnpm -r type-check && pnpm test && pnpm exec playwright test && pnpm build`), registrar resultados no quickstart
- [ ] T021 Adicionar evidências visuais (screenshots/videos) das journeys e componentes em `research.md`
- [ ] T022 Passar checklist de acessibilidade (foco, aria, contraste ≥4.5:1) em componentes e journeys
- [ ] T023 Verificar metas de performance (Page load ≤2s, Storybook build <90s, bundle main <500KB gz) e anotar medições
- [ ] T024 Cobrir segurança (NFR-S1–S4): `pnpm audit --prod`, checar cabeçalhos/CSRF/XSS, garantir logs sem PII e Sentry com PII off
- [ ] T025 Cobrir confiabilidade (NFR-R1–R3): medir erro <1% e uptime 99% (dashboards/health), documentar modos degradados/empty states
- [ ] T026 Rodar `/spec` e anexar relatório na PR (Automation-First Quality Gates)

## Dependências & Ordem
- Fase 1 → 2 → 3 → 4 → 5 → (6 opcional) → 7
- US2.1 depende de US1.1 (CI estável). US3.2 depende de US3.1. US3.5 depende de Leaderboard. US3.7 após journeys. Puck (T019) pode ser adiado se cronograma apertar.

## Estratégia
- Semana 1: Fechar P1 (T004–T007) e iniciar Playwright/Sentry/Analytics (T008–T010)
- Semana 2: Fechar templates/export-import (T011–T012), componentes (T013–T014) e journeys (T015–T018); opcional T019 se houver folga; finalizar com gates e evidências (T020–T023)
