import useSWR from 'swr';

/**
 * Tipos para a resposta da API de summary
 */
export interface DashboardPage {
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

export interface HealthMetrics {
  buildStatus: 'success' | 'failure' | 'warning';
  lintStatus: 'success' | 'failure' | 'warning';
  typeCheckStatus: 'success' | 'failure';
  dependenciesHealth: 'healthy' | 'outdated' | 'vulnerable';
  healthScore: number;
  healthStatus: 'excellent' | 'good' | 'warning' | 'critical';
  lastChecked: string;
}

export interface DashboardStats {
  totalPages: number;
  totalDomains: number;
  activeDomains: string[];
  lastUpdated: string;
}

export interface DomainInfo {
  count: number;
  color: string;
}

export interface DashboardSummaryData {
  stats: DashboardStats;
  domains: Record<string, DomainInfo>;
  health: HealthMetrics;
  recentPages: DashboardPage[];
}

export interface DashboardSummaryResponse {
  success: boolean;
  data: DashboardSummaryData;
  timestamp: string;
}

/**
 * Fetcher para SWR
 */
async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    const error = new Error('Erro ao carregar dados do dashboard');
    throw error;
  }
  
  return response.json();
}

/**
 * Hook para buscar dados do dashboard summary
 * Expõe estados de loading, sucesso e erro
 */
export function useDashboardSummary() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<DashboardSummaryResponse>(
    '/api/dashboard/summary',
    fetcher,
    {
      // Revalidar a cada 30 segundos
      refreshInterval: 30000,
      // Não revalidar quando a janela voltar a focar (evitar muitas requisições)
      revalidateOnFocus: false,
      // Manter dados anteriores enquanto revalida
      keepPreviousData: true,
    }
  );

  return {
    data: data?.data,
    isLoading,
    isValidating,
    isError: !!error,
    error,
    refresh: mutate,
  };
}
