# 🚀 FASE 2: ESTABELECER ROTINA – Prompt Executável

**Objetivo**: Configurar automações GitHub + Workflow.md para tornar o processo de merge e validação rotineiro e automático.

**Status**: Pronto para executar  
**Timeline Estimado**: 2-3 horas  
**Data**: 2025-11-22 (após Fase 1)  
**Responsável**: Agente (Copilot)

---

## 📋 CHECKLIST DE EXECUÇÃO (Ordem de Prioridade)

### ✅ BLOCO 1: Documentação (30 min)
- [ ] Criar `WORKFLOW.md` (processo de merge + decisões)
- [ ] Atualizar `.github/ISSUE_TEMPLATE/` com templates
- [ ] Documentar GitHub Actions workflow em `docs/github-actions-guide.md`

### ✅ BLOCO 2: Scripts & Automação (1h)
- [ ] Criar script para auto-merge de PRs prontas
- [ ] Criar script para validação pré-merge (lint + build + type-check)
- [ ] Criar script para gerenciar labels e milestones

### ✅ BLOCO 3: GitHub Actions Enhancements (45 min)
- [ ] Adicionar job de auto-request-changes (quando código revisar flags)
- [ ] Adicionar job de auto-assign (assinar PRs por label)
- [ ] Adicionar job de auto-close (fechar PRs obsoletas)
- [ ] Adicionar job de notification (notificar time via PR comments)

### ✅ BLOCO 4: Validação & Teste (30 min)
- [ ] Testar workflow em PR teste (criar feature/phase2-test)
- [ ] Validar GitHub Actions executando
- [ ] Documentar resultados em `docs/phase2-validation.md`

### ✅ BLOCO 5: Commit & Merge (15 min)
- [ ] Commitar todos os arquivos de Fase 2
- [ ] Mergear PR de Fase 2
- [ ] Atualizar status em `PROJECT_STATUS_FINAL.md`

---

## 🎯 DELIVERABLES ESPERADOS

### Documentação
```
✅ WORKFLOW.md
   ├─ Processo de merge passo-a-passo
   ├─ Decisões arquiteturais (auto-merge triggers)
   ├─ Labels + Milestones definidos
   └─ Exemplos de uso

✅ docs/github-actions-guide.md
   ├─ Descrição de cada job
   ├─ Variáveis de ambiente
   ├─ Troubleshooting
   └─ Logs esperados

✅ docs/phase2-validation.md
   └─ Testes executados + resultados
```

### Scripts Novos
```
✅ scripts/auto-merge-prs.ps1
   └─ Merge automático de PRs com todos os checks OK

✅ scripts/validate-pr-before-merge.ps1
   └─ Validação completa pré-merge

✅ scripts/manage-github-labels.ps1
   └─ Criar labels, assign, etc
```

### GitHub Actions Updates
```
✅ .github/workflows/auto-request-changes.yml (novo)
✅ .github/workflows/auto-assign-pr.yml (novo)
✅ .github/workflows/auto-close-stale.yml (novo)
✅ .github/workflows/notify-team.yml (novo)
```

---

## 🔨 BLOCO 1: WORKFLOW.md (Documentação)

**Objetivo**: Documentar o processo padrão de merge e decisões arquiteturais.

### Conteúdo Esperado:

