'use client';

import React, { useState } from 'react';
import styles from './Avatar.module.css';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL da imagem do avatar */
  src?: string;
  /** Texto alternativo para a imagem */
  alt?: string;
  /** Iniciais a serem exibidas como fallback */
  initials?: string;
  /** Ícone a ser exibido como fallback (ReactNode) */
  icon?: React.ReactNode;
  /** Tamanho do avatar */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Status do usuário (exibe indicador colorido) */
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none';
  /** Badge a ser exibido no canto do avatar */
  badge?: React.ReactNode;
  /** Label acessível para o avatar */
  'aria-label'?: string;
  /** ID para aria-describedby (usado com status) */
  'aria-describedby'?: string;
}

/**
 * Componente Avatar - Exibe imagem de perfil do usuário com fallbacks
 * Implementa fallback chain: src → initials → icon → default
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      initials,
      icon,
      size = 'md',
      status = 'none',
      badge,
      className = '',
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    const classNames = [
      styles.avatar,
      styles[`size-${size}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const statusClassNames = [
      styles.status,
      styles[`status-${status}`],
    ]
      .filter(Boolean)
      .join(' ');

    // Fallback chain: src → initials → icon → default
    const renderContent = () => {
      // Try image first
      if (src && !imageError) {
        return (
          <img
            src={src}
            alt={alt}
            className={styles.image}
            onError={handleImageError}
          />
        );
      }

      // Try initials
      if (initials) {
        return (
          <span 
            className={styles.initials}
            aria-label={ariaLabel || `Avatar com iniciais ${initials}`}
          >
            {initials}
          </span>
        );
      }

      // Try icon
      if (icon) {
        return (
          <span 
            className={styles.icon}
            aria-label={ariaLabel || 'Avatar com ícone'}
          >
            {icon}
          </span>
        );
      }

      // Default fallback (user icon)
      return (
        <span 
          className={styles.icon}
          aria-label={ariaLabel || 'Avatar padrão'}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={styles.defaultIcon}
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </span>
      );
    };

    return (
      <div
        ref={ref}
        className={classNames}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        {...props}
      >
        {renderContent()}
        {status !== 'none' && (
          <span
            className={statusClassNames}
            aria-label={`Status: ${status}`}
            role="status"
          />
        )}
        {badge && (
          <span className={styles.badge} aria-label="Badge">
            {badge}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
