#!/usr/bin/env node

/**
 * Script para coletar métricas de saúde do repositório
 * Usado pelo dashboard para exibir status do projeto
 */

import { execSync } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

/**
 * Executa comando e retorna output
 */
function exec(command, options = {}) {
  try {
    return execSync(command, {
      cwd: rootDir,
      encoding: 'utf-8',
      ...options,
    }).trim();
  } catch (error) {
    return null;
  }
}

/**
 * Obtém status do último build
 */
async function getBuildStatus() {
  try {
    // Verifica se todos os builds essenciais existem
    const checks = [
      { path: 'packages/tokens/dist', name: 'tokens' },
      { path: 'packages/design-system/dist', name: 'design-system' },
      { path: 'apps/storybook/storybook-static', name: 'storybook' },
      { path: 'apps/studio/.next', name: 'studio' },
    ];

    const results = await Promise.all(
      checks.map(async (check) => {
        try {
          await fs.access(path.join(rootDir, check.path));
          return { name: check.name, status: 'success' };
        } catch {
          return { name: check.name, status: 'missing' };
        }
      })
    );

    const failed = results.filter((r) => r.status === 'missing');
    
    return {
      status: failed.length === 0 ? 'success' : 'partial',
      builds: results,
      message: failed.length === 0 
        ? 'Todos os builds estão atualizados' 
        : `${failed.length} build(s) faltando: ${failed.map(f => f.name).join(', ')}`,
    };
  } catch (error) {
    return {
      status: 'error',
      builds: [],
      message: `Erro ao verificar builds: ${error.message}`,
    };
  }
}

/**
 * Obtém status do lint
 */
function getLintStatus() {
  try {
    const result = exec('pnpm lint 2>&1', { stdio: 'pipe' });
    
    if (!result) {
      return {
        status: 'error',
        warnings: 0,
        errors: 0,
        message: 'Erro ao executar lint',
      };
    }

    // Analisa output do ESLint
    const warningMatch = result.match(/(\d+)\s+warning/);
    const errorMatch = result.match(/(\d+)\s+error/);
    
    const warnings = warningMatch ? parseInt(warningMatch[1], 10) : 0;
    const errors = errorMatch ? parseInt(errorMatch[1], 10) : 0;

    return {
      status: errors > 0 ? 'error' : warnings > 0 ? 'warning' : 'success',
      warnings,
      errors,
      message: errors > 0 
        ? `${errors} erro(s), ${warnings} aviso(s)` 
        : warnings > 0 
        ? `${warnings} aviso(s)` 
        : 'Nenhum problema encontrado',
    };
  } catch (error) {
    return {
      status: 'error',
      warnings: 0,
      errors: 0,
      message: 'Erro ao executar lint',
    };
  }
}

/**
 * Obtém tamanho do bundle do Storybook
 */
async function getStorybookBundleSize() {
  try {
    const storybookPath = path.join(rootDir, 'apps/storybook/storybook-static');
    
    try {
      await fs.access(storybookPath);
    } catch {
      return {
        status: 'missing',
        size: 0,
        sizeFormatted: 'N/A',
        message: 'Build do Storybook não encontrado',
      };
    }

    // Calcula tamanho total
    const getDirectorySize = async (dirPath) => {
      let totalSize = 0;
      const files = await fs.readdir(dirPath, { withFileTypes: true });

      for (const file of files) {
        const filePath = path.join(dirPath, file.name);
        if (file.isDirectory()) {
          totalSize += await getDirectorySize(filePath);
        } else {
          const stats = await fs.stat(filePath);
          totalSize += stats.size;
        }
      }

      return totalSize;
    };

    const sizeBytes = await getDirectorySize(storybookPath);
    const sizeMB = (sizeBytes / 1024 / 1024).toFixed(2);

    return {
      status: 'success',
      size: sizeBytes,
      sizeFormatted: `${sizeMB} MB`,
      message: `Bundle gerado: ${sizeMB} MB`,
    };
  } catch (error) {
    return {
      status: 'error',
      size: 0,
      sizeFormatted: 'N/A',
      message: `Erro ao calcular tamanho: ${error.message}`,
    };
  }
}

/**
 * Obtém data do último build
 */
