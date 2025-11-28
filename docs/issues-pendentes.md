# Issues Pendentes - EDUCACROSS Prototipação

Este documento lista todas as issues pendentes extraídas do `backlog.md`, organizadas por Epic e prioridade.

**Data de geração**: 2025-11-21  
**Status**: Snapshot manual sincronizado com `docs/backlog.md`

---

## Resumo por Prioridade

- **P0 (Alto Impacto/Curto Prazo)**: 5 issues → 4 concluídas, **1 pendente (E1)**
- **P1 (Médio)**: 11 issues → 0 concluídas (aguardam C1/E1 e definições de A11y)
- **P2 (Exploração)**: 4 issues → 0 concluídas
- **Sem Prioridade Definida**: 17 issues (principalmente Epic A, B, C, D)

**Total**: 37 issues mapeadas (4 concluídas aguardando fechamento, 33 pendentes)

**Sprint 1 Status**: 🚧 **EM ANDAMENTO** – Falta concluir E1 (páginas + componentes DS)

---

## Epic A – Tokens (@prototipo/tokens)

### A1 – Adicionar tokens semânticos
- **Descrição**: Adicionar tokens semânticos (ex.: `--color-bg`, `--color-fg`, `--color-accent`)
- **Prioridade**: Não definida
- **Labels**: `epic`, `type:task`, `tooling`
- **Status**: Pendente

### A2 – Suporte a tema claro/escuro
- **Descrição**: Suporte a tema claro/escuro via CSS vars (toggle futuro)
- **Prioridade**: Não definida
- **Labels**: `epic`, `type:task`, `tooling`
- **Status**: Pendente

### A3 – Documentar tokens de tipografia e espaçamento
- **Descrição**: Documentar tokens de tipografia e espaçamento com exemplos visuais
- **Prioridade**: Não definida
- **Labels**: `documentation`, `type:task`
- **Status**: Pendente

### A4 – Padrão de nomes e guia de contribuição
- **Descrição**: Padrão de nomes (convenção) e guia de contribuição de tokens
- **Prioridade**: Não definida
- **Labels**: `documentation`, `type:task`
- **Status**: Pendente

### A5 – Estrutura para integração Figma
- **Descrição**: Estrutura para futura integração Figma → tokens (sem automatizar agora)
- **Prioridade**: Não definida
- **Labels**: `type:task`, `tooling`
- **Status**: Pendente

---

## Epic B – Design System (@prototipo/design-system)

### B1 – Componentes de formulário ✅
- **Descrição**: Componentes de formulário: `Input`, `Select`, `Checkbox`, `Radio`, `Switch`
- **Prioridade**: **P0**
- **Labels**: `epic`, `priority:P0`, `type:task`
- **Status**: **CONCLUÍDO** ✅
- **Critério de Aceitação**: Cada componente possui stories com controles e estados (foco/erro/disabled)

### B2 – Componentes de layout
- **Descrição**: Componentes de layout: `Stack`, `Grid`, `Section`, `Navbar`, `Footer`
- **Prioridade**: Não definida
- **Labels**: `epic`, `type:task`
- **Status**: Pendente

### B3 – Feedback/UI
- **Descrição**: Feedback/UI: `Badge`, `Tag`, `Tooltip`, `Modal`, `Toast` (API mínima)
- **Prioridade**: Não definida
- **Labels**: `epic`, `type:task`
- **Status**: Pendente

### B4 – Acessibilidade
- **Descrição**: Acessibilidade: roles/aria, foco visível, contraste, navegação teclado
- **Prioridade**: **P1**
- **Labels**: `priority:P1`, `type:task`
- **Status**: Pendente
- **Próximo passo**: Checklist completo após revisar os componentes de formulário (B1)

### B5 – Página de documentação dos componentes
- **Descrição**: Página de documentação dos componentes (Storybook Docs) com exemplos reais
- **Prioridade**: Não definida
- **Labels**: `documentation`, `type:task`
- **Status**: Pendente

