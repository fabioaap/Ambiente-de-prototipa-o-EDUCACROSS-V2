# EDUCACROSS Prototipação – Copilot Instructions

## 🎯 Contexto e Propósito

Este é um **ambiente de prototipação orientado a jornadas**, não um repositório de produção. O foco é velocidade, clareza e qualidade para PMs, designers e desenvolvedores explorarem fluxos reais antes de implementação.

**Stack Principal:**
- Monorepo com `pnpm workspaces` (Node 22 LTS, pnpm 9.14.4+)
- React 18 + Next.js 15 (App Router) + TypeScript 5
- Puck OSS (page builder visual) + Storybook 8 (ESM-only)
- Design tokens + biblioteca de componentes reutilizáveis

## 📁 Estrutura e Responsabilidades

```
packages/
  ├── design-system/  → Componentes React (Button, Text, Card, Layout)
  │                      Exporta ESM + CommonJS via tsup, com "use client"
  └── tokens/         → Design tokens (cores, tipografia, espaçamentos)
                          Exporta CSS variables + JS/TS

apps/
  ├── studio/         → Next.js com Puck integrado
  │                      Rota `/studio` = editor visual
  │                      Outras rotas = render de páginas JSON do localStorage
  └── storybook/      → Catálogo visual de componentes (ESM-only, porta 6006)

domains/             → Jornadas de prototipagem (BackOffice, FrontOffice, Game)
                         Cada jornada = pasta em kebab-case com README, notas e links
```

**Comunicação entre pacotes:**
- `studio` consome `@prototipo/design-system` + `@prototipo/tokens` via workspace
- `storybook` também consome ambos
- Componentes do DS usam CSS Modules + tokens CSS variables

## 🔨 Workflows Essenciais

### Desenvolvimento

```bash
# Instalar todas as dependências do monorepo
pnpm install

# Iniciar Studio (editor visual Puck na porta 3000)
pnpm dev:studio

# Iniciar Storybook (catálogo de componentes na porta 6006)
pnpm dev:storybook

# Build de todos os pacotes (ordem: tokens → design-system → apps)
pnpm build

# Lint em todos os workspaces
pnpm lint

# Tipo-check
pnpm -r type-check
```

### Builds Específicos

```bash
# Tokens: gera CSS variables + exports JS/TS
pnpm build:tokens

# Design System: compila com tsup (CJS + ESM com "use client")
pnpm build:design-system

# Studio + Storybook: builds normais Next.js e Storybook
pnpm build:studio
pnpm build:storybook
```

**Checklist essencial antes de commitar:**
1. `pnpm build` sem erros
2. `pnpm lint` sem warnings críticos
3. Páginas no Studio + stories no Storybook funcionando

## 🎨 Padrões de Componentes

### Estrutura de Arquivo

```
packages/design-system/src/components/Button/
  ├── Button.tsx         → Componente React com JSDoc + props interface
  ├── Button.module.css  → Estilos CSS Modules
  └── Button.stories.tsx → Story no Storybook
```

### Convenção de Componentes

```tsx
// Exemplo: Button.tsx
import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual (primary, secondary, outline, ghost) */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Tamanho (sm, md, lg) */
  size?: 'sm' | 'md' | 'lg';
  /** Ocupar 100% da largura do container */
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className = '', ...props }, ref) => {
    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      className,
    ].filter(Boolean).join(' ');

    return <button ref={ref} className={classNames} {...props} />;
  }
);
Button.displayName = 'Button';
```

**Regras:**
- Use `forwardRef` para componentes de baixo nível (botões, inputs, etc.)
- CSS Modules com BEM simples: `styles.button`, `styles.primary`, `styles.size`
- Props interface explícita com JSDoc para cada prop
- Sempre exportar tipos (`export type { ButtonProps }`)

### Consumindo Tokens

```css
/* Button.module.css */
.button {
  padding: var(--space-md);
  background-color: var(--color-primary);
  border-radius: var(--radius-md);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
}
```

**Tokens disponíveis** (`packages/tokens/src/tokens.json`):
- `--color-*` (primary, secondary, neutral, success, warning, error)
- `--space-*` (xs, sm, md, lg, xl)
- `--radius-*` (sm, md, lg)
- `--font-family-*`, `--font-size-*`, `--font-weight-*`
- `--shadow-*`

