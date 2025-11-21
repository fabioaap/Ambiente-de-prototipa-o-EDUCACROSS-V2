/**
 * Configuração de ESLint específica para Storybook
 * 
 * Estende a configuração base e adiciona regras do Storybook
 */
import storybookPlugin from 'eslint-plugin-storybook';
import baseConfig from './index.js';

export default [
  ...baseConfig,
  {
    files: ['**/*.stories.{js,ts,tsx}', '**/stories/**/*.{js,ts,tsx}'],
    plugins: {
      storybook: storybookPlugin,
    },
    rules: {
      ...storybookPlugin.configs.recommended.rules,
      'storybook/story-exports': 'error',
    },
  },
  {
    files: ['**/.storybook/**/*.{js,ts,tsx}'],
    rules: {
      'storybook/story-exports': 'off',
    },
  },
];

