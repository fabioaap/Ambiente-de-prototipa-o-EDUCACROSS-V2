'use client';

import React from 'react';
import styles from './StatsCard.module.css';

export interface TrendData {
  /** Valor da tendência (ex: "+12%", "-5%", "15 pontos") */
  value: string;
  /** Direção da tendência */
  direction: 'up' | 'down' | 'neutral';
  /** Label acessível para leitores de tela */
  ariaLabel?: string;
}

export interface StatsCardProps {
  /** Título do card (renderizado como h3) */
  title: string;
  /** Valor principal a ser exibido */
  value: string | number;
  /** Dados de tendência opcional */
  trend?: TrendData;
  /** Ícone opcional (componente React ou elemento) */
  icon?: React.ReactNode;
  /** Subtítulo ou descrição adicional */
  subtitle?: string;
  /** Conteúdo customizado (ex: gráficos) */
  children?: React.ReactNode;
  /** Estado de carregamento */
  isLoading?: boolean;
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * StatsCard - Componente para exibir estatísticas e KPIs
 * 
 * Exibe estatísticas com suporte a título, valor, tendência, ícone e gráficos customizados.
 * Inclui estado de carregamento com skeleton e recursos de acessibilidade.
 * 
 * @example
 * // Card simples com título e valor
 * <StatsCard title="Total de Usuários" value={1234} />
 * 
 * @example
 * // Card com tendência e ícone
 * <StatsCard
 *   title="Vendas"
 *   value="R$ 45.000"
 *   trend={{ value: "+12%", direction: "up", ariaLabel: "Aumento de 12%" }}
 *   icon={<IconSales />}
 * />
 * 
 * @example
 * // Card com gráfico customizado
 * <StatsCard title="Visitas" value={890}>
 *   <LineChart data={chartData} />
 * </StatsCard>
 */
export const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  (
    {
      title,
      value,
      trend,
      icon,
      subtitle,
      children,
      isLoading = false,
      className = '',
      ...rest
    },
    ref
  ) => {
    const classNames = [
      styles.statsCard,
      className,
    ].filter(Boolean).join(' ');

    // Determina a variante da badge baseada na direção da tendência
    const getTrendVariant = (direction: TrendData['direction']): string => {
      switch (direction) {
        case 'up':
          return styles.trendUp;
        case 'down':
          return styles.trendDown;
        case 'neutral':
        default:
          return styles.trendNeutral;
      }
    };

    // Renderiza o skeleton de carregamento
    if (isLoading) {
      return (
        <div ref={ref} className={classNames} {...rest}>
          <div className={styles.header}>
            <div className={styles.skeletonTitle} aria-busy="true" aria-live="polite" />
            {icon && <div className={styles.skeletonIcon} aria-busy="true" />}
          </div>
          <div className={styles.skeletonValue} aria-busy="true" />
          {(trend || subtitle) && (
            <div className={styles.skeletonSubtitle} aria-busy="true" />
          )}
          {children && (
            <div className={styles.skeletonChart} aria-busy="true" />
          )}
        </div>
      );
    }

    return (
      <div ref={ref} className={classNames} {...rest}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {icon && (
            <div className={styles.icon} aria-hidden="true">
              {icon}
            </div>
          )}
        </div>

        <div className={styles.value}>{value}</div>

        {(trend || subtitle) && (
          <div className={styles.footer}>
            {trend && (
              <span
                className={`${styles.trend} ${getTrendVariant(trend.direction)}`}
                aria-label={trend.ariaLabel || `Tendência: ${trend.value}`}
              >
                {trend.direction === 'up' && (
                  <svg
                    className={styles.trendIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 3L13 8L11.5 9.5L8.75 6.75V13H7.25V6.75L4.5 9.5L3 8L8 3Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                {trend.direction === 'down' && (
                  <svg
                    className={styles.trendIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 13L3 8L4.5 6.5L7.25 9.25V3H8.75V9.25L11.5 6.5L13 8L8 13Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                {trend.direction === 'neutral' && (
                  <svg
                    className={styles.trendIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8H13V9H3V8Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                {trend.value}
              </span>
            )}
            {subtitle && (
              <span className={styles.subtitle}>{subtitle}</span>
            )}
          </div>
        )}

        {children && (
          <div className={styles.content}>
            {children}
          </div>
        )}
      </div>
    );
  }
);

StatsCard.displayName = 'StatsCard';
