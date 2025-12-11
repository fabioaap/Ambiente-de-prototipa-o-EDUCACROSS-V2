'use client';

import React, { useState } from 'react';
import { Button, Card, Progress, Text, DataTable } from '@prototipo/design-system';
import styles from './gestor-redes.module.css';
import DrawerDetalhesAcesso from './drawer-detalhes-acesso';

interface KPIData {
    label: string;
    cadastrados: number;
    acessaram: number;
    percentualAcesso: number;
    jogaram?: number;
    percentualJogaram?: number;
}

interface EscolaData {
    id: string;
    nome: string;
    grupo: string;
    cadastrados: number;
    acessaram: number;
    jogaram: number;
    percentualAcesso: number;
    percentualJogaram: number;
}

export default function GestorRedesPage() {
    const [drawerAberto, setDrawerAberto] = useState(false);
    const [grupoSelecionado, setGrupoSelecionado] = useState('todas');
    const [buscaEscola, setBuscaEscola] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Mock data - KPIs
    const kpis: KPIData[] = [
        {
            label: 'Alunos',
            cadastrados: 39269,
            acessaram: 38805,
            percentualAcesso: 98.81,
            jogaram: 38485,
            percentualJogaram: 99.17,
        },
        {
            label: 'Professores',
            cadastrados: 1325,
            acessaram: 1138,
            percentualAcesso: 85.88,
        },
        {
            label: 'Diretores',
            cadastrados: 104,
            acessaram: 49,
            percentualAcesso: 47.11,
        },
        {
            label: 'Coordenadores',
            cadastrados: 141,
            acessaram: 120,
            percentualAcesso: 85.10,
        },
    ];

    // Mock data - Escolas
    const escolasMock: EscolaData[] = [
        {
            id: '1',
            nome: 'EMEI PAULO FREIRE',
            grupo: 'São Paulo',
            cadastrados: 450,
            acessaram: 442,
            jogaram: 438,
            percentualAcesso: 98.22,
            percentualJogaram: 99.09,
        },
        {
            id: '2',
            nome: 'EMEF MARIA MONTESSORI',
            grupo: 'Osasco',
            cadastrados: 520,
            acessaram: 515,
            jogaram: 510,
            percentualAcesso: 99.03,
            percentualJogaram: 99.02,
        },
        {
            id: '3',
            nome: 'ESCOLA MUNICIPAL DOM PEDRO',
            grupo: 'Piracicaba',
            cadastrados: 380,
            acessaram: 370,
            jogaram: 365,
            percentualAcesso: 97.36,
            percentualJogaram: 98.64,
        },
        {
            id: '4',
            nome: 'EMEI ANÍSIO TEIXEIRA',
            grupo: 'Rio de Janeiro',
            cadastrados: 410,
            acessaram: 398,
            jogaram: 390,
            percentualAcesso: 97.07,
            percentualJogaram: 98.00,
        },
        {
            id: '5',
            nome: 'ESCOLA ESTADUAL PRESIDENTE',
            grupo: 'Sorocaba',
            cadastrados: 610,
            acessaram: 580,
            jogaram: 575,
            percentualAcesso: 95.08,
            percentualJogaram: 99.13,
        },
    ];

    // Filtrar escolas
    const escolasFiltradas = escolasMock.filter((escola) => {
        const matchGrupo = grupoSelecionado === 'todas' || escola.grupo.toLowerCase() === grupoSelecionado.toLowerCase();
        const matchBusca = escola.nome.toLowerCase().includes(buscaEscola.toLowerCase());
        return matchGrupo && matchBusca;
    });

    // Paginação
    const totalPages = Math.ceil(escolasFiltradas.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const escolasPaginadas = escolasFiltradas.slice(startIndex, startIndex + itemsPerPage);

    const getColorByPercentage = (pct: number) => {
        if (pct >= 90) return 'success';
        if (pct >= 70) return 'warning';
        return 'error';
    };

    const columns = [
        { key: 'nome', label: 'Escola' },
        { key: 'grupo', label: 'Grupo' },
        { key: 'cadastrados', label: 'Cadastrados' },
        { key: 'acessaram', label: 'Acessaram' },
        { key: 'jogaram', label: 'Jogaram' },
    ];

    const formatTableData = escolasPaginadas.map((escola) => ({
        nome: escola.nome,
        grupo: escola.grupo,
        cadastrados: escola.cadastrados.toString(),
        acessaram: `${escola.percentualAcesso.toFixed(1)}% (${escola.acessaram}/${escola.cadastrados})`,
        jogaram: `${escola.percentualJogaram.toFixed(1)}% (${escola.jogaram}/${escola.acessaram})`,
    }));

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <Text size="2xl" weight="bold">Gestor de Redes</Text>
                <Text size="sm" color="secondary">Dashboard de Engajamento</Text>
            </header>

            {/* Filtros */}
            <div className={styles.filters}>
                <select
                    value={grupoSelecionado}
                    onChange={(e) => setGrupoSelecionado(e.target.value)}
                    className={styles.select}
                >
                    <option value="todas">Todos os Grupos</option>
                    <option value="osasco">Osasco</option>
                    <option value="são paulo">São Paulo</option>
                    <option value="piracicaba">Piracicaba</option>
                    <option value="rio de janeiro">Rio de Janeiro</option>
                    <option value="sorocaba">Sorocaba</option>
                </select>

                <input
                    type="text"
                    placeholder="Buscar escola..."
                    value={buscaEscola}
                    onChange={(e) => setBuscaEscola(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            {/* KPIs Grid */}
            <div className={styles.kpisGrid}>
                {kpis.map((kpi, index) => (
                    <Card key={kpi.label} className={styles.kpiCard}>
                        <Text size="sm" weight="medium" color="secondary">{kpi.label}</Text>

                        <div className={styles.kpiMetrics}>
                            <div>
                                <Text size="xs" color="secondary">Cadastrados</Text>
                                <Text size="lg" weight="bold">{kpi.cadastrados.toLocaleString('pt-BR')}</Text>
                            </div>

                            <div>
                                <Text size="xs" color="secondary">Acessaram</Text>
                                <Text size="lg" weight="bold" color="success">
                                    {kpi.acessaram.toLocaleString('pt-BR')}
                                </Text>
                                <Text size="xs" color="secondary">
                                    {kpi.percentualAcesso.toFixed(2)}%
                                </Text>
                            </div>
                        </div>

                        <Progress
                            value={kpi.percentualAcesso}
                            variant="linear"
                            size="sm"
                            color={getColorByPercentage(kpi.percentualAcesso)}
                            showLabel={false}
                        />

                        {index === 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDrawerAberto(true)}
                                className={styles.verDetalhesBtn}
                            >
                                Ver detalhes →
                            </Button>
                        )}
                    </Card>
                ))}
            </div>

            {/* Tabela */}
            <Card className={styles.tableCard}>
                <Text size="lg" weight="bold">Escolas</Text>
                <Text size="sm" color="secondary" className={styles.tableSubtitle}>
                    {escolasFiltradas.length} escola(s) encontrada(s)
                </Text>

                <DataTable
                    columns={columns}
                    data={formatTableData}
                />

                {/* Paginação */}
                <div className={styles.pagination}>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        ← Anterior
                    </Button>

                    <Text size="sm">
                        Página {currentPage} de {totalPages}
                    </Text>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Próxima →
                    </Button>
                </div>
            </Card>

            {/* Drawer */}
            <DrawerDetalhesAcesso
                aberto={drawerAberto}
                onFechar={() => setDrawerAberto(false)}
                totalAcessos={kpis[0].acessaram}
            />
        </div>
    );
}
