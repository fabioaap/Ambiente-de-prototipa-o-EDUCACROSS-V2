# Health Metrics Widgets - Documentação

## Visão Geral

Os Health Metrics Widgets fornecem visualização de KPIs de saúde do sistema no Dashboard, incluindo:
- **Uptime**: Disponibilidade do sistema
- **Latência**: Tempo de resposta médio
- **Taxa de Erro**: Porcentagem de requisições com erro

## Arquitetura

### Componentes

```
apps/studio/src/
├── components/widgets/
│   ├── HealthMetricsWidgets.tsx     # Componentes de widget KPI e painel
│   └── HealthMetricsWidgets.module.css
├── lib/
│   ├── metrics-formatter.ts         # Utilitários de formatação
│   ├── metrics-export.ts            # Hook de exportação JSON/CSV
│   └── use-health-metrics.ts        # Hook para buscar métricas
└── app/api/health/metrics/route.ts  # API de métricas expandidas
```

### Fluxo de Dados

```
API (/api/health/metrics)
         │
         ▼
useHealthMetrics (hook)
         │
         ▼
processMetric (formatters)
         │
         ▼
HealthMetricsPanel (component)
         │
         ▼
KPIWidget (individual cards)
```

## Configuração de Thresholds

Os thresholds determinam o status (success/warning/error) de cada métrica:

| Métrica | Success | Warning | Error |
|---------|---------|---------|-------|
| Uptime | ≥ 99.5% | ≥ 95% | < 95% |
| Latência | < 200ms | < 500ms | ≥ 500ms |
| Error Rate | < 1% | < 5% | ≥ 5% |

Para customizar thresholds, edite `DEFAULT_THRESHOLDS` em `metrics-formatter.ts`:

```typescript
export const DEFAULT_THRESHOLDS: Record<string, ThresholdConfig> = {
  uptime: {
    successAbove: 99.5,
    warningAbove: 95,
    lowerIsBetter: false,
  },
  latency: {
    successBelow: 200,
    warningBelow: 500,
    lowerIsBetter: true,
  },
  errorRate: {
    successBelow: 1,
    warningBelow: 5,
    lowerIsBetter: true,
  },
};
```

## API Endpoints

### GET /api/health/metrics

Retorna métricas de saúde expandidas.

**Response**:
```json
{
  "success": true,
  "data": {
    "uptime": 99.87,
    "previousUptime": 99.82,
    "latency": 145,
    "previousLatency": 160,
    "errorRate": 0.42,
    "previousErrorRate": 0.55,
    "lastUpdated": "2025-11-24T10:30:00Z"
  },
  "timestamp": "2025-11-24T10:30:00Z"
}
```

## Exportação de Dados

### Formatos Disponíveis

- **JSON**: Estrutura completa com todos os metadados
- **CSV**: Formato tabular para importação em Excel/Google Sheets

### Uso

```typescript
import { useMetricsExport } from '@/lib/metrics-export';

const { exportMetrics, copyToClipboard } = useMetricsExport();

// Exportar como JSON
exportMetrics(metrics, 'json', 'Métricas do Dashboard');

// Exportar como CSV
exportMetrics(metrics, 'csv', 'Métricas do Dashboard');

// Copiar para área de transferência
await copyToClipboard(metrics);
```

### Estrutura do Arquivo JSON

```json
{
  "title": "Health Metrics Dashboard",
  "exportedAt": "2025-11-24T10:30:00Z",
  "metrics": [
    {
      "name": "Uptime",
      "value": 99.87,
      "unit": "%",
      "status": "success",
      "delta": {
        "direction": "up",
        "value": 0.05,
        "formatted": "+0.1%",
        "arrow": "↑",
        "isPositive": true
      },
      "tooltip": "Uptime: 99.87% (Saudável)",
      "lastUpdated": "2025-11-24T10:30:00Z"
    }
  ]
}
```

