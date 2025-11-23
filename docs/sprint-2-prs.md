# Sprint 2 – PRs em Aberto (Tracking)

**Atualizado em**: 2025-11-22  
**Total de PRs P1**: 5 (0 mergeadas, 5 abertas)  
**Build Status**: ✅ Validado localmente

## 📌 PRs Prioritárias (Sprint 2)

| PR # | Título | Issue | Status | Bloqueador? | Links |
|------|--------|-------|--------|------------|-------|
| #42 | Implement dynamic page navigation and rename API | #6 (C2) | 🔴 Aberta | 🔴 Critical (habilita navegação) | [PR](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/42) \| [Issue](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/6) |
| #40 | Complete CONTRIBUTING.md | #10 (G6) | 🔴 Aberta | ✅ Não | [PR](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/40) \| [Issue](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/10) |
| #38 | Add script to generate automatic index of journeys | #9 (G4) | 🟡 WIP | ✅ Não | [PR](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/38) \| [Issue](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/9) |
| #35 | Improve accessibility design system | #7 (B4) | 🔴 Aberta | 🟡 Habilita #36 | [PR](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/35) \| [Issue](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/7) |
| #36 | Configure Storybook A11y addon | #8 (D2) | 🔴 Aberta | 🟡 Depende #35 | [PR](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/36) \| [Issue](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/8) |

---

## 🎯 Critério de Merge (Todos os PRs Devem Passar)

- ✅ `pnpm build` sem erros
- ✅ `pnpm lint` sem warnings críticos
- ✅ `pnpm -r type-check` = 0 erros TypeScript
- ✅ Stories/páginas funcionam e testadas
- ✅ Code review aprovado
- ✅ Nenhuma regressão P0 (C1, B1, D1, F1)

---

## 🔄 Estratégia de Merge (Ordem Recomendada)

**Fluxo**:
1. **#40 (G6 CONTRIBUTING.md)** ← Independente, não bloqueia nada
2. **#42 (C2 Sidebar)** ← Critical path (habilita navegação, muitas PMs querem)
3. **#38 (G4 Index Script)** ← Independente, governa jornadas
4. **#35 (B4 A11y)** ← Necessário antes de #36
5. **#36 (D2 Addon A11y)** ← Último (valida acessibilidade)

**Por quê?** Merges independentes primeiro (G6, G4), depois crítico (C2), depois dependências (B4→D2).

---

## 📋 Checklist de Review (Aplicar a Todas as PRs)

Copie e cole **em cada PR** como comentário:

```markdown
## ✅ Review Checklist (Sprint 2 P1)

### Build & Lint
- [ ] `pnpm build` passa (duração: ___ s)
- [ ] `pnpm lint` passa (0 warnings críticos)
- [ ] `pnpm -r type-check` = 0 erros
- [ ] Nenhum `console.error`

### Funcionalidade (Acceptance Criteria)
- [ ] Feature implementada conforme AC
- [ ] Stories criadas/atualizadas no Storybook
- [ ] Página no Studio funciona (se aplicável)
- [ ] Testes manuais: criar → ler → editar → deletar

### Documentação
- [ ] README / docs atualizado
- [ ] Comentários no código (lógica complexa)
- [ ] Conventions seguidas (branch naming, commit msg)

### Acessibilidade (P1)
- [ ] ARIA labels presentes (onde necessário)
- [ ] Navegação por teclado funciona
- [ ] Contraste de cores ≥ 4.5:1
- [ ] Screen reader testado (básico)

### QA Final
- [ ] Dev testou em `localhost:3000` + `:6006`
- [ ] Sem regressões P0
- [ ] Pronto para merge ✅

**Status**: [Aprovado ✅ / Bloqueado 🚫 / Comentários?]
```

---

## 📊 Status Geral (2025-11-22)

| Métrica | Valor |
|---------|-------|
| **PRs abertas** | 5 / 5 (100%) |
| **PRs mergeadas** | 0 / 5 (0%) |
| **Build local** | ✅ Verificado |
| **Bloqueadores críticos** | ✅ Nenhum |
| **Dependências** | Linear: G6 / G4 independentes, B4 bloqueia D2 |

---

## 🚀 Próximos Passos

1. **Código Review** (cada PR com checklist acima):
   - Revisar diff, compilar, testar local
   - Adicionar comentário com status do checklist
   
2. **Merge em sequência** (ordem recomendada acima):
   - Squash merge no GitHub web UI ou: `gh pr merge <#> --squash`
   - Verifica GitHub Actions roda pós-merge (workflow: `sprint-2-validation.yml`)
   
3. **Kanban Update** (após cada merge):
   - Move issue para "Done" no board
   - Fecha issue automaticamente se PR incluir "Fixes #X"
   
4. **Validação Pós-Merge**:
   - Ro dar `pnpm build` em main após cada merge
   - Atualizar esta tabela com data de merge

---

## 📈 Rastreamento de Progresso

| Fase | Status | Data |
|------|--------|------|
| PRs abertas | ✅ Concluído | 2025-11-21 |
| Docs de suporte (A, B, C) | ✅ Concluído | 2025-11-22 |
| Code review | ⏳ Em andamento | — |
| Merge #40 (G6) | ⏳ Pendente | — |
| Merge #42 (C2) | ⏳ Pendente | — |
| Merge #38 (G4) | ⏳ Pendente | — |
| Merge #35 (B4) | ⏳ Pendente | — |
| Merge #36 (D2) | ⏳ Pendente | — |

---

## 🔗 Referências

- **Kanban**: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/projects/3
- **PRs Abertas**: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pulls?q=is%3Aopen
- **Sprint 2 Docs**: 
  - `docs/sprint-2-planning.md` (contexto)
  - `RUN_SPRINT2.md` (guia de execução)
  - `SPRINT2_NEXT_STEPS.md` (este arquivo — ações)

---

**Gerado automaticamente em 2025-11-22. Atualize conforme PRs progridem.**
