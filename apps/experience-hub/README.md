# Experience Hub

Hub centralizado de experiências EDUCACROSS para prototipação e documentação de componentes.

## Objetivo

O Experience Hub consolida o Storybook e futuras páginas utilitárias (dashboards demo, catálogos) em um único local, sem interferir no Studio (`apps/studio`). 

Esta estrutura garante:
- **Isolamento**: CSS e estilos não vazam para `/dashboard` ou outras rotas do Studio
- **Consistência**: Todas as stories/jornadas usam apenas `@prototipo/design-system`
- **Rastreabilidade**: Links para jornadas em `domains/*` apontam para slugs válidos

## Estrutura

```
apps/experience-hub/
├── storybook/          # Configuração do Storybook
│   ├── .storybook/     # main.ts, preview.ts
│   ├── src/stories/    # Stories dos componentes
│   └── package.json
└── README.md           # Este arquivo
```

## Comandos

```bash
# Desenvolvimento
pnpm dev:hub         # Inicia Storybook em http://localhost:6006

# Build
pnpm build:hub       # Gera build estático do Storybook
```

## Relação com `domains/*`

O Storybook do Experience Hub consome e documenta componentes vinculados às jornadas definidas em:

- `domains/BackOffice/journeys/*`
- `domains/FrontOffice/journeys/*`
- `domains/Game/journeys/*`

Cada componente documentado deve ter correspondência com as jornadas e ser implementado usando apenas `@prototipo/design-system`.

## Guardrails

- **Shadcn**: Componentes Shadcn (`@/components/ui/*`) são restritos ao dashboard raiz (`apps/studio/src/app/dashboard`)
- **CSS Global**: Nenhum estilo global deve vazar para outras apps
- **Validação**: Execute `pnpm check:shadcn` para garantir conformidade

## Links úteis

- [Storybook](http://localhost:6006) - Catálogo de componentes
- [Studio](http://localhost:3000/studio) - Editor Puck
- [Dashboard](http://localhost:3000/dashboard) - Dashboard operacional
- [domains/README.md](../../domains/README.md) - Mapa de jornadas
