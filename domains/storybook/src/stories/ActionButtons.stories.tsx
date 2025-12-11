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

export const CustomIcons: Story = {
  render: () => {
    const ViewIcon = () => (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
        <path d="M4 10a6 6 0 0112 0 6 6 0 01-12 0z" stroke="currentColor" strokeWidth="2" />
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    );

    const EditIcon = () => (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
        <path d="M11 4H4v12h12V9m-7-5l8-8m-8 8l2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );

    const DeleteIcon = () => (
      <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
        <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" />
      </svg>
    );

    return (
      <ActionButtons
        onView={() => alert('Visualizar com ícone customizado')}
        onEdit={() => alert('Editar com ícone customizado')}
        onDelete={() => alert('Deletar com ícone customizado')}
        icons={{
          view: <ViewIcon />,
          edit: <EditIcon />,
          delete: <DeleteIcon />,
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstra o uso da prop `icons` para customizar os ícones dos botões de ação. Cada ícone pode ser substituído por um componente React ou SVG customizado.',
      },
    },
  },
};

