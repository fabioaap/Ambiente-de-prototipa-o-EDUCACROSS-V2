# Figma MCP Server

Servidor MCP (Model Context Protocol) para integração com o Figma, permitindo que agentes de IA acessem tokens de design e snapshots de frames diretamente do Figma.

## 📋 Status do Projeto

| User Story | Descrição | Status |
|------------|-----------|--------|
| **US1** | Importar tokens reais da Jornada 4800 | ✅ Concluído |
| **US2** | Gerar snapshots visuais (PNG) de frames | ⏳ Pendente |

## 🛠️ Ferramentas Disponíveis

### `get_design_tokens`
Extrai tokens de design (cores, tipografia, espaçamento) de um arquivo Figma e retorna em formato JSON estruturado.

- **Input**: `fileKey` (ID do arquivo Figma)
- **Output**: JSON com tokens categorizados (colors, typography, spacing, shadows, borderRadius).

## 🚀 Como Usar

### Instalação
```bash
cd code-to-figma/figma-mcp-server
pnpm install
```

### Configuração
Crie um arquivo `.env` na raiz do servidor:
```env
FIGMA_ACCESS_TOKEN=seu_token_aqui
```

### Executar Servidor (STDIO)
```bash
pnpm start
```

### Scripts Utilitários

#### Sincronizar Tokens (US1)
Este script usa o servidor MCP para buscar tokens do Figma e salvar em `packages/tokens/src/tokens.json`.

```bash
# Executar script de sincronização
pnpm run sync:tokens
```

## 🧪 Testes

O projeto possui testes de contrato (mockados) e integração (reais).

```bash
# Rodar todos os testes
pnpm test

# Rodar apenas testes de contrato
pnpm test:contract

# Rodar testes de integração (requer FIGMA_ACCESS_TOKEN)
pnpm test:integration
```

## 🏗️ Arquitetura

- **Server**: `@modelcontextprotocol/sdk` (STDIO transport)
- **Client**: `undici` para requisições HTTP ao Figma API
- **Validation**: `zod` para validação de schemas
- **Testing**: `vitest` para testes unitários e de integração
