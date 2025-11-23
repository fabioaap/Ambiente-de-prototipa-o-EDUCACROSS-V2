# GitHub Actions Guide – EDUCACROSS Prototipação

**Status**: Active  
**Última atualização**: 2025-11-23  
**Objetivo**: Documentar todos os workflows GitHub Actions do projeto.

---

## 📋 Índice

- [Overview](#overview)
- [Workflows Ativos](#workflows-ativos)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Secrets Configurados](#secrets-configurados)
- [Troubleshooting](#troubleshooting)
- [Logs e Debugging](#logs-e-debugging)

---

## Overview

### Estrutura de Arquivos

```
.github/
  └── workflows/
      ├── sprint-2-validation.yml    # Validação principal (build, lint, type-check)
      ├── auto-assign-pr.yml         # (Futuro) Auto-assign PRs
      ├── auto-request-changes.yml   # (Futuro) Request changes automático
      ├── auto-close-stale.yml       # (Futuro) Fechar PRs inativas
      └── notify-team.yml            # (Futuro) Notificações
```

### Princípios

1. **Fast Feedback**: Workflows devem completar em < 5 minutos
2. **Fail Fast**: Falhar cedo se ambiente incorreto
3. **Clear Errors**: Mensagens de erro claras e acionáveis
4. **Idempotent**: Rodar múltiplas vezes sem side effects

---

## Workflows Ativos

### 1. Sprint 2 Validation

**Arquivo**: `.github/workflows/sprint-2-validation.yml`

**Trigger**:
```yaml
on:
  push:
    branches:
      - main
      - 'feature/**'
      - 'fix/**'
  pull_request:
    branches:
      - main
```

**Jobs**:

#### Job 1: `validate-setup`

**Propósito**: Verificar ambiente (Node, pnpm)

**Steps**:
1. Checkout código
2. Verificar Node version (>= 22.0.0)
3. Verificar pnpm version (>= 8.0.0)
4. Reportar versões

**Duração esperada**: ~30s

**Fail conditions**:
- Node < 22.0.0
- pnpm não instalado
- pnpm < 8.0.0

**Output**:
```
✓ Node version: v22.21.1
✓ pnpm version: 9.14.4
✓ Environment validated successfully
```

#### Job 2: `build-lint-typecheck`

**Propósito**: Build completo + lint + type-check

**Steps**:
1. Checkout código
2. Setup Node 22
3. Install pnpm
4. Install dependencies (`pnpm install --frozen-lockfile`)
5. Build tokens (`pnpm build:tokens`)
6. Build design-system (`pnpm build:design-system`)
7. Build studio (`pnpm build:studio`)
8. Build storybook (`pnpm build:storybook`)
9. Lint (`pnpm lint`)
10. Type-check (`pnpm -r type-check`)

**Duração esperada**: ~120s (2 minutos)

**Fail conditions**:
- Qualquer step falha
- Build errors
- Lint errors (não warnings)
- Type errors

**Output**:
```
✓ Dependencies installed
✓ Tokens built
✓ Design system built
✓ Studio built
✓ Storybook built
✓ Lint passed (1 warning)
✓ Type-check passed
✅ All checks passed!
```

#### Job 3: `report`

**Propósito**: Gerar relatório de status

**Steps**:
1. Coletar resultados de jobs anteriores
2. Gerar resumo markdown
3. Comentar em PR (se aplicável)

**Duração esperada**: ~10s

**Output**:
```markdown
## 🎯 Sprint 2 Validation Report

| Check | Status | Duration |
|-------|--------|----------|
| Environment | ✅ Passed | 30s |
| Build | ✅ Passed | 120s |
| Lint | ✅ Passed | 15s |
| Type-check | ✅ Passed | 20s |

**Total Duration**: 185s
**Status**: ✅ All checks passed!
```

#### Job 4: `notify-main`

**Propósito**: Notificar quando PR mergeada em main

**Steps**:
1. Verificar se evento é push em main
2. Gerar notificação
3. Postar comentário (futuro)

**Duração esperada**: ~5s

**Trigger**: Apenas em push para `main`

---

### 2. Auto-Assign PR (Futuro)

**Arquivo**: `.github/workflows/auto-assign-pr.yml`

**Trigger**:
```yaml
on:
  pull_request:
    types: [opened]
```

**Propósito**: Assignar PR automaticamente baseado em:
- Labels aplicados
- Arquivos modificados
- Autor da PR

**Lógica**:
```
IF label contains "sprint2-p1" THEN
  assign to @fabioaap
ELSE IF files in "packages/design-system/" THEN
  assign to @design-system-maintainer
ELSE IF files in "apps/studio/" THEN
  assign to @studio-maintainer
END
```

---

### 3. Auto-Request Changes (Futuro)

**Arquivo**: `.github/workflows/auto-request-changes.yml`

**Trigger**:
```yaml
on:
  pull_request:
    types: [opened, synchronize]
```

**Propósito**: Adicionar comentários automáticos se detectar:
- Commits sem mensagem Conventional Commits
- Arquivos > 500 linhas sem justificativa
- Missing documentation em novos componentes
- Missing stories em novos componentes DS

**Actions**:
- Adicionar comentário explicativo
- Adicionar label `needs-review`
- Não bloquear merge (apenas informativo)

---

### 4. Auto-Close Stale (Futuro)

**Arquivo**: `.github/workflows/auto-close-stale.yml`

**Trigger**:
```yaml
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly, Sunday midnight UTC
```

**Propósito**: Fechar PRs inativas

**Critérios**:
- Sem atividade por > 30 dias
- Label `stale` adicionado há > 7 dias
- Não tem label `keep-open`

**Action**:
1. Adicionar comentário: "Fechando por inatividade. Reabra se necessário."
2. Fechar PR
3. Remover de milestones

---

### 5. Notify Team (Futuro)

**Arquivo**: `.github/workflows/notify-team.yml`

**Trigger**:
```yaml
on:
  pull_request:
    types: [closed]
  issues:
    types: [closed]
```

**Propósito**: Notificar time sobre eventos importantes

**Actions**:
- PR merged → Comentar com link para deploy preview (futuro)
- Issue closed → Comentar agradecendo contribuição
- Sprint milestone complete → Celebração 🎉

---

## Variáveis de Ambiente

### Variáveis Padrão

Disponíveis em todos os workflows:

```yaml
env:
  NODE_VERSION: '22'  # Node 22 LTS (as per .nvmrc)
  PNPM_VERSION: '9.14.4'
  CI: true
```

### Variáveis por Workflow

#### sprint-2-validation.yml

```yaml
env:
  HUSKY: 0  # Disable Husky in CI
  FORCE_COLOR: 1  # Colorized output
```

### Acessar Variáveis

```yaml
steps:
  - name: Print Node version
    run: echo "Using Node ${{ env.NODE_VERSION }}"
```

---

## Secrets Configurados

### Secrets Atuais

| Secret | Descrição | Uso |
|--------|-----------|-----|
| `GITHUB_TOKEN` | Token automático do GitHub | Auto-gerado por ação |

### Secrets Futuros

| Secret | Descrição | Quando Adicionar |
|--------|-----------|------------------|
| `VERCEL_TOKEN` | Deploy Vercel | Fase de deploy |
| `SLACK_WEBHOOK` | Notificações Slack | Fase de notificações |
| `CODECOV_TOKEN` | Coverage reports | Fase de testes |

### Configurar Secret

```bash
# Via GitHub CLI
gh secret set SECRET_NAME -b "secret-value"

# Via GitHub UI
Settings → Secrets and variables → Actions → New repository secret
```

---

## Troubleshooting

### Workflow Não Executou

**Problema**: PR criado mas workflow não rodou

**Possíveis causas**:
1. Branch name não match trigger pattern
2. Workflow desabilitado
3. Syntax error em YAML

**Solução**:
```bash
# Verificar triggers
cat .github/workflows/sprint-2-validation.yml | grep -A 10 "on:"

# Validar YAML
npx js-yaml .github/workflows/sprint-2-validation.yml

# Re-push para trigger
git commit --allow-empty -m "ci: trigger workflow"
git push
```

### Job Falha no Step "Install dependencies"

**Problema**: `pnpm install` falha

**Possíveis causas**:
1. `pnpm-lock.yaml` desatualizado
2. Dependency conflict
3. Network timeout

**Solução**:
```bash
# Local: regenerar lockfile
rm pnpm-lock.yaml
pnpm install
git add pnpm-lock.yaml
git commit -m "fix: update pnpm lockfile"
git push

# CI: Re-run workflow (pode ser timeout temporário)
# GitHub UI → Actions → Re-run all jobs
```

### Job Falha no Step "Build"

**Problema**: Build falha em CI mas passa localmente

**Possíveis causas**:
1. Environment variables diferentes
2. Node/pnpm version mismatch
3. Cache issues

**Solução**:
```bash
# Verificar versões locais
node --version
pnpm --version

# Limpar cache local
pnpm clean
rm -rf node_modules
pnpm install
pnpm build

# Se passar local, investigar CI logs
# GitHub UI → Actions → Failed job → Click step
```

### Job Falha no Step "Lint"

**Problema**: Lint falha com erros

**Solução**:
```bash
# Rodar local
pnpm lint

# Auto-fix
pnpm lint --fix

# Commit fixes
git add .
git commit -m "fix: lint issues"
git push
```

### Timeout em Job

**Problema**: Job ultrapassa limite de tempo (360 min default)

**Solução**:
```yaml
# Adicionar timeout custom
jobs:
  build:
    timeout-minutes: 10  # 10 minutos
```

---

## Logs e Debugging

### Acessar Logs

1. GitHub UI → Actions tab
2. Selecionar workflow run
3. Selecionar job
4. Expandir step para ver output

### Log Levels

```yaml
# Info
run: echo "::notice::This is info"

# Warning
run: echo "::warning::This is a warning"

# Error
run: echo "::error::This is an error"

# Debug (só visible se ACTIONS_STEP_DEBUG=true)
run: echo "::debug::Debug info"
```

### Enable Debug Logging

```bash
# Via GitHub UI
Settings → Secrets → New secret
Name: ACTIONS_STEP_DEBUG
Value: true

# Via GitHub CLI
gh secret set ACTIONS_STEP_DEBUG -b "true"
```

### Download Logs

```bash
# Via GitHub CLI
gh run view <RUN_ID> --log

# Via GitHub UI
Actions → Select run → Download logs (top-right)
```

### Common Log Patterns

**Success**:
```
✓ Step completed successfully
✅ All checks passed
```

**Failure**:
```
✗ Step failed with exit code 1
❌ Check failed: Lint
Error: Command failed: pnpm lint
```

**Warning**:
```
⚠️ Warning: Found 1 lint warning
```

---

## Performance Optimization

### Cache Dependencies

```yaml
- uses: actions/cache@v3
  with:
    path: |
      ~/.pnpm-store
      node_modules
    key: ${{ runner.os }}-pnpm-${{ hashFiles('pnpm-lock.yaml') }}
    restore-keys: |
      ${{ runner.os }}-pnpm-
```

**Resultado**: Reduz tempo de install de ~60s para ~10s

### Parallel Jobs

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps: [...]
  
  build:
    runs-on: ubuntu-latest
    steps: [...]
  
  # Both run in parallel
```

**Resultado**: Reduz tempo total de execução

### Conditional Steps

```yaml
- name: Deploy (only on main)
  if: github.ref == 'refs/heads/main'
  run: pnpm deploy
```

**Resultado**: Não executa steps desnecessários

---

## Métricas e Monitoramento

### Métricas Esperadas

| Métrica | Target | Atual |
|---------|--------|-------|
| Workflow duration | < 5 min | ~3 min |
| Success rate | > 95% | TBD |
| Cache hit rate | > 80% | TBD |
| Average queue time | < 30s | TBD |

### Monitoramento

```bash
# Ver runs recentes
gh run list --workflow=sprint-2-validation.yml --limit 10

# Ver status de run específico
gh run view <RUN_ID>

# Watch run em tempo real
gh run watch <RUN_ID>
```

---

## Próximos Passos

- [ ] Implementar cache de dependências
- [ ] Adicionar workflow de deploy (Vercel)
- [ ] Configurar notifications via Slack
- [ ] Adicionar badge de status no README
- [ ] Implementar auto-merge workflow
- [ ] Adicionar test coverage reports

---

## Referências

- [GitHub Actions Docs](https://docs.github.com/actions)
- [pnpm in GitHub Actions](https://pnpm.io/continuous-integration#github-actions)
- [GitHub Actions Best Practices](https://docs.github.com/actions/learn-github-actions/best-practices-for-github-actions)
- [Workflow Syntax](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)

---

**Última revisão**: 2025-11-23  
**Responsável**: Agente (Copilot)  
**Status**: Active
