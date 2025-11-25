'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
 * Status Badge com cores usando Shadcn Badge
 */
function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    excellent: 'default',
    good: 'secondary',
    warning: 'outline',
    critical: 'destructive',
    success: 'default',
    healthy: 'default',
    outdated: 'outline',
    error: 'destructive',
    vulnerable: 'destructive',
  };

  return (
    <Badge variant={variants[status] || 'secondary'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

/**
 * KPI Card Component
 */
function KPICard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
          <span className="text-4xl">{icon}</span>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Health Indicator Card
 */
function HealthCard({
  title,
  status,
  value,
}: {
  title: string;
  status: string;
  value: string;
}) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">{title}</p>
        <StatusBadge status={status} />
      </div>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}

/**
 * Domain Card
 */
function DomainCard({ name, count, color }: { name: string; count: number; color: string }) {
  const domainEmoji: Record<string, string> = {
    BackOffice: '🏢',
    FrontOffice: '🎓',
    Game: '🎮',
    Other: '📄',
  };

  const colorClasses: Record<string, string> = {
    '#3b82f6': 'bg-blue-500',
    '#10b981': 'bg-emerald-500',
    '#f59e0b': 'bg-amber-500',
    '#6b7280': 'bg-gray-500',
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${colorClasses[color] || 'bg-primary'}`}>
            {domainEmoji[name] || '📄'}
          </div>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{count} página{count !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Dashboard Page com Shadcn UI
 */
export default function DashboardPage() {
  const [data, setData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState<any>(null);
  const [q, setQ] = React.useState('');
  const [debouncedQ, setDebouncedQ] = React.useState(q);
  const [domainFilter, setDomainFilter] = React.useState('All');

  // Fetch data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/dashboard/summary');
        if (!response.ok) throw new Error('Falha ao carregar');
        const json = await response.json();
        setData(json.data);
        setIsError(false);
      } catch (err) {
        setError(err);
        setIsError(true);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Debounce search query
  React.useEffect(() => {
    const id = setTimeout(() => setDebouncedQ(q), 300);
    return () => clearTimeout(id);
  }, [q]);

  const refresh = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/dashboard/summary');
      if (!response.ok) throw new Error('Falha ao carregar');
      const json = await response.json();
      setData(json.data);
      setIsError(false);
    } catch (err) {
      setError(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-lg text-muted-foreground">Visão geral do ambiente de prototipação EDUCACROSS</p>
        </div>

        {/* Error State */}
        {isError && (
          <div className="mb-8 p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-start gap-4">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-semibold text-destructive mb-1">Erro ao carregar dashboard</h3>
                <p className="text-destructive/80 mb-4">{error?.message || 'Não foi possível conectar à API.'}</p>
                <Button variant="default" size="sm" onClick={() => refresh()}>
                  Tentar Novamente
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-8">
            {/* KPI Skeletons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-full mb-3" />
                    <Skeleton className="h-10 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Content Skeleton */}
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-full mb-4" />
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Data Loaded State */}
        {!isLoading && !isError && data && (
          <div className="space-y-8">
            {/* KPIs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard label="Total de Páginas" value={data.stats.totalPages} icon="📄" />
              <KPICard label="Domínios Ativos" value={data.stats.totalDomains} icon="🗂️" />
              <KPICard label="Health Score" value={`${data.health.healthScore}/100`} icon="💚" />
              <KPICard label="Status" value={data.health.healthStatus} icon={data.health.healthStatus === 'excellent' ? '🟢' : '🟡'} />
            </div>

            {/* Health & Domains - Two Column */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Health Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Saúde do Sistema</CardTitle>
                  <CardDescription>Status dos componentes críticos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Score</span>
                        <span className="text-sm font-bold">{data.health.healthScore}%</span>
                      </div>
                      <Progress value={data.health.healthScore} className="h-3" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <HealthCard title="Build" status={data.health.buildStatus} value={data.health.buildStatus === 'success' ? '✅' : '❌'} />
                      <HealthCard title="Lint" status={data.health.lintStatus} value={data.health.lintStatus === 'success' ? '✅' : '❌'} />
                      <HealthCard title="Type Check" status={data.health.typeCheckStatus} value={data.health.typeCheckStatus === 'success' ? '✅' : '❌'} />
                      <HealthCard title="Dependências" status={data.health.dependenciesHealth} value={data.health.dependenciesHealth === 'healthy' ? '✅' : '⚠️'} />
                    </div>

                    <p className="text-xs text-gray-500 pt-4 border-t">Última atualização: {formatDate(data.health.lastChecked)}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Domains */}
              <Card>
                <CardHeader>
                  <CardTitle>Páginas por Domínio</CardTitle>
                  <CardDescription>Distribuição dos conteúdos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(data.domains).map(([domain, info]) => (
                      <DomainCard
                        key={domain}
                        name={domain}
                        count={info.count}
                        color={info.color}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Pages Table */}
            <Card>
              <CardHeader>
                <CardTitle>Páginas Recentes</CardTitle>
                <CardDescription>Últimas páginas criadas e modificadas</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="mb-6 flex flex-col sm:flex-row gap-3">
                  <Input
                    type="text"
                    placeholder="🔍 Buscar por título..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={domainFilter} onValueChange={setDomainFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Todos os domínios" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">Todos os domínios</SelectItem>
                      {Object.keys(data.domains).map((domain) => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Link href="/studio">
                    <Button>
                      + Nova Página
                    </Button>
                  </Link>
                </div>

                {/* Table */}
                {data.recentPages.filter((p) => {
                  if (domainFilter !== 'All' && p.domain !== domainFilter) return false;
                  if (!debouncedQ) return true;
                  return p.name.toLowerCase().includes(debouncedQ.toLowerCase());
                }).length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-4xl mb-2">📄</p>
                    <p className="text-lg font-semibold mb-1">Nenhuma página encontrada</p>
                    <p className="text-muted-foreground mb-4">Crie sua primeira página no Puck Studio</p>
                    <Link href="/studio">
                      <Button>Criar Página</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-1/4">Título</TableHead>
                          <TableHead className="w-1/4">Slug</TableHead>
                          <TableHead className="w-1/5">Domínio</TableHead>
                          <TableHead className="w-1/5">Modificado</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.recentPages
                          .filter((p) => {
                            if (domainFilter !== 'All' && p.domain !== domainFilter) return false;
                            if (!debouncedQ) return true;
                            return p.name.toLowerCase().includes(debouncedQ.toLowerCase());
                          })
                          .map((page) => (
                            <TableRow key={page.id}>
                              <TableCell className="font-medium">{page.name}</TableCell>
                              <TableCell className="text-muted-foreground font-mono text-sm">/{page.slug}</TableCell>
                              <TableCell>
                                <Badge variant="secondary">
                                  {page.domain}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm">{formatDate(page.updatedAt)}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex gap-2 justify-end">
                                  <Link href={page.viewUrl}>
                                    <Button variant="outline" size="sm">
                                      Ver
                                    </Button>
                                  </Link>
                                  <Link href={page.editUrl}>
                                    <Button size="sm">
                                      Editar
                                    </Button>
                                  </Link>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>EDUCACROSS Prototipação © 2024</p>
          {data && <p className="mt-1">Última atualização: {formatDate(data.stats.lastUpdated)}</p>}
        </footer>
      </div>
    </div>
  );
}

