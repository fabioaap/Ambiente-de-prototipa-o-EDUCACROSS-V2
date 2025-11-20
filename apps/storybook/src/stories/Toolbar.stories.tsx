import type { Meta, StoryObj } from '@storybook/react';
import { Toolbar, Button } from '@prototipo/design-system';

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'space-between'],
      description: 'Alinhamento dos itens dentro da toolbar',
    },
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {
  args: {
    align: 'left',
    children: (
      <>
        <Button variant="primary" size="md">Ação 1</Button>
        <Button variant="outline" size="md">Ação 2</Button>
        <Button variant="ghost" size="md">Ação 3</Button>
      </>
    ),
  },
};

export const Center: Story = {
  args: {
    align: 'center',
    children: (
      <>
        <Button variant="primary" size="md">Salvar</Button>
        <Button variant="outline" size="md">Cancelar</Button>
      </>
    ),
  },
};

export const SpaceBetween: Story = {
  args: {
    align: 'space-between',
    children: (
      <>
        <Button variant="ghost" size="md">Voltar</Button>
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          <Button variant="outline" size="md">Cancelar</Button>
          <Button variant="primary" size="md">Confirmar</Button>
        </div>
      </>
    ),
  },
};

export const WithMultipleActions: Story = {
  args: {
    align: 'left',
    children: (
      <>
        <Button variant="primary" size="sm">Aprovar Selecionadas</Button>
        <Button variant="outline" size="sm">Solicitar Ajustes</Button>
        <Button variant="outline" size="sm">Rejeitar</Button>
      </>
    ),
  },
};
