import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@prototipo/design-system';

/**
 * Exemplos de acessibilidade para demonstrar o uso do addon a11y.
 * 
 * Esta story mostra:
 * - ✅ Boas práticas de acessibilidade
 * - ❌ Exemplos de problemas comuns (para fins educacionais)
 * 
 * Use a aba "Accessibility" no painel inferior para ver as validações.
 */
const meta = {
  title: 'Acessibilidade/Exemplos',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Exemplos demonstrando validações de acessibilidade com o addon a11y.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ✅ Exemplo de botão acessível
 * 
 * Este botão possui:
 * - Texto descritivo e claro
 * - Contraste adequado de cores
 * - Tamanho adequado para toque/clique
 */
export const BotaoAcessivel: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Enviar Formulário',
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de botão que passa em todas as validações de acessibilidade.',
      },
    },
  },
};

/**
 * ✅ Botão com aria-label para contexto adicional
 * 
 * Quando o texto do botão não é suficientemente descritivo,
 * use aria-label para fornecer contexto.
 */
export const BotaoComAriaLabel: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Salvar',
    'aria-label': 'Salvar alterações do perfil',
  },
  parameters: {
    docs: {
      description: {
        story: 'Botão com aria-label para fornecer contexto adicional a leitores de tela.',
      },
    },
  },
};

/**
 * ✅ Botão desabilitado com estado acessível
 * 
 * Botões desabilitados devem ser claramente identificáveis
 * e manter contraste suficiente para serem visíveis.
 */
export const BotaoDesabilitado: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Enviar',
    disabled: true,
    'aria-disabled': true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Botão desabilitado com atributos de acessibilidade apropriados.',
      },
    },
  },
};

/**
 * ✅ Formulário com botões de ação
 * 
 * Demonstra múltiplos botões com propósitos claros e hierarquia visual.
 */
export const GrupoDeBotoes: Story = {
  render: () => (
    <div role="group" aria-label="Ações do formulário" style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="primary" size="md">
        Confirmar
      </Button>
      <Button variant="secondary" size="md">
        Cancelar
      </Button>
      <Button variant="outline" size="md" aria-label="Voltar para a página anterior">
        Voltar
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grupo de botões com papéis e rótulos claros para navegação assistiva.',
      },
    },
  },
};

/**
 * ⚠️ Botão com contraste insuficiente (exemplo educacional)
 * 
 * Este exemplo demonstra um problema de acessibilidade.
 * Verifique a aba "Accessibility" para ver a violação de contraste.
 * 
 * ⚠️ NÃO USE ESTE PADRÃO EM PRODUÇÃO
 */
export const ContrasteInsuficiente: Story = {
  render: () => (
    <button
      style={{
        background: '#f5f5f5',
        color: '#d0d0d0',
        padding: '0.5rem 1rem',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      Texto com baixo contraste
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '⚠️ Exemplo educacional de contraste insuficiente. Este botão falhará na validação de contraste de cores (WCAG AA requer mínimo de 4.5:1).',
      },
    },
  },
};

/**
 * ⚠️ Botão sem texto descritivo (exemplo educacional)
 * 
 * Este exemplo demonstra um problema de acessibilidade.
 * Botões sem texto ou aria-label não são acessíveis.
 * 
 * ⚠️ NÃO USE ESTE PADRÃO EM PRODUÇÃO
 */
export const SemTextoDescritivo: Story = {
  render: () => (
    <button
      style={{
        background: '#0066cc',
        color: '#ffffff',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {/* Botão vazio ou com apenas ícone sem label */}
      <span aria-hidden="true">✕</span>
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '⚠️ Exemplo educacional de botão sem texto descritivo. Leitores de tela não conseguem identificar o propósito deste botão. Sempre forneça texto ou aria-label.',
      },
    },
  },
};

/**
 * ✅ Botão com ícone e texto alternativo
 * 
 * Quando usar ícones, sempre forneça texto alternativo ou aria-label.
 */
export const BotaoComIconeAcessivel: Story = {
  render: () => (
    <button
      aria-label="Fechar janela"
      style={{
        background: '#0066cc',
        color: '#ffffff',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      <span aria-hidden="true">✕</span>
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Botão com ícone que possui aria-label para contexto. O ícone está marcado como aria-hidden="true" para evitar redundância.',
      },
    },
  },
};
