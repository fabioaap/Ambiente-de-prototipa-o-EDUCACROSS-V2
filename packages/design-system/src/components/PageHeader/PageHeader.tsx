'use client';

import React from 'react';
import styles from './PageHeader.module.css';

/**
 * Props para o componente PageHeader
 * @param {string} title - Título principal da página
 * @param {number} [count] - Contador opcional exibido como badge
 * @param {string} [subtitle] - Subtítulo descritivo
 * @param {React.ReactNode} [actions] - Slot para botões de ação no canto superior direito
 */
export interface PageHeaderProps {
  title: string;
  count?: number;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, count, subtitle, actions }, ref) => {
    return (
      <div className={styles.header} ref={ref}>
        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>
              {title}
              {count !== undefined && (
                <span className={styles.count}>{count}</span>
              )}
            </h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';
