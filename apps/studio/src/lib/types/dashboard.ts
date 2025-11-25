/**
 * Dashboard API Types
 * Tipos compartilhados para os endpoints /api/dashboard/*
 */

/**
 * Status possíveis de build, lint e type-check
 */
export type StatusType = 'success' | 'failure' | 'warning';

/**
 * Status de saúde do sistema
 */
export type HealthStatusType = 'excellent' | 'good' | 'warning' | 'critical';

/**
 * Direção de tendência dos KPIs
 */
export type TrendDirection = 'up' | 'down' | 'stable';

/**
 * KPI individual para o dashboard
 */
export interface DashboardKPI {
    /** Nome do KPI */
    name: string;
    /** Valor atual do KPI */
    value: number;
    /** Unidade de medida (ex: '%', 'pages', 'ms') */
    unit: string;
    /** Direção da tendência */
    trend: TrendDirection;
    /** Percentual de variação (positivo ou negativo) */
    changePercent: number;
}

/**
 * Estatísticas agregadas do dashboard
 */
export interface DashboardStats {
    /** Total de páginas mapeadas */
    totalPages: number;
    /** Quantidade de domínios que possuem páginas */
    totalDomains: number;
    /** Lista de domínios com atividade */
    activeDomains: string[];
    /** Timestamp da última atualização */
    lastUpdated: string;
}

/**
 * Distribuição de páginas por domínio
 */
export interface DashboardDomainSummary {
    count: number;
    color: string;
}

/**
 * Dados das páginas recentes exibidas no dashboard
 */
export interface DashboardRecentPage {
    id: string;
    slug: string;
    name: string;
    domain: 'BackOffice' | 'FrontOffice' | 'Game' | 'Other';
    status: 'draft' | 'published';
    editUrl: string;
    viewUrl: string;
    createdAt: string;
    updatedAt: string;
    description?: string;
}

/**
 * Payload de resposta do endpoint /api/dashboard/summary
 */
export interface DashboardSummaryResponse {
    success: boolean;
    data: {
        /** Status geral do sistema */
        status: HealthStatusType;
        /** Array de KPIs principais */
        kpis: DashboardKPI[];
        /** Score de saúde (0-100) */
        healthScore: number;
        /** Timestamp da última verificação */
        lastUpdated: string;
        /** Estatísticas agregadas */
        stats: DashboardStats;
        /** Distribuição por domínios */
        domains: Record<string, DashboardDomainSummary>;
        /** Métricas detalhadas de saúde */
        health: HealthMetricsDetail;
        /** Últimas páginas editadas */
        recentPages: DashboardRecentPage[];
    };
    /** Timestamp da resposta */
    timestamp: string;
}

/**
 * Métricas detalhadas de saúde
 */
export interface HealthMetricsDetail {
    /** Status do build */
    buildStatus: StatusType;
    /** Status do lint */
    lintStatus: StatusType;
    /** Status do type-check */
    typeCheckStatus: 'success' | 'failure';
    /** Saúde das dependências */
    dependenciesHealth: 'healthy' | 'outdated' | 'vulnerable';
    /** Score de saúde (0-100) */
    healthScore: number;
    /** Status interpretado */
    healthStatus: HealthStatusType;
    /** Timestamp da última verificação */
    lastChecked: string;
}

/**
 * Payload de resposta do endpoint /api/dashboard/health
 */
export interface DashboardHealthResponse {
    success: boolean;
    data: HealthMetricsDetail;
    /** Timestamp da resposta */
    timestamp: string;
}

/**
 * Payload de erro estruturado
 */
export interface DashboardErrorResponse {
    success: false;
    error: {
        /** Código do erro */
        code: string;
        /** Mensagem legível */
        message: string;
        /** ID de correlação para rastreamento */
        correlationId?: string;
    };
    /** Timestamp da resposta */
    timestamp: string;
}

/**
 * Tipo união para respostas da API
 */
export type DashboardApiResponse<T> = T | DashboardErrorResponse;

/**
 * Parâmetros de query aceitos pelo endpoint /api/dashboard/summary
 */
export interface DashboardSummaryQuery {
    /** Incluir KPIs detalhados (default: true) */
    includeKpis?: boolean;
}

/**
 * Códigos de erro conhecidos
 */
export const ERROR_CODES = {
    INTERNAL_ERROR: 'DASHBOARD_INTERNAL_ERROR',
    INVALID_REQUEST: 'DASHBOARD_INVALID_REQUEST',
    METRICS_UNAVAILABLE: 'DASHBOARD_METRICS_UNAVAILABLE',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
