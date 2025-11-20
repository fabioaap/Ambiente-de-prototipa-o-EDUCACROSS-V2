# Próximos Passos - Sprint 4 e Além

**Data**: 2025-11-20  
**Status**: 📋 PLANEJAMENTO PÓS-SPRINT 3  
**Progresso do Projeto**: 95% (19/20 issues implementadas)

---

## 📊 Estado Atual do Projeto

### ✅ Completo (Sprints 1-3)

| Sprint | Issues | Status | Tag |
|--------|--------|--------|-----|
| Sprint 1 (P0) | 5/5 (100%) | ✅ Validado | v0.1.0 |
| Sprint 2 (P1) | 11/11 (100%) | ✅ Mergeado | v0.2-beta |
| Sprint 3 (P2) | 3/7 (43%) | ⏳ Parcial | - |
| **Total** | **19/20 (95%)** | ✅ Funcional | - |

### 🎯 Épicos Completos

- ✅ **Epic B1** - Componentes de formulário (5 componentes)
- ✅ **Epic C1** - Persistência em disco (API completa)
- ✅ **Epic D1** - Página de Tokens Storybook
- ✅ **Epic E1** - BackOffice: Revisão de Questões (3 páginas + 3 componentes)
- ✅ **Epic E2** - FrontOffice: Onboarding (4 páginas)
- ✅ **Epic E3** - Game: Missões Ilha 1 (3 páginas)
- ✅ **Epic F1** - ESLint unificado
- ✅ **Epic F3** - GitHub Actions CI/CD
- ✅ **Epic C2** - Sidebar páginas Studio
- ✅ **Epic C5** - Export/Import JSON
- ✅ **Epic D2** - Addon A11y Storybook
- ✅ **Epic G1-G6** - Governança completa
- ✅ **Epic H1-H2** - Dashboard planning + API

---

## 🚀 Ações Imediatas (Hoje/Esta Semana)

### 1. Fechar Issues P0 no GitHub ⏰ PRIORITÁRIO

**Por que:** Issues #1-#5 estão tecnicamente completas e validadas.

**Como fazer:**

```bash
# Para cada issue #1 até #5:
1. Acessar: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/[número]
2. Adicionar comentário:
   "✅ Issue validada e completa. Ver relatório de validação em docs/validacao-issues-p0.md"
3. Linkar commits relevantes
4. Fechar issue com "Close" ou "Close as completed"
```

**Checklist:**
- [ ] Fechar issue #1 (C1 - API Persistência)
- [ ] Fechar issue #2 (B1 - Form Components)
- [ ] Fechar issue #3 (D1 - Tokens Storybook)
- [ ] Fechar issue #4 (E1 - BackOffice)
- [ ] Fechar issue #5 (F1 - ESLint)

### 2. Revisar e Mergar PR Atual

**Branch:** `copilot/review-issues-and-accessibility`

**Conteúdo:**
- ✅ 3 novos componentes DS (Toolbar, StatusBadge, ConfirmDialog)
- ✅ Página acoes.json
- ✅ Documentação de validação (docs/validacao-issues-p0.md)
- ✅ Backlog atualizado (docs/backlog.md)

**Ações:**
1. [ ] Code review (opcional - código já testado)
2. [ ] Merge para `main`
3. [ ] Tag `v0.3.0` (Sprint 1 completo + E1)
4. [ ] Deletar branch após merge

### 3. Atualizar Board/Project no GitHub

Se estiver usando GitHub Projects:
- [ ] Mover issues #1-#5 para coluna "Done"
- [ ] Atualizar status de Sprint 1 para "Complete"
- [ ] Criar milestone "Sprint 4" se necessário

---

## 📋 Sprint 4 - Planejamento Proposto

### 🎯 Objetivo: Dashboard UI + Tokens Semânticos

**Duração estimada:** 2-3 semanas  
**Foco:** Completar interface do Dashboard e desbloquear theming

### Tarefas Prioritárias (P2)

#### 1. H3 - Dashboard UI (implementação) 🔴 ALTA

**Descrição:** Implementar interface completa do Dashboard em `/studio/dashboard`

