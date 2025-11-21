# Testes Manuais - API de Persistência

Este documento descreve os testes manuais realizados para validar a API de persistência de páginas.

## Pré-requisitos

1. Servidor Studio rodando em desenvolvimento:
   ```bash
   cd apps/studio
   pnpm dev
   ```

2. Ferramenta para fazer requisições HTTP (curl, Postman, Insomnia, etc.)

## Casos de Teste

### 1. Listar Páginas (GET /api/pages)

**Objetivo**: Verificar que a API retorna lista de todas as páginas salvas.

**Requisição**:
```bash
curl http://localhost:3000/api/pages
```

**Resposta Esperada** (Status 200):
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

**Resultado**: ✅ Aprovado
- API retorna lista de páginas corretamente
- Cada página inclui slug, title e lastModified
- Páginas são carregadas do diretório `data/pages/`

---

### 2. Buscar Página Existente (GET /api/pages/[slug])

**Objetivo**: Verificar que a API retorna os dados de uma página específica.

**Requisição**:
```bash
curl http://localhost:3000/api/pages/home
```

**Resposta Esperada** (Status 200):
```json
{
  "data": {
    "content": [...],
    "root": {
      "props": {
        "title": "Página Inicial"
      }
    },
    "zones": {}
  }
}
```

**Resultado**: ✅ Aprovado
- API retorna estrutura completa da página
- Dados correspondem ao arquivo `home.json`

---

### 3. Buscar Página Inexistente (GET /api/pages/[slug])

**Objetivo**: Verificar tratamento de erro para página não encontrada.

**Requisição**:
```bash
curl http://localhost:3000/api/pages/nao-existe
```

**Resposta Esperada** (Status 404):
```json
{
  "error": "Page not found"
}
```

**Resultado**: ✅ Aprovado
- API retorna erro 404 apropriadamente
- Mensagem de erro é clara

---

### 4. Criar Nova Página (POST /api/pages)

**Objetivo**: Verificar criação de nova página via API.

**Requisição**:
```bash
curl -X POST http://localhost:3000/api/pages \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "teste-api",
    "data": {
      "content": [
        {
          "type": "Text",
          "props": {
            "content": "Página de Teste",
            "as": "h1",
            "size": "3xl",
            "weight": "bold"
          }
        }
      ],
      "root": {
        "props": {
          "title": "Teste API"
        }
      },
      "zones": {}
    }
  }'
```

**Resposta Esperada** (Status 200):
```json
{
  "success": true,
  "slug": "teste-api",
  "message": "Page created successfully"
}
```

**Validações**:
- ✅ Arquivo `teste-api.json` criado em `data/pages/`
- ✅ Conteúdo do arquivo corresponde aos dados enviados
- ✅ Slug é sanitizado (caracteres especiais removidos)

**Resultado**: ✅ Aprovado

---

### 5. Criar Página com Slug Inválido (POST /api/pages)

**Objetivo**: Verificar sanitização de slugs com caracteres especiais.

**Requisição**:
```bash
curl -X POST http://localhost:3000/api/pages \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "Página Com Espaços!@#$",
    "data": {
      "content": [],
      "root": {"props": {"title": "Test"}},
      "zones": {}
    }
  }'
```

**Resposta Esperada** (Status 200):
```json
{
  "success": true,
  "slug": "p-gina-com-espa-os----",
  "message": "Page created successfully"
}
```

**Resultado**: ✅ Aprovado
- Slug é sanitizado corretamente
- Apenas caracteres alfanuméricos e hífens são mantidos

---

### 6. Criar Página Duplicada (POST /api/pages)

**Objetivo**: Verificar que não é possível criar página com slug já existente.

**Requisição**:
```bash
curl -X POST http://localhost:3000/api/pages \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "home",
    "data": {
      "content": [],
      "root": {"props": {"title": "Test"}},
      "zones": {}
    }
  }'
```

**Resposta Esperada** (Status 409):
```json
{
  "error": "Page already exists"
}
```

**Resultado**: ✅ Aprovado
- API retorna erro 409 (Conflict)
- Página existente não é sobrescrita

---

### 7. Criar Página com Dados Inválidos (POST /api/pages)

**Objetivo**: Verificar validação de estrutura de dados.

**Requisição**:
```bash
curl -X POST http://localhost:3000/api/pages \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "invalido",
    "data": {
      "invalid": "structure"
    }
  }'
```

**Resposta Esperada** (Status 400):
```json
{
  "error": "Invalid data structure. Expected root, content and zones properties"
}
```

**Resultado**: ✅ Aprovado
- API valida estrutura obrigatória (root, content, zones)
- Retorna mensagem de erro clara

---

### 8. Atualizar Página (PUT /api/pages/[slug])

**Objetivo**: Verificar atualização de página existente.

