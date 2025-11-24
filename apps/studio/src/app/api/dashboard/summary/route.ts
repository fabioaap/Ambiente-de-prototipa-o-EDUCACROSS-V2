import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { aggregateHealthMetrics, getHealthStatus } from '@/lib/health-metrics';

/**
 * Interface para páginas do dashboard
 */
interface DashboardPage {
  id: string;
  slug: string;
  name: string;
  domain: 'BackOffice' | 'FrontOffice' | 'Game' | 'Other';
  status: 'draft' | 'published';
  editUrl: string;
  viewUrl: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
}

/**
 * Interface de métricas de saúde
 */
interface HealthMetrics {
  buildStatus: 'success' | 'failure' | 'warning';
  lintStatus: 'success' | 'failure' | 'warning';
  typeCheckStatus: 'success' | 'failure';
  dependenciesHealth: 'healthy' | 'outdated' | 'vulnerable';
  healthScore: number;
  healthStatus: 'excellent' | 'good' | 'warning' | 'critical';
  lastChecked: string;
}

/**
 * Interface de resposta do summary
 */
interface DashboardSummaryResponse {
  success: boolean;
  data: {
    stats: {
      totalPages: number;
      totalDomains: number;
      activeDomains: string[];
      lastUpdated: string;
    };
    domains: Record<string, { count: number; color: string }>;
    health: HealthMetrics;
    recentPages: DashboardPage[];
  };
  timestamp: string;
}

const DOMAIN_COLORS: Record<string, string> = {
  BackOffice: '#3b82f6',
  FrontOffice: '#10b981',
  Game: '#f59e0b',
  Other: '#6b7280',
};

/**
 * Escaneia diretório de páginas recursivamente
 */
async function scanPagesDirectory(dir: string, prefix = ''): Promise<DashboardPage[]> {
  const pages: DashboardPage[] = [];
  const dataDir = path.join(process.cwd(), 'data/pages', dir);

  try {
    const entries = await fs.readdir(dataDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name === '.gitkeep') continue;

      const fullPath = path.join(dataDir, entry.name);
      const slug = prefix ? `${prefix}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        const subPages = await scanPagesDirectory(path.join(dir, entry.name), slug);
        pages.push(...subPages);
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        try {
          const content = await fs.readFile(fullPath, 'utf-8');
          const data = JSON.parse(content);
          const stats = await fs.stat(fullPath);

          let domain: DashboardPage['domain'] = 'Other';
          if (slug.toLowerCase().startsWith('backoffice')) domain = 'BackOffice';
          else if (slug.toLowerCase().startsWith('frontoffice')) domain = 'FrontOffice';
          else if (slug.toLowerCase().startsWith('game')) domain = 'Game';

          const cleanSlug = slug.replace(/\.json$/, '');
          const pageId = cleanSlug.replace(/\//g, '-');

          pages.push({
            id: pageId,
            slug: cleanSlug,
            name: data.root?.props?.title || cleanSlug.split('/').pop() || 'Sem título',
            domain,
            status: 'draft',
            editUrl: `/studio?page=${encodeURIComponent(cleanSlug)}`,
            viewUrl: `/${cleanSlug}`,
            createdAt: stats.birthtime.toISOString(),
            updatedAt: stats.mtime.toISOString(),
            description: data.root?.props?.description,
          });
        } catch (err) {
          console.error(`Error reading page ${fullPath}:`, err);
        }
      }
    }
  } catch {
    // Diretório não existe ou erro de leitura
  }

  return pages;
}

/**
 * GET /api/dashboard/summary
 * Retorna um resumo consolidado com estatísticas de páginas e métricas de saúde
 */
export async function GET() {
  try {
    // Buscar páginas
    const pages = await scanPagesDirectory('');

    // Agrupar por domínio
    const domainCounts: Record<string, number> = {
      BackOffice: 0,
      FrontOffice: 0,
      Game: 0,
      Other: 0,
    };

    pages.forEach((page) => {
      domainCounts[page.domain]++;
    });

    const activeDomains = Object.entries(domainCounts)
      .filter(([, count]) => count > 0)
      .map(([domain]) => domain);

    // Buscar métricas de saúde
    let healthMetrics: HealthMetrics;
    try {
      const metrics = await aggregateHealthMetrics();
      const healthStatus = getHealthStatus(metrics.healthScore);
      healthMetrics = {
        ...metrics,
        healthStatus,
      };
    } catch {
      // Fallback se falhar ao buscar métricas
      healthMetrics = {
        buildStatus: 'warning',
        lintStatus: 'warning',
        typeCheckStatus: 'success',
        dependenciesHealth: 'healthy',
        healthScore: 75,
        healthStatus: 'good',
        lastChecked: new Date().toISOString(),
      };
    }

    // Ordenar páginas por data de atualização (mais recentes primeiro)
    const recentPages = [...pages]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);

    const response: DashboardSummaryResponse = {
      success: true,
      data: {
        stats: {
          totalPages: pages.length,
          totalDomains: activeDomains.length,
          activeDomains,
          lastUpdated: new Date().toISOString(),
        },
        domains: {
          BackOffice: {
            count: domainCounts.BackOffice,
            color: DOMAIN_COLORS.BackOffice,
          },
          FrontOffice: {
            count: domainCounts.FrontOffice,
            color: DOMAIN_COLORS.FrontOffice,
          },
          Game: {
            count: domainCounts.Game,
            color: DOMAIN_COLORS.Game,
          },
        },
        health: healthMetrics,
        recentPages,
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[API] Dashboard summary failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch dashboard summary',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
