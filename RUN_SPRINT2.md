# 🚀 RUN_SPRINT2 – Prompt de Execução Cloud

**Última atualização**: 2025-11-22  
**Ambiente**: GitHub Codespaces / Cloud / Local  
**Duração estimada**: 2 semanas (5 issues P1)  
**Status**: ✅ Pronto para começar

---

## 📍 Antes de Tudo

1. **Leia estes arquivos em sequência**:
   - Este arquivo (RUN_SPRINT2.md) – você está aqui
   - `SPRINT2_QUICK_START.md` – setup em 5 minutos
   - `docs/sprint-2-planning.md` – contexto das issues
   - `docs/sprint-2-execution-prompt.md` – scripts detalhados

2. **Acesso rápido**:
   - Repositório: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2
   - Kanban: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/projects/3
   - Issues: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues

---

## ⚡ Setup em 3 Passos (5 minutos)

### Passo 1: Abrir GitHub Codespaces (ou usar local)

```bash
# OPÇÃO A: GitHub Codespaces (Recomendado para cloud)
# Vá para: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2
# Clique: Code (verde) → Codespaces → Create codespace on main
# Aguarde ~2 min

# OPÇÃO B: Local
# Clone: git clone https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2.git
# Entre: cd Ambiente-de-prototipa-o-EDUCACROSS-V2
```

### Passo 2: Instalar Dependências

**Copie e cole NO TERMINAL:**

```bash
nvm use
pnpm install --frozen-lockfile
```

### Passo 3: Validar Setup

**Copie e cole:**

```bash
pnpm build && pnpm lint && pnpm -r type-check
```

**Esperado**: ✅ Sem erros  
**Próximo passo**: Escolha uma issue abaixo

---

## 🎯 Sprint 2 – 5 Issues P1

### ORDEM RECOMENDADA (Prioridade + Complexidade)

```
Semana 1:
  Day 1-2: #10 (G6) – CONTRIBUTING.md ⭐ COMECE AQUI
  Day 2-5: #6 (C2) – Studio Sidebar + #9 (G4) – Script (paralelo)

Semana 2:
  Day 6-9: #7 (B4) – Acessibilidade
  Day 10-11: #8 (D2) – Addon A11y
```

---

## 📌 Issue #10 (G6) – CONTRIBUTING.md

**Por quê começar aqui?**
- ⚡ Rápido (1-2 dias)
- 🎯 Independente (não bloqueia nada, não depende de nada)
- 📚 Desbloqueador (facilita onboarding de novos devs)

**Escopo**:
- Guia de setup (Node, pnpm, git)
- Como rodar dev servers (`pnpm dev:studio`, `pnpm dev:storybook`)
- Convenções (commits, branches, labels)
- Checklist pré-PR

**Workflow**:

```bash
# 1. Criar branch
git checkout main && git pull
git checkout -b feature/g6-contributing-guide

# 2. Criar arquivo
# Arquivo: CONTRIBUTING.md (root)
# Copie o template da seção "## 📝 Conteúdo CONTRIBUTING.md" abaixo

# 3. Testar locally
cat CONTRIBUTING.md  # Ler e revisar

# 4. Commit
git add CONTRIBUTING.md
git commit -m "docs: Add CONTRIBUTING.md with setup and workflow guidelines"

# 5. Push
git push -u origin feature/g6-contributing-guide

# 6. GitHub: Abrir PR
# https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/compare
# Title: "docs: Add CONTRIBUTING.md (issue #10)"
# Body: "Closes #10"

# 7. Validar
# Aguarde GitHub Actions rodar (sprint-2-validation.yml)
# Esperado: ✅ Build, Lint, Type-check passam

# 8. Merge
# Clique "Squash and merge" no GitHub
```

**Aceitação**:
- [ ] CONTRIBUTING.md criado em root
- [ ] Instrções de setup testadas
- [ ] Link no README apontando para CONTRIBUTING.md
- [ ] GitHub Actions passa
- [ ] PR merged a main

---

## 📌 Issue #6 (C2) – Studio: Sidebar com Lista de Páginas

**Por quê fazer depois?**
- 📊 Médio (3-4 dias)
- 🔗 Depende de C1 ✅ (API já funciona)
- 🎯 Paralelo com G4

