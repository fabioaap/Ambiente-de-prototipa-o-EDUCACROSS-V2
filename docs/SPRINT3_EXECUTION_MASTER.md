# 🤖 SPRINT 3: ALGORITMO DE EXECUÇÃO MESTRE

Este documento serve como o "Cérebro" para a execução autônoma ou assistida da Sprint 3. Ele define o grafo de dependências e o algoritmo para selecionar a próxima tarefa segura.

## 1. 📋 LISTA DE ISSUES & ESTADO

| ID | Título | Prioridade | Depende de | Status Dependência | Estado Atual |
|----|--------|------------|------------|--------------------|--------------|
| **#59** | **Puck Refactor (DropZone)** | **P1 (CRÍTICA)** | - | ✅ Resolvida | **🟢 PRONTA** |
| **#56** | BackOffice Jornada | P1 | - | ✅ Resolvida | **🟢 PRONTA** |
| **#57** | FrontOffice Onboarding | P1 | - | ✅ Resolvida | **🟢 PRONTA** |
| **#60** | Progress Component | P2 | - | ✅ Resolvida | **🟢 PRONTA** |
| **#61** | Leaderboard Component | P2 | - | ✅ Resolvida | **🟢 PRONTA** |
| #53 | Dashboard API | P2 | #59 | 🔴 Bloqueada | 🔴 AGUARDANDO |
| #54 | Dashboard UI | P2 | #53 | 🔴 Bloqueada | 🔴 AGUARDANDO |
| #55 | Health Metrics | P2 | #54 | 🔴 Bloqueada | 🔴 AGUARDANDO |
| #58 | Game Hub | P2 | #61 | 🔴 Bloqueada | 🔴 AGUARDANDO |

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

- [ ] **#59 Puck Refactor**
  - Status: 🟢 PRONTA
  - Ação: Iniciar imediatamente.
  
- [ ] **#56 BackOffice**
  - Status: 🟢 PRONTA (Paralelo)
  
- [ ] **#57 FrontOffice**
  - Status: 🟢 PRONTA (Paralelo)

- [ ] **#60 Progress**
  - Status: 🟢 PRONTA (Paralelo)

- [ ] **#61 Leaderboard**
  - Status: 🟢 PRONTA (Paralelo)

---

**Instrução para o Agente**: Sempre que finalizar uma issue, edite este arquivo, marque a issue com ✅ e atualize o status das issues dependentes para "✅ Resolvida" se o blocker sumir.
