import type { Config } from '@measured/puck';
import {
  Button,
  Text,
  Card,
  Layout,
  Badge,
  Progress,
  Sidebar,
  Breadcrumb,
  Tabs,
  PageHeader,
  ToolbarButtons,
  ActionButtons,
  Pagination,
  DataTable,
  FilterGroup,
  Modal,
} from '@prototipo/design-system';
import React from 'react';

export type ButtonProps = {
  text: string;
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
};

export type TextProps = {
  content: string;
  as: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight: 'normal' | 'medium' | 'semibold' | 'bold';
  color: 'default' | 'muted' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
};

export type CardProps = {
  variant: 'default' | 'bordered' | 'elevated';
  padding: 'none' | 'sm' | 'md' | 'lg';
};

export type LayoutProps = {
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
};

/**
 * Tipos para componentes do Game Hub
 * Usados para listar, filtrar e exibir jogos educacionais
 */
export type GameCardProps = {
  /** Título do jogo */
  title: string;
  /** Descrição breve do jogo */
  description: string;
  /** Emoji ou placeholder para thumbnail */
  thumbnail: string;
  /** Categoria educacional do jogo */
  category: 'math' | 'language' | 'science' | 'logic';
  /** Nível de dificuldade */
  difficulty: 'easy' | 'medium' | 'hard';
  /** Tempo estimado de jogo */
  estimatedTime: string;
  /** Progresso do jogador (0-100) */
  progress: number;
  /** Status especial do jogo */
  status: 'new' | 'popular' | 'completed' | 'none';
  /** Slug para navegação */
  slug: string;
};

export type GameFilterProps = {
  /** Label para o grupo de filtros */
  label: string;
  /** Mostrar filtro de categoria */
  showCategoryFilter: boolean;
  /** Mostrar filtro de dificuldade */
  showDifficultyFilter: boolean;
};

export type GameGridProps = {
  /** Número de colunas no grid */
  columns: '2' | '3' | '4';
  /** Gap entre os cards */
  gap: 'sm' | 'md' | 'lg';
};

