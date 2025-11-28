# Studio Pages API

API REST para persistência de páginas em disco no Studio.

## Endpoints

### GET /api/pages

Lista todas as páginas salvas.

**Response:**
```json
{
  "pages": [
    {
      "slug": "home",
      "title": "Página Inicial",
      "lastModified": "2025-11-20T00:00:00.000Z"
    }
  ]
}
```

### POST /api/pages

Cria uma nova página.

**Request Body:**
```json
{
  "slug": "minha-pagina",
  "data": {
    "content": [],
    "root": {
      "props": {
        "title": "Minha Página"
      }
    },
    "zones": {}
  }
}
```

**Response:**
```json
{
  "success": true,
  "slug": "minha-pagina",
  "message": "Page created successfully"
}
```

**Errors:**
- `400` - Missing slug or data
- `409` - Page already exists

### GET /api/pages/[slug]

Busca uma página específica.

**Response:**
```json
{
  "data": {
    "content": [...],
    "root": {...},
    "zones": {}
  }
}
```

**Errors:**
- `404` - Page not found

### PUT /api/pages/[slug]

Atualiza uma página existente.

**Request Body:**
```json
{
  "data": {
    "content": [...],
    "root": {...},
    "zones": {}
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Page updated successfully"
}
```

**Errors:**
- `400` - Missing data
- `404` - Page not found

### DELETE /api/pages/[slug]

Remove uma página.

**Response:**
```json
{
  "success": true,
  "message": "Page deleted successfully"
}
```

**Errors:**
- `404` - Page not found

## Armazenamento

As páginas são salvas como arquivos JSON em `domains/studio/data/pages/`:
- Formato: `{slug}.json`
- Exemplo: `home.json`, `sobre.json`, `contato.json`

## Integração no Studio

O editor do Studio (`/studio`) automaticamente:
1. **Carrega** a página ao abrir (GET)
2. **Salva** automaticamente ao editar (PUT/POST)
3. **Usa localStorage** como fallback se a API falhar

## Uso

### Criar uma página

```typescript
const response = await fetch('/api/pages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    slug: 'nova-pagina',
    data: puckData
  })
});
```

### Atualizar uma página

```typescript
const response = await fetch('/api/pages/home', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: puckData
  })
});
```

### Listar páginas

```typescript
const response = await fetch('/api/pages');
const { pages } = await response.json();
```

## Segurança

⚠️ **Importante:** Esta API não tem autenticação. Em produção, adicione:
- Autenticação (NextAuth, JWT, etc.)
- Validação de permissões
- Rate limiting
- Validação de schema (Zod, Yup)

## Estrutura de Dados

Uma página Puck tem a seguinte estrutura:

```typescript
interface PuckData {
  content: Array<{
    type: string;
    props: Record<string, any>;
  }>;
  root: {
    props: {
      title: string;
      [key: string]: any;
    };
  };
  zones: Record<string, any>;
}
```

## Testando

### Via curl

```bash
# Listar páginas
curl http://localhost:3000/api/pages

# Buscar página
curl http://localhost:3000/api/pages/home

# Criar página
curl -X POST http://localhost:3000/api/pages \
  -H "Content-Type: application/json" \
  -d '{"slug":"teste","data":{"content":[],"root":{"props":{"title":"Teste"}},"zones":{}}}'

# Atualizar página
curl -X PUT http://localhost:3000/api/pages/teste \
  -H "Content-Type: application/json" \
  -d '{"data":{"content":[],"root":{"props":{"title":"Teste Atualizado"}},"zones":{}}}'

# Deletar página
curl -X DELETE http://localhost:3000/api/pages/teste
```

### Via navegador

1. Acesse `/studio` para editar páginas
2. As mudanças são salvas automaticamente
3. Acesse `/{slug}` para ver a página renderizada
4. Exemplo: `http://localhost:3000/home`

## Próximos Passos

- [ ] Adicionar autenticação
- [ ] Implementar versionamento de páginas
- [ ] Adicionar preview de páginas
- [ ] Interface de listagem de páginas no Studio
- [ ] Duplicação de páginas
- [ ] Templates pré-definidos
