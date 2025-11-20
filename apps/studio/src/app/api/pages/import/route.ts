import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PAGES_DIR = path.join(process.cwd(), 'data', 'pages');

interface ImportData {
  exportedAt?: string;
  version?: string;
  totalPages?: number;
  pages: Record<string, unknown>;
}

// Garantir que o diretório existe
async function ensureDir() {
  try {
    await fs.access(PAGES_DIR);
  } catch {
    await fs.mkdir(PAGES_DIR, { recursive: true });
  }
}

// POST /api/pages/import - Importa páginas de JSON
export async function POST(request: NextRequest) {
  try {
    await ensureDir();
    const body = (await request.json()) as ImportData;
    const { pages, mode } = body as ImportData & { mode?: 'replace' | 'merge' };

    if (!pages || typeof pages !== 'object') {
      return NextResponse.json(
        { error: 'Invalid import data. Expected pages object.' },
        { status: 400 }
      );
    }

    // Se mode='replace', deletar tudo antes
    if (mode === 'replace') {
      const existingFiles = await fs.readdir(PAGES_DIR);
      for (const file of existingFiles) {
        if (file.endsWith('.json')) {
          await fs.unlink(path.join(PAGES_DIR, file));
        }
      }
    }

    // Importar cada página
    const importResults = {
      imported: 0,
      skipped: 0,
      errors: 0,
      details: [] as Array<{ slug: string; status: string; message?: string }>,
    };

    for (const [slug, pageData] of Object.entries(pages)) {
      try {
        // Sanitizar slug
        const sanitizedSlug = slug
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, '-')
          .replace(/^-+|-+$/g, '');

        if (!sanitizedSlug) {
          importResults.skipped++;
          importResults.details.push({
            slug,
            status: 'skipped',
            message: 'Invalid slug after sanitization',
          });
          continue;
        }

        const filePath = path.join(PAGES_DIR, `${sanitizedSlug}.json`);

        // Se modo merge, verificar se existe
        if (mode === 'merge') {
          try {
            await fs.access(filePath);
            importResults.skipped++;
            importResults.details.push({
              slug: sanitizedSlug,
              status: 'skipped',
              message: 'Page already exists (merge mode)',
            });
            continue;
          } catch {
            // Não existe, pode criar
          }
        }

        await fs.writeFile(
          filePath,
          JSON.stringify(pageData, null, 2),
          'utf-8'
        );
        importResults.imported++;
        importResults.details.push({
          slug: sanitizedSlug,
          status: 'imported',
        });
      } catch (error) {
        importResults.errors++;
        importResults.details.push({
          slug,
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Import completed: ${importResults.imported} imported, ${importResults.skipped} skipped, ${importResults.errors} errors`,
      results: importResults,
    });
  } catch (error) {
    console.error('Error importing pages:', error);
    return NextResponse.json(
      {
        error: 'Failed to import pages',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
