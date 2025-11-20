# 🎯 Sprint 3 Planning - Implementações Avançadas

**Versão:** 0.3.0 (planejamento)  
**Status:** 📋 Em Planejamento  
**Dependências:** Sprint 2 100% completo ✅  
**Data Início:** Após deploy v0.2-beta  
**Duração Estimada:** 2-3 semanas

---

## 📊 Overview

Sprint 3 foca em **implementações avançadas** que elevam o ambiente de prototipação a um estado mais robusto e completo, preparando o caminho para v1.0.

### Contexto Atual

```
Sprint 1 (P0):  ████████████████████  5/5   (100%) ✅
Sprint 2 (P1):  ████████████████████  11/11 (100%) ✅
Sprint 3 (P2):  ░░░░░░░░░░░░░░░░░░░░  0/4   (0%)   📋
─────────────────────────────────────────────────
TOTAL:          ███████████████░░░░░  16/20 (80%)
```

### Sprint 3 Objetivos

1. **Dashboard UI Completa**: Implementar interface visual do dashboard
2. **Indicadores de Saúde**: Monitoramento de builds, testes e métricas
3. **Links Storybook**: Integração direta com catálogo de componentes
4. **Theming Avançado**: Sistema de temas com tokens semânticos

---

## 🎫 Issues do Sprint 3 (P2)

### Issue #H3 - Dashboard UI Implementation

**Epic:** H - Dashboard do Projeto  
**Prioridade:** P2  
**Estimativa:** 8-10 horas  
**Labels:** `priority:P2`, `type:feature`, `epic:dashboard`, `ui`

#### Descrição

Implementar a interface visual completa do Dashboard do Projeto, permitindo navegação intuitiva por todas as páginas prototipadas, com filtros e visualizações por domínio/jornada.

#### Contexto Técnico

**Dependências Completas:**
- ✅ H1 - Dashboard planning e wireframe
- ✅ H2 - Endpoint `/api/dashboard/pages`
- ✅ C2 - Studio sidebar (referência de UX)

**Stack:**
- Next.js 15 App Router (nova rota `/dashboard`)
- React Server Components para dados
- Design System components (Card, Button, Text, Layout)
- CSS Modules para estilização

#### Critérios de Aceitação

**Funcional:**
- [ ] Página `/dashboard` renderiza lista de todas as páginas
- [ ] Cards de página mostram: thumbnail preview, título, domínio, última modificação
- [ ] Filtro por domínio (BackOffice, FrontOffice, Game, All)
- [ ] Busca por título ou palavras-chave
- [ ] Click em card abre página correspondente no Studio
- [ ] Contadores de páginas por domínio
- [ ] Layout responsivo (mobile, tablet, desktop)

**Não-funcional:**
- [ ] Performance: Carrega < 2s com até 100 páginas
- [ ] Acessibilidade: WCAG 2.1 Level AA
- [ ] Keyboard navigation completa
- [ ] Estados de loading e erro tratados

#### Wireframe de Referência

```
┌─────────────────────────────────────────────┐
│ 📊 EDUCACROSS Dashboard          [Search 🔍] │
├─────────────────────────────────────────────┤
│                                              │
│ Filtros: [All] [BackOffice] [FrontOffice]   │
│          [Game]                              │
│                                              │
│ 🏢 BackOffice (5 páginas)                   │
│ ┌────────┐ ┌────────┐ ┌────────┐           │
│ │Preview │ │Preview │ │Preview │           │
│ │Title   │ │Title   │ │Title   │           │
│ │Domain  │ │Domain  │ │Domain  │           │
│ │Modified│ │Modified│ │Modified│           │
│ └────────┘ └────────┘ └────────┘           │
│                                              │
│ 🎮 Game (3 páginas)                         │
│ ┌────────┐ ┌────────┐                      │
│ │...     │ │...     │                      │
│ └────────┘ └────────┘                      │
└─────────────────────────────────────────────┘
```

