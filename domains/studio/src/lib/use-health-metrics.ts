'use client';

import { useState, useEffect, useCallback } from 'react';
import type { HealthMetricData } from './metrics-formatter';
import {
  processUptimeMetric,
  processLatencyMetric,
  processErrorRateMetric,
} from './metrics-formatter';

/** Interface para dados brutos de métricas de saúde expandidas */
export interface RawHealthMetrics {
  uptime: number;
  previousUptime?: number;
  latency: number;
  previousLatency?: number;
  errorRate: number;
  previousErrorRate?: number;
  lastUpdated: string;
}

/** Interface para resposta da API de métricas */
export interface HealthMetricsResponse {
  success: boolean;
  data: RawHealthMetrics;
  timestamp: string;
}

/** Estado do hook de métricas */
export interface UseHealthMetricsState {
  metrics: HealthMetricData[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

/** Retorno do hook de métricas */
export interface UseHealthMetricsReturn extends UseHealthMetricsState {
  refetch: () => Promise<void>;
}

/**
 * Hook para buscar e processar métricas de saúde
 * @param autoRefresh - Se deve atualizar automaticamente
 * @param refreshInterval - Intervalo de atualização em ms (padrão: 30s)
 */
export function useHealthMetrics(
  autoRefresh = true,
  refreshInterval = 30000
): UseHealthMetricsReturn {
  const [state, setState] = useState<UseHealthMetricsState>({
    metrics: [],
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const fetchMetrics = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await fetch('/api/health/metrics');
      
      if (!response.ok) {
        throw new Error(`Falha ao buscar métricas: ${response.statusText}`);
      }
      
      const data: HealthMetricsResponse = await response.json();
      
      if (!data.success) {
        throw new Error('Resposta da API indica falha');
      }

      const rawMetrics = data.data;
      const processedMetrics: HealthMetricData[] = [
        processUptimeMetric(
          rawMetrics.uptime,
          rawMetrics.previousUptime,
          rawMetrics.lastUpdated
        ),
        processLatencyMetric(
          rawMetrics.latency,
          rawMetrics.previousLatency,
          rawMetrics.lastUpdated
        ),
        processErrorRateMetric(
          rawMetrics.errorRate,
          rawMetrics.previousErrorRate,
          rawMetrics.lastUpdated
        ),
      ];

      setState({
        metrics: processedMetrics,
        loading: false,
        error: null,
        lastUpdated: data.timestamp,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
    
    if (autoRefresh && refreshInterval > 0) {
      const interval = setInterval(fetchMetrics, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchMetrics, autoRefresh, refreshInterval]);

  return {
    ...state,
    refetch: fetchMetrics,
  };
}

/**
 * Hook com dados mockados para desenvolvimento/testes
 */
export function useHealthMetricsMock(): UseHealthMetricsReturn {
  const [state, setState] = useState<UseHealthMetricsState>({
    metrics: [],
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const generateMockMetrics = useCallback((): HealthMetricData[] => {
    const now = new Date().toISOString();
    
    // Gera valores com pequena variação para simular dados reais
    const uptimeBase = 99.5 + (Math.random() * 0.5);
    const latencyBase = 150 + (Math.random() * 100);
    const errorRateBase = 0.5 + (Math.random() * 1);

    return [
      processUptimeMetric(uptimeBase, uptimeBase - 0.1, now),
      processLatencyMetric(latencyBase, latencyBase + 20, now),
      processErrorRateMetric(errorRateBase, errorRateBase + 0.2, now),
    ];
  }, []);

  const refetch = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setState({
      metrics: generateMockMetrics(),
      loading: false,
      error: null,
      lastUpdated: new Date().toISOString(),
    });
  }, [generateMockMetrics]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    ...state,
    refetch,
  };
}

/**
 * Hook que simula erro para testes de fallback
 */
export function useHealthMetricsError(): UseHealthMetricsReturn {
  const [state, setState] = useState<UseHealthMetricsState>({
    metrics: [],
    loading: false,
    error: 'Falha na conexão com servidor de métricas',
    lastUpdated: null,
  });

  const refetch = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simula falha
    setState(prev => ({
      ...prev,
      loading: false,
      error: 'Falha na conexão com servidor de métricas',
    }));
  }, []);

  return {
    ...state,
    refetch,
  };
}
