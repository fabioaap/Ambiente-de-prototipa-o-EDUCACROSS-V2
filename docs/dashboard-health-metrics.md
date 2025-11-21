# H4 - Dashboard: Indicadores de Saúde do Repositório

**Issue**: H4 (parte de Epic H - Dashboard)  
**Status**: ✅ CONCLUÍDO  
**Data**: 2025-11-21  
**Objetivo**: Implementar indicadores de saúde do repositório no Dashboard

---

## 🎯 Visão Geral

Implementação completa dos indicadores de saúde do repositório no Dashboard, exibindo métricas essenciais sobre:
- Status de build (arquivos compilados)
- Status de lint (warnings e errors)
- Tamanho do bundle do Storybook
- Dependências desatualizadas e deprecadas

---

## ✅ Acceptance Criteria

- [x] Definição de métricas e fontes (CI badges, scripts)
- [x] POC que exibe as métricas no dashboard
- [x] Endpoint API `/api/dashboard/health` funcional
- [x] Componente Badge criado no Design System
- [x] Página Dashboard acessível em `/dashboard`
- [x] Build e lint passando sem erros

---

## 📊 Métricas Implementadas

### 1. Build Status
**Fonte**: Verificação de diretórios `.next` e `storybook-static`

- Status: success | failed | unknown
- Timestamp da última build
- Duração (placeholder para futuras melhorias)

**Lógica**:
```typescript
const studioBuildPath = path.join(process.cwd(), 'apps/studio/.next')
const storybookBuildPath = path.join(process.cwd(), 'apps/storybook/storybook-static')
// Verifica existência e retorna status + timestamp
```

### 2. Lint Status
**Fonte**: Execução de `pnpm lint` via child_process

- Status: success | failed | unknown
- Contagem de warnings
- Contagem de errors

**Lógica**:
```typescript
const { stdout, stderr } = await execAsync('pnpm lint 2>&1')
// Parse do output para extrair números
```

### 3. Storybook Bundle Size
**Fonte**: Cálculo recursivo do tamanho de `apps/storybook/storybook-static`

- Tamanho em MB
- Status: built | not-built
- Alerta visual se > 10 MB

**Lógica**:
```typescript
const calculateSize = async (dir: string): Promise<number> => {
  // Recursivamente soma tamanhos de arquivos
}
```

### 4. Dependencies Status
**Fonte**: `pnpm outdated --format json` e `package.json`

- Total de dependências
- Dependências desatualizadas
- Dependências deprecadas

**Lógica**:
```typescript
const packageJson = JSON.parse(await fs.readFile('package.json'))
const outdated = await execAsync('pnpm outdated --format json')
// Parse e contagem
```

---

## 🏗️ Arquitetura de Implementação

### API Endpoint
**Arquivo**: `apps/studio/src/app/api/dashboard/health/route.ts`

```typescript
export async function GET() {
  const [build, lint, storybook, dependencies] = await Promise.all([
    getBuildStatus(),
    getLintStatus(),
    getStorybookBundleSize(),
    getDependenciesStatus(),
  ])
  
  return NextResponse.json({
    build,
    lint,
    storybook,
    dependencies,
    lastUpdated: new Date().toISOString()
  })
}
```

### Design System - Badge Component
**Arquivos**:
- `packages/design-system/src/components/Badge/Badge.tsx`
- `packages/design-system/src/components/Badge/Badge.module.css`
- `apps/storybook/src/stories/Badge.stories.tsx`

**Variantes**:
- `success` - Verde (build OK, lint OK)
- `warning` - Amarelo (warnings, bundle grande)
- `error` - Vermelho (errors, deprecações)
- `info` - Azul (informações gerais)
- `neutral` - Cinza (status desconhecido)

**Tamanhos**: `sm`, `md`, `lg`

**Props**:
```typescript
interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  children: React.ReactNode
}
```

### Dashboard Page
**Arquivo**: `apps/studio/src/app/dashboard/page.tsx`

