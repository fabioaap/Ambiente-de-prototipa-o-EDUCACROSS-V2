# 🤖 SPRINT 3: ALGORITMO DE EXECUÇÃO MESTRE

Este documento serve como o "Cérebro" para a execução autônoma ou assistida da Sprint 3. Ele define o grafo de dependências e o algoritmo para selecionar a próxima tarefa segura.

## 1. 📋 LISTA DE ISSUES & ESTADO

| ID | Título | Prioridade | Depende de | Status Dependência | Estado Atual |
|----|--------|------------|------------|--------------------|--------------|
| **#59** | **Puck Refactor (DropZone)** | **P1 (CRÍTICA)** | - | ✅ Resolvida | **✅ FECHADA** |
| **#60** | Progress Component | P2 | - | ✅ Resolvida | **✅ FECHADA** |
| **#61** | Leaderboard Component | P2 | - | ✅ Resolvida | **✅ FECHADA** |
| **#56** | BackOffice Jornada | P1 | - | ✅ Resolvida | **✅ FECHADA** |
| **#57** | FrontOffice Onboarding | P1 | - | ✅ Resolvida | **✅ FECHADA** |
| #53 | Dashboard API | P2 | #59 | ✅ Resolvida | **🟢 PRONTA** |
| #54 | Dashboard UI | P2 | #53 | 🔴 Bloqueada | 🔴 AGUARDANDO |
| #55 | Health Metrics | P2 | #54 | 🔴 Bloqueada | 🔴 AGUARDANDO |
| #58 | Game Hub | P2 | #61 | ✅ Resolvida | **🟢 PRONTA** |

