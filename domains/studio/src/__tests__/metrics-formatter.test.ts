import {
  getStatusFromThreshold,
  formatPercentage,
  formatLatency,
  formatErrorRate,
  formatUptime,
  calculateDelta,
  generateTooltip,
  formatTimestamp,
  processUptimeMetric,
  processLatencyMetric,
  processErrorRateMetric,
  DEFAULT_THRESHOLDS,
} from '../lib/metrics-formatter';

describe('metrics-formatter', () => {
  describe('getStatusFromThreshold', () => {
    it('deve retornar success para uptime acima do threshold', () => {
      expect(getStatusFromThreshold(99.9, DEFAULT_THRESHOLDS.uptime)).toBe('success');
    });

    it('deve retornar warning para uptime entre thresholds', () => {
      expect(getStatusFromThreshold(97, DEFAULT_THRESHOLDS.uptime)).toBe('warning');
    });

    it('deve retornar error para uptime abaixo do threshold', () => {
      expect(getStatusFromThreshold(90, DEFAULT_THRESHOLDS.uptime)).toBe('error');
    });

    it('deve retornar success para latência abaixo do threshold', () => {
      expect(getStatusFromThreshold(150, DEFAULT_THRESHOLDS.latency)).toBe('success');
    });

    it('deve retornar warning para latência entre thresholds', () => {
      expect(getStatusFromThreshold(350, DEFAULT_THRESHOLDS.latency)).toBe('warning');
    });

    it('deve retornar error para latência acima do threshold', () => {
      expect(getStatusFromThreshold(600, DEFAULT_THRESHOLDS.latency)).toBe('error');
    });

    it('deve retornar success para error rate abaixo do threshold', () => {
      expect(getStatusFromThreshold(0.5, DEFAULT_THRESHOLDS.errorRate)).toBe('success');
    });

    it('deve retornar warning para error rate entre thresholds', () => {
      expect(getStatusFromThreshold(3, DEFAULT_THRESHOLDS.errorRate)).toBe('warning');
    });

    it('deve retornar error para error rate acima do threshold', () => {
      expect(getStatusFromThreshold(10, DEFAULT_THRESHOLDS.errorRate)).toBe('error');
    });
  });

  describe('formatPercentage', () => {
    it('deve formatar porcentagem com decimais padrão', () => {
      expect(formatPercentage(99.87)).toBe('99.87%');
    });

    it('deve formatar porcentagem com decimais customizados', () => {
      expect(formatPercentage(99.876, 1)).toBe('99.9%');
    });

    it('deve formatar porcentagem sem decimais', () => {
      expect(formatPercentage(99.5, 0)).toBe('100%');
    });
  });

  describe('formatLatency', () => {
    it('deve formatar latência em ms para valores menores que 1s', () => {
      expect(formatLatency(150)).toBe('150ms');
    });

    it('deve formatar latência em segundos para valores maiores que 1s', () => {
      expect(formatLatency(1500)).toBe('1.50s');
    });

    it('deve arredondar valores em ms', () => {
      expect(formatLatency(150.7)).toBe('151ms');
    });
  });

  describe('formatErrorRate', () => {
    it('deve formatar taxa de erro com porcentagem', () => {
      expect(formatErrorRate(0.42)).toBe('0.42%');
    });

    it('deve formatar taxa de erro alta', () => {
      expect(formatErrorRate(5.5)).toBe('5.50%');
    });
  });

  describe('formatUptime', () => {
    it('deve formatar uptime com porcentagem', () => {
      expect(formatUptime(99.87)).toBe('99.87%');
    });
  });

  describe('calculateDelta', () => {
    it('deve calcular delta positivo corretamente', () => {
      const result = calculateDelta(100, 90);
      expect(result.direction).toBe('up');
      expect(result.value).toBeCloseTo(10);
      expect(result.isPositive).toBe(true);
    });

    it('deve calcular delta negativo corretamente', () => {
      const result = calculateDelta(90, 100);
      expect(result.direction).toBe('down');
      expect(result.value).toBeCloseTo(-10);
      expect(result.isPositive).toBe(false);
    });

    it('deve calcular delta neutro para valores iguais', () => {
      const result = calculateDelta(100, 100);
      expect(result.direction).toBe('neutral');
    });

    it('deve inverter isPositive quando lowerIsBetter é true', () => {
      const resultUp = calculateDelta(100, 90, true);
      expect(resultUp.isPositive).toBe(false);

      const resultDown = calculateDelta(90, 100, true);
      expect(resultDown.isPositive).toBe(true);
    });

    it('deve formatar o valor percentual corretamente', () => {
      const result = calculateDelta(110, 100);
      expect(result.formatted).toBe('+10.0%');
    });

    it('deve incluir arrow correto', () => {
      expect(calculateDelta(110, 100).arrow).toBe('↑');
      expect(calculateDelta(90, 100).arrow).toBe('↓');
      expect(calculateDelta(100, 100).arrow).toBe('→');
    });
  });

  describe('generateTooltip', () => {
    it('deve gerar tooltip básico', () => {
      const tooltip = generateTooltip('Uptime', 99.9, '%', 'success');
      expect(tooltip).toContain('Uptime: 99.9%');
      expect(tooltip).toContain('Saudável');
    });

    it('deve incluir variação no tooltip quando delta é fornecido', () => {
      const delta = calculateDelta(100, 95);
      const tooltip = generateTooltip('Uptime', 100, '%', 'success', delta);
      expect(tooltip).toContain('Variação');
      expect(tooltip).toContain('melhora');
    });

    it('deve indicar piora quando delta é negativo', () => {
      const delta = calculateDelta(95, 100);
      const tooltip = generateTooltip('Uptime', 95, '%', 'warning', delta);
      expect(tooltip).toContain('piora');
    });
  });

  describe('formatTimestamp', () => {
    it('deve formatar timestamp ISO em formato pt-BR', () => {
      const timestamp = '2025-11-24T10:30:00Z';
      const formatted = formatTimestamp(timestamp);
      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });
  });

  describe('processUptimeMetric', () => {
    it('deve processar métrica de uptime corretamente', () => {
      const metric = processUptimeMetric(99.9);
      expect(metric.name).toBe('Uptime');
      expect(metric.value).toBe(99.9);
      expect(metric.unit).toBe('%');
      expect(metric.status).toBe('success');
    });

    it('deve incluir delta quando valor anterior é fornecido', () => {
      const metric = processUptimeMetric(99.9, 99.8);
      expect(metric.delta).toBeDefined();
      expect(metric.delta?.direction).toBe('up');
    });
  });

  describe('processLatencyMetric', () => {
    it('deve processar métrica de latência corretamente', () => {
      const metric = processLatencyMetric(150);
      expect(metric.name).toBe('Latência');
      expect(metric.value).toBe(150);
      expect(metric.unit).toBe('ms');
      expect(metric.status).toBe('success');
    });

    it('deve marcar latência alta como warning', () => {
      const metric = processLatencyMetric(350);
      expect(metric.status).toBe('warning');
    });

    it('deve marcar latência muito alta como error', () => {
      const metric = processLatencyMetric(600);
      expect(metric.status).toBe('error');
    });
  });

  describe('processErrorRateMetric', () => {
    it('deve processar métrica de taxa de erro corretamente', () => {
      const metric = processErrorRateMetric(0.5);
      expect(metric.name).toBe('Taxa de Erro');
      expect(metric.value).toBe(0.5);
      expect(metric.unit).toBe('%');
      expect(metric.status).toBe('success');
    });

    it('deve marcar taxa de erro alta como warning', () => {
      const metric = processErrorRateMetric(3);
      expect(metric.status).toBe('warning');
    });

    it('deve marcar taxa de erro muito alta como error', () => {
      const metric = processErrorRateMetric(10);
      expect(metric.status).toBe('error');
    });
  });
});
