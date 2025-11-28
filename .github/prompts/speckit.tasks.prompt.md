---
agent: speckit.tasks
---

## Contexto
- Feature: `specs/001-figma-mcp-server/`
- Documentos obrigatórios: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`
- Entrega acompanha `tasks.md` (fases Setup -> Controles e histórias US1–US3)

## Ordem recomendada
1. Executar `.specify/scripts/powershell/check-prerequisites.ps1 -Json` e registrar `FEATURE_DIR`/`AVAILABLE_DOCS` antes de abrir arquivos.
2. Ler `plan.md` + `spec.md` para confirmar requisitos FR-001…FR-011 e SC-001…SC-004.
3. Consultar `research.md`, `data-model.md` e `contracts/*.yaml` quando precisar de detalhes de API/esquemas.
4. Atualizar `specs/001-figma-mcp-server/tasks.md` seguindo as regras abaixo.
5. Revisar o arquivo completo (diff final) garantindo formatação, links e dependências corretas.
6. Encerrar com relatório citando contagem de tarefas, paralelismo, testes independentes e definição do MVP.

## Regras para `tasks.md`
- IDs sequenciais no formato `T###` (sem sufixos). Não deixar buracos.
- Manter fases existentes (Setup, Foundational, US1, US2, US3, Polish, Controles) e seus checkpoints.
- Cada tarefa precisa referenciar caminhos ou pacotes específicos do repo.
- Histórias devem listar testes próprios antes das tarefas de implementação.
- Usar `[P]` apenas para itens realmente paralelizáveis (arquivos distintos, sem dependência direta).
- Sempre citar quality gates (`pnpm lint`, `pnpm -r type-check`, `pnpm build`) e atualizações de jornada/docs quando a tarefa alterar tokens, Storybook ou APIs.
- Garantir seção de dependências/execução ao fim do arquivo.

## Saída esperada
- Resumir número total de tarefas e como cada história foi coberta.
- Destacar oportunidades de paralelismo relevantes.
- Reforçar que o MVP corresponde ao fechamento da US1 (Fase 3) e que cada história tem critério de teste independente mantido.

```