# EDUCACROSS Prototipação – Copilot Instructions

**Status**: Production-ready for Sprint 3 execution  
**Last Updated**: 2025-11-24  
**Scope**: pnpm monorepo + Next.js 15 (App Router) + React 18 + Puck OSS + Storybook 8 + Code-to-Figma integration  
**Current Sprint**: Sprint 3 (Dashboard & Game Hub) – Fase 3/4

---

## 🎯 Contexto Executivo

Este é um **ambiente de prototipação orientado a jornadas**, não produção. Foco: velocidade, claridade, qualidade para PMs/designers/devs explorarem fluxos reais.

**Stack Crítico**:

- **Node**: 22.21.1 LTS (enforce via .nvmrc)
- **pnpm**: 9.14.4+ (monorepo with workspaces)
- **TypeScript**: 5 (strict mode)
- **Build**: tsup (design-system), Next.js (studio), Storybook (ESM-only)

**Big Picture**:

`
packages/
  ├─ design-system/ → React components (Button, Input, Card, Layout, Text)
  │   Exporta ESM + CJS via tsup com "use client" directive
  └─ tokens/ → Design tokens (cores, tipografia, espaçamentos)
     Exporta CSS variables + JS/TS exports

apps/
  ├─ studio/ → Next.js 15 com Puck integrado
  │   /studio = editor visual Puck
  │   /dashboard = analytics e health metrics (NEW Sprint 3)
  │   /pages = renderização JSON do localStorage
  │   API: GET/POST /api/pages (CRUD)
  │        /api/dashboard/* (summary, health, pages)
  │        /api/health (system health + metrics)
  └─ storybook/ → Catálogo visual (ESM-only, porta 6006)

code-to-figma/ → Integração Storybook → Figma (NEW)
  ├─ figma-sync-engine/ → Parser HTML → JSON Figma-compatible
  └─ scripts/ → Automation & utils

domains/ → Jornadas de prototipagem (BackOffice, FrontOffice, Game)
  Estrutura: domains/{dominio}/journeys/{jornada}/README.md + links
`

---

## 🔨 Workflows Essenciais

### Setup & Build

`ash
# Verificar ambiente (agente deve fazer isso primeiro)
node --version  # Esperado: v22.21.1
pnpm --version  # Esperado: 9.14.4+

# Instalar dependências (frozen-lockfile obrigatório em CI)
pnpm install --frozen-lockfile

# Build COMPLETO (ordem: tokens → design-system → studio/storybook)
pnpm build

# Lint (ESLint + Prettier em todos os workspaces)
pnpm lint

# Type-check (TypeScript strict)
pnpm -r type-check

# Dev com watchers (Studio em 3000, Storybook em 6006)
pnpm dev:studio &
pnpm dev:storybook &
`

**Checklist antes de commitar**:

1. pnpm build sem erros
2. pnpm lint sem warnings críticos
3. pnpm -r type-check = 0 errors
4. Nenhum console.error em dev
5. Stories/pages funcionando
6. Dashboard /dashboard funcional (se modificou)

### Git & GitHub Flow

`ash
# Feature branch (issue-code-description)
git checkout -b feature/c2-studio-sidebar-pages

# Commit padrão
git commit -m "type(scope): description (issue #XX)"
# Types: feat, fix, docs, ci, chore, refactor
# Scopes: studio, design-system, tokens, storybook, dashboard, code-to-figma

# Push + PR (GitHub Actions valida automaticamente)
git push -u origin feature/{...}
# GitHub Actions (sprint-2-validation.yml):
#   - validate-setup
#   - pnpm build + lint + type-check
#   - sprint2-validations (API, CONTRIBUTING, scripts, a11y)
#   - report + notify-main

# Merge via squash (GitHub web UI ou)
gh pr merge <NUMBER> --squash
`

### SpecKit Integration (PR Quality Validation)

**O que é**: Validador automático de PRs que garante qualidade sem review manual repetitivo.

**Como usar**:

1. **Após abrir PR**, comente:
   `
   /spec
   `

2. **SpecKit valida automaticamente**:
   - ✅ Título segue conventional commits? (feat/fix/docs/chore/refactor)
   - ✅ Descrição tem min 50 caracteres?
   - ✅ Labels obrigatórios presentes?
   - ✅ Componentes DS têm stories no Storybook?
   - ✅ Jornadas têm README com seções obrigatórias?
   - ✅ APIs têm response schema definido?
   - ✅ Build passa? Lint OK? Type-check OK?

