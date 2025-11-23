import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { PageMetadata } from '@/types/page';

const PAGES_DIR = path.join(process.cwd(), 'data', 'pages');

// Garantir que o diretório existe
async function ensureDir() {
  try {
    await fs.access(PAGES_DIR);
  } catch {
    await fs.mkdir(PAGES_DIR, { recursive: true });
  }
}

// Detectar domínio baseado no caminho do arquivo
function detectDomain(relativePath: string): 'BackOffice' | 'FrontOffice' | 'Game' | 'Geral' {
  if (relativePath.startsWith('backoffice/') || relativePath.startsWith('backoffice\\')) {
    return 'BackOffice';
  }
  if (relativePath.startsWith('frontoffice/') || relativePath.startsWith('frontoffice\\')) {
    return 'FrontOffice';
  }
  if (relativePath.startsWith('game/') || relativePath.startsWith('game\\')) {
    return 'Game';
  }
  return 'Geral';
}

// Varrer recursivamente o diretório de páginas
async function getAllPages(dir: string, baseDir: string = dir): Promise<PageMetadata[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const pages: PageMetadata[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Recursivamente buscar em subdiretórios
      const subPages = await getAllPages(fullPath, baseDir);
      pages.push(...subPages);
    } else if (entry.name.endsWith('.json') && entry.name !== '.gitkeep') {
      const content = await fs.readFile(fullPath, 'utf-8');
      const data = JSON.parse(content);
      const relativePath = path.relative(baseDir, fullPath);
      const slug = relativePath.replace(/\\/g, '/').replace('.json', '');
      const domain = detectDomain(relativePath);
      const stats = await fs.stat(fullPath);
      
      pages.push({
        slug,
        title: data.root?.props?.title || slug.split('/').pop() || slug,
        domain,
        status: data.root?.props?.status || 'draft',
        lastModified: stats.mtime.toISOString(),
      });
    }
  }

  return pages;
}

// GET /api/pages - Lista todas as páginas
export async function GET() {
  try {
    await ensureDir();
    const pages = await getAllPages(PAGES_DIR);
    
    return NextResponse.json({ pages });
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
