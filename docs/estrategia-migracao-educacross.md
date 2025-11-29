# Estratégia recorrente de trabalho e migração para Educacross

## Contexto
Estamos desenvolvendo o *Ambiente de Prototipação Educacross* no repositório `fabioaap`. O Storybook, as jornadas dentro de `domains/` e o design system são contratos de prestação de serviço entregues para a Educacross. Como a cada nova jornada prototipada (ou atualização relevante) precisaremos sincronizar mudanças com o repositório da Educacross, precisamos de um fluxo padronizado e repetível.

## Objetivo
Permitir que novas versões do Storybook, das jornadas/domínios e dos artefatos relacionados sejam atualizadas no repo da Educacross com segurança, clareza de escopo e mínimo atrito, enquanto mantemos todo o histórico e a documentação no repositório `fabioaap`.

## Visão geral das fases

1. **Desenvolvimento e integração contínua no repo**
   - Manter branches organizados por jornada/issue (ex.: `feature/jornada-literacia-digitale`).
   - Garantir builds: `pnpm build`, `pnpm lint`, `pnpm -r type-check`, `pnpm test` (se existir).
   - Registrar o estado em `docs/CHANGELOG`, `docs/NOTICE_ENTREGAVEIS.md` e o inventário de Background IP.
   - Atualizar Storybook (`domains/storybook/`) e `domains/{dominio}/journeys/{jornada}` com histórias e README.

2. **Pacote de entrega e checklist técnico**
   - Gerar artefatos reutilizáveis:
     - Build do Storybook (`pnpm build:storybook` ou `pnpm storybook:build`).
     - Export do design system/tokens (`pnpm build:design-system`, `pnpm build:tokens`).
   - Criar `docs/checklist-entrega-educacross.md` com:
     - Lista de diretórios e arquivos a serem migrados.
     - Scripts de build e comandos de publicação.
     - Versões de Node, pnpm, dependências-chave.
   - Atualizar `docs/minuta-cessao-de-direitos.md` com inventário da entrega e indicação de Background IP.

3. **Migração/Atualização no repo Educacross**
   - Equipes Educacross recebem pacote ZIP, diff ou branch com os seguintes conteúdos:
     - `domains/storybook/` com histórias e scripts.
     - `domains/` com jornadas e assets.
     - `packages/design-system/` e `packages/tokens/` com build e README.
   - Fornecer `docs/instrucoes-migracao-educacross.md` com:
     - Comandos para instalar e executar (`pnpm install --frozen-lockfile`, `pnpm dev:studio`, `pnpm storybook`).
     - Como integrar o Storybook (ex.: rodar `pnpm storybook` e copiar o build estático para `_site/`).
     - Referências a variáveis de ambiente ou dependências externas.
   - Registrar no repo Educacross um `docs/creditos.md` com créditos e autorias (conforme o aditivo que for acordado).

4. **Ciclo recorrente**
   - Sempre que houver atualização ou nova jornada, repetir fases 1-3. O checklist e os scripts devem garantir idempotência.
   - Registrar versão (ex.: tag `educacross/v1.0-storybook`) e documentar no `SPRINT3_STATUS_CONSOLIDADO.md` (ou equivalente).

## Artefatos básicos a manter alinhados
- `docs/minuta-cessao-de-direitos.md`: cláusulas e escopo da cessão.
- `docs/NOTICE_ENTREGAVEIS.md`: inventário dos diretórios/arquivos cedidos.
- `docs/INVENTARIO-BACKGROUND-IP.md`: lista do know-how reservado.
- `domains/storybook/README.md`: instruções de execução e export.
- `domains/INDEX.md`: locais e status das jornadas.
- `docs/checklist-entrega-educacross.md`: comando de migração e validações.

## Comunicação, entrega e monitoramento
1. **Pacote Git**: preferir usar `git format-patch`, `git bundle` ou branch exportado para reduzir riscos. Inclua README, changelog, checklist e scripts.
2. **Armazenamento de builds**: gerar Storybook estático (`pnpm storybook:build`) e anexar o diretório `storybook-static/` (ou `_site`) à entrega.
3. **Documentação de testes**: registrar logs de lint/type-check e criar um sumário das funcionalidades novas (ex.: cards do dashboard, novos componentes das jornadas).
4. **Validação futura**: cada entrega pode vir com `docs/validacao-educacross.md` descrevendo testes realizados no ambiente Educacross.

## Próximos passos recomendados
1. Gerar os documentos `docs/checklist-entrega-educacross.md` e `docs/instrucoes-migracao-educacross.md` com comandos específicos para o ambiente da Educacross. Quer que eu os crie agora?
2. Validar com o time Educacross qual o canal preferido (PR, patch ou ZIP) para receber atualizações.
3. Definir um calendário de entregas periódicas (ex.: ao final de cada sprint) para manter o repo deles atualizado.

---

Se quiser, posso também automatizar esse fluxo com um script (ex.: `pnpm sync:educacross`) que gera o pacote do Storybook e dos domínios e exporta os diffs. Deseja que eu esboce esse script?