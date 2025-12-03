# Sprint 4 - BackOffice Essentials & Storybook Branding

**Data de Início**: TBD  
**Duração Estimada**: 2 semanas  
**Objetivo**: Implementar 6 componentes BackOffice + customização completa do Storybook UI

---

## ✅ Status de Implementação

| Componente | Status | Registrado no Puck | Observações |
|-----------|--------|-------------------|-------------|
| Badge | ✅ Implementado | ✅ Sim | Componente completo e funcional |
| Alert | ⏳ Pendente | ⏳ Planejado | Documentado para implementação futura |
| Chip | ⏳ Pendente | ⏳ Planejado | Documentado para implementação futura |
| Avatar | ⏳ Pendente | ⏳ Planejado | Documentado para implementação futura |
| Stats Cards | ⏳ Pendente | ⏳ Planejado | Documentado para implementação futura |
| Dropdown | ⏳ Pendente | ⏳ Planejado | Documentado para implementação futura; usará Radix UI |

**Última atualização**: 03/12/2025

---

## 🎯 Objetivos do Sprint

1. **Componentes de Feedback**: Implementar Alerts, Badges, Chips para notificações e status
2. **Componentes de Identidade**: Implementar Avatars para representação de usuários
3. **Componentes de Dashboard**: Implementar Stats Cards para métricas visuais
4. **Navegação Avançada**: Implementar Menu/Dropdown para navegação contextual
5. **Branding Completo**: Customizar interface do Storybook com identidade EDUCACROSS (não é um componente)

**Meta de Fidelidade**: ≥92% (mantendo padrão Sprint 3: 93.75%)

---

## 📊 Componentes a Implementar (6 componentes)

### 1. Alerts (node-id=6586-46832)

