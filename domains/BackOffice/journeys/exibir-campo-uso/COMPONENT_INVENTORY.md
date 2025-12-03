# Inventário Completo de Componentes - Banco de Questões (Figma Node 8565:17355)

## Estrutura Hierárquica Completa

```
Banco de Questões-Aprovadas (FRAME 1127x851)
├── global-header (FRAME 1127x74)
│   ├── Group 730 (logo + nav)
│   └── Container (user menu)
│
├── Frame 27 - Breadcrumb (INSTANCE 516x24)
│   ├── Frame 24 (primeiro item)
│   └── Frame 25 (segundo item)
│
├── menu-backoffice (FRAME 265x996) - SIDEBAR ESQUERDA
│   ├── Container (logo/header)
│   ├── Gestão escolar (section header)
│   ├── Escolas (menu item)
│   ├── Container (menu item ativo)
│   ├── Livros (menu item)
│   ├── Livros (menu item)
│   ├── Gestão administrativa (section header)
│   ├── Container (menu item)
│   ├── Container (menu item)
│   ├── Container (menu item)
│   ├── Container (menu item)
│   ├── Container (menu item)
│   ├── Container (menu item)
│   ├── Container (menu item)
│   └── Eventos (menu item)
│
├── Container (FRAME 1131x851) - CONTEÚDO PRINCIPAL
│   │
│   ├── Header (FRAME 1131x34)
│   │   ├── "Todas as questões" (TEXT)
│   │   └── Frame 481218 (actions)
│   │
│   ├── Tab (FRAME 1131x45) - NAVEGAÇÃO ABAS
│   │   ├── Questões (GROUP - aba ativa)
│   │   ├── Questões (GROUP - outra aba)
│   │   └── Análise TRI (GROUP - terceira aba)
│   │
│   └── Conteúdo (FRAME 1131x752)
│       │
│       ├── Container (FRAME 1131x44) - HEADER DE ESTATÍSTICAS
│       │   ├── (3 elementos de estatísticas)
│       │
│       ├── Busca Tema (FRAME 1131x362) - ÁREA DE FILTROS
│       │   │
│       │   ├── Inputs (FRAME 1091x70) - LINHA 1 DE FILTROS
│       │   │   ├── Frame 481310 "Área de Conhecimento"
│       │   │   ├── Input (segundo filtro)
│       │   │   ├── Input (terceiro filtro)
│       │   │   └── Input (quarto filtro)
│       │   │
│       │   ├── Inputs (FRAME 1091x156) - LINHA 2 DE FILTROS
│       │   │   ├── Frame 481793 (filtro grande)
│       │   │   └── Frame 481792 (outro filtro grande)
│       │   │
│       │   ├── Frame 1352 (FRAME 1091x45) - BOTÕES DE AÇÃO
│       │   │   ├── "Vincule a área do conhecimento" (TEXT)
│       │   │   ├── Frame 481296 "Todas as áreas do conhecimento"
│       │   │   ├── Frame 481297 "Todas as áreas"
│       │   │   ├── Frame 481271 "1º ano, 2º ano..."
│       │   │   ├── status-mission (badge)
│       │   │   └── ⭐️ Icon (star icon)
│       │   │
│       │   └── Input (FRAME 1091x21) - CAMPO DE BUSCA
│       │       └── (5 elementos de busca/search)
│       │
│       └── Frame 481203 (FRAME 1131x326) - WRAPPER DA TABELA
│           │
│           └── Frame 9078 (FRAME 1131x326) - TABELA COMPLETA
│               │
│               ├── Frame 480971 (FRAME 1131x278) - CORPO DA TABELA
│               │   │
│               │   ├── Table Header (FRAME 1131x50) - CABEÇALHO
│               │   │   ├── Checkbox (18px)
│               │   │   ├── Frame 481000 "CÓDIGO" (146px)
│               │   │   ├── Frame 481005 "HABILIDADES" (132px)
│               │   │   ├── Frame 481003 "TÓPICO DE CONHECIMENTO" (154px)
│               │   │   ├── Frame 481006 "TIPO DE QUESTÃO" (80px)
│               │   │   ├── Frame 481004 "autoria" (87px)
│               │   │   ├── Frame 481009 "Criador" (61px)
│               │   │   ├── Frame 481007 "REVISOR" (62px)
│               │   │   ├── Frame 481008 "DATA DA CRIAÇÃO" (134px)
│               │   │   └── Frame 480993 "AÇÕES" (84px)
│               │   │
│               │   ├── Table Row (FRAME 1131x83) - LINHA DE DADOS 1
│               │   │   ├── Checkbox (18px)
│               │   │   ├── Frame 481123 "3" + "Inativa" (147px)
│               │   │   ├── Frame 481350 "EF06MA05, D6" (130px)
│               │   │   ├── Frame 481349 "6º ano, 7º ano, 8º ano" (126px)
│               │   │   ├── Frame 481123 (tópico - 155px)
│               │   │   ├── Frame 481473 "Avaliação" (79px)
│               │   │   ├── Frame 481475 "Canoas" (79px)
│               │   │   ├── Frame 481352 "MC" (61px)
│               │   │   ├── Frame 481353 "RF" (60px)
│               │   │   ├── Frame 481474 "27/05/2025 12:00:42" (134px)
│               │   │   └── Frame 481112 - AÇÕES (84px)
│               │   │       ├── Frame 1341 (botão)
│               │   │       ├── Frame 481259 (botão)
│               │   │       └── Frame 1342 (botão)
│               │   │
│               │   ├── Table Row (FRAME 1131x83) - LINHA DE DADOS 2
│               │   │   └── (mesma estrutura com 11 células)
│               │   │
│               │   └── Table Row (FRAME 1131x62) - LINHA DE DADOS 3
│               │       └── (mesma estrutura com 11 células)
│               │
│               └── Frame 480969 (FRAME 1131x48) - FOOTER DA TABELA
│                   ├── "Showing 1 to 7 of 10" (TEXT 324px)
│                   ├── Paginação-várias (FRAME 96x28)
│                   └── Paginação-1 página (INSTANCE 98x28)
│
├── Drop (FRAME 174x150) - COMPONENTE DE DROPDOWN
├── Tooltip-usuário (FRAME 72x24) - TOOLTIP
└── [Popover]Detalhe-Habilidade (FRAME 276x367) - POPOVER/MODAL
```

