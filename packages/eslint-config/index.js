import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

/**
 * Configuração base de ESLint para o monorepo EDUCACROSS
 * 
 * Inclui:
 * - Regras recomendadas do ESLint
 * - Suporte a TypeScript
 * - Suporte a React e React Hooks
 * - Globals para Node.js e Browser
 */
export default [
  // Padrões de arquivos a ignorar
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/storybook-static/**',
      '**/.turbo/**',
      '**/coverage/**',
    ],
  },

  // Configuração base para JavaScript/TypeScript
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        Buffer: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',

        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        HTMLElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLDivElement: 'readonly',
        Event: 'readonly',
        MouseEvent: 'readonly',
        KeyboardEvent: 'readonly',
        CustomEvent: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // React rules
      'react/react-in-jsx-scope': 'off', // Não necessário no React 18+
      'react/prop-types': 'off', // Usando TypeScript para validação de props
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Regras gerais
      'no-console': 'off', // Permitir console em ambiente de prototipação
      'no-unused-vars': 'off', // Usando versão do TypeScript
      'no-undef': 'off', // TypeScript cuida disso
      'prefer-const': 'warn',
      'no-var': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Configuração para arquivos de configuração
  {
    files: ['**/*.config.{js,mjs,ts}'],
    languageOptions: {
      globals: {
        ...js.configs.recommended.globals,
      },
    },
  },
];
