# Issues Abertas - EDUCACROSS V2

## Resumo Executivo

**Total de Issues Abertas:** 16  
**Última Atualização:** 19/11/2025

---

## Organização por Prioridade

### 🔴 Prioridade P0 (Alta) - 5 issues

#### 1. [#1 - C1 - Studio: Persistência em disco (API)](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/1)
- **Tipo:** Epic, Task
- **Domínio:** BackOffice
- **Status:** Backlog
- **Descrição:** Implementar API para persistência de páginas do Studio em disco
- **Escopo Técnico:**
  - Rota API: `apps/studio/src/app/api/pages` (GET list, GET by id, POST/PUT create/update, DELETE)
  - Armazenamento: `apps/studio/data/pages/*.json`
  - Verificar permissões: gravação apenas em ambientes de desenvolvimento

#### 2. [#2 - B1 - Design System: Componentes de formulário](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/2)
- **Tipo:** Epic, Task
- **Status:** Backlog
- **Descrição:** Implementar componentes de formulário essenciais (Input, Select, Checkbox, Radio, Switch)
- **Componentes:**
  - Input com states (default, focus, disabled, error)
  - Select com opções
  - Checkbox/Radio/Switch com docs e accessibility roles

#### 3. [#3 - D1 - Storybook: Página de Tokens (visual)](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/3)
- **Tipo:** Epic, Task
- **Status:** Backlog
- **Descrição:** Criar página ou story MDX no Storybook para exibir tokens de design
- **Conteúdo:**
  - Paleta de cores
  - Tipografia (h1..p)
  - Espaçamentos
  - Border-radiuses

#### 4. [#4 - E1 - domains/BackOffice: Revisão de Questões (Primeira Jornada)](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/4)
- **Tipo:** Epic, Task
- **Domínio:** BackOffice
- **Status:** Backlog
- **Descrição:** Criar jornada inicial de Revisão de Questões no BackOffice
- **Entregas:**
  - README da jornada via template-jornada.md
  - Páginas de lista e detalhe no Studio
  - Documentação de componentes necessários

#### 5. [#5 - F1 - Tooling/Infra: ESLint unificado para monorepo](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/5)
- **Tipo:** Epic, Task
- **Status:** Backlog
- **Descrição:** Criar configuração compartilhada de ESLint para o monorepo
- **Entregas:**
  - ESLint configurado com regras TypeScript e React
  - Scripts `pnpm lint` em root e nos pacotes
  - Documentação com instruções

---

### 🟡 Prioridade P1 (Média) - 9 issues

#### 6. [#6 - C2 - Studio: Lista de páginas no sidebar](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/6)
- **Tipo:** Task
- **Status:** Backlog
- **Descrição:** Exibir lista de páginas persistidas no Studio no sidebar
- **Funcionalidades:** Ações CRUD básicas (criar/renomear/excluir)

#### 7. [#7 - B4 - Design System: Acessibilidade](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/7)
- **Status:** Backlog
- **Descrição:** Melhorias de acessibilidade no Design System
- **Entregas:**
  - Roles/aria onde necessário
  - Foco visível para componentes interativos
  - Teste básico de contraste

#### 8. [#8 - D2 - Storybook: Addon A11y e validações](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/8)
- **Tipo:** Task
- **Status:** Backlog
- **Descrição:** Adicionar addon a11y e testes de acessibilidade mínimos no Storybook

#### 9. [#9 - G4 - Script: Gerar índice automático de jornadas](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/9)
- **Tipo:** Task
- **Status:** Backlog
- **Descrição:** Criar script (`pnpm gen:jornadas`) que varre jornadas e gera índice

#### 10. [#10 - G6 - DOCUMENTAÇÃO: Criar CONTRIBUTING.md](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/10)
- **Tipo:** Documentation
- **Status:** Backlog
- **Descrição:** Criar `CONTRIBUTING.md` com orientações para criação de jornadas
- **Conteúdo:**
  - Passos para criar jornada e template
  - Como rodar o ambiente localmente (dev)
  - Como abrir PRs e convenções de labels

#### 11. [#11 - H - Dashboard do Projeto: Epic](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/11)
- **Tipo:** Epic, Task
- **Status:** Backlog
- **Descrição:** Epic para planejar e implementar Dashboard do Projeto
- **Escopo:**
  - Wireframe/planning
  - API/endpoint de index de páginas
  - UI do Dashboard
  - Indicadores de saúde
  - Link para Storybook

#### 12. [#12 - H1 - Dashboard: Planejar layout/Wireframe](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/12)
- **Tipo:** Task
- **Status:** Backlog
- **Parte de:** Epic #11
- **Descrição:** Planejar layout do Dashboard do Projeto
- **Entregas:**
  - Wireframe aprovado
  - Lista de métricas desejadas para indicadores
  - Definição de onde ficará hospedado

