import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tokensPath = path.join(__dirname, '../src/tokens.json');
const distPath = path.join(__dirname, '../dist');

// Criar pasta dist se não existir
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

// Ler tokens
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));

// Gerar CSS Variables
function generateCSS(tokens) {
  let css = ':root {\n';
  
  // Colors
  Object.entries(tokens.colors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      css += `  --color-${colorName}-${shade}: ${value};\n`;
    });
  });
  
  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    css += `  --spacing-${key}: ${value};\n`;
  });
  
  // Typography
  Object.entries(tokens.typography.fontFamily).forEach(([key, value]) => {
    css += `  --font-family-${key}: ${value};\n`;
  });
  
  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    css += `  --font-size-${key}: ${value};\n`;
  });
  
  Object.entries(tokens.typography.fontWeight).forEach(([key, value]) => {
    css += `  --font-weight-${key}: ${value};\n`;
  });
  
  Object.entries(tokens.typography.lineHeight).forEach(([key, value]) => {
    css += `  --line-height-${key}: ${value};\n`;
  });
  
  // Border Radius
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    css += `  --radius-${key}: ${value};\n`;
  });
  
  // Shadows
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    css += `  --shadow-${key}: ${value};\n`;
  });
  
  css += '}\n';
  return css;
}

// Gerar JavaScript/TypeScript exports
function generateJS(tokens) {
  return `export const tokens = ${JSON.stringify(tokens, null, 2)};\n\nexport default tokens;\n`;
}

function generateTypes(tokens) {
  return `export interface DesignTokens {
  colors: {
    [key: string]: {
      [shade: string]: string;
    };
  };
  spacing: {
    [key: string]: string;
  };
  typography: {
    fontFamily: {
      [key: string]: string;
    };
    fontSize: {
      [key: string]: string;
    };
    fontWeight: {
      [key: string]: string;
    };
    lineHeight: {
      [key: string]: string;
    };
  };
  borderRadius: {
    [key: string]: string;
  };
  shadows: {
    [key: string]: string;
  };
}

export declare const tokens: DesignTokens;
export default tokens;
`;
}

// Escrever arquivos
const cssContent = generateCSS(tokens);
const jsContent = generateJS(tokens);
const typesContent = generateTypes(tokens);

fs.writeFileSync(path.join(distPath, 'tokens.css'), cssContent);
fs.writeFileSync(path.join(distPath, 'index.js'), jsContent);
fs.writeFileSync(path.join(distPath, 'index.cjs'), `module.exports = ${JSON.stringify(tokens, null, 2)};\n`);
fs.writeFileSync(path.join(distPath, 'index.d.ts'), typesContent);

console.log('✅ Design tokens compilados com sucesso!');
console.log('   - dist/tokens.css');
console.log('   - dist/index.js');
console.log('   - dist/index.cjs');
console.log('   - dist/index.d.ts');
