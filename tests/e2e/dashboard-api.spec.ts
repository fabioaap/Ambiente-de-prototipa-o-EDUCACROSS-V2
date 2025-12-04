import { test, expect } from '@playwright/test';

test.describe('Dashboard API', () => {
  test.describe('GET /api/dashboard/summary', () => {
    test('should return valid JSON with KPI structure', async ({ request }) => {
      const response = await request.get('/api/dashboard/summary');
      
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      
      // Verify response structure
      expect(data).toHaveProperty('healthScore');
      expect(data).toHaveProperty('kpis');
      expect(data).toHaveProperty('lastUpdated');
      expect(data).toHaveProperty('totalPages');
      
      // Verify types
      expect(typeof data.healthScore).toBe('number');
      expect(Array.isArray(data.kpis)).toBe(true);
      expect(typeof data.lastUpdated).toBe('string');
      expect(typeof data.totalPages).toBe('number');
      
      // Verify ranges
      expect(data.healthScore).toBeGreaterThanOrEqual(0);
      expect(data.healthScore).toBeLessThanOrEqual(100);
      expect(data.totalPages).toBeGreaterThanOrEqual(0);
      
      // Verify timestamp format (ISO8601)
      expect(new Date(data.lastUpdated).toISOString()).toBe(data.lastUpdated);
    });

    test('should include KPI metrics with name, value, trend', async ({ request }) => {
      const response = await request.get('/api/dashboard/summary');
      const data = await response.json();
      
      expect(data.kpis.length).toBeGreaterThan(0);
      
      data.kpis.forEach((kpi: any) => {
        expect(kpi).toHaveProperty('name');
        expect(kpi).toHaveProperty('value');
        expect(kpi).toHaveProperty('trend');
        
        expect(typeof kpi.name).toBe('string');
        expect(typeof kpi.value).toBe('number');
        expect(['up', 'down', 'stable']).toContain(kpi.trend);
      });
    });

    test('should support includeKpis query parameter', async ({ request }) => {
      const responseWithKpis = await request.get('/api/dashboard/summary?includeKpis=true');
      const dataWithKpis = await responseWithKpis.json();
      
      const responseWithoutKpis = await request.get('/api/dashboard/summary?includeKpis=false');
      const dataWithoutKpis = await responseWithoutKpis.json();
      
      expect(dataWithKpis.kpis.length).toBeGreaterThan(0);
      expect(dataWithoutKpis.kpis.length).toBe(0);
    });

    test('should return error response with statusCode and message', async ({ request }) => {
      // This test will catch errors from the API
      const response = await request.get('/api/dashboard/summary');
      
      if (response.status() !== 200) {
        const data = await response.json();
        expect(data).toHaveProperty('statusCode');
        expect(data).toHaveProperty('message');
        expect(typeof data.statusCode).toBe('number');
        expect(typeof data.message).toBe('string');
      }
    });
  });

  test.describe('GET /api/dashboard/health', () => {
    test('should return health metrics', async ({ request }) => {
      const response = await request.get('/api/dashboard/health');
      
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      
      expect(data).toHaveProperty('healthScore');
      expect(data).toHaveProperty('healthStatus');
      expect(data).toHaveProperty('buildStatus');
      expect(data).toHaveProperty('lastChecked');
      
      expect(['excellent', 'good', 'fair', 'poor']).toContain(data.healthStatus);
      expect(data.healthScore).toBeGreaterThanOrEqual(0);
      expect(data.healthScore).toBeLessThanOrEqual(100);
    });

    test('should include all required status fields', async ({ request }) => {
      const response = await request.get('/api/dashboard/health');
      const data = await response.json();
      
      const requiredFields = ['buildStatus', 'lintStatus', 'typeCheckStatus', 'dependenciesHealth'];
      requiredFields.forEach(field => {
        expect(data).toHaveProperty(field);
      });
    });
  });
});
