import { NextResponse } from 'next/server';
import type { DashboardSummaryResponse } from '@/lib/types/dashboard';

/**
 * Mock data para o dashboard
 * Em produção, isso seria substituído por queries reais ao banco de dados
 */
const MOCK_SUMMARY_DATA: DashboardSummaryResponse = {
    success: true,
    timestamp: new Date().toISOString(),
    data: {
        status: 'good',
        lastUpdated: new Date().toISOString(),
        healthScore: 87,
        stats: {
            totalPages: 24,
            totalDomains: 3,
            activeDomains: ['BackOffice', 'FrontOffice', 'Game'],
            lastUpdated: new Date().toISOString(),
        },
        kpis: [
            {
                name: 'Páginas mapeadas',
                value: 24,
                unit: ' páginas',
                trend: 'up',
                changePercent: 12.5,
            },
            {
                name: 'Score de saúde',
                value: 87,
                unit: '%',
                trend: 'stable',
                changePercent: 0,
            },
            {
                name: 'Domínios ativos',
                value: 3,
                unit: ' domínios',
                trend: 'up',
                changePercent: 5.0,
            },
            {
                name: 'Jornadas documentadas',
                value: 18,
                unit: ' jornadas',
                trend: 'down',
                changePercent: -2.3,
            },
        ],
        domains: {
            BackOffice: {
                count: 8,
                color: '#3b82f6',
            },
            FrontOffice: {
                count: 10,
                color: '#10b981',
            },
            Game: {
                count: 6,
                color: '#f59e0b',
            },
        },
        health: {
            buildStatus: 'success',
            lintStatus: 'warning',
            typeCheckStatus: 'success',
            dependenciesHealth: 'healthy',
            healthScore: 87,
            healthStatus: 'good',
            lastChecked: new Date().toISOString(),
        },
        recentPages: [
            {
                id: 'backoffice-dashboard',
                slug: 'backoffice/dashboard',
                name: 'Dashboard BackOffice',
                domain: 'BackOffice',
                status: 'published',
                editUrl: '/domains/studio?slug=backoffice/dashboard',
                viewUrl: '/domains/home/backoffice/dashboard',
                createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                description: 'Página principal do backoffice',
            },
            {
                id: 'frontoffice-home',
                slug: 'frontoffice/home',
                name: 'Home FrontOffice',
                domain: 'FrontOffice',
                status: 'published',
                editUrl: '/domains/studio?slug=frontoffice/home',
                viewUrl: '/domains/home/frontoffice/home',
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                description: 'Página inicial para usuários',
            },
            {
                id: 'game-lobby',
                slug: 'game/lobby',
                name: 'Game Lobby',
                domain: 'Game',
                status: 'published',
                editUrl: '/domains/studio?slug=game/lobby',
                viewUrl: '/domains/home/game/lobby',
                createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
                description: 'Lobby de jogos multiplayer',
            },
        ],
        navigationLinks: [
            {
                title: 'Storybook',
                description: 'Catálogo de componentes de interface',
                url: '/domains/storybook',
                category: 'storybook',
            },
            {
                title: 'Jornadas',
                description: 'Mapeamento de fluxos de usuário',
                url: '/domains/BackOffice',
                category: 'journeys',
            },
            {
                title: 'Documentação',
                description: 'Guias e especificações do projeto',
                url: 'https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2',
                category: 'docs',
            },
            {
                title: 'Studio',
                description: 'Editor de páginas com Puck',
                url: '/domains/studio',
                category: 'other',
            },
        ],
    },
};

export async function GET() {
    try {
        // Simular um pequeno delay de rede
        await new Promise((resolve) => setTimeout(resolve, 300));

        return NextResponse.json(MOCK_SUMMARY_DATA, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, must-revalidate',
            },
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'DASHBOARD_INTERNAL_ERROR',
                    message: `Erro ao carregar dashboard: ${errorMessage}`,
                    correlationId: Math.random().toString(36).substr(2, 9),
                },
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
}