**Escopo**:
- Carregar lista de páginas do `/api/pages`
- Exibir sidebar com CRUD (criar, deletar, renomear)
- Integrar com route dinâmica `[...slug]`
- Story no Storybook

**Workflow** (resumido):

```bash
# Branch: feature/c2-studio-sidebar-pages
git checkout main && git pull
git checkout -b feature/c2-studio-sidebar-pages

# Arquivos a criar/editar:
# - apps/studio/src/components/Sidebar.tsx (novo)
# - apps/studio/src/app/layout.tsx (integrar sidebar)
# - apps/studio/src/app/[[...slug]]/page.tsx (usar lista)
# - apps/storybook/src/stories/Sidebar.stories.tsx (novo)

# Build + teste local
pnpm dev:studio  # http://localhost:3000

# Commit + Push + PR (mesmo padrão de #10)
```

**Aceitação**:
- [ ] Sidebar renderiza lista de páginas
- [ ] Clicar em página abre no editor
- [ ] Botão "+" cria página
- [ ] Botão "×" deleta página
- [ ] Story no Storybook
- [ ] GitHub Actions passa

---

## 📌 Issue #9 (G4) – Script Gerador de Índice

**Por quê fazer em paralelo com C2?**
- ⚡ Médio (2-3 dias)
- 🎯 Totalmente independente
- 📚 Governança de jornadas

**Escopo**:
- Script `pnpm gen:journeys` que varre `domains/*/journeys/*/README.md`
- Gera `domains/JOURNEYS.md` com índice centralizado
- Cada jornada lista: objetivo, links, componentes

**Workflow**:

```bash
git checkout main && git pull
git checkout -b feature/g4-journeys-index-generator

# Arquivo a criar: scripts/gen-journeys-index.js (novo)
# Editar: package.json (adicionar script "gen:journeys")

# Testar
pnpm gen:journeys

# Verificar: domains/JOURNEYS.md foi gerado
cat domains/JOURNEYS.md

# Commit + Push + PR
```

**Aceitação**:
- [ ] Script criado em `scripts/gen-journeys-index.js`
- [ ] `pnpm gen:journeys` executa sem erros
- [ ] `domains/JOURNEYS.md` gerado corretamente
- [ ] Arquivo versionado (commitado)
- [ ] GitHub Actions passa

---

## 📌 Issue #7 (B4) – Design System: Acessibilidade

**Por quê fazer após C2?**
- 🏗️ Grande (4-5 dias)
- 🔗 Habilita D2 (Addon A11y)
- ♿ WCAG AA compliance

**Escopo**:
- Melhorar componentes DS com ARIA + foco + contraste
- Button: foco visível, aria-label
- Input: label + aria-describedby
- Select/Checkbox/Radio: teclado funciona
- Todos componentes: contraste WCAG AA
- Story a11y checklist

**Workflow**:

```bash
git checkout main && git pull
git checkout -b feature/b4-accessibility-improvements

# Editar cada componente:
# - packages/design-system/src/components/Button/Button.tsx
# - packages/design-system/src/components/Input/Input.tsx
# - packages/design-system/src/components/Select/Select.tsx
# - packages/design-system/src/components/Checkbox/Checkbox.tsx
# - packages/design-system/src/components/Radio/Radio.tsx

# Adicionar story de a11y
# - apps/storybook/src/stories/Accessibility.stories.tsx (novo)

# Validar contraste (ferramentas online como WebAIM)
# Testar teclado (Tab, Enter, Escape)

# Build + teste
pnpm build
pnpm -r type-check

# Commit + Push + PR
```

**Aceitação**:
- [ ] Button: foco visível + ARIA
- [ ] Input: label + aria-describedby
- [ ] Select/Checkbox/Radio: Tab funciona
- [ ] Todos componentes: contraste ≥ 4.5:1
- [ ] Story a11y checklist
- [ ] GitHub Actions passa

---

## 📌 Issue #8 (D2) – Storybook: Addon A11y

**Por quê fazer por último?**
- 🎬 Médio (2-3 dias)
- 🔗 Depende de B4 ✅
- 🤖 Validação automática

**Escopo**:
- Instalar `@storybook/addon-a11y`
- Configurar em `.storybook/main.ts`
- Verificar componentes DS no addon
- Documentar como corrigir violações

**Workflow**:

