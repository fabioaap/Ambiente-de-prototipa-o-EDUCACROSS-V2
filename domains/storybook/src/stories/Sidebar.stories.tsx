import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, SidebarItem } from '@prototipo/design-system';

const meta = {
  title: 'FrontOffice/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    a11y: {
      config: {
        rules: [
          { id: 'aria-required-attr', enabled: true },
          { id: 'aria-required-parent', enabled: true },
        ],
      },
    },
    docs: {
      description: {
        component: 'Componente Sidebar para navegação lateral do FrontOffice. Baseado no design Figma com suporte a itens simples e expansíveis (com chevron), estados de hover e ativo.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

import { IconDashboard, IconChart, IconFlag, IconBook, IconCalendar, IconReading, IconRegister, IconDownload } from '@prototipo/design-system';

// Array de itens conforme design do Figma (FrontOffice)
const frontOfficeSidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Painel Inicial',
    icon: <IconDashboard />, // imported from design-system icons
    href: '/dashboard',
    active: true,
  },
  {
    id: 'reports',
    label: 'Relatórios Gerais',
    icon: <IconChart />,
    href: '/reports',
    expandable: true,
    children: [
      { id: 'reports-overview', label: 'Visão Geral', href: '/reports/overview' },
      { id: 'reports-analytics', label: 'Analytics', href: '/reports/analytics' },
    ],
  },
  {
    id: 'missions',
    label: 'Missões da Escola',
    icon: <IconFlag />,
    href: '/missions',
    expandable: true,
  },
  {
    id: 'teaching',
    label: 'Sistema de Ensino',
    icon: <IconBook />,
    href: '/teaching',
  },
  {
    id: 'events',
    label: 'Eventos',
    icon: <IconCalendar />,
    href: '/events',
  },
  {
    id: 'reading',
    label: 'Expedição Leitura',
    icon: <IconReading />,
    href: '/reading',
  },
  {
    id: 'registers',
    label: 'Cadastros',
    icon: <IconRegister />,
    href: '/registers',
    expandable: true,
    children: [
      { id: 'registers-students', label: 'Alunos', href: '/registers/students' },
      { id: 'registers-teachers', label: 'Professores', href: '/registers/teachers' },
      { id: 'registers-schools', label: 'Escolas', href: '/registers/schools' },
    ],
  },
  {
    id: 'help',
    label: 'Ajudas e Materiais',
    icon: <IconDownload />,
    href: '/help',
  },
];

export const FrontOffice: Story = {
  args: {
    items: frontOfficeSidebarItems,
    activeItem: 'dashboard',
  },
};

export const WithExpandedItems: Story = {
  args: {
    items: frontOfficeSidebarItems,
    activeItem: 'reports-overview',
  },
};

export const NoActiveItem: Story = {
  args: {
    items: frontOfficeSidebarItems,
  },
};

export const WithOnClickHandler: Story = {
  args: {
    items: frontOfficeSidebarItems,
    activeItem: 'dashboard',
    onItemClick: (id, href) => {
      console.log(`Clicked on ${id} with href ${href}`);
      alert(`Navegando para: ${href}`);
    },
  },
};

export const MinimalSidebar: Story = {
  args: {
    items: [
      {
        id: 'home',
        label: 'Home',
        icon: <IconDashboard />,
        href: '/',
        active: true,
      },
      {
        id: 'settings',
        label: 'Configurações',
        icon: <IconRegister />,
        href: '/settings',
      },
    ],
  },
};
