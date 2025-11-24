'use client';

import { useEffect, useState } from 'react';
import { Card, Button, Text, Badge, Progress } from '@prototipo/design-system';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

// ============================================================================
// TIPOS TYPESCRIPT
// ============================================================================

interface PageData {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  content: Record<string, unknown>;
}

interface ApiResponse {
  success: boolean;
  data: PageData[];
  error: string | null;
  total: number;
  timestamp: string;
}

// ============================================================================
// TIPOS PARA HEALTH METRICS
// ============================================================================

interface HealthStatus {
  status: 'success' | 'warning' | 'error';
  label: string;
  lastBuild?: string;
}

interface MetricCount {
  count: number;
  label: string;
}

interface CoverageMetric {
  percentage: number;
  label: string;
}

interface HealthMetrics {
  buildStatus: HealthStatus;
  commits24h: MetricCount;
  openIssues: MetricCount;
  openPRs: MetricCount;
  testCoverage: CoverageMetric;
}

// ============================================================================
// MOCK DATA - HEALTH METRICS
// ============================================================================

const HEALTH_METRICS: HealthMetrics = {
  buildStatus: {
    status: 'success',
    label: 'Passando',
    lastBuild: '2025-11-24T18:30:00Z',
  },
  commits24h: {
    count: 12,
    label: 'commits',
  },
  openIssues: {
    count: 9,
    label: 'issues',
  },
  openPRs: {
    count: 2,
    label: 'PRs em review',
  },
  testCoverage: {
    percentage: 85,
    label: 'Cobertura',
  },
};

// ============================================================================
// UTILITÁRIOS
// ============================================================================

/**
 * Extrai o domínio do slug
 * Ex: "backoffice/dashboard" -> "BackOffice"
 */
function extractDomain(slug: string): string {
  const parts = slug.split('/');
  const domain = parts[0] || 'Geral';
  
  // Capitalizar e formatar
  const domainMap: Record<string, string> = {
    'backoffice': 'BackOffice',
    'frontoffice': 'FrontOffice',
    'game': 'Game Hub',
    'admin': 'Administração',
  };
  
  return domainMap[domain.toLowerCase()] || domain.charAt(0).toUpperCase() + domain.slice(1);
}

/**
 * Formata data ISO para formato legível em português
 * Ex: "2025-11-23T14:30:00.000Z" -> "23 de novembro de 2025"
 */
function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('pt-BR', options);
}

/**
 * Formata data para formato curto
 * Ex: "2025-11-23T14:30:00.000Z" -> "23/11/2025 14:30"
 */
