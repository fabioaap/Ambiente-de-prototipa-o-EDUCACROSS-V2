# Feature Specification: Figma MCP Token Server

**Feature Branch**: `001-figma-mcp-server`  
**Created**: 2025-11-27  
**Status**: Draft  
**Input**: User description: "Conferi a documentação oficial do Model Context Protocol e precisamos criar um servidor MCP local para ler tokens reais do Figma, expondo ferramentas get_design_tokens e get_selection_snapshot para o workflow."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Importar tokens reais da Jornada 4800 (Priority: P1)

Responsável de Design Ops acessa o MCP host (Claude Desktop / VS Code) para executar a ferramenta `get_design_tokens`, apontando para o frame "Jornada #4800 – Exibir Campo USO" no Figma, e obtém um JSON pronto para atualizar `packages/tokens/src/tokens.json`. Rastreabilidade: `domains/BackOffice/journeys/exibir-campo-uso`, Studio slug `/backoffice/exibir-campo-uso`, superfícies `packages/tokens`, `apps/storybook`, `apps/studio`.

**Why this priority**: Sem tokens fiéis, cores de rede e tipografias continuam incorretas no Storybook e no dashboard; desbloquear isso garante consistência visual antes de qualquer outra automação.

**Independent Test**: Executar `get_design_tokens` com um frame válido e validar se o arquivo exportado mapeia todas as redes (Canoas, Porto Alegre, Gravataí) com valores iguais aos do Figma.

**Acceptance Scenarios**:

1. **Given** que o servidor MCP está registrado no `.vscode/mcp.json`, **When** o usuário executa o tool `get_design_tokens` com o frame ID da Jornada 4800, **Then** recebe um payload com cores, tipografia e espaçamento correspondentes ao conteúdo atual do Figma.
2. **Given** que o payload foi baixado, **When** o arquivo é aplicado em `packages/tokens`, **Then** o Storybook renderiza os badges USO com as mesmas cores vistas no Figma sem necessitar ajustes manuais.

---

### User Story 2 - Capturar snapshot de seleção para revisão (Priority: P2)

Curador de jornada precisa validar rapidamente se o componente construído reflete o frame selecionado. Ele executa `get_selection_snapshot` e recebe uma captura estruturada (metadados + preview base64) da seleção atual no Figma para anexar em `domains/BackOffice/journeys/exibir-campo-uso/notas.md`. Superfícies afetadas: `code-to-figma/figma-sync-engine`, `apps/studio/src/app/dashboard`, documentação da jornada.

**Why this priority**: Facilita revisão assíncrona antes de liberar tokens; evita abrir o Figma toda vez que alguém questiona um detalhe visual.

**Independent Test**: Usuário fornece um selection ID válido e recebe retorno contendo timestamp, autor, lista de camadas e thumbnail que podem ser colados diretamente no README da jornada.

**Acceptance Scenarios**:

1. **Given** uma seleção ativa no Figma (frame ou componente), **When** o tool `get_selection_snapshot` é chamado, **Then** o JSON retorna identificação do documento, nome do frame, dimensões e preview em base64.
2. **Given** que o snapshot contém preview, **When** o arquivo é salvo em `domains/BackOffice/journeys/exibir-campo-uso/assets/`, **Then** o README renderiza a imagem mais recente sem depender de prints manuais.

---

### User Story 3 - Monitorar e versionar o servidor MCP (Priority: P3)

Dev responsável pelo Dashboard precisa saber rapidamente se o servidor local está rodando e qual versão de tokens está disponível antes de rodar `pnpm dev:studio`. Ele consulta `/api/health` (Studio) que agora expõe o status `figma-mcp-server` e lê o histórico de execuções no `PROGRESS_DASHBOARD.md`. Superfícies: `apps/studio/src/app/api/health`, `apps/studio/src/app/dashboard`, `docs/PROGRESS_DASHBOARD.md`.

**Why this priority**: Minimiza tempo perdido com ambientes inconsistentes e mantém histórico auditável de quando os tokens foram atualizados.

**Independent Test**: Rodar servidor com `pnpm mcp:figma` e observar `/api/health` retornando `status: ok` para o item MCP; desligar o servidor deve mudar o status para `degraded`.

**Acceptance Scenarios**:

1. **Given** o servidor MCP está ativo, **When** `/api/health` é consultado, **Then** retorna seção `figmaMcpServer` com `status: "ok"`, timestamp da última sincronização e versão do payload aplicado no tokens.json.
2. **Given** o servidor foi desligado ou falhou, **When** `/api/health` é consultado, **Then** `status: "degraded"` aparece e `apps/studio` exibe banner orientando a reinicialização via script documentado.

