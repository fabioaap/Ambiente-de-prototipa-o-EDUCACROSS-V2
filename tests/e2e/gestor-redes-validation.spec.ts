import { test, expect } from '@playwright/test';

test.describe('Gestor de Redes - Validação Visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/gestor-redes');
    await page.waitForLoadState('networkidle');
  });

  test('deve carregar a página sem erros', async ({ page }) => {
    // Verificar título
    await expect(page).toHaveTitle(/Gestor de Redes|Admin/);
    
    // Capturar erros do console
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.waitForTimeout(2000);
    
    console.log('Erros no console:', errors);
    
    // Tirar screenshot
    await page.screenshot({ path: 'gestor-redes-inicial.png', fullPage: true });
  });

  test('deve exibir os 4 KPI cards', async ({ page }) => {
    // Procurar por "Alunos", "Professores", "Diretores", "Coordenadores"
    const alunosVisible = await page.getByText('Alunos').isVisible().catch(() => false);
    const professoresVisible = await page.getByText('Professores').isVisible().catch(() => false);
    
    console.log('Cards visíveis:', {
      alunos: alunosVisible,
      professores: professoresVisible
    });
    
    await page.screenshot({ path: 'gestor-redes-kpis.png' });
  });

  test('deve exibir tabela de escolas', async ({ page }) => {
    // Verificar se existe alguma célula de tabela
    const tableVisible = await page.locator('table').isVisible().catch(() => false);
    
    console.log('Tabela visível:', tableVisible);
    
    // Procurar por headers esperados
    const headers = ['Escola', 'Grupo', 'Cadastrados', 'Acessaram', 'Jogaram'];
    for (const header of headers) {
      const visible = await page.getByText(header, { exact: false }).isVisible().catch(() => false);
      console.log(`Header "${header}":`, visible);
    }
    
    await page.screenshot({ path: 'gestor-redes-tabela.png' });
  });

  test('verificar estrutura HTML', async ({ page }) => {
    const bodyHTML = await page.locator('body').innerHTML();
    console.log('Primeiros 500 caracteres do body:', bodyHTML.substring(0, 500));
    
    // Verificar se há erros de hidratação
    const hasHydrationError = bodyHTML.includes('Hydration') || bodyHTML.includes('hydration');
    console.log('Erro de hidratação detectado:', hasHydrationError);
  });
});