function formatDateShort(isoDate: string): string {
  const date = new Date(isoDate);
  const dateStr = date.toLocaleDateString('pt-BR');
  const timeStr = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${dateStr} ${timeStr}`;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function PagesListPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<PageData[]>([]);
  const router = useRouter();

  // ============================================================================
  // EFEITOS
  // ============================================================================

  useEffect(() => {
    fetchPages();
  }, []);

  // ============================================================================
  // FUNÇÕES DE FETCH
  // ============================================================================

  async function fetchPages() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/pages');
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.success) {
        setPages(data.data);
      } else {
        setError(data.error || 'Falha ao carregar páginas');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao buscar páginas: ${errorMessage}`);
      console.error('Error fetching pages:', err);
    } finally {
      setLoading(false);
    }
  }

  // ============================================================================
  // HANDLERS DE AÇÕES
  // ============================================================================

  function handleEdit(slug: string) {
    router.push(`/studio?page=${slug}`);
  }

  function handleView(slug: string) {
    router.push(`/${slug}`);
  }

  function handleDelete(page: PageData) {
    // MVP: Apenas alerta (implementação futura)
    if (window.confirm(`Tem certeza que deseja deletar "${page.title}"?`)) {
      alert(`Funcionalidade de deletar será implementada em breve.\nPágina: ${page.title}`);
      // TODO: Implementar DELETE /api/pages/:slug
    }
  }

  function handleNewPage() {
    router.push('/studio');
  }

  // ============================================================================
  // RENDERIZAÇÃO DE ESTADOS
  // ============================================================================

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Text as="h1" size="3xl" weight="bold">
            Páginas Criadas
          </Text>
        </div>
        <div className={styles.loadingState}>
          <Text as="p" size="lg" color="muted">
            Carregando páginas...
          </Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Text as="h1" size="3xl" weight="bold">
            Páginas Criadas
          </Text>
        </div>
        <div className={styles.errorState}>
          <Text as="p" size="lg" color="error">
            ⚠️ {error}
          </Text>
          <Button onClick={fetchPages} variant="secondary">
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDERIZAÇÃO PRINCIPAL
  // ============================================================================

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Text as="h1" size="3xl" weight="bold">
            Páginas Criadas
          </Text>
          <Text as="p" size="base" color="muted">
            Total de {pages.length} {pages.length === 1 ? 'página' : 'páginas'}
          </Text>
        </div>
        <div className={styles.headerRight}>
          <Button onClick={handleNewPage} variant="primary">
            + Nova Página
          </Button>
        </div>
      </div>

      {/* Lista de Páginas */}
      {pages.length === 0 ? (
        <div className={styles.emptyState}>
          <Text as="p" size="lg" color="muted">
            Nenhuma página criada ainda.
          </Text>
          <Button onClick={handleNewPage} variant="primary">
            Criar Primeira Página
          </Button>
        </div>
      ) : (
        <div className={styles.grid}>
          {pages.map((page) => (
            <Card 
              key={page.id} 
              variant="elevated" 
              padding="lg"
              className={styles.pageCard}
            >
              {/* Cabeçalho do Card */}
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <Text as="h2" size="xl" weight="bold">
                    {page.title}
                  </Text>
                  <Badge variant="default">
                    {extractDomain(page.slug)}
                  </Badge>
                </div>
              </div>

              {/* Informações da Página */}
              <div className={styles.cardInfo}>
                <div className={styles.infoItem}>
                  <Text as="span" size="sm" weight="bold" color="muted">
                    Slug:
                  </Text>
                  <Text as="span" size="sm" className={styles.slug}>
                    /{page.slug}
                  </Text>
                </div>

                <div className={styles.infoItem}>
                  <Text as="span" size="sm" weight="bold" color="muted">
                    Última atualização:
                  </Text>
                  <Text as="span" size="sm">
                    {formatDateShort(page.updatedAt)}
                  </Text>
                </div>

                <div className={styles.infoItem}>
                  <Text as="span" size="sm" weight="bold" color="muted">
                    Criado em:
                  </Text>
                  <Text as="span" size="sm">
                    {formatDate(page.createdAt)}
                  </Text>
                </div>
              </div>

              {/* Ações */}
              <div className={styles.cardActions}>
                <Button 
                  onClick={() => handleView(page.slug)} 
                  variant="secondary"
                  className={styles.actionButton}
                >
                  👁️ Visualizar
                </Button>
                <Button 
                  onClick={() => handleEdit(page.slug)} 
                  variant="primary"
                  className={styles.actionButton}
                >
                  ✏️ Editar
                </Button>
                <Button 
                  onClick={() => handleDelete(page)} 
                  variant="secondary"
                  className={styles.actionButton}
                >
                  🗑️ Deletar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ============================================================================
          SEÇÃO DE INDICADORES DE SAÚDE (HEALTH METRICS)
          ============================================================================ */}
      <section className={styles.healthSection}>
        <div className={styles.healthHeader}>
          <Text as="h2" size="2xl" weight="bold">
            Indicadores de Saúde
          </Text>
          <Text as="p" size="base" color="muted">
            Métricas do repositório em tempo real
          </Text>
        </div>

        <div className={styles.healthGrid}>
          {/* 1. Build Status */}
          <Card 
            variant="elevated" 
            padding="lg"
            role="region"
            aria-label="Status do Build"
            className={styles.healthCard}
          >
            <div className={styles.healthIcon}>
              {HEALTH_METRICS.buildStatus.status === 'success' ? '✅' : '❌'}
            </div>
            <Text as="h3" size="lg" weight="bold">
              Build Status
            </Text>
            <Badge 
              variant={HEALTH_METRICS.buildStatus.status === 'success' ? 'success' : 'error'}
              size="lg"
            >
              {HEALTH_METRICS.buildStatus.label}
            </Badge>
            <Text as="p" size="sm" color="muted">
              Último build: {formatDateShort(HEALTH_METRICS.buildStatus.lastBuild || '')}
            </Text>
          </Card>

          {/* 2. Commits Last 24h */}
          <Card 
            variant="elevated" 
            padding="lg"
            role="region"
            aria-label="Commits nas últimas 24 horas"
            className={styles.healthCard}
          >
            <div className={styles.healthIcon}>📝</div>
            <Text as="h3" size="lg" weight="bold">
              Commits 24h
            </Text>
            <Text as="p" className={styles.healthValue}>
              {HEALTH_METRICS.commits24h.count}
            </Text>
            <Text as="p" size="sm" color="muted">
              {HEALTH_METRICS.commits24h.label} nas últimas 24 horas
            </Text>
          </Card>

          {/* 3. Open Issues */}
          <Card 
            variant="elevated" 
            padding="lg"
            role="region"
            aria-label="Issues abertas"
            className={styles.healthCard}
          >
            <div className={styles.healthIcon}>🐛</div>
            <Text as="h3" size="lg" weight="bold">
              Issues Abertas
            </Text>
            <Text as="p" className={styles.healthValue}>
              {HEALTH_METRICS.openIssues.count}
            </Text>
            <Text as="p" size="sm" color="muted">
              {HEALTH_METRICS.openIssues.label} abertas no momento
            </Text>
          </Card>

          {/* 4. Open PRs */}
          <Card 
            variant="elevated" 
            padding="lg"
            role="region"
            aria-label="Pull Requests em revisão"
            className={styles.healthCard}
          >
            <div className={styles.healthIcon}>🔀</div>
            <Text as="h3" size="lg" weight="bold">
              PRs em Review
            </Text>
            <Text as="p" className={styles.healthValue}>
              {HEALTH_METRICS.openPRs.count}
            </Text>
            <Text as="p" size="sm" color="muted">
              {HEALTH_METRICS.openPRs.label}
            </Text>
          </Card>

          {/* 5. Test Coverage */}
          <Card 
            variant="elevated" 
            padding="lg"
            role="region"
            aria-label="Cobertura de testes"
            className={styles.healthCard}
          >
            <div className={styles.healthIcon}>🧪</div>
            <Text as="h3" size="lg" weight="bold">
              Cobertura de Testes
            </Text>
            <Text as="p" className={styles.healthValue}>
              {HEALTH_METRICS.testCoverage.percentage}%
            </Text>
            <div className={styles.progressWrapper}>
              <Progress 
                value={HEALTH_METRICS.testCoverage.percentage}
                color="success"
                size="md"
                aria-label={`Cobertura de testes: ${HEALTH_METRICS.testCoverage.percentage}%`}
              />
            </div>
            <Text as="p" size="sm" color="muted">
              {HEALTH_METRICS.testCoverage.label} de testes
            </Text>
          </Card>
        </div>
      </section>
    </div>
  );
}
