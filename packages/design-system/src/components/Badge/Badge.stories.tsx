import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md',
  },
};

export const Success: Story = {
  args: {
    children: '✓ Atualizado',
    variant: 'success',
    size: 'md',
  },
};

export const Warning: Story = {
  args: {
    children: '⚠ Atenção',
    variant: 'warning',
    size: 'md',
  },
};

export const Error: Story = {
  args: {
    children: '✗ Erro',
    variant: 'error',
    size: 'md',
  },
};

export const Info: Story = {
  args: {
    children: 'ℹ Informação',
    variant: 'info',
    size: 'md',
  },
};

export const Sizes: Story = {
  args: {
    children: 'Sizes',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Badge size="sm" variant="info">Small</Badge>
      <Badge size="md" variant="info">Medium</Badge>
      <Badge size="lg" variant="info">Large</Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  args: {
    children: 'Variants',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};
