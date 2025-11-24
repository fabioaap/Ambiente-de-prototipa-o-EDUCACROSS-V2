/**
 * Tipos compartilhados para configuração do Puck
 * Mantém single source of truth entre config cliente e servidor
 */

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