3. **SpecKit posta relatório claro**:
   `
   ✅ PR Title Format
   ✅ PR Description Length
   ✅ Component Stories (6/6)
   ✅ Build Status
   ❌ Journey Documentation (faltam links.md)
   `

4. **Dev ajusta** conforme relatório e roda /spec novamente

5. **Quando TUDO ✅**: Safe to merge!

**Benefícios**:
- Reduz review loops de 3-4 para 1 iteração
- Zero surpresas ao mergear (qualidade garantida)
- Documentação sempre atualizada
- Histórico de Git limpo (conventional commits)
- Devs mais rápidos (feedback imediato)

**Especificações** estão em .github/spec.yml — customize conforme necessário.

---

## 📐 Padrões de Código

### Componentes (Design System)

**Arquivo**: packages/design-system/src/components/{Component}/{Component}.tsx

`	sx
'use client';  // OBRIGATÓRIO para Next.js App Router
import React from 'react';
import styles from './{Component}.module.css';

export interface {Component}Props extends React.HTMLAttributes<HTMLElement> {
  /** Descrição JSDoc para cada prop */
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const {Component} = React.forwardRef<HTMLElement, {Component}Props>(
  ({ variant = 'primary', size = 'md', className = '', ...props }, ref) => {
    const classNames = [
      styles.component,
      styles[variant],
      styles[size],
      className,
    ].filter(Boolean).join(' ');
    return <element ref={ref} className={classNames} {...props} />;
  }
);
{Component}.displayName = '{Component}';

export type { {Component}Props };
`

**Regras**:

- 'use client' directive SEMPRE no topo (para client components)
- orwardRef para componentes baixo-nível
- CSS Modules: styles.component, styles.variant, styles.size
- Props interface com JSDoc
- xport type { Props } (tipo exportado)
- Acessibilidade: ria-*, ole, 	abIndex quando apropriado

### Tokens

Arquivo: packages/tokens/src/tokens.json

`json
{
  "color": {
    "primary": { "value": "#3B82F6", "type": "color" },
    "secondary": { "value": "#8B5CF6", "type": "color" }
  },
  "space": {
    "sm": { "value": "8px", "type": "dimension" },
    "md": { "value": "16px", "type": "dimension" }
  }
}
`

Build: pnpm build:tokens → gera --color-primary, --space-sm CSS variables + JS exports

### CSS Modules

Consumir tokens em componentes:

`css
.button {
  padding: var(--space-md);
  background: var(--color-primary);
  border-radius: var(--radius-md);
  font-family: var(--font-family-base);
  color: var(--color-neutral-900);
  transition: all var(--transition-base);
}

.button:hover {
  background: var(--color-primary-600);
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2);
}

.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Prefer prefers-reduced-motion for animations */
@media (prefers-reduced-motion: reduce) {
  .button {
    animation: none;
    transition: none;
  }
}
`

---

## 🎨 Puck Integration (Studio)

Arquivo: pps/studio/src/config/puck.config.tsx

`	sx
import { Config } from "@measured/puck";
import { Button } from "@prototipo/design-system";

export const puckConfig: Config = {
  components: {
    Button: {
      fields: {
        text: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
          ],
        },
      },
      defaultProps: { text: "Click me", variant: "primary" },
      render: ({ text, variant }) => <Button variant={variant}>{text}</Button>,
    },
    // ... mais componentes
  },
};
`

**Workflow**:

1. Novo componente no DS → adicionar story no Storybook
2. Registrar em puckConfig.components
3. Testar em /studio (Puck editor)
4. Renderizar via pp/[[...slug]]/page.tsx

---

## 📊 Dashboard & APIs (Sprint 3)

### Rotas do Dashboard

- **/dashboard** → Analytics principal (KPIs, health, recent pages)
- **API Endpoints**:
  - GET /api/dashboard/summary → Retorna KPIs gerais
  - GET /api/dashboard/health → Health indicators por domínio
  - GET /api/dashboard/pages → Lista recent pages
  - GET /api/health → System health check
  - GET /api/health/metrics → Detailed metrics

### Estrutura de Response (API)

`	ypescript
// GET /api/dashboard/summary
interface DashboardSummary {
  totalPages: number;
  totalJourneys: number;
  totalDomains: number;
  recentUpdates: number;
}

// GET /api/dashboard/health
interface HealthIndicator {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  value: number;
  threshold: number;
  message: string;
}
`

### Dashboard UI Pattern

