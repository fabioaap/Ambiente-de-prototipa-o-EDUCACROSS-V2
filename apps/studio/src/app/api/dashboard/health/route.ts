import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

interface HealthMetrics {
  build: {
    status: 'success' | 'failed' | 'unknown'
    lastRun?: string
    duration?: string
  }
  lint: {
    status: 'success' | 'failed' | 'unknown'
    warnings: number
    errors: number
  }
  storybook: {
    bundleSize: string
    bundleSizeMB: number
    status: 'built' | 'not-built'
  }
  dependencies: {
    total: number
    outdated: number
    deprecated: number
  }
  lastUpdated: string
}

async function getBuildStatus(): Promise<HealthMetrics['build']> {
  // Verificar se há arquivos .next e storybook-static construídos
  const studioBuildPath = path.join(process.cwd(), 'apps/studio/.next')
  const storybookBuildPath = path.join(process.cwd(), 'apps/storybook/storybook-static')
  
  try {
    const [studioExists, storybookExists] = await Promise.all([
      fs.access(studioBuildPath).then(() => true).catch(() => false),
      fs.access(storybookBuildPath).then(() => true).catch(() => false),
    ])

    if (studioExists && storybookExists) {
      // Obter timestamp do último build
      const studioStats = await fs.stat(studioBuildPath)
      return {
        status: 'success',
        lastRun: studioStats.mtime.toISOString(),
        duration: 'N/A',
      }
    }

    return {
      status: 'unknown',
    }
  } catch {
    return {
      status: 'failed',
    }
  }
}

async function getLintStatus(): Promise<HealthMetrics['lint']> {
  try {
    const { stdout, stderr } = await execAsync('pnpm lint 2>&1', {
      cwd: process.cwd(),
      timeout: 30000,
    })

    const output = stdout + stderr
    const warningMatches = output.match(/(\d+)\s+warning/gi)
    const errorMatches = output.match(/(\d+)\s+error/gi)

    const warnings = warningMatches ? parseInt(warningMatches[0].match(/\d+/)?.[0] || '0') : 0
    const errors = errorMatches ? parseInt(errorMatches[0].match(/\d+/)?.[0] || '0') : 0

    return {
      status: errors > 0 ? 'failed' : 'success',
      warnings,
      errors,
    }
  } catch {
    return {
      status: 'unknown',
      warnings: 0,
      errors: 0,
    }
  }
}

async function getStorybookBundleSize(): Promise<HealthMetrics['storybook']> {
  const storybookPath = path.join(process.cwd(), 'apps/storybook/storybook-static')

  try {
    await fs.access(storybookPath)
    
    // Calcular tamanho do bundle recursivamente
    const calculateSize = async (dir: string): Promise<number> => {
      let totalSize = 0
      const entries = await fs.readdir(dir, { withFileTypes: true })

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          totalSize += await calculateSize(fullPath)
        } else {
          const stats = await fs.stat(fullPath)
          totalSize += stats.size
        }
      }

      return totalSize
    }

    const sizeInBytes = await calculateSize(storybookPath)
    const sizeInMB = sizeInBytes / (1024 * 1024)

    return {
      bundleSize: `${sizeInMB.toFixed(2)} MB`,
      bundleSizeMB: parseFloat(sizeInMB.toFixed(2)),
      status: 'built',
    }
  } catch {
    return {
      bundleSize: 'N/A',
      bundleSizeMB: 0,
      status: 'not-built',
    }
  }
}

async function getDependenciesStatus(): Promise<HealthMetrics['dependencies']> {
  try {
    // Contar dependências totais
    const packageJsonPath = path.join(process.cwd(), 'package.json')
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))
    const total = Object.keys(packageJson.dependencies || {}).length + 
                  Object.keys(packageJson.devDependencies || {}).length

    // Verificar dependências desatualizadas
    const { stdout } = await execAsync('pnpm outdated --format json', {
      cwd: process.cwd(),
      timeout: 30000,
    })

    const outdatedData = JSON.parse(stdout || '{}')
    const outdated = Object.keys(outdatedData).length

    // Verificar dependências deprecadas (aproximação)
    let deprecated = 0
    for (const [, info] of Object.entries(outdatedData)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((info as any).isDeprecated) {
        deprecated++
      }
    }

    return {
      total,
      outdated,
      deprecated,
    }
  } catch {
    // Fallback se o comando falhar
    return {
      total: 0,
      outdated: 0,
      deprecated: 0,
    }
  }
}

export async function GET() {
  try {
    const [build, lint, storybook, dependencies] = await Promise.all([
      getBuildStatus(),
      getLintStatus(),
      getStorybookBundleSize(),
      getDependenciesStatus(),
    ])

    const healthMetrics: HealthMetrics = {
      build,
      lint,
      storybook,
      dependencies,
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json(healthMetrics)
  } catch (error) {
    console.error('Error in /api/dashboard/health:', error)
    return NextResponse.json(
      { error: 'Failed to fetch health metrics' },
      { status: 500 }
    )
  }
}
