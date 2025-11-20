import React from 'react';
import styles from './StatusBadge.module.css';

export interface StatusBadgeProps {
  /**
   * Status a ser exibido
   */
  status: 'pendente' | 'aprovado' | 'rejeitado' | 'em-revisao';
  /**
   * Tamanho do badge
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

const statusLabels = {
  'pendente': 'Pendente',
  'aprovado': 'Aprovado',
  'rejeitado': 'Rejeitado',
  'em-revisao': 'Em Revisão',
};

/**
 * Componente StatusBadge - Badge para indicar status de items
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const classNames = [
    styles.badge,
    styles[status],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames}>
      {statusLabels[status]}
    </span>
  );
};
