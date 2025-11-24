/**
 * Health Metrics Aggregator
 * Coleta e calcula indicadores de saúde do sistema
 * - Build status
 * - Lint status
 * - Type check status
 * - Dependencies health
 */

export interface HealthMetrics {
  buildStatus: 'success' | 'failure' | 'warning';
  lintStatus: 'success' | 'failure' | 'warning';
  typeCheckStatus: 'success' | 'failure';
  dependenciesHealth: 'healthy' | 'outdated' | 'vulnerable';
  lastChecked: string;
  healthScore: number; // 0-100
}

export interface HealthResponse {
  success: boolean;
  data: HealthMetrics;
  timestamp: string;
}

/**
 * Calcula score de saúde (0-100)
 * Build (35%) + Lint (25%) + TypeCheck (25%) + Dependencies (15%)
 */
function calculateHealthScore(metrics: Omit<HealthMetrics, 'healthScore' | 'lastChecked'>): number {
  const buildScore = metrics.buildStatus === 'success' ? 35 : metrics.buildStatus === 'warning' ? 17 : 0;
  const lintScore = metrics.lintStatus === 'success' ? 25 : metrics.lintStatus === 'warning' ? 12 : 0;
  const typeScore = metrics.typeCheckStatus === 'success' ? 25 : 0;
  const depsScore = metrics.dependenciesHealth === 'healthy' ? 15 : metrics.dependenciesHealth === 'outdated' ? 7 : 0;
  
  return Math.round(buildScore + lintScore + typeScore + depsScore);
}

/**
 * Obtém status de build simulado
 * Em produção: consultar CI/CD logs, GitHub Actions, etc.
 */
async function getBuildStatus(): Promise<'success' | 'failure' | 'warning'> {
  // Simular verificação de build
  // Em produção: GET /api/github/workflows/latest-run
  return 'success'; // Mock para MVP
}

/**
 * Obtém status de lint simulado
 * Em produção: consultar ESLint results, GitHub Actions logs
 */
async function getLintStatus(): Promise<'success' | 'failure' | 'warning'> {
  // Simular verificação de lint
  // Em produção: GET /api/github/workflows/lint-run
  return 'success'; // 1 warning aceito = 'success'
}

/**
 * Obtém status de type-check simulado
 * Em produção: consultar TypeScript strict mode results
 */
async function getTypeCheckStatus(): Promise<'success' | 'failure'> {
  // Simular verificação de type-check
  // Em produção: GET /api/github/workflows/type-check-run
  return 'success';
}

/**
 * Obtém status de dependências simulado
 * Em produção: consultar npm audit, Snyk, GitHub Dependabot
 */
async function getDependenciesHealth(): Promise<'healthy' | 'outdated' | 'vulnerable'> {
  // Simular verificação de dependências
  // Em produção: GET /api/github/dependabot/alerts
  return 'healthy'; // Mock para MVP
}

/**
 * Agregador principal — coleta todos os métricas
 */
export async function aggregateHealthMetrics(): Promise<HealthMetrics> {
  const [buildStatus, lintStatus, typeCheckStatus, dependenciesHealth] = await Promise.all([
    getBuildStatus(),
    getLintStatus(),
    getTypeCheckStatus(),
    getDependenciesHealth(),
  ]);

  const baseMetrics = {
    buildStatus,
    lintStatus,
    typeCheckStatus,
    dependenciesHealth,
  };

  const healthScore = calculateHealthScore(baseMetrics);

  return {
    ...baseMetrics,
    healthScore,
    lastChecked: new Date().toISOString(),
  };
}

/**
 * Interpreta score em linguagem natural
 */
export function getHealthStatus(score: number): 'excellent' | 'good' | 'warning' | 'critical' {
  if (score >= 90) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 50) return 'warning';
  return 'critical';
}
