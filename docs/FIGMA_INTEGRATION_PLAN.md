# Plano de Integração Figma - EDUCACROSS V2

## Visão Geral

Este documento descreve a integração automatizada entre Figma e o sistema EDUCACROSS V2 usando **Model Context Protocol (MCP)**.

## Arquitetura

### Componentes

1. **Figma MCP Server** (`code-to-figma/figma-mcp-server/`)
   - Servidor MCP via STDIO transport
   - Expõe ferramentas para extração de tokens e snapshots
   - Integra com Figma REST API v1

2. **Pipeline de Tokens** (`packages/tokens/`)
   - Recebe tokens do MCP server
   - Gera CSS variables e módulos ES/CJS
   - Alimenta Design System

3. **Design System** (`packages/design-system/`)
   - Consome tokens gerados
   - Exporta componentes React tipados
   - Usado por Studio e Storybook

4. **Observabilidade** (`apps/studio/src/app/api/health/`)
   - Endpoint `/api/health` expõe status do MCP
   - Dashboard mostra indicadores de saúde
   - Logs em `docs/PROGRESS_DASHBOARD.md`

## Ferramentas MCP Disponíveis

### 1. `get_design_tokens`

**Descrição**: Extrai design tokens (cores, tipografia, espaçamento) de um frame Figma específico.

**Entrada**:
```json
{
  "fileId": "Sz4z0rpDmocXZ8LylxEgqF",
  "frameId": "8565:17355",
  "writeTo": "packages/tokens/src/tokens.json"
}
```

**Saída**:
```json
{
  "metadata": {
    "sourceFrameId": "8565:17355",
    "sourceFileId": "Sz4z0rpDmocXZ8LylxEgqF",
    "exportedAt": "2025-11-28T01:15:00Z",
    "version": "0.1.0"
  },
  "colors": {
    "color.rede.primary": "#0066CC",
    "color.status.success": "#00AA00"
  },
  "typography": {
    "typography.heading.h1": {
      "fontFamily": "Inter",
      "fontSize": 32,
      "fontWeight": 700,
      "lineHeight": 1.2
    }
  },
  "spacing": {
    "spacing.medium": "16px"
  }
}
```

**Convenções de Nomenclatura**:
- Cores: `color.<categoria>.<nome>` (ex: `color.rede.azulEscuro`)
- Tipografia: `typography.<categoria>.<variante>` (ex: `typography.heading.h1`)
- Espaçamento: `spacing.<size>` (ex: `spacing.medium`)

**Limites e Restrições**:
- **Rate limit**: 60 requisições/minuto (Figma REST API)
- **Chamadas mensais**: Contas Starter/Viewer limitadas a 6 chamadas/mês
- **Tamanho do payload**: Frames com >1000 layers podem exceder tempo limite
- **Validação**: Apenas cores hexadecimais de 6 dígitos; lineHeight pode ser número ou percentage string

### 2. `get_selection_snapshot` (Implementação Pendente - Phase 4)

**Descrição**: Captura metadados e preview de uma seleção Figma.

**Status**: Planejado para Phase 4 (User Story 2).

## Fluxo de Trabalho

### Sincronização Manual de Tokens

```bash
# 1. Configurar ambiente
cp .env.local.example .env.local
# Adicionar FIGMA_PERSONAL_TOKEN e FIGMA_FILE_ID

# 2. Executar sincronização
cd code-to-figma/figma-mcp-server
pnpm exec tsx scripts/writeTokensFromMcp.ts

# 3. Verificar saída
cat ../../packages/tokens/src/tokens.json

# 4. Build automático
# (O script já executa pnpm build:tokens && pnpm build:design-system)

# 5. Validar no Storybook
pnpm dev:storybook
# Abrir http://localhost:6006 e verificar componentes com novos tokens
```

### Sincronização via MCP Host (VS Code/Claude)

1. Registrar servidor em `.vscode/mcp.json`:
```json
{
  "servers": {
    "figma-mcp": {
      "command": "pnpm",
      "args": ["mcp:figma:start"],
      "env": {}
    }
  }
}
```

2. No chat do VS Code ou Claude:
```
"Atualize os design tokens do Figma usando o frame 8565:17355"
```

3. O MCP server:
   - Busca tokens do Figma
   - Escreve em `packages/tokens/src/tokens.json`
   - Executa builds necessários
   - Retorna confirmação com estatísticas

