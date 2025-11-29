import React from 'react';
import './Text.css';

export interface TextProps {
  /**
   * Elemento HTML a ser renderizado
   */
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Tamanho do texto
   */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  /**
   * Peso da fonte
   */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /**
   * Cor do texto
   */
  color?: 'default' | 'muted' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /**
   * Alinhamento do texto
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Conteúdo do texto
   */
  children: React.ReactNode;
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * Estilos inline opcionais
   */
  style?: React.CSSProperties;
}

/**
 * Componente Text - Tipografia reutilizável
 */
export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'default',
  align = 'left',
  className = '',
  style,
  children,
}) => {
  const classNames = [
    'Text_text',
    `Text_size-${size}`,
    `Text_weight-${weight}`,
    `Text_color-${color}`,
    `Text_align-${align}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classNames} style={style}>
      {children}
    </Component>
  );
};
