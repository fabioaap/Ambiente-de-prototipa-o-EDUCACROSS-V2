# Studio - EDUCACROSS

Aplicação Next.js com Puck integrado para prototipação visual.

## Funcionalidades

- **Editor Visual**: Rota `/studio` com Puck para criar páginas visualmente
- **Dashboard**: Rota `/dashboard` com visão geral de KPIs, páginas e saúde do sistema
- **Renderização Dinâmica**: Todas as outras rotas renderizam páginas salvas em JSON
- **Componentes do Design System**: Integração completa com `@prototipo/design-system`

## Navegação

| Rota | Descrição |
|------|-----------|
| `/dashboard` | Dashboard com KPIs, métricas de saúde e páginas recentes |
| `/studio` | Editor visual Puck para criar/editar páginas |
| `/{slug}` | Renderiza a página com o slug correspondente |

## Dashboard

O Dashboard fornece uma visão centralizada do ambiente de prototipação:

- **KPIs Principais**: Total de páginas, domínios ativos, score de saúde, status geral
- **Saúde do Sistema**: Status de build, lint, type-check e dependências
- **Páginas por Domínio**: Contagem de páginas BackOffice, FrontOffice e Game
- **Páginas Recentes**: Lista das 5 últimas páginas modificadas

### Estados da UI

- **Loading**: Skeletons animados seguindo tokens do Design System
- **Erro**: Banner de erro com botão de retry
- **Sucesso**: Dados carregados com atualização automática a cada 30s

## API

### Dashboard Summary
```
GET /api/dashboard/summary
```

Retorna dados consolidados:
- Estatísticas de páginas (total, domínios)
- Métricas de saúde do sistema
- Lista de páginas recentes

### Health
```
GET /api/health
```

Retorna métricas de saúde do sistema (build, lint, type-check, dependências).

### Pages
```
GET /api/pages          # Lista todas as páginas
GET /api/pages/[slug]   # Busca página específica
POST /api/pages         # Cria nova página
PUT /api/pages/[slug]   # Atualiza página
DELETE /api/pages/[slug] # Remove página
```

## Como usar

1. Acesse `/dashboard` para ver a visão geral do sistema
2. Acesse `/studio` para abrir o editor visual
3. Arraste componentes da barra lateral para construir sua página
4. As páginas são salvas no diretório `data/pages/`
5. Acesse `/{slug}` para visualizar qualquer página criada

## Scripts

- `pnpm dev` - Inicia o servidor de desenvolvimento na porta 3000
- `pnpm build` - Cria build de produção
- `pnpm start` - Inicia o servidor de produção
- `pnpm lint` - Executa o linter

## Estrutura de Arquivos

```
src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx           # Página principal do Dashboard
│   │   ├── layout.tsx         # Layout com sidebar
│   │   └── dashboard.module.css
│   ├── studio/
│   │   └── page.tsx           # Editor Puck
│   ├── api/
│   │   ├── dashboard/
│   │   │   ├── summary/       # API consolidada
│   │   │   └── pages/         # API de páginas
│   │   ├── health/            # API de saúde
│   │   └── pages/             # CRUD de páginas
│   └── [[...slug]]/
│       └── page.tsx           # Renderização dinâmica
├── components/
│   ├── StudioLayout.tsx       # Layout com sidebar
│   └── PagesList.tsx          # Lista de páginas + navegação
├── hooks/
│   └── useDashboardSummary.ts # Hook SWR para dados do dashboard
└── lib/
    └── health-metrics.ts      # Funções de métricas de saúde
```
