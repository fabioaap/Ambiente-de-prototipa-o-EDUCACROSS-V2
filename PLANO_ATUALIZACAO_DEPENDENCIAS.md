# Plano de Atualização de Dependências

**Versão**: 1.0  
**Data**: 18 de dezembro de 2025  
**Status**: Aguardando execução  
**Responsável**: DevOps Agent  

---

## 📋 Contexto

Após auditoria de dependências realizada em 17/12/2025, foram identificadas 4 categorias de atualizações pendentes:

1. **@sentry/nextjs** (10.28.0 → 10.31.0) - Patch releases, baixo risco
2. **@modelcontextprotocol/sdk** (1.0.0 → 1.25.1) - Minor releases, médio risco, requer teste de breaking
3. **TypeScript ESLint** (8.14.0 → 8.50.0) - Patches, baixo risco
4. **Storybook** (8.x → 10.x) - MAJOR upgrade, alto risco, requer planejamento dedicado

### Mapeamento de Uso

| Dependência | Local | Versão Atual | Versão Alvo |
|-------------|-------|--------------|-------------|
| @sentry/nextjs | workspace raiz | ^10.28.0 | ^10.31.0 |
| @modelcontextprotocol/sdk | workspace raiz | ^1.0.0 | ^1.25.1 |
| @typescript-eslint/* | packages/eslint-config | ^8.14.0 | ^8.50.0 |
| @storybook/* | domains/storybook | ^8.4.7 / ^8.6.14 | ^10.x (futuro) |
| @storybook/* | packages/design-system | ^8.4.7 / ^8.6.14 | ^10.x (futuro) |

### Análise de Risco

- ✅ **Baixo risco**: Sentry (3 patches), TypeScript ESLint (36 patches, mesma versão major)
- ⚠️ **Médio risco**: MCP SDK (25 minor releases, possível breaking)
- ⛔ **Alto risco**: Storybook (MAJOR 8→10, versões misturadas, addons, visual regression)

---

## 🎯 Objetivos

1. Manter dependências atualizadas para segurança e performance
2. Eliminar versões misturadas (especialmente Storybook 8.4.7 vs 8.6.14)
3. Testar breaking changes de forma controlada antes de aplicar em produção
4. Documentar decisões e validações para rastreabilidade futura

---

## 📦 ETAPA 1: Atualização Sentry

**Prioridade**: Alta  
**Risco**: Baixo  
**Tempo estimado**: 5 minutos  
**Bloqueadores**: Nenhum  

### 1.1 Contexto

O Sentry está no workspace raiz e monitora erros em Next.js. Atualização de 3 patch releases (10.28 → 10.31) é conservadora e focada em bugfixes.

### 1.2 Comandos

```bash
# Navegar para workspace raiz
cd c:\Users\Educacross\Documents\Ambiente-de-prototipa-o-EDUCACROSS-V2

# Atualizar Sentry
pnpm add @sentry/nextjs@^10.31.0

# Instalar dependências
pnpm install

# Validar build
pnpm build
```

### 1.3 Validações

- [ ] `pnpm install` completa sem erros de peer dependency
- [ ] `pnpm build` executa sem erros de TypeScript ou build
- [ ] Logs não mostram warnings de deprecação do Sentry
- [ ] Arquivos modificados: `package.json`, `pnpm-lock.yaml`

### 1.4 Commit

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore(deps): atualizar @sentry/nextjs 10.28.0 → 10.31.0

- Atualização de patch releases (bugfixes e melhorias)
- Validado: build completo sem erros
- Impacto: zero breaking changes"
git push origin main
```

### 1.5 Rollback (se necessário)

```bash
pnpm add @sentry/nextjs@^10.28.0
pnpm install
git checkout -- package.json pnpm-lock.yaml
```

---

## 🔬 ETAPA 2: MCP SDK (com teste de breaking)

**Prioridade**: Alta  
**Risco**: Médio  
**Tempo estimado**: 15 minutos  
**Bloqueadores**: Etapa 1 concluída  

### 2.1 Contexto

O MCP SDK está no workspace raiz (uso geral para integrações futuras).

Salto de **1.0.0 → 1.25.1** (25 minor releases) pode conter breaking changes não documentados ou mudanças em APIs experimentais.

⚠️ **NOTA**: O subsistema code-to-figma foi removido do monorepo, então esta atualização agora afeta apenas o workspace raiz.

### 2.2 Estratégia

1. Criar branch de teste isolado
2. Atualizar no workspace raiz
3. Inspecionar changelog oficial
4. Verificar se há uso ativo do SDK no código
5. Validar build e type-check
6. Decidir: merge ou reverter

### 2.3 Comandos

```bash
# Criar branch de teste
git checkout -b test/mcp-sdk-update

# Atualizar workspace raiz
pnpm add @modelcontextprotocol/sdk@latest

# Instalar
pnpm install

# Inspecionar changelog
# URL: https://github.com/modelcontextprotocol/typescript-sdk/releases
```

### 2.4 Análise de Breaking Changes

```bash
# Buscar imports no código (workspace raiz e apps/packages)
grep -r "from '@modelcontextprotocol/sdk'" apps/ packages/ domains/

# Buscar exports/tipos usados
grep -r "import {" apps/ packages/ domains/ | grep modelcontextprotocol
```

**Pontos críticos para verificar**:
- Mudanças em `Server` class constructor
- Alterações em tool registration API
- Novos tipos obrigatórios em tool definitions
- Deprecation de métodos antigos

### 2.5 Validações

```bash
# Build completo
pnpm build

# Type check global
pnpm type-check

# Lint (verificar se há warnings de deprecação)
pnpm lint
```

**Checklist**:
- [ ] Build sem erros TypeScript
- [ ] Type-check passa sem erros
- [ ] Lint sem novos warnings
- [ ] Nenhum import órfão do SDK no código

### 2.6 Decisão

**✅ Se tudo OK (merge)**:
```bash
git checkout main
git merge test/mcp-sdk-update
git branch -d test/mcp-sdk-update

git add -A
git commit -m "feat(deps): atualizar @modelcontextprotocol/sdk 1.0.0 → 1.25.1

- Atualizado em workspace raiz
- Validado: build + type-check + lint passando
- Nota: code-to-figma removido do monorepo
- Breaking changes: nenhum detectado"
git push origin main
```

**❌ Se breaking detectado (reverter + documentar)**:
```bash
git checkout main
git branch -D test/mcp-sdk-update

# Criar issue no GitHub
# Título: "[Bloqueio] MCP SDK 1.0→1.25 contém breaking changes"
# Labels: dependencies, blocked
# Descrever: incompatibilidades encontradas, custo de adaptação, decisão
```

### 2.7 Rollback

```bash
# Se já fez merge e detectou problemas
git revert HEAD
pnpm install
pnpm build
```

---

## 🔧 ETAPA 3: TypeScript ESLint Patches

**Prioridade**: Média  
**Risco**: Baixo  
**Tempo estimado**: 8 minutos  
**Bloqueadores**: Etapas 1 e 2 concluídas  

### 3.1 Contexto

ESLint TypeScript está em `packages/eslint-config`: **v8.14.0** (usado no monorepo) → atualizar para **v8.50.0**

**Decisão**: atualizar 36 patch releases, baixo risco.

### 3.2 Comandos

```bash
# Atualizar no workspace eslint-config
pnpm --filter @prototipo/eslint-config add -D \
  @typescript-eslint/eslint-plugin@^8.50.0 \
  @typescript-eslint/parser@^8.50.0

# Instalar
pnpm install

# Rodar lint em todo monorepo
pnpm lint
```

### 3.3 Validações

- [ ] `pnpm lint` executa sem novos erros
- [ ] Nenhuma nova regra quebra código existente
- [ ] Build completo sem warnings ESLint
- [ ] `pnpm type-check` passa sem erros

**Verificar logs**:
- Novos warnings podem indicar regras mais rigorosas
- Se aparecerem, avaliar: fixar código ou ajustar config

### 3.4 Ajuste de Regras (se necessário)

Se o lint quebrar por novas regras:

```typescript
// packages/eslint-config/library.js ou base.js
module.exports = {
  rules: {
    // Desabilitar nova regra temporariamente
    '@typescript-eslint/nova-regra-problematica': 'warn', // ou 'off'
  },
};
```

### 3.5 Commit

```bash
git add packages/eslint-config/package.json pnpm-lock.yaml

git commit -m "chore(lint): atualizar TypeScript ESLint 8.14.0 → 8.50.0

- Atualizado @typescript-eslint/eslint-plugin e parser
- Escopo: packages/eslint-config
- Validado: pnpm lint sem novos erros
- Impacto: 36 patch releases aplicadas"

git push origin main
```

### 3.6 Rollback

```bash
pnpm --filter @prototipo/eslint-config add -D \
  @typescript-eslint/eslint-plugin@^8.14.0 \
  @typescript-eslint/parser@^8.14.0

pnpm install
git checkout -- packages/eslint-config/package.json pnpm-lock.yaml
```

---

## 🎨 ETAPA 4: Storybook 8.x → 10.x (MAJOR)

**Prioridade**: Baixa  
**Risco**: Alto  
**Tempo estimado**: 1-2 horas  
**Bloqueadores**: Requer sessão dedicada em sprint futuro  
**Status**: 🚧 PLANEJAMENTO - NÃO EXECUTAR AGORA  

### 4.0 Estado Real Descoberto (18/12/2025)

**Auditoria revelou versões misturadas em 2 locais**:

| Local | Packages | Versões Declaradas | Problema |
|-------|----------|-------------------|----------|
| **domains/storybook** | 11 packages | `^8.4.7` (maioria)<br>`^8.6.14` (a11y) | ⚠️ Mistura |
| **packages/design-system** | 2 packages | `^8.4.7` (react)<br>`^8.6.14` (types) | ⚠️ Mistura |

**Versões instaladas em node_modules** (via pnpm resolution):
- Maioria: **8.6.14** (pnpm escolheu a mais recente que satisfaz `^8.4.7`)
- Declarado: Mix de 8.4.7 e 8.6.14 nos package.json

**CVE ATIVO**: CVE-2025-68429 (HIGH) - Storybook 8.0.0 até 8.6.14 vaza `.env` em builds publicados.  
**Versão segura**: 8.6.15+

### 4.1 Contexto e Desafio

**Por quê versões misturadas**:
1. Projeto criado com Storybook 8.4.7
2. Addon a11y instalado depois → npm tinha 8.6.14 disponível
3. pnpm resolveu `^8.4.7` → 8.6.14 (satisfaz semantic versioning)
4. Resultado: declaração inconsistente, runtime misto

**Desafio**: upgrade MAJOR (8→10) em cima de base inconsistente = alto risco de regressão visual e funcional.

### 4.2 Pré-requisitos (antes de começar)

#### 4.2.0 Correção Urgente do CVE (FAZER PRIMEIRO)

⚠️ **ATENÇÃO**: Antes de qualquer upgrade, corrigir CVE-2025-68429.

```bash
# Atualizar para 8.6.15 (versão segura) nos 2 locais:
links@^8.6.14 \
  # ... [resto omitido por estar DEPRECATED]
```

**Validação pré-upgrade** (após 4.2.0 com 8.6.15)5

# 3. Instalar e validar
pnpm install
pnpm dev:hub  # Testar se inicia sem erros
pnpm build:hub  # Testar build

# 4. Commit imediato
git add -A
git commit -m "security(storybook): CVE-2025-68429 - unificar em 8.6.15

- Atualizado domains/storybook: 8.4.7/8.6.14 → 8.6.15
- Atualizado packages/design-system: 8.4.7/8.6.14 → 8.6.15
- Corrige leak de .env em builds publicados (HIGH severity)
- Versões agora unificadas e segu (`pnpm dev:hub`)
- [ ] Todas as stories renderizam corretamente (testar manualmente)
- [ ] Addon a11y funciona (painel Accessibility aparece)
- [ ] Interaction tests rodam via `pnpm test-storybook`
- [ ] Audit confirma CVE resolvido: `pnpm audit --audit-level=high
**Tempo estimado**: 15 minutos  
**Impacto**: Zero breaking (patch release)  
**Urgência**: ALTA (CVE público há 7 dias)

#### 4.2.1 Unificar em versão intermediária (DEPRECATED - pular para 4.2.0)

~~Atualizar TODAS para 8.6.14 (última 8.x antes do CVE)~~ → **PULAR ESTA ETAPA**, ir direto para 8.6.15.

```bash
# DEPRECATED - NÃO EXECUTAR (8.6.14 é vulnerável)
# Use 4.2.0 acima (8.6.15) ao invés disto

pnpm --filter storybook add -D \
  @storybook/addon-essentials@^8.6.14 \
  @storybook/addon-interactions@^8.6.14 \
  @storybook/addon-links@^8.6.14 \
  @storybook/addon-onboarding@^8.6.14 \
  @storybook/blocks@^8.6.14 \
  @storybook/react@^8.6.14 \
  @storybook/react-vite@^8.6.14 \
  @storybook/test@^8.6.14 \
  storybook@^8.6.14

pnpm --filter @prototipo/design-system add -D \
  @storybook/react@^8.6.14 \
  @storybook/types@^8.6.14

pnpm install
pnpm dev:hub  # Testar se tudo funciona na 8.6.14 unificada
```

**Validação pré-upgrade**:
- [ ] Dev server inicia sem erros
- [ ] Todas as stories renderizam corretamente
- [ ] Addon a11y funciona
- [ ] Interaction tests rodam via `pnpm test-storybook`

#### 4.2.2 Documentar estado atual

```bash
# Criar backup de stories críticas
mkdir -p .storybook-backup
cp -r domains/storybook/src/stories/*.stories.tsx .storybook-backup/
cp domains/storybook/.storybook/main.ts .storybook-backup/
cp domains/storybook/.storybook/preview.ts .storybook-backup/

# Tirar screenshots das stories principais
# (manual ou via Chromatic)
```

#### 4.2.3 Ler documentação oficial

**Links obrigatórios**:
- Migration guide: https://storybook.js.org/docs/migration-guide
- Breaking changes 9.0: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#from-version-8x-to-90
- Breaking changes 10.0: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#from-version-9x-to-100

**Pontos críticos documentados**:
- Mudanças em framework API (React)
- Alterações em addons (a11y, interactions)
- Nova estrutura de configuração
- Deprecação de decorators/parameters antigos

### 4.3 Estratégia de Upgrade

#### 4.3.1 Criar branch isolado

```bash
git checkout -b feat/storybook-10-upgrade
```

#### 4.3.2 Atualizar via CLI oficial

```bash
# Storybook tem CLI de upgrade automático
pnpm dlx storybook@latest upgrade

# CLI vai:
# 1. Detectar versão atual
# 2. Aplicar codemods automáticos
# 3. Atualizar package.json
# 4. Executar migrations
```

**⚠️ Importante**: CLI pode perguntar confirmações, ler com atenção antes de aceitar.

#### 4.3.3 Atualizar packages incompatíveis manualmente

```bash
# Verificar compatibilidade de addons auxiliares
pnpm outdated @storybook/test-runner
pnpm outdated @chromatic-com/storybook

# Atualizar se necessário
pnpm --filter storybook add -D @storybook/test-runner@latest
pnpm --filter storybook add -D @chromatic-com/storybook@latest
```

#### 4.3.4 Ajustar configurações (se necessário)

Possíveis mudanças em `.storybook/main.ts`:

```typescript
// ANTES (v8)
export default {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
};

// DEPOIS (v10 - exemplo hipotético, verificar docs)
export default {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
};
```

#### 4.3.5 Atualizar imports em stories

Verificar breaking changes em imports:

```bash
# Buscar imports antigos
grep -r "@storybook/react" domains/storybook/src/stories/
grep -r "@storybook/testing-library" domains/storybook/src/stories/

# Exemplo de mudança (hipotético)
# ANTES: import { Meta, StoryObj } from '@storybook/react';
# DEPOIS: import type { Meta, StoryObj } from '@storybook/react';
```

### 4.4 Validações (critical path)

#### 4.4.1 Dev server

```bash
pnpm dev:hub
```

**Checklist**:
- [ ] Server inicia sem erros (porta 6006)
- [ ] Interface carrega sem crash
- [ ] Sidebar mostra todas as stories
- [ ] Stories individuais renderizam corretamente

#### 4.4.2 Build

```bash
pnpm build:hub
```

**Checklist**:
- [ ] Build completa sem erros
- [ ] Saída em `domains/storybook/storybook-static`
- [ ] HTML estático funcional (abrir index.html no browser)

#### 4.4.3 Visual regression

**Opção 1: Chromatic (automático)**
```bash
# Se tiver Chromatic configurado
pnpm chromatic --project-token=<token>
```

**Opção 2: Manual**
- Abrir stories críticas (DataTable, Badge, StatsCard, Button)
- Comparar com screenshots do backup
- Verificar cores, spacing, tipografia, estados interativos

#### 4.4.4 Interaction tests

```bash
pnpm --filter storybook test-storybook
```

**Checklist**:
- [ ] Todos os testes passam
- [ ] Coverage mantém thresholds
- [ ] Sem erros de timeout ou seletores quebrados

#### 4.4.5 Addon a11y

- Abrir story com addon a11y ativo
- Verificar painel "Accessibility" aparece
- Rodar scan (botão "Run tests")
- Confirmar que WCAG 2.1 AA checks funcionam

### 4.5 Riscos Conhecidos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Breaking changes em addons | Alta | Alto | Ler changelogs, testar addon a11y primeiro |
| Mudanças em framework API | Média | Alto | Seguir migration guide oficial |
| Incompatibilidade com Vite 6 | Baixa | Médio | Storybook 10 suporta Vite 6, mas testar |
| Stories quebram por decorator changes | Média | Médio | Backup stories, testar uma por uma |
| Visual regression não detectada | Média | Alto | Screenshots manuais + Chromatic |
| Performance degradation | Baixa | Baixo | Medir tempo de build antes/depois |

### 4.6 Rollback Plan

#### Opção A: Reverter branch (recomendado)

```bash
git checkout main
git branch -D feat/storybook-10-upgrade

# Estado volta para Storybook 8.6.14 unificado
```

#### Opção B: Reverter commits específicos

```bash
git log --oneline  # Identificar commits do upgrade
git revert <commit-hash-1> <commit-hash-2>
pnpm install
pnpm dev:hub
```

### 4.7 Decisão Executiva

**Reavaliar após 1 hora de trabalho**:

- ✅ **Se >80% stories OK** → continuar e fixar edge cases
- ⚠️ **Se 50-80% stories OK** → pausar, abrir issue com problemas, agendar sessão 2
- ❌ **Se <50% stories OK** → rollback imediato, documentar blockers, avaliar manter 8.x

**Tempo máximo de tentativa**: 2 horas

### 4.8 Nota sobre subsistemas removidos

**ℹ️ INFORMAÇÃO**: O subsistema `code-to-figma` (figma-mcp-server + figma-sync-engine) foi removido do monorepo em 18/12/2025.

**Impacto no upgrade Storybook**:
- ✅ Não há mais conflito com Storybook 7.x legado
- ✅ Upgrade pode focar 100% em domains/storybook + packages/design-system
- ✅ Sem necessidade de compatibilidade com addons antigos

### 4.9 Commit Final (se sucesso)

```bash
git add -A
git commit -m "feat(storybook): atualizar 8.6.14 → 10.x

BREAKING CHANGES:
- Framework API atualizado para novo formato
- Addons migrados: a11y, interactions, essentials
- Stories ajustadas: [listar mudanças específicas]

Validações:
- ✅ Dev server: pnpm dev:hub funcional
- ✅ Build: pnpm build:hub completo
- ✅ Visual regression: 100% stories OK
- ✅ Interaction tests: todos passando
- **URGENTE** - Correção CVE Storybook (4.2.0): **15 minutos** (executar IMEDIATAMENTE)
- Etapas 1-3: **28 minutos** (baixa prioridade, pode adiar)
- Etapa 4 (upgrade 8→10)
Performance:
- Build time: [X]s antes → [Y]s depois
- Dev server start: [X]s antes → [Y]s depois

Escopo:
- domains/storybook: atualizado
- packages/design-system: atualizado"

git push origin feat/storybook-10-upgrade

# Criar PR para revisão
gh pr create --title "feat(storybook): atualizar 8.6.14 → 10.x" \
  --body "Ver commit message para detalhes completos" \
  --base main
```

---

## 📊 Timeline e Dependências

```mermaid
graph TD
    A[ETAPA 1: Sentry] -->|5min| B[ETAPA 2: MCP SDK]
    B -->|15min| C{Breaking Changes?}
    C -->|Não| D[ETAPA 3: TypeScript ESLint]
    C -->|Sim| E[Documentar + Avaliar]
    D -->|8min| F[Etapas 1-3 Concluídas]
    F -->|Sprint Futuro| G[ETAPA 4: Storybook Pre-req]
    G -->|30min| H[ETAPA 4: Storybook Upgrade]
    H -->|1-2h| I{Sucesso?}
    I -->|Sim| J[Deploy]
    I -->|Não| K[Rollback + Issue]
```

**Total estimado**:
- Etapas 1-3: **28 minutos** (execução imediata)
- Etapa 4: **2-2.5 horas** (sprint futuro, sessão dedicada)

---

## ✅ Critérios de Sucesso Global

### Para Etapas 1-3 (imediato)

- [ ] Zero erros de build: `pnpm build`
- [ ] Zero falhas de tipo: `pnpm type-check`
- [ ] Zero regressões de lint: `pnpm lint`
- [ ] Dev servers funcionais: `pnpm dev:studio` + `pnpm dev:admin`
- [ ] 3 commits limpos no histórico do Git
- [ ] Documentação de decisões (especialmente MCP SDK)

### Para Etapa 4 (futuro)

- [ ] 100% stories renderizando sem erros visuais
- [ ] 100% interaction tests passando
- [ ] Addon a11y funcional
- [ ] Build Storybook completo sem warnings críticos
- [ ] Performance mantida ou melhorada
- [ ] Branch mergeado ou rollback documentado

---

## � ETAPA 5: Dependências MAJOR (Breaking Changes)

**Prioridade**: Média (planejar antes de executar)  
**Risco**: ALTO (breaking changes confirmados)  
**Tempo estimado**: 2-3 horas (pesquisa + implementação + testes)  
**Bloqueadores**: ETAPA 4.2.0 (CVE Storybook) executada  

### 5.1 Contexto

Quatro dependências do workspace raiz possuem updates MAJOR disponíveis com breaking changes confirmados:

| Dependência | Atual | Latest | Salto | Risco | Uso no Projeto |
|-------------|-------|--------|-------|-------|----------------|
| **dotenv** | 16.6.1 | 17.2.3 | MAJOR | MÉDIO | Zero uso direto (apenas MCP SDK futuro) |
| **pino** | 9.14.0 | 10.1.0 | MAJOR | MÉDIO | Zero uso direto (apenas MCP SDK futuro) |
| **undici** | 6.22.0 | 7.16.0 | MAJOR | BAIXO | Transitiva (Node.js fetch), zero uso direto |
| **zod** | 3.25.76 | 4.2.1 | MAJOR | ALTO | Dependency do MCP SDK (peer dep) |

**Descoberta**: Em 18/12/2025 via `pnpm outdated`, após correção do CVE Storybook.

### 5.2 Análise de Impacto por Dependência

#### 5.2.1 dotenv (16 → 17)

**Breaking Changes Esperados** (baseado em padrão semver):
- Mudança no parsing de variáveis com espaços
- Alteração em prioridade de carregamento (`.env.local` vs `.env`)
- Remoção de métodos deprecated

**Uso no Projeto**:
- ❌ Nenhum `import` ou `require` direto encontrado no código
- ✅ Dependência declarada mas não utilizada ativamente
- 🔄 Possível uso futuro em MCP SDK (config de ambiente)

**Risco Real**: **BAIXO** (não usada hoje, atualizar pode prevenir breaking futuro)

**Ação Recomendada**: Atualizar para 17.x, testar se MCP SDK continua funcionando

---

#### 5.2.2 pino (9 → 10)

**Breaking Changes Esperados**:
- Mudança no formato de logs estruturados (JSON schema)
- Alteração em `pino.destination()` API
- Remoção de transports deprecated
- Novos tipos TypeScript obrigatórios

**Uso no Projeto**:
- ❌ Nenhum `import` ou `require` direto encontrado
- ✅ Dependência declarada mas não utilizada ativamente
- 🔄 Planejado para logging futuro (MCP SDK + monitoramento)

**Risco Real**: **BAIXO** (não usada hoje)

**Ação Recomendada**: Atualizar para 10.x, validar se API mudou (ler changelog antes)

---

#### 5.2.3 undici (6 → 7)

**Breaking Changes Esperados**:
- Mudanças em `fetch()` API (compatibilidade com Web Standards)
- Alteração em timeout behavior
- Novos headers obrigatórios
- Pool connection changes

**Uso no Projeto**:
- ❌ Nenhum uso direto no código
- ✅ Dependência **transitiva** do Node.js native `fetch`
- ⚠️ Next.js pode estar usando internamente

**Risco Real**: **MÉDIO** (pode causar regressão em chamadas HTTP do Next.js)

**Ação Recomendada**: Atualizar CAUTELOSAMENTE, testar todas as rotas de API e fetches

---

#### 5.2.4 zod (3 → 4) ⚠️ MAIOR RISCO

**Breaking Changes Confirmados** (zod 4.0 changelog):
- `z.string().uuid()` agora valida versão específica
- `z.object().strict()` tornou-se comportamento padrão
- `z.enum()` requer pelo menos 2 valores
- `.parse()` agora retorna erro diferente para tipos primitivos
- Mudanças em `.refine()` e `.superRefine()`

**Uso no Projeto**:
- ✅ **Dependency do @modelcontextprotocol/sdk 1.24.3**
- ✅ Declarado como `peer dependency` pelo MCP SDK
- ✅ Usado em `zod-to-json-schema` (transitiva)
- ❌ Zero uso direto no código do monorepo (só via MCP SDK)
- 📋 Planejado para validação de JSON imports (spec: `tasks.md` linha 149)

**Risco Real**: **ALTO** - MCP SDK pode quebrar se depender de comportamento v3

**Ação Recomendada**:
1. Verificar `package.json` do MCP SDK (compatibilidade com zod 4)
2. Se MCP SDK exige `zod ^3.x` → **NÃO atualizar** (conflito de peer dep)
3. Se MCP SDK aceita `zod ^4.x` → Atualizar e testar extensivamente

---

### 5.3 Estratégia de Execução

**Branch de teste**: `test/major-deps-upgrade`

```bash
# Criar branch isolada
git checkout -b test/major-deps-upgrade
```

#### 5.3.1 Fase 1: Pesquisa (30 min)

```bash
# Ler changelogs oficiais
# - dotenv: https://github.com/motdotla/dotenv/releases/tag/v17.0.0
# - pino: https://github.com/pinojs/pino/releases/tag/v10.0.0
# - undici: https://github.com/nodejs/undici/releases/tag/v7.0.0
# - zod: https://github.com/colinhacks/zod/releases/tag/v4.0.0

# Verificar compatibilidade MCP SDK com zod 4
pnpm view @modelcontextprotocol/sdk@latest peerDependencies
```

#### 5.3.2 Fase 2: Atualização Sequencial (1h)

**Ordem recomendada** (do menor para maior risco):

```bash
# 1. dotenv (baixo risco, não usada)
pnpm add dotenv@^17.2.3
pnpm install
pnpm build  # Validar se não quebrou

# 2. pino (baixo risco, não usada)
pnpm add pino@^10.1.0
pnpm install
pnpm build

# 3. undici (médio risco, transitiva)
pnpm add undici@^7.16.0
pnpm install
pnpm build
pnpm dev:studio  # Testar servidor Next.js
pnpm dev:hub     # Testar Storybook

# 4. zod (ALTO risco, MCP SDK dependency)
# ⚠️ EXECUTAR APENAS SE MCP SDK for compatível com zod 4
pnpm add zod@^4.2.1
pnpm install
pnpm build

# Validar MCP SDK (se houver uso ativo)
node -e "const sdk = require('@modelcontextprotocol/sdk'); console.log('MCP SDK OK');"
```

#### 5.3.3 Fase 3: Testes Extensivos (30 min)

```bash
# Build completo
pnpm build

# Type checking
pnpm type-check

# Linting
pnpm lint

# Testes de servidor (manual)
pnpm dev:studio  # Porta 3000 - testar navegação
pnpm dev:hub     # Porta 6006 - testar componentes

# Testes de API (se houver)
curl http://localhost:3000/api/dashboard/health
curl http://localhost:3000/api/dashboard/summary

# Validar logs (não deve ter erros de pino)
# Validar fetches (não deve ter erros de undici)
# Validar envs (não deve ter erros de dotenv)
```

#### 5.3.4 Fase 4: Decisão

**✅ Se TUDO passar sem erros**:
```bash
git add package.json pnpm-lock.yaml
git commit -m "feat(deps): atualizar dependências MAJOR (dotenv 17, pino 10, undici 7, zod 4)

- dotenv: 16.6.1 → 17.2.3 (zero uso direto, preventivo)
- pino: 9.14.0 → 10.1.0 (zero uso direto, preparação futura)
- undici: 6.22.0 → 7.16.0 (transitiva, validado em Next.js)
- zod: 3.25.76 → 4.2.1 (MCP SDK peer dep, validado)

Validações:
- Build: ✅ Sem erros TypeScript
- Type-check: ✅ Todos os tipos resolvidos
- Servidores: ✅ Studio + Hub funcionando
- APIs: ✅ Endpoints respondendo corretamente

Breaking changes: Nenhum impacto detectado (deps não usadas diretamente)

Refs: #<issue-number-se-houver>"

git checkout main
git merge test/major-deps-upgrade
git push origin main
git branch -d test/major-deps-upgrade
```

**⚠️ Se zod 4 quebrar MCP SDK** (provável):
```bash
# Reverter apenas zod
pnpm add zod@^3.25.76
pnpm install
pnpm build

# Commit parcial (sem zod 4)
git add package.json pnpm-lock.yaml
git commit -m "feat(deps): atualizar dotenv 17, pino 10, undici 7 (zod mantido em v3)

- dotenv: 16.6.1 → 17.2.3
- pino: 9.14.0 → 10.1.0
- undici: 6.22.0 → 7.16.0
- zod: MANTIDO em 3.25.76 (MCP SDK requer ^3.x)

Nota: zod 4 incompatível com @modelcontextprotocol/sdk@1.24.3"
```

**❌ Se múltiplas deps quebrarem**:
```bash
# Reverter tudo
git checkout main
git branch -D test/major-deps-upgrade

# Documentar no PLANO
# Adicionar seção "5.5 Bloqueios Descobertos"
# Listar incompatibilidades e custos de adaptação
```

---

### 5.4 Rollback

```bash
# Se já fez merge e detectou problemas
git revert HEAD
pnpm install
pnpm build
```

---

### 5.5 Checklist de Validação

- [ ] Changelogs lidos (dotenv, pino, undici, zod)
- [ ] Compatibilidade MCP SDK verificada (zod peer deps)
- [ ] Branch de teste criada
- [ ] dotenv 17.x atualizado e validado
- [ ] pino 10.x atualizado e validado
- [ ] undici 7.x atualizado e validado
- [ ] zod 4.x atualizado (ou mantido em v3 se incompatível)
- [ ] Build completo sem erros
- [ ] Type-check passando
- [ ] Lint sem warnings novos
- [ ] Servidores testados (Studio + Hub)
- [ ] APIs testadas (se houver)
- [ ] Commit + merge ou rollback documentado

---

## �📝 Tracking de Execução

### Status por Etapa

| Etapa | Status | Data Execução | Commit SHA | Notas |
|-------|--------|---------------|------------|-------|
| **🚨 CVE Storybook (4.2.0)** | **🔴 URGENTE** | - | - | **Executar PRIMEIRO** (CVE-2025-68429) |
| 1. Sentry 10.28→10.32 | ⏳ Pendente | - | - | Baixa prioridade (4 patches, sem CVEs) |
| 2. MCP SDK 1.0→1.25 | ⏳ Pendente | - | - | Baixa prioridade |
| 3. TypeScript ESLint | ⏳ Pendente | - | - | Baixa prioridade |
| 4. Storybook 8→10 | 🚧 Planejado | - | - | Sprint futuro (após CVE) |
| **5. MAJOR deps** | **📋 Planejado** | - | - | **Pesquisar changelogs primeiro** (2-3h) |

### Log de Execução

**Instruções**: Atualizar esta seção após cada etapa concluída.

```
[18/12/2025 - 00:00] - Plano criado, aguardando aprovação
[_**🚨 CVE Storybook (4.2.0)** | **🔴 URGENTE** | - | - | **Executar PRIMEIRO** (CVE-2025-68429) |
| 1. Sentry | ⏳ Pendente | - | - | Baixa prioridade |
| 2. MCP SDK | ⏳ Pendente | - | - | Baixa prioridade |
| 3. TypeScript ESLint | ⏳ Pendente | - | - | Baixa prioridade |
| 4. Storybook 8→10 | 🚧 Planejado | - | - | Sprint futuro (após CVE corrigido)ha> - Breaking: Sim/Não
[__/12/2025 - __:__] - ETAPA 3 iniciada
[__/12/2025 - __:__] - ETAPA 3 concluída - Commit: <sha>
[__/12/2025 - __:__] - Etapas 1-3 finalizadas com sucesso
[__/12/2025 - __:__] - ETAPA 4 agendada para sprint [número]
```

---

## 🔄 Próximos Passos

**Imediato** (hoje/agora):
1. ✅ Plano revisado e aprovado
2. 🔴 **DECISÃO PENDENTE**: Executar ETAPA 4.2.0 (CVE Storybook) - 15 min
3. ⏸️ Aguardar decisão do usuário

**Curto prazo** (hoje/esta semana):
1. Executar ETAPA 4.2.0 (CVE Storybook 8.6.15) - **URGENTE**
2. Executar ETAPA 5 (MAJOR deps) - **Pesquisar changelogs primeiro** (2-3h)
   - Ler releases: dotenv 17, pino 10, undici 7, zod 4
   - Verificar compatibilidade MCP SDK + zod 4
   - Testar em branch isolada
3. Validar estado final do monorepo

**Médio prazo** (próxima sprint):
1. Executar ETAPAs 1-3 (Sentry, MCP SDK, ESLint) - baixa prioridade (28 min total)
2. Criar issue no GitHub: "feat(storybook): planejar upgrade 8.x → 10.x"
3. Agendar sessão de 2h para ETAPA 4 (Storybook MAJOR)

**Backlog** (pós-DS v1.0):
1. Limpar pacotes deprecated (glob, rimraf, expect-playwright, jest-process-manager)
2. Patches menores (eslint, turbo, prettier, specfy)
3. Hardening de segurança (git-secrets, audit CI, supply chain verification)

---

## 📚 Referências

### Segurança e Vulnerabilidades
- [Next.js Security Advisories](https://github.com/vercel/next.js/security/advisories)
- [CVE-2025-68429 - Storybook env leak](https://github.com/advisories/GHSA-8452-54wp-rmv6)

### Changelogs de Patches
- [Sentry Next.js Changelog](https://github.com/getsentry/sentry-javascript/blob/develop/CHANGELOG.md)
- [MCP TypeScript SDK Releases](https://github.com/modelcontextprotocol/typescript-sdk/releases)
- [TypeScript ESLint Releases](https://github.com/typescript-eslint/typescript-eslint/releases)

### Changelogs de MAJOR Updates (ETAPA 5)
- [dotenv v17.0.0 Breaking Changes](https://github.com/motdotla/dotenv/releases/tag/v17.0.0)
- [pino v10.0.0 Breaking Changes](https://github.com/pinojs/pino/releases/tag/v10.0.0)
- [undici v7.0.0 Breaking Changes](https://github.com/nodejs/undici/releases/tag/v7.0.0)
- [zod v4.0.0 Breaking Changes](https://github.com/colinhacks/zod/releases/tag/v4.0.0)

### Storybook Migrations
- [Storybook Migration Guide](https://storybook.js.org/docs/migration-guide)
- [Storybook 9.0 Breaking Changes](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#from-version-8x-to-90)
- [Storybook 10.0 Breaking Changes](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#from-version-9x-to-100)
- [Storybook Migration Guide](https://storybook.js.org/docs/migration-guide)
- [Storybook 9.0 Breaking Changes](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#from-version-8x-to-90)
- [Storybook 10.0 Breaking Changes](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#from-version-9x-to-100)

---

## 📞 Contato e Suporte

**Responsável**: DevOps Agent  
**Revisão**: Fabio (fabioaap)  
**Repositório**: Ambiente-de-prototipa-o-EDUCACROSS-V2  

**Em caso de bloqueios**:
1. Parar execução imediatamente
2. Documentar erro completo (logs, stack trace, contexto)
3. Criar issue no GitHub com label `dependencies` + `blocked`
4. Notificar equipe via PR ou comentário

---

**Última atualização**: 18 de dezembro de 2025  
**Versão do plano**: 1.0  
**Status geral**: 📋 Documentado e pronto para execução
