'use client';

import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Variante visual do badge */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  /** Tamanho do badge */
  size?: 'sm' | 'md' | 'lg';
  /** Estilo do badge (filled, outlined, soft) */
  styleType?: 'filled' | 'outlined' | 'soft';
  /** Exibir um dot antes do conteúdo */
  dot?: boolean;
  /** Ícone a ser exibido antes do conteúdo */
  icon?: React.ReactNode;
  /** Conteúdo do badge */
  children?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    variant = 'default', 
    size = 'md', 
    styleType = 'filled',
    dot = false,
    icon,
    className = '', 
    children, 
    ...props 
  }, ref) => {
    const classNames = [
      styles.badge,
      styles[variant],
      styles[size],
      styles[styleType],
      className,
    ].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classNames} {...props}>
        {dot && <span className={styles.dot} />}
        {icon && <span className={styles.icon}>{icon}</span>}
        {children && <span className={styles.content}>{children}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
