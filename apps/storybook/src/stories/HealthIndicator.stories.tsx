import type { Meta, StoryObj } from '@storybook/react';
import { HealthIndicator } from '@prototipo/design-system';

const meta = {
  title: 'Components/HealthIndicator',
  component: HealthIndicator,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 
          'Componente para exibir indicadores de saúde do repositório, incluindo build status, lint, tamanho do bundle e dependências desatualizadas.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['compact', 'detailed'],
      description: 'Variante de layout do componente',
    },
    showTimestamps: {
      control: 'boolean',
      description: 'Se verdadeiro, mostra timestamps nas métricas',
    },
    title: {
      control: 'text',
      description: 'Título do indicador de saúde',
    },
  },
} satisfies Meta<typeof HealthIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Exemplo padrão com todas as métricas principais do repositório
 */
export const Default: Story = {
  args: {
    title: 'Saúde do Repositório',
    metrics: [
      {
        label: 'Build Status',
        status: 'success',
        value: 'Passou',
        description: 'Última build concluída com sucesso',
        href: 'https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/actions',
        lastUpdated: '5 minutos atrás',
      },
      {
        label: 'Lint Status',
        status: 'success',
        value: '0 warnings',
        description: 'Nenhum warning crítico encontrado',
        lastUpdated: '5 minutos atrás',
      },
      {
        label: 'Bundle Size (Storybook)',
        status: 'success',
        value: '892 kB',
        description: 'Tamanho do bundle principal',
        lastUpdated: '1 hora atrás',
      },
      {
        label: 'Dependências Desatualizadas',
        status: 'warning',
        value: '3 packages',
        description: '2 minor updates, 1 patch update',
        href: 'https://www.npmjs.com/',
        lastUpdated: '2 dias atrás',
      },
    ],
    showTimestamps: true,
    variant: 'detailed',
  },
};

/**
 * Exemplo com problemas detectados
 */
export const WithErrors: Story = {
  args: {
    title: 'Saúde do Repositório - Atenção Necessária',
    metrics: [
      {
        label: 'Build Status',
        status: 'error',
        value: 'Falhou',
        description: 'Erro de compilação TypeScript',
        href: 'https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/actions',
        lastUpdated: '10 minutos atrás',
      },
      {
        label: 'Lint Status',
        status: 'warning',
        value: '5 warnings',
        description: '3 warnings críticos, 2 menores',
        lastUpdated: '10 minutos atrás',
      },
      {
        label: 'Bundle Size (Storybook)',
        status: 'warning',
        value: '1.2 MB',
        description: 'Acima do limite recomendado (1 MB)',
        lastUpdated: '1 hora atrás',
      },
      {
        label: 'Dependências Vulneráveis',
        status: 'error',
        value: '2 vulnerabilidades',
        description: '1 high, 1 moderate',
        href: 'https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/security',
        lastUpdated: 'Agora',
      },
    ],
    showTimestamps: true,
  },
};

/**
 * Exemplo com métricas carregando
 */
export const Loading: Story = {
  args: {
    title: 'Verificando Saúde do Repositório...',
    metrics: [
      {
        label: 'Build Status',
        status: 'loading',
        value: 'Verificando...',
        description: 'Aguardando resultado da build',
      },
      {
        label: 'Lint Status',
        status: 'loading',
        value: 'Analisando...',
        description: 'Executando verificação de lint',
      },
      {
        label: 'Bundle Size',
        status: 'loading',
        value: 'Calculando...',
        description: 'Processando tamanho do bundle',
      },
    ],
    showTimestamps: false,
  },
};

/**
 * Layout compacto para dashboards menores
 */
export const CompactVariant: Story = {
  args: {
    title: 'Status Rápido',
    variant: 'compact',
    showTimestamps: false,
    metrics: [
      {
        label: 'Build',
        status: 'success',
        value: '✓ OK',
        href: 'https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/actions',
      },
      {
        label: 'Lint',
        status: 'success',
        value: '0',
      },
      {
        label: 'Bundle',
        status: 'success',
        value: '892kB',
      },
      {
        label: 'Deps',
        status: 'warning',
        value: '3',
        href: 'https://www.npmjs.com/',
      },
      {
        label: 'Tests',
        status: 'success',
        value: '100%',
      },
      {
        label: 'Coverage',
        status: 'success',
        value: '85%',
      },
    ],
  },
};

