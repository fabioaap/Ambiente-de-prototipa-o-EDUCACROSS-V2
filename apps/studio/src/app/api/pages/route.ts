import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PAGES_DIR = path.join(process.cwd(), 'data', 'pages');

// Verificar se gravação é permitida (apenas em desenvolvimento por padrão)
function isWriteAllowed(): boolean {
  const env = process.env.NODE_ENV || 'development';
  const allowWrite = process.env.ALLOW_PAGE_WRITE === 'true';
  
  return env === 'development' || allowWrite;
}

// Garantir que o diretório existe
async function ensureDir() {
  try {
    await fs.access(PAGES_DIR);
  } catch {
    await fs.mkdir(PAGES_DIR, { recursive: true });
  }
}

// GET /api/pages - Lista todas as páginas
export async function GET() {
  try {
    await ensureDir();
    const files = await fs.readdir(PAGES_DIR);
    const jsonFiles = files.filter((f) => f.endsWith('.json'));
    
    const pages = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(PAGES_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(content);
        const slug = file.replace('.json', '');
        
        return {
          slug,
          title: data.root?.props?.title || slug,
          lastModified: (await fs.stat(filePath)).mtime,
        };
      })
    );
    
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
  // Verificar permissões de escrita
  if (!isWriteAllowed()) {
    return NextResponse.json(
      { error: 'Write operations not allowed in production' },
      { status: 403 }
    );
  }

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

    // Validar estrutura básica dos dados
    if (!data.root || !data.content || !data.zones) {
      return NextResponse.json(
        { error: 'Invalid data structure. Expected root, content and zones properties' },
        { status: 400 }
      );
    }
    
    // Sanitizar slug
    const sanitizedSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    
    if (!sanitizedSlug || sanitizedSlug.length === 0) {
      return NextResponse.json(
        { error: 'Invalid slug format' },
        { status: 400 }
      );
    }

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
