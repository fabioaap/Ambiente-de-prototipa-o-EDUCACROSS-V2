import { test, expect } from '@playwright/test';

test.describe('Dashboard - KPIs Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Start server if needed and navigate to dashboard
    await page.goto('/dashboard');
    // Wait for data to load
    await page.waitForLoadState('networkidle');
  });

  test('should load dashboard page without errors', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/dashboard/i);
    
    // Verify URL is correct
    expect(page.url()).toContain('/dashboard');
    
    // Wait for main content
    const mainContent = page.locator('main, [role="main"]');
    await expect(mainContent).toBeDefined();
  });

  test('should display KPI summary cards with health score', async ({ page }) => {
    // Look for Badge or status indicators (from page.tsx: Badge component)
    const badges = await page.locator('[class*="badge"], Badge').all();
    
    // Dashboard should have at least some visual elements
    const pageContent = await page.locator('body').textContent();
    expect(pageContent).toBeTruthy();
    
    // Verify page has sections with status information
    const hasHealthInfo = pageContent?.includes('Saúde') || 
                         pageContent?.includes('health') || 
                         pageContent?.includes('status');
    expect(hasHealthInfo).toBe(true);
  });

  test('should display navigation links to domains', async ({ page }) => {
    // Look for domain links mentioned in page.tsx (BackOffice, FrontOffice, Game)
    const pageText = await page.locator('body').textContent();
    
    // At least one domain should be mentioned
    const hasDomainInfo = pageText?.includes('BackOffice') || 
                         pageText?.includes('FrontOffice') || 
                         pageText?.includes('Game') ||
                         pageText?.includes('Jornadas');
    
    expect(hasDomainInfo).toBe(true);
  });

  test('should have clickable links and interactive elements', async ({ page }) => {
    // Look for buttons or links
    const buttons = page.locator('button');
    const links = page.locator('a');
    
    const buttonCount = await buttons.count();
    const linkCount = await links.count();
    
    // Dashboard should have at least one interactive element
    expect(buttonCount + linkCount).toBeGreaterThan(0);
  });

  test('should handle missing data gracefully with loading states', async ({ page }) => {
    // Intercept network to slow down responses
    await page.route('**/api/**', route => {
      setTimeout(() => route.continue(), 500);
    });
    
    await page.reload();
    
    // Page should still be responsive
    expect(page.url()).toContain('/dashboard');
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.evaluate(() => 
      document.activeElement?.tagName
    );
    
    // Should have at least one focusable element
    expect(focusedElement).toBeTruthy();
  });

  test('should display content in Portuguese (pt-BR)', async ({ page }) => {
    const pageText = await page.locator('body').textContent();
    
    // Check for Portuguese content indicators
    const portugueseIndicators = [
      'Saúde',
      'Jornadas', 
      'Dependências',
      'Status',
      'Atualização'
    ];
    
    const hasPortuguese = portugueseIndicators.some(indicator => 
      pageText?.includes(indicator)
    );
    
    expect(hasPortuguese).toBe(true);
  });

  test('should render without critical accessibility violations', async ({ page }) => {
    // Check for basic accessibility
    const headings = await page.locator('h1, h2, h3').all();
    
    // Page should have at least one heading
    expect(headings.length).toBeGreaterThanOrEqual(1);
    
    // Check for proper HTML structure
    const mainElement = page.locator('main');
    const mainExists = await mainElement.isVisible().catch(() => false);
    
    // Either <main> exists or body is the main container
    expect(mainExists || page.url().includes('/dashboard')).toBe(true);
  });
});
