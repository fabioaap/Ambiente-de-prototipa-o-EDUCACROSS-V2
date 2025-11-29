'use client';

import React from 'react';
import { Card, Text, Button } from '@prototipo/design-system';
import { HealthIndicator } from '@prototipo/design-system';
import type { HealthMetricData } from '../../lib/metrics-formatter';
import type { ExportFormat } from '../../lib/metrics-export';
import { useMetricsExport } from '../../lib/metrics-export';
import styles from './HealthMetricsWidgets.module.css';

/** Props para o widget de KPI individual */
export interface KPIWidgetProps {
  /** Dados da métrica */
  metric: HealthMetricData;
  /** Tamanho do widget */
  size?: 'sm' | 'md' | 'lg';
  /** Se está carregando */
  loading?: boolean;
}

/**
 * Widget individual de KPI
 */
export const KPIWidget: React.FC<KPIWidgetProps> = ({
  metric,
  size = 'md',
  loading = false,
}) => {
  if (loading) {
    return (
      <div className={styles.kpiSkeleton} data-size={size}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonValue} />
        <div className={styles.skeletonDescription} />
      </div>
    );
  }

  const statusMap: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
    success: 'success',
    warning: 'warning',
    error: 'error',
  };

  const deltaClass = metric.delta?.isPositive ? styles.positive : styles.negative;
  const deltaDisplay = metric.delta ? (
    <span className={`${styles.delta} ${deltaClass}`}>
      {metric.delta.arrow} {metric.delta.formatted}
    </span>
  ) : null;

  const valueWithUnit = `${metric.value}${metric.unit}`;

  return (
    <HealthIndicator
      title={metric.name}
      value={valueWithUnit}
      status={statusMap[metric.status] || 'info'}
      description={deltaDisplay ? undefined : 'Sem variação'}
      size={size}
      aria-label={metric.tooltip}
      data-testid={`kpi-${metric.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {deltaDisplay && (
        <div className={styles.deltaContainer}>
          {deltaDisplay}
        </div>
      )}
    </HealthIndicator>
  );
};

/** Props para o painel de métricas de saúde */
export interface HealthMetricsPanelProps {
  /** Lista de métricas a exibir */
  metrics: HealthMetricData[];
  /** Se está carregando */
  loading?: boolean;
  /** Se houve erro ao carregar */
  error?: string | null;
  /** Callback de retry */
  onRetry?: () => void;
  /** Título do painel */
  title?: string;
  /** Tamanho dos widgets */
  size?: 'sm' | 'md' | 'lg';
  /** Habilitar exportação */
  enableExport?: boolean;
  /** Última atualização */
  lastUpdated?: string;
}

/**
 * Painel completo de métricas de saúde com KPIs
 */
export const HealthMetricsPanel: React.FC<HealthMetricsPanelProps> = ({
  metrics,
  loading = false,
  error = null,
  onRetry,
  title = 'Métricas de Saúde',
  size = 'sm',
  enableExport = true,
  lastUpdated,
}) => {
  const { exportMetrics } = useMetricsExport();
  const [exportFormat, setExportFormat] = React.useState<ExportFormat>('json');

  const handleExport = () => {
    exportMetrics(metrics, exportFormat, title);
  };

  // Estado de erro
  if (error) {
    return (
      <Card variant="bordered" padding="lg" className={styles.errorCard}>
        <div className={styles.errorContent}>
          <Text as="h3" size="xl" weight="semibold" color="error">
            Erro ao carregar métricas
          </Text>
          <Text size="sm" color="muted" style={{ marginTop: '0.5rem' }}>
            {error}
          </Text>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              style={{ marginTop: '1rem' }}
              aria-label="Tentar carregar métricas novamente"
            >
              Tentar Novamente
            </Button>
          )}
        </div>
      </Card>
    );
  }

  // Estado de carregamento
  if (loading) {
    return (
      <Card variant="elevated" padding="md" className={styles.panel}>
        <div className={styles.header}>
          <div className={styles.skeletonTitle} style={{ width: '200px' }} />
        </div>
        <div className={styles.grid}>
          {[1, 2, 3].map((i) => (
            <KPIWidget
              key={i}
              metric={{
                name: 'Loading',
                value: 0,
                unit: '',
                status: 'success',
                tooltip: '',
                lastUpdated: '',
              }}
              loading={true}
              size={size}
            />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card variant="elevated" padding="md" className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <Text as="h2" size="xl" weight="semibold">
            {title}
          </Text>
          {lastUpdated && (
            <Text size="xs" color="muted">
              Atualizado: {new Date(lastUpdated).toLocaleString('pt-BR')}
            </Text>
          )}
        </div>
        
        {enableExport && metrics.length > 0 && (
          <div className={styles.exportGroup}>
            <select
              className={styles.formatSelect}
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
              aria-label="Formato de exportação"
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              aria-label={`Exportar métricas como ${exportFormat.toUpperCase()}`}
            >
              Exportar
            </Button>
          </div>
        )}
      </div>

      {metrics.length === 0 ? (
        <div className={styles.emptyState}>
          <Text color="muted">Nenhuma métrica disponível.</Text>
        </div>
      ) : (
        <div className={styles.grid}>
          {metrics.map((metric, index) => (
            <KPIWidget
              key={`${metric.name}-${index}`}
              metric={metric}
              size={size}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default HealthMetricsPanel;
