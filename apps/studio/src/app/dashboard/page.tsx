'use client';

import Link from 'next/link';
import { Layout, Text, Card, Button, Badge, Progress } from '@prototipo/design-system';
import { HealthIndicator } from '@prototipo/design-system';
import { HealthMetricsPanel } from '@/components/widgets/HealthMetricsWidgets';
import { useHealthMetrics } from '@/lib/use-health-metrics';
import { useDashboardSummary } from '@/hooks/useDashboardSummary';
import styles from './dashboard.module.css';

/**
 * Componente Skeleton para loading state
 */
function Skeleton({ className }: { className?: string }) {
  return <div className={`${styles.skeleton} ${className || ''}`} />;
}

/**
 * Componente de skeleton para KPI cards
 */
function KpiSkeleton() {
  return (
    <Card variant="elevated" padding="md">
      <div className={styles.kpiCard}>
        <Skeleton className={styles.skeletonTextSmall} />
        <Skeleton className={styles.skeletonTextLarge} />
      </div>
    </Card>
  );
}

/**
 * Componente de skeleton para health cards
 */
function HealthSkeleton() {
  return (
    <Card variant="bordered" padding="sm">
      <Skeleton className={styles.skeletonHealthCard} />
    </Card>
  );
}

/**
 * Componente de skeleton para page cards
 */
function PageSkeleton() {
  return (
    <Card variant="bordered" padding="md">
      <div className={styles.pageCard}>
        <Skeleton className={styles.skeletonText} />
        <Skeleton className={styles.skeletonTextSmall} />
        <Skeleton className={styles.skeletonTextSmall} />
      </div>
    </Card>
  );
}

/**
 * Formata data para exibição em pt-BR
 */
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Retorna cor do badge de domínio
 */
function getDomainBadgeVariant(domain: string): 'error' | 'default' | 'success' | 'warning' | 'info' {
  switch (domain) {
    case 'BackOffice':
      return 'info';
    case 'FrontOffice':
      return 'success';
    case 'Game':
      return 'warning';
    default:
      return 'default';
  }
}

/**
 * Retorna ícone do domínio
 */
function getDomainIcon(domain: string): string {
  switch (domain) {
    case 'BackOffice':
      return '🏢';
    case 'FrontOffice':
      return '🎓';
    case 'Game':
      return '🎮';
    default:
      return '📄';
  }
}

/**
 * Retorna status visual para health
 */
function getHealthIcon(status: string): string {
  switch (status) {
    case 'success':
    case 'healthy':
      return '✅';
    case 'warning':
    case 'outdated':
      return '⚠️';
    case 'failure':
    case 'error':
    case 'vulnerable':
      return '❌';
    default:
      return '❓';
  }
}

/**
 * Dashboard Page - Shell UI com KPIs e métricas
 */
