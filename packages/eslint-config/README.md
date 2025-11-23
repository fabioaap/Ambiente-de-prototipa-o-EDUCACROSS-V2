# @prototipo/eslint-config

Configuração compartilhada de ESLint para o monorepo EDUCACROSS.

## 📦 Instalação

Este pacote já está instalado automaticamente como parte do workspace do monorepo.

## 🎯 Configurações Disponíveis

### Base (`@prototipo/eslint-config`)

Configuração padrão com suporte a:
- JavaScript/TypeScript
- React e React Hooks
- Regras recomendadas do ESLint

**Uso:**

```js
// eslint.config.mjs
import config from '@prototipo/eslint-config';

export default config;
```

### Next.js (`@prototipo/eslint-config/next`)

Estende a configuração base com regras específicas do Next.js.

**Uso:**

```js
// eslint.config.mjs
import config from '@prototipo/eslint-config/next';

export default config;
```

### Storybook (`@prototipo/eslint-config/storybook`)

Estende a configuração base com regras específicas do Storybook.

**Uso:**

```js
// eslint.config.mjs
import config from '@prototipo/eslint-config/storybook';

export default config;
```

## 📋 Regras Incluídas

### TypeScript

- `@typescript-eslint/no-unused-vars`: warn (ignora variáveis com prefixo `_`)
- `@typescript-eslint/no-explicit-any`: warn
- `@typescript-eslint/explicit-module-boundary-types`: off

### React

- `react/react-in-jsx-scope`: off (React 18+)
- `react/prop-types`: off (usando TypeScript)
- `react-hooks/rules-of-hooks`: error
- `react-hooks/exhaustive-deps`: warn

### Gerais

- `no-console`: off (ambiente de prototipação)
- `prefer-const`: warn
- `no-var`: error

## 🛠️ Scripts Disponíveis

No root do monorepo:

```bash
# Executar lint em todos os pacotes
pnpm lint

# Executar lint apenas no design-system
pnpm --filter @prototipo/design-system lint

# Executar lint apenas no studio
pnpm --filter studio lint
```

## 📝 Customização

Para adicionar regras específicas a um pacote, crie um `eslint.config.mjs` local:

```js
import baseConfig from '@prototipo/eslint-config';

export default [
  ...baseConfig,
  {
    rules: {
      // Suas regras customizadas aqui
      'no-console': 'error',
    },
  },
];
```

## 🔍 Arquivos Ignorados

Por padrão, os seguintes padrões são ignorados:

- `**/node_modules/**`
- `**/dist/**`
- `**/build/**`
- `**/.next/**`
- `**/storybook-static/**`
- `**/.turbo/**`
- `**/coverage/**`

## 📚 Mais Informações

Para mais detalhes sobre ESLint Flat Config:
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
