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
  /** Cor customizada (ex: '#28C76F', '#EA5455'). Sobrescreve variant. 
   * Deve ser um hex color válido. Quando fornecida, usa estilo filled com a cor como background. */
  customColor?: string;
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
    customColor,
    dot = false,
    icon,
    className = '',
    children,
    ...props
  }, ref) => {
    // Se customColor for fornecida, usar estilo filled com a cor customizada
    const variantClass = customColor ? undefined : variant;

    const classNames = [
      styles.badge,
      variantClass && styles[variantClass],
      styles[size],
      !customColor && styles[styleType],
      customColor && styles.filled, // Quando usar customColor, sempre usar filled
      className,
    ].filter(Boolean).join(' ');

    // Se customColor for fornecida, aplicar inline style
    const inlineStyle = customColor
      ? {
        backgroundColor: customColor,
        color: 'white',
        border: `1px solid ${customColor}`,
      }
      : undefined;

    return (
      <span ref={ref} className={classNames} style={inlineStyle} {...props}>
        {dot && <span className={styles.dot} />}
        {icon && <span className={styles.icon}>{icon}</span>}
        {children && <span className={styles.content}>{children}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
