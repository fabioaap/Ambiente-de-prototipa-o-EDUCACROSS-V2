'use client';

import React from 'react';
import {
    Layout,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    StatsCard,
    Progress,
    Badge,
    Button,
    Text,
    Avatar,
} from '../../../../packages/design-system/src';
import styles from './PainelInicial.module.css';

/**
 * Dados mockados do aluno
 */
const mockData = {
    aluno: {
        nome: 'João Silva',
        avatar: 'https://i.pravatar.cc/150?img=12',
        progresso: 80,
    },
    estatisticas: [
        { label: 'Atividades', value: '24', icon: '📊', trend: '+3 esta semana' },
        { label: 'Concluídas', value: '19', icon: '✅', trend: '79% total' },
        { label: 'Em Andamento', value: '3', icon: '🎯', trend: '2 vence hoje' },
        { label: 'Pontuação', value: '485', icon: '⭐', trend: '+45 esta semana' },
    ],
    proximasAtividades: [
        { id: 1, titulo: 'Matemática - Frações', status: 'pendente', prazo: 'Hoje, 14:00' },
        { id: 2, titulo: 'Português - Redação', status: 'em-andamento', prazo: 'Amanhã, 10:00' },
        { id: 3, titulo: 'Ciências - Sistema Solar', status: 'pendente', prazo: 'Sexta, 15:00' },
    ],
    notificacoes: [
        { id: 1, mensagem: 'Nova atividade de História disponível', tempo: '5 min atrás' },
        { id: 2, mensagem: 'Prazo da redação se aproxima', tempo: '1 hora atrás' },
        { id: 3, mensagem: 'Parabéns! Você completou 5 atividades hoje', tempo: '2 horas atrás' },
    ],
};

/**
 * Badge de status para atividades
 */
function StatusBadge({ status }: { status: string }) {
    const variants: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
        pendente: 'warning',
        'em-andamento': 'info' as 'default',
        concluida: 'success',
    };

    const labels: Record<string, string> = {
        pendente: 'Pendente',
        'em-andamento': 'Em Andamento',
        concluida: 'Concluída',
    };

    return (
        <Badge variant={variants[status] || 'default'} size="sm">
            {labels[status] || status}
        </Badge>
    );
}

/**
 * Componente principal do Painel Inicial Front Office
 */
export default function PainelInicial() {
    const { aluno, estatisticas, proximasAtividades, notificacoes } = mockData;

    return (
        <Layout maxWidth="2xl">
            <div className={styles.container}>
                {/* Header com saudação */}
                <header className={styles.header}>
                    <div className={styles.headerContent}>
                        <Avatar
                            src={aluno.avatar}
                            alt={aluno.nome}
                            size="lg"
                            className={styles.avatar}
                        />
                        <div className={styles.greeting}>
                            <Text as="h1" size="2xl" weight="bold">
                                Olá, {aluno.nome}!
                            </Text>
                            <Text as="p" size="base" color="muted">
                                Bem-vindo ao seu painel de atividades
                            </Text>
                        </div>
                    </div>
                </header>

                {/* Grid de estatísticas */}
                <section className={styles.statsGrid}>
                    {estatisticas.map((stat, index) => (
                        <StatsCard
                            key={index}
                            label={stat.label}
                            value={stat.value}
                            icon={stat.icon}
                            trend={stat.trend}
                            trendDirection="up"
                        />
                    ))}
                </section>

                {/* Progresso Geral */}
                <section>
                    <Card variant="elevated">
                        <CardHeader>
                            <CardTitle>Progresso Geral</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={styles.progressSection}>
                                <div className={styles.progressHeader}>
                                    <Text as="span" size="sm" color="muted">
                                        {aluno.progresso}% concluído
                                    </Text>
                                    <Text as="span" size="sm" weight="semibold">
                                        {Math.round((aluno.progresso / 100) * 24)}/24 atividades
                                    </Text>
                                </div>
                                <Progress value={aluno.progresso} max={100} size="md" />
                                <Text as="p" size="sm" color="muted" className={styles.progressFooter}>
                                    Continue assim! Você está quase lá! 🎉
                                </Text>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Layout de 2 colunas para Atividades e Notificações */}
                <div className={styles.twoColumns}>
                    {/* Próximas Atividades */}
                    <section>
                        <Card variant="elevated">
                            <CardHeader>
                                <CardTitle>Próximas Atividades</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className={styles.activityList}>
                                    {proximasAtividades.map((atividade) => (
                                        <li key={atividade.id} className={styles.activityItem}>
                                            <div className={styles.activityInfo}>
                                                <Text as="span" size="base" weight="medium">
                                                    {atividade.titulo}
                                                </Text>
                                                <Text as="span" size="sm" color="muted">
                                                    Prazo: {atividade.prazo}
                                                </Text>
                                            </div>
                                            <StatusBadge status={atividade.status} />
                                        </li>
                                    ))}
                                </ul>
                                <div className={styles.cardActions}>
                                    <Button variant="outline" size="sm" fullWidth>
                                        Ver Todas as Atividades
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Notificações Recentes */}
                    <section>
                        <Card variant="elevated">
                            <CardHeader>
                                <CardTitle>Notificações</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className={styles.notificationList}>
                                    {notificacoes.map((notif) => (
                                        <li key={notif.id} className={styles.notificationItem}>
                                            <div className={styles.notificationIcon}>🔔</div>
                                            <div className={styles.notificationContent}>
                                                <Text as="span" size="sm">
                                                    {notif.mensagem}
                                                </Text>
                                                <Text as="span" size="xs" color="muted">
                                                    {notif.tempo}
                                                </Text>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className={styles.cardActions}>
                                    <Button variant="ghost" size="sm" fullWidth>
                                        Ver Todas
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>

                {/* Botão de Ação Principal */}
                <section className={styles.mainAction}>
                    <Button variant="primary" size="lg" fullWidth>
                        Começar Próxima Atividade
                    </Button>
                </section>
            </div>
        </Layout>
    );
}
