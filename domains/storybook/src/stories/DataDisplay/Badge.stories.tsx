import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@prototipo/design-system';

const meta = {
  title: 'DataDisplay/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Variante de cor do badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do badge',
    },
    styleType: {
      control: 'select',
      options: ['filled', 'outlined', 'soft'],
      description: 'Estilo visual do badge',
    },
    dot: {
      control: 'boolean',
      description: 'Exibe um indicador de ponto antes do conteúdo',
    },
    icon: {
      control: 'text',
      description: 'Ícone a ser exibido antes do conteúdo',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories de variantes com estilo filled (padrão)
export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
    size: 'md',
    styleType: 'filled',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
    size: 'md',
    styleType: 'filled',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
    size: 'md',
    styleType: 'filled',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
    size: 'md',
    styleType: 'filled',
  },
};

export const Error: Story = {
  args: {
    children: 'Error',
    variant: 'error',
    size: 'md',
    styleType: 'filled',
  },
};

export const Info: Story = {
  args: {
    children: 'Info',
    variant: 'info',
    size: 'md',
    styleType: 'filled',
  },
};

export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'default',
    size: 'md',
    styleType: 'filled',
  },
};

// Stories de tamanhos
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Badge size="sm" variant="primary">Small</Badge>
      <Badge size="md" variant="primary">Medium</Badge>
      <Badge size="lg" variant="primary">Large</Badge>
    </div>
  ),
};

// Stories de estilos (filled, outlined, soft)
export const FilledStyle: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge styleType="filled" variant="primary">Filled Primary</Badge>
      <Badge styleType="filled" variant="success">Filled Success</Badge>
      <Badge styleType="filled" variant="warning">Filled Warning</Badge>
      <Badge styleType="filled" variant="error">Filled Error</Badge>
      <Badge styleType="filled" variant="info">Filled Info</Badge>
    </div>
  ),
};

export const OutlinedStyle: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge styleType="outlined" variant="primary">Outlined Primary</Badge>
      <Badge styleType="outlined" variant="success">Outlined Success</Badge>
      <Badge styleType="outlined" variant="warning">Outlined Warning</Badge>
      <Badge styleType="outlined" variant="error">Outlined Error</Badge>
      <Badge styleType="outlined" variant="info">Outlined Info</Badge>
    </div>
  ),
};

export const SoftStyle: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge styleType="soft" variant="primary">Soft Primary</Badge>
      <Badge styleType="soft" variant="success">Soft Success</Badge>
      <Badge styleType="soft" variant="warning">Soft Warning</Badge>
      <Badge styleType="soft" variant="error">Soft Error</Badge>
      <Badge styleType="soft" variant="info">Soft Info</Badge>
    </div>
  ),
};

// Stories com Dot
export const WithDot: Story = {
  args: {
    children: 'Com Dot',
    variant: 'primary',
    size: 'md',
    dot: true,
  },
};

export const DotVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge dot variant="primary">Primary com Dot</Badge>
      <Badge dot variant="success">Success com Dot</Badge>
      <Badge dot variant="warning">Warning com Dot</Badge>
      <Badge dot variant="error">Error com Dot</Badge>
      <Badge dot variant="info">Info com Dot</Badge>
    </div>
  ),
};

// Stories com Icon
export const WithIcon: Story = {
  args: {
    children: 'Com Ícone',
    variant: 'primary',
    size: 'md',
    icon: '✓',
  },
};

export const IconVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge icon="✓" variant="success">Aprovado</Badge>
      <Badge icon="⚠" variant="warning">Atenção</Badge>
      <Badge icon="✗" variant="error">Erro</Badge>
      <Badge icon="ℹ" variant="info">Informação</Badge>
      <Badge icon="★" variant="primary">Favorito</Badge>
    </div>
  ),
};

// Combinação de estilos com dot e icon
export const DotWithOutlined: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge dot styleType="outlined" variant="primary">Outlined com Dot</Badge>
      <Badge dot styleType="outlined" variant="success">Success Outlined</Badge>
      <Badge dot styleType="outlined" variant="warning">Warning Outlined</Badge>
    </div>
  ),
};

