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
  colorPrimary: '#7367f0',
  colorSecondary: '#5f4de5',
  
  // UI
  appBg: '#fafafa',
  appContentBg: '#ffffff',
  appBorderColor: '#e5e5e5',
  appBorderRadius: 8,
  
  // Typography
  fontBase: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"Fira Code", monospace',
  
  // Text colors
  textColor: '#171717',
  textInverseColor: '#ffffff',
  textMutedColor: '#737373',
  
  // Toolbar default and active colors
  barTextColor: '#525252',
  barSelectedColor: '#7367f0',
  barBg: '#ffffff',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e5e5e5',
  inputTextColor: '#171717',
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
=======
  inputBorder: '#d1d5db',
  inputTextColor: '#1f2937',
  inputBorderRadius: 6,
});

addons.setConfig({
  theme,
>>>>>>> fccf72c (feat(storybook): Aplicar branding EDUCACROSS no Storybook)
});
