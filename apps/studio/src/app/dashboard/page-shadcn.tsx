'use client';

import React from 'react';
import Link from 'next/link';
import { useDashboardSummary } from '@/hooks/useDashboardSummary';
import { useHealthMetrics } from '@/lib/use-health-metrics';
import { Button } from '@/components/shadcn/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/Table';
import styles from './dashboard.module.css';

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
 * Skeleton para Loading states
 */
function Skeleton({ width = 'w-full', height = 'h-4' }: { width?: string; height?: string }) {
    return <div className={`${width} ${height} bg-gray-200 rounded animate-pulse`} />;
}

/**
 * Status Badge com cores
 */
function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        excellent: 'bg-green-100 text-green-800',
        good: 'bg-blue-100 text-blue-800',
        warning: 'bg-yellow-100 text-yellow-800',
        critical: 'bg-red-100 text-red-800',
        success: 'bg-green-100 text-green-800',
        healthy: 'bg-green-100 text-green-800',
        outdated: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
        vulnerable: 'bg-red-100 text-red-800',
    };

    return (
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
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
                        <p className="text-sm font-medium text-gray-600">{label}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
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
        <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">{title}</p>
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

    return (
        <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
                <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                    style={{ backgroundColor: color }}
                >
                    {domainEmoji[name] || '📄'}
                </div>
                <div>
                    <p className="font-semibold text-gray-900">{name}</p>
                    <p className="text-sm text-gray-600">{count} página{count !== 1 ? 's' : ''}</p>
                </div>
            </div>
        </div>
    );
}

/**
 * Dashboard Page com Shadcn UI
 */
export default function DashboardPage() {
    const { data, isLoading, isError, error, refresh } = useDashboardSummary();
    const [q, setQ] = React.useState('');
    const [debouncedQ, setDebouncedQ] = React.useState(q);
    const [domainFilter, setDomainFilter] = React.useState('All');

    // Debounce search query
    React.useEffect(() => {
        const id = setTimeout(() => setDebouncedQ(q), 300);
        return () => clearTimeout(id);
    }, [q]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
                    <p className="text-lg text-gray-600">Visão geral do ambiente de prototipação EDUCACROSS</p>
                </div>

                {/* Error State */}
                {isError && (
                    <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-start gap-4">
                            <span className="text-2xl">⚠️</span>
                            <div>
                                <h3 className="font-semibold text-red-900 mb-1">Erro ao carregar dashboard</h3>
                                <p className="text-red-800 mb-4">{error?.message || 'Não foi possível conectar à API.'}</p>
                                <Button variant="primary" size="sm" onClick={() => refresh()}>
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
                                        <Skeleton height="h-6" className="mb-3" />
                                        <Skeleton height="h-10" width="w-2/3" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        {/* Content Skeleton */}
                        <Card>
                            <CardContent className="p-6">
                                <Skeleton height="h-6" className="mb-4" />
                                <div className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <Skeleton key={i} height="h-12" />
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
                                                <span className="text-sm font-medium text-gray-700">Score</span>
                                                <span className="text-sm font-bold text-gray-900">{data.health.healthScore}%</span>
                                            </div>
                                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all ${data.health.healthScore >= 80
                                                            ? 'bg-green-500'
                                                            : data.health.healthScore >= 60
                                                                ? 'bg-yellow-500'
                                                                : 'bg-red-500'
                                                        }`}
                                                    style={{ width: `${data.health.healthScore}%` }}
                                                />
                                            </div>
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
                                    <input
                                        type="text"
                                        placeholder="🔍 Buscar por título..."
                                        value={q}
                                        onChange={(e) => setQ(e.target.value)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    />
                                    <select
                                        value={domainFilter}
                                        onChange={(e) => setDomainFilter(e.target.value)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    >
                                        <option value="All">Todos os domínios</option>
                                        {Object.keys(data.domains).map((domain) => (
                                            <option key={domain} value={domain}>
                                                {domain}
                                            </option>
                                        ))}
                                    </select>
                                    <Link href="/studio">
                                        <Button variant="primary" size="md">
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
                                        <p className="text-lg font-semibold text-gray-900 mb-1">Nenhuma página encontrada</p>
                                        <p className="text-gray-600 mb-4">Crie sua primeira página no Puck Studio</p>
                                        <Link href="/studio">
                                            <Button variant="primary">Criar Página</Button>
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
                                                            <TableCell className="font-medium text-gray-900">{page.name}</TableCell>
                                                            <TableCell className="text-gray-600 font-mono text-sm">/{page.slug}</TableCell>
                                                            <TableCell>
                                                                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                                    {page.domain}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell className="text-gray-600 text-sm">{formatDate(page.updatedAt)}</TableCell>
                                                            <TableCell className="text-right">
                                                                <div className="flex gap-2 justify-end">
                                                                    <Link href={page.viewUrl}>
                                                                        <Button variant="outline" size="sm">
                                                                            Ver
                                                                        </Button>
                                                                    </Link>
                                                                    <Link href={page.editUrl}>
                                                                        <Button variant="primary" size="sm">
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
                <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
                    <p>EDUCACROSS Prototipação © 2024</p>
                    {data && <p className="mt-1">Última atualização: {formatDate(data.stats.lastUpdated)}</p>}
                </footer>
            </div>
        </div>
    );
}
