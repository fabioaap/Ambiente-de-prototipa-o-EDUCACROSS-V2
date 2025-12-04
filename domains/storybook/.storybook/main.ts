import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  viteFinal: async (config) => {
    // Strip "use client" directive from DS bundle entry to avoid rollup error
    config.plugins = [
      ...(config.plugins || []),
      {
        name: 'strip-use-client-design-system-index',
        enforce: 'pre',
        transform(code: string, id: string) {
          if (id.includes('/packages/design-system/dist/src/index.mjs')) {
            return code.replace(/"use client";?/g, '');
          }
          return null;
        },
      },
    ];

    // Optimize bundle chunking for better performance
    if (config.build) {
      config.build.rollupOptions = {
        ...config.build.rollupOptions,
        output: {
          ...(typeof config.build.rollupOptions?.output === 'object' ? config.build.rollupOptions.output : {}),
          manualChunks: (id) => {
            // Separate design system into its own chunk
            if (id.includes('/packages/design-system/')) {
              return 'design-system';
            }
            // Separate Radix UI primitives
            if (id.includes('/@radix-ui/')) {
              return 'radix-ui';
            }
            // Separate React and React DOM
            if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/')) {
              return 'react-vendor';
            }
            // Group other node_modules together
            if (id.includes('/node_modules/')) {
              return 'vendor';
            }
          },
        },
      };
    }

    return config;
  },
  staticDirs: ['../public'],
};

export default config;
