import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PAGES_DIR = path.join(process.cwd(), 'data', 'pages');

// GET /api/pages/export - Exporta todas as páginas como JSON
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';

    // Garantir diretório existe
    try {
      await fs.access(PAGES_DIR);
    } catch {
      return NextResponse.json(
        { error: 'No pages directory found' },
        { status: 404 }
      );
    }

    // Ler todos os arquivos
    const files = await fs.readdir(PAGES_DIR);
    const jsonFiles = files.filter((f) => f.endsWith('.json'));

    // Construir objeto com todas as páginas
    const pages: Record<string, unknown> = {};

    for (const file of jsonFiles) {
      const filePath = path.join(PAGES_DIR, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const slug = file.replace('.json', '');
      pages[slug] = JSON.parse(content);
    }

    const exportData = {
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
      totalPages: jsonFiles.length,
      pages,
    };

    // Retornar JSON
    if (format === 'json') {
      return NextResponse.json(exportData);
    }

    return NextResponse.json(
      { error: 'Format not supported yet. Use format=json' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error exporting pages:', error);
    return NextResponse.json(
      { error: 'Failed to export pages' },
      { status: 500 }
    );
  }
}
