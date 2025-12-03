import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

// EDUCACROSS Theme baseado nos tokens do design system
const educacrossTheme = create({
  base: 'light',
  
  // Brand
  brandTitle: 'EDUCACROSS Design System',
  brandUrl: 'https://educacross.com',
  brandTarget: '_self',
  
  // Colors (usando tokens do design system)
  colorPrimary: '#7367f0', // primary-600
  colorSecondary: '#5f4de5', // primary-700
  
  // UI
  appBg: '#fafafa', // neutral-50
  appContentBg: '#ffffff',
  appBorderColor: '#e5e5e5', // neutral-200
  appBorderRadius: 8,
  
  // Typography
  fontBase: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"Fira Code", monospace',
  
  // Text colors
  textColor: '#171717', // neutral-900
  textInverseColor: '#ffffff',
  textMutedColor: '#737373', // neutral-500
  
  // Toolbar default and active colors
  barTextColor: '#525252', // neutral-600
  barSelectedColor: '#7367f0', // primary-600
  barBg: '#ffffff',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e5e5e5', // neutral-200
  inputTextColor: '#171717', // neutral-900
  inputBorderRadius: 4,
});

addons.setConfig({
  theme: educacrossTheme,
  panelPosition: 'bottom',
  enableShortcuts: true,
  showToolbar: true,
  selectedPanel: undefined,
  initialActive: 'sidebar',
  sidebar: {
    showRoots: false,
    collapsedRoots: [],
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
