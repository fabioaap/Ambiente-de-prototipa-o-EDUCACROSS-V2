import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const PAGES_DIR = path.join(process.cwd(), 'data', 'pages');

// Garantir que o diretório existe
async function ensureDir() {
  try {
    await fs.access(PAGES_DIR);
  } catch {
    await fs.mkdir(PAGES_DIR, { recursive: true });
  }
}

// Inferir domínio baseado no título ou slug
function inferDomain(title: string, slug: string): string {
  const titleLower = title.toLowerCase();
  const slugLower = slug.toLowerCase();
  
  if (titleLower.includes('game') || slugLower.includes('game') || 
      titleLower.includes('jogo') || slugLower.includes('leaderboard')) {
    return 'Game';
  } else if (titleLower.includes('dashboard') || titleLower.includes('admin') || 
             titleLower.includes('backoffice') || slugLower.includes('dashboard')) {
    return 'BackOffice';
  } else if (titleLower.includes('home') || titleLower.includes('sobre') || 
             titleLower.includes('contato') || slugLower.includes('front')) {
    return 'FrontOffice';
  }
  
  return 'FrontOffice'; // default
}

// GET /api/pages - Lista todas as páginas
export async function GET(request: NextRequest) {
  try {
    await ensureDir();
    const files = await fs.readdir(PAGES_DIR);
    const jsonFiles = files.filter((f) => f.endsWith('.json'));
    
    // Query params para filtros e paginação
    const searchParams = request.nextUrl.searchParams;
    const domainFilter = searchParams.get('domain');
    const statusFilter = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    
    let pages = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(PAGES_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(content);
        const slug = file.replace('.json', '');
        const stats = await fs.stat(filePath);
        const title = data.root?.props?.title || slug;
        const domain = data.domain || inferDomain(title, slug);
        const status = data.status || 'active';
        
        return {
          id: data.id || randomUUID(),
          slug,
          title,
          domain,
          lastModified: stats.mtime.toISOString(),
          status,
        };
      })
    );
    
    // Store total before filtering
    const totalPages = pages.length;
    
    // Aplicar filtros
    if (domainFilter) {
      pages = pages.filter(p => p.domain === domainFilter);
    }
    if (statusFilter) {
      pages = pages.filter(p => p.status === statusFilter);
    }
    
    // Aplicar paginação
    const filteredTotal = pages.length;
    const paginatedPages = pages.slice(offset, offset + limit);
    
    return NextResponse.json({ 
      pages: paginatedPages,
      total: totalPages,
      filtered: filteredTotal,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error listing pages:', error);
    return NextResponse.json(
      { error: 'Failed to list pages' },
      { status: 500 }
    );
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
    
    // Enriquecer dados com metadata
    const title = data.root?.props?.title || sanitizedSlug;
    const enrichedData = {
      ...data,
      id: data.id || randomUUID(),
      domain: data.domain || inferDomain(title, sanitizedSlug),
      status: data.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await fs.writeFile(filePath, JSON.stringify(enrichedData, null, 2));
    
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
