# WORKFLOW.md – Processo de Merge & Rotina

**Status**: Active  
**Última atualização**: 2025-11-23  
**Objetivo**: Documentar o processo padrão de merge, automações e decisões arquiteturais.

---

## 📋 Índice

- [Classificação de PRs](#classificação-de-prs)
- [Checklist Pré-Merge](#checklist-pré-merge)
- [Processo de Merge](#processo-de-merge)
- [Automações GitHub Actions](#automações-github-actions)
- [Labels e Milestones](#labels-e-milestones)
- [Scripts de Automação](#scripts-de-automação)
- [Troubleshooting](#troubleshooting)

---

## Classificação de PRs

### Labels por Prioridade

| Label | Descrição | Quando Mergear | Exemplo |
|-------|-----------|----------------|---------|
| `sprint2-p1` | Crítico - Sprint 2 P1 | ASAP após aprovação | Issue #6, #7, #8, #9, #10 |
| `sprint3-p2` | Dashboard - Sprint 3 P2 | Após P1 completo | Issue #11-#15 |
| `backlog` | Planejamento | Quando decidido | Features futuras |
| `documentation` | Documentação | Independente | README, guides |
| `automation` | Scripts/CI | Após validação | GitHub Actions |
| `hotfix` | Correção urgente | Imediato | Bugs críticos |
| `dependencies` | Atualização deps | Após testes | Security updates |

### Labels por Tipo

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `refactor`: Refatoração
- `test`: Testes
- `ci`: CI/CD
- `chore`: Manutenção

---

## Checklist Pré-Merge

### Para o Autor da PR

Antes de abrir a PR:

- [ ] `pnpm build` passa sem erros
- [ ] `pnpm lint` passa sem warnings críticos
- [ ] `pnpm -r type-check` passa sem erros
- [ ] Testes manuais completados
- [ ] README/documentação atualizada (se aplicável)
- [ ] Commits seguem Conventional Commits
- [ ] Branch atualizada com `main`

### Para o Revisor

Antes de aprovar:

- [ ] Código segue padrões do projeto
- [ ] Não há regressões em funcionalidades P0
- [ ] GitHub Actions passou (sprint-2-validation.yml)
- [ ] Documentação adequada
- [ ] Testes adequados (se aplicável)
- [ ] Nenhuma vulnerabilidade de segurança

### Para Auto-Merge (Automático)

Critérios para merge automático:

- [ ] Label `ready-to-merge` aplicado
- [ ] Todas as GitHub Actions passaram
- [ ] Aprovado por pelo menos 1 revisor
- [ ] Sem conflitos com `main`
- [ ] Nenhum review "Request Changes" ativo

---

## Processo de Merge

### 1. Desenvolvimento

```bash
# Criar branch seguindo padrão
git checkout main
git pull origin main
git checkout -b feature/tipo-descricao

# Fazer alterações
# ...

# Commit usando Conventional Commits
git commit -m "tipo(escopo): descrição (issue #XX)"
# Exemplos:
# feat(studio): add sidebar navigation (issue #6)
# fix(design-system): correct button focus state (issue #7)
# docs(contributing): update journey creation guide (issue #10)

# Push
git push origin feature/tipo-descricao
```

### 2. Abrir Pull Request

Via GitHub web interface:

1. Ir para: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/compare
2. Selecionar sua branch
3. Preencher template:
   - **Title**: `tipo(escopo): descrição`
   - **Body**: Descrever mudanças + `Closes #ISSUE_NUMBER`
4. Adicionar labels apropriados
5. Assignar reviewers (se necessário)
6. Criar PR

### 3. Validação Automática

GitHub Actions executará automaticamente:

- **validate-setup**: Verifica Node/pnpm versions
- **build-lint-typecheck**: Roda build + lint + type-check
- **report**: Gera relatório de validação
- **notify-main**: Notifica sobre PR criada (se configurado)

### 4. Code Review

- Aguardar aprovação de revisor
- Endereçar comentários se houver
- Re-push mudanças se necessário
- GitHub Actions rodará novamente

### 5. Merge

**Opção A: Manual (Recomendado)**

```bash
# Via GitHub web interface
# Clicar em "Squash and merge"
# Editar commit message final se necessário
# Confirmar merge
```

**Opção B: Automático (Futuro)**

```bash
# Quando auto-merge estiver configurado
# Adicionar label "ready-to-merge"
# Sistema mergeará automaticamente após aprovações
```

### 6. Pós-Merge

```bash
# Atualizar local
git checkout main
git pull origin main

# Deletar branch local (opcional)
git branch -d feature/tipo-descricao

# Deletar branch remota (opcional)
git push origin --delete feature/tipo-descricao
```

---

## Automações GitHub Actions

### Workflows Ativos

#### 1. Sprint 2 Validation (`.github/workflows/sprint-2-validation.yml`)

**Trigger**: Push, Pull Request  
**Jobs**:
- `validate-setup`: Valida ambiente (Node 22, pnpm 9.14.4+)
- `build-lint-typecheck`: Build completo + lint + type-check
- `report`: Gera relatório de status
- `notify-main`: Notifica main branch (futuro)

**Duração Esperada**: ~180s (3 minutos)

#### 2. Auto-Assign PR (Futuro)

**Trigger**: PR opened  
**Action**: Assigna PR baseado em labels ou arquivos modificados

#### 3. Auto-Request Changes (Futuro)

**Trigger**: PR opened/updated  
**Action**: Adiciona comentários automáticos se detectar problemas

#### 4. Auto-Close Stale (Futuro)

**Trigger**: Schedule (weekly)  
**Action**: Fecha PRs inativas por > 30 dias

#### 5. Notify Team (Futuro)

**Trigger**: PR merged, Issue closed  
**Action**: Notifica time via comentários

---

## Labels e Milestones

### Criação de Labels

Labels são criados via script:

```bash
pnpm setup:gh:labels
```

### Milestones Padrão

- **Sprint 1 (P0)**: Infra base - ✅ Completo
- **Sprint 2 (P1)**: Features críticas - 🔄 Em andamento (80%)
- **Sprint 3 (P2)**: Dashboard - 📋 Planejado
- **Backlog**: Features futuras

---

## Scripts de Automação

### Geração de Índice de Jornadas

```bash
# Gera/atualiza domains/INDEX.md
pnpm gen:journeys

# Ou diretamente
node scripts/gen-journeys-index.js
# bash scripts/gen-journeys-index.sh
```

**Uso**: Sempre que criar/modificar jornadas em `domains/*/journeys/`

### Validação Pré-Merge (Futuro)

```bash
# Script: scripts/validate-pr-before-merge.ps1
pwsh scripts/validate-pr-before-merge.ps1 -PrNumber 123
```

**Checks**:
- Build completo
- Lint sem warnings críticos
- Type-check sem erros
- Nenhuma regressão P0

### Auto-Merge (Futuro)

```bash
# Script: scripts/auto-merge-prs.ps1
pwsh scripts/auto-merge-prs.ps1 -Mode auto
```

**Critérios**:
- Label `ready-to-merge`
- Aprovações necessárias
- GitHub Actions passou
- Sem conflitos

---

## Troubleshooting

### GitHub Actions Falha

**Problema**: Workflow falha no build/lint/type-check

**Solução**:

```bash
# 1. Rodar localmente
pnpm build
pnpm lint
pnpm -r type-check

# 2. Verificar erros específicos
pnpm build --verbose

# 3. Limpar cache se necessário
pnpm clean
pnpm install --frozen-lockfile
pnpm build

# 4. Re-push após fix
git add .
git commit -m "fix: resolve build/lint issues"
git push
```

### Merge Conflict

**Problema**: Branch desatualizada com `main`

**Solução**:

```bash
# 1. Atualizar main local
git checkout main
git pull origin main

# 2. Voltar para branch
git checkout feature/sua-branch

# 3. Rebase (preferido) ou merge
git rebase main
# OU
git merge main

# 4. Resolver conflitos manualmente
# Editar arquivos conflitantes
git add .
git rebase --continue
# OU
git commit -m "merge: resolve conflicts with main"

# 5. Force push (só se fez rebase)
git push --force-with-lease origin feature/sua-branch
```

### Validação Local Falha

**Problema**: `pnpm build` ou `pnpm lint` falha

**Solução**:

```bash
# 1. Verificar versões
node --version  # Deve ser >= 20.0.0
pnpm --version  # Deve ser >= 8.0.0

# 2. Reinstalar dependências
pnpm clean
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 3. Build em ordem
pnpm build:tokens
pnpm build:design-system
pnpm build:studio
pnpm build:storybook

# 4. Lint com fix automático
pnpm lint --fix

# 5. Type-check individual
pnpm --filter @prototipo/design-system type-check
pnpm --filter studio type-check
```

---

## Decisões Arquiteturais

### Por que Squash Merge?

**Decisão**: Usar "Squash and merge" como padrão

**Razão**:
- Histórico linear e limpo em `main`
- Commits de feature/WIP não poluem main
- Fácil reverter features inteiras se necessário

**Trade-off**: Perde histórico detalhado de commits individuais (mas preservado na PR)

### Por que Auto-Merge Futuro?

**Decisão**: Auto-merge será implementado mas não é obrigatório

**Razão**:
- Reduz overhead manual em PRs simples (docs, chores)
- Mantém controle: requer label explícito + aprovações

**Trade-off**: Requer configuração e monitoramento inicial

### Por que GitHub Actions vs Jenkins/CircleCI?

**Decisão**: GitHub Actions nativo

**Razão**:
- Integração nativa com GitHub
- Zero custo para repos públicos
- Configuração via YAML simples
- Marketplace de actions

**Trade-off**: Menos customização que Jenkins

---

## Próximos Passos

- [ ] Implementar auto-merge script
- [ ] Configurar auto-assign baseado em labels
- [ ] Adicionar notifications via PR comments
- [ ] Configurar branch protection rules
- [ ] Documentar processo em video/gif

---

**Última revisão**: 2025-11-23  
**Responsável**: Agente (Copilot)  
**Referências**: 
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [SPRINT2_GITHUB_ACTIONS.md](./SPRINT2_GITHUB_ACTIONS.md)
- [GitHub Actions Docs](https://docs.github.com/actions)