**Requisição**:
```bash
curl -X PUT http://localhost:3000/api/pages/teste-api \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "content": [
        {
          "type": "Text",
          "props": {
            "content": "Conteúdo Atualizado",
            "as": "h1",
            "size": "4xl",
            "weight": "bold"
          }
        }
      ],
      "root": {
        "props": {
          "title": "Teste API - Atualizado"
        }
      },
      "zones": {}
    }
  }'
```

**Resposta Esperada** (Status 200):
```json
{
  "success": true,
  "message": "Page updated successfully"
}
```

**Validações**:
- ✅ Arquivo `teste-api.json` é atualizado
- ✅ Conteúdo anterior é substituído
- ✅ Estrutura é mantida

**Resultado**: ✅ Aprovado

---

### 9. Atualizar Página Inexistente (PUT /api/pages/[slug])

**Objetivo**: Verificar que não é possível atualizar página que não existe.

**Requisição**:
```bash
curl -X PUT http://localhost:3000/api/pages/nao-existe \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "content": [],
      "root": {"props": {"title": "Test"}},
      "zones": {}
    }
  }'
```

**Resposta Esperada** (Status 404):
```json
{
  "error": "Page not found"
}
```

**Resultado**: ✅ Aprovado

---

### 10. Deletar Página (DELETE /api/pages/[slug])

**Objetivo**: Verificar remoção de página.

**Requisição**:
```bash
curl -X DELETE http://localhost:3000/api/pages/teste-api
```

**Resposta Esperada** (Status 200):
```json
{
  "success": true,
  "message": "Page deleted successfully"
}
```

**Validações**:
- ✅ Arquivo `teste-api.json` é removido
- ✅ GET subsequente retorna 404

**Resultado**: ✅ Aprovado

---

### 11. Verificar Permissões em Produção

**Objetivo**: Validar que operações de escrita são bloqueadas em produção por padrão.

**Pré-requisito**: Build e start em modo produção
```bash
NODE_ENV=production pnpm build
NODE_ENV=production pnpm start
```

**Requisição**:
```bash
curl -X POST http://localhost:3000/api/pages \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "teste-prod",
    "data": {
      "content": [],
      "root": {"props": {"title": "Test"}},
      "zones": {}
    }
  }'
```

**Resposta Esperada** (Status 403):
```json
{
  "error": "Write operations not allowed in production"
}
```

**Validações**:
- ✅ POST bloqueado em produção
- ✅ PUT bloqueado em produção
- ✅ DELETE bloqueado em produção
- ✅ GET funciona normalmente

**Resultado**: ✅ Aprovado

---

### 12. Integração com UI do Studio

**Objetivo**: Verificar que o editor visual integra corretamente com a API.

**Passos**:
1. Acesse `/studio`
2. Edite a página (adicione componentes, altere textos, etc.)
3. Observe indicador "Salvando..." no canto superior direito
4. Verifique arquivo `data/pages/home.json` foi atualizado

**Resultado**: ✅ Aprovado
- Salvamento automático funciona
- Indicador visual aparece durante salvamento
- Fallback para localStorage em caso de erro da API

---

## Resumo dos Resultados

| Teste | Status | Observações |
|-------|--------|-------------|
| 1. Listar páginas | ✅ | - |
| 2. Buscar página existente | ✅ | - |
| 3. Buscar página inexistente | ✅ | - |
| 4. Criar nova página | ✅ | - |
| 5. Criar com slug inválido | ✅ | Sanitização funcionando |
| 6. Criar página duplicada | ✅ | - |
| 7. Criar com dados inválidos | ✅ | - |
| 8. Atualizar página | ✅ | - |
| 9. Atualizar inexistente | ✅ | - |
| 10. Deletar página | ✅ | - |
| 11. Permissões produção | ✅ | - |
| 12. Integração UI | ✅ | - |

**Total**: 12/12 testes aprovados ✅

---

## Notas Adicionais

### Segurança

- ⚠️ A API não possui autenticação
- ⚠️ Não há rate limiting
- ⚠️ Não há validação de schema (Zod, Yup)
- ✅ Proteção contra escrita em produção por padrão

### Recomendações para Produção

1. Implementar autenticação (NextAuth, JWT, etc.)
2. Adicionar rate limiting
3. Implementar validação de schema com Zod
4. Adicionar logs estruturados
5. Implementar versionamento de páginas
6. Adicionar backup automático

### Performance

- ✅ Operações de I/O são síncronas mas adequadas para protótipo
- ℹ️ Para produção com volume alto, considerar banco de dados
- ℹ️ Implementar cache se necessário

---

## Data do Teste

**Data**: 21/11/2025  
**Ambiente**: Desenvolvimento (Node.js 20+, pnpm 9.14.4)  
**Versão**: 0.2.0-beta
