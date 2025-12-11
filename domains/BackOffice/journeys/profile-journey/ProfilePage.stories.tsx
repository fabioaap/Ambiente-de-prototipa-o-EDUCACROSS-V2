import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ProfilePage from './ProfilePage';

const meta = {
    title: 'Journeys/BackOffice/ProfilePage',
    component: ProfilePage,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        isLoading: {
            control: 'boolean',
            description: 'Whether page is loading',
        },
        onProfileSave: {
            description: 'Callback when profile is saved',
        },
    },
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default profile page state
 */
export const Default: Story = {
    args: {
        initialData: {
            id: '12345',
            name: 'João Silva',
            email: 'joao.silva@educacross.com',
            role: 'Product Manager',
            joinDate: '2025-01-15',
            lastUpdated: '2025-12-09',
        },
    },
};

/**
 * Profile page in loading state
 */
export const Loading: Story = {
    args: {
        isLoading: true,
        initialData: {
            id: '12345',
            name: 'João Silva',
            email: 'joao.silva@educacross.com',
            role: 'Product Manager',
            joinDate: '2025-01-15',
            lastUpdated: '2025-12-09',
        },
    },
};

/**
 * Profile with minimal data (no role)
 */
export const MinimalData: Story = {
    args: {
        initialData: {
            id: '67890',
            name: 'Maria Santos',
            email: 'maria.santos@educacross.com',
            joinDate: '2025-06-20',
            lastUpdated: '2025-11-30',
        },
    },
};

/**
 * Profile page on mobile device
 */
export const Mobile: Story = {
    args: {
        initialData: {
            id: '12345',
            name: 'Carlos Oliveira',
            email: 'carlos.oliveira@educacross.com',
            role: 'Developer',
            joinDate: '2025-03-10',
            lastUpdated: '2025-12-09',
        },
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

/**
 * Profile page on tablet
 */
export const Tablet: Story = {
    args: {
        initialData: {
            id: '12345',
            name: 'Ana Costa',
            email: 'ana.costa@educacross.com',
            role: 'Designer',
            joinDate: '2025-02-14',
            lastUpdated: '2025-12-01',
        },
    },
    parameters: {
        viewport: {
            defaultViewport: 'tablet',
        },
    },
};

/**
 * Interactive story with edit functionality
 */
export const Interactive: Story = {
    args: {
        initialData: {
            id: '12345',
            name: 'Pedro Martins',
            email: 'pedro.martins@educacross.com',
            role: 'QA Engineer',
            joinDate: '2025-04-22',
            lastUpdated: '2025-12-05',
        },
        onProfileSave: async (data) => {
            // Simulate API call
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Profile saved:', data);
                    resolve(undefined);
                }, 1500);
            });
        },
    },
    render: (args) => {
        const [profile, setProfile] = React.useState(args.initialData);

        return (
            <ProfilePage
                {...args}
                initialData={profile}
                onProfileSave={(data) => {
                    setProfile((prev) => (prev ? { ...prev, ...data } : undefined));
                    return args.onProfileSave?.(data);
                }}
            />
        );
    },
};

/**
 * Profile page with API save error
 */
export const SaveError: Story = {
    args: {
        initialData: {
            id: '12345',
            name: 'Juliana Silva',
            email: 'juliana.silva@educacross.com',
            role: 'Accessibility Specialist',
            joinDate: '2025-05-01',
            lastUpdated: '2025-11-28',
        },
        onProfileSave: async () => {
            throw new Error('Failed to connect to server. Please try again.');
        },
    },
};

/**
 * Accessibility test with keyboard navigation
 */
export const AccessibilityTest: Story = {
    args: {
        initialData: {
            id: '12345',
            name: 'Roberto Costa',
            email: 'roberto.costa@educacross.com',
            role: 'DevOps Engineer',
            joinDate: '2025-07-11',
            lastUpdated: '2025-12-03',
        },
    },
    play: async ({ canvasElement }) => {
        const { userEvent, waitFor, within } = await import('@storybook/test');
        const { expect } = await import('@storybook/test');

        const canvas = within(canvasElement);

        // Find and click "Edit Profile" button
        const editBtn = canvas.getByRole('button', { name: /edit/i });
        await userEvent.click(editBtn);

        // Wait for form inputs to appear
        await waitFor(() => {
            const nameInput = canvas.getByLabelText(/full name/i);
            expect(nameInput).toBeInTheDocument();
        });

        // Tab through form fields
        await userEvent.tab();
        await userEvent.tab();
    },
};

