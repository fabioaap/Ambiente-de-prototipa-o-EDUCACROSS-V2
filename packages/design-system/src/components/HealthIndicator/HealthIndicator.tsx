'use client';

import React from 'react';
import styles from './HealthIndicator.module.css';

export type HealthStatus = 'success' | 'warning' | 'error' | 'loading';

export interface HealthMetric {
  /** Nome da métrica */
  label: string;
  /** Status da métrica */
  status: HealthStatus;
  /** Valor a ser exibido */
  value: string | number;
  /** Descrição adicional ou tooltip */
  description?: string;
  /** Link para mais detalhes (GitHub Actions, npm, etc) */
  href?: string;
  /** Timestamp da última atualização */
  lastUpdated?: string;
}

export interface HealthIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Título do indicador de saúde */
  title?: string;
  /** Lista de métricas a serem exibidas */
  metrics: HealthMetric[];
  /** Variante de layout */
  variant?: 'compact' | 'detailed';
  /** Se verdadeiro, mostra timestamps */
  showTimestamps?: boolean;
}

const statusIcons: Record<HealthStatus, string> = {
  success: '✓',
  warning: '⚠',
  error: '✗',
  loading: '⟳',
};

const statusLabels: Record<HealthStatus, string> = {
  success: 'Sucesso',
  warning: 'Atenção',
  error: 'Erro',
  loading: 'Carregando',
};

/**
 * Componente HealthIndicator - Exibe indicadores de saúde do repositório
 * 
 * @example
 * ```tsx
 * <HealthIndicator
 *   title="Saúde do Repositório"
 *   metrics={[
 *     {
 *       label: "Build Status",
 *       status: "success",
 *       value: "Passou",
 *       href: "https://github.com/user/repo/actions",
 *       lastUpdated: "2 minutos atrás"
 *     }
 *   ]}
 * />
 * ```
 */
export const HealthIndicator = React.forwardRef<HTMLDivElement, HealthIndicatorProps>(
  (
    {
      title = 'Indicadores de Saúde',
      metrics,
      variant = 'detailed',
      showTimestamps = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.healthIndicator,
      styles[variant],
      className,
    ].filter(Boolean).join(' ');

    const formatTimestamp = (timestamp?: string) => {
      if (!timestamp) return null;
      return timestamp;
    };

    return (
      <div ref={ref} className={classNames} {...props}>
        {title && <h3 className={styles.title}>{title}</h3>}
        
        <div className={styles.metricsGrid}>
          {metrics.map((metric, index) => {
            const MetricWrapper = metric.href ? 'a' : 'div';
            const wrapperProps = metric.href 
              ? {
                  href: metric.href,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: styles.metricLink,
                }
              : { className: styles.metric };

            return (
              <MetricWrapper key={index} {...wrapperProps}>
                <div className={styles.metricContent}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricLabel}>{metric.label}</span>
                    <span
                      className={`${styles.statusBadge} ${styles[metric.status]}`}
                      role="img"
                      aria-label={statusLabels[metric.status]}
                      title={statusLabels[metric.status]}
                    >
                      {statusIcons[metric.status]}
                    </span>
                  </div>
                  
                  <div className={styles.metricValue}>
                    {metric.value}
                  </div>
                  
                  {metric.description && (
                    <div className={styles.metricDescription}>
                      {metric.description}
                    </div>
                  )}
                  
                  {showTimestamps && metric.lastUpdated && (
                    <div className={styles.metricTimestamp}>
                      {formatTimestamp(metric.lastUpdated)}
                    </div>
                  )}
                </div>
              </MetricWrapper>
            );
          })}
        </div>
      </div>
    );
  }
);

HealthIndicator.displayName = 'HealthIndicator';
