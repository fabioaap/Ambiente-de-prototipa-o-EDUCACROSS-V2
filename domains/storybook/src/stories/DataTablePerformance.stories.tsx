import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, FilterGroup } from '@prototipo/design-system';
import { useState, Profiler, ProfilerOnRenderCallback } from 'react';

const meta = {
  title: 'BackOffice/Performance/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Generate 100 rows of sample data
const generate100Rows = () => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    codigo: `Q${String(i + 1).padStart(4, '0')}`,
    habilidade: `Habilidade ${(i % 10) + 1}`,
    topico: ['Matemática', 'Português', 'Ciências', 'História', 'Geografia'][i % 5],
    tipo: ['Múltipla Escolha', 'Dissertativa', 'Verdadeiro/Falso'][i % 3],
    autoria: ['Autor A', 'Autor B', 'Autor C', 'Autor D'][i % 4],
    criador: `Criador ${(i % 8) + 1}`,
    revisor: `Revisor ${(i % 6) + 1}`,
    data: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString('pt-BR'),
    status: ['Aprovada', 'Em revisão', 'Em correção'][i % 3],
  }));
};

const largeDataset = generate100Rows();

const columns = [
  { key: 'codigo', label: 'Código', sortable: true },
  { key: 'habilidade', label: 'Habilidade', sortable: true },
  { key: 'topico', label: 'Tópico', sortable: true },
  { key: 'tipo', label: 'Tipo', sortable: true },
  { key: 'autoria', label: 'Autoria', sortable: false },
  { key: 'criador', label: 'Criador', sortable: true },
  { key: 'revisor', label: 'Revisor', sortable: true },
  { key: 'data', label: 'Data', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

// Performance measurement callback
const onRenderCallback: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  console.log(`[Performance] ${id} (${phase}):`);
  console.log(`  Render time: ${actualDuration.toFixed(2)}ms`);
  console.log(`  Base duration: ${baseDuration.toFixed(2)}ms`);
  
  if (phase === 'mount' && actualDuration > 500) {
    console.warn(`⚠️ Initial render exceeded 500ms target: ${actualDuration.toFixed(2)}ms`);
  }
  if (phase === 'update' && actualDuration > 200) {
    console.warn(`⚠️ Interaction exceeded 200ms target: ${actualDuration.toFixed(2)}ms`);
  }
};

function DataTableWithPerformanceMonitoring() {
  const [data, setData] = useState(largeDataset);
  const [sortState, setSortState] = useState<{ key: string; direction: 'asc' | 'desc' } | undefined>();

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    const startTime = performance.now();
    
    const sorted = [...data].sort((a, b) => {
      const aVal = String(a[key as keyof typeof a]);
      const bVal = String(b[key as keyof typeof b]);
      if (direction === 'asc') {
        return aVal.localeCompare(bVal);
      }
      return bVal.localeCompare(aVal);
    });
    
    setData(sorted);
    setSortState({ key, direction });
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    console.log(`[Sort Performance] ${key} ${direction}: ${duration.toFixed(2)}ms`);
    if (duration > 200) {
      console.warn(`⚠️ Sort exceeded 200ms target: ${duration.toFixed(2)}ms`);
    }
  };

  return (
    <Profiler id="DataTable-100rows" onRender={onRenderCallback}>
      <div>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          📊 Dataset: 100 rows | 🎯 Target: Initial render &lt; 500ms, Interactions &lt; 200ms
        </p>
        <DataTable
          columns={columns}
          data={data}
          sortable
          sortState={sortState}
          onSort={handleSort}
          striped
          hoverable
          ariaLabel="Tabela de performance com 100 linhas"
        />
      </div>
    </Profiler>
  );
}

export const Performance100Rows: Story = {
  render: () => <DataTableWithPerformanceMonitoring />,
  parameters: {
    docs: {
      description: {
        story: 'DataTable com 100 linhas para validar SLAs de performance: render inicial < 500ms, sort/filter < 200ms. Abra o console do navegador para ver as métricas.',
      },
    },
  },
};

function FilterGroupWithPerformanceMonitoring() {
  const [filteredData, setFilteredData] = useState(largeDataset);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleFilterChange = (filterId: string, value: any) => {
    const startTime = performance.now();
    
    const newFilters = { ...filters, [filterId]: value };
    setFilters(newFilters);

    let filtered = largeDataset;
    
    if (newFilters.topico) {
      filtered = filtered.filter(row => row.topico === newFilters.topico);
    }
    if (newFilters.status) {
      filtered = filtered.filter(row => row.status === newFilters.status);
    }
    if (newFilters.search) {
      const searchLower = newFilters.search.toLowerCase();
      filtered = filtered.filter(row => 
        row.codigo.toLowerCase().includes(searchLower) ||
        row.habilidade.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredData(filtered);
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    console.log(`[Filter Performance] ${filterId}: ${duration.toFixed(2)}ms (${filtered.length} results)`);
    if (duration > 200) {
      console.warn(`⚠️ Filter exceeded 200ms target: ${duration.toFixed(2)}ms`);
    }
  };

  const handleReset = () => {
    setFilters({});
    setFilteredData(largeDataset);
  };

  return (
    <Profiler id="FilterGroup-100rows" onRender={onRenderCallback}>
      <div>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          🔍 Dataset: 100 rows | 🎯 Target: Filter response &lt; 200ms
        </p>
        <FilterGroup
          filters={[
            {
              id: 'search',
              type: 'input',
              label: 'Buscar',
              placeholder: 'Código ou habilidade...',
            },
            {
              id: 'topico',
              type: 'select',
              label: 'Tópico',
              placeholder: 'Selecione',
              options: [
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Português' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'História', label: 'História' },
                { value: 'Geografia', label: 'Geografia' },
              ],
            },
            {
              id: 'status',
              type: 'select',
              label: 'Status',
              placeholder: 'Selecione',
              options: [
                { value: 'Aprovada', label: 'Aprovada' },
                { value: 'Em revisão', label: 'Em revisão' },
                { value: 'Em correção', label: 'Em correção' },
              ],
            },
          ]}
          onChange={handleFilterChange}
          onReset={handleReset}
          ariaLabel="Filtros de performance"
        />
        <div style={{ marginTop: '1rem' }}>
          <p style={{ color: '#666' }}>Resultados: {filteredData.length} de 100</p>
        </div>
      </div>
    </Profiler>
  );
}

export const FilterPerformance100Rows: Story = {
  render: () => <FilterGroupWithPerformanceMonitoring />,
  parameters: {
    docs: {
      description: {
        story: 'FilterGroup com 100 linhas para validar SLA de performance: filtro < 200ms. Abra o console do navegador para ver as métricas.',
      },
    },
  },
};
