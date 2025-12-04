import { NextResponse } from 'next/server';

interface PageExport {
  id: string;
  title: string;
  slug: string;
  status: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export async function GET() {
  try {
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

    // Convert to CSV
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
        'Content-Disposition': `attachment; filename="pages-export-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
