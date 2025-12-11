# Jornada: Gestor de Redes EDUCACROSS

## Objetivo
Dashboard de engajamento para coordenadores de rede e gestores educacionais monitorarem o uso da plataforma EDUCACROSS. Foco na métrica **Acessaram** como indicador principal de engajamento, com detalhamento de interações (Jogaram, Vídeos, Livros, Avaliações, Questões, Música).

## Status
🚧 **Protótipo** - Implementação baseada no PRD "Revisão da métrica Acessaram no card de Alunos"

## User Story (PRD)
**Objetivo Principal:** Colocar "Acessaram" como métrica chave de engajamento no card de Alunos, apresentando todas as interações como detalhes calculados sobre esse conjunto.

**Problema Resolvido:**
- Hoje "Jogaram" aparece como métrica principal, gerando interpretação incorreta de uso geral
- Não fica claro quantos estudantes entraram de fato na plataforma no período
- Dificuldade para comparar engajamento entre redes e anos

**Solução:**
1. Card de Alunos mostra "Acessaram" como métrica principal
2. Modal de detalhes apresenta todas interações calculadas sobre a base "Acessaram"
3. Tooltips explicam base de cálculo para evitar leituras equivocadas

## Telas

### 1. Dashboard Principal (`tela-painel-inicial.tsx`)
**Objetivo:** Visão consolidada de engajamento da rede

**Elementos:**
- **Filtros superiores:**
  - Grupo de Escolas (dropdown multi-select)
  - Ano Escolar (dropdown)
  - Período (dropdown)
- **4 KPI Cards:**
  1. **Alunos** (destaque)
     - Cadastrados: 39.269 (base total)
     - Acessaram: 38.805 (98,81%) - **Métrica principal**
     - Jogaram: 38.485 (99,17% de Acessaram)
     - Botão "Ver detalhes" → Abre modal
  2. **Professores**
     - Cadastrados: 1.325
     - Acessaram: 1.138 (85,88%)
  3. **Diretores**
     - Cadastrados: 104
     - Acessaram: 49 (47,11%)
  4. **Coordenadores**
     - Cadastrados: 141
     - Acessaram: 120 (85,10%)
- **Tabela de Escolas:**
  - Colunas: Escola, Grupo, Alunos Cadastrados, Acessaram, Jogaram, Ações
  - Paginação: 10 registros por página
  - Busca: "Pesquisar por escola"
  - Exportação: Botão "Exportar em Excel"

**Componentes usados:**
- `Select` (filtros)
- `StatsCard` ou `Card` (KPIs)
- `Progress` (barras de percentual)
- `Badge` (percentuais coloridos)
- `DataTable` (tabela de escolas)
- `Button` (ações)
- `Input` (busca)

### 2. Modal de Detalhes do Acesso (`modal-detalhes-acesso.tsx`)
**Objetivo:** Breakdown detalhado das interações dos alunos que acessaram

**Estrutura:**
- **Cabeçalho:**
  - Título: "Detalhes do acesso dos alunos"
  - Subtítulo: "Base: estudantes que acessaram a plataforma no período selecionado"
  - Botão fechar (X)

- **Lista de Interações** (6 linhas):
  1. **Jogaram** - 38.485 estudantes (99,17%)
  2. **Viram vídeos** - 32.500 estudantes (83,75%)
  3. **Leram livros** - 28.900 estudantes (74,49%)
  4. **Fizeram avaliação** - 25.600 estudantes (65,98%)
  5. **Responderam questão** - 30.100 estudantes (77,57%)
  6. **Ouviram música** - 18.200 estudantes (46,91%)

- **Rodapé:**
  - Aviso: "⚠️ Um estudante pode aparecer em mais de uma linha. Os percentuais utilizam como base os estudantes que acessaram e podem somar mais que 100%."

**Componentes usados:**
- `Modal` (container)
- `Card` (linhas de interação)
- `Progress` (barras de percentual)
- `Badge` (percentuais)
- `Text` (textos e tooltips)
- `Button` (fechar)

## Fluxo de Navegação

```
Dashboard Principal
  ↓
  [Filtros] → Atualiza todos os cards e tabela
  ↓
  Card "Alunos" → Botão "Ver detalhes"
  ↓
Modal Detalhes do Acesso
  ↓
  [Visualiza 6 interações]
  ↓
  Botão "Fechar" → Volta ao Dashboard
```

## Dados Mock (Base de Cálculo)

### Conjunto "Cadastrados" (base 100%)
- **Alunos:** 39.269 estudantes com licença ativa
- **Professores:** 1.325
- **Diretores:** 104
- **Coordenadores:** 141

### Conjunto "Acessaram" (subconjunto de Cadastrados)
- **Alunos:** 38.805 (98,81% de 39.269)
- **Professores:** 1.138 (85,88% de 1.325)
- **Diretores:** 49 (47,11% de 104)
- **Coordenadores:** 120 (85,10% de 141)

### Detalhes do Acesso (subconjunto de Acessaram - Alunos)
Base: 38.805 que acessaram

1. **Jogaram:** 38.485 (99,17%)
2. **Viram vídeos:** 32.500 (83,75%)
3. **Leram livros:** 28.900 (74,49%)
4. **Fizeram avaliação:** 25.600 (65,98%)
5. **Responderam questão:** 30.100 (77,57%)
6. **Ouviram música:** 18.200 (46,91%)

**Total percentual:** 447,87% (esperado >100%, pois um aluno pode fazer múltiplas interações)

## Design Tokens
- **Cores de percentual:**
  - Verde (≥90%): `--color-success`
  - Amarelo (70-89%): `--color-warning`
  - Vermelho (<70%): `--color-error`
- **Progress bars:** Linear, height `--spacing-xs`, color conforme percentual
- **Cards:** `--radius-md`, shadow `--shadow-sm`

## Tecnologias
- React 18 com TypeScript
- Next.js 15 App Router
- CSS Modules (`gestor-redes.module.css`)
- Design System: `@prototipo/design-system`

## Links
- PRD: [Documento fornecido pelo usuário]
- Design de referência: [Screenshot fornecido]
- Componentes: `/packages/design-system/src/components/`
