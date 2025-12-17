#!/usr/bin/env node

/**
 * Script de Verificação de Props de Componentes
 * 
 * Verifica se uma prop específica existe em um componente do design system
 * antes de criar uma issue no GitHub para evitar falsos positivos.
 * 
 * Uso:
 *   node scripts/verify-component-prop.mjs <ComponentName> <propName>
 *   pnpm verify-prop <ComponentName> <propName>
 * 
 * Exemplos:
 *   node scripts/verify-component-prop.mjs DataTable cellRenderer
 *   pnpm verify-prop Badge icon
 * 
 * Exit codes:
 *   0 - Sucesso (prop encontrada OU não encontrada - informativo apenas)
 *   1 - Erro de uso ou execução
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Obter diretório raiz do projeto
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Cores ANSI para output (compatível Windows/Unix)
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

/**
 * Formata mensagem com cor
 */
function color(text, colorCode) {
  return `${colorCode}${text}${colors.reset}`;
}

/**
 * Exibe banner do script
 */
function showBanner() {
  console.log('');
  console.log(color('╔══════════════════════════════════════════════════════════════╗', colors.cyan));
  console.log(color('║     🔍 Verificador de Props - Design System                ║', colors.cyan));
  console.log(color('╚══════════════════════════════════════════════════════════════╝', colors.cyan));
  console.log('');
}

/**
 * Exibe uso correto do script
 */
function showUsage() {
  console.log(color('Uso:', colors.bright));
  console.log(`  ${color('node scripts/verify-component-prop.mjs <ComponentName> <propName>', colors.gray)}`);
  console.log(`  ${color('pnpm verify-prop <ComponentName> <propName>', colors.gray)}`);
  console.log('');
  console.log(color('Exemplos:', colors.bright));
  console.log(`  ${color('node scripts/verify-component-prop.mjs DataTable cellRenderer', colors.green)}`);
  console.log(`  ${color('pnpm verify-prop Badge icon', colors.green)}`);
  console.log(`  ${color('pnpm verify-prop StatsCard trend', colors.green)}`);
  console.log('');
}

/**
 * Valida argumentos da linha de comando
 */
function validateArgs(args) {
  if (args.length < 2) {
    console.error(color('❌ Erro: Argumentos insuficientes', colors.red));
    console.log('');
    showUsage();
    process.exit(1);
  }

  const [componentName, propName] = args;

  // Validar nome do componente (PascalCase)
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
    console.error(color(`❌ Erro: Nome de componente inválido "${componentName}"`, colors.red));
    console.log(color('   Deve estar em PascalCase (ex: DataTable, Badge)', colors.gray));
    process.exit(1);
  }

  // Validar nome da prop (camelCase)
  if (!/^[a-z][a-zA-Z0-9]*$/.test(propName)) {
    console.error(color(`❌ Erro: Nome de prop inválido "${propName}"`, colors.red));
    console.log(color('   Deve estar em camelCase (ex: cellRenderer, icon)', colors.gray));
    process.exit(1);
  }

  return { componentName, propName };
}

/**
 * Constrói o caminho do arquivo do componente
 */
function getComponentPath(componentName) {
  return join(
    projectRoot,
    'packages',
    'design-system',
    'src',
    'components',
    componentName,
    `${componentName}.tsx`
  );
}

/**
 * Verifica se o arquivo do componente existe
 */
function checkComponentExists(componentPath, componentName) {
  if (!existsSync(componentPath)) {
    console.log(color(`⚠️  Componente "${componentName}" não encontrado`, colors.yellow));
    console.log(color(`   Caminho esperado: ${componentPath}`, colors.gray));
    console.log('');
    console.log(color('💡 Dica:', colors.cyan));
    console.log(color('   • Verifique se o nome do componente está correto', colors.gray));
    console.log(color('   • Componentes devem estar em packages/design-system/src/components/', colors.gray));
    console.log('');
    return false;
  }
  return true;
}

/**
 * Lê o conteúdo do arquivo do componente
 */
function readComponentFile(componentPath) {
  try {
    return readFileSync(componentPath, 'utf-8');
  } catch (error) {
    console.error(color('❌ Erro ao ler arquivo do componente:', colors.red));
    console.error(color(`   ${error.message}`, colors.gray));
    process.exit(1);
  }
}

