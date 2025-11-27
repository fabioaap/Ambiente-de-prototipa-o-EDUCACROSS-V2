import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HealthIndicator, Card, Text, Button } from '@prototipo/design-system';

/**
 * Widgets de Health Metrics para Dashboard
 * 
 * Esta documentação apresenta os componentes de widgets para exibição de métricas
 * de saúde do sistema: Uptime, Latência e Taxa de Erro.
 * 
 * ## Características
 * - KPI Cards com valores, status e delta (variação)
 * - Cores baseadas em thresholds configuráveis
 * - Tooltips informativos
 * - Exportação em JSON ou CSV
 * - Fallback UI para erros com retry CTA
 */

const meta = {
  title: 'Dashboard/HealthMetricsWidgets',
  component: HealthIndicator,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Widgets de Métricas de Saúde

Componentes para exibição de KPIs de saúde do sistema no Dashboard.

### Métricas Disponíveis
- **Uptime**: Disponibilidade do sistema (%)
- **Latência**: Tempo de resposta médio (ms)
- **Taxa de Erro**: Porcentagem de requisições com erro (%)

### Thresholds Padrão
| Métrica | Sucesso | Warning | Erro |
|---------|---------|---------|------|
| Uptime | ≥ 99.5% | ≥ 95% | < 95% |
| Latência | < 200ms | < 500ms | ≥ 500ms |
| Error Rate | < 1% | < 5% | ≥ 5% |

### Exportação
Os dados podem ser exportados em formato JSON ou CSV, mantendo os mesmos valores exibidos na tela.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HealthIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

// KPI Widget - Uptime Success
export const UptimeSuccess: Story = {
  args: {
    title: 'Uptime',
    value: '99.87%',
    status: 'success',
    description: '↑ +0.1% melhora',
    icon: '🔄',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Widget de Uptime em estado saudável (≥ 99.5%).',
      },
    },
  },
};

// KPI Widget - Uptime Warning
export const UptimeWarning: Story = {
  args: {
    title: 'Uptime',
    value: '97.5%',
    status: 'warning',
    description: '↓ -1.2% piora',
    icon: '🔄',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Widget de Uptime em estado de atenção (95% - 99.5%).',
      },
    },
  },
};

// KPI Widget - Uptime Error
export const UptimeError: Story = {
  args: {
    title: 'Uptime',
    value: '92.3%',
    status: 'error',
    description: '↓ -5.0% crítico',
    icon: '🔄',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Widget de Uptime em estado crítico (< 95%).',
      },
    },
  },
};

// KPI Widget - Latency Success
export const LatencySuccess: Story = {
  args: {
    title: 'Latência',
    value: '145ms',
    status: 'success',
    description: '↓ -9.4% melhora',
    icon: '⏱️',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Widget de Latência em estado saudável (< 200ms).',
      },
    },
  },
};

// KPI Widget - Latency Warning
export const LatencyWarning: Story = {
  args: {
    title: 'Latência',
    value: '350ms',
    status: 'warning',
    description: '↑ +40% atenção',
    icon: '⏱️',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Widget de Latência em estado de atenção (200ms - 500ms).',
      },
    },
  },
};

// KPI Widget - Latency Error
export const LatencyError: Story = {
  args: {
    title: 'Latência',
    value: '750ms',
    status: 'error',
    description: '↑ +200% crítico',
    icon: '⏱️',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Widget de Latência em estado crítico (≥ 500ms).',
      },
    },
  },
};

// KPI Widget - Error Rate Success
export const ErrorRateSuccess: Story = {
  args: {
    title: 'Taxa de Erro',
    value: '0.42%',
    status: 'success',
    description: '↓ -23% melhora',
    icon: '⚠️',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Widget de Taxa de Erro em estado saudável (< 1%).',
      },
    },
  },
};

// KPI Widget - Error Rate Warning
export const ErrorRateWarning: Story = {
  args: {
    title: 'Taxa de Erro',
    value: '3.5%',
    status: 'warning',
    description: '↑ +120% atenção',
    icon: '⚠️',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Widget de Taxa de Erro em estado de atenção (1% - 5%).',
      },
    },
  },
};

// KPI Widget - Error Rate Error
export const ErrorRateError: Story = {
  args: {
    title: 'Taxa de Erro',
    value: '8.7%',
    status: 'error',
    description: '↑ +350% crítico',
    icon: '⚠️',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Widget de Taxa de Erro em estado crítico (≥ 5%).',
      },
    },
  },
};

