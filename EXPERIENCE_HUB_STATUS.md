# Experience Hub Implementation – Current Status & Next Steps

**Data**: 2025-11-25  
**Session**: Phase 2 ✅ Completed, Phase 3 Ready  
**Context**: Feature 001-experience-hub-consolidation (branch active)

---

## TL;DR – O Que Foi Feito

✅ **Phase 2 Completo**: Storybook migrado para `apps/experience-hub/storybook`
- Workspace reconfigurado (agora 7 projetos, antes 8)
- Scripts funcionando: `pnpm dev:hub`, `pnpm build:hub`
- Testes passando: build ✅, lint ✅, type-check ✅, guardrails Shadcn ✅
- Documentação criada: `apps/experience-hub/README.md` (150+ linhas)

---

## Onde Encontrar O Quê

| Documento | Propósito | Ler Se… |
|-----------|-----------|---------|
| **[PHASE2_COMPLETION_REPORT.md](./PHASE2_COMPLETION_REPORT.md)** | Resumo executivo de Phase 2 | Quer entender o que foi feito |
| **[PHASE3_EXECUTION_PLAN.md](./PHASE3_EXECUTION_PLAN.md)** | Plano detalhado para Phase 3 | Quer começar Phase 3 (Sync Journeys) |
| **[specs/001-experience-hub-consolidation/tasks.md](./specs/001-experience-hub-consolidation/tasks.md)** | Backlog de tarefas (T001–T404) | Quer ver o progresso de cada task |
| **[specs/001-experience-hub-consolidation/spec.md](./specs/001-experience-hub-consolidation/spec.md)** | Especificação técnica do feature | Quer entender requisitos funcionais |
| **[apps/experience-hub/README.md](./apps/experience-hub/README.md)** | Guia da hub (uso e integração) | Quer usar a hub ou debugar problemas |
| **[.github/copilot-instructions.md](./.github/copilot-instructions.md)** | Playbook para agentes IA | Quer contexto para próximas sessões |

---

## Status das Fases

### Phase 1: Setup ✅ CONCLUÍDO
- [x] T001 – Scripts + build order atualizado
- [x] T002 – README criado
- [x] T003 – Baseline capturado

### Phase 2: Hub Unique (US1) ✅ CONCLUÍDO
- [x] T101 – Storybook migrado
- [x] T102 – Config validada
- [x] T103 – Scripts atualizados
- [x] T104 – Storybook legado removido
- [x] T105 – Testes validados

### Phase 3: Journeys Traceable (US2) 🟡 PRONTO PARA INICIAR
- [ ] T201 – Atualizar índices (domains/README, INDEX, PROGRESS_DASHBOARD)
- [ ] T202 – Revisar jornadas por domínio (BackOffice, FrontOffice, Game)
- [ ] T203 – Validar Studio (puck.config, pages)
- [ ] T204 – Confirmar guardrails Shadcn

**Estimativa**: 45–60 minutos

### Phase 4: Dashboard Ready (US3) ⏳ BLOQUEADO (depende de Phase 3)
- [ ] T301 – Cleanup Dashboard
- [ ] T302 – Reinstalar Shadcn
- [ ] T303 – Validar estilos
- [ ] T304 – Docs finais

### Phase 5: QA & Merge ⏳ BLOQUEADO (depende de Phase 4)
- [ ] T401–T404 – Documentação + SpecKit + Merge

---

## Quick Start – Próxima Sessão

Se você quer **continuar daqui**:

### Opção A: Executar Phase 3 (Sync Journeys)

1. Abra [PHASE3_EXECUTION_PLAN.md](./PHASE3_EXECUTION_PLAN.md)
2. Siga o checklist T201–T204
3. Tempo: ~45 min
4. Comando útil:
   ```bash
   grep -r "apps/storybook" domains/ || echo "✅ Clean"
   pnpm check:shadcn
   pnpm build 2>&1 | tail -20
   ```

### Opção B: Validar Phase 2

Se não confia nos resultados:

```bash
# Refazer testes
pnpm install --frozen-lockfile
pnpm build 2>&1 | tee phase2-retest-build.log
pnpm lint 2>&1 | tee phase2-retest-lint.log
pnpm -r type-check 2>&1 | tee phase2-retest-typecheck.log
pnpm check:shadcn 2>&1 | tee phase2-retest-shadcn.log

# Testar dev
pnpm dev:hub &  # Background em 6006
pnpm dev:studio &  # Background em 3000
# Validar visualmente
# Ctrl+C para parar
```

### Opção C: Fazer Commit e PR

Se tudo passou (✅ todos os testes acima):

