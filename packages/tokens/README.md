# @prototipo/tokens

Pacote de design tokens para o sistema de prototipação EDUCACROSS.

## Uso

### CSS Variables

```css
@import '@prototipo/tokens/tokens.css';

.my-component {
  color: var(--colors-primary-500);
  padding: var(--spacing-4);
  border-radius: var(--borderRadius-md);
}
```

### JavaScript/TypeScript

```typescript
import tokens from '@prototipo/tokens';

const primaryColor = tokens.colors.primary[500];
const spacing = tokens.spacing[4];
```

## Scripts

- `pnpm build` - Gera os tokens em CSS e JS
- `pnpm dev` - Modo watch para desenvolvimento
