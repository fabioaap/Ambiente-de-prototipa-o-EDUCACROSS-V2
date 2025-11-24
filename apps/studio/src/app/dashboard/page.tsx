'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layout, Text, Card, Button, Input, Badge } from '@prototipo/design-system';
import { HealthIndicator } from '@prototipo/design-system';
import styles from './dashboard.module.css';

interface Page {
  id: string;
  slug: string;
  title: string;
  domain: string;
  lastModified: string;
  status: string;
}

interface ApiResponse {
  pages: Page[];
  total: number;
  limit: number;
  offset: number;
}

interface HealthMetrics {
  buildStatus: 'success' | 'failure' | 'warning';
  lintStatus: 'success' | 'failure' | 'warning';
  typeCheckStatus: 'success' | 'failure';
  dependenciesHealth: 'healthy' | 'outdated' | 'vulnerable';
  healthScore: number;
  healthStatus: 'excellent' | 'good' | 'warning' | 'critical';
  lastChecked: string;
}

interface HealthResponse {
  success: boolean;
  data: HealthMetrics;
  timestamp: string;
}

export default function DashboardPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [filteredPages, setFilteredPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [health, setHealth] = useState<HealthMetrics | null>(null);
  const [healthLoading, setHealthLoading] = useState(true);

  useEffect(() => {
    fetchPages();
    fetchHealth();
  }, []);

  useEffect(() => {
    filterPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages, searchQuery, domainFilter]);

  async function fetchPages() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/pages');

      if (!response.ok) {
        throw new Error('Failed to fetch pages');
      }

      const data: ApiResponse = await response.json();
      setPages(data.pages);
      setFilteredPages(data.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function fetchHealth() {
    try {
      setHealthLoading(true);
      const response = await fetch('/api/health');

      if (!response.ok) {
        throw new Error('Failed to fetch health metrics');
      }

      const data: HealthResponse = await response.json();
      setHealth(data.data);
    } catch (err) {
      console.error('Error fetching health metrics:', err);
    } finally {
      setHealthLoading(false);
    }
  }

  function filterPages() {
    let filtered = [...pages];

    if (domainFilter !== 'all') {
      filtered = filtered.filter(page => page.domain === domainFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(page =>
        page.title.toLowerCase().includes(query) ||
        page.slug.toLowerCase().includes(query)
      );
    }

    setFilteredPages(filtered);
  }

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

  function getDomainColor(domain: string): 'error' | 'default' | 'success' | 'warning' | 'info' {
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

  const domainOptions = [
    { value: 'all', label: 'Todos', icon: '📋' },
    { value: 'BackOffice', label: 'BackOffice', icon: '📊' },
    { value: 'FrontOffice', label: 'FrontOffice', icon: '🌐' },
    { value: 'Game', label: 'Game', icon: '🎮' },
  ];

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#f59e0b';
    if (score >= 50) return '#ef4444';
    return '#7c3aed';
  };

  return (
    <Layout maxWidth="2xl" paddingY="lg">
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Text as="h1" size="4xl" weight="bold">
            Dashboard
          </Text>
          <Text as="p" size="base" color="muted" className={styles.healthHeaderDescription}>
            Gerencie todas as páginas prototipadas
          </Text>
        </div>
        <Link href="/studio" className={styles.createButton}>
          <Button variant="primary" size="md">
            ➕ Nova Página
          </Button>
        </Link>
      </div>

      {/* Health Score Section */}
      {!healthLoading && health && (
        <Card variant="elevated" padding="lg" className={styles.healthCard}>
          <div className={styles.healthHeader}>
            <div>
              <Text as="h2" size="lg" weight="semibold">
                Saúde do Sistema
              </Text>
            </div>
            <div className={styles.scoreContainer}>
              <div
                className={styles.scoreCircle}
                style={{
                  background: `conic-gradient(${getHealthScoreColor(health.healthScore)} ${health.healthScore * 3.6}deg, #e5e7eb 0deg)`,
                }}
              >
                <div className={styles.scoreInner}>
                  <Text weight="bold" size="lg">
                    {health.healthScore}
                  </Text>
                </div>
              </div>
              <Text size="sm" color="muted">
                {health.healthStatus === 'excellent' && '🎉 Excelente'}
                {health.healthStatus === 'good' && '✅ Bom'}
                {health.healthStatus === 'warning' && '⚠️ Aviso'}
                {health.healthStatus === 'critical' && '🚨 Crítico'}
              </Text>
            </div>
          </div>

          <div className={styles.healthGrid}>
            <HealthIndicator
              title="Build"
              value={health.buildStatus === 'success' ? '✅' : health.buildStatus === 'warning' ? '⚠️' : '❌'}
              status={health.buildStatus === 'success' ? 'success' : health.buildStatus === 'warning' ? 'warning' : 'error'}
              description={health.buildStatus}
              size="sm"
            />
            <HealthIndicator
              title="Lint"
              value={health.lintStatus === 'success' ? '✅' : health.lintStatus === 'warning' ? '⚠️' : '❌'}
              status={health.lintStatus === 'success' ? 'success' : health.lintStatus === 'warning' ? 'warning' : 'error'}
              description={health.lintStatus}
              size="sm"
            />
            <HealthIndicator
              title="Type Check"
              value={health.typeCheckStatus === 'success' ? '✅' : '❌'}
              status={health.typeCheckStatus === 'success' ? 'success' : 'error'}
              description={health.typeCheckStatus}
              size="sm"
            />
            <HealthIndicator
              title="Dependencies"
              value={health.dependenciesHealth === 'healthy' ? '✅' : health.dependenciesHealth === 'outdated' ? '⚠️' : '❌'}
              status={health.dependenciesHealth === 'healthy' ? 'success' : health.dependenciesHealth === 'outdated' ? 'warning' : 'error'}
              description={health.dependenciesHealth}
              size="sm"
            />
          </div>

          <Text size="xs" color="muted" className={styles.lastChecked}>
            Última atualização: {new Date(health.lastChecked).toLocaleString('pt-BR')}
          </Text>
        </Card>
      )}

      {/* Filters Section */}
      <Card variant="bordered" padding="lg" className={styles.filtersCard}>
        <div className={styles.filtersGrid}>
          <div className={styles.searchContainer}>
            <label className={styles.label}>🔍 Buscar</label>
            <Input
              type="text"
              placeholder="Título ou slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.domainContainer}>
            <label className={styles.label}>📂 Domínio</label>
            <div className={styles.domainButtons}>
              {domainOptions.map((domain) => (
                <button
                  key={domain.value}
                  className={`${styles.domainButton} ${domainFilter === domain.value ? styles.active : ''}`}
                  onClick={() => setDomainFilter(domain.value)}
                >
                  <span>{domain.icon}</span>
                  <span>{domain.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      {!loading && !error && (
        <div className={styles.stats}>
          <Text size="sm" color="muted">
            <strong>{filteredPages.length}</strong> de <strong>{pages.length}</strong> páginas
            {searchQuery && ` • Buscando: "${searchQuery}"`}
            {domainFilter !== 'all' && ` • Filtro: ${domainFilter}`}
          </Text>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <Card variant="bordered" padding="lg" className={styles.emptyState}>
          <Text color="muted" style={{ textAlign: 'center' }}>
            ⏳ Carregando páginas...
          </Text>
        </Card>
      )}

      {/* Error State */}
      {error && !loading && (
        <Card variant="bordered" padding="lg" className={styles.errorState}>
          <Text weight="semibold" color="error">
            ❌ Erro ao carregar
          </Text>
          <Text size="sm" color="muted" style={{ marginTop: '0.5rem' }}>
            {error}
          </Text>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchPages}
            style={{ marginTop: '1rem' }}
          >
            Tentar Novamente
          </Button>
        </Card>
      )}

      {/* Empty States */}
      {!loading && !error && filteredPages.length === 0 && pages.length > 0 && (
        <Card variant="bordered" padding="lg" className={styles.emptyState}>
          <Text color="muted" style={{ textAlign: 'center', fontSize: '16px' }}>
            😴 Nenhuma página com esses filtros
          </Text>
          <div className={styles.clearFiltersCenter}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setDomainFilter('all');
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </Card>
      )}

      {!loading && !error && pages.length === 0 && (
        <Card variant="bordered" padding="lg" className={styles.emptyState}>
          <Text color="muted" style={{ textAlign: 'center', fontSize: '16px' }}>
            🚀 Nenhuma página ainda
          </Text>
          <Text size="sm" color="muted" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            Crie sua primeira página no{' '}
            <Link href="/studio" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              Puck Studio
            </Link>
          </Text>
        </Card>
      )}

      {/* Pages Grid */}
      {!loading && !error && filteredPages.length > 0 && (
        <div className={styles.pagesGrid}>
          {filteredPages.map((page) => (
            <Card key={page.id} variant="elevated" padding="lg" className={styles.pageCard}>
              <div className={styles.pageHeader}>
                <div>
                  <Text as="h3" size="lg" weight="semibold">
                    {page.title}
                  </Text>
                </div>
                <Badge variant={getDomainColor(page.domain)} size="sm">
                  {page.domain}
                </Badge>
              </div>

              <div className={styles.pageContent}>
                <div className={styles.pageMeta}>
                  <Text size="sm" color="muted">
                    <code>/{page.slug}</code>
                  </Text>
                  <Text size="xs" color="muted">
                    {formatDate(page.lastModified)}
                  </Text>
                </div>
              </div>

              <div className={styles.pageActions}>
                <Link href={`/${page.slug}`} style={{ flex: 1 }}>
                  <Button variant="outline" size="sm" fullWidth>
                    👁️ Visualizar
                  </Button>
                </Link>
                <Link href={`/studio?slug=${page.slug}`} style={{ flex: 1 }}>
                  <Button variant="primary" size="sm" fullWidth>
                    ✏️ Editar
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
}
