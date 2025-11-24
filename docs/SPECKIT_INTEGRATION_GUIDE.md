# 🔧 GitHub SpecKit Integration — Proposta para EDUCACROSS

**Data**: 24 de novembro de 2025  
**Status**: Planejamento (Fase de Integração Futura)

---

## 📋 O que é GitHub SpecKit?

**SpecKit** é uma ferramenta do GitHub que ajuda a:
- Definir especificações estruturadas de requisitos
- Validar conformidade com specs usando GitHub Actions
- Gerar relatórios automáticos sobre cobertura e status
- Integrar com PRs e Issues para rastreamento

**Útil para**: Prototipagem com padrões claros e validáveis

---

## 🎯 Como Usar no EDUCACROSS

### 1. **Padrão Spec para Sprint 3**

Criar arquivo: `.github/specs/sprint3.yml`

```yaml
version: 1.0
title: "Sprint 3 Specification"
description: "Requisitos para Dashboard & Game Hub"

requirements:
  - id: "spec-53"
    title: "Dashboard API Endpoint"
    description: "GET /api/pages deve retornar lista de páginas"
    criteria:
      - "Endpoint responde em http://localhost:3000/api/pages"
      - "Response inclui: success, data, error, total, timestamp"
      - "Suporta query params: limit, offset"
      - "Error handling implementado"
      - "Build passa: pnpm build && pnpm lint && pnpm -r type-check"
    acceptance_tests:
      - "curl http://localhost:3000/api/pages returns 200"
      - "Response JSON é válido"
      - "Paginação funciona"

  - id: "spec-54"
    title: "Dashboard UI"
    description: "Página /studio/pages com listagem de páginas"
    criteria:
      - "Página carrega em http://localhost:3000/studio/pages"
      - "Exibe tabela com: thumbnail, título, slug, data, ações"
      - "Consume endpoint #53 corretamente"
      - "Responsivo (mobile, tablet, desktop)"
      - "Build passes"
    acceptance_tests:
      - "Página renderiza sem erros"
      - "Botões navegam corretamente"
      - "Dados carregam via API"

  - id: "spec-55"
    title: "Health Metrics"
    description: "Indicadores de saúde no Dashboard"
    criteria:
      - "Seção 'Health Metrics' exibe 4+ métricas"
      - "Usa componentes DS (Card, Progress, Badge)"
      - "Dados mockados para protótipo"
      - "Stories criadas no Storybook"
      - "Build passes"

  - id: "spec-58"
    title: "Game Hub Journey"
    description: "Documentação e jornada Game Hub"
    criteria:
      - "Pasta domains/Game/journeys/game-hub criada"
      - "README.md com objetivo, fluxo, componentes"
      - "links.md e notas.md preenchidos"
      - "Página de exemplo no Studio"
      - "Progress (#60) + Leaderboard (#61) integrados"
```

### 2. **GitHub Action para Validar Specs**

Criar: `.github/workflows/spec-validation.yml`

```yaml
name: Spec Validation

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  validate-specs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '22'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9.14.4
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build
        run: pnpm build
      
      - name: Lint
        run: pnpm lint
      
      - name: Type-check
        run: pnpm -r type-check
      
      - name: Validate Specs
        run: |
          # Script customizado para validar specs
          node scripts/validate-specs.js
      
      - name: Generate Spec Report
        if: always()
        run: node scripts/generate-spec-report.js
      
      - name: Comment on PR
        if: always()
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('spec-report.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: report
            });
```

### 3. **Script de Validação Customizado**

Criar: `scripts/validate-specs.js`

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const specFile = '.github/specs/sprint3.yml';
const spec = YAML.parse(fs.readFileSync(specFile, 'utf8'));

const results = {
  total: spec.requirements.length,
  passed: 0,
  failed: 0,
  issues: []
};

// Validar cada requisito
for (const req of spec.requirements) {
  console.log(`\nValidando: ${req.id} - ${req.title}`);
  
  let passed = true;
  
  // Exemplo: Verificar se arquivo existe para #53
  if (req.id === 'spec-53') {
    const apiFile = 'apps/studio/src/app/api/pages/route.ts';
    if (!fs.existsSync(apiFile)) {
      results.issues.push(`${req.id}: Arquivo ${apiFile} não encontrado`);
      passed = false;
    } else {
      const content = fs.readFileSync(apiFile, 'utf8');
      if (!content.includes('GET /api/pages')) {
        results.issues.push(`${req.id}: Endpoint GET /api/pages não encontrado`);
        passed = false;
      }
    }
  }
  
  // Exemplo: Verificar se página existe para #54
  if (req.id === 'spec-54') {
    const uiFile = 'apps/studio/src/app/studio/pages/page.tsx';
    if (!fs.existsSync(uiFile)) {
      results.issues.push(`${req.id}: Arquivo ${uiFile} não encontrado`);
      passed = false;
    }
  }
  
  // Exemplo: Verificar documentação para #58
  if (req.id === 'spec-58') {
    const readmeFile = 'domains/Game/journeys/game-hub/README.md';
    if (!fs.existsSync(readmeFile)) {
      results.issues.push(`${req.id}: Arquivo ${readmeFile} não encontrado`);
      passed = false;
    }
  }
  
  if (passed) {
    results.passed++;
    console.log(`  ✅ PASSOU`);
  } else {
    results.failed++;
    console.log(`  ❌ FALHOU`);
  }
}

