'use client';

import React from 'react';
import styles from './FilterGroup.module.css';

/**
 * Props para o componente FilterGroup
 * @param {Array} filters - Configuração dos filtros disponíveis
 * @param {Record<string, any>} [values] - Valores atuais dos filtros
 * @param {(filterId: string, value: any) => void} [onChange] - Callback ao alterar um filtro
 * @param {() => void} [onReset] - Callback ao resetar todos os filtros
 * @param {'horizontal' | 'vertical' | 'grid'} [layout] - Layout dos filtros
 */
export interface FilterGroupProps {
  filters: Array<{
    id: string;
    type: 'select' | 'input' | 'date';
    label: string;
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
    value?: any;
  }>;
  values?: Record<string, any>;
  onChange?: (filterId: string, value: any) => void;
  onReset?: () => void;
  layout?: 'horizontal' | 'vertical' | 'grid';
}

export const FilterGroup = React.forwardRef<HTMLDivElement, FilterGroupProps>(
  (
    { filters, values = {}, onChange, onReset, layout = 'horizontal' },
    ref
  ) => {
    const handleInputChange = (filterId: string, value: any) => {
      onChange?.(filterId, value);
    };

    const renderFilter = (filter: FilterGroupProps['filters'][0]) => {
      const currentValue = values[filter.id] ?? filter.value ?? '';

      switch (filter.type) {
        case 'select':
          return (
            <div key={filter.id} className={styles.filterItem}>
              <label htmlFor={filter.id} className={styles.label}>
                {filter.label}
              </label>
              <select
                id={filter.id}
                className={styles.select}
                value={currentValue}
                onChange={(e) => handleInputChange(filter.id, e.target.value)}
              >
                <option value="">
                  {filter.placeholder || 'Selecione...'}
                </option>
                {filter.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );

        case 'date':
          return (
            <div key={filter.id} className={styles.filterItem}>
              <label htmlFor={filter.id} className={styles.label}>
                {filter.label}
              </label>
              <input
                type="date"
                id={filter.id}
                className={styles.input}
                value={currentValue}
                onChange={(e) => handleInputChange(filter.id, e.target.value)}
              />
            </div>
          );

        case 'input':
        default:
          return (
            <div key={filter.id} className={styles.filterItem}>
              <label htmlFor={filter.id} className={styles.label}>
                {filter.label}
              </label>
              <input
                type="text"
                id={filter.id}
                className={styles.input}
                placeholder={filter.placeholder || ''}
                value={currentValue}
                onChange={(e) => handleInputChange(filter.id, e.target.value)}
              />
            </div>
          );
      }
    };

    const hasActiveFilters = Object.keys(values).some(
      (key) => values[key] !== '' && values[key] !== undefined
    );

    return (
      <div className={styles.container} ref={ref}>
        <div className={`${styles.filters} ${styles[layout]}`}>
          {filters.map((filter) => renderFilter(filter))}
        </div>
        {onReset && (
          <button
            type="button"
            className={`${styles.resetButton} ${
              hasActiveFilters ? styles.active : ''
            }`}
            onClick={onReset}
            disabled={!hasActiveFilters}
          >
            <svg
              className={styles.resetIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Limpar filtros
          </button>
        )}
      </div>
    );
  }
);

FilterGroup.displayName = 'FilterGroup';
