import { NextResponse } from 'next/server';
import { parseJSON } from '@/lib/export/json';
import { parseXML } from '@/lib/export/xml';
import { parseCSV } from '@/lib/export/csv';
import { validateJSONExport } from '@/lib/export/validation';

type ImportFormat = 'json' | 'xml' | 'csv';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Detect format from file extension or content-type
    const format = detectFormat(file);
    const content = await file.text();

    let pages;
    const errors: string[] = [];

    try {
      switch (format) {
        case 'json': {
          const data = parseJSON(content);

          // Validate JSON schema
          const validation = validateJSONExport(data);
          if (!validation.valid) {
            return NextResponse.json(
              {
                error: 'JSON validation failed',
                details: validation.errors,
              },
              { status: 400 }
            );
          }

          pages = data.pages;
          break;
        }

        case 'xml': {
          pages = parseXML(content);
          break;
        }

        case 'csv': {
          pages = parseCSV(content);
          break;
        }

        default:
          return NextResponse.json(
            { error: `Unsupported format: ${format}` },
            { status: 400 }
          );
      }
    } catch (parseError: unknown) {
      const message = parseError instanceof Error ? parseError.message : 'Unknown parse error';
      return NextResponse.json(
        {
          error: 'Parse error',
          message,
          format,
        },
        { status: 400 }
      );
    }

    // Additional validation for all pages
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      // Validate required fields
      if (!page.id) {
        errors.push(`Row ${i + 1}: Missing required field "id"`);
      }
      if (!page.title) {
        errors.push(`Row ${i + 1}: Missing required field "title"`);
      }
      if (!page.status) {
        errors.push(`Row ${i + 1}: Missing required field "status"`);
      } else {
        const validStatuses = ['published', 'draft', 'archived'];
        if (!validStatuses.includes(page.status)) {
          errors.push(
            `Row ${i + 1}: Invalid status "${page.status}" (must be one of: ${validStatuses.join(', ')})`
          );
        }
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: errors,
        },
        { status: 400 }
      );
    }

    // Mock save - replace with real persistence
    console.log(`Would import ${pages.length} pages from ${format.toUpperCase()}`);

    return NextResponse.json({
      success: true,
      imported: pages.length,
      format,
      message: `Successfully imported ${pages.length} pages from ${format.toUpperCase()}`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Import error:', error);
    return NextResponse.json(
      {
        error: 'Import failed',
        message,
      },
      { status: 500 }
    );
  }
}

/**
 * Detect file format from filename or content-type
 */
function detectFormat(file: File): ImportFormat {
  const filename = file.name.toLowerCase();
  const contentType = file.type.toLowerCase();

  if (filename.endsWith('.json') || contentType.includes('json')) {
    return 'json';
  }

  if (filename.endsWith('.xml') || contentType.includes('xml')) {
    return 'xml';
  }

  if (filename.endsWith('.csv') || contentType.includes('csv')) {
    return 'csv';
  }

  // Default to CSV for unknown types
  return 'csv';
}
