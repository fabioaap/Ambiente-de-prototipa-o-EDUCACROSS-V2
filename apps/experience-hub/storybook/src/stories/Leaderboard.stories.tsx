import type { Meta, StoryObj } from '@storybook/react';
import { Leaderboard, type LeaderboardEntry } from '@prototipo/design-system';

// Mock data
const mockEntries: LeaderboardEntry[] = [
  { id: '1', name: 'Maria Silva', score: 9850, badge: 'Pro' },
  { id: '2', name: 'João Santos', score: 9200 },
  { id: '3', name: 'Ana Costa', score: 8750, badge: 'Expert' },
  { id: '4', name: 'Pedro Oliveira', score: 8100 },
  { id: '5', name: 'Carla Mendes', score: 7850 },
  { id: '6', name: 'Lucas Ferreira', score: 7200, badge: 'VIP' },
  { id: '7', name: 'Juliana Souza', score: 6900 },
  { id: '8', name: 'Rafael Lima', score: 6500 },
  { id: '9', name: 'Beatriz Alves', score: 6100 },
  { id: '10', name: 'Gabriel Rocha', score: 5850 },
  { id: '11', name: 'Camila Martins', score: 5600 },
  { id: '12', name: 'Diego Pereira', score: 5350 },
  { id: '13', name: 'Fernanda Castro', score: 5100 },
  { id: '14', name: 'Ricardo Barbosa', score: 4900 },
  { id: '15', name: 'Patricia Dias', score: 4650 },
];

const meta = {
  title: 'Components/Leaderboard',
  component: Leaderboard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    entries: {
      control: 'object',
    },
    limit: {
      control: { type: 'number', min: 1, max: 50 },
    },
    showTopBadges: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Leaderboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entries: mockEntries,
    showTopBadges: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Top10: Story = {
  args: {
    entries: mockEntries,
    limit: 10,
    showTopBadges: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Top5: Story = {
  args: {
    entries: mockEntries,
    limit: 5,
    showTopBadges: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Top3: Story = {
  args: {
    entries: mockEntries,
    limit: 3,
    showTopBadges: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutTopBadges: Story = {
  args: {
    entries: mockEntries,
    limit: 10,
    showTopBadges: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const HighlightedUser: Story = {
  args: {
    entries: mockEntries,
    limit: 10,
    highlightId: '5',
    showTopBadges: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Destaca um usuário específico no leaderboard.',
      },
    },
  },
};

export const WithAvatars: Story = {
  args: {
    entries: [
      {
        id: '1',
        name: 'Maria Silva',
        score: 9850,
        avatar: 'https://i.pravatar.cc/150?img=1',
        badge: 'Pro',
      },
      {
        id: '2',
        name: 'João Santos',
        score: 9200,
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      {
        id: '3',
        name: 'Ana Costa',
        score: 8750,
        avatar: 'https://i.pravatar.cc/150?img=3',
        badge: 'Expert',
      },
      {
        id: '4',
        name: 'Pedro Oliveira',
        score: 8100,
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
      {
        id: '5',
        name: 'Carla Mendes',
        score: 7850,
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
    ],
    showTopBadges: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Leaderboard com avatares reais dos usuários.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    entries: [],
    showTopBadges: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Estado vazio quando não há entradas.',
      },
    },
  },
};

export const SmallDataset: Story = {
  args: {
    entries: [
      { id: '1', name: 'Alice', score: 100 },
      { id: '2', name: 'Bob', score: 80 },
    ],
    showTopBadges: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Leaderboard com poucos participantes.',
      },
    },
  },
};

export const GameScenario: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          🎮 Ranking do Jogo
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Top 10 jogadores desta semana
        </p>
      </div>
      <Leaderboard
        entries={mockEntries}
        limit={10}
        highlightId="7"
        showTopBadges={true}
        aria-label="Ranking semanal do jogo"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de uso em contexto de jogo/gamificação.',
      },
    },
  },
};

export const CourseProgress: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          📚 Ranking do Curso
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Pontuação acumulada dos estudantes
        </p>
      </div>
      <Leaderboard
        entries={[
          {
            id: '1',
            name: 'Maria Silva',
            score: 985,
            badge: 'A+',
          },
          {
            id: '2',
            name: 'João Santos',
            score: 920,
            badge: 'A',
          },
          {
            id: '3',
            name: 'Ana Costa',
            score: 875,
            badge: 'A',
          },
          {
            id: '4',
            name: 'Pedro Oliveira',
            score: 810,
            badge: 'B+',
          },
          {
            id: '5',
            name: 'Carla Mendes',
            score: 785,
            badge: 'B+',
          },
        ]}
        limit={5}
        showTopBadges={true}
        aria-label="Ranking de pontos do curso"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de uso em contexto educacional.',
      },
    },
  },
};

export const ResponsiveDemo: Story = {
  args: {
    entries: mockEntries,
    limit: 5,
    showTopBadges: true,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          resize: 'horizontal',
          overflow: 'auto',
          padding: '1rem',
          border: '1px dashed #ccc',
        }}
      >
        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
          ℹ️ Redimensione o container para ver a responsividade
        </p>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Demonstração de responsividade - redimensione o container.',
      },
    },
  },
};

export const AccessibilityDemo: Story = {
  args: {
    entries: mockEntries,
    limit: 5,
    showTopBadges: true,
    'aria-label': 'Tabela de classificação dos jogadores',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <p style={{ fontSize: '0.875rem', marginBottom: '1rem', color: '#6b7280' }}>
          ♿ Este componente usa role="table" e ARIA attributes para acessibilidade.
          Use Tab para navegar entre as linhas.
        </p>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Componente totalmente acessível com roles semânticas e ARIA labels.',
      },
    },
  },
};
