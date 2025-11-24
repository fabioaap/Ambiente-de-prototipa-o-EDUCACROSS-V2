'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layout, Text, Card, Button, Input, Badge, HealthIndicator } from '@prototipo/design-system';

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

export default function DashboardPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [filteredPages, setFilteredPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState<string>('all');

  useEffect(() => {
    fetchPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function filterPages() {
    let filtered = [...pages];

    // Filter by domain
    if (domainFilter !== 'all') {
      filtered = filtered.filter(page => page.domain === domainFilter);
    }

    // Filter by search query
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

  function getDomainColor(domain: string): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' {
    switch (domain) {
      case 'BackOffice':
        return 'primary';
      case 'FrontOffice':
        return 'success';
      case 'Game':
        return 'warning';
      default:
        return 'secondary';
    }
  }

  const domains = ['all', 'BackOffice', 'FrontOffice', 'Game'];

  return (
    <Layout maxWidth="xl" paddingY="lg">
      <div style={{ marginBottom: '2rem' }}>
        <Text as="h1" size="4xl" weight="bold" color="primary">
          Dashboard de Páginas
        </Text>
        <Text as="p" size="lg" color="muted" style={{ marginTop: '0.5rem' }}>
          Visualize e gerencie todas as páginas prototipadas no Studio
        </Text>
      </div>

      {/* Filters */}
      <Card variant="bordered" padding="md" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 300px' }}>
            <Text as="label" size="sm" weight="semibold" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Buscar
            </Text>
            <Input
              type="text"
              placeholder="Buscar por título ou slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          
          <div style={{ flex: '0 1 200px' }}>
            <Text as="label" size="sm" weight="semibold" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Domínio
            </Text>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {domains.map((domain) => (
                <Button
                  key={domain}
                  variant={domainFilter === domain ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setDomainFilter(domain)}
                >
                  {domain === 'all' ? 'Todos' : domain}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card variant="bordered" padding="lg">
          <Text color="muted" style={{ textAlign: 'center' }}>
            Carregando páginas...
          </Text>
        </Card>
      )}

      {/* Error State */}
      {error && !loading && (
        <Card variant="bordered" padding="lg" style={{ borderColor: 'var(--color-danger)', backgroundColor: 'var(--color-danger-50)' }}>
          <Text color="danger" weight="semibold">
            Erro ao carregar páginas
          </Text>
          <Text color="danger" size="sm" style={{ marginTop: '0.5rem' }}>
            {error}
          </Text>
          <Button
            variant="danger"
            size="sm"
            onClick={fetchPages}
            style={{ marginTop: '1rem' }}
          >
            Tentar Novamente
          </Button>
        </Card>
      )}

      {/* Empty State */}
      {!loading && !error && filteredPages.length === 0 && pages.length > 0 && (
        <Card variant="bordered" padding="lg">
          <Text color="muted" style={{ textAlign: 'center' }}>
            Nenhuma página encontrada com os filtros aplicados.
          </Text>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
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
        <Card variant="bordered" padding="lg">
          <Text color="muted" style={{ textAlign: 'center' }}>
            Nenhuma página disponível ainda.
          </Text>
          <Text size="sm" color="muted" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            Crie sua primeira página no{' '}
            <Link href="/studio" style={{ color: 'var(--color-primary)' }}>
              Puck Studio
            </Link>
          </Text>
        </Card>
      )}

      {/* Pages Grid */}
      {!loading && !error && filteredPages.length > 0 && (
        <>
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text size="sm" color="muted">
              Mostrando {filteredPages.length} de {pages.length} páginas
            </Text>
          </div>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {filteredPages.map((page) => (
              <Card key={page.id} variant="elevated" padding="md">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <Text as="h3" size="xl" weight="semibold">
                    {page.title}
                  </Text>
                  <Badge variant={getDomainColor(page.domain)} size="sm">
                    {page.domain}
                  </Badge>
                </div>

                <Text size="sm" color="muted" style={{ marginBottom: '0.5rem' }}>
                  <strong>Slug:</strong> /{page.slug}
                </Text>

                <Text size="sm" color="muted" style={{ marginBottom: '1rem' }}>
                  <strong>Última modificação:</strong> {formatDate(page.lastModified)}
                </Text>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <Link href={`/${page.slug}`} style={{ flex: '1' }}>
                    <Button variant="outline" size="sm" fullWidth>
                      Visualizar
                    </Button>
                  </Link>
                  <Link href={`/studio?slug=${page.slug}`} style={{ flex: '1' }}>
                    <Button variant="primary" size="sm" fullWidth>
                      Editar
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
