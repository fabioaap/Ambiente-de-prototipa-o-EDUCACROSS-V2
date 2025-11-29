import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from '@prototipo/design-system';
import { Button } from '@prototipo/design-system';

const meta = {
  title: 'BackOffice/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    title: 'Usuários',
  },
};

export const WithCounter: Story = {
  args: {
    title: 'Produtos',
    count: 142,
    subtitle: 'Gerencie seus produtos cadastrados',
  },
};

export const WithActions: Story = {
  args: {
    title: 'Pedidos',
    count: 28,
    subtitle: 'Visualize e gerencie todos os pedidos',
    actions: (
      <>
        <Button variant="outline">Filtrar</Button>
        <Button variant="primary">Novo Pedido</Button>
      </>
    ),
  },
};

export const CompleteExample: Story = {
  args: {
    title: 'Dashboard',
    count: 5,
    subtitle: 'Últimas 24 horas de atividade',
    actions: (
      <>
        <Button variant="outline">Exportar</Button>
        <Button variant="outline">Compartilhar</Button>
        <Button variant="primary">Atualizar</Button>
      </>
    ),
  },
};
