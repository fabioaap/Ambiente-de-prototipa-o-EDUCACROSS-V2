# H4 - Dashboard: Indicadores de Saúde do Repositório

**Status**: ✅ Implementado  
**Data**: 2025-11-23  
**Issue**: H4 (parte do Epic H - Dashboard)

---

## 🎯 Objetivo

Definir e exibir indicadores de saúde do repositório (build status, lint, última build, tamanho bundle Storybook, dependências desatualizadas) para monitoramento contínuo do projeto.

---

## 📊 Métricas Implementadas

### 1. Build Status
- **O que é**: Verifica se todos os builds essenciais estão atualizados
- **Como funciona**: Checa a existência dos diretórios de build:
  - `packages/tokens/dist` (tokens)
  - `packages/design-system/dist` (design-system)
  - `apps/storybook/storybook-static` (storybook)
  - `apps/studio/.next` (studio)
- **Status possíveis**: `success`, `partial`, `error`

### 2. Lint Status
- **O que é**: Executa o lint e conta warnings/erros
- **Como funciona**: Executa `pnpm lint` e analisa o output do ESLint
- **Métricas**:
  - Número de erros
  - Número de avisos
- **Status possíveis**: `success`, `warning`, `error`

### 3. Storybook Bundle Size
- **O que é**: Tamanho total do build do Storybook
- **Como funciona**: Calcula recursivamente o tamanho de `apps/storybook/storybook-static`
- **Formato**: Bytes convertidos para MB (ex: "7.15 MB")
- **Status possíveis**: `success`, `missing`, `error`

### 4. Última Build
- **O que é**: Data e hora do último build
- **Como funciona**: Verifica o timestamp de modificação dos diretórios de build
- **Formato**: ISO 8601 timestamp + tempo relativo (ex: "há 2 horas")
- **Status possíveis**: `success`, `missing`, `error`

### 5. Dependências Desatualizadas
- **O que é**: Lista de pacotes npm/pnpm desatualizados
- **Como funciona**: Executa `pnpm outdated --format json`
- **Métricas**:
  - Número total de pacotes desatualizados
  - Lista dos primeiros 5 pacotes
- **Status possíveis**: `success`, `warning`, `error`

### 6. Git Info
- **O que é**: Informações do repositório Git
- **Métricas**:
  - Branch atual
  - Commit hash (short)
  - Data do último commit

---

## 🛠️ Componentes Implementados

### 1. Script de Coleta de Métricas

**Arquivo**: `scripts/collect-health-metrics.mjs`

Utilitário Node.js que coleta todas as métricas e salva em um arquivo JSON.

**Uso**:
```bash
# Coletar e salvar métricas
pnpm health:check

# Coletar e exibir JSON
pnpm health:watch
```

**Output**: `apps/studio/data/health-metrics.json`

**Estrutura do JSON**:
```json
{
  "timestamp": "2025-11-23T06:35:49.437Z",
  "git": {
    "branch": "main",
    "commit": "abc1234",
    "lastCommitDate": "2025-11-23 06:29:22 +0000"
  },
  "build": {
    "status": "success",
    "builds": [...],
    "message": "Todos os builds estão atualizados"
  },
  "lint": {
    "status": "warning",
    "warnings": 12,
    "errors": 0,
    "message": "12 aviso(s)"
  },
  "bundle": {
    "status": "success",
    "size": 7498983,
    "sizeFormatted": "7.15 MB",
    "message": "Bundle gerado: 7.15 MB"
  },
  "lastBuild": {
    "status": "success",
    "timestamp": "2025-11-23T06:32:44.143Z",
    "message": "Último build: 23/11/2025, 06:32:44"
  },
  "dependencies": {
    "status": "success",
    "outdated": 0,
    "packages": [],
    "message": "Todas as dependências estão atualizadas"
  }
}
```

### 2. Endpoint API

**Arquivo**: `apps/studio/src/app/api/dashboard/pages/route.ts`

Endpoint REST que retorna dados do dashboard incluindo métricas de saúde.

**Rota**: `GET /api/dashboard/pages`

