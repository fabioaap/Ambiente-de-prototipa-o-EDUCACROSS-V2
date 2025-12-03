import { chromium } from '@playwright/test';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const STORYBOOK_URL = 'http://localhost:6006';
const OUTPUT_DIR = './evidence/storybook-screenshots';

// Garante que o diretório de saída existe
mkdirSync(OUTPUT_DIR, { recursive: true });

const stories = [
  { id: 'design-tokens-overview--docs', name: '01-tokens-overview' },
  { id: 'components-button--primary', name: '02-button' },
  { id: 'components-card--default', name: '03-card' },
  { id: 'components-forms-input--default', name: '04-input' },
  { id: 'backoffice-datatable--default', name: '05-datatable' },
  { id: 'components-progress--linear-default', name: '06-progress' },
  { id: 'acessibilidade-exemplos--docs', name: '07-accessibility' },
];

async function captureScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 }
  });

  console.log('📸 Iniciando captura de screenshots do Storybook...\n');

  for (const story of stories) {
    try {
      const url = `${STORYBOOK_URL}/iframe.html?id=${story.id}&viewMode=story`;
      console.log(`🔍 Navegando para: ${story.name}`);
      console.log(`   URL: ${url}`);
      
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Aguarda um pouco para garantir que o componente foi renderizado
      await page.waitForTimeout(2000);
      
      const screenshotPath = join(OUTPUT_DIR, `${story.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: false
      });
      
      console.log(`   ✅ Screenshot salvo: ${screenshotPath}\n`);
    } catch (error) {
      console.error(`   ❌ Erro ao capturar ${story.name}:`, error.message, '\n');
    }
  }

  await browser.close();
  console.log('✨ Captura concluída!');
}

captureScreenshots().catch(console.error);
