'use client';

/**
 * CSV Export Component Hook
 * 
 * Provides csv_export event tracking for data export functionality
 * 
 * Usage:
 * const handleExport = useExportTracking();
 * 
 * // When exporting data
 * await handleExport('csv', csvData, 100);
 */

import { trackEvent } from '@/lib/analytics/init';

interface ExportTrackingParams {
  format: 'csv' | 'json' | 'xml';
  rowsCount: number;
  domain?: string;
  pageType?: string;
}

/**
 * Track data export event with analytics
 * 
 * @param format - Export format (csv, json, xml)
 * @param rowsCount - Number of rows exported
 * @param domain - Optional domain context
 * @param pageType - Optional page type context
 */
export function trackExport(params: ExportTrackingParams): void {
  const { format, rowsCount, domain, pageType } = params;

  trackEvent('csv_export', {
    format,
    rows_count: rowsCount,
    ...(domain && { domain }),
    ...(pageType && { page_type: pageType }),
    timestamp: new Date().toISOString(),
  });
}

/**
 * Hook for export functionality with automatic tracking
 * 
 * Usage:
 * const { trackAndExport } = useExportTracking();
 * await trackAndExport('csv', data, 100);
 */
export function useExportTracking() {
  return {
    trackAndExport: async (
      format: 'csv' | 'json' | 'xml',
      data: any,
      rowsCount: number,
      options?: { domain?: string; pageType?: string }
    ) => {
      try {
        // Track the export event
        trackExport({
          format,
          rowsCount,
          ...options,
        });

        // Return data for actual export implementation
        return {
          format,
          data,
          rowsCount,
          tracked: true,
        };
      } catch (error) {
        console.error('[Export] Failed to track export:', error);
        // Still allow export to proceed even if tracking fails
        return {
          format,
          data,
          rowsCount,
          tracked: false,
        };
      }
    },
  };
}
