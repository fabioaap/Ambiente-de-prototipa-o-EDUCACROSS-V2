# 📖 LEIA-PRIMEIRO: Guia de Pendências

**Data**: 2025-11-20  
**Para**: Toda a equipe de prototipação  
**Objetivo**: Entender o que precisa ser feito e por onde começar

---

## 🎯 Resumo Ultra-Rápido (2 min)

- **Sprint 1**: ✅ **100% CONCLUÍDO** (5/5 issues P0)
- **Sprint 2**: 🚧 **45% EM PROGRESSO** (5/11 issues P1)
- **Sprint 3**: 📋 PRÓXIMO (P2 + exploração)

**O que fazer hoje**:
1. Commit as mudanças atuais (20 arquivos)
2. Fechar 4 issues P0 no GitHub
3. Escolher próxima tarefa (C2, D2, ou H)

---

## 📚 Onde Encontrar Informações

### 🚀 **Começar Agora**
📄 [`PRÓXIMOS-PASSOS.md`](./PRÓXIMOS-PASSOS.md)
- Como fazer o primeiro commit
- 3 opções de próxima tarefa
- Fluxo padrão para qualquer nova task
- FAQ rápido

### 📋 **Tarefas Práticas**
📄 [`docs/tarefas-ativas.md`](./docs/tarefas-ativas.md)
- Resumo de 20 arquivos prontos para commit
- Próximas 4 prioridades detalhas
- Checklist para antes/depois de cada task
- Links rápidos

