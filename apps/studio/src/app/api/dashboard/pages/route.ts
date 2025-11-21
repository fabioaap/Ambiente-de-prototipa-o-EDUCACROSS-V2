import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

interface DashboardPage {
  id: string
  slug: string
  name: string
  domain: 'BackOffice' | 'FrontOffice' | 'Game' | 'Other'
  status: 'draft' | 'published'
  editUrl: string
  viewUrl: string
  createdAt: string
  updatedAt: string
  description?: string
}

interface DashboardResponse {
  pages: DashboardPage[]
  stats: {
    totalPages: number
    totalDomains: number
    activeDomains: string[]
    lastUpdated: string
    buildStatus: 'success' | 'building' | 'failed'
    storybook: 'online' | 'building' | 'offline'
  }
  domains: Record<string, { count: number; color: string }>
}

const DOMAIN_COLORS: Record<string, string> = {
  BackOffice: '#3b82f6',
  FrontOffice: '#10b981',
  Game: '#f59e0b',
  Other: '#6b7280',
}

async function scanPagesDirectory(dir: string, prefix = ''): Promise<DashboardPage[]> {
  const pages: DashboardPage[] = []
  const dataDir = path.join(process.cwd(), 'data/pages', dir)

  try {
    const entries = await fs.readdir(dataDir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.name === '.gitkeep') continue

      const fullPath = path.join(dataDir, entry.name)
      const slug = prefix ? `${prefix}/${entry.name}` : entry.name

      if (entry.isDirectory()) {
        // Recursivamente escanear subdiretórios
        const subPages = await scanPagesDirectory(path.join(dir, entry.name), slug)
        pages.push(...subPages)
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        // Ler arquivo JSON
        const content = await fs.readFile(fullPath, 'utf-8')
        const data = JSON.parse(content)

        // Determinar domínio pelo slug
        let domain: DashboardPage['domain'] = 'Other'
        if (slug.startsWith('backoffice')) domain = 'BackOffice'
        else if (slug.startsWith('frontoffice')) domain = 'FrontOffice'
        else if (slug.startsWith('game')) domain = 'Game'

        // Remover extensão .json do slug
        const cleanSlug = slug.replace(/\.json$/, '')
        const pageId = cleanSlug.replace(/\//g, '-')

        pages.push({
          id: pageId,
          slug: cleanSlug,
          name: data.root?.props?.title || cleanSlug.split('/').pop() || 'Sem título',
          domain,
          status: 'draft', // Futuro: ler de metadados
          editUrl: `/studio?page=${encodeURIComponent(cleanSlug)}`,
          viewUrl: `/pages/${cleanSlug}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          description: data.root?.props?.description,
        })
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dataDir}:`, error)
  }

  return pages
}

export async function GET() {
  try {
    const pages = await scanPagesDirectory('')

    // Agrupar por domínio e contar
    const domainCounts: Record<string, number> = {
      BackOffice: 0,
      FrontOffice: 0,
      Game: 0,
      Other: 0,
    }

    pages.forEach((page) => {
      domainCounts[page.domain]++
    })

    const activeDomains = Object.entries(domainCounts)
      .filter(([, count]) => count > 0)
      .map(([domain]) => domain)

    const response: DashboardResponse = {
      pages: pages.sort((a, b) => {
        // Ordenar por domínio e depois por nome
        if (a.domain !== b.domain) return a.domain.localeCompare(b.domain)
        return a.name.localeCompare(b.name)
      }),
      stats: {
        totalPages: pages.length,
        totalDomains: activeDomains.length,
        activeDomains,
        lastUpdated: new Date().toISOString(),
        buildStatus: 'success',
        storybook: 'online',
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
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in /api/dashboard/pages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
