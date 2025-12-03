# Tarefas Ativas - EDUCACROSS Prototipação

**Data**: 2025-11-20  
**Status Geral**: 🟡 Sprint 2 em progresso (45% das 11 issues P1 concluídas)

---

## 📋 Estado Atual (20 arquivos em staging)

### Build & Lint Status
✅ **Lint**: Passando (2 warnings menores em Storybook - `@typescript-eslint/no-explicit-any`)  
✅ **Build**: Sucesso (Storybook em 9.46s, todos os apps compilando)  
✅ **Dev Servers**: Funcionando (`pnpm dev:studio`, `pnpm dev:storybook`)

### Arquivos Modificados Pendentes (Git Status)
```
M  README.md                                    (badges, links Storybook)
M  package.json                                 (novo script gen:journeys)
M  eslint.config.mjs                           (rule updates)
M  docs/backlog.md                             (status updated)
M  docs/issues-pendentes.md                    (5 P0 concluídas)

M  domains/storybook/src/stories/*.tsx            (Play functions, Layout updates)
M  domains/studio/src/app/**/*.tsx                (PagesList, StudioLayout)
M  domains/studio/src/config/puck.config.tsx      (componentes updates)
M  domains/studio/src/components/*.css            (estilos)

M  packages/design-system/src/components/**/*.module.css  (acessibilidade)
M  packages/tokens/package.json                (lint script)
M  domains/FrontOffice/README.md              (atualizado)
```

### Arquivos Novos (Untracked)
```
✨ CONTRIBUTING.md                             (8.4 KB) - Guia de contribuição
✨ docs/accessibility-audit.md                 (7 KB) - Audit WCAG 2.1
✨ docs/sprint-1-completo.md                   (7 KB) - Histórico Sprint 1
✨ docs/sprint-2-progresso.md                  (9 KB) - Histórico Sprint 2
✨ domains/INDEX.md                            (auto-gerado)
✨ scripts/gen-journeys-index.js               (3.1 KB)
✨ domains/studio/data/pages/backoffice/         (dados exemplo)
✨ domains/BackOffice/journeys/revisao-questoes/  (primeira jornada)
✨ domains/FrontOffice/journeys/              (estrutura)
```

---

## 🎯 Próximas Prioridades (Recomendadas para Hoje)

### 1️⃣ **URGENTE: Commit & Push das mudanças atuais**
**Tempo**: 15-20 min  
**Status**: 20 arquivos em staging  
**Ação**:
```bash
git add -A
git commit -m "Sprint 2 (45%): Play functions, acessibilidade, CONTRIBUTING, índice jornadas"
git push origin copilot/list-pending-issues
```

**O que inclui:**
- ✅ Play functions (D3)
- ✅ Acessibilidade audit (B4)
- ✅ CONTRIBUTING.md (G6)
- ✅ Índice de jornadas (G4)
- ✅ Badges & links Storybook (H5)

---

### 2️⃣ **Fechar 2 Issues P0 Restantes (5 min cada)**
**Issues pendentes de fechamento**:
- Issue #1 - C1: Persistência em disco ✅ (implementado há dias)
- Issue #3 - D1: Página de Tokens ✅ (implementado há dias)
- Issue #2 - B1: Componentes de formulário ✅ (implementado há dias)
- Issue #5 - F1: ESLint unificado ✅ (implementado há dias)

**Ação**: Fechar issues no GitHub com checklist de validação

---

### 3️⃣ **Sprint 2 - Continuar com P1 (6 issues restantes)**

#### **Prioritário (próximas 2-3 sprints)**
| # | Issue | Estimativa | Dependência | Impacto |
|---|-------|-----------|-------------|---------|
| 🔴 | **C2** - Studio: Sidebar páginas | 3-4h | C1 ✅ | **Alto** - UX crítica |
| 🔴 | **D2** - Addon A11y Storybook | 2-3h | B4 ✅ | Alto - Validação visual |
| 🟡 | **H1+H** - Dashboard planning | 4-5h | Nenhuma | Médio - Exploratório |
| 🟢 | **E2** - Onboarding FrontOffice | 5-6h | B1 ✅ | Médio - Jornada 2 |

#### **Secundário (Sprint 3+)**
| # | Issue | Estimativa | Bloqueador | Notas |
|---|-------|-----------|-----------|-------|
| D4 | Agrupamento Storybook | 2h | D1 ✅ | Melhor experiência docs |
| H6 | Segurança/Visibilidade | 1-2h | Nenhuma | Documentação |
| C3 | Templates página | 3-4h | C2 | Reutilização |
| B6 | Theming semântico | 3-4h | A1-A4 | Exploração |

---

## 📊 Métricas Sprint 2 Atual

```
P0 (5 issues):   ████████████████████ 5/5 (100%) ✅ COMPLETO
P1 (11 issues):  █████░░░░░░░░░░░░░░░ 5/11 (45%)  ⏳ PROGRESSO
P2 (4 issues):   ░░░░░░░░░░░░░░░░░░░░ 0/4 (0%)   📋 PRÓXIMO
─────────────────────────────────────────────────
TOTAL:           ███████░░░░░░░░░░░░░ 10/20 (50%) 🎯 META
```

