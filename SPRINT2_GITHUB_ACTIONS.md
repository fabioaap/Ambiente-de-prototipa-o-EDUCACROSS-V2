# Sprint 2 – GitHub Actions & CI/CD Automation

**Ambiente**: GitHub Cloud  
**Workflow File**: `.github/workflows/sprint-2-validation.yml`  
**Acionamento**: Automático em push/PR para main

---

## 📋 O Que Você Precisa Saber

### ✅ Tudo Funciona Automaticamente

Quando você:
1. Faz `git push` para a branch feature
2. Abre uma Pull Request (PR)
3. Faz push direto para `main` (após merge)

**GitHub Actions AUTOMATICAMENTE**:
- ✅ Valida setup (Node, pnpm)
- ✅ Roda `pnpm build` (todos os workspaces)
- ✅ Roda `pnpm lint` (sem warnings críticos)
- ✅ Roda `pnpm -r type-check` (sem erros TypeScript)
- ✅ Gera relatório de status
- ✅ Notifica erros (red X em PR)
- ✅ Permite merge apenas se tudo passar ✅

---

## 🔍 Como Monitorar

### Opção 1: No GitHub (Recomendado)

```
Seu repositório → "Actions" tab
                    ↓
                Workflows → "Sprint 2 Validation"
                    ↓
                Ver último run (status ✅ ou ❌)
```

### Opção 2: Na Pull Request

```
Seu PR aberto no GitHub
   ↓
Scroll até "Checks" (verde ✅ ou vermelho ❌)
   ↓
Clique em "Sprint 2 Validation" para detalhe
```

### Opção 3: Local (Testar Antes)

```bash
# Simular o que GitHub Actions vai fazer

# 1. Validar setup
node --version  # v22.x.x
pnpm --version  # 9.14.4+

# 2. Build
pnpm build

# 3. Lint
pnpm lint

# 4. Type-check
pnpm -r type-check

# Resultado: Sem erros = seu PR vai passar ✅
```

---

## 🎯 O Que o Workflow Faz (Detalhado)

### Job 1: `validate-setup`

**O que faz**: Verifica ambiente  
**Duração**: ~30s  
**Esperado**: ✅ PASS

```yaml
- Check Node version
- Check pnpm version
- Display versions in log
```

**Se falhar**:
```
❌ "Node version mismatch"
↓ Solução: Seu Codespace pode estar desatualizado
         Execute: nvm use (para forçar Node 22)
```

---

### Job 2: `sprint2-validations`

**O que faz**: Valida código  
**Duração**: ~120s  
**Esperado**: ✅ PASS

```yaml
Step 1: pnpm install --frozen-lockfile
        (instala dependências, usa lock file)

Step 2: pnpm build
        - tokens/ → gera CSS variables
        - design-system/ → compila componentes
        - studio/ → build Next.js
        - storybook/ → build Storybook

Step 3: pnpm lint
        - ESLint em todos workspaces
        - 0 errors, 0 warnings críticos OK

Step 4: pnpm -r type-check
        - TypeScript em strict mode
        - 0 type errors
```

**Se falhar em `pnpm build`**:
```
❌ "Build failed: packages/design-system"
↓ Solução: Rode localmente
         pnpm build
         pnpm build:design-system  (isolar problema)
         Verifique erros de TypeScript
```

**Se falhar em `pnpm lint`**:
```
❌ "Lint failed: 5 errors in studio"
↓ Solução: Rode localmente
         pnpm lint
         pnpm lint --fix  (tenta corrigir)
         Comite correções e push novamente
```

**Se falhar em `type-check`**:
```
❌ "Type error: Property 'x' not found"
↓ Solução: Rode localmente
         pnpm -r type-check
         Abra o arquivo indicado
         Corrija o tipo (adicione :Type ou import)
         Comite e push novamente
```

---

### Job 3: `report`

**O que faz**: Gera relatório de status  
**Duração**: ~5s  
**Esperado**: ✅ PASS

```yaml
- List all artifacts built
- Verify workspace structure
- Report total time
```

---

### Job 4: `notify-main`

