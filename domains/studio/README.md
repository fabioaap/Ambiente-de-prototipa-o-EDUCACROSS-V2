# Studio - EDUCACROSS

Aplicação Next.js com Puck integrado para prototipação visual.

## Funcionalidades

- **Editor Visual**: Rota `/studio` com Puck para criar páginas visualmente
- **Dashboard**: Rota `/dashboard` com visão geral de KPIs, páginas e saúde do sistema
- **Renderização Dinâmica**: Todas as outras rotas renderizam páginas salvas em JSON
- **Componentes do Design System**: Integração completa com `@prototipo/design-system`
- **Dashboard API**: Endpoints para métricas de saúde e KPIs do sprint

> **Política de componentes**: Somente `domains/studio/src/app/studio` e `domains/studio/src/app/dashboard` podem importar `@/components/ui/*` (shadcn). Qualquer outra rota ou app deve usar apenas o Design System nativo.

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
- Estatísticas de páginas (total, domínios, última atualização)
- Distribuição de páginas por domínio
- KPIs e score de saúde
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

---

## Dashboard API

A Dashboard API fornece endpoints para monitoramento de métricas de saúde do sistema e KPIs do sprint.

### Endpoints

#### GET `/api/dashboard/summary`

Retorna resumo do dashboard com status geral e KPIs do sprint.

**Query Parameters:**

| Parâmetro    | Tipo    | Padrão | Descrição                         |
| ------------ | ------- | ------ | --------------------------------- |
| `includeKpis` | boolean | true   | Incluir lista de KPIs na resposta |

**Exemplo de requisição:**

```bash
# Com KPIs
curl http://localhost:3000/api/dashboard/summary

# Sem KPIs
curl "http://localhost:3000/api/dashboard/summary?includeKpis=false"
```

**Resposta de sucesso (200):**

```json
{
  "success": true,
  "data": {
    "status": "excellent",
    "kpis": [
      {
        "name": "Páginas Criadas",
        "value": 12,
        "unit": "pages",
        "trend": "up",
        "changePercent": 8.5
      }
    ],
    "healthScore": 100,
    "lastUpdated": "2025-11-24T10:30:00Z",
    "stats": {
      "totalPages": 24,
      "totalDomains": 3,
      "activeDomains": ["BackOffice", "FrontOffice", "Game"],
      "lastUpdated": "2025-11-24T10:30:00Z"
    },
    "domains": {
      "BackOffice": { "count": 10, "color": "#3b82f6" },
      "FrontOffice": { "count": 8, "color": "#10b981" },
      "Game": { "count": 6, "color": "#f59e0b" }
    },
    "health": {
      "buildStatus": "success",
      "lintStatus": "success",
      "typeCheckStatus": "success",
      "dependenciesHealth": "healthy",
      "healthScore": 100,
      "healthStatus": "excellent",
      "lastChecked": "2025-11-24T10:30:00Z"
    },
    "recentPages": [
      {
        "id": "dashboard-home",
        "slug": "dashboard/home",
        "name": "Dashboard Home",
        "domain": "BackOffice",
        "status": "draft",
        "editUrl": "/studio?slug=dashboard/home",
        "viewUrl": "/dashboard/home",
        "createdAt": "2025-11-23T08:45:00Z",
        "updatedAt": "2025-11-24T10:30:00Z"
      }
    ]
  },
  "timestamp": "2025-11-24T10:30:00Z"
}
```

#### GET `/api/dashboard/health`

Retorna métricas detalhadas de saúde do sistema.

**Exemplo de requisição:**

```bash
curl http://localhost:3000/api/dashboard/health
```

**Resposta de sucesso (200):**

```json
{
  "success": true,
  "data": {
    "buildStatus": "success",
    "lintStatus": "success",
    "typeCheckStatus": "success",
    "dependenciesHealth": "healthy",
    "healthScore": 100,
    "healthStatus": "excellent",
    "lastChecked": "2025-11-24T10:30:00Z"
  },
  "timestamp": "2025-11-24T10:30:00Z"
}
```

### Schema de Resposta de Erro

Todas as respostas de erro seguem o schema estruturado:

```json
{
  "success": false,
  "error": {
    "code": "DASHBOARD_INTERNAL_ERROR",
    "message": "Ocorreu um erro interno ao processar a requisição",
    "correlationId": "dash-abc123-xyz789"
  },
  "timestamp": "2025-11-24T10:30:00Z"
}
```

**Códigos de erro:**

| Código                        | Status | Descrição                              |
| ----------------------------- | ------ | -------------------------------------- |
| `DASHBOARD_INTERNAL_ERROR`    | 500    | Erro interno do servidor               |
| `DASHBOARD_INVALID_REQUEST`   | 400    | Requisição inválida                    |
| `DASHBOARD_METRICS_UNAVAILABLE` | 503    | Métricas temporariamente indisponíveis |

### Tipos TypeScript

Os tipos da API estão disponíveis em `src/lib/types/dashboard.ts`:

```typescript
import type {
  DashboardSummaryResponse,
  DashboardHealthResponse,
  DashboardErrorResponse,
  DashboardKPI,
} from '@/lib/types/dashboard';
```

### Testando com Postman

1. Importe a coleção com os endpoints acima
2. Configure a variável de ambiente `baseUrl` para `http://localhost:3000`
3. Execute as requisições GET para validar as respostas

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