**Features**:
- Carregamento assíncrono de métricas
- Estados de loading e error
- Botão de atualização manual
- Grid responsivo com cards de métricas
- Badges coloridos indicando status
- Formatação de datas em pt-BR
- Alertas visuais (ex: bundle > 10 MB)

**Layout**:
```
┌─────────────────────────────────────────┐
│  Dashboard - Saúde do Repositório       │
│  [Voltar]                               │
├─────────────────────────────────────────┤
│  ┌────────┐  ┌────────┐  ┌────────┐    │
│  │ Build  │  │ Lint   │  │ Bundle │    │
│  │ ✓ OK   │  │ ⚠ 1    │  │ 7.4 MB │    │
│  └────────┘  └────────┘  └────────┘    │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Dependências: 8 total, 1 outd.  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Última atualização: 21/11/2025 17:42  │
│  [Atualizar]                            │
└─────────────────────────────────────────┘
```

---

## 🔗 Integração com Home

**Arquivo**: `apps/studio/src/app/page.tsx`

Adicionado card de Dashboard na home:
```tsx
<Card variant="elevated" padding="lg">
  <Text as="h2">Dashboard</Text>
  <Text color="muted">
    Indicadores de saúde e métricas do repositório.
  </Text>
  <Link href="/dashboard">
    <Button variant="secondary" fullWidth>
      Ver Dashboard
    </Button>
  </Link>
</Card>
```

---

## 🎨 Design Tokens Utilizados

```css
/* Badges usam tokens do sistema */
--color-success-light
--color-success-dark
--color-warning-light
--color-warning-dark
--color-error-light
--color-error-dark
--color-primary-light
--color-primary-dark
--color-neutral-100
--color-neutral-300
--color-neutral-600
--color-neutral-700

--space-xs
--space-sm
--space-md
--radius-md
--font-family-base
--font-size-xs
--font-size-sm
--font-size-base
--font-weight-medium
```

---

## 📋 Checklist de Implementação

- [x] Criar endpoint `/api/dashboard/health`
- [x] Implementar função `getBuildStatus()`
- [x] Implementar função `getLintStatus()`
- [x] Implementar função `getStorybookBundleSize()`
- [x] Implementar função `getDependenciesStatus()`
- [x] Criar componente Badge no Design System
- [x] Adicionar CSS Modules para Badge
- [x] Exportar Badge de `packages/design-system/src/index.ts`
- [x] Criar story do Badge no Storybook
- [x] Criar página Dashboard em `/dashboard`
- [x] Integrar API no Dashboard (fetch)
- [x] Adicionar link para Dashboard na home
- [x] Build tokens sem erros
- [x] Build design-system sem erros
- [x] Build studio sem erros
- [x] Build storybook sem erros
- [x] Lint passando
- [x] Documentação criada

---

## 🚀 Como Usar

### Acessar o Dashboard

1. Iniciar o Studio:
```bash
pnpm dev:studio
```

2. Abrir no navegador:
```
http://localhost:3000/dashboard
```

### Endpoints API

**Métricas de Saúde**:
```bash
curl http://localhost:3000/api/dashboard/health
```

**Resposta**:
```json
{
  "build": {
    "status": "success",
    "lastRun": "2025-11-21T17:42:00.000Z",
    "duration": "N/A"
  },
  "lint": {
    "status": "success",
    "warnings": 1,
    "errors": 0
  },
  "storybook": {
    "bundleSize": "7.40 MB",
    "bundleSizeMB": 7.4,
    "status": "built"
  },
  "dependencies": {
    "total": 8,
    "outdated": 1,
    "deprecated": 0
  },
  "lastUpdated": "2025-11-21T17:42:30.123Z"
}
```

---

## 🧪 Testes Realizados

