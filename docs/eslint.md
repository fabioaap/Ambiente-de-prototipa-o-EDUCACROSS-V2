# ESLint - Configuração Unificada

Este documento descreve a configuração unificada de ESLint no monorepo EDUCACROSS.

## 📋 Visão Geral

O monorepo utiliza uma configuração compartilhada de ESLint (`@prototipo/eslint-config`) que garante consistência de código entre todos os pacotes e aplicações.

### Características

- ✅ **Configuração única compartilhada** entre todos os pacotes
- ✅ **Suporte completo a TypeScript** com regras específicas
- ✅ **Suporte a React 18+** com hooks
- ✅ **Variantes especializadas** para Next.js e Storybook
- ✅ **ESLint Flat Config** (formato moderno)
- ✅ **Zero configuração** para novos pacotes

## 🎯 Configurações Disponíveis

### Base (`@prototipo/eslint-config`)

Configuração padrão para pacotes TypeScript/React:

**Inclui:**
- Regras recomendadas do ESLint
- TypeScript ESLint (@typescript-eslint)
- React e React Hooks
- Globals para Node.js e Browser

**Pacotes que usam:**
- `packages/design-system`
- `packages/tokens`

### Next.js (`@prototipo/eslint-config/next`)

Estende a configuração base com regras do Next.js:

**Adiciona:**
- Core Web Vitals do Next.js
- Regras de otimização para Next.js
- Validações de Image, Link, etc.

**Pacotes que usam:**
- `domains/studio`

### Storybook (`@prototipo/eslint-config/storybook`)

Estende a configuração base com regras do Storybook:

**Adiciona:**
- Validação de story exports
- Best practices do Storybook
- Regras de acessibilidade

**Pacotes que usam:**
- `domains/storybook`

## 🚀 Como Usar

### Executar Lint

```bash
# No root: executar em todos os pacotes
pnpm lint

# Em um pacote específico (do root)
pnpm --filter @prototipo/design-system lint
pnpm --filter studio lint
pnpm --filter storybook lint

# Dentro de um pacote específico
cd packages/design-system
pnpm lint
```

### Adicionar ESLint a um Novo Pacote

1. **Adicionar dependências no `package.json`:**

```json
{
  "devDependencies": {
    "@prototipo/eslint-config": "workspace:*",
    "eslint": "^9.15.0"
  },
  "scripts": {
    "lint": "eslint ."
  }
}
```

2. **Criar `eslint.config.mjs` na raiz do pacote:**

Para pacote comum:
```js
import config from '@prototipo/eslint-config';

export default config;
```

Para app Next.js:
```js
import config from '@prototipo/eslint-config/next';

export default config;
```

Para app Storybook:
```js
import config from '@prototipo/eslint-config/storybook';

export default config;
```

3. **Instalar dependências:**

```bash
pnpm install
```

### Customizar Regras

Se um pacote precisar de regras específicas, estenda a configuração:

```js
import baseConfig from '@prototipo/eslint-config';

export default [
  ...baseConfig,
  {
    rules: {
      // Suas regras customizadas
      'no-console': 'error', // Ex: desabilitar console.log
      '@typescript-eslint/no-explicit-any': 'error', // Ex: proibir any
    },
  },
];
```

## 📝 Regras Principais

### TypeScript

| Regra | Nível | Descrição |
|-------|-------|-----------|
| `@typescript-eslint/no-unused-vars` | warn | Variáveis não utilizadas (ignora prefixo `_`) |
| `@typescript-eslint/no-explicit-any` | warn | Uso de `any` explícito |
| `@typescript-eslint/explicit-module-boundary-types` | off | Tipos de retorno de funções exportadas |

### React

| Regra | Nível | Descrição |
|-------|-------|-----------|
| `react/react-in-jsx-scope` | off | Import do React (não necessário em React 18+) |
| `react/prop-types` | off | PropTypes (usando TypeScript) |
| `react-hooks/rules-of-hooks` | error | Regras dos hooks |
| `react-hooks/exhaustive-deps` | warn | Dependências dos hooks |

### Gerais

| Regra | Nível | Descrição |
|-------|-------|-----------|
| `no-console` | off | Console.log permitido (ambiente de prototipação) |
| `no-unused-vars` | off | Usando versão TypeScript |
| `no-undef` | off | TypeScript cuida disso |
| `prefer-const` | warn | Preferir const sobre let |
| `no-var` | error | Proibir var |

## 🔍 Arquivos Ignorados

Por padrão, os seguintes padrões são ignorados:

```
**/node_modules/**
**/dist/**
**/build/**
**/.next/**
**/storybook-static/**
**/.turbo/**
**/coverage/**
```

## 🛠️ Estrutura do Pacote @prototipo/eslint-config

```
packages/eslint-config/
├── package.json        # Dependências e exports
├── index.js           # Configuração base
├── next.js            # Configuração Next.js
├── storybook.js       # Configuração Storybook
└── README.md          # Documentação do pacote
```

## 🔧 Integração com Editores

### VS Code

Instale a extensão [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Configuração recomendada (`.vscode/settings.json`):

```json
{
  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### WebStorm / IntelliJ

ESLint é automaticamente detectado. Verifique em:
**Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint**

Marque:
- ✅ Automatic ESLint configuration
- ✅ Run eslint --fix on save

## 🐛 Troubleshooting

### Erro: "Cannot find module '@prototipo/eslint-config'"

**Solução:** Execute `pnpm install` no root do monorepo.

### Erro: Module parsing errors

**Solução:** Verifique se o arquivo `eslint.config.mjs` tem a extensão correta (.mjs ou .js com "type": "module").

### Lint está ignorando arquivos

**Solução:** Verifique se os arquivos não estão nos padrões ignorados. Para lint em um diretório específico:

```bash
eslint src/
```

### Performance lenta

**Solução:** Adicione mais padrões ao `ignores` no seu `eslint.config.mjs` local.

## 📚 Referências

- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [Next.js ESLint](https://nextjs.org/docs/app/api-reference/config/eslint)
- [Storybook ESLint Plugin](https://github.com/storybookjs/eslint-plugin-storybook)

## 📝 Changelog

### v0.2.0-beta (2025-11-21)
- ✨ Criação do pacote `@prototipo/eslint-config`
- ✨ Configurações especializadas para Next.js e Storybook
- ✨ Documentação completa
- ✨ Integração em todos os pacotes do monorepo
