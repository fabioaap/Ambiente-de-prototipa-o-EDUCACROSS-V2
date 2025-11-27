import type { Meta, StoryObj } from '@storybook/react';
import { Card, Text, Button, Badge, Progress } from '@prototipo/design-system';
import React from 'react';

/**
 * GameCard é um componente composto usado no Game Hub para exibir
 * informações sobre jogos educacionais.
 * 
 * Este componente utiliza Card, Text, Button, Badge e Progress do design-system.
 */

// Componente GameCard para demonstração no Storybook
interface GameCardDemoProps {
  title: string;
  description: string;
  thumbnail: string;
  category: 'math' | 'language' | 'science' | 'logic';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  progress: number;
  status: 'new' | 'popular' | 'completed' | 'none';
}

const GameCardDemo: React.FC<GameCardDemoProps> = ({
  title,
  description,
  thumbnail,
  category,
  difficulty,
  estimatedTime,
  progress,
  status,
}) => {
  const categoryLabels: Record<string, string> = {
    math: 'Matemática',
    language: 'Linguagem',
    science: 'Ciências',
    logic: 'Lógica',
  };
  const categoryColors: Record<string, string> = {
    math: '#3b82f6',
    language: '#22c55e',
    science: '#f59e0b',
    logic: '#8b5cf6',
  };
  const difficultyLabels: Record<string, string> = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil',
  };
  const statusVariants: Record<string, 'success' | 'warning' | 'info' | 'default'> = {
    new: 'info',
    popular: 'warning',
    completed: 'success',
    none: 'default',
  };
  const statusLabels: Record<string, string> = {
    new: 'Novo',
    popular: 'Popular',
    completed: 'Concluído',
    none: '',
  };

  return (
    <Card variant="elevated" padding="md">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Header com thumbnail e status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '48px', lineHeight: 1 }}>{thumbnail}</span>
          {status !== 'none' && (
            <Badge variant={statusVariants[status]} size="sm">
              {statusLabels[status]}
            </Badge>
          )}
        </div>

        {/* Título e descrição */}
        <div>
          <Text as="h3" size="xl" weight="semibold" color="default">
            {title}
          </Text>
          <Text as="p" size="sm" color="muted">
            {description}
          </Text>
        </div>

        {/* Metadados */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              backgroundColor: categoryColors[category],
              color: 'white',
            }}
          >
            {categoryLabels[category]}
          </span>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              backgroundColor: '#e5e7eb',
              color: '#374151',
            }}
          >
            {difficultyLabels[difficulty]}
          </span>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              backgroundColor: '#e5e7eb',
              color: '#374151',
            }}
          >
            ⏱️ {estimatedTime}
          </span>
        </div>

        {/* Progresso */}
        {progress > 0 && (
          <div>
            <Progress value={progress} size="sm" color="primary" showLabel />
          </div>
        )}

        {/* Botão de ação */}
        <Button variant="primary" size="md">
          {progress > 0 && progress < 100 ? 'Continuar' : progress === 100 ? 'Jogar Novamente' : 'Jogar'}
        </Button>
      </div>
    </Card>
  );
};

