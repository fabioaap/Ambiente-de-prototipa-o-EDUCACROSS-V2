import { defineConfig } from 'tsup';
import CssModulesPlugin from 'esbuild-css-modules-plugin';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildPlugins: [
    CssModulesPlugin({
      inject: false,
      localsConvention: 'camelCaseOnly',
      pattern: '[name]_[local]_[hash:5]',
    }),
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
  },
});