## 📄 Configuração de Puck no Studio

Arquivo: `apps/studio/src/config/puck.config.tsx`

**Cada componente precisa ser registrado:**

```tsx
export const puckConfig: Config = {
  components: {
    Button: {
      fields: {
        text: { type: 'text' },
        variant: {
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            // ...
          ],
        },
      },
      render: ({ text, variant, size }) => (
        <Button variant={variant} size={size}>{text}</Button>
      ),
    },
    // ... mais componentes
  },
};
```

**Mudança de componentes do DS → atualizar puckConfig**

## 🎯 Jornadas e Domínios

Padrão para adicionar nova jornada em `domains/{dominio}/journeys/`:

```
domains/BackOffice/journeys/nova-jornada/
  ├── README.md           # Objetivo, decisões, componentes usados
  ├── notas.md           # Notas de design/UX
  └── links.md           # Links para Studio, Figma, etc
```

**Template README:**

```markdown
# Jornada: Nova Jornada

## Objetivo
[Descrever o resultado de negócio ou experiência esperada]

## Status
- [ ] Planejamento
- [ ] Em andamento
- [ ] Concluído
- [ ] Arquivado

## Componentes do DS Utilizados
- Button (variant primary, size md)
- Text (h1, base, bold)
- Card (elevated)

## Links
- [Studio: Nova Página](http://localhost:3000/nova-jornada)
- [Figma: Design Ref](...)
```

## ⚙️ Configuração TypeScript e Build

**tsup.config.ts** (design-system):

```ts
// Gera ESM + CJS, adiciona "use client" no banner
// Estilos CSS devem ser importados manualmente
// Sourcemaps e type definitions automáticas
```

**Next.js** (studio): App Router, sem pages router. Use layout.tsx para estrutura global.

**Storybook**: ESM-only com Vite. Stories em `.stories.tsx`.

## 🚨 Decisões Arquiteturais

1. **Monorepo com workspaces** → facilita compartilhamento de código e versionamento sincronizado
2. **CSS Modules + tokens CSS variables** → sem dependência de Tailwind, máximo controle
3. **Puck para prototipagem visual** → reduz tempo de designer→dev e permite iteração rápida
4. **localStorage para persistência** → suficiente para fase de prototipagem
5. **TypeScript strict** → evita erros sutis em componentes reutilizáveis
6. **Node 22 LTS** → estável, performance, não versões cutting-edge

## 🤖 Instruções para Agentes IA

### Quando modificar componentes do DS:
1. Manter interface de props estável (adicionar, não remover)
2. Atualizar stories no Storybook
3. Rodar `pnpm build:design-system` e verificar tipos
4. Se novo componente: adicionar à `packages/design-system/src/index.ts`
5. Registrar no puckConfig se for usado no Studio

### Quando adicionar nova jornada:
1. Criar pasta em `domains/{dominio}/journeys/nome-jornada/`
2. Documentar em README com objetivo, componentes, links
3. Criar página correspondente no Studio (rota dinâmica ou estática)
4. Linkar no backlog se for complexa

### Quando adicionar novos tokens:
1. Editar `packages/tokens/src/tokens.json`
2. Rodar `pnpm build:tokens`
3. Verificar export em JS + CSS variables
4. Atualizar componentes do DS para usar novos tokens

## 📚 Referências Internas

- `docs/backlog.md` → Roadmap e políticas
- `domains/README.md` → Guia de jornadas
- `packages/design-system/README.md` → Exemplos de componentes
- `.github/agents/` → Instruções especializadas (Frontend, DevOps)

## ✅ Definition of Done

Código pronto quando:
- [ ] Build completo sem erros (`pnpm build`)
- [ ] TypeScript sem problemas (`pnpm -r type-check`)
- [ ] Lint passa (`pnpm lint`)
- [ ] Stories/exemplos no Storybook (se componente)
- [ ] Página no Studio funcional (se jornada)
- [ ] README/docs atualizado
- [ ] Nenhum console.error em dev
