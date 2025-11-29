# Jornada: Dashboard (H)

## Objetivo
Prototipar a visão geral do BackOffice (Dashboard) para Gestores e Professores, exibindo métricas principais, atalhos e notificações.

## Status
- [x] Planejamento
- [x] Em andamento
- [ ] Concluído

## Componentes Utilizados
- Layout (Container responsivo, Sidebar)
- Card (KPIs, Métricas, Páginas recentes)
- Text (Títulos, descrições)
- Button (Ações)
- Badge (Status de domínio)
- Progress (Score de saúde)
- HealthIndicator (Métricas de saúde do sistema)

## Funcionalidades Implementadas
- Dashboard com KPIs principais (total páginas, domínios, score saúde)
- Indicadores de saúde do sistema (build, lint, type-check, deps)
- Contagem de páginas por domínio
- Lista de páginas recentes com ações (visualizar/editar)
- Estados de loading com skeletons
- Estado de erro com retry
- Atualização automática a cada 30 segundos (SWR)

## Links
- [Dashboard UI](http://localhost:3000/dashboard) - Acesse com `pnpm dev:studio`
- [API Summary](/api/dashboard/summary) - Endpoint consolidado
- [Figma](https://figma.com/...)

## Como Acessar
1. Execute `pnpm dev:studio` na raiz do projeto
2. Acesse http://localhost:3000/dashboard
3. Ou navegue pelo menu lateral no Studio
