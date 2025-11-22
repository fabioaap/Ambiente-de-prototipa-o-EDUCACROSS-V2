# 🚀 Sprint 2 – Guia de Execução Rápida

**Ler antes de começar:** `docs/sprint-2-execution-prompt.md`

---

## ⚡ Quick Start (em Cloud GitHub)

### 1️⃣ **Abrir GitHub Codespaces**

```bash
# No repositório: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2
# Botão verde "Code" → "Codespaces" → "Create codespace on main"
# Aguarde ~2 minutos para setup automático
```

### 2️⃣ **Setup Inicial (colar no terminal)**

```bash
cd Ambiente-de-prototipa-o-EDUCACROSS-V2
nvm use
pnpm install --frozen-lockfile
pnpm build
pnpm lint
echo "✅ Setup completo!"
```

### 3️⃣ **Escolher Issue para Trabalhar**

Abra `docs/sprint-2-execution-prompt.md` e siga a **Fase 2** correspondente:

- **#10 (G6)** – CONTRIBUTING.md (1-2 dias, Independente) ⭐ COMECE AQUI
- **#6 (C2)** – Sidebar (3-4 dias, paralelo)
- **#9 (G4)** – Script (2-3 dias, paralelo)
- **#7 (B4)** – Acessibilidade (4-5 dias, após C2)
- **#8 (D2)** – Addon A11y (2-3 dias, após B4)

---

## 📝 Workflow Padrão (por issue)

### Exemplo: Issue #10 (G6 – CONTRIBUTING.md)

```bash
# 1. Criar branch
git checkout main
git pull origin main
git checkout -b feature/g6-contributing-guide

# 2. Fazer alterações (seguir seção na prompt)
# Copiar/colar código do `docs/sprint-2-execution-prompt.md`

# 3. Validar
pnpm build
pnpm lint

# 4. Commitar (seguir convenção)
git add .
git commit -m "docs: Criar CONTRIBUTING.md com guia de setup e convenções

- Instruções de setup local
- Convenções de git
- Template de jornada
- Checklist pré-PR

Fecha #10"

# 5. Push
git push origin feature/g6-contributing-guide

# 6. Abrir PR (via GitHub web ou CLI)
gh pr create --title "[P1] docs: Create CONTRIBUTING.md" \
  --body "Fechando #10" \
  --base main
```

---

## 🔗 Documentação Essencial

| Arquivo | Uso |
|---------|-----|
| `docs/sprint-2-execution-prompt.md` | ⭐ **PRINCIPAL** – Guia completo com comandos |
| `docs/sprint-2-planning.md` | Planejamento e estimativas |
| `CONTRIBUTING.md` | (será criado em #10) |
| `docs/backlog.md` | Status global do projeto |

---

## ✅ Checklist por Fase

### Fase 1: Preparação (Dia 1)
- [ ] Setup completo (`pnpm install`, `pnpm build`, `pnpm lint`)
- [ ] Branches criadas (5 branches de feature)
- [ ] GitHub Actions rodando (validação automática)

### Fase 2: Desenvolvimento (Dias 2-7)
- [ ] #10 (G6) Mergeado
- [ ] #6 (C2) Mergeado
- [ ] #9 (G4) Mergeado

### Fase 3: Acessibilidade (Dias 6-11)
- [ ] #7 (B4) Mergeado
- [ ] #8 (D2) Mergeado

### Fase 4: Validação (Dia 12+)
- [ ] Build ✅
- [ ] Lint ✅
- [ ] Sem regressões P0
- [ ] Testes manuais OK

---

## 🆘 Problemas Comuns

### ❌ "Cannot find module @measured/puck"
```bash
pnpm clean
pnpm install
pnpm build:tokens
pnpm build:design-system
```

### ❌ "Port 3000 já em uso"
```bash
# Matar processo
lsof -i :3000
kill -9 <PID>
```

### ❌ "Build failing"
```bash
pnpm install --frozen-lockfile
pnpm build --verbose
# Se persistir, checar docs/sprint-2-execution-prompt.md
```

---

## 📊 Kanban Realtime

Ver status das issues em: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/projects/3

**Coloque as issues em:**
- **"In Progress"** quando começar
- **"In Review"** quando abrir PR
- **"Done"** quando mergear

---

## 🎯 Dicas para Sucesso

1. **Leia `docs/sprint-2-execution-prompt.md` completamente** antes de começar
2. **Trabalhe em paralelo**: G6 + C2 + G4 nos primeiros dias
3. **Teste localmente** com `pnpm dev:studio` e `pnpm dev:storybook`
4. **Commit frequente** (1 commit por feature lógica)
5. **PRs pequenos** (máximo 400 linhas) para review rápido
6. **Sem breaking changes**: P0 deve continuar 100% funcional

---

## 📞 Referências Rápidas

```bash
# Rodar tudo
pnpm install
pnpm build
pnpm lint

# Dev servers
pnpm dev:studio       # http://localhost:3000/studio
pnpm dev:storybook    # http://localhost:6006

# Criar branch
git checkout -b feature/xxx

# Ver status
git status
gh pr list
gh issue list --state open
```

---

## ✨ Final

**Você está pronto para começar a Sprint 2!**

Siga `docs/sprint-2-execution-prompt.md` e boa sorte! 🚀

---

**Sprint 2 Timeline**: 2025-11-22 a 2025-12-06  
**Issues**: 5 (G6, C2, G4, B4, D2)  
**Bloqueadores**: 0  
**Status**: 🟢 Go!

