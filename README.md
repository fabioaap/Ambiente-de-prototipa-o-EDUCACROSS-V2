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

Os componentes disponíveis no Puck são configurados em `apps/studio/src/config/puck.config.tsx`.

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
cd apps/studio
pnpm dev                  # Dev server
pnpm build                # Production build
pnpm start                # Start production
pnpm lint                 # Lint

# Storybook
cd apps/storybook
pnpm dev                  # Storybook dev
pnpm build                # Build estático
pnpm lint                 # Lint
```

## 🏗️ Arquitetura

### Monorepo (pnpm workspaces)

- **Vantagens**: Compartilhamento de código, versionamento unificado, builds otimizados
- **Configuração**: `pnpm-workspace.yaml`

### Apps

1. **Studio** (`apps/studio`)
   - Next.js 15 (App Router)
   - Puck OSS integrado
   - Renderização de páginas salvas

2. **Storybook** (`apps/storybook`)
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
apps/studio
  ├── @prototipo/design-system
  └── @prototipo/tokens

apps/storybook
  ├── @prototipo/design-system
  └── @prototipo/tokens

packages/design-system
  └── @prototipo/tokens
```

## 🎯 Fluxo de Trabalho Recomendado

1. **Criar/atualizar tokens** em `packages/tokens/src/tokens.json`
2. **Criar componentes** em `packages/design-system/src/components/`
3. **Documentar no Storybook** criando stories em `apps/storybook/src/stories/`
4. **Adicionar ao Puck** configurando em `apps/studio/src/config/puck.config.tsx`
5. **Criar protótipos** usando o editor visual em `/studio`
6. **Documentar jornadas** nas pastas de domínio (BackOffice, FrontOffice, Game)

## 📖 Documentação Adicional

- [Tokens README](./packages/tokens/README.md)
- [Design System README](./packages/design-system/README.md)
- [Studio README](./apps/studio/README.md)
- [Storybook README](./apps/storybook/README.md)
- [Documentação Central](./docs/README.md)
- [Backlog do Projeto](./docs/backlog.md)
- [Issues Pendentes](./docs/issues-pendentes.md) 🆕
- [Resumo de Issues Resolvidas](./docs/resumo-issues-resolvidas.md) 🆕
- [Domínios e Jornadas](./domains/README.md)
- [Automação GitHub](./scripts/gh/README.md) 🆕

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