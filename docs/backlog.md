# 📋 BACKLOG CONSOLIDADO — Ambiente de Prototipação EDUCACROSS

**Última atualização**: 25/11/2025  
**Branch**: `feature/code-to-figma-integration`

---

## 📌 Como usar este backlog

- **Checkboxes**: marque `[x]` quando concluir uma tarefa
- **Seções**: Desenvolvimento (técnico) + Entrega Educacross (business/jurídico)
- **Referências**: documentos de suporte listados no final
- **Atualização**: faça PR sempre que um item avançar

---

## 🔷 SEÇÃO 1: DESENVOLVIMENTO (Sprints & Issues)

### Sprint 1 (P0) — INFRA BASE ✅ COMPLETO

- [x] #1 C1 - Studio: inicial setup
- [x] #2 B1 - Design System: base
- [x] #3 D1 - Storybook: setup
- [x] #5 F1 - Tooling: ESLint + Prettier

### Sprint 2 (P1) — FEATURES CRÍTICAS ✅ COMPLETO

- [x] #6 C2 - Studio: sidebar navigation
- [x] #7 B4 - Design System: accessibility
- [x] #8 D2 - Storybook: A11y addon
- [x] #9 G4 - Script: index journeys
- [x] #10 G6 - CONTRIBUTING.md
- [x] #12 H1 - Dashboard: planning
- [x] #16 H5 - Dashboard: report generator

### Sprint 3 (P1) — CRÍTICAS

- [ ] #59 PUCK - Puck Refactor DropZone (2.5h) ⚠️ BLOCKER
- [ ] #57 F1.1 - FrontOffice: Onboarding 5 telas (4h)
- [ ] #56 E1.1 - BackOffice: Revisão 3 telas (5h)

### Sprint 3 (P2) — DASHBOARD SEQUENCIAL

- [x] #53 H2.1 - Dashboard API: GET /api/dashboard/summary ✅
- [x] #54 H2.2 - Dashboard UI: KPIs, Health, Recent Pages, Atalhos ✅
- [ ] #55 H2.3 - Health Indicators: Estatísticas avançadas (4h)

### Sprint 3 (P2) — COMPONENTES & GAME

- [ ] #60 DS.1 - Design System: Progress Component (2h)
- [ ] #61 DS.2 - Design System: Leaderboard Component (2.5h)
- [ ] #58 G1.1 - Game Hub (depende #61) (3h)

### Backlog Técnico

- [ ] #62 CI.1 - SpecKit: PR validation & sprint rules (1h)
- [ ] #63 C2.2 - Code-to-Figma integration: docs & backlog (2h)

---

## 🔶 SEÇÃO 2: ENTREGA EDUCACROSS (Business & Jurídico)

### Alta Prioridade

- [x] Dashboard API com `navigationLinks` para Storybook/jornadas
- [x] Dashboard UI com atalhos rápidos (Storybook, Domínios, Docs)
- [ ] Minuta de cessão de direitos (`docs/minuta-cessao-de-direitos.md`)
  - [x] Rascunho criado
  - [ ] Revisão pelo Jurídico
  - [ ] Inclusão de Anexo A (inventário de entregáveis)
- [ ] Inventário de Entregáveis (`docs/NOTICE_ENTREGAVEIS.md`)
- [ ] Inventário Background IP (`docs/INVENTARIO-BACKGROUND-IP.md`)

### Média Prioridade

- [ ] Script `pnpm sync:educacross` — empacotar Storybook + domains + docs
- [ ] Repositório de teste (`fabioaap/educacross-sync-test`) para validar sync
- [ ] Checklist de migração (`docs/checklist-entrega-educacross.md`)
- [ ] Instruções de migração (`docs/instrucoes-migracao-educacross.md`)
- [ ] CI/CD para GitHub Pages no repo destino

### Baixa Prioridade

- [ ] Game Hub (#58) — jornada Game consolidada
- [ ] Cobertura Storybook completa (stories para todos componentes)
- [ ] Code-to-Figma pipeline funcional

### Tarefas Administrativas

- [ ] Redigir e-mail padrão para RH/Jurídico com minuta e Anexo A
- [ ] Registrar cronograma de entregas recorrentes (ex.: a cada sprint)
- [ ] Criar template de PR para transferências (diretórios/arquivos incluídos)

---

## 📊 MÉTRICAS

| Métrica | Valor | Status |
|---------|-------|--------|
| Issues Fechadas | 11 | ✅ |
| Issues Abertas | 14 | 📋 |
| Taxa de Conclusão | 44% | |
| Sprint 1 (P0) | 100% | ✅ COMPLETO |
| Sprint 2 (P1) | 100% | ✅ COMPLETO |
| Sprint 3 (P2) | ~20% | 🚧 EM ANDAMENTO |
| Entrega Educacross | ~30% | 🚧 EM ANDAMENTO |

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS

1. [ ] Criar `docs/NOTICE_ENTREGAVEIS.md` e `docs/INVENTARIO-BACKGROUND-IP.md` — 1 dia
2. [ ] Gerar script `pnpm sync:educacross` e checklist — 1-2 dias
3. [ ] Criar repo de teste e validar sync — 1 dia
4. [ ] Enviar minuta para Jurídico com Anexo A — 2-4 dias

---

## 📚 REFERÊNCIAS (Documentos Anexos)

### Jurídico & Estratégia
- [`docs/minuta-cessao-de-direitos.md`](./minuta-cessao-de-direitos.md) — minuta rascunho de cessão de direitos
- [`docs/estrategia-migracao-educacross.md`](./estrategia-migracao-educacross.md) — estratégia recorrente de migração

### Técnico
- [`apps/studio/src/app/api/dashboard/summary/route.ts`](../apps/studio/src/app/api/dashboard/summary/route.ts) — API do dashboard
- [`apps/studio/src/app/dashboard/page.tsx`](../apps/studio/src/app/dashboard/page.tsx) — UI do dashboard
- [`docs/SPRINT3_EXECUTION_DETAILED.md`](./SPRINT3_EXECUTION_DETAILED.md) — sprints e tarefas fase 3

### Pendentes (a criar)
- `docs/NOTICE_ENTREGAVEIS.md` — inventário de entregáveis
- `docs/INVENTARIO-BACKGROUND-IP.md` — inventário Background IP
- `docs/checklist-entrega-educacross.md` — checklist de migração
- `docs/instrucoes-migracao-educacross.md` — instruções de migração

---

**Última atualização**: 25/11/2025 | **Autor**: DevOps Agent
