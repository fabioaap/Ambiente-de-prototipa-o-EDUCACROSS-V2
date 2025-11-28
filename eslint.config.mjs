/**
 * Configuração de ESLint para o monorepo EDUCACROSS
 * 
 * Usa a configuração compartilhada @prototipo/eslint-config
 */
import baseConfig from '@prototipo/eslint-config';

const normalizedConfig = Array.isArray(baseConfig) ? baseConfig : [baseConfig];

export default [
    ...normalizedConfig,
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            'build/**',
            'out/**',
            '.next/**',
            'storybook-static/**',
            'coverage/**',
            'reports/**',
            'specs/**/artifacts/**',
            '**/*.tsbuildinfo',
        ],
    },
];
