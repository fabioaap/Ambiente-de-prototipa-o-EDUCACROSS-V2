import type { Preview } from '@storybook/react';
import '@prototipo/tokens/tokens.css';
import '@prototipo/design-system/index.css';
import './preview-fonts.css';
import '../src/styles/storybook-globals.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Introduction',
          'Tokens',
          'Components',
          '*',
        ],
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
          name: 'dark',
          value: '#1f2937',
        },
        {
          name: 'gray',
          value: '#f3f4f6',
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
