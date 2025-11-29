/**
 * Testes para Dashboard API - /api/dashboard/health
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '@/app/api/dashboard/health/route';

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

describe('GET /api/dashboard/health', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('retorna resposta de sucesso com métricas de saúde', async () => {
        const request = new Request('http://localhost:3000/api/dashboard/health');
        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toBeDefined();
        expect(data.timestamp).toBeDefined();
    });

    it('inclui todas as métricas de saúde esperadas', async () => {
        const request = new Request('http://localhost:3000/api/dashboard/health');
        const response = await GET(request);
        const data = await response.json();

        expect(data.data).toHaveProperty('buildStatus');
        expect(data.data).toHaveProperty('lintStatus');
        expect(data.data).toHaveProperty('typeCheckStatus');
        expect(data.data).toHaveProperty('dependenciesHealth');
        expect(data.data).toHaveProperty('healthScore');
        expect(data.data).toHaveProperty('healthStatus');
        expect(data.data).toHaveProperty('lastChecked');
    });

    it('buildStatus tem valores válidos', async () => {
        const request = new Request('http://localhost:3000/api/dashboard/health');
        const response = await GET(request);
        const data = await response.json();

        expect(['success', 'failure', 'warning']).toContain(data.data.buildStatus);
    });

    it('lintStatus tem valores válidos', async () => {
        const request = new Request('http://localhost:3000/api/dashboard/health');
        const response = await GET(request);
        const data = await response.json();

        expect(['success', 'failure', 'warning']).toContain(data.data.lintStatus);
    });

    it('typeCheckStatus tem valores válidos', async () => {
        const request = new Request('http://localhost:3000/api/dashboard/health');
        const response = await GET(request);
        const data = await response.json();

        expect(['success', 'failure']).toContain(data.data.typeCheckStatus);
    });

    it('dependenciesHealth tem valores válidos', async () => {
        const request = new Request('http://localhost:3000/api/dashboard/health');
        const response = await GET(request);
        const data = await response.json();

        expect(['healthy', 'outdated', 'vulnerable']).toContain(data.data.dependenciesHealth);
    });

    it('healthStatus tem valores válidos', async () => {
        const request = new Request('http://localhost:3000/api/dashboard/health');
        const response = await GET(request);
        const data = await response.json();

        expect(['excellent', 'good', 'warning', 'critical']).toContain(data.data.healthStatus);
    });

    it('healthScore está entre 0 e 100', async () => {
        const request = new Request('http://localhost:3000/api/dashboard/health');
        const response = await GET(request);
        const data = await response.json();

        expect(data.data.healthScore).toBeGreaterThanOrEqual(0);
        expect(data.data.healthScore).toBeLessThanOrEqual(100);
    });

    it('lastChecked é um timestamp ISO8601 válido', async () => {
        const request = new Request('http://localhost:3000/api/dashboard/health');
        const response = await GET(request);
        const data = await response.json();

        expect(data.data.lastChecked).toBeDefined();
        // Verifica se o timestamp pode ser parseado como Date válida
        const date = new Date(data.data.lastChecked);
        expect(date.getTime()).not.toBeNaN();
    });
});

describe('GET /api/dashboard/health - Cenários de erro', () => {
    it('retorna erro estruturado quando aggregateHealthMetrics falha', async () => {
        // Mock para simular erro
        const { aggregateHealthMetrics } = await import('@/lib/health-metrics');
        vi.mocked(aggregateHealthMetrics).mockRejectedValueOnce(new Error('Service unavailable'));

        const request = new Request('http://localhost:3000/api/dashboard/health');
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

    it('erro inclui correlationId para rastreamento', async () => {
        // Mock para simular erro
        const { aggregateHealthMetrics } = await import('@/lib/health-metrics');
        vi.mocked(aggregateHealthMetrics).mockRejectedValueOnce(new Error('Connection timeout'));

        const request = new Request('http://localhost:3000/api/dashboard/health');
        const response = await GET(request);
        const data = await response.json();

        expect(data.error.correlationId).toBeDefined();
        expect(data.error.correlationId).toMatch(/^dash-/);
    });
});