#### 13. [#16 - H5 - Dashboard: Link para Storybook e badge](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/16)
- **Tipo:** Task
- **Status:** Backlog
- **Parte de:** Epic #11
- **Descrição:** Adicionar no Dashboard um link direto para o Storybook estático
- **Entregas:**
  - Link para Storybook (dev) e estático (prod)
  - Badge de build/storybook

---

### 🟢 Prioridade P2 (Baixa) - 3 issues

#### 14. [#13 - H2 - Dashboard: Endpoint / API para index de páginas](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/13)
- **Tipo:** Task
- **Status:** Backlog
- **Parte de:** Epic #11
- **Descrição:** Implementar rota/API que fornece índice das páginas prototipadas
- **Endpoint:** `GET /api/pages`

#### 15. [#14 - H3 - Dashboard: Implementar UI de listagem (POC)](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/14)
- **Tipo:** Task
- **Status:** Backlog
- **Parte de:** Epic #11
- **Descrição:** Implementar UI mínima do Dashboard (página no Studio)
- **Funcionalidades:**
  - Lista de páginas com links para Studio
  - Filtros por domínio/job
  - Visualização mínima de indicadores de saúde

#### 16. [#15 - H4 - Dashboard: Indicadores de saúde do repositório](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/15)
- **Tipo:** Task
- **Status:** Backlog
- **Parte de:** Epic #11
- **Descrição:** Definir e exibir indicadores de saúde
- **Métricas:**
  - Build status
  - Lint status
  - Última build
  - Tamanho bundle Storybook
  - Dependências desatualizadas

---

## Organização por Categoria

### 📊 Dashboard (Epic #11) - 5 issues
- #11 - Epic principal
- #12 - Planejar layout/Wireframe (P1)
- #13 - Endpoint / API (P2)
- #14 - UI de listagem (P2)
- #15 - Indicadores de saúde (P2)
- #16 - Link para Storybook (P1)

### 🎨 Design System - 3 issues
- #2 - Componentes de formulário (P0)
- #7 - Acessibilidade (P1)
- #3 - Página de Tokens no Storybook (P0)

### 🎭 Studio - 2 issues
- #1 - Persistência em disco (P0)
- #6 - Lista de páginas no sidebar (P1)

### 📚 Documentação - 2 issues
- #8 - Storybook: Addon A11y (P1)
- #10 - CONTRIBUTING.md (P1)

### 🔧 Tooling/Infra - 2 issues
- #5 - ESLint unificado (P0)
- #9 - Script gerar índice de jornadas (P1)

### 🏢 Domínio BackOffice - 2 issues
- #1 - Persistência Studio (P0)
- #4 - Revisão de Questões (P0)

---

## Status Geral

| Status | Quantidade |
|--------|------------|
| Backlog | 16 |
| **Total** | **16** |

---

## Épicos Ativos

| Epic | Issues Relacionadas | Prioridade |
|------|---------------------|------------|
| #11 - Dashboard do Projeto | #12, #13, #14, #15, #16 | P1 |
| #1 - Studio: Persistência | - | P0 |
| #2 - DS: Componentes de formulário | - | P0 |
| #3 - Storybook: Tokens | - | P0 |
| #4 - BackOffice: Revisão de Questões | - | P0 |
| #5 - ESLint unificado | - | P0 |

---

## Próximos Passos Recomendados

### Curto Prazo (P0)
1. Configurar ESLint unificado (#5) - Base para qualidade de código
2. Implementar persistência do Studio (#1) - Base para desenvolvimento
3. Criar componentes de formulário (#2) - Base para jornadas
4. Criar página de tokens (#3) - Base para Design System
5. Iniciar primeira jornada BackOffice (#4)

### Médio Prazo (P1)
1. Planejar Dashboard (#12)
2. Implementar lista de páginas no Studio (#6)
3. Adicionar A11y no Storybook (#8)
4. Criar CONTRIBUTING.md (#10)
5. Script de índice de jornadas (#9)
6. Link para Storybook no Dashboard (#16)
7. Melhorias de acessibilidade no DS (#7)

### Longo Prazo (P2)
1. Implementar API do Dashboard (#13)
2. Criar UI do Dashboard (#14)
3. Adicionar indicadores de saúde (#15)

---

## Legendas

**Prioridades:**
- **P0**: Alta prioridade - Fundamentos do projeto
- **P1**: Média prioridade - Funcionalidades importantes
- **P2**: Baixa prioridade - Melhorias incrementais

**Labels Comuns:**
- `epic`: Trabalho de nível épico
- `type:task`: Tarefa técnica
- `documentation`: Documentação
- `domain:BackOffice`: Domínio BackOffice
- `status:backlog`: Em backlog

---

*Documento gerado automaticamente em resposta à questão: "quais issues estão abertas ainda?"*
