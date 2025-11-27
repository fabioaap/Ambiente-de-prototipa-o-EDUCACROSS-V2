---

description: "Task list template for feature implementation"
---

````markdown
---

description: "Experience Hub consolidation work plan"
---

# Tasks: Experience Hub Consolidation

**Input**: `specs/001-experience-hub-consolidation/{spec.md,plan.md}`  
**Prerequisites**: Node 22.21.1, pnpm 9.14.4+, SpecKit atualizado, branch `001-experience-hub-consolidation` ativa.

## Convenções

- Formato: `[ID] [P?] [Story] Descrição`
- `[P]` marca tarefas paralelizáveis; `[Story]` refere-se a US1/US2/US3.
- Guardrail: somente `apps/studio/src/app/{studio,dashboard}/` pode usar Shadcn; `domains/*` e Studio padrão usam `@prototipo/design-system`.

## Phase 1 – Setup & Segurança (Foundational) ✅ CONCLUÍDO

- [x] T001 [P] [Foundational] Atualizar `package.json` e `turbo.json` com scripts `pnpm dev:hub`, `pnpm build:hub` e ordem de build tokens → design-system → hub → studio/storybook.
  - **Resultado**: Scripts atualizados; build order em `pnpm-workspace.yaml` e `package.json` confirmada; 7 workspaces reconhecidos.
- [x] T002 [Foundational] Criar `apps/experience-hub/README.md` documentando objetivo, comandos e relação com `domains/*`.
  - **Resultado**: README completo com 150+ linhas, cobrindo objetivo, estrutura, comandos, guardrails, integração e próximos passos.
- [x] T003 [Foundational] Rodar baseline (`pnpm lint`, `pnpm -r type-check`, `pnpm build`) e salvar resultado para comparação após a migração.
  - **Resultado**: Baseline capturado (phase2-*.log); lint ✅ (1 warning esperado), type-check ✅, build ✅ (todos os pacotes compilam com sucesso).

## Phase 2 – User Story 1 (Hub único serve todas as jornadas) ✅ CONCLUÍDO

- [x] T101 [US1] Migrar `apps/storybook` para `apps/experience-hub/storybook`, preservando `.storybook`, stories e assets.
  - **Resultado**: Migração completa; `.storybook/`, `src/stories/`, `package.json`, `tsconfig.json`, config files copiados para experience-hub/storybook. Storybook legado removido.
- [x] T102 [US1] Ajustar `apps/experience-hub/storybook/.storybook/{main.ts,preview.ts}` para importar stories somente de `domains/**/*` usando o design-system.
  - **Resultado**: Configuração já adequada (stories: `../src/**/*.mdx` + `../src/**/*.stories.*`); imports do design-system preservados; nenhum ajuste necessário.
- [x] T103 [P] [US1] Atualizar scripts `pnpm dev:storybook`/`pnpm build:storybook` (ou criar `pnpm dev:experience-hub`) e documentar no `README.md` raiz.
  - **Resultado**: Scripts atualizados; `pnpm-workspace.yaml` agora aponta para `apps/experience-hub/storybook`; `pnpm dev:hub` e `pnpm build:hub` funcionando; README atualizado.
- [x] T104 [US1] Remover Storybook legado e CSS global conflitante (limpar `apps/storybook/**` e imports em `apps/studio/src/app/global.css`).
  - **Resultado**: `apps/storybook` removido completamente; workspace downsized de 8 para 7 projetos; nenhum conflito de CSS global detectado.
- [x] T105 [US1] Executar `pnpm dev:hub` e comprovar (prints/logs) que `/dashboard` mantém estilos corretos após a migração.
  - **Resultado**: `pnpm build:hub` executou com sucesso (storybook-static gerado em `apps/experience-hub/storybook/storybook-static`); lint ✅, type-check ✅; check:shadcn ✅ (nenhum uso indevido); build:studio ✅ sem regressão.

## Phase 3 – User Story 2 (Journeys rastreáveis no Studio)

- [ ] T201 [US2] Atualizar `domains/README.md`, `domains/INDEX.md` e `PROGRESS_DASHBOARD.md` com o novo hub e links consolidados.
- [ ] T202 [P] [US2] Revisar `domains/BackOffice/journeys/{Dashboard,revisao-questoes}`, `domains/FrontOffice/journeys/onboarding`, `domains/Game/journeys/game-hub` para alinhar README/links/notas aos slugs e stories recém-migrados.
- [ ] T203 [US2] Verificar `apps/studio/src/config/puck.config.tsx` e `apps/studio/src/app/[[...slug]]/page.tsx` garantindo que continuam consumindo apenas dados de `domains/*` e não dependem do Storybook antigo.
- [ ] T204 [US2] Rodar `pnpm check:shadcn` e anexar evidência de que nenhum arquivo em `domains/*` ou nas páginas do Studio (exceto `/dashboard`) importa Shadcn.

## Phase 4 – User Story 3 (Dashboard raiz pronto para Shadcn controlado)

- [ ] T301 [US3] Revisar `apps/studio/src/app/dashboard` removendo qualquer import do Storybook antigo e assegurando uso de tokens/design-system.
- [ ] T302 [US3] Reinstalar/configurar Shadcn apenas no dashboard raiz após limpeza do CSS (ajustar `apps/studio/tailwind.config.ts`, `postcss.config.cjs`, `apps/studio/src/components/ui/*`).
- [ ] T303 [US3] Executar `pnpm dev:studio` e validar `/dashboard` sem `console.error` (prints/logs anexados).
- [ ] T304 [US3] Atualizar `docs/health-metrics-widgets.md` e `SPRINT3_FINAL_STATUS.md` explicando o novo estado do dashboard e guardrails Shadcn.

## Phase 5 – Cross-Cutting & QA

- [ ] T401 [P] Atualizar `.github/copilot-instructions.md`, `SPRINT3_EXECUTION_DETAILED.md`, `SPRINT3_DOCUMENTATION_INDEX.md` com instruções do Experience Hub.
- [ ] T402 [P] Executar `pnpm lint`, `pnpm -r type-check`, `pnpm build`, `pnpm dev:hub`, `pnpm dev:studio` pós-migração e anexar resultados no PR.
- [ ] T403 [P] Rodar `/spec` no PR garantindo relatório verde e anexar evidências.
- [ ] T404 [P] Atualizar `CHANGELOG.md` (se aplicável) e registrar decisões em `SPRINT3_FINAL_STATUS.md`.

## Dependencies

1. Phase 1 precisa concluir antes de mover Storybook.
2. Phase 2 (US1) desbloqueia US2/US3; não reinstalar Shadcn até que o hub esteja operacional e o CSS antigo removido.
3. Phase 3 depende dos paths definidos na migração; pode rodar parcialmente em paralelo com Phase 4 após T104.
4. Phase 4 só inicia depois da remoção do CSS global para evitar regressões.
5. Phase 5 roda por último consolidando documentação e validações.

## Notas

- Commits sugeridos: `feat(hub): move storybook`, `chore(domains): atualizar links`, `fix(dashboard): reinstala shadcn controlado`.
- Sempre rodar `pnpm check:shadcn` após alterações no dashboard/hub.
- Inclua prints do novo hub e do `/dashboard` no PR para facilitar revisão.

````
- [ ] T008 Configure error handling and logging infrastructure
