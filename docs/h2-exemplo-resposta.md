# Exemplo de Resposta do Endpoint /api/dashboard/pages

Este documento mostra um exemplo real da resposta do endpoint implementado na issue H2.

## Endpoint

```
GET /api/dashboard/pages
```

## Exemplo de Resposta Completa

```json
{
  "pages": [
    {
      "id": "backoffice-revisao-questoes-detalhe",
      "slug": "backoffice/revisao-questoes/detalhe",
      "name": "BackOffice | Revisão de Questões · Detalhe",
      "domain": "BackOffice",
      "status": "draft",
      "editUrl": "/studio?page=backoffice%2Frevisao-questoes%2Fdetalhe",
      "viewUrl": "/pages/backoffice/revisao-questoes/detalhe",
      "createdAt": "2025-11-21T20:43:17.229Z",
      "updatedAt": "2025-11-21T20:43:17.229Z"
    },
    {
      "id": "backoffice-revisao-questoes-lista",
      "slug": "backoffice/revisao-questoes/lista",
      "name": "BackOffice | Revisão de Questões · Lista",
      "domain": "BackOffice",
      "status": "draft",
      "editUrl": "/studio?page=backoffice%2Frevisao-questoes%2Flista",
      "viewUrl": "/pages/backoffice/revisao-questoes/lista",
      "createdAt": "2025-11-21T20:43:17.229Z",
      "updatedAt": "2025-11-21T20:43:17.229Z"
    },
    {
      "id": "home",
      "slug": "home",
      "name": "Página Inicial",
      "domain": "Other",
      "status": "draft",
      "editUrl": "/studio?page=home",
      "viewUrl": "/pages/home",
      "createdAt": "2025-11-21T20:43:16.729Z",
      "updatedAt": "2025-11-21T20:43:16.729Z",
      "description": "Esta é a página inicial do Studio. Você pode editá-la livremente."
    }
  ],
  "stats": {
    "totalPages": 3,
    "totalDomains": 2,
    "activeDomains": [
      "BackOffice",
      "Other"
    ],
    "lastUpdated": "2025-11-21T20:45:32.000Z",
    "buildStatus": "success",
    "storybook": "online"
  },
  "domains": {
    "BackOffice": {
      "count": 2,
      "color": "#3b82f6"
    },
    "FrontOffice": {
      "count": 0,
      "color": "#10b981"
    },
    "Game": {
      "count": 0,
      "color": "#f59e0b"
    }
  }
}
```

## Mapeamento dos Critérios de Aceitação

A issue H2 especificava que o endpoint deve retornar JSON com:
- **nome** → `name` (ex: "Página Inicial")
- **slug** → `slug` (ex: "home", "backoffice/revisao-questoes/lista")
- **domain** → `domain` (ex: "BackOffice", "Other")
- **lastModified** → `updatedAt` (ex: "2025-11-21T20:43:17.229Z")
- **status** → `status` (ex: "draft")

✅ **Todos os campos obrigatórios estão presentes e funcionando corretamente.**

## Campos Adicionais Implementados

Além dos campos obrigatórios, o endpoint também retorna:

### Por página:
- `id` - Identificador único da página
- `editUrl` - URL para editar a página no Studio
- `viewUrl` - URL para visualizar a página renderizada
- `createdAt` - Data de criação do arquivo
- `description` - Descrição opcional da página

### Estatísticas globais:
- `stats.totalPages` - Total de páginas
- `stats.totalDomains` - Total de domínios ativos
- `stats.activeDomains` - Lista de domínios com páginas
- `stats.lastUpdated` - Timestamp da última atualização
- `stats.buildStatus` - Status do build
- `stats.storybook` - Status do Storybook

### Informações de domínios:
- `domains[domain].count` - Quantidade de páginas por domínio
- `domains[domain].color` - Cor hex para visualização

## Timestamps Reais

A principal correção implementada foi garantir que os campos `createdAt` e `updatedAt` refletem os timestamps **reais** dos arquivos:

```typescript
// Antes (incorreto):
createdAt: new Date().toISOString(),  // ❌ Sempre retorna data atual
updatedAt: new Date().toISOString(),  // ❌ Sempre retorna data atual

// Depois (correto):
const stats = await fs.stat(fullPath)
createdAt: stats.birthtime.toISOString(),  // ✅ Data de criação do arquivo
updatedAt: stats.mtime.toISOString(),      // ✅ Data de última modificação
```

Isso permite que a UI do Dashboard mostre:
- Quando cada página foi realmente criada
- Quando cada página foi modificada pela última vez
- Ordenar páginas por data de modificação
- Destacar páginas recentemente atualizadas

## Como Testar

```bash
# 1. Iniciar servidor de desenvolvimento
pnpm dev:studio

# 2. Em outro terminal, fazer requisição
curl http://localhost:3000/api/dashboard/pages | jq

# 3. Ver apenas as páginas
curl http://localhost:3000/api/dashboard/pages | jq '.pages'

# 4. Ver apenas as estatísticas
curl http://localhost:3000/api/dashboard/pages | jq '.stats'

# 5. Filtrar páginas do BackOffice
curl http://localhost:3000/api/dashboard/pages | jq '.pages[] | select(.domain == "BackOffice")'
```

## Uso na UI do Dashboard

```typescript
// Exemplo de como consumir o endpoint
const response = await fetch('/api/dashboard/pages')
const { pages, stats, domains } = await response.json()

// Mostrar total de páginas
console.log(`Total: ${stats.totalPages} páginas`)

// Listar páginas por domínio
stats.activeDomains.forEach(domain => {
  const pagesInDomain = pages.filter(p => p.domain === domain)
  console.log(`${domain}: ${pagesInDomain.length} páginas`)
})

// Mostrar páginas recentes (últimas 5)
const recent = pages
  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  .slice(0, 5)

recent.forEach(page => {
  console.log(`${page.name} - atualizada em ${page.updatedAt}`)
})
```

## Próximos Passos

Issue H3 implementará a UI do Dashboard que consumirá este endpoint para exibir:
- Cards de páginas organizados por domínio
- Estatísticas gerais
- Busca e filtros
- Links para edição e visualização
- Indicadores de páginas recém-atualizadas