**Subtarefas:**
- [ ] Criar página Next.js em `apps/studio/src/app/dashboard/page.tsx`
- [ ] Componente `DashboardGrid` para layout de cards
- [ ] Card de estatísticas (total páginas, domínios, última atualização)
- [ ] Lista de páginas recentes com thumbnails/preview
- [ ] Filtros por domínio (BackOffice, FrontOffice, Game)
- [ ] Busca por nome/slug de página
- [ ] Links diretos para Studio editor e página renderizada
- [ ] Responsivo (mobile-first)

**Componentes DS necessários:**
- Card (já existe)
- Layout (já existe)
- Text (já existe)
- Novo: `SearchInput` (wrapper do Input para busca)
- Novo: `FilterChips` (chips clicáveis para filtros)

**Critérios de aceitação:**
- [ ] Dashboard acessível em `/studio/dashboard`
- [ ] Lista todas as páginas do `GET /api/dashboard/pages`
- [ ] Filtros funcionais (domínio, status)
- [ ] Busca funcional (nome/slug)
- [ ] Links clicáveis para edição e visualização
- [ ] Build sem erros

**Estimativa:** 8-12 horas

#### 2. H4 - Indicadores de Saúde 🟡 MÉDIA

**Descrição:** Exibir métricas do repositório no Dashboard

**Subtarefas:**
- [ ] Criar `apps/studio/src/app/api/health/route.ts`
- [ ] Endpoint retorna:
  - Status de build (último CI run)
  - Status de lint
  - Total de componentes DS
  - Total de páginas
  - Total de stories Storybook
  - Timestamp última atualização
- [ ] Componente `HealthIndicator` (status badge + tooltip)
- [ ] Integração com GitHub Actions (via GitHub API se possível)
- [ ] Fallback para dados estáticos se API não disponível

**Critérios de aceitação:**
- [ ] Endpoint `/api/health` funcional
- [ ] Dashboard exibe 5-6 indicadores principais
- [ ] Indicadores atualizados a cada reload
- [ ] Cores por status (verde/amarelo/vermelho)

**Estimativa:** 4-6 horas

#### 3. H5 - Link para Storybook e Badge 🟢 BAIXA

**Descrição:** Adicionar link direto para Storybook no Dashboard e READMEs

**Subtarefas:**
- [ ] Link no Dashboard header para Storybook
- [ ] Badge de build Storybook (se CI existir)
- [ ] Adicionar link em `README.md` principal
- [ ] Adicionar link em `domains/README.md`
- [ ] Adicionar em READMEs de cada jornada
- [ ] Ícone/botão destacado

**Critérios de aceitação:**
- [ ] Link funcional no Dashboard
- [ ] Badge/status visível
- [ ] Links em todos os READMEs relevantes
- [ ] Abre em nova aba

**Estimativa:** 2-3 horas

#### 4. A1-A4 - Tokens Semânticos 🔴 BLOQUEIO

**Descrição:** Criar camada de tokens semânticos para theming

**Requer:** Design lead para definir nomenclatura

**Subtarefas:**
- [ ] A1: Definir tokens semânticos (ex: `--color-bg`, `--color-fg`, `--color-accent`)
- [ ] A2: Suporte a tema claro/escuro via CSS vars
- [ ] A3: Documentar tokens de tipografia e espaçamento
- [ ] A4: Padrão de nomes e guia de contribuição

**Dependências:**
- ⚠️ Requer decisão de Design sobre nomenclatura
- ⚠️ Requer definição de paleta claro/escuro

**Critérios de aceitação:**
- [ ] Tokens semânticos em `packages/tokens/src/semantic-tokens.json`
- [ ] Build gera CSS vars semânticos
- [ ] Documentação de uso
- [ ] Toggle claro/escuro funcional (POC)

**Estimativa:** 12-16 horas (após definições)

#### 5. B6 - Theming com Tokens Semânticos 🟡 BLOQUEADO

**Descrição:** Adaptar componentes DS para usar tokens semânticos

**Bloqueio:** Aguarda A1-A4

**Subtarefas:**
- [ ] Refatorar componentes para usar tokens semânticos
- [ ] Testar em tema claro e escuro
- [ ] Atualizar stories para mostrar ambos os temas
- [ ] Documentar como adicionar suporte a theming em novos componentes

