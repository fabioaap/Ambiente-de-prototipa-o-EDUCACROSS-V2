# Dashboard Pages API

API para fornecer índice completo das páginas prototipadas com metadados para o Dashboard.

## Endpoint

### GET /api/dashboard/pages

Retorna índice completo de todas as páginas com informações detalhadas e estatísticas.

**Response:**
```json
{
  "pages": [
    {
      "id": "home",
      "slug": "home",
      "name": "Página Inicial",
      "domain": "Other",
      "status": "draft",
      "editUrl": "/studio?page=home",
      "viewUrl": "/pages/home",
      "createdAt": "2025-11-21T20:43:00.000Z",
      "updatedAt": "2025-11-21T20:43:00.000Z",
      "description": "Página inicial do sistema"
    },
    {
      "id": "backoffice-revisao-questoes-lista",
      "slug": "backoffice/revisao-questoes/lista",
      "name": "BackOffice | Revisão de Questões · Lista",
      "domain": "BackOffice",
      "status": "draft",
      "editUrl": "/studio?page=backoffice%2Frevisao-questoes%2Flista",
      "viewUrl": "/pages/backoffice/revisao-questoes/lista",
      "createdAt": "2025-11-21T20:43:00.000Z",
      "updatedAt": "2025-11-21T20:43:00.000Z"
    }
  ],
  "stats": {
    "totalPages": 3,
    "totalDomains": 2,
    "activeDomains": ["BackOffice", "Other"],
    "lastUpdated": "2025-11-21T20:45:00.000Z",
    "buildStatus": "success",
    "storybook": "online"
  },
  "domains": {
    "BackOffice": { "count": 2, "color": "#3b82f6" },
    "FrontOffice": { "count": 0, "color": "#10b981" },
    "Game": { "count": 0, "color": "#f59e0b" }
  }
}
```

**Errors:**
- `500` - Falha ao escanear diretório de páginas

## Campos da Resposta

### Objeto `DashboardPage`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | `string` | Identificador único (slug com barras substituídas por hífens) |
| `slug` | `string` | Caminho relativo da página (sem extensão `.json`) |
| `name` | `string` | Nome da página extraído de `root.props.title` |
| `domain` | `'BackOffice' \| 'FrontOffice' \| 'Game' \| 'Other'` | Domínio detectado pelo prefixo do slug |
| `status` | `'draft' \| 'published'` | Status da página (atualmente fixo em `draft`) |
| `editUrl` | `string` | URL para editar no Studio |
| `viewUrl` | `string` | URL para visualizar a página renderizada |
| `createdAt` | `string` | Data de criação do arquivo (ISO 8601) |
| `updatedAt` | `string` | Data de última modificação do arquivo (ISO 8601) |
| `description?` | `string` | Descrição opcional da página |

### Objeto `stats`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `totalPages` | `number` | Total de páginas encontradas |
| `totalDomains` | `number` | Total de domínios com pelo menos uma página |
| `activeDomains` | `string[]` | Lista de domínios ativos |
| `lastUpdated` | `string` | Timestamp da última atualização do índice |
| `buildStatus` | `'success' \| 'building' \| 'failed'` | Status do build |
| `storybook` | `'online' \| 'building' \| 'offline'` | Status do Storybook |

### Objeto `domains`

Mapa de domínios com contagens e cores para visualização:

```typescript
{
  [domain: string]: {
    count: number;
    color: string; // Hex color code
  }
}
```

## Detecção de Domínio

O domínio é detectado automaticamente pelo prefixo do slug:

| Prefixo | Domínio |
|---------|---------|
| `backoffice/*` | `BackOffice` |
| `frontoffice/*` | `FrontOffice` |
| `game/*` | `Game` |
| Outros | `Other` |

**Exemplos:**
- `backoffice/revisao-questoes/lista` → `BackOffice`
- `frontoffice/login` → `FrontOffice`
- `game/nivel-1` → `Game`
- `home` → `Other`

## Varredura de Diretórios

O endpoint escaneia recursivamente o diretório `apps/studio/data/pages/`, processando:
- Todos os arquivos `.json`
- Subdiretórios aninhados (qualquer profundidade)
- Ignora arquivo `.gitkeep`

**Estrutura de exemplo:**
```
data/pages/
  ├── home.json                                    → slug: "home"
  ├── backoffice/
  │   └── revisao-questoes/
  │       ├── lista.json                           → slug: "backoffice/revisao-questoes/lista"
  │       └── detalhe.json                         → slug: "backoffice/revisao-questoes/detalhe"
  └── frontoffice/
      └── login.json                               → slug: "frontoffice/login"
```

