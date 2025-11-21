import type { ReactNode } from 'react';
import type { Config } from '@measured/puck';
import { Button, Text, Card, Layout, Input, Select, Checkbox, Radio, Switch } from '@prototipo/design-system';

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
  children: ReactNode[];
};

export type LayoutProps = {
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  children: ReactNode[];
};

export type InputProps = {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  helperText?: string;
  error?: boolean;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
};

export type SelectProps = {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  options: Array<{ value: string; label: string }>;
};

export type CheckboxProps = {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  checked?: boolean;
};

export type RadioProps = {
  label?: string;
  name: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  checked?: boolean;
};

export type SwitchProps = {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  checked?: boolean;
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
        children: [] as ReactNode[],
      },
      render: ({ variant, padding, children }: CardProps) => {
        return (
          <Card variant={variant} padding={padding}>
            {children}
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
        children: [] as ReactNode[],
      },
      render: ({ maxWidth, children }: LayoutProps) => {
        return <Layout maxWidth={maxWidth}>{children}</Layout>;
      },
    },
    Input: {
      fields: {
        label: { type: 'text' },
        placeholder: { type: 'text' },
        type: {
          type: 'select',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Password', value: 'password' },
            { label: 'Number', value: 'number' },
            { label: 'Tel', value: 'tel' },
            { label: 'URL', value: 'url' },
          ],
        },
        helperText: { type: 'text' },
        error: { type: 'radio', options: [{ label: 'Error', value: true }, { label: 'Normal', value: false }] },
        errorText: { type: 'text' },
        required: { type: 'radio', options: [{ label: 'Required', value: true }, { label: 'Optional', value: false }] },
        disabled: { type: 'radio', options: [{ label: 'Disabled', value: true }, { label: 'Enabled', value: false }] },
      },
      defaultProps: {
        label: 'Campo de texto',
        placeholder: 'Digite aqui...',
        type: 'text',
        error: false,
        required: false,
        disabled: false,
      },
      render: ({ label, placeholder, type, helperText, error, errorText, required, disabled }: InputProps) => {
        return (
          <Input
            label={label}
            placeholder={placeholder}
            type={type}
            helperText={helperText}
            error={error}
            errorText={errorText}
            required={required}
            disabled={disabled}
          />
        );
      },
    },
    Select: {
      fields: {
        label: { type: 'text' },
        helperText: { type: 'text' },
        error: { type: 'radio', options: [{ label: 'Error', value: true }, { label: 'Normal', value: false }] },
        errorText: { type: 'text' },
        required: { type: 'radio', options: [{ label: 'Required', value: true }, { label: 'Optional', value: false }] },
        disabled: { type: 'radio', options: [{ label: 'Disabled', value: true }, { label: 'Enabled', value: false }] },
        options: {
          type: 'array',
          arrayFields: {
            value: { type: 'text' },
            label: { type: 'text' },
          },
        },
      },
      defaultProps: {
        label: 'Selecione uma opção',
        error: false,
        required: false,
        disabled: false,
        options: [
          { value: '', label: 'Selecione...' },
          { value: 'opcao1', label: 'Opção 1' },
          { value: 'opcao2', label: 'Opção 2' },
          { value: 'opcao3', label: 'Opção 3' },
        ],
      },
      render: ({ label, helperText, error, errorText, required, disabled, options }: SelectProps) => {
        return (
          <Select
            label={label}
            helperText={helperText}
            error={error}
            errorText={errorText}
            required={required}
            disabled={disabled}
            options={options}
          />
        );
      },
    },
    Checkbox: {
      fields: {
        label: { type: 'text' },
        helperText: { type: 'text' },
        error: { type: 'radio', options: [{ label: 'Error', value: true }, { label: 'Normal', value: false }] },
        errorText: { type: 'text' },
        disabled: { type: 'radio', options: [{ label: 'Disabled', value: true }, { label: 'Enabled', value: false }] },
        checked: { type: 'radio', options: [{ label: 'Checked', value: true }, { label: 'Unchecked', value: false }] },
      },
      defaultProps: {
        label: 'Aceito os termos e condições',
        error: false,
        disabled: false,
        checked: false,
      },
      render: ({ label, helperText, error, errorText, disabled, checked }: CheckboxProps) => {
        return (
          <Checkbox
            label={label}
            helperText={helperText}
            error={error}
            errorText={errorText}
            disabled={disabled}
            checked={checked}
          />
        );
      },
    },
    Radio: {
      fields: {
        label: { type: 'text' },
        name: { type: 'text' },
        helperText: { type: 'text' },
        error: { type: 'radio', options: [{ label: 'Error', value: true }, { label: 'Normal', value: false }] },
        errorText: { type: 'text' },
        disabled: { type: 'radio', options: [{ label: 'Disabled', value: true }, { label: 'Enabled', value: false }] },
        checked: { type: 'radio', options: [{ label: 'Checked', value: true }, { label: 'Unchecked', value: false }] },
      },
      defaultProps: {
        label: 'Opção 1',
        name: 'radio-group',
        error: false,
        disabled: false,
        checked: false,
      },
      render: ({ label, name, helperText, error, errorText, disabled, checked }: RadioProps) => {
        return (
          <Radio
            label={label}
            name={name}
            helperText={helperText}
            error={error}
            errorText={errorText}
            disabled={disabled}
            checked={checked}
          />
        );
      },
    },
    Switch: {
      fields: {
        label: { type: 'text' },
        helperText: { type: 'text' },
        error: { type: 'radio', options: [{ label: 'Error', value: true }, { label: 'Normal', value: false }] },
        errorText: { type: 'text' },
        disabled: { type: 'radio', options: [{ label: 'Disabled', value: true }, { label: 'Enabled', value: false }] },
        checked: { type: 'radio', options: [{ label: 'On', value: true }, { label: 'Off', value: false }] },
      },
      defaultProps: {
        label: 'Ativar notificações',
        error: false,
        disabled: false,
        checked: false,
      },
      render: ({ label, helperText, error, errorText, disabled, checked }: SwitchProps) => {
        return (
          <Switch
            label={label}
            helperText={helperText}
            error={error}
            errorText={errorText}
            disabled={disabled}
            checked={checked}
          />
        );
      },
    },
  },
};
