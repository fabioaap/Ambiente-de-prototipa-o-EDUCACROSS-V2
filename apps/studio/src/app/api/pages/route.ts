import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PAGES_DIR = path.join(process.cwd(), 'data', 'pages');

// ============================================================================
// TIPOS TYPESCRIPT
// ============================================================================

interface PageData {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  content: Record<string, unknown>;
}

interface ApiResponse {
  success: boolean;
  data: PageData[];
  error: string | null;
  total: number;
  timestamp: string;
}

// ============================================================================
// MOCK DATA (para MVP de prototipagem)
// ============================================================================

const MOCK_PAGES: PageData[] = [
  {
    id: 'backoffice-dashboard-001',
    title: 'Dashboard Administrativo',
    slug: 'backoffice/dashboard',
    createdAt: '2025-11-01T10:00:00.000Z',
    updatedAt: '2025-11-23T14:30:00.000Z',
    content: {
      root: {
        props: { title: 'Dashboard Administrativo', layout: 'default' },
      },
      content: [
        { type: 'Hero', props: { title: 'Bem-vindo ao BackOffice', variant: 'primary' } },
        { type: 'Card', props: { title: 'Métricas', content: 'Visão geral do sistema' } },
      ],
      zones: {},
    },
  },
  {
    id: 'backoffice-users-002',
    title: 'Gestão de Usuários',
    slug: 'backoffice/users',
    createdAt: '2025-11-05T11:15:00.000Z',
    updatedAt: '2025-11-22T16:45:00.000Z',
    content: {
      root: {
        props: { title: 'Gestão de Usuários', layout: 'admin' },
      },
      content: [
        { type: 'Text', props: { text: 'Lista de usuários cadastrados', variant: 'h2' } },
        { type: 'DataTable', props: { columns: ['Nome', 'Email', 'Status'] } },
      ],
      zones: {},
    },
  },
  {
    id: 'frontoffice-home-003',
    title: 'Página Inicial',
    slug: 'frontoffice/home',
    createdAt: '2025-11-10T09:00:00.000Z',
    updatedAt: '2025-11-24T12:00:00.000Z',
    content: {
      root: {
        props: { title: 'Página Inicial', layout: 'public' },
      },
      content: [
        { type: 'Hero', props: { title: 'Educacross', subtitle: 'Plataforma Educacional', variant: 'secondary' } },
        { type: 'FeatureGrid', props: { columns: 3 } },
      ],
      zones: {},
    },
  },
  {
    id: 'game-hub-004',
    title: 'Central de Jogos',
    slug: 'game/hub',
    createdAt: '2025-11-12T13:20:00.000Z',
    updatedAt: '2025-11-23T18:10:00.000Z',
    content: {
      root: {
        props: { title: 'Central de Jogos', layout: 'game' },
      },
      content: [
        { type: 'GameCard', props: { title: 'Quiz Matemático', difficulty: 'medium' } },
        { type: 'GameCard', props: { title: 'Desafio Científico', difficulty: 'hard' } },
      ],
      zones: {},
    },
  },
  {
    id: 'frontoffice-about-005',
    title: 'Sobre Nós',
    slug: 'frontoffice/about',
    createdAt: '2025-11-15T14:00:00.000Z',
    updatedAt: '2025-11-20T10:30:00.000Z',
    content: {
      root: {
        props: { title: 'Sobre Nós', layout: 'public' },
      },
      content: [
        { type: 'Text', props: { text: 'Nossa História', variant: 'h1' } },
        { type: 'Text', props: { text: 'Texto sobre a missão da plataforma...', variant: 'body' } },
      ],
      zones: {},
    },
  },
];

// ============================================================================
// HANDLERS
// ============================================================================

// Garantir que o diretório existe
async function ensureDir() {
  try {
    await fs.access(PAGES_DIR);
  } catch {
    await fs.mkdir(PAGES_DIR, { recursive: true });
  }
}

/**
 * GET /api/pages
 * 
 * Lista páginas criadas no Puck Studio com suporte a paginação.
 * 
 * Query params:
 * - limit: número máximo de resultados (padrão: todos)
 * - offset: número de registros a pular (padrão: 0)
 * 
 * Response:
 * - success: boolean
 * - data: array de páginas
 * - error: mensagem de erro ou null
 * - total: número total de páginas (antes da paginação)
 * - timestamp: data/hora da requisição
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    // Usar mock data para MVP
    let pages = [...MOCK_PAGES];
    const total = pages.length;

    // Aplicar paginação se fornecida
    if (offset !== null) {
      const offsetNum = parseInt(offset, 10);
      if (isNaN(offsetNum) || offsetNum < 0) {
        const errorResponse: ApiResponse = {
          success: false,
          data: [],
          error: 'Invalid offset parameter',
          total: 0,
          timestamp: new Date().toISOString(),
        };
        return NextResponse.json(errorResponse, { status: 400 });
      }
      pages = pages.slice(offsetNum);
    }

    if (limit !== null) {
      const limitNum = parseInt(limit, 10);
      if (isNaN(limitNum) || limitNum <= 0) {
        const errorResponse: ApiResponse = {
          success: false,
          data: [],
          error: 'Invalid limit parameter',
          total: 0,
          timestamp: new Date().toISOString(),
        };
        return NextResponse.json(errorResponse, { status: 400 });
      }
      pages = pages.slice(0, limitNum);
    }

    const response: ApiResponse = {
      success: true,
      data: pages,
      error: null,
      total,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error listing pages:', error);
    
    const errorResponse: ApiResponse = {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Failed to list pages',
      total: 0,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// POST /api/pages - Cria uma nova página
export async function POST(request: NextRequest) {
  try {
    await ensureDir();
    const body = await request.json();
    const { slug, data } = body;
    
    if (!slug || !data) {
      return NextResponse.json(
        { error: 'Missing slug or data' },
        { status: 400 }
      );
    }
    
    // Sanitizar slug
    const sanitizedSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const filePath = path.join(PAGES_DIR, `${sanitizedSlug}.json`);
    
    // Verificar se já existe
    try {
      await fs.access(filePath);
      return NextResponse.json(
        { error: 'Page already exists' },
        { status: 409 }
      );
    } catch {
      // Arquivo não existe, pode criar
    }
    
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({
      success: true,
      slug: sanitizedSlug,
      message: 'Page created successfully',
    });
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    );
  }
}
