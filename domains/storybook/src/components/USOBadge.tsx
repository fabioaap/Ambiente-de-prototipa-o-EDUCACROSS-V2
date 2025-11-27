import React from 'react';
import { getRedeColor } from '../tokens/jornada-4800.tokens';

export interface USOBadgeProps {
  /**
   * Nome da rede/uso
   * @default "Canoas"
   */
  rede: string;

  /**
   * Variante de estilo
   * @default "filled"
   */
  variant?: 'filled' | 'outline';

  /**
   * Tamanho do badge
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Classe CSS adicional
   */
  className?: string;
}

/**
 * Componente USO Badge
 * Exibe a rede/contexto de uma questão com cor diferenciada
 */
export const USOBadge = React.forwardRef<HTMLDivElement, USOBadgeProps>(
  ({ rede, variant = 'filled', size = 'md', className = '' }, ref) => {
    const colors = getRedeColor(rede);

    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      borderRadius: '8px',
      whiteSpace: 'nowrap',
      fontFamily: 'Inter, system-ui, sans-serif',
      transition: 'all 0.2s ease',
    };

    const sizeStyles = {
      sm: {
        padding: '4px 8px',
        fontSize: '12px',
        lineHeight: '16px',
      },
      md: {
        padding: '6px 12px',
        fontSize: '14px',
        lineHeight: '20px',
      },
      lg: {
        padding: '8px 16px',
        fontSize: '16px',
        lineHeight: '24px',
      },
    };

    const variantStyles = {
      filled: {
        backgroundColor: colors.primary,
        color: colors.text,
        border: `1px solid ${colors.primary}`,
      },
      outline: {
        backgroundColor: 'transparent',
        color: colors.primary,
        border: `1px solid ${colors.primary}`,
      },
    };

    const combinedStyles = {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };

    return (
      <div ref={ref} style={combinedStyles} className={className}>
        {rede}
      </div>
    );
  }
);

USOBadge.displayName = 'USOBadge';

export default USOBadge;