#### Implementação Sugerida

**Estrutura de arquivos:**
```
apps/studio/src/app/dashboard/
├── page.tsx              # Main dashboard page
├── layout.tsx            # Dashboard layout
├── components/
│   ├── PageCard.tsx      # Individual page card
│   ├── DomainFilter.tsx  # Filter buttons
│   ├── SearchBar.tsx     # Search input
│   └── PageGrid.tsx      # Grid container
└── styles/
    └── dashboard.module.css
```

**API consumption:**
```typescript
// apps/studio/src/app/dashboard/page.tsx
export default async function DashboardPage() {
  const data = await fetch('/api/dashboard/pages').then(r => r.json());
  
  return (
    <DashboardLayout>
      <SearchBar />
      <DomainFilter domains={Object.keys(data.domains)} />
      <PageGrid pages={data.pages} />
    </DashboardLayout>
  );
}
```

#### DoD (Definition of Done)

- [ ] Código implementado e testado
- [ ] Build passa sem erros
- [ ] Lint passa sem warnings críticos
- [ ] Acessibilidade validada (addon A11y)
- [ ] Story criada no Storybook (PageCard component)
- [ ] README atualizado com screenshots
- [ ] PR aberto e aprovado

---

### Issue #H4 - Indicadores de Saúde do Repositório

**Epic:** H - Dashboard do Projeto  
**Prioridade:** P2  
**Estimativa:** 6-8 horas  
**Labels:** `priority:P2`, `type:feature`, `epic:dashboard`, `monitoring`

#### Descrição

Expor indicadores de saúde do repositório no Dashboard: status de build, última build timestamp, lint status, tamanho de bundles, dependências desatualizadas.

#### Contexto Técnico

**Dependências:**
- ✅ H2 - Dashboard endpoint
- ⚠️ F3 - CI/CD (parcialmente - criado neste PR)

**Dados a coletar:**
- Build status (tokens, design-system, studio, storybook)
- Último commit e timestamp
- Tamanho dos bundles (.next/, storybook-static/)
- Coverage de testes (quando disponível)
- Dependências outdated (via `pnpm outdated`)

#### Critérios de Aceitação

**Indicadores Mínimos:**
- [ ] Status de build de cada pacote (✅ OK, ⚠️ Warning, ❌ Error)
- [ ] Timestamp da última build bem-sucedida
- [ ] Tamanho dos bundles (Studio, Storybook)
- [ ] Número de dependências desatualizadas
- [ ] Link para GitHub Actions (se CI/CD ativo)

**Dashboard Integration:**
- [ ] Seção "Health Metrics" no topo do dashboard
- [ ] Indicadores visuais (badges coloridos)
- [ ] Hover tooltip com detalhes
- [ ] Auto-refresh a cada 5 minutos (ou manual)

**API Endpoint:**
```typescript
// GET /api/dashboard/health
{
  "builds": {
    "tokens": { "status": "success", "time": "2025-11-20T10:30:00Z" },
    "design-system": { "status": "success", "time": "..." },
    "studio": { "status": "success", "time": "..." },
    "storybook": { "status": "success", "time": "..." }
  },
  "bundles": {
    "studio": { "size": "1.2 MB", "compressed": "340 KB" },
    "storybook": { "size": "5.8 MB", "compressed": "1.8 MB" }
  },
  "dependencies": {
    "outdated": 3,
    "security": 0
  },
  "lastCommit": {
    "sha": "abc123",
    "message": "...",
    "timestamp": "..."
  }
}
```

#### Implementação Sugerida

