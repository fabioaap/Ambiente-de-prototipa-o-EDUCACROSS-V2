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
      options: ['pending', 'approved', 'rejected', 'reviewing'],
      description: 'Status que define a cor do badge',
    },
    label: {
      control: 'text',
      description: 'Texto customizado (opcional)',
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  args: {
    status: 'pending',
  },
};

export const Approved: Story = {
  args: {
    status: 'approved',
  },
};

export const Rejected: Story = {
  args: {
    status: 'rejected',
  },
};

export const Reviewing: Story = {
  args: {
    status: 'reviewing',
  },
};

export const CustomLabel: Story = {
  args: {
    status: 'pending',
    label: 'Aguardando análise',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap' }}>
      <StatusBadge status="pending" />
      <StatusBadge status="approved" />
      <StatusBadge status="rejected" />
      <StatusBadge status="reviewing" />
    </div>
  ),
};