## Uso no Dashboard

### Exemplo React/Next.js

```typescript
'use client'

import { useEffect, useState } from 'react'

interface DashboardPage {
  id: string
  slug: string
  name: string
  domain: string
  status: string
  updatedAt: string
  // ... outros campos
}

interface DashboardData {
  pages: DashboardPage[]
  stats: {
    totalPages: number
    totalDomains: number
    activeDomains: string[]
  }
  domains: Record<string, { count: number; color: string }>
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/dashboard/pages')
      .then(res => {
        if (!res.ok) throw new Error('Falha ao carregar dados')
        return res.json()
      })
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>
  if (!data) return null

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total de páginas: {data.stats.totalPages}</p>
      
      {/* Renderizar páginas por domínio */}
      {data.stats.activeDomains.map(domain => {
        const pagesInDomain = data.pages.filter(p => p.domain === domain)
        return (
          <section key={domain}>
            <h2>{domain} ({pagesInDomain.length})</h2>
            <ul>
              {pagesInDomain.map(page => (
                <li key={page.id}>
                  <a href={page.editUrl}>{page.name}</a>
                  <small>Atualizado: {new Date(page.updatedAt).toLocaleDateString()}</small>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
```

### Exemplo com Filtragem

```typescript
// Filtrar por domínio
const backofficePages = data.pages.filter(p => p.domain === 'BackOffice')

// Filtrar por status
const publishedPages = data.pages.filter(p => p.status === 'published')

// Ordenar por data de modificação
const recentPages = [...data.pages].sort((a, b) => 
  new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
)

// Buscar por nome
const searchResults = data.pages.filter(p => 
  p.name.toLowerCase().includes(searchTerm.toLowerCase())
)
```

## Testando

### Via curl

```bash
# Obter índice completo
curl http://localhost:3000/api/dashboard/pages | jq

# Ver apenas estatísticas
curl http://localhost:3000/api/dashboard/pages | jq '.stats'

# Ver páginas do BackOffice
curl http://localhost:3000/api/dashboard/pages | jq '.pages[] | select(.domain == "BackOffice")'

# Contar páginas por domínio
curl http://localhost:3000/api/dashboard/pages | jq '.domains'
```

### Via navegador

```
http://localhost:3000/api/dashboard/pages
```

## Diferenças entre `/api/pages` e `/api/dashboard/pages`

| Feature | `/api/pages` | `/api/dashboard/pages` |
|---------|--------------|----------------------|
| **Propósito** | CRUD de páginas | Índice para Dashboard |
| **Métodos** | GET, POST, PUT, DELETE | Apenas GET |
| **Campos retornados** | slug, title, lastModified | Campos completos + metadados |
| **Estatísticas** | ❌ Não | ✅ Sim |
| **Detecção de domínio** | ❌ Não | ✅ Sim |
| **Cores de domínio** | ❌ Não | ✅ Sim |
| **Usado por** | Studio Editor, PagesList | Dashboard UI (futura) |

## Considerações de Performance

### Caching

Para projetos com muitas páginas, considere implementar cache:

```typescript
// Exemplo com cache simples em memória
let cachedData: DashboardResponse | null = null
let cacheTime = 0
const CACHE_TTL = 60000 // 1 minuto

export async function GET() {
  const now = Date.now()
  
  if (cachedData && now - cacheTime < CACHE_TTL) {
    return NextResponse.json(cachedData)
  }
  
  // ... lógica de escaneamento ...
  
  cachedData = response
  cacheTime = now
  
  return NextResponse.json(response)
}
```

### Otimizações

Para grandes volumes de páginas:
- Considere paginação via query params (`?page=1&limit=20`)
- Implemente busca e filtros no servidor
- Use índice em arquivo separado que é atualizado apenas quando páginas mudam

## Próximos Passos

- [ ] Implementar UI do Dashboard que consome este endpoint (Issue H3)
- [ ] Adicionar suporte para status dinâmico baseado em metadados
- [ ] Implementar query parameters para filtros (domínio, status, busca)
- [ ] Adicionar paginação
- [ ] Cache inteligente com invalidação automática
- [ ] Webhook para atualizar índice quando arquivos mudam
- [ ] Adicionar thumbnails/previews das páginas

## Referências

- Issue: H2 - Dashboard: Endpoint / API para index de páginas
- Localização: `apps/studio/src/app/api/dashboard/pages/route.ts`
- Documentação: `docs/h2-implementacao-final.md`
- API CRUD: `apps/studio/src/app/api/pages/README.md`
