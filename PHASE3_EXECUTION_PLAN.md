# Phase 3 Execution Plan – Sync Journeys & Documentation

**Status**: Pronto para iniciar  
**Pré-requisitos**: Phase 2 ✅ completa (storybook migrado)  
**Duração estimada**: 45–60 minutos  
**Complexidade**: Média (revisão e atualização de documentação)

---

## Overview

Phase 3 garante que todas as jornadas em `domains/*/journeys/*/` estão documentadas corretamente com links atualizados para o novo Experience Hub e validação de que o Studio não mais depende do Storybook antigo.

---

## User Story 2: Journeys Rastreáveis no Studio

**Objetivo**: Garantir que cada jornada (US2) sabe como encontrar o Hub e que Studio mantém sua autonomia.

**Critérios de Aceitação**:
- ✅ Todos os `domains/*/journeys/*/README.md` listam a URL do Experience Hub
- ✅ Todos os `domains/*/journeys/*/links.md` atualizados com novos endpoints
- ✅ `puck.config.tsx` e `[[...slug]]/page.tsx` não dependem do Storybook antigo
- ✅ `pnpm check:shadcn` continua passando

---

## T201: Atualizar Índices Principais

### Descrição

Atualizar documentação global que aponta para jornadas e hub.

### Arquivos-Alvo

1. **`domains/README.md`**
   - [ ] Adicionar seção "Experience Hub Integration" explicando como jornadas se conectam ao hub
   - [ ] Verificar se há links hardcoded para `apps/storybook` e atualizar para `experience-hub`
   - [ ] Exemplo de alteração:
     ```markdown
     ## Experience Hub
     
     Visualizar componentes e padrões de design: [Experience Hub](https://experience-hub.vercel.app/)
     
     Cada jornada documentada inclui links para componentes relacionados no hub.
     ```

2. **`domains/INDEX.md`**
   - [ ] Adicionar coluna/link "Hub Reference" para cada jornada
   - [ ] Garantir que o índice está em sync com estrutura atual

3. **`PROGRESS_DASHBOARD.md`**
   - [ ] Atualizar seção "Experience Hub Status" com novo layout (`apps/experience-hub/storybook`)
   - [ ] Registrar que Storybook agora está em `apps/experience-hub/storybook/storybook-static`

### Validação

```bash
# Checar se há referências legadas
grep -r "apps/storybook" domains/ || echo "✅ Nenhuma referência legacy"
grep -r "experience-hub" domains/ | wc -l
# Esperar: >5 referências
```

---

## T202: Revisar Jornadas por Domínio

### Descrição

Validar e atualizar cada jornada para apontar para o novo hub e usar slugs corretos no Studio.

### Estrutura de Jornada

Cada jornada tem:
- `README.md` – Objetivo, componentes, links (DEVE referenciar hub)
- `links.md` – URLs diretas para componentes e recursos
- `notas.md` – Notas internas de implementação
- `components/` – Opcional, se houver

### BackOffice Domain

#### Jornada: Dashboard (`domains/BackOffice/journeys/Dashboard/`)

- [ ] **README.md**
  - Verificar seção "Componentes"
  - Adicionar link: `- [Storybook: Health Metrics Widgets](https://experience-hub.vercel.app/?path=/docs/storybook-components-health-metrics-widgets--docs)`
  - Verificar slug no Studio: `/dashboard` (manter)

- [ ] **links.md**
  - [ ] Atualizar URL da wiki interna, se houver
  - [ ] Adicionar link do Experience Hub
  - [ ] Exemplo:
    ```markdown
    - [Experience Hub - Dashboard Components](https://experience-hub.vercel.app/?search=dashboard)
    - [Studio Dashboard](http://localhost:3000/dashboard)
    ```

- [ ] **notas.md**
  - [ ] Confirmar que não menciona Storybook legado
  - [ ] Se houver refs a paths, atualizar para novo layout

#### Jornada: Revisão de Questões (`domains/BackOffice/journeys/revisao-questoes/`)

- [ ] Mesmas verificações acima
- [ ] Confirmar componentes relacionados (ex: Card, Button)

### FrontOffice Domain

#### Jornada: Onboarding (`domains/FrontOffice/journeys/onboarding/`)

- [ ] **README.md**
  - Verificar componentes (Button, Text, Input, etc.)
  - Adicionar link Hub para cada componente chave
  - Exemplo: `- [Storybook: Input Component](https://experience-hub.vercel.app/?path=/docs/components-input--docs)`

- [ ] **links.md**
  - [ ] Atualizar referências de componentes
  - [ ] Confirmar URLs de preview (se houver)

### Game Domain

#### Jornada: Game Hub (`domains/Game/journeys/game-hub/`)

- [ ] **README.md**
  - Verificar componentes (GameCard, Leaderboard, Progress, etc.)
  - Adicionar links Hub para cada

- [ ] **links.md**
  - [ ] Adicionar referências ao Experience Hub

### Checklist de Validação por Jornada

Para **cada jornada**, validar:

- [ ] README.md inclui link "Experience Hub" ou "Storybook"
- [ ] links.md não tem URLs hardcoded para `apps/storybook` ou `localhost:6006`
- [ ] notas.md sem referências a paths legados (`apps/storybook/**`)
- [ ] Componentes mencionados existem em `@prototipo/design-system`
- [ ] Studio slug correto (ex: `/dashboard` mapeado para jornada certa)

---

## T203: Validar Studio (Puck & Pages)

### Descrição

Garantir que Studio não mais depende do Storybook antigo e está usando design-system corretamente.

### Arquivos-Alvo