### Edge Cases

- Token request falha por rate limit do Figma ou token inválido; o servidor precisa retornar erro amigável e manter última versão conhecida.
- Frame ID inexistente ou com layers ocultos; o tool deve informar quais camadas não puderam ser lidas e sugerir atualização do frame compartilhado no README da jornada.
- Servidor MCP é iniciado sem variável `FIGMA_PERSONAL_TOKEN`; tentativa de uso deve ser bloqueada com instruções para configurar `.env.local` e notificar Slack/Sprint docs.

## Requirements *(mandatory)*

Constitution alignment: garante que `@prototipo/design-system` use tokens fiéis, Storybook e Studio continuem numa única superfície, e APIs de dashboard exponham saúde do servidor MCP.

### Functional Requirements

- **FR-001**: MCP server MUST expose at least two tools (`get_design_tokens`, `get_selection_snapshot`) registradas no host através do `.vscode/mcp.json` usando transporte STDIO documentado.
- **FR-002**: `get_design_tokens` MUST accept frame and file identifiers (frameId, fileId) and return tokens normalizados (cores, tipografia, espaçamento, metadata) compatíveis com `packages/tokens/src/tokens.json`.
- **FR-003**: `get_selection_snapshot` MUST capture seleção atual com metadados (document, frame, layers, updatedAt, preview) e salvar JSON/thumbnail na pasta da jornada (`domains/BackOffice/journeys/exibir-campo-uso/assets`).
- **FR-004**: Server MUST read secure credentials (`FIGMA_PERSONAL_TOKEN`, optional `FIGMA_FILE_ID`) from `.env.local` or VS Code secrets and never log them em stdout.
- **FR-005**: CLI MUST provide scripts (`pnpm mcp:figma:start`, `pnpm mcp:figma:test`) para iniciar, parar e validar o servidor em ambientes Windows/macOS, com instruções replicadas em `SPRINT3_DOCUMENTATION_INDEX.md`.
- **FR-006**: Output tokens MUST trigger regeneration pipeline (`pnpm build:tokens`, `pnpm build:design-system`) e atualizar Storybook stories ligadas à jornada (#4800), mantendo rastreio no `PROGRESS_DASHBOARD.md`.
- **FR-007**: `/api/health` e `/api/dashboard/health` MUST incluir campo `figmaMcpServer` com status (`ok`, `degraded`, `offline`), timestamp da última sincronização e link para logs.
- **FR-008**: Documentation MUST cover troubleshooting (rate limits, auth errors, stale frames) em `domains/BackOffice/journeys/exibir-campo-uso/README.md` e no `FIGMA_INTEGRATION_PLAN.md`.
- **FR-009**: Server MUST provide unit/integration hooks (ex.: contract tests ou script `pnpm test:mcp`) que validem shape dos tokens antes de liberá-los para o design system.

### Key Entities *(include if feature involves data)*

- **FigmaFrame**: Representa o frame/selection no Figma; atributos: `fileId`, `frameId`, `name`, `lastModified`, `layers[]`.
- **TokenSet**: Bloco exportado por `get_design_tokens` contendo `colors`, `typography`, `spacing`, `metadata.version`, `sourceFrame`.
- **SnapshotArtifact**: Resultado de `get_selection_snapshot` com `document`, `frame`, `dimensions`, `previewBase64`, `exportedAt`, `notesPath`.

## Assumptions & Dependencies

1. FIGMA personal access token será fornecido pelo time de design e armazenado localmente; não será commitado.
2. Code-to-Figma assets existentes podem ser reutilizados para parsing inicial; ajustes ficam documentados no `FIGMA_INTEGRATION_PLAN.md`.
3. Usuários executarão scripts via Node 22.21.1 + pnpm 9.14.4 seguindo Playbook Sprint 3.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das atualizações de tokens da Jornada 4800 passam a ser geradas via `get_design_tokens`, eliminando edições manuais em `tokens.json` dentro de 2 dias úteis.
- **SC-002**: Em 95% das execuções, `get_selection_snapshot` entrega preview atualizado em menos de 30 segundos, permitindo revisão assíncrona.
- **SC-003**: `/api/health` reporta `figmaMcpServer.status = ok` durante pelo menos 90% do horário útil (9h-18h BRT) na semana de validação.
- **SC-004**: Storybook e Studio recebem tokens sincronizados e não apresentam discrepâncias visuais (0 bugs registrados em `ISSUES_BACKLOG_STATUS.md`) após dois ciclos completos de build.
