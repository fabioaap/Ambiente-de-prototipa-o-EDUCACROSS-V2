/**
 * Testes para utilitários da Dashboard API
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    generateCorrelationId,
    createErrorResponse,
    handleDashboardError,
} from '@/lib/dashboard-utils';
import { ERROR_CODES } from '@/lib/types/dashboard';

describe('generateCorrelationId', () => {
    it('gera ID com prefixo dash-', () => {
        const id = generateCorrelationId();
        expect(id).toMatch(/^dash-/);
    });

    it('gera IDs únicos', () => {
        const ids = new Set();
        for (let i = 0; i < 100; i++) {
            ids.add(generateCorrelationId());
        }
        expect(ids.size).toBe(100);
    });
});

describe('createErrorResponse', () => {
    it('cria resposta de erro com código e mensagem', () => {
        const response = createErrorResponse(
            ERROR_CODES.INTERNAL_ERROR,
            'Erro interno'
        );

        expect(response.success).toBe(false);
        expect(response.error.code).toBe(ERROR_CODES.INTERNAL_ERROR);
        expect(response.error.message).toBe('Erro interno');
        expect(response.timestamp).toBeDefined();
    });

    it('inclui correlationId quando fornecido', () => {
        const response = createErrorResponse(
            ERROR_CODES.INVALID_REQUEST,
            'Requisição inválida',
            'dash-test-123'
        );

        expect(response.error.correlationId).toBe('dash-test-123');
    });

    it('não inclui correlationId quando não fornecido', () => {
        const response = createErrorResponse(
            ERROR_CODES.METRICS_UNAVAILABLE,
            'Métricas indisponíveis'
        );

        expect(response.error.correlationId).toBeUndefined();
    });
});

describe('handleDashboardError', () => {
    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('retorna status 500 para erro genérico', () => {
        const { response, status } = handleDashboardError(
            new Error('Erro genérico'),
            '/api/test'
        );

        expect(status).toBe(500);
        expect(response.error.code).toBe(ERROR_CODES.INTERNAL_ERROR);
    });

    it('retorna status 400 para erro de requisição inválida', () => {
        const { response, status } = handleDashboardError(
            new Error('invalid request parameter'),
            '/api/test'
        );

        expect(status).toBe(400);
        expect(response.error.code).toBe(ERROR_CODES.INVALID_REQUEST);
    });

    it('retorna status 503 para erro de indisponibilidade', () => {
        const { response, status } = handleDashboardError(
            new Error('Service unavailable'),
            '/api/test'
        );

        expect(status).toBe(503);
        expect(response.error.code).toBe(ERROR_CODES.METRICS_UNAVAILABLE);
    });

    it('usa correlationId fornecido', () => {
        const { response } = handleDashboardError(
            new Error('Erro'),
            '/api/test',
            'dash-custom-id'
        );

        expect(response.error.correlationId).toBe('dash-custom-id');
    });

    it('gera correlationId quando não fornecido', () => {
        const { response } = handleDashboardError(
            new Error('Erro'),
            '/api/test'
        );

        expect(response.error.correlationId).toMatch(/^dash-/);
    });
});
