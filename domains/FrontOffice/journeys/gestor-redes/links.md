# Links e Referências - Gestor de Redes

## 📋 Documentação

- **PRD Principal:** [`README.md`](./README.md) - Objetivos, user stories e especificações de componentes
- **Guia de Protótipo:** [`PROTOTIPO.md`](./PROTOTIPO.md) - Como acessar e testar o protótipo navegável
- **Notas de Dev:** [`notas.md`](./notas.md) - Detalhes técnicos, testes e troubleshooting

## 🎨 Design System

- **Componentes usados:**
  - Button - `packages/design-system/src/components/Button/`
  - Card - `packages/design-system/src/components/Card/`
  - Badge - `packages/design-system/src/components/Badge/`
  - Progress - `packages/design-system/src/components/Progress/`
  - Select - `packages/design-system/src/components/Select/`
  - Input - `packages/design-system/src/components/Input/`
  - Text - `packages/design-system/src/components/Text/`
  - Modal - `packages/design-system/src/components/Modal/`
  - Layout - `packages/design-system/src/components/Layout/`

- **Design Tokens:** `packages/tokens/src/tokens.json`
  - Cores: `--color-success`, `--color-warning`, `--color-error`
  - Spacing: `--spacing-sm`, `--spacing-md`, `--spacing-lg`
  - Tipografia: Variáveis de font-size e weight

## 🧩 Componentes Implementados

```
domains/FrontOffice/journeys/gestor-redes/
├── page.tsx (546 linhas)
│   └── GestorRedesPage: Página principal navegável
│       ├── Header (título + info)
│       ├── Filtros (Grupo, Ano, Período)
│       ├── KPI Grid (4 cards)
│       ├── Tabela de Escolas (paginada)
│       └── Modal (condicional)
│
├── tela-painel-inicial.tsx (335 linhas)
│   └── PainelInicialGestorRedes: Componente original (separado)
│
├── modal-detalhes-acesso.tsx (176 linhas)
│   └── ModalDetalhesAcesso: Modal com 6 tipos de interação
│       ├── Header (título + base de cálculo)
│       ├── Lista de Interações (com progress bars)
│       └── Aviso (sobreposição de dados)
│
└── gestor-redes.module.css (450+ linhas)
    └── Estilos completos + responsividade
```

## 🔗 Integrações Relacionadas

### Puck Page Builder
- **Arquivo:** `domains/studio/src/config/puck.config.tsx`
- **Status:** Pode ser integrado para edição visual (opcional para MVP)
- **Nota:** Aguarda registro de componentes personalizados

### Storybook Stories
- **Localização esperada:** `domains/storybook/src/stories/GestorRedes.stories.tsx`
- **Status:** A criar
- **Referência:** `domains/storybook/src/stories/DataTable.stories.tsx`

### API Endpoints (Futuros)
- `GET /api/dashboard/summary` - Dados consolidados
- `GET /api/schools/list` - Lista de escolas com filtros
- `GET /api/interactions/details` - Detalhes por tipo de interação

## 🧪 Testes

### Unit Tests (Vitest)
- Arquivo sugerido: `gestor-redes.test.tsx`
- Testes a considerar:
  - Render sem erros
  - Filtro atualiza lista
  - Modal abre/fecha
  - Paginação funciona

### E2E Tests (Playwright)
- Arquivo sugerido: `gestor-redes.e2e.spec.ts`
- Caminhos críticos:
  - Usuário navega e abre modal
  - Usuário filtra e busca escolas
  - Usuário pagina tabela

## 📊 Mock Data

- **Fonte:** Dados inline em `page.tsx`
- **Escolas:** 10 registros em 5 grupos diferentes
- **KPIs:** 4 métricas (Alunos, Professores, Diretores, Coordenadores)
- **Interações:** 6 tipos no modal

**Próximo passo:** Conectar com endpoints de API real

## 🚀 Deploy & Release

- **Sprint:** Sprint 6
- **Feature Branch:** `feature/sprint6-execution`
- **PR:** A criar quando pronto
- **Targets:** 
  - Staging: validação visual
  - Production: após aprovação

## 📞 Contato & Responsabilidades

- **Desenvolvimento:** Copilot / Equipe Frontend
- **Design:** Tim de Design (Figma)
- **QA:** Time de Testes
- **PM:** Fabio (Aprovação)

## 🔍 Padrões & Convenções

- **Naming:** camelCase para variáveis, PascalCase para componentes
- **CSS:** CSS Modules com pattern `[name]_[local]_[hash]`
- **Props:** Fully typed com TypeScript interfaces
- **Accessibility:** Usar atributos ARIA quando relevante

## 📈 Roadmap Futuro

1. **V0.2:** Conectar com dados reais de API
2. **V0.3:** Adicionar gráficos (charts) para análise temporal
3. **V0.4:** Exportação em Excel com formatação
4. **V0.5:** Comparação entre períodos
5. **V1.0:** Integração com Figma para sync de design

---

**Atualizado:** 2025-12-05  
**Versão:** 0.1.0-beta
