import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from '@prototipo/design-system';
import { Button } from '@prototipo/design-system';

const meta = {
  title: 'BackOffice/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
    a11y: {
      config: {
        rules: [
          { id: 'aria-required-attr', enabled: true },
        ],
      },
    },
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
        <Button variant="outline" aria-label="Filtrar pedidos">Filtrar</Button>
        <Button variant="primary" aria-label="Criar novo pedido">Novo Pedido</Button>
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
