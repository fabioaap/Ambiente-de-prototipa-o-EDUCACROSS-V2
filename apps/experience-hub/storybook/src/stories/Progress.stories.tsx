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