**O que faz**: Notifica status ao main (se for merge)  
**Duração**: ~5s  
**Esperado**: ✅ PASS

```yaml
- Update PR check status
- Allow/block merge (se tudo OK ou com erro)
```

---

## 📊 Exemplo de Run Bem-Sucedido

```
Sprint 2 Validation

✅ validate-setup
   - Node: v22.11.0 ✓
   - pnpm: 9.14.4 ✓

✅ sprint2-validations
   - pnpm install (3.2s) ✓
   - pnpm build (112s) ✓
     - tokens/ → 8s
     - design-system/ → 24s
     - studio/ → 56s
     - storybook/ → 24s
   - pnpm lint (18s) ✓
     - 0 errors, 0 warnings
   - pnpm type-check (45s) ✓
     - 0 errors

✅ report
   - Total time: 178s
   - Status: PASS

✅ notify-main
   - PR ready to merge

Total: 183s (3 minutos)
```

---

## 🚨 Exemplo de Run com Erro

```
Sprint 2 Validation

✅ validate-setup
   - Node: v22.11.0 ✓
   - pnpm: 9.14.4 ✓

❌ sprint2-validations
   - pnpm install (3.2s) ✓
   - pnpm build (FAILED at studio)
     ERROR: apps/studio/src/app/page.tsx
     Line 42: Property 'pages' does not exist on type '{}'
     
     Suggestion: Did you mean 'pages' in C2 Sidebar component?

❌ report
   - Failed: Build error in studio
   - Recommendation: Fix TypeScript, rebuild locally, push

❌ notify-main
   - PR cannot be merged until checks pass
```

---

## 🔧 Troubleshooting Workflow

### ❌ "Actions workflow not triggering"

**Causa**: Branch não está em `main` ou `feature/*`  
**Solução**:
```bash
# Verificar branch
git branch

# Se está em detached head, voltar para main
git checkout main
git pull origin main

# Criar feature branch apropriada
git checkout -b feature/seu-nome
```

### ❌ "Workflow ran but failed with timeout"

**Causa**: Build levou >6 minutos (limite GitHub)  
**Solução**:
```bash
# 1. Verificar localmente o que está lento
time pnpm build

# 2. Se design-system lento
pnpm build:design-system --verbose

# 3. Otimizações
- Limpar cache: pnpm clean
- Reinstalar: pnpm install
- Atualizar tsup.config.ts se necessário
```

### ❌ "Workflow permissions issue"

**Causa**: GitHub Actions não tem permissão  
**Solução**:
```
Repository → Settings → Actions → General
↓
"Workflow permissions" → Selecionar "Read and write"
↓
Save
↓
Retrigger workflow: Ir a Actions → click ... → Re-run all jobs
```

### ❌ "Node version mismatch"

**Causa**: Codespaces rodando Node 20, precisa 22  
**Solução** (em Codespaces):
```bash
nvm list  # Listar versões disponíveis
nvm use 22  # Usar Node 22
node --version  # Verificar

# Agora refazer o push
```

### ❌ "pnpm frozen-lockfile violated"

**Causa**: Alterou package.json sem rodar `pnpm install`  
**Solução**:
```bash
# Local
pnpm install  # Atualiza pnpm-lock.yaml
git add pnpm-lock.yaml
git commit -m "chore: Update pnpm lockfile"
git push
```

---

## 📈 Monitorando Performance

### Duração Esperada por Job

| Job | Duração | Limite | Margem |
|-----|---------|--------|--------|
| validate-setup | ~30s | 1m | OK ✅ |
| sprint2-validations | ~120-150s | 6m | OK ✅ |
| report | ~5s | 1m | OK ✅ |
| notify-main | ~5s | 1m | OK ✅ |
| **Total** | **~180s** | **10m** | **Confortável** |

### Se Performance Degradar

```bash
# Limpar caches (local)
pnpm clean

# Reinstalar
pnpm install --force

# Rebuild tudo
pnpm build

# Testar com timing
time pnpm build
time pnpm lint
```

---

## 🎯 Integração com Seu Workflow

### Ao Fazer Push para Feature Branch

