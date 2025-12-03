import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '@prototipo/design-system';
import { Button } from '@prototipo/design-system';

const meta = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
      description: 'Variante visual do alerta',
    },
    outlined: {
      control: 'boolean',
      description: 'Se verdadeiro, exibe apenas borda sem fundo colorido',
    },
    closable: {
      control: 'boolean',
      description: 'Se verdadeiro, exibe botão de fechar',
    },
    hideIcon: {
      control: 'boolean',
      description: 'Se verdadeiro, oculta o ícone',
    },
    onClose: {
      action: 'closed',
      description: 'Callback chamado ao fechar o alerta',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variantes básicas
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Operação concluída com sucesso! Seus dados foram salvos.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Atenção! Algumas configurações podem afetar o desempenho do sistema.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Erro ao processar sua solicitação. Por favor, tente novamente.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Esta é uma mensagem informativa sobre o funcionamento do sistema.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

// Variantes outlined
export const SuccessOutlined: Story = {
  args: {
    variant: 'success',
    outlined: true,
    children: 'Operação concluída com sucesso! Seus dados foram salvos.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WarningOutlined: Story = {
  args: {
    variant: 'warning',
    outlined: true,
    children: 'Atenção! Algumas configurações podem afetar o desempenho do sistema.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ErrorOutlined: Story = {
  args: {
    variant: 'error',
    outlined: true,
    children: 'Erro ao processar sua solicitação. Por favor, tente novamente.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const InfoOutlined: Story = {
  args: {
    variant: 'info',
    outlined: true,
    children: 'Esta é uma mensagem informativa sobre o funcionamento do sistema.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

// Com botão de fechar
export const Closable: Story = {
  args: {
    variant: 'info',
    closable: true,
    children: 'Este alerta pode ser fechado clicando no X.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ClosableOutlined: Story = {
  args: {
    variant: 'warning',
    closable: true,
    outlined: true,
    children: 'Este alerta outlined também pode ser fechado.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

// Sem ícone
export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    hideIcon: true,
    children: 'Este alerta não possui ícone.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

// Com ícone customizado
export const WithCustomIcon: Story = {
  args: {
    variant: 'info',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        style={{ width: '1.25rem', height: '1.25rem' }}
        aria-hidden="true"
      >
        <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
      </svg>
    ),
    children: 'Alerta com ícone customizado (sol).',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

// Com botão de ação
export const WithAction: Story = {
  args: {
    variant: 'warning',
    children: 'Sua sessão vai expirar em breve.',
    action: (
      <Button size="sm" variant="outline">
        Renovar
      </Button>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithActionAndClose: Story = {
  args: {
    variant: 'info',
    closable: true,
    children: 'Nova versão disponível! Atualize para ter acesso aos recursos mais recentes.',
    action: (
      <Button size="sm" variant="primary">
        Atualizar agora
      </Button>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

// Conteúdo mais complexo
export const WithComplexContent: Story = {
  args: {
    variant: 'success',
    closable: true,
    children: (
      <div>
        <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
          Upload concluído com sucesso!
        </p>
        <p style={{ fontSize: '0.875rem', margin: 0 }}>
          Seus 3 arquivos foram carregados e estão prontos para uso.
        </p>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

// Múltiplos alertas
export const MultipleAlerts: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="success" closable>
        Perfil atualizado com sucesso!
      </Alert>
      <Alert variant="warning">
        Você tem tarefas pendentes que expiram em 2 dias.
      </Alert>
      <Alert variant="error" closable>
        Falha ao enviar email. Verifique o endereço e tente novamente.
      </Alert>
      <Alert variant="info" outlined>
        Dica: Use atalhos de teclado para navegar mais rapidamente.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de múltiplos alertas empilhados para demonstrar diferentes estados.',
      },
    },
  },
};

// Acessibilidade
export const AccessibilityExample: Story = {
  args: {
    variant: 'error',
    closable: true,
    children: 'Erro de validação: o campo email é obrigatório.',
    role: 'alert',
    'aria-live': 'assertive',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Alerta com atributos ARIA para acessibilidade. Use role="alert" e aria-live para leitores de tela.',
      },
    },
  },
};

// Demonstração de todas as variantes
export const AllVariants: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          Filled
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Alert variant="success" closable>
            Sucesso! Operação concluída.
          </Alert>
          <Alert variant="warning" closable>
            Atenção! Verifique os dados.
          </Alert>
          <Alert variant="error" closable>
            Erro! Algo deu errado.
          </Alert>
          <Alert variant="info" closable>
            Informação importante.
          </Alert>
        </div>
      </div>
      
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          Outlined
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Alert variant="success" outlined closable>
            Sucesso! Operação concluída.
          </Alert>
          <Alert variant="warning" outlined closable>
            Atenção! Verifique os dados.
          </Alert>
          <Alert variant="error" outlined closable>
            Erro! Algo deu errado.
          </Alert>
          <Alert variant="info" outlined closable>
            Informação importante.
          </Alert>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstração de todas as variantes (filled e outlined) com botão de fechar.',
      },
    },
  },
};
