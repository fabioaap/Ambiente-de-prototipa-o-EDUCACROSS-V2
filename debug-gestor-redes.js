const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Capturar mensagens do console
    page.on('console', msg => {
        console.log(`[CONSOLE ${msg.type()}]`, msg.text());
    });

    // Capturar erros
    page.on('pageerror', err => {
        console.error('[PAGE ERROR]', err.message);
    });

    // Navegar para a página
    console.log('Navegando para http://localhost:3000/gestor-redes...');
    await page.goto('http://localhost:3000/gestor-redes', { waitUntil: 'networkidle' });

    // Aguardar 2 segundos
    await page.waitForTimeout(2000);

    // Capturar screenshot
    await page.screenshot({ path: 'gestor-redes-debug.png', fullPage: true });
    console.log('Screenshot salvo em: gestor-redes-debug.png');

    // Verificar elementos visíveis
    const header = await page.locator('header').count();
    const tabs = await page.locator('.tabs, [role="tablist"]').count();
    const kpisGrid = await page.locator('.kpisGrid, [class*="kpi"]').count();
    const table = await page.locator('table, [role="table"]').count();

    console.log('\n=== ELEMENTOS NA PÁGINA ===');
    console.log(`Headers: ${header}`);
    console.log(`Tabs: ${tabs}`);
    console.log(`KPIs Grid: ${kpisGrid}`);
    console.log(`Tables: ${table}`);

    // Verificar CSS carregado
    const styles = await page.evaluate(() => {
        const styleSheets = Array.from(document.styleSheets);
        return styleSheets.map(s => s.href || 'inline').slice(0, 5);
    });
    console.log('\n=== CSS CARREGADO ===');
    console.log(styles.join('\n'));

    console.log('\nAguardando 5 segundos para inspeção manual...');
    await page.waitForTimeout(5000);

    await browser.close();
})();