/**
 * Procura a prop no conteúdo do arquivo
 */
function searchProp(content, propName) {
  const lines = content.split('\n');
  const results = [];

  // Padrões de busca para TypeScript/React
  const patterns = [
    // 1. Definição em interface: "propName:" ou "propName?:"
    new RegExp(`^\\s*${propName}\\??:\\s*`, 'm'),
    // 2. Desestruturação em parâmetros: "{ propName }"
    new RegExp(`[{,]\\s*${propName}\\s*[,}]`, 'm'),
    // 3. Uso direto: "props.propName"
    new RegExp(`props\\.${propName}\\b`, 'm'),
  ];

  lines.forEach((line, index) => {
    patterns.forEach((pattern, patternIndex) => {
      if (pattern.test(line)) {
        results.push({
          lineNumber: index + 1,
          line: line.trim(),
          patternType: patternIndex,
        });
      }
    });
  });

  // Remover duplicatas (mesma linha encontrada por múltiplos padrões)
  const uniqueResults = results.filter((result, index, self) =>
    index === self.findIndex(r => r.lineNumber === result.lineNumber)
  );

  return uniqueResults;
}

/**
 * Exibe os resultados da busca
 */
function displayResults(componentName, propName, results, componentPath) {
  if (results.length > 0) {
    console.log(color(`✅ Prop "${propName}" ENCONTRADA no componente ${componentName}`, colors.green));
    console.log('');
    console.log(color('📍 Localização(ões):', colors.bright));
    console.log('');

    results.forEach((result) => {
      console.log(color(`   Linha ${result.lineNumber}:`, colors.cyan));
      console.log(color(`   ${result.line}`, colors.gray));
      console.log('');
    });

    console.log(color('💡 Conclusão:', colors.cyan));
    console.log(color(`   A prop "${propName}" JÁ ESTÁ IMPLEMENTADA`, colors.yellow));
    console.log(color('   Não é necessário criar issue para esta funcionalidade', colors.gray));
    console.log('');
    console.log(color('📄 Arquivo:', colors.bright));
    console.log(color(`   ${componentPath}`, colors.gray));
    console.log('');
  } else {
    console.log(color(`ℹ️  Prop "${propName}" NÃO encontrada no componente ${componentName}`, colors.cyan));
    console.log('');
    console.log(color('✨ Esta pode ser uma nova funcionalidade!', colors.green));
    console.log('');
    console.log(color('📋 Próximos passos:', colors.bright));
    console.log(color('   1. Confirme que a prop realmente não existe', colors.gray));
    console.log(color('   2. Crie uma issue no GitHub descrevendo a funcionalidade', colors.gray));
    console.log(color('   3. Implemente a prop no componente', colors.gray));
    console.log(color('   4. Adicione testes e documentação', colors.gray));
    console.log('');
    console.log(color('📄 Arquivo verificado:', colors.bright));
    console.log(color(`   ${componentPath}`, colors.gray));
    console.log('');
  }
}

/**
 * Função principal
 */
function main() {
  showBanner();

  // Obter argumentos (ignorar node e nome do script)
  const args = process.argv.slice(2);

  // Validar argumentos
  const { componentName, propName } = validateArgs(args);

  console.log(color('🔍 Verificando...', colors.bright));
  console.log(color(`   Componente: ${componentName}`, colors.gray));
  console.log(color(`   Prop: ${propName}`, colors.gray));
  console.log('');

  // Construir caminho do componente
  const componentPath = getComponentPath(componentName);

  // Verificar se componente existe
  if (!checkComponentExists(componentPath, componentName)) {
    process.exit(0); // Saída informativa, não erro
  }

  // Ler arquivo do componente
  const content = readComponentFile(componentPath);

  // Procurar prop no conteúdo
  const results = searchProp(content, propName);

  // Exibir resultados
  displayResults(componentName, propName, results, componentPath);

  console.log(color('═══════════════════════════════════════════════════════════════', colors.cyan));
  console.log('');

  // Sempre retorna 0 - script é informativo
  process.exit(0);
}

// Executar
main();
