'use client';

import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Variante visual do badge */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Tamanho do badge */
  size?: 'sm' | 'md' | 'lg';
  /** Conteúdo do badge */
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className = '', children, ...props }, ref) => {
    const classNames = [
      styles.badge,
      styles[variant],
      styles[size],
      className,
    ].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classNames} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
