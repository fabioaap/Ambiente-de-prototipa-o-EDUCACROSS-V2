import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import type { Dirent } from 'fs';
import path from 'path';
import {
  dashboardLogger,
  generateCorrelationId,
  handleDashboardError,
} from '@/lib/dashboard-utils';
import { aggregateHealthMetrics, getHealthStatus } from '@/lib/health-metrics';
import {
  DashboardSummaryResponse,
  DashboardKPI,
  HealthStatusType,
  DashboardSummaryQuery,
  DashboardRecentPage,
  DashboardDomainSummary,
  DashboardStats,
  HealthMetricsDetail,
} from '@/lib/types/dashboard';

const DOMAIN_COLORS: Record<string, string> = {
  BackOffice: '#3b82f6',
  FrontOffice: '#10b981',
  Game: '#f59e0b',
  Other: '#6b7280',
};

const PAGES_DIR = path.join(process.cwd(), 'data', 'pages');

/**
 * Escaneia diretório de páginas recursivamente e gera metadados para o dashboard
 */
async function collectPages(relativeDir = ''): Promise<DashboardRecentPage[]> {
  const currentDir = path.join(PAGES_DIR, relativeDir);
  const pages: DashboardRecentPage[] = [];

  let entries: Dirent[];
  try {
    entries = await fs.readdir(currentDir, { withFileTypes: true });
  } catch {
    return [];
  }

  for (const entry of entries) {
    if (entry.name === '.gitkeep') continue;
    const nextRelative = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      const nested = await collectPages(nextRelative);
      pages.push(...nested);
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith('.json')) continue;

    try {
      const filePath = path.join(currentDir, entry.name);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const json = JSON.parse(fileContent);
      const stats = await fs.stat(filePath);

      const slug = nextRelative.replace(/\.json$/, '');
      const normalizedSlug = slug.replace(/\\/g, '/');

      let domain: DashboardRecentPage['domain'] = 'Other';
      const lower = normalizedSlug.toLowerCase();
      if (lower.startsWith('backoffice')) domain = 'BackOffice';
      else if (lower.startsWith('frontoffice')) domain = 'FrontOffice';
      else if (lower.startsWith('game')) domain = 'Game';

      pages.push({
        id: normalizedSlug.replace(/\//g, '-'),
        slug: normalizedSlug,
        name: json.root?.props?.title || normalizedSlug.split('/').pop() || 'Sem título',
        domain,
        status: json.status === 'published' ? 'published' : 'draft',
        editUrl: `/studio?slug=${encodeURIComponent(normalizedSlug)}`,
        viewUrl: `/${normalizedSlug}`,
        createdAt: stats.birthtime.toISOString(),
        updatedAt: stats.mtime.toISOString(),
        description: json.root?.props?.description,
      });
    } catch (error) {
      console.error('[API] Failed to parse page file', nextRelative, error);
    }
  }

  return pages;
}

function buildDomainSummary(pages: DashboardRecentPage[]): Record<string, DashboardDomainSummary> {
  const base: Record<string, DashboardDomainSummary> = {
    BackOffice: { count: 0, color: DOMAIN_COLORS.BackOffice },
    FrontOffice: { count: 0, color: DOMAIN_COLORS.FrontOffice },
    Game: { count: 0, color: DOMAIN_COLORS.Game },
    Other: { count: 0, color: DOMAIN_COLORS.Other },
  };

  pages.forEach((page) => {
    base[page.domain].count += 1;
  });

  return base;
}

function getDashboardStats(pages: DashboardRecentPage[]): DashboardStats {
  const domains = buildDomainSummary(pages);
  const activeDomains = Object.entries(domains)
    .filter(([, info]) => info.count > 0)
    .map(([domain]) => domain);

  return {
    totalPages: pages.length,
    totalDomains: activeDomains.length,
    activeDomains,
    lastUpdated: new Date().toISOString(),
  };
}

function buildKpis(stats: DashboardStats, domains: Record<string, DashboardDomainSummary>): DashboardKPI[] {
  return [
    {
      name: 'Páginas Criadas',
      value: stats.totalPages,
      unit: 'pages',
      trend: stats.totalPages > 0 ? 'up' : 'stable',
      changePercent: stats.totalPages > 0 ? 12.5 : 0,
    },
    {
      name: 'Domínios Ativos',
      value: stats.totalDomains,
      unit: 'domains',
      trend: 'stable',
      changePercent: 0,
    },
    {
      name: 'BackOffice',
      value: domains.BackOffice.count,
      unit: 'pages',
      trend: domains.BackOffice.count ? 'up' : 'stable',
      changePercent: domains.BackOffice.count ? 4.2 : 0,
    },
    {
      name: 'Game',
      value: domains.Game.count,
      unit: 'pages',
      trend: domains.Game.count ? 'up' : 'stable',
      changePercent: domains.Game.count ? 2.1 : 0,
    },
  ];
}

function toHealthDetail(score: number, metrics: Awaited<ReturnType<typeof aggregateHealthMetrics>>): HealthMetricsDetail {
  const healthStatus: HealthStatusType = getHealthStatus(score);
  return {
    ...metrics,
    healthStatus,
  };
}

/**
 * GET /api/dashboard/summary
 * Retorna resumo consolidado com KPIs, estatísticas e saúde do sistema
 */
export async function GET(request: Request) {
  const correlationId = generateCorrelationId();
  dashboardLogger.info('Requisição recebida em /api/dashboard/summary', {
    correlationId,
    method: 'GET',
    url: request.url,
  });

  try {
    const url = new URL(request.url);
    const params: DashboardSummaryQuery = {
      includeKpis: url.searchParams.get('includeKpis') !== 'false',
    };

    const pages = await collectPages('');
    const domains = buildDomainSummary(pages);
    const stats = getDashboardStats(pages);
    const recentPages = [...pages]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);

    const healthMetrics = await aggregateHealthMetrics();
    const healthDetail = toHealthDetail(healthMetrics.healthScore, healthMetrics);

    const kpis = params.includeKpis ? buildKpis(stats, domains) : [];

    const response: DashboardSummaryResponse = {
      success: true,
      data: {
        status: healthDetail.healthStatus,
        kpis,
        healthScore: healthDetail.healthScore,
        lastUpdated: stats.lastUpdated,
        stats,
        domains,
        health: healthDetail,
        recentPages,
      },
      timestamp: new Date().toISOString(),
    };

    dashboardLogger.info('Resposta enviada para /api/dashboard/summary', {
      correlationId,
      healthScore: healthDetail.healthScore,
      kpis: response.data.kpis.length,
      totalPages: stats.totalPages,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const { response, status } = handleDashboardError(
      error,
      '/api/dashboard/summary',
      correlationId
    );
    return NextResponse.json(response, { status });
  }
}
