import type { Meta, StoryObj } from '@storybook/react';
import { USOBadge } from '../components/USOBadge';

const meta = {
  title: 'BackOffice/USOBadge',
  component: USOBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge para exibir a rede/contexto de uma questão. Usado na Jornada #4800.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    rede: {
      control: 'select',
      options: ['Canoas', 'Porto Alegre', 'Gravataí'],
      description: 'Nome da rede/contexto',
    },
    variant: {
      control: 'radio',
      options: ['filled', 'outline'],
      description: 'Estilo do badge',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do badge',
    },
  },
} satisfies Meta<typeof USOBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story padrão
export const Default: Story = {
  args: {
    rede: 'Canoas',
    variant: 'filled',
    size: 'md',
  },
};

// Variantes de Rede
export const Canoas: Story = {
  args: {
    rede: 'Canoas',
    variant: 'filled',
    size: 'md',
  },
};

export const PortoAlegre: Story = {
  args: {
    rede: 'Porto Alegre',
    variant: 'filled',
    size: 'md',
  },
};

export const Gravarai: Story = {
  args: {
    rede: 'Gravataí',
    variant: 'filled',
    size: 'md',
  },
};

// Variantes de Estilo
export const Outline: Story = {
  args: {
    rede: 'Canoas',
    variant: 'outline',
    size: 'md',
  },
};

export const OutlinePortoAlegre: Story = {
  args: {
    rede: 'Porto Alegre',
    variant: 'outline',
    size: 'md',
  },
};

// Variantes de Tamanho
export const Small: Story = {
  args: {
    rede: 'Canoas',
    variant: 'filled',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    rede: 'Canoas',
    variant: 'filled',
    size: 'lg',
  },
};

// Todas as Redes com Tamanho Médio
export const TodasAsRedes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <USOBadge rede="Canoas" variant="filled" size="md" />
      <USOBadge rede="Porto Alegre" variant="filled" size="md" />
      <USOBadge rede="Gravataí" variant="filled" size="md" />
    </div>
  ),
};

// Exemplo em Contexto (Lista de Questões)
export const EmContexto: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
            <th style={{ textAlign: 'left', padding: '12px', fontWeight: 600 }}>Código</th>
            <th style={{ textAlign: 'left', padding: '12px', fontWeight: 600 }}>Questão</th>
            <th style={{ textAlign: 'left', padding: '12px', fontWeight: 600 }}>Rede</th>
            <th style={{ textAlign: 'left', padding: '12px', fontWeight: 600 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
            <td style={{ padding: '12px' }}>13749</td>
            <td style={{ padding: '12px' }}>Qual é o resultado de 2 + 2?</td>
            <td style={{ padding: '12px' }}>
              <USOBadge rede="Canoas" variant="filled" size="sm" />
            </td>
            <td style={{ padding: '12px' }}>✓ Aprovada</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
            <td style={{ padding: '12px' }}>13748</td>
            <td style={{ padding: '12px' }}>Qual é a capital do Brasil?</td>
            <td style={{ padding: '12px' }}>
              <USOBadge rede="Porto Alegre" variant="filled" size="sm" />
            </td>
            <td style={{ padding: '12px' }}>✓ Aprovada</td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}>13747</td>
            <td style={{ padding: '12px' }}>Qual é o resultado de 15 ÷ 3?</td>
            <td style={{ padding: '12px' }}>
              <USOBadge rede="Gravataí" variant="filled" size="sm" />
            </td>
            <td style={{ padding: '12px' }}>✓ Aprovada</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
