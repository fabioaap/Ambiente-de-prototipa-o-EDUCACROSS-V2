# @prototipo/tokens

Pacote de design tokens do repositório de prototipação EDUCACROSS.

## Estrutura

- `src/tokens.json` - Definição base dos tokens
- `scripts/build-tokens.mjs` - Script de build
- `dist/` - Outputs compilados (gerados automaticamente)

## Uso

### CSS Variables

```css
@import '@prototipo/tokens/tokens.css';

.button {
  background-color: var(--color-primary-500);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}
```

### JavaScript/TypeScript

```typescript
import { tokens } from '@prototipo/tokens';

const primaryColor = tokens.colors.primary['500'];
```

## Build

```bash
pnpm build
```
