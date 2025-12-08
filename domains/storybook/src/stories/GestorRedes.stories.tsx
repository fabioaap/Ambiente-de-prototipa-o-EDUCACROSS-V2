import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Card, Text, Button, Select, Input, Progress, Badge } from '@prototipo/design-system';

/**
 * Dashboard Protótipo - Gestor de Redes
 * Componentes e padrões utilizados na jornada educacional
 */

// Wrapper para demonstrar componentes do Gestor de Redes
const GestorRedesDashboard = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [grupoSelecionado, setGrupoSelecionado] = useState('');

  const kpis = [
    { label: 'Alunos', valor: '38.805' },
    { label: 'Professores', valor: '1.138' },
    { label: 'Diretores', valor: '49' },
    { label: 'Coordenadores', valor: '120' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <Text as="h1">Gestor de Redes</Text>
      <Text as="p" style={{ color: '#666', marginBottom: '20px' }}>
        Dashboard de engajamento educacional
      </Text>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '30px' }}>
        {kpis.map((kpi) => (
          <div key={kpi.label} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px' }}>
            <Text as="span" style={{ fontSize: '12px', color: '#999' }}>
              {kpi.label}
            </Text>
            <Text as="h3" style={{ fontSize: '24px', margin: '8px 0' }}>
              {kpi.valor}
            </Text>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
        <Text as="h3" style={{ marginBottom: '12px' }}>
          Filtros
        </Text>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Select
            label="Grupo de Escolas"
            options={[
              { value: '', label: 'Todos' },
              { value: 'osasco', label: 'Osasco' },
              { value: 'piracicaba', label: 'Piracicaba' },
            ]}
            value={grupoSelecionado}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setGrupoSelecionado(e.target.value)}
          />
          <Input placeholder="Buscar escola..." />
        </div>
      </div>

      {/* Exemplo de Progresso */}
      <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
        <Text as="h3" style={{ marginBottom: '12px' }}>
          Engajamento Escolar
        </Text>
        <div style={{ marginBottom: '12px' }}>
          <Text as="span" style={{ fontSize: '12px' }}>
            Escola A: 92%
          </Text>
          <Progress value={92} max={100} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <Text as="span" style={{ fontSize: '12px' }}>
            Escola B: 78%
          </Text>
          <Progress value={78} max={100} />
        </div>
        <div>
          <Text as="span" style={{ fontSize: '12px' }}>
            Escola C: 65%
          </Text>
          <Progress value={65} max={100} />
        </div>
      </div>

      {/* Modal Demo */}
      <div>
        <Button onClick={() => setModalAberto(!modalAberto)}>
          {modalAberto ? 'Fechar Modal' : 'Abrir Detalhes'}
        </Button>
        {modalAberto && (
          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '16px',
              marginTop: '12px',
            }}
          >
            <Text as="h3" style={{ marginBottom: '12px' }}>
              Detalhes de Acesso
            </Text>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Jogaram', 'Vídeos', 'Livros', 'Avaliações', 'Questões', 'Música'].map((tipo) => (
                <Badge key={tipo} variant="info">
                  {tipo}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const meta = {
  title: 'FrontOffice/Gestor de Redes',
  component: GestorRedesDashboard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GestorRedesDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Dashboard completo do Gestor de Redes
 * Demonstra componentes, padrões e interatividade
 */
export const Dashboard: Story = {
  render: () => <GestorRedesDashboard />,
  parameters: {
    docs: {
      description: {
        story:
          'Protótipo navegável da jornada Gestor de Redes. Inclui KPIs, filtros, barra de progresso e modal de detalhes. Para acessar a página completa com interatividade total, consulte: domains/FrontOffice/journeys/gestor-redes/page.tsx',
      },
    },
  },
};

/**
 * Componentes Isolados
 */
export const ComponentsShowcase: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <Text as="h2" style={{ marginBottom: '20px' }}>
        Componentes Utilizados
      </Text>

      <div style={{ marginBottom: '20px' }}>
        <Text as="h4">Text</Text>
        <Text>Lorem ipsum dolor sit amet.</Text>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Text as="h4">Button</Text>
        <Button>Botão Padrão</Button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Text as="h4">Badge</Text>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge variant="info">Info</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Text as="h4">Progress</Text>
        <Progress value={75} max={100} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase dos componentes principais utilizados na jornada Gestor de Redes.',
      },
    },
  },
};

/**
 * Responsividade: Mobile
 */
export const Mobile: Story = {
  render: () => <GestorRedesDashboard />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Dashboard em viewport mobile (375x667). Grid responsivo adaptado para telas pequenas.',
      },
    },
  },
};

/**
 * Responsividade: Tablet
 */
export const Tablet: Story = {
  render: () => <GestorRedesDashboard />,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Dashboard em viewport tablet (768x1024). Layout intermediário.',
      },
    },
  },
};

/**
 * Responsividade: Desktop
 */
export const Desktop: Story = {
  render: () => <GestorRedesDashboard />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Dashboard em viewport desktop (1440x900). Visualização completa e otimizada.',
      },
    },
  },
};
