import { NextResponse } from 'next/server';

interface ImportRow {
  id?: string;
  title: string;
  slug: string;
  status: 'published' | 'draft' | 'archived';
  owner: string;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.name.endsWith('.csv')) {
      return NextResponse.json({ error: 'File must be CSV' }, { status: 400 });
    }

    const text = await file.text();
    const lines = text.split('\n').filter((line) => line.trim());

    if (lines.length < 2) {
      return NextResponse.json({ error: 'CSV must have header and data rows' }, { status: 400 });
    }

    // Parse CSV
    const headers = lines[0].split(',').map((h) => h.trim().replace(/"/g, ''));
    const rows: ImportRow[] = [];
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map((v) => v.trim().replace(/"/g, ''));
      
      if (values.length !== headers.length) {
        errors.push(`Row ${i + 1}: Column count mismatch`);
        continue;
      }

      const row: Record<string, string> = {};
      headers.forEach((header, idx) => {
        const key = header.toLowerCase().replace(/ /g, '');
        row[key] = values[idx];
      });

      // Validate required fields
      if (!row.title || !row.slug || !row.status || !row.owner) {
        errors.push(`Row ${i + 1}: Missing required fields`);
        continue;
      }

      // Validate status
      if (!['published', 'draft', 'archived'].includes(row.status)) {
        errors.push(`Row ${i + 1}: Invalid status "${row.status}"`);
        continue;
      }

      rows.push({
        id: row.id,
        title: row.title,
        slug: row.slug,
        status: row.status as 'published' | 'draft' | 'archived',
        owner: row.owner,
      });
    }

    if (errors.length > 0 && rows.length === 0) {
      return NextResponse.json(
        { error: 'Import failed', errors },
        { status: 400 }
      );
    }

    // Mock save - replace with real persistence
    console.log(`Would import ${rows.length} pages`);

    return NextResponse.json({
      success: true,
      imported: rows.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json({ error: 'Import failed' }, { status: 500 });
  }
}
