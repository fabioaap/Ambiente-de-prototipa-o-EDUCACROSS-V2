import type { Config, DefaultComponentProps } from '@measured/puck';
import { Button, Text, Card, Layout } from '@prototipo/design-system';
import { z } from 'zod';
import { ReactNode } from 'react';

/** 
 * Tipo para o contexto Puck passado para os componentes.
 * Inclui renderDropZone e flag de edição.
 */
type PuckContext = {
  renderDropZone: React.ComponentType<{
    zone: string;
    allow?: string[];
    disallow?: string[];
    style?: React.CSSProperties;
  }>;
  isEditing: boolean;
};

/**
 * Componente de erro de validação reutilizável.
 * Renderiza mensagens de erro de forma consistente.
 */
const ValidationError = ({ message }: { message: string }): ReactNode => (
  <div
    style={{
      padding: '12px 16px',
      backgroundColor: '#fee',
      color: '#c00',
      borderRadius: '4px',
      border: '1px solid #fcc',
      fontSize: '14px',
      fontFamily: 'system-ui, sans-serif',
    }}
  >
    <strong>Erro de validação:</strong> {message}
  </div>
);

/**
 * Helper para validar props com Zod e retornar erro visual se inválido.
 * @param schema - Schema Zod para validação
 * @param props - Props a serem validadas
 * @param componentName - Nome do componente para logging
 * @returns null se válido, ReactNode com erro se inválido
 */
const validateProps = <T,>(
  schema: z.ZodSchema<T>,
  props: unknown,
  componentName: string
): ReactNode | null => {
  const result = schema.safeParse(props);

  if (!result.success) {
    const errorMessage = result.error.errors.map((e) => e.message).join(', ');
    console.error(`Erro na validação do ${componentName}:`, result.error);
    return <ValidationError message={errorMessage} />;
  }

  return null;
};

/**
 * Schema de validação para props do componente Button.
 * Valida texto, variante e tamanho do botão.
 */
export const buttonPropsSchema = z.object({
  text: z.string().min(1, 'Texto do botão é obrigatório'),
  variant: z.enum(['primary', 'secondary', 'outline', 'ghost']),
  size: z.enum(['sm', 'md', 'lg']),
});

/**
 * Schema de validação para props do componente Text.
 * Valida conteúdo, tag HTML, tamanho, peso e cor do texto.
 */
export const textPropsSchema = z.object({
  content: z.string().min(1, 'Conteúdo do texto é obrigatório'),
  as: z.enum(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  size: z.enum(['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']),
  weight: z.enum(['normal', 'medium', 'semibold', 'bold']),
  color: z.enum(['default', 'muted', 'primary', 'secondary', 'success', 'warning', 'error']),
});

/**
 * Schema de validação para props do componente Card.
 * Valida variante e padding do card.
 */
export const cardPropsSchema = z.object({
  variant: z.enum(['default', 'bordered', 'elevated']),
  padding: z.enum(['none', 'sm', 'md', 'lg']),
});

/**
 * Schema de validação para props do componente Layout.
 * Valida largura máxima do layout.
 */
export const layoutPropsSchema = z.object({
  maxWidth: z.enum(['sm', 'md', 'lg', 'xl', '2xl', 'full']),
});

/** Props do componente Button para uso no Puck */
export type ButtonProps = z.infer<typeof buttonPropsSchema>;

/** Props do componente Text para uso no Puck */
export type TextProps = z.infer<typeof textPropsSchema>;

/** Props do componente Card para uso no Puck (com suporte a DropZone) */
export type CardProps = z.infer<typeof cardPropsSchema>;

/** Props do componente Layout para uso no Puck (com suporte a DropZone) */
export type LayoutProps = z.infer<typeof layoutPropsSchema>;

/**
 * Configuração principal do Puck com componentes do Design System.
 * Define campos, props padrão e renderização para cada componente.
 */
export const puckConfig: Config = {
  components: {
    /**
     * Componente Button - Botão interativo do design system.
     * Suporta múltiplas variantes (primary, secondary, outline, ghost)
     * e tamanhos (sm, md, lg).
     */
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
        variant: 'primary' as const,
        size: 'md' as const,
      },
      render: ({ text, variant, size }: ButtonProps) => {
        // Validar props em runtime
        const error = validateProps(buttonPropsSchema, { text, variant, size }, 'Button');
        if (error) return error;

        return (
          <Button variant={variant} size={size}>
            {text}
          </Button>
        );
      },
    },
    /**
     * Componente Text - Elemento de texto com suporte a heading e paragraph.
     * Controla tag HTML, tamanho, peso da fonte e cores.
     */
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
        as: 'p' as const,
        size: 'base' as const,
        weight: 'normal' as const,
        color: 'default' as const,
      },
      render: ({ content, as, size, weight, color }: TextProps) => {
        // Validar props em runtime
        const validatedProps = textPropsSchema.safeParse({ content, as, size, weight, color });
        
        if (!validatedProps.success) {
          console.error('Erro na validação do Text:', validatedProps.error);
          return <div style={{ color: 'red', padding: '8px' }}>Erro: Props inválidas</div>;
        }

        return (
          <Text as={as} size={size} weight={weight} color={color}>
            {content}
          </Text>
        );
      },
    },
    /**
     * Componente Card - Container com variantes de estilo.
     * Suporta conteúdo aninhado via DropZone.
     * Permite drag-and-drop de outros componentes dentro do card.
     */
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
        variant: 'default' as const,
        padding: 'md' as const,
      },
      render: ({ variant, padding, puck }: CardProps & DefaultComponentProps & { puck: PuckContext }) => {
        // Validar props em runtime
        const validatedProps = cardPropsSchema.safeParse({ variant, padding });
        
        if (!validatedProps.success) {
          console.error('Erro na validação do Card:', validatedProps.error);
          return <div style={{ color: 'red', padding: '8px' }}>Erro: Props inválidas</div>;
        }

        const { renderDropZone: DropZone } = puck;

        return (
          <Card variant={variant} padding={padding}>
            {/* DropZone permite adicionar componentes dentro do Card */}
            <DropZone zone="card-content" />
          </Card>
        );
      },
    },
    /**
     * Componente Layout - Container de layout responsivo.
     * Suporta conteúdo aninhado via DropZone.
     * Controla largura máxima e centralização do conteúdo.
     */
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
        maxWidth: 'xl' as const,
      },
      render: ({ maxWidth, puck }: LayoutProps & DefaultComponentProps & { puck: PuckContext }) => {
        // Validar props em runtime
        const validatedProps = layoutPropsSchema.safeParse({ maxWidth });
        
        if (!validatedProps.success) {
          console.error('Erro na validação do Layout:', validatedProps.error);
          return <div style={{ color: 'red', padding: '8px' }}>Erro: Props inválidas</div>;
        }

        const { renderDropZone: DropZone } = puck;

        return (
          <Layout maxWidth={maxWidth}>
            {/* DropZone permite adicionar componentes dentro do Layout */}
            <DropZone zone="layout-content" />
          </Layout>
        );
      },
    },
  },
};
