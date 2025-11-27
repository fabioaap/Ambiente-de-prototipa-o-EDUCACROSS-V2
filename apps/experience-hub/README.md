# Experience Hub

O Experience Hub consolida o Storybook e futuras páginas utilitárias (dashboards, catálogos) num único espaço dedicado, isolado do Studio e sem vazamento de CSS global para `/dashboard`.

## Objetivo

- **Servir jornadas documentadas**: referenciar exclusivamente componentes e histórias vinculadas a `domains/{BackOffice,FrontOffice,Game}/journeys/*`.
- **Evitar conflitos de CSS**: CSS global do Storybook não interfere com `/dashboard` no Studio.
- **Guardrails Shadcn**: apenas o dashboard raiz (em `apps/studio/src/app/dashboard/`) pode usar Shadcn; tudo aqui usa `@prototipo/design-system` + tokens.

## Estrutura

```
apps/experience-hub/
├── storybook/              # Configuração + stories migradas de apps/storybook
│   ├── .storybook/
│   │   ├── main.ts
│   │   ├── preview.ts
│   │   └── ...
│   ├── stories/            # Stories vinculadas a domains/*
│   └── package.json
└── README.md               # Este arquivo
```

## Comandos

```bash
# Desenvolvimento
pnpm dev:hub           # Inicia Storybook em http://localhost:6006

# Build
pnpm build:hub        # Compila Storybook

# Build completo (respeita ordem de dependências)
pnpm build            # tokens → design-system → hub → studio
```

## Rastreabilidade

Cada história/jornada neste hub deve ter correspondência em:
- `domains/{domain}/journeys/{journey}/README.md` (documentação)
- `domains/{domain}/journeys/{journey}/links.md` (links para Studio/Hub)
- Story no Storybook (componentes + variações)

Exemplo:
```
domains/BackOffice/journeys/Dashboard/
├── README.md          # Objetivo, status, componentes
├── links.md           # Hub: http://localhost:6006/?path=/docs/...
└── notas.md           # Decisões UX
```

## Validações Antes de Commit

```bash
pnpm lint              # Verificar estilo/format
pnpm -r type-check     # TypeScript strict
pnpm build             # Build completo
pnpm dev:hub           # Verificar stories sem console.error
pnpm check:shadcn      # Confirmar que nenhum arquivo aqui usa Shadcn
```

## Migração desde `apps/storybook`

Durante a consolidação (Sprint 3), o conteúdo de `apps/storybook` foi movido para `apps/experience-hub/storybook`. O antigo diretório foi removido para evitar conflitos de CSS global.

Referências:
- [SPRINT3_DOCUMENTATION_INDEX.md](/SPRINT3_DOCUMENTATION_INDEX.md)
- [PROGRESS_DASHBOARD.md](/PROGRESS_DASHBOARD.md)
- [specs/001-experience-hub-consolidation/spec.md](/specs/001-experience-hub-consolidation/spec.md)
