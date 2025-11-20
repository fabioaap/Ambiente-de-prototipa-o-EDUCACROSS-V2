# H2 - Dashboard: API Endpoint

**Issue**: H2  
**Status**: ✅ IMPLEMENTADO  
**Data**: 2025-11-20  
**Branch**: `feature/h2-dashboard-endpoint`

---

## O Que Foi Feito

### 1. Novo Endpoint Criado
```typescript
// GET /api/dashboard/pages
// Arquivo: apps/studio/src/app/api/dashboard/pages/route.ts
```

✅ **Funcionalidades**:
- Escaneia dinamicamente `apps/studio/data/pages/`
- Carrega metadados de cada página (JSON)
- Detecta domínio pelo slug (BackOffice, FrontOffice, Game)
- Retorna array ordenado por domínio + nome
- Calcula estatísticas globais
- Cores por domínio incluídas

### 2. Estrutura de Resposta

```json
{
  "pages": [
    {
      "id": "backoffice-revisao-questoes-lista",
      "slug": "backoffice/revisao-questoes/lista",
      "name": "Revisão de Questões - Lista",
      "domain": "BackOffice",
      "status": "draft",
      "editUrl": "/studio?page=backoffice/revisao-questoes/lista",
      "viewUrl": "/pages/backoffice/revisao-questoes/lista",
      "createdAt": "2025-11-20T18:00:00.000Z",
      "updatedAt": "2025-11-20T18:00:00.000Z",
      "description": "Revisão de Questões"
    }
  ],
  "stats": {
    "totalPages": 3,
    "totalDomains": 2,
    "activeDomains": ["BackOffice", "FrontOffice"],
    "lastUpdated": "2025-11-20T18:00:00.000Z",
    "buildStatus": "success",
    "storybook": "online"
  },
  "domains": {
    "BackOffice": { "count": 2, "color": "#3b82f6" },
    "FrontOffice": { "count": 1, "color": "#10b981" },
    "Game": { "count": 0, "color": "#f59e0b" }
  }
}
```

### 3. TypeScript Interfaces

```typescript
interface DashboardPage {
  id: string                    // backoffice-revisao-questoes-lista
  slug: string                  // backoffice/revisao-questoes/lista
  name: string                  // Revisão de Questões - Lista
  domain: 'BackOffice' | 'FrontOffice' | 'Game' | 'Other'
  status: 'draft' | 'published'
  editUrl: string               // /studio?page=...
  viewUrl: string               // /pages/...
  createdAt: string             // ISO 8601
  updatedAt: string             // ISO 8601
  description?: string
}

interface DashboardResponse {
  pages: DashboardPage[]
  stats: { ... }
  domains: { ... }
}
```

---

## Como Usar

### Local Dev
```bash
pnpm dev:studio

# Em outro terminal
curl http://localhost:3000/api/dashboard/pages | jq
```

### Em Browser
```
http://localhost:3000/api/dashboard/pages
```

---

## Lógica de Implementação

### 1. Scanning Recursivo
```typescript
// Escaneia apps/studio/data/pages/ recursivamente
// Encontra todos arquivos .json
// Monta slug baseado na estrutura de diretórios
```

### 2. Detecção de Domínio
```typescript
// backoffice/* → BackOffice
// frontoffice/* → FrontOffice  
// game/* → Game
// outros → Other
```

### 3. Metadados de Página
```typescript
// Lê arquivo JSON
// Extrai data.root.props.title (nome da página)
// Extrai data.root.props.description
// Gera editUrl e viewUrl
```

### 4. Agregação de Stats
```typescript
// Conta páginas por domínio
// Lista domínios ativos
// Inclui cores para UI
// Status build/storybook (hardcoded por enquanto)
```

---

## Critério de Aceitação

- [x] Endpoint criado
- [x] Escaneia páginas dinamicamente
- [x] Detecta domínios corretamente
- [x] Retorna JSON conforme planejado
- [x] Includes stats e cores
- [x] TypeScript interfaces implementadas
- [x] Build compilando
- [x] Lint passando

---

## Build Status

```
✅ Lint:   PASSANDO (0 erros)
✅ Build:  SUCESSO (novo endpoint registrado)
✅ Route:  /api/dashboard/pages (Dynamic)
```

---

## Impacto do Sprint

- **Issue H2**: ✅ CONCLUÍDO
- **Sprint 2**: Agora em **81% (9/11 issues)**
- **Progresso**: 72% → 81% (sessão = +36% desde início)

---

## Próximas Fases

### H3 - UI Dashboard (3-4 horas)
```bash
Criar: Component Dashboard.tsx em apps/studio/src/app/dashboard/page.tsx
Funcionalidades:
- Chamar GET /api/dashboard/pages
- Renderizar cards por domínio
- Implementar filtros
- Implementar busca
```

### H4 - Indicadores (2-3 horas)
```bash
Adicionar ao endpoint:
- Build status real (executar script)
- Storybook health check
- Git last commit info
```

---

## Exemplo de Integração (H3)

```typescript
// apps/studio/src/app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard/pages')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Carregando...</div>
  if (!data) return <div>Erro ao carregar</div>

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Renderizar data.pages em cards */}
      {/* Renderizar data.stats em footer */}
    </div>
  )
}
```

---

## Código Adicionado

**Arquivo novo**: `apps/studio/src/app/api/dashboard/pages/route.ts`
- **Linhas**: 147
- **Funções**: scanPagesDirectory, GET handler
- **TypeScript**: Interfaces DashboardPage, DashboardResponse

---

## Validação Manual

```bash
# 1. Verificar endpoint
curl -s http://localhost:3000/api/dashboard/pages | jq '.stats'

# Resultado esperado:
# {
#   "totalPages": 3,
#   "totalDomains": 2,
#   "activeDomains": ["BackOffice", "FrontOffice"],
#   "buildStatus": "success",
#   "storybook": "online"
# }
```

---

## Próximos Passos

1. Fazer PR de H2
2. Iniciar H3 (UI Dashboard)
3. Testar integração entre endpoint e UI

---

**Status**: ✅ PRONTO PARA PRÓXIMA FASE

Estimativa para H3: **3-4 horas**
