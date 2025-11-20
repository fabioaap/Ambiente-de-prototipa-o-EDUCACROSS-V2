import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from '@prototipo/design-system';

const meta = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['pendente', 'aprovado', 'rejeitado', 'em-revisao'],
      description: 'Status a ser exibido no badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do badge',
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pendente: Story = {
  args: {
    status: 'pendente',
    size: 'md',
  },
};

export const Aprovado: Story = {
  args: {
    status: 'aprovado',
    size: 'md',
  },
};

export const Rejeitado: Story = {
  args: {
    status: 'rejeitado',
    size: 'md',
  },
};

export const EmRevisao: Story = {
  args: {
    status: 'em-revisao',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    status: 'pendente',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    status: 'aprovado',
    size: 'lg',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'flex-start' }}>
      <StatusBadge status="pendente" size="md" />
      <StatusBadge status="em-revisao" size="md" />
      <StatusBadge status="aprovado" size="md" />
      <StatusBadge status="rejeitado" size="md" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <StatusBadge status="pendente" size="sm" />
      <StatusBadge status="pendente" size="md" />
      <StatusBadge status="pendente" size="lg" />
    </div>
  ),
};