```bash
git checkout main && git pull
git checkout -b feature/d2-storybook-a11y-addon

# No apps/storybook/
cd apps/storybook

# Instalar
pnpm add -D @storybook/addon-a11y

# Editar: .storybook/main.ts
# Adicionar 'addon' em addons array

# Rodar Storybook
pnpm dev

# Verificar addon "Accessibility" aparece na UI
# Executar audits em cada story

# Commit + Push + PR
```

**Aceitação**:
- [ ] Addon instalado
- [ ] Addon aparece em Storybook
- [ ] Audits rodam automaticamente
- [ ] Relatório mostra violações (se houver)
- [ ] GitHub Actions passa

---

## 🔄 Durante o Desenvolvimento

### Dúvidas? Abra o arquivo completo:

```bash
cat docs/sprint-2-execution-prompt.md
```

Tem scripts, exemplos de código e troubleshooting detalhado para cada issue.

### Validação Contínua:

Depois de cada commit/push:

```bash
# Local
pnpm build
pnpm lint
pnpm -r type-check

# Cloud (GitHub Actions roda automático)
# Vá para: Actions tab → Sprint 2 Validation
# Esperado: ✅ todos 4 jobs passam
```

### Atualizando Kanban:

Após criar PR:

```bash
# Mover issue para "In Progress"
gh project item-edit --id <ITEM_ID> --field-value "In Progress"

# Após merge
gh project item-edit --id <ITEM_ID> --field-value "Done"
```

(IDs estão em: `docs/sprint-2-execution-prompt.md`)

---

## 📊 Checklist Final (por issue)

### Antes de Abrir PR:

- [ ] `pnpm build` passa sem erros
- [ ] `pnpm lint` passa sem warnings críticos
- [ ] `pnpm -r type-check` passa
- [ ] Testes manuais completados
- [ ] Story/documentação atualizada (se aplicável)
- [ ] Nenhum `console.error` em dev

### Antes de Mergear:

- [ ] GitHub Actions passou (sprint-2-validation.yml)
- [ ] Code review aprovado
- [ ] Testes de regressão P0 OK (C1, B1, D1, F1 funcionam)
- [ ] Kanban movido para "In Review"

### Após Mergear:

- [ ] Issue moved para "Done" no kanban
- [ ] Build em main ainda limpo
- [ ] Nenhum erro de produção

---

## 🐛 Troubleshooting Rápido

### Erro: "Cannot find module @prototipo/design-system"

```bash
pnpm install
pnpm build
```

### Erro: "Port 3000 already in use"

```bash
# Kill processo anterior
npx kill-port 3000
pnpm dev:studio
```

### Storybook não inicia

```bash
pnpm clean
pnpm install
pnpm build:storybook
pnpm dev:storybook
```

### GitHub Actions falha

Clique em "Re-run all jobs" no tab Actions (pode ser timeout ou fluke)

---

## 📞 Próximos Passos

1. **Agora**: Copie e cole o Setup em 3 passos acima
2. **Próximo**: Clique na issue #10 (G6) e siga o workflow
3. **Depois**: Continue com #6 (C2) e #9 (G4) em paralelo
4. **Final**: #7 (B4) e #8 (D2) na semana 2

---

## 📚 Documentação Complementar

- **Sprint 2 Planning**: `docs/sprint-2-planning.md` (contexto, dependências, riscos)
- **Execution Prompt**: `docs/sprint-2-execution-prompt.md` (scripts detalhados)
- **Quick Start**: `SPRINT2_QUICK_START.md` (Codespaces)
- **Design System**: `packages/design-system/README.md` (padrões)
- **Backlog**: `docs/backlog.md` (status geral)

---

## ✅ Definição de Sucesso (Sprint 2)

- ✅ 5 issues P1 implementadas e merged
- ✅ Nenhuma regressão P0 (C1, B1, D1, F1)
- ✅ Build + Lint + Type-check limpos
- ✅ Storybook A11y addon funcionando
- ✅ CONTRIBUTING.md documentado
- ✅ Sidebar C2 navegável
- ✅ Script de índice automatizado
- ✅ Acessibilidade WCAG AA em DS

---

**Pronto? Vá para o Passo 1 do Setup acima! 🚀**

---

*Gerado por: GitHub Copilot Agent*  
*Data: 2025-11-22*  
*Ambiente: Monorepo pnpm + Next.js + TypeScript 5*
