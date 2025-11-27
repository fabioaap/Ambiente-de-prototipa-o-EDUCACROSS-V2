import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * Story mockada do FlowBuilder para documentação
 * 
 * O FlowBuilder real depende de APIs do Next.js e localStorage,
 * então aqui mostramos uma versão demonstrativa com dados mockados.
 */

// Componente mockado para demonstração no Storybook
const MockFlowBuilder = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '600px',
        display: 'flex',
        backgroundColor: '#fafafa',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar mockada */}
      <div
        style={{
          width: '280px',
          backgroundColor: '#f9fafb',
          borderRight: '1px solid #e5e7eb',
          padding: '1rem',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          🔀 Flow Builder
        </h2>
        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
          Crie fluxos de navegação entre páginas
        </p>
        
        {/* Stats */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <div
            style={{
              flex: 1,
              padding: '0.5rem',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.625rem', color: '#6b7280' }}>PÁGINAS</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>3</div>
          </div>
          <div
            style={{
              flex: 1,
              padding: '0.5rem',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.625rem', color: '#6b7280' }}>CONEXÕES</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>2</div>
          </div>
        </div>

        {/* Input */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', display: 'block', marginBottom: '0.5rem' }}>
            ADICIONAR PÁGINA
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="nome-da-pagina"
              style={{
                flex: 1,
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
              }}
            />
            <button
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1.25rem',
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Dicas */}
        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
          <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>💡 Dicas</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.25rem' }}>• Arraste entre handles para conectar</li>
            <li style={{ marginBottom: '0.25rem' }}>• Use roda do mouse para zoom</li>
            <li style={{ marginBottom: '0.25rem' }}>• Fluxo salva automaticamente</li>
          </ul>
        </div>
      </div>

      {/* Canvas mockado */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        {/* Nó 1 - Home */}
        <div
          style={{
            position: 'absolute',
            left: '100px',
            top: '100px',
            minWidth: '180px',
            backgroundColor: 'white',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '4px',
              backgroundColor: '#3b82f6',
            }}
          />
          <div style={{ padding: '12px 12px 12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span>📄</span>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '600', margin: 0 }}>Home Page</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span style={{ color: '#6b7280', fontFamily: 'monospace' }}>/home</span>
              <span
                style={{
                  backgroundColor: '#d1fae5',
                  color: '#065f46',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.625rem',
                  textTransform: 'uppercase',
                }}
              >
                active
              </span>
            </div>
            <div style={{ marginTop: '8px' }}>
              <span
                style={{
                  fontSize: '0.625rem',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  color: '#3b82f6',
                }}
              >
                FrontOffice
              </span>
            </div>
          </div>
        </div>

        {/* Nó 2 - Dashboard */}
        <div
          style={{
            position: 'absolute',
            left: '400px',
            top: '100px',
            minWidth: '180px',
            backgroundColor: 'white',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '4px',
              backgroundColor: '#8b5cf6',
            }}
          />
          <div style={{ padding: '12px 12px 12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span>📄</span>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '600', margin: 0 }}>Dashboard</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span style={{ color: '#6b7280', fontFamily: 'monospace' }}>/dashboard</span>
              <span
                style={{
                  backgroundColor: '#d1fae5',
                  color: '#065f46',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.625rem',
                  textTransform: 'uppercase',
                }}
              >
                active
              </span>
            </div>
            <div style={{ marginTop: '8px' }}>
              <span
                style={{
                  fontSize: '0.625rem',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  color: '#8b5cf6',
                }}
              >
                BackOffice
              </span>
            </div>
          </div>
        </div>

        {/* Nó 3 - Game */}
        <div
          style={{
            position: 'absolute',
            left: '250px',
            top: '300px',
            minWidth: '180px',
            backgroundColor: 'white',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '4px',
              backgroundColor: '#10b981',
            }}
          />
          <div style={{ padding: '12px 12px 12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span>📄</span>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '600', margin: 0 }}>Game Hub</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span style={{ color: '#6b7280', fontFamily: 'monospace' }}>/game</span>
              <span
                style={{
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.625rem',
                  textTransform: 'uppercase',
                }}
              >
                draft
              </span>
            </div>
            <div style={{ marginTop: '8px' }}>
              <span
                style={{
                  fontSize: '0.625rem',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                }}
              >
                Game
              </span>
            </div>
          </div>
        </div>

        {/* Conexão visual (linha SVG simplificada) */}
        <svg
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <path
            d="M 280 150 C 340 150, 340 150, 400 150"
            stroke="#3b82f6"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 190 200 C 190 250, 250 250, 250 300"
            stroke="#3b82f6"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Status indicator */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            fontSize: '0.75rem',
            color: '#059669',
            fontWeight: '500',
          }}
        >
          ✓ Salvo às 14:30
        </div>

        {/* MiniMap placeholder */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '150px',
            height: '100px',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.625rem',
              color: '#9ca3af',
            }}
          >
            MiniMap
          </div>
        </div>

        {/* Controls placeholder */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: '6px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}
        >
          <button
            style={{
              width: '28px',
              height: '28px',
              border: 'none',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            +
          </button>
          <button
            style={{
              width: '28px',
              height: '28px',
              border: 'none',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            −
          </button>
          <button
            style={{
              width: '28px',
              height: '28px',
              border: 'none',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '0.75rem',
            }}
          >
            ⊡
          </button>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Studio/FlowBuilder',
  component: MockFlowBuilder,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Flow Builder

Interface visual drag-and-drop para criar e editar fluxos de navegação entre páginas do sistema.

## Funcionalidades

- **Visualização de páginas como nós**: Cada página é representada como um nó no canvas
- **Conexões entre páginas**: Arraste entre handles para criar transições/navegação
- **Drag-and-drop**: Mova os nós livremente pelo canvas
- **Adicionar novas páginas**: Use a sidebar para criar novos nós
- **Salvamento automático**: O fluxo é persistido no localStorage
- **Exportar/Importar**: Salve e carregue fluxos como arquivos JSON

## Domínios

Os nós são coloridos de acordo com seu domínio:

- 🔵 **FrontOffice** - Páginas públicas
- 🟣 **BackOffice** - Páginas administrativas
- 🟢 **Game** - Páginas de jogos

## Uso

\`\`\`tsx
import { FlowBuilder } from '@/components/flow';

export default function FlowPage() {
  return <FlowBuilder />;
}
\`\`\`

## Acesso

O Flow Builder está disponível em \`/flow\` no Studio.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MockFlowBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Visualização padrão do Flow Builder com 3 páginas de exemplo conectadas.',
      },
    },
  },
};

export const EmptyState: Story = {
  render: () => (
    <div
      style={{
        width: '100%',
        height: '400px',
        display: 'flex',
        backgroundColor: '#fafafa',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '280px',
          backgroundColor: '#f9fafb',
          borderRight: '1px solid #e5e7eb',
          padding: '1rem',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          🔀 Flow Builder
        </h2>
        <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
          Crie fluxos de navegação entre páginas
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0' }}>
          <div style={{ flex: 1, padding: '0.5rem', backgroundColor: '#f3f4f6', borderRadius: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.625rem', color: '#6b7280' }}>PÁGINAS</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>0</div>
          </div>
          <div style={{ flex: 1, padding: '0.5rem', backgroundColor: '#f3f4f6', borderRadius: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.625rem', color: '#6b7280' }}>CONEXÕES</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>0</div>
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        <div style={{ textAlign: 'center', color: '#9ca3af' }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</p>
          <p style={{ fontSize: '0.875rem' }}>Nenhuma página no fluxo</p>
          <p style={{ fontSize: '0.75rem' }}>Adicione páginas usando a sidebar</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Estado vazio do Flow Builder, quando não há páginas no fluxo.',
      },
    },
  },
};

export const PageNodeVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1.5rem',
        padding: '2rem',
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        flexWrap: 'wrap',
      }}
    >
      {/* FrontOffice */}
      <div
        style={{
          minWidth: '180px',
          backgroundColor: 'white',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', backgroundColor: '#3b82f6' }} />
        <div style={{ padding: '12px 12px 12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span>📄</span>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', margin: 0 }}>Landing Page</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
            <span style={{ color: '#6b7280', fontFamily: 'monospace' }}>/landing</span>
            <span style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '2px 6px', borderRadius: '4px', fontSize: '0.625rem', textTransform: 'uppercase' }}>active</span>
          </div>
          <div style={{ marginTop: '8px' }}>
            <span style={{ fontSize: '0.625rem', padding: '2px 8px', borderRadius: '12px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>FrontOffice</span>
          </div>
        </div>
      </div>

      {/* BackOffice */}
      <div
        style={{
          minWidth: '180px',
          backgroundColor: 'white',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', backgroundColor: '#8b5cf6' }} />
        <div style={{ padding: '12px 12px 12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span>📄</span>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', margin: 0 }}>Admin Panel</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
            <span style={{ color: '#6b7280', fontFamily: 'monospace' }}>/admin</span>
            <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '4px', fontSize: '0.625rem', textTransform: 'uppercase' }}>draft</span>
          </div>
          <div style={{ marginTop: '8px' }}>
            <span style={{ fontSize: '0.625rem', padding: '2px 8px', borderRadius: '12px', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>BackOffice</span>
          </div>
        </div>
      </div>

      {/* Game */}
      <div
        style={{
          minWidth: '180px',
          backgroundColor: 'white',
          border: '2px solid #2563eb',
          borderRadius: '8px',
          boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.3)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', backgroundColor: '#10b981' }} />
        <div style={{ padding: '12px 12px 12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span>📄</span>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', margin: 0 }}>Leaderboard</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
            <span style={{ color: '#6b7280', fontFamily: 'monospace' }}>/leaderboard</span>
            <span style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '2px 6px', borderRadius: '4px', fontSize: '0.625rem', textTransform: 'uppercase' }}>active</span>
          </div>
          <div style={{ marginTop: '8px' }}>
            <span style={{ fontSize: '0.625rem', padding: '2px 8px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>Game</span>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Variantes de PageNode para diferentes domínios: FrontOffice (azul), BackOffice (roxo) e Game (verde). O terceiro nó mostra o estado selecionado.',
      },
    },
  },
};