### Build
```bash
pnpm build:tokens      # ✅ OK
pnpm build:design-system # ✅ OK (Badge compilado)
pnpm build:studio       # ✅ OK (Dashboard page renderizada)
pnpm build:storybook    # ✅ OK (Badge.stories incluído)
```

### Lint
```bash
pnpm lint              # ✅ OK (1 warning não relacionado)
```

### Type Check
```bash
# Verificado durante build do Next.js ✅
```

---

## 📝 Decisões Técnicas

### 1. Métricas Coletadas Localmente
**Decisão**: As métricas são coletadas no servidor Next.js via APIs do Node.js  
**Razão**: Simplicidade, sem dependência de CI external  
**Trade-off**: Não reflete status real do CI/CD, apenas do ambiente local

### 2. Uso de child_process para Lint
**Decisão**: Executar `pnpm lint` programaticamente  
**Razão**: Simula execução real, sem duplicar lógica  
**Trade-off**: Timeout de 30s, pode ser lento em repositórios grandes

### 3. Cálculo Recursivo de Bundle Size
**Decisão**: Calcular tamanho manualmente via filesystem  
**Razão**: Preciso e sem dependências externas  
**Trade-off**: Pode ser lento para bundles muito grandes (>100MB)

### 4. Badge como Componente do DS
**Decisão**: Criar Badge como componente reutilizável  
**Razão**: Pode ser usado em outras partes do sistema (não apenas dashboard)  
**Benefício**: Consistência visual, documentação no Storybook

---

## 🔮 Melhorias Futuras

### Curto Prazo
- [ ] Integração com GitHub Actions API para status real do CI
- [ ] Cache de métricas (evitar recalcular a cada requisição)
- [ ] Histórico de métricas (gráficos de tendência)
- [ ] Alertas automáticos (Slack/email) quando métricas críticas falharem

### Médio Prazo
- [ ] Dashboard em tempo real (WebSocket)
- [ ] Comparação entre branches
- [ ] Métricas de cobertura de testes
- [ ] Análise de dependências vulneráveis (npm audit)

### Longo Prazo
- [ ] Dashboard público (status page)
- [ ] Integração com Lighthouse para métricas de performance
- [ ] Métricas de acessibilidade (a11y)

---

## 🐛 Troubleshooting

### Métricas não carregam
```bash
# Verificar se o build foi executado
pnpm build

# Verificar logs do servidor
# (próximo terminal/console)
```

### Tamanho do bundle incorreto
```bash
# Rebuild do Storybook
pnpm build:storybook
```

### Dependências desatualizadas incorretas
```bash
# Atualizar lockfile
pnpm install

# Verificar manualmente
pnpm outdated
```

---

## 📚 Referências

### Arquivos Criados/Modificados

**Novos arquivos**:
- `apps/studio/src/app/api/dashboard/health/route.ts`
- `apps/studio/src/app/dashboard/page.tsx`
- `packages/design-system/src/components/Badge/Badge.tsx`
- `packages/design-system/src/components/Badge/Badge.module.css`
- `apps/storybook/src/stories/Badge.stories.tsx`
- `docs/dashboard-health-metrics.md` (este arquivo)

**Arquivos modificados**:
- `packages/design-system/src/index.ts` (export Badge)
- `apps/studio/src/app/page.tsx` (link para Dashboard)

### Links Úteis
- [Dashboard Wireframe](./dashboard-wireframe.md)
- [Badge no Storybook](http://localhost:6006/?path=/story/design-system-badge--success)
- [Endpoint Health API](http://localhost:3000/api/dashboard/health)
- [Dashboard Page](http://localhost:3000/dashboard)

---

## ✅ Status Final

**H4 - Dashboard: Indicadores de Saúde do Repositório**: ✅ CONCLUÍDO

**Próximos passos**:
- H6 - Segurança e validação de acessos
- Integração com CI badges do GitHub
- Documentação adicional de uso

---

**Implementado por**: Copilot Agent  
**Data**: 2025-11-21  
**Commit**: [link do commit após push]
