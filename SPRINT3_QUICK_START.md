# 🚀 SPRINT 3 – QUICK START EXECUTION GUIDE

## ⚠️ BLOCKER CRÍTICO: #59 (Puck Refactor)

Executar PRIMEIRO antes de #53-#55:

\\\ash
# 1. Restaurar suporte a DropZone no Puck
#    Arquivo: apps/studio/src/config/puck.config.tsx
#    Adicionar: import { DropZone } from '@measured/puck'
#    Atualizar: zones suporte na definição de componentes

# 2. Atualizar tipagem de JSON de páginas
#    Arquivo: apps/studio/data/pages/*.json
#    Formato: { props: {...}, zones: {...} }

# 3. Validar compilação
pnpm build
pnpm -r type-check

# 4. Testar no Studio
pnpm dev:studio
# Verificar se /studio carrega sem erro e componentes renderizam
\\\

## ⚡ PARALELO: Começar enquanto #59 roda

### #56: BackOffice Jornada (5 horas)
- Criar 3 telas: Login, Dashboard, Perfil
- Componentes: Button, Input, Card
- Documentar em domains/BackOffice/journeys/

### #57: FrontOffice Onboarding (4 horas)
- Criar 5 telas: Boas-vindas, Personagem, Primeira Missão, Leaderboard, Parabéns
- Componentes: Button, Text, Card, Progress
- Documentar em domains/FrontOffice/journeys/

### #60: Progress Component (2 horas)
- Criar novo componente em packages/design-system/src/components/Progress/
- Story em apps/storybook/src/stories/Progress.stories.tsx
- Registrar em puckConfig quando #59 pronto

### #61: Leaderboard Component (2.5 horas)
- Criar novo componente em packages/design-system/src/components/Leaderboard/
- Story em apps/storybook/src/stories/Leaderboard.stories.tsx
- Depende de #60 para testes integrados

## 📋 SEQUENCIAL: Após #59 Concluir

### #53 → #54 → #55 (Dashboard)

\\\ash
# #53: Dashboard API (2 horas)
# Arquivo: apps/studio/src/app/api/pages/route.ts
# Implementar: GET /api/pages
# Retorna: Array de páginas salvas no localStorage

# #54: Dashboard UI (3 horas)
# Arquivo: apps/studio/src/app/page.tsx
# Renderizar: Lista de páginas criadas
# Componentes: Card para cada página com ações

# #55: Health Indicators (4 horas)
# Arquivo: apps/studio/src/app/page.tsx (adicionar seção)
# Exibir: Métricas de saúde do repo (issues, PRs, commits)
# Componentes: Badge, Text para estatísticas
\\\

## 🎮 FINALISTA: Game Hub

### #58 (3 horas)
- Integrar componentes #60 (Progress) + #61 (Leaderboard)
- Criar jornada em domains/Game/journeys/
- Registrar página em Studio

---

## 📊 TIMELINE ESTIMADO

**Dia 1**: Iniciar #59 + #56-57-60-61 (paralelo)
**Dia 2**: #59 em progresso, paralelos avançam
**Dia 3**: #59 completa, iniciar #53 (API)
**Dia 4**: #54 (Dashboard UI)
**Dia 5**: #55 (Health Metrics)
**Dia 6**: #58 (Game Hub)
**Dia 7**: Testes, docs, wrap-up

---

## ✅ VALIDATION BEFORE MERGE

\\\ash
pnpm build              # Sem erros
pnpm lint               # Warnings aceitáveis
pnpm -r type-check      # 0 erros TypeScript
pnpm dev:studio         # Funcional no localhost:3000
pnpm dev:storybook      # Funcional no localhost:6006
git status              # Tree limpo
\\\

---

**Status**: ✅ PRONTO PARA INICIAR
**Próximo**: Abrir PR para #59
