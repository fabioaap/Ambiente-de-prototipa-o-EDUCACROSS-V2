/**
 * Design Tokens para Jornada #4800 - Exibir Campo USO
 * Cores, tipografia e espaçamento para componentes de redes/filtragem
 */

export const tokens = {
  // Cores de Redes
  redes: {
    canoas: {
      primary: '#3B82F6',      // Azul
      light: '#DBEAFE',        // Azul claro
      dark: '#1E40AF',         // Azul escuro
      text: '#FFFFFF',         // Texto branco
    },
    portoAlegre: {
      primary: '#EF4444',      // Vermelho
      light: '#FEE2E2',        // Vermelho claro
      dark: '#991B1B',         // Vermelho escuro
      text: '#FFFFFF',         // Texto branco
    },
    gravarai: {
      primary: '#10B981',      // Verde
      light: '#D1FAE5',        // Verde claro
      dark: '#065F46',         // Verde escuro
      text: '#FFFFFF',         // Texto branco
    },
  },

  // Status de Questões
  status: {
    aprovada: {
      primary: '#10B981',      // Verde
      light: '#D1FAE5',
      dark: '#065F46',
      text: '#FFFFFF',
    },
    emRevisao: {
      primary: '#F59E0B',      // Âmbar
      light: '#FEF3C7',
      dark: '#92400E',
      text: '#FFFFFF',
    },
    rejeitada: {
      primary: '#EF4444',      // Vermelho
      light: '#FEE2E2',
      dark: '#991B1B',
      text: '#FFFFFF',
    },
  },

  // Cores Neutras
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Tipografia
  typography: {
    heading1: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: '40px',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    heading2: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '32px',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    heading3: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28px',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    bodyLg: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    bodyMd: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    bodySm: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    labelLg: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '20px',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    labelMd: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: '16px',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
  },

  // Espaçamento
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px',
  },

  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },

  // Sombras
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },

  // Z-Index
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modal: 40,
    tooltip: 50,
  },

  // Breakpoints (Responsividade)
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
    ultraWide: '1536px',
  },
};

// Função helper para obter cor de rede por nome
export function getRedeColor(redeName: string) {
  const redeKey = redeName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '');

  switch (redeKey) {
    case 'canoas':
      return tokens.redes.canoas;
    case 'portoalegre':
      return tokens.redes.portoAlegre;
    case 'gravarai':
      return tokens.redes.gravarai;
    default:
      return tokens.redes.canoas;
  }
}

// Função helper para obter cor de status
export function getStatusColor(status: 'aprovada' | 'em-revisao' | 'rejeitada') {
  switch (status) {
    case 'aprovada':
      return tokens.status.aprovada;
    case 'em-revisao':
      return tokens.status.emRevisao;
    case 'rejeitada':
      return tokens.status.rejeitada;
    default:
      return tokens.status.emRevisao;
  }
}

export default tokens;
