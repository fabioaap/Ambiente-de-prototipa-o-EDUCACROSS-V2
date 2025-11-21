# Dashboard do Projeto

O Dashboard é a **porta de entrada** do ambiente de prototipação EDUCACROSS, fornecendo uma visão geral completa de todas as páginas prototipadas, métricas de saúde e acesso rápido às ferramentas principais.

## 🎯 Objetivo

Centralizar o acesso a todas as funcionalidades do ambiente de prototipação:
- Visualizar e gerenciar páginas prototipadas
- Filtrar páginas por domínio (BackOffice, FrontOffice, Game)
- Buscar páginas específicas
- Acessar métricas de saúde do repositório
- Navegar rapidamente para Storybook e Studio

## 📍 Acesso

- **Rota**: `/dashboard`
- **Ambiente Local**: http://localhost:3000/dashboard
- **Produção**: https://educacross-studio.vercel.app/dashboard

## 🎨 Funcionalidades

### 1. Listagem de Páginas

O dashboard exibe todas as páginas prototipadas organizadas por domínio:
- **BackOffice**: Páginas administrativas e de gestão
- **FrontOffice**: Páginas voltadas para alunos e usuários finais
- **Game**: Páginas relacionadas à gamificação

Cada card de página mostra:
- Nome e descrição
- Slug da página
- Botões para editar (abre no Studio) e visualizar

### 2. Busca e Filtros

**Busca por texto:**
- Busca em tempo real nos nomes e slugs das páginas
- Campo de busca com placeholder "🔍 Buscar página..."

**Filtros por domínio:**
- Botões para filtrar por domínio específico
- Contador de páginas por domínio
- Indicador visual com cores por domínio:
  - BackOffice: Azul (#3b82f6)
  - FrontOffice: Verde (#10b981)
  - Game: Âmbar (#f59e0b)

### 3. Métricas do Repositório

Footer com indicadores-chave:
- **Total de Páginas**: Contador de todas as páginas prototipadas
- **Domínios Ativos**: Quantos domínios possuem páginas
- **Build Status**: Status do último build (✅ success / ⏳ building / ❌ failed)
- **Storybook**: Status do Storybook (✅ online / ⏳ building / ❌ offline)
- **Última Atualização**: Timestamp da última modificação

### 4. Navegação Rápida

**Header do Dashboard:**
- **📚 Abrir Storybook**: Link direto para o catálogo de componentes
- **✏️ Criar Nova Página**: Abre o Studio para criar uma nova página

## 🔌 API

O Dashboard consome o endpoint `/api/dashboard/pages` que retorna:

```typescript
interface DashboardResponse {
  pages: PageData[];
  stats: {
    totalPages: number;
    totalDomains: number;
    activeDomains: string[];
    lastUpdated: string;
    buildStatus: 'success' | 'building' | 'failed';
    storybook: 'online' | 'building' | 'offline';
  };
  domains: Record<string, { count: number; color: string }>;
}
```

## 🏗️ Arquitetura

### Estrutura de Arquivos

```
apps/studio/src/app/
├── dashboard/
│   └── page.tsx              # Página principal do Dashboard
├── api/
│   └── dashboard/
│       └── pages/
│           └── route.ts      # Endpoint da API
└── page.tsx                  # Homepage com link para Dashboard
```

### Componentes Utilizados

O Dashboard utiliza componentes do Design System:
- **Layout**: Container principal responsivo
- **Text**: Tipografia consistente
- **Button**: Botões de ação e filtros
- **Card**: Cards para páginas e métricas
- **Input**: Campo de busca

### Estado e Dados

- **Estado local** com `useState`:
  - `data`: Dados carregados da API
  - `loading`: Estado de carregamento
  - `error`: Mensagens de erro
  - `searchQuery`: Termo de busca
  - `selectedDomain`: Domínio selecionado para filtro

- **Efeito** com `useEffect`: Carrega dados da API ao montar o componente

- **Computação derivada**: Filtra páginas com base em busca e domínio

## 🎯 Fluxos de Uso

### Fluxo 1: Visualizar Páginas por Domínio
1. Usuário acessa `/dashboard`
2. Páginas são carregadas e agrupadas por domínio
3. Usuário clica em um filtro de domínio (ex: "BackOffice")
4. Lista é filtrada mostrando apenas páginas daquele domínio

### Fluxo 2: Buscar Página Específica
1. Usuário digita no campo de busca
2. Lista é filtrada em tempo real
3. Resultados são agrupados por domínio

### Fluxo 3: Editar Página
1. Usuário encontra a página desejada
2. Clica em "✏️ Editar"
3. É redirecionado para o Studio com a página carregada

### Fluxo 4: Visualizar Página
1. Usuário encontra a página desejada
2. Clica em "👁️ Visualizar"
3. É redirecionado para a rota de visualização da página

## 🔄 Futuras Melhorias

### Curto Prazo
- [ ] Adicionar ordenação (por nome, data de atualização)
- [ ] Implementar paginação para muitas páginas
- [ ] Adicionar thumbnails/screenshots das páginas

### Médio Prazo
- [ ] Filtros avançados (status, tags, autor)
- [ ] Busca com destaque de termos
- [ ] Modo de visualização (grid/lista)
- [ ] Exportar lista de páginas (CSV/JSON)

### Longo Prazo
- [ ] Dashboard personalizável por usuário
- [ ] Métricas de uso e popularidade
- [ ] Integração com analytics
- [ ] Histórico de versões das páginas

## 📝 Manutenção

### Adicionar Nova Página ao Dashboard

As páginas são automaticamente detectadas pelo endpoint da API ao escanear o diretório `apps/studio/data/pages/`. Nenhuma configuração manual é necessária.

### Atualizar Cores dos Domínios

Editar as cores em dois lugares:

**1. API Endpoint** (`apps/studio/src/app/api/dashboard/pages/route.ts`):
```typescript
const DOMAIN_COLORS: Record<string, string> = {
  BackOffice: '#3b82f6',
  FrontOffice: '#10b981',
  Game: '#f59e0b',
  Other: '#6b7280',
};
```

**2. Dashboard Page** (`apps/studio/src/app/dashboard/page.tsx`):
```typescript
const DOMAIN_LABELS: Record<string, string> = {
  BackOffice: 'Back Office',
  FrontOffice: 'Front Office',
  Game: 'Game',
  Other: 'Outros',
};
```

## 🐛 Troubleshooting

### Dashboard não carrega páginas
- Verificar se o endpoint `/api/dashboard/pages` está respondendo
- Verificar se há páginas em `apps/studio/data/pages/`
- Conferir logs do servidor no terminal

### Páginas não aparecem por domínio
- Verificar se o slug da página começa com o domínio correto:
  - `backoffice/*` → BackOffice
  - `frontoffice/*` → FrontOffice
  - `game/*` → Game
  - Outros → Other

### Busca não funciona
- Limpar cache do navegador
- Verificar se há erros no console do navegador
- Testar com diferentes termos de busca

## 📚 Referências

- [Wireframe do Dashboard](./dashboard-wireframe.md)
- [API de Páginas](../apps/studio/src/app/api/pages/README.md)
- [Design System](../packages/design-system/README.md)
- [Backlog do Projeto](./backlog.md)

---

**Implementado em**: Novembro 2025  
**Versão**: 0.2.0-beta  
**Epic**: H - Dashboard do Projeto