export default function DashboardPage() {
  const { data, isLoading, isError, error, refresh } = useDashboardSummary();
  const healthMetrics = useHealthMetrics();

  return (
    <Layout maxWidth="xl" paddingY="lg">
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <Text as="h1" size="4xl" weight="bold" color="primary" className={styles.headerTitle}>
            Dashboard
          </Text>
          <Text as="p" size="lg" color="muted" className={styles.headerSubtitle}>
            Visão geral do ambiente de prototipação EDUCACROSS
          </Text>
        </header>

        {/* Estado de Erro */}
        {isError && (
          <div className={styles.errorBanner} role="alert">
            <span className={styles.errorIcon} aria-hidden="true">⚠️</span>
            <h2 className={styles.errorTitle}>Erro ao carregar dados</h2>
            <p className={styles.errorMessage}>
              {error?.message || 'Não foi possível conectar à API do dashboard.'}
            </p>
            <Button variant="primary" size="sm" onClick={() => refresh()}>
              Tentar Novamente
            </Button>
          </div>
        )}

        {/* KPIs Grid - Loading */}
        {isLoading && (
          <section className={styles.section} aria-label="Carregando KPIs">
            <div className={styles.kpiGrid}>
              <KpiSkeleton />
              <KpiSkeleton />
              <KpiSkeleton />
              <KpiSkeleton />
            </div>
          </section>
        )}

        {/* KPIs Grid - Dados carregados */}
        {!isLoading && !isError && data && (
          <>
            {/* KPIs Principais */}
            <section className={styles.section} aria-label="Indicadores principais">
              <div className={styles.kpiGrid}>
                <Card variant="elevated" padding="md" role="region" aria-label="Total de páginas">
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>Total de Páginas</span>
                    <span className={styles.kpiValue}>{data.stats.totalPages}</span>
                  </div>
                </Card>

                <Card variant="elevated" padding="md" role="region" aria-label="Domínios ativos">
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>Domínios Ativos</span>
                    <span className={styles.kpiValue}>{data.stats.totalDomains}</span>
                  </div>
                </Card>

                <Card variant="elevated" padding="md" role="region" aria-label="Score de saúde">
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>Score de Saúde</span>
                    <span className={styles.kpiValue}>{data.health.healthScore}/100</span>
                  </div>
                </Card>

                <Card variant="elevated" padding="md" role="region" aria-label="Status do sistema">
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>Status</span>
                    <span className={styles.kpiValue}>
                      {data.health.healthStatus === 'excellent' ? '🟢' : 
                       data.health.healthStatus === 'good' ? '🟡' : 
                       data.health.healthStatus === 'warning' ? '🟠' : '🔴'}
                      {' '}
                      {data.health.healthStatus.charAt(0).toUpperCase() + data.health.healthStatus.slice(1)}
                    </span>
                  </div>
                </Card>
              </div>
            </section>

            {/* Métricas de Performance */}
            <section className={styles.section} aria-label="Métricas de performance">
              <HealthMetricsPanel
                metrics={healthMetrics.metrics}
                loading={healthMetrics.loading}
                error={healthMetrics.error}
                onRetry={healthMetrics.refetch}
                title="Métricas de Performance"
                size="sm"
                enableExport
                lastUpdated={healthMetrics.lastUpdated || undefined}
              />
            </section>

            {/* Saúde e Domínios lado a lado */}
            <div className={styles.twoColumnGrid}>
              {/* Saúde do Sistema */}
              <section className={styles.section} aria-label="Saúde do sistema">
                <Card variant="bordered" padding="md">
                  <div className={styles.sectionHeader}>
                    <Text as="h2" size="xl" weight="semibold" className={styles.sectionTitle}>
                      Saúde do Sistema
                    </Text>
                    <Progress 
                      value={data.health.healthScore} 
                      size="sm" 
                      color={data.health.healthScore >= 80 ? 'success' : data.health.healthScore >= 60 ? 'warning' : 'error'}
                      aria-label={`Score de saúde: ${data.health.healthScore}%`}
                    />
                  </div>

                  <div className={styles.healthGrid}>
                    <HealthIndicator
                      title="Build"
                      value={getHealthIcon(data.health.buildStatus)}
                      status={data.health.buildStatus === 'success' ? 'success' : data.health.buildStatus === 'warning' ? 'warning' : 'error'}
                      description={data.health.buildStatus}
                      size="sm"
                    />
                    <HealthIndicator
                      title="Lint"
                      value={getHealthIcon(data.health.lintStatus)}
                      status={data.health.lintStatus === 'success' ? 'success' : data.health.lintStatus === 'warning' ? 'warning' : 'error'}
                      description={data.health.lintStatus}
                      size="sm"
                    />
                    <HealthIndicator
                      title="Type Check"
                      value={getHealthIcon(data.health.typeCheckStatus)}
                      status={data.health.typeCheckStatus === 'success' ? 'success' : 'error'}
                      description={data.health.typeCheckStatus}
                      size="sm"
                    />
                    <HealthIndicator
                      title="Dependências"
                      value={getHealthIcon(data.health.dependenciesHealth)}
                      status={data.health.dependenciesHealth === 'healthy' ? 'success' : data.health.dependenciesHealth === 'outdated' ? 'warning' : 'error'}
                      description={data.health.dependenciesHealth}
                      size="sm"
                    />
                  </div>

                  <Text size="xs" color="muted" style={{ marginTop: '1rem' }}>
                    Última atualização: {formatDate(data.health.lastChecked)}
                  </Text>
                </Card>
              </section>

              {/* Domínios */}
              <section className={styles.section} aria-label="Páginas por domínio">
                <Card variant="bordered" padding="md">
                  <div className={styles.sectionHeader}>
                    <Text as="h2" size="xl" weight="semibold" className={styles.sectionTitle}>
                      Páginas por Domínio
                    </Text>
                  </div>

                  <div className={styles.domainsGrid}>
                    {Object.entries(data.domains).map(([domain, info]) => (
                      <div key={domain} className={styles.domainCard}>
                        <div 
                          className={styles.domainIcon} 
                          style={{ backgroundColor: info.color }}
                          aria-hidden="true"
                        >
                          {getDomainIcon(domain)}
                        </div>
                        <div className={styles.domainInfo}>
                          <div className={styles.domainName}>{domain}</div>
                          <div className={styles.domainCount}>
                            {info.count} {info.count === 1 ? 'página' : 'páginas'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>
            </div>

            {/* Páginas Recentes */}
            <section className={styles.section} aria-label="Páginas recentes">
              <Card variant="bordered" padding="md">
                <div className={styles.sectionHeader}>
                  <Text as="h2" size="xl" weight="semibold" className={styles.sectionTitle}>
                    Páginas Recentes
                  </Text>
                  <Link href="/studio" className={styles.link}>
                    <Button variant="outline" size="sm">
                      Nova Página
                    </Button>
                  </Link>
                </div>

                {data.recentPages.length === 0 ? (
                  <div className={styles.emptyState}>
                    <span className={styles.emptyIcon} aria-hidden="true">📄</span>
                    <h3 className={styles.emptyTitle}>Nenhuma página criada ainda</h3>
                    <p className={styles.emptyMessage}>
                      Comece criando sua primeira página no Puck Studio.
                    </p>
                    <Link href="/studio">
                      <Button variant="primary" size="md">
                        Criar Página
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className={styles.recentPagesGrid}>
                    {data.recentPages.map((page) => (
                      <Card key={page.id} variant="elevated" padding="md">
                        <div className={styles.pageCard}>
                          <div className={styles.pageHeader}>
                            <h3 className={styles.pageTitle}>{page.name}</h3>
                            <Badge variant={getDomainBadgeVariant(page.domain)} size="sm">
                              {page.domain}
                            </Badge>
                          </div>

                          <p className={styles.pageMeta}>
                            <strong>Slug:</strong> /{page.slug}
                          </p>

                          <p className={styles.pageMeta}>
                            <strong>Atualizado:</strong> {formatDate(page.updatedAt)}
                          </p>

                          <div className={styles.pageActions}>
                            <Link href={page.viewUrl} style={{ flex: 1 }}>
                              <Button variant="outline" size="sm" fullWidth>
                                Visualizar
                              </Button>
                            </Link>
                            <Link href={page.editUrl} style={{ flex: 1 }}>
                              <Button variant="primary" size="sm" fullWidth>
                                Editar
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
              Última atualização: {formatDate(data.stats.lastUpdated)}
            </footer>
          </>
        )}

        {/* Loading completo */}
        {isLoading && (
          <>
            <section className={styles.section}>
              <div className={styles.twoColumnGrid}>
                <Card variant="bordered" padding="md">
                  <Skeleton className={styles.skeletonText} />
                  <div className={styles.healthGrid} style={{ marginTop: '1rem' }}>
                    <HealthSkeleton />
                    <HealthSkeleton />
                    <HealthSkeleton />
                    <HealthSkeleton />
                  </div>
                </Card>
                <Card variant="bordered" padding="md">
                  <Skeleton className={styles.skeletonText} />
                  <div className={styles.domainsGrid} style={{ marginTop: '1rem' }}>
                    <Skeleton className={styles.skeletonCard} />
                    <Skeleton className={styles.skeletonCard} />
                    <Skeleton className={styles.skeletonCard} />
                  </div>
                </Card>
              </div>
            </section>

            <section className={styles.section}>
              <Card variant="bordered" padding="md">
                <Skeleton className={styles.skeletonText} />
                <div className={styles.recentPagesGrid} style={{ marginTop: '1rem' }}>
                  <PageSkeleton />
                  <PageSkeleton />
                  <PageSkeleton />
                </div>
              </Card>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}
