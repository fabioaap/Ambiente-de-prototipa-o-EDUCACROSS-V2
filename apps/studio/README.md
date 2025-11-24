# Studio - EDUCACROSS

Aplicação Next.js com Puck integrado para prototipação visual.

## Funcionalidades

- **Editor Visual**: Rota `/studio` com Puck para criar páginas visualmente
- **Renderização Dinâmica**: Todas as outras rotas renderizam páginas salvas em JSON
- **Componentes do Design System**: Integração completa com `@prototipo/design-system`
- **Dashboard API**: Endpoints para métricas de saúde e KPIs do sprint

## Como usar

1. Acesse `/studio` para abrir o editor visual
2. Arraste componentes da barra lateral para construir sua página
3. As páginas são salvas automaticamente no `localStorage`
4. Para salvar permanentemente, implemente integração com backend

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
      },
      {
        "name": "Componentes Ativos",
        "value": 24,
        "unit": "components",
        "trend": "stable",
        "changePercent": 0
      }
    ],
    "healthScore": 100,
    "lastUpdated": "2025-11-24T10:30:00Z"
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