**Script para coletar métricas:**
```bash
# scripts/collect-health-metrics.sh
#!/bin/bash

# Build status
pnpm build &> /tmp/build.log
BUILD_STATUS=$?

# Bundle sizes
STUDIO_SIZE=$(du -sh apps/studio/.next | cut -f1)
STORYBOOK_SIZE=$(du -sh apps/storybook/storybook-static | cut -f1)

# Outdated deps
OUTDATED=$(pnpm outdated --json | jq 'length')

# Last commit
COMMIT_SHA=$(git rev-parse --short HEAD)
COMMIT_TIME=$(git show -s --format=%ci HEAD)

# Output JSON
cat << EOF
{
  "buildStatus": $BUILD_STATUS,
  "bundles": {
    "studio": "$STUDIO_SIZE",
    "storybook": "$STORYBOOK_SIZE"
  },
  "outdated": $OUTDATED,
  "lastCommit": {
    "sha": "$COMMIT_SHA",
    "timestamp": "$COMMIT_TIME"
  }
}
EOF
```

**API Route:**
```typescript
// apps/studio/src/app/api/dashboard/health/route.ts
export async function GET() {
  const health = await collectHealthMetrics();
  return Response.json(health);
}
```

#### DoD

- [ ] API endpoint `/api/dashboard/health` implementado
- [ ] Script de coleta de métricas funcional
- [ ] UI renderiza indicadores no Dashboard
- [ ] Auto-refresh ou botão manual de refresh
- [ ] Documentação em README
- [ ] PR aprovado

---

### Issue #H5 - Link Direto para Storybook

**Epic:** H - Dashboard do Projeto  
**Prioridade:** P2  
**Estimativa:** 2-3 horas  
**Labels:** `priority:P2`, `type:feature`, `epic:dashboard`, `docs`

#### Descrição

Adicionar links diretos e badges para o Storybook estático (documentação final) no Dashboard e READMEs de domínio.

#### Contexto Técnico

**Dependências:**
- ✅ Storybook deployed (Vercel ou similar)
- ✅ H3 - Dashboard UI (para integração visual)

**URLs de referência:**
- Storybook Live: `https://educacross-storybook.vercel.app`
- Badge URL: `https://img.shields.io/badge/Storybook-Live-FF4785?logo=storybook`

#### Critérios de Aceitação

**Dashboard:**
- [ ] Botão/link "📚 View Storybook" no header do Dashboard
- [ ] Opens in new tab
- [ ] Badge visual indicando status (Live/Offline)

**READMEs:**
- [ ] Badge no README.md raiz
- [ ] Badge em cada `domains/{domain}/README.md`
- [ ] Link funcional para Storybook staging/production

**Badge Examples:**
```markdown
[![Storybook](https://img.shields.io/badge/Storybook-Live-FF4785?logo=storybook)](https://educacross-storybook.vercel.app)

[![Design System](https://img.shields.io/badge/Design%20System-v0.2-blueviolet)](https://educacross-storybook.vercel.app)
```

#### Implementação

**Dashboard Component:**
```tsx
// apps/studio/src/app/dashboard/components/StorybookLink.tsx
export function StorybookLink() {
  return (
    <a 
      href={process.env.NEXT_PUBLIC_STORYBOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.storybookLink}
    >
      📚 View Storybook
    </a>
  );
}
```

**Environment Variable:**
```env
# .env.local
NEXT_PUBLIC_STORYBOOK_URL=https://educacross-storybook.vercel.app
```

**READMEs to Update:**
- `/README.md`
- `/domains/README.md`
- `/domains/BackOffice/README.md`
- `/domains/FrontOffice/README.md`
- `/domains/Game/README.md`

#### DoD

- [ ] Link no Dashboard funcional
- [ ] Badges adicionados em todos READMEs
- [ ] Links testados e abrindo corretamente
- [ ] Environment variable documentada
- [ ] PR aprovado

---

### Issue #B6 - Theming com Tokens Semânticos

**Epic:** B - Design System  
**Prioridade:** P2  
**Estimativa:** 10-12 horas  
**Labels:** `priority:P2`, `type:feature`, `epic:design-system`, `theming`

#### Descrição

Implementar sistema de theming dinâmico consumindo tokens semânticos para permitir variação de tema global (ex: claro/escuro, alto contraste).

