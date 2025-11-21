/**
 * Configuração de ESLint específica para Next.js
 * 
 * Estende a configuração base e adiciona regras do Next.js
 */
import nextPlugin from '@next/eslint-plugin-next';
import baseConfig from './index.js';

const nextCoreWebVitals = nextPlugin.configs['core-web-vitals'];
const nextCoreWebVitalsRules = nextCoreWebVitals.rules ?? {};
const nextCoreWebVitalsSettings = nextCoreWebVitals.settings ?? {};

export default [
  ...baseConfig,
  {
    files: ['**/*.{js,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextCoreWebVitalsRules,
    },
    settings: {
      ...nextCoreWebVitalsSettings,
    },
  },
];
