'use client';

import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Variante visual do badge */
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  /** Tamanho do badge */
  size?: 'sm' | 'md' | 'lg';
  /** Ícone opcional à esquerda do texto */
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'neutral', size = 'md', icon, className = '', children, ...props }, ref) => {
    const classNames = [
      styles.badge,
      styles[variant],
      styles[size],
      className,
    ].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classNames} {...props}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.content}>{children}</span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';