#### Contexto Técnico

**Dependências:**
- ⚠️ A1 - Tokens semânticos (precisa ser criado em paralelo)
- ✅ Tokens base já existentes
- ✅ Design System components

**Abordagem:**
1. **Criar tokens semânticos** (A1)
2. **Migrar componentes** para usar tokens semânticos
3. **Implementar theme provider**
4. **Adicionar theme toggle** no Studio/Storybook

#### Critérios de Aceitação

**Tokens Semânticos (A1):**
```json
// packages/tokens/src/tokens.json (adicionar)
{
  "semantic": {
    "color": {
      "background": {
        "primary": { "value": "{color.neutral.50}" },
        "secondary": { "value": "{color.neutral.100}" },
        "elevated": { "value": "{color.white}" }
      },
      "text": {
        "primary": { "value": "{color.neutral.900}" },
        "secondary": { "value": "{color.neutral.600}" },
        "inverted": { "value": "{color.white}" }
      },
      "border": {
        "default": { "value": "{color.neutral.300}" },
        "focus": { "value": "{color.primary.500}" }
      }
    }
  }
}
```

**CSS Variables Output:**
```css
/* Light theme (default) */
:root {
  --bg-primary: var(--color-neutral-50);
  --bg-secondary: var(--color-neutral-100);
  --text-primary: var(--color-neutral-900);
  --text-secondary: var(--color-neutral-600);
}

/* Dark theme */
[data-theme="dark"] {
  --bg-primary: var(--color-neutral-900);
  --bg-secondary: var(--color-neutral-800);
  --text-primary: var(--color-neutral-50);
  --text-secondary: var(--color-neutral-300);
}
```

**Theme Provider:**
```tsx
// packages/design-system/src/ThemeProvider.tsx
export function ThemeProvider({ children, theme = 'light' }) {
  return (
    <div data-theme={theme}>
      {children}
    </div>
  );
}
```

**Componente Migration:**
- [ ] Button usa `--bg-primary`, `--text-primary`
- [ ] Input usa `--bg-secondary`, `--border-default`
- [ ] Card usa `--bg-elevated`, `--border-default`
- [ ] Text usa `--text-primary`, `--text-secondary`

