import React from 'react';
import styles from './Progress.module.css';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Valor atual do progresso (0-100 por padrão)
   */
  value: number;
  /**
   * Valor máximo do progresso (padrão: 100)
   */
  max?: number;
  /**
   * Variante visual do componente
   */
  variant?: 'linear' | 'circular';
  /**
   * Tamanho do componente
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Tema de cor do progresso
   */
  theme?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /**
   * Se verdadeiro, exibe o valor percentual como label
   */
  showLabel?: boolean;
  /**
   * Label customizado para acessibilidade (recomendado)
   */
  'aria-label'?: string;
}

/**
 * Componente Progress - Barra de progresso com variantes linear e circular
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      variant = 'linear',
      size = 'md',
      theme = 'primary',
      showLabel = false,
      className = '',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // Garantir que o valor esteja dentro dos limites
    const clampedValue = Math.min(Math.max(0, value), max);
    const percentage = (clampedValue / max) * 100;

    const classNames = [
      styles.progress,
      styles[variant],
      styles[size],
      styles[theme],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (variant === 'circular') {
      return (
        <div
          ref={ref}
          className={classNames}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={ariaLabel || `Progresso: ${percentage.toFixed(0)}%`}
          {...props}
        >
          <svg className={styles.circularSvg} viewBox="0 0 100 100">
            <circle
              className={styles.circularTrack}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="10"
            />
            <circle
              className={styles.circularFill}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="10"
              strokeDasharray={`${percentage * 2.827} 282.7`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          {showLabel && (
            <span className={styles.circularLabel}>{`${percentage.toFixed(0)}%`}</span>
          )}
        </div>
      );
    }

    // Variante linear (padrão)
    return (
      <div
        ref={ref}
        className={classNames}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel || `Progresso: ${percentage.toFixed(0)}%`}
        {...props}
      >
        <div className={styles.linearTrack}>
          <div
            className={styles.linearFill}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && (
          <span className={styles.linearLabel}>{`${percentage.toFixed(0)}%`}</span>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';
