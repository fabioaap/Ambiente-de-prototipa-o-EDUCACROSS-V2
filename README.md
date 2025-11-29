# EDUCACROSS - Ambiente de Prototipação

[![Version](https://img.shields.io/badge/version-0.2.0--beta-blue)](https://github.com/educacross/prototipacao)
[![Storybook](https://img.shields.io/badge/Storybook-8-FF4785?logo=storybook)](https://educacross-storybook.vercel.app)
[![Design System](https://img.shields.io/badge/Design%20System-Live-blueviolet)](https://educacross-storybook.vercel.app)
[![Node](https://img.shields.io/badge/Node-22%20LTS-green?logo=node.js)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.14-F69220?logo=pnpm)](https://pnpm.io/)

Repositório de prototipação frontend orientado a jornadas, utilizando React, Puck OSS e Storybook.

## 🌐 Ambientes Disponíveis

### Produção

- **🎨 Studio:** [educacross-studio.vercel.app](https://educacross-studio.vercel.app)
- **📚 Storybook:** [educacross-storybook.vercel.app](https://educacross-storybook.vercel.app)

### Staging (v0.2-beta)

- **🎨 Studio Staging:** [educacross-studio-staging.vercel.app](https://educacross-studio-staging.vercel.app)
- **📚 Storybook Staging:** [educacross-storybook-staging.vercel.app](https://educacross-storybook-staging.vercel.app)

## 🎯 Visão Geral

Este é um ambiente de **prototipação**, não um repositório de produção. Tudo o que é criado aqui deve rodar sem erros (build e dev) para ser usado por designers, PMs e desenvolvedores.

### Stack Principal

- **React 18** - Biblioteca base de componentes
- **Puck OSS** - Page builder visual para prototipagem
- **Storybook 8** - Catálogo de componentes
- **Next.js 15** - Framework para o Studio
- **TypeScript 5** - Type safety
- **pnpm** - Gerenciador de pacotes
- **Node 22 LTS** - Runtime

## 📁 Estrutura do Repositório

```
.
├── domains/                 # Domínios com jornadas (BackOffice, FrontOffice, Game)
│   ├── README.md            # Documentação centralizada dos domínios
│   ├── BackOffice/
│   │   ├── README.md
│   │   └── journeys/        # Jornadas de prototipagem BackOffice
│   ├── FrontOffice/
│   │   ├── README.md
│   │   └── journeys/        # Jornadas de prototipagem FrontOffice
│   └── Game/
│       ├── README.md
│       └── journeys/        # Jornadas de prototipagem Game
├── docs/                    # Documentação do projeto
│   ├── README.md
│   └── backlog.md           # Backlog e roadmap
├── apps/
│   ├── studio/              # App Next.js com Puck (editor visual)
│   └── storybook/           # Catálogo de componentes
├── packages/
│   ├── design-system/       # Biblioteca de componentes React
│   └── tokens/              # Design tokens (cores, tipografia, etc)
├── .nvmrc                   # Versão do Node (v22.21.1)
├── package.json             # Scripts raiz e configuração
└── pnpm-workspace.yaml      # Configuração do monorepo
```

## 🎨 Design System

### Componentes Disponíveis (25 total)

O Design System EDUCACROSS fornece 25 componentes prontos para uso, organizados em 4 categorias:

#### Core Components (9)
- **Button**: Botões com 4 variantes (primary, secondary, outline, ghost) e 3 tamanhos
- **Text**: Tipografia com 9 tamanhos, 4 pesos e 7 cores
- **Card**: Container com sub-componentes (CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- **Layout**: Container responsivo com 6 larguras máximas
- **Input**: Campo de texto com label e estados de erro
- **Select**: Dropdown com options e placeholder
- **Checkbox**: Seleção múltipla com label
- **Radio**: Seleção única com label
- **Switch**: Toggle on/off com label

#### Feedback & Indicators (4)
- **Badge**: Labels com 5 variantes (default, primary, secondary, success, warning, error) e 2 tamanhos
- **Progress**: Barra de progresso com % e cores customizáveis
- **Leaderboard**: Ranking com avatar, nome, pontos e posição
- **HealthIndicator**: Status com ícone, label e cor (healthy, warning, critical)

#### Loading States (2)
- **Skeleton**: Placeholders de carregamento (text, circle, rectangle, card)
- **Table**: Tabela com sorting, paginação e custom renderers

#### BackOffice Suite (10) ✨ NEW in v0.3.0
- **Sidebar**: Menu lateral colapsável para navegação
- **Breadcrumb**: Navegação hierárquica (Home > Page > Subpage)
- **Tabs**: Abas com contador opcional (badge)
- **PageHeader**: Cabeçalho com título, contador e subtítulo
- **ToolbarButtons**: Botões de ação em grupo (Import/Export)
- **ActionButtons**: Ações inline (View/Edit/Delete) com ícones
- **Pagination**: Navegação entre páginas com range configurável
- **DataTable**: Tabela avançada com striped, hover, sorting e custom cells
- **FilterGroup**: Grupo de filtros em layouts horizontal, vertical ou grid
- **Modal**: Diálogo modal com 3 tamanhos (small, medium, large)

### Como Usar

```typescript
import {
  // Core
  Button, Card, Input, Badge,
  // BackOffice
  Sidebar, DataTable, Pagination, FilterGroup
} from '@prototipo/design-system';

export function MyPage() {
  return (
    <div>
      <Sidebar items={menuItems} />
      <PageHeader title="Minha Página" count={10} />
      <DataTable columns={columns} data={data} striped hoverable />
      <Pagination currentPage={1} totalPages={5} onChange={handlePage} />
    </div>
  );
}
```

### Design Tokens

Todos os componentes utilizam tokens do Figma (tema Vuexy):
- **Colors**: Primary (#7367f0 purple), neutral, success, warning, error scales
- **Spacing**: Base 4px (var(--spacing-1) a var(--spacing-10))
- **Typography**: Inter font, 9 tamanhos, 4 pesos
- **Border Radius**: 4px (sm), 6px (md), 8px (lg)
- **Shadows**: 3 níveis (sm, md, lg)

### Storybook

Todos os componentes estão documentados no Storybook com exemplos interativos:
- **Local**: `pnpm dev:storybook` → http://localhost:6006
- **Produção**: [educacross-storybook.vercel.app](https://educacross-storybook.vercel.app)

### Página de Referência

**Banco de Questões** (`/backoffice/banco-questoes`): Implementação completa que demonstra todos os componentes BackOffice em contexto real. Use como template para novas páginas.

## 🎨 Política de Componentes

- **Shadcn UI** é restrito às rotas do Studio (`/studio`) e do Dashboard (`/dashboard`) dentro de `domains/studio/src/app`. Essas telas exigem microinterações avançadas e podem importar de `@/components/ui/*`.
- **Domains, docs e demais apps** devem utilizar apenas o Design System nativo exportado por `@prototipo/design-system` (ou HTML sem dependências externas). Isso mantém as jornadas documentadas estáveis e fáceis de sincronizar com Storybook/Figma.
- O script `pnpm check:shadcn` falha o build caso seja detectado um import de `@/components/ui` fora dos diretórios permitidos. Execute-o localmente antes de abrir PRs para evitar regressões.

## 🔵 Sprint 2 – Execução & PRs

**Status**: ✅ Validado e pronto para merge (2025-11-22)

### Artefatos de Execução [A] [B] [C]

| Artefato                  | Arquivo                                                        | Status          |
| ------------------------- | -------------------------------------------------------------- | --------------- |
| **[A] Review Checklists** | Comentários em PRs #42, #40, #38, #35, #36                     | ✅ 5/5 postadas |
| **[B] PR Tracking**       | [docs/sprint-2-prs.md](docs/sprint-2-prs.md)                   | ✅ Criada       |
| **[C] Build Report**      | [docs/sprint-2-build-report.md](docs/sprint-2-build-report.md) | ✅ Validado     |

### Quick Navigation

- 📋 **Plano Completo**: [RUN_SPRINT2.md](RUN_SPRINT2.md) – Guia principal com 5 issues
- 📊 **Status Dashboard**: [docs/sprint-2-status.md](docs/sprint-2-status.md) – Timeline e métricas
- 📝 **Referência Rápida**: [SPRINT2_ARTIFACTS_REFERENCE.md](SPRINT2_ARTIFACTS_REFERENCE.md) – Links e checklists
- 🤖 **AI Agent Guide**: [.github/copilot-instructions.md](.github/copilot-instructions.md) – Contexto Sprint 2
- 🔄 **CI/CD Automation**: [.github/workflows/sprint-2-validation.yml](.github/workflows/sprint-2-validation.yml) – GitHub Actions

### PRs P1 em Review (Ordem de Merge Recomendada)

1. **#40** (G6) – [CONTRIBUTING.md](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/40)
2. **#42** (C2) – [Dynamic Page Navigation](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/42) ⭐ Critical Path
3. **#38** (G4) – [Automatic Journey Index](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/38)
4. **#35** (B4) – [Accessibility Improvements](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/35)
5. **#36** (D2) – [Storybook A11y Addon](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/36)

---

## 🟢 Sprint 3 – Dashboard & Game Hub

**Status**: 🟢 60% Completo (6/9 issues principais fechadas) | Fase 2 ✅ completa, Fase 3 pronta (2025-11-25)

### Experience Hub – Consolidação Storybook ✅ NOVO

**Phase 2 Concluída** (2025-11-25):
- ✅ Migração de `domains/storybook` → `domains/storybook` completa
- ✅ Workspace reconfigurado (7 projetos)
- ✅ Scripts `pnpm dev:hub`, `pnpm build:hub` operacionais
- ✅ Guardrails Shadcn validados
- 📋 Documentação: [PHASE2_COMPLETION_REPORT.md](./PHASE2_COMPLETION_REPORT.md)
- 📋 Próximos passos: [PHASE3_EXECUTION_PLAN.md](./PHASE3_EXECUTION_PLAN.md)

**Quick Commands**:
```bash
pnpm dev:hub           # Storybook em http://localhost:6006
pnpm build:hub         # Build da hub
pnpm check:shadcn      # Validar guardrails
```

**Estrutura**:
```
apps/experience-hub/
├── storybook/         # Storybook 8 (ESM)
│   ├── .storybook/
│   ├── src/stories/
│   └── package.json
└── README.md          # Documentação
```

### Progresso Geral

| Fase | Issues | Status | PRs |
|------|--------|--------|-----|
| ✅ Fase 1 | #59 (Puck Refactor) | FECHADA | [#76](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/76) |
| ✅ Fase 2 | #56, #57, #60, #61 (Jornadas + Componentes) | FECHADAS | [#78](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/78) |
| 🟡 Fase 3 | #53, #54, #55, #58 (Dashboard + Game) | PRONTAS | ⏳ Em execução |
| 🔲 Fase 4 | #4, #11, #13, #14, #15 (Legacy closure) | AGENDADAS | ⏳ Após Fase 3 |

### Issues Restantes – Pronta para Copiar & Colar

🚀 **[FASE3_PROMPTS_EXECUCAO.md](./FASE3_PROMPTS_EXECUCAO.md)** ⭐

Este é o documento principal para executar as 4 issues restantes. Contém:
- 4 prompts prontos para copiar e colar no Copilot
- Instruções detalhadas de dependências
- Checklists de validação
- Sequência recomendada (sequencial ou paralela)

### Quick Links – Sprint 3

| Documento | Propósito |
|-----------|-----------|
| [FASE3_PROMPTS_EXECUCAO.md](./FASE3_PROMPTS_EXECUCAO.md) ⭐ | **Prompts prontos para copiar (#53, #54, #55, #58)** |
| [SPRINT3_DOCUMENTATION_INDEX.md](./SPRINT3_DOCUMENTATION_INDEX.md) | Índice central e navegação |
| [SPRINT3_EXECUTION_DETAILED.md](./SPRINT3_EXECUTION_DETAILED.md) | Especificações técnicas detalhadas |
| [docs/SPRINT3_EXECUTION_MASTER.md](./docs/SPRINT3_EXECUTION_MASTER.md) | Algoritmo de seleção + status table |
| [docs/puck-zones-implementation.md](./docs/puck-zones-implementation.md) | Referência técnica: DropZone pattern |

### Como Começar Fase 3

1. Abra [FASE3_PROMPTS_EXECUCAO.md](./FASE3_PROMPTS_EXECUCAO.md)
2. Copie o **PROMPT A** (issue #53 – Dashboard API)
3. Cole no Copilot com modo `Fullstack_programmer`
4. Siga as instruções detalhadas
5. Após #53 pronta, copie **PROMPT B** ou **PROMPT C** (paralelo)
6. Respite até tudo estar pronto

**Tempo Total**: ~11.5h (pode ser paralelo em 2 agentes ~6h)

### Grafo de Dependências (Fase 3)

```
INICIAR AGORA (sem blockers):
  ├─ #53 (Dashboard API — 3h)
  │   └─→ #54 (Dashboard UI — 3h)
  │       └─→ #55 (Health Metrics — 2h)
  │
  └─ #58 (Game Hub — 3h) [paralelo]

Sequência recomendada:
  1. Inicie #53
  2. Quando #53 ok, inicie #54 + #58 (paralelo)
  3. Quando #54 ok, inicie #55
  4. Validar tudo + fechar legacy issues
```

---

## 🚀 Getting Started

### Pré-requisitos

- Node.js 22 LTS (use `nvm use` para garantir a versão correta)
- pnpm 8+ (`npm install -g pnpm`)

### Instalação

```bash
# Instalar todas as dependências do monorepo
pnpm install
```

### Desenvolvimento

```bash
# Iniciar o Studio (editor visual com Puck)
pnpm dev:studio
# Acesse: http://localhost:3000

# Iniciar o Storybook (catálogo de componentes)
pnpm dev:storybook
# Acesse: http://localhost:6006

# Build de tudo
pnpm build

# Build individual
pnpm build:tokens
pnpm build:design-system
pnpm build:studio
pnpm build:storybook

# Lint (verificar código)
pnpm lint

# Lint em um pacote específico
pnpm --filter @prototipo/design-system lint
```

## 🔍 Qualidade de Código

O projeto utiliza **ESLint** com configuração unificada para garantir consistência.

- ✅ Configuração compartilhada `@prototipo/eslint-config`
- ✅ Suporte completo a TypeScript e React
- ✅ Variantes para Next.js e Storybook
- ✅ Integração com editores (VS Code, WebStorm)

**Documentação completa:** [`docs/eslint.md`](./docs/eslint.md)

```bash
# Executar lint em todos os pacotes
pnpm lint
```

## 🎨 Design System

### Tokens (`packages/tokens`)

Contém todos os design tokens do sistema:

- Cores (primary, secondary, neutral, success, warning, error)
- Tipografia (font families, sizes, weights)
- Espaçamentos
- Border radius
- Shadows
- Breakpoints

Os tokens são exportados em:

- **CSS variables** (`tokens.css`)
- **JavaScript/TypeScript** (ESM e CommonJS)

### Componentes (`packages/design-system`)

Biblioteca de componentes React reutilizáveis:

**Componentes Base:**

- **Button** - Botões com variantes (primary, secondary, outline, ghost)
- **Text** - Tipografia com controle completo
- **Card** - Containers com diferentes estilos
- **Layout** - Sistema de layout responsivo

**Componentes de Formulário:** 🆕

- **Input** - Text, email, password, number, etc.
- **Select** - Dropdown com options e optgroups
- **Checkbox** - Checkbox com label e estados
- **Radio** - Radio buttons para grupos de opções
- **Switch** - Toggle switch animado

Todos os componentes:

- Consomem tokens do `@prototipo/tokens`
- São documentados no Storybook
- Incluem acessibilidade (ARIA, keyboard navigation)
- Estão disponíveis no Puck para prototipagem

## 🎬 Studio (Puck)

O Studio é um app Next.js que integra o Puck OSS como editor visual.

### Funcionalidades

- **Editor Visual** (`/studio`): Arraste e solte componentes para criar páginas
- **Renderização Dinâmica**: Páginas criadas são renderizadas em rotas dinâmicas
- **Salvamento Local**: Páginas são salvas no `localStorage` (pode ser estendido para backend)

### Configuração de Componentes

Os componentes disponíveis no Puck são configurados em `domains/studio/src/config/puck.config.tsx`.

Para adicionar um novo componente:

1. Crie o componente no `packages/design-system`
2. Adicione a configuração no `puck.config.tsx`
3. O componente estará disponível no editor

## 📚 Storybook

Catálogo interativo de todos os componentes do Design System.

### Acessar

```bash
pnpm dev:storybook
```

Visite: http://localhost:6006

**🎨 [Abrir Storybook ao Vivo →](https://educacross-storybook.vercel.app)**

### Stories Disponíveis

- `Button` - Todas as variantes e tamanhos
- `Text` - Tipografia e cores
- `Card` - Containers e layouts
- `Layout` - Sistema de grid responsivo
- **`Design System/Tokens`** 🆕 - Visualização interativa de todos os tokens

## 📝 Organização por Jornadas

As pastas dentro de `domains/` (BackOffice, FrontOffice, Game) são organizadas por **jornadas de prototipagem**.

Cada domínio contém:

- **README.md**: Visão geral do domínio e objetivos
- **journeys/**: Diretório com as jornadas documentadas

### Estrutura de uma Jornada

```
domains/BackOffice/journeys/nome-da-jornada/
  README.md           # Objetivo, contexto, links para protótipos
  notas.md            # Decisões de design/UX
  diagramas/          # Fluxos, wireframes
  referencias/        # Screenshots, links, imagens
```

### Como Documentar uma Jornada

1. **Crie a pasta da jornada** dentro de `domains/{domínio}/journeys/`
2. **README.md** deve incluir:
   - Objetivo da jornada
   - Contexto de negócio
   - Links para páginas no Studio
   - Componentes do Storybook utilizados
   - Status (em andamento, concluído, etc)
3. **notas.md** para decisões e alternativas consideradas
4. **diagramas/** para fluxogramas e wireframes
5. **referencias/** para materiais de apoio

**Mais detalhes**: Ver `domains/README.md` para convenções e templates.

## 🔧 Scripts Disponíveis

### Raiz do Projeto

```bash
pnpm dev:studio           # Inicia o Studio (Next.js + Puck)
pnpm dev:storybook        # Inicia o Storybook
pnpm build                # Build completo de tudo
pnpm build:tokens         # Build apenas dos tokens
pnpm build:design-system  # Build apenas do design system
pnpm build:studio         # Build apenas do Studio
pnpm build:storybook      # Build apenas do Storybook
pnpm lint                 # Executa lint em todos os pacotes
pnpm test                 # Executa testes em todos os pacotes
pnpm clean                # Remove node_modules e builds
```

### Automação GitHub 🆕

```bash
# Configuração completa automatizada (recomendado)
pnpm setup:gh:full

# Ou passo a passo:
pnpm setup:gh:labels                # Criar labels padrão
pnpm setup:gh:issues:all            # Criar todas as 37 issues
pnpm setup:gh:project               # Criar project board
pnpm setup:gh:add-issues-to-project # Adicionar issues ao board
```

**Pré-requisito**: `gh auth login` (GitHub CLI autenticado)

Veja mais detalhes em [`scripts/gh/README.md`](./scripts/gh/README.md)

## 🧭 Mapa de stack com Specfy

Utilizamos o **Specfy Stack Analyser** para gerar um inventário automático das linguagens, dependências e serviços identificados no repositório.

```bash
pnpm specfy
```

O comando acima executa o analisador via CLI e salva o resultado em `docs/specfy-stack.json`, que pode ser usado em documentos de discovery, arquitetura e auditorias técnicas.

### Pacotes Individuais

```bash
# Tokens
cd packages/tokens
pnpm build                # Gera CSS e JS
pnpm dev                  # Watch mode

# Design System
cd packages/design-system
pnpm build                # Compila componentes
pnpm dev                  # Watch mode
pnpm lint                 # Lint
pnpm type-check           # Verificação de tipos

# Studio
cd domains/studio
pnpm dev                  # Dev server
pnpm build                # Production build
pnpm start                # Start production
pnpm lint                 # Lint

# Storybook
cd domains/storybook
pnpm dev                  # Storybook dev
pnpm build                # Build estático
pnpm lint                 # Lint
```

## 🏗️ Arquitetura

### Monorepo (pnpm workspaces)

- **Vantagens**: Compartilhamento de código, versionamento unificado, builds otimizados
- **Configuração**: `pnpm-workspace.yaml`

### Apps

1. **Studio** (`domains/studio`)
   - Next.js 15 (App Router)
   - Puck OSS integrado
   - Renderização de páginas salvas

2. **Storybook** (`domains/storybook`)
   - Storybook 8 (ESM-only)
   - Documentação interativa
   - Playground de componentes

### Pacotes

1. **Tokens** (`packages/tokens`)
   - Design tokens em JSON
   - Build para CSS variables e JS/TS

2. **Design System** (`packages/design-system`)
   - Componentes React
   - TypeScript + CSS Modules
   - Depende de `@prototipo/tokens`

### Dependências

```
domains/studio
  ├── @prototipo/design-system
  └── @prototipo/tokens

domains/storybook
  ├── @prototipo/design-system
  └── @prototipo/tokens

packages/design-system
  └── @prototipo/tokens
```

## 🎯 Fluxo de Trabalho Recomendado

1. **Criar/atualizar tokens** em `packages/tokens/src/tokens.json`
2. **Criar componentes** em `packages/design-system/src/components/`
3. **Documentar no Storybook** criando stories em `domains/storybook/src/stories/`
4. **Adicionar ao Puck** configurando em `domains/studio/src/config/puck.config.tsx`
5. **Criar protótipos** usando o editor visual em `/studio`
6. **Documentar jornadas** nas pastas de domínio (BackOffice, FrontOffice, Game)

## 📖 Documentação Adicional

### Geral

- [Tokens README](./packages/tokens/README.md)
- [Design System README](./packages/design-system/README.md)
- [Studio README](./domains/studio/README.md)
- [Storybook README](./domains/storybook/README.md)
- [Documentação Central](./docs/README.md)
- [Backlog do Projeto](./docs/backlog.md)
- [Issues Pendentes](./docs/issues-pendentes.md) 🆕
- [Resumo de Issues Resolvidas](./docs/resumo-issues-resolvidas.md) 🆕
- [Domínios e Jornadas](./domains/README.md)
- [Automação GitHub](./scripts/gh/README.md) 🆕

### Sprint 2

- [Guia Principal Sprint 2](./RUN_SPRINT2.md)
- [Quick Start Sprint 2](./SPRINT2_QUICK_START.md)
- [Status Sprint 2](./SPRINT2_STATUS.md)

### Sprint 3 🆕

- [📚 Índice de Documentação Sprint 3](./SPRINT3_DOCUMENTATION_INDEX.md) ⭐ - **Comece aqui**
- [Execução Detalhada Sprint 3](./SPRINT3_EXECUTION_DETAILED.md) - Prompts prontos
- [Quick Start Sprint 3](./SPRINT3_QUICK_START.md)
- [Status Final Sprint 3](./SPRINT3_FINAL_STATUS.md)
- [Checkpoint Sprint 3](./SPRINT3_CHECKPOINT.md)

## 🐛 Troubleshooting

### Erro de versão do Node

```bash
nvm use
# ou
nvm install 22.21.1
nvm use 22.21.1
```

### Dependências desatualizadas

```bash
pnpm clean
pnpm install
```

### Build falhando

```bash
# Rebuild tudo do zero
pnpm clean
pnpm install
pnpm build
```

### Storybook não carrega componentes

```bash
# Rebuild o design system primeiro
pnpm build:tokens
pnpm build:design-system
pnpm dev:storybook
```

## 📦 Política de Versões

- Sempre usar versões **estáveis mais recentes**
- Node: LTS atual (v22.x)
- React: Estável mais recente (v18.x)
- Next.js: Estável mais recente (v15.x)
- Storybook: Estável mais recente (v8.x)
- Puck: Estável mais recente (v0.16.x)

## 🤝 Contribuindo

Este é um ambiente de prototipação. Para adicionar novos protótipos:

1. Crie ou atualize componentes no Design System
2. Documente no Storybook
3. Configure no Puck (se necessário)
4. Crie a jornada na pasta de domínio apropriada
5. Documente no README da jornada

## 🚀 Deploy

Para instruções completas sobre deploy, veja [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Start - Deploy para Staging

```bash
# Atualizar versão (já feito para v0.2.0-beta)
# Commit suas alterações
git add .
git commit -m "feat: sua feature"

# Push para staging
git push origin copilot/deploy-v02-beta-to-staging-again
```

Deploy automático via GitHub Actions + Vercel Git Integration.

## 📄 Licença

Este é um repositório interno de prototipação para EDUCACROSS.

---

**Última atualização**: Novembro 2025  
**Node Version**: v22.21.1  
**Versão do repositório**: 0.2.0-beta
