import { NextResponse } from 'next/server';

/**
 * GET /api/health/metrics
 * Retorna métricas de saúde expandidas (uptime, latency, error rate)
 * 
 * Response:
 * {
 *   "success": true,
 *   "data": {
 *     "uptime": 99.87,
 *     "previousUptime": 99.82,
 *     "latency": 145,
 *     "previousLatency": 160,
 *     "errorRate": 0.42,
 *     "previousErrorRate": 0.55,
 *     "lastUpdated": "2025-11-24T10:30:00Z"
 *   },
 *   "timestamp": "2025-11-24T10:30:00Z"
 * }
 */
export async function GET() {
  try {
    // Simula métricas de saúde - em produção, consultar serviços de monitoramento
    // Como Prometheus, Datadog, New Relic, etc.
    const now = new Date().toISOString();
    
    // Valores simulados com pequena variação para demonstração
    // Em produção: consultar APIs reais de monitoramento
    const baseUptime = 99.5 + (Math.random() * 0.5); // 99.5% - 100%
    const baseLatency = 100 + (Math.random() * 150); // 100ms - 250ms
    const baseErrorRate = 0.1 + (Math.random() * 0.9); // 0.1% - 1%

    const metrics = {
      uptime: Number(baseUptime.toFixed(2)),
      previousUptime: Number((baseUptime - 0.05 + (Math.random() * 0.1)).toFixed(2)),
      latency: Math.round(baseLatency),
      previousLatency: Math.round(baseLatency + 10 + (Math.random() * 20)),
      errorRate: Number(baseErrorRate.toFixed(2)),
      previousErrorRate: Number((baseErrorRate + 0.1 + (Math.random() * 0.2)).toFixed(2)),
      lastUpdated: now,
    };

    return NextResponse.json(
      {
        success: true,
        data: metrics,
        timestamp: now,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] Health metrics failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Falha ao obter métricas de saúde',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
