# Implementação H2 - Dashboard: Endpoint para Índice de Páginas

## Resumo
Correção e melhoria do endpoint `/api/dashboard/pages` para atender completamente aos critérios de aceitação da issue H2.

## Mudanças Realizadas

### 1. Correção do campo `lastModified`
**Arquivo**: `apps/studio/src/app/api/dashboard/pages/route.ts`

**Problema anterior**:
- Os campos `createdAt` e `updatedAt` utilizavam `new Date().toISOString()`, retornando sempre a data/hora atual da requisição
- Isso não representava a data real de modificação dos arquivos

**Solução implementada**:
- Adicionada chamada a `fs.stat(fullPath)` para obter informações reais do arquivo
- Campo `createdAt` agora usa `stats.birthtime.toISOString()` (data de criação do arquivo)
- Campo `updatedAt` agora usa `stats.mtime.toISOString()` (data de última modificação)

```typescript
// Obter informações do arquivo
const stats = await fs.stat(fullPath)

pages.push({
  // ... outros campos
  createdAt: stats.birthtime.toISOString(),
  updatedAt: stats.mtime.toISOString(), // lastModified
  // ... outros campos
})
```

## Critérios de Aceitação ✅

### Endpoint retorna JSON com campos obrigatórios:
- ✅ **nome**: Mapeado para campo `name` (extraído de `data.root.props.title`)
- ✅ **slug**: Campo `slug` (caminho relativo sem extensão .json)
- ✅ **domain**: Campo `domain` ('BackOffice' | 'FrontOffice' | 'Game' | 'Other')
- ✅ **lastModified**: Mapeado para campo `updatedAt` (timestamp real do arquivo)
- ✅ **status**: Campo `status` ('draft' | 'published', atualmente fixo em 'draft')

### Endpoint lido por UI do Dashboard:
- ✅ Endpoint `/api/dashboard/pages` está pronto para consumo
- ✅ Retorna estrutura completa com `pages`, `stats` e `domains`
- ✅ Formato JSON bem estruturado e documentado com interfaces TypeScript

## Estrutura da Resposta

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

## Validação

### Build e Lint
```bash
✅ pnpm lint - Sem erros
✅ pnpm build:studio - Compilação bem-sucedida
```

### Testes Manuais
Para testar o endpoint:

```bash
# 1. Iniciar servidor de desenvolvimento
pnpm dev:studio

# 2. Em outro terminal, fazer requisição
curl http://localhost:3000/api/dashboard/pages | jq

# 3. Verificar campos obrigatórios
curl http://localhost:3000/api/dashboard/pages | jq '.pages[0] | {name, slug, domain, updatedAt: .updatedAt, status}'
```

## Detecção de Domínio

A lógica de detecção de domínio funciona por prefixo do slug:
- `backoffice/*` → `BackOffice`
- `frontoffice/*` → `FrontOffice`
- `game/*` → `Game`
- Outros → `Other`

## Varredura Recursiva

O endpoint suporta estruturas de diretórios aninhadas:
```
data/pages/
  ├── home.json → slug: "home"
  └── backoffice/
      └── revisao-questoes/
          ├── lista.json → slug: "backoffice/revisao-questoes/lista"
          └── detalhe.json → slug: "backoffice/revisao-questoes/detalhe"
```

## Próximos Passos (Fora do Escopo Desta Issue)

1. **H3 - UI do Dashboard**: Criar componente React que consome este endpoint
2. **Status dinâmico**: Implementar lógica para detectar status baseado em metadados
3. **Filtros e busca**: Adicionar query parameters para filtrar por domínio/status
4. **Paginação**: Para projetos com muitas páginas
5. **Ordenação**: Permitir ordenar por diferentes campos

## Referências

- Issue original: H2 - Dashboard: Endpoint / API para index de páginas
- Endpoint: `GET /api/dashboard/pages`
- Documentação anterior: `docs/h2-implementation.md`