/**
 * Sem timestamps - visual mais limpo
 */
export const WithoutTimestamps: Story = {
  args: {
    title: 'Métricas Principais',
    showTimestamps: false,
    metrics: [
      {
        label: 'Build Pipeline',
        status: 'success',
        value: 'Estável',
        description: 'Todas as verificações passaram',
        href: 'https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/actions',
      },
      {
        label: 'Code Quality',
        status: 'success',
        value: 'Excelente',
        description: 'Score: 95/100',
      },
      {
        label: 'Performance',
        status: 'warning',
        value: 'Boa',
        description: 'Alguns componentes pesados detectados',
      },
    ],
  },
};

/**
 * Exemplo completo para um repositório real
 */
export const RealWorldExample: Story = {
  args: {
    title: 'EDUCACROSS - Dashboard de Saúde',
    metrics: [
      {
        label: 'GitHub Actions',
        status: 'success',
        value: '3 workflows ativos',
        description: 'sprint-2-validation, CI, Deploy',
        href: 'https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/actions',
        lastUpdated: 'Atualizado há 3 minutos',
      },
      {
        label: 'TypeScript Build',
        status: 'success',
        value: 'Compilado',
        description: '0 erros de tipo encontrados',
        lastUpdated: 'Build #142 - 5min atrás',
      },
      {
        label: 'ESLint',
        status: 'success',
        value: 'Aprovado',
        description: '0 errors, 0 warnings',
        lastUpdated: 'Última verificação: 5min',
      },
      {
        label: 'Storybook Build',
        status: 'success',
        value: '892.82 kB',
        description: 'index-CV6IifpK.js (gzip: 275.53 kB)',
        href: 'https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/tree/main/apps/storybook',
        lastUpdated: 'Build em 8.19s',
      },
      {
        label: 'Next.js Studio',
        status: 'success',
        value: '13 páginas',
        description: '106 kB First Load JS',
        href: 'https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/tree/main/apps/studio',
        lastUpdated: 'Build em 7.7s',
      },
      {
        label: 'Dependências npm',
        status: 'warning',
        value: '510 packages',
        description: '3 atualizações menores disponíveis',
        href: 'https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/blob/main/package.json',
        lastUpdated: 'Verificado há 2 dias',
      },
      {
        label: 'Design System',
        status: 'success',
        value: '11 componentes',
        description: 'Badge, Button, Card, Checkbox, HealthIndicator, Input, Layout, Radio, Select, Switch, Text',
        href: 'https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/tree/main/packages/design-system',
        lastUpdated: 'Atualizado recentemente',
      },
      {
        label: 'Tokens Sistema',
        status: 'success',
        value: 'Sincronizado',
        description: 'CSS variables + JS exports gerados',
        href: 'https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/tree/main/packages/tokens',
        lastUpdated: 'Build tokens: ✓',
      },
    ],
    showTimestamps: true,
    variant: 'detailed',
  },
};

/**
 * Exemplo apenas com sucessos
 */
export const AllSuccess: Story = {
  args: {
    title: 'Tudo Funcionando! 🎉',
    metrics: [
      {
        label: 'Build',
        status: 'success',
        value: 'Passou',
        href: 'https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/actions',
      },
      {
        label: 'Tests',
        status: 'success',
        value: '100% Pass',
      },
      {
        label: 'Coverage',
        status: 'success',
        value: '95%',
      },
      {
        label: 'Lint',
        status: 'success',
        value: 'Clean',
      },
    ],
    showTimestamps: false,
  },
};

/**
 * Mobile responsivo - uma coluna
 */
export const MobileView: Story = {
  args: {
    title: 'Status Mobile',
    metrics: [
      {
        label: 'Build Status',
        status: 'success',
        value: 'OK',
        href: 'https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/actions',
        lastUpdated: '5min',
      },
      {
        label: 'Bundle',
        status: 'success',
        value: '892kB',
        lastUpdated: '1h',
      },
    ],
    variant: 'compact',
    showTimestamps: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