```bash
git push origin feature/seu-nome
```

**GitHub Actions**:
- ✅ Roda automaticamente
- ✅ Mostra status em PR (quando abrir)
- ⏳ Aguarde ~3 minutos

**PR Page**:
- Após 3 min, aparece "Checks" com ✅ ou ❌
- Se ✅: Pode mergear
- Se ❌: Corrija localmente, push novamente

---

### Ao Abrir Pull Request (PR)

```
No GitHub:
1. Clique "New pull request"
2. Selecione: feature/seu-nome → main
3. Preencha título e descrição
4. Clique "Create pull request"
```

**GitHub Actions automático**:
- Roda checagem completa
- Resultado aparece em "Checks"
- Se tudo ✅: Botão "Merge pull request" ativado

---

### Ao Mergear PR para Main

```bash
# No GitHub: Clique "Squash and merge"
# Ou via CLI:
gh pr merge <PR_NUMBER> --squash
```

**GitHub Actions**:
- Roda uma validação final em `main`
- Se tudo ✅: Deploy automático (futuro)
- Se ❌: Revert automático (futuro)

---

## 📊 Vendo Logs Detalhados

### No GitHub (Recomendado)

```
Actions tab → Sprint 2 Validation → latest run
            ↓
            Clique em "sprint2-validations" (o job)
            ↓
            Expanda cada Step para ver log completo
            ↓
            Procure por ✅ ou ❌
```

### Exemplo de Log

```
2025-11-22T10:15:30.1234567Z ##[group]Run pnpm build
2025-11-22T10:15:30.1234567Z ✓ built tokens in 8s
2025-11-22T10:15:40.1234567Z ✓ built design-system in 24s
2025-11-22T10:16:05.1234567Z ✓ built studio in 56s
2025-11-22T10:16:30.1234567Z ✓ built storybook in 24s
2025-11-22T10:16:30.1234567Z Total: 112s
2025-11-22T10:16:30.1234567Z ##[endgroup]
```

---

## 🔄 Reprocessar Workflow

### Se Falhar por Timeout/Fluke

```
No GitHub:
1. Vá para Actions
2. Selecione último run (com ❌)
3. Clique "Re-run all jobs"
4. Aguarde ~3 minutos

Isso roda tudo novamente do zero.
```

---

## 📞 Status Badge em README

### Adicionar Badge de Status

No seu `README.md`, adicione:

```markdown
[![Sprint 2 Validation](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/workflows/Sprint%202%20Validation/badge.svg)](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/actions/workflows/sprint-2-validation.yml)
```

Isso mostra um badge verde ✅ ou vermelho ❌ em tempo real.

---

## ✅ Checklist de Validação Local (Antes de Push)

Sempre que for fazer push:

```bash
# 1. Estar na feature branch
git branch
# Esperado: * feature/seu-nome

# 2. Build
pnpm build
# Esperado: ✅ sem erros

# 3. Lint
pnpm lint
# Esperado: ✅ 0 errors

# 4. Type-check
pnpm -r type-check
# Esperado: ✅ 0 errors

# 5. Commit
git add <files>
git commit -m "tipo: descrição"

# 6. Push
git push

# 7. GitHub Actions vai fazer o resto!
```

---

## 📚 Referências

- `.github/workflows/sprint-2-validation.yml` – Arquivo do workflow
- `docs/backlog.md` – Status geral
- `RUN_SPRINT2.md` – Prompt de execução
- `SPRINT2_STATUS.md` – Dashboard de issues

---

## 🚀 Resumo

- ✅ Workflow roda automaticamente em push/PR
- ✅ Valida build, lint, type-check
- ✅ Bloqueia merge se houver erro
- ✅ Você pode monitorar em Actions tab
- ✅ Teste localmente ANTES de push para evitar falhas
- ✅ Se falhar, correção é rápida (push novamente)

**Próximo passo**: Volte para `RUN_SPRINT2.md` e comece a primeira issue! 🚀

---

*Gerado por: GitHub Copilot Agent*  
*Data: 2025-11-22*  
*Workflow File: `.github/workflows/sprint-2-validation.yml`*