**Critérios de aceitação:**
- [ ] Todos os componentes DS respondem a mudança de tema
- [ ] Toggle de tema funcional
- [ ] Stories exibem ambos os temas
- [ ] Sem regressões visuais

**Estimativa:** 8-10 horas

---

## 🗺️ Roadmap de Médio Prazo

### Sprint 5 (Futuro)

**Foco:** Componentes de layout e feedback

- [ ] B2 - Componentes de layout: `Stack`, `Grid`, `Section`, `Navbar`, `Footer`
- [ ] B3 - Feedback/UI: `Badge`, `Tag`, `Tooltip`, `Modal`, `Toast`
- [ ] C3 - Templates de página por jornada
- [ ] D3 - Play functions no Storybook (testes interativos)

### Sprint 6 (Futuro)

**Foco:** Qualidade e automação

- [ ] F2 - Prettier + format scripts
- [ ] F4 - Husky + lint-staged
- [ ] B7 - Snapshot visual (Chromatic)
- [ ] D4 - Agrupamento por categoria no Storybook
- [ ] C4 - Autocomplete de componentes no Puck

### Melhorias Contínuas

**Acessibilidade:**
- [ ] Adicionar `:focus-visible` explícito em todos os componentes
- [ ] Aumentar hit targets para 44x44px
- [ ] Testes com screen readers (NVDA/JAWS)
- [ ] Documentar keyboard navigation em cada componente

**Performance:**
- [ ] Lazy loading de componentes pesados
- [ ] Code splitting no Studio
- [ ] Otimização de bundle Storybook
- [ ] Cache de builds

**Documentação:**
- [ ] B5 - Página de docs completa no Storybook
- [ ] Vídeos de demo das jornadas
- [ ] Guia de contribuição expandido
- [ ] Changelog automatizado

---

## 🎓 Recomendações Técnicas

### 1. Manter Qualidade de Código

**Práticas:**
- ✅ Continuar usando TypeScript strict mode
- ✅ Manter coverage de lint em 100%
- ✅ Todos os componentes com stories
- ✅ CSS Modules + tokens (sem Tailwind)
- ✅ Acessibilidade como critério obrigatório

**Checklist pré-commit:**
```bash
pnpm build       # Build completo sem erros
pnpm lint        # Lint sem erros críticos
pnpm -r type-check  # Type-check em todos os pacotes
```

### 2. Estratégia de Branches

**Modelo sugerido:**
```
main (protected)
├── feature/h3-dashboard-ui
├── feature/h4-health-indicators
├── feature/h5-storybook-link
└── feature/a1-semantic-tokens
```

**Workflow:**
1. Branch de feature a partir de `main`
2. Commits pequenos e frequentes
3. PR com descrição detalhada
4. Review (opcional em prototipação)
5. Merge para `main`
6. Tag de versão se major feature

### 3. Versionamento Semântico

**Próximas tags sugeridas:**
- `v0.3.0` - Sprint 1 completo + E1 (atual)
- `v0.4.0` - Sprint 3 completo (H3-H5)
- `v0.5.0` - Sprint 4 completo (tokens semânticos + theming)
- `v1.0.0` - Primeira versão estável (todos os épicos)

### 4. Comunicação e Documentação

**Manter atualizados:**
- `docs/backlog.md` - Após cada issue fechada
- `domains/*/journeys/*/README.md` - Ao adicionar páginas
- `CHANGELOG.md` - Ao criar tag
- Stories Storybook - Para cada componente novo

---

## 🚫 O Que NÃO Fazer

### Evitar Scope Creep

- ❌ Não adicionar bibliotecas pesadas (Tailwind, MUI, etc)
- ❌ Não refatorar estrutura de pastas (está funcionando)
- ❌ Não criar abstrações prematuras
- ❌ Não otimizar sem medir (performance)
- ❌ Não adicionar features "nice to have" antes de completar P2

### Manter Simplicidade

- ✅ Priorizar componentes simples e reutilizáveis
- ✅ Manter CSS Modules (evitar CSS-in-JS)
- ✅ Usar tokens CSS variables (já funciona bem)
- ✅ Evitar estado global complexo (usar props)
- ✅ LocalStorage suficiente para prototipação

