import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '@prototipo/design-system';

const meta = {
  title: 'BackOffice/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    a11y: {
      config: {
        rules: [
          { id: 'aria-required-attr', enabled: true },
          { id: 'aria-roles', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      {
        id: 'tab1',
        label: 'Visão Geral',
        content: <div style={{ padding: '1rem' }}>Conteúdo da aba Visão Geral</div>,
      },
      {
        id: 'tab2',
        label: 'Detalhes',
        content: <div style={{ padding: '1rem' }}>Conteúdo da aba Detalhes</div>,
      },
      {
        id: 'tab3',
        label: 'Configurações',
        content: <div style={{ padding: '1rem' }}>Conteúdo da aba Configurações</div>,
      },
    ],
  },
};

export const WithBadges: Story = {
  args: {
    tabs: [
      {
        id: 'all',
        label: 'Todos',
        badge: 142,
        content: <div style={{ padding: '1rem' }}>Todos os itens (142)</div>,
      },
      {
        id: 'active',
        label: 'Ativos',
        badge: 89,
        content: <div style={{ padding: '1rem' }}>Itens ativos (89)</div>,
      },
      {
        id: 'pending',
        label: 'Pendentes',
        badge: 23,
        content: <div style={{ padding: '1rem' }}>Itens pendentes (23)</div>,
      },
      {
        id: 'archived',
        label: 'Arquivados',
        badge: 30,
        content: <div style={{ padding: '1rem' }}>Itens arquivados (30)</div>,
      },
    ],
    ariaLabel: 'Navegação de abas',
  },
};

export const EnclosedVariant: Story = {
  args: {
    variant: 'enclosed',
    tabs: [
      {
        id: 'info',
        label: 'Informações',
        content: <div style={{ padding: '1rem' }}>Informações gerais do produto</div>,
      },
      {
        id: 'specs',
        label: 'Especificações',
        content: <div style={{ padding: '1rem' }}>Detalhes técnicos e especificações</div>,
      },
      {
        id: 'reviews',
        label: 'Avaliações',
        badge: '4.5★',
        content: <div style={{ padding: '1rem' }}>Avaliações dos usuários</div>,
      },
    ],
    ariaLabel: 'Abas de detalhes do produto',
  },
};

export const ControlledMode: Story = {
  args: {
    value: 'tab2',
    tabs: [
      {
        id: 'tab1',
        label: 'Primeira',
        content: <div style={{ padding: '1rem' }}>Conteúdo da primeira aba</div>,
      },
      {
        id: 'tab2',
        label: 'Segunda',
        content: <div style={{ padding: '1rem' }}>Conteúdo da segunda aba (ativa)</div>,
      },
      {
        id: 'tab3',
        label: 'Terceira',
        content: <div style={{ padding: '1rem' }}>Conteúdo da terceira aba</div>,
      },
    ],
    onChange: (id: string) => console.log('Tab changed to:', id),
    ariaLabel: 'Selecionar aba',
  },
};
