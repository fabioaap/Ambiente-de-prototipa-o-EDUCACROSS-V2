import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from '@prototipo/design-system';

const meta = {
  title: 'BackOffice/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    a11y: {
      // Garante verificação de foco e roles
      config: {
        rules: [
          { id: 'aria-required-attr', enabled: true },
          { id: 'aria-required-parent', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M14 17V15C14 13.8954 13.1046 13 12 13H6C4.89543 13 4 13.8954 4 15V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M17 17V15C17 14.2707 16.6281 13.6372 16.0645 13.2726" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13 3.27734C13.8604 3.61023 14.5 4.43658 14.5 5.40234C14.5 6.36811 13.8604 7.19446 13 7.52734" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 3V5M10 15V17M17 10H15M5 10H3M15.3 15.3L13.8 13.8M6.2 6.2L4.7 4.7M15.3 4.7L13.8 6.2M6.2 13.8L4.7 15.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Default: Story = {
  args: {
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>EDUCACROSS</div>,
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard', active: true, ariaLabel: 'Ir para Dashboard' },
      { id: 'users', label: 'Usuários', icon: <UsersIcon />, href: '/users', ariaLabel: 'Gerenciar usuários' },
      { id: 'products', label: 'Produtos', icon: <DashboardIcon />, href: '/products', ariaLabel: 'Ver produtos' },
      { id: 'settings', label: 'Configurações', icon: <SettingsIcon />, href: '/settings', ariaLabel: 'Abrir configurações' },
    ],
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>EC</div>,
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard', active: true, ariaLabel: 'Ir para Dashboard' },
      { id: 'users', label: 'Usuários', icon: <UsersIcon />, href: '/users', ariaLabel: 'Gerenciar usuários' },
      { id: 'products', label: 'Produtos', icon: <DashboardIcon />, href: '/products', ariaLabel: 'Ver produtos' },
      { id: 'settings', label: 'Configurações', icon: <SettingsIcon />, href: '/settings', ariaLabel: 'Abrir configurações' },
    ],
  },
};

export const WithBadges: Story = {
  args: {
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>ADMIN</div>,
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard', ariaLabel: 'Ir para Dashboard' },
      { id: 'messages', label: 'Mensagens', icon: <UsersIcon />, href: '/messages', badge: '12', ariaLabel: 'Abrir mensagens' },
      { id: 'notifications', label: 'Notificações', icon: <DashboardIcon />, href: '/notifications', badge: '3', ariaLabel: 'Ver notificações' },
      { id: 'tasks', label: 'Tarefas', icon: <SettingsIcon />, href: '/tasks', badge: '5', active: true, ariaLabel: 'Ir para tarefas' },
    ],
  },
};

export const LongList: Story = {
  args: {
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>BACKOFFICE</div>,
    items: [
      { id: '1', label: 'Dashboard', icon: <DashboardIcon />, href: '#', active: true },
      { id: '2', label: 'Usuários', icon: <UsersIcon />, href: '#' },
      { id: '3', label: 'Produtos', icon: <DashboardIcon />, href: '#' },
      { id: '4', label: 'Pedidos', icon: <DashboardIcon />, href: '#', badge: '28' },
      { id: '5', label: 'Pagamentos', icon: <DashboardIcon />, href: '#' },
      { id: '6', label: 'Relatórios', icon: <DashboardIcon />, href: '#' },
      { id: '7', label: 'Configurações', icon: <SettingsIcon />, href: '#' },
      { id: '8', label: 'Integrações', icon: <DashboardIcon />, href: '#' },
      { id: '9', label: 'Suporte', icon: <UsersIcon />, href: '#', badge: '2' },
      { id: '10', label: 'Ajuda', icon: <DashboardIcon />, href: '#' },
    ],
  },
};
