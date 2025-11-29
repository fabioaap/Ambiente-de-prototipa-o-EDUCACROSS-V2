'use client';

import React from 'react';
import styles from './DataTable.module.css';

/**
 * Props para o componente DataTable
 * @param {Array} columns - Configuração das colunas da tabela
 * @param {Array} data - Array de dados a serem exibidos
 * @param {boolean} [sortable] - Habilita ordenação global
 * @param {object} [sortState] - Estado atual da ordenação
 * @param {(key: string, direction: 'asc' | 'desc') => void} [onSort] - Callback ao ordenar
 * @param {boolean} [striped] - Linhas com fundo alternado
 * @param {boolean} [hoverable] - Efeito hover nas linhas
 * @param {(row: Record<string, any>) => void} [onRowClick] - Callback ao clicar em uma linha
 * @param {string} [emptyMessage] - Mensagem quando não há dados
 * @param {boolean} [loading] - Estado de carregamento
 */
export interface DataTableProps {
  columns: Array<{
    key: string;
    label: string;
    sortable?: boolean;
    align?: 'left' | 'center' | 'right';
    render?: (value: any, row: Record<string, any>) => React.ReactNode;
  }>;
  data: Array<Record<string, any>>;
  sortable?: boolean;
  sortState?: { key: string; direction: 'asc' | 'desc' };
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  striped?: boolean;
  hoverable?: boolean;
  onRowClick?: (row: Record<string, any>) => void;
  emptyMessage?: string;
  loading?: boolean;
}

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
  (
    {
      columns,
      data,
      sortable = false,
      sortState,
      onSort,
      striped = false,
      hoverable = true,
      onRowClick,
      emptyMessage = 'Nenhum dado disponível',
      loading = false,
    },
    ref
  ) => {
    const handleSort = (columnKey: string) => {
      if (!sortable || !onSort) return;

      const column = columns.find((col) => col.key === columnKey);
      if (!column?.sortable) return;

      const newDirection =
        sortState?.key === columnKey && sortState.direction === 'asc'
          ? 'desc'
          : 'asc';
      onSort(columnKey, newDirection);
    };

    const renderSortIcon = (columnKey: string) => {
      if (!sortState || sortState.key !== columnKey) {
        return (
          <svg className={styles.sortIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 4L11 8H5L8 4Z" fill="currentColor" opacity="0.3" />
            <path d="M8 12L5 8H11L8 12Z" fill="currentColor" opacity="0.3" />
          </svg>
        );
      }

      if (sortState.direction === 'asc') {
        return (
          <svg className={`${styles.sortIcon} ${styles.active}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 4L11 8H5L8 4Z" fill="currentColor" />
          </svg>
        );
      }

      return (
        <svg className={`${styles.sortIcon} ${styles.active}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 12L5 8H11L8 12Z" fill="currentColor" />
        </svg>
      );
    };

    if (loading) {
      return (
        <div className={styles.container} ref={ref}>
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Carregando dados...</p>
          </div>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className={styles.container} ref={ref}>
          <div className={styles.empty}>
            <svg className={styles.emptyIcon} width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
              <path d="M16 20H32M16 28H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p>{emptyMessage}</p>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.container} ref={ref}>
        <div className={styles.wrapper}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                {columns.map((column) => {
                  const isSortable = sortable && column.sortable;
                  return (
                    <th
                      key={column.key}
                      className={`${styles.th} ${styles[column.align || 'left']} ${
                        isSortable ? styles.sortable : ''
                      }`}
                      onClick={() => isSortable && handleSort(column.key)}
                    >
                      <div className={styles.thContent}>
                        <span>{column.label}</span>
                        {isSortable && renderSortIcon(column.key)}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${styles.tr} ${striped && rowIndex % 2 !== 0 ? styles.striped : ''} ${
                    hoverable ? styles.hoverable : ''
                  } ${onRowClick ? styles.clickable : ''}`}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`${styles.td} ${styles[column.align || 'left']}`}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

DataTable.displayName = 'DataTable';
