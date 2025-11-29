'use client';

import React from 'react';
import './Table.css';

/**
 * Definição de uma coluna da tabela
 */
export interface TableColumn {
  /**
   * Chave única da coluna (deve corresponder à chave no objeto de dados)
   */
  key: string;
  
  /**
   * Label exibido no cabeçalho da coluna
   */
  label: string;
  
  /**
   * Indica se a coluna é ordenável
   * @default false
   */
  sortable?: boolean;
  
  /**
   * Largura da coluna (CSS value: '100px', '20%', 'auto')
   */
  width?: string;
  
  /**
   * Alinhamento do conteúdo da coluna
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
}

/**
 * Direção de ordenação
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Props para o componente Table
 */
export interface TableProps {
  /**
   * Definição das colunas da tabela
   */
  columns: TableColumn[];
  
  /**
   * Dados a serem exibidos (array de objetos)
   */
  data: Array<Record<string, unknown>>;
  
  /**
   * Habilita linhas alternadas (zebra striping)
   * @default false
   */
  striped?: boolean;
  
  /**
   * Habilita borda ao redor da tabela
   * @default false
   */
  bordered?: boolean;
  
  /**
   * Habilita hover nas linhas
   * @default false
   */
  hoverable?: boolean;
  
  /**
   * Callback para ordenação de colunas
   * @param key - Chave da coluna
   * @param direction - Direção de ordenação
   */
  onSort?: (key: string, direction: SortDirection) => void;
  
  /**
   * Estado atual da ordenação
   */
  sortState?: {
    key: string;
    direction: SortDirection;
  };
  
  /**
   * Mensagem exibida quando não há dados
   * @default 'Nenhum dado disponível'
   */
  emptyMessage?: string;
  
  /**
   * ClassName adicional para customização
   */
  className?: string;
}

/**
 * Table - Componente de tabela base para exibição de dados tabulares
 * 
 * Suporta ordenação, linhas alternadas, hover e customização de colunas.
 * 
 * @example
 * // Tabela simples
 * const columns = [
 *   { key: 'id', label: 'ID', sortable: true },
 *   { key: 'name', label: 'Nome', sortable: true },
 *   { key: 'email', label: 'E-mail' }
 * ];
 * const data = [
 *   { id: 1, name: 'João', email: 'joao@example.com' },
 *   { id: 2, name: 'Maria', email: 'maria@example.com' }
 * ];
 * <Table columns={columns} data={data} striped hoverable />
 */
const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      columns,
      data,
      striped = false,
      bordered = false,
      hoverable = false,
      onSort,
      sortState,
      emptyMessage = 'Nenhum dado disponível',
      className,
      ...rest
    },
    ref
  ) => {
    const tableClasses = [
      "Table_table",
      striped && "Table_striped",
      bordered && "Table_bordered",
      hoverable && "Table_hoverable",
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleSort = (column: TableColumn) => {
      if (!column.sortable || !onSort) return;

      const newDirection: SortDirection =
        sortState?.key === column.key && sortState.direction === 'asc'
          ? 'desc'
          : 'asc';

      onSort(column.key, newDirection);
    };

    const getSortIcon = (column: TableColumn) => {
      if (!column.sortable) return null;

      if (sortState?.key !== column.key) {
        return <span className={"Table_sortIcon"}>⇅</span>;
      }

      return sortState.direction === 'asc' ? (
        <span className={"Table_sortIcon"}>↑</span>
      ) : (
        <span className={"Table_sortIcon"}>↓</span>
      );
    };

    return (
      <table ref={ref} className={tableClasses} {...rest}>
        <thead className={"Table_thead"}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`${"Table_th"} ${column.sortable ? "Table_sortable" : ''}`}
                style={{
                  width: column.width,
                  textAlign: column.align || 'left',
                }}
                onClick={() => handleSort(column)}
              >
                <div className={"Table_thContent"}>
                  {column.label}
                  {getSortIcon(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={"Table_tbody"}>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className={"Table_emptyMessage"}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={"Table_td"}
                    style={{ textAlign: column.align || 'left' }}
                  >
                    {String(row[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
);

Table.displayName = 'Table';

export default Table;