### Estrutura do Arquivo CSV

```csv
# Health Metrics Dashboard
# Exportado em: 2025-11-24T10:30:00Z

Nome,Valor,Unidade,Status,Variação,Direção,Última Atualização
"Uptime","99.87","%","success","+0.1%","up","2025-11-24T10:30:00Z"
"Latência","145","ms","success","-9.4%","down","2025-11-24T10:30:00Z"
"Taxa de Erro","0.42","%","success","-23%","down","2025-11-24T10:30:00Z"
```

## Componentes

### HealthMetricsPanel

Painel completo com todos os widgets KPI.

**Props**:
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| metrics | HealthMetricData[] | - | Lista de métricas |
| loading | boolean | false | Estado de carregamento |
| error | string \| null | null | Mensagem de erro |
| onRetry | () => void | - | Callback de retry |
| title | string | 'Métricas de Saúde' | Título do painel |
| size | 'sm' \| 'md' \| 'lg' | 'sm' | Tamanho dos widgets |
| enableExport | boolean | true | Habilitar exportação |
| lastUpdated | string | - | Timestamp de última atualização |

### KPIWidget

Widget individual de KPI.

**Props**:
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| metric | HealthMetricData | - | Dados da métrica |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Tamanho do widget |
| loading | boolean | false | Estado de carregamento |

## Hooks

### useHealthMetrics

Hook para buscar métricas da API.

```typescript
const {
  metrics,      // HealthMetricData[]
  loading,      // boolean
  error,        // string | null
  lastUpdated,  // string | null
  refetch,      // () => Promise<void>
} = useHealthMetrics(autoRefresh = true, refreshInterval = 30000);
```

### useHealthMetricsMock

Hook com dados mockados para desenvolvimento.

```typescript
const { metrics, loading, error, refetch } = useHealthMetricsMock();
```

### useHealthMetricsError

Hook que simula erro para testes de fallback.

```typescript
const { metrics, loading, error, refetch } = useHealthMetricsError();
```

## Storybook

As stories estão disponíveis em `apps/storybook/src/stories/HealthMetricsWidgets.stories.tsx`:

- **UptimeSuccess/Warning/Error**: Estados do widget de uptime
- **LatencySuccess/Warning/Error**: Estados do widget de latência
- **ErrorRateSuccess/Warning/Error**: Estados do widget de taxa de erro
- **PanelAllSuccess**: Painel completo com todas as métricas saudáveis
- **PanelMixedStatus**: Painel com status mistos
- **LoadingState**: Estado de carregamento
- **ErrorState**: Estado de erro com retry
- **SizeVariants**: Diferentes tamanhos de widget

## Testes

Testes unitários em `apps/studio/src/__tests__/`:

- `metrics-formatter.test.ts`: Testes dos utilitários de formatação
- `metrics-export.test.ts`: Testes do hook de exportação

Executar testes:
```bash
pnpm --filter studio test
```

## Integração na Página

O painel está integrado na página de Dashboard (`apps/studio/src/app/dashboard/page.tsx`):

```tsx
import { HealthMetricsPanel } from '@/components/widgets/HealthMetricsWidgets';
import { useHealthMetricsMock } from '@/lib/use-health-metrics';

export default function DashboardPage() {
  const healthMetrics = useHealthMetricsMock();

  return (
    <HealthMetricsPanel
      metrics={healthMetrics.metrics}
      loading={healthMetrics.loading}
      error={healthMetrics.error}
      onRetry={healthMetrics.refetch}
      title="Métricas de Performance"
      size="sm"
      enableExport={true}
      lastUpdated={healthMetrics.lastUpdated || undefined}
    />
  );
}
```

## Próximos Passos

- [ ] Integrar com API real de monitoramento (Prometheus, Datadog, etc.)
- [ ] Adicionar gráficos de tendência histórica
- [ ] Implementar alertas e notificações
- [ ] Adicionar métricas customizáveis