export const DotWithSoft: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge dot styleType="soft" variant="primary">Soft com Dot</Badge>
      <Badge dot styleType="soft" variant="success">Success Soft</Badge>
      <Badge dot styleType="soft" variant="warning">Warning Soft</Badge>
    </div>
  ),
};

export const IconWithOutlined: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge icon="✓" styleType="outlined" variant="success">Aprovado</Badge>
      <Badge icon="⚠" styleType="outlined" variant="warning">Atenção</Badge>
      <Badge icon="✗" styleType="outlined" variant="error">Erro</Badge>
    </div>
  ),
};

export const IconWithSoft: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge icon="✓" styleType="soft" variant="success">Aprovado</Badge>
      <Badge icon="⚠" styleType="soft" variant="warning">Atenção</Badge>
      <Badge icon="✗" styleType="soft" variant="error">Erro</Badge>
    </div>
  ),
};

// Showcase completo
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Filled Style</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Outlined Style</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Badge styleType="outlined" variant="default">Default</Badge>
          <Badge styleType="outlined" variant="primary">Primary</Badge>
          <Badge styleType="outlined" variant="secondary">Secondary</Badge>
          <Badge styleType="outlined" variant="success">Success</Badge>
          <Badge styleType="outlined" variant="warning">Warning</Badge>
          <Badge styleType="outlined" variant="error">Error</Badge>
          <Badge styleType="outlined" variant="info">Info</Badge>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Soft Style</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Badge styleType="soft" variant="default">Default</Badge>
          <Badge styleType="soft" variant="primary">Primary</Badge>
          <Badge styleType="soft" variant="secondary">Secondary</Badge>
          <Badge styleType="soft" variant="success">Success</Badge>
          <Badge styleType="soft" variant="warning">Warning</Badge>
          <Badge styleType="soft" variant="error">Error</Badge>
          <Badge styleType="soft" variant="info">Info</Badge>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Com Dot</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Badge dot variant="primary">Com Dot</Badge>
          <Badge dot styleType="outlined" variant="success">Outlined + Dot</Badge>
          <Badge dot styleType="soft" variant="warning">Soft + Dot</Badge>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Com Ícone</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Badge icon="✓" variant="success">Aprovado</Badge>
          <Badge icon="⚠" styleType="outlined" variant="warning">Atenção</Badge>
          <Badge icon="✗" styleType="soft" variant="error">Erro</Badge>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Tamanhos</h3>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Badge size="sm" variant="primary">Small</Badge>
          <Badge size="md" variant="primary">Medium</Badge>
          <Badge size="lg" variant="primary">Large</Badge>
        </div>
      </div>
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>Cores Customizadas</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Badge customColor="#28C76F">Verde Sucesso</Badge>
          <Badge customColor="#EA5455">Vermelho Erro</Badge>
          <Badge customColor="#F0A500">Laranja Aviso</Badge>
          <Badge customColor="#7367F0">Roxo Principal</Badge>
          <Badge customColor="#00D4FF">Ciano Destaque</Badge>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>Com Dot</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Badge customColor="#28C76F" dot>Ativo</Badge>
          <Badge customColor="#EA5455" dot>Inativo</Badge>
          <Badge customColor="#F0A500" dot>Pendente</Badge>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>Tamanhos</h3>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Badge customColor="#7367F0" size="sm">Small</Badge>
          <Badge customColor="#7367F0" size="md">Medium</Badge>
          <Badge customColor="#7367F0" size="lg">Large</Badge>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>Caso de Uso: Painel Inicial</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Badge customColor="#28C76F">85%</Badge>
          <Badge customColor="#7367F0">60%</Badge>
          <Badge customColor="#F0A500">40%</Badge>
          <Badge customColor="#EA5455">15%</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstra o uso da prop `customColor` para cores personalizadas. Ideal para Painel Inicial onde badges mostram porcentagens com cores dinâmicas (verde para alto, vermelho para baixo).',
      },
    },
  },
};
