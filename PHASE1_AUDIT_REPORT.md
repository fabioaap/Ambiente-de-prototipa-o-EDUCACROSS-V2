# FASE 1: Audit & Merge Strategy – PR Audit Report (2025-11-22)

**Status**: Audit em progresso  
**Total de PRs**: 28 abertos  
**Classificação**: 3 grupos + ações recomendadas  

---

## 🎯 GRUPOS IDENTIFICADOS

### 🔴 GRUPO 1: Sprint 2 P1 – CRÍTICAS (5 PRs)
**Deadline**: 2025-11-25  
**Status**: Prontas para merge  
**Ação**: Mergear em sequência, nesta ordem exata

| # | Título | Branch | Status | Dependência | Ação |
|---|--------|--------|--------|-------------|------|
| #40 | CONTRIBUTING.md | `copilot/create-contributing-md` | ✅ Pronto | Nenhuma | Mergear 1º |
| #42 | Sidebar navigation (C2) | `copilot/add-sidebar-page-list` | ✅ Pronto | Nenhuma | Mergear 2º ⭐ Critical |
| #38 | Index script (G4) [WIP] | `copilot/create-automatic-index-script` | ⏳ WIP | Nenhuma | Finalizar → Mergear 3º |
| #35 | Accessibility (B4) | `copilot/improve-accessibility-design-system` | ✅ Pronto | Nenhuma | Mergear 4º |
| #36 | A11y addon (D2) | `copilot/add-storybook-addon-a11y` | ✅ Pronto | Depende #35 | Mergear 5º |

**Ordem de Merge**: #40 → #42 → #38 → #35 → #36

---

### 🟡 GRUPO 2: Sprint 3 P2 – Dashboard H Epic (5 PRs)
**Deadline**: Após P1 estabilizar (~2025-12-06)  
**Status**: Em paralelo, causando conflitos  
**Ação**: Decidir estratégia

| # | Título | Branch | Status | Bloqueia |
|---|--------|--------|--------|----------|
| #44 | H1 Planning | `feature/h1-dashboard-planning` | ✅ Pronto | #43, #45 |
| #43 | H1 UI | `feature/dashboard-ui` | ✅ Pronto | — |
| #41 | H Epic (parent) | `feature/h-dashboard-epic` | ✅ Pronto | — |
| #45 | H4 Metrics | `feature/h4-health-metrics` | ✅ Pronto | #44 |
| #46 | H4 Fixes | `feature/h4-fix-timestamps` | ✅ Pronto | #45 |

**Estratégia Recomendada**:
```
SEQUENCIAR (seguro, claro):
  1. Mergear #44 (H1 Planning)
  2. Mergear #43 (H1 UI)
  3. Mergear #45 (H4 Metrics)
  4. Mergear #46 (H4 Fixes)
  5. Mergear #41 (H Epic - consolidar)
  
  Vantagem: Claro qual foi mergeado quando
  Desvantagem: Mais merges (5 vs 1)
  Tempo: 1-2 dias
```

---

### 🟠 GRUPO 3: Outras/Backlog (18 PRs)
**Status**: Incerto – requer decisão individual  
**Ação**: Triage — keep/merge/close cada uma

