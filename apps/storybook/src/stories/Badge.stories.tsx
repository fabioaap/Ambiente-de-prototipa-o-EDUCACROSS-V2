import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@prototipo/design-system';

const meta = {
  title: 'Design System/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info', 'neutral'],
      description: 'Variante visual do badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do badge',
    },
    icon: {
      control: false,
      description: 'Ícone opcional à esquerda do texto',
    },
    children: {
      control: 'text',
      description: 'Conteúdo do badge',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Sucesso',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Aviso',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Erro',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    children: 'Neutro',
  },
};

export const Small: Story = {
  args: {
    variant: 'success',
    size: 'sm',
    children: 'Pequeno',
  },
};

export const Medium: Story = {
  args: {
    variant: 'info',
    size: 'md',
    children: 'Médio',
  },
};

export const Large: Story = {
  args: {
    variant: 'warning',
    size: 'lg',
    children: 'Grande',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'success',
    icon: '✓',
    children: 'Build OK',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Badge variant="success" icon="✓">Build OK</Badge>
        <Badge variant="warning" icon="⚠">1 Aviso</Badge>
        <Badge variant="error" icon="✗">2 Erros</Badge>
        <Badge variant="info" icon="ℹ">Info</Badge>
        <Badge variant="neutral">Neutro</Badge>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Badge variant="success" size="sm">Pequeno</Badge>
        <Badge variant="info" size="md">Médio</Badge>
        <Badge variant="warning" size="lg">Grande</Badge>
      </div>
    </div>
  ),
};
