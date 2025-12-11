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

export const CellRendererExample: Story = {
  render: () => {
    const { Progress } = require('@prototipo/design-system');

    const enrollmentData = [
      { id: 1, student: 'João Silva', enrolled: 85, total: 100, percentage: 85 },
      { id: 2, student: 'Maria Santos', enrolled: 60, total: 100, percentage: 60 },
      { id: 3, student: 'Pedro Costa', enrolled: 40, total: 100, percentage: 40 },
      { id: 4, student: 'Ana Paula', enrolled: 15, total: 100, percentage: 15 },
    ];

    return (
      <DataTable
        columns={[
          { key: 'id', label: 'ID', align: 'center' },
          { key: 'student', label: 'Aluno' },
          { key: 'enrolled', label: 'Matriculados' },
          { key: 'total', label: 'Total' },
          { key: 'percentage', label: 'Progresso' },
        ]}
        data={enrollmentData}
        cellRenderer={{
          enrolled: (value) => <strong>{value}</strong>,
          percentage: (value, _row) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Progress
                value={Number(value)}
                variant="linear"
                height="12px"
                color="success"
              />
              <Badge customColor={value >= 75 ? '#28C76F' : value >= 50 ? '#7367F0' : '#EA5455'}>
                {value}%
              </Badge>
            </div>
          ),
        }}
        striped
        hoverable
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de uso da prop `cellRenderer` para renderizar células customizadas. Combina Progress e Badge para mostrar porcentagem de matrícula de alunos (case Painel Inicial).',
      },
    },
  },
};