**Response**:
```json
{
  "pages": [...],
  "stats": {
    "totalPages": 3,
    "totalDomains": 2,
    "activeDomains": ["BackOffice", "FrontOffice"],
    "lastUpdated": "2025-11-23T06:35:49.437Z",
    "buildStatus": "success",
    "storybook": "online"
  },
  "domains": {...},
  "health": {
    // Métricas completas de saúde
  }
}
```

**Integração**:
- Carrega métricas de `apps/studio/data/health-metrics.json`
- Se o arquivo não existir, retorna `health: null`
- `stats.buildStatus` e `stats.storybook` são derivados das métricas de saúde

### 3. Componente React

**Arquivo**: `apps/studio/src/components/HealthMetrics.tsx`

Componente React que exibe as métricas em cards visuais.

**Features**:
- Loading state enquanto busca dados
- Error handling com mensagens amigáveis
- Warning se métricas não estiverem disponíveis
- Cards com status icons (✓ ⚠ ✗)
- Grid responsivo (3 colunas em desktop, 1 em mobile)
- Timestamps formatados em PT-BR
- Tempo relativo (ex: "há 2 horas")

**Cards Exibidos**:
1. **Build Status** - Lista de builds e seus status
2. **Lint** - Erros e avisos
3. **Storybook Bundle** - Tamanho do bundle
4. **Último Build** - Data e tempo relativo
5. **Dependências** - Pacotes desatualizados
6. **Git Info** - Branch e commit

### 4. Página do Dashboard

**Arquivo**: `apps/studio/src/app/dashboard/page.tsx`

Página Next.js que renderiza o componente de métricas.

**Rota**: `http://localhost:3000/dashboard`

---

## 📋 Scripts Adicionados ao package.json

```json
{
  "scripts": {
    "health:check": "node scripts/collect-health-metrics.mjs",
    "health:watch": "node scripts/collect-health-metrics.mjs --json"
  }
}
```

---

## 🎨 Fontes de Dados

### 1. Build Status
- **Fonte**: File system (`fs.access()`)
- **Diretórios verificados**:
  - `packages/tokens/dist`
  - `packages/design-system/dist`
  - `apps/storybook/storybook-static`
  - `apps/studio/.next`

### 2. Lint
- **Fonte**: `pnpm lint` (execSync)
- **Parser**: Regex para contar "X errors" e "X warnings"

### 3. Bundle Size
- **Fonte**: File system (recursive directory size)
- **Cálculo**: Soma de todos os arquivos em `apps/storybook/storybook-static`

### 4. Última Build
- **Fonte**: File system (`fs.stat()` mtime)
- **Diretórios verificados**:
  - `apps/studio/.next`
  - `apps/storybook/storybook-static`

### 5. Dependências
- **Fonte**: `pnpm outdated --format json` (execSync)
- **Parser**: JSON.parse() ou contagem de linhas

### 6. Git Info
- **Fonte**: Git CLI (execSync)
- **Comandos**:
  - `git rev-parse --abbrev-ref HEAD` (branch)
  - `git rev-parse --short HEAD` (commit)
  - `git log -1 --format=%cd --date=iso` (data)

---

## 🚀 Como Usar

### 1. Coletar Métricas

```bash
# Antes de visualizar o dashboard, colete as métricas
pnpm health:check
```

**Output esperado**:
```
🔍 Coletando métricas de saúde do repositório...

📊 Resumo das Métricas:

  Build:        success - Todos os builds estão atualizados
  Lint:         warning - 12 aviso(s)
  Bundle:       success - Bundle gerado: 7.15 MB
  Último Build: success - Último build: 23/11/2025, 06:32:44
  Dependências: success - Todas as dependências estão atualizadas
  Git Branch:   main
  Git Commit:   abc1234

✅ Métricas salvas em: .../apps/studio/data/health-metrics.json
```

### 2. Visualizar Dashboard

```bash
# Iniciar servidor de desenvolvimento
pnpm dev:studio

# Acessar no navegador
open http://localhost:3000/dashboard
```

### 3. Atualizar Métricas Automaticamente

Para manter as métricas sempre atualizadas, você pode:

**Opção A: Adicionar ao workflow de build**
```bash
# No CI/CD ou antes de commit
pnpm health:check && git add apps/studio/data/health-metrics.json
```

