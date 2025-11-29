# 🚀 FASE 3: PROMPTS PRONTOS PARA COPIAR — 4 ISSUES RESTANTES

**Data**: 24 de novembro de 2025  
**Status**: Pronto para execução  
**Tempo Total Estimado**: ~11.5 horas (3 sequenciais + 2h health metrics)  
**Grafo de Dependências**: Validado e otimizado

---

## 📊 Resumo Executivo

| Ordem | #   | Título              | Tipo     | Tempo | Depende de | Status     |
|-------|-----|---------------------|----------|-------|-----------|-----------|
| 1️⃣    | #53 | Dashboard API       | Backend  | 3h    | #59 ✅    | 🟢 INICIE |
| 2️⃣    | #54 | Dashboard UI        | Frontend | 3h    | #53 ⏳    | 🔴 BLOQUED |
| 2️⃣    | #58 | Game Hub            | Jornada  | 3h    | #61 ✅    | 🟢 INICIE |
| 3️⃣    | #55 | Health Metrics      | Feature  | 2h    | #54 ⏳    | 🔴 BLOQUED |

**Recomendação**: 
- Comece com **#53** imediatamente (nenhum blocker)
- Em paralelo, execute **#58** (Game Hub é independente)
- Quando **#53** pronto, execute **#54**
- Quando **#54** pronto, execute **#55**

**Resultado Final**: Todas as 4 issues + legadas fechadas = Sprint 3 **100% completa**

---

## 🎯 PROMPT A: ISSUE #53 (Dashboard API)

**Copie este prompt e cole direto no Copilot:**

```
CONTEXTO:
Estou em uma Sprint 3 de prototipação. Preciso executar a issue #53 (Dashboard API) 
que implementa um endpoint GET /api/pages em Next.js.

OBJETIVO:
Implementar o endpoint REST que retorna lista de páginas criadas no Puck Studio, 
salvando no localStorage (ou em memória para prototipagem).

DEPENDÊNCIAS:
- #59 ✅ (Puck Refactor) já está FECHADA
- Sem outros blockers

REQUISITOS:
1. Criar arquivo: domains/studio/src/app/api/pages/route.ts
2. Implementar GET /api/pages que retorna:
   {
     "success": boolean,
     "data": [
       {
         "id": string,
         "title": string,
         "slug": string,
         "createdAt": ISO8601,
         "updatedAt": ISO8601,
         "content": { /* Puck JSON */ }
       }
     ],
     "error": string | null,
     "total": number,
     "timestamp": ISO8601
   }

3. Suportar query params: ?limit=10&offset=0 (opcional)

4. Data source: 
   - Para prototipagem, use um mock em memória com 3-5 páginas exemplo
   - Ou integre com localStorage do lado do cliente (SSR complexity)
   - Recomendação: Mock data com seed de páginas de exemplo

5. Error handling: try-catch com response 500 e mensagem de erro

6. CORS: Permitir localhost:3000

ACCEPTANCE CRITERIA:
- Endpoint responde em GET /api/pages
- Response inclui success, data, error, total, timestamp
- Paginação funciona (limit, offset)
- Error handling implementado
- Build passes: pnpm build && pnpm lint && pnpm -r type-check

COMO TESTAR:
1. pnpm dev:studio &
2. curl http://localhost:3000/api/pages
3. Esperado retorno JSON com success: true

DELIVERABLES:
- Arquivo route.ts criado com tipos TypeScript
- Teste manual com curl
- Build válido
- Commit: "feat(api): GET /api/pages endpoint (fix #53)"

MODO: Fullstack_programmer (entrega código pronto, não sugestões)
```

---

## 🎯 PROMPT B: ISSUE #54 (Dashboard UI)

**Copie este prompt quando #53 estiver PRONTA:**