```bash
git add .
git commit -m "feat(hub): consolidate storybook into experience-hub

- Move apps/storybook → apps/experience-hub/storybook
- Update workspace config and scripts
- Remove legacy directory
- Validate build, lint, type-check, guardrails

Phase 2/5 ✅ (US1: Hub unique)
Tested: pnpm build, lint, type-check, check:shadcn"

git push origin 001-experience-hub-consolidation
```

Depois abra PR com descrição incluindo:
```markdown
## Phase 2 Completion ✅

Consolidated Storybook into Experience Hub.

### Validations
- ✅ Build (19s total)
- ✅ Lint (1 warning)
- ✅ Type-check (no regression)
- ✅ Shadcn guardrails
- ✅ Dashboard unaffected

### Next: Phase 3 – Sync Journeys (45 min)
See [PHASE3_EXECUTION_PLAN.md](./PHASE3_EXECUTION_PLAN.md)
```

---

## Workspace Structure (Atual)

```
7 projetos no workspace:

Packages:
  ✅ @prototipo/tokens
  ✅ @prototipo/design-system
  ✅ @prototipo/eslint-config

Apps:
  ✅ studio
  ✅ storybook (em apps/experience-hub/storybook/)
  ✅ experience-hub (meta-workspace)
  ✅ (pendente: dashboard como sub-workspace?)

Build Order (forçado):
  tokens → design-system → hub/storybook → studio
```

---

## Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev:studio        # Studio (Next.js) em :3000
pnpm dev:hub           # Storybook em :6006
pnpm dev:storybook     # Alias para dev:hub

# Build
pnpm build             # Build completo (order: tokens → design-system → hub → studio)
pnpm build:tokens      # Build only tokens
pnpm build:design-system
pnpm build:hub         # Storybook build
pnpm build:studio

# Qualidade
pnpm lint              # ESLint em todos os workspaces
pnpm -r type-check     # TypeScript type-check
pnpm check:shadcn      # Validar que Shadcn está restrito

# Formatação
pnpm format            # Prettier
pnpm -r clean          # Remove dist, node_modules, .next, etc.
```

---

## Guardrails & Restrições (Importante!)

### Shadcn UI – Whitelist Restrita

✅ **PERMITIDO APENAS EM:**
- `apps/studio/src/app/studio/**` (Puck visual page builder)
- `apps/studio/src/app/dashboard/**` (Dashboard componentes)

❌ **PROIBIDO EM:**
- `domains/**` (use `@prototipo/design-system`)
- `apps/experience-hub/**` (use `@prototipo/design-system`)
- `apps/studio/src/app/[[...slug]]/**` (use design-system)

**Validar com:**
```bash
pnpm check:shadcn
```

### Design System – Single Source of Truth

- Todos os componentes em `packages/design-system/src/components/**`
- Exportados via `packages/design-system/src/index.ts`
- Consumidos por: Studio (pages), Experience Hub, Domains
- CSS Modules apenas (sem Tailwind globals)

---

## Logs de Referência

Arquivos criados durante Phase 2:

```
phase2-install.log            # pnpm install (7 workspaces reconhecidos)
phase2-build-hub-new.log      # pnpm build:hub
phase2-full-build.log         # pnpm build completo
phase2-lint.log               # pnpm lint
phase2-typecheck.log          # pnpm -r type-check
```

Usar como linha de base para comparação pós-Phase 3.

---

## Troubleshooting

### "Module not found: storybook"
```bash
pnpm install --no-frozen-lockfile
pnpm install --frozen-lockfile
```

### "Build falha em hub step"
```bash
pnpm build:tokens
pnpm build:design-system
pnpm build:hub  # Debugar isolado
```

### "Storybook não inicia"
```bash
rm -rf apps/experience-hub/storybook/node_modules/.vite
pnpm dev:hub
```

### "Type error após pull"
```bash
pnpm -r type-check --force
# Se ainda falhar:
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## Próximas Decisões

- [ ] **Phase 3**: Continuar com sync de jornadas?
- [ ] **Phase 4 (futuro)**: Reinstalar Shadcn de forma controlada?
- [ ] **Phase 5 (futuro)**: Fazer merge para main?

---

## Contato / Escalação

Se houver bloqueadores:

1. Verificar [PHASE3_EXECUTION_PLAN.md](./PHASE3_EXECUTION_PLAN.md) – Troubleshooting
2. Rodar `pnpm build 2>&1 | head -50` para ver erro inicial
3. Consultar [.github/copilot-instructions.md](./.github/copilot-instructions.md) para contexto

---

**Última Atualização**: 2025-11-25 (Phase 2 ✅)  
**Próxima Revisão**: Após Phase 3 completa  
**Responsável**: Agent (GitHub Copilot)  
**Confiança**: 95%
