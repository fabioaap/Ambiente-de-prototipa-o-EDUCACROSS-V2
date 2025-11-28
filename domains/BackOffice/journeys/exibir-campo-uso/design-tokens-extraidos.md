# Design Tokens Extraídos do Figma

**Arquivo:** Sz4z0rpDmocXZ8LylxEgqF  
**Nó:** 8565:17355  
**Data extração:** 28/11/2025

## 🎨 Cores

### Background
- **Página (Background):** `rgb(239, 239, 239)` / `#EFEFEF` → `rgba(0.938, 0.938, 0.938, 1)`
- **Card/Tabela (Background):** `rgb(255, 255, 255)` / `#FFFFFF` → Branco puro

### Texto
- **Body Text (padrão):** `rgb(110, 107, 123)` / `#6E6B7B` → `rgba(0.431, 0.420, 0.482, 1)`
- **Heading Text:** `rgb(90, 88, 99)` (similar ao body, mais escuro)
- **White Text (badges):** `rgb(255, 255, 255)` / `#FFFFFF`

### Cores Primárias
- **Primary:** `rgb(115, 103, 240)` / `#7367F0` → usado em botões, links
- **Secondary:** Similar ao body text

### Bordas
- **Border Input:** `rgb(235, 233, 241)` / `#EBE9F1` → `rgba(0.922, 0.914, 0.945, 1)`
- **Border Light:** Mesma cor acima, usada em divisores de tabela

### Estados
- **Success (verde):** `rgb(40, 199, 111)` / `#28C76F` → `rgba(0.157, 0.780, 0.435, 1)` aprox
- **Warning (amarelo):** `rgb(255, 159, 67)` / `#FF9F43` → `rgba(1.0, 0.624, 0.263, 1)` aprox
- **Danger (vermelho):** `rgb(234, 84, 85)` / `#EA5455` → `rgba(0.918, 0.329, 0.333, 1)` aprox
- **Info (azul):** Similar ao Primary

### Badges/Labels (cores das redes - do mock)
- **Canoas (azul):** `#2563EB`
- **Porto Alegre (vermelho):** `#DC2626`
- **Gravataí (verde):** `#059669`

## 📐 Espaçamentos

### Grid Layout
- **Colunas:** 16 colunas
- **Largura coluna:** 64.5px
- **Gutter (espaço entre):** 24px
- **Offset lateral:** 24px

### Padding/Margin
- **Card Shadow:** offset `(0, 4px)`, radius `24px`, opacity `0.06`
- **Espaçamento padrão:** 16px, 24px (baseado no grid)

## 🔤 Tipografia

### Fonte
- **Família:** Montserrat
- **Pesos disponíveis:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

### Tamanhos e Line Heights

#### Heading H5 (títulos de card)
- **Tamanho:** 15px
- **Peso:** 500 (Medium)
- **Line height:** 24px (160%)
- **Letter spacing:** 0
- **Exemplo:** Títulos dentro de badges

#### Body Paragraph (texto padrão)
- **Tamanho:** 14px
- **Peso:** 400 (Regular)
- **Line height:** 21px (150%)
- **Letter spacing:** 0
- **Cor:** #6E6B7B

#### Body Paragraph Bold (texto em negrito)
- **Tamanho:** 14px
- **Peso:** 700 (Bold)
- **Line height:** 21px (150%)
- **Letter spacing:** 0

#### Paragraph Small (texto pequeno)
- **Tamanho:** 13px ou 12px
- **Peso:** 400 (Regular)
- **Line height:** proporcional

#### Table Header (cabeçalho de tabela)
- **Tamanho:** 12px - 14px
- **Peso:** 600 (SemiBold) ou 700 (Bold)
- **Transform:** uppercase (possivelmente)
- **Cor:** #6E6B7B (body text)

## 🧩 Componentes

### Badge
- **Padding:** 6px 12px (aproximado)
- **Border radius:** 4px - 6px
- **Background:** Cor sólida (Primary, Success, Danger, etc.)
- **Text color:** White (#FFFFFF)
- **Font size:** 12px - 13px
- **Font weight:** 500 (Medium) ou 600 (SemiBold)

### Card/Table Container
- **Background:** White (#FFFFFF)
- **Border:** 1px solid #EBE9F1
- **Border radius:** 6px - 8px
- **Shadow:** `0 4px 24px rgba(0, 0, 0, 0.06)`
- **Padding interno:** 24px (típico)

### Table Row
- **Border bottom:** 1px solid #EBE9F1
- **Padding vertical:** 12px - 16px
- **Hover state:** Background light gray ou transparent

### Breadcrumb
- **Separator:** Chevron right icon
- **Font size:** 14px
- **Color:** #6E6B7B
- **Active/last item:** cor primary ou mais escura

## 📊 Dimensões Absolutas (referência)

- **Página total:** 1440px x 996px
- **Card exemplo:** 276px x 367px
- **Posicionamento:** offset (24px, 24px) do container

## 🎯 Aplicação Recomendada

### CSS Variables
```css
:root {
  /* Colors */
  --color-background: #EFEFEF;
  --color-background-card: #FFFFFF;
  --color-text-body: #6E6B7B;
  --color-text-heading: #5A5863;
  --color-primary: #7367F0;
  --color-border: #EBE9F1;
  --color-success: #28C76F;
  --color-warning: #FF9F43;
  --color-danger: #EA5455;
  
  /* Typography */
  --font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-base: 14px;
  --font-size-small: 12px;
  --font-size-h5: 15px;
  --line-height-base: 1.5;
  --line-height-heading: 1.6;
  
  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Border */
  --border-radius: 6px;
  --border-width: 1px;
  
  /* Shadow */
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.06);
}
```

### Componentes React (inline styles)
```tsx
const styles = {
  page: { 
    backgroundColor: '#EFEFEF',
    minHeight: '100vh',
    fontFamily: 'Montserrat, sans-serif'
  },
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #EBE9F1',
    borderRadius: '6px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
    padding: '24px'
  },
  text: {
    fontSize: '14px',
    lineHeight: '21px',
    color: '#6E6B7B'
  },
  badge: {
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#FFFFFF'
  }
}
```
