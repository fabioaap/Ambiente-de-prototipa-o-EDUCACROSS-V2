import useSWR from 'swr';
import type { DashboardSummaryResponse } from '@/lib/types/dashboard';

const fetcher = async <T,>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('API request failed');
    // @ts-expect-error - adding info property
    error.info = await res.json();
    // @ts-expect-error - adding status property
    error.status = res.status;
    throw error;
  }
  const json = await res.json();
  return json.data || json;
};

export function useDashboardData() {
  return useSWR<DashboardSummaryResponse>('/api/dashboard/summary', fetcher, {
    refreshInterval: 30000, // Refresh every 30s
    revalidateOnFocus: true,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
    shouldRetryOnError: true,
  });
}