**Prioridade**: Alta  
**Tier**: 2 (≥90% fidelidade)  
**Figma**: [Ver no Figma](https://www.figma.com/design/UstdVUNj2isUdfucUj5EAx/vuexy-figma-dashboard-ui-kit-and-builder-v4?node-id=6586-46832)

**Descrição**: Componente de alerta/notificação para feedback visual ao usuário.

**Variantes**:
- Success (verde)
- Warning (amarelo)
- Error (vermelho)
- Info (azul)

**Estados**:
- Default
- With icon
- With close button
- With action button
- Outlined variant

**Tokens Necessários**:
- Colors: success-500, warning-500, error-500, info-500
- Border radius: md (6px)
- Spacing: 3x (12px) padding
- Typography: body-md

**Arquivos**:
- `packages/design-system/src/components/Alert/Alert.tsx`
- `packages/design-system/src/components/Alert/Alert.module.css`
- `domains/storybook/src/stories/Feedback/Alert.stories.tsx`

**Estimativa**: 4 horas (2h dev + 1h stories + 1h validation)

---

### 2. Badges (node-id=6586-47073)

**Prioridade**: Alta  
**Tier**: 2 (≥90% fidelidade)  
**Figma**: [Ver no Figma](https://www.figma.com/design/UstdVUNj2isUdfucUj5EAx/vuexy-figma-dashboard-ui-kit-and-builder-v4?node-id=6586-47073)

**Descrição**: Pequenos rótulos para status, contagem ou categorização.

**Variantes**:
- Primary
- Secondary
- Success
- Warning
- Error
- Neutral

**Estados**:
- Default
- Dot (apenas cor, sem texto)
- With icon
- Outlined
- Soft (background transparente)

**Tokens Necessários**:
- Colors: primary-600, success-500, warning-500, error-500
- Border radius: sm (2px) ou full (9999px)
- Spacing: 1x (4px) padding horizontal, 0.5x (2px) vertical
- Typography: label-sm (10-12px)

**Arquivos**:
- `packages/design-system/src/components/Badge/Badge.tsx`
- `packages/design-system/src/components/Badge/Badge.module.css`
- `domains/storybook/src/stories/DataDisplay/Badge.stories.tsx`

**Estimativa**: 3 horas (1.5h dev + 1h stories + 0.5h validation)

---

### 3. Chips (node-id=6595-48177)

**Prioridade**: Média  
**Tier**: 2 (≥90% fidelidade)  
**Figma**: [Ver no Figma](https://www.figma.com/design/UstdVUNj2isUdfucUj5EAx/vuexy-figma-dashboard-ui-kit-and-builder-v4?node-id=6595-48177)

**Descrição**: Elementos compactos para seleção, filtros ou tags.

**Variantes**:
- Default (filled)
- Outlined
- With avatar
- With icon
- Deletable (com X)

**Estados**:
- Default
- Hover
- Active/Selected
- Disabled

**Tokens Necessários**:
- Colors: primary-600, neutral-100 to 300
- Border radius: full (9999px) ou md (6px)
- Spacing: 2x (8px) padding horizontal
- Typography: body-sm

**Arquivos**:
- `packages/design-system/src/components/Chip/Chip.tsx`
- `packages/design-system/src/components/Chip/Chip.module.css`
- `domains/storybook/src/stories/DataDisplay/Chip.stories.tsx`

**Estimativa**: 4 horas (2h dev + 1h stories + 1h validation)

---

### 4. Avatars (node-id=6586-47137)

**Prioridade**: Alta  
**Tier**: 2 (≥90% fidelidade)  
**Figma**: [Ver no Figma](https://www.figma.com/design/UstdVUNj2isUdfucUj5EAx/vuexy-figma-dashboard-ui-kit-and-builder-v4?node-id=6586-47137)

**Descrição**: Representação visual de usuários ou entidades.

**Variantes**:
- Image (foto do usuário)
- Initials (letras do nome)
- Icon (ícone genérico)
- Group (múltiplos avatares sobrepostos)

**Tamanhos**:
- xs (24px)
- sm (32px)
- md (40px)
- lg (64px)
- xl (96px)

**Estados**:
- Default
- With status indicator (online/offline/away/busy)
- With badge (notificações)

**Tokens Necessários**:
- Colors: primary-600 (background fallback), neutral-100 (text)
- Border radius: full (9999px)
- Spacing: 0 (sem padding interno)
- Typography: body-md para initials

**Arquivos**:
- `packages/design-system/src/components/Avatar/Avatar.tsx`
- `packages/design-system/src/components/Avatar/AvatarGroup.tsx`
- `packages/design-system/src/components/Avatar/Avatar.module.css`
- `domains/storybook/src/stories/DataDisplay/Avatar.stories.tsx`

**Estimativa**: 5 horas (2.5h dev + 1.5h stories + 1h validation)

---

### 5. Stats Cards (node-id=150-138964)

**Prioridade**: Alta  
**Tier**: 1 (≥95% fidelidade) - Componente crítico para dashboards  
**Figma**: [Ver no Figma](https://www.figma.com/design/UstdVUNj2isUdfucUj5EAx/vuexy-figma-dashboard-ui-kit-and-builder-v4?node-id=150-138964)

**Descrição**: Cards especializados para exibir métricas e KPIs.

**Variantes**:
- Simple (número + label)
- With trend (+ indicador de crescimento/queda)
- With icon
- With chart (mini sparkline)
- With comparison (valor atual vs anterior)

**Elementos**:
- Título/label
- Valor principal (número grande)
- Trend indicator (%, arrow up/down)
- Icon (opcional)
- Mini chart (opcional)
- Subtitle/description

**Tokens Necessários**:
- Colors: primary-600, success-500, error-500, neutral-700
- Border radius: md (6px)
- Spacing: 4x (16px) padding
- Typography: heading-lg (número), body-md (label)
- Shadows: md

**Arquivos**:
- `packages/design-system/src/components/StatsCard/StatsCard.tsx`
- `packages/design-system/src/components/StatsCard/StatsCard.module.css`
- `domains/storybook/src/stories/Dashboard/StatsCard.stories.tsx`

**Estimativa**: 6 horas (3h dev + 2h stories + 1h validation)

---

### 6. Menu/Dropdown (node-id=7232-42750)

**Prioridade**: Alta  
**Tier**: 2 (≥90% fidelidade)  
**Figma**: [Ver no Figma](https://www.figma.com/design/UstdVUNj2isUdfucUj5EAx/vuexy-figma-dashboard-ui-kit-and-builder-v4?node-id=7232-42750)

**Descrição**: Menu contextual dropdown para navegação e ações.

**Variantes**:
- Simple menu (lista de opções)
- With icons
- With dividers
- With submenus (nested)
- With shortcuts (keyboard)

**Estados**:
- Closed (trigger button)
- Open (menu visível)
- Item hover
- Item active/selected
- Item disabled

**Tokens Necessários**:
- Colors: primary-600 (hover), neutral-100 (background)
- Border radius: md (6px)
- Spacing: 2x (8px) item padding
- Typography: body-md
- Shadows: lg (dropdown elevation)

**Arquivos**:
- `packages/design-system/src/components/Dropdown/Dropdown.tsx`
- `packages/design-system/src/components/Dropdown/DropdownMenu.tsx`
- `packages/design-system/src/components/Dropdown/DropdownItem.tsx`
- `packages/design-system/src/components/Dropdown/Dropdown.module.css`
- `domains/storybook/src/stories/Navigation/Dropdown.stories.tsx`

**Estimativa**: 7 horas (3.5h dev + 2h stories + 1.5h validation)

**Notas Técnicas**:
- Usar Radix UI Dropdown Menu como base (acessibilidade)
- Posicionamento: Popper.js ou similar para auto-ajuste
- Keyboard navigation (arrow keys, Enter, Escape)
- Focus trap quando aberto

---

## 🎨 Tarefa 7: Storybook UI Customization

**Prioridade**: Alta  
**Tipo**: Infraestrutura + Branding  
**Estimativa**: 8 horas

### Objetivos

1. **Identidade Visual EDUCACROSS**: Logo, cores, tipografia
2. **Experiência Consistente**: Tema alinhado com Design System
3. **Documentação Rica**: Página de introdução e guias
4. **Navegação Otimizada**: Ordem lógica de componentes

### Tarefas Detalhadas

#### 7.1 Criar Manager Theme (2h)

**Arquivo**: `domains/storybook/.storybook/manager.ts`

```typescript
import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const educacrossTheme = create({
  base: 'light',
  
  // Branding
  brandTitle: 'EDUCACROSS Design System',
  brandUrl: 'https://educacross.com',
  brandImage: '/branding/logo-educacross.svg',
  brandTarget: '_self',
  
  // UI Colors (Vuexy tokens)
  colorPrimary: '#5f4de5',      // primary-600
  colorSecondary: '#5f4de5',
  
  // Layout
  appBg: '#f8f9fa',             // neutral-50
  appContentBg: '#ffffff',
  appBorderColor: '#e5e7eb',    // neutral-200
  appBorderRadius: 6,
  
  // Typography
  fontBase: '"Montserrat", sans-serif',
  fontCode: '"Fira Code", monospace',
  
  // Text
  textColor: '#1f2937',         // neutral-800
  textInverseColor: '#ffffff',
  
  // Toolbar
  barTextColor: '#6b7280',      // neutral-500
  barSelectedColor: '#5f4de5',
  barBg: '#ffffff',
  
  // Form
  inputBg: '#ffffff',
  inputBorder: '#d1d5db',       // neutral-300
  inputTextColor: '#1f2937',
  inputBorderRadius: 6,
});

addons.setConfig({
  theme: educacrossTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
});
```

**Validação**:
- [ ] Logo EDUCACROSS aparece no canto superior esquerdo
- [ ] Cores primary (#5f4de5) aplicadas em seleções e links
- [ ] Montserrat aplicada em toda interface
- [ ] Border radius 6px consistente

---

#### 7.2 Customizar Manager Head (1h)

**Arquivo**: `domains/storybook/.storybook/manager-head.html`

```html
<link rel="icon" type="image/svg+xml" href="/branding/logo-educacross.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<style>
  /* Custom sidebar styling */
  #storybook-explorer-menu {
    font-family: 'Montserrat', sans-serif;
  }
  
  /* Gradient header */
  .sidebar-header {
    background: linear-gradient(135deg, #5f4de5 0%, #8b7cf6 100%);
    padding: 16px;
    margin-bottom: 8px;
  }
  
  /* Logo sizing */
  .sidebar-header img {
    max-height: 40px;
    width: auto;
  }
</style>
```

**Validação**:
- [ ] Favicon customizado aparece na aba do navegador
- [ ] Montserrat carrega corretamente
- [ ] Header com gradiente aplicado (se visível)

---

#### 7.3 Atualizar Preview Configuration (2h)

**Arquivo**: `domains/storybook/.storybook/preview.ts`

```typescript
import type { Preview } from '@storybook/react';
import '@prototipo/tokens/dist/tokens.css';
import '../src/styles/storybook-globals.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'educacross-light',
      values: [
        { name: 'educacross-light', value: '#f8f9fa' },
        { name: 'educacross-dark', value: '#1f2937' },
        { name: 'white', value: '#ffffff' },
        { name: 'primary', value: '#5f4de5' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Design Tokens',
          ['Colors', 'Typography', 'Spacing', 'Shadows'],
          'Core Components',
          ['Button', 'Card', 'Badge', 'Alert', 'Avatar'],
          'Forms',
          ['Input', 'Select', 'Checkbox', 'Radio', 'Switch'],
          'Data Display',
          ['DataTable', 'Chip', 'Pagination', 'Breadcrumb'],
          'Navigation',
          ['Tabs', 'Sidebar', 'Dropdown'],
          'Dashboard',
          ['StatsCard', 'HealthIndicator', 'Leaderboard'],
          'Feedback',
          ['Modal', 'Alert'],
          'Layout',
        ],
      },
    },
  },
};

export default preview;
```

**Arquivo**: `domains/storybook/src/styles/storybook-globals.css`

```css
/* Global Storybook styles */
body {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Code blocks */
code, pre {
  font-family: 'Fira Code', monospace;
}

/* Story container */
.sb-show-main {
  background: var(--colors-neutral-50, #f8f9fa);
}
```

**Validação**:
- [ ] Backgrounds EDUCACROSS disponíveis no toolbar
- [ ] Ordem de stories seguindo estrutura lógica
- [ ] Montserrat aplicada em stories

---

#### 7.4 Criar Página de Introdução (2h)

**Arquivo**: `domains/storybook/src/stories/Introduction.mdx`

```mdx
import { Meta } from '@storybook/blocks';
import Logo from '../../public/branding/logo-educacross.svg';

<Meta title="Introduction" />

<div style={{ textAlign: 'center', padding: '40px 20px' }}>
  <img src={Logo} alt="EDUCACROSS" style={{ maxWidth: '300px', marginBottom: '32px' }} />
  
  <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>
    EDUCACROSS Design System
  </h1>
  
  <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '48px' }}>
    Componentes React reutilizáveis baseados no template Vuexy Dashboard UI Kit v4
  </p>
</div>

---

## 🎨 Princípios de Design

### Consistência Visual
Todos os componentes seguem **≥90% de fidelidade** ao Figma Vuexy, garantindo uma experiência visual coesa e profissional.

### Acessibilidade em Primeiro Lugar
- **WCAG AA mínimo** em todos os componentes
- Navegação por teclado completa
- Suporte a leitores de tela
- Contrast ratios adequados

### Performance Otimizada
- CSS Modules para estilos escopados
- Tree-shaking automático
- Compatível com React Server Components
- Tamanho de bundle otimizado

---

## 🚀 Como Usar

### Instalação

```bash
pnpm add @prototipo/design-system @prototipo/tokens
```

### Importar Componentes

```tsx
import { Button, Card, Alert } from '@prototipo/design-system';
import '@prototipo/tokens/dist/tokens.css';

function App() {
  return (
    <Card>
      <Alert variant="success">Bem-vindo ao EDUCACROSS!</Alert>
      <Button variant="primary">Começar</Button>
    </Card>
  );
}
```

### Design Tokens

Todos os componentes consomem tokens CSS do sistema:

```css
/* Cores */
--colors-primary-600: #5f4de5;
--colors-success-500: #22c55e;

/* Tipografia */
--typography-fontFamily-sans: 'Montserrat';

/* Espaçamento */
--spacing-4: 16px;

/* Border Radius */
--borderRadius-md: 6px;
```

---

## 📊 Status de Implementação

- **Total de Componentes**: 44
- **Implementados**: 22 (50%)
- **Fidelidade Média**: 93.75%
- **Componentes 100%**: 15/16

### Próximos Componentes (Sprint 4)
- Alerts
- Badges
- Chips
- Avatars
- Stats Cards
- Menu/Dropdown

---

## 🔗 Links Úteis

- [Figma Vuexy v4](https://www.figma.com/design/UstdVUNj2isUdfucUj5EAx/vuexy-figma-dashboard-ui-kit-and-builder-v4?node-id=870-37366)
- [Constitution](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/blob/main/.specify/memory/constitution.md)
- [Figma Reference](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/blob/main/.specify/memory/figma-vuexy-reference.md)

---

## 👥 Equipe EDUCACROSS

Design System mantido pela equipe de desenvolvimento da EDUCACROSS.

**Versão**: 1.0.0  
**Última Atualização**: Novembro 2025
```

**Validação**:
- [ ] Logo EDUCACROSS renderiza corretamente
- [ ] Tipografia Montserrat aplicada
- [ ] Links funcionam
- [ ] Código syntax highlight correto

---

#### 7.5 Criar Favicon (1h)

**Opção A: Converter SVG para ICO**

```bash
# Usando ImageMagick (se disponível)
convert domains/storybook/public/branding/logo-educacross.svg \
  -resize 32x32 \
  domains/storybook/public/branding/favicon.ico

# Ou usar serviço online: https://convertio.co/svg-ico/
```

**Opção B: Usar SVG diretamente**

```bash
cp domains/storybook/public/branding/logo-educacross.svg \
   domains/storybook/public/branding/favicon.svg
```

Atualizar `manager-head.html`:
```html
<link rel="icon" type="image/svg+xml" href="/branding/favicon.svg" />
```

**Validação**:
- [ ] Favicon aparece na aba do navegador
- [ ] Tamanho adequado (32x32px ou 64x64px)
- [ ] Funciona em Chrome, Firefox, Safari

---

### Checklist de Validação - Storybook Customization

- [ ] **Manager theme**: Logo e cores aplicadas
- [ ] **Favicon**: Aparece na aba do navegador
- [ ] **Introduction page**: Renderiza corretamente
- [ ] **Story order**: Organização lógica aplicada
- [ ] **Backgrounds**: Opções EDUCACROSS disponíveis
- [ ] **Typography**: Montserrat em toda interface
- [ ] **Border radius**: 6px consistente
- [ ] **Primary color**: #5f4de5 em seleções e links
- [ ] **Console limpo**: Sem erros ou warnings
- [ ] **Build OK**: `pnpm build:storybook` funciona

---

## 📈 Estimativas e Cronograma

### Tempo Total Estimado: 37 horas

| Componente | Dev | Stories | Validation | Total |
|------------|-----|---------|------------|-------|
| Alerts | 2h | 1h | 1h | 4h |
| Badges | 1.5h | 1h | 0.5h | 3h |
| Chips | 2h | 1h | 1h | 4h |
| Avatars | 2.5h | 1.5h | 1h | 5h |
| Stats Cards | 3h | 2h | 1h | 6h |
| Menu/Dropdown | 3.5h | 2h | 1.5h | 7h |
| Storybook UI | - | - | - | 8h |
| **TOTAL** | **14.5h** | **8.5h** | **6h** | **37h** |

### Cronograma (2 semanas)

**Semana 1**:
- Dia 1-2: Alerts + Badges + Chips (11h)
- Dia 3-4: Avatars + Stats Cards (11h)
- Dia 5: Storybook UI (Parte 1: Manager + Head) (4h)

**Semana 2**:
- Dia 6-7: Menu/Dropdown (7h)
- Dia 8-9: Storybook UI (Parte 2: Preview + Intro) (4h)
- Dia 10: Validação completa, screenshots, documentação (8h)

---

## 🎯 Definição de Pronto (DoD)

Um componente é considerado **COMPLETO** quando:

### Código
- [ ] TypeScript strict (sem `any`)
- [ ] ESLint clean (sem warnings)
- [ ] Props documentadas com JSDoc
- [ ] 'use client' presente
- [ ] React.forwardRef implementado (se aplicável)
- [ ] Exportado em `packages/design-system/src/index.ts`

### Storybook
- [ ] Story criada em `domains/storybook/src/stories/`
- [ ] Todas variantes cobertas
- [ ] Estados interativos demonstrados
- [ ] Args controls configurados
- [ ] Documentação/description presente

### Puck
- [ ] Registrado em `puck.config.tsx`
- [ ] Props configuráveis
- [ ] Preview funcional

### Validação
- [ ] Fidelidade Figma ≥90% (Playwright)
- [ ] Screenshot capturado
- [ ] Comparação lado-a-lado (Figma vs Storybook)
- [ ] Montserrat confirmado
- [ ] Cores corretas (rgb values)
- [ ] Border radius correto (6px padrão)

### Build & Quality
- [ ] `pnpm build:tokens` OK
- [ ] `pnpm --filter @prototipo/design-system build` OK
- [ ] `pnpm lint` clean
- [ ] `pnpm -r type-check` passa
- [ ] Console limpo (sem errors)

### Documentação
- [ ] `figma-vuexy-reference.md` atualizado (⏳ → ✅)
- [ ] Fidelity score documentado
- [ ] Figma node-id citado

### Acessibilidade
- [ ] Semantic HTML
- [ ] Keyboard navigation
- [ ] ARIA labels (quando necessário)
- [ ] Focus visible
- [ ] Color contrast WCAG AA

---

## 🔗 Referências

- **Constitution**: `.specify/memory/constitution.md` (v1.1.0)
- **Figma Reference**: `.specify/memory/figma-vuexy-reference.md`
- **Validation Checklist**: `.specify/memory/figma-validation-checklist.md`
- **Vuexy Figma**: [UstdVUNj2isUdfucUj5EAx](https://www.figma.com/design/UstdVUNj2isUdfucUj5EAx/vuexy-figma-dashboard-ui-kit-and-builder-v4?node-id=870-37366)

---

**Preparado por**: Equipe EDUCACROSS  
**Data**: 29/11/2025  
**Versão**: 1.0.0
