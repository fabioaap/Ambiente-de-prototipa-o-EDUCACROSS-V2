import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from '@prototipo/design-system';

const meta = {
    title: 'Components/ProfileCard',
    component: ProfileCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        name: {
            control: 'text',
            description: 'User full name',
        },
        email: {
            control: 'text',
            description: 'User email address',
        },
        role: {
            control: 'text',
            description: 'User job title or role',
        },
        avatar: {
            control: 'text',
            description: 'Avatar image URL',
        },
        isEditing: {
            control: 'boolean',
            description: 'Whether card is in edit mode',
        },
        showLinks: {
            control: 'boolean',
            description: 'Show social/action links',
        },
    },
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: 'João Silva',
        email: 'joao.silva@educacross.com',
        role: 'Product Manager',
        showLinks: false,
    },
};

export const WithAvatar: Story = {
    args: {
        name: 'Maria Santos',
        email: 'maria.santos@educacross.com',
        role: 'UX Designer',
        avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop',
        showLinks: true,
    },
};

export const EditingMode: Story = {
    args: {
        name: 'Ana Costa',
        email: 'ana.costa@educacross.com',
        role: 'Frontend Engineer',
        isEditing: true,
    },
};

export const Mobile: Story = {
    args: {
        name: 'Beatriz Rocha',
        email: 'beatriz.rocha@educacross.com',
        role: 'Product Owner',
        showLinks: true,
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

export const Tablet: Story = {
    args: {
        name: 'Roberto Costa',
        email: 'roberto.costa@educacross.com',
        role: 'DevOps Engineer',
        showLinks: true,
    },
    parameters: {
        viewport: {
            defaultViewport: 'tablet',
        },
    },
};
