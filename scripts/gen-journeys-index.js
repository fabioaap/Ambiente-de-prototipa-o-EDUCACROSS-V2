#!/usr/bin/env node

/**
 * Script para gerar índice automático de jornadas por domínio
 * 
 * Este script varre a estrutura domains/*/journeys/*/README.md
 * e gera um arquivo centralizado domains/JOURNEYS.md listando:
 * - Todos os domínios (BackOffice, FrontOffice, Game)
 * - Todas as jornadas dentro de cada domínio
 * - Títulos extraídos dos README.md de cada jornada
 * - Links diretos para documentação e pastas
 * - Estatísticas de domínios e jornadas
 * 
 * Uso: 
 *   pnpm gen:journeys
 *   ou
 *   node scripts/gen-journeys-index.js
 * 
 * Saída: domains/JOURNEYS.md
 */

const fs = require('fs');
const path = require('path');

const DOMAINS_DIR = path.join(process.cwd(), 'domains');
const OUTPUT_FILE = path.join(DOMAINS_DIR, 'JOURNEYS.md');

console.log('🔄 Gerando índice de jornadas...\n');

let content = `# Índice de Jornadas - EDUCACROSS Prototipação

**Última atualização**: ${new Date().toISOString().split('T')[0]}

> Este arquivo é gerado automaticamente. Para regenerar, execute: \`pnpm gen:journeys\`

---

`;

let totalDomains = 0;
let totalJourneys = 0;

// Iterar por cada domínio
const domains = fs.readdirSync(DOMAINS_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.'))
  .map(dirent => dirent.name)
  .sort();

for (const domainName of domains) {
  if (domainName === 'template-jornada.md') continue;

  totalDomains++;
  const domainDir = path.join(DOMAINS_DIR, domainName);

  content += `## ${domainName}\n\n`;

  // Verificar se há README do domínio
  const domainReadme = path.join(domainDir, 'README.md');
  if (fs.existsSync(domainReadme)) {
    content += `**[📖 Documentação do Domínio](./${domainName}/README.md)**\n\n`;
  }

  // Listar jornadas
  const journeysDir = path.join(domainDir, 'journeys');
  if (fs.existsSync(journeysDir)) {
    content += `### Jornadas\n\n`;

    const journeys = fs.readdirSync(journeysDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.'))
      .map(dirent => dirent.name)
      .sort();

    if (journeys.length > 0) {
      for (const journeyName of journeys) {
        totalJourneys++;
        const journeyDir = path.join(journeysDir, journeyName);
        const journeyReadme = path.join(journeyDir, 'README.md');

        if (fs.existsSync(journeyReadme)) {
          // Try to extract title from README
          const readmeContent = fs.readFileSync(journeyReadme, 'utf-8');
          const titleMatch = readmeContent.match(/^#\s+(?:Jornada:\s+)?(.+)$/m);
          const title = titleMatch ? titleMatch[1] : journeyName;
          
          content += `- **[${title}](./${domainName}/journeys/${journeyName}/README.md)** - [📁 Pasta](./${domainName}/journeys/${journeyName}/)\n`;
        } else {
          content += `- **${journeyName}** - ⚠️ Sem documentação\n`;
        }
      }
    } else {
      content += `*(nenhuma jornada ainda)*\n`;
    }
  } else {
    content += `*(sem jornadas)*\n`;
  }

  content += '\n';
}

// Adicionar estatísticas
content += `---\n\n`;
content += `## 📊 Estatísticas\n\n`;
content += `- **Domínios**: ${totalDomains}\n`;
content += `- **Jornadas**: ${totalJourneys}\n\n`;

// Adicionar instruções
content += `## 🚀 Próximos Passos\n\n`;
content += `1. **Criar nova jornada**: Veja [CONTRIBUTING.md](../CONTRIBUTING.md#criando-uma-jornada)\n`;
content += `2. **Editar no Studio**: Acesse http://localhost:3000/studio\n`;
content += `3. **Ver no Storybook**: Acesse http://localhost:6006\n\n`;

// Escrever arquivo
fs.writeFileSync(OUTPUT_FILE, content);

console.log(`✅ Índice gerado com sucesso em: ${OUTPUT_FILE}`);
console.log(`📊 Total: ${totalDomains} domínios, ${totalJourneys} jornadas`);
