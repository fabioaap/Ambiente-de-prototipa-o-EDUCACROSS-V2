/**
 * Dashboard API Utilities
 * Utilitários compartilhados para logging e tratamento de erros
 */

import { ERROR_CODES, ErrorCode, DashboardErrorResponse } from './types/dashboard';

/**
 * Gera um ID de correlação único
 */
export function generateCorrelationId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `dash-${timestamp}-${random}`;
}

/**
 * Logger estruturado para a Dashboard API
 */
export const dashboardLogger = {
    info: (message: string, context?: Record<string, unknown>) => {
        console.log(JSON.stringify({
            level: 'info',
            service: 'dashboard-api',
            message,
            timestamp: new Date().toISOString(),
            ...context,
        }));
    },
    warn: (message: string, context?: Record<string, unknown>) => {
        console.warn(JSON.stringify({
            level: 'warn',
            service: 'dashboard-api',
            message,
            timestamp: new Date().toISOString(),
            ...context,
        }));
    },
    error: (message: string, error?: Error | unknown, context?: Record<string, unknown>) => {
        console.error(JSON.stringify({
            level: 'error',
            service: 'dashboard-api',
            message,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? {
                name: error.name,
                message: error.message,
                stack: error.stack,
            } : error,
            ...context,
        }));
    },
};

/**
 * Cria um payload de erro estruturado
 */
export function createErrorResponse(
    code: ErrorCode,
    message: string,
    correlationId?: string
): DashboardErrorResponse {
    return {
        success: false,
        error: {
            code,
            message,
            ...(correlationId && { correlationId }),
        },
        timestamp: new Date().toISOString(),
    };
}

/**
 * Trata erros de forma padronizada e loga
 */
export function handleDashboardError(
    error: unknown,
    context: string,
    correlationId?: string
): { response: DashboardErrorResponse; status: number } {
    const corrId = correlationId || generateCorrelationId();
    
    dashboardLogger.error(
        `[Dashboard API] Erro em ${context}`,
        error,
        { correlationId: corrId }
    );

    // Erro interno genérico por padrão
    let errorCode: ErrorCode = ERROR_CODES.INTERNAL_ERROR;
    let errorMessage = 'Ocorreu um erro interno ao processar a requisição';
    let status = 500;

    // Tratamento específico para tipos de erro conhecidos
    if (error instanceof Error) {
        if (error.message.includes('invalid')) {
            errorCode = ERROR_CODES.INVALID_REQUEST;
            errorMessage = error.message;
            status = 400;
        } else if (error.message.includes('unavailable')) {
            errorCode = ERROR_CODES.METRICS_UNAVAILABLE;
            errorMessage = 'Métricas temporariamente indisponíveis';
            status = 503;
        }
    }

    return {
        response: createErrorResponse(errorCode, errorMessage, corrId),
        status,
    };
}
