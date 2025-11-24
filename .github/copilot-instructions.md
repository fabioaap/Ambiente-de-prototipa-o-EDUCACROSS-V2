# EDUCACROSS Prototipação – Copilot Instructions

**Status**: Production-ready for Sprint 2 & 3 execution  
**Last Updated**: 2025-11-24  
**Scope**: pnpm monorepo + Next.js 15 (App Router) + React 18 + Puck OSS + Storybook 8  
**Current Sprint**: Sprint 3 (Fase 3/4 - Dashboard & Game Hub)

---

## 🎯 Contexto Executivo

Este é um **ambiente de prototipação orientado a jornadas**, não produção. Foco: velocidade, clareza, qualidade para PMs/designers/devs explorarem fluxos reais.

**Stack Crítico**:

- **Node**: 22 LTS (enforce via `.nvmrc`)
- **pnpm**: 9.14.4+ (monorepo with workspaces)
- **TypeScript**: 5 (strict mode)
- **Build**: tsup (design-system), Next.js (studio), Storybook (ESM-only)

**Big Picture**:

```
packages/
  ├─ design-system/ → React components (Button, Input, Card, Layout, Text)
  │   Exporta ESM + CJS via tsup com "use client" directive
  └─ tokens/ → Design tokens (cores, tipografia, espaçamentos)
     Exporta CSS variables + JS/TS exports

apps/
  ├─ studio/ → Next.js 15 com Puck integrado
  │   /studio = editor visual Puck
  │   /pages = renderização JSON do localStorage
  │   API: GET/POST /api/pages (C-R-U-D)
  └─ storybook/ → Catálogo visual (ESM-only, porta 6006)

domains/ → Jornadas de prototipagem (BackOffice, FrontOffice, Game)
  Estrutura: domains/{dominio}/journeys/{jornada}/README.md + links
```

---

## 🔨 Workflows Essenciais

### Setup & Build

```bash
# Verificar ambiente (agente deve fazer isso primeiro)
node --version  # Esperado: v22.x.x
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
```

**Checklist antes de commitar**:

1. `pnpm build` sem erros
2. `pnpm lint` sem warnings críticos
3. `pnpm -r type-check` = 0 errors
4. Nenhum `console.error` em dev
5. Stories/pages funcionando

### Git & GitHub Flow

```bash
# Feature branch (issue-code-description)
git checkout -b feature/c2-studio-sidebar-pages

# Commit padrão
git commit -m "type(scope): description (issue #XX)"
# Types: feat, fix, docs, ci, chore, refactor
# Scopes: studio, design-system, tokens, storybook

# Push + PR (GitHub Actions valida automaticamente)
git push -u origin feature/{...}
# GitHub Actions (sprint-2-validation.yml):
#   - validate-setup
#   - pnpm build + lint + type-check
#   - report + notify-main

# Merge via squash (GitHub web UI ou)
gh pr merge <NUMBER> --squash
```

### SpecKit Integration (PR Quality Validation)

**O que é**: Validador automático de PRs que garante qualidade sem review manual repetitivo.

**Como usar**:

1. **Após abrir PR**, comente:
   ```
   /spec
   ```

2. **SpecKit valida automaticamente**:
   - ✅ Título segue conventional commits? (feat/fix/docs/chore/refactor)
   - ✅ Descrição tem min 50 caracteres?
   - ✅ Labels obrigatórios presentes?
   - ✅ Componentes DS têm stories no Storybook?
   - ✅ Jornadas têm README com seções obrigatórias?
   - ✅ APIs têm response schema definido?
   - ✅ Build passa? Lint OK? Type-check OK?

3. **SpecKit posta relatório claro**:
   ```
   ✅ PR Title Format
   ✅ PR Description Length
   ✅ Component Stories (6/6)
   ✅ Build Status
   ❌ Journey Documentation (faltam links.md)
   ```

4. **Dev ajusta** conforme relatório e roda `/spec` novamente

5. **Quando TUDO ✅**: Safe to merge!

**Benefícios**:
- Reduz review loops de 3-4 para 1 iteração
- Zero surpresas ao mergear (qualidade garantida)
- Documentação sempre atualizada
- Histórico de Git limpo (conventional commits)
- Devs mais rápidos (feedback imediato)