### 📖 **Padrões & Guia**
📄 [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- Como criar componentes React
- Como criar stories Storybook
- Como criar jornadas
- Template de componentes
- Template de PRs

### 🎯 **Backlog Completo**
📄 [`docs/backlog.md`](./docs/backlog.md)
- Todas as 20 issues organizadas por Epic (A-H)
- Prioridades (P0, P1, P2)
- Critérios de aceitação
- Dependências entre issues
- Sprints planejadas

### 📊 **Histórico de Issues**
📄 [`docs/issues-pendentes.md`](./docs/issues-pendentes.md)
- 37 issues listadas e categorizadas
- Descrição completa de cada uma
- Status atual
- Links de referência

### 📈 **Histórico de Sprints**
📄 [`docs/sprint-1-completo.md`](./docs/sprint-1-completo.md) (Sprint 1 - 100%)  
📄 [`docs/sprint-2-progresso.md`](./docs/sprint-2-progresso.md) (Sprint 2 - 45%)
- O que foi feito
- Como foi feito
- Métricas
- Próximas prioridades

### ♿ **Acessibilidade**
📄 [`docs/accessibility-audit.md`](./docs/accessibility-audit.md)
- Audit WCAG 2.1 completo
- Checklist para novos componentes
- Decisões de design acessível
- Hit targets, foco, cores, navegação

### 🗂️ **Índice de Jornadas**
📄 [`domains/INDEX.md`](./domains/INDEX.md)
- Lista de todas as jornadas
- Organizado por domínio
- Links diretos
- Auto-gerado com `pnpm gen:journeys`

---

## 🎓 Como Usar Esta Documentação

### Cenário 1: "Preciso começar uma tarefa"
1. Abrir [`PRÓXIMOS-PASSOS.md`](./PRÓXIMOS-PASSOS.md) - Seção "Próxima Issue"
2. Buscar pela issue no [`docs/backlog.md`](./docs/backlog.md)
3. Seguir o fluxo em [`CONTRIBUTING.md`](./CONTRIBUTING.md)

### Cenário 2: "Como criar um novo componente?"
1. Abrir [`CONTRIBUTING.md`](./CONTRIBUTING.md) - Seção "Criando Componentes"
2. Seguir o template
3. Verificar checklist em [`docs/accessibility-audit.md`](./docs/accessibility-audit.md)

### Cenário 3: "Como criar uma nova jornada?"
1. Abrir [`CONTRIBUTING.md`](./CONTRIBUTING.md) - Seção "Criando uma Jornada"
2. Ver exemplo em `domains/BackOffice/journeys/revisao-questoes/`
3. Gerar índice com `pnpm gen:journeys`

### Cenário 4: "Qual é a próxima tarefa prioritária?"
1. Abrir [`docs/tarefas-ativas.md`](./docs/tarefas-ativas.md)
2. Procurar seção "Próximas Prioridades"
3. Escolher entre as 3 opções (C2, D2, ou H)

### Cenário 5: "Como faço um commit?"
1. Abrir [`PRÓXIMOS-PASSOS.md`](./PRÓXIMOS-PASSOS.md) - Seção "TL;DR"
2. Seguir os 3 passos de ação imediata
3. Usar template de commit

### Cenário 6: "Quero entender o projeto todo"
1. Começar por [`README.md`](./README.md) - Visão geral
2. Ler [`docs/sprint-1-completo.md`](./docs/sprint-1-completo.md) - Contexto
3. Explorar [`docs/backlog.md`](./docs/backlog.md) - Roadmap

---

## 📊 Status Visual

```
SPRINT 1 (P0):   ████████████████████ 5/5   (100%) ✅
SPRINT 2 (P1):   █████░░░░░░░░░░░░░░░ 5/11  (45%)  🚧
SPRINT 3 (P2):   ░░░░░░░░░░░░░░░░░░░░ 0/4   (0%)   📋
─────────────────────────────────────────────────────
TOTAL:           ███████░░░░░░░░░░░░░ 10/20 (50%)  🎯
```

---

## 🎯 As 5 Próximas Tarefas (Em Ordem)

| # | Issue | Tipo | Tempo | Impacto |
|---|-------|------|-------|---------|
| 1️⃣ | **C2** Studio Sidebar | Feature | 3-4h | 🔴 Alto |
| 2️⃣ | **D2** Addon A11y | Feature | 2-3h | 🟡 Médio |
| 3️⃣ | **H** Dashboard | Planning | 4-5h | 🟡 Médio |
| 4️⃣ | **E2** FrontOffice | Jornada | 5-6h | 🟢 Baixo |
| 5️⃣ | **E3** Game | Jornada | 5-6h | 🟢 Baixo |

---

## ⚡ Atalhos para Tarefas Comuns

### Rodar em Dev
```bash
# Terminal 1: Studio
pnpm dev:studio       # http://localhost:3000/studio

# Terminal 2: Storybook
pnpm dev:storybook    # http://localhost:6006
```

### QA (antes de commit)
```bash
pnpm lint --fix       # Autofix linter issues
pnpm build            # Build completo
git status            # Ver mudanças
```

### Novo Componente
```bash
# 1. Seguir template em CONTRIBUTING.md
# 2. Criar em: packages/design-system/src/components/
# 3. Story em: apps/storybook/src/stories/
# 4. Exportar em: packages/design-system/src/index.ts
# 5. Testar: pnpm dev:storybook
```

### Nova Jornada
```bash
# 1. Seguir template em CONTRIBUTING.md
# 2. Criar em: domains/[DOMÍNIO]/journeys/[NOME]/
# 3. Gerar índice: pnpm gen:journeys
# 4. Criar páginas em: apps/studio/data/pages/
```

### Commit & Push
```bash
git add -A
git commit -m "Sprint 2: descrição da mudança"
git push origin feature/ID-nome-tarefa
```

---

## 🚨 Importante: Não Esqueça

✅ **Sempre**:
- Rodar `pnpm lint --fix` antes de commit
- Rodar `pnpm build` para validar
- Adicionar story no Storybook para componentes
- Atualizar README/documentação
- Testar acessibilidade (audit WCAG)

❌ **Nunca**:
- Committar node_modules
- Deletar arquivos sem avisar o PM
- Ignorar warnings do linter
- Esquecer de atualizar histórico (backlog.md)
- Fazer commit direto em main

---

## 📞 Precisa de Ajuda?

### Build Quebrado?
1. Executar: `pnpm install`
2. Executar: `pnpm lint --fix`
3. Executar: `pnpm build`
4. Se persistir, abrir issue no GitHub

### Não Entende a Tarefa?
1. Ler em: [`docs/backlog.md`](./docs/backlog.md)
2. Ver exemplo similar em código existente
3. Procurar em: [`CONTRIBUTING.md`](./CONTRIBUTING.md)
4. Perguntar no issue do GitHub

### Não Sabe Começar?
1. Abrir: [`PRÓXIMOS-PASSOS.md`](./PRÓXIMOS-PASSOS.md)
2. Seguir seção "Fluxo Padrão para Qualquer Nova Task"
3. Copiar padrão de tarefa similar

### Achou Bug?
1. Abrir issue no GitHub
2. Indicar commit/branch onde aparece
3. Descrever passo-a-passo para reproduzir

---

## 📈 Checklist Semanal

- [ ] Começar Sprint semanal no GitHub Projects
- [ ] Atualizar status em [`docs/tarefas-ativas.md`](./docs/tarefas-ativas.md)
- [ ] Revisar issues bloqueadas
- [ ] Executar `pnpm lint` no repositório todo
- [ ] Fazer backup de dados em Studio (se necessário)
- [ ] Revisar PRs abertas
- [ ] Atualizar documentação

---

## 🎓 Recursos Externos

### Documentação
- [Storybook Docs](http://localhost:6006) - localhost durante dev
- [Puck (Editor)](https://puck.dev) - Editor visual usado
- [Next.js App Router](https://nextjs.org/docs/app) - Framework Studio
- [React Hooks](https://react.dev/reference/react) - Base do código

### Ferramentas
- **Node.js**: v20+ via `.nvmrc`
- **pnpm**: v9.14+ (package manager)
- **ESLint**: v9+ (linter config em `eslint.config.mjs`)
- **TypeScript**: v5+ (strict mode)

### Design & UX
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Acessibilidade
- [Design System Tokens](http://localhost:6006/?path=/story/design-system-tokens--colors) - Localhost
- Figma (integração futura - A5)

---

## 🗂️ Estrutura de Arquivos Rápida

```
Ambiente-de-prototipa-o-EDUCACROSS-V2/
│
├─ 📄 README.md                    ← Descrição geral
├─ 📄 CONTRIBUTING.md              ← Guia de contribuição
├─ 📄 LEIA-PRIMEIRO.md            ← Este arquivo
├─ 📄 PRÓXIMOS-PASSOS.md          ← Como começar
│
├─ 📁 docs/
│  ├─ backlog.md                   ← Todas as 20 issues
│  ├─ issues-pendentes.md          ← 37 issues detalhadas
│  ├─ tarefas-ativas.md            ← Status atual
│  ├─ sprint-1-completo.md         ← Histórico Sprint 1
│  ├─ sprint-2-progresso.md        ← Histórico Sprint 2
│  └─ accessibility-audit.md       ← Audit WCAG
│
├─ 📁 apps/
│  ├─ studio/                      ← Editor visual (Next.js)
│  │  ├─ src/app/api/pages/        ← API persistência
│  │  └─ data/pages/               ← Páginas prototipadas
│  └─ storybook/                   ← Documentação componentes
│     └─ src/stories/              ← Stories dos componentes
│
├─ 📁 packages/
│  ├─ design-system/               ← Componentes React
│  │  └─ src/components/           ← Componentes
│  └─ tokens/                       ← Design tokens
│     └─ tokens/                    ← Cores, tipografia, etc
│
├─ 📁 domains/
│  ├─ BackOffice/                  ← Jornadas administrativas
│  ├─ FrontOffice/                 ← Jornadas alunos
│  ├─ Game/                        ← Jornadas gamificadas
│  └─ INDEX.md                     ← Índice automático
│
└─ 📁 scripts/
   └─ gen-journeys-index.js        ← Script gerador índice
```

---

## ✨ Quick Links

| Necessidade | Link | Tempo |
|-------------|------|-------|
| Começar primeira tarefa | [`PRÓXIMOS-PASSOS.md`](./PRÓXIMOS-PASSOS.md) | 5 min |
| Entender projeto | [`README.md`](./README.md) | 10 min |
| Padrões de código | [`CONTRIBUTING.md`](./CONTRIBUTING.md) | 15 min |
| Todas as tarefas | [`docs/backlog.md`](./docs/backlog.md) | 20 min |
| Próxima ação | [`docs/tarefas-ativas.md`](./docs/tarefas-ativas.md) | 5 min |
| Acessibilidade | [`docs/accessibility-audit.md`](./docs/accessibility-audit.md) | 10 min |
| Histórico | [`docs/sprint-2-progresso.md`](./docs/sprint-2-progresso.md) | 10 min |

---

## 🎯 Última Coisa

**O projeto está em bom estado!** ✅

- Build compilando sem erros
- Lint passando (2 warnings menores)
- 50% das tarefas concluídas
- Documentação completa
- Base sólida para continuar

**Próximo passo**: Você escolhe entre C2, D2, ou H.

Boa sorte! 🚀

---

**Atualizado em**: 2025-11-20 17:37 UTC  
**Por**: GitHub Copilot CLI  
**Status**: Pronto para desenvolvimento
