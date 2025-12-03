import type { Preview } from '@storybook/react';
import '@prototipo/tokens/tokens.css';
import '@prototipo/design-system/index.css';
import './preview-fonts.css';
import '../src/styles/storybook-globals.css';

  parameters: {
<<<<<<< HEAD
    options: {
      storySort: {
        order: [
          'Introduction',
          'Tokens',
          'Components',
    // Story ordering
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Introdução',
          'Design Tokens',
          ['Cores', 'Tipografia', 'Espaçamento', 'Elevação'],
          'Componentes',
          ['Básicos', 'Formulários', 'Layout', 'Navegação', 'Feedback'],
          'Padrões',
          'Exemplos',
          '*',
        ],
        locales: 'pt-BR',
        ],
=======
    // Story ordering
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Introdução',
          'Design Tokens',
          ['Cores', 'Tipografia', 'Espaçamento', 'Elevação'],
          'Componentes',
          ['Básicos', 'Formulários', 'Layout', 'Navegação', 'Feedback'],
          'Padrões',
          'Exemplos',
          '*',
        ],
        locales: 'pt-BR',
>>>>>>> origin/main
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'neutral-50',
          value: '#fafafa',
        },
        {
          name: 'neutral-100',
          value: '#f5f5f5',
        },
        {
          name: 'neutral-200',
          value: '#e5e5e5',
        },
        {
          name: 'primary-50',
          value: '#f3f2ff',
        },
        {
          name: 'primary-600',
          value: '#7367f0',
        },
        {
          name: 'dark',
          value: '#1f2937',
        },
        {
          name: 'brand',
          value: '#5f4de5',
        },
      ],
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'label',
            enabled: true,
          },
          {
            id: 'button-name',
            enabled: true,
          },
        ],
      },
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
        },
      },
    },
  },
};

export default preview;