### B6 – Theming
- **Descrição**: Theming: consumir tokens semânticos para variar tema global
- **Prioridade**: **P2**
- **Labels**: `priority:P2`, `type:task`, `tooling`
- **Status**: Pendente

### B7 – Snapshot visual básico
- **Descrição**: Snapshot visual básico via Chromatic (opcional nesta fase)
- **Prioridade**: Não definida
- **Labels**: `type:task`, `tooling`
- **Status**: Pendente

---

## Epic C – Studio (Next + Puck)

### C1 – Persistência em disco ✅
- **Descrição**: Persistência em disco: rota de API para salvar/ler `data/pages/*.json` (além de localStorage)
- **Prioridade**: **P0**
- **Labels**: `epic`, `priority:P0`, `domain:BackOffice`, `type:task`
- **Status**: **CONCLUÍDO** ✅
- **Critério de Aceitação**: É possível criar/abrir/salvar páginas pelo Studio; arquivos JSON visíveis em `domains/studio/data/pages`

### C2 – Lista de páginas no sidebar
- **Descrição**: Lista de páginas no sidebar (carregar do filesystem) com criar/renomear/excluir
- **Prioridade**: **P1**
- **Labels**: `priority:P1`, `type:task`
- **Status**: Pendente
- **Observação**: Depende da validação final da persistência (C1) e definição de UX no Studio

### C3 – Templates de página por jornada
- **Descrição**: Templates de página por jornada (ex.: dashboard, detalhe, formulário)
- **Prioridade**: Não definida
- **Labels**: `type:task`
- **Status**: Pendente

### C4 – Autocomplete do map de componentes
- **Descrição**: Autocomplete do map de componentes do DS no Puck (sincronizado por arquivo único)
- **Prioridade**: Não definida
- **Labels**: `type:task`, `tooling`
- **Status**: Pendente

### C5 – Export/Import de páginas
- **Descrição**: Export/Import de páginas (JSON) via UI do editor
- **Prioridade**: **P2**
- **Labels**: `priority:P2`, `type:task`
- **Status**: Pendente

---

## Epic D – Storybook

### D1 – Página de Tokens ✅
- **Descrição**: Página de Tokens (visualizar cores/typography/spacing com exemplos)
- **Prioridade**: **P0**
- **Labels**: `epic`, `priority:P0`, `type:task`
- **Status**: **CONCLUÍDO** ✅
- **Critério de Aceitação**: Existe uma story/MDX que apresenta visualmente os tokens com amostras legíveis

### D2 – Addon A11y e validações
- **Descrição**: Addon A11y e validações mínimas
- **Prioridade**: **P1**
- **Labels**: `priority:P1`, `type:task`
- **Status**: Pendente
- **Nota**: Play functions adicionadas em D3 como base para futuro addon A11y

### D3 – Play functions
- **Descrição**: Play functions para interações básicas nos componentes (testes interativos)
- **Prioridade**: **P1**
- **Labels**: `priority:P1`, `type:task`
- **Status**: Pendente
- **Observação**: Espera definição dos componentes críticos (B1/B4)

### D4 – Agrupamento por categoria/domínio
- **Descrição**: Agrupamento por categoria/domínio; exemplos focados em jornadas reais
- **Prioridade**: Não definida
- **Labels**: `type:task`, `documentation`
- **Status**: Pendente

---

## Epic E – Jornadas (domains/BackOffice, domains/FrontOffice, domains/Game)

### E1 – domains/BackOffice: Revisão de Questões
- **Descrição**: 
  - Páginas do Studio: lista de pendentes, detalhe de questão, ações
  - Componentes DS necessários: Toolbar, StatusBadge, ConfirmDialog
- **Prioridade**: **P0**
- **Labels**: `epic`, `priority:P0`, `domain:BackOffice`, `type:task`
- **Status**: Em andamento

#### Subtarefas E1:
- [x] Criar estrutura de jornada em `domains/BackOffice/journeys/revisao-questoes/`
- [ ] Implementar componentes DS: Toolbar, StatusBadge, ConfirmDialog
- [x] Criar páginas no Studio: lista de pendentes, detalhe de questão
- [ ] Finalizar tela de ações/confirmar devolutivas
- [x] Documentar jornada no README

