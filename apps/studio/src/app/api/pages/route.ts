import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PAGES_DIR = path.join(process.cwd(), 'data', 'pages');

// Interface para o formato de resposta esperado
interface PageInfo {
  id: string;
  slug: string;
  title: string;
  domain: 'BackOffice' | 'FrontOffice' | 'Game' | 'Other';
  lastModified: string;
  status: 'active' | 'draft' | 'archived';
}

interface PagesResponse {
  pages: PageInfo[];
}

// Garantir que o diretório existe
async function ensureDir() {
  try {
    await fs.access(PAGES_DIR);
  } catch {
    await fs.mkdir(PAGES_DIR, { recursive: true });
  }
}

// Determinar domínio baseado no slug/caminho
function determineDomain(slug: string): PageInfo['domain'] {
  const lowerSlug = slug.toLowerCase();
  if (lowerSlug.startsWith('backoffice') || lowerSlug.includes('/backoffice/')) {
    return 'BackOffice';
  }
  if (lowerSlug.startsWith('frontoffice') || lowerSlug.includes('/frontoffice/')) {
    return 'FrontOffice';
  }
  if (lowerSlug.startsWith('game') || lowerSlug.includes('/game/')) {
    return 'Game';
  }
  return 'Other';
}

// Escanear diretório recursivamente
async function scanPagesDirectory(
  dir: string,
  prefix = ''
): Promise<PageInfo[]> {
  const pages: PageInfo[] = [];
  const fullDir = path.join(PAGES_DIR, dir);

  try {
    const entries = await fs.readdir(fullDir, { withFileTypes: true });

    for (const entry of entries) {
      // Ignorar .gitkeep
      if (entry.name === '.gitkeep') continue;

      const entryPath = path.join(fullDir, entry.name);
      const slug = prefix ? `${prefix}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        // Escanear subdiretórios recursivamente
        const subPages = await scanPagesDirectory(
          path.join(dir, entry.name),
          slug
        );
        pages.push(...subPages);
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        // Ler arquivo JSON
        const content = await fs.readFile(entryPath, 'utf-8');
        const data = JSON.parse(content);
        const stats = await fs.stat(entryPath);

        // Remover extensão .json do slug
        const cleanSlug = slug.replace(/\.json$/, '');
        
        // Gerar ID único baseado no slug
        const pageId = cleanSlug.replace(/\//g, '-');

        // Determinar status (por enquanto sempre 'active', pode ser expandido)
        const status: PageInfo['status'] = data.root?.props?.status || 'active';

        pages.push({
          id: pageId,
          slug: cleanSlug,
          title: data.root?.props?.title || cleanSlug.split('/').pop() || 'Sem título',
          domain: determineDomain(cleanSlug),
          lastModified: stats.mtime.toISOString(),
          status,
        });
      }
    }
  } catch (error) {
    // Se o diretório não existir ou houver erro, retornar array vazio
    console.error(`Error reading directory ${fullDir}:`, error);
  }

  return pages;
}

// GET /api/pages - Lista todas as páginas com suporte a filtros
export async function GET(request: NextRequest) {
  try {
    await ensureDir();

    // Obter parâmetros de query para filtros
    const { searchParams } = new URL(request.url);
    const domainFilter = searchParams.get('domain');
    const statusFilter = searchParams.get('status');

    // Escanear todas as páginas
    let pages = await scanPagesDirectory('');

    // Aplicar filtros se fornecidos
    if (domainFilter) {
      pages = pages.filter(
        (page) => page.domain.toLowerCase() === domainFilter.toLowerCase()
      );
    }

    if (statusFilter) {
      pages = pages.filter(
        (page) => page.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Ordenar por domínio e depois por slug
    pages.sort((a, b) => {
      if (a.domain !== b.domain) {
        return a.domain.localeCompare(b.domain);
      }
      return a.slug.localeCompare(b.slug);
    });

    const response: PagesResponse = { pages };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error listing pages:', error);
    return NextResponse.json(
      { error: 'Failed to list pages', message: String(error) },
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
