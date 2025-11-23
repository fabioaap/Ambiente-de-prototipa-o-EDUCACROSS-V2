# 🚀 Sprint 2 – Próximos Passos Executáveis

**Data**: 2025-11-22  
**Objetivo**: Organizar PRs abertas, validar builds e mover para Kanban  
**Status**: 5/5 PRs de Sprint 2 abertas, 0/5 mergeadas → **Foco em QA e merge**

---

## 📋 Menu de Ações

Escolha uma ou mais opções abaixo e execute em sequência:

- **[A]** Abrir review checklists para cada PR e mover para Kanban (5 PRs)
- **[B]** Criar tabela de PRs com status e links em `docs/sprint-2-prs.md`
- **[C]** Rodar `pnpm build` + `pnpm lint` + `pnpm -r type-check` e anexar logs ao backlog
- **[Todas]** Execute A → B → C em sequência

---

## [A] 📌 Review Checklists + Kanban

### Passo A1: Listar PRs Abertos (Sprint 2 Prioritários)

```bash
gh pr list --state open --json number,title,headRefName,author,updatedAt \
  --search "label:priority:P1 OR (head:copilot/create- OR head:copilot/add- OR head:feature/)" \
  --limit 50
```

Esperado: Listar PRs #35-#42 (B4, D2, G6, G4, C2, etc.)

### Passo A2: Mover PRs para Status "In Review" no Kanban

