import type { Meta, StoryObj } from '@storybook/react';
import { FilterGroup } from '@prototipo/design-system';
import { useState } from 'react';

type FilterValue = string | number | boolean | null | undefined;

const meta = {
  title: 'BackOffice/FilterGroup',
  component: FilterGroup,
  parameters: {
    layout: 'padded',
    a11y: {
      config: {
        rules: [
          { id: 'aria-required-attr', enabled: true },
          { id: 'label', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectOnly: Story = {
  args: {
    filters: [
      {
        id: 'status',
        type: 'select',
        label: 'Status',
        placeholder: 'Selecione um status',
        options: [
          { value: 'active', label: 'Ativo' },
          { value: 'inactive', label: 'Inativo' },
          { value: 'pending', label: 'Pendente' },
        ],
      },
      {
        id: 'role',
        type: 'select',
        label: 'Função',
        placeholder: 'Selecione uma função',
        options: [
          { value: 'admin', label: 'Administrador' },
          { value: 'editor', label: 'Editor' },
          { value: 'viewer', label: 'Visualizador' },
        ],
      },
    ],
    onChange: (filterId: string, value: FilterValue) => {
      console.log('Filter changed:', filterId, value);
    },
    onReset: () => console.log('Filters reset'),
  },
};

export const MixedFilters: Story = {
  args: {
    filters: [
      {
        id: 'search',
        type: 'input',
        label: 'Buscar',
        placeholder: 'Nome ou e-mail...',
      },
      {
        id: 'category',
        type: 'select',
        label: 'Categoria',
        placeholder: 'Selecione',
        options: [
          { value: 'electronics', label: 'Eletrônicos' },
          { value: 'clothing', label: 'Vestuário' },
          { value: 'books', label: 'Livros' },
          { value: 'home', label: 'Casa e Decoração' },
        ],
      },
      {
        id: 'startDate',
        type: 'date',
        label: 'Data Início',
      },
      {
        id: 'endDate',
        type: 'date',
        label: 'Data Fim',
      },
    ],
    onChange: (filterId: string, value: FilterValue) => {
      console.log('Filter changed:', filterId, value);
    },
    onReset: () => console.log('Filters reset'),
    ariaLabel: 'Filtros de busca',
  },
};

export const GridLayout: Story = {
  args: {
    layout: 'grid',
    filters: [
      {
        id: 'name',
        type: 'input',
        label: 'Nome',
        placeholder: 'Digite o nome...',
      },
      {
        id: 'email',
        type: 'input',
        label: 'E-mail',
        placeholder: 'Digite o e-mail...',
      },
      {
        id: 'status',
        type: 'select',
        label: 'Status',
        options: [
          { value: 'all', label: 'Todos' },
          { value: 'active', label: 'Ativo' },
          { value: 'inactive', label: 'Inativo' },
        ],
      },
      {
        id: 'createdAt',
        type: 'date',
        label: 'Data de Criação',
      },
    ],
    onChange: (filterId: string, value: FilterValue) => {
      console.log('Filter changed:', filterId, value);
    },
    onReset: () => console.log('Filters reset'),
  },
};

export const VerticalLayout: Story = {
  args: {
    layout: 'vertical',
    filters: [
      {
        id: 'keyword',
        type: 'input',
        label: 'Palavra-chave',
        placeholder: 'Buscar produtos...',
      },
      {
        id: 'price',
        type: 'select',
        label: 'Faixa de Preço',
        options: [
          { value: '0-50', label: 'Até R$ 50' },
          { value: '50-100', label: 'R$ 50 - R$ 100' },
          { value: '100-200', label: 'R$ 100 - R$ 200' },
          { value: '200+', label: 'Acima de R$ 200' },
        ],
      },
      {
        id: 'availability',
        type: 'select',
        label: 'Disponibilidade',
        options: [
          { value: 'in-stock', label: 'Em Estoque' },
          { value: 'out-of-stock', label: 'Esgotado' },
          { value: 'pre-order', label: 'Pré-venda' },
        ],
      },
    ],
    onChange: (filterId: string, value: FilterValue) => {
      console.log('Filter changed:', filterId, value);
    },
    onReset: () => console.log('Filters reset'),
  },
};

function InteractiveExample() {
  const [values, setValues] = useState<Record<string, FilterValue>>({});

  const handleChange = (filterId: string, value: FilterValue) => {
    setValues((prev) => ({ ...prev, [filterId]: value }));
  };

  const handleReset = () => {
    setValues({});
  };

  return (
    <div>
      <FilterGroup
        filters={[
          {
            id: 'search',
            type: 'input',
            label: 'Buscar',
            placeholder: 'Buscar...',
          },
          {
            id: 'type',
            type: 'select',
            label: 'Tipo',
            options: [
              { value: 'all', label: 'Todos' },
              { value: 'user', label: 'Usuário' },
              { value: 'admin', label: 'Admin' },
            ],
          },
        ]}
        values={values}
        onChange={handleChange}
        onReset={handleReset}
      />
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <strong>Valores atuais:</strong>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveExample />,
};