**Especificações** estão em `.github/spec.yml` — customize conforme necessário.

---

## 📐 Padrões de Código

### Componentes (Design System)

**Arquivo**: `packages/design-system/src/components/{Component}/{Component}.tsx`

```tsx
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
```

**Regras**:

- `forwardRef` para componentes baixo-nível
- CSS Modules: `styles.component`, `styles.variant`, `styles.size`
- Props interface com JSDoc
- `export type { Props }` (tipo exportado)

### Tokens

Arquivo: `packages/tokens/src/tokens.json`

```json
{
  "color": {
    "primary": { "value": "#...", "type": "color" },
    "secondary": { "value": "#...", "type": "color" }
  },
  "space": {
    "sm": { "value": "8px", "type": "dimension" }
  }
}
```

Build: `pnpm build:tokens` → gera `--color-primary`, `--space-sm` CSS variables + JS exports

### CSS Modules

Consumir tokens em componentes:

```css
.button {
  padding: var(--space-md);
  background: var(--color-primary);
  border-radius: var(--radius-md);
  font-family: var(--font-family-base);
  color: var(--color-neutral-900);
}

.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## 🎨 Puck Integration (Studio)

Arquivo: `apps/studio/src/config/puck.config.tsx`

```tsx
import { Config } from "@measured/puck";

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
      render: ({ text, variant }) => <Button variant={variant}>{text}</Button>,
    },
    // ... mais componentes
  },
};
```

**Workflow**:

1. Novo componente no DS → adicionar story no Storybook
2. Registrar em `puckConfig.components`
3. Testar em `/studio` (Puck editor)
4. Renderizar via `[...slug]/page.tsx`

---

## 📁 Estrutura de Jornadas

Template em: `domains/template-jornada.md`

Padrão:

```
domains/{DOMINIO}/journeys/{nome-jornada}/
  ├─ README.md (objetivo, status, componentes, links)
  ├─ notas.md (decisões UX/design)
  └─ links.md (Studio, Figma, etc)
```

**README template**:

```markdown
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

## Links

