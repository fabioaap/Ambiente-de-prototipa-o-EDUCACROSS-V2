import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Leaderboard, type LeaderboardEntry } from '@prototipo/design-system';

const mockGameEntries = [
  { id: '1', name: 'João Silva', score: 1500 },
  { id: '2', name: 'Maria Santos', score: 1200 },
  { id: '3', name: 'Pedro Oliveira', score: 1100 },
  { id: '4', name: 'Ana Costa', score: 950 },
  { id: '5', name: 'Carlos Ferreira', score: 890 },
  { id: '6', name: 'Juliana Lima', score: 820 },
  { id: '7', name: 'Roberto Alves', score: 750 },
  { id: '8', name: 'Fernanda Souza', score: 680 },
  { id: '9', name: 'Lucas Martins', score: 620 },
  { id: '10', name: 'Patrícia Rocha', score: 550 },
  { id: '11', name: 'Rafael Cardoso', score: 500 },
  { id: '12', name: 'Amanda Pereira', score: 480 },
  { id: '13', name: 'Bruno Mendes', score: 450 },
  { id: '14', name: 'Camila Ribeiro', score: 420 },
  { id: '15', name: 'Diego Barbosa', score: 400 },
  { id: '16', name: 'Eduarda Gomes', score: 380 },
  { id: '17', name: 'Felipe Nascimento', score: 360 },
  { id: '18', name: 'Gabriela Moreira', score: 340 },
  { id: '19', name: 'Henrique Araújo', score: 320 },
  { id: '20', name: 'Isabela Castro', score: 300 },
];

