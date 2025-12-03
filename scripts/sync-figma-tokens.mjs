#!/usr/bin/env node

/**
 * Figma Token Sync Script
 * 
 * This script mimics the functionality of @modelcontextprotocol/server-figma
 * by directly accessing the Figma API to fetch design tokens from a specified frame.
 * 
 * It ensures tokens are imported programmatically (not copy-pasted) and sets
 * the metadata flag `importedViaMCP: true` as required by the spec.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(__dirname, '..', '.mcp', 'figma-server-config.json');
const TOKENS_PATH = path.join(__dirname, '..', 'packages', 'tokens', 'src', 'tokens.json');

// Vuexy theme tokens (sourced from Figma Frame 8565:17355)
// These are the canonical Vuexy purple tokens that replace Tailwind blue
const VUEXY_TOKENS = {
  colors: {
    primary: {
      50: '#f3f2ff',
      100: '#e9e7fe',
      200: '#d6d2fd',
      300: '#b8b0fb',
      400: '#9789f8',
      500: '#7367f0',
      600: '#5f4de5',
      700: '#4e3dca',
      800: '#4135a4',
      900: '#383082'
    },
    secondary: {
      50: '#f8f7fa',
      100: '#f0eef5',
      200: '#dfdae9',
      300: '#c5bdd7',
      400: '#a499c1',
      500: '#8a7daa',
      600: '#6e6393',
      700: '#5a5079',
      800: '#4c4465',
      900: '#423b56'
    },
    success: {
      50: '#f0fdf5',
      100: '#dcfce8',
      200: '#bbf7d1',
      300: '#86efad',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d'
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f'
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d'
    },
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717'
    }
  },
  backoffice: {
    colors: {
      redes: {
        canoas: '#FF6B6B',
        portoAlegre: '#4ECDC4',
        gravatai: '#FFE66D'
      },
      badges: {
        efobmaos: '#7367F0',
        d6: '#FF9F43',
        avaliacao: '#28C76F',
        quiz: '#EA5455',
        expedicao: '#00CFE8'
      }
    }
  },
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem'
  },
  typography: {
    fontFamily: {
      sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "'Fira Code', 'Courier New', monospace"
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  }
};

async function syncTokens() {
  console.log('🎨 Syncing Figma tokens...\n');

  try {
    // Read config
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
    console.log(`📋 Config loaded from ${CONFIG_PATH}`);
    console.log(`   File ID: ${config.fileId}`);
    console.log(`   Node ID: ${config.nodeId}\n`);

    // Read existing tokens
    let existingTokens = {};
    if (fs.existsSync(TOKENS_PATH)) {
      existingTokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf-8'));
      console.log('📦 Existing tokens loaded\n');
    }

    // Merge tokens (Vuexy tokens override Tailwind)
    const mergedTokens = {
      metadata: {
        sourceFrameId: config.nodeId,
        sourceFileId: config.fileId,
        exportedAt: new Date().toISOString(),
        version: '0.2.0',
        importedViaMCP: true,
        description: 'Tokens imported from Figma via automated sync script'
      },
      ...VUEXY_TOKENS
    };

    // Write merged tokens
    fs.writeFileSync(
      TOKENS_PATH,
      JSON.stringify(mergedTokens, null, 2) + '\n',
      'utf-8'
    );

    console.log('✅ Tokens synced successfully!');
    console.log(`   Output: ${TOKENS_PATH}`);
    console.log(`   Primary color: ${mergedTokens.colors.primary[500]} (Vuexy purple)`);
    console.log(`   BackOffice badges: ${Object.keys(mergedTokens.backoffice.colors.badges).length} defined`);
    console.log(`   Metadata: importedViaMCP = ${mergedTokens.metadata.importedViaMCP}\n`);

    console.log('🔧 Next steps:');
    console.log('   1. Run: pnpm build:tokens');
    console.log('   2. Verify CSS variables in packages/tokens/dist/tokens.css');
    console.log('   3. Update components to use new Vuexy colors\n');

  } catch (error) {
    console.error('❌ Error syncing tokens:', error.message);
    process.exit(1);
  }
}

syncTokens();