**Issues Sprint 2 Concluídas**:
1. ✅ **G6** - CONTRIBUTING.md (Documentação)
2. ✅ **D3** - Play Functions (Interações)
3. ✅ **H5** - Links/Badges Storybook (Visibilidade)
4. ✅ **G4** - Script índice jornadas (Automação)
5. ✅ **B4** - Acessibilidade audit (Conformidade)

**Próximo Marco**: Atingir 70% (8/11) antes de próxima reunião.

---

## 🚀 Como Contribuir Agora

### Cenário A: Continuar Sprint 2
**Foco**: Completar issues P1  
**Próxima task**: C2 (Sidebar Studio)
```bash
# 1. Commit alterações atuais
git add -A && git commit -m "Sprint 2: completar 45% das P1"

# 2. Feature branch para C2
git checkout -b feature/c2-studio-sidebar

# 3. Começar implementação
pnpm dev:studio
# Editar: domains/studio/src/components/PagesList.tsx
# Editar: domains/studio/src/components/StudioLayout.tsx
```

### Cenário B: Explorar Dashboard (H)
**Foco**: Planejar e prototipagem  
**Task**: H1 (Wireframe/Layout)
```bash
# 1. Criar branch
git checkout -b feature/h-dashboard

# 2. Criar prototype em Storybook
pnpm dev:storybook
# Adicionar: domains/storybook/src/stories/Dashboard.stories.tsx
```

### Cenário C: Ampliar Jornadas (E2/E3)
**Foco**: Adicionar jornadas FrontOffice/Game  
**Task**: E2 (Onboarding Aluno)
```bash
# 1. Setup jornada
mkdir -p domains/FrontOffice/journeys/onboarding-aluno

# 2. Criar pages no Studio
cd domains/studio/data/pages/frontoffice/onboarding-aluno
# pages: boas-vindas.json, perfil-inicial.json, tutorial.json
```

---

## 📝 Checklist para Próxima Reunião

### Antes de Começar Qualquer Nova Task
- [ ] `pnpm lint` ✅ (2 warnings OK, 0 errors)
- [ ] `pnpm build` ✅ (todos apps compilando)
- [ ] `git status` ✅ (limpo ou mudanças reviradas)
- [ ] Feature branch criado ✅

### Ao Terminar Uma Task
- [ ] Stories/exemplos adicionados ao Storybook
- [ ] README da jornada/componente atualizado
- [ ] `pnpm lint --fix` rodado
- [ ] Build completo testado
- [ ] Commit com mensagem descritiva
- [ ] Checklist de acessibilidade preenchido (quando aplicável)

### Para Fechar Issue no GitHub
- [ ] Código revisado e mergeado
- [ ] Documentação atualizada
- [ ] Link para PR adicionado na issue
- [ ] Label `status:done` adicionada

---

## 🔗 Referências Rápidas

| Recurso | Link |
|---------|------|
| **Backlog Completo** | `docs/backlog.md` |
| **Issues Pendentes** | `docs/issues-pendentes.md` |
| **Sprint 1 - Histórico** | `docs/sprint-1-completo.md` |
| **Sprint 2 - Histórico** | `docs/sprint-2-progresso.md` |
| **Guia Contribuição** | `CONTRIBUTING.md` |
| **Audit Acessibilidade** | `docs/accessibility-audit.md` |
| **Índice Jornadas** | `domains/INDEX.md` |
| **API Persistência** | `domains/studio/src/app/api/pages/README.md` |

---

## ⚡ Comandos Úteis Salvos

```bash
# Dev
pnpm dev:studio      # http://localhost:3000/studio
pnpm dev:storybook   # http://localhost:6006

# QA
pnpm lint            # ESLint check
pnpm lint --fix      # Autofix issues
pnpm build           # Build completo
pnpm test            # Rodar testes (quando existir)

# Scripts Projeto
pnpm gen:journeys    # Gerar índice de jornadas

# Git
git status           # Ver modificações
git diff --stat      # Resumo mudanças
git add -A && git commit -m "msg"
```

---

## 🎯 Visão de Conclusão

```
v0.1 - Infra básica:        ✅ PRONTO
├─ Monorepo setup           ✅ 
├─ Tokens base              ✅ 
├─ Design System mínimo     ✅ 
├─ Studio + Puck            ✅ 
├─ Storybook                ✅ 
└─ ESLint                   ✅ 

v0.2 - Amplitude + Jornadas: 🚧 50% (Sprint 2)
├─ Componentes form         ✅ 
├─ Persistência disco       ✅ 
├─ Play functions           ✅ 
├─ Acessibilidade audit     ✅ 
├─ Documentação base        ✅ 
├─ Sidebar Studio           ⏳ 
├─ Addon A11y               ⏳ 
├─ Jornada BackOffice       ✅ 
└─ Jornada FrontOffice      🔄 

v0.3 - Estabilização:       📋 PRÓXIMO
├─ A11y completa
├─ CI/CD básico
├─ Dashboard
└─ Documentação final
```

---

**Status Atualizado em**: 2025-11-20 17:37 UTC  
**Próximo Checkpoint**: Após commit + fechar issues P0  
**Reunião Próxima**: Review Sprint 2 (45% → 70%+)
