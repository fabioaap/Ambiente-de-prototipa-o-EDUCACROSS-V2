/**
 * Utilitários de Formatação de Métricas
 * Formatação de valores, thresholds, unidades e delta arrows para widgets de saúde
 */

/** Tipo de status baseado em threshold */
export type ThresholdStatus = 'success' | 'warning' | 'error';

/** Configuração de thresholds para métricas */
export interface ThresholdConfig {
  /** Valor abaixo do qual é considerado sucesso (para métricas onde menor é melhor) */
  successBelow?: number;
  /** Valor abaixo do qual é considerado warning (para métricas onde menor é melhor) */
  warningBelow?: number;
  /** Valor acima do qual é considerado sucesso (para métricas onde maior é melhor) */
  successAbove?: number;
  /** Valor acima do qual é considerado warning (para métricas onde maior é melhor) */
  warningAbove?: number;
  /** Inverter lógica (menor é melhor vs maior é melhor) */
  lowerIsBetter?: boolean;
}

/** Configurações padrão de threshold para cada métrica */
export const DEFAULT_THRESHOLDS: Record<string, ThresholdConfig> = {
  uptime: {
    successAbove: 99.5,
    warningAbove: 95,
    lowerIsBetter: false,
  },
  latency: {
    successBelow: 200,
    warningBelow: 500,
    lowerIsBetter: true,
  },
  errorRate: {
    successBelow: 1,
    warningBelow: 5,
    lowerIsBetter: true,
  },
};

/**
 * Calcula o status baseado no valor e threshold
 */
export function getStatusFromThreshold(
  value: number,
  config: ThresholdConfig
): ThresholdStatus {
  if (config.lowerIsBetter) {
    if (config.successBelow !== undefined && value < config.successBelow) {
      return 'success';
    }
    if (config.warningBelow !== undefined && value < config.warningBelow) {
      return 'warning';
    }
    return 'error';
  } else {
    if (config.successAbove !== undefined && value >= config.successAbove) {
      return 'success';
    }
    if (config.warningAbove !== undefined && value >= config.warningAbove) {
      return 'warning';
    }
    return 'error';
  }
}

/**
 * Formata valor de porcentagem
 */
export function formatPercentage(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Formata valor de latência em ms
 */
export function formatLatency(ms: number): string {
  if (ms < 1000) {
    return `${Math.round(ms)}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Formata taxa de erro
 */
export function formatErrorRate(rate: number): string {
  return `${rate.toFixed(2)}%`;
}

/**
 * Formata tempo de uptime em texto amigável
 */
export function formatUptime(percentage: number): string {
  return `${percentage.toFixed(2)}%`;
}

/** Tipo de delta (variação) */
export type DeltaDirection = 'up' | 'down' | 'neutral';

/** Interface para resultado de delta */
export interface DeltaResult {
  direction: DeltaDirection;
  value: number;
  formatted: string;
  arrow: string;
  isPositive: boolean;
}

/**
 * Calcula e formata delta entre valor atual e anterior
 * @param current Valor atual
 * @param previous Valor anterior
 * @param lowerIsBetter Se menor é melhor (ex: latência, error rate)
 */
export function calculateDelta(
  current: number,
  previous: number,
  lowerIsBetter = false
): DeltaResult {
  const diff = current - previous;
  const percentChange = previous !== 0 ? (diff / previous) * 100 : 0;
  
  let direction: DeltaDirection = 'neutral';
  if (diff > 0.01) {
    direction = 'up';
  } else if (diff < -0.01) {
    direction = 'down';
  }

  // Determina se a mudança é positiva (boa) ou negativa (ruim)
  let isPositive = false;
  if (direction === 'up') {
    isPositive = !lowerIsBetter;
  } else if (direction === 'down') {
    isPositive = lowerIsBetter;
  }

  const arrows: Record<DeltaDirection, string> = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };

  const sign = diff >= 0 ? '+' : '';
  const formatted = `${sign}${percentChange.toFixed(1)}%`;

  return {
    direction,
    value: diff,
    formatted,
    arrow: arrows[direction],
    isPositive,
  };
}

/**
 * Gera texto de tooltip para uma métrica
 */
export function generateTooltip(
  metricName: string,
  value: number,
  unit: string,
  status: ThresholdStatus,
  delta?: DeltaResult
): string {
  let tooltip = `${metricName}: ${value}${unit}`;
  
  const statusLabels: Record<ThresholdStatus, string> = {
    success: 'Saudável',
    warning: 'Atenção',
    error: 'Crítico',
  };
  
  tooltip += ` (${statusLabels[status]})`;
  
  if (delta && delta.direction !== 'neutral') {
    const changeText = delta.isPositive ? 'melhora' : 'piora';
    tooltip += `. Variação: ${delta.formatted} (${changeText})`;
  }
  
  return tooltip;
}

/**
 * Formata timestamp para exibição
 */
export function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
}

/** Interface para métricas de saúde do dashboard */
export interface HealthMetricData {
  name: string;
  value: number;
  unit: string;
  status: ThresholdStatus;
  delta?: DeltaResult;
  tooltip: string;
  lastUpdated: string;
}

/**
 * Processa dados brutos de uptime em formato para widget
 */
export function processUptimeMetric(
  currentUptime: number,
  previousUptime?: number,
  lastUpdated?: string
): HealthMetricData {
  const status = getStatusFromThreshold(currentUptime, DEFAULT_THRESHOLDS.uptime);
  const delta = previousUptime !== undefined
    ? calculateDelta(currentUptime, previousUptime, false)
    : undefined;
  
  return {
    name: 'Uptime',
    value: currentUptime,
    unit: '%',
    status,
    delta,
    tooltip: generateTooltip('Uptime', currentUptime, '%', status, delta),
    lastUpdated: lastUpdated || new Date().toISOString(),
  };
}

/**
 * Processa dados brutos de latência em formato para widget
 */
export function processLatencyMetric(
  currentLatency: number,
  previousLatency?: number,
  lastUpdated?: string
): HealthMetricData {
  const status = getStatusFromThreshold(currentLatency, DEFAULT_THRESHOLDS.latency);
  const delta = previousLatency !== undefined
    ? calculateDelta(currentLatency, previousLatency, true)
    : undefined;
  
  return {
    name: 'Latência',
    value: currentLatency,
    unit: 'ms',
    status,
    delta,
    tooltip: generateTooltip('Latência', currentLatency, 'ms', status, delta),
    lastUpdated: lastUpdated || new Date().toISOString(),
  };
}

/**
 * Processa dados brutos de taxa de erro em formato para widget
 */
export function processErrorRateMetric(
  currentErrorRate: number,
  previousErrorRate?: number,
  lastUpdated?: string
): HealthMetricData {
  const status = getStatusFromThreshold(currentErrorRate, DEFAULT_THRESHOLDS.errorRate);
  const delta = previousErrorRate !== undefined
    ? calculateDelta(currentErrorRate, previousErrorRate, true)
    : undefined;
  
  return {
    name: 'Taxa de Erro',
    value: currentErrorRate,
    unit: '%',
    status,
    delta,
    tooltip: generateTooltip('Taxa de Erro', currentErrorRate, '%', status, delta),
    lastUpdated: lastUpdated || new Date().toISOString(),
  };
}