### E2 – domains/FrontOffice: Onboarding do Aluno
- **Descrição**: 
  - Páginas do Studio: boas-vindas, perfil inicial, tutorial
  - Componentes DS necessários: Stepper, ProgressBar, AvatarUpload
- **Prioridade**: Não definida
- **Labels**: `epic`, `domain:FrontOffice`, `type:task`
- **Status**: Pendente

#### Subtarefas E2:
- [ ] Criar estrutura de jornada em `domains/FrontOffice/journeys/onboarding-aluno/`
- [ ] Implementar componentes DS: Stepper, ProgressBar, AvatarUpload
- [ ] Criar páginas no Studio: boas-vindas, perfil inicial, tutorial
- [ ] Documentar jornada no README

### E3 – domains/Game: Missões da Ilha 1
- **Descrição**: 
  - Páginas do Studio: mapa, missão ativa, conquistas
  - Componentes DS necessários: Card de missão, HUD simples, Modal de recompensa
- **Prioridade**: Não definida
- **Labels**: `epic`, `domain:Game`, `type:task`
- **Status**: Pendente

#### Subtarefas E3:
- [ ] Criar estrutura de jornada em `domains/Game/journeys/missoes-ilha-1/`
- [ ] Implementar componentes DS: Card de missão, HUD simples, Modal de recompensa
- [ ] Criar páginas no Studio: mapa, missão ativa, conquistas
- [ ] Documentar jornada no README

---

## Epic F – Tooling/Infra

### F1 – ESLint unificado ✅
- **Descrição**: ESLint config compartilhada + `eslint-plugin-react` + `eslint-plugin-storybook` aplicados a pacotes/apps
- **Prioridade**: **P0**
- **Labels**: `epic`, `priority:P0`, `type:task`, `tooling`
- **Status**: **CONCLUÍDO** ✅

### F2 – Prettier
- **Descrição**: Prettier + `.prettierrc` (opcional) e `format` scripts
- **Prioridade**: Não definida
- **Labels**: `type:task`, `tooling`
- **Status**: Pendente

### F3 – GitHub Actions CI
- **Descrição**: GitHub Actions: workflow de CI com cache pnpm e jobs de build (tokens, DS, Studio, Storybook)
- **Prioridade**: **P2**
- **Labels**: `priority:P2`, `type:task`, `tooling`
- **Status**: Pendente

### F4 – Husky + lint-staged
- **Descrição**: Husky + lint-staged (opcional) para garantir qualidade em commits
- **Prioridade**: Não definida
- **Labels**: `type:task`, `tooling`
- **Status**: Pendente

---

## Epic G – Governança e Manutenção

### G1 – Consolidar estrutura de domínios ✅
- **Descrição**: Consolidar estrutura de domínios em `domains/` (BackOffice, FrontOffice, Game)
- **Prioridade**: Concluída
- **Status**: **CONCLUÍDO**

### G2 – Template reutilizável de jornada ✅
- **Descrição**: Criar template reutilizável de jornada (`domains/template-jornada.md`)
- **Prioridade**: Concluída
- **Status**: **CONCLUÍDO**

### G3 – Documentar convenções ✅
- **Descrição**: Documentar convenções de nomenclatura e checklist de jornadas em `domains/README.md`
- **Prioridade**: Concluída
- **Status**: **CONCLUÍDO**

### G4 – Script gerador de índice de jornadas
- **Descrição**: Script para gerar índice automático de jornadas por domínio (`pnpm gen:jornadas`)
- **Prioridade**: **P1**
- **Labels**: `priority:P1`, `type:task`, `tooling`
- **Status**: Pendente
- **Dependência**: Estrutura final de domínios consolidada

### G5 – Validação de links em CI
- **Descrição**: Validação de links em CI (lint-md ou similar) para evitar links quebrados
- **Prioridade**: **P2**
- **Labels**: `priority:P2`, `type:task`, `tooling`
- **Status**: Pendente

