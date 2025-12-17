'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDashboardData } from './useDashboardData';
import { trackEvent } from '@/lib/analytics/init';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Progress,
  Select,
  Skeleton,
} from '@prototipo/design-system';
import {
  Activity,
  AlertCircle,
  BookOpen,
  Building2,
  CheckCircle2,
  Compass,
  Eye,
  File,
  FileCode,
  FileQuestion,
  FileText,
  Gamepad2,
  GraduationCap,
  Package,
  Pencil,
  RefreshCw,
  Search,
  Sparkles,
} from 'lucide-react';

import type {
  DashboardNavigationLink,
  DashboardSummaryResponse,
  StatusType,
} from '@/lib/types/dashboard';

type SummaryData = DashboardSummaryResponse['data'];
type HealthStatusValue =
  | StatusType
  | SummaryData['health']['dependenciesHealth']
  | SummaryData['health']['healthStatus'];

const domainIcons: Record<string, React.ElementType> = {
  BackOffice: Building2,
  FrontOffice: GraduationCap,
  Game: Gamepad2,
  Other: File,
};

const statusDictionary: Record<
  string,
  {
    label: string;
    tone: string;
    value: number;
  }
> = {
  success: { label: 'Saudável', tone: 'text-emerald-600', value: 92 },
  warning: { label: 'Atenção', tone: 'text-amber-600', value: 60 },
  failure: { label: 'Falha', tone: 'text-rose-600', value: 30 },
  healthy: { label: 'Dependências em dia', tone: 'text-emerald-600', value: 85 },
  outdated: { label: 'Atualizar dependências', tone: 'text-amber-600', value: 55 },
  vulnerable: { label: 'Vulnerável', tone: 'text-rose-600', value: 25 },
  excellent: { label: 'Excelente', tone: 'text-emerald-600', value: 95 },
  good: { label: 'Boa saúde', tone: 'text-emerald-600', value: 80 },
  critical: { label: 'Crítico', tone: 'text-rose-600', value: 15 },
};

const trendMeta = {
  up: { label: 'acima do período anterior', prefix: '+', tone: 'text-emerald-600' },
  down: { label: 'abaixo do período anterior', prefix: '-', tone: 'text-rose-600' },
  stable: { label: 'estável', prefix: '~', tone: 'text-muted-foreground' },
};

const PLACEHOLDER_DATE = '2024-01-01T00:00:00.000Z';
const KPI_SKELETON_INDICES = Array.from({ length: 4 }, (_, index) => index);
const DOMAIN_SKELETON_INDICES = Array.from({ length: 3 }, (_, index) => index);

const ICON_BUTTON_CLASS =
  'inline-flex h-8 w-8 items-center justify-center rounded border border-border/60 text-muted-foreground transition hover:bg-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

const isExternalUrl = (url: string) => /^https?:\/\//.test(url);

function formatDate(iso: string = PLACEHOLDER_DATE): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

function getStatusMeta(status: string) {
  return (
    statusDictionary[status] ?? {
      label: status,
      tone: 'text-muted-foreground',
      value: 50,
    }
  );
}

function KPICard({ kpi }: { kpi: SummaryData['kpis'][number] }) {
  const trend = trendMeta[kpi.trend] ?? trendMeta.stable;
  const formattedValue = kpi.value.toLocaleString('pt-BR');

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.name}</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" aria-hidden />
      </CardHeader>
      <CardContent className="space-y-1.5">
        <div className="text-3xl font-semibold tracking-tight text-foreground">
          {formattedValue}
          {kpi.unit}
        </div>
        <p className={`text-xs font-medium ${trend.tone}`}>
          {trend.prefix}
          {Math.abs(kpi.changePercent).toFixed(1)}% · {trend.label}
        </p>
      </CardContent>
    </Card>
  );
}

function HealthStatusItem({
  label,
  status,
  icon: Icon,
}: {
  label: string;
  status: HealthStatusValue;
  icon: React.ElementType;
}) {
  const meta = getStatusMeta(status);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded-md border bg-muted/50 p-2">
            <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className={`text-xs font-medium ${meta.tone}`}>{meta.label}</p>
          </div>
        </div>
        <Badge
          variant="secondary"
          styleType="outlined"
          size="sm"
          className={`${meta.tone} border-current`}
        >
          {status}
        </Badge>
      </div>
      <Progress value={meta.value} aria-label={`Status de ${label}`} />
    </div>
  );
}

function DomainItem({ name, count }: { name: string; count: number }) {
  const Icon = domainIcons[name] ?? File;

  return (
    <div className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2">
      <div className="flex items-center gap-3">
        <span className="rounded-md border bg-background p-2">
          <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
        </span>
        <span className="text-sm font-medium text-foreground">{name}</span>
      </div>
      <Badge variant="secondary" styleType="soft" size="sm" className="text-xs">
        {count}
      </Badge>
    </div>
  );
}

