import {
  exportToJSON,
  exportToCSV,
  generateFileName,
  type MetricsSnapshot,
} from '../lib/metrics-export';
import type { HealthMetricData } from '../lib/metrics-formatter';

describe('metrics-export', () => {
  const mockMetrics: HealthMetricData[] = [
    {
      name: 'Uptime',
      value: 99.87,
      unit: '%',
      status: 'success',
      delta: {
        direction: 'up',
        value: 0.05,
        formatted: '+0.1%',
        arrow: '↑',
        isPositive: true,
      },
      tooltip: 'Uptime: 99.87% (Saudável)',
      lastUpdated: '2025-11-24T10:30:00Z',
    },
    {
      name: 'Latência',
      value: 145,
      unit: 'ms',
      status: 'success',
      delta: {
        direction: 'down',
        value: -15,
        formatted: '-9.4%',
        arrow: '↓',
        isPositive: true,
      },
      tooltip: 'Latência: 145ms (Saudável)',
      lastUpdated: '2025-11-24T10:30:00Z',
    },
    {
      name: 'Taxa de Erro',
      value: 0.42,
      unit: '%',
      status: 'success',
      tooltip: 'Taxa de Erro: 0.42% (Saudável)',
      lastUpdated: '2025-11-24T10:30:00Z',
    },
  ];

  const mockSnapshot: MetricsSnapshot = {
    title: 'Health Metrics Dashboard',
    exportedAt: '2025-11-24T10:30:00Z',
    metrics: mockMetrics,
  };

  describe('exportToJSON', () => {
    it('deve exportar snapshot como JSON formatado', () => {
      const json = exportToJSON(mockSnapshot);
      const parsed = JSON.parse(json);
      
      expect(parsed.title).toBe('Health Metrics Dashboard');
      expect(parsed.exportedAt).toBe('2025-11-24T10:30:00Z');
      expect(parsed.metrics).toHaveLength(3);
    });

    it('deve incluir todas as propriedades das métricas', () => {
      const json = exportToJSON(mockSnapshot);
      const parsed = JSON.parse(json);
      
      expect(parsed.metrics[0].name).toBe('Uptime');
      expect(parsed.metrics[0].value).toBe(99.87);
      expect(parsed.metrics[0].unit).toBe('%');
      expect(parsed.metrics[0].status).toBe('success');
      expect(parsed.metrics[0].delta).toBeDefined();
    });

    it('deve manter delta undefined quando não existe', () => {
      const json = exportToJSON(mockSnapshot);
      const parsed = JSON.parse(json);
      
      expect(parsed.metrics[2].delta).toBeUndefined();
    });
  });

  describe('exportToCSV', () => {
    it('deve exportar snapshot como CSV', () => {
      const csv = exportToCSV(mockSnapshot);
      
      expect(csv).toContain('# Health Metrics Dashboard');
      expect(csv).toContain('# Exportado em: 2025-11-24T10:30:00Z');
    });

    it('deve incluir cabeçalhos corretos', () => {
      const csv = exportToCSV(mockSnapshot);
      const lines = csv.split('\n');
      const headerLine = lines.find(line => line.startsWith('Nome,'));
      
      expect(headerLine).toBe('Nome,Valor,Unidade,Status,Variação,Direção,Última Atualização');
    });

    it('deve incluir dados das métricas', () => {
      const csv = exportToCSV(mockSnapshot);
      
      expect(csv).toContain('"Uptime"');
      expect(csv).toContain('"99.87"');
      expect(csv).toContain('"%"');
      expect(csv).toContain('"success"');
    });

    it('deve usar N/A para delta quando não existe', () => {
      const csv = exportToCSV(mockSnapshot);
      const lines = csv.split('\n');
      const errorRateLine = lines.find(line => line.includes('Taxa de Erro'));
      
      expect(errorRateLine).toContain('"N/A"');
    });
  });

  describe('generateFileName', () => {
    it('deve gerar nome de arquivo JSON com timestamp', () => {
      const filename = generateFileName('json');
      
      expect(filename).toMatch(/^health-metrics-\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.json$/);
    });

    it('deve gerar nome de arquivo CSV com timestamp', () => {
      const filename = generateFileName('csv');
      
      expect(filename).toMatch(/^health-metrics-\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.csv$/);
    });
  });
});
