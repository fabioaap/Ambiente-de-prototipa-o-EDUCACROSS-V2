import React from 'react';
import './Layout.css';

export interface LayoutProps {
  /**
   * Largura máxima do layout
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /**
   * Padding horizontal
   */
  paddingX?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * Padding vertical
   */
  paddingY?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * Centralizar o conteúdo
   */
  centered?: boolean;
  /**
   * Conteúdo do layout
   */
  children: React.ReactNode;
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

/**
 * Componente Layout - Container de página com configurações responsivas
 */
export const Layout: React.FC<LayoutProps> = ({
  maxWidth = 'xl',
  paddingX = 'md',
  paddingY = 'md',
  centered = true,
  className = '',
  children,
}) => {
  const classNames = [
    'Layout_layout',
    `Layout_max-${maxWidth}`,
    `Layout_px-${paddingX}`,
    `Layout_py-${paddingY}`,
    centered && 'Layout_centered',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
};
