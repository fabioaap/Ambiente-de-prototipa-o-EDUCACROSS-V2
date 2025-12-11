import type { Meta, StoryObj } from '@storybook/react';
import { IconDashboard, IconChart, IconFlag, IconBook, IconCalendar, IconReading, IconRegister, IconDownload } from '@prototipo/design-system';

const meta: Meta = {
    title: 'Design System/Icons',
    parameters: {
        layout: 'padded',
        docs: { description: { component: 'Galeria de ícones exportados pelo Design System (Icons). Use esses ícones em componentes do DS para manter consistência.' } }
    }
};

export default meta;

export const Gallery: StoryObj = {
    render: () => (
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ width: 140, textAlign: 'center' }}>
                <IconDashboard size={32} />
                <div>Dashboard</div>
            </div>
            <div style={{ width: 140, textAlign: 'center' }}>
                <IconChart size={32} />
                <div>Relatórios</div>
            </div>
            <div style={{ width: 140, textAlign: 'center' }}>
                <IconFlag size={32} />
                <div>Missões</div>
            </div>
            <div style={{ width: 140, textAlign: 'center' }}>
                <IconBook size={32} />
                <div>Sistema</div>
            </div>
            <div style={{ width: 140, textAlign: 'center' }}>
                <IconCalendar size={32} />
                <div>Eventos</div>
            </div>
            <div style={{ width: 140, textAlign: 'center' }}>
                <IconReading size={32} />
                <div>Leitura</div>
            </div>
            <div style={{ width: 140, textAlign: 'center' }}>
                <IconRegister size={32} />
                <div>Cadastros</div>
            </div>
            <div style={{ width: 140, textAlign: 'center' }}>
                <IconDownload size={32} />
                <div>Ajuda</div>
            </div>
        </div>
    ),
};
