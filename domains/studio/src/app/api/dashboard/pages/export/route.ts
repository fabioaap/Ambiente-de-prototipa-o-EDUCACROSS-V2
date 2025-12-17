import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

interface PageExport {
  id: string;
  title: string;
  slug: string;
  status: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

type ExportFormat = 'csv' | 'json' | 'xml';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const format = (searchParams.get('format') || 'csv') as ExportFormat;

    // Mock data - replace with real page fetch
    const pages: PageExport[] = Array.from({ length: 42 }, (_, i) => ({
      id: `page-${i + 1}`,
      title: `Page ${i + 1}`,
      slug: `/page-${i + 1}`,
      status: ['published', 'draft', 'archived'][i % 3],
      owner: `user-${(i % 5) + 1}`,
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - i * 3600000).toISOString(),
    }));

    const timestamp = new Date().toISOString().split('T')[0];

    switch (format) {
      case 'json': {
        const jsonData = {
          exportedAt: new Date().toISOString(),
          totalPages: pages.length,
          pages,
        };
        return new NextResponse(JSON.stringify(jsonData, null, 2), {
          headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': `attachment; filename="pages-export-${timestamp}.json"`,
          },
        });
      }

      case 'xml': {
        const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
<export>
  <metadata>
    <exportedAt>${new Date().toISOString()}</exportedAt>
    <totalPages>${pages.length}</totalPages>
  </metadata>
  <pages>
${pages.map(page => `    <page>
      <id>${escapeXml(page.id)}</id>
      <title>${escapeXml(page.title)}</title>
      <slug>${escapeXml(page.slug)}</slug>
      <status>${escapeXml(page.status)}</status>
      <owner>${escapeXml(page.owner)}</owner>
      <createdAt>${page.createdAt}</createdAt>
      <updatedAt>${page.updatedAt}</updatedAt>
    </page>`).join('\n')}
  </pages>
</export>`;
        return new NextResponse(xmlData, {
          headers: {
            'Content-Type': 'application/xml',
            'Content-Disposition': `attachment; filename="pages-export-${timestamp}.xml"`,
          },
        });
      }

      case 'csv':
      default: {
        const headers = ['ID', 'Title', 'Slug', 'Status', 'Owner', 'Created At', 'Updated At'];
        const rows = pages.map((p) => [
          p.id,
          p.title,
          p.slug,
          p.status,
          p.owner,
          p.createdAt,
          p.updatedAt,
        ]);

        const csv = [
          headers.join(','),
          ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
        ].join('\n');

        return new NextResponse(csv, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="pages-export-${timestamp}.csv"`,
          },
        });
      }
    }
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
