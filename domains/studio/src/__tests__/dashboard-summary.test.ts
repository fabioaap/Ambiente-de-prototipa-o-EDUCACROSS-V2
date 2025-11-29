/**
 * Testes para Dashboard API - /api/dashboard/summary
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '@/app/api/dashboard/summary/route';

// Mock das dependências
vi.mock('@/lib/health-metrics', () => ({
    aggregateHealthMetrics: vi.fn().mockResolvedValue({
        buildStatus: 'success',
        lintStatus: 'success',
        typeCheckStatus: 'success',
        dependenciesHealth: 'healthy',
        healthScore: 100,
        lastChecked: '2025-11-24T10:30:00Z',
    }),
    getHealthStatus: vi.fn().mockReturnValue('excellent'),
}));

describe('GET /api/dashboard/summary', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('retorna resposta de sucesso com KPIs', async () => {
        const request = new Request('http://localhost:3000/api/dashboard/summary');
        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toBeDefined();
        expect(data.data.status).toBe('excellent');
        expect(data.data.healthScore).toBe(100);
        expect(data.data.kpis).toBeInstanceOf(Array);
        expect(data.data.kpis.length).toBeGreaterThan(0);
        expect(data.timestamp).toBeDefined();
    });

    it('retorna resposta sem KPIs quando includeKpis=false', async () => {
        const request = new Request('http://localhost:3000/api/dashboard/summary?includeKpis=false');
        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data.kpis).toEqual([]);
    });

    it('KPIs possuem estrutura correta', async () => {
        const request = new Request('http://localhost:3000/api/dashboard/summary');
        const response = await GET(request);
        const data = await response.json();

        const kpi = data.data.kpis[0];
        expect(kpi).toHaveProperty('name');
        expect(kpi).toHaveProperty('value');
        expect(kpi).toHaveProperty('unit');
        expect(kpi).toHaveProperty('trend');
        expect(kpi).toHaveProperty('changePercent');
        expect(['up', 'down', 'stable']).toContain(kpi.trend);
        expect(typeof kpi.value).toBe('number');
        expect(typeof kpi.changePercent).toBe('number');
    });

    it('inclui lastUpdated no formato ISO8601', async () => {
        const request = new Request('http://localhost:3000/api/dashboard/summary');
        const response = await GET(request);
        const data = await response.json();

        expect(data.data.lastUpdated).toBeDefined();
        // Verifica se o timestamp pode ser parseado como Date válida
        const date = new Date(data.data.lastUpdated);
        expect(date.getTime()).not.toBeNaN();
    });
});

describe('GET /api/dashboard/summary - Cenários de erro', () => {
    it('retorna erro estruturado quando aggregateHealthMetrics falha', async () => {
        // Mock para simular erro
        const { aggregateHealthMetrics } = await import('@/lib/health-metrics');
        vi.mocked(aggregateHealthMetrics).mockRejectedValueOnce(new Error('Database unavailable'));

        const request = new Request('http://localhost:3000/api/dashboard/summary');
        const response = await GET(request);
        const data = await response.json();

        // Verifica que retorna status de erro (4xx ou 5xx)
        expect(response.status).toBeGreaterThanOrEqual(400);
        expect(data.success).toBe(false);
        expect(data.error).toBeDefined();
        expect(data.error.code).toBeDefined();
        expect(data.error.message).toBeDefined();
        expect(data.timestamp).toBeDefined();
    });
});
