import { NextResponse } from 'next/server';
import { DashboardHealthResponse } from '@/lib/types/dashboard';
import {
    dashboardLogger,
    generateCorrelationId,
    handleDashboardError,
} from '@/lib/dashboard-utils';
import { aggregateHealthMetrics, getHealthStatus } from '@/lib/health-metrics';

/**
 * GET /api/dashboard/health
 * 
 * Retorna métricas detalhadas de saúde do sistema
 * 
 * Response Schema:
 * {
 *   "success": true,
 *   "data": {
 *     "buildStatus": "success" | "failure" | "warning",
 *     "lintStatus": "success" | "failure" | "warning",
 *     "typeCheckStatus": "success" | "failure",
 *     "dependenciesHealth": "healthy" | "outdated" | "vulnerable",
 *     "healthScore": number,
 *     "healthStatus": "excellent" | "good" | "warning" | "critical",
 *     "lastChecked": "ISO8601 string"
 *   },
 *   "timestamp": "ISO8601 string"
 * }
 * 
 * Error Response (4xx/5xx):
 * {
 *   "success": false,
 *   "error": {
 *     "code": "DASHBOARD_*",
 *     "message": "string",
 *     "correlationId": "string"
 *   },
 *   "timestamp": "ISO8601 string"
 * }
 */
export async function GET(request: Request) {
    const correlationId = generateCorrelationId();
    
    dashboardLogger.info('Requisição recebida em /api/dashboard/health', {
        correlationId,
        method: 'GET',
        url: request.url,
    });

    try {
        // Buscar métricas de saúde
        const metrics = await aggregateHealthMetrics();
        const healthStatus = getHealthStatus(metrics.healthScore);

        const response: DashboardHealthResponse = {
            success: true,
            data: {
                buildStatus: metrics.buildStatus,
                lintStatus: metrics.lintStatus,
                typeCheckStatus: metrics.typeCheckStatus,
                dependenciesHealth: metrics.dependenciesHealth,
                healthScore: metrics.healthScore,
                healthStatus,
                lastChecked: metrics.lastChecked,
            },
            timestamp: new Date().toISOString(),
        };

        dashboardLogger.info('Resposta enviada para /api/dashboard/health', {
            correlationId,
            healthScore: metrics.healthScore,
            healthStatus,
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        const { response, status } = handleDashboardError(
            error,
            '/api/dashboard/health',
            correlationId
        );
        return NextResponse.json(response, { status });
    }
}