1. **`apps/studio/src/config/puck.config.tsx`**
   - [ ] Procurar por imports que referenciem `apps/storybook` ou `../../../apps/storybook`
   - [ ] Esperado: NÃO deve haver nenhum import do Storybook; apenas do design-system
   - [ ] Comando:
     ```bash
     grep -n "storybook\|Storybook" apps/studio/src/config/puck.config.tsx || echo "✅ Clean"
     ```

2. **`apps/studio/src/app/[[...slug]]/page.tsx`**
   - [ ] Mesma validação
   - [ ] Este arquivo rota para jornadas; deve consumir apenas de `domains/`

3. **`apps/studio/src/app/dashboard/`** (Componentes do dashboard)
   - [ ] Procurar por imports de Storybook
   - [ ] Procurar por imports diretos de `@shadcn/ui` (ERRO: só permitido em dashboard!)
   - [ ] Comando:
     ```bash
     find apps/studio/src/app/dashboard -name "*.tsx" -o -name "*.ts" | xargs grep -l "@shadcn/ui" | head -5
     # Esperado: Pode ter alguns (dashboard é permitido); mas NÃO deve ter "storybook"
     ```

### Validação de Build

```bash
# Testar que Studio build ainda funciona
pnpm build:studio 2>&1 | tail -20
# Esperado: "Compiled successfully"
```

---

## T204: Confirmar Guardrails Shadcn

### Descrição

Rodar validação de guardrails para garantir que Shadcn está restrito a `apps/studio/src/app/{studio,dashboard}/`.

### Comando Principal

```bash
pnpm check:shadcn
```

**Esperado Output**:
```
✅ Nenhum uso indevido de shadcn encontrado.
```

### Verificação Manual (Alternativa)

Se `check:shadcn` falhar, debugar manualmente:

```bash
# Buscar todos os imports de @shadcn/ui
grep -r "@shadcn/ui" apps/studio/src/app --include="*.tsx" --include="*.ts"

# Esperado: Apenas em
# - apps/studio/src/app/studio/...
# - apps/studio/src/app/dashboard/...

# Não esperado em:
# - apps/studio/src/app/journeys/... (não existe mais)
# - domains/...
# - apps/experience-hub/...
```

### Capturas de Evidência

- [ ] Screenshot ou log de `pnpm check:shadcn` ✅
- [ ] Salvar em `PHASE3_VALIDATION_SHADCN.log`

---

## Checklist de Execução (T201–T204)

### T201: Índices
- [ ] `domains/README.md` atualizado com hub reference
- [ ] `domains/INDEX.md` sincronizado
- [ ] `PROGRESS_DASHBOARD.md` com novo layout

### T202: Jornadas por Domínio
- [ ] BackOffice/Dashboard – README, links, notas validados
- [ ] BackOffice/revisao-questoes – Idem
- [ ] FrontOffice/onboarding – Idem
- [ ] Game/game-hub – Idem
- [ ] Nenhuma referência a `apps/storybook` em nenhuma jornada

### T203: Studio
- [ ] `puck.config.tsx` – Sem imports de Storybook
- [ ] `[[...slug]]/page.tsx` – Sem imports de Storybook
- [ ] `dashboard/` – Possível ter Shadcn (permitido); confirmar build
- [ ] `pnpm build:studio` passa

### T204: Guardrails
- [ ] `pnpm check:shadcn` retorna ✅
- [ ] Log capturado em PHASE3_VALIDATION_SHADCN.log
- [ ] Nenhuma referência indevida de Shadcn encontrada

---

## Notas & Troubleshooting

### Se encontrar referência a `apps/storybook`

1. Identificar arquivo: `grep -r "apps/storybook" . --include="*.md" --include="*.tsx" --include="*.ts"`
2. Editar arquivo e substituir por:
   - Se for URL: `https://experience-hub.vercel.app/`
   - Se for import path: `@prototipo/design-system`
3. Revalidar com `grep`

### Se `pnpm check:shadcn` falhar

1. Rodar `pnpm build 2>&1 | grep -i "shadcn"`
2. Verificar manualmente imports que estão viajando
3. Editar arquivo para usar design-system no lugar

### Se Hub links estão hardcoded

- Centralizar em um arquivo de constantes, se possível
- Ou documentar no README que links devem ser atualizados quando hub URL muda

---

## Tempo Estimado por Tarefa

| Tarefa | Tempo Estimado | Paralel? |
|--------|----------------|----------|
| T201 (Índices) | 10–15 min | Não (precisa ser sequencial com T202) |
| T202 (Jornadas) | 20–30 min | Sim (revisar domínios em paralelo) |
| T203 (Studio) | 10–15 min | Sim (após T202) |
| T204 (Guardrails) | 5 min | Não (validação final) |
| **Total** | **45–60 min** | — |

---

## Próxima Fase (Phase 4)

Após Phase 3 completa (T201–T204 ✅):

1. Iniciar **Phase 4**: Limpeza de Dashboard + Reinstalação de Shadcn
2. Tarefas: T301–T304
3. Objetivo: Garantir que `/dashboard` está com Shadcn controlado e sem regressões CSS

---

## Como Começar

1. Criar novo prompt ou executar manualmente
2. Rodar `pnpm -r type-check` como pré-check
3. Iniciar com **T201** (Índices)
4. Documentar progresso em `PHASE3_PROGRESS.md` (novo arquivo, opcional)
5. Ao concluir, atualizar `specs/001-experience-hub-consolidation/tasks.md` com ✅

---

**Criado**: 2025-11-25  
**Vinculado a**: `spec.md`, `plan.md`, `tasks.md` em `specs/001-experience-hub-consolidation/`  
**Próximo**: `PHASE4_EXECUTION_PLAN.md` (após Phase 3 ✅)
