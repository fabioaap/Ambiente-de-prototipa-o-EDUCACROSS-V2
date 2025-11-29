import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '@prototipo/design-system';
import { useState } from 'react';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleColumns = [
  { key: 'id', label: 'ID', sortable: true, width: '80px' },
  { key: 'name', label: 'Nome', sortable: true },
  { key: 'email', label: 'E-mail', sortable: true },
  { key: 'role', label: 'Função', sortable: false },
  { key: 'status', label: 'Status', sortable: true, align: 'center' as const },
];

const sampleData = [
  { id: '001', name: 'João Silva', email: 'joao@example.com', role: 'Desenvolvedor', status: 'Ativo' },
  { id: '002', name: 'Maria Santos', email: 'maria@example.com', role: 'Designer', status: 'Ativo' },
  { id: '003', name: 'Pedro Costa', email: 'pedro@example.com', role: 'Gerente', status: 'Inativo' },
  { id: '004', name: 'Ana Oliveira', email: 'ana@example.com', role: 'Desenvolvedora', status: 'Ativo' },
  { id: '005', name: 'Carlos Ferreira', email: 'carlos@example.com', role: 'Analista', status: 'Ativo' },
];

// Basic table
export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

// Striped rows
export const Striped: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    striped: true,
  },
};

// Bordered table
export const Bordered: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    bordered: true,
  },
};

// Hoverable rows
export const Hoverable: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    hoverable: true,
  },
};

// Combined styles
export const Combined: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    striped: true,
    bordered: true,
    hoverable: true,
  },
};

// Empty state
export const Empty: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    emptyMessage: 'Nenhum usuário encontrado',
  },
};

// Custom empty message
export const CustomEmptyMessage: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    emptyMessage: '🔍 Nenhum resultado corresponde aos seus critérios de busca',
  },
};

// Sortable table with state
const SortableTable = (args: TableProps) => {
  const [sortState, setSortState] = useState<{ key: string; direction: 'asc' | 'desc' } | undefined>(undefined);
  const [sortedData, setSortedData] = useState(sampleData);

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortState({ key, direction });
    const sorted = [...sampleData].sort((a, b) => {
      const aValue = String(a[key]);
      const bValue = String(b[key]);
      if (direction === 'asc') {
        return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
      setSortedData(sorted);
    };

    return (
      <Table
        {...args}
        columns={sampleColumns}
        data={sortedData}
        onSort={handleSort}
        sortState={sortState}
        hoverable
      />
    );
};

export const Sortable: Story = {
  render: (args) => <SortableTable {...args} />,
};

// Custom column alignment
export const CustomAlignment: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID', width: '80px', align: 'center' },
      { key: 'product', label: 'Produto' },
      { key: 'price', label: 'Preço', align: 'right' },
      { key: 'quantity', label: 'Qtd', align: 'center' },
      { key: 'total', label: 'Total', align: 'right' },
    ],
    data: [
      { id: '1', product: 'Notebook', price: 'R$ 3.500,00', quantity: '2', total: 'R$ 7.000,00' },
      { id: '2', product: 'Mouse', price: 'R$ 50,00', quantity: '5', total: 'R$ 250,00' },
      { id: '3', product: 'Teclado', price: 'R$ 200,00', quantity: '3', total: 'R$ 600,00' },
    ],
    striped: true,
  },
};

// Narrow columns
export const NarrowColumns: Story = {
  args: {
    columns: [
      { key: 'id', label: '#', width: '50px' },
      { key: 'status', label: '●', width: '50px', align: 'center' },
      { key: 'task', label: 'Tarefa' },
      { key: 'assignee', label: 'Responsável', width: '150px' },
      { key: 'date', label: 'Data', width: '120px' },
    ],
    data: [
      { id: '1', status: '🟢', task: 'Implementar dashboard', assignee: 'João', date: '2025-11-30' },
      { id: '2', status: '🟡', task: 'Revisar código', assignee: 'Maria', date: '2025-12-01' },
      { id: '3', status: '🔴', task: 'Corrigir bugs', assignee: 'Pedro', date: '2025-12-02' },
    ],
    hoverable: true,
  },
};

// Wide table
export const WideTable: Story = {
  render: () => (
    <div style={{ overflowX: 'auto' }}>
      <Table
        columns={[
          { key: 'col1', label: 'Coluna 1' },
          { key: 'col2', label: 'Coluna 2' },
          { key: 'col3', label: 'Coluna 3' },
          { key: 'col4', label: 'Coluna 4' },
          { key: 'col5', label: 'Coluna 5' },
          { key: 'col6', label: 'Coluna 6' },
          { key: 'col7', label: 'Coluna 7' },
          { key: 'col8', label: 'Coluna 8' },
        ]}
        data={[
          { col1: 'A1', col2: 'B1', col3: 'C1', col4: 'D1', col5: 'E1', col6: 'F1', col7: 'G1', col8: 'H1' },
          { col1: 'A2', col2: 'B2', col3: 'C2', col4: 'D2', col5: 'E2', col6: 'F2', col7: 'G2', col8: 'H2' },
          { col1: 'A3', col2: 'B3', col3: 'C3', col4: 'D3', col5: 'E3', col6: 'F3', col7: 'G3', col8: 'H3' },
        ]}
        bordered
        striped
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabela com muitas colunas dentro de um container com scroll horizontal.',
      },
    },
  },
};

// Compact table
export const Compact: Story = {
  args: {
    columns: [
      { key: 'code', label: 'Código', width: '100px' },
      { key: 'description', label: 'Descrição' },
      { key: 'value', label: 'Valor', width: '120px', align: 'right' },
    ],
    data: [
      { code: 'SKU-001', description: 'Produto A', value: 'R$ 100,00' },
      { code: 'SKU-002', description: 'Produto B', value: 'R$ 200,00' },
      { code: 'SKU-003', description: 'Produto C', value: 'R$ 300,00' },
      { code: 'SKU-004', description: 'Produto D', value: 'R$ 400,00' },
      { code: 'SKU-005', description: 'Produto E', value: 'R$ 500,00' },
    ],
    striped: true,
    hoverable: true,
  },
};
