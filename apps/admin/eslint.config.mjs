import baseConfig from '@prototipo/eslint-config';

export default [
    ...baseConfig,
    {
        rules: {
            'react/react-in-jsx-scope': 'off',
        },
    },
];
