'use client';

import {
  Sidebar,
  Breadcrumb,
  PageHeader,
  Tabs,
  FilterGroup,
  DataTable,
  Pagination,
  ToolbarButtons,
} from '@prototipo/design-system';
import type { DataTableProps } from '@prototipo/design-system';
import { useState } from 'react';

// Dados mock para 5 questões
const mockQuestions: DataTableProps['data'] = [
  {
    id: 'Q001',
    codigo: 'MAT-6-001',
    habilidades: 'EF06MA01, EF06MA02',
    topico: 'Números e Operações',
    tipo: 'Múltipla Escolha',
    autoria: 'Rede Canoas',
    criador: 'Prof. Ana Silva',
    revisor: 'Prof. João Santos',
    data: '2025-11-15',
    badges: 'efobmaos · d6',
  },
  {
    id: 'Q002',
    codigo: 'MAT-6-002',
    habilidades: 'EF06MA03',
    topico: 'Geometria',
    tipo: 'Dissertativa',
    autoria: 'Rede Canoas',
    criador: 'Prof. Maria Costa',
    revisor: 'Prof. Ana Silva',
    data: '2025-11-10',
    badges: 'geometria · d6',
  },
  {
    id: 'Q003',
    codigo: 'MAT-7-001',
    habilidades: 'EF07MA01, EF07MA05',
    topico: 'Álgebra',
    tipo: 'Múltipla Escolha',
    autoria: 'Rede Canoas',
    criador: 'Prof. Pedro Lima',
    revisor: 'Prof. Maria Costa',
    data: '2025-11-05',
    badges: 'algebra · d7',
  },
  {
    id: 'Q004',
    codigo: 'MAT-8-001',
    habilidades: 'EF08MA02',
    topico: 'Estatística',
    tipo: 'Verdadeiro ou Falso',
    autoria: 'Rede Canoas',
    criador: 'Prof. João Santos',
    revisor: 'Prof. Pedro Lima',
    data: '2025-10-28',
    badges: 'estatistica · d8',
  },
  {
    id: 'Q005',
    codigo: 'MAT-9-001',
    habilidades: 'EF09MA01, EF09MA02, EF09MA03',
    topico: 'Funções',
    tipo: 'Múltipla Escolha',
    autoria: 'Rede Canoas',
    criador: 'Prof. Ana Silva',
    revisor: 'Prof. João Santos',
    data: '2025-10-20',
    badges: 'funcoes · d9',
  },
];

export default function BancoQuestoesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('aprovadas');
  const [filters, setFilters] = useState({});

  const columns: DataTableProps['columns'] = [
    { key: 'codigo', label: 'Código', sortable: true },
    { key: 'habilidades', label: 'Habilidades', sortable: false },
    { key: 'topico', label: 'Tópico' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'badges', label: 'Classificação', sortable: false },
    { key: 'autoria', label: 'Autoria' },
    { key: 'criador', label: 'Criador' },
    { key: 'revisor', label: 'Revisor' },
    { key: 'data', label: 'Data' },
  ];

  const sidebarItems = [
    {
      id: 'banco',
      label: 'Banco de Questões',
      href: '/backoffice/banco-questoes',
      active: true,
    },
    { id: 'usuarios', label: 'Usuários', href: '/backoffice/usuarios' },
    { id: 'relatorios', label: 'Relatórios', href: '/backoffice/relatorios' },
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'BackOffice', href: '/backoffice' },
    { label: 'Banco de Questões' },
  ];

  const filterConfig = [
    {
      id: 'area',
      type: 'select' as const,
      label: 'Área',
      options: [{ value: 'mat', label: 'Matemática' }],
    },
    {
      id: 'ano',
      type: 'select' as const,
      label: 'Ano Escolar',
      options: [{ value: '6', label: '6º ano' }],
    },
    {
      id: 'tipo',
      type: 'select' as const,
      label: 'Tipo',
      options: [{ value: 'mc', label: 'Múltipla Escolha' }],
    },
    {
      id: 'nivel',
      type: 'select' as const,
      label: 'Nível',
      options: [{ value: 'facil', label: 'Fácil' }],
    },
    { id: 'habilidade', type: 'input' as const, label: 'Habilidade' },
    { id: 'topico', type: 'input' as const, label: 'Tópico' },
    {
      id: 'autoria',
      type: 'select' as const,
      label: 'Autoria',
      options: [{ value: 'canoas', label: 'Canoas' }],
    },
    {
      id: 'uso',
      type: 'select' as const,
      label: 'USO',
      options: [{ value: 'sim', label: 'Sim' }],
    },
  ];

  const tabs = [
    { id: 'aprovadas', label: 'Aprovadas', badge: 150 },
    { id: 'revisao', label: 'Em revisão', badge: 23 },
    { id: 'correcao', label: 'Em correção', badge: 8 },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8f9fa' }}>
      <Sidebar items={sidebarItems} />

      <div style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
        <Breadcrumb items={breadcrumbItems} />

        <PageHeader
          title="Todas as questões"
          count={181}
          subtitle="Gerencie o banco de questões da rede"
        />

        <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />

        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FilterGroup
            filters={filterConfig}
            values={filters}
            onChange={(id, value) => setFilters({ ...filters, [id]: value })}
            layout="grid"
          />

          <ToolbarButtons
            onImport={() => console.log('Import')}
            onExport={() => console.log('Export')}
          />

          <DataTable
            columns={columns}
            data={mockQuestions}
            striped
            hoverable
            onRowClick={(row) => console.log('Clicked:', row)}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={19}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
