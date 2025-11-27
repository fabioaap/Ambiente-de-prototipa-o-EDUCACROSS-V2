# Quickstart – Figma MCP Token Server

## 1. Pré-requisitos
- Node 22.21.1 (`nvm use` will enforce) e pnpm 9.14.4+
- Variáveis no `.env.local` (ou VS Code secret store):
  - `FIGMA_PERSONAL_TOKEN`
  - `FIGMA_FILE_ID=Sz4z0rpDmocXZ8LylxEgqF` (Jornada 4800)
- Acesso ao frame `8565:17355` dentro do arquivo indicado
- Claude Desktop ou VS Code com suporte MCP (`.vscode/mcp.json` será atualizado)

## 2. Instalação
```bash
pnpm install --frozen-lockfile
pnpm --filter code-to-figma... run build   # garante dependências compartilhadas
```

## 3. Scripts úteis
| Comando | Descrição |
|---------|-----------|
| `pnpm mcp:figma:start` | Executa `node code-to-figma/figma-mcp-server/dist/index.js` em STDIO (para hosts MCP) |
| `pnpm mcp:figma:test`  | Faz chamada direta às duas ferramentas via CLI smoke test |
| `pnpm mcp:figma:health`| Chama `/health` do shim HTTP para atualizar `/api/health` |

## 4. Fluxo para atualizar tokens
1. `pnpm mcp:figma:start` e registre o servidor no host (Claude Desktop ou VS Code Workbench UI).
2. Execute o tool `get_design_tokens` informando `fileId` e `frameId` (via host UI ou `pnpm mcp:figma:test`).
3. Confirme que `packages/tokens/src/tokens.json` foi atualizado e rode:
   ```bash
   pnpm build:tokens && pnpm build:design-system && pnpm build --filter apps/studio...
   ```
4. Suba Storybook/Studio para validar visual (`pnpm dev:storybook` / `pnpm dev:studio`).
5. Commit + atualize `PROGRESS_DASHBOARD.md` e `domains/BackOffice/journeys/exibir-campo-uso/README.md` com o snapshot gerado.

## 5. Fluxo para registrar snapshots
1. Use `get_selection_snapshot` com `includePreview=true`.
2. Receba JSON + preview base64 e salve em `domains/BackOffice/journeys/exibir-campo-uso/assets/`.
3. Linke o arquivo no README/notas para rastreabilidade.

## 6. Atualizar health dashboards
- Após uma sincronização bem-sucedida, rode `pnpm mcp:figma:health` ou acione a página `/api/health` para garantir que `figmaMcpServer.status` esteja `ok`.
- Se o servidor cair, dashboards mostrarão `degraded`; reinicie `pnpm mcp:figma:start` e repita o teste.

## 7. Troubleshooting rápido
- **401 Figma API**: gere novo personal token e confirme escopo de leitura.
- **STDIO travado**: nenhuma saída deve ir para stdout; configure `pino`/`console.error`.
- **Tokens divergentes**: rode `pnpm test:mcp` para validar schema antes de gerar PR.
