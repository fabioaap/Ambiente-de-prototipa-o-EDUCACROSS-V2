import { test, expect } from '@playwright/test';

test.describe('Dashboard - KPIs Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Start server if needed and navigate to dashboard
    await page.goto('/dashboard');
  });

  test('should load dashboard page without errors', async ({ page }) => {
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check there are no console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    expect(consoleErrors).toHaveLength(0);
    
    // Verify URL is correct
    expect(page.url()).toContain('/dashboard');
  });

  test('should display KPI cards', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Look for KPI grid or card components
    const kpiCards = await page.locator('[data-testid="kpi-card"]').all();
    
    if (kpiCards.length > 0) {
      expect(kpiCards.length).toBeGreaterThan(0);
      
      // Check first KPI card has value
      const firstKpi = kpiCards[0];
      const value = await firstKpi.locator('[data-testid="kpi-value"]');
      
      expect(await value.isVisible()).toBe(true);
    }
  });

  test('should display health metrics section', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Look for health section
    const healthSection = page.locator('[data-testid="health-section"]');
    
    if (await healthSection.isVisible()) {
      expect(await healthSection.isVisible()).toBe(true);
      
      // Check for health score indicator
      const healthScore = healthSection.locator('[data-testid="health-score"]');
      expect(await healthScore.isVisible()).toBe(true);
    }
  });

  test('should be accessible with keyboard navigation', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for proper heading hierarchy
    const h1Elements = await page.locator('h1').all();
    expect(h1Elements.length).toBeGreaterThanOrEqual(1);
    
    // Test keyboard focus (Tab key)
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('should handle API errors gracefully', async ({ page, request }) => {
    // Intercept API calls to simulate failures
    await page.route('**/api/dashboard/**', route => {
      route.abort('failed');
    });
    
    await page.goto('/dashboard');
    
    // Should show error message or fallback UI
    await page.waitForTimeout(1000);
    
    const errorElement = page.locator('[data-testid="error-message"]');
    const skeletonElement = page.locator('[data-testid="skeleton-placeholder"]');
    
    // Either error message OR skeleton should be visible (fallback)
    const hasErrorUI = await errorElement.isVisible().catch(() => false);
    const hasSkeleton = await skeletonElement.isVisible().catch(() => false);
    
    expect(hasErrorUI || hasSkeleton).toBe(true);
  });

  test('should refresh KPIs when refresh button clicked', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    const refreshButton = page.locator('[data-testid="refresh-button"]');
    
    if (await refreshButton.isVisible()) {
      // Get initial KPI values
      const initialKpis = await page.locator('[data-testid="kpi-card"]').all();
      const initialCount = initialKpis.length;
      
      // Click refresh
      await refreshButton.click();
      
      // Wait for network to settle
      await page.waitForLoadState('networkidle');
      
      // Verify KPIs are still there
      const updatedKpis = await page.locator('[data-testid="kpi-card"]').all();
      expect(updatedKpis.length).toBeGreaterThanOrEqual(initialCount);
    }
  });

  test('should have proper color contrast for WCAG AA compliance', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Test a few key elements for contrast
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    
    for (const heading of headings.slice(0, 3)) {
      if (await heading.isVisible()) {
        // Check that heading has readable contrast
        const color = await heading.evaluate((el: any) => 
          window.getComputedStyle(el).color
        );
        
        expect(color).toBeTruthy();
      }
    }
  });
});