```
CONTEXTO:
Issue #53 (GET /api/pages) foi concluída. Agora preciso da issue #54 que implementa 
a interface visual para listar páginas criadas no Studio.

OBJETIVO:
Criar página React em /studio/pages que consume o endpoint #53 e exibe tabela/grid 
de páginas com preview, título, data, ações.

DEPENDÊNCIA:
- #53 ✅ (Dashboard API) CONCLUÍDA
- Componentes de Design System: Card, Button, Text, Badge

REQUISITOS:
1. Arquivo: domains/studio/src/app/studio/pages/page.tsx (ou similar)

2. URL: http://localhost:3000/studio/pages

3. Funcionalidades:
   - Chamar GET /api/pages (de #53)
   - Exibir loading enquanto carrega
   - Tratamento de erros se API falhar
   - Listar páginas em tabela ou grid
   
4. Colunas/Campos para exibir:
   - Thumbnail/Preview (simulado com cor ou ícone)
   - Título da página
   - Slug (URL)
   - Data de atualização (formatada)
   - Ações: Editar, Deletar, Duplicar (buttons)

5. Design System:
   - Use componentes: Card, Button, Text, Badge
   - Use tokens de cor, espaçamento de packages/tokens/
   - Responsivo (mobile, tablet, desktop)

6. Interatividade (MVP):
   - Carregar dados ao montar (useEffect)
   - Buttons Editar -> redireciona para /studio/[slug] (edição)
   - Buttons Deletar -> confirma e remove (opcional: chamar DELETE /api/pages/:id)
   - Buttons Duplicar -> cria cópia (opcional)

7. Componente novo (se fizer falta):
   - Crie PagesList (container)
   - Reuse componentes DS existentes

ACCEPTANCE CRITERIA:
- Página carrega em http://localhost:3000/studio/pages
- Exibe loading state enquanto busca
- Renderiza tabela/grid com 5+ páginas mockadas (de #53)
- Botões funcionam (navegação, etc)
- Responsivo
- Build passa: pnpm build && pnpm lint && pnpm -r type-check
- Integração com #53 funciona (chama GET /api/pages)

COMO TESTAR:
1. Ter #53 rodando (pnpm dev:studio)
2. Visitar http://localhost:3000/studio/pages
3. Verificar tabela com dados carregados
4. Clicar em "Editar" -> navegação funciona
5. Verificar loading state (mock: esperar 500ms na fetch)

DELIVERABLES:
- page.tsx criado com tipos TypeScript
- Integração com fetch (#53) funcionando
- Story no Storybook (opcional mas recomendado)
- Build válido
- Commit: "feat(dashboard): pages list UI (fix #54)"

MODO: Fullstack_programmer
```

---

## 🎯 PROMPT C: ISSUE #58 (Game Hub)

**Copie este prompt quando quiser executar em paralelo com #53-#54:**

```
CONTEXTO:
Preciso executar a issue #58 (Game Hub) que documenta a jornada Game Hub do projeto. 
Esta issue é independente da cadeia Dashboard (#53-#54-#55).

OBJETIVO:
Criar estrutura de jornada Game Hub em domains/Game/journeys/ com documentação, 
fluxo de interação e links de referência.

DEPENDÊNCIA:
- #61 ✅ (Leaderboard Component) CONCLUÍDA
- Componentes disponíveis: Progress, Leaderboard, Button, Card (do DS)

REQUISITOS:
1. Estrutura de pasta:
   domains/Game/journeys/game-hub/
   ├── README.md (objetivo, fluxo, componentes, status)
   ├── links.md (referências)
   └── notas.md (decisões UX/design)

2. README.md deve incluir:
   - Título: "Jornada: Game Hub"
   - Objetivo: Descrever resultado esperado (ex: "Hub central para acessar todos os jogos")
   - Status: checklist de progresso (Planejamento, Em andamento, Concluído)
   - Fluxo: Diagrama ASCII ou descrição passo a passo
     Ex:
     1. Usuário entra em /game-hub
     2. Vê lista de jogos disponíveis (cards)
     3. Clica em um jogo -> navega para /game/:slug
     4. Pode voltar ao hub via botão "Voltar"
   - Componentes Utilizados:
     * Card (game card com thumbnail)
     * Button (play, voltar)
     * Text (título, descrição)
     * Leaderboard (ranking dos jogadores) — de #61
     * Progress (progresso do jogador) — de #60
   - Links:
     * [Studio](http://localhost:3000/game-hub)
     * [Figma Design](...)
     * [Protótipo](...)

3. links.md deve ter:
   - Quick links para Studio, Figma, protótipo
   - Referências relacionadas (BackOffice, FrontOffice)
   - Status: Rascunho | Em Construção | Pronto

4. notas.md pode incluir:
   - Decisões UX (por que um card layout em vez de lista?)
   - Feedback de PM/Designer
   - Próximos passos

5. Criar página de exemplo no Studio:
   - URL: http://localhost:3000/game-hub (ou /pages/game-hub)
   - Usar Puck para montar layout com Cards simulando jogos
   - Integrar Leaderboard (#61) como seção adicional
   - Integrar Progress (#60) como badge/indicator

6. Atualizações:
   - Adicionar link em domains/Game/README.md
   - Referenciar em docs/SPRINT3_DOCUMENTATION_INDEX.md

ACCEPTANCE CRITERIA:
- Pasta domains/Game/journeys/game-hub/ criada
- README.md bem estruturado com objetivo, fluxo, componentes
- links.md e notas.md preenchidos
- Página de exemplo no Studio funcionando
- Componentes #60 (Progress) e #61 (Leaderboard) integrados
- domains/Game/README.md atualizado com link
- Build passa: pnpm build && pnpm lint && pnpm -r type-check

COMO TESTAR:
1. Verificar pasta domains/Game/journeys/game-hub/ existe
2. Ler domains/Game/journeys/game-hub/README.md
3. Abrir Studio: http://localhost:3000/studio
4. Carregar página /game-hub
5. Verificar Leaderboard e Progress renderizando

DELIVERABLES:
- 3 arquivos markdown (README, links, notas)
- Página Puck no Studio com game-hub
- Atualização de navegação
- Commit: "docs(game): game-hub journey documentation (fix #58)"

MODO: Fullstack_programmer
```

