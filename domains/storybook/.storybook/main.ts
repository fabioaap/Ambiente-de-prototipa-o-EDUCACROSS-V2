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
    return config;
  },
  staticDirs: ['../public'],
};

export default config;
