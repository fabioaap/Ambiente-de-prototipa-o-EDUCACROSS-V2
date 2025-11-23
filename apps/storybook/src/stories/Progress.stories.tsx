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
    variant: {
      control: 'select',
      options: ['linear', 'circular'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    theme: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    max: {
      control: { type: 'number' },
    },
    showLabel: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

// Linear Progress Stories
export const LinearPrimary: Story = {
  args: {
    variant: 'linear',
    value: 60,
    theme: 'primary',
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LinearWithLabel: Story = {
  args: {
    variant: 'linear',
    value: 75,
    theme: 'primary',
    size: 'md',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LinearSmall: Story = {
  args: {
    variant: 'linear',
    value: 45,
    theme: 'primary',
    size: 'sm',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LinearLarge: Story = {
  args: {
    variant: 'linear',
    value: 80,
    theme: 'primary',
    size: 'lg',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

// Circular Progress Stories
export const CircularPrimary: Story = {
  args: {
    variant: 'circular',
    value: 65,
    theme: 'primary',
    size: 'md',
    showLabel: true,
  },
};

export const CircularSmall: Story = {
  args: {
    variant: 'circular',
    value: 40,
    theme: 'primary',
    size: 'sm',
    showLabel: true,
  },
};

export const CircularLarge: Story = {
  args: {
    variant: 'circular',
    value: 90,
    theme: 'primary',
    size: 'lg',
    showLabel: true,
  },
};

// Theme Stories - Linear
export const LinearSecondary: Story = {
  args: {
    variant: 'linear',
    value: 50,
    theme: 'secondary',
    size: 'md',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LinearSuccess: Story = {
  args: {
    variant: 'linear',
    value: 100,
    theme: 'success',
    size: 'md',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LinearWarning: Story = {
  args: {
    variant: 'linear',
    value: 70,
    theme: 'warning',
    size: 'md',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LinearError: Story = {
  args: {
    variant: 'linear',
    value: 30,
    theme: 'error',
    size: 'md',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

// Theme Stories - Circular
export const CircularSecondary: Story = {
  args: {
    variant: 'circular',
    value: 55,
    theme: 'secondary',
    size: 'md',
    showLabel: true,
  },
};

export const CircularSuccess: Story = {
  args: {
    variant: 'circular',
    value: 100,
    theme: 'success',
    size: 'md',
    showLabel: true,
  },
};

export const CircularWarning: Story = {
  args: {
    variant: 'circular',
    value: 68,
    theme: 'warning',
    size: 'md',
    showLabel: true,
  },
};

export const CircularError: Story = {
  args: {
    variant: 'circular',
    value: 25,
    theme: 'error',
    size: 'md',
    showLabel: true,
  },
};

// Accessibility Stories
export const WithCustomAriaLabel: Story = {
  args: {
    variant: 'linear',
    value: 60,
    theme: 'primary',
    size: 'md',
    showLabel: true,
    'aria-label': 'Progresso de conclusão do curso: 60%',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Use aria-label para fornecer contexto adicional sobre o que o progresso representa.',
      },
    },
  },
};

export const OnboardingSteps: Story = {
  args: {
    variant: 'circular',
    value: 3,
    max: 5,
    theme: 'primary',
    size: 'lg',
    showLabel: false,
    'aria-label': 'Passo 3 de 5 concluído',
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de uso para indicar progresso em steps de onboarding. Use a prop "max" para definir o total de passos.',
      },
    },
  },
};

export const LoadingState: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <div style={{ width: '400px' }}>
        <Progress 
          variant="linear" 
          value={0} 
          theme="primary" 
          size="md"
          aria-label="Carregando, 0% concluído"
        />
      </div>
      <div style={{ width: '400px' }}>
        <Progress 
          variant="linear" 
          value={33} 
          theme="primary" 
          size="md"
          aria-label="Carregando, 33% concluído"
        />
      </div>
      <div style={{ width: '400px' }}>
        <Progress 
          variant="linear" 
          value={66} 
          theme="primary" 
          size="md"
          aria-label="Carregando, 66% concluído"
        />
      </div>
      <div style={{ width: '400px' }}>
        <Progress 
          variant="linear" 
          value={100} 
          theme="success" 
          size="md" 
          showLabel
          aria-label="Concluído, 100%"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de diferentes estados de carregamento. Note que mudamos o theme para "success" quando o progresso é 100%.',
      },
    },
  },
};

export const ResponsiveExample: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <h3 style={{ marginBottom: '1rem' }}>Layout Responsivo</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Tarefas Concluídas (sm)</p>
          <Progress 
            variant="linear" 
            value={45} 
            theme="primary" 
            size="sm" 
            showLabel
          />
        </div>
        <div>
          <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Progresso do Curso (md)</p>
          <Progress 
            variant="linear" 
            value={70} 
            theme="secondary" 
            size="md" 
            showLabel
          />
        </div>
        <div>
          <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Nível de Experiência (lg)</p>
          <Progress 
            variant="linear" 
            value={88} 
            theme="success" 
            size="lg" 
            showLabel
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'O componente é responsivo e se adapta ao container pai. Teste redimensionando a janela.',
      },
    },
  },
};

export const GameProgress: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Progress 
          variant="circular" 
          value={25} 
          theme="primary" 
          size="lg" 
          showLabel
          aria-label="Nível 1 - 25% concluído"
        />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Nível 1</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Progress 
          variant="circular" 
          value={100} 
          theme="success" 
          size="lg" 
          showLabel
          aria-label="Nível 2 - 100% concluído"
        />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Nível 2</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Progress 
          variant="circular" 
          value={0} 
          theme="primary" 
          size="lg" 
          showLabel
          aria-label="Nível 3 - não iniciado"
        />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Nível 3</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de uso em contexto de game mostrando progresso em diferentes níveis.',
      },
    },
  },
};