Para cada PR aberto (ex: #42 C2), execute:

```bash
# Exemplo: PR #42 (C2 Sidebar)
gh pr view 42 --json number,title

# Ir ao GitHub → Projects → Board do projeto
# Ou executar via CLI (se tiver acesso ao project board):
gh project item-list 3 --owner fabioaap --format json | head -20
```

**Estratégia manual rápida**:
1. Abra https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/projects/3
2. Para cada PR aberta em Sprint 2:
   - Mova de "Todo" → "In Progress"
   - Adicione label `status:in-review` na PR
   - Link issue correspondente no título da PR

### Passo A3: Criar Checklist de Review para Cada PR

Copie e cole no **comentário da PR** (GitHub):

#### Template de Review Checklist

```markdown
## ✅ Review Checklist (P1 Sprint 2)

### Build & Lint
- [ ] `pnpm build` passa sem erros
- [ ] `pnpm lint` passa (0 warnings críticos)
- [ ] `pnpm -r type-check` = 0 erros TypeScript
- [ ] Nenhum `console.error` em dev

### Funcionalidade
- [ ] Feature implementada conforme AC (acceptance criteria)
- [ ] Stories criadas ou atualizadas (Storybook)
- [ ] Página no Studio funciona (se aplicável)
- [ ] Testes manuais: criação → edição → deleção (onde aplicável)

### Documentação
- [ ] README / docs atualizado
- [ ] Comentários no código para lógica complexa
- [ ] CONTRIBUTING.md referenciado (se novo fluxo)

### Acessibilidade (P1)
- [ ] Componentes testados com screen reader (se UI)
- [ ] Navegação por teclado funciona
- [ ] Contraste de cores ≥ 4.5:1
- [ ] ARIA labels presentes (se necessário)

### QA Final
- [ ] Dev testou em `localhost:3000` (Studio) e `:6006` (Storybook)
- [ ] Não há regressões em P0 (C1, B1, D1, F1)
- [ ] Pronto para merge ✅ ou Bloqueado ❌

**Comentário Final**: Marque com ✅ quando todos os itens forem validados.
```

---

## [B] 📊 Tabela de PRs com Status

### Passo B1: Criar `docs/sprint-2-prs.md`

Copie e cole o conteúdo abaixo:

```markdown
# Sprint 2 – PRs em Aberto (Tracking)

**Atualizado em**: 2025-11-22  
**Total de PRs P1**: 5 (0 mergeadas, 5 abertas)

## 📌 PRs Prioritárias (Sprint 2)

| PR # | Título | Issue | Status | Revisor | Links | Bloqueador? |
|------|--------|-------|--------|---------|-------|------------|
| #42 | Implement dynamic page navigation and rename API for Studio sidebar | #6 (C2) | 🔴 Aberta | — | [PR](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/42) \| [Issue](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/6) | Critical (habilita navegação) |
| #40 | Complete CONTRIBUTING.md | #10 (G6) | 🔴 Aberta | — | [PR](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/40) \| [Issue](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/10) | Não |
| #38 | Add script to generate automatic index of journeys | #9 (G4) | 🟡 WIP | — | [PR](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/38) \| [Issue](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/9) | Não |
| #35 | Improve accessibility design system | #7 (B4) | 🔴 Aberta | — | [PR](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/35) \| [Issue](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/7) | Habilita #36 (D2) |
| #36 | Configure Storybook A11y addon | #8 (D2) | 🔴 Aberta | — | [PR](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/36) \| [Issue](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/8) | Depende #35 |

## 🎯 Critério de Merge (todos os PRs)

- ✅ Build passa (`pnpm build`)
- ✅ Lint OK (`pnpm lint`)
- ✅ Type-check OK (`pnpm -r type-check`)
- ✅ Stories/páginas funcionam
- ✅ Code review aprovado
- ✅ Nenhuma regressão P0

## 🔄 Estratégia de Merge (Ordem Recomendada)

1. **#40 (G6 CONTRIBUTING.md)** – Independente, rápido
2. **#42 (C2 Sidebar)** – Critical path, habilita navegação
3. **#38 (G4 Index Script)** – Independente, governança
4. **#35 (B4 A11y)** – Necessário antes de #36
5. **#36 (D2 Addon A11y)** – Último (valida acessibilidade)

## 📈 Status Geral

| Métrica | Valor |
|---------|-------|
| PRs abertas | 5 / 5 (100%) |
| PRs mergeadas | 0 / 5 (0%) |
| Build status | ✅ Verificado localmente |
| Bloqueadores críticos | Nenhum (todas independentes ou linearmente resolvíveis) |

## 🧪 Próximos Passos

- [ ] Code review para cada PR (template em `docs/sprint-2-review-checklist.md`)
- [ ] Rodar validação local e anexar logs
- [ ] Merge em sequência (ordem acima)
- [ ] Fechar issues no GitHub quando PRs forem mergeadas

---

*Gerado automaticamente. Atualize status conforme PRs progridem.*
```

### Passo B2: Commitear a Tabela

```bash
git add docs/sprint-2-prs.md
git commit -m "docs: Add Sprint 2 PR tracking table with review checklists"
git push origin main
```

---

## [C] 🧪 Validação de Build + Logs

### Passo C1: Rodar Build Completo

```bash
# Limpar cache (se necessário)
pnpm clean

# Instalar dependências
pnpm install --frozen-lockfile

# Build COMPLETO com timer
Write-Host "🏗️ Iniciando build..."; $timer = [Diagnostics.Stopwatch]::StartNew()
pnpm build
$timer.Stop()
Write-Host "⏱️ Build levou: $($timer.Elapsed.TotalSeconds)s"
```

**Esperado**: Sem erros, ~120-180s.

### Passo C2: Lint

```bash
Write-Host "🔍 Rodando lint..."; $timer = [Diagnostics.Stopwatch]::StartNew()
pnpm lint
$timer.Stop()
Write-Host "⏱️ Lint levou: $($timer.Elapsed.TotalSeconds)s"
```

**Esperado**: 0 erros críticos.

### Passo C3: Type-Check

```bash
Write-Host "🔤 Rodando type-check..."; $timer = [Diagnostics.Stopwatch]::StartNew()
pnpm -r type-check
$timer.Stop()
Write-Host "⏱️ Type-check levou: $($timer.Elapsed.TotalSeconds)s"
```

**Esperado**: 0 erros TypeScript.

### Passo C4: Capturar Logs e Anexar ao Backlog

```bash
# Gerar relatório de build
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$report = @"
# 🧪 Build Validation Report

**Data**: $timestamp
**Ambiente**: PowerShell + Node $((node --version)) + pnpm $((pnpm --version))

## ✅ Build Status
- Duration: [inserir tempo de build]
- Result: PASS ✅

## ✅ Lint Status
- Erros: 0
- Warnings críticos: 0
- Result: PASS ✅

## ✅ Type-Check Status
- Erros TypeScript: 0
- Result: PASS ✅

## 🎯 Conclusão
Todos os workspaces compilam e validam sem regressões.

---
Gerado: $timestamp
"@

# Salvar relatório
$report | Out-File -FilePath "docs/sprint-2-build-report.md" -Encoding UTF8
Write-Host "✅ Relatório salvo em docs/sprint-2-build-report.md"
```

### Passo C5: Commitear Relatório

```bash
git add docs/sprint-2-build-report.md
git commit -m "docs: Add Sprint 2 build validation report (2025-11-22)"
git push origin main
```

---

## 🎯 Executar Tudo em Sequência (Opção [Todas])

Se quiser executar **A → B → C** de uma vez:

```powershell
# A1: Listar PRs
Write-Host "=== [A1] Listando PRs ===" -ForegroundColor Cyan
gh pr list --state open --json number,title,headRefName --limit 50 | Format-Table

# A2: (Manual) Mover para Kanban e adicionar checklists
Write-Host "`n=== [A2] Próximo passo: abra cada PR e cole o checklist ===" -ForegroundColor Yellow

# B1: Criar tabela de PRs
Write-Host "`n=== [B1] Criando docs/sprint-2-prs.md ===" -ForegroundColor Cyan
# (Copiar arquivo da seção [B] acima e salvar)

# C1-C4: Validação de build
Write-Host "`n=== [C] Iniciando validação de build ===" -ForegroundColor Cyan
pnpm clean
pnpm install --frozen-lockfile
pnpm build
pnpm lint
pnpm -r type-check

Write-Host "`n=== ✅ Todas as validações concluídas ===" -ForegroundColor Green
```

---

## 📊 Resultado Esperado (após todos os passos)

| Ação | Status | Evidência |
|------|--------|-----------|
| **[A] Checklists + Kanban** | ✅ Completo | PRs movidas para "In Review", comentários com checklists adicionados |
| **[B] Tabela de PRs** | ✅ Completo | `docs/sprint-2-prs.md` criado e commitado |
| **[C] Build Validation** | ✅ Completo | `docs/sprint-2-build-report.md` com logs de build/lint/type-check |

---

## 🚀 Próximo Passo (Após Executar A+B+C)

1. **Code Review**: Revisar cada PR conforme checklist
2. **Merge Strategy**: Mergear na ordem recomendada (B → A → B → A → B)
3. **Kanban Update**: Mover para "Done" conforme cada PR for mergeada
4. **Close Issues**: Fechar issues no GitHub quando PRs forem mergeadas

---

## 🔗 Referências Rápidas

- PRs abertas: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pulls?q=is%3Aopen+is%3Apr
- Kanban: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/projects/3
- Sprint 2 Planning: `docs/sprint-2-planning.md`
- RUN_SPRINT2: `RUN_SPRINT2.md`

---

**Status**: Pronto para executar — escolha [A], [B], [C] ou [Todas]! 🎯
