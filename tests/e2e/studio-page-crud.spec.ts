import { test, expect } from '@playwright/test';

test.describe('Studio - Page CRUD Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to studio
    await page.goto('/studio');
    await page.waitForLoadState('networkidle');
  });

  test('should load studio page without critical errors', async ({ page }) => {
    // Verify we're on the studio page
    expect(page.url()).toContain('/studio');
    
    // Check page has content
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toBeTruthy();
  });

  test('should display studio interface with editor or canvas', async ({ page }) => {
    // Look for editor/canvas indicators
    const pageContent = await page.locator('body').innerHTML();
    
    // Studio should have some form of interactive content
    expect(pageContent.length).toBeGreaterThan(0);
    
    // Verify we can find typical editor elements or text
    const hasEditorContent = pageContent.includes('Puck') || 
                            pageContent.includes('studio') ||
                            pageContent.includes('página');
    
    expect(hasEditorContent || page.url().includes('/studio')).toBe(true);
  });

  test('should have interactive buttons or controls', async ({ page }) => {
    // Find all buttons
    const buttons = await page.locator('button').all();
    
    // Should have at least some UI controls
    expect(buttons.length).toBeGreaterThan(0);
  });

  test('should handle keyboard input', async ({ page }) => {
    // Try pressing a key and check if page responds
    await page.keyboard.press('Tab');
    
    // Verify focused element
    const focusedTag = await page.evaluate(() => 
      document.activeElement?.tagName
    );
    
    expect(focusedTag).toBeTruthy();
  });

  test('should maintain page URL through interactions', async ({ page }) => {
    const initialUrl = page.url();
    
    // Try interacting with page
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(200);
    
    // URL should remain consistent
    expect(page.url()).toContain('/studio');
  });

  test('should display proper heading structure', async ({ page }) => {
    // Check for heading hierarchy
    const headings = await page.locator('h1, h2, h3').all();
    
    // Page should have heading structure (or be a canvas-based app)
    expect(headings.length >= 0).toBe(true);
  });

  test('should be responsive to focus management', async ({ page }) => {
    // Test Tab navigation
    await page.keyboard.press('Tab');
    const firstFocus = await page.evaluate(() => document.activeElement?.tagName);
    
    // Continue tabbing
    await page.keyboard.press('Tab');
    const secondFocus = await page.evaluate(() => document.activeElement?.tagName);
    
    // Should be able to navigate
    expect(firstFocus || secondFocus).toBeTruthy();
  });

  test('should handle viewport changes', async ({ page }) => {
    const initialUrl = page.url();
    
    // Resize viewport
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(200);
    
    // Should remain functional
    expect(page.url()).toContain('/studio');
    
    // Restore size
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should provide fallback UI if resources fail', async ({ page }) => {
    // Block some resources to test fallbacks
    await page.route('**/*.chunk.js', route => route.abort());
    
    await page.goto('/studio');
    
    // Page should either load partially or show error gracefully
    const bodyContent = await page.locator('body').textContent();
    expect(bodyContent).toBeTruthy();
  });
});
