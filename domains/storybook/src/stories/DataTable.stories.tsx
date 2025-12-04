import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '@prototipo/design-system';
import { ActionButtons, Badge } from '@prototipo/design-system';

const meta = {
  title: 'BackOffice/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    a11y: {
      config: {
        rules: [
          { id: 'aria-required-attr', enabled: true },
          { id: 'table', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { id: 1, name: 'João Silva', email: 'joao@example.com', role: 'Admin', status: 'Ativo' },
  { id: 2, name: 'Maria Santos', email: 'maria@example.com', role: 'Editor', status: 'Ativo' },
  { id: 3, name: 'Pedro Costa', email: 'pedro@example.com', role: 'Viewer', status: 'Inativo' },
  { id: 4, name: 'Ana Paula', email: 'ana@example.com', role: 'Admin', status: 'Ativo' },
  { id: 5, name: 'Carlos Mendes', email: 'carlos@example.com', role: 'Editor', status: 'Pendente' },
];

export const Default: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID', align: 'center' },
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'E-mail' },
      { key: 'role', label: 'Função' },
      { key: 'status', label: 'Status' },
    ],
    data: sampleData,
  },
};

export const Sortable: Story = {
  args: {
    sortable: true,
    sortState: { key: 'name', direction: 'asc' },
    columns: [
      { key: 'id', label: 'ID', align: 'center', sortable: true },
      { key: 'name', label: 'Nome', sortable: true },
      { key: 'email', label: 'E-mail', sortable: true },
      { key: 'role', label: 'Função', sortable: true },
      { key: 'status', label: 'Status' },
    ],
    data: sampleData,
    onSort: (key: string, direction: 'asc' | 'desc') => {
      console.log(`Sorting by ${key} ${direction}`);
    },
    ariaLabel: 'Tabela de usuários',
  },
};

export const WithCustomRender: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID', align: 'center' },
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'E-mail' },
      {
        key: 'status',
        label: 'Status',
        render: (value: string) => {
          const variant =
            value === 'Ativo' ? 'success' : value === 'Pendente' ? 'warning' : 'error';
          return <Badge variant={variant}>{value}</Badge>;
        },
      },
      {
        key: 'actions',
        label: 'Ações',
        align: 'center',
        render: () => (
          <ActionButtons
            onView={() => alert('Ver')}
            onEdit={() => alert('Editar')}
            onDelete={() => alert('Deletar')}
            size="small"
          />
        ),
      },
    ],
    data: sampleData,
  },
};

export const StripedAndHoverable: Story = {
  args: {
    striped: true,
    hoverable: true,
    columns: [
      { key: 'id', label: 'ID', align: 'center' },
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'E-mail' },
      { key: 'role', label: 'Função' },
      { key: 'status', label: 'Status' },
    ],
    data: sampleData,
  },
};

export const WithRowClick: Story = {
  args: {
    hoverable: true,
    columns: [
      { key: 'id', label: 'ID', align: 'center' },
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'E-mail' },
      { key: 'role', label: 'Função' },
    ],
    data: sampleData,
    onRowClick: (row: Record<string, string | number | boolean | null | undefined>) => {
      alert(`Clicou na linha: ${row.name}`);
    },
  },
};

export const Loading: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'E-mail' },
    ],
    data: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'E-mail' },
    ],
    data: [],
    emptyMessage: 'Nenhum usuário encontrado',
  },
};
