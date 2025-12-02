# 🧭 EXPERIENCE HUB – QUICK NAVIGATION INDEX

**Atualizado**: 2025-11-25 | **Status**: Phase 2 ✅ | **Próxima**: Phase 3 🟡

---

## 📖 Leia Primeiro

**Se você tem 5 minutos:**
→ [PHASE2_SUMMARY.md](./PHASE2_SUMMARY.md) – Resumo executivo com status e próximos passos

**Se você tem 10 minutos:**
→ [EXPERIENCE_HUB_STATUS.md](./EXPERIENCE_HUB_STATUS.md) – Overview completo com troubleshooting

**Se você quer começar Phase 3 agora:**
→ [PHASE3_EXECUTION_PLAN.md](./PHASE3_EXECUTION_PLAN.md) – Plano detalhado (45–60 min)

---

## 📚 Documentação por Tópico

### Experience Hub (Novo)

| Documento | O Que É | Ler Quando |
|-----------|---------|-----------|
| [`apps/experience-hub/README.md`](./apps/experience-hub/README.md) | Guia da Hub (uso, integração) | Quer usar a Hub |
| [`PHASE2_COMPLETION_REPORT.md`](./PHASE2_COMPLETION_REPORT.md) | Relatório de Phase 2 (T101–T105) | Quer entender o que foi feito |
| [`PHASE2_SUMMARY.md`](./PHASE2_SUMMARY.md) | Summary executivo (1 página) | Quer TL;DR |
| [`EXPERIENCE_HUB_STATUS.md`](./EXPERIENCE_HUB_STATUS.md) | Status + próximos passos + troubleshooting | Quer contexto completo |

### Phase 3 – Sync Journeys (Próxima)

| Documento | O Que É | Ler Quando |
|-----------|---------|-----------|
| [`PHASE3_EXECUTION_PLAN.md`](./PHASE3_EXECUTION_PLAN.md) | Plano T201–T204 | Pronto para começar Phase 3 |

### Especificação & Backlog

| Documento | O Que É | Ler Quando |
|-----------|---------|-----------|
| [`specs/001-experience-hub-consolidation/spec.md`](./specs/001-experience-hub-consolidation/spec.md) | Requisitos funcionais (US1–US3) | Quer entender escopo completo |
| [`specs/001-experience-hub-consolidation/plan.md`](./specs/001-experience-hub-consolidation/plan.md) | Plano técnico (contexto + Constitution checks) | Quer validar arquitetura |
| [`specs/001-experience-hub-consolidation/tasks.md`](./specs/001-experience-hub-consolidation/tasks.md) | Backlog T001–T404 (todas as fases) | Quer ver progresso detalhado |

### Instruções para Agentes IA

| Documento | O Que É | Ler Quando |
|-----------|---------|-----------|
| [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) | Playbook para agentes | Próxima sessão IA |

### Referência Principal

| Documento | O Que É | Ler Quando |
|-----------|---------|-----------|
| [`README.md`](./README.md) | README raiz (atualizado com hub info) | Overview geral do projeto |

---

## 🎯 Atalhos por Cenário

### Cenário 1: "Quero entender o que foi feito"
1. Leia [PHASE2_SUMMARY.md](./PHASE2_SUMMARY.md) (5 min)
2. Consulte [PHASE2_COMPLETION_REPORT.md](./PHASE2_COMPLETION_REPORT.md) (10 min)

### Cenário 2: "Quero começar Phase 3 agora"
1. Abra [PHASE3_EXECUTION_PLAN.md](./PHASE3_EXECUTION_PLAN.md)
2. Siga T201–T204
3. Execute `pnpm build && pnpm check:shadcn`

### Cenário 3: "Algo quebrou, preciso debugar"
1. Leia [EXPERIENCE_HUB_STATUS.md](./EXPERIENCE_HUB_STATUS.md) – Troubleshooting (seção no final)
2. Rode:
   ```bash
   pnpm build 2>&1 | head -50
   pnpm check:shadcn
   ```
3. Se persistir, consulte [apps/experience-hub/README.md](./apps/experience-hub/README.md) – Troubleshooting

### Cenário 4: "Preciso validar que tudo está ok"
```bash
pnpm build
pnpm lint
pnpm -r type-check
pnpm check:shadcn
pnpm dev:hub &
pnpm dev:studio &
# Validar visualmente
# Ctrl+C para parar
```

### Cenário 5: "Quero fazer commit e PR"
1. Valide (Cenário 4)
2. Execute:
   ```bash
   git add .
   git commit -m "feat(hub): consolidate storybook into experience-hub

- Move apps/storybook → apps/experience-hub/storybook
- Update workspace config and scripts
- Remove legacy directory
- Validate build, lint, type-check, guardrails

Phase 2/5 ✅ (US1: Hub unique)"
   ```
3. Abra PR com descrição incluindo PHASE2_SUMMARY.md

---

## 📊 Status de Fases

```
Phase 1: Setup ✅ COMPLETO
  - T001 Scripts atualizado
  - T002 README criado
  - T003 Baseline capturado

Phase 2: Hub Unique (US1) ✅ COMPLETO
  - T101 Storybook migrado
  - T102 Config validada
  - T103 Scripts funcionando
  - T104 Legacy removido
  - T105 Testes validados

Phase 3: Journeys Traceable (US2) 🟡 PRONTO
  - T201 Índices (domains/README, INDEX, PROGRESS_DASHBOARD)
  - T202 Jornadas por domínio
  - T203 Validar Studio
  - T204 Guardrails Shadcn

Phase 4: Dashboard Ready (US3) ⏳ BLOQUEADO
  - T301 Cleanup Dashboard
  - T302 Shadcn reinstall
  - T303 Validar estilos
  - T304 Docs finais

Phase 5: QA & Merge ⏳ BLOQUEADO
  - T401 Docs finais
  - T402 Testes finais
  - T403 SpecKit validation
  - T404 Merge
```

---

## 🔗 Links Rápidos

### Arquivos Importantes
- [`package.json`](./package.json) – Scripts e workspaces
- [`pnpm-workspace.yaml`](./pnpm-workspace.yaml) – Workspace config
- [`apps/experience-hub/`](./apps/experience-hub/) – Nova Hub
- [`domains/`](./domains/) – Jornadas (para sync em Phase 3)

### Comandos Essenciais
```bash
pnpm dev:hub          # Storybook :6006
pnpm dev:studio       # Studio :3000
pnpm build            # Build completo
pnpm lint             # ESLint
pnpm -r type-check    # TypeScript
pnpm check:shadcn     # Guardrails
```

---

## ✅ Checklist de Validação

Antes de fazer commit/PR, rodar:

```bash
# 1. Build completo
pnpm build

# 2. Lint
pnpm lint

# 3. Type-check
pnpm -r type-check

# 4. Guardrails
pnpm check:shadcn

# Esperado: todos passam ✅
```

---

## 🚀 Próxima Sessão

**Se continuando agora**:
1. Abra [PHASE3_EXECUTION_PLAN.md](./PHASE3_EXECUTION_PLAN.md)
2. Execute T201–T204 (45–60 min)
3. Teste e valide

**Se iniciando nova sessão**:
1. Leia este arquivo (você está lendo!)
2. Leia [PHASE2_SUMMARY.md](./PHASE2_SUMMARY.md)
3. Decida: Phase 3 ou debugging?

---

**Índice Criado**: 2025-11-25  
**Atualizado**: Sempre que Phase muda  
**Próxima Revisão**: Após Phase 3 completa
