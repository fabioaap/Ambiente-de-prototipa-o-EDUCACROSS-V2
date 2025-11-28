import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PAGES_DIR = path.join(process.cwd(), 'data', 'pages');

// POST /api/pages/rename - Renomeia uma página existente
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { oldSlug, newSlug } = body;
    
    if (!oldSlug || !newSlug) {
      return NextResponse.json(
        { error: 'Missing oldSlug or newSlug' },
        { status: 400 }
      );
    }
    
    // Sanitizar slugs
    const sanitizedOldSlug = oldSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const sanitizedNewSlug = newSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    
    if (sanitizedOldSlug === sanitizedNewSlug) {
      return NextResponse.json(
        { error: 'Slugs are the same' },
        { status: 400 }
      );
    }
    
    const oldPath = path.join(PAGES_DIR, `${sanitizedOldSlug}.json`);
    const newPath = path.join(PAGES_DIR, `${sanitizedNewSlug}.json`);
    
    // Verificar se arquivo antigo existe
    try {
      await fs.access(oldPath);
    } catch {
      return NextResponse.json(
        { error: 'Old page not found' },
        { status: 404 }
      );
    }
    
    // Verificar se novo slug já existe
    try {
      await fs.access(newPath);
      return NextResponse.json(
        { error: 'New page name already exists' },
        { status: 409 }
      );
    } catch {
      // Arquivo não existe, pode renomear
    }
    
    // Renomear arquivo
    await fs.rename(oldPath, newPath);
    
    return NextResponse.json({
      success: true,
      oldSlug: sanitizedOldSlug,
      newSlug: sanitizedNewSlug,
      message: 'Page renamed successfully',
    });
  } catch (error) {
    console.error('Error renaming page:', error);
    return NextResponse.json(
      { error: 'Failed to rename page' },
      { status: 500 }
    );
  }
}
