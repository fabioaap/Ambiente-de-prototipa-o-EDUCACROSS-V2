import type { Meta, StoryObj } from '@storybook/react';
import { StatsCard } from '@prototipo/design-system';
import React from 'react';

const meta = {
  title: 'Dashboard/StatsCard',
  component: StatsCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título do card (renderizado como h3)',
    },
    value: {
      control: 'text',
      description: 'Valor principal a ser exibido',
    },
    trend: {
      control: 'object',
      description: 'Dados de tendência com valor e direção',
    },
    subtitle: {
      control: 'text',
      description: 'Subtítulo ou descrição adicional',
    },
    isLoading: {
      control: 'boolean',
      description: 'Estado de carregamento (exibe skeleton)',
    },
  },
} satisfies Meta<typeof StatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Ícones de exemplo para as histórias
const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SalesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L2 7L12 12L22 7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 17L12 22L22 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12L12 17L22 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 3V21H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 16L12 11L16 15L21 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MoneyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Mini gráfico de exemplo para demonstrar o slot children
const MiniChart = () => (
  <div style={{ width: '100%', height: '80px', position: 'relative' }}>
    <svg width="100%" height="80" viewBox="0 0 300 80" preserveAspectRatio="none">
      <polyline
        points="0,60 30,55 60,40 90,45 120,30 150,35 180,20 210,25 240,15 270,20 300,10"
        fill="none"
        stroke="#7367f0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="0,60 30,55 60,40 90,45 120,30 150,35 180,20 210,25 240,15 270,20 300,10 300,80 0,80"
        fill="url(#gradient)"
        opacity="0.2"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7367f0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7367f0" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Histórias

export const Simple: Story = {
  args: {
    title: 'Total de Usuários',
    value: '1,234',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithTrendUp: Story = {
  args: {
    title: 'Vendas Mensais',
    value: 'R$ 45.000',
    trend: {
      value: '+12%',
      direction: 'up',
      ariaLabel: 'Aumento de 12% em relação ao mês anterior',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithTrendDown: Story = {
  args: {
    title: 'Taxa de Rejeição',
    value: '24.5%',
    trend: {
      value: '-5.2%',
      direction: 'down',
      ariaLabel: 'Redução de 5.2% em relação ao mês anterior',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithTrendNeutral: Story = {
  args: {
    title: 'Conversões',
    value: '890',
    trend: {
      value: '0%',
      direction: 'neutral',
      ariaLabel: 'Sem alteração em relação ao mês anterior',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithIcon: Story = {
  args: {
    title: 'Novos Usuários',
    value: '456',
    trend: {
      value: '+23%',
      direction: 'up',
    },
    icon: <UserIcon />,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithSubtitle: Story = {
  args: {
    title: 'Receita Total',
    value: 'R$ 128.450',
    subtitle: 'Últimos 30 dias',
    trend: {
      value: '+8.5%',
      direction: 'up',
    },
    icon: <MoneyIcon />,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithChart: Story = {
  args: {
    title: 'Visitas',
    value: '12,543',
    trend: {
      value: '+15%',
      direction: 'up',
    },
    icon: <ChartIcon />,
    children: <MiniChart />,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Loading: Story = {
  args: {
    title: 'Total de Vendas',
    value: 'R$ 0',
    isLoading: true,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LoadingWithChart: Story = {
  args: {
    title: 'Estatísticas',
    value: '0',
    isLoading: true,
    children: <div />,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

// Exemplo com múltiplos cards em grid
export const DashboardGrid: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        padding: '1rem',
      }}
    >
      <StatsCard
        title="Total de Usuários"
        value="8,234"
        trend={{ value: '+12%', direction: 'up' }}
        icon={<UserIcon />}
        subtitle="Últimos 7 dias"
      />
      <StatsCard
        title="Vendas"
        value="R$ 45.280"
        trend={{ value: '+8.5%', direction: 'up' }}
        icon={<SalesIcon />}
        subtitle="Este mês"
      />
      <StatsCard
        title="Taxa de Conversão"
        value="3.2%"
        trend={{ value: '-0.5%', direction: 'down' }}
        icon={<ChartIcon />}
        subtitle="Últimos 30 dias"
      />
      <StatsCard
        title="Receita Média"
        value="R$ 5.50"
        trend={{ value: '0%', direction: 'neutral' }}
        icon={<MoneyIcon />}
        subtitle="Por transação"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Exemplo de múltiplos StatsCards em um layout de dashboard em grid.',
      },
    },
  },
};

// Exemplo com gráficos
export const WithCharts: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        padding: '1rem',
      }}
    >
      <StatsCard
        title="Visitas do Site"
        value="12,543"
        trend={{ value: '+15%', direction: 'up' }}
        icon={<ChartIcon />}
      >
        <MiniChart />
      </StatsCard>
      <StatsCard
        title="Taxa de Engajamento"
        value="68%"
        trend={{ value: '+3%', direction: 'up' }}
        icon={<UserIcon />}
      >
        <MiniChart />
      </StatsCard>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Exemplo de StatsCards com gráficos customizados no slot children.',
      },
    },
  },
};

// Teste de acessibilidade
export const AccessibilityTest: Story = {
  args: {
    title: 'Progresso das Metas',
    value: '87%',
    trend: {
      value: '+12 pontos',
      direction: 'up',
      ariaLabel: 'Aumento de 12 pontos percentuais em relação ao trimestre anterior',
    },
    subtitle: 'Q3 2024',
    icon: <ChartIcon />,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Demonstra os recursos de acessibilidade: título como h3, trend com aria-label descritivo.',
      },
    },
  },
};

export const PainelInicialExample: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: '700px' }}>
      <StatsCard
        title="Alunos Cadastrados"
        value="1,250"
        trend={{ value: '+8%', direction: 'up' }}
        icon={<UserIcon />}
      />
      <StatsCard
        title="Cursos Ativos"
        value="24"
        trend={{ value: '+3', direction: 'up' }}
        icon={<ChartIcon />}
      />
      <StatsCard
        title="Receita Mensal"
        value="R$ 125.400"
        trend={{ value: '+15%', direction: 'up' }}
        icon={<MoneyIcon />}
      />
      <StatsCard
        title="Taxa de Conclusão"
        value="78%"
        trend={{ value: '+12 pp', direction: 'up' }}
        icon={<SalesIcon />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo completo para Painel Inicial com 4 cards de KPIs usando ícones customizados. Cada card mostra um indicador diferente com tendência positiva.',
      },
    },
  },
};