## Detalhamento dos Componentes

### 1. Global Header (1127x74)
- **Tipo**: Header fixo superior
- **Componentes**:
  - Logo/branding (Group 730)
  - Menu de navegação global
  - User menu/profile (Container)

### 2. Breadcrumb (516x24)
- **Tipo**: Navegação contextual
- **Estrutura**: Frame 24 → Frame 25
- **Posição**: Logo abaixo do header global

### 3. Menu Backoffice - Sidebar (265x996)
- **Tipo**: Navegação lateral fixa
- **Largura**: 265px
- **Altura**: 996px (full height)
- **Seções**:
  1. **Container** (logo/header da sidebar)
  2. **Gestão escolar** (section header)
     - Escolas
     - Container (item ativo?)
     - Livros (2x)
  3. **Gestão administrativa** (section header)
     - 8x Container (menu items)
     - Eventos

### 4. Container Principal (1131x851)
**Posição**: x=3144, y=20629

#### 4.1. Header da Página (1131x34)
- **Título**: "Todas as questões" (TEXT)
- **Ações**: Frame 481218 (botões/ações do header)

#### 4.2. Tab Navigation (1131x45)
- **Aba 1**: "Questões" (ativa)
- **Aba 2**: "Questões" (outra variação)
- **Aba 3**: "Análise TRI"

#### 4.3. Conteúdo (1131x752)

##### 4.3.1. Container de Estatísticas (1131x44)
- 3 elementos de estatísticas (cards/badges)

##### 4.3.2. Busca Tema - Área de Filtros (1131x362)

###### Linha 1 de Filtros (1091x70)
- **Filtro 1** (Frame 481310): "Área de Conhecimento"
  - Label: "Área de Conhecimento"
  - Placeholder: "Vincule a área do conhecimento"
  - Value: "Todas as áreas do conhecimento"
  - Width: 265.25px
- **Filtro 2** (Input): Width 265.25px
- **Filtro 3** (Input): Width 265.25px
- **Filtro 4** (Input): Width 265.25px

###### Linha 2 de Filtros (1091x156)
- **Frame 481793**: Full width (1091px)
- **Frame 481792**: Full width (1091px)

###### Botões de Ação (Frame 1352 - 1091x45)
- **Texto auxiliar**: "Vincule a área do conhecimento" (227px)
- **Botão 1** (Frame 481296): "Todas as áreas do conhecimento" (526.5px)
- **Botão 2** (Frame 481297): "Todas as áreas" (227.25px)
- **Botão 3** (Frame 481271): "1º ano, 2º ano..." (192.5px)
- **Badge** (status-mission): 59px
- **Icon**: ⭐️ (18px)

