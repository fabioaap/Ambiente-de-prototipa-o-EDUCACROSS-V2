import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chokidar from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, '../src');
const distDir = path.resolve(__dirname, '../dist');
const tokensPath = path.join(srcDir, 'tokens.json');

function buildTokens() {
  console.log('🔨 Building tokens...');

  // Criar pasta dist
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Ler tokens
  const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));

  // Gerar CSS variables
  const cssLines = [':root {'];
  
  function flattenTokens(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const varName = prefix ? `${prefix}-${key}` : key;
      if (typeof value === 'object' && !Array.isArray(value)) {
        flattenTokens(value, varName);
      } else {
        cssLines.push(`  --${varName}: ${value};`);
      }
    }
  }

  flattenTokens(tokens);
  cssLines.push('}');

  const cssContent = cssLines.join('\n');
  fs.writeFileSync(path.join(distDir, 'tokens.css'), cssContent);

  // Gerar módulo ESM
  const esmContent = `export const tokens = ${JSON.stringify(tokens, null, 2)};\nexport default tokens;\n`;
  fs.writeFileSync(path.join(distDir, 'index.esm.js'), esmContent);

  // Gerar módulo CommonJS
  const cjsContent = `const tokens = ${JSON.stringify(tokens, null, 2)};\nmodule.exports = tokens;\nmodule.exports.tokens = tokens;\n`;
  fs.writeFileSync(path.join(distDir, 'index.cjs'), cjsContent);

  // Gerar tipos TypeScript
  const dtsContent = `export interface Tokens {
  colors: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    success: Record<string, string>;
    warning: Record<string, string>;
    error: Record<string, string>;
    neutral: Record<string, string>;
  };
  typography: {
    fontFamily: Record<string, string>;
    fontSize: Record<string, string>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, string>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  breakpoints: Record<string, string>;
}

export const tokens: Tokens;
export default tokens;
`;
  fs.writeFileSync(path.join(distDir, 'index.d.ts'), dtsContent);

  console.log('✅ Tokens built successfully!');
}

// Build inicial
buildTokens();

// Watch mode
if (process.argv.includes('--watch')) {
  console.log('👀 Watching for changes...');
  const watcher = chokidar.watch(tokensPath, {
    persistent: true,
    ignoreInitial: true,
  });

  watcher.on('change', () => {
    console.log('📝 Tokens changed, rebuilding...');
    buildTokens();
  });
}
