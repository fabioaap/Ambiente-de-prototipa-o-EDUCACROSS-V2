# Dashboard UI – Tarefas Prioritárias

> Created: 2025-11-24

Resumo: Task list detalhada para implementar os requisitos da UI do Dashboard (Issue #54). Objetivo rápido: entregar listagem de páginas com buscas, filtros por domínio, carregamento responsivo e states (loading/error/empty).

## Arquivos alvo
- `domains/studio/src/app/studio/pages/page.tsx` (principal)
- `domains/studio/src/app/dashboard/page.tsx` (se for /dashboard)
- `domains/studio/src/app/dashboard/dashboard.module.css` (estilos)
- `domains/studio/src/app/api/pages/route.ts` (para query params: q, domain)
- `packages/design-system/src/components/{Input,Select,Card,Table,Pagination}/*` (adicionar/usar histórias)

## Estrutura de Tasks (H2.2)
1. UX & Layout (0.5h)
   - Criar `PagesList` container e `PageCard` componente
   - Usar `Card`, `Button`, `Text` do design system
   - Implementar grid/table com colunas: thumbnail, title, slug, updatedAt, actions

2. Data Fetching & Params (1h)
   - Consumo de `GET /api/pages` com SWR
   - Enviar query params suportados: limit, offset, q (title), domain
   - Implementar debounce 300ms para `q` (use `useDebounced` ou util)

3. Search & Filter (0.75h)
   - Input de pesquisa (client-side) com aria-label e placeholder
   - Dropdown de domain (options derivadas de `data`), com opção `All`
   - Garantir integração com params de URL (ex: `?q=ola&domain=backoffice`)

4. Pagination & Sorting (0.5h)
   - Paginação server-side/cliente (page + limit) com controles
   - Ordenação por `title` ou `updatedAt` (asc/desc)

5. Loading/Error/Empty States (0.5h)
   - Skeleton loader para cards e tabela
   - Error banner com retry
   - Empty message e CTA para `+ Nova Página`

6. Responsive (0.25h)
   - Verificar breakpoints: mobile, tablet, desktop
   - Adicionar `kpiGrid`/`pageCard` CSS tweaks se necessário

7. Storybook + Tests (1h)
   - Criar stories para `PageCard`, `PagesList` e `Search/Filter` controls
   - Unit tests (Vitest) para: debounce behavior, fetch success/fail, empty state
   - E2E (opcional): Playground com Cypress ou Playwright (manual)

## Acceptance Criteria (detalhado)
- [ ] `Pages` page exibida em `/studio/pages` ou `/dashboard` com listagem de páginas
- [ ] `GET /api/pages` consumido corretamente com `q` e `domain` e pagination params
- [ ] Loading skeleton visível e retirada quando os dados chegam
- [ ] Empty state exibido com CTA quando `data.length === 0`
- [ ] Search real-time com debounce e highlight (opcional)
- [ ] Filter por domain com dropdown e atualização do resultado
- [ ] Ordenação e paginação funcional (atualiza URL)
- [ ] Stories no Storybook cobrindo estados (empty, loading, filled)
- [ ] Tests unitários cobrindo lógica de fetch + error
- [ ] Link para editar/duplicar/delete (stubs) implementado

## Notas de Implementação
- Reutilizar `Card`, `Button`, `Text`, `Input` e `Select` do `@prototipo/design-system`
- Evitar estado global desnecessário; SWR + keys com params (['/api/pages', {q, domain, limit, offset}])
- Permitir toggles de dev (mock data) para testes locais com `VITE_` flag

## Próximo passo (executar agora)
1. Prioridade: Implementar `PagesList` + `PageCard` e SWR consumer
2. Criar PR com `/spec` para validação automática
3. Registrar stories no Storybook e confirm tests

---

_End of document._