###### Campo de Busca (1091x21)
- 5 elementos (input + icon + clear + etc)

##### 4.3.3. Frame 481203 - Tabela (1131x326)

###### Table Structure (Frame 9078)

**Table Header** (1131x50) - 10 colunas:
1. **Checkbox**: 18px
2. **CÓDIGO**: 146px
3. **HABILIDADES**: 132px
4. **TÓPICO DE CONHECIMENTO**: 154px
5. **TIPO DE QUESTÃO**: 80px
6. **autoria**: 87px
7. **Criador**: 61px
8. **REVISOR**: 62px
9. **DATA DA CRIAÇÃO**: 134px
10. **AÇÕES**: 84px

**Total Width**: ~958px de colunas + gaps = 1131px

**Table Rows** (3 linhas visíveis):

**Linha 1** (83px height):
- Checkbox
- Código: "3" + Badge "Inativa"
- Habilidades: "EF06MA05", "D6" (badges)
- Tópico: "6º ano", "7º ano", "8º ano" (badges)
- Tipo: [conteúdo do tópico]
- Tipo Questão: "Avaliação"
- Autoria: "Canoas"
- Criador: "MC"
- Revisor: "RF"
- Data: "27/05/2025 12:00:42"
- Ações: 3 botões (Frame 1341, 481259, 1342)

**Linha 2** (83px height):
- Mesma estrutura, dados diferentes

**Linha 3** (62px height):
- Mesma estrutura, dados diferentes

**Table Footer** (Frame 480969 - 1131x48):
- **Contador**: "Showing 1 to 7 of 10" (324px)
- **Paginação múltipla**: Paginação-várias (96x28)
- **Paginação única**: Paginação-1 página (98x28)

### 5. Componentes Auxiliares

#### Drop (174x150)
- **Posição**: x=3162, y=20824
- Componente de dropdown (3 children)

#### Tooltip-usuário (72x24)
- **Posição**: x=3916, y=21112
- Tooltip do menu do usuário (2 children)

#### [Popover]Detalhe-Habilidade (276x367)
- **Posição**: x=3891, y=21171
- Modal/popover com detalhes de habilidade (5 children)

## Mapa de Cores Identificadas (do design-tokens-extraidos.md)

### Background
- **Page**: `#EFEFEF`
- **Card/Container**: `#FFFFFF`

### Borders
- **Default**: `#EBE9F1`
- **Input**: `#D8D6DE`

### Text
- **Primary**: `#6E6B7B`
- **Secondary**: `#5A5863`
- **Label**: `#5E5873`

### Brand
- **Primary**: `#7367F0`

### Status
- **Success**: `#28C76F`
- **Warning**: `#FF9F43`
- **Info**: `#00CFE8`
- **Danger**: `#EA5455`

### Typography
- **Font**: Montserrat
- **Weights**: 400, 500, 600, 700

### Spacing (8pt grid)
- Base: 8px
- Grid: 24px (3x base)

## Componentes de Design System Necessários

### Da biblioteca atual (`@prototipo/design-system`):
1. ✅ `Button` (primary, secondary, ghost)
2. ✅ `Input` (text, select, search)
3. ✅ `Checkbox`
4. ✅ `Badge` (status, info)
5. ❌ `Table` (precisa criar)
6. ❌ `Breadcrumb` (precisa criar)
7. ❌ `Tabs` (precisa criar)
8. ❌ `Pagination` (precisa criar)
9. ❌ `Dropdown` (precisa criar)
10. ❌ `Tooltip` (precisa criar)
11. ❌ `Popover` (precisa criar)

### Do Shadcn (permitido apenas em `/studio` e `/dashboard`):
- Não usar na página de jornada BackOffice
- Usar apenas componentes do design-system

## Próximos Passos

1. **Criar componentes faltantes no design-system**:
   - Table (header, body, row, cell)
   - Breadcrumb
   - Tabs
   - Pagination
   - Dropdown
   - Tooltip
   - Popover

2. **Reconstruir page.tsx com estrutura completa**:
   - Layout com sidebar (265px) + main (1131px)
   - Breadcrumb
   - Header com título + ações
   - Tabs de navegação
   - Área de filtros completa (4 filtros linha 1, 2 filtros linha 2, botões, busca)
   - Tabela com 10 colunas, dados mock, paginação
   - Componentes auxiliares (dropdown, tooltip, popover)

3. **Validar pixel-perfect**:
   - Usar Playwright para capturar screenshot
   - Comparar com Figma export
   - Ajustar spacing, cores, tipografia até match 100%
