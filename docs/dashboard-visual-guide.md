# Dashboard UI - Representação Visual

Este documento descreve a estrutura visual do Dashboard implementado.

## Layout Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Dashboard                                                      │
│  Visão geral das páginas e indicadores do Studio              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Indicadores de Saúde                                          │
│                                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐          │
│  │ Total   │  │ Domínios│  │ Build   │  │Storybook│          │
│  │ Páginas │  │ Ativos  │  │ Status  │  │ Status  │          │
│  │    3    │  │    2    │  │✓ Sucesso│  │✓ Online │          │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Páginas por Domínio                                           │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │▌BackOffice │  │▌FrontOffice│  │▌Game        │           │
│  │    2       │  │    0       │  │    0        │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Páginas (3)                    [Todos os domínios ▼]          │
│                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────┐             │
│  │ BackOffice · Revisão│  │ BackOffice · Revisão│             │
│  │ de Questões · Lista │  │ de Questões · Detalhe│            │
│  │ /backoffice/...     │  │ /backoffice/...     │             │
│  │ [BackOffice]        │  │ [BackOffice]        │             │
│  │                     │  │                     │             │
│  │ [Editar no Studio]  │  │ [Editar no Studio]  │             │
│  │ [Visualizar]        │  │ [Visualizar]        │             │
│  │                     │  │                     │             │
│  │ Atualizado: 21/11   │  │ Atualizado: 21/11   │             │
│  └─────────────────────┘  └─────────────────────┘             │
│                                                                 │
│  ┌─────────────────────┐                                       │
│  │ Página Inicial      │                                       │
│  │ /home               │                                       │
│  │ [Other]             │                                       │
│  │                     │                                       │
│  │ [Editar no Studio]  │                                       │
│  │ [Visualizar]        │                                       │
│  │                     │                                       │
│  │ Atualizado: 21/11   │                                       │
│  └─────────────────────┘                                       │
└─────────────────────────────────────────────────────────────────┘
```

## Estrutura de Componentes

### 1. Header
- Título "Dashboard" (h1, tamanho 3xl, bold)
- Subtítulo explicativo (muted color)

### 2. Indicadores de Saúde (Grid 4 colunas)
Cada card mostra:
- Label do indicador (texto pequeno, muted)
- Valor principal (texto grande 3xl, bold)
- Cor baseada no status:
  - Verde (success) para "success" e "online"
  - Amarelo (warning) para "building"
  - Vermelho (error) para "failed" e "offline"

### 3. Resumo por Domínio (Grid flex)
Cada card de domínio mostra:
- Barra colorada lateral (8px de largura)
- Nome do domínio
- Contador de páginas (texto 2xl, bold)
- Cores por domínio:
  - BackOffice: Azul (#3b82f6)
  - FrontOffice: Verde (#10b981)
  - Game: Laranja (#f59e0b)
  - Other: Cinza (#6b7280)

### 4. Lista de Páginas
Header:
- Título "Páginas (n)" à esquerda
- Filtro dropdown à direita

Cards de página (Grid responsivo):
- Nome da página (lg, semibold)
- Slug (sm, muted)
- Badge de domínio (xs, colored background)
- Descrição (quando disponível, 2 linhas max)
- Botões de ação:
  - "Editar no Studio" (primary, small)
  - "Visualizar" (outline, small)
- Metadata no rodapé:
  - Data de atualização (xs, muted)

### Estados

**Loading:**
```
┌─────────────────────────────────────┐
│                                     │
│    Carregando dashboard...          │
│                                     │
└─────────────────────────────────────┘
```

**Erro:**
```
┌─────────────────────────────────────┐
│                                     │
│  ✗ Erro ao carregar dashboard       │
│  [mensagem de erro]                 │
│                                     │
└─────────────────────────────────────┘
```

**Sem resultados (após filtro):**
```
┌─────────────────────────────────────┐
│                                     │
│  Nenhuma página encontrada          │
│  no domínio [nome]                  │
│                                     │
└─────────────────────────────────────┘
```

## Interações

1. **Filtro por Domínio**
   - Clique no dropdown
   - Selecione domínio
   - Lista filtra instantaneamente
   - Contador atualiza

2. **Editar Página**
   - Clique em "Editar no Studio"
   - Redireciona para `/studio?page=[slug]`
   - Página carrega no editor Puck

3. **Visualizar Página**
   - Clique em "Visualizar"
   - Redireciona para `/pages/[slug]`
   - Página renderizada com Puck Render

4. **Hover nos Cards**
   - Card eleva levemente (translateY -2px)
   - Sombra aumenta
   - Transição suave (0.2s)

## Responsividade

**Desktop (>768px):**
- Health indicators: 4 colunas
- Domain cards: 3-4 colunas (auto-fit)
- Page cards: 3 colunas (auto-fill, min 320px)

**Mobile (<768px):**
- Health indicators: 2 colunas
- Domain cards: 2 colunas
- Page cards: 1 coluna
- Filtro ocupa largura total
- Padding reduzido

## Acessibilidade

- Elementos semânticos (header, section)
- Headings hierárquicos (h1, h2)
- Labels descritivos
- Cores com contraste adequado
- Estados de foco visíveis (via design system)
- ARIA attributes nos componentes base

## Performance

- Fetch único na montagem do componente
- Filtragem client-side (sem requests adicionais)
- CSS Modules (scoped, otimizado)
- Build otimizado: ~3.2 kB de JS específico da página
