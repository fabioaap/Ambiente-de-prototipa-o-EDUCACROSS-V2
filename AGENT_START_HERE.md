# 🎯 SPRINT 3 — INSTRUÇÕES FINAIS PARA AGENTE COPILOT CLOUD

**Data**: 2025-11-24 20:00 UTC  
**Status**: ✅ PRONTO PARA PRÓXIMA EXECUÇÃO

---

## ✅ O QUE JÁ FOI FEITO

- ✅ Issue #59 (Puck Refactor) — **MERGEADA com PR #76**
- ✅ Documentação criada e sincronizada
- ✅ Arquivos de instrução prontos
- ✅ Repositório limpo e atualizado

---

## 🚀 SEU TRABALHO AGORA

Você vai executar **4 issues em paralelo**:

| # | Título | Prioridade | Esforço | Status |
|---|--------|-----------|---------|--------|
| #56 | BackOffice Jornada | P1 | 3-4h | 🟢 PRONTA |
| #57 | FrontOffice Onboarding | P1 | 3-4h | 🟢 PRONTA |
| #60 | Progress Component | P2 | 2-3h | 🟢 PRONTA |
| #61 | Leaderboard Component | P2 | 2-3h | 🟢 PRONTA |

---

## ⚡ PRIMEIROS PASSOS (5 MINUTOS)

### 1️⃣ Sincronizar repositório

```bash
git fetch origin
git checkout main
git pull origin main
pnpm install
```

### 2️⃣ Validar ambiente

```bash
pnpm build
pnpm lint
pnpm -r type-check
```

Tudo deve passar ✅

### 3️⃣ Ler documentação

Abra estes arquivos **na ordem**:
1. **NEXT_STEP_FOR_AGENT.md** — Prompt pronto para copiar
2. **docs/SPRINT3_EXECUTION_MASTER.md** — Referência do algoritmo
3. **docs/puck-zones-implementation.md** — Contexto de #59 (se precisar)

---

## 📋 PROMPT PARALELO (COPIE E EXECUTE)

```text
@GitHub Copilot

MODO: Fullstack_programmer

CONTEXTO: Sprint 3 EDUCACROSS-V2 — Executar 4 issues em paralelo

ISSUES:
1. #56 — BackOffice Jornada (P1, 3-4h, independente)
2. #57 — FrontOffice Onboarding (P1, 3-4h, independente)
3. #60 — Progress Component (P2, 2-3h, independente)
4. #61 — Leaderboard Component (P2, 2-3h, independente)

INSTRUÇÕES PARA CADA ISSUE:

1. Leia a descrição:
   gh issue view <ID>

2. Crie um plano técnico:
   - Quais componentes usar?
   - Quais arquivos criar/editar?
   - Qual é o padrão Design System?

3. Implemente o código:
   - Siga padrões em packages/design-system/src/components/
   - Use tokens de design: packages/tokens/src/tokens.json
   - Se usar Puck: Veja docs/puck-zones-implementation.md

4. Valide:
   pnpm build     # Deve passar
   pnpm lint      # Deve passar
   pnpm -r type-check  # Deve passar 0 errors

5. Crie story no Storybook (se aplicável):
   apps/storybook/src/stories/

6. Commit:
   git commit -m "feat(issue): <titulo-curto> (fix #<ID>)"

7. Abra PR com referência:
   git push -u origin feature/issue-<ID>-<titulo>
   gh pr create --title "feat: <titulo> (fix #<ID>)"

CRITÉRIO DE SUCESSO:
✅ Build passes
✅ Lint passes
✅ Type-check = 0 errors
✅ Storybook mostra novo componente (se aplicável)
✅ Studio mostra nova jornada funcionando (se aplicável)
✅ PR aberta com descrição clara

ORDEM DE EXECUÇÃO:
- Pode fazer em paralelo (sem dependências)
- Mas é mais fácil fazer sequencial: #56 → #57 → #60 → #61

PRÓXIMO PASSO APÓS COMPLETAR:
1. Marque issues como fechadas (PRs mergeadas)
2. Atualize docs/SPRINT3_EXECUTION_MASTER.md
3. Notifique que os 4 estão prontos
4. Próximo agente inicia #53 (Dashboard API)

Comece AGORA!
```

---

## 🔗 REFERÊNCIAS CRÍTICAS

**Design System** (Componentes base):
```
packages/design-system/src/components/
├── Button/
├── Card/
├── Layout/
└── Text/
```

**Storybook** (Exemplos visuais):
```
apps/storybook/src/stories/
├── Button.stories.tsx
├── Card.stories.tsx
├── Layout.stories.tsx
└── Text.stories.tsx
```

**Puck Config** (Editor visual):
```
apps/studio/src/config/puck.config.tsx
```

**Tokens de Design**:
```
packages/tokens/src/tokens.json
```

**Documentação DropZone** (Contexto #59):
```
docs/puck-zones-implementation.md
```

---

## 📊 TIMELINE

| Hora | O Quê | Status |
|------|-------|--------|
| **Agora** | Sincronizar + validar | 🟢 |
| **+30min** | Completar #56 | 🔄 |
| **+1h** | Completar #57 | 🔄 |
| **+1.5h** | Completar #60 | 🔄 |
| **+2h** | Completar #61 | 🔄 |
| **+5h total** | Todos 4 com PRs abertas/mergeadas | ✅ |

---

## ✅ CHECKLIST FINAL

Antes de terminar:

- [ ] Todos os 4 issues têm PRs abertas ou mergeadas
- [ ] Build passes em todos
- [ ] Lint passes em todos
- [ ] Type-check = 0 errors em todos
- [ ] Componentes/jornadas visíveis no Storybook/Studio
- [ ] docs/SPRINT3_EXECUTION_MASTER.md foi atualizado
- [ ] Próximo agente foi notificado para começar #53

---

## 🆘 SE ALGO DER ERRADO

1. **Build falha?**
   ```bash
   pnpm clean
   pnpm install
   pnpm build
   ```

2. **Type errors?**
   ```bash
   pnpm -r type-check
   # Leia os erros, corrija, commit
   ```

3. **Lint warnings?**
   ```bash
   pnpm lint --fix
   ```

4. **PR conflicts?**
   ```bash
   git pull origin main
   # Resolve conflicts
   git add -A && git commit -m "feat: Resolve merge conflicts"
   ```

---

## 🎯 VOCÊ ESTÁ 80% DO CAMINHO!

- ✅ Arquitetura definida
- ✅ Design System pronto
- ✅ Blocker crítico (#59) resolvido
- ✅ Documentação criada
- 🟢 **Seus 4 issues estão prontos para começar**

**Tempo até Sprint 3 completar**: ~2-3 dias de desenvolvimento real

---

**Boa sorte! Você consegue! 🚀**
