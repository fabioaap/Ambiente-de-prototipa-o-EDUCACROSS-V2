# ⚠️ INSTRUÇÃO URGENTE PARA AGENTE COPILOT

**LEIA ISTO AGORA** se estiver em execução!

---

## 🚨 SITUAÇÃO

Você estava executando a Sprint 3, mas **mudanças críticas foram feitas**:

✅ **PR #76 (Issue #59) foi mergeada com sucesso!**

- #59 agora está **FECHADA** no GitHub
- #53 foi **DESBLOQUEADA**
- **main foi atualizado** com novos commits

---

## ⚡ O QUE FAZER AGORA

### Se você está em uma shell/terminal:

```bash
# 1. PARE o que está fazendo (Ctrl+C se necessário)

# 2. Sincronize o repositório
git fetch origin
git checkout main
git pull origin main

# 3. Atualize dependências
pnpm install

# 4. Valide o ambiente
pnpm build
pnpm lint
pnpm -r type-check
```

### Se você está analisando código:

Ignore os arquivos desatualizados. **Leia agora**:

1. **NEXT_STEP_FOR_AGENT.md** (novo arquivo na raiz)
2. **SPRINT3_CHECKPOINT.md** (resumo visual)
3. **docs/SPRINT3_EXECUTION_MASTER.md** (atualizado)

---

## 📋 PRÓXIMO PASSO (URGENTE)

Após sincronizar, copie este prompt e execute **imediatamente**:

```text
@GitHub Copilot

MODO: Fullstack_programmer

STATUS CRÍTICO: Issue #59 (Puck Refactor) foi MERGEADA com sucesso!

PRÓXIMAS 4 ISSUES A EXECUTAR EM PARALELO (nenhuma dependência):
1. #56 — BackOffice Jornada (P1, 3-4h)
2. #57 — FrontOffice Onboarding (P1, 3-4h)
3. #60 — Progress Component (P2, 2-3h)
4. #61 — Leaderboard Component (P2, 2-3h)

INSTRUÇÕES:
Para CADA issue:
a. Leia a descrição com `gh issue view <ID>`
b. Crie um plano técnico (arquivos a criar/editar)
c. Implemente o código (siga padrões Design System)
d. Valide: `pnpm build && pnpm lint && pnpm -r type-check` ✅
e. Commit: "feat(issue): <titulo> (fix #<ID>)"
f. Abra PR com referência ao issue

CRITÉRIO DE SUCESSO:
✅ Build passes
✅ Lint passes
✅ Type-check passes
✅ Componentes em Storybook (se aplicável)
✅ Página em Studio funciona (se aplicável)
✅ PR aberta ou mergeada

REFERÊNCIAS:
- Design System: packages/design-system/src/components/
- Storybook: apps/storybook/src/stories/
- Puck Config: apps/studio/src/config/puck.config.tsx
- Tokens: packages/tokens/src/tokens.json

PRIORIDADE: MÁXIMA

Comece AGORA. Boa sorte!
```

---

## 🔗 Links Críticos

- **Documentação Principal**: `docs/SPRINT3_EXECUTION_MASTER.md`
- **Próximos Passos**: `NEXT_STEP_FOR_AGENT.md`
- **Checkpoint**: `SPRINT3_CHECKPOINT.md`

---

**Você tem ~5 segundos para ler isto e começar a sincronizar.**

**Go go go! 🚀**
