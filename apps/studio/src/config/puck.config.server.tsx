/**
 * Configuração Puck para React Server Components (RSC)
 * Usada para renderização estática de páginas (sem editor)
 * Não inclui DropZone, pois RSC não suporta componentes interativos do Puck
 */

import type { Config } from '@measured/puck';
import { Button, Text, Card, Layout } from '@prototipo/design-system';
import type { ButtonProps, TextProps, CardProps, LayoutProps } from './puck.types';

type RenderDropZone = (props: { zone: string }) => React.ReactNode;

type PuckContext = {
  renderDropZone: RenderDropZone;
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
      render: ({ variant, padding, puck }: CardProps & { puck: PuckContext }) => {
        return (
          <Card variant={variant} padding={padding}>
            {puck.renderDropZone({ zone: 'card-content' })}
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
            { label: 'Extra Large', value: 'xl' },
            { label: '2X Large', value: '2xl' },
            { label: 'Full', value: 'full' },
          ],
        },
      },
      defaultProps: {
        maxWidth: 'xl',
      },
      render: ({ maxWidth, puck }: LayoutProps & { puck: PuckContext }) => {
        return (
          <Layout maxWidth={maxWidth}>
            {puck.renderDropZone({ zone: 'layout-content' })}
          </Layout>
        );
      },
    },
  },
};
