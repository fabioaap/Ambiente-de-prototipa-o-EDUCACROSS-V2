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
import {
  FileText,
  FolderOpen,
  Activity,
  CheckCircle2,
  AlertCircle,
  Hammer,
  Sparkles,
  FileCode,
  Package,
  Building2,
  GraduationCap,
  Gamepad2,
  File,
  BookOpen,
  Compass,
  FileQuestion,
  Search,
  Plus,
  ExternalLink,
  Eye,
  Pencil,
  RefreshCw,
} from 'lucide-react';
import type { DashboardNavigationLink, DashboardSummaryResponse } from '@/lib/types/dashboard';

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

function KPICard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function HealthStatusItem({
  title,
  status,
  icon: Icon
}: {
  title: string;
  status: string;
  icon: React.ElementType;
}) {
  const isOk = ['success', 'healthy', 'excellent', 'good'].includes(status);

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{title}</span>
      </div>
      <Badge variant={isOk ? 'default' : 'destructive'} className="text-xs">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    </div>
  );
}

function DomainItem({ name, count, color }: { name: string; count: number; color: string }) {
  const iconMap: Record<string, React.ElementType> = {
    BackOffice: Building2,
    FrontOffice: GraduationCap,
    Game: Gamepad2,
    Other: File,
  };
  const Icon = iconMap[name] || File;

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <div
          className="h-8 w-8 rounded-md flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <Icon className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-medium">{name}</span>
      </div>
      <span className="text-sm text-muted-foreground">
        {count} {count === 1 ? 'pagina' : 'paginas'}
      </span>
    </div>
  );
}

function QuickLinkCard({ link }: { link: DashboardNavigationLink }) {
  const isExternal = link.url.startsWith('http');
  const iconMap: Record<string, React.ElementType> = {
    storybook: BookOpen,
    journeys: Compass,
    docs: FileText,
  };
  const Icon = iconMap[link.category] || FileQuestion;

  return (
    <Link
      href={link.url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm">{link.title}</CardTitle>
            {isExternal && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground line-clamp-2">{link.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function DashboardPage() {
  const [data, setData] = React.useState<DashboardSummaryResponse['data'] | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [q, setQ] = React.useState('');
  const [debouncedQ, setDebouncedQ] = React.useState(q);
  const [domainFilter, setDomainFilter] = React.useState('All');

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
        setError(err as Error);
        setIsError(true);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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
      setError(err as Error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPages = data?.recentPages.filter((p) => {
    if (domainFilter !== 'All' && p.domain !== domainFilter) return false;
    if (!debouncedQ) return true;
    return p.name.toLowerCase().includes(debouncedQ.toLowerCase());
  }) ?? [];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visao geral do ambiente de prototipacao EDUCACROSS
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={refresh} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      {/* Error State */}
      {isError && (
        <Card className="border-destructive">
          <CardContent className="flex items-center gap-4 py-4">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <div className="flex-1">
              <p className="font-medium text-destructive">Erro ao carregar dashboard</p>
              <p className="text-sm text-muted-foreground">
                {error?.message || 'Nao foi possivel conectar a API.'}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={refresh}>
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Data Loaded */}
      {!isLoading && !isError && data && (
        <>
          {/* KPIs */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPICard
              label="Total de Paginas"
              value={data.stats.totalPages}
              icon={FileText}
            />
            <KPICard
              label="Dominios Ativos"
              value={data.stats.totalDomains}
              icon={FolderOpen}
            />
            <KPICard
              label="Health Score"
              value={`${data.health.healthScore}%`}
              icon={Activity}
            />
            <KPICard
              label="Status"
              value={data.health.healthStatus === 'excellent' ? 'Excelente' : 'Atencao'}
              icon={data.health.healthStatus === 'excellent' ? CheckCircle2 : AlertCircle}
            />
          </div>

          {/* Health & Domains */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Saude do Sistema</CardTitle>
                <CardDescription>Status dos componentes criticos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Score Geral</span>
                    <span className="text-sm font-bold">{data.health.healthScore}%</span>
                  </div>
                  <Progress value={data.health.healthScore} />
                </div>
                <div className="divide-y">
                  <HealthStatusItem title="Build" status={data.health.buildStatus} icon={Hammer} />
                  <HealthStatusItem title="Lint" status={data.health.lintStatus} icon={Sparkles} />
                  <HealthStatusItem title="Types" status={data.health.typeCheckStatus} icon={FileCode} />
                  <HealthStatusItem title="Deps" status={data.health.dependenciesHealth} icon={Package} />
                </div>
                <p className="text-xs text-muted-foreground pt-2 border-t">
                  Atualizado: {formatDate(data.health.lastChecked)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Paginas por Dominio</CardTitle>
                <CardDescription>Distribuicao dos conteudos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {Object.entries(data.domains).map(([domain, info]) => (
                    <DomainItem key={domain} name={domain} count={info.count} color={info.color} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Atalhos Rapidos</CardTitle>
              <CardDescription>Navegue rapidamente pelo ambiente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {data.navigationLinks.map((link) => (
                  <QuickLinkCard key={link.title} link={link} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Pages */}
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-base">Paginas Recentes</CardTitle>
                  <CardDescription>Ultimas paginas criadas e modificadas</CardDescription>
                </div>
                <Link href="/studio">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Pagina
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col gap-4 mb-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar paginas..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={domainFilter} onValueChange={setDomainFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filtrar por dominio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">Todos os dominios</SelectItem>
                    {Object.keys(data.domains).map((domain) => (
                      <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              {filteredPages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="font-medium">Nenhuma pagina encontrada</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Crie sua primeira pagina no Puck Studio
                  </p>
                  <Link href="/studio">
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Pagina
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titulo</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Dominio</TableHead>
                        <TableHead>Modificado</TableHead>
                        <TableHead className="text-right">Acoes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPages.map((page) => (
                        <TableRow key={page.id}>
                          <TableCell className="font-medium">{page.name}</TableCell>
                          <TableCell>
                            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                              /{page.slug}
                            </code>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{page.domain}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(page.updatedAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Link href={page.viewUrl}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link href={page.editUrl}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Pencil className="h-4 w-4" />
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

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground pt-4 border-t">
            <p>EDUCACROSS Prototipacao 2024</p>
            <p>Atualizado: {formatDate(data.stats.lastUpdated)}</p>
          </div>
        </>
      )}
    </div>
  );
}