---

## 🎯 PROMPT D: ISSUE #55 (Health Metrics)

**Copie este prompt quando #54 estiver PRONTA:**

```
CONTEXTO:
Issue #54 (Dashboard UI) foi concluída. Agora preciso da issue #55 que adiciona 
indicadores de saúde do repositório ao Dashboard.

OBJETIVO:
Expandir o Dashboard (#54) com seção de "Health Metrics" que mostra indicadores 
como: build status, commits últimas 24h, issues abertas, PRs em review, etc.

DEPENDÊNCIA:
- #54 ✅ (Dashboard UI) CONCLUÍDA
- Componentes: Card, Progress, Text, Badge
- Componente Progress (#60) pode ser reutilizado

REQUISITOS:
1. Adicionar seção ao Dashboard UI (/studio/pages):
   - Título: "Indicadores de Saúde"
   - Mostrar 4-5 métricas principais

2. Métricas (mockadas para prototipagem):
   - Build Status: "✅ Passando" (verde) ou "❌ Falhou" (vermelho)
   - Commits Last 24h: "12 commits"
   - Open Issues: "9 issues"
   - Open PRs: "2 PRs em review"
   - Cobertura de testes: "85%" (com Progress bar)

3. Design:
   - Use Card para cada métrica
   - Use Progress para cobertura de testes
   - Use Badge para status (verde/vermelho)
   - Use tokens de cor
   - Grid responsivo (2-3 colunas)

4. Data Source:
   - Para MVP: mock data (hardcoded ou JSON)
   - Futuro: integrar com GitHub API

5. Componente novo (opcional):
   - HealthIndicator (reutilizável)
   - HealthMetrics (container)

6. Integração:
   - Adicionar em domains/studio/src/app/studio/pages/page.tsx
   - Ou em arquivo separado: domains/studio/src/app/studio/health/page.tsx

7. Stories:
   - Criar stories no Storybook para HealthMetrics
   - 3-5 variações (sucesso, aviso, erro)

ACCEPTANCE CRITERIA:
- Seção Health Metrics renderiza no Dashboard
- Mostra 4+ métricas com dados mockados
- Usa componentes DS (Card, Progress, Badge)
- Responsivo (mobile, tablet, desktop)
- Stories criadas e documentadas
- Build passa: pnpm build && pnpm lint && pnpm -r type-check

COMO TESTAR:
1. Verificar http://localhost:3000/studio/pages
2. Rolar página e ver seção "Health Metrics"
3. Visualizar 4+ cards com métricas
4. Abrir Storybook: pnpm dev:storybook
5. Procurar stories de HealthMetrics

DELIVERABLES:
- Componente HealthMetrics criado (em design-system ou studio)
- Integração no Dashboard page.tsx
- 5+ stories no Storybook
- Build válido
- Commit: "feat(dashboard): health metrics indicators (fix #55)"

MODO: Fullstack_programmer
```

---

## 📋 CHECKLIST ANTES DE COMEÇAR CADA ISSUE

**Faça isso ANTES de copiar o prompt:**

- [ ] Leia a issue completa: `gh issue view <ID>`
- [ ] Verifique branch atual: `git branch` (deve estar em `main`)
- [ ] Crie branch de feature: `git checkout -b feature/c<ID>-{slug}`
- [ ] Instale dependências: `pnpm install --frozen-lockfile`
- [ ] Inicie dev: `pnpm dev:studio &` + `pnpm dev:storybook &`

**Padrão para branch**:
```bash
# Issue #53
git checkout -b feature/c53-dashboard-api

# Issue #54
git checkout -b feature/c54-dashboard-ui

# Issue #58
git checkout -b feature/c58-game-hub

# Issue #55
git checkout -b feature/c55-health-metrics
```

---

## ✅ CHECKLIST APÓS CADA ISSUE

**Faça isso DEPOIS de terminar:**

1. **Build + Lint + Type-check**
   ```bash
   pnpm build
   pnpm lint
   pnpm -r type-check
   ```

2. **Teste manual**
   - Abra a página/componente no navegador
   - Clique nos botões
   - Verifique responsividade (F12 → device emulation)

