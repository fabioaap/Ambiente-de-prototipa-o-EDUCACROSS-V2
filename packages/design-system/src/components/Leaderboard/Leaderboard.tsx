'use client';

import React from 'react';
import './Leaderboard.css';
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

    const classNames = ["Leaderboard_leaderboard", className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        role="table"
        aria-label={ariaLabel || 'Leaderboard'}
        {...props}
      >
        <div className={"Leaderboard_header"} role="rowgroup">
          <div className={"Leaderboard_headerRow"} role="row">
            <div className={"Leaderboard_headerCell"} role="columnheader">
              Pos
            </div>
            <div className={"Leaderboard_headerCell"} role="columnheader">
              Usuário
            </div>
            <div className={"Leaderboard_headerCell"} role="columnheader">
              Pontuação
            </div>
          </div>
        </div>
        <div className={"Leaderboard_body"} role="rowgroup">
          {sortedEntries.map((entry, index) => {
            const position = index + 1;
            const positionBadge = getPositionBadge(position);
            const isHighlighted = highlightId && entry.id === highlightId;

            return (
              <div
                key={entry.id}
                className={`${"Leaderboard_row"} ${isHighlighted ? "Leaderboard_highlighted" : ''}`}
                role="row"
              >
                <div className={"Leaderboard_cell"} role="cell">
                  <span className={"Leaderboard_position"}>
                    {positionBadge ? (
                      <span className={"Leaderboard_badge"} aria-label={`Posição ${position}`}>
                        {positionBadge}
                      </span>
                    ) : (
                      <span className={"Leaderboard_positionNumber"}>{position}º</span>
                    )}
                  </span>
                </div>
                <div className={"Leaderboard_cell"} role="cell">
                  <div className={"Leaderboard_userInfo"}>
                    <div className={"Leaderboard_avatar"}>
                      {entry.avatar ? (
                        <img
                          src={entry.avatar}
                          alt={`Avatar de ${entry.name}`}
                          className={"Leaderboard_avatarImage"}
                        />
                      ) : (
                        <span className={"Leaderboard_avatarInitials"}>
                          {getInitials(entry.name)}
                        </span>
                      )}
                    </div>
                    <span className={"Leaderboard_userName"}>{entry.name}</span>
                    {entry.badge && (
                      <Badge variant="info" size="sm">
                        {entry.badge}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className={"Leaderboard_cell"} role="cell">
                  <span className={"Leaderboard_score"}>{entry.score.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
        {entries.length === 0 && (
          <div className={"Leaderboard_empty"}>
            <p>Nenhum resultado disponível</p>
          </div>
        )}
      </div>
    );
  }
);

Leaderboard.displayName = 'Leaderboard';
