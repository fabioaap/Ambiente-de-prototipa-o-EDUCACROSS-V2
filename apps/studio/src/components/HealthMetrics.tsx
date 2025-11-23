'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@prototipo/design-system';
import styles from './HealthMetrics.module.css';

interface HealthMetricsData {
  timestamp: string;
  git: {
    branch: string;
    commit: string;
    lastCommitDate: string | null;
  };
  build: {
    status: 'success' | 'partial' | 'error';
    builds: Array<{ name: string; status: string }>;
    message: string;
  };
  lint: {
    status: 'success' | 'warning' | 'error';
    warnings: number;
    errors: number;
    message: string;
  };
  bundle: {
    status: 'success' | 'missing' | 'error';
    size: number;
    sizeFormatted: string;
    message: string;
  };
  lastBuild: {
    status: 'success' | 'missing' | 'error';
    timestamp: string | null;
    message: string;
  };
  dependencies: {
    status: 'success' | 'warning' | 'error';
    outdated: number;
    packages: string[];
    message: string;
  };
}

interface DashboardData {
  health?: HealthMetricsData;
  stats?: {
    buildStatus: string;
    storybook: string;
  };
}

const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'success':
      return <span className={styles.iconSuccess}>✓</span>;
    case 'warning':
      return <span className={styles.iconWarning}>⚠</span>;
    case 'error':
    case 'failed':
    case 'missing':
      return <span className={styles.iconError}>✗</span>;
    default:
      return <span className={styles.iconUnknown}>?</span>;
  }
};

export const HealthMetrics: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await fetch('/api/dashboard/pages');
        if (!response.ok) {
          throw new Error('Erro ao carregar dados do dashboard');
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <Card>
          <div className={styles.loading}>Carregando métricas...</div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Card>
          <div className={styles.error}>❌ {error}</div>
        </Card>
      </div>
    );
  }

  if (!data?.health) {
    return (
      <div className={styles.container}>
        <Card>
          <div className={styles.warning}>
            ⚠️ Métricas de saúde não disponíveis.
            <br />
            Execute: <code>pnpm health:check</code>
          </div>
        </Card>
      </div>
    );
  }

  const { health } = data;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📊 Indicadores de Saúde do Repositório</h2>

      <div className={styles.grid}>
        {/* Build Status */}
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <StatusIcon status={health.build.status} />
            <h3 className={styles.cardTitle}>Build Status</h3>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.message}>{health.build.message}</p>
            <div className={styles.buildList}>
              {health.build.builds.map((build) => (
                <div key={build.name} className={styles.buildItem}>
                  <StatusIcon status={build.status} />
                  <span>{build.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Lint Status */}
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <StatusIcon status={health.lint.status} />
            <h3 className={styles.cardTitle}>Lint</h3>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.message}>{health.lint.message}</p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Erros:</span>
                <span className={styles.statValue}>{health.lint.errors}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Avisos:</span>
                <span className={styles.statValue}>{health.lint.warnings}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Bundle Size */}
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <StatusIcon status={health.bundle.status} />
            <h3 className={styles.cardTitle}>Storybook Bundle</h3>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.bundleSize}>{health.bundle.sizeFormatted}</p>
            <p className={styles.message}>{health.bundle.message}</p>
          </div>
        </Card>

        {/* Last Build Time */}
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <StatusIcon status={health.lastBuild.status} />
            <h3 className={styles.cardTitle}>Último Build</h3>
          </div>
          <div className={styles.cardContent}>
            {health.lastBuild.timestamp ? (
              <>
                <p className={styles.timestamp}>
                  {new Date(health.lastBuild.timestamp).toLocaleString('pt-BR')}
                </p>
                <p className={styles.timeAgo}>
                  {getTimeAgo(health.lastBuild.timestamp)}
                </p>
              </>
            ) : (
              <p className={styles.message}>{health.lastBuild.message}</p>
            )}
          </div>
        </Card>

        {/* Dependencies */}
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <StatusIcon status={health.dependencies.status} />
            <h3 className={styles.cardTitle}>Dependências</h3>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.message}>{health.dependencies.message}</p>
            {health.dependencies.outdated > 0 && (
              <div className={styles.packages}>
                {health.dependencies.packages.map((pkg) => (
                  <span key={pkg} className={styles.package}>
                    {pkg}
                  </span>
                ))}
                {health.dependencies.outdated > health.dependencies.packages.length && (
                  <span className={styles.morePackages}>
                    +{health.dependencies.outdated - health.dependencies.packages.length} mais
                  </span>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Git Info */}
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.iconInfo}>🔗</span>
            <h3 className={styles.cardTitle}>Git Info</h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.gitInfo}>
              <div className={styles.gitItem}>
                <span className={styles.gitLabel}>Branch:</span>
                <code className={styles.gitValue}>{health.git.branch}</code>
              </div>
              <div className={styles.gitItem}>
                <span className={styles.gitLabel}>Commit:</span>
                <code className={styles.gitValue}>{health.git.commit}</code>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className={styles.footer}>
        <p className={styles.timestamp}>
          Última atualização: {new Date(health.timestamp).toLocaleString('pt-BR')}
        </p>
        <p className={styles.refreshNote}>
          Para atualizar métricas, execute: <code>pnpm health:check</code>
        </p>
      </div>
    </div>
  );
};

function getTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'agora mesmo';
  if (diffMins < 60) return `há ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;

  const diffDays = Math.floor(diffHours / 24);
  return `há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
}
