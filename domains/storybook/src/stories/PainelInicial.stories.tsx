import type { Meta, StoryObj } from '@storybook/react';
import PainelInicial from '../../../FrontOffice/journeys/painel-inicial/PainelInicial';

/**
 * Painel Inicial do Front Office
 * 
 * Componente principal que exibe:
 * - Saudação personalizada com avatar do aluno
 * - Estatísticas rápidas (Atividades, Concluídas, Em Andamento, Pontuação)
 * - Barra de progresso geral
 * - Lista de próximas atividades com badges de status
 * - Notificações recentes
 * - Botão de ação principal
 */
const meta = {
    title: 'Journeys/FrontOffice/PainelInicial',
    component: PainelInicial,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
O Painel Inicial é a primeira tela que o aluno vê ao acessar o Front Office.
Ele oferece uma visão consolidada de todas as atividades, progresso e notificações.

## Características:
- ✅ Responsivo (mobile, tablet, desktop)
- ✅ Usa apenas componentes do @prototipo/design-system
- ✅ CSS Modules para estilos isolados
- ✅ Dados mockados para prototipação
- ✅ Acessibilidade (ARIA labels, semântica HTML)

## Componentes Utilizados:
- Layout, Card, StatsCard, Progress, Badge, Button, Text, Avatar

## Figma:
[Ver Design Original](https://www.figma.com/design/5MQ9H24Zojzd8jcnHO61lK/-Front-Office--Pain%C3%A9is-Iniciais?node-id=6482-6149&m=dev)
        `,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PainelInicial>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Estado padrão com progresso de 80% e 3 atividades pendentes
 */
export const Default: Story = {};

/**
 * Visualização em mobile (320px)
 */
export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

/**
 * Visualização em tablet (768px)
 */
export const Tablet: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'tablet',
        },
    },
};

/**
 * Visualização em desktop (1024px+)
 */
export const Desktop: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'desktop',
        },
    },
};

/**
 * Estado de início de jornada (progresso baixo)
 */
export const InicioJornada: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Aluno no início da jornada, com poucas atividades concluídas (20% de progresso).',
            },
        },
    },
};

/**
 * Estado de quase conclusão (progresso alto)
 */
export const QuaseConcluido: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Aluno quase finalizando todas as atividades (95% de progresso).',
            },
        },
    },
};

/**
 * Estado com muitas notificações
 */
export const MuitasNotificacoes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Painel com alta densidade de notificações recentes.',
            },
        },
    },
};

/**
 * Estado vazio (sem atividades)
 */
export const Vazio: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Estado quando não há atividades cadastradas ainda (onboarding inicial).',
            },
        },
    },
};

/**
 * Dark mode (se disponível no Design System)
 */
export const DarkMode: Story = {
    parameters: {
        backgrounds: {
            default: 'dark',
        },
        docs: {
            description: {
                story: 'Visualização em modo escuro (futuro).',
            },
        },
    },
};
