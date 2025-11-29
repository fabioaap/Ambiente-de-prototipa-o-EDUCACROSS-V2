'use client';

import React from 'react';
import styles from './Pagination.module.css';

/**
 * Props para o componente Pagination
 * @param {number} currentPage - Página atual (1-indexed)
 * @param {number} totalPages - Total de páginas
 * @param {(page: number) => void} onChange - Callback ao mudar de página
 * @param {number} [siblingCount] - Número de páginas vizinhas mostradas de cada lado
 * @param {boolean} [showFirstLast] - Exibe botões de primeira e última página
 * @param {boolean} [disabled] - Desabilita toda a paginação
 */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  disabled?: boolean;
}

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const DOTS = '...';

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onChange,
      siblingCount = 1,
      showFirstLast = false,
      disabled = false,
    },
    ref
  ) => {
    const paginationRange = React.useMemo(() => {
      const totalPageNumbers = siblingCount + 5;

      if (totalPageNumbers >= totalPages) {
        return range(1, totalPages);
      }

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPages
      );

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = range(1, leftItemCount);
        return [...leftRange, DOTS, totalPages];
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = range(totalPages - rightItemCount + 1, totalPages);
        return [1, DOTS, ...rightRange];
      }

      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, DOTS, ...middleRange, DOTS, totalPages];
    }, [currentPage, totalPages, siblingCount]);

    const handlePageChange = (page: number) => {
      if (!disabled && page !== currentPage && page >= 1 && page <= totalPages) {
        onChange(page);
      }
    };

    if (totalPages <= 1) {
      return null;
    }

    return (
      <nav className={styles.pagination} ref={ref} aria-label="Paginação">
        <div className={styles.container}>
          {showFirstLast && (
            <button
              type="button"
              className={styles.button}
              onClick={() => handlePageChange(1)}
              disabled={disabled || currentPage === 1}
              aria-label="Primeira página"
            >
              <svg
                className={styles.icon}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M13 15L8 10L13 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 5V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
          <button
            type="button"
            className={styles.button}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={disabled || currentPage === 1}
            aria-label="Página anterior"
          >
            <svg
              className={styles.icon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M12 15L7 10L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return (
                <span key={`dots-${index}`} className={styles.dots}>
                  {DOTS}
                </span>
              );
            }

            const page = pageNumber as number;
            return (
              <button
                key={page}
                type="button"
                className={`${styles.button} ${styles.pageButton} ${
                  page === currentPage ? styles.active : ''
                }`}
                onClick={() => handlePageChange(page)}
                disabled={disabled}
                aria-label={`Página ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            className={styles.button}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={disabled || currentPage === totalPages}
            aria-label="Próxima página"
          >
            <svg
              className={styles.icon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M8 5L13 10L8 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {showFirstLast && (
            <button
              type="button"
              className={styles.button}
              onClick={() => handlePageChange(totalPages)}
              disabled={disabled || currentPage === totalPages}
              aria-label="Última página"
            >
              <svg
                className={styles.icon}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M7 5L12 10L7 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 5V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';
