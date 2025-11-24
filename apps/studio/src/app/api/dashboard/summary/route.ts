import { NextResponse } from 'next/server';
import {
    DashboardSummaryResponse,
    DashboardKPI,
    HealthStatusType,
} from '@/lib/types/dashboard';
import {
    dashboardLogger,
    generateCorrelationId,
    handleDashboardError,
} from '@/lib/dashboard-utils';
import { aggregateHealthMetrics, getHealthStatus } from '@/lib/health-metrics';

/**
 * Gera KPIs mockados para o dashboard
 * Em produção: consultar métricas reais do sistema
 */
async function generateMockedKPIs(): Promise<DashboardKPI[]> {
    return [
        {
            name: 'Páginas Criadas',
            value: 12,
            unit: 'pages',
            trend: 'up',
            changePercent: 8.5,
        },
        {
            name: 'Componentes Ativos',
            value: 24,
            unit: 'components',
            trend: 'stable',
            changePercent: 0,
        },
        {
            name: 'Cobertura de Testes',
            value: 78,
            unit: '%',
            trend: 'up',
            changePercent: 5.2,
        },
        {
            name: 'Tempo de Build',
            value: 45,
            unit: 's',
            trend: 'down',
            changePercent: -12.3,
        },
    ];
}

/**
 * GET /api/dashboard/summary
 * 
 * Retorna resumo do dashboard com status geral e KPIs do sprint
 * 
 * Response Schema:
 * {
 *   "success": true,
 *   "data": {
 *     "status": "excellent" | "good" | "warning" | "critical",
 *     "kpis": [
 *       {
 *         "name": "string",
 *         "value": number,
 *         "unit": "string",
 *         "trend": "up" | "down" | "stable",
 *         "changePercent": number
 *       }
 *     ],
 *     "healthScore": number,
 *     "lastUpdated": "ISO8601 string"
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
    
    dashboardLogger.info('Requisição recebida em /api/dashboard/summary', {
        correlationId,
        method: 'GET',
        url: request.url,
    });

    try {
        // Validar query params (para expansão futura)
        const url = new URL(request.url);
        const includeKpis = url.searchParams.get('includeKpis') !== 'false';

        // Buscar métricas de saúde
        const healthMetrics = await aggregateHealthMetrics();
        const healthStatus: HealthStatusType = getHealthStatus(healthMetrics.healthScore);

        // Gerar KPIs (mockados para MVP)
        const kpis = includeKpis ? await generateMockedKPIs() : [];

        const response: DashboardSummaryResponse = {
            success: true,
            data: {
                status: healthStatus,
                kpis,
                healthScore: healthMetrics.healthScore,
                lastUpdated: healthMetrics.lastChecked,
            },
            timestamp: new Date().toISOString(),
        };

        dashboardLogger.info('Resposta enviada para /api/dashboard/summary', {
            correlationId,
            healthScore: healthMetrics.healthScore,
            kpiCount: kpis.length,
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        const { response, status } = handleDashboardError(
            error,
            '/api/dashboard/summary',
            correlationId
        );
        return NextResponse.json(response, { status });
    }
}
