# 🚀 PROMPT URGENTE — COMEÇAR #53 AGORA

**Data**: 2025-11-24 21:00 UTC  
**Status**: Documentação integrada, pronto para implementação

---

## ⚡ COMECE AGORA COM ESTE PROMPT

Cole isto no Copilot Cloud e execute **IMEDIATAMENTE**:

```text
@GitHub Copilot

MODO: Fullstack_programmer

CONTEXTO: Sprint 3, Fase 3 — Implementar Dashboard API

MISSÃO AGORA: Executar Issue #53 (primeira da cadeia)

ISSUE: #53 — Dashboard API: GET /api/pages endpoint
PRIORIDADE: P2
ESFORÇO: 3 horas
BLOQUEADORES: Nenhum (já pode começar AGORA)
DESBLOQUEIA: #54 (Dashboard UI) e #55 (Health Metrics)

===== OBJETIVO =====
Implementar endpoint REST que retorna lista de páginas salvas (Puck JSON do Studio).

===== REQUISITOS =====

1. ENDPOINT: GET /api/pages
   - URL: http://localhost:3000/api/pages
   - Query params: ?limit=10&offset=0 (opcional)
   - Status: 200 (sucesso) ou 500 (erro)

2. RESPONSE JSON:
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
  "timestamp": "2025-11-24T21:00:00Z"
}

3. DATA SOURCE:
   - Páginas criadas no Studio (em localStorage do cliente)
   - Se vazio: retorna "data": []
   - Pode ser mock data para prototipagem

4. ERROR HANDLING:
   - Try-catch para erros
   - Retorna error message se falhar
   - CORS permitido para localhost:3000

===== IMPLEMENTAÇÃO =====

ARQUIVO: apps/studio/src/app/api/pages/route.ts (novo)

TEMPLATE:
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Parse query params
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '0', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    // Get pages (mock ou localStorage)
    const pages = [
      {
        id: 'page-1',
        title: 'Página 1',
        slug: 'pagina-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: {},
      }
    ];

    // Paginate if limit > 0
    const paginated = limit > 0 ? pages.slice(offset, offset + limit) : pages;

    // Return response
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
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

===== VALIDAÇÃO =====

TESTES:
1. curl http://localhost:3000/api/pages
   Esperado: { "success": true, "data": [...], ... }

2. curl "http://localhost:3000/api/pages?limit=1&offset=0"
   Esperado: { "success": true, "data": [first item], "total": N }

3. pnpm build → Deve passar
4. pnpm lint → Sem warnings críticos
5. pnpm -r type-check → 0 errors

===== COMMIT =====

git commit -m "feat(api): Implement GET /api/pages endpoint (fix #53)"

===== O QUE FAZER DEPOIS =====

1. Testar endpoint localmente (curl ou Postman)
2. Certificar que pnpm build/lint/type-check passam
3. Abrir PR ou mergear direto
4. Notificar que #54 + #58 podem começar

===== REFERÊNCIAS =====

- Docs detalhadas: SPRINT3_EXECUTION_DETAILED.md (Issue #53 > PROMPT A)
- Checklist: SPRINT3_EXECUTION_DETAILED.md (Checklist > #53)
- Grafo dependências: SPRINT3_DOCUMENTATION_INDEX.md

===== TEMPO =====

Estimado: 3 horas
Prazo: AGORA (sem dependências, pode começar imediatamente)

Comece AGORA! 🚀
```

---

## ✅ Após Completar #53

Quando #53 estiver ✅ PRONTO:

**Próximo agente pode fazer em PARALELO**:
- **#54** (Dashboard UI) — depende de #53
- **#58** (Game Hub) — não depende de nada

**Ou sequencial**:
- #53 → #54 → #55 (cadeia)
- #58 em paralelo

---

## 📋 Links Rápidos

Se precisar de mais detalhes:
- **SPRINT3_EXECUTION_DETAILED.md** → Seção "Issue #53" com requisitos completos
- **SPRINT3_DOCUMENTATION_INDEX.md** → Índice com todos os prompts

---

**STATUS**: 🟢 PRONTO PARA COMEÇAR #53

Cole o prompt acima no Copilot Cloud agora!