export const puckConfig: Config = {
  components: {
    Button: {
      fields: {
        text: { type: 'text' },
        variant: {
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
          ],
        },
        size: {
          type: 'select',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
      },
      defaultProps: {
        text: 'Click me',
        variant: 'primary',
        size: 'md',
      },
      render: ({ text, variant, size }: ButtonProps) => {
        return (
          <Button variant={variant} size={size}>
            {text}
          </Button>
        );
      },
    },
    Text: {
      fields: {
        content: { type: 'textarea' },
        as: {
          type: 'select',
          options: [
            { label: 'Paragraph', value: 'p' },
            { label: 'Heading 1', value: 'h1' },
            { label: 'Heading 2', value: 'h2' },
            { label: 'Heading 3', value: 'h3' },
            { label: 'Heading 4', value: 'h4' },
            { label: 'Heading 5', value: 'h5' },
            { label: 'Heading 6', value: 'h6' },
          ],
        },
        size: {
          type: 'select',
          options: [
            { label: 'XS', value: 'xs' },
            { label: 'SM', value: 'sm' },
            { label: 'Base', value: 'base' },
            { label: 'LG', value: 'lg' },
            { label: 'XL', value: 'xl' },
            { label: '2XL', value: '2xl' },
            { label: '3XL', value: '3xl' },
            { label: '4XL', value: '4xl' },
            { label: '5XL', value: '5xl' },
          ],
        },
        weight: {
          type: 'select',
          options: [
            { label: 'Normal', value: 'normal' },
            { label: 'Medium', value: 'medium' },
            { label: 'Semibold', value: 'semibold' },
            { label: 'Bold', value: 'bold' },
          ],
        },
        color: {
          type: 'select',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Muted', value: 'muted' },
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Success', value: 'success' },
            { label: 'Warning', value: 'warning' },
            { label: 'Error', value: 'error' },
          ],
        },
      },
      defaultProps: {
        content: 'Enter your text here',
        as: 'p',
        size: 'base',
        weight: 'normal',
        color: 'default',
      },
      render: ({ content, as, size, weight, color }: TextProps) => {
        return (
          <Text as={as} size={size} weight={weight} color={color}>
            {content}
          </Text>
        );
      },
    },
    Card: {
      fields: {
        variant: {
          type: 'select',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Bordered', value: 'bordered' },
            { label: 'Elevated', value: 'elevated' },
          ],
        },
        padding: {
          type: 'select',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
      },
      defaultProps: {
        variant: 'default',
        padding: 'md',
      },
      render: ({ variant, padding, puck, id }) => {
        return (
          <Card variant={variant} padding={padding}>
            {puck.renderDropZone({ zone: `${id}:content` })}
          </Card>
        );
      },
    },
    Layout: {
      fields: {
        maxWidth: {
          type: 'select',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
            { label: 'XL', value: 'xl' },
            { label: '2XL', value: '2xl' },
            { label: 'Full', value: 'full' },
          ],
        },
      },
      defaultProps: {
        maxWidth: 'xl',
      },
      render: ({ maxWidth, puck, id }) => {
        return (
          <Layout maxWidth={maxWidth}>
            {puck.renderDropZone({ zone: `${id}:content` })}
          </Layout>
        );
      },
    },

    /**
     * GameCard - Card de jogo para o Game Hub
     * Exibe informações do jogo com thumbnail, categoria, dificuldade e progresso
     */
    GameCard: {
      fields: {
        title: { type: 'text' },
        description: { type: 'textarea' },
        thumbnail: { type: 'text' },
        category: {
          type: 'select',
          options: [
            { label: 'Matemática', value: 'math' },
            { label: 'Linguagem', value: 'language' },
            { label: 'Ciências', value: 'science' },
            { label: 'Lógica', value: 'logic' },
          ],
        },
        difficulty: {
          type: 'select',
          options: [
            { label: 'Fácil', value: 'easy' },
            { label: 'Médio', value: 'medium' },
            { label: 'Difícil', value: 'hard' },
          ],
        },
        estimatedTime: { type: 'text' },
        progress: { type: 'number' },
        status: {
          type: 'select',
          options: [
            { label: 'Nenhum', value: 'none' },
            { label: 'Novo', value: 'new' },
            { label: 'Popular', value: 'popular' },
            { label: 'Concluído', value: 'completed' },
          ],
        },
        slug: { type: 'text' },
      },
      defaultProps: {
        title: 'Nome do Jogo',
        description: 'Descrição breve do jogo educacional',
        thumbnail: '🎮',
        category: 'math',
        difficulty: 'medium',
        estimatedTime: '10-15 min',
        progress: 0,
        status: 'none',
        slug: 'game-slug',
      },
      render: ({
        title,
        description,
        thumbnail,
        category,
        difficulty,
        estimatedTime,
        progress,
        status,
      }: GameCardProps) => {
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
      },
    },

    /**
     * GameFilter - Filtros para o Game Hub
     * Permite filtrar jogos por categoria e dificuldade
     */
    GameFilter: {
      fields: {
        label: { type: 'text' },
        showCategoryFilter: { type: 'radio', options: [
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]},
        showDifficultyFilter: { type: 'radio', options: [
          { label: 'Sim', value: true },
          { label: 'Não', value: false },
        ]},
      },
      defaultProps: {
        label: 'Filtrar jogos',
        showCategoryFilter: true,
        showDifficultyFilter: true,
      },
      render: ({ label, showCategoryFilter, showDifficultyFilter }: GameFilterProps) => {
        return (
          <Card variant="bordered" padding="md">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Text as="h3" size="lg" weight="semibold" color="default">
                {label}
              </Text>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {showCategoryFilter && (
                  <div style={{ flex: '1 1 200px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: 500,
                        marginBottom: '4px',
                        color: '#374151',
                      }}
                    >
                      Categoria
                    </label>
                    <select
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        fontSize: '14px',
                        backgroundColor: 'white',
                      }}
                    >
                      <option value="">Todas as categorias</option>
                      <option value="math">Matemática</option>
                      <option value="language">Linguagem</option>
                      <option value="science">Ciências</option>
                      <option value="logic">Lógica</option>
                    </select>
                  </div>
                )}

                {showDifficultyFilter && (
                  <div style={{ flex: '1 1 200px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: 500,
                        marginBottom: '4px',
                        color: '#374151',
                      }}
                    >
                      Dificuldade
                    </label>
                    <select
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        fontSize: '14px',
                        backgroundColor: 'white',
                      }}
                    >
                      <option value="">Todas as dificuldades</option>
                      <option value="easy">Fácil</option>
                      <option value="medium">Médio</option>
                      <option value="hard">Difícil</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      },
    },

    /**
     * GameGrid - Grid responsivo para exibir GameCards
     * Container que organiza os cards de jogos em colunas
     */
    GameGrid: {
      fields: {
        columns: {
          type: 'select',
          options: [
            { label: '2 Colunas', value: '2' },
            { label: '3 Colunas', value: '3' },
            { label: '4 Colunas', value: '4' },
          ],
        },
        gap: {
          type: 'select',
          options: [
            { label: 'Pequeno', value: 'sm' },
            { label: 'Médio', value: 'md' },
            { label: 'Grande', value: 'lg' },
          ],
        },
      },
      defaultProps: {
        columns: '3',
        gap: 'md',
      },
      render: ({ columns, gap, puck, id }: GameGridProps & { puck: { renderDropZone: (opts: { zone: string }) => React.ReactNode }; id: string }) => {
        const gapSizes: Record<string, string> = {
          sm: '12px',
          md: '20px',
          lg: '32px',
        };

        // Usar minmax com base no número de colunas para responsividade
        const minWidth = columns === '4' ? '240px' : columns === '2' ? '320px' : '280px';

        return (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
              gap: gapSizes[gap],
              width: '100%',
            }}
          >
            {puck.renderDropZone({ zone: `${id}:cards` })}
          </div>
        );
      },
    },

    /**
     * BackOffice Suite - Componentes para interfaces administrativas
     */

    Sidebar: {
      fields: {
        items: {
          type: 'array',
          arrayFields: {
            id: { type: 'text' },
            label: { type: 'text' },
            href: { type: 'text' },
            active: { type: 'radio', options: [{ label: 'Sim', value: true }, { label: 'Não', value: false }] },
          },
        },
        collapsed: {
          type: 'radio',
          options: [
            { label: 'Sim', value: true },
            { label: 'Não', value: false },
          ],
        },
      },
      defaultProps: {
        items: [
          { id: 'dashboard', label: 'Dashboard', href: '/dashboard', active: true },
          { id: 'users', label: 'Usuários', href: '/users', active: false },
        ],
        collapsed: false,
      },
      render: ({ items, collapsed }) => <Sidebar items={items} collapsed={collapsed} />,
    },

    Breadcrumb: {
      fields: {
        items: {
          type: 'array',
          arrayFields: {
            label: { type: 'text' },
            href: { type: 'text' },
          },
        },
      },
      defaultProps: {
        items: [
          { label: 'Home', href: '/' },
          { label: 'Página Atual' },
        ],
      },
      render: ({ items }) => <Breadcrumb items={items} />,
    },

    Tabs: {
      fields: {
        tabs: {
          type: 'array',
          arrayFields: {
            id: { type: 'text' },
            label: { type: 'text' },
            badge: { type: 'number' },
          },
        },
        defaultValue: { type: 'text' },
      },
      defaultProps: {
        tabs: [
          { id: 'tab1', label: 'Tab 1' },
          { id: 'tab2', label: 'Tab 2' },
        ],
        defaultValue: 'tab1',
      },
      render: ({ tabs, defaultValue }) => (
        <Tabs tabs={tabs} value={defaultValue} onChange={() => {}} />
      ),
    },

    PageHeader: {
      fields: {
        title: { type: 'text' },
        count: { type: 'number' },
        subtitle: { type: 'text' },
      },
      defaultProps: {
        title: 'Título da Página',
      },
      render: ({ title, count, subtitle }) => (
        <PageHeader title={title} count={count} subtitle={subtitle} />
      ),
    },

    DataTable: {
      fields: {
        columns: {
          type: 'array',
          arrayFields: {
            key: { type: 'text' },
            label: { type: 'text' },
            sortable: { type: 'radio', options: [{ label: 'Sim', value: true }, { label: 'Não', value: false }] },
          },
        },
        striped: {
          type: 'radio',
          options: [
            { label: 'Sim', value: true },
            { label: 'Não', value: false },
          ],
        },
        hoverable: {
          type: 'radio',
          options: [
            { label: 'Sim', value: true },
            { label: 'Não', value: false },
          ],
        },
      },
      defaultProps: {
        columns: [
          { key: 'id', label: 'ID', sortable: true },
          { key: 'name', label: 'Nome', sortable: true },
        ],
        data: [],
        striped: true,
        hoverable: true,
      },
      render: ({ columns, striped, hoverable }) => (
        <DataTable
          columns={columns}
          data={[
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
          ]}
          striped={striped}
          hoverable={hoverable}
        />
      ),
    },

    Pagination: {
      fields: {
        currentPage: { type: 'number' },
        totalPages: { type: 'number' },
      },
      defaultProps: {
        currentPage: 1,
        totalPages: 10,
      },
      render: ({ currentPage, totalPages }) => (
        <Pagination currentPage={currentPage} totalPages={totalPages} onChange={() => {}} />
      ),
    },

    FilterGroup: {
      fields: {
        filters: {
          type: 'array',
          arrayFields: {
            id: { type: 'text' },
            type: { type: 'select', options: [{ label: 'Input', value: 'input' }, { label: 'Select', value: 'select' }] },
            label: { type: 'text' },
          },
        },
        layout: {
          type: 'select',
          options: [
            { label: 'Horizontal', value: 'horizontal' },
            { label: 'Vertical', value: 'vertical' },
            { label: 'Grid', value: 'grid' },
          ],
        },
      },
      defaultProps: {
        filters: [
          { id: 'search', type: 'input', label: 'Buscar' },
        ],
        layout: 'horizontal',
      },
      render: ({ filters, layout }) => (
        <FilterGroup filters={filters} values={{}} onChange={() => {}} layout={layout} />
      ),
    },

    Modal: {
      fields: {
        title: { type: 'text' },
        size: {
          type: 'select',
          options: [
            { label: 'Pequeno', value: 'small' },
            { label: 'Médio', value: 'medium' },
            { label: 'Grande', value: 'large' },
          ],
        },
      },
      defaultProps: {
        open: false,
        title: 'Título do Modal',
        size: 'medium',
      },
      render: ({ title, size, puck, id }) => (
        <Modal open={false} onClose={() => {}} title={title} size={size}>
          {puck?.renderDropZone?.({ zone: `${id}:content` })}
        </Modal>
      ),
    },

    ToolbarButtons: {
      fields: {},
      defaultProps: {},
      render: () => (
        <ToolbarButtons onImport={() => {}} onExport={() => {}} />
      ),
    },

    ActionButtons: {
      fields: {},
      defaultProps: {},
      render: () => (
        <ActionButtons onView={() => {}} onEdit={() => {}} onDelete={() => {}} />
      ),
    },
  },
};
