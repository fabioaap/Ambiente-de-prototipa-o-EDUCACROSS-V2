# 🚀 Plano de Execução - Estratégia de Componentes

**Data:** 17 de dezembro de 2025  
**Executor:** DevOps Agent  
**Objetivo:** Implementar pivô estratégico de componentes em 3 fases sequenciais

---

## 📋 Visão Geral

### Sequência de Execução
```
FASE 1: Preservar Trabalho (15 min)
   ↓
FASE 2: Limpar Backlog (10 min)
   ↓
FASE 3: Automatizar Prevenção (1 hora)
```

### Critérios de Sucesso
- ✅ Zero perda de documentação (commit seguro)
- ✅ 5 issues fechadas no GitHub
- ✅ Script de verificação operacional
- ✅ CONTRIBUTING.md atualizado

---

## 🎯 FASE 1: Preservar Trabalho (CRÍTICO)

### Objetivo
Fazer commit dos 3 documentos estratégicos antes de qualquer outra ação.

### Contexto
- **Branch atual:** `consolidate-pr125-features`
- **Arquivos novos:** 3 (unstaged)
- **Risco:** ALTO (perda de 32KB de análise se não committar)

### Passos Detalhados

#### 1.1 Verificar Status Atual
```powershell
# Confirmar branch e arquivos unstaged
git status

# Validar que estamos na branch correta
git branch --show-current
# Output esperado: consolidate-pr125-features
```

**Checkpoint:** Branch = `consolidate-pr125-features` ✅

---

#### 1.2 Stage dos Arquivos Estratégicos
```powershell
# Adicionar os 3 documentos ao stage
git add COMPONENT_STRATEGY_PIVOT.md
git add AUDIT_SPRINT6_FALSE_POSITIVES.md
git add CLOSE_ISSUES_INSTRUCTIONS.md

# Confirmar stage
git status
```

**Output esperado:**
```
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   AUDIT_SPRINT6_FALSE_POSITIVES.md
        new file:   CLOSE_ISSUES_INSTRUCTIONS.md
        new file:   COMPONENT_STRATEGY_PIVOT.md
```

**Checkpoint:** 3 arquivos em `Changes to be committed` ✅

---

#### 1.3 Commit com Mensagem Estruturada
```powershell
git commit -m "docs: pivô estratégico componentes - auditoria Sprint 6

- Auditoria completa: 5/5 issues já implementadas (falsos positivos)
- Nova estratégia: foco mudou de implementação para documentação
- Economia: 105 minutos de trabalho duplicado prevenidos
- Docs gerados: guia fechamento issues + plano automatização

Files:
- COMPONENT_STRATEGY_PIVOT.md: análise completa do pivô estratégico
- AUDIT_SPRINT6_FALSE_POSITIVES.md: evidências técnicas das 5 issues
- CLOSE_ISSUES_INSTRUCTIONS.md: guia passo-a-passo para GitHub

Refs: #128, #129, #130, #131, #132"
```

**Checkpoint:** Commit criado localmente ✅

---

#### 1.4 Push para Remoto
```powershell
# Push da branch atual
git push origin consolidate-pr125-features

# Se branch não existe no remoto:
# git push --set-upstream origin consolidate-pr125-features
```

**Output esperado:**
```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
...
To github.com:fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2.git
   f434f41..abc1234  consolidate-pr125-features -> consolidate-pr125-features
```

**Checkpoint:** Commit sincronizado no GitHub ✅

---

#### 1.5 Validar no GitHub
```powershell
# Abrir repositório no browser
start https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/tree/consolidate-pr125-features
```

**Validações:**
- [ ] 3 arquivos visíveis na branch
- [ ] Mensagem de commit aparece corretamente
- [ ] Timestamp do commit é recente

**Checkpoint:** Documentação preservada no GitHub ✅

---

### 🎯 Resultado da Fase 1
- ✅ **Risco eliminado:** Trabalho preservado em repositório remoto
- ✅ **32KB de documentação** segura
- ✅ **Rastreabilidade:** Commit com refs para issues
- ⏱️ **Tempo real:** ~5-10 minutos

---

## 🧹 FASE 2: Limpar Backlog GitHub

### Objetivo
Fechar as 5 issues do Sprint 6 que já estão implementadas.

### Contexto
- **Issues alvo:** #128, #129, #130, #131, #132
- **Estado atual:** Abertas (marcadas como blocker/enhancement)
- **Estado desejado:** Fechadas com label `already-implemented`

### Passos Detalhados