function QuickLinkCard({ link }: { link: DashboardNavigationLink }) {
  const isExternal = link.url.startsWith('http');
  const iconMap: Record<DashboardNavigationLink['category'], React.ElementType> = {
    storybook: BookOpen,
    journeys: Compass,
    docs: FileText,
    other: FileQuestion,
  };
  const Icon = iconMap[link.category] ?? FileQuestion;

  return (
    <Link
      href={link.url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="h-full border border-border shadow-sm transition hover:border-primary/40">
        <CardContent className="flex h-full flex-col gap-4 p-5">
          <span className="inline-flex w-fit rounded-md border bg-muted/80 p-2">
            <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
          </span>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <h3 className="text-base font-medium text-foreground">{link.title}</h3>
              {isExternal && <span className="text-xs text-muted-foreground">↗</span>}
            </div>
            {link.description && <p className="text-sm text-muted-foreground">{link.description}</p>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {KPI_SKELETON_INDICES.map((index) => (
          <Card key={`kpi-skeleton-${index}`}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-28" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="space-y-3">
            {DOMAIN_SKELETON_INDICES.map((index) => (
              <Skeleton key={`domain-skeleton-${index}`} className="h-10 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-md border border-dashed py-10 text-center">
      <FileText className="h-8 w-8 text-muted-foreground" aria-hidden />
      <p className="text-sm font-medium text-muted-foreground">Nenhuma página encontrada</p>
      <Link href="/studio" className="text-xs text-primary underline">
        Criar página no Studio
      </Link>
    </div>
  );
}

export default function DashboardPage() {
  const { data: rawData, error, isLoading, mutate } = useDashboardData();
  const data = rawData as SummaryData | undefined;
  const router = useRouter();
  const isError = !!error;

  // Track dashboard load event
  React.useEffect(() => {
    if (data && !isLoading) {
      trackEvent('dashboard_load', {
        pages_count: data.recentPages?.length || 0,
        domains_count: data.domains?.length || 0,
      });
    }
  }, [data, isLoading]);

  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [domainFilter, setDomainFilter] = React.useState<string>('All');

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedSearch(search), 250);
    return () => window.clearTimeout(timeoutId);
  }, [search]);

  const filteredPages = React.useMemo(() => {
    if (!data) return [];
    const orderedPages = [...data.recentPages].sort((pageA, pageB) => {
      const diff = Date.parse(pageB.updatedAt) - Date.parse(pageA.updatedAt);
      if (diff !== 0) return diff;
      return pageA.slug.localeCompare(pageB.slug);
    });
    return orderedPages.filter((page) => {
      const matchesDomain = domainFilter === 'All' || page.domain === domainFilter;
      const term = debouncedSearch.trim().toLowerCase();
      if (!term) {
        return matchesDomain;
      }
      const haystack = `${page.name} ${page.slug}`.toLowerCase();
      return matchesDomain && haystack.includes(term);
    });
  }, [data, domainFilter, debouncedSearch]);

  const orderedDomains = React.useMemo(() => {
    if (!data) return [];
    return Object.entries(data.domains).sort(([domainA, infoA], [domainB, infoB]) => {
      if (infoB.count !== infoA.count) {
        return infoB.count - infoA.count;
      }
      return domainA.localeCompare(domainB);
    });
  }, [data]);

  const domainOptions = React.useMemo(() => {
    if (!data) return [];
    return Object.keys(data.domains).sort((domainA, domainB) => domainA.localeCompare(domainB));
  }, [data]);

  const quickLinks = React.useMemo(() => {
    if (!data) return [];
    return [...data.navigationLinks].sort((linkA, linkB) => linkA.title.localeCompare(linkB.title));
  }, [data]);

  return (
    <div className="flex-1 bg-background">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Visão geral</p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">Dashboard operacional</h1>
            <p className="text-sm text-muted-foreground">
              Monitoramento contínuo de páginas, jornadas e saúde dos pipelines da sprint corrente.
            </p>
            {data && (
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="success" styleType="soft" size="sm" className="gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                  Atualizado {formatDate(data.lastUpdated)}
                </Badge>
                <Badge variant="secondary" styleType="outlined" size="sm">
                  {data.stats.totalPages} páginas mapeadas
                </Badge>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => void mutate()}
            disabled={isLoading}
            className="w-full md:w-auto"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} aria-hidden />
            Atualizar dados
          </Button>
        </div>

        {isError && (
          <Card className="border-destructive/40">
            <CardContent className="flex items-center gap-4 py-4">
              <AlertCircle className="h-5 w-5 text-destructive" aria-hidden />
              <div className="flex-1">
                <p className="font-medium text-destructive">Erro ao carregar indicadores</p>
                <p className="text-sm text-muted-foreground">
                  {error?.message ?? 'Tente novamente em instantes.'}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => void mutate()}>
                Tentar novamente
              </Button>
            </CardContent>
          </Card>
        )}

        {isLoading && !data && <LoadingState />}

        {!isLoading && data && (
          <>
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {data.kpis.map((kpi) => (
                <KPICard key={kpi.name} kpi={kpi} />
              ))}
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Saúde do ambiente</CardTitle>
                  <CardDescription>Build, lint, types e dependências monitorados continuamente</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-md border bg-muted/40 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Score geral</p>
                        <p className="text-3xl font-semibold text-foreground">{data.health.healthScore}%</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{data.health.healthStatus}</Badge>
                        <p className="text-xs text-muted-foreground">
                          Última verificação {formatDate(data.health.lastChecked)}
                        </p>
                      </div>
                    </div>
                    <Progress value={data.health.healthScore} className="mt-3" aria-label="Score de saúde" />
                  </div>
                  <div className="space-y-4">
                    <HealthStatusItem label="Build" status={data.health.buildStatus} icon={CheckCircle2} />
                    <HealthStatusItem label="Lint" status={data.health.lintStatus} icon={Sparkles} />
                    <HealthStatusItem label="Type-check" status={data.health.typeCheckStatus} icon={FileCode} />
                    <HealthStatusItem
                      label="Dependências"
                      status={data.health.dependenciesHealth}
                      icon={Package}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por domínio</CardTitle>
                  <CardDescription>Última atualização {formatDate(data.stats.lastUpdated)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {orderedDomains.map(([domainName, info]) => (
                    <DomainItem key={domainName} name={domainName} count={info.count} />
                  ))}
                </CardContent>
              </Card>
            </section>

            {quickLinks.length > 0 && (
              <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {quickLinks.map((link) => (
                  <QuickLinkCard key={link.title} link={link} />
                ))}
              </section>
            )}

            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Páginas recentes</CardTitle>
                    <CardDescription>Últimas alterações registradas no Studio</CardDescription>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => void router.push("/studio")}
                    className="gap-2"
                  >
                    <FileText className="mr-2 h-4 w-4" aria-hidden />
                    Nova página
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                    <Input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Buscar por título ou slug"
                      className="pl-10"
                    />
                  </div>
                  <Select
                    value={domainFilter}
                    onChange={(event) => setDomainFilter(event.target.value)}
                    className="w-full sm:w-[220px]"
                  >
                    <option value="All">Todos os domínios</option>
                    {domainOptions.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </Select>
                </div>

                {filteredPages.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="rounded-md border overflow-hidden">
                    <table className="min-w-full divide-y divide-border text-sm">
                      <thead className="bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3 text-left">Título</th>
                          <th className="px-4 py-3 text-left">Slug</th>
                          <th className="px-4 py-3 text-left">Domínio</th>
                          <th className="px-4 py-3 text-left">Atualizado</th>
                          <th className="px-4 py-3 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-background">
                        {filteredPages.map((page) => (
                          <tr key={page.id} className="odd:bg-muted/10">
                            <td className="px-4 py-3 font-medium text-foreground">{page.name}</td>
                            <td className="px-4 py-3">
                              <code className="rounded bg-muted px-2 py-0.5 text-xs">/{page.slug}</code>
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="secondary" styleType="soft" size="sm">
                                {page.domain}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">{formatDate(page.updatedAt)}</td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <Link
                                  href={page.viewUrl}
                                  className={ICON_BUTTON_CLASS}
                                  aria-label={`Visualizar ${page.name}`}
                                  target={isExternalUrl(page.viewUrl) ? '_blank' : undefined}
                                  rel={isExternalUrl(page.viewUrl) ? 'noreferrer' : undefined}
                                >
                                  <Eye className="h-4 w-4" aria-hidden />
                                </Link>
                                <Link
                                  href={page.editUrl}
                                  className={ICON_BUTTON_CLASS}
                                  aria-label={`Editar ${page.name}`}
                                  target={isExternalUrl(page.editUrl) ? '_blank' : undefined}
                                  rel={isExternalUrl(page.editUrl) ? 'noreferrer' : undefined}
                                >
                                  <Pencil className="h-4 w-4" aria-hidden />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="border-t pt-6 text-center text-xs text-muted-foreground">
              <p>Ambiente de prototipação EDUCROSS</p>
              <p>Sincronizado por último em {formatDate(data.stats.lastUpdated)}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
