'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layout, Text, Card, Badge, Button } from '@prototipo/design-system';

interface HealthMetrics {
  build: {
    status: 'success' | 'failed' | 'unknown';
    lastRun?: string;
    duration?: string;
  };
  lint: {
    status: 'success' | 'failed' | 'unknown';
    warnings: number;
    errors: number;
  };
  storybook: {
    bundleSize: string;
    bundleSizeMB: number;
    status: 'built' | 'not-built';
  };
  dependencies: {
    total: number;
    outdated: number;
    deprecated: number;
  };
  lastUpdated: string;
}

export default function DashboardPage() {
  const [health, setHealth] = useState<HealthMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealthMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/dashboard/health');
      if (!response.ok) {
        throw new Error('Failed to fetch health metrics');
      }
      const data = await response.json();
      setHealth(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthMetrics();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date);
  };

  const getBuildStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="success" icon="✓">Build OK</Badge>;
      case 'failed':
        return <Badge variant="error" icon="✗">Build Falhou</Badge>;
      default:
        return <Badge variant="neutral" icon="?">Status Desconhecido</Badge>;
    }
  };

  const getLintStatusBadge = (status: string, warnings: number, errors: number) => {
    if (errors > 0) {
      return <Badge variant="error" icon="✗">{errors} Erro{errors > 1 ? 's' : ''}</Badge>;
    }
    if (warnings > 0) {
      return <Badge variant="warning" icon="⚠">{warnings} Aviso{warnings > 1 ? 's' : ''}</Badge>;
    }
    return <Badge variant="success" icon="✓">Lint OK</Badge>;
  };

  return (
    <Layout maxWidth="xl" centered paddingY="lg">
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <Text as="h1" size="4xl" weight="bold" color="primary">
            Dashboard - Saúde do Repositório
          </Text>
          <Link href="/">
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>
        <Text color="muted">
          Indicadores de saúde e métricas do ambiente de prototipação
        </Text>
      </div>

      {loading && (
        <Card variant="elevated" padding="lg">
          <Text>Carregando métricas...</Text>
        </Card>
      )}

      {error && (
        <Card variant="elevated" padding="lg">
          <Text color="error">Erro ao carregar métricas: {error}</Text>
          <Button onClick={fetchHealthMetrics} style={{ marginTop: '1rem' }}>
            Tentar Novamente
          </Button>
        </Card>
      )}

      {!loading && !error && health && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* Build Status */}
          <Card variant="elevated" padding="lg">
            <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
              🏗️ Build
            </Text>
            <div style={{ marginBottom: '1rem' }}>
              {getBuildStatusBadge(health.build.status)}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-neutral-600)' }}>
              <div>Última build: {formatDate(health.build.lastRun)}</div>
              {health.build.duration && <div>Duração: {health.build.duration}</div>}
            </div>
          </Card>

          {/* Lint Status */}
          <Card variant="elevated" padding="lg">
            <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
              🔍 Lint
            </Text>
            <div style={{ marginBottom: '1rem' }}>
              {getLintStatusBadge(health.lint.status, health.lint.warnings, health.lint.errors)}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-neutral-600)' }}>
              <div>Avisos: {health.lint.warnings}</div>
              <div>Erros: {health.lint.errors}</div>
            </div>
          </Card>

          {/* Storybook Bundle */}
          <Card variant="elevated" padding="lg">
            <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
              📚 Storybook
            </Text>
            <div style={{ marginBottom: '1rem' }}>
              {health.storybook.status === 'built' ? (
                <Badge variant="success" icon="✓">Bundle Construído</Badge>
              ) : (
                <Badge variant="neutral" icon="○">Não Construído</Badge>
              )}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-neutral-600)' }}>
              <div>Tamanho: {health.storybook.bundleSize}</div>
              {health.storybook.bundleSizeMB > 10 && (
                <div style={{ color: 'var(--color-warning)' }}>
                  ⚠ Bundle grande ({health.storybook.bundleSizeMB} MB)
                </div>
              )}
            </div>
          </Card>

          {/* Dependencies */}
          <Card variant="elevated" padding="lg">
            <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
              📦 Dependências
            </Text>
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Badge variant="info">{health.dependencies.total} Total</Badge>
              {health.dependencies.outdated > 0 && (
                <Badge variant="warning">{health.dependencies.outdated} Desatualizadas</Badge>
              )}
              {health.dependencies.deprecated > 0 && (
                <Badge variant="error">{health.dependencies.deprecated} Deprecadas</Badge>
              )}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-neutral-600)' }}>
              {health.dependencies.outdated === 0 ? (
                <div>✓ Todas as dependências atualizadas</div>
              ) : (
                <div>Execute `pnpm outdated` para detalhes</div>
              )}
            </div>
          </Card>
        </div>
      )}

      {!loading && !error && health && (
        <div style={{ marginTop: '2rem' }}>
          <Card variant="bordered" padding="md">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
              <Text color="muted">
                Última atualização: {formatDate(health.lastUpdated)}
              </Text>
              <Button variant="secondary" size="sm" onClick={fetchHealthMetrics}>
                Atualizar
              </Button>
            </div>
          </Card>
        </div>
      )}

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <Text color="muted" size="sm">
          📊 Métricas coletadas localmente • CI badges disponíveis no README
        </Text>
      </div>
    </Layout>
  );
}
