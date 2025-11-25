# Backlog: Entrega Educacross — Ambiente de Prototipação

Última atualização: 25/11/2025

Objetivo: Centralizar e priorizar as demandas que fazem parte da entrega do Ambiente de Prototipação (dashboard + Storybook + domains) para a Educacross e manter os documentos de referência anexados.

## Como usar este backlog
- Cada item tem: prioridade, descrição, proprietário sugerido, status e próximo passo claro.
- Os documentos de referência estão listados em "Referências" no final do arquivo. Atualize o backlog (PR) sempre que um item avançar.

---

## Prioridade Alta

1) Dashboard API (Issue #53)
   - Owner: Backend / DevOps
   - Status: Pendente / Em curso
   - Descrição: Finalizar endpoint `/api/dashboard/summary` e demais endpoints (`/api/dashboard/health`, `/api/dashboard/pages`), incluir métricas e links de navegação. Garantir testes de integração para leitura de `data/pages`.
   - Dependências: Coleção de páginas em `data/pages/` e `apps/studio/src/lib/health-metrics`.
   - Próximo passo: Revisar endpoints com logs e adicionar `navigationLinks` (feito). Validar testes end-to-end.

2) Dashboard UI (Issue #54)
   - Owner: Frontend
   - Status: Em progresso
   - Descrição: Implementar interface para PMs/designers: KPIs, Health, Recent Pages, Atalhos para Storybook e jornadas. Integrar com API existente e adicionar fallback para variáveis env.
   - Dependências: API pronta, Storybook rodando.
   - Próximo passo: Cobrir stories faltantes e revisar UX para PMs (filtros, busca, export acionar).

3) Minuta de cessão de direitos e inventários (contrato) — (docs/minuta-cessao-de-direitos.md)
   - Owner: Product Owner / Legal
   - Status: Rascunho criado, em andamento com Jurídico
   - Descrição: Formalizar o escopo da cessão, exclusões (Background IP), portfólio, reconhecimento de autoria e mecanismo de remuneração por exploração futura.
   - Próximo passo: Revisão pelo Jurídico e inclusão de Anexo A (inventário de entregáveis).

4) Inventário de Entregáveis — (docs/NOTICE_ENTREGAVEIS.md) (Pendente)
   - Owner: Dev (Autor)
   - Status: Pendente
   - Descrição: Inventariar as pastas e arquivos que compõem a entrega final (design-system, tokens, storybook build, `domains/`, docs e scripts).
   - Próximo passo: Gerar inventário inicial e anexar ao aditivo.

5) Inventário Background IP — (docs/INVENTARIO-BACKGROUND-IP.md) (Pendente)
   - Owner: Dev (Autor)
   - Status: Pendente
   - Descrição: Identificar frameworks, padrões, utilitários e templates que o autor considera Background IP e que não são objeto da cessão.
   - Próximo passo: Preencher a lista técnica e anexar no repo.

---

## Prioridade Média

6) Script de sync / automação (`pnpm sync:educacross`)
   - Owner: DevOps
   - Status: Pendente
   - Descrição: Script que empacota Storybook estático, `domains/` e docs em `dist/educacross`, prontos para push ao repo de teste (ou repo Educacross). Pode gerar ZIP ou criar Branch/commit local.
   - Próximo passo: Esboçar script e testes locais. Gerar `docs/checklist-entrega-educacross.md` com comandos e variáveis.

7) Repositório de Teste (fabioaap/educacross-sync-test)
   - Owner: DevOps / Author
   - Status: Pendente
   - Descrição: Repo para validar o fluxo de sync e gerar GitHub Pages (branch `gh-pages` ou GitHub Pages configurado). Reduz risco antes de migrar para repo da Educacross.
   - Próximo passo: Criar repositório, rodar `pnpm sync:educacross` e validar Build/Pages.

8) Checklist de migração e instruções (docs/checklist-entrega-educacross.md e docs/instrucoes-migracao-educacross.md)
   - Owner: DevOps
   - Status: Pendente
   - Descrição: Documentação prática para RH/Engineering da Educacross com passos, comandos e versionamento para migrar builds e domínios.
   - Próximo passo: Gerar checklist e incluir comandos `pnpm install --frozen-lockfile`, `pnpm storybook:build`, `pnpm build` do design-system, e instruções de push.

9) Automatizar CI para o destino (deploy para GH Pages)
   - Owner: DevOps / Eduacross
   - Status: Pendente
   - Descrição: Criar workflow do GitHub Actions para receber pacote e publicar GitHub Pages, validando lint e type-check previamente.
   - Próximo passo: Desenhar pipeline (build, test, publish) e validar no repo de teste.

---

## Prioridade Baixa

10) Game Hub (Issue #58)
    - Owner: UX / Fronend
    - Status: Pendente
    - Descrição: Criar versão consolidada da jornada Game (conteúdo, histórias e demonstrativos). Integrar com o Dashboard via atalhos.
    - Próximo passo: Definir scope e mockups de Game Hub.

11) Cobertura Storybook e Code-to-Figma
    - Owner: Design System / Figma dev
    - Status: Parcial
    - Descrição: Garantir que todas as componentes utilizados nas jornadas tenham stories e que a integração Storybook→Figma esteja testada.
    - Próximo passo: Priorizar stories críticas usadas nas jornadas e completar parser do `code-to-figma`.

---

## Tarefas Administrativas

- Redigir e-mail padrão para RH/Jurídico com minuta e anexos (Anexo A). (Pendente)
- Criar `docs/NOTICE_ENTREGAVEIS.md` e `docs/INVENTARIO-BACKGROUND-IP.md` e anexar em PR/Jurídico. (Pendente)
- Registrar cronograma de entregas recorrentes (ex.: sprint a cada 2 semanas para sync). (Pendente)
- Criar template de PR para transferências (especificar diretórios e arquivos incluídos). (Pendente)

---

## Referências (documentos anexos)
- `docs/minuta-cessao-de-direitos.md` — minuta rascunho de cessão de direitos (aditivo). 
- `docs/estrategia-migracao-educacross.md` — estratégia recorrente de desenvolvimento e migração para o repo Educacross.
- `apps/studio/src/app/api/dashboard/summary/route.ts` — API de origem do dashboard.
- `apps/studio/src/app/dashboard/page.tsx` — Dashboard com atalhos e KPIs.
- `docs/SPRINT3_EXECUTION_DETAILED.md` — sprints e tarefas da fase 3.
- `docs/checklist-entrega-educacross.md` — (em criação) checklist para migração.
- `docs/INVENTARIO-BACKGROUND-IP.md` — (em criação) inventário do Background IP do Autor.

---

## Proposta de próximos passos imediatos (prioridade para a sprint atual)
1. Criar `docs/NOTICE_ENTREGAVEIS.md` e `docs/INVENTARIO-BACKGROUND-IP.md` (Dev/Autor) — 1 dia.
2. Gerar script inicial `pnpm sync:educacross` e `docs/checklist-entrega-educacross.md` (DevOps) — 1 a 2 dias.
3. Criar repo de teste (fabioaap/educacross-sync-test) e rodar validação do sync. (DevOps) — 1 dia.
4. Enviar minuta para Jurídico (RH) com Anexo A preenchido e solicitar retorno. (Product/PO) — 2 a 4 dias.

---

Se desejar, eu já crio os arquivos pendentes (`docs/NOTICE_ENTREGAVEIS.md`, `docs/INVENTARIO-BACKGROUND-IP.md`, `docs/checklist-entrega-educacross.md`) e um script `pnpm sync:educacross` para validar o fluxo agora.

