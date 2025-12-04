'use client';

import React from 'react';
import './DataTable.css';

/** Tipo genérico para valores de célula de tabela */
type CellValue = string | number | boolean | null | undefined;

/** Tipo para função de renderização customizada de célula */
type CellRenderer = (value: CellValue, row: Record<string, CellValue>) => React.ReactNode;

/** Configuração de coluna da tabela */
interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: CellRenderer;
}

/**
 * Props para o componente DataTable
 * @param {DataTableColumn[]} columns - Configuração das colunas da tabela
 * @param {Record<string, CellValue>[]} data - Array de dados a serem exibidos
 * @param {boolean} [sortable] - Habilita ordenação global
 * @param {object} [sortState] - Estado atual da ordenação
 * @param {(key: string, direction: 'asc' | 'desc') => void} [onSort] - Callback ao ordenar
 * @param {boolean} [striped] - Linhas com fundo alternado
 * @param {boolean} [hoverable] - Efeito hover nas linhas
 * @param {(row: Record<string, CellValue>) => void} [onRowClick] - Callback ao clicar em uma linha
 * @param {string} [emptyMessage] - Mensagem quando não há dados
 * @param {boolean} [loading] - Estado de carregamento
 */
export interface DataTableProps {
  columns: DataTableColumn[];
  data: Array<Record<string, CellValue>>;
  sortable?: boolean;
  sortState?: { key: string; direction: 'asc' | 'desc' };
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  striped?: boolean;
  hoverable?: boolean;
  onRowClick?: (row: Record<string, CellValue>) => void;
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
          <svg className={"DataTable_sortIcon"} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 4L11 8H5L8 4Z" fill="currentColor" opacity="0.3" />
            <path d="M8 12L5 8H11L8 12Z" fill="currentColor" opacity="0.3" />
          </svg>
        );
      }

      if (sortState.direction === 'asc') {
        return (
          <svg className={`${"DataTable_sortIcon"} ${"DataTable_active"}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 4L11 8H5L8 4Z" fill="currentColor" />
          </svg>
        );
      }

      return (
        <svg className={`${"DataTable_sortIcon"} ${"DataTable_active"}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 12L5 8H11L8 12Z" fill="currentColor" />
        </svg>
      );
    };

    if (loading) {
      return (
        <div className={"DataTable_container"} ref={ref}>
          <div className={"DataTable_loading"}>
            <div className={"DataTable_spinner"} />
            <p>Carregando dados...</p>
          </div>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className={"DataTable_container"} ref={ref}>
          <div className={"DataTable_empty"}>
            <svg className={"DataTable_emptyIcon"} width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
              <path d="M16 20H32M16 28H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p>{emptyMessage}</p>
          </div>
        </div>
      );
    }

    return (
      <div className={"DataTable_container"} ref={ref}>
        <div className={"DataTable_wrapper"}>
          <table className={"DataTable_table"}>
            <thead className={"DataTable_thead"}>
              <tr>
                {columns.map((column) => {
                  const isSortable = sortable && column.sortable;
                  return (
                    <th
                      key={column.key}
                      className={`${"DataTable_th"} ${`DataTable_${column.align || 'left'}`} ${
                        isSortable ? "DataTable_sortable" : ''
                      }`}
                      onClick={() => isSortable && handleSort(column.key)}
                    >
                      <div className={"DataTable_thContent"}>
                        <span>{column.label}</span>
                        {isSortable && renderSortIcon(column.key)}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className={"DataTable_tbody"}>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${"DataTable_tr"} ${striped && rowIndex % 2 !== 0 ? "DataTable_striped" : ''} ${
                    hoverable ? "DataTable_hoverable" : ''
                  } ${onRowClick ? "DataTable_clickable" : ''}`}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`${"DataTable_td"} ${`DataTable_${column.align || 'left'}`}`}
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