### G6 – Guia de contribuição
- **Descrição**: Guia de contribuição (`CONTRIBUTING.md`) com workflow de criação de jornadas
- **Prioridade**: **P1**
- **Labels**: `priority:P1`, `documentation`
- **Status**: Pendente
- **Observação**: Depende de tokens/DS estabilizados e checklist de jornadas

---

## Epic H – Dashboard do Projeto

### H – Dashboard do Projeto: Epic
- **Descrição**: Planejar e implementar Dashboard do Projeto com métricas, links às páginas e link para Storybook
- **Prioridade**: **P1**
- **Labels**: `epic`, `priority:P1`, `type:task`
- **Status**: Pendente

### H1 – Planejar layout/Wireframe
- **Descrição**: Planejar wireframe e métricas do Dashboard
- **Prioridade**: **P1**
- **Labels**: `priority:P1`, `type:task`
- **Status**: Pendente

### H2 – Endpoint / API para index de páginas
- **Descrição**: Endpoint que retorna JSON com páginas, slug e metadata
- **Prioridade**: **P2**
- **Labels**: `priority:P2`, `type:task`
- **Status**: Pendente

### H3 – Implementar UI de listagem (POC)
- **Descrição**: UI mínima que consome o endpoint e lista as páginas
- **Prioridade**: **P2**
- **Labels**: `priority:P2`, `type:task`
- **Status**: Pendente

### H4 – Indicadores de saúde do repositório
- **Descrição**: Definir e exibir indicadores de saúde
- **Prioridade**: **P2**
- **Labels**: `priority:P2`, `type:task`
- **Status**: Pendente

### H5 – Link para Storybook e badge
- **Descrição**: Adicionar link e badge do Storybook no Dashboard e READMEs de domínio
- **Prioridade**: **P1**
- **Labels**: `priority:P1`, `type:task`
- **Status**: Pendente
- **Observação**: Aguarda build estática final do Storybook e redação nos READMEs

### H6 – Requisitos de segurança e visibilidade
- **Descrição**: Definir permissões e capture de visibilidade para usuários
- **Prioridade**: **P1**
- **Labels**: `priority:P1`, `type:task`
- **Status**: Pendente

---

## Próximos Passos Recomendados

### Sprint 1 (Prioridade P0)
1. **C1** - Studio: Persistência em disco (API)
2. **D1** - Storybook: Página de Tokens (visual)
3. **B1** - Design System: Componentes de formulário (Input/Select/Checkbox/Radio/Switch)
4. **E1** - domains/BackOffice: Revisão de Questões (Primeira Jornada)
5. **F1** - Tooling/Infra: ESLint unificado para monorepo

### Sprint 2 (Prioridade P1)
1. **C2** - Studio: Lista de páginas no sidebar
2. **B4** - Design System: Acessibilidade
3. **D2** - Storybook: Addon A11y e validações
4. **D3** - Storybook: Play functions
5. **G4** - Script: Gerar índice automático de jornadas
6. **G6** - DOCUMENTAÇÃO: Criar CONTRIBUTING.md

---

## Como Usar Este Documento

1. **Criar Issues no GitHub**: Use os scripts em `scripts/gh/` para automatizar a criação de issues
2. **Criar Project Board**: Execute `pnpm setup:gh:project` para criar o Kanban
3. **Adicionar Issues ao Board**: Execute `pnpm setup:gh:add-issues-to-project`
4. **Priorizar**: Comece pelas issues P0, depois P1, depois P2
5. **Atualizar Status**: Marque issues como concluídas no backlog.md quando finalizadas

---

**Comandos disponíveis**:
```bash
# Criar labels no GitHub
pnpm setup:gh:labels

# Criar issues no GitHub
pnpm setup:gh:issues

# Criar project board
pnpm setup:gh:project

# Adicionar issues ao project
pnpm setup:gh:add-issues-to-project
```

---

**Última atualização**: 2025-11-21