```markdown
# WORKFLOW.md – Processo de Merge & Rotina

## 1. Classificação de PRs (Labels)
- sprint2-p1: Critical (merge ASAP)
- sprint2-p2: Dashboard (merge após P1)
- backlog: Planning (merge quando decidido)
- documentation: Docs (pode mergear independente)
- automation: Scripts (valida lint + type-check)

## 2. Checklist Pré-Merge
- [ ] Build: pnpm build (0 erros)
- [ ] Lint: pnpm lint (0 critical warnings)
- [ ] Type-check: pnpm -r type-check (0 errors)
- [ ] Tests: Passando (se houver)
- [ ] Documentação: Atualizada
- [ ] Changelog: Preenchido

## 3. Auto-Merge Triggers
Auto-merge será executado quando:
- ✅ Todos os checks passarem (build + lint + type-check)
- ✅ PR aprovada por reviewer
- ✅ Label "ready-to-merge" adicionado
- ✅ Nenhum conflito com main

## 4. Processo de Merge
1. Push → GitHub Actions (validação automática)
2. Se tudo OK → Aguarda aprovação
3. Aprovado + ready-to-merge → Auto-merge
4. Mergido → Notificação ao time

## 5. Exemplos
[Exemplos de PRs bem-sucedidas...]
```

---

## 🤖 BLOCO 2: Scripts de Automação

### 2.1 Script: `auto-merge-prs.ps1`

```powershell
# scripts/auto-merge-prs.ps1
# Função: Mergear PRs automaticamente quando todos os checks passarem

param(
    [ValidateSet("sprint2-p1", "sprint2-p2", "documentation", "all")]
    [string]$Label = "all",
    
    [switch]$DryRun = $false
)

# Obter PRs com label "ready-to-merge"
$prs = gh pr list --label "ready-to-merge" --label $Label --state open --json number,title,statusCheckRollup

foreach ($pr in $prs) {
    $prNumber = $pr.number
    $title = $pr.title
    $status = $pr.statusCheckRollup
    
    # Verificar se todos os checks passaram
    if ($status -eq "PASS") {
        Write-Host "✅ PR #$prNumber pronta para merge: $title"
        
        if (-not $DryRun) {
            gh pr merge $prNumber --squash --auto
            Write-Host "🔄 Auto-merge acionado para PR #$prNumber"
        }
    } else {
        Write-Host "⏳ PR #$prNumber aguardando: $status"
    }
}

Write-Host "`n✅ Verificação concluída!"
```

### 2.2 Script: `validate-pr-before-merge.ps1`

```powershell
# scripts/validate-pr-before-merge.ps1
# Função: Validar PR completa antes de permitir merge

param(
    [int]$PRNumber = 0
)

if ($PRNumber -eq 0) {
    Write-Host "❌ PRNumber obrigatório"
    exit 1
}

Write-Host "🔍 Validando PR #$PRNumber..."

# 1. Build
Write-Host "`n📦 Buildando..."
pnpm build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build falhou!"
    exit 1
}

# 2. Lint
Write-Host "`n📝 Lintando..."
pnpm lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Lint warning detectado"
    # Continua (warnings são OK)
}

# 3. Type-check
Write-Host "`n🔷 Type-checking..."
pnpm -r type-check
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Type errors encontrados!"
    exit 1
}

Write-Host "`n✅ Validação completa! PR #$PRNumber está pronta para merge"
```

### 2.3 Script: `manage-github-labels.ps1`

```powershell
# scripts/manage-github-labels.ps1
# Função: Gerenciar labels, milestones e assignments

param(
    [ValidateSet("create-labels", "assign-pr", "add-milestone", "list")]
    [string]$Action = "list"
)

