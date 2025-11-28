/**
 * Hook para Exportação de Métricas
 * Permite exportar dados de métricas de saúde em JSON ou CSV
 */

import { HealthMetricData } from './metrics-formatter';

/** Formato de exportação suportado */
export type ExportFormat = 'json' | 'csv';

/** Interface para snapshot de métricas exportáveis */
export interface MetricsSnapshot {
  title: string;
  exportedAt: string;
  metrics: HealthMetricData[];
}

/**
 * Converte snapshot de métricas para JSON formatado
 */
export function exportToJSON(snapshot: MetricsSnapshot): string {
  return JSON.stringify(snapshot, null, 2);
}

/**
 * Converte snapshot de métricas para CSV
 */
export function exportToCSV(snapshot: MetricsSnapshot): string {
  const headers = [
    'Nome',
    'Valor',
    'Unidade',
    'Status',
    'Variação',
    'Direção',
    'Última Atualização',
  ];
  
  const rows = snapshot.metrics.map(metric => [
    metric.name,
    metric.value.toString(),
    metric.unit,
    metric.status,
    metric.delta?.formatted || 'N/A',
    metric.delta?.direction || 'neutral',
    metric.lastUpdated,
  ]);

  const csvContent = [
    `# ${snapshot.title}`,
    `# Exportado em: ${snapshot.exportedAt}`,
    '',
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  return csvContent;
}

/**
 * Gera nome de arquivo para exportação
 */
export function generateFileName(format: ExportFormat): string {
  const date = new Date().toISOString().slice(0, 10);
  const time = new Date().toISOString().slice(11, 19).replace(/:/g, '-');
  return `health-metrics-${date}_${time}.${format}`;
}

/**
 * Dispara download de arquivo
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/** Mapeamento de formato para tipo MIME */
const MIME_TYPES: Record<ExportFormat, string> = {
  json: 'application/json',
  csv: 'text/csv',
};

/**
 * Hook para gerenciar exportação de métricas
 */
export function useMetricsExport() {
  /**
   * Exporta métricas no formato especificado
   */
  const exportMetrics = (
    metrics: HealthMetricData[],
    format: ExportFormat = 'json',
    title = 'Health Metrics Dashboard'
  ): void => {
    const snapshot: MetricsSnapshot = {
      title,
      exportedAt: new Date().toISOString(),
      metrics,
    };

    let content: string;
    if (format === 'json') {
      content = exportToJSON(snapshot);
    } else {
      content = exportToCSV(snapshot);
    }

    const filename = generateFileName(format);
    downloadFile(content, filename, MIME_TYPES[format]);
  };

  /**
   * Copia métricas para área de transferência como JSON
   */
  const copyToClipboard = async (
    metrics: HealthMetricData[],
    title = 'Health Metrics Dashboard'
  ): Promise<boolean> => {
    try {
      const snapshot: MetricsSnapshot = {
        title,
        exportedAt: new Date().toISOString(),
        metrics,
      };
      await navigator.clipboard.writeText(exportToJSON(snapshot));
      return true;
    } catch {
      console.error('Erro ao copiar para área de transferência');
      return false;
    }
  };

  return {
    exportMetrics,
    copyToClipboard,
    exportToJSON,
    exportToCSV,
  };
}
