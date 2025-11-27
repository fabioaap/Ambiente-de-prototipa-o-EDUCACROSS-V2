import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { QuestionDetailModal, type QuestionData } from '../components/QuestionDetailModal';

const meta = {
  title: 'BackOffice/QuestionDetailModal',
  component: QuestionDetailModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal para visualizar detalhes completos de uma questão. Usado na Jornada #4800.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const questaoMock: QuestionData = {
  id: '13749',
  codigo: '13749',
  enunciado: 'Qual é o resultado de 2 + 2?',
  alternativas: ['3', '4', '5', '6'],
  gabarito: '4',
  disciplina: 'Matemática',
  topico: '1.17.4 Números Inteiros',
  nivel: 'Fácil',
  autor: 'GG',
  criador: 'FM',
  revisor: 'BC',
  dataCriacao: '2025-11-20T10:30:00Z',
  uso: 'Canoas',
  status: 'aprovada',
  habilidades: ['EF07MA01'],
};

const questaoEmRevisao: QuestionData = {
  ...questaoMock,
  id: '13745',
  codigo: '13745',
  enunciado: 'Qual era o principal objetivo da Revolução Francesa?',
  alternativas: [
    'Expandir o império',
    'Abolir a monarquia absoluta',
    'Conquistar territórios',
    'Aumentar impostos',
  ],
  gabarito: 'Abolir a monarquia absoluta',
  disciplina: 'História',
  topico: '3.2.1 Revoluções Europeias',
  nivel: 'Difícil',
  uso: 'Porto Alegre',
  status: 'em-revisao',
};

// Story padrão - aberta
export const Default: Story = {
  args: {
    questao: questaoMock,
    isOpen: true,
    onClose: () => alert('Modal fechado'),
  },
};

// Story com status em revisão
export const EmRevisao: Story = {
  args: {
    questao: questaoEmRevisao,
    isOpen: true,
    onClose: () => alert('Modal fechado'),
  },
};

// Story com botão de seleção
export const ComSelectButton: Story = {
  args: {
    questao: questaoMock,
    isOpen: true,
    showSelectButton: true,
    onClose: () => alert('Modal fechado'),
    onSelect: (questao) => alert(`Questão selecionada: ${questao.codigo}`),
  },
};

// Story interativa com abertura/fechamento
const InterativaComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 16px',
          backgroundColor: '#3B82F6',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Abrir Modal
      </button>

      <QuestionDetailModal
        questao={questaoMock}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showSelectButton={true}
        onSelect={(q) => {
          alert(`Questão ${q.codigo} selecionada!`);
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export const Interativa: Story = {
  render: () => <InterativaComponent />,
};

// Story com questão de múltiplas habilidades
export const ComMultiplasHabilidades: Story = {
  args: {
    questao: {
      ...questaoMock,
      id: '13746',
      codigo: '13746',
      enunciado: 'Qual é a função do verbo em uma oração?',
      alternativas: [
        'Indicar qualidade',
        'Indicar ação, estado ou fenômeno',
        'Indicar quantidade',
        'Indicar relação',
      ],
      gabarito: 'Indicar ação, estado ou fenômeno',
      disciplina: 'Língua Portuguesa',
      topico: '2.2.1 Verbo',
      habilidades: ['EF06LP04', 'EF07LP01', 'EF08LP02'],
    },
    isOpen: true,
    onClose: () => alert('Modal fechado'),
  },
};

// Story - Rejeitada
export const Rejeitada: Story = {
  args: {
    questao: {
      ...questaoMock,
      id: '13737',
      codigo: '13737',
      enunciado: 'Qual é a velocidade da luz?',
      alternativas: ['100.000 km/s', '200.000 km/s', '300.000 km/s', '400.000 km/s'],
      gabarito: '300.000 km/s',
      disciplina: 'Física',
      topico: '5.1.1 Propriedades da Luz',
      uso: 'Gravataí',
      status: 'rejeitada',
    },
    isOpen: true,
    onClose: () => alert('Modal fechado'),
  },
};

// Story com lista de questões + modal
const ComListaDeQuestoesComponent = () => {
  const [selectedQuestao, setSelectedQuestao] = useState<QuestionData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const questoesMock: QuestionData[] = [questaoMock, questaoEmRevisao];

  return (
      <div style={{ padding: '20px', maxWidth: '700px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
          Banco de Questões
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {questoesMock.map((q) => (
            <div
              key={q.id}
              style={{
                padding: '12px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                  {q.codigo} - {q.enunciado.substring(0, 40)}...
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#9CA3AF' }}>
                  {q.disciplina} • {q.nivel}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedQuestao(q);
                  setIsModalOpen(true);
                }}
                style={{
                  marginLeft: '8px',
                  padding: '8px 12px',
                  backgroundColor: '#3B82F6',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Ver Detalhes
              </button>
            </div>
          ))}
        </div>

        {selectedQuestao && (
          <QuestionDetailModal
            questao={selectedQuestao}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedQuestao(null);
            }}
            showSelectButton={true}
            onSelect={(q) => {
            alert(`Questão ${q.codigo} selecionada!`);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export const ComListaDeQuestoes: Story = {
  render: () => <ComListaDeQuestoesComponent />,
};