switch ($Action) {
    "create-labels" {
        $labels = @(
            @{ name = "sprint2-p1"; color = "FF0000"; description = "Critical - merge ASAP" }
            @{ name = "sprint2-p2"; color = "FFA500"; description = "Dashboard - merge after P1" }
            @{ name = "ready-to-merge"; color = "00FF00"; description = "Pronto para auto-merge" }
            @{ name = "automation"; color = "0099FF"; description = "Scripts e automações" }
        )
        
        foreach ($label in $labels) {
            gh label create $label.name `
                --color $label.color `
                --description $label.description `
                --force
        }
        Write-Host "✅ Labels criadas"
    }
    
    "assign-pr" {
        # Implementar logica de assign automático
    }
    
    "list" {
        gh label list
    }
}
```

---

## 🔄 BLOCO 3: GitHub Actions Workflows Novos

### 3.1 Workflow: `auto-request-changes.yml`

```yaml
# .github/workflows/auto-request-changes.yml
name: Auto Request Changes

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  request-changes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Check for deprecated patterns
        id: check
        run: |
          # Procurar por console.error, TODO, FIXME críticos
          if grep -r "console\.error" src/ --include="*.ts" --include="*.tsx"; then
            echo "has_errors=true" >> $GITHUB_OUTPUT
          fi
      
      - name: Request changes
        if: steps.check.outputs.has_errors == 'true'
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.pulls.createReview({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number,
              event: 'REQUEST_CHANGES',
              body: '🚨 Encontrado `console.error` no código. Por favor, remover antes de mergear.'
            })
```

### 3.2 Workflow: `auto-assign-pr.yml`

```yaml
# .github/workflows/auto-assign-pr.yml
name: Auto Assign PR

on:
  pull_request:
    types: [opened]

jobs:
  assign:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v6
        with:
          script: |
            const pr = context.payload.pull_request;
            
            // Assinar por label
            if (pr.labels.some(l => l.name === 'sprint2-p1')) {
              github.rest.issues.addAssignees({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: pr.number,
                assignees: ['fabioaap'] // Seu usuário aqui
              })
            }
```

### 3.3 Workflow: `auto-close-stale.yml`

```yaml
# .github/workflows/auto-close-stale.yml
name: Auto Close Stale PRs

on:
  schedule:
    - cron: '0 0 * * 0' # Toda semana

jobs:
  close-stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v8
        with:
          days-before-stale: 14
          days-before-close: 21
          stale-pr-label: 'stale'
          close-pr-message: 'PR fechada por inatividade (21 dias)'
          exempt-labels: 'sprint2-p1,do-not-close'
```

### 3.4 Workflow: `notify-team.yml`

```yaml
# .github/workflows/notify-team.yml
name: Notify Team

on:
  pull_request:
    types: [opened, closed]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v6
        with:
          script: |
            const action = context.payload.action;
            const pr = context.payload.pull_request;
            
            if (action === 'opened') {
              github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: pr.number,
                body: `✅ PR criada por @${pr.user.login}
                
📋 **Checklist de Merge**:
- [ ] Build passando
- [ ] Lint OK
- [ ] Type-check OK
- [ ] Testes OK (se houver)
- [ ] Documentação atualizada
- [ ] Changelog preenchido

Reação com 👍 quando pronto para merge!`
              })
            }
```

---

## ✅ BLOCO 4: Validação & Teste

### Procedimento de Teste:

```bash
# 1. Criar branch de teste
git checkout -b feature/phase2-test

# 2. Fazer uma mudança pequena (exemplo: atualizar README)
echo "# Phase 2 Test" >> docs/phase2-test.md

# 3. Commitar
git add docs/phase2-test.md
git commit -m "test: Phase 2 workflow test"

# 4. Push e criar PR
git push origin feature/phase2-test
gh pr create --title "Test: Phase 2 Workflow" --body "Teste de automação da Fase 2"

# 5. Aguardar GitHub Actions
# Verificar logs em https://github.com/fabioaap/Ambiente.../actions

# 6. Documentar resultado
# Criar docs/phase2-validation.md com screenshots e logs
```

---

## 📝 Resumo de Arquivos a Criar/Modificar

| Arquivo | Tipo | Status |
|---------|------|--------|
| `WORKFLOW.md` | Novo | Documentação |
| `docs/github-actions-guide.md` | Novo | Documentação |
| `docs/phase2-validation.md` | Novo | Validação |
| `scripts/auto-merge-prs.ps1` | Novo | Script |
| `scripts/validate-pr-before-merge.ps1` | Novo | Script |
| `scripts/manage-github-labels.ps1` | Novo | Script |
| `.github/workflows/auto-request-changes.yml` | Novo | Automação |
| `.github/workflows/auto-assign-pr.yml` | Novo | Automação |
| `.github/workflows/auto-close-stale.yml` | Novo | Automação |
| `.github/workflows/notify-team.yml` | Novo | Automação |
| `PROJECT_STATUS_FINAL.md` | Modificar | Status |

---

## 🎯 DECISÕES ARQUITETURAIS (Para Documentar em WORKFLOW.md)

### 1. Auto-Merge Strategy
- ✅ Squash merge (mantém histórico limpo)
- ✅ Automático quando: todos checks OK + label "ready-to-merge"
- ✅ Bloqueado se: conflitos com main

### 2. Label Strategy
- ✅ 4 labels principais: sprint2-p1, sprint2-p2, documentation, automation
- ✅ Label helper: ready-to-merge (trigger para auto-merge)
- ✅ Label workflow: stale, do-not-close

### 3. Notification Strategy
- ✅ Comment automático em toda PR aberta
- ✅ Request-changes quando code quality issues
- ✅ Notificação ao mergear (discord/slack opcional)

---

## 🚀 INSTRUÇÕES DE EXECUÇÃO

### Pré-requisitos
```powershell
# Verificar que temos acesso GitHub CLI
gh auth status

# Confirmar que estamos em main
git branch -v
```

### Executar Fase 2

```powershell
cd "c:\Users\Educacross\Documents\Ambiente-de-prototipa-o-EDUCACROSS-V2"

# Step 1: Criar branch Fase 2
git checkout -b feature/phase2-establish-routine

# Step 2: Criar WORKFLOW.md (copiar template acima)
# Step 3: Criar GitHub Actions workflows
# Step 4: Criar scripts de automação
# Step 5: Commitar tudo
git add WORKFLOW.md docs/github-actions-guide.md scripts/ .github/workflows/
git commit -m "feat(phase2): Add workflow automation and GitHub Actions jobs"

# Step 6: Push e criar PR
git push origin feature/phase2-establish-routine
gh pr create --title "Phase 2: Establish Routine (Workflow + Automations)" \
    --body "Implementa automações GitHub e documenta workflow de merge"

# Step 7: Aguardar build validar
# Step 8: Mergear (manual por enquanto)
```

---

## 📊 KPIs de Sucesso

Fase 2 será considerada **SUCESSO** quando:

✅ `WORKFLOW.md` documentado e commitado  
✅ `docs/github-actions-guide.md` completo  
✅ 4 GitHub Actions workflows criados e testados  
✅ 3 scripts PowerShell funcionando  
✅ PR de teste passando em todas as automações  
✅ Build: 100% PASSING  
✅ Documentação: 100% atualizada  

---

## 🎓 Próximas Fases

### Fase 3 (Escalar)
- [ ] Monitoramento em tempo real (observabilidade)
- [ ] Dashboard de métricas (PRs/day, merge time, etc)
- [ ] Retrospectiva de Sprint 2
- [ ] Planning de Sprint 3+

### Após Fase 2 + Phase 3
- Dashboard Epic merges automatizados (#44→#43→#45→#46→#41)
- Backlog audit (11 PRs restantes)
- Decisão: mergear, rebasear ou fechar cada uma

---

## 📚 Referência Rápida

| Comando | Função |
|---------|--------|
| `pnpm build` | Build completo |
| `pnpm lint` | Lint code |
| `pnpm -r type-check` | Type-check todos os workspaces |
| `gh pr list` | Listar PRs |
| `gh pr merge <N> --squash --auto` | Auto-merge |
| `gh label create <name>` | Criar label |

---

**Status**: Pronto para executar  
**Estimativa**: 2-3 horas  
**Data da Requisição**: 2025-11-22  
**Fase Anterior**: Fase 1 (Concluída ✅)

Comece pelo **BLOCO 1** (Documentação) e siga a ordem. Cada bloco é independente mas todos devem ser completados para sucesso da Fase 2.

🚀 **Vamos estabelecer a rotina!**
