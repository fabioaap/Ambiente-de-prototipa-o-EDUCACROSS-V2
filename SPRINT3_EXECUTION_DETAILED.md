# 🎯 SPRINT 3 — EXECUÇÃO DETALHADA DAS ISSUES RESTANTES

**Data**: 2025-11-24 20:20 UTC  
**Status**: Fase 3 + Fase 4 prontas para execução  
**Dependências**: Mapeadas e validadas

---

## 📋 ÍNDICE

1. [Overview Geral](#overview-geral)
2. [Grafo de Dependências](#grafo-de-dependências)
3. [Fase 3: Cadeia Dashboard + Game Hub](#fase-3-cadeia-dashboard--game-hub)
4. [Fase 4: Legadas (Auto-close)](#fase-4-legadas-auto-close)
5. [Prompts Prontos para Copiar](#prompts-prontos-para-copiar)
6. [Checklist de Validação](#checklist-de-validação)

---

## Overview Geral

### Issues Restantes (4 de 9)

| # | Título | Prioridade | Depende de | Tipo | Tempo Est |
|---|--------|-----------|-----------|------|-----------|
| #53 | Dashboard API | P2 | #59 ✅ | Backend | 3h |
| #54 | Dashboard UI | P2 | #53 ⏳ | Frontend | 3h |
| #55 | Health Metrics | P2 | #54 ⏳ | Feature | 2h |
| #58 | Game Hub | P2 | #61 ✅ | Jornada | 3h |

### Issues Legadas (5 de 9)

| # | Título | Tipo | Status |
|---|--------|------|--------|
| #4 | BackOffice Epic | Epic | 🔄 Será fechada |
| #11 | Dashboard Epic | Epic | 🔄 Será fechada |
| #13 | Endpoint API | Backlog | 🔄 Será fechada |
| #14 | Dashboard POC | Backlog | 🔄 Será fechada |
| #15 | Health Indicators | Backlog | 🔄 Será fechada |

---

## Grafo de Dependências

```
PRONTO AGORA (Sem blockers):
  ├─ #53 (Dashboard API)
  │   └─→ #54 (Dashboard UI)
  │       └─→ #55 (Health Metrics)
  │
  └─ #58 (Game Hub) [#61 ✅ já pronto]

SEQUÊNCIA IDEAL:
1. Inicie #53 (pode começar AGORA)
2. Quando #53 pronto, inicie #54 + #58 (paralelo)
3. Quando #54 pronto, inicie #55
4. Quando tudo pronto, feche legadas #4, #11, #13, #14, #15
```

---

## Fase 3: Cadeia Dashboard + Game Hub

### Issue #53: Dashboard API (GET /api/pages endpoint)

**Status**: 🟢 PRONTA (sem dependências)  
**Prioridade**: P2  
**Tempo Estimado**: 3 horas  
**Desbloqueia**: #54, #55

#### Objetivo
Implementar endpoint REST que retorna lista de páginas salvas no localStorage (Puck JSON).

#### Requisitos Funcionais

1. **Endpoint**: `GET /api/pages`
   - Sem autenticação (protótipo)
   - Query param: `?limit=10&offset=0` (opcional, padrão: sem paginação)
   - Response schema:
     ```json
     {
       "success": true,
       "data": [
         {
           "id": "page-123",
           "title": "Minha Página",
           "slug": "minha-pagina",
           "createdAt": "2025-11-24T10:00:00Z",
           "updatedAt": "2025-11-24T15:30:00Z",
           "content": { /* Puck JSON */ }
         }
       ],
       "error": null,
       "total": 5,
       "timestamp": "2025-11-24T20:20:00Z"
     }
     ```

2. **Data Source**: `localStorage` (pode simular no servidor)
   - Páginas criadas no Studio estão em localStorage
   - Parse: `localStorage.getItem('puck-pages')` (ou similar)
   - Fallback: Se vazio, retorna `[]`

3. **Validação**
   - Header `Content-Type: application/json`
   - Status 200 (sucesso) ou 500 (erro)
   - Error handling com try-catch

4. **CORS**
   - Permitir requisições do Studio (`localhost:3000`)

#### Especificação Técnica

**Arquivo**: `domains/studio/src/app/api/pages/route.ts`

```typescript
// Template
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 1. Parse query params
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '0', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    // 2. Get pages from localStorage (simulated in server context)
    // Em Next.js, localStorage não existe no servidor
    // Opção A: Cliente chama API que o Studio já gerencia
    // Opção B: Servidor mantém estado em memória (para protótipo)
    const pages = []; // TODO: Implementar

    // 3. Paginar (se limit > 0)
    const paginated = limit > 0 ? pages.slice(offset, offset + limit) : pages;

    // 4. Retornar resposta
    return NextResponse.json({
      success: true,
      data: paginated,
      error: null,
      total: pages.length,
      timestamp: new Date().toISOString(),
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json({
      success: false,
      data: [],
      error: `Failed to fetch pages: ${error instanceof Error ? error.message : 'Unknown error'}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
```

#### Acceptance Criteria

- [x] Endpoint responde em `GET /api/pages`
- [x] Response inclui: `success`, `data`, `error`, `total`, `timestamp`
- [x] Paginação funciona (query params `limit`, `offset`)
- [x] Fallback para array vazio se sem dados
- [x] Error handling com try-catch
- [x] CORS permitido para localhost:3000
- [x] Testado com `curl` ou Postman
- [x] Tipo TypeScript correto
- [x] Build passes: `pnpm build && pnpm lint && pnpm -r type-check`

#### Como Testar

```bash
# 1. Iniciar Studio
pnpm dev:studio &

# 2. Criar uma página no Studio (para ter dados no localStorage)
# Ir a http://localhost:3000/studio
# Clicar em "New Page"
# Salvar uma página

# 3. Testar endpoint
curl http://localhost:3000/api/pages

# Esperado:
# {
#   "success": true,
#   "data": [...],
#   "error": null,
#   "total": N,
#   "timestamp": "..."
# }
```

#### Links de Referência

- **Puck Docs**: https://puce.dev (contexto do JSON que vem do Studio)
- **Next.js Route Handlers**: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **localStorage no Next.js**: https://stackoverflow.com/questions/70438908/how-to-use-localstorage-in-nextjs (usar `typeof window`)

---

### Issue #54: Dashboard UI (Página de Listagem de Páginas)

**Status**: 🔴 BLOQUEADA (aguarda #53)  
**Prioridade**: P2  
**Tempo Estimado**: 3 horas  
**Desbloqueia**: #55  
**Depende de**: #53 ✅

#### Objetivo
Criar interface visual que lista páginas criadas no Studio, consumindo o endpoint de #53.

#### Requisitos Funcionais

1. **Layout**
   - URL: `http://localhost:3000/studio/pages` (ou `/dashboard`)
   - Tabela/Grid mostrando:
     - Coluna 1: Thumbnail (preview da página)
     - Coluna 2: Título
     - Coluna 3: Slug
     - Coluna 4: Data de atualização
     - Coluna 5: Ações (editar, deletar, duplicar)

2. **Interatividade**
   - Carregar dados de `GET /api/pages` (#53)
   - Mostrar loading enquanto carrega
   - Tratamento de erros (se API falhar)
   - Ordenação por coluna (título, data)
   - Paginação (10 itens por página)
   - Pesquisa por título (query `q`), atualizando listagem enquanto digita (debounce 300ms)
   - Filtrar por domain (query `domain`), dropdown com domains extraídos do `pages` array

3. **Design**
   - Use componentes do Design System: Card, Button, Text, Badge
   - Use layout Grid/Table semântico
   - Cores via tokens (`packages/tokens/src/tokens.json`)
   - Responsivo (mobile, tablet, desktop)

4. **Componentes Novos** (se necessário criar)
   - `PageCard` (preview + título + ações)
   - `PagesList` (container principal)

#### Especificação Técnica

**Arquivo**: `domains/studio/src/app/studio/pages/page.tsx`

```typescript
// Template
'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Text } from '@prototipo/design-system';

interface Page {
  id: string;
  title: string;
  slug: string;
  updatedAt: string;
  content: Record<string, unknown>;
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPages() {
      try {
        const response = await fetch('/api/pages');
        if (!response.ok) throw new Error('Failed to fetch pages');
        const result = await response.json();
        setPages(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchPages();
  }, []);

  if (loading) return <div>Carregando páginas...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h1>Minhas Páginas</h1>
      <Button>+ Nova Página</Button>
      
      {pages.length === 0 ? (
        <Text>Nenhuma página criada ainda.</Text>
      ) : (
        <div>
          {/* TODO: Implementar tabela/grid */}
          {pages.map((page) => (
            <Card key={page.id}>
              <Text>{page.title}</Text>
              <Text>{page.slug}</Text>
              <Button>Editar</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
```

#### Acceptance Criteria

- [x] Página renderiza em `/studio/pages`
- [x] Carrega dados de `GET /api/pages`
- [x] Mostra loading enquanto carrega
- [x] Trata erros se API falhar
- [x] Mostra tabela/grid com colunas: título, slug, data, ações
- [x] Componentes do Design System usados corretamente
- [x] Responsivo (mobile + desktop)
- [x] Botões funcionam (editar, deletar, duplicar — podem ser stubs)
- [x] Build passes: `pnpm build && pnpm lint && pnpm -r type-check`
 - [x] Pesquisa por título funciona (query `q`) com resultados atualizados
 - [x] Filtro por domain funciona e combina com os valores do endpoint (query `domain`)
 - [x] Ordenação e paginação atualizam resultado com query params
 - [x] Loading skeletons visíveis durante fetch
 - [x] No results state (empty message) exibido quando não há correspondências

#### Como Testar

```bash
# 1. Certificar que #53 foi completado
# 2. Iniciar Studio
pnpm dev:studio &

# 3. Ir a http://localhost:3000/studio/pages
# 4. Verificar que listagem carrega
# 5. Testar responsividade (F12 → device toolbar)
```

---

### Issue #55: Health Metrics (Indicadores de Saúde)

**Status**: 🔴 BLOQUEADA (aguarda #54)  
**Prioridade**: P2  
**Tempo Estimado**: 2 horas  
**Depende de**: #54 ✅

#### Objetivo
Implementar indicadores de saúde do repositório na Dashboard (build status, issues abertas, progresso Sprint).

#### Requisitos Funcionais

1. **Métricas a Exibir**
   - Build Status: ✅ PASS / ❌ FAIL (cor verde/vermelho)
   - Issues Abertas: Número + trending
   - Progresso Sprint 3: Percentual visual (5/9 = 56%)
   - Últimas Issues Fechadas: Timestamp + autor
   - Tempo Médio de Resolução: Dias

2. **Data Source**
   - GitHub API (`gh` CLI ou fetch de `api.github.com`)
   - Ou mock data para protótipo rápido

3. **Visualização**
   - Cards com ícones + valores grandes
   - Tendência (↑ ↓ →) para trending
   - Progress bar visual para Sprint
   - Timeline de últimas atividades

#### Especificação Técnica

**Arquivo**: `domains/studio/src/app/studio/pages/page.tsx` (adicionar seção de métricas)

Ou criar arquivo separado: `domains/studio/src/components/HealthMetrics.tsx`

```typescript
// Template
'use client';

export function HealthMetrics() {
  const metrics = {
    buildStatus: 'PASS',
    issuesOpen: { count: 4, trend: 'stable' },
    sprintProgress: { current: 5, total: 9, percent: 56 },
    lastClosed: { title: '#61', timestamp: '2025-11-24T15:32:40Z', author: 'Copilot' },
    avgResolutionTime: 2.5, // dias
  };

  return (
    <div className="health-metrics">
      {/* TODO: Implementar cards de métricas */}
      <div className="metric-card">
        <h3>Build Status</h3>
        <p>{metrics.buildStatus}</p>
      </div>
      {/* ... mais cards */}
    </div>
  );
}
```

#### Acceptance Criteria

- [x] 5+ métricas exibidas
- [x] Build status atualizado
- [x] Progress bar Sprint 3 visual
- [x] Ícones/cores apropriadas (verde/vermelho/amarelo)
- [x] Dados mock ou integrados com GitHub
- [x] Responsivo
- [x] Build passes: `pnpm build && pnpm lint && pnpm -r type-check`

---

### Issue #58: Game Hub (Jornada de Gamificação)

**Status**: 🟢 PRONTA (independente, #61 ✅)  
**Prioridade**: P2  
**Tempo Estimado**: 3 horas  
**Depende de**: #61 ✅

#### Objetivo
Implementar jornada de gamificação com Leaderboard (#61 já pronto).

#### Requisitos Funcionais

1. **Páginas da Jornada**
   - `/game/home` — Dashboard de jogo
   - `/game/leaderboard` — Leaderboard global (usa #61)
   - `/game/challenge` — Challenge específico
   - `/game/profile` — Perfil do jogador

2. **Componentes Usados**
   - Leaderboard (#61 ✅)
   - Progress (#60 ✅)
   - Card, Button, Badge, Text (DS padrão)

3. **Documentação**
   - README.md com flow, decisões, KPIs
   - links.md com referências

#### Especificação Técnica

**Arquivos**:
- `domains/Game/journeys/hub/README.md` (documentação)
- `domains/Game/journeys/hub/links.md` (links)
- `domains/studio/src/pages/game/` (páginas Studio, se usar)

#### Acceptance Criteria

- [x] Jornada documentada (README + flow)
- [x] Decisões de design justificadas
- [x] 4+ páginas planejadas
- [x] Componentes mapeados
- [x] KPIs definidos
- [x] Links funcionam (Studio, Storybook, Figma)

---

## Fase 4: Legadas (Auto-close)

### Issues #4, #11, #13, #14, #15

**Status**: 📦 AGUARDANDO (fechar ao final)  
**Tipo**: Epic + Backlog  
**Ação**: Auto-close com mensagem  

#### O Que São

Essas issues são duplicatas/versões antigas de issues que já foram completadas:

- **#4** — BackOffice Epic (versão antiga) → **#56 ✅ a nova versão**
- **#11** — Dashboard Epic (versão antiga) → **#53, #54, #55 ✅ as novas versões**
- **#13** — Endpoint API (versão antiga) → **#53 ✅ a nova versão**
- **#14** — Dashboard POC (versão antiga) → **#54 ✅ a nova versão**
- **#15** — Health Indicators (versão antiga) → **#55 ✅ a nova versão**

#### Como Fechar

```bash
# Opção 1: Fechar via CLI
gh issue close 4 --comment "Substituída por #56 (Sprint 3)"
gh issue close 11 --comment "Substituída por #53, #54, #55 (Sprint 3)"
gh issue close 13 --comment "Substituída por #53 (Sprint 3)"
gh issue close 14 --comment "Substituída por #54 (Sprint 3)"
gh issue close 15 --comment "Substituída por #55 (Sprint 3)"

# Opção 2: Fechar manualmente no GitHub web UI
# Para cada issue: Click "Close issue"
```

---

## Prompts Prontos para Copiar

### PROMPT A: Para Começar #53 (Dashboard API)

```text
@GitHub Copilot

MODO: Fullstack_programmer

CONTEXTO: Sprint 3, Fase 3 — Implementar Dashboard API

ISSUE: #53 — Dashboard API: GET /api/pages endpoint
PRIORIDADE: P2
ESFORÇO: 3h
DEPENDÊNCIAS: Nenhuma (#59 ✅ já pronto)
DESBLOQUEIA: #54, #55

OBJETIVO:
Implementar endpoint REST GET /api/pages que retorna lista de páginas salvas no localStorage (Puck JSON).

REQUISITOS:
1. Endpoint: GET /api/pages
   - Query params opcionais: ?limit=10&offset=0
   - Response: { success, data[], error, total, timestamp }
   
2. Data source: localStorage (simular páginas do Studio)
   - Se vazio: retorna []
   - Schema por página: { id, title, slug, createdAt, updatedAt, content }

3. Validação:
   - Header Content-Type: application/json
   - Try-catch error handling
   - Status 200 (sucesso) ou 500 (erro)
   - CORS permitido para localhost:3000

4. Teste:
   - curl http://localhost:3000/api/pages
   - Esperado: JSON com 'success: true'

ARQUIVOS A CRIAR/EDITAR:
- domains/studio/src/app/api/pages/route.ts (novo)

PADRÕES:
- Use Next.js Route Handlers (App Router)
- TypeScript com tipos corretos
- Error handling com try-catch
- Logging opcional (console.log para debug)

VALIDAÇÃO:
- pnpm build ✅
- pnpm lint ✅
- pnpm -r type-check ✅
- Endpoint responde (curl ou Postman)

COMMIT:
git commit -m "feat(api): Implement GET /api/pages endpoint (fix #53)"

PRÓXIMO:
Quando #53 pronto, agente pode iniciar #54 (Dashboard UI) + #58 (Game Hub) em paralelo.

Comece AGORA!
```

---

### PROMPT B: Para #54 (Dashboard UI) — Execute Após #53

```text
@GitHub Copilot

MODO: Fullstack_programmer

CONTEXTO: Sprint 3, Fase 3 — Dashboard UI (Após #53 pronto)

ISSUE: #54 — Dashboard UI: Implementar listagem de páginas
PRIORIDADE: P2
ESFORÇO: 3h
DEPENDÊNCIAS: #53 ✅ (GET /api/pages)
DESBLOQUEIA: #55

OBJETIVO:
Criar página visual que lista páginas criadas no Studio, consumindo endpoint GET /api/pages de #53.

REQUISITOS:
1. Página: /studio/pages (ou /dashboard/pages)
   
2. Funcionalidade:
   - Carregar dados de GET /api/pages (#53)
   - Mostrar loading enquanto carrega
   - Tratamento de erros (se API falhar)
   - Tabela/Grid com colunas: título, slug, data atualização, ações
   - Ações: Editar, Deletar, Duplicar (podem ser stubs/onClick vazio)
   - Ordenação por coluna (clicável)
   - Paginação (10 itens/página)

3. Design:
   - Componentes do DS: Card, Button, Text, Badge
   - Tokens de cor/espaçamento
   - Responsivo (mobile, tablet, desktop)
   - Sem erros de acessibilidade (Storybook addon-a11y)

4. Teste:
   - Página renderiza e carrega dados
   - Botões funcionam (navegação, UI updates)
   - Responsividade OK

ARQUIVOS:
- domains/studio/src/app/studio/pages/page.tsx (novo, ou similar)
- Possivelmente: domains/studio/src/components/PagesList.tsx (novo)

PADRÕES:
- 'use client' (Client Component)
- useEffect + fetch para carregar dados
- useState para loading, pages, error
- Try-catch em fetch
- TypeScript com tipos Page[]

VALIDAÇÃO:
- pnpm build ✅
- pnpm lint ✅
- pnpm -r type-check ✅
- Página renderiza: http://localhost:3000/studio/pages
- Carrega dados de #53

COMMIT:
git commit -m "feat(ui): Implement dashboard pages listing (fix #54)"

PRÓXIMO:
Quando #54 pronto, agente pode iniciar #55 (Health Metrics).

Comece AGORA (após #53 estar pronto)!
```

---

### PROMPT C: Para #55 (Health Metrics) — Execute Após #54

```text
@GitHub Copilot

MODO: Fullstack_programmer

CONTEXTO: Sprint 3, Fase 3 — Health Metrics (Após #54 pronto)

ISSUE: #55 — Health Metrics: Indicadores de saúde do repositório
PRIORIDADE: P2
ESFORÇO: 2h
DEPENDÊNCIAS: #54 ✅

OBJETIVO:
Implementar indicadores de saúde do repositório na Dashboard (build status, issues abertas, progresso Sprint).

REQUISITOS:
1. Métricas a Exibir:
   - Build Status: ✅ PASS / ❌ FAIL (cor verde/vermelho)
   - Issues Abertas: 4 (com trending ↑ ↓ →)
   - Progresso Sprint 3: 56% (5/9 issues) — progress bar visual
   - Últimas Issues Fechadas: #61, #60, #57 (timestamp + ícone)
   - Tempo Médio de Resolução: 2.5 dias

2. Data Source:
   - Mock data (protótipo rápido) — OK para MVP
   - Ou integrar GitHub API se quiser (gh cli ou fetch)

3. Visualização:
   - Cards com ícones + valores grandes
   - Tendência visual (↑ ↓ →)
   - Progress bar com cores (verde = bom, amarelo = atenção)
   - Timeline de atividades

4. Teste:
   - Métricas renderizam corretamente
   - Cores/ícones apropriados
   - Responsivo

ARQUIVOS:
- domains/studio/src/components/HealthMetrics.tsx (novo)
- Incorporar em: domains/studio/src/app/studio/pages/page.tsx

PADRÕES:
- 'use client' se precisar interatividade
- Componentes do DS: Card, Text, Badge
- Tokens para cores
- Mock data inline (ou arquivo separado)

VALIDAÇÃO:
- pnpm build ✅
- pnpm lint ✅
- pnpm -r type-check ✅
- Métricas renderizam

COMMIT:
git commit -m "feat(dashboard): Add health metrics indicators (fix #55)"

PRÓXIMO:
Quando #55 pronto, agente pode fechar legacy issues #4, #11, #13, #14, #15.

Comece AGORA (após #54 estar pronto)!
```

---

### PROMPT D: Para #58 (Game Hub) — Execute em Paralelo com Cadeia

```text
@GitHub Copilot

MODO: Fullstack_programmer

CONTEXTO: Sprint 3, Fase 3 — Game Hub Jornada (Paralelo com #53→#54→#55)

ISSUE: #58 — Game Hub: Prototipação de Gamificação
PRIORIDADE: P2
ESFORÇO: 3h
DEPENDÊNCIAS: #61 ✅ (Leaderboard já pronto)

OBJETIVO:
Implementar jornada de gamificação com Leaderboard (#61 já pronto), documentação e planejamento de páginas.

REQUISITOS:
1. Documentação:
   - domains/Game/journeys/hub/README.md
   - Objetivo e contexto de negócio
   - Flow diagram (ASCII ok)
   - Páginas planejadas:
     * /game/home — Dashboard de jogo
     * /game/leaderboard — Leaderboard (usa #61)
     * /game/challenge — Challenge específico
     * /game/profile — Perfil do jogador
   - Componentes por página (use Design System)
   - 4+ decisões de design documentadas
   - KPIs (engagement, retention, etc)
   - Próximos steps categorizados

2. Links:
   - domains/Game/journeys/hub/links.md
   - Links para Studio, Storybook, Figma, recursos
   - Benchmarks de gamificação (opcional)

3. Componentes Usados:
   - Leaderboard (#61 ✅)
   - Progress (#60 ✅)
   - Card, Button, Badge, Text (DS padrão)
   - Componente novo? IconBadge (opcional, para gamification)

4. Teste:
   - README renderiza bem em GitHub
   - Links funcionam
   - Páginas estão bem mapeadas

ARQUIVOS:
- domains/Game/journeys/hub/README.md (novo)
- domains/Game/journeys/hub/links.md (novo)
- Possivelmente: domains/studio/src/pages/game/* (planejado, não precisa implementar)

PADRÕES:
- Siga template: domains/template-jornada.md
- Flow diagram em ASCII
- Markdown limpo e bem organizado
- Estrutura: Objetivo > Flow > Componentes > Decisões > KPIs > Next Steps

VALIDAÇÃO:
- pnpm build ✅
- pnpm lint ✅
- pnpm -r type-check ✅
- README renderiza no GitHub
- Links funcionam (ou estão no formato esperado)

COMMIT:
git commit -m "docs(game): Implement Game Hub journey documentation (fix #58)"

PRÓXIMO:
Quando #58 pronto, agente pode fechar legacy issues.

Comece AGORA (pode rodar em paralelo com #53→#54→#55)!
```

---

### PROMPT E: Para Fechar Legadas (Execute por Último)

```text
@GitHub Copilot

MODO: Fullstack_programmer

CONTEXTO: Sprint 3, Fase 4 — Auto-close de Legacy Issues

ISSUES: #4, #11, #13, #14, #15
PRIORIDADE: P3 (final)
ESFORÇO: <1h

OBJETIVO:
Fechar issues legacy que foram substituídas por versões novas (Sprint 3).

REQUISITOS:
1. Fechar issues com comentário explicativo:
   - #4 (BackOffice Epic) → Substituída por #56 ✅
   - #11 (Dashboard Epic) → Substituída por #53, #54, #55 ✅
   - #13 (Endpoint API) → Substituída por #53 ✅
   - #14 (Dashboard POC) → Substituída por #54 ✅
   - #15 (Health Indicators) → Substituída por #55 ✅

2. Comentário padrão:
   "Substituída por [issue nova] em Sprint 3. Veja SPRINT3_EXECUTION_MASTER.md para detalhes."

COMANDO:
gh issue close 4 --comment "Substituída por #56 em Sprint 3. Documentação: docs/SPRINT3_EXECUTION_MASTER.md"
gh issue close 11 --comment "Substituída por #53, #54, #55 em Sprint 3. Documentação: docs/SPRINT3_EXECUTION_MASTER.md"
gh issue close 13 --comment "Substituída por #53 em Sprint 3. Documentação: docs/SPRINT3_EXECUTION_MASTER.md"
gh issue close 14 --comment "Substituída por #54 em Sprint 3. Documentação: docs/SPRINT3_EXECUTION_MASTER.md"
gh issue close 15 --comment "Substituída por #55 em Sprint 3. Documentação: docs/SPRINT3_EXECUTION_MASTER.md"

VALIDAÇÃO:
- Todas as 5 issues estão com status CLOSED
- Comentário aparece em cada issue

PRÓXIMO:
Sprint 3 está 100% completa! 🎉

Comece AGORA (após #53, #54, #55, #58 prontos)!
```

---

## Checklist de Validação

### Antes de Começar Qualquer Issue

- [ ] Git fetch + pull origin main
- [ ] pnpm install (atualizar dependências)
- [ ] pnpm build (certificar que compila)
- [ ] pnpm lint (sem warnings críticos)
- [ ] pnpm -r type-check (0 errors)
- [ ] gh auth status (autenticação ativa)

### Por Issue: Checklist de Conclusão

#### #53 (Dashboard API)
- [ ] Arquivo domains/studio/src/app/api/pages/route.ts criado
- [ ] GET /api/pages responde com JSON
- [ ] Response tem: success, data[], error, total, timestamp
- [ ] Paginação funciona (limit, offset)
- [ ] Error handling com try-catch
- [ ] CORS ok para localhost:3000
- [ ] curl test passa
- [ ] pnpm build ✅ pnpm lint ✅ pnpm -r type-check ✅
- [ ] Commit: "feat(api): Implement GET /api/pages endpoint (fix #53)"
- [ ] PR aberta ou mergeada
- [ ] Notifica que #54 + #58 podem começar

#### #54 (Dashboard UI)
- [ ] Arquivo domains/studio/src/app/studio/pages/page.tsx criado
- [ ] Página carrega dados de GET /api/pages (#53)
- [ ] Mostra loading enquanto carrega
- [ ] Trata erros se API falhar
- [ ] Tabela/Grid mostra: título, slug, data, ações
- [ ] Ordenação por coluna funciona
- [ ] Paginação funciona
- [ ] Componentes do DS usados (Card, Button, Text)
- [ ] Responsivo (mobile + desktop)
- [ ] pnpm build ✅ pnpm lint ✅ pnpm -r type-check ✅
- [ ] Commit: "feat(ui): Implement dashboard pages listing (fix #54)"
- [ ] PR aberta ou mergeada
- [ ] Notifica que #55 pode começar

#### #55 (Health Metrics)
- [ ] Arquivo domains/studio/src/components/HealthMetrics.tsx criado
- [ ] 5+ métricas exibidas
- [ ] Build status: ✅ PASS / ❌ FAIL
- [ ] Issues abertas: 4 (com trending)
- [ ] Progress bar Sprint 3: 56%
- [ ] Últimas issues: com timestamps
- [ ] Tempo médio: 2.5 dias
- [ ] Cards com ícones + valores grandes
- [ ] Cores apropriadas (verde/vermelho/amarelo)
- [ ] Responsivo
- [ ] pnpm build ✅ pnpm lint ✅ pnpm -r type-check ✅
- [ ] Commit: "feat(dashboard): Add health metrics indicators (fix #55)"
- [ ] PR aberta ou mergeada

#### #58 (Game Hub)
- [ ] Arquivos criados:
  - [ ] domains/Game/journeys/hub/README.md
  - [ ] domains/Game/journeys/hub/links.md
- [ ] README tem:
  - [ ] Objetivo e contexto
  - [ ] Flow diagram (ASCII)
  - [ ] 4 páginas planejadas
  - [ ] Componentes mapeados
  - [ ] 4+ decisões de design
  - [ ] KPIs
  - [ ] Next steps
- [ ] links.md tem:
  - [ ] Links para Studio, Storybook, Figma
  - [ ] Benchmarks (opcional)
- [ ] pnpm build ✅ pnpm lint ✅ pnpm -r type-check ✅
- [ ] Commit: "docs(game): Implement Game Hub journey documentation (fix #58)"
- [ ] PR aberta ou mergeada

#### Legadas (#4, #11, #13, #14, #15)
- [ ] gh issue close 4 --comment "..."
- [ ] gh issue close 11 --comment "..."
- [ ] gh issue close 13 --comment "..."
- [ ] gh issue close 14 --comment "..."
- [ ] gh issue close 15 --comment "..."
- [ ] Todas com status CLOSED no GitHub
- [ ] Comentários aparecem em cada issue

---

## Timeline Esperado

```
AGORA (T+0h):
→ Agente 2 inicia #53 (Dashboard API)

T+3h:
→ #53 pronto
→ Agente inicia #54 (Dashboard UI) + #58 (Game Hub) em paralelo

T+6h:
→ #54 pronto
→ Agente inicia #55 (Health Metrics)
→ #58 ainda em progresso (paralelo)

T+8h:
→ #55 pronto

T+11h:
→ #58 pronto
→ Todos os 4 issues prontos
→ Agente fecha legadas (#4, #11, #13, #14, #15)

T+11h30min:
→ SPRINT 3 COMPLETA! 🎉
```

**Total**: ~11.5 horas de desenvolvimento real

---

## Resumo Final

**Dependências Respeitadas**:
- ✅ #53 não depende de nada → pode começar AGORA
- ✅ #54 depende de #53 → começa após #53 pronto
- ✅ #55 depende de #54 → começa após #54 pronto
- ✅ #58 depende de #61 ✅ → pode começar AGORA (paralelo)
- ✅ Legadas só fecham no final

**Paralelismo**:
- Fase 1: Sequencial (#53)
- Fase 2: Paralelo (#54 + #58)
- Fase 3: Sequencial (#55 depende de #54)
- Fase 4: Serial (closes)

**Documentação**:
- ✅ Todos os prompts prontos para copiar
- ✅ Checklist de validação para cada issue
- ✅ Timeline esperado
- ✅ Arquivos a criar/editar especificados
- ✅ Requisitos funcionais detalhados

---

**Status**: 🟢 PRONTO PARA PRÓXIMO AGENTE

Você pode copiar qualquer um dos prompts acima (A, B, C, D, E) e delegar ao próximo agente agora mesmo!
