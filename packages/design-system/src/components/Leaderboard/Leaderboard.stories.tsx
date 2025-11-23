import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Leaderboard } from './Leaderboard';
import type { LeaderboardEntry } from './Leaderboard';

const mockEntries = [
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
];

const meta: Meta<typeof Leaderboard> = {
  title: 'Components/Leaderboard',
  component: Leaderboard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    maxEntries: {
      control: { type: 'number', min: 3, max: 20, step: 1 },
      description: 'Número máximo de entradas exibidas',
    },
    highlightTop3: {
      control: 'boolean',
      description: 'Destaca os 3 primeiros lugares com badges',
    },
    showAvatar: {
      control: 'boolean',
      description: 'Exibe avatares/iniciais dos participantes',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed'],
      description: 'Variante visual do leaderboard',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '700px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entries: mockEntries.slice(0, 10),
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: true,
    variant: 'default',
  },
};

export const WithAvatars: Story = {
  args: {
    entries: [
      { id: '1', name: 'João Silva', score: 1500, avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: '2', name: 'Maria Santos', score: 1200, avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: '3', name: 'Pedro Oliveira', score: 1100, avatar: 'https://i.pravatar.cc/150?img=12' },
      { id: '4', name: 'Ana Costa', score: 950 },
      { id: '5', name: 'Carlos Ferreira', score: 890 },
    ],
    maxEntries: 5,
    highlightTop3: true,
    showAvatar: true,
  },
};

export const Top5: Story = {
  args: {
    entries: mockEntries,
    maxEntries: 5,
    highlightTop3: true,
    showAvatar: true,
  },
};

export const Top20: Story = {
  args: {
    entries: mockEntries,
    maxEntries: 20,
    highlightTop3: true,
    showAvatar: true,
  },
};

export const CompactVariant: Story = {
  args: {
    entries: mockEntries.slice(0, 10),
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: true,
    variant: 'compact',
  },
};

export const DetailedVariant: Story = {
  args: {
    entries: mockEntries.slice(0, 10),
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: true,
    variant: 'detailed',
  },
};

export const WithoutHighlight: Story = {
  args: {
    entries: mockEntries.slice(0, 10),
    maxEntries: 10,
    highlightTop3: false,
    showAvatar: true,
  },
};

export const WithoutAvatars: Story = {
  args: {
    entries: mockEntries.slice(0, 10),
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: false,
  },
};

export const MinimalVersion: Story = {
  args: {
    entries: mockEntries.slice(0, 10),
    maxEntries: 10,
    highlightTop3: false,
    showAvatar: false,
    variant: 'compact',
  },
};

export const EmptyState: Story = {
  args: {
    entries: [],
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: true,
  },
};

export const SingleEntry: Story = {
  args: {
    entries: [{ id: '1', name: 'Único Participante', score: 100 }],
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: true,
  },
};

export const MobilePreview: Story = {
  args: {
    entries: mockEntries.slice(0, 10),
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '10px' }}>
        <Story />
      </div>
    ),
  ],
};

// Componente para demonstrar dados dinâmicos
const DynamicLeaderboard = (args: typeof Default.args) => {
  const [entries, setEntries] = React.useState(args.entries || []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setEntries((prev: LeaderboardEntry[]) =>
        prev.map((entry: LeaderboardEntry) => ({
          ...entry,
          score: entry.score + Math.floor(Math.random() * 50) - 25,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return <Leaderboard {...args} entries={entries} />;
};

// Exemplo de uso com dados dinâmicos
export const DynamicData: Story = {
  args: {
    entries: mockEntries,
    maxEntries: 10,
    highlightTop3: true,
    showAvatar: true,
  },
  render: (args) => <DynamicLeaderboard {...args} />,
};

// Acessibilidade
export const AccessibilityExample: Story = {
  args: {
    entries: mockEntries.slice(0, 5),
    maxEntries: 5,
    highlightTop3: true,
    showAvatar: true,
    'aria-label': 'Ranking dos 5 melhores jogadores da semana',
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo com label ARIA personalizado para melhor acessibilidade. Navegável por teclado e leitores de tela.',
      },
    },
  },
};
