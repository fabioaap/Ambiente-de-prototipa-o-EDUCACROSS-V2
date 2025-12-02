import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '@prototipo/design-system';

const meta = {
  title: 'BackOffice/Breadcrumb',
  component: Breadcrumb,
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
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Short: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Produtos' },
    ],
  },
};

export const Long: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Catálogo', href: '/catalogo' },
      { label: 'Eletrônicos', href: '/catalogo/eletronicos' },
      { label: 'Smartphones', href: '/catalogo/eletronicos/smartphones' },
      { label: 'iPhone 15 Pro' },
    ],
  },
};

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 6L8 2L14 6V13C14 13.5304 13.7893 14.0391 13.4142 14.4142C13.0391 14.7893 12.5304 15 12 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V6Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: <HomeIcon /> },
      { label: 'Configurações', href: '/config' },
      { label: 'Perfil' },
    ],
    ariaLabel: 'Você está aqui: Home / Configurações / Perfil',
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Relatórios', href: '/dashboard/relatorios' },
      { label: 'Vendas' },
    ],
    separator: '›',
    ariaLabel: 'Caminho: Dashboard › Relatórios › Vendas',
  },
};
