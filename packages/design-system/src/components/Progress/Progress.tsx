'use client';

import React from 'react';
import './Progress.css';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Valor atual do progresso (0-100)
   */
  value: number;
  /**
   * Variante visual do componente
   */
  variant?: 'linear' | 'circular';
  /**
   * Tamanho do componente (ignorado se height for fornecido)
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Altura customizada em pixels (ex: '12px', '16px'). Sobrescreve o tamanho predefinido.
   * Aplicável apenas para variant='linear'
   */
  height?: string;
  /**
   * Cor do tema (usa design tokens)
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /**
   * Mostrar label de porcentagem
   */
  showLabel?: boolean;
  /**
   * Label customizado (sobrescreve porcentagem)
   */
  label?: string;
  /**
   * Descrição para acessibilidade
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
      variant = 'linear',
      size = 'md',
      color = 'primary',
      height,
      showLabel = false,
      label,
      className = '',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // Garantir que o valor esteja entre 0 e 100
    const clampedValue = Math.min(Math.max(value, 0), 100);
    const displayLabel = label || `${Math.round(clampedValue)}%`;

    const classNames = [
      "Progress_progress",
      `Progress_${variant}`,
      `Progress_${size}`,
      `Progress_${color}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (variant === 'circular') {
      // Para circular, usar SVG
      const strokeWidth = size === 'sm' ? 3 : size === 'lg' ? 5 : 4;
      const radius = size === 'sm' ? 18 : size === 'lg' ? 26 : 22;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (clampedValue / 100) * circumference;
      const svgSize = (radius + strokeWidth) * 2;

      return (
        <div
          ref={ref}
          className={classNames}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={ariaLabel || 'Progress indicator'}
          {...props}
        >
          <svg
            className={"Progress_circularSvg"}
            width={svgSize}
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
          >
            {/* Background circle */}
            <circle
              className={"Progress_circularBackground"}
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <circle
              className={"Progress_circularForeground"}
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${svgSize / 2} ${svgSize / 2})`}
            />
          </svg>
          {showLabel && (
            <span className={"Progress_circularLabel"}>{displayLabel}</span>
          )}
        </div>
      );
    }

    // Linear variant
    return (
      <div
        ref={ref}
        className={classNames}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel || 'Progress indicator'}
        {...props}
      >
        <div
          className={"Progress_linearTrack"}
          style={height ? { height } : undefined}
        >
          <div
            className={"Progress_linearFill"}
            style={{ width: `${clampedValue}%` }}
          />
        </div>
        {showLabel && <span className={"Progress_linearLabel"}>{displayLabel}</span>}
      </div>
    );
  }
);

Progress.displayName = 'Progress';
