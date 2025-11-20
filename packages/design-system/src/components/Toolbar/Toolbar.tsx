'use client';

import React from 'react';
import styles from './Toolbar.module.css';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alinhamento dos itens dentro da toolbar
   */
  align?: 'left' | 'center' | 'right' | 'space-between';
  /**
   * Conteúdo da toolbar (geralmente botões ou controles)
   */
  children: React.ReactNode;
}

/**
 * Componente Toolbar - Barra horizontal para agrupar ações e controles
 */
export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  (
    {
      align = 'left',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.toolbar,
      styles[align],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

Toolbar.displayName = 'Toolbar';