`	sx
// apps/studio/src/app/dashboard/page.tsx
'use client';
import useSWR from 'swr';

export default function DashboardPage() {
  const { data, error } = useSWR('/api/dashboard/summary', fetcher);
  
  if (error) return <ErrorBanner error={error} />;
  if (!data) return <SkeletonLoader />;
  
  return (
    <div className={styles.container}>
      <KPIGrid data={data} />
      <HealthSection />
      <RecentPages />
    </div>
  );
}
`

**Padrões**:
- Client component com 'use client'
- SWR para data fetching
- Loading states (skeleton)
- Error boundaries
- CSS Modules para estilização

---

## 📁 Estrutura de Jornadas

Template em: domains/template-jornada.md

Padrão:

`
domains/{DOMINIO}/journeys/{nome-jornada}/
  ├─ README.md (objetivo, status, componentes, links)
  ├─ notas.md (decisões UX/design)
  └─ links.md (Studio, Figma, etc)
`

**README template**:

`markdown
# Jornada: {Nome}

## Objetivo

[Resultado esperado de UX/negócio]

## Status

- [x] Planejamento
- [ ] Em andamento
- [ ] Concluído

## Componentes Utilizados

- Button (primary, md)
- Text (h1, bold)
- Card (default)

## Links

- [Studio](http://localhost:3000/pages/{slug})
- [Dashboard](http://localhost:3000/dashboard)
- [Figma]({url})
`

---

## �� Sprint 3 Execution (Dashboard & Game Hub)

**Status**: ✅ Fase 1 e 2 completadas (5/9 issues) | 🟢 Fase 3 e 4 prontas para execução

### Documentação Principal

**Índice Central**: SPRINT3_DOCUMENTATION_INDEX.md ⭐ – Ponto de entrada para toda documentação Sprint 3

**Guias de Execução**:

- SPRINT3_EXECUTION_DETAILED.md ⭐ – Prompts prontos para copiar (Issues #53, #54, #55, #58)
- AGENT_PHASE2_DASHBOARD.md – Resumo das 4 issues restantes (alternativo)
- SPRINT3_CHECKPOINT.md – Status após Fase 2
- SPRINT3_FINAL_STATUS.md – Progresso atual e métricas
- SPRINT3_QUICK_START.md – Setup rápido em 5 minutos

### Issues Restantes (Fase 3)

| #   | Título         | Prioridade | Depende de | Tipo     | Tempo Est |
| --- | -------------- | ---------- | ---------- | -------- | --------- |
| #53 | Dashboard API  | P2         | #59 ✅     | Backend  | 3h        |
| #54 | Dashboard UI   | P2         | #53 ⏳     | Frontend | 3h        |
| #55 | Health Metrics | P2         | #54 ⏳     | Feature  | 2h        |
| #58 | Game Hub       | P2         | #61 ✅     | Jornada  | 3h        |

### Grafo de Dependências

`
CADEIA SEQUENCIAL:
#53 (Dashboard API)
  ↓
#54 (Dashboard UI)
  ↓
#55 (Health Metrics)

PARALELO:
#58 (Game Hub) — pode rodar em paralelo com a cadeia
`

### Como Começar

1. **Leia**: SPRINT3_DOCUMENTATION_INDEX.md (5 min)
2. **Abra**: SPRINT3_EXECUTION_DETAILED.md (guia principal)
3. **Copie**: PROMPT correspondente à issue que quer executar
4. **Execute**: Seguindo as instruções detalhadas

**Progresso Atual**: 5/9 issues fechadas (56%) | Tempo Restante: ~11.5 horas

---

## 🎨 Code-to-Figma Integration (NEW)

**Localização**: code-to-figma/figma-sync-engine/

### O que faz

Exporta componentes renderizados no Storybook como JSON compatível com Figma Auto Layout, reduzindo em 80% o tempo de documentação.

### Quick Start

`ash
cd code-to-figma/figma-sync-engine
pnpm install
pnpm dev       # watch mode
pnpm build
pnpm test      # Vitest
`

### Workflow típico

1. Componente no DS → Story no Storybook
2. igma-sync-engine parseia HTML do Storybook
3. Gera JSON compatível com Figma API
4. Importar no Figma via plugin

**Docs**:
- code-to-figma/README.md → Overview
- code-to-figma/figma-sync-engine/README.md → Documentação completa
- code-to-figma/figma-sync-engine/QUICK_START.md → Início rápido

---

## ⚙️ Build & Package Management

### tsup.config.ts (Design System)

`	ypescript
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  banner: {
    js: "'use client';",  // Adiciona directive para Next.js
  },
});
`

- **Exporta**: ESM + CJS
- **Adiciona**: "use client" directive (banner)
- **Sourcemaps**: automáticas
- **Types**: geradas via tsc

### Next.js (Studio)

- **Router**: App Router (📁 estrutura de diretórios é rotas)
- **Layouts**: layout.tsx (global em pp/, sidebar)
- **Dynamic Routes**: pp/[[...slug]]/page.tsx (renderiza JSON)
- **API**: Route handlers em pp/api/{endpoint}/route.ts
- **Styles**: CSS Modules + global globals.css
- **Data Fetching**: SWR (client-side) ou fetch (server components)

### Storybook (ESM-only)

- **Manager**: Vite
- **Stories**: *.stories.tsx em pps/storybook/src/stories/
- **Addons**: @storybook/addon-a11y, @storybook/addon-essentials
- **Config**: .storybook/main.ts (TypeScript)

---

## 🔍 Debugging & Troubleshooting

### Build Falha

`ash
# Limpar cache
pnpm clean

# Reinstalar (frozen-lockfile)
pnpm install --frozen-lockfile

# Rebuildar individual
pnpm build:tokens
pnpm build:design-system
pnpm build:studio
pnpm build:storybook

# Ver erro específico
pnpm build --verbose
`

### Lint/Type Errors

`ash
# Rodar local (antes de push)
pnpm lint
pnpm -r type-check

# Fixar automáticamente
pnpm lint --fix
`

### Port Conflicts

`ash
# Kill processos anteriores (PowerShell)
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Reiniciar devs
pnpm dev:studio
pnpm dev:storybook
`

### GitHub Actions Falha

1. Clique "Re-run all jobs" (pode ser timeout/fluke)
2. Leia logs em Actions tab → step que falhou
3. Rode localmente: pnpm build && pnpm lint && pnpm -r type-check
4. Fix + commit + push novamente

### Dashboard/API Issues

`ash
# Verificar APIs funcionando
curl http://localhost:3000/api/health
curl http://localhost:3000/api/dashboard/summary

# Logs do Next.js
# Procure erros no terminal onde pnpm dev:studio roda
`

---

## 📊 Decision Log (Por Quê Desse Jeito?)

| Decisão                | Razão                                  | Trade-off              |
| ---------------------- | -------------------------------------- | ---------------------- |
| **pnpm workspaces**    | Monorepo + link automático + lock file | Curva aprendizado      |
| **CSS Modules**        | Sem runtime, tree-shake safe           | Não há utility classes |
| **Puck para editor**   | Visual, sem código, rápido             | Limited customization  |
| **Storybook ESM-only** | Performance, modern tooling            | Sem CommonJS           |
| **Next.js App Router** | File-based routing, server components  | Migrando de pages      |
| **Node 22.21.1 LTS**   | Estável, não cutting-edge              | Muda em Apr 2027       |
| **SWR para fetching**  | React Hooks, cache automático          | Bundle size            |
| **Code-to-Figma**      | Reduz 80% tempo design sync            | Limitado a Storybook   |

---

## 💾 Key Files to Know

| Arquivo                                     | Propósito                                           |
| ------------------------------------------- | --------------------------------------------------- |
| .nvmrc                                    | Node version (v22.21.1)                             |
| pnpm-workspace.yaml                       | Define workspaces (apps/\*, packages/\*)            |
| package.json (root)                       | Scripts: pnpm dev:studio, pnpm build, etc       |
| packages/design-system/package.json       | Exports: ESM/CJS, types, version                    |
| packages/tokens/src/tokens.json           | Fonte de verdade para design tokens                 |
| pps/studio/src/config/puck.config.tsx    | Registro de componentes para Puck                   |
| pps/studio/src/app/[[...slug]]/page.tsx  | Renderiza páginas JSON do localStorage              |
| pps/studio/src/app/dashboard/page.tsx    | Dashboard principal (KPIs, health, recent)          |
| pps/studio/src/app/api/dashboard/*       | APIs do dashboard (summary, health, pages)          |
| .github/workflows/sprint-2-validation.yml | CI/CD automation                                    |
| .github/spec.yml                          | SpecKit specifications (PR validation config)       |
| code-to-figma/figma-sync-engine/          | Parser Storybook → Figma JSON                       |
| domains/README.md                         | Índice de jornadas                                  |
| SPRINT3_EXECUTION_DETAILED.md             | Prompts prontos Sprint 3 ⭐                         |

---

## ✅ Checklist para Agents

### Antes de qualquer ação:

1. **Verificar ambiente**:
   - [ ] 
ode --version → v22.21.1
   - [ ] pnpm --version → 9.14.4+
   - [ ] git --version → 2.52.0+

2. **Ler instruções e specs**:
   - [ ] Entender o projeto (repositório, stack, arquitetura)
   - [ ] Verificar .github/spec.yml para requirements
   - [ ] Ler issue/prompt completo antes de começar

### Quando modificar componentes DS:

- [ ] Adicionar 'use client' directive no topo (se client component)
- [ ] Manter interface de props estável (adicionar, não remover)
- [ ] Atualizar stories no Storybook
- [ ] Rodar pnpm build:design-system e verificar tipos
- [ ] Novo componente? Adicionar em packages/design-system/src/index.ts
- [ ] Registrar em puckConfig se for usado em Studio
- [ ] Adicionar acessibilidade: ria-*, ole, keyboard navigation

### Quando adicionar jornada:

- [ ] Criar pasta em domains/{dominio}/journeys/{nome}/
- [ ] Documentar em README com objetivo, componentes, links
- [ ] Criar página correspondente no Studio
- [ ] Linkar em domains/README.md ou índice
- [ ] Testar renderização em /dashboard e /pages/{slug}

### Quando adicionar novos tokens:

- [ ] Editar packages/tokens/src/tokens.json
- [ ] Rodar pnpm build:tokens
- [ ] Verificar CSS variables + JS exports
- [ ] Atualizar componentes DS para usar novos tokens
- [ ] Documentar em packages/tokens/README.md

### Quando criar/modificar APIs:

- [ ] Criar route handler em pps/studio/src/app/api/{endpoint}/route.ts
- [ ] Definir interface TypeScript para response
- [ ] Adicionar error handling (try/catch + Response.json)
- [ ] Testar localmente: curl http://localhost:3000/api/{endpoint}
- [ ] Documentar em README ou comentário JSDoc

### Antes de mergear PR:

- [ ] pnpm build sem erros
- [ ] pnpm lint sem warnings críticos
- [ ] pnpm -r type-check sem erros
- [ ] Stories/exemplos funcionando (se componente)
- [ ] Página no Studio funcional (se jornada)
- [ ] Dashboard /dashboard funcional (se modificou APIs)
- [ ] README/docs atualizado
- [ ] Nenhum console.error em dev
- [ ] **SpecKit validação**: Postar /spec em comentário de PR
  - [ ] Todos os checks ✅ (título, descrição, labels, stories, docs)
  - [ ] Se algum ❌, ajustar conforme relatório e rodar /spec novamente
  - [ ] Apenas mergear quando TUDO estiver ✅

**SpecKit é obrigatório antes de mergear qualquer PR!**

---

## 🎓 Learning Resources

- **Monorepo pnpm**: Veja pnpm-workspace.yaml + package.json (root)
- **Design tokens**: packages/tokens/README.md + src/tokens.json
- **Componentes padrão**: packages/design-system/src/components/*/
- **Puck integration**: pps/studio/src/config/puck.config.tsx
- **Dashboard**: pps/studio/src/app/dashboard/ (page.tsx + APIs)
- **Jornadas**: domains/README.md + examples em domains/*/
- **Code-to-Figma**: code-to-figma/figma-sync-engine/README.md
- **Sprint 3 docs**: SPRINT3_DOCUMENTATION_INDEX.md ⭐ (índice central)

---

## 🚦 Próximo Passo para Agents

### Novos Agents (primeira execução):

1. **Ler este arquivo completo** (5 min)
2. **Verificar ambiente**: 
ode --version, pnpm --version
3. **Instalar**: pnpm install --frozen-lockfile
4. **Build**: pnpm build
5. **Dev servers**: pnpm dev:studio + pnpm dev:storybook
6. **Escolher issue**: Ver SPRINT3_EXECUTION_DETAILED.md

### Agents com contexto (continuando):

- **Sprint 3**: Começar em SPRINT3_DOCUMENTATION_INDEX.md ou SPRINT3_EXECUTION_DETAILED.md para prompts prontos
- **Issue específica**: Copiar prompt da issue em SPRINT3_EXECUTION_DETAILED.md
- **Bug fix**: Ler seção "Debugging & Troubleshooting" acima

---

**Questions? Check**:
- README.md → Overview do projeto
- CONTRIBUTING.md → Como contribuir
- SPRINT3_DOCUMENTATION_INDEX.md → Navegação completa Sprint 3
- GitHub Issues → Backlog e roadmap
