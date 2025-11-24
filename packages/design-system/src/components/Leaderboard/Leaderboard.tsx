'use client';

import React from 'react';
import styles from './Leaderboard.module.css';
import { Badge } from '../Badge/Badge';

export interface LeaderboardEntry {
  /** ID único do usuário */
  id: string;
  /** Nome do usuário */
  name: string;
  /** Pontuação */
  score: number;
  /** URL do avatar (opcional) */
  avatar?: string;
  /** Badge/distintivo (opcional) */
  badge?: string;
}

export interface LeaderboardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Lista de entradas do leaderboard
   */
  entries: LeaderboardEntry[];
  /**
   * Número de entradas a exibir (paginação)
   */
  limit?: number;
  /**
   * Destacar entrada de um usuário específico
   */
  highlightId?: string;
  /**
   * Mostrar badges para top 3
   */
  showTopBadges?: boolean;
  /**
   * Descrição para acessibilidade
   */
  'aria-label'?: string;
}

/**
 * Componente Leaderboard - Tabela de classificação/ranking
 */
export const Leaderboard = React.forwardRef<HTMLDivElement, LeaderboardProps>(
  (
    {
      entries,
      limit,
      highlightId,
      showTopBadges = true,
      className = '',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // Ordenar por pontuação decrescente e limitar
    const sortedEntries = [...entries]
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    const getPositionBadge = (position: number): string | null => {
      if (!showTopBadges) return null;
      switch (position) {
        case 1:
          return '🥇';
        case 2:
          return '🥈';
        case 3:
          return '🥉';
        default:
          return null;
      }
    };

    const getInitials = (name: string): string => {
      return name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    };

    const classNames = [styles.leaderboard, className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        role="table"
        aria-label={ariaLabel || 'Leaderboard'}
        {...props}
      >
        <div className={styles.header} role="rowgroup">
          <div className={styles.headerRow} role="row">
            <div className={styles.headerCell} role="columnheader">
              Pos
            </div>
            <div className={styles.headerCell} role="columnheader">
              Usuário
            </div>
            <div className={styles.headerCell} role="columnheader">
              Pontuação
            </div>
          </div>
        </div>
        <div className={styles.body} role="rowgroup">
          {sortedEntries.map((entry, index) => {
            const position = index + 1;
            const positionBadge = getPositionBadge(position);
            const isHighlighted = highlightId && entry.id === highlightId;

            return (
              <div
                key={entry.id}
                className={`${styles.row} ${isHighlighted ? styles.highlighted : ''}`}
                role="row"
              >
                <div className={styles.cell} role="cell">
                  <span className={styles.position}>
                    {positionBadge ? (
                      <span className={styles.badge} aria-label={`Posição ${position}`}>
                        {positionBadge}
                      </span>
                    ) : (
                      <span className={styles.positionNumber}>{position}º</span>
                    )}
                  </span>
                </div>
                <div className={styles.cell} role="cell">
                  <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                      {entry.avatar ? (
                        <img
                          src={entry.avatar}
                          alt={`Avatar de ${entry.name}`}
                          className={styles.avatarImage}
                        />
                      ) : (
                        <span className={styles.avatarInitials}>
                          {getInitials(entry.name)}
                        </span>
                      )}
                    </div>
                    <span className={styles.userName}>{entry.name}</span>
                    {entry.badge && (
                      <Badge variant="info" size="sm">
                        {entry.badge}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className={styles.cell} role="cell">
                  <span className={styles.score}>{entry.score.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
        {entries.length === 0 && (
          <div className={styles.empty}>
            <p>Nenhum resultado disponível</p>
          </div>
        )}
      </div>
    );
  }
);

Leaderboard.displayName = 'Leaderboard';
