import { DashboardClient } from '@/components/DashboardClient';
import type { PagesResponse, PageMetadata } from '@/types/page';

async function getPages(): Promise<PagesResponse> {
  try {
    // Em build time, ler diretamente do sistema de arquivos
    if (process.env.NODE_ENV === 'production' || !process.env.NEXT_PUBLIC_API_URL) {
      const { promises: fs } = await import('fs');
      const path = await import('path');
      
      const PAGES_DIR = path.join(process.cwd(), 'data', 'pages');
      
      async function getAllPages(dir: string, baseDir: string = dir): Promise<PageMetadata[]> {
        try {
          const entries = await fs.readdir(dir, { withFileTypes: true });
          const pages: PageMetadata[] = [];

          for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            
            if (entry.isDirectory()) {
              const subPages = await getAllPages(fullPath, baseDir);
              pages.push(...subPages);
            } else if (entry.name.endsWith('.json') && entry.name !== '.gitkeep') {
              const content = await fs.readFile(fullPath, 'utf-8');
              const data = JSON.parse(content);
              const relativePath = path.relative(baseDir, fullPath);
              const slug = relativePath.replace(/\\/g, '/').replace('.json', '');
              
              // Detectar domínio
              let domain: 'BackOffice' | 'FrontOffice' | 'Game' | 'Geral' = 'Geral';
              if (relativePath.startsWith('backoffice/') || relativePath.startsWith('backoffice\\')) {
                domain = 'BackOffice';
              } else if (relativePath.startsWith('frontoffice/') || relativePath.startsWith('frontoffice\\')) {
                domain = 'FrontOffice';
              } else if (relativePath.startsWith('game/') || relativePath.startsWith('game\\')) {
                domain = 'Game';
              }
              
              const stats = await fs.stat(fullPath);
              
              pages.push({
                slug,
                title: data.root?.props?.title || slug.split('/').pop() || slug,
                domain,
                status: data.root?.props?.status || 'draft',
                lastModified: stats.mtime.toISOString(),
              });
            }
          }

          return pages;
        } catch (error) {
          console.error('Error reading pages:', error);
          return [];
        }
      }
      
      const pages = await getAllPages(PAGES_DIR);
      return { pages };
    }
    
    // Em runtime, usar API
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/pages`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch pages');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching pages:', error);
    return { pages: [] };
  }
}

export default async function DashboardPage() {
  const { pages } = await getPages();

  return <DashboardClient initialPages={pages} />;
}

export const metadata = {
  title: 'Dashboard - Studio',
  description: 'Gerencie seus protótipos de páginas',
};

// Forçar renderização dinâmica
export const dynamic = 'force-dynamic';
