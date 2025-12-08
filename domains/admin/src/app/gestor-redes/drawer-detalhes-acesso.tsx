'use client';

import React, { useEffect, useRef } from 'react';
import { Button, Progress, Badge, Text, Card } from '@prototipo/design-system';
import styles from './drawer.module.css';

interface InteracaoDetalhe {
    tipo: string;
    icone: string;
    quantidade: number;
    percentual: number;
    tooltip: string;
}

interface DrawerDetalhesAcessoProps {
    aberto: boolean;
    onFechar: () => void;
    titulo?: string;
    totalAcessos: number;
}

export default function DrawerDetalhesAcesso({
    aberto,
    onFechar,
    titulo = 'Detalhes de Acesso - Alunos',
    totalAcessos,
}: DrawerDetalhesAcessoProps) {
    const drawerRef = useRef<HTMLDivElement>(null);

    // Bloquear scroll do body quando drawer está aberto
    useEffect(() => {
        if (aberto) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [aberto]);

    // Fechar com ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && aberto) {
                onFechar();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [aberto, onFechar]);

    // Dados mock de interações
    const interacoes: InteracaoDetalhe[] = [
        {
            tipo: 'Jogaram',
            icone: '🎮',
            quantidade: 38485,
            percentual: 99.17,
            tooltip: 'Alunos que jogaram pelo menos um jogo',
        },
        {
            tipo: 'Viram vídeos',
            icone: '📺',
            quantidade: 32500,
            percentual: 83.75,
            tooltip: 'Alunos que assistiram pelo menos um vídeo',
        },
        {
            tipo: 'Leram livros',
            icone: '📚',
            quantidade: 28900,
            percentual: 74.49,
            tooltip: 'Alunos que leram pelo menos um livro digital',
        },
        {
            tipo: 'Fizeram avaliação',
            icone: '📝',
            quantidade: 25600,
            percentual: 65.98,
            tooltip: 'Alunos que completaram pelo menos uma avaliação',
        },
        {
            tipo: 'Responderam questão',
            icone: '✍️',
            quantidade: 30100,
            percentual: 77.57,
            tooltip: 'Alunos que responderam pelo menos uma questão',
        },
        {
            tipo: 'Ouviram música',
            icone: '🎵',
            quantidade: 18200,
            percentual: 46.91,
            tooltip: 'Alunos que ouviram pelo menos uma música',
        },
    ];

    const getColorByPercentage = (pct: number) => {
        if (pct >= 90) return 'success';
        if (pct >= 70) return 'warning';
        return 'error';
    };

    if (!aberto) return null;

    return (
        <>
            {/* Overlay */}
            <div className={styles.overlay} onClick={onFechar} aria-hidden="true" />

            {/* Drawer */}
            <div
                ref={drawerRef}
                className={`${styles.drawer} ${aberto ? styles.drawerOpen : ''}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="drawer-title"
            >
                {/* Header */}
                <div className={styles.drawerHeader}>
                    <Text id="drawer-title" size="lg" weight="bold">
                        {titulo}
                    </Text>
                    <button
                        className={styles.closeButton}
                        onClick={onFechar}
                        aria-label="Fechar drawer"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className={styles.drawerContent}>
                    {/* Métrica base */}
                    <Card className={styles.metricsCard}>
                        <Text size="sm" color="secondary">Total de alunos que acessaram</Text>
                        <Text size="3xl" weight="bold" className={styles.totalAcessos}>
                            {totalAcessos.toLocaleString('pt-BR')}
                        </Text>
                    </Card>

                    {/* Lista de interações */}
                    <div className={styles.interactionsList}>
                        <Text size="md" weight="semibold" className={styles.sectionTitle}>
                            Tipos de interação
                        </Text>

                        {interacoes.map((interacao) => (
                            <div key={interacao.tipo} className={styles.interactionItem}>
                                <div className={styles.interactionHeader}>
                                    <div className={styles.interactionLabel}>
                                        <span className={styles.interactionIcon} role="img" aria-label={interacao.tipo}>
                                            {interacao.icone}
                                        </span>
                                        <Text size="sm" weight="medium">
                                            {interacao.tipo}
                                        </Text>
                                    </div>
                                    <Badge
                                        variant="soft"
                                        color={getColorByPercentage(interacao.percentual)}
                                        className={styles.interactionBadge}
                                    >
                                        {interacao.percentual.toFixed(2)}%
                                    </Badge>
                                </div>

                                <Progress
                                    value={interacao.percentual}
                                    variant="linear"
                                    size="md"
                                    color={getColorByPercentage(interacao.percentual)}
                                    showLabel={false}
                                    className={styles.interactionProgress}
                                />

                                <div className={styles.interactionStats}>
                                    <Text size="xs" color="secondary">
                                        {interacao.quantidade.toLocaleString('pt-BR')} alunos
                                    </Text>
                                    <Text size="xs" color="secondary" title={interacao.tooltip}>
                                        ℹ️ {interacao.tooltip}
                                    </Text>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Aviso importante */}
                    <Card className={styles.warningCard}>
                        <div className={styles.warningHeader}>
                            <span className={styles.warningIcon}>⚠️</span>
                            <Text size="sm" weight="semibold">Observação importante</Text>
                        </div>
                        <Text size="xs" color="secondary">
                            Os percentuais podem somar mais que 100% pois um mesmo aluno pode realizar múltiplas
                            interações diferentes. Total acumulado: {interacoes.reduce((sum, i) => sum + i.percentual, 0).toFixed(2)}%
                        </Text>
                    </Card>
                </div>

                {/* Footer */}
                <div className={styles.drawerFooter}>
                    <Button variant="outline" onClick={onFechar}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={onFechar}>
                        Exportar dados
                    </Button>
                </div>
            </div>
        </>
    );
}
