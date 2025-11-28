# 🚀 PRÓXIMO PASSO PARA O AGENTE COPILOT CLOUD

**Data**: 2025-11-24 19:35 UTC  
**Status**: ✅ #59 FECHADA — 4 paralelos DESBLOQUEADOS

---

## ⚡ RESUMO EXECUTIVO

✅ **Issue #59 (Puck Refactor)** foi mergeada com sucesso!

**Você deve AGORA executar as 4 issues paralelas em paralelo:**
- **#56** — BackOffice Jornada (P1)
- **#57** — FrontOffice Onboarding (P1)
- **#60** — Progress Component (P2)
- **#61** — Leaderboard Component (P2)

**Tempo estimado**: 4-5 horas de desenvolvimento real

---

## 📋 SEU PRÓXIMO PASSO

Cole este prompt no seu ambiente Copilot Cloud e execute:

```text
@GitHub Copilot

MODO: Fullstack_programmer

CONTEXTO: Sprint 3 do projeto EDUCACROSS-V2

BLOCKER CRÍTICO #59: ✅ FECHADO (PR #76 merged)

PRÓXIMAS 4 ISSUES A EXECUTAR EM PARALELO:
1. #56 — BackOffice Jornada (P1, 3-4h)
2. #57 — FrontOffice Onboarding (P1, 3-4h)
3. #60 — Progress Component (P2, 2-3h)
4. #61 — Leaderboard Component (P2, 2-3h)

INSTRUÇÕES:
1. Para CADA issue:
   a. Leia a descrição com `gh issue view <ID>`
   b. Crie um plano técnico (arquivos, componentes)
   c. Implemente o código (siga padrões do Design System)
   d. Rode `pnpm build && pnpm lint && pnpm -r type-check` — tudo deve passar
   e. Commit: "feat(issue): <titulo> (fix #<ID>)"
   f. Abra PR ou mergee direto para main

2. Após completar TODOS os 4:
   a. Atualize SPRINT3_EXECUTION_MASTER.md (marque com ✅)
   b. Notifique que os 4 paralelos estão prontos
   c. Próximo agente inicia #53 (Dashboard API) — será desbloqueado em sequência

CRITÉRIO DE SUCESSO:
- ✅ Build passes (`pnpm build`)
- ✅ Lint passes (`pnpm lint`)
- ✅ Type-check passes (`pnpm -r type-check`)
- ✅ Componentes aparecem no Storybook (se aplicável)
- ✅ Página no Studio funciona (se aplicável)
- ✅ PR aberta com referência ao issue ou mergeada direto

REFERÊNCIAS:
- Design System: packages/design-system/src/components/
- Storybook: domains/storybook/src/stories/
- Puck Config: domains/studio/src/config/puck.config.tsx
- Tokens: packages/tokens/src/tokens.json
- Documentação DropZone: docs/puck-zones-implementation.md (para contexto de #59)

PRIORIDADE: MÁXIMA — Estes 4 issues desbloqueiam toda a cadeia P2 (#53→#54→#55→#58).

Comece AGORA. Boa sorte!
```

---

## 📊 PRÓXIMA FASE (Após esses 4)

Após as 4 issues paralelas serem FECHADAS:

1. **#53** — Dashboard API (P2, 3h) — PRONTO AGORA
2. **#54** — Dashboard UI (P2, 3h) — Aguarda #53
3. **#55** — Health Metrics (P2, 2h) — Aguarda #54
4. **#58** — Game Hub (P2, 3h) — Aguarda #61 (que será fechado acima)

**Timeline**:
- Agora → 4-5h: #56, #57, #60, #61 (paralelo)
- +3h: #53
- +3h: #54
- +2h: #55
- +3h (paralelo): #58

**Total**: ~18 horas de desenvolvimento até fechar Sprint 3

---

## ✅ CHECKLIST ANTES DE COMEÇAR

- [ ] Você está em `main` branch
- [ ] `git pull origin main` foi executado (main atualizada com #59)
- [ ] `pnpm install` foi rodado (dependências ok)
- [ ] `pnpm build` passa localmente
- [ ] `gh auth status` mostra autenticação ativa
- [ ] Você tem os 4 prompts acima copiados

---

**Próximo comando para o agente:**

```bash
git pull origin main && pnpm install && pnpm build
```

Se tudo passar, comece com `gh issue view 56` e siga o prompt paralelo acima.

Boa execução! 🚀