- [Studio](http://localhost:3000/{slug})
- [Figma]({url})
```

---

## 🚀 Sprint 2 Execution (P1 Issues)

**5 Issues prontas para execução** (docs em raiz):

1. **#10 (G6)** – `CONTRIBUTING.md` (1-2d, independente)
2. **#6 (C2)** – Studio Sidebar (3-4d, paralelo, depende C1 ✅)
3. **#9 (G4)** – Script índice jornadas (2-3d, paralelo)
4. **#7 (B4)** – Acessibilidade DS (4-5d, habilita #8)
5. **#8 (D2)** – Addon Storybook A11y (2-3d, depende #7)

**Guias em Raiz**:

- `START_SPRINT2.md` – Bem-vindo em 60s
- `RUN_SPRINT2.md` ⭐ – Guia PRINCIPAL (5 issues detalhadas)
- `SPRINT2_STATUS.md` – Timeline, riscos, métricas
- `SPRINT2_QUICK_START.md` – Setup 5min (Codespaces)
- `SPRINT2_GITHUB_ACTIONS.md` – CI/CD automation
- `docs/sprint-2-planning.md` – Planejamento técnico
- `docs/sprint-2-execution-prompt.md` – Scripts copy-paste

**GitHub Actions** (automático):

- `.github/workflows/sprint-2-validation.yml` → 4 jobs (setup, build+lint+type-check, report, notify)
- Roda em push/PR → bloqueia merge se falhar
- Duração esperada: ~180s (3 min)

---

## 🚀 Sprint 3 Execution (Dashboard & Game Hub)

**Status**: ✅ Fase 1 e 2 completadas (5/9 issues) | 🟢 Fase 3 e 4 prontas para execução

### Documentação Principal

**Índice Central**: `SPRINT3_DOCUMENTATION_INDEX.md` ⭐ – Ponto de entrada para toda documentação Sprint 3

**Guias de Execução**:

- `SPRINT3_EXECUTION_DETAILED.md` ⭐ – Prompts prontos para copiar (Issues #53, #54, #55, #58)
- `AGENT_PHASE2_DASHBOARD.md` – Resumo das 4 issues restantes (alternativo)
- `SPRINT3_CHECKPOINT.md` – Status após Fase 2
- `SPRINT3_FINAL_STATUS.md` – Progresso atual e métricas
- `SPRINT3_QUICK_START.md` – Setup rápido em 5 minutos
- `docs/SPRINT3_EXECUTION_MASTER.md` – Algoritmo e status técnico

### Issues Restantes (Fase 3)

| #   | Título         | Prioridade | Depende de | Tipo     | Tempo Est |
| --- | -------------- | ---------- | ---------- | -------- | --------- |
| #53 | Dashboard API  | P2         | #59 ✅     | Backend  | 3h        |
| #54 | Dashboard UI   | P2         | #53 ⏳     | Frontend | 3h        |
| #55 | Health Metrics | P2         | #54 ⏳     | Feature  | 2h        |
| #58 | Game Hub       | P2         | #61 ✅     | Jornada  | 3h        |

### Grafo de Dependências

```
CADEIA SEQUENCIAL:
#53 (Dashboard API)
  ↓
#54 (Dashboard UI)
  ↓
#55 (Health Metrics)

PARALELO:
#58 (Game Hub) — pode rodar em paralelo com a cadeia
```

### Issues Legadas (Fase 4)

5 issues serão fechadas após conclusão das issues principais:

- #4 (BackOffice Epic)
- #11 (Dashboard Epic)
- #13 (Endpoint API)
- #14 (Dashboard POC)
- #15 (Health Indicators)

### Como Começar

1. **Leia**: `SPRINT3_DOCUMENTATION_INDEX.md` (5 min)
2. **Abra**: `SPRINT3_EXECUTION_DETAILED.md` (guia principal)
3. **Copie**: PROMPT correspondente à issue que quer executar
4. **Execute**: Seguindo as instruções detalhadas

**Progresso Atual**: 5/9 issues fechadas (56%) | Tempo Restante: ~11.5 horas

---

## ⚙️ Build & Package Management

### tsup.config.ts (Design System)

- **Exporta**: ESM + CJS
- **Adiciona**: `"use client"` directive (banner)
- **Sourcemaps**: automáticas
- **Types**: geradas via tsc

### Next.js (Studio)

- **Router**: App Router (📁 estrutura de diretórios é rotas)
- **Layouts**: `layout.tsx` (global em `app/`, sidebar)
- **Dynamic Routes**: `app/[[...slug]]/page.tsx` (renderiza JSON)
- **API**: Route handlers em `app/api/pages/route.ts`
- **Styles**: CSS Modules + global `globals.css`

### Storybook (ESM-only)

- **Manager**: Vite
- **Stories**: `*.stories.tsx` em `apps/storybook/src/stories/`
- **Addons**: `@storybook/addon-a11y`, `@storybook/addon-essentials`
- **Config**: `.storybook/main.ts` (TypeScript)

---

## 🔍 Debugging & Troubleshooting

### Build Falha

```bash
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
```

### Lint/Type Errors

```bash
# Rodar local (antes de push)
pnpm lint
pnpm -r type-check

# Fixar automáticamente
pnpm lint --fix
```

### Port Conflicts

```bash
# Kill processos anteriores
npx kill-port 3000 6006

# Reiniciar devs
pnpm dev:studio &
pnpm dev:storybook &
```

### GitHub Actions Falha

1. Clique "Re-run all jobs" (pode ser timeout/fluke)
2. Leia logs em Actions tab → step que falhou
3. Rode localmente: `pnpm build && pnpm lint && pnpm -r type-check`
4. Fix + commit + push novamente

---

## 📊 Decision Log (Por Quê Desse Jeito?)

| Decisão                | Razão                                  | Trade-off              |
| ---------------------- | -------------------------------------- | ---------------------- |
| **pnpm workspaces**    | Monorepo + link automático + lock file | Curva aprendizado      |
| **CSS Modules**        | Sem runtime, tree-shake safe           | Não há utility classes |
| **Puck para editor**   | Visual, sem código, rápido             | Limited customization  |
| **Storybook ESM-only** | Performance, modern tooling            | Sem CommonJS           |
| **Next.js App Router** | File-based routing, server components  | Migrando de pages      |
| **Node 22 LTS**        | Estável, não cutting-edge              | Muda em Apr 2027       |

---

## 💾 Key Files to Know

| Arquivo                                     | Propósito                                      |
| ------------------------------------------- | ---------------------------------------------- |
| `.nvmrc`                                    | Node version (22.x.x)                          |
| `pnpm-workspace.yaml`                       | Define workspaces                              |
| `package.json` (root)                       | Scripts: `pnpm dev:studio`, `pnpm build`, etc  |
| `packages/design-system/package.json`       | Exports: `main` (CJS), `module` (ESM), `types` |
| `packages/tokens/src/tokens.json`           | Fonte de verdade para design tokens            |
| `apps/studio/src/config/puck.config.tsx`    | Registro de componentes para Puck              |
| `apps/studio/src/app/[[...slug]]/page.tsx`  | Renderiza páginas JSON do localStorage         |
| `.github/workflows/sprint-2-validation.yml` | CI/CD automation                               |
| `docs/sprint-2-planning.md`                 | Contexto técnico de P1                         |
| `.github/spec.yml`                          | SpecKit specifications (PR validation config)  |

---

## ✅ Checklist para Agents

### Antes de qualquer ação:

1. **Verificar ambiente**:
   - [ ] `node --version` → v22.x.x
   - [ ] `pnpm --version` → 9.14.4+
   - [ ] `git --version` → 2.52.0+

2. **Ler instruções e specs**:
   - [ ] Entender o projeto (repositório, stack, arquitetura)
   - [ ] Verificar `.github/spec.yml` para requirements
   - [ ] Ler issue/prompt completo antes de começar

### Quando modificar componentes DS:

- [ ] Manter interface de props estável (adicionar, não remover)
- [ ] Atualizar stories no Storybook
- [ ] Rodar `pnpm build:design-system` e verificar tipos
- [ ] Novo componente? Adicionar em `packages/design-system/src/index.ts`
- [ ] Registrar em `puckConfig` se for usado em Studio

Quando adicionar jornada:

- [ ] Criar pasta em `domains/{dominio}/journeys/{nome}/`
- [ ] Documentar em README com objetivo, componentes, links
- [ ] Criar página correspondente no Studio
- [ ] Linkar em `domains/README.md` ou índice

Quando adicionar novos tokens:

- [ ] Editar `packages/tokens/src/tokens.json`
- [ ] Rodar `pnpm build:tokens`
- [ ] Verificar CSS variables + JS exports
- [ ] Atualizar componentes DS para usar novos tokens

Antes de mergear PR:

- [ ] `pnpm build` sem erros
- [ ] `pnpm lint` sem warnings críticos
- [ ] `pnpm -r type-check` sem erros
- [ ] Stories/exemplos funcionando (se componente)
- [ ] Página no Studio funcional (se jornada)
- [ ] README/docs atualizado
- [ ] Nenhum `console.error` em dev
- [ ] **SpecKit validação**: Postar `/spec` em comentário de PR
  - [ ] Todos os checks ✅ (título, descrição, labels, stories, docs)
  - [ ] Se algum ❌, ajustar conforme relatório e rodar `/spec` novamente
  - [ ] Apenas mergear quando TUDO estiver ✅

**SpecKit é obrigatório antes de mergear qualquer PR!**

---

## 🎓 Learning Resources

- **Monorepo pnpm**: Veja `pnpm-workspace.yaml` + `package.json` (root)
- **Design tokens**: `packages/tokens/README.md` + `src/tokens.json`
- **Componentes padrão**: `packages/design-system/src/components/*/`
- **Puck integration**: `apps/studio/src/config/puck.config.tsx`
- **Jornadas**: `domains/README.md` + examples em `domains/*/`
- **Sprint 2 docs**: `RUN_SPRINT2.md` (guia principal)
- **Sprint 3 docs**: `SPRINT3_DOCUMENTATION_INDEX.md` ⭐ (índice central)

---

**Próximo Passo para Agents**:

- **Sprint 2**: Começar em `RUN_SPRINT2.md` ou `START_SPRINT2.md`
- **Sprint 3**: Começar em `SPRINT3_DOCUMENTATION_INDEX.md` para navegação completa ou `SPRINT3_EXECUTION_DETAILED.md` para prompts prontos
