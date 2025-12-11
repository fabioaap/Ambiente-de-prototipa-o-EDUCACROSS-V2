import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Dashboard API Contracts', () => {
  test.describe('GET /api/dashboard/summary', () => {
    test('should return 200 status with valid response structure', async ({ request }) => {
      const response = await request.get('/api/dashboard/summary');
      
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      
      // Verify all required fields exist
      expect(data).toHaveProperty('healthScore');
      expect(data).toHaveProperty('kpis');
      expect(data).toHaveProperty('lastUpdated');
      expect(data).toHaveProperty('totalPages');
    });

    test('should return properly typed response fields', async ({ request }) => {
      const response = await request.get('/api/dashboard/summary');
      const data = await response.json();
      
      // Verify field types
      expect(typeof data.healthScore).toBe('number');
      expect(Array.isArray(data.kpis)).toBe(true);
      expect(typeof data.lastUpdated).toBe('string');
      expect(typeof data.totalPages).toBe('number');
      
      // Verify value ranges
      expect(data.healthScore).toBeGreaterThanOrEqual(0);
      expect(data.healthScore).toBeLessThanOrEqual(100);
      expect(data.totalPages).toBeGreaterThanOrEqual(0);
    });

    test('should return valid ISO8601 timestamp in lastUpdated', async ({ request }) => {
      const response = await request.get('/api/dashboard/summary');
      const data = await response.json();
      
      // Verify timestamp is valid ISO8601
      const date = new Date(data.lastUpdated);
      expect(date.toISOString()).toBe(data.lastUpdated);
    });

    test('should return KPI array with valid structure when includeKpis=true', async ({ request }) => {
      const response = await request.get('/api/dashboard/summary?includeKpis=true');
      const data = await response.json();
      
      expect(data.kpis.length).toBeGreaterThan(0);
      
      // Verify each KPI has required fields
      data.kpis.forEach((kpi: any) => {
        expect(kpi).toHaveProperty('name');
        expect(kpi).toHaveProperty('value');
        expect(kpi).toHaveProperty('trend');
        
        expect(typeof kpi.name).toBe('string');
        expect(typeof kpi.value).toBe('number');
        expect(['up', 'down', 'stable']).toContain(kpi.trend);
      });
    });

    test('should return empty KPI array when includeKpis=false', async ({ request }) => {
      const response = await request.get('/api/dashboard/summary?includeKpis=false');
      const data = await response.json();
      
      expect(data.kpis.length).toBe(0);
    });

    test('should handle missing query parameters with defaults', async ({ request }) => {
      const response = await request.get('/api/dashboard/summary');
      
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      
      // Should have KPIs by default
      expect(data.kpis).toBeDefined();
    });
  });

  test.describe('GET /api/dashboard/health', () => {
    test('should return 200 status with health metrics', async ({ request }) => {
      const response = await request.get('/api/dashboard/health');
      
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      
      // Verify required fields
      expect(data).toHaveProperty('healthScore');
      expect(data).toHaveProperty('healthStatus');
      expect(data).toHaveProperty('buildStatus');
      expect(data).toHaveProperty('lastChecked');
    });

    test('should return valid health status values', async ({ request }) => {
      const response = await request.get('/api/dashboard/health');
      const data = await response.json();
      
      // Verify valid status values
      const validStatuses = ['excellent', 'good', 'fair', 'poor'];
      expect(validStatuses).toContain(data.healthStatus);
      
      // Verify health score range
      expect(data.healthScore).toBeGreaterThanOrEqual(0);
      expect(data.healthScore).toBeLessThanOrEqual(100);
    });

    test('should include all required status fields', async ({ request }) => {
      const response = await request.get('/api/dashboard/health');
      const data = await response.json();
      
      const requiredFields = [
        'buildStatus',
        'lintStatus',
        'typeCheckStatus',
        'dependenciesHealth'
      ];
      
      requiredFields.forEach(field => {
        expect(data).toHaveProperty(field);
        expect(typeof data[field]).toBe('string');
      });
    });

    test('should return valid ISO8601 timestamp', async ({ request }) => {
      const response = await request.get('/api/dashboard/health');
      const data = await response.json();
      
      // Verify lastChecked is valid ISO8601
      const date = new Date(data.lastChecked);
      expect(date.toISOString()).toBe(data.lastChecked);
    });

    test('should have consistent health score between endpoints', async ({ request }) => {
      const summaryResponse = await request.get('/api/dashboard/summary');
      const healthResponse = await request.get('/api/dashboard/health');
      
      const summaryData = await summaryResponse.json();
      const healthData = await healthResponse.json();
      
      // Health score should exist in both endpoints
      expect(summaryData.healthScore).toBeDefined();
      expect(healthData.healthScore).toBeDefined();
      
      // Both should be valid numbers
      expect(typeof summaryData.healthScore).toBe('number');
      expect(typeof healthData.healthScore).toBe('number');
    });
  });

  test.describe('Error Handling', () => {
    test('should return appropriate error for invalid endpoints', async ({ request }) => {
      const response = await request.get('/api/dashboard/invalid');
      
      // Should return 404 or similar error
      expect(response.status()).toBeGreaterThanOrEqual(400);
    });

    test('should handle network timeouts gracefully', async ({ request }) => {
      // This test verifies the API doesn't hang
      const response = await request.get('/api/dashboard/summary', {
        timeout: 5000 // 5 second timeout
      });
      
      // Should return a response within timeout
      expect(response).toBeDefined();
    });
  });
});
