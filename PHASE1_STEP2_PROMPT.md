# 🚀 FASE 1 – STEP 2: Prompt Executável

**Data**: 2025-11-22  
**Status**: Pronto para execução  
**Duração Estimada**: 1-2 horas  

---

## 📋 O que é Step 2?

Continuação de Fase 1 (Estabilização Imediata). Após mergear as 4 PRs críticas de Sprint 2 P1 em Step 1, agora vamos:

1. **Mergear 7 pequenas PRs** (Grupo 3) – independentes, sem bloqueadores
2. **Decidir Dashboard strategy** – sequenciar vs rebasear H Epic
3. **Fechar 2 PRs obsoletas** – que já cumpriram seu propósito
4. **Validar build** – garantir que main compila

---

## 📌 PRs Envolvidas em Step 2

### 🟢 7 Pequenas PRs a Mergear (Independentes)

| PR | Título | Tipo | Prioridade |
|----|--------|------|-----------|
| #47 | Storybook link no Dashboard | Feature | Baixa |
| #33 | ESLint unificado | Feature | Média |
| #27 | Feature/f3-github-actions | Feature | Média |
| #22 | QA testing documentation | Docs | Baixa |
| #21 | v0.2-beta planning | Docs | Baixa |
| #19 | docs: open issues tracking | Docs | Baixa |
| #18 | PR approval automation | Feature | Baixa |

**Status**: Todas prontas para merge  
**Bloqueadores**: Nenhum  
**Tempo estimado**: 30-45 min (batch merge)

---

### 🟡 5 PRs Dashboard (H Epic) – DECIDIR ESTRATÉGIA

| PR | Título | Depende |
|----|--------|---------|
| #44 | H1 Planning | — |
| #43 | H1 UI | — |
| #45 | H4 Metrics | #44 |
| #46 | H4 Fixes | #45 |
| #41 | H Epic (parent) | — |

**Problema**: Todas abertas em PARALELO = CONFLITOS  
**Solução**: Sequenciar (mais seguro) ou rebasear (mais rápido)

---

### 🗑️ 2 PRs Obsoletas a Fechar

| PR | Propósito | Status |
|----|-----------|--------|
| #31 | PR cleanup analysis | ✅ Concluído |
| #24 | docs: sync issues | ✅ Concluído |

**Razão**: Propósito já alcançado (documentado em STRATEGIC_ANALYSIS.md)

---

## 🛠️ Como Executar

### Opção 1: Script Automático (Recomendado)

```powershell
# Navegar para o projeto
cd "c:\Users\Educacross\Documents\Ambiente-de-prototipa-o-EDUCACROSS-V2"

# Executar script
.\scripts\merge-phase1-step2.ps1
```

O script vai:
1. Perguntar se quer mergear 7 PRs
2. Perguntar qual estratégia de Dashboard (A/B)
3. Perguntar se quer fechar obsoletas
4. Validar build
5. Fazer commit com resumo

---

### Opção 2: Manual (Passo a Passo)

#### Step 2.1 – Mergear 7 Pequenas

```bash
# Opção: Todos de uma vez (batch)
for pr in 47 33 27 22 21 19 18; do
  gh pr merge $pr --squash
  echo "✅ PR #$pr merged"
done

# Ou um por um (mais controle)
gh pr merge 47 --squash    # Storybook link
gh pr merge 33 --squash    # ESLint
gh pr merge 27 --squash    # Feature/f3
gh pr merge 22 --squash    # QA docs
gh pr merge 21 --squash    # v0.2-beta
gh pr merge 19 --squash    # Open issues
gh pr merge 18 --squash    # PR automation
```

#### Step 2.2 – Dashboard Strategy

**Opção A: Sequenciar (RECOMENDADO)**

Executar amanhã/próxima sessão:

```bash
# Ordem de merge
gh pr merge 44 --squash    # H1 Planning
gh pr merge 43 --squash    # H1 UI
gh pr merge 45 --squash    # H4 Metrics
gh pr merge 46 --squash    # H4 Fixes
gh pr merge 41 --squash    # H Epic (consolidar)
```

**Opção B: Mega-PR (Rápido mas Riscado)**

Não implementado neste script. Requer rebase manual complexo.

#### Step 2.3 – Fechar Obsoletas

```bash
gh pr close 31 --comment "✅ Propósito alcançado – análise em STRATEGIC_ANALYSIS.md"
gh pr close 24 --comment "✅ Propósito alcançado – backlog atualizado"
```

#### Step 2.4 – Validar

```bash
git pull origin main
pnpm build      # Verificar que compila
gh pr list      # Contar PRs abertas
```

---

## 📊 Resultados Esperados

### Antes de Step 2
```
Total PRs: 28 abertos
Sprint 2 P1: 4 mergeadas (Step 1)
Pequenas: 7 pendentes
Dashboard: 5 em paralelo
Obsoletas: 2 abertas
```

