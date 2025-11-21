'use client';

import { useEffect, useState } from 'react';
import { Card, Text, Button, Select } from '@prototipo/design-system';
import styles from './Dashboard.module.css';

interface Page {
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

interface Stats {
  totalPages: number;
  totalDomains: number;
  activeDomains: string[];
  lastUpdated: string;
  buildStatus: 'success' | 'building' | 'failed';
  storybook: 'online' | 'building' | 'offline';
}

interface DashboardData {
  pages: Page[];
  stats: Stats;
  domains: Record<string, { count: number; color: string }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard/pages');
        
        if (!response.ok) {
          throw new Error('Falha ao carregar dados do dashboard');
        }
        
        const dashboardData = await response.json();
        setData(dashboardData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  const filteredPages = data?.pages.filter(page => 
    selectedDomain === 'all' || page.domain === selectedDomain
  ) || [];

  const getBuildStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'building': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getStorybookStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'success';
      case 'building': return 'warning';
      case 'offline': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <Text size="lg" color="muted">Carregando dashboard...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <Text size="lg" color="error" weight="semibold">Erro ao carregar dashboard</Text>
          <Text color="muted">{error}</Text>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <Text as="h1" size="3xl" weight="bold">Dashboard</Text>
          <Text color="muted">Visão geral das páginas e indicadores do Studio</Text>
        </div>
      </header>

      {/* Health Indicators */}
      <section className={styles.healthSection}>
        <Text as="h2" size="xl" weight="semibold" className={styles.sectionTitle}>
          Indicadores de Saúde
        </Text>
        
        <div className={styles.healthGrid}>
          <Card variant="bordered" padding="md">
            <Text size="sm" color="muted" weight="medium">Total de Páginas</Text>
            <Text size="3xl" weight="bold">{data.stats.totalPages}</Text>
          </Card>

          <Card variant="bordered" padding="md">
            <Text size="sm" color="muted" weight="medium">Domínios Ativos</Text>
            <Text size="3xl" weight="bold">{data.stats.totalDomains}</Text>
          </Card>

          <Card variant="bordered" padding="md">
            <Text size="sm" color="muted" weight="medium">Status do Build</Text>
            <Text 
              size="xl" 
              weight="bold" 
              color={getBuildStatusColor(data.stats.buildStatus)}
            >
              {data.stats.buildStatus === 'success' ? '✓ Sucesso' : 
               data.stats.buildStatus === 'building' ? '⟳ Construindo' : 
               '✗ Falhou'}
            </Text>
          </Card>

          <Card variant="bordered" padding="md">
            <Text size="sm" color="muted" weight="medium">Storybook</Text>
            <Text 
              size="xl" 
              weight="bold" 
              color={getStorybookStatusColor(data.stats.storybook)}
            >
              {data.stats.storybook === 'online' ? '✓ Online' : 
               data.stats.storybook === 'building' ? '⟳ Construindo' : 
               '✗ Offline'}
            </Text>
          </Card>
        </div>
      </section>

      {/* Domains Summary */}
      <section className={styles.domainsSection}>
        <Text as="h2" size="xl" weight="semibold" className={styles.sectionTitle}>
          Páginas por Domínio
        </Text>
        
        <div className={styles.domainsGrid}>
          {Object.entries(data.domains).map(([domain, info]) => (
            <Card 
              key={domain} 
              variant="bordered" 
              padding="md"
              className={styles.domainCard}
            >
              <div 
                className={styles.domainIndicator} 
                style={{ backgroundColor: info.color }}
              />
              <div>
                <Text size="sm" color="muted">{domain}</Text>
                <Text size="2xl" weight="bold">{info.count}</Text>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Pages List */}
      <section className={styles.pagesSection}>
        <div className={styles.pagesSectionHeader}>
          <Text as="h2" size="xl" weight="semibold">
            Páginas ({filteredPages.length})
          </Text>
          
          <Select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            options={[
              { value: 'all', label: 'Todos os domínios' },
              { value: 'BackOffice', label: 'BackOffice' },
              { value: 'FrontOffice', label: 'FrontOffice' },
              { value: 'Game', label: 'Game' },
              { value: 'Other', label: 'Outros' },
            ]}
            className={styles.domainFilter}
          />
        </div>

        {filteredPages.length === 0 ? (
          <Card variant="bordered" padding="lg">
            <div className={styles.emptyState}>
              <Text size="lg" color="muted">
                Nenhuma página encontrada
                {selectedDomain !== 'all' && ` no domínio ${selectedDomain}`}
              </Text>
            </div>
          </Card>
        ) : (
          <div className={styles.pagesGrid}>
            {filteredPages.map((page) => (
              <Card 
                key={page.id} 
                variant="elevated" 
                padding="md"
                className={styles.pageCard}
              >
                <div className={styles.pageCardHeader}>
                  <div>
                    <Text size="lg" weight="semibold">{page.name}</Text>
                    <Text size="sm" color="muted">/{page.slug}</Text>
                  </div>
                  <div 
                    className={styles.domainBadge}
                    style={{ 
                      backgroundColor: data.domains[page.domain]?.color || '#6b7280',
                      color: 'white'
                    }}
                  >
                    <Text size="xs" weight="medium">{page.domain}</Text>
                  </div>
                </div>

                {page.description && (
                  <Text size="sm" color="muted" className={styles.pageDescription}>
                    {page.description}
                  </Text>
                )}

                <div className={styles.pageCardActions}>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => window.location.href = page.editUrl}
                  >
                    Editar no Studio
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.href = page.viewUrl}
                  >
                    Visualizar
                  </Button>
                </div>

                <div className={styles.pageCardMeta}>
                  <Text size="xs" color="muted">
                    Atualizado: {new Date(page.updatedAt).toLocaleDateString('pt-BR')}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