## Monitoramento e Saúde

### Indicadores de Saúde

O servidor MCP expõe seu status através de:

1. **API `/api/health`**:
```json
{
  "status": "ok",
  "services": {
    "figmaMcpServer": {
      "status": "ok",
      "lastSync": "2025-11-28T01:15:00Z",
      "lastPayloadVersion": "0.1.0",
      "details": null
    }
  }
}
```

2. **Dashboard Studio** (`/dashboard`):
   - Widget "Figma MCP Server" na seção Health
   - Indicadores visuais: ✅ ok / ⚠️ degraded / ❌ offline

3. **Logs Estruturados**:
   - Logs do servidor: stderr via pino
   - Logs de sincronização: `docs/PROGRESS_DASHBOARD.md`

### Troubleshooting

#### Erro: 401 Unauthorized

**Causa**: Token Figma inválido ou expirado.

**Solução**:
1. Gerar novo Personal Access Token em Figma > Settings > Personal Access Tokens
2. Garantir escopo "File content" habilitado
3. Atualizar `.env.local` com novo token

#### Erro: Frame não encontrado

**Causa**: Frame ID incorreto ou arquivo sem acesso.

**Solução**:
1. Verificar `FIGMA_FILE_ID` no `.env.local`
2. Abrir arquivo no Figma e copiar frame ID da URL:
   ```
   https://www.figma.com/file/Sz4z0rpDmocXZ8LylxEgqF/...?node-id=8565-17355
                                                              ^^^^^^^^^^^
                                                              Este é o frameId
   ```
3. Garantir que o token tem acesso ao arquivo

#### Erro: Rate Limit Excedido

**Causa**: Mais de 60 requisições/minuto para Figma API.

**Solução**:
- Aguardar 1 minuto antes de tentar novamente
- Considerar batch updates em vez de sincronizações frequentes
- Usar caching local para reduzir chamadas

#### Servidor MCP não inicia

**Causa**: Dependências faltando ou erro de build.

**Solução**:
```bash
cd code-to-figma/figma-mcp-server
pnpm install
pnpm build
pnpm start
```

#### Tokens divergentes entre Figma e código

**Causa**: Sincronização não foi executada ou falhou silenciosamente.

**Solução**:
1. Executar sincronização manual
2. Verificar logs em `docs/PROGRESS_DASHBOARD.md`
3. Validar schema com testes:
   ```bash
   cd code-to-figma/figma-mcp-server
   pnpm test
   ```

## Manutenção

### Atualizando o Schema de Tokens

Se novos tipos de tokens forem adicionados (ex: `borders`, `animations`):

1. Atualizar `code-to-figma/figma-mcp-server/src/schemas/tokenSet.ts`
2. Adicionar extrator correspondente (ex: `extractBorderTokens()`)
3. Atualizar contract em `specs/001-figma-mcp-server/contracts/figma-mcp-tools.yaml`
4. Adicionar testes em `tests/contracts/tokenSet.contract.test.ts`
5. Documentar nova convenção neste arquivo

### Versionamento de Tokens

O campo `metadata.version` segue SemVer:
- **MAJOR**: Mudanças breaking (keys removidas, formatos alterados)
- **MINOR**: Novas features (novos tokens adicionados)
- **PATCH**: Correções (valores ajustados, sem mudança de keys)

Exemplo:
```
0.1.0 → 0.2.0: Adicionados tokens de spacing
0.2.0 → 1.0.0: Renomeados color.primary → color.rede.primary (breaking)
1.0.0 → 1.0.1: Ajustado color.rede.primary de #0066CC para #0055BB (patch)
```

## Próximos Passos

- [ ] **Phase 4**: Implementar `get_selection_snapshot` tool
- [ ] **Phase 5**: Adicionar health monitoring avançado com SLA tracking
- [ ] **Phase 6**: Quality gates e documentação final
- [ ] **Futuro**: Suporte para Figma Variables API (quando sair de beta)
- [ ] **Futuro**: CI/CD automation para sync em push/merge

## Referências

- [Model Context Protocol Docs](https://modelcontextprotocol.io/)
- [Figma REST API](https://www.figma.com/developers/api)
- [Especificação Completa](../specs/001-figma-mcp-server/spec.md)
- [Quickstart Guide](../specs/001-figma-mcp-server/quickstart.md)
- [Tasks](../specs/001-figma-mcp-server/tasks.md)
