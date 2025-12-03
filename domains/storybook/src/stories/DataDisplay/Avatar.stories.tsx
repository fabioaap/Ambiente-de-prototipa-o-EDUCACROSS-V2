import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from '@prototipo/design-system';

const meta = {
  title: 'DataDisplay/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: 'select',
      options: ['none', 'online', 'offline', 'away', 'busy'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Histórias básicas do Avatar
export const ComImagem: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'Foto de perfil do usuário',
    size: 'md',
  },
};

export const ComIniciais: Story = {
  args: {
    initials: 'JD',
    size: 'md',
    'aria-label': 'Avatar de João da Silva',
  },
};

export const ComIcone: Story = {
  args: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="60%" height="60%">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
      </svg>
    ),
    size: 'md',
  },
};

export const Padrao: Story = {
  args: {
    size: 'md',
    'aria-label': 'Avatar padrão',
  },
};

// Tamanhos
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar initials="XS" size="xs" />
      <Avatar initials="SM" size="sm" />
      <Avatar initials="MD" size="md" />
      <Avatar initials="LG" size="lg" />
      <Avatar initials="XL" size="xl" />
    </div>
  ),
};

// Status
export const ComStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://i.pravatar.cc/150?img=2"
          status="online"
          size="lg"
          aria-describedby="status-online"
        />
        <div id="status-online" style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          Online
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://i.pravatar.cc/150?img=3"
          status="offline"
          size="lg"
          aria-describedby="status-offline"
        />
        <div id="status-offline" style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          Offline
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://i.pravatar.cc/150?img=4"
          status="away"
          size="lg"
          aria-describedby="status-away"
        />
        <div id="status-away" style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          Ausente
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar
          src="https://i.pravatar.cc/150?img=5"
          status="busy"
          size="lg"
          aria-describedby="status-busy"
        />
        <div id="status-busy" style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          Ocupado
        </div>
      </div>
    </div>
  ),
};

// Badge
export const ComBadge: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Avatar
        src="https://i.pravatar.cc/150?img=6"
        badge={<span>3</span>}
        size="lg"
      />
      <Avatar
        initials="AB"
        badge={<span>99+</span>}
        size="lg"
      />
      <Avatar
        initials="CD"
        badge={<span>•</span>}
        size="lg"
      />
    </div>
  ),
};

// Fallback chain
export const CadeiaFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Avatar
          src="https://i.pravatar.cc/150?img=7"
          initials="FB"
          size="lg"
        />
        <span>Imagem carregada</span>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Avatar
          src="https://invalid-url-for-testing.com/image.jpg"
          initials="FB"
          size="lg"
        />
        <span>Fallback para iniciais (imagem inválida)</span>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Avatar
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="60%" height="60%">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          }
          size="lg"
        />
        <span>Fallback para ícone</span>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Avatar size="lg" />
        <span>Fallback padrão</span>
      </div>
    </div>
  ),
};

// AvatarGroup
export const GrupoBasico: Story = {
  render: () => (
    <AvatarGroup
      avatars={[
        { src: 'https://i.pravatar.cc/150?img=8', alt: 'Usuário 1' },
        { src: 'https://i.pravatar.cc/150?img=9', alt: 'Usuário 2' },
        { src: 'https://i.pravatar.cc/150?img=10', alt: 'Usuário 3' },
        { initials: 'AB', alt: 'Usuário 4' },
        { initials: 'CD', alt: 'Usuário 5' },
      ]}
      size="md"
    />
  ),
};

export const GrupoComOverflow: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Máximo de 3 avatares</h3>
        <AvatarGroup
          avatars={[
            { src: 'https://i.pravatar.cc/150?img=11', alt: 'Usuário 1' },
            { src: 'https://i.pravatar.cc/150?img=12', alt: 'Usuário 2' },
            { src: 'https://i.pravatar.cc/150?img=13', alt: 'Usuário 3' },
            { initials: 'AB', alt: 'Usuário 4' },
            { initials: 'CD', alt: 'Usuário 5' },
            { initials: 'EF', alt: 'Usuário 6' },
            { initials: 'GH', alt: 'Usuário 7' },
          ]}
          max={3}
          size="md"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Máximo de 5 avatares</h3>
        <AvatarGroup
          avatars={Array.from({ length: 12 }, (_, i) => ({
            initials: `U${i + 1}`,
            alt: `Usuário ${i + 1}`,
          }))}
          max={5}
          size="md"
        />
      </div>
    </div>
  ),
};

export const GrupoTamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '1rem' }}>Extra Small</h4>
        <AvatarGroup
          avatars={[
            { initials: 'A' },
            { initials: 'B' },
            { initials: 'C' },
            { initials: 'D' },
            { initials: 'E' },
          ]}
          size="xs"
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem' }}>Small</h4>
        <AvatarGroup
          avatars={[
            { initials: 'A' },
            { initials: 'B' },
            { initials: 'C' },
            { initials: 'D' },
            { initials: 'E' },
          ]}
          size="sm"
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem' }}>Medium</h4>
        <AvatarGroup
          avatars={[
            { initials: 'A' },
            { initials: 'B' },
            { initials: 'C' },
            { initials: 'D' },
            { initials: 'E' },
          ]}
          size="md"
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem' }}>Large</h4>
        <AvatarGroup
          avatars={[
            { initials: 'A' },
            { initials: 'B' },
            { initials: 'C' },
            { initials: 'D' },
            { initials: 'E' },
          ]}
          size="lg"
        />
      </div>
    </div>
  ),
};

export const GrupoSemEmpilhamento: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Com empilhamento (stacked)</h3>
        <AvatarGroup
          avatars={[
            { src: 'https://i.pravatar.cc/150?img=14' },
            { src: 'https://i.pravatar.cc/150?img=15' },
            { src: 'https://i.pravatar.cc/150?img=16' },
            { initials: 'AB' },
          ]}
          stacked={true}
          size="md"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Sem empilhamento</h3>
        <AvatarGroup
          avatars={[
            { src: 'https://i.pravatar.cc/150?img=14' },
            { src: 'https://i.pravatar.cc/150?img=15' },
            { src: 'https://i.pravatar.cc/150?img=16' },
            { initials: 'AB' },
          ]}
          stacked={false}
          size="md"
        />
      </div>
    </div>
  ),
};

// Casos complexos
export const CasosComplexos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Avatar com status e badge</h3>
        <Avatar
          src="https://i.pravatar.cc/150?img=20"
          status="online"
          badge={<span>5</span>}
          size="xl"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Grupo com overflow e status</h3>
        <AvatarGroup
          avatars={[
            { src: 'https://i.pravatar.cc/150?img=21', status: 'online' },
            { src: 'https://i.pravatar.cc/150?img=22', status: 'busy' },
            { src: 'https://i.pravatar.cc/150?img=23', status: 'away' },
            { initials: 'AB', status: 'offline' },
            { initials: 'CD', status: 'online' },
            { initials: 'EF', status: 'away' },
            { initials: 'GH', status: 'busy' },
          ]}
          max={4}
          size="lg"
        />
      </div>
    </div>
  ),
};
