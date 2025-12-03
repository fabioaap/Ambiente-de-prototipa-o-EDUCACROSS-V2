import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  
  // Brand
  brandTitle: 'EDUCACROSS Design System',
  brandUrl: '/',
  brandTarget: '_self',
  
  // Typography
  fontBase: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"Fira Code", "Courier New", monospace',
  
  // Colors
  colorPrimary: '#5f4de5',
  colorSecondary: '#5f4de5',
  
  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#e5e7eb',
  appBorderRadius: 8,
  
  // Text colors
  textColor: '#1f2937',
  textInverseColor: '#ffffff',
  
  // Toolbar default and active colors
  barTextColor: '#6b7280',
  barSelectedColor: '#5f4de5',
  barBg: '#ffffff',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#d1d5db',
  inputTextColor: '#1f2937',
  inputBorderRadius: 6,
});

addons.setConfig({
  theme,
});
