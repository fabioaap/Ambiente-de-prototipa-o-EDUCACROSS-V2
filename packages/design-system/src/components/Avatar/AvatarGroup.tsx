'use client';

import React from 'react';
import styles from './Avatar.module.css';
import { Avatar, AvatarProps } from './Avatar';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array de props de Avatar para renderizar */
  avatars?: AvatarProps[];
  /** Número máximo de avatares a serem exibidos antes de mostrar +N */
  max?: number;
  /** Tamanho dos avatares no grupo */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Renderizar avatares empilhados (overlap) */
  stacked?: boolean;
  /** Label acessível para o grupo */
  'aria-label'?: string;
}

/**
 * Componente AvatarGroup - Agrupa múltiplos avatares com overflow (+N)
 */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      avatars = [],
      max = 5,
      size = 'md',
      stacked = true,
      className = '',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const visibleAvatars = avatars.slice(0, max);
    const remainingCount = Math.max(0, avatars.length - max);

    const classNames = [
      styles.avatarGroup,
      stacked && styles.stacked,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        aria-label={ariaLabel || `Grupo de ${avatars.length} avatar${avatars.length !== 1 ? 'es' : ''}`}
        role="group"
        {...props}
      >
        {visibleAvatars.map((avatarProps, index) => (
          <Avatar
            key={index}
            {...avatarProps}
            size={size}
            className={styles.groupAvatar}
          />
        ))}
        {remainingCount > 0 && (
          <div
            className={`${styles.avatar} ${styles[`size-${size}`]} ${styles.groupAvatar} ${styles.overflow}`}
            aria-label={`Mais ${remainingCount} usuário${remainingCount !== 1 ? 's' : ''}`}
          >
            <span className={styles.overflowText}>
              +{remainingCount}
            </span>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
