import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  /**
   * Variante visual do card
   */
  variant?: 'default' | 'bordered' | 'elevated';
  /**
   * Padding do card
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * Se verdadeiro, o card será clicável
   */
  clickable?: boolean;
  /**
   * Callback ao clicar no card
   */
  onClick?: () => void;
  /**
   * Conteúdo do card
   */
  children: React.ReactNode;
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

/**
 * Componente Card - Container com estilização consistente
 */
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  clickable = false,
  onClick,
  className = '',
  children,
}) => {
  const classNames = [
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    clickable && styles.clickable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Component = clickable ? 'button' : 'div';

  return (
    <Component className={classNames} onClick={onClick}>
      {children}
    </Component>
  );
};
