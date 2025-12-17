'use client';

import React, { useState } from 'react';
import { ProfileCard } from '@prototipo/design-system';
import styles from './ProfilePage.module.css';

interface UserProfile {
    id: string;
    name: string;
    email: string;
    role?: string;
    avatar?: string;
    joinDate?: string;
    lastUpdated?: string;
}

interface ProfilePageProps {
    /** Initial user data (would come from API in real app) */
    initialData?: UserProfile;
    /** Callback when profile is saved */
    onProfileSave?: (data: Partial<UserProfile>) => void | Promise<void>;
    /** Whether page is in loading state */
    isLoading?: boolean;
    /** Custom CSS class */
    className?: string;
}

/**
 * User Profile Page Component
 *
 * Displays user profile information with ability to edit.
 * Demonstrates proper Design System usage with:
 * - TypeScript strict mode
 * - CSS Modules with tokens
 * - Accessibility (WCAG 2.1 AA)
 * - Responsive design
 * - Storybook documentation
 *
 * @example
 * ```tsx
 * <ProfilePage
 *   initialData={{ name: 'João', email: 'joao@example.com' }}
 *   onProfileSave={(data) => fetch('/api/profile', { method: 'PUT', body: JSON.stringify(data) })}
 * />
 * ```
 */
export default function ProfilePage({
    initialData = {
        id: '1',
        name: 'João Silva',
        email: 'joao.silva@educacross.com',
        role: 'Product Manager',
        joinDate: '2025-01-15',
        lastUpdated: '2025-12-09',
    },
    onProfileSave,
    isLoading = false,
    className = '',
}: ProfilePageProps) {
    const [profile, setProfile] = useState<UserProfile>(initialData);
    const [isEditing, setIsEditing] = useState(false);
    const [saveStatus, setSaveStatus] = useState<
        'idle' | 'saving' | 'success' | 'error'
    >('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleEdit = () => {
        setIsEditing(true);
        setSaveStatus('idle');
        setErrorMessage(null);
    };

    const handleSave = async (updatedData: {
        name: string;
        email: string;
        role?: string;
    }) => {
        setSaveStatus('saving');
        setErrorMessage(null);

        try {
            // Call external callback if provided
            if (onProfileSave) {
                await onProfileSave(updatedData);
            } else {
                // Mock API call
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }

            // Update local state
            setProfile((prev) => ({
                ...prev,
                ...updatedData,
                lastUpdated: new Date().toISOString().split('T')[0],
            }));

            setSaveStatus('success');
            setIsEditing(false);

            // Auto-dismiss success message
            setTimeout(() => {
                setSaveStatus('idle');
            }, 3000);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to save profile';
            setErrorMessage(message);
            setSaveStatus('error');
        }
    };

    return (
        <div
            className={`${styles.container} ${className}`}
            role="main"
            aria-label="User profile page"
        >
            {/* Header */}
            <header className={styles.header}>
                <h1 className={styles.title}>My Profile</h1>
                <p className={styles.subtitle}>
                    View and manage your profile information
                </p>
            </header>

            {/* Status Messages */}
            {saveStatus === 'success' && (
                <div className={`${styles.alert} ${styles.alertSuccess}`} role="status">
                    ✓ Profile saved successfully!
                </div>
            )}

            {saveStatus === 'error' && (
                <div className={`${styles.alert} ${styles.alertError}`} role="alert">
                    ✗ {errorMessage || 'Error saving profile'}
                </div>
            )}

            {isLoading && (
                <div className={`${styles.alert} ${styles.alertInfo}`} role="status">
                    Loading profile...
                </div>
            )}

            {/* Main Content */}
            <div className={styles.content}>
                {/* Profile Card */}
                <section className={styles.section}>
                    <ProfileCard
                        name={profile.name}
                        email={profile.email}
                        role={profile.role}
                        isEditing={isEditing}
                        onEdit={handleEdit}
                        onSave={handleSave}
                        showLinks
                    />
                </section>

                {/* Profile Metadata */}
                {!isEditing && (
                    <aside className={styles.metadata}>
                        <div className={styles.metadataItem}>
                            <span className={styles.metadataLabel}>User ID</span>
                            <span className={styles.metadataValue}>{profile.id}</span>
                        </div>
                        <div className={styles.metadataItem}>
                            <span className={styles.metadataLabel}>Joined</span>
                            <span className={styles.metadataValue}>
                                {profile.joinDate
                                    ? new Date(profile.joinDate).toLocaleDateString('pt-BR')
                                    : 'Unknown'}
                            </span>
                        </div>
                        <div className={styles.metadataItem}>
                            <span className={styles.metadataLabel}>Last Updated</span>
                            <span className={styles.metadataValue}>
                                {profile.lastUpdated
                                    ? new Date(profile.lastUpdated).toLocaleDateString('pt-BR')
                                    : 'Never'}
                            </span>
                        </div>
                    </aside>
                )}
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                <p>
                    Need help?{' '}
                    <a href="#support" className={styles.link}>
                        Contact Support
                    </a>
                </p>
            </footer>
        </div>
    );
}