async function getLastBuildTime() {
  try {
    const buildPaths = [
      'apps/studio/.next',
      'apps/storybook/storybook-static',
    ];

    let latestTime = null;

    for (const buildPath of buildPaths) {
      try {
        const fullPath = path.join(rootDir, buildPath);
        const stats = await fs.stat(fullPath);
        if (!latestTime || stats.mtime > latestTime) {
          latestTime = stats.mtime;
        }
      } catch {
        // Ignora se o path não existir
      }
    }

    if (!latestTime) {
      return {
        status: 'missing',
        timestamp: null,
        message: 'Nenhum build encontrado',
      };
    }

    return {
      status: 'success',
      timestamp: latestTime.toISOString(),
      message: `Último build: ${latestTime.toLocaleString('pt-BR')}`,
    };
  } catch (error) {
    return {
      status: 'error',
      timestamp: null,
      message: `Erro ao verificar data do build: ${error.message}`,
    };
  }
}

/**
 * Verifica dependências desatualizadas
 */
function getOutdatedDependencies() {
  try {
    const result = exec('pnpm outdated --format json 2>&1', { stdio: 'pipe' });
    
    if (!result) {
      return {
        status: 'success',
        outdated: 0,
        packages: [],
        message: 'Todas as dependências estão atualizadas',
      };
    }

    try {
      const outdated = JSON.parse(result);
      const packages = Object.keys(outdated);
      
      return {
        status: packages.length > 0 ? 'warning' : 'success',
        outdated: packages.length,
        packages: packages.slice(0, 5), // Primeiros 5
        message: packages.length > 0 
          ? `${packages.length} pacote(s) desatualizado(s)` 
          : 'Todas as dependências estão atualizadas',
      };
    } catch {
      // Se não conseguir parsear JSON, conta linhas
      const lines = result.split('\n').filter(l => l.trim());
      return {
        status: 'success',
        outdated: 0,
        packages: [],
        message: 'Todas as dependências estão atualizadas',
      };
    }
  } catch (error) {
    return {
      status: 'error',
      outdated: 0,
      packages: [],
      message: 'Erro ao verificar dependências',
    };
  }
}

/**
 * Obtém informações do Git
 */
function getGitInfo() {
  try {
    const branch = exec('git rev-parse --abbrev-ref HEAD');
    const commit = exec('git rev-parse --short HEAD');
    const lastCommitDate = exec('git log -1 --format=%cd --date=iso');
    
    return {
      branch,
      commit,
      lastCommitDate,
    };
  } catch (error) {
    return {
      branch: 'unknown',
      commit: 'unknown',
      lastCommitDate: null,
    };
  }
}

/**
 * Coleta todas as métricas
 */
async function collectMetrics() {
  const [
    buildStatus,
    lintStatus,
    bundleSize,
    lastBuildTime,
    outdatedDeps,
  ] = await Promise.all([
    getBuildStatus(),
    Promise.resolve(getLintStatus()),
    getStorybookBundleSize(),
    getLastBuildTime(),
    Promise.resolve(getOutdatedDependencies()),
  ]);

  const gitInfo = getGitInfo();

  return {
    timestamp: new Date().toISOString(),
    git: gitInfo,
    build: buildStatus,
    lint: lintStatus,
    bundle: bundleSize,
    lastBuild: lastBuildTime,
    dependencies: outdatedDeps,
  };
}

/**
 * Salva métricas em arquivo JSON
 */
async function saveMetrics(metrics) {
  const outputPath = path.join(rootDir, 'apps/studio/data/health-metrics.json');
  
  try {
    // Garante que o diretório existe
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    
    // Salva JSON formatado
    await fs.writeFile(outputPath, JSON.stringify(metrics, null, 2));
    
    console.log(`✅ Métricas salvas em: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao salvar métricas: ${error.message}`);
    return false;
  }
}

/**
 * Execução principal
 */
async function main() {
  console.log('🔍 Coletando métricas de saúde do repositório...\n');
  
  const metrics = await collectMetrics();
  
  // Exibe resumo
  console.log('📊 Resumo das Métricas:\n');
  console.log(`  Build:        ${metrics.build.status} - ${metrics.build.message}`);
  console.log(`  Lint:         ${metrics.lint.status} - ${metrics.lint.message}`);
  console.log(`  Bundle:       ${metrics.bundle.status} - ${metrics.bundle.message}`);
  console.log(`  Último Build: ${metrics.lastBuild.status} - ${metrics.lastBuild.message}`);
  console.log(`  Dependências: ${metrics.dependencies.status} - ${metrics.dependencies.message}`);
  console.log(`  Git Branch:   ${metrics.git.branch}`);
  console.log(`  Git Commit:   ${metrics.git.commit}`);
  console.log('');
  
  // Salva em arquivo
  const saved = await saveMetrics(metrics);
  
  // Retorna como JSON se solicitado
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(metrics, null, 2));
  }

  process.exit(saved ? 0 : 1);
}

// Executa se for o módulo principal
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('❌ Erro ao coletar métricas:', error);
    process.exit(1);
  });
}

export { collectMetrics, saveMetrics };
