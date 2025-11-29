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
   * Role ARIA opcional (ex: 'region' para seções importantes)
   */
  role?: string;
  /**
   * Label acessível opcional (recomendado quando role='region')
   */
  'aria-label'?: string;
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
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = 'default',
    padding = 'md',
    clickable = false,
    onClick,
    role,
    'aria-label': ariaLabel,
    className = '',
    children,
  }, ref) => {
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
      <Component 
        ref={ref as any}
        className={classNames} 
        onClick={onClick}
        role={role}
        aria-label={ariaLabel}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

/**
 * CardHeader - Cabeçalho do card com espaçamento padrão
 */
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`${styles.cardHeader} ${className}`}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle - Título do card
 */
export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = '', ...props }, ref) => (
  <h3
    ref={ref}
    className={`${styles.cardTitle} ${className}`}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

/**
 * CardDescription - Descrição do card
 */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = '', ...props }, ref) => (
  <p
    ref={ref}
    className={`${styles.cardDescription} ${className}`}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

/**
 * CardContent - Conteúdo principal do card
 */
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`${styles.cardContent} ${className}`}
    {...props}
  />
));

CardContent.displayName = 'CardContent';

/**
 * CardFooter - Rodapé do card
 */
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`${styles.cardFooter} ${className}`}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';
