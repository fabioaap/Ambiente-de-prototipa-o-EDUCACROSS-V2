'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layout, Text, Button, Card, Input } from '@prototipo/design-system';

interface PageData {
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

interface DashboardStats {
  totalPages: number;
  totalDomains: number;
  activeDomains: string[];
  lastUpdated: string;
  buildStatus: 'success' | 'building' | 'failed';
  storybook: 'online' | 'building' | 'offline';
}

interface DashboardData {
  pages: PageData[];
  stats: DashboardStats;
  domains: Record<string, { count: number; color: string }>;
}

const DOMAIN_LABELS: Record<string, string> = {
  BackOffice: 'Back Office',
  FrontOffice: 'Front Office',
  Game: 'Game',
  Other: 'Outros',
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/dashboard/pages');
        if (!response.ok) {
          throw new Error('Falha ao carregar dados do dashboard');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredPages = data?.pages.filter((page) => {
    const matchesSearch =
      searchQuery === '' ||
      page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain =
      selectedDomain === 'all' || page.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  }) || [];

  const pagesByDomain = filteredPages.reduce((acc, page) => {
    if (!acc[page.domain]) {
      acc[page.domain] = [];
    }
    acc[page.domain].push(page);
    return acc;
  }, {} as Record<string, PageData[]>);

  if (loading) {
    return (
      <Layout maxWidth="xl" centered paddingY="lg">
        <Text as="h1" size="3xl" weight="bold">
          Carregando...
        </Text>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout maxWidth="xl" centered paddingY="lg">
        <Card variant="elevated" padding="lg">
          <Text as="h1" size="3xl" weight="bold" color="error">
            Erro ao carregar Dashboard
          </Text>
          <Text color="muted" style={{ marginTop: '1rem' }}>
            {error}
          </Text>
        </Card>
      </Layout>
    );
  }

  if (!data) {
    return null;
  }

  const statusEmoji = {
    success: '✅',
    building: '⏳',
    failed: '❌',
  };

  const storybookEmoji = {
    online: '✅',
    building: '⏳',
    offline: '❌',
  };

  return (
    <Layout maxWidth="xl" paddingY="lg">
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <div>
          <Text as="h1" size="4xl" weight="bold">
            Dashboard do Projeto
          </Text>
          <Text color="muted" size="lg" style={{ marginTop: '0.5rem' }}>
            Ambiente de Prototipação EDUCACROSS
          </Text>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a
            href="https://educacross-storybook.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary">
              📚 Abrir Storybook
            </Button>
          </a>
          <Link href="/studio">
            <Button variant="primary">
              ✏️ Criar Nova Página
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ marginBottom: '2rem' }}>
        <Card variant="default" padding="md">
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: '1 1 300px' }}>
              <Input
                type="text"
                placeholder="🔍 Buscar página..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button
                variant={selectedDomain === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedDomain('all')}
              >
                Todos ({data.pages.length})
              </Button>
              {Object.entries(data.domains).map(([domain, info]) => (
                <Button
                  key={domain}
                  variant={selectedDomain === domain ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDomain(domain)}
                  style={{
                    borderColor: info.color,
                    ...(selectedDomain === domain && {
                      backgroundColor: info.color,
                      borderColor: info.color,
                    }),
                  }}
                >
                  {DOMAIN_LABELS[domain]} ({info.count})
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Pages by Domain */}
      {Object.keys(pagesByDomain).length === 0 ? (
        <Card variant="elevated" padding="lg">
          <Text color="muted" style={{ textAlign: 'center' }}>
            Nenhuma página encontrada.
          </Text>
        </Card>
      ) : (
        Object.entries(pagesByDomain).map(([domain, pages]) => (
          <div key={domain} style={{ marginBottom: '2rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: '4px',
                  height: '24px',
                  backgroundColor: data.domains[domain]?.color || '#6b7280',
                  borderRadius: '2px',
                }}
              />
              <Text as="h2" size="2xl" weight="semibold">
                {DOMAIN_LABELS[domain]}
              </Text>
              <Text color="muted" size="lg">
                ({pages.length} {pages.length === 1 ? 'página' : 'páginas'})
              </Text>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1rem',
              }}
            >
              {pages.map((page) => (
                <Card
                  key={page.id}
                  variant="elevated"
                  padding="md"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                    <div>
                      <Text as="h3" size="lg" weight="semibold">
                        📄 {page.name}
                      </Text>
                      {page.description && (
                        <Text
                          color="muted"
                          size="sm"
                          style={{ marginTop: '0.5rem' }}
                        >
                          {page.description}
                        </Text>
                      )}
                      <Text
                        color="muted"
                        size="xs"
                        style={{ marginTop: '0.5rem' }}
                      >
                        {page.slug}
                      </Text>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                      <Link href={page.editUrl} style={{ flex: 1 }}>
                        <Button variant="primary" size="sm" fullWidth>
                          ✏️ Editar
                        </Button>
                      </Link>
                      <Link href={page.viewUrl} style={{ flex: 1 }}>
                        <Button variant="secondary" size="sm" fullWidth>
                          👁️ Visualizar
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Stats Footer */}
      <div style={{ marginTop: '3rem' }}>
        <Card variant="bordered" padding="lg">
          <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
            📊 Métricas do Repositório
          </Text>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            <div>
              <Text color="muted" size="sm">
                Total de Páginas
              </Text>
              <Text size="2xl" weight="bold">
                {data.stats.totalPages}
              </Text>
            </div>
            <div>
              <Text color="muted" size="sm">
                Domínios Ativos
              </Text>
              <Text size="2xl" weight="bold">
                {data.stats.totalDomains}
              </Text>
            </div>
            <div>
              <Text color="muted" size="sm">
                Build Status
              </Text>
              <Text size="2xl" weight="bold">
                {statusEmoji[data.stats.buildStatus]} {data.stats.buildStatus}
              </Text>
            </div>
            <div>
              <Text color="muted" size="sm">
                Storybook
              </Text>
              <Text size="2xl" weight="bold">
                {storybookEmoji[data.stats.storybook]} {data.stats.storybook}
              </Text>
            </div>
          </div>
          <Text
            color="muted"
            size="sm"
            style={{ marginTop: '1rem', textAlign: 'right' }}
          >
            Última atualização:{' '}
            {new Date(data.stats.lastUpdated).toLocaleString('pt-BR')}
          </Text>
        </Card>
      </div>
    </Layout>
  );
}
