import type { Meta, StoryObj } from '@storybook/react';
import { ActionButtons } from '@prototipo/design-system';

const meta = {
  title: 'BackOffice/ActionButtons',
  component: ActionButtons,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          { id: 'aria-required-attr', enabled: true },
          { id: 'button-name', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ActionButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllActions: Story = {
  args: {
    onView: () => alert('Visualizar'),
    onEdit: () => alert('Editar'),
    onDelete: () => alert('Deletar'),
    viewAriaLabel: 'Visualizar item',
    editAriaLabel: 'Editar item',
    deleteAriaLabel: 'Deletar item',
  },
};

export const ViewAndEdit: Story = {
  args: {
    onView: () => alert('Visualizar'),
    onEdit: () => alert('Editar'),
  },
};

export const OnlyDelete: Story = {
  args: {
    onDelete: () => alert('Deletar'),
  },
};

export const SmallSize: Story = {
  args: {
    onView: () => alert('Visualizar'),
    onEdit: () => alert('Editar'),
    onDelete: () => alert('Deletar'),
    size: 'small',
  },
};

export const MediumSize: Story = {
  args: {
    onView: () => alert('Visualizar'),
    onEdit: () => alert('Editar'),
    onDelete: () => alert('Deletar'),
    size: 'medium',
  },
};

export const LargeSize: Story = {
  args: {
    onView: () => alert('Visualizar'),
    onEdit: () => alert('Editar'),
    onDelete: () => alert('Deletar'),
    size: 'large',
  },
};
