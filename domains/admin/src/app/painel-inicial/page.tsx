'use client';

import React, { useState } from 'react';
import {
    Card,
    Text,
    Select,
    Button,
    DataTable,
    Progress,
    Badge,
    StatsCard,
    ActionButtons,
} from '@prototipo/design-system';
import styles from './painel-inicial.module.css';

// Mock data
const mockData = [
    {
        escola: 'Escola Municipal Santos Dumont',
        cadastrados: 648,
        total: 3000,
        percentual: 21.6,
        professores: 42,
        status: 'Em Processamento',
    },
    {
        escola: 'EMEF Prof. João Silva',
        cadastrados: 1850,
        total: 2500,
        percentual: 74.0,
        professores: 68,
        status: 'Cadastrados',
    },
    {
        escola: 'Colégio Estadual Maria José',
        cadastrados: 580,
        total: 1200,
        percentual: 48.3,
        professores: 35,
        status: 'Em Processamento',
    },
    {
        escola: 'EMEF Monteiro Lobato',
        cadastrados: 2100,
        total: 2100,
        percentual: 100.0,
        professores: 52,
        status: 'Cadastrados',
    },
    {
        escola: 'Escola Técnica São Paulo',
        cadastrados: 125,
        total: 1800,
        percentual: 6.9,
        professores: 28,
        status: 'Não Cadastrados',
    },
];

const getStatusColor = (status: string): string => {
    switch (status) {
        case 'Cadastrados':
            return '#28C76F';
        case 'Em Processamento':
            return '#FF9F43';
        case 'Não Cadastrados':
            return '#EA5455';
        default:
            return '#6E6B7B';
    }
};

