# Studio - EDUCACROSS

Aplicação Next.js com Puck integrado para prototipação visual.

## Funcionalidades

- **Editor Visual**: Rota `/studio` com Puck para criar páginas visualmente
- **Renderização Dinâmica**: Todas as outras rotas renderizam páginas salvas em JSON
- **Componentes do Design System**: Integração completa com `@prototipo/design-system`
- **API de Persistência**: API REST para salvar páginas em disco (formato JSON)

## Persistência de Páginas

O Studio inclui uma API REST completa para persistência de páginas em disco:

### Endpoints Disponíveis

- `GET /api/pages` - Lista todas as páginas
- `GET /api/pages/[slug]` - Busca uma página específica
- `POST /api/pages` - Cria uma nova página
- `PUT /api/pages/[slug]` - Atualiza uma página existente
- `DELETE /api/pages/[slug]` - Remove uma página

### Armazenamento

As páginas são salvas em `apps/studio/data/pages/*.json` no formato:

```json
{
  "content": [...],
  "root": {
    "props": {
      "title": "Título da Página"
    }
  },
  "zones": {}
}
```

### Segurança e Permissões

Por padrão, operações de escrita (POST, PUT, DELETE) são permitidas apenas em desenvolvimento.

Para configurar em produção, crie um arquivo `.env.local`:

```bash
cp .env.example .env.local
```

E configure:

```env
ALLOW_PAGE_WRITE=true
```

⚠️ **Importante**: Esta API não possui autenticação. Use com cuidado em produção.

### Documentação Completa

Veja a documentação detalhada da API em: [src/app/api/pages/README.md](./src/app/api/pages/README.md)

## Como usar

1. Acesse `/studio` para abrir o editor visual
2. Arraste componentes da barra lateral para construir sua página
3. As páginas são salvas automaticamente via API em `data/pages/`
4. Fallback para `localStorage` se a API falhar
5. Acesse `/{slug}` para visualizar páginas publicadas (ex: `/home`)

## Scripts

- `pnpm dev` - Inicia o servidor de desenvolvimento na porta 3000
- `pnpm build` - Cria build de produção
- `pnpm start` - Inicia o servidor de produção
- `pnpm lint` - Executa o linter

## Desenvolvimento

### Estrutura de Diretórios

```
apps/studio/
├── src/
│   ├── app/
│   │   ├── api/pages/          # API de persistência
│   │   ├── studio/             # Editor visual (Puck)
│   │   └── [[...slug]]/        # Renderização de páginas
│   ├── components/             # Componentes React
│   └── config/                 # Configuração do Puck
├── data/
│   └── pages/                  # Páginas salvas (JSON)
└── .env.example               # Variáveis de ambiente
```

### Testando a API

Para testar a API manualmente:

```bash
# Listar páginas
curl http://localhost:3000/api/pages

# Buscar página específica
curl http://localhost:3000/api/pages/home

# Criar nova página
curl -X POST http://localhost:3000/api/pages \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "nova-pagina",
    "data": {
      "content": [],
      "root": {"props": {"title": "Nova Página"}},
      "zones": {}
    }
  }'

# Atualizar página
curl -X PUT http://localhost:3000/api/pages/nova-pagina \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "content": [],
      "root": {"props": {"title": "Página Atualizada"}},
      "zones": {}
    }
  }'

# Deletar página
curl -X DELETE http://localhost:3000/api/pages/nova-pagina
```