// Gerar relatório
const report = `
# Spec Validation Report

**Status**: ${results.failed === 0 ? '✅ TUDO OK' : '❌ PROBLEMAS'}

## Resumo
- Total: ${results.total}
- Passou: ${results.passed} ✅
- Falhou: ${results.failed} ❌

## Detalhes

${results.issues.length > 0 ? `### Problemas Encontrados\n${results.issues.map(i => `- ${i}`).join('\n')}` : 'Nenhum problema encontrado!'}

## Próximos Passos

${results.failed > 0 ? 'Resolva os problemas acima antes de mergear.' : 'Tudo pronto para merge!'}
`;

fs.writeFileSync('spec-report.md', report);
console.log('\n' + report);

process.exit(results.failed > 0 ? 1 : 0);
```

---

## 🔗 Integração com Copilot Instructions

Adicionar ao `.github/copilot-instructions.md`:

```markdown
## SpecKit — Validação Automática de Requisitos

O projeto usa **GitHub SpecKit** para validar conformidade com especificações.

### Como Funciona

1. **Specs definidas**: `.github/specs/sprint3.yml`
2. **Validação automática**: GitHub Action `spec-validation.yml`
3. **Relatório em PRs**: Comentário automático com status

### Para Agentes

Quando implementar uma issue:
1. Verifique a spec em `.github/specs/sprint3.yml`
2. Implemente todos os **criteria** listados
3. Execute testes locais: `node scripts/validate-specs.js`
4. Ao fazer PR, a validação rodará automaticamente
5. Resolva qualquer problema antes de mergear

### Exemplo: Implementar #53

```bash
# 1. Ler spec
cat .github/specs/sprint3.yml | grep -A 20 "spec-53"

# 2. Implementar conforme criteria
# ... escrever código ...

# 3. Validar localmente
node scripts/validate-specs.js

# 4. Fazer commit + PR
git push && gh pr create
```

### Status de Compliance

Cada PR mostrará:
- ✅ Specs que passaram
- ❌ Specs que falharam
- 📋 Checklist de resolução
```

---

## 📊 Matriz de Benefícios

| Benefício | Descrição | Impacto |
|-----------|-----------|--------|
| **Rastreabilidade** | Saber exatamente o que foi implementado | Alto |
| **Automação** | Validação automática em cada PR | Alto |
| **Qualidade** | Força conformidade com padrões | Médio |
| **Documentação** | Specs servem como documentação viva | Médio |
| **Auditoria** | Histórico completo de requisitos | Baixo (mas importante) |

---

## 🚀 Plano de Implementação

### Fase 1 (Imediato): Setup
- [ ] Criar `.github/specs/sprint3.yml` com 4 specs (Fase 3)
- [ ] Criar workflow `spec-validation.yml`
- [ ] Criar script `scripts/validate-specs.js`

### Fase 2 (Durante Fase 3): Validação
- [ ] Agentes executam specs e validam localmente
- [ ] Cada PR mostra status de compliance
- [ ] Problemas resolvidos antes de merge

### Fase 3 (Pós Fase 3): Expansão
- [ ] Adicionar specs para Fase 4 (legacy closure)
- [ ] Expandir para Sprint 4 e roadmap

---

## 💡 Exemplo de Uso Prático

### Quando Agente Executa #53

```bash
# 1. Clonar repo
git clone ...
git checkout -b feature/c53-dashboard-api

# 2. Ler spec
cat .github/specs/sprint3.yml | grep -A 15 "spec-53"

# 3. Implementar API conforme criteria
# ... escrever apps/studio/src/app/api/pages/route.ts ...

# 4. Validar localmente (ANTES de push)
node scripts/validate-specs.js

# Saída esperada:
# ✅ spec-53: Arquivo encontrado
# ✅ spec-53: Endpoint GET implementado
# ✅ spec-53: Error handling presente
# ✅ spec-53: PASSOU

# 5. Fazer commit e push
git add .
git commit -m "feat(api): GET /api/pages endpoint (fix #53)"
git push -u origin feature/c53-dashboard-api

# 6. Criar PR
gh pr create --title "feat: Dashboard API endpoint (fix #53)"

# 7. GitHub Action rodará automaticamente
# Resultado: ✅ Spec Validation — TUDO OK
```

---

## 🔐 Segurança & Práticas

### ✅ Faça
- Manter specs atualizadas conforme requisitos mudam
- Validar localmente antes de push
- Usar specs como documentação de referência
- Revisar specs junto com PRs

### ❌ Não Faça
- Modificar specs sem documentar por quê
- Ignorar falhas de validação
- Deixar specs obsoletas
- Confundir specs com testes unitários

---

## 📞 Próximas Ações

1. **Criar `.github/specs/sprint3.yml`** com 4 specs (Fase 3)
2. **Criar workflow** em `.github/workflows/spec-validation.yml`
3. **Criar script** em `scripts/validate-specs.js`
4. **Testar** com primeira issue de Fase 3 (#53)
5. **Documentar** no copilot-instructions.md

---

**Status**: Pronto para implementação  
**Tempo estimado**: 2-3 horas de setup  
**Benefício**: Automação + rastreabilidade + qualidade