**Opção B: Criar GitHub Action**
```yaml
# .github/workflows/health-metrics.yml
name: Update Health Metrics
on:
  push:
    branches: [main]
jobs:
  metrics:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm build
      - run: pnpm health:check
      - run: git add apps/studio/data/health-metrics.json
      - run: git commit -m "chore: update health metrics"
      - run: git push
```

---

## 🎯 Critérios de Aceitação

- [x] **Definição de métricas e fontes (CI badges, scripts)**
  - ✅ 6 métricas definidas (build, lint, bundle, última build, dependências, git)
  - ✅ Fontes documentadas (file system, CLI, git)
  - ✅ Script de coleta implementado

- [x] **POC que exibe as métricas no dashboard**
  - ✅ Componente React com UI visual
  - ✅ Página `/dashboard` funcional
  - ✅ Endpoint API que retorna métricas
  - ✅ Cards responsivos com status icons

---

## 📸 Screenshots

*(Adicionar screenshots após executar o dashboard)*

### Dashboard com Métricas
![Dashboard](./screenshots/dashboard-health-metrics.png)

---

## 🧪 Testes

### Teste Manual

1. **Coletar métricas**:
```bash
pnpm health:check
```
Verificar que o arquivo `apps/studio/data/health-metrics.json` foi criado.

2. **Testar endpoint API**:
```bash
curl http://localhost:3000/api/dashboard/pages | jq '.health'
```
Verificar que `health` está presente no response.

3. **Visualizar dashboard**:
```bash
pnpm dev:studio
open http://localhost:3000/dashboard
```
Verificar que os 6 cards são exibidos com dados corretos.

### Testes de Edge Cases

1. **Sem métricas coletadas**:
   - Não executar `pnpm health:check`
   - Acessar `/dashboard`
   - Esperado: Warning com instrução para executar o script

2. **Build parcial**:
   - Deletar `apps/studio/.next`
   - Executar `pnpm health:check`
   - Esperado: Build status = "partial"

3. **Erros de lint**:
   - Introduzir erro de sintaxe em um arquivo
   - Executar `pnpm health:check`
   - Esperado: Lint status = "error" com contagem

---

## 🔄 Próximas Iterações

### H4.1 - Integração com CI/CD (Futuro)
- [ ] Badge do GitHub Actions no README
- [ ] Atualização automática de métricas em push
- [ ] Notificações de degradação de métricas

### H4.2 - Métricas Adicionais (Futuro)
- [ ] Cobertura de testes
- [ ] Tempo de build
- [ ] Tamanho de cada pacote
- [ ] Performance do Lighthouse

### H4.3 - Histórico de Métricas (Futuro)
- [ ] Armazenar histórico em banco de dados
- [ ] Gráficos de evolução
- [ ] Alertas de tendências negativas

---

## 📚 Referências

### Arquivos Criados/Modificados

**Novos Arquivos**:
- `scripts/collect-health-metrics.mjs` - Script de coleta
- `apps/studio/src/components/HealthMetrics.tsx` - Componente React
- `apps/studio/src/components/HealthMetrics.module.css` - Estilos
- `apps/studio/src/app/dashboard/page.tsx` - Página do dashboard
- `apps/studio/data/health-metrics.json` - Arquivo de métricas (gerado)
- `docs/health-metrics-implementation.md` - Esta documentação

**Arquivos Modificados**:
- `package.json` - Adicionados scripts `health:check` e `health:watch`
- `apps/studio/src/app/api/dashboard/pages/route.ts` - Integração com métricas

### Documentação Relacionada
- `docs/dashboard-wireframe.md` - Planejamento do dashboard (H1)
- `CONTRIBUTING.md` - Guia de contribuição
- `README.md` - Documentação principal

---

## ✅ Checklist de Implementação

- [x] Script de coleta de métricas criado
- [x] Endpoint API integrado com métricas
- [x] Componente React de visualização criado
- [x] Página do dashboard criada
- [x] Scripts adicionados ao package.json
- [x] Documentação completa
- [x] Testes manuais realizados
- [x] Build do projeto validado
- [x] Lint sem erros críticos

---

**Status Final**: ✅ **PRONTO PARA MERGE**

**Próximos Passos**:
1. Fazer PR para `main`
2. Revisar com time
3. Mergear após aprovação
4. Documentar no CHANGELOG