**Theme Toggle:**
```tsx
// apps/studio/src/components/ThemeToggle.tsx
export function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  
  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

#### Implementação Faseada

**Fase 1: Tokens Semânticos (A1) - 3h**
- Definir estrutura de tokens semânticos
- Adicionar ao `tokens.json`
- Build script para gerar CSS variables
- Testar import/export

**Fase 2: Theme Provider - 2h**
- Criar ThemeProvider component
- Adicionar ao Design System
- Story no Storybook
- Documentação

**Fase 3: Component Migration - 4h**
- Atualizar Button
- Atualizar Input, Select, Checkbox, Radio, Switch
- Atualizar Card, Text
- Testar todos no Storybook

**Fase 4: Theme Toggle UI - 2h**
- Adicionar toggle no Studio header
- Adicionar toggle no Storybook toolbar
- Persistir preferência em localStorage
- Testar em todas as páginas

**Fase 5: Dark Theme Design - 1h**
- Definir valores de dark theme
- Testar contraste (WCAG)
- Ajustar cores se necessário

#### DoD

- [ ] Tokens semânticos criados (A1 completo)
- [ ] ThemeProvider implementado
- [ ] Todos componentes DS usando tokens semânticos
- [ ] Theme toggle funcional em Studio e Storybook
- [ ] Dark theme testado e acessível (contraste ≥ 4.5:1)
- [ ] Stories atualizadas no Storybook
- [ ] Documentação em README
- [ ] PR aprovado

---

## 📅 Sprint 3 Timeline (Estimado)

### Semana 1
- **Dias 1-2:** H3 - Dashboard UI Implementation (8-10h)
- **Dias 3-4:** H4 - Health Indicators (6-8h)
- **Dia 5:** H5 - Storybook Links (2-3h)

### Semana 2
- **Dias 1-3:** B6 Fase 1-3 (Tokens + Provider + Migration) (9h)
- **Dia 4:** B6 Fase 4-5 (Toggle UI + Dark theme) (3h)
- **Dia 5:** Testing, bug fixes, documentation

### Semana 3 (Buffer)
- Refinements
- Integration testing
- User feedback incorporation

**Total Estimado:** 28-35 horas de desenvolvimento

---

## 🎯 Sprint 3 Success Criteria

### Functional
- [ ] Dashboard UI totalmente funcional e usável
- [ ] Health indicators atualizando corretamente
- [ ] Storybook acessível de todos os pontos
- [ ] Theme toggle funcionando em light/dark

### Quality
- [ ] Build passa sem erros
- [ ] Lint limpo (0 critical warnings)
- [ ] Acessibilidade WCAG 2.1 AA em todos os novos componentes
- [ ] Performance: Dashboard carrega < 2s

### Documentation
- [ ] Todos os READMEs atualizados
- [ ] Stories completas no Storybook
- [ ] CHANGELOG atualizado
- [ ] Deployment guide revisado

---

## 🚀 Post-Sprint 3: Caminho para v1.0

Após Sprint 3, o projeto estará em **80% → 100%** de completude.

### Itens Restantes para v1.0

**Must-Have:**
- [ ] C3 - Templates de página (3-4h)
- [ ] C5 - Export/Import JSON por UI (2-3h)
- [ ] F3 - GitHub Actions CI completo (se não já ativo)
- [ ] G5 - Validação de links em CI (1-2h)

**Nice-to-Have:**
- [ ] E4 - Mais jornadas (expandir domínios)
- [ ] D4 - Agrupamento melhorado no Storybook
- [ ] B7 - Snapshot visual (Chromatic)

**Critérios de v1.0 Release:**
1. Todas as issues P0 + P1 + P2 completas
2. QA passou em staging sem critical bugs
3. Feedback de usuários incorporado
4. Documentação 100% atualizada
5. CI/CD rodando estável por 1 semana

---

## 📊 Métricas de Sucesso

### KPIs Sprint 3

| Métrica | Target | Como Medir |
|---------|--------|------------|
| Issues Completas | 4/4 (100%) | GitHub issues fechadas |
| Build Success Rate | 100% | CI/CD runs |
| Test Coverage | ≥ 70% | Jest (quando implementado) |
| A11y Score | 100 | Lighthouse + addon A11y |
| Dashboard Load Time | < 2s | Lighthouse Performance |
| Team Satisfaction | ≥ 4/5 | Survey pós-sprint |

---

## 🤝 Responsabilidades

| Role | Responsibilities |
|------|------------------|
| **Dev Lead** | Code review, arquitetura, blocker resolution |
| **Frontend Dev** | Implementação de H3, H4, H5, B6 |
| **Designer** | Validação de UI do Dashboard, dark theme |
| **QA** | Testing de cada issue, regression testing |
| **PM** | Priorização, stakeholder updates |

---

## 📝 Checklist de Início de Sprint

- [ ] Backlog refinado e priorizado
- [ ] Dependências identificadas e resolvidas
- [ ] Ambiente de dev atualizado (v0.2-beta base)
- [ ] Team alignment meeting realizado
- [ ] Estimation session completa
- [ ] Sprint goal definido e comunicado

---

## 📝 Checklist de Fim de Sprint

- [ ] Todas as 4 issues completas
- [ ] Build passando
- [ ] Testes passando
- [ ] Code review completo
- [ ] Documentação atualizada
- [ ] Demo preparada
- [ ] Retrospective agendada
- [ ] v0.3 tag criada

---

**Document Status:** ✅ Ready for Sprint Start  
**Created:** 2025-11-20  
**Next Review:** Após Sprint 3 completion
