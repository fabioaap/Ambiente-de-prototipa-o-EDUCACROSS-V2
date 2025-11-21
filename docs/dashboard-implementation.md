# Dashboard UI - Documentação de Implementação

## Visão Geral

Esta implementação adiciona uma interface de Dashboard completa ao Studio, permitindo visualizar e gerenciar todas as páginas criadas, com filtros por domínio e indicadores de saúde do sistema.

## Estrutura de Arquivos Criados/Modificados

### Novos Arquivos

1. **`apps/studio/src/app/(app)/dashboard/page.tsx`**
   - Componente React principal do Dashboard
   - Interface client-side que consome a API `/api/dashboard/pages`
   - Inclui:
     - Indicadores de saúde (total de páginas, domínios ativos, status build, Storybook)
     - Resumo de páginas por domínio com código de cores
     - Lista de páginas com cards interativos
     - Filtro por domínio (dropdown)
     - Links para edição (Studio) e visualização

2. **`apps/studio/src/app/(app)/dashboard/Dashboard.module.css`**
   - Estilos CSS Modules para o Dashboard
   - Layout responsivo com CSS Grid
   - Estados de hover e transições
   - Design consistente com design tokens

### Arquivos Modificados

1. **`apps/studio/src/app/api/dashboard/pages/route.ts`**
   - **Correção**: Ajuste no caminho do diretório de páginas (`data/pages` em vez de `apps/studio/data/pages`)
   - Necessário porque `process.cwd()` já aponta para `apps/studio` quando executado

2. **`apps/studio/src/app/(app)/page.tsx`** (movido de `apps/studio/src/app/page.tsx`)
   - Adicionado card "Dashboard" na home
   - Reorganização visual dos cards existentes

### Reestruturação de Rotas

**Problema Original**: Conflito de roteamento entre `/` e `/[[...slug]]` (mesma especificidade)

**Solução Implementada**:
- Criado route group `(app)` para rotas de aplicação (home, studio, dashboard)
- Renomeado `[[...slug]]` para `pages/[...slug]` (não-opcional)
- Estrutura final:
  ```
  src/app/
  ├── (app)/              # Route group para rotas da aplicação
  │   ├── page.tsx        # Home (/)
  │   ├── studio/
  │   │   └── page.tsx    # Studio (/studio)
  │   └── dashboard/
  │       ├── page.tsx    # Dashboard (/dashboard)
  │       └── Dashboard.module.css
  ├── pages/
  │   └── [...slug]/
  │       └── page.tsx    # Páginas renderizadas (/pages/*)
  └── api/
      └── dashboard/
          └── pages/
              └── route.ts
  ```

## Funcionalidades Implementadas

### ✅ Acceptance Criteria

1. **Lista de páginas com links para Studio**
   - ✓ Cards de páginas exibem nome, slug e domínio
   - ✓ Botão "Editar no Studio" com link direto para edição
   - ✓ Botão "Visualizar" para ver a página renderizada

2. **Filtros por domínio/job**
   - ✓ Select dropdown com opções: Todos, BackOffice, FrontOffice, Game, Outros
   - ✓ Filtragem instantânea ao selecionar domínio
   - ✓ Contador de páginas atualiza conforme filtro

3. **Visualização mínima de indicadores de saúde (build status)**
   - ✓ Total de páginas
   - ✓ Total de domínios ativos
   - ✓ Status do Build (success/building/failed)
   - ✓ Status do Storybook (online/building/offline)
   - ✓ Resumo de páginas por domínio com cores

## Componentes do Design System Utilizados

- `Card` (variants: bordered, elevated)
- `Text` (sizes: xs, sm, base, lg, xl, 2xl, 3xl)
- `Button` (variants: primary, secondary, outline)
- `Select` (com options prop)

## Tokens CSS Utilizados

- Cores: `--color-primary-*`, `--color-neutral-*`, `--color-success-*`, etc.
- Espaçamentos: `--space-*` (2, 3, 4, 6, 8)
- Bordas: `--radius-*` (sm, full)
- Sombras: `--shadow-*` (lg)

## Como Testar

### 1. Iniciar o servidor de desenvolvimento

```bash
pnpm dev:studio
```

### 2. Acessar as páginas

- **Home**: http://localhost:3000/
- **Dashboard**: http://localhost:3000/dashboard
- **API**: http://localhost:3000/api/dashboard/pages

### 3. Testar funcionalidades

1. Verificar se o card "Dashboard" aparece na home
2. Clicar em "Ver Dashboard"
3. Verificar indicadores de saúde no topo
4. Verificar resumo por domínio
5. Testar filtro de domínios
6. Clicar em "Editar no Studio" em um card de página
7. Verificar navegação para o Studio com página carregada

### 4. Testar API diretamente

```bash
curl http://localhost:3000/api/dashboard/pages | jq '.'
```

Resposta esperada:
```json
{
  "pages": [
    {
      "id": "backoffice-revisao-questoes-detalhe",
      "slug": "backoffice/revisao-questoes/detalhe",
      "name": "BackOffice | Revisão de Questões · Detalhe",
      "domain": "BackOffice",
      "editUrl": "/studio?page=backoffice%2Frevisao-questoes%2Fdetalhe",
      "viewUrl": "/pages/backoffice/revisao-questoes/detalhe",
      ...
    }
  ],
  "stats": {
    "totalPages": 3,
    "totalDomains": 2,
    "buildStatus": "success",
    "storybook": "online",
    ...
  },
  "domains": { ... }
}
```

## Design Responsivo

O Dashboard é totalmente responsivo:

- **Desktop** (>768px): Grid de 3-4 colunas para cards de página
- **Mobile** (<768px): Layout de coluna única
- Breakpoints seguem tokens do design system

## Estado Loading e Erro

- **Loading**: Exibe mensagem centralizada "Carregando dashboard..."
- **Erro**: Exibe mensagem de erro com detalhes
- **Empty**: Mensagem "Nenhuma página encontrada" quando filtro não retorna resultados

## Próximas Melhorias (Fora do Escopo)

1. Adicionar busca por nome de página
2. Implementar paginação para grandes volumes
3. Adicionar ordenação (por nome, data, domínio)
4. Exibir data de última atualização em formato relativo (ex: "há 2 dias")
5. Adicionar ações em batch (ex: publicar múltiplas páginas)
6. Integrar com sistema de build real para status dinâmico
7. Adicionar gráficos de tendência de criação de páginas

## Notas Técnicas

- **Route Groups**: Uso de `(app)` mantém URLs limpas sem adicionar segmentos à URL
- **Client Component**: Dashboard usa `'use client'` pois faz fetch de dados no cliente
- **CSS Modules**: Scoped styles evitam conflitos globais
- **TypeScript**: Tipos fortes para dados da API garantem type safety
- **Acessibilidade**: Componentes do DS já incluem ARIA attributes apropriados

## Referências

- [Next.js Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Design System - Copilot Instructions](/.github/copilot-instructions.md)
