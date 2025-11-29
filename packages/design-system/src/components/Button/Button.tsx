import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visual do botão
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /**
   * Tamanho do botão
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Se verdadeiro, o botão ocupará toda a largura do container
   */
  fullWidth?: boolean;
  /**
   * Label acessível para botões apenas com ícones (obrigatório se children for apenas ícone)
   */
  'aria-label'?: string;
  /**
   * Conteúdo do botão
   */
  children: React.ReactNode;
}

/**
 * Componente Button - Botão reutilizável com múltiplas variantes
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const classNames = [
      'Button_button',
      `Button_${variant}`,
      `Button_${size}`,
      fullWidth && 'Button_fullWidth',
      disabled && 'Button_disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classNames} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