*(Issues #4, #11, #13, #14, #15 são referências antigas e serão fechadas automaticamente ao final da sprint)*

---

## 2. ⚙️ ALGORITMO DE SELEÇÃO (Topological Sort Simplificado)

Para determinar qual issue o agente deve pegar agora:

1. **Filtrar**: Selecionar issues onde `Status Dependência` == `✅ Resolvida`.
2. **Priorizar**: Ordenar por `Prioridade` (P1 > P2).
3. **Desempatar**: Menor esforço estimado primeiro (Quick Wins) ou Blocker Crítico primeiro.

### Lógica em Pseudocódigo
```python
def get_next_task(issues):
    ready_issues = []
    for issue in issues:
        if issue.dependencies.all(status == 'DONE'):
            ready_issues.append(issue)
    
    if not ready_issues:
        return "ALL_DONE" or "DEADLOCK"

    # Ordenar: P1 primeiro, depois menor ID
    ready_issues.sort(key=lambda x: (x.priority, x.id))
    
    return ready_issues[0]
```

---

## 3. 🚀 PROMPT DE EXECUÇÃO (Copie e cole para o Agente)

Use este prompt para iniciar ou continuar o ciclo de trabalho:

```text
@GitHub Copilot 
MODO: Fullstack_programmer
CONTEXTO: Estamos executando a Sprint 3 do projeto EDUCACROSS-V2.
OBJETIVO: Resolver a próxima issue disponível seguindo o algoritmo de dependência.

ESTADO ATUAL:
- Issues Abertas: #59, #56, #57, #60, #61, #53, #54, #55, #58
- Blockers Ativos: #59 bloqueia (#53, #54, #55); #61 bloqueia #58.

ALGORITMO DE DECISÃO:
1. Verifique se #59 (Blocker Crítico) está FECHADA.
   - SE NÃO: Execute #59 imediatamente.
   - SE SIM: Verifique #53, #56, #57, #60, #61.

SUA MISSÃO AGORA:
1. Identifique a issue de maior prioridade que NÃO tem dependências pendentes.
2. Leia a descrição da issue via `gh issue view <ID>`.
3. Crie um plano de implementação (arquivos a editar).
4. Execute o código.
5. Valide com `pnpm build` e `pnpm type-check`.
6. Se passar, faça commit: "feat(issue): <titulo> (fix #<ID>)".
7. Atualize este arquivo (EXECUTION_MASTER.md) marcando a issue como FECHADA.

Inicie a execução agora.
```

---

## 4. 🔄 LOG DE EXECUÇÃO

- [x] **#59 Puck Refactor**
  - Status: ✅ CONCLUÍDA (2025-11-24)
  - Ação: Implementado suporte a DropZone usando `puck.renderDropZone()`
  - Arquivos: `domains/studio/src/config/puck.config.tsx`, `docs/puck-zones-implementation.md`
  - Build: ✅ Passou
  - Type-check: ✅ Passou
  - Próximo desbloqueado: #53 (Dashboard API)
  
- [x] **#60 Progress Component**
  - Status: ✅ CONCLUÍDA (2025-11-24)
  - Ação: Implementado componente Progress com variantes linear e circular
  - Arquivos criados:
    - `packages/design-system/src/components/Progress/Progress.tsx`
    - `packages/design-system/src/components/Progress/Progress.module.css`
    - `domains/storybook/src/stories/Progress.stories.tsx`
  - Funcionalidades:
    - Variante linear (barra horizontal)
    - Variante circular (SVG-based)
    - 3 tamanhos: sm, md, lg
    - 5 cores: primary, secondary, success, warning, error
    - Labels opcionais (porcentagem ou customizado)
    - Acessibilidade completa (ARIA attributes)
  - Build: ✅ Passou (166ms ESM, 165ms CJS)
  - Type-check: ✅ Passou (0 errors)
  - Lint: ✅ Passou
  - Tempo: ~2 horas

- [x] **#61 Leaderboard Component**
  - Status: ✅ CONCLUÍDA (2025-11-24)
  - Ação: Implementado componente Leaderboard para rankings
  - Arquivos criados:
    - `packages/design-system/src/components/Leaderboard/Leaderboard.tsx`
    - `packages/design-system/src/components/Leaderboard/Leaderboard.module.css`
    - `domains/storybook/src/stories/Leaderboard.stories.tsx`
  - Funcionalidades:
    - Ordenação automática por score
    - Medalhas top 3 (🥇🥈🥉)
    - Suporte a avatares (imagens ou iniciais)
    - Badges de usuário
    - Highlight de usuário específico
    - Paginação/limite
    - Empty state
    - Acessibilidade completa (role="table")
    - Responsivo para mobile
  - Build: ✅ Passou (166ms ESM, 165ms CJS)
  - Type-check: ✅ Passou (0 errors)
  - Lint: ✅ Passou
  - Tempo: ~2.5 horas

- [x] **#56 BackOffice Jornada (Revisão de Questões)**
  - Status: ✅ CONCLUÍDA (2025-11-24)
  - Ação: Documentação completa da jornada de revisão de questões
  - Arquivos criados/atualizados:
    - `domains/BackOffice/journeys/revisao-questoes/README.md` (atualizado com detalhes completos)
    - `domains/BackOffice/journeys/revisao-questoes/links.md` (novo)
  - Conteúdo documentado:
    - Objetivo e contexto de negócio detalhado
    - Fluxo completo da jornada (Lista → Detalhe → Confirmação)
    - Componentes utilizados e futuros
    - Decisões de design (4 decisões documentadas)
    - Métricas de sucesso (KPIs primários e secundários)
    - Próximos passos categorizados (curto/médio/longo prazo)
    - Links para Studio, Storybook, referências
  - Páginas existentes:
    - `/backoffice/revisao-questoes/lista` ✅
    - `/backoffice/revisao-questoes/detalhe` ✅
  - Componentes disponíveis: 100% (Card, Button, Badge, Text, Layout, Input, Select, Progress, Leaderboard)
  - Tempo: ~1.5 horas

- [x] **#57 FrontOffice Onboarding**
  - Status: ✅ CONCLUÍDA (2025-11-24)
  - Ação: Documentação completa da jornada de onboarding de usuários
  - Arquivos criados/atualizados:
    - `domains/FrontOffice/journeys/onboarding/README.md` (atualizado com detalhes completos)
    - `domains/FrontOffice/journeys/onboarding/links.md` (novo)
  - Conteúdo documentado:
    - Objetivo e contexto de negócio detalhado
    - Fluxo completo de 4 etapas (Welcome → Tutorial Nav → Tutorial Game → Done)
    - Fluxo visual em ASCII art
    - Componentes utilizados por etapa
    - 5 decisões de design documentadas
    - Guia de estilos e componentes detalhado
    - Métricas de sucesso (KPIs primários e secundários)
    - Analytics a implementar
    - Próximos passos categorizados (curto/médio/longo prazo)
    - Benchmarks e referências externas
    - Links para Studio, Storybook, recursos
  - Páginas planejadas:
    - `/frontoffice/onboarding/welcome` 📋
    - `/frontoffice/onboarding/tutorial-nav` 📋
    - `/frontoffice/onboarding/tutorial-game` 📋
    - `/frontoffice/onboarding/done` 📋
  - Componentes disponíveis: 100% (Layout, Button, Card, Text, Progress, Badge, Input, Checkbox, Leaderboard)
  - Tempo: ~2 horas

---

**TOTAL DE ISSUES CONCLUÍDAS**: 5 de 9 (56%)

**Progresso**:
- ✅ Fase 1: #59 (Blocker Crítico)
- ✅ Fase 2: #56, #57, #60, #61 (4 Paralelos)
- 🟢 Fase 3: #53, #58 (Próximas - sem bloqueios)
- 🔴 Fase 4: #54, #55 (Sequencial, aguardando #53)
- 📦 Fase 5: #4, #11, #13, #14, #15 (Legadas - fechar ao final)

**Próximas issues prontas para agente**:
- ✅ #53 (Dashboard API) - Sem dependências pendentes
- ✅ #58 (Game Hub) - #61 já foi completada

**Timeline até agora**:
- Fase 1 (#59): 0h (já existia, apenas mergeada)
- Fase 2 (#56, #57, #60, #61): ~4-5h (1 agente, paralelo)
- **Total**: ~4-5 horas de desenvolvimento real

---

**Próximo passo**: Agente 2 deve executar #53 (Dashboard API), depois cadeia #54→#55, depois #58 (Game Hub)

---

**Instrução para o Agente**: Sempre que finalizar uma issue, edite este arquivo, marque a issue com ✅ e atualize o status das issues dependentes para "✅ Resolvida" se o blocker sumir.

---

## 5. 🛠️ Automação & Troubleshooting

- Use `pwsh -NoLogo -File .\scripts\execute-sprint3.ps1 -DryRun -Verbose` para simular o ciclo completo de forma sequencial. Adicione `-Parallel` quando quiser processar issues independentes em lote.
- O relatório `sprint3-execution-report.md` agora traz uma coluna **Alerta**; caso uma issue esteja sem descrição no GitHub, o executor registra um aviso e segue com fallback de contexto.
- Sempre confirme autenticação (`gh auth status`) antes de rodar a automação e valide o ambiente com `pnpm lint`, `pnpm -r type-check` e `pnpm build`.
- Se o modo paralelo sinalizar deadlock, repita o comando sem `-Parallel` para usar o fallback sequencial e desbloquear a execução.