3. **Storybook** (se foi criar componente novo)
   - Abra: http://localhost:6006
   - Verifique stories renderizam corretamente

4. **Git + GitHub**
   ```bash
   git add .
   git commit -m "feat(scope): description (fix #<ID>)"
   git push -u origin feature/c<ID>-{slug}
   ```

5. **Criar PR**
   ```bash
   gh pr create --title "feat: description" --body "Fix #<ID>"
   ```

6. **Merge** (quando aprovada)
   ```bash
   gh pr merge <PR_NUMBER> --squash --delete-branch
   ```

7. **Atualizar este doc**
   - Marcar issue como ✅ FECHADA
   - Atualizar status em SPRINT3_EXECUTION_MASTER.md

---

## 🔄 SEQUÊNCIA RECOMENDADA

### Opção A: Sequencial Rigorosa
```
Hora 0:   Inicie #53 (Dashboard API)
Hora 3:   #53 pronta → PR mergeada
Hora 4:   Inicie #54 (Dashboard UI) + #58 (Game Hub) em paralelo
Hora 7:   #54 pronta → PR mergeada
Hora 8:   Inicie #55 (Health Metrics)
Hora 10:  #55 pronta → PR mergeada
Hora 10+: Feche issues legadas (#4, #11, #13, #14, #15)
Hora 11.5: SPRINT 3 COMPLETA 100%
```

### Opção B: Paralela Máxima (2 agentes)
```
Agente 1          Agente 2
─────────────────────────────
#53 (3h)    |     #58 (3h) paralelo
#54 (3h)    |     
#55 (2h)    |     
─────────────────────────────
Total: ~6h real (vs 11.5h sequencial)
```

---

## 🔗 LINKS DE REFERÊNCIA

**Documentação Sprint 3**:
- [SPRINT3_DOCUMENTATION_INDEX.md](./SPRINT3_DOCUMENTATION_INDEX.md) — índice central
- [SPRINT3_EXECUTION_MASTER.md](./docs/SPRINT3_EXECUTION_MASTER.md) — algoritmo e status
- [SPRINT3_EXECUTION_DETAILED.md](./SPRINT3_EXECUTION_DETAILED.md) — especificações completas

**Código**:
- [Puck config](./domains/studio/src/config/puck.config.tsx) — componentes registrados
- [Design System](./packages/design-system/src/components/) — Button, Card, Text, etc
- [Tokens](./packages/tokens/src/tokens.json) — cores, espaçamento, tipografia

**Padrões**:
- [Copilot Instructions](./copilot-instructions.md) — guia do projeto
- [Contributing](./CONTRIBUTING.md) — padrões de commit, PR, branch

---

## 🆘 TROUBLESHOOTING

### Erro: "Cannot find module @prototipo/design-system"
```bash
pnpm install --frozen-lockfile
pnpm build:design-system
```

### Erro: "pnpm dev:studio does not start"
```bash
# Kill processos antigos
npx kill-port 3000 6006

# Limpar cache
pnpm clean
pnpm install --frozen-lockfile

# Tentar novamente
pnpm dev:studio &
```

### Erro: "Type errors after changes"
```bash
pnpm -r type-check --watch
```

### PR não faz merge
```bash
# Verificar status
gh pr view <PR_NUMBER>

# Se bloqueada: verificar review status
gh pr view <PR_NUMBER> --json reviews

# Se fechada: tentar reabrir
gh pr reopen <PR_NUMBER>
```

---

## 📞 COMO PEDIR AJUDA

Se travar em uma issue:

1. Verifique **RUN_SPRINT2.md** e **copilot-instructions.md** (contexto geral)
2. Leia a issue no GitHub: `gh issue view <ID>`
3. Procure padrões similares no código (git log, grep)
4. Se ainda travado: mencione no branch/PR qual foi a dificuldade

---

## 🎓 RESUMO: O QUE FAZER AGORA

1. **Copie o PROMPT A** (#53) acima
2. **Cole no Copilot** com instruções de código pronto
3. **Execute as etapas**:
   - Crie branch: `git checkout -b feature/c53-dashboard-api`
   - Implemente: use o prompt como guia
   - Teste: `pnpm build && pnpm lint && pnpm -r type-check`
   - Mergue: `git push && gh pr create && gh pr merge --squash`
4. **Repita** para #54, #58, #55 (respeitando dependências)
5. **Feche legadas** quando tudo pronto

**Tempo total**: ~11.5 horas | **Deadliness**: Sexta-feira EOD

Good luck! 🚀

```

---

**Versão**: 1.0  
**Criado em**: 2025-11-24 21:15 UTC  
**Status**: ✅ Pronto para uso
