import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@prototipo/design-system';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Text: Story = {
  args: {
    width: '200px',
    height: '1rem',
    variant: 'text',
    animation: 'pulse',
  },
};

export const Circular: Story = {
  args: {
    width: 40,
    height: 40,
    variant: 'circular',
    animation: 'pulse',
  },
};

export const Rectangular: Story = {
  args: {
    width: '300px',
    height: '200px',
    variant: 'rectangular',
    animation: 'pulse',
  },
};

// Animation variants
export const PulseAnimation: Story = {
  args: {
    width: '200px',
    height: '20px',
    variant: 'rectangular',
    animation: 'pulse',
  },
};

export const WaveAnimation: Story = {
  args: {
    width: '200px',
    height: '20px',
    variant: 'rectangular',
    animation: 'wave',
  },
};

export const NoAnimation: Story = {
  args: {
    width: '200px',
    height: '20px',
    variant: 'rectangular',
    animation: 'none',
  },
};

// Composite examples
export const CardSkeleton: Story = {
  render: () => (
    <div style={{ width: '300px', padding: '16px', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
      <Skeleton width="100%" height="180px" variant="rectangular" animation="wave" />
      <div style={{ marginTop: '16px' }}>
        <Skeleton width="60%" height="24px" variant="text" />
        <Skeleton width="90%" height="16px" variant="text" style={{ marginTop: '8px' }} />
        <Skeleton width="80%" height="16px" variant="text" style={{ marginTop: '4px' }} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton de um card com imagem e texto, ideal para loading states.',
      },
    },
  },
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
      <Skeleton width={64} height={64} variant="circular" />
      <div style={{ flex: 1 }}>
        <Skeleton width="150px" height="20px" variant="text" />
        <Skeleton width="200px" height="16px" variant="text" style={{ marginTop: '8px' }} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton de perfil com avatar e informações de usuário.',
      },
    },
  },
};

export const ListSkeleton: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 0',
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          <Skeleton width={40} height={40} variant="circular" />
          <div style={{ flex: 1 }}>
            <Skeleton width="70%" height="16px" variant="text" />
            <Skeleton width="50%" height="14px" variant="text" style={{ marginTop: '4px' }} />
          </div>
          <Skeleton width={60} height={32} variant="rectangular" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton de lista com múltiplos itens, útil para feeds e listas.',
      },
    },
  },
};

export const TableSkeleton: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      {/* Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '12px', padding: '12px', backgroundColor: '#f5f5f5' }}>
        <Skeleton width="80px" height="16px" variant="text" />
        <Skeleton width="120px" height="16px" variant="text" />
        <Skeleton width="60px" height="16px" variant="text" />
      </div>
      {/* Rows */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 1fr',
            gap: '12px',
            padding: '12px',
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          <Skeleton width="60px" height="16px" variant="text" />
          <Skeleton width="90%" height="16px" variant="text" />
          <Skeleton width="50px" height="16px" variant="text" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton de tabela com cabeçalho e múltiplas linhas.',
      },
    },
  },
};