const meta = {
  title: 'Components/Leaderboard',
  component: Leaderboard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Leaderboard para exibir rankings e competições. Suporta paginação, avatares, badges para top 3 e é totalmente responsivo e acessível.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxEntries: {
      control: { type: 'number', min: 3, max: 20, step: 1 },
      description: 'Número máximo de entradas a exibir (paginação)',
    },
    highlightTop3: {
      control: 'boolean',
      description: 'Destaca os 3 primeiros lugares com badges de medalhas',
    },
    showAvatar: {
      control: 'boolean',
      description: 'Exibe avatares ou iniciais dos participantes',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed'],
      description: 'Variante visual do leaderboard',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Leaderboard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Exemplo padrão do Leaderboard com top 10 jogadores,
 * destacando os 3 primeiros lugares com badges de medalhas.
 */
export const Default: Story = {
  args: {
    entries: mockGameEntries,
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: true,
    variant: 'default',
  },
};

/**
 * Leaderboard mostrando apenas o top 5,
 * ideal para espaços mais compactos ou destaques principais.
 */
export const Top5: Story = {
  args: {
    entries: mockGameEntries,
    maxEntries: 5,
    highlightTop3: true,
    showAvatar: true,
  },
};

/**
 * Leaderboard estendido mostrando top 20 jogadores,
 * útil para competições maiores ou páginas dedicadas.
 */
export const Top20: Story = {
  args: {
    entries: mockGameEntries,
    maxEntries: 20,
    highlightTop3: true,
    showAvatar: true,
  },
};

/**
 * Variante compacta com espaçamento reduzido,
 * ideal para sidebars ou widgets.
 */
export const CompactVariant: Story = {
  args: {
    entries: mockGameEntries,
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: true,
    variant: 'compact',
  },
};

/**
 * Variante detalhada com maior espaçamento e elementos visuais ampliados.
 */
export const DetailedVariant: Story = {
  args: {
    entries: mockGameEntries,
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: true,
    variant: 'detailed',
  },
};

/**
 * Leaderboard com imagens de avatar reais (usando pravatar.cc como exemplo).
 * Quando não há URL de avatar, são exibidas as iniciais do nome.
 */
export const WithRealAvatars: Story = {
  args: {
    entries: [
      { id: '1', name: 'João Silva', score: 1500, avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: '2', name: 'Maria Santos', score: 1200, avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: '3', name: 'Pedro Oliveira', score: 1100, avatar: 'https://i.pravatar.cc/150?img=12' },
      { id: '4', name: 'Ana Costa', score: 950, avatar: 'https://i.pravatar.cc/150?img=9' },
      { id: '5', name: 'Carlos Ferreira', score: 890 },
      { id: '6', name: 'Juliana Lima', score: 820 },
      { id: '7', name: 'Roberto Alves', score: 750, avatar: 'https://i.pravatar.cc/150?img=33' },
      { id: '8', name: 'Fernanda Souza', score: 680 },
      { id: '9', name: 'Lucas Martins', score: 620 },
      { id: '10', name: 'Patrícia Rocha', score: 550, avatar: 'https://i.pravatar.cc/150?img=45' },
    ],
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: true,
  },
};

/**
 * Leaderboard sem destaque do top 3,
 * apresentação mais uniforme de todos os participantes.
 */
export const WithoutTop3Highlight: Story = {
  args: {
    entries: mockGameEntries,
    maxEntries: 10,
    highlightTop3: false,
    showAvatar: true,
  },
};

/**
 * Leaderboard sem avatares,
 * focando apenas em ranking, nome e pontuação.
 */
export const WithoutAvatars: Story = {
  args: {
    entries: mockGameEntries,
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: false,
  },
};

/**
 * Versão minimalista sem avatares e sem badges,
 * ideal para contextos onde só importa a posição e pontuação.
 */
export const MinimalVersion: Story = {
  args: {
    entries: mockGameEntries,
    maxEntries: 10,
    highlightTop3: false,
    showAvatar: false,
    variant: 'compact',
  },
};

/**
 * Estado vazio quando não há dados disponíveis.
 */
export const EmptyState: Story = {
  args: {
    entries: [],
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: true,
  },
};

/**
 * Exemplo com apenas um participante.
 */
export const SingleParticipant: Story = {
  args: {
    entries: [{ id: '1', name: 'Campeão Solitário', score: 9999 }],
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: true,
  },
};

/**
 * Preview em dispositivo móvel (375px).
 * Em mobile, os badges são ocultados automaticamente para economizar espaço.
 */
export const MobileView: Story = {
  args: {
    entries: mockGameEntries,
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Componente para demonstrar dados dinâmicos ao vivo
 */
const LiveLeaderboard = (args: { entries: LeaderboardEntry[]; maxEntries?: number; highlightTop3?: boolean; showAvatar?: boolean }) => {
  const [entries, setEntries] = React.useState(args.entries || []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setEntries((prev: LeaderboardEntry[]) =>
        prev.map((entry: LeaderboardEntry) => ({
          ...entry,
          score: Math.max(0, entry.score + Math.floor(Math.random() * 100) - 40),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return <Leaderboard {...args} entries={entries} />;
};

/**
 * Exemplo de dados sendo atualizados dinamicamente em tempo real.
 * As pontuações mudam a cada 3 segundos simulando um jogo ao vivo.
 */
export const LiveUpdates: Story = {
  args: {
    entries: mockGameEntries.slice(0, 10),
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: true,
  },
  render: (args) => <LiveLeaderboard {...args} />,
};

/**
 * Exemplo com aria-label customizado para melhor acessibilidade.
 * Recomendado para fornecer contexto adicional aos leitores de tela.
 */
export const CustomAriaLabel: Story = {
  args: {
    entries: mockGameEntries.slice(0, 5),
    maxEntries: 5,
    highlightTop3: true,
    showAvatar: true,
    'aria-label': 'Ranking dos 5 melhores jogadores da competição de matemática desta semana',
  },
};

/**
 * Exemplo de uso em contexto de game educativo,
 * mostrando como integrar em uma jornada de gamificação.
 */
export const GameContext: Story = {
  args: {
    entries: mockGameEntries,
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: true,
  },
  render: (args) => (
    <div style={{ padding: '24px', background: '#f9fafb', borderRadius: '12px' }}>
      <h2 style={{ marginTop: 0, marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>
        🏆 Ranking Global - Desafio de Matemática
      </h2>
      <p style={{ marginBottom: '24px', color: '#6b7280' }}>
        Veja como você se compara aos outros jogadores!
      </p>
      <Leaderboard {...args} />
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <button
          style={{
            padding: '12px 24px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Ver Ranking Completo
        </button>
      </div>
    </div>
  ),
};