| # | Título | Status | Recomendação |
|---|--------|--------|--------------|
| #48 | Sprint 2: Docs & tooling | ⏳ Meta-PR? | ❓ Clarifar propósito |
| #47 | Storybook link no Dashboard | 🟢 Pequeno | ✅ Mergear |
| #39 | CSS vars no Storybook | 🟡 Médio | ⏳ Aguardar P1 |
| #37 | Formulários no Puck | 🟡 Médio | ⏳ Aguardar P1 |
| #34 | Jornada BackOffice | 🟡 Médio | ⏳ Aguardar P1 |
| #33 | ESLint unificado | 🟢 Pequeno | ✅ Mergear |
| #32 | Validação de API | 🟡 Médio | ⏳ Aguardar P1 |
| #31 | PR cleanup analysis | 📝 Análise | ✅ Fechar (propósito alcançado) |
| #29 | P0 completions | 🟡 Médio | ⏳ Aguardar P1 |
| #28 | Sprint 1 validation | 🟡 Médio | ⏳ Aguardar P1 |
| #27 | Feature/f3-github-actions | 🟢 Pequeno | ✅ Mergear |
| #26 | v0.2-beta staging infra | 🟡 Médio | ⏳ Aguardar P1 |
| #24 | docs: sync issues | 📝 Análise | ✅ Fechar (propósito alcançado) |
| #22 | QA testing docs | 📝 Documentação | ✅ Mergear |
| #21 | v0.2-beta planning | 📝 Documentação | ✅ Mergear |
| #20 | CI/CD pipeline | 🟡 Médio | ⏳ Aguardar P1 |
| #19 | docs: open issues tracking | 📝 Documentação | ✅ Mergear |
| #18 | PR approval automation | 🟢 Pequeno | ✅ Mergear |

**Ações por Categoria**:
- ✅ Mergear agora (6): #47, #33, #27, #22, #21, #19, #18 (7 PRs pequenas)
- ⏳ Aguardar P1 (9): #39, #37, #34, #32, #29, #28, #26, #20, etc
- ✅ Fechar (2): #31, #24 (propósito alcançado)
- ❓ Clarifar (1): #48 (é meta-PR ou PR de feature?)

---

## 📊 SUMÁRIO EXECUTIVO

### Antes (28 PRs)
```
Sprint 2 P1:  5 PRs (críticas)
Dashboard P2: 5 PRs (em paralelo)
Outras:       18 PRs (caótico)
```

### Depois da FASE 1 (Objetivo: ~10-15 PRs)
```
Sprint 2 P1:  ✅ MERGEADO (0 PRs)
Dashboard P2: 5 PRs (sequenciado, claro)
Outras:       7 PRs (9 aguardando, 2 fechadas, 1 para clarifar)
```

---

## 🛣️ PLANO DETALHADO

### PASSO 1: Mergear Sprint 2 P1 (Hoje 2025-11-22)

```bash
# #40 CONTRIBUTING.md
gh pr merge 40 --squash -m "feat(docs): Complete CONTRIBUTING.md with workflows"
pnpm build  # Validar

# #42 Sidebar navigation (CRÍTICO)
gh pr merge 42 --squash -m "feat(studio): Implement sidebar page navigation and API"
pnpm build  # Validar

# #38 Index script (se finalizado hoje)
gh pr merge 38 --squash -m "feat(scripts): Add automatic journey index generator"
pnpm build  # Validar

# #35 A11y improvements
gh pr merge 35 --squash -m "feat(ds): Improve accessibility with ARIA and focus management"
pnpm build  # Validar

# #36 A11y addon (depende #35 mergeado)
gh pr merge 36 --squash -m "feat(storybook): Add A11y addon with WCAG 2.1 AA validation"
pnpm build  # Validar
```

**Timeline**: 1 dia (validação + merge + build checks)

---

### PASSO 2: Decidir Dashboard Strategy (Amanhã 2025-11-23)

**Opção A: Sequenciar (RECOMENDADO)**
```
Mergear em sequência:
  1. #44 (H1 Planning)
  2. #43 (H1 UI)
  3. #45 (H4 Metrics)
  4. #46 (H4 Fixes)
  5. #41 (H Epic - consolidar)

Timeline: 1-2 dias
Segurança: Alta (cada merge validado individualmente)
Clareza: Alta (histórico claro no git)
```

**Opção B: Rebasear & Mega-PR**
```
Rebasear todos em main, fazer 1 PR mega-H-epic

Timeline: 6-8 horas
Segurança: Média (alto risco de conflicts)
Clareza: Baixa (1 commit gigante)
```

✅ **RECOMENDAÇÃO**: Opção A (Sequenciar)

---

### PASSO 3: Mergear Outras Pequenas (Paralelo)

