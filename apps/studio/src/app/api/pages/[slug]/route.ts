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

type RouteContext = {
  params: Promise<{ slug: string }>;
};

// GET /api/pages/[slug] - Busca uma página específica
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { slug } = await context.params;
    const filePath = path.join(PAGES_DIR, `${slug}.json`);
    
    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error reading page:', error);
    return NextResponse.json(
      { error: 'Page not found' },
      { status: 404 }
    );
  }
}

// PUT /api/pages/[slug] - Atualiza uma página existente
export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  // Verificar permissões de escrita
  if (!isWriteAllowed()) {
    return NextResponse.json(
      { error: 'Write operations not allowed in production' },
      { status: 403 }
    );
  }

  try {
    const { slug } = await context.params;
    const body = await request.json();
    const { data } = body;
    
    if (!data) {
      return NextResponse.json(
        { error: 'Missing data' },
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
    
    const filePath = path.join(PAGES_DIR, `${slug}.json`);
    
    // Verificar se existe
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }
    
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({
      success: true,
      message: 'Page updated successfully',
    });
  } catch (error) {
    console.error('Error updating page:', error);
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    );
  }
}

// DELETE /api/pages/[slug] - Remove uma página
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  // Verificar permissões de escrita
  if (!isWriteAllowed()) {
    return NextResponse.json(
      { error: 'Write operations not allowed in production' },
      { status: 403 }
    );
  }

  try {
    const { slug } = await context.params;
    const filePath = path.join(PAGES_DIR, `${slug}.json`);
    
    await fs.unlink(filePath);
    
    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 404 }
    );
  }
}
