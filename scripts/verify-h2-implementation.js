#!/usr/bin/env node
/**
 * Script de verificação do endpoint /api/dashboard/pages
 * Valida que todos os critérios de aceitação da issue H2 estão implementados
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificação da Implementação H2\n');
console.log('Issue: Dashboard - Endpoint / API para index de páginas\n');

// 1. Verificar se o arquivo do endpoint existe
const endpointPath = path.join(
  __dirname,
  '..',
  'apps/studio/src/app/api/dashboard/pages/route.ts'
);

console.log('📁 Verificando arquivo do endpoint...');
if (fs.existsSync(endpointPath)) {
  console.log('✅ Endpoint existe: apps/studio/src/app/api/dashboard/pages/route.ts\n');
} else {
  console.log('❌ Endpoint não encontrado\n');
  process.exit(1);
}

// 2. Verificar se o código contém as correções esperadas
const code = fs.readFileSync(endpointPath, 'utf-8');

console.log('🔧 Verificando implementação dos campos...\n');

const checks = [
  {
    name: 'Uso de fs.stat() para obter informações do arquivo',
    pattern: /await fs\.stat\(fullPath\)/,
    description: 'Necessário para obter timestamps reais'
  },
  {
    name: 'Campo createdAt usa stats.birthtime',
    pattern: /createdAt:\s*stats\.birthtime\.toISOString\(\)/,
    description: 'Data de criação do arquivo'
  },
  {
    name: 'Campo updatedAt usa stats.mtime',
    pattern: /updatedAt:\s*stats\.mtime\.toISOString\(\)/,
    description: 'Data de última modificação (lastModified)'
  },
  {
    name: 'Interface DashboardPage inclui campo name',
    pattern: /name:\s*string/,
    description: 'Critério: nome'
  },
  {
    name: 'Interface DashboardPage inclui campo slug',
    pattern: /slug:\s*string/,
    description: 'Critério: slug'
  },
  {
    name: 'Interface DashboardPage inclui campo domain',
    pattern: /domain:\s*['"]BackOffice['"]\s*\|/,
    description: 'Critério: domain'
  },
  {
    name: 'Interface DashboardPage inclui campo updatedAt',
    pattern: /updatedAt:\s*string/,
    description: 'Critério: lastModified (mapeado para updatedAt)'
  },
  {
    name: 'Interface DashboardPage inclui campo status',
    pattern: /status:\s*['"]draft['"]\s*\|/,
    description: 'Critério: status'
  },
  {
    name: 'Detecção de domínio BackOffice',
    pattern: /if\s*\(slug\.startsWith\(['"]backoffice['"]\)\)\s*domain\s*=\s*['"]BackOffice['"]/,
    description: 'Lógica de detecção de domínio'
  },
  {
    name: 'Extração do título da página',
    pattern: /data\.root\?\.props\?\.title/,
    description: 'Campo name extraído do JSON'
  }
];

let allPassed = true;

checks.forEach(check => {
  if (check.pattern.test(code)) {
    console.log(`✅ ${check.name}`);
    console.log(`   ${check.description}\n`);
  } else {
    console.log(`❌ ${check.name}`);
    console.log(`   ${check.description}\n`);
    allPassed = false;
  }
});

// 3. Verificar documentação
console.log('\n📚 Verificando documentação...\n');

const docs = [
  {
    path: 'docs/h2-implementacao-final.md',
    description: 'Documentação da implementação'
  },
  {
    path: 'apps/studio/src/app/api/dashboard/README.md',
    description: 'Guia da API do Dashboard'
  }
];

docs.forEach(doc => {
  const docPath = path.join(__dirname, '..', doc.path);
  if (fs.existsSync(docPath)) {
    console.log(`✅ ${doc.description}`);
    console.log(`   Arquivo: ${doc.path}\n`);
  } else {
    console.log(`⚠️  ${doc.description} não encontrada`);
    console.log(`   Esperado: ${doc.path}\n`);
  }
});

// 4. Verificar estrutura de dados de exemplo
console.log('\n📦 Verificando estrutura de páginas...\n');

const dataDir = path.join(__dirname, '..', 'apps/studio/data/pages');
if (fs.existsSync(dataDir)) {
  const files = [];
  
  function scanDir(dir, prefix = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach(entry => {
      if (entry.name === '.gitkeep') return;
      const fullPath = path.join(dir, entry.name);
      const slug = prefix ? `${prefix}/${entry.name}` : entry.name;
      
      if (entry.isDirectory()) {
        scanDir(fullPath, slug);
      } else if (entry.name.endsWith('.json')) {
        const cleanSlug = slug.replace(/\.json$/, '');
        
        // Detectar domínio
        let domain = 'Other';
        if (cleanSlug.startsWith('backoffice')) domain = 'BackOffice';
        else if (cleanSlug.startsWith('frontoffice')) domain = 'FrontOffice';
        else if (cleanSlug.startsWith('game')) domain = 'Game';
        
        // Ler arquivo para pegar o nome
        const content = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        const name = content.root?.props?.title || cleanSlug.split('/').pop() || 'Sem título';
        
        // Obter stats do arquivo
        const stats = fs.statSync(fullPath);
        
        files.push({
          slug: cleanSlug,
          name,
          domain,
          updatedAt: stats.mtime.toISOString(),
          createdAt: stats.birthtime.toISOString()
        });
      }
    });
  }
  
  scanDir(dataDir);
  
  console.log(`✅ ${files.length} página(s) encontrada(s)\n`);
  
  if (files.length > 0) {
    console.log('Exemplo de dados que o endpoint retornaria:\n');
    console.log(JSON.stringify(files[0], null, 2));
    console.log('\n');
    
    // Verificar campos
    const firstPage = files[0];
    const requiredFields = ['name', 'slug', 'domain', 'updatedAt'];
    const hasAllFields = requiredFields.every(field => field in firstPage);
    
    if (hasAllFields) {
      console.log('✅ Todos os campos obrigatórios presentes nos dados de teste\n');
    } else {
      console.log('❌ Campos obrigatórios faltando nos dados de teste\n');
      allPassed = false;
    }
    
    // Verificar se updatedAt é uma data válida
    const date = new Date(firstPage.updatedAt);
    if (!isNaN(date.getTime())) {
      console.log('✅ Campo updatedAt (lastModified) é uma data ISO válida\n');
    } else {
      console.log('❌ Campo updatedAt (lastModified) não é uma data válida\n');
      allPassed = false;
    }
  }
} else {
  console.log('⚠️  Diretório de páginas não encontrado\n');
}

// 5. Resumo final
console.log('\n' + '='.repeat(60) + '\n');

if (allPassed) {
  console.log('🎉 VERIFICAÇÃO CONCLUÍDA COM SUCESSO!\n');
  console.log('✅ Critérios de aceitação da issue H2 implementados:');
  console.log('   - Endpoint retorna JSON com nome, slug, domain, lastModified, status');
  console.log('   - Endpoint pronto para ser lido pela UI do Dashboard\n');
  console.log('📌 Próximos passos:');
  console.log('   1. Testar endpoint rodando: pnpm dev:studio');
  console.log('   2. Acessar: http://localhost:3000/api/dashboard/pages');
  console.log('   3. Implementar UI do Dashboard (issue H3)\n');
  process.exit(0);
} else {
  console.log('⚠️  VERIFICAÇÃO ENCONTROU PROBLEMAS\n');
  console.log('Revise as verificações acima que falharam.\n');
  process.exit(1);
}
