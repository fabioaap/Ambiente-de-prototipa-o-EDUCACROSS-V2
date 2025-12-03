import { test, expect } from '@playwright/test'

const STORYBOOK_BASE = process.env.STORYBOOK_URL || 'http://localhost:6007'

// Helper to parse metric text like: "Render inicial: 123.4ms (alvo < 500ms)"
function parseMs(text: string | null): number | null {
  if (!text) return null
  const match = text.match(/([0-9]+\.?[0-9]*)ms/)
  return match ? parseFloat(match[1]) : null
}

async function getMetric(page, selector: string) {
  const el = page.locator(selector)
  await expect(el).toBeVisible()
  const text = await el.textContent()
  return parseMs(text)
}

test.describe('Storybook Performance SLA', () => {
  test('DataTable Performance100Rows meets SLA', async ({ page }) => {
    await page.goto(`${STORYBOOK_BASE}/?path=/story/backoffice-performance-datatable--performance100rows`)

    // Wait a bit for auto sort to run
    await page.waitForTimeout(1000)

    const initialMs = await getMetric(page, '#sla-initial')
    const sortMs = await getMetric(page, '#sla-sort')

    console.log(`[Perf][DataTable] initialMs=${initialMs} sortMs=${sortMs}`)

    expect(initialMs !== null).toBeTruthy()
    expect(sortMs !== null).toBeTruthy()

    // SLA: initial < 500ms, interactions < 200ms
    expect(initialMs!).toBeLessThan(500)
    expect(sortMs!).toBeLessThan(200)
  })

  test('FilterGroup Performance100Rows meets SLA', async ({ page }) => {
    await page.goto(`${STORYBOOK_BASE}/?path=/story/backoffice-performance-filtergroup--filterperformance100rows`)

    // Wait for auto filter
    await page.waitForTimeout(1200)

    const initialMs = await getMetric(page, '#sla-initial')
    const filterMs = await getMetric(page, '#sla-filter')

    console.log(`[Perf][FilterGroup] initialMs=${initialMs} filterMs=${filterMs}`)

    expect(initialMs !== null).toBeTruthy()
    expect(filterMs !== null).toBeTruthy()

    // SLA: initial < 500ms, interactions < 200ms
    expect(initialMs!).toBeLessThan(500)
    expect(filterMs!).toBeLessThan(200)
  })
})