**Imediato** (hoje, sem bloqueadores):
- [ ] #47 Storybook link
- [ ] #33 ESLint unificado
- [ ] #27 Feature/f3
- [ ] #22 QA docs
- [ ] #21 v0.2-beta planning
- [ ] #19 Open issues docs
- [ ] #18 PR approval automation

**Comando**:
```bash
for pr in 47 33 27 22 21 19 18; do
  gh pr merge $pr --squash
  pnpm build
done
```

**Timeline**: 2-3 horas (batch)

---

### PASSO 4: Fechar PRs Obsoletas (Paralelo)

```bash
# #31 PR cleanup analysis (propósito alcançado)
gh pr close 31 -c "Propósito alcançado - análise concluída em STRATEGIC_ANALYSIS.md"

# #24 docs: sync issues (propósito alcançado)
gh pr close 24 -c "Propósito alcançado - backlog atualizado em docs/backlog.md"
```

---

## 🎯 Métricas Esperadas Pós-FASE 1

| Métrica | Antes | Depois | ✅ Target |
|---------|-------|--------|----------|
| Total PRs abertos | 28 | ~10-12 | 5-7 |
| Sprint 2 P1 | 5 | 0 | 0 |
| Dashboard P2 | 5 | 5 (sequenciado) | 0 (após merge) |
| Build status | ✅ OK | ✅ OK | ✅ OK |
| Main branch | Compilando | Compilando | Compilando |

---

## ⚠️ Riscos & Mitigation

| Risco | Probabilidade | Mitigation |
|-------|---------------|-----------|
| Merge conflicts em #42, #43 | Médio | Rebasear antes de merge |
| Build quebra após #35 merge | Baixo | Rodar `pnpm build` local ANTES |
| #38 ainda não pronto | Médio | Deixar para amanhã se needed |
| Dashboard conflita com P1 | Médio | Sequenciar, não paralelo |

---

## 📅 Timeline Resumido

| Data | Ação | Status |
|------|------|--------|
| 2025-11-22 (hoje) | Mergear Sprint 2 P1 (#40→#42→#38→#35→#36) | 🟢 AGORA |
| 2025-11-22 (hoje) | Mergear 7 pequenas (Grupo 3) | 🟢 AGORA |
| 2025-11-22 (hoje) | Fechar 2 obsoletas (#31, #24) | 🟢 AGORA |
| 2025-11-23 | Mergear Dashboard sequenciado (#44→#43→#45→#46→#41) | 🟡 AMANHÃ |
| 2025-11-23 | Decidir fate das 9 PRs restantes (aguardando/bloqueadas) | 🟡 AMANHÃ |
| 2025-11-24 | Iniciar Fase 2 (Workflow.md, GitHub automations) | 🟡 DEPOIS |

---

## ✅ Checklist de Execução

### Hoje (2025-11-22)
- [ ] Mergear #40 (G6 CONTRIBUTING)
- [ ] Mergear #42 (C2 Sidebar) ⭐
- [ ] Finalizar ou deixar para amanhã: #38 (G4 Index)
- [ ] Mergear #35 (B4 A11y)
- [ ] Mergear #36 (D2 A11y addon)
- [ ] Mergear 7 pequenas (#47, #33, #27, #22, #21, #19, #18)
- [ ] Fechar #31 e #24
- [ ] Validar main compila após cada batch

### Amanhã (2025-11-23)
- [ ] Decidir Dashboard (sequenciar vs mega-PR)
- [ ] Se sequenciar: mergear #44 → #43 → #45 → #46 → #41
- [ ] Decidir fate de 9 PRs restantes
- [ ] Atualizar este relatório

### Depois (2025-11-24)
- [ ] Iniciar Fase 2 (Workflow.md)
- [ ] Configurar GitHub automations
- [ ] Publicar roadmap

---

**Gerado**: 2025-11-22  
**Status**: Audit completo, pronto para execução  
**Próximo**: Começar merges agora

