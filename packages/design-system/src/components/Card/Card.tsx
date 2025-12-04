import React from 'react';
import './Card.css';

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
      'Card_card',
      `Card_${variant}`,
      `Card_padding-${padding}`,
      clickable && 'Card_clickable',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const Component = 'div';
    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref && typeof ref === 'object' && 'current' in ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    return (
      <Component 
        ref={ref as unknown as React.Ref<HTMLDivElement>}
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
    className={`Card_cardHeader ${className}`}
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
    className={`Card_cardTitle ${className}`}
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
    className={`Card_cardDescription ${className}`}
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
    className={`Card_cardContent ${className}`}
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
    className={`Card_cardFooter ${className}`}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';
