import { NextResponse } from 'next/server';
import { aggregateHealthMetrics, getHealthStatus } from '@/lib/health-metrics';

/**
 * GET /api/health
 * Retorna health metrics agregados do sistema
 *
 * Response:
 * {
 *   "success": true,
 *   "data": {
 *     "buildStatus": "success",
 *     "lintStatus": "success",
 *     "typeCheckStatus": "success",
 *     "dependenciesHealth": "healthy",
 *     "healthScore": 100,
 *     "healthStatus": "excellent",
 *     "lastChecked": "2025-11-24T10:30:00Z"
 *   },
 *   "timestamp": "2025-11-24T10:30:00Z"
 * }
 */
export async function GET() {
    try {
        const metrics = await aggregateHealthMetrics();
        const healthStatus = getHealthStatus(metrics.healthScore);

        return NextResponse.json(
            {
                success: true,
                data: {
                    ...metrics,
                    healthStatus,
                },
                timestamp: new Date().toISOString(),
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('[API] Health check failed:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to aggregate health metrics',
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
}
