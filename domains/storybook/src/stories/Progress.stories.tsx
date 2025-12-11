import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@prototipo/design-system';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    variant: {
      control: 'select',
      options: ['linear', 'circular'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
    showLabel: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

// Linear variants
export const LinearDefault: Story = {
  args: {
    value: 60,
    variant: 'linear',
    size: 'md',
    color: 'primary',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LinearSmall: Story = {
  args: {
    value: 45,
    variant: 'linear',
    size: 'sm',
    color: 'primary',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LinearLarge: Story = {
  args: {
    value: 75,
    variant: 'linear',
    size: 'lg',
    color: 'primary',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LinearSuccess: Story = {
  args: {
    value: 100,
    variant: 'linear',
    size: 'md',
    color: 'success',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LinearWarning: Story = {
  args: {
    value: 50,
    variant: 'linear',
    size: 'md',
    color: 'warning',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LinearError: Story = {
  args: {
    value: 25,
    variant: 'linear',
    size: 'md',
    color: 'error',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LinearNoLabel: Story = {
  args: {
    value: 65,
    variant: 'linear',
    size: 'md',
    color: 'primary',
    showLabel: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LinearCustomLabel: Story = {
  args: {
    value: 80,
    variant: 'linear',
    size: 'md',
    color: 'primary',
    showLabel: true,
    label: '4 of 5 steps',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

// Circular variants
export const CircularDefault: Story = {
  args: {
    value: 60,
    variant: 'circular',
    size: 'md',
    color: 'primary',
    showLabel: true,
  },
};

export const CircularSmall: Story = {
  args: {
    value: 45,
    variant: 'circular',
    size: 'sm',
    color: 'primary',
    showLabel: true,
  },
};

export const CircularLarge: Story = {
  args: {
    value: 75,
    variant: 'circular',
    size: 'lg',
    color: 'primary',
    showLabel: true,
  },
};

export const CircularSuccess: Story = {
  args: {
    value: 100,
    variant: 'circular',
    size: 'md',
    color: 'success',
    showLabel: true,
  },
};

export const CircularWarning: Story = {
  args: {
    value: 50,
    variant: 'circular',
    size: 'md',
    color: 'warning',
    showLabel: true,
  },
};

export const CircularError: Story = {
  args: {
    value: 25,
    variant: 'circular',
    size: 'md',
    color: 'error',
    showLabel: true,
  },
};

export const CircularNoLabel: Story = {
  args: {
    value: 65,
    variant: 'circular',
    size: 'md',
    color: 'primary',
    showLabel: false,
  },
};

export const CircularCustomLabel: Story = {
  args: {
    value: 80,
    variant: 'circular',
    size: 'md',
    color: 'primary',
    showLabel: true,
    label: '4/5',
  },
};

// Accessibility stories
export const WithAriaLabel: Story = {
  args: {
    value: 60,
    variant: 'linear',
    size: 'md',
    color: 'primary',
    showLabel: true,
    'aria-label': 'Progresso do curso',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Use aria-label para fornecer contexto adicional para leitores de tela.',
      },
    },
  },
};

export const MultipleProgressBars: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#374151' }}>
          HTML/CSS
        </p>
        <Progress value={90} variant="linear" size="md" color="success" showLabel />
      </div>
      <div>
        <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#374151' }}>
          JavaScript
        </p>
        <Progress value={75} variant="linear" size="md" color="primary" showLabel />
      </div>
      <div>
        <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#374151' }}>
          React
        </p>
        <Progress value={50} variant="linear" size="md" color="warning" showLabel />
      </div>
      <div>
        <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#374151' }}>
          TypeScript
        </p>
        <Progress value={30} variant="linear" size="md" color="error" showLabel />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de múltiplas barras de progresso para visualizar skills.',
      },
    },
  },
};

export const StepsIndicator: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Progress value={100} variant="circular" size="md" color="success" showLabel />
        <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#374151' }}>
          Step 1
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Progress value={100} variant="circular" size="md" color="success" showLabel />
        <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#374151' }}>
          Step 2
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Progress value={60} variant="circular" size="md" color="primary" showLabel />
        <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#374151' }}>
          Step 3
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Progress value={0} variant="circular" size="md" color="primary" showLabel />
        <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#374151' }}>
          Step 4
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de uso em wizard/stepper com indicadores circulares.',
      },
    },
  },
};

export const CustomHeight: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          Height: 8px (padrão md)
        </h3>
        <Progress value={65} variant="linear" color="primary" showLabel height="8px" />
      </div>
      <div>
        <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          Height: 12px (ideal para tabelas)
        </h3>
        <Progress value={75} variant="linear" color="success" showLabel height="12px" />
      </div>
      <div>
        <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          Height: 16px (destaque)
        </h3>
        <Progress value={45} variant="linear" color="warning" showLabel height="16px" />
      </div>
      <div>
        <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          Height: 24px (grande destaque)
        </h3>
        <Progress value={90} variant="linear" color="error" showLabel height="24px" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstra o uso da prop `height` para altura customizada. Útil para linhas de tabela com progresso embarcado.',
      },
    },
  },
};

export const TableIntegration: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.875rem',
      }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Aluno</th>
            <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: '600' }}>Progresso</th>
            <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: '600' }}>%</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
            <td style={{ padding: '0.75rem' }}>João Silva</td>
            <td style={{ padding: '0.75rem' }}>
              <Progress value={85} variant="linear" color="success" height="12px" />
            </td>
            <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: '500' }}>85%</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
            <td style={{ padding: '0.75rem' }}>Maria Santos</td>
            <td style={{ padding: '0.75rem' }}>
              <Progress value={60} variant="linear" color="primary" height="12px" />
            </td>
            <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: '500' }}>60%</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
            <td style={{ padding: '0.75rem' }}>Pedro Costa</td>
            <td style={{ padding: '0.75rem' }}>
              <Progress value={40} variant="linear" color="warning" height="12px" />
            </td>
            <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: '500' }}>40%</td>
          </tr>
          <tr>
            <td style={{ padding: '0.75rem' }}>Ana Oliveira</td>
            <td style={{ padding: '0.75rem' }}>
              <Progress value={15} variant="linear" color="error" height="12px" />
            </td>
            <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: '500' }}>15%</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo real de uso em tabela (Painel Inicial) com altura de 12px para visual compacto e limpo.',
      },
    },
  },
};
