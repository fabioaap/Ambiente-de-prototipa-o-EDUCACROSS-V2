'use client';

import React from 'react';
import styles from './Skeleton.module.css';

/**
 * Props para o componente Skeleton
 */
export interface SkeletonProps {
  /**
   * Largura do skeleton. Aceita valores CSS (ex: '100%', '200px', '10rem')
   * @default '100%'
   */
  width?: string | number;
  
  /**
   * Altura do skeleton. Aceita valores CSS (ex: '20px', '2rem')
   * @default '1rem'
   */
  height?: string | number;
  
  /**
   * Variante visual do skeleton
   * - 'text': Para simular linhas de texto
   * - 'circular': Para simular avatares ou ícones circulares
   * - 'rectangular': Para simular cards, imagens ou blocos
   * @default 'text'
   */
  variant?: 'text' | 'circular' | 'rectangular';
  
  /**
   * Tipo de animação
   * - 'pulse': Animação de pulsação (opacidade)
   * - 'wave': Animação de onda (shimmer effect)
   * - 'none': Sem animação
   * @default 'pulse'
   */
  animation?: 'pulse' | 'wave' | 'none';
  
  /**
   * ClassName adicional para customização
   */
  className?: string;
}

/**
 * Skeleton - Componente de placeholder para conteúdo em carregamento
 * 
 * Utilizado para indicar que o conteúdo está sendo carregado, melhorando
 * a percepção de performance e evitando layouts vazios.
 * 
 * @example
 * // Skeleton para texto
 * <Skeleton width="200px" height="1rem" variant="text" />
 * 
 * @example
 * // Skeleton para avatar circular
 * <Skeleton width={40} height={40} variant="circular" />
 * 
 * @example
 * // Skeleton para card com animação de onda
 * <Skeleton width="100%" height="200px" variant="rectangular" animation="wave" />
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width = '100%',
      height = '1rem',
      variant = 'text',
      animation = 'pulse',
      className,
      ...rest
    },
    ref
  ) => {
    const widthValue = typeof width === 'number' ? `${width}px` : width;
    const heightValue = typeof height === 'number' ? `${height}px` : height;

    const classes = [
      styles.skeleton,
      styles[variant],
      animation !== 'none' && styles[animation],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        style={{
          width: widthValue,
          height: heightValue,
        }}
        aria-busy="true"
        aria-live="polite"
        {...rest}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