export default function PainelInicialPage() {
    const [mesAtual, setMesAtual] = useState('dezembro');
    const [tipoFiltro, setTipoFiltro] = useState('todas');

    // KPI calculations
    const totalCadastrados = mockData.reduce((sum, item) => sum + item.cadastrados, 0);
    const totalAlunos = mockData.reduce((sum, item) => sum + item.total, 0);
    const totalProfessores = mockData.reduce((sum, item) => sum + item.professores, 0);
    const escolasCompletas = mockData.filter((item) => item.percentual === 100).length;
    const taxaGeral = ((totalCadastrados / totalAlunos) * 100).toFixed(1);

    // DataTable configuration
    const columns = [
        { key: 'escola', label: 'ESCOLA' },
        { key: 'alunos', label: 'ALUNOS CADASTRADOS' },
        { key: 'professores', label: 'PROFESSORES' },
        { key: 'status', label: 'STATUS' },
        { key: 'acoes', label: 'AÇÕES' },
    ];

    const tableData = mockData.map((item) => ({
        escola: item.escola,
        alunos: item,
        professores: item.professores,
        status: item.status,
        acoes: item,
    }));

    const cellRenderer = {
        alunos: (value: any, _row: Record<string, any>) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '200px' }}>
                <Text size="sm" weight="semibold">
                    {value.cadastrados.toLocaleString('pt-BR')} de {value.total.toLocaleString('pt-BR')}
                </Text>
                <Progress value={value.percentual} height="12px" />
                <Text size="xs" style={{ color: '#6E6B7B' }}>
                    {value.percentual.toFixed(1)}% concluído
                </Text>
            </div>
        ),
        professores: (value: any) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>👨‍🏫</span>
                <Text size="base" weight="semibold">
                    {value}
                </Text>
            </div>
        ),
        status: (value: any) => (
            <Badge customColor={getStatusColor(value as string)} size="md">
                {value}
            </Badge>
        ),
        acoes: (value: any, _row: Record<string, any>) => (
            <ActionButtons
                icons={{
                    edit: (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M11.3333 2.00004L14 4.66671L4.66667 14H2V11.3334L11.3333 2.00004Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ),
                    view: (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M1 8C1 8 3.66667 3 8 3C12.3333 3 15 8 15 8C15 8 12.3333 13 8 13C3.66667 13 1 8 1 8Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    ),
                    delete: (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M2 4H14M12.6667 4L12 12.6667C12 13.403 11.403 14 10.6667 14H5.33333C4.597 14 4 13.403 4 12.6667L3.33333 4M6 4V2.66667C6 2.29848 6.29848 2 6.66667 2H9.33333C9.70152 2 10 2.29848 10 2.66667V4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ),
                }}
                onEdit={() => console.log('Editar', value.escola)}
                onView={() => console.log('Ver', value.escola)}
                onDelete={() => console.log('Deletar', value.escola)}
            />
        ),
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <Text as="h1" size="2xl" weight="bold">
                        Painel Inicial
                    </Text>
                    <Text size="base" style={{ color: '#6E6B7B', marginTop: '4px' }}>
                        Acompanhe o progresso de cadastramento de alunos por escola
                    </Text>
                </div>

                <div className={styles.headerActions}>
                    <Select
                        value={mesAtual}
                        onChange={(e) => setMesAtual(e.target.value)}
                        options={[
                            { value: 'janeiro', label: 'Janeiro 2025' },
                            { value: 'fevereiro', label: 'Fevereiro 2025' },
                            { value: 'marco', label: 'Março 2025' },
                            { value: 'abril', label: 'Abril 2025' },
                            { value: 'maio', label: 'Maio 2025' },
                            { value: 'junho', label: 'Junho 2025' },
                            { value: 'julho', label: 'Julho 2025' },
                            { value: 'agosto', label: 'Agosto 2025' },
                            { value: 'setembro', label: 'Setembro 2025' },
                            { value: 'outubro', label: 'Outubro 2025' },
                            { value: 'novembro', label: 'Novembro 2025' },
                            { value: 'dezembro', label: 'Dezembro 2025' },
                        ]}
                    />
                    <Button variant="secondary">Exportar Relatório</Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className={styles.kpiGrid}>
                <StatsCard
                    title="Total de Alunos Cadastrados"
                    value={totalCadastrados.toLocaleString('pt-BR')}
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    }
                    trend={{
                        value: '+12.5%',
                        direction: 'up',
                    }}
                />

                <StatsCard
                    title="Total de Professores"
                    value={totalProfessores.toLocaleString('pt-BR')}
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                            <path
                                d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    }
                    trend={{
                        value: '+8.2%',
                        direction: 'up',
                    }}
                />

                <StatsCard
                    title="Escolas 100% Completas"
                    value={`${escolasCompletas} de ${mockData.length}`}
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M7 13L10 16L17 9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    }
                    trend={{
                        value: '+25.0%',
                        direction: 'up',
                    }}
                />

                <StatsCard
                    title="Taxa de Conclusão Geral"
                    value={`${taxaGeral}%`}
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M18 20V10M12 20V4M6 20V14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    }
                    trend={{
                        value: '+5.4%',
                        direction: 'up',
                    }}
                />
            </div>

            {/* Filters */}
            <Card>
                <div className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <Text size="sm" weight="semibold">
                            Filtrar por:
                        </Text>
                        <Select
                            value={tipoFiltro}
                            onChange={(e) => setTipoFiltro(e.target.value)}
                            options={[
                                { value: 'todas', label: 'Todas as escolas' },
                                { value: 'cadastrados', label: 'Cadastrados' },
                                { value: 'processamento', label: 'Em Processamento' },
                                { value: 'nao-cadastrados', label: 'Não Cadastrados' },
                            ]}
                        />
                    </div>
                    <Button variant="primary">Aplicar Filtros</Button>
                </div>
            </Card>

            {/* Data Table */}
            <Card>
                <DataTable
                    columns={columns}
                    data={tableData as any}
                    cellRenderer={cellRenderer}
                    striped
                    hoverable
                />
            </Card>
        </div>
    );
}