// Painel Completo - Success
export const PanelAllSuccess: Story = {
  render: () => (
    <Card variant="elevated" padding="md">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <Text as="h2" size="xl" weight="semibold">
            Métricas de Performance
          </Text>
          <Text size="xs" color="muted">
            Atualizado: {new Date().toLocaleString('pt-BR')}
          </Text>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select style={{ padding: '0.375rem 0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option>JSON</option>
            <option>CSV</option>
          </select>
          <Button variant="outline" size="sm">Exportar</Button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <HealthIndicator
          title="Uptime"
          value="99.87%"
          status="success"
          description="↑ +0.1%"
          icon="🔄"
          size="sm"
        />
        <HealthIndicator
          title="Latência"
          value="145ms"
          status="success"
          description="↓ -9.4%"
          icon="⏱️"
          size="sm"
        />
        <HealthIndicator
          title="Taxa de Erro"
          value="0.42%"
          status="success"
          description="↓ -23%"
          icon="⚠️"
          size="sm"
        />
      </div>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Painel completo com todas as métricas em estado saudável e botão de exportação.',
      },
    },
  },
};

// Painel Completo - Mixed Status
export const PanelMixedStatus: Story = {
  render: () => (
    <Card variant="elevated" padding="md">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <Text as="h2" size="xl" weight="semibold">
            Métricas de Performance
          </Text>
          <Text size="xs" color="muted">
            Atualizado: {new Date().toLocaleString('pt-BR')}
          </Text>
        </div>
        <Button variant="outline" size="sm">Exportar</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <HealthIndicator
          title="Uptime"
          value="99.87%"
          status="success"
          description="↑ +0.1%"
          icon="🔄"
          size="sm"
        />
        <HealthIndicator
          title="Latência"
          value="350ms"
          status="warning"
          description="↑ +40%"
          icon="⏱️"
          size="sm"
        />
        <HealthIndicator
          title="Taxa de Erro"
          value="3.5%"
          status="warning"
          description="↑ +120%"
          icon="⚠️"
          size="sm"
        />
      </div>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Painel com métricas em estados mistos (sucesso e atenção).',
      },
    },
  },
};

// Estado de Loading
export const LoadingState: Story = {
  render: () => (
    <Card variant="elevated" padding="md">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ height: '24px', width: '200px', background: '#e5e7eb', borderRadius: '4px', animation: 'pulse 1.5s ease-in-out infinite' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              padding: '1rem',
              borderRadius: '8px',
              border: '2px solid #e5e7eb',
              background: '#f9fafb',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          >
            <div style={{ height: '12px', width: '60%', background: '#e5e7eb', borderRadius: '4px' }} />
            <div style={{ height: '28px', width: '40%', background: '#e5e7eb', borderRadius: '4px' }} />
            <div style={{ height: '12px', width: '80%', background: '#e5e7eb', borderRadius: '4px' }} />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Estado de carregamento dos widgets com skeleton placeholders.',
      },
    },
  },
};

// Estado de Erro com Retry
export const ErrorState: Story = {
  render: () => (
    <Card variant="bordered" padding="lg" style={{ borderColor: '#fca5a5', background: '#fef2f2' }}>
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <Text as="h3" size="xl" weight="semibold" style={{ color: '#dc2626' }}>
          Erro ao carregar métricas
        </Text>
        <Text size="sm" color="muted" style={{ marginTop: '0.5rem' }}>
          Falha na conexão com servidor de métricas
        </Text>
        <Button
          variant="outline"
          size="sm"
          style={{ marginTop: '1rem' }}
          onClick={() => alert('Tentando novamente...')}
        >
          Tentar Novamente
        </Button>
      </div>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Estado de erro com mensagem e botão de retry.',
      },
    },
  },
};

// Diferentes Tamanhos
export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Text as="h3" size="lg" weight="semibold" style={{ marginBottom: '1rem' }}>
          Tamanho Pequeno (sm)
        </Text>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <HealthIndicator title="Uptime" value="99.87%" status="success" size="sm" />
          <HealthIndicator title="Latência" value="145ms" status="success" size="sm" />
          <HealthIndicator title="Taxa de Erro" value="0.42%" status="success" size="sm" />
        </div>
      </div>
      
      <div>
        <Text as="h3" size="lg" weight="semibold" style={{ marginBottom: '1rem' }}>
          Tamanho Médio (md) - Padrão
        </Text>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <HealthIndicator title="Uptime" value="99.87%" status="success" size="md" />
          <HealthIndicator title="Latência" value="145ms" status="success" size="md" />
          <HealthIndicator title="Taxa de Erro" value="0.42%" status="success" size="md" />
        </div>
      </div>
      
      <div>
        <Text as="h3" size="lg" weight="semibold" style={{ marginBottom: '1rem' }}>
          Tamanho Grande (lg)
        </Text>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <HealthIndicator title="Uptime" value="99.87%" status="success" size="lg" />
          <HealthIndicator title="Latência" value="145ms" status="success" size="lg" />
          <HealthIndicator title="Taxa de Erro" value="0.42%" status="success" size="lg" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Widgets em diferentes tamanhos para diferentes contextos de uso.',
      },
    },
  },
};
