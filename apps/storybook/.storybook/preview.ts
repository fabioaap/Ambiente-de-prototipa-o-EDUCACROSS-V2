import type { Preview } from '@storybook/react';
import '@prototipo/tokens/tokens.css';

const preview: Preview = {
  parameters: {
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
      ],
    },
    // A11y addon configuration
    a11y: {
      // Run accessibility checks automatically
      manual: false,
      // Configuration for axe-core
      config: {
        rules: [
          {
            // Ensure color contrast meets WCAG AA
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};

export default preview;
