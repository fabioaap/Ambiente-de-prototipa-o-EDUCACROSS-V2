'use client';

import React, { useState, useEffect } from 'react';
import { Button, Text, Card, Badge, Progress, Navigation } from '@prototipo/design-system';
import styles from './admin-workflow.module.css';

interface KPI {
  id: string;
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  change: string;
  icon: string;
}

interface StatCard {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  progress: number;
  color: 'primary' | 'success' | 'warning' | 'error';
}

export default function DashboardPage() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [stats, setStats] = useState<StatCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados (em produção, chamar API)
    setTimeout(() => {
      setKpis([
        {
          id: '1',
          name: 'Usuários Ativos',
          value: 1247,
          trend: 'up',
          change: '+12%',
          icon: '👥',
        },
        {
          id: '2',
          name: 'Sessões Hoje',
          value: 3891,
          trend: 'up',
          change: '+8%',
          icon: '📊',
        },
        {
          id: '3',
          name: 'Taxa de Conclusão',
          value: 87,
          trend: 'stable',
          change: '0%',
          icon: '✅',
        },
        {
          id: '4',
          name: 'Tempo Médio (min)',
          value: 24,
          trend: 'down',
          change: '-5%',
          icon: '⏱️',
        },
      ]);

      setStats([
        {
          id: '1',
          title: 'Jornadas Ativas',
          value: '24',
          subtitle: 'de 30 planejadas',
          progress: 80,
          color: 'primary',
        },
        {
          id: '2',
          title: 'Performance',
          value: '92%',
          subtitle: 'acima da meta',
          progress: 92,
          color: 'success',
        },
        {
          id: '3',
          title: 'Alertas',
          value: '3',
          subtitle: 'requerem atenção',
          progress: 15,
          color: 'warning',
        },
        {
          id: '4',
          title: 'Erros',
          value: '1',
          subtitle: 'nas últimas 24h',
          progress: 5,
          color: 'error',
        },
      ]);

      setLoading(false);
    }, 800);
  }, []);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      default:
        return '➡️';
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'success';
      case 'down':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardLoading}>
          <Text as="p" size="lg" weight="medium" color="muted">
            Carregando dashboard...
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Text as="h1" size="xl" weight="bold" color="primary">
            EDUCACROSS
          </Text>
          <Badge text="Admin" variant="info" size="sm" />
        </div>

        <nav className={styles.sidebarNav}>
          <a href="/backoffice/dashboard" className={`${styles.navItem} ${styles.active}`}>
            <span className={styles.navIcon}>📊</span>
            <Text as="span" size="sm" weight="medium" color="default">
              Dashboard
            </Text>
          </a>
          <a href="/backoffice/usuarios" className={styles.navItem}>
            <span className={styles.navIcon}>👥</span>
            <Text as="span" size="sm" weight="medium" color="default">
              Usuários
            </Text>
          </a>
          <a href="/backoffice/jornadas" className={styles.navItem}>
            <span className={styles.navIcon}>🗺️</span>
            <Text as="span" size="sm" weight="medium" color="default">
              Jornadas
            </Text>
          </a>
          <a href="/backoffice/relatorios" className={styles.navItem}>
            <span className={styles.navIcon}>📈</span>
            <Text as="span" size="sm" weight="medium" color="default">
              Relatórios
            </Text>
          </a>
          <a href="/backoffice/perfil" className={styles.navItem}>
            <span className={styles.navIcon}>⚙️</span>
            <Text as="span" size="sm" weight="medium" color="default">
              Perfil
            </Text>
          </a>
        </nav>

        <div className={styles.sidebarFooter}>
          <Button variant="ghost" size="sm">
            Sair
          </Button>
        </div>
      </aside>

      <main className={styles.dashboardMain}>
        <header className={styles.dashboardHeader}>
          <div>
            <Text as="h2" size="2xl" weight="bold" color="default">
              Dashboard Administrativo
            </Text>
            <Text as="p" size="sm" weight="normal" color="muted">
              Visão geral das métricas e indicadores do sistema
            </Text>
          </div>
          <div className={styles.headerActions}>
            <Button variant="outline" size="md">
              Exportar
            </Button>
            <Button variant="primary" size="md">
              Atualizar
            </Button>
          </div>
        </header>

        <section className={styles.kpiGrid}>
          {kpis.map((kpi) => (
            <Card key={kpi.id} variant="bordered" padding="md" className={styles.kpiCard}>
              <div className={styles.kpiHeader}>
                <span className={styles.kpiIcon}>{kpi.icon}</span>
                <Badge
                  text={kpi.change}
                  variant={getTrendColor(kpi.trend) as any}
                  size="sm"
                />
              </div>
              <div className={styles.kpiBody}>
                <Text as="p" size="3xl" weight="bold" color="default">
                  {kpi.value.toLocaleString()}
                </Text>
                <Text as="p" size="sm" weight="normal" color="muted">
                  {kpi.name}
                </Text>
              </div>
              <div className={styles.kpiFooter}>
                <Text as="span" size="xs" weight="normal" color="muted">
                  {getTrendIcon(kpi.trend)} {kpi.trend === 'up' ? 'Crescimento' : kpi.trend === 'down' ? 'Declínio' : 'Estável'}
                </Text>
              </div>
            </Card>
          ))}
        </section>

        <section className={styles.statsGrid}>
          {stats.map((stat) => (
            <Card key={stat.id} variant="elevated" padding="lg" className={styles.statCard}>
              <div className={styles.statHeader}>
                <Text as="h3" size="lg" weight="semibold" color="default">
                  {stat.title}
                </Text>
              </div>
              <div className={styles.statBody}>
                <Text as="p" size="4xl" weight="bold" color={stat.color}>
                  {stat.value}
                </Text>
                <Text as="p" size="sm" weight="normal" color="muted">
                  {stat.subtitle}
                </Text>
              </div>
              <div className={styles.statFooter}>
                <Progress
                  value={stat.progress}
                  variant="linear"
                  size="md"
                  color={stat.color}
                  showLabel
                />
              </div>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
