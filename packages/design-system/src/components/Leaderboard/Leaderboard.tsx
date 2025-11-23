'use client';

import React from 'react';
import { Badge } from '../Badge/Badge';
import styles from './Leaderboard.module.css';

export interface LeaderboardEntry {
  /** ID único do participante */
  id: string;
  /** Nome do participante */
  name: string;
  /** Pontuação do participante */
  score: number;
  /** URL do avatar (opcional) */
  avatar?: string;
  /** Dados customizados adicionais */
  metadata?: Record<string, unknown>;
}

export interface LeaderboardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lista de participantes no ranking */
  entries: LeaderboardEntry[];
  /** Número máximo de entradas a exibir */
  maxEntries?: number;
  /** Se verdadeiro, destaca o top 3 com badges especiais */
  highlightTop3?: boolean;
  /** Se verdadeiro, exibe avatares/iniciais */
  showAvatar?: boolean;
  /** Variante visual do leaderboard */
  variant?: 'default' | 'compact' | 'detailed';
  /** Label ARIA para acessibilidade */
  'aria-label'?: string;
}

/**
 * Componente Leaderboard - Exibe ranking de participantes
 * 
 * @example
 * ```tsx
 * <Leaderboard
 *   entries={[
 *     { id: '1', name: 'João Silva', score: 1500 },
 *     { id: '2', name: 'Maria Santos', score: 1200 },
 *   ]}
 *   highlightTop3
 * />
 * ```
 */
export const Leaderboard = React.forwardRef<HTMLDivElement, LeaderboardProps>(
  (
    {
      entries,
      maxEntries = 10,
      highlightTop3 = true,
      showAvatar = true,
      variant = 'default',
      'aria-label': ariaLabel = 'Tabela de classificação',
      className = '',
      ...props
    },
    ref
  ) => {
    // Ordena por pontuação decrescente e limita ao máximo de entradas
    const sortedEntries = React.useMemo(() => {
      return [...entries]
        .sort((a, b) => b.score - a.score)
        .slice(0, maxEntries);
    }, [entries, maxEntries]);

    // Gera iniciais do nome para avatar
    const getInitials = (name: string): string => {
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
    };

    // Retorna o badge apropriado para o top 3
    const getRankBadge = (position: number) => {
      if (!highlightTop3 || position > 3) return null;

      const badges = [
        { emoji: '🥇', variant: 'warning' as const, label: '1º lugar' },
        { emoji: '🥈', variant: 'default' as const, label: '2º lugar' },
        { emoji: '🥉', variant: 'warning' as const, label: '3º lugar' },
      ];

      const badge = badges[position - 1];
      return (
        <Badge variant={badge.variant} size="sm" aria-label={badge.label}>
          {badge.emoji}
        </Badge>
      );
    };

    const classNames = [
      styles.leaderboard,
      styles[variant],
      className,
    ].filter(Boolean).join(' ');

    if (sortedEntries.length === 0) {
      return (
        <div ref={ref} className={classNames} {...props}>
          <p className={styles.empty}>Nenhum dado disponível</p>
        </div>
      );
    }

    return (
      <div ref={ref} className={classNames} {...props}>
        <table className={styles.table} aria-label={ariaLabel}>
          <thead>
            <tr>
              <th className={styles.rankHeader} scope="col">Pos.</th>
              {showAvatar && <th className={styles.avatarHeader} scope="col">
                <span className={styles.srOnly}>Avatar</span>
              </th>}
              <th className={styles.nameHeader} scope="col">Nome</th>
              <th className={styles.scoreHeader} scope="col">Pontuação</th>
              {highlightTop3 && <th className={styles.badgeHeader} scope="col">
                <span className={styles.srOnly}>Distintivo</span>
              </th>}
            </tr>
          </thead>
          <tbody>
            {sortedEntries.map((entry, index) => {
              const position = index + 1;
              const isTopThree = position <= 3;
              
              return (
                <tr
                  key={entry.id}
                  className={isTopThree ? styles.topThree : undefined}
                  aria-label={`${position}º lugar: ${entry.name} com ${entry.score} pontos`}
                >
                  <td className={styles.rankCell}>
                    <span className={styles.rankNumber}>{position}º</span>
                  </td>
                  {showAvatar && (
                    <td className={styles.avatarCell}>
                      {entry.avatar ? (
                        <img
                          src={entry.avatar}
                          alt={`Avatar de ${entry.name}`}
                          className={styles.avatar}
                        />
                      ) : (
                        <div className={styles.avatarInitials} aria-label={`Iniciais de ${entry.name}`}>
                          {getInitials(entry.name)}
                        </div>
                      )}
                    </td>
                  )}
                  <td className={styles.nameCell}>
                    <span className={styles.name}>{entry.name}</span>
                  </td>
                  <td className={styles.scoreCell}>
                    <span className={styles.score}>{entry.score.toLocaleString('pt-BR')}</span>
                  </td>
                  {highlightTop3 && (
                    <td className={styles.badgeCell}>
                      {getRankBadge(position)}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
);

Leaderboard.displayName = 'Leaderboard';