### Foco em Prototipação

**Lembrar:**
- Este é um ambiente de **prototipação**, não produção
- Velocidade > Perfeição
- Funcionalidade > Otimização
- Documentação > Testes unitários (nesta fase)
- Clareza > Abstrações complexas

---

## 📞 Próximas Decisões Necessárias

### 1. Tokens Semânticos (Design Lead) 🔴 URGENTE

**Pergunta:** Qual nomenclatura e estrutura usar para tokens semânticos?

**Opções:**
- Opção A: `--color-bg-primary`, `--color-fg-primary`, etc
- Opção B: `--color-surface`, `--color-on-surface`, etc (Material Design)
- Opção C: `--color-background`, `--color-text`, etc (genérico)

**Impacto:** Desbloqueia B6 (theming)

**Prazo sugerido:** Definir até fim desta semana

### 2. Dashboard UI/UX (PM/Design) 🟡 MÉDIA

**Pergunta:** Quais métricas/widgets são prioritários no Dashboard?

**Considerar:**
- Estatísticas gerais (páginas, componentes, jornadas)
- Lista de páginas recentes
- Status de saúde do repo
- Atalhos rápidos
- Filtros/busca

**Impacto:** Priorização de H3 subtarefas

**Prazo sugerido:** Definir antes de iniciar H3

### 3. CI/CD Deploy (DevOps) 🟢 BAIXA

**Pergunta:** Onde hospedar Storybook e Studio para demo?

**Opções:**
- Vercel (fácil, gratuito para protótipos)
- GitHub Pages (Storybook estático)
- Netlify
- Self-hosted

**Impacto:** Badge de build, links públicos

**Prazo sugerido:** Definir quando H5 for implementado

---

## ✅ Checklist Sprint 4

### Semana 1
- [ ] Fechar issues #1-#5 no GitHub
- [ ] Mergar PR `copilot/review-issues-and-accessibility`
- [ ] Tag `v0.3.0`
- [ ] Definir nomenclatura tokens semânticos (Design)
- [ ] Iniciar H3 (Dashboard UI)

### Semana 2
- [ ] Completar H3 (Dashboard UI)
- [ ] Implementar H4 (Health Indicators)
- [ ] Implementar H5 (Link Storybook)
- [ ] Iniciar A1-A4 (Tokens Semânticos)

### Semana 3
- [ ] Completar A1-A4
- [ ] Implementar B6 (Theming)
- [ ] Testes de integração Dashboard
- [ ] Documentação Sprint 4
- [ ] Tag `v0.4.0`

---

## 📊 Métricas de Sucesso

### Sprint 4

**Objetivos quantitativos:**
- [ ] 7 issues P2 fechadas (100% Sprint 3)
- [ ] Dashboard funcional em produção
- [ ] Tokens semânticos documentados
- [ ] Theming funcional em ≥80% dos componentes
- [ ] 0 erros de build/lint/type-check
- [ ] Backlog atualizado

**Objetivos qualitativos:**
- [ ] Dashboard usável por PM/Designers
- [ ] Documentação de tokens clara
- [ ] Theming visualmente consistente
- [ ] Feedback positivo da equipe

---

## 🔗 Recursos Úteis

### Documentação
- [Backlog principal](./backlog.md)
- [Validação Issues P0](./validacao-issues-p0.md)
- [Sprint 1 Report](./sprint-1-completo.md)
- [Sprint 2 Report](./sprint-2-final-report.md)
- [Sprint 3 Report](./sprint-3-concluido.md)

### Referências Técnicas
- [API Pages README](../apps/studio/src/app/api/pages/README.md)
- [Dashboard Wireframe](./dashboard-wireframe.md)
- [Accessibility Audit](./accessibility-audit.md)

### GitHub
- [Issues Abertas](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues)
- [Pull Requests](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pulls)
- [Projects Board](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/projects)

---

**Documento criado:** 2025-11-20  
**Próxima revisão:** Após Sprint 4  
**Responsável:** Squad Prototipação EDUCACROSS  
**Status:** 📋 PLANEJAMENTO ATIVO
