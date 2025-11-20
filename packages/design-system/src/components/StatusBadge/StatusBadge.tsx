'use client';

import React from 'react';
import styles from './StatusBadge.module.css';

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Status a ser exibido (define a cor do badge)
   */
  status: 'pending' | 'approved' | 'rejected' | 'reviewing';
  /**
   * Texto customizado do badge (se não fornecido, usa labels padrão)
   */
  label?: string;
}

const defaultLabels: Record<StatusBadgeProps['status'], string> = {
  pending: 'Pendente',
  approved: 'Aprovado',
  rejected: 'Rejeitado',
  reviewing: 'Em Revisão',
};

/**
 * Componente StatusBadge - Badge para indicar status de revisão
 */
export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  (
    {
      status,
      label,
      className = '',
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.badge,
      styles[status],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const displayLabel = label || defaultLabels[status];

    return (
      <span ref={ref} className={classNames} {...props}>
        {displayLabel}
      </span>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';