#### 2.1 Preparar Ambiente
```powershell
# Abrir guia de instruções
code CLOSE_ISSUES_INSTRUCTIONS.md

# Abrir repositório GitHub em nova aba
start https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues
```

**Checkpoint:** Guia aberto + Issues visíveis no browser ✅

---

#### 2.2 Fechar Issue #129 (DataTable cellRenderer)

**URL:** `https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/129`

**Ações:**
1. Acessar URL da issue
2. Clicar em "Add a comment"
3. Colar comentário do guia (seção Issue #129)
4. Clicar em "Comment"
5. Adicionar label `already-implemented` (se disponível)
6. Clicar em "Close issue"

**Comentário a usar:**
```markdown
✅ **Esta funcionalidade já está implementada.**

### Evidências de Implementação

**Interface TypeScript:**
- Arquivo: `packages/design-system/src/components/DataTable/DataTable.tsx`
- Linha 49: `cellRenderer?: Record<string, CellRenderer>;`
- Linhas 173-177: Lógica de renderização prioriza `cellRenderer` → `column.render` → valor raw

**Story Demonstrando Uso:**
- Arquivo: `domains/storybook/src/stories/DataTable.stories.tsx`
- Story: `CellRendererExample` (linhas 153-198)
- Exemplo real: Renderiza Badge e Progress inline em células

**Como usar:**
```typescript
<DataTable
  data={data}
  columns={columns}
  cellRenderer={{
    status: (value) => <Badge variant="success">{value}</Badge>,
    progresso: (value) => <Progress value={value} height="12px" />
  }}
/>
```

**Relatório completo:** Ver `AUDIT_SPRINT6_FALSE_POSITIVES.md`

Fechando como `already-implemented`.
```

**Checkpoint:** Issue #129 fechada ✅

---

#### 2.3 Fechar Issue #132 (Progress customHeight)

**URL:** `https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/132`

**Repetir processo anterior com comentário específico:**
```markdown
✅ **Esta funcionalidade já está implementada.**

### Evidências de Implementação

**Interface TypeScript:**
- Arquivo: `packages/design-system/src/components/Progress/Progress.tsx`
- Linha 23: `height?: string;`
- Linha 142: Aplicação condicional via `style={height ? { height } : undefined}`

**Uso validado:**
- Story: `DataTable.stories.tsx` linha 168 usa `height="12px"`
- Build: ✅ Passa sem erros TypeScript

**Como usar:**
```typescript
<Progress value={75} height="8px" />
<Progress value={50} height="20px" />
```

**Relatório completo:** Ver `AUDIT_SPRINT6_FALSE_POSITIVES.md`

Fechando como `already-implemented`.
```

**Checkpoint:** Issue #132 fechada ✅

---

#### 2.4 Fechar Issue #131 (Badge customColor)

**URL:** `https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/131`

**Checkpoint:** Issue #131 fechada ✅

---

#### 2.5 Fechar Issue #130 (StatsCard customIcon)

**URL:** `https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/130`

**Checkpoint:** Issue #130 fechada ✅

---

#### 2.6 Fechar Issue #128 (ActionButtons icons)

**URL:** `https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/128`

**Checkpoint:** Issue #128 fechada ✅

---

#### 2.7 Validar Limpeza Completa
```powershell
# Filtrar issues Sprint 6
start "https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues?q=is%3Aissue+label%3Asprint-6+label%3Apainel-inicial"
```

**Validações:**
- [ ] Todas 5 issues aparecem como "Closed"
- [ ] Label `already-implemented` visível (se aplicado)
- [ ] Comentários com evidências aparecem

**Checkpoint:** Backlog Sprint 6 limpo ✅

---

### 🎯 Resultado da Fase 2
- ✅ **5 issues fechadas** (100% do backlog falso)
- ✅ **Documentação inline** em cada issue
- ✅ **Rastreabilidade:** Links para código + relatório
- ⏱️ **Tempo real:** ~10-15 minutos

---

## ⚙️ FASE 3: Automatizar Prevenção

### Objetivo
Criar script `verify-component-prop.mjs` para prevenir novos falsos positivos.

### Contexto
- **Problema:** Issues criadas sem verificar código existente
- **Solução:** Script que detecta props em <2 segundos
- **Uso:** `pnpm verify-prop ComponentName propName`

### Passos Detalhados

#### 3.1 Criar Estrutura de Diretórios
```powershell
# Criar pasta scripts se não existir
New-Item -ItemType Directory -Force -Path "scripts"

# Validar criação
Test-Path "scripts"
# Output esperado: True
```

**Checkpoint:** Pasta `scripts/` existe ✅

---

#### 3.2 Criar Script de Verificação
```powershell
# Criar arquivo
New-Item -ItemType File -Force -Path "scripts/verify-component-prop.mjs"
```

**Conteúdo do arquivo:**
```javascript
#!/usr/bin/env node
/**
 * Verifica se prop existe em componente antes de criar issue
 * 
 * Uso:
 *   pnpm verify-prop DataTable cellRenderer
 *   pnpm verify-prop Badge customColor
 * 
 * Exit codes:
 *   0 - Sucesso (prop existe ou não existe, mensagem clara)
 *   1 - Erro (arquivo não encontrado, interface não encontrada)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cores para output (Windows compatible)
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

// Parse argumentos
const args = process.argv.slice(2);

if (args.length < 2) {
  log('❌ Uso incorreto', 'red');
  log('\nUso: pnpm verify-prop <ComponentName> <propName>', 'yellow');
  log('Exemplo: pnpm verify-prop DataTable cellRenderer\n', 'gray');
  process.exit(1);
}

const [componentName, propName] = args;

// 1. Construir caminho do componente
const componentPath = path.join(
  __dirname,
  '..',
  'packages',
  'design-system',
  'src',
  'components',
  componentName,
  `${componentName}.tsx`
);

// 2. Verificar se arquivo existe
if (!fs.existsSync(componentPath)) {
  log(`❌ Componente '${componentName}' não encontrado`, 'red');
  log(`\n📁 Caminho esperado: ${componentPath}`, 'gray');
  log('\n💡 Verifique o nome do componente (case-sensitive)\n', 'yellow');
  process.exit(1);
}

// 3. Ler conteúdo do arquivo
const content = fs.readFileSync(componentPath, 'utf8');

// 4. Procurar interface Props
const propsInterfaceRegex = /(?:interface|type)\s+(\w+Props)\s*=?\s*{([^}]+)}/gs;
const matches = [...content.matchAll(propsInterfaceRegex)];

if (matches.length === 0) {
  log(`❌ Interface Props não encontrada em ${componentName}.tsx`, 'red');
  log('\n💡 Verifique se o componente tem interface tipada\n', 'yellow');
  process.exit(1);
}

// 5. Verificar se prop existe em alguma interface
let propFound = false;
let interfaceName = '';
let propLine = -1;

for (const match of matches) {
  const [, name, propsContent] = match;
  if (propsContent.includes(`${propName}?:`) || propsContent.includes(`${propName}:`)) {
    propFound = true;
    interfaceName = name;
    
    // Encontrar número da linha
    const lines = content.split('\n');
    propLine = lines.findIndex(line => 
      (line.includes(`${propName}?:`) || line.includes(`${propName}:`)) &&
      !line.trim().startsWith('//')
    ) + 1;
    
    break;
  }
}

// 6. Reportar resultado
if (propFound) {
  log(`✅ Prop '${propName}' JÁ EXISTE em ${componentName}`, 'green');
  log(`\n📁 Arquivo: ${componentPath}`, 'cyan');
  log(`📍 Linha: ${propLine}`, 'cyan');
  log(`🔖 Interface: ${interfaceName}`, 'cyan');
  
  log('\n💡 Próximos passos:', 'yellow');
  log('   1. Verificar se há story demonstrando uso', 'gray');
  log('   2. Se falta documentação, criar issue com label "documentation-needed"', 'gray');
  log('   3. Se comportamento incorreto, criar issue com label "bug"\n', 'gray');
  
  process.exit(0);
} else {
  log(`❌ Prop '${propName}' NÃO EXISTE em ${componentName}`, 'red');
  log(`\n✅ Issue válida - pode prosseguir com implementação`, 'green');
  log('\n💡 Lembre-se de:', 'yellow');
  log('   1. Adicionar prop à interface TypeScript', 'gray');
  log('   2. Implementar lógica de aplicação', 'gray');
  log('   3. Criar story demonstrando uso', 'gray');
  log('   4. Atualizar testes (se aplicável)\n', 'gray');
  
  process.exit(0);
}
```

**Checkpoint:** Script criado ✅

---

#### 3.3 Tornar Script Executável
```powershell
# No Windows, não precisa chmod, mas validar que arquivo existe
Test-Path "scripts/verify-component-prop.mjs"
# Output esperado: True

# Validar sintaxe Node.js (se Node está instalado)
node --check scripts/verify-component-prop.mjs
# Se sem erros, não retorna nada
```

**Checkpoint:** Script sintaticamente válido ✅

---

#### 3.4 Adicionar Script ao package.json
```powershell
# Abrir package.json
code package.json
```

**Adicionar na seção `scripts`:**
```json
{
  "scripts": {
    // ... scripts existentes
    "verify-prop": "node scripts/verify-component-prop.mjs"
  }
}
```

**Checkpoint:** Script registrado no package.json ✅

---

#### 3.5 Testar Script com Caso Real
```powershell
# Caso 1: Prop que EXISTE (DataTable cellRenderer)
pnpm verify-prop DataTable cellRenderer
```

**Output esperado:**
```
✅ Prop 'cellRenderer' JÁ EXISTE em DataTable

📁 Arquivo: packages/design-system/src/components/DataTable/DataTable.tsx
📍 Linha: 49
🔖 Interface: DataTableProps

💡 Próximos passos:
   1. Verificar se há story demonstrando uso
   2. Se falta documentação, criar issue com label "documentation-needed"
   3. Se comportamento incorreto, criar issue com label "bug"
```

**Checkpoint:** Script detecta prop existente ✅

---

```powershell
# Caso 2: Prop que NÃO EXISTE (Badge fakeProperty)
pnpm verify-prop Badge fakeProperty
```

**Output esperado:**
```
❌ Prop 'fakeProperty' NÃO EXISTE em Badge

✅ Issue válida - pode prosseguir com implementação

💡 Lembre-se de:
   1. Adicionar prop à interface TypeScript
   2. Implementar lógica de aplicação
   3. Criar story demonstrando uso
   4. Atualizar testes (se aplicável)
```

**Checkpoint:** Script detecta ausência de prop ✅

---

```powershell
# Caso 3: Componente inexistente
pnpm verify-prop FakeComponent someProp
```

**Output esperado:**
```
❌ Componente 'FakeComponent' não encontrado

📁 Caminho esperado: packages/design-system/src/components/FakeComponent/FakeComponent.tsx

💡 Verifique o nome do componente (case-sensitive)
```

**Checkpoint:** Script trata erros gracefully ✅

---

#### 3.6 Commit do Script
```powershell
# Stage dos arquivos
git add scripts/verify-component-prop.mjs
git add package.json

# Commit
git commit -m "feat: script verificação de props existentes

- Previne criação de issues para props já implementadas
- Uso: pnpm verify-prop ComponentName propName
- Detecta props em <2 segundos via análise de interfaces TypeScript
- Outputs coloridos para Windows/Unix
- Trata erros: componente não encontrado, interface ausente

Exemplo:
  pnpm verify-prop DataTable cellRenderer
  # ✅ Prop 'cellRenderer' JÁ EXISTE em DataTable

Refs: COMPONENT_STRATEGY_PIVOT.md (Fase 3)"

# Push
git push origin consolidate-pr125-features
```

**Checkpoint:** Script versionado no GitHub ✅

---

### 🎯 Resultado da Fase 3
- ✅ **Script operacional** (`pnpm verify-prop`)
- ✅ **3 casos de teste** validados
- ✅ **Documentação inline** no código
- ✅ **Prevenção automatizada** de falsos positivos
- ⏱️ **Tempo real:** ~45-60 minutos

---

## 📚 BÔNUS: Atualizar CONTRIBUTING.md

### Objetivo
Documentar novo workflow de verificação antes de criar issues.

### Passos Detalhados

#### 4.1 Adicionar Seção ao CONTRIBUTING.md
```powershell
# Abrir arquivo (ou criar se não existir)
if (!(Test-Path "CONTRIBUTING.md")) {
  New-Item -ItemType File -Path "CONTRIBUTING.md"
}
code CONTRIBUTING.md
```

**Adicionar seção:**
```markdown
## ✅ Antes de Criar Issues de Componentes

### Verificar se Prop Já Existe

Antes de criar uma issue solicitando nova prop em componente:

1. **Execute o script de verificação:**
   ```bash
   pnpm verify-prop <ComponentName> <propName>
   ```

2. **Interprete o resultado:**
   - ✅ **Prop já existe:** Não criar issue de implementação
     - Se falta documentação → criar issue com label `documentation-needed`
     - Se comportamento incorreto → criar issue com label `bug`
   
   - ❌ **Prop não existe:** Issue válida
     - Criar issue com label `ds-enhancement`
     - Seguir template de issue padrão

### Exemplo

```bash
# Verificar se DataTable tem prop cellRenderer
pnpm verify-prop DataTable cellRenderer

# Output: ✅ Prop 'cellRenderer' JÁ EXISTE em DataTable
# Ação: NÃO criar issue de implementação
```

### Checklist Pré-Issue

- [ ] Executei `pnpm verify-prop ComponentName propName`
- [ ] Se prop existe: criei issue de documentação (não implementação)
- [ ] Se prop não existe: segui template padrão de enhancement
- [ ] Testei localmente no Storybook (`pnpm dev:storybook`)
```

**Checkpoint:** CONTRIBUTING.md atualizado ✅

---

#### 4.2 Commit da Atualização
```powershell
git add CONTRIBUTING.md
git commit -m "docs: adicionar workflow de verificação pré-issue

- Documentar uso do script verify-prop
- Checklist obrigatório antes de criar issues de componentes
- Diferenciação: implementação vs documentação vs bug

Refs: COMPONENT_STRATEGY_PIVOT.md"

git push origin consolidate-pr125-features
```

**Checkpoint:** Documentação versionada ✅

---

## 📊 Validação Final

### Checklist de Conclusão

#### Fase 1: Preservar Trabalho
- [ ] 3 documentos commitados
- [ ] Push realizado com sucesso
- [ ] Arquivos visíveis no GitHub

#### Fase 2: Limpar Backlog
- [ ] Issue #128 fechada
- [ ] Issue #129 fechada
- [ ] Issue #130 fechada
- [ ] Issue #131 fechada
- [ ] Issue #132 fechada
- [ ] Comentários com evidências em todas

#### Fase 3: Automatizar
- [ ] Script `verify-component-prop.mjs` criado
- [ ] Registrado em `package.json`
- [ ] 3 casos de teste validados
- [ ] CONTRIBUTING.md atualizado

### Métricas de Sucesso

```powershell
# Validar estrutura final
Get-ChildItem -Recurse -Include "*.md","*.mjs" | Select-Object Name, Length

# Validar commits
git log --oneline --graph -n 5

# Validar issues fechadas (manual no browser)
start "https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues?q=is%3Aclosed+label%3Asprint-6"
```

**Resultados esperados:**
- ✅ **4-5 commits** na branch `consolidate-pr125-features`
- ✅ **5 issues fechadas** no GitHub
- ✅ **1 script** operacional
- ✅ **35KB+** de documentação gerada

---

## 🎯 Próximos Passos (Após Execução)

### Imediato
1. **Criar PR:** `consolidate-pr125-features` → `main`
2. **Revisão:** Solicitar review do time (se aplicável)
3. **Merge:** Após aprovação, merge para main

### Esta Semana
4. **Comunicar:** Enviar email/Slack sobre nova estratégia
5. **Treinar:** Demonstrar script `verify-prop` para time
6. **Monitorar:** Acompanhar taxa de falsos positivos (meta < 5%)

### Este Mês
7. **Expandir:** Criar "Common Patterns" no Storybook
8. **Automatizar:** Integrar `verify-prop` no pre-commit hook
9. **Medir:** Coletar feedback sobre discoverability

---

## 📈 KPIs de Acompanhamento

### Métricas Semanais
- Taxa de falsos positivos: `(issues fechadas como already-implemented) / (issues totais)`
- Uso do script: `git log --grep="verify-prop" --oneline | wc -l`
- Tempo médio de issue: `(data fechamento - data abertura)` para issues do tipo component

### Meta de Sucesso (30 dias)
- ✅ Taxa de falsos positivos < 5%
- ✅ 100% de issues de componente com evidência de verificação
- ✅ Tempo médio de resolução < 2 dias

---

## 🔧 Troubleshooting

### Problema: Script não executa
```powershell
# Validar Node.js instalado
node --version
# Esperado: v22.21.1 ou superior

# Validar sintaxe
node --check scripts/verify-component-prop.mjs
```

### Problema: Git push falha
```powershell
# Verificar autenticação
git remote -v

# Re-autenticar se necessário
git config credential.helper store
git push origin consolidate-pr125-features
```

### Problema: Issue não fecha no GitHub
- **Causa:** Sem permissão de escrita
- **Solução:** Solicitar permissão ao owner do repositório

---

## ✅ Conclusão

Este plano garante:
1. **Zero perda de trabalho** (commit first)
2. **Backlog limpo** (5 issues fechadas)
3. **Prevenção automatizada** (script operacional)
4. **Documentação atualizada** (CONTRIBUTING.md)

**Tempo total estimado:** 1h 15min - 1h 45min  
**Risco:** Baixo (passos incrementais com checkpoints)  
**ROI:** Alto (105 min economizados apenas no Sprint 6)

---

**Assinatura Digital:**  
DevOps Agent - Planejamento Estratégico e Execução Sistemática  
*"Plan the work, work the plan, validate each step."*
