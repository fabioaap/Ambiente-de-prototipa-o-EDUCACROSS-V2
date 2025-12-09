'use client';

import React from 'react';
import styles from './ProfileCard.module.css';

export interface ProfileCardProps {
    /** User's full name */
    name: string;
    /** User's email address */
    email: string;
    /** User's job title or role */
    role?: string;
    /** Avatar image URL */
    avatar?: string;
    /** Avatar fallback initials (e.g., "JD") */
    initials?: string;
    /** Whether card is in edit mode */
    isEditing?: boolean;
    /** Callback when edit is initiated */
    onEdit?: () => void;
    /** Callback when changes are saved */
    onSave?: (data: { name: string; email: string; role?: string }) => void;
    /** Additional CSS class */
    className?: string;
    /** Whether to show social links */
    showLinks?: boolean;
}

/**
 * ProfileCard Component
 *
 * A reusable card component for displaying user profile information.
 * Supports both view and edit modes with accessibility features.
 *
 * @example
 * ```tsx
 * <ProfileCard
 *   name="João Silva"
 *   email="joao@example.com"
 *   role="Product Manager"
 *   avatar="/avatar.jpg"
 *   onEdit={() => setEditing(true)}
 * />
 * ```
 */
export const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
    (
        {
            name,
            email,
            role,
            avatar,
            initials = name.split(' ').map((n) => n[0]).join('').toUpperCase(),
            isEditing = false,
            onEdit,
            onSave,
            className = '',
            showLinks = false,
        },
        ref
    ) => {
        const [editName, setEditName] = React.useState(name);
        const [editEmail, setEditEmail] = React.useState(email);
        const [editRole, setEditRole] = React.useState(role || '');

        const handleSave = () => {
            onSave?.({
                name: editName,
                email: editEmail,
                role: editRole || undefined,
            });
        };

        const handleCancel = () => {
            setEditName(name);
            setEditEmail(email);
            setEditRole(role || '');
        };

        return (
            <div
                ref={ref}
                className={`${styles.card} ${className}`}
                role="region"
                aria-label={`Profile card for ${name}`}
            >
                {/* Avatar */}
                <div className={styles.avatarContainer}>
                    {avatar ? (
                        <img
                            src={avatar}
                            alt={`${name}'s avatar`}
                            className={styles.avatar}
                        />
                    ) : (
                        <div className={styles.avatarFallback} aria-hidden="true">
                            {initials}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className={styles.content}>
                    {isEditing ? (
                        <>
                            {/* Edit Form */}
                            <div className={styles.field}>
                                <label htmlFor="edit-name" className={styles.label}>
                                    Full Name
                                </label>
                                <input
                                    id="edit-name"
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className={styles.input}
                                    required
                                    aria-required="true"
                                    placeholder="Full name"
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="edit-email" className={styles.label}>
                                    Email
                                </label>
                                <input
                                    id="edit-email"
                                    type="email"
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                    className={styles.input}
                                    required
                                    aria-required="true"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="edit-role" className={styles.label}>
                                    Role (Optional)
                                </label>
                                <input
                                    id="edit-role"
                                    type="text"
                                    value={editRole}
                                    onChange={(e) => setEditRole(e.target.value)}
                                    className={styles.input}
                                    placeholder="Job title"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className={styles.actions}>
                                <button
                                    onClick={handleSave}
                                    className={`${styles.button} ${styles.buttonPrimary}`}
                                    aria-label="Save changes"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className={`${styles.button} ${styles.buttonSecondary}`}
                                    aria-label="Cancel editing"
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* View Mode */}
                            <h3 className={styles.name}>{name}</h3>
                            {role && <p className={styles.role}>{role}</p>}
                            <p className={styles.email}>{email}</p>

                            {/* Social Links (Optional) */}
                            {showLinks && (
                                <div className={styles.links}>
                                    <a
                                        href={`mailto:${email}`}
                                        className={styles.link}
                                        aria-label={`Email ${name}`}
                                    >
                                        Email
                                    </a>
                                    <a
                                        href="#"
                                        className={styles.link}
                                        aria-label={`Visit ${name}'s profile`}
                                    >
                                        View Profile
                                    </a>
                                </div>
                            )}

                            {/* Edit Button */}
                            {onEdit && (
                                <button
                                    onClick={onEdit}
                                    className={`${styles.button} ${styles.buttonSecondary}`}
                                    aria-label={`Edit ${name}'s profile`}
                                >
                                    Edit Profile
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    }
);

ProfileCard.displayName = 'ProfileCard';
