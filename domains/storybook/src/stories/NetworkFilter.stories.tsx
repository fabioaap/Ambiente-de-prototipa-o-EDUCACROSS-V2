import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NetworkFilter } from '../components/NetworkFilter';

const meta = {
  title: 'BackOffice/NetworkFilter',
  component: NetworkFilter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Filtro para selecionar rede/contexto de questões. Usado na Jornada #4800.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NetworkFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

const redesMock = [
  { id: '1', nome: 'Canoas', sigla: 'CNS' },
  { id: '2', nome: 'Porto Alegre', sigla: 'POA' },
  { id: '3', nome: 'Gravataí', sigla: 'GRV' },
];

// Story padrão
export const Default: Story = {
  args: {
    redes: redesMock,
    label: 'Filtrar por Rede',
    placeholder: 'Todas as redes',
    showAllOption: true,
  },
};

// Story com seleção inicial
export const ComSelecao: Story = {
  args: {
    redes: redesMock,
    selectedRede: 'Canoas',
    label: 'Filtrar por Rede',
  },
};

// Story com onChange
export const Interativo: Story = {
  render: () => {
    const [selectedRede, setSelectedRede] = useState<string>();

    return (
      <div style={{ padding: '20px' }}>
        <NetworkFilter
          redes={redesMock}
          selectedRede={selectedRede}
          onRedeChange={setSelectedRede}
          label="Filtrar por Rede"
        />
        {selectedRede ? (
          <p style={{ marginTop: '16px', color: '#374151' }}>
            Rede selecionada: <strong>{selectedRede}</strong>
          </p>
        ) : (
          <p style={{ marginTop: '16px', color: '#9CA3AF' }}>Nenhuma rede selecionada</p>
        )}
      </div>
    );
  },
};

// Story sem opção "Todas as redes"
export const SemOpcaoTodas: Story = {
  args: {
    redes: redesMock,
    label: 'Selecionar Rede (Obrigatório)',
    placeholder: 'Escolha uma rede',
    showAllOption: false,
  },
};

// Story com label customizado
export const LabelCustomizado: Story = {
  args: {
    redes: redesMock,
    label: 'Qual rede deseja filtrar?',
    placeholder: 'Selecione uma rede...',
  },
};

// Story em Contexto - Lista de Questões com Filtro
export const EmContexto: Story = {
  render: () => {
    const [selectedRede, setSelectedRede] = useState<string>();

    const questoesMock = [
      {
        id: '13749',
        codigo: '13749',
        enunciado: 'Qual é o resultado de 2 + 2?',
        rede: 'Canoas',
        status: 'aprovada',
      },
      {
        id: '13748',
        codigo: '13748',
        enunciado: 'Qual é a capital do Brasil?',
        rede: 'Porto Alegre',
        status: 'aprovada',
      },
      {
        id: '13747',
        codigo: '13747',
        enunciado: 'Qual é o resultado de 15 ÷ 3?',
        rede: 'Gravataí',
        status: 'aprovada',
      },
      {
        id: '13746',
        codigo: '13746',
        enunciado: 'Qual é o sinônimo de "célere"?',
        rede: 'Canoas',
        status: 'aprovada',
      },
    ];

    const filteredQuestoes = selectedRede
      ? questoesMock.filter((q) => q.rede === selectedRede)
      : questoesMock;

    return (
      <div style={{ padding: '20px', maxWidth: '700px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 600 }}>
          Banco de Questões
        </h2>

        <NetworkFilter
          redes={redesMock}
          selectedRede={selectedRede}
          onRedeChange={setSelectedRede}
          label="Filtrar por Rede"
        />

        <p style={{ marginTop: '16px', fontSize: '14px', color: '#6B7280' }}>
          Mostrando {filteredQuestoes.length} questão
          {filteredQuestoes.length !== 1 ? 's' : ''}
        </p>

        <div style={{ marginTop: '16px' }}>
          {filteredQuestoes.map((q) => (
            <div
              key={q.id}
              style={{
                padding: '12px',
                marginBottom: '8px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                backgroundColor: '#F9FAFB',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>Código: {q.codigo}</p>
                  <p style={{ fontSize: '14px', fontWeight: 500, margin: '4px 0 0 0' }}>
                    {q.enunciado}
                  </p>
                </div>
                <span
                  style={{
                    marginLeft: '8px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  ✓
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