const meta = {
  title: 'Game Hub/GameCard',
  component: GameCardDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O GameCard é usado no Game Hub para exibir jogos educacionais.
Ele combina vários componentes do design-system:
- **Card**: Container com estilização elevada
- **Badge**: Status do jogo (Novo, Popular, Concluído)
- **Progress**: Indicador de progresso do jogador
- **Button**: Ação para jogar/continuar
- **Text**: Título e descrição

## Uso no Puck Studio
Este componente está disponível no editor Puck como \`GameCard\` e pode ser usado
dentro do componente \`GameGrid\` para criar layouts de hub de jogos.

## Categorias
- 🧮 Matemática (azul)
- 📚 Linguagem (verde)
- 🔬 Ciências (laranja)
- 🧩 Lógica (roxo)

## Dificuldades
- Fácil
- Médio
- Difícil
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'select',
      options: ['math', 'language', 'science', 'logic'],
      description: 'Categoria educacional do jogo',
    },
    difficulty: {
      control: 'select',
      options: ['easy', 'medium', 'hard'],
      description: 'Nível de dificuldade',
    },
    status: {
      control: 'select',
      options: ['none', 'new', 'popular', 'completed'],
      description: 'Status especial do jogo',
    },
    progress: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Progresso do jogador (0-100)',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GameCardDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories

export const Default: Story = {
  args: {
    title: 'Desafio Matemático',
    description: 'Resolva problemas matemáticos e desafie seus amigos!',
    thumbnail: '🧮',
    category: 'math',
    difficulty: 'medium',
    estimatedTime: '10-15 min',
    progress: 0,
    status: 'none',
  },
};

export const NewGame: Story = {
  args: {
    title: 'Quiz de Ciências',
    description: 'Teste seus conhecimentos científicos',
    thumbnail: '🔬',
    category: 'science',
    difficulty: 'hard',
    estimatedTime: '15-20 min',
    progress: 0,
    status: 'new',
  },
  parameters: {
    docs: {
      description: {
        story: 'Um jogo novo com badge "Novo" destacado.',
      },
    },
  },
};

export const Popular: Story = {
  args: {
    title: 'Tabuada Turbo',
    description: 'Pratique a tabuada de forma divertida',
    thumbnail: '⚡',
    category: 'math',
    difficulty: 'easy',
    estimatedTime: '5-10 min',
    progress: 75,
    status: 'popular',
  },
  parameters: {
    docs: {
      description: {
        story: 'Um jogo popular com progresso parcial do jogador.',
      },
    },
  },
};

export const Completed: Story = {
  args: {
    title: 'Mestre das Palavras',
    description: 'Expanda seu vocabulário neste jogo de palavras',
    thumbnail: '📚',
    category: 'language',
    difficulty: 'easy',
    estimatedTime: '5-10 min',
    progress: 100,
    status: 'completed',
  },
  parameters: {
    docs: {
      description: {
        story: 'Um jogo completado com progresso 100%.',
      },
    },
  },
};

export const InProgress: Story = {
  args: {
    title: 'Quebra-Cabeças Lógicos',
    description: 'Exercite seu raciocínio com desafios lógicos',
    thumbnail: '🧩',
    category: 'logic',
    difficulty: 'medium',
    estimatedTime: '10-15 min',
    progress: 45,
    status: 'none',
  },
  parameters: {
    docs: {
      description: {
        story: 'Um jogo em progresso com 45% completado.',
      },
    },
  },
};

export const HardDifficulty: Story = {
  args: {
    title: 'Desafio Científico Avançado',
    description: 'Para os mais corajosos! Questões complexas de ciências.',
    thumbnail: '🧪',
    category: 'science',
    difficulty: 'hard',
    estimatedTime: '20-30 min',
    progress: 0,
    status: 'none',
  },
  parameters: {
    docs: {
      description: {
        story: 'Um jogo de dificuldade difícil.',
      },
    },
  },
};

// Grid de exemplos
export const GameCardGrid: Story = {
  args: {
    title: 'Exemplo',
    description: 'Descrição',
    thumbnail: '🎮',
    category: 'math',
    difficulty: 'easy',
    estimatedTime: '5 min',
    progress: 0,
    status: 'none',
  },
  decorators: [
    () => (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '20px',
        maxWidth: '900px',
        padding: '20px',
      }}>
        <GameCardDemo
          title="Desafio Matemático"
          description="Resolva problemas matemáticos"
          thumbnail="🧮"
          category="math"
          difficulty="medium"
          estimatedTime="10-15 min"
          progress={75}
          status="popular"
        />
        <GameCardDemo
          title="Mestre das Palavras"
          description="Expanda seu vocabulário"
          thumbnail="📚"
          category="language"
          difficulty="easy"
          estimatedTime="5-10 min"
          progress={100}
          status="completed"
        />
        <GameCardDemo
          title="Quiz de Ciências"
          description="Teste seus conhecimentos"
          thumbnail="🔬"
          category="science"
          difficulty="hard"
          estimatedTime="15-20 min"
          progress={0}
          status="new"
        />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de grid com múltiplos GameCards, similar ao Game Hub.',
      },
    },
  },
};
