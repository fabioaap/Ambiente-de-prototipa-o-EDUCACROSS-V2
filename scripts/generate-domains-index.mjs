import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const DOMAINS_DIR = path.join(ROOT_DIR, 'domains');
const OUTPUT_FILE = path.join(DOMAINS_DIR, 'README.md');

console.log(`🔍 Scanning domains in: ${DOMAINS_DIR}`);

function getDirectories(source) {
    if (!fs.existsSync(source)) return [];
    return fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}

function getFirstLine(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf-8');
    const firstLine = content.split('\n')[0];
    return firstLine.replace(/^#\s*/, '').trim();
}

const domains = getDirectories(DOMAINS_DIR).filter(d => !d.startsWith('.'));
let markdownContent = `# 🗺️ Mapa de Jornadas EDUCACROSS

Este índice é gerado automaticamente via \`scripts/generate-domains-index.mjs\`.
**Não edite manualmente a tabela.**

`;

let totalJourneys = 0;

domains.forEach(domain => {
    const domainPath = path.join(DOMAINS_DIR, domain);
    const journeysDir = path.join(domainPath, 'journeys');

    if (!fs.existsSync(journeysDir)) return;

    const journeys = getDirectories(journeysDir);

    if (journeys.length > 0) {
        markdownContent += `## 📂 ${domain}\n\n`;
        markdownContent += `| Jornada | Status | Descrição | Links |\n`;
        markdownContent += `|---------|--------|-----------|-------|\n`;

        journeys.forEach(journey => {
            const journeyPath = path.join(journeysDir, journey);
            const readmePath = path.join(journeyPath, 'README.md');
            const title = getFirstLine(readmePath) || journey;

            // Tentar ler status do README (procurar por "Status: ...")
            let status = '🚧 Em construção';
            if (fs.existsSync(readmePath)) {
                const content = fs.readFileSync(readmePath, 'utf-8');
                if (content.includes('[x] Concluído')) status = '✅ Concluído';
                else if (content.includes('[x] Em andamento')) status = '🔄 Em andamento';
                else if (content.includes('[x] Planejamento')) status = '📋 Planejamento';
            }

            const link = `./${domain}/journeys/${journey}/README.md`;
            markdownContent += `| [**${title}**](${link}) | ${status} | Jornada ${journey} | [Docs](${link}) |\n`;
            totalJourneys++;
        });

        markdownContent += `\n`;
    }
});

markdownContent += `\n---\n\n**Total de Jornadas**: ${totalJourneys}\n**Atualizado em**: ${new Date().toISOString().split('T')[0]}\n`;

fs.writeFileSync(OUTPUT_FILE, markdownContent);
console.log(`✅ Index generated at: ${OUTPUT_FILE}`);
console.log(`📊 Total journeys found: ${totalJourneys}`);
