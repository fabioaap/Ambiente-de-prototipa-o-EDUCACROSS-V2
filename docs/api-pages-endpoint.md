# API Documentation: GET /api/pages

## Descrição

Endpoint que retorna o índice de todas as páginas prototipadas no Studio, com suporte a filtros opcionais por domínio e status.

## Endpoint

```
GET /api/pages
```

## Parâmetros de Query (Opcionais)

| Parâmetro | Tipo | Valores Aceitos | Descrição |
|-----------|------|-----------------|-----------|
| `domain` | string | `BackOffice`, `FrontOffice`, `Game`, `Other` | Filtra páginas por domínio |
| `status` | string | `active`, `draft`, `archived` | Filtra páginas por status |

## Formato de Resposta

### Sucesso (200 OK)

```json
{
  "pages": [
    {
      "id": "dashboard",
      "slug": "dashboard",
      "title": "Dashboard",
      "domain": "Other",
      "lastModified": "2025-11-23T10:00:00.000Z",
      "status": "active"
    },
    {
      "id": "backoffice-revisao-questoes-lista",
      "slug": "backoffice/revisao-questoes/lista",
      "title": "BackOffice | Revisão de Questões · Lista",
      "domain": "BackOffice",
      "lastModified": "2025-11-23T09:30:00.000Z",
      "status": "active"
    }
  ]
}
```

### Erro (500 Internal Server Error)

```json
{
  "error": "Failed to list pages",
  "message": "Descrição detalhada do erro"
}
```

## Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | Identificador único da página (slug com `/` substituído por `-`) |
| `slug` | string | Caminho da página (ex: `backoffice/revisao-questoes/lista`) |
| `title` | string | Título da página extraído de `root.props.title` no JSON |
| `domain` | string | Domínio da página: `BackOffice`, `FrontOffice`, `Game` ou `Other` |
| `lastModified` | string | Data da última modificação no formato ISO 8601 |
| `status` | string | Status da página: `active`, `draft` ou `archived` |

## Lógica de Determinação de Domínio

O domínio é determinado automaticamente baseado no slug da página:

- **BackOffice**: Slugs que começam com `backoffice` ou contêm `/backoffice/`
- **FrontOffice**: Slugs que começam com `frontoffice` ou contêm `/frontoffice/`
- **Game**: Slugs que começam com `game` ou contêm `/game/`
- **Other**: Todos os demais casos

## Exemplos de Uso

### 1. Listar todas as páginas

```bash
curl http://localhost:3000/api/pages
```

### 2. Filtrar por domínio BackOffice

```bash
curl "http://localhost:3000/api/pages?domain=BackOffice"
```

### 3. Filtrar por status ativo

```bash
curl "http://localhost:3000/api/pages?status=active"
```

### 4. Filtrar por domínio e status

```bash
curl "http://localhost:3000/api/pages?domain=Game&status=draft"
```

## Estrutura de Arquivos

O endpoint escaneia recursivamente o diretório `apps/studio/data/pages/` procurando por arquivos `.json`. Subdiretórios são incluídos automaticamente na busca.

Exemplo de estrutura:

```
apps/studio/data/pages/
├── dashboard.json
├── home.json
├── backoffice/
│   └── revisao-questoes/
│       ├── lista.json
│       └── detalhe.json
├── frontoffice/
│   └── login.json
└── game/
    └── level1.json
```

## Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | Requisição bem-sucedida |
| 500 | Erro interno do servidor ao listar páginas |

## Notas de Implementação

1. **Recursividade**: O endpoint escaneia subdiretórios recursivamente
2. **Ordenação**: Páginas são ordenadas por domínio primeiro, depois por slug
3. **Caso insensitivo**: Filtros de domínio e status são case-insensitive
4. **Arquivos ignorados**: O arquivo `.gitkeep` é automaticamente ignorado
5. **Status padrão**: Se não especificado no JSON, o status padrão é `active`
6. **Título padrão**: Se não especificado no JSON, usa o nome do arquivo sem extensão

## Relacionamento com Outros Endpoints

Este endpoint faz parte da Dashboard API e complementa:

- `GET /api/pages/[slug]` - Busca uma página específica
- `POST /api/pages` - Cria uma nova página
- `PUT /api/pages/[slug]` - Atualiza uma página existente
- `DELETE /api/pages/[slug]` - Remove uma página

## Próximos Passos (H2.2)

Este endpoint é a base para o próximo desenvolvimento:

- **H2.2**: Interface de gerenciamento de páginas no frontend que consumirá este endpoint