### Depois de Step 2
```
Total PRs: ~14-16 abertos (reduzido 50%)
Sprint 2 P1: ✅ 4 mergeadas (Step 1) + 7 (Step 2) = 11 total
Dashboard: 5 organizadas (estratégia decidida)
Obsoletas: ✅ 2 fechadas
Main: ✅ Compilando, estável
```

---

## ⏱️ Timeline

| Ação | Tempo | Status |
|------|-------|--------|
| Executar script | 5 min | 🟢 Automático |
| Mergear 7 PRs | 30-45 min | 🟢 Paralelo |
| Decidir Dashboard | 5 min | 🟡 Você decide |
| Fechar obsoletas | 5 min | 🟢 Automático |
| Validar build | 10 min | 🟢 Automático |
| Fazer commit | 5 min | 🟢 Automático |
| **Total** | **60 min** | |

---

## ✅ Checklist de Execução

- [ ] Navegou para o diretório do projeto
- [ ] Executou o script: `.\scripts\merge-phase1-step2.ps1`
- [ ] Respondeu [s] para mergear 7 PRs
- [ ] Escolheu Dashboard strategy (A ou B)
- [ ] Respondeu [s] para fechar obsoletas
- [ ] Validou que build compila
- [ ] Respondeu [s] para fazer commit
- [ ] Verificou que commit foi pushado para main

---

## 🎯 Decisão Importante: Dashboard Strategy

### Opção A: SEQUENCIAR (Recomendado ✅)

```
Mergear em ordem:
  1. #44 (H1 Planning)
  2. #43 (H1 UI)
  3. #45 (H4 Metrics)
  4. #46 (H4 Fixes)
  5. #41 (H Epic)

Vantagem: Seguro, claro, sem conflitos
Desvantagem: 5 merges vs 1
Timeline: 1-2 dias (próxima sessão)
Risco: BAIXO ✅
```

### Opção B: MEGA-PR (Rápido mas Riscado)

```
Rebasear todos em main, fazer 1 mega-PR com H Epic completo

Vantagem: Rápido (6-8h)
Desvantagem: Alto risco de conflicts, 1 commit gigante
Timeline: 6-8 horas (hoje)
Risco: ALTO ⚠️
```

**Recomendação**: Escolha A (Sequenciar)

---

## 🚀 Próximos Passos Após Step 2

### Hoje (Se quiser continuar)
- [ ] Finalizar #38 (G4 Index – sair de WIP)
- [ ] Fazer commit final do dia
- [ ] Opcionalmente: Iniciar Fase 2 (Workflow.md)

### Amanhã
- [ ] Executar Dashboard merges (se escolheu A)
- [ ] Iniciar Fase 2 (Workflow.md + GitHub automations)

### Próxima Semana
- [ ] Fase 2 completa (documentação + automations)
- [ ] Fase 3 contínua (monitoramento, retrospectivas)

---

## 📝 Notas Importantes

1. **Draft PRs**: Script auto-detecta e marca como ready antes de mergear
2. **Build validation**: Sempre roda após merges para garantir estabilidade
3. **Commit final**: Faz squash + commit com mensagem descritiva
4. **Dashboard**: Decisão hoje, execução amanhã (ganha tempo para testes)

---

## 🆘 Troubleshooting

### Erro ao Mergear Uma PR

```bash
# Cancelar e rebasear manualmente
gh pr checks <PR_NUMBER>  # Ver o que está falhando
gh pr rebase <PR_NUMBER>  # Rebasear em main
gh pr merge <PR_NUMBER> --squash  # Tentar novamente
```

### Build Quebrado Após Merge

```bash
# Reverter último commit
git revert -m 1 HEAD --no-edit
git push origin main
```

### PRs com Conflitos

```bash
# Não mergear – deixar para code review manual
# Script vai avisar se houver issues
```

---

## 📊 Comandos Úteis (Depois de Executar)

```bash
# Ver status final
gh pr list --state open --limit 50

# Ver últimos commits
git log --oneline main -10

# Contar PRs por sprint
gh pr list --state open --json labels | jq '.[] | .labels[].name' | sort | uniq -c

# Validar que build está OK
pnpm build
```

---

## 🎉 Quando Step 2 Estiver Completo

Você terá:
- ✅ Sprint 2 P1 quase pronto (11/5 PRs básicas)
- ✅ Dashboard strategy documentada
- ✅ PRs obsoletas fechadas
- ✅ Main branch estável e compilando
- ✅ Total de PRs reduzido de 28 para ~14-16

**Próximo**: Fase 2 (Estabelecer rotina – Workflow.md + GitHub automations)

---

## 💡 Dica Final

Se tiver dúvida durante execução:

1. **Pausar**: O script pergunta antes de cada ação importante
2. **Revisar**: Ler a descrição de cada PR antes de mergear
3. **Validar**: Rodar `pnpm build` localmente após merges
4. **Reverter**: Fácil reverter último commit se algo deu errado

**Você controla tudo!** 🎮

---

**Criado**: 2025-11-22  
**Status**: Pronto para execução  
**Tempo**: ~60 minutos  
**Risco**: BAIXO ✅

