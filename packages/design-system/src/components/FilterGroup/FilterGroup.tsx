'use client';

import React from 'react';
import './FilterGroup.css';

/** Tipo para valor de filtro */
type FilterValue = string | number | boolean | null | undefined;

/** Configuração de um filtro individual */
interface FilterConfig {
  id: string;
  type: 'select' | 'input' | 'date';
  label: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  value?: FilterValue;
}

/**
 * Props para o componente FilterGroup
 * @param {FilterConfig[]} filters - Configuração dos filtros disponíveis
 * @param {Record<string, FilterValue>} [values] - Valores atuais dos filtros
 * @param {(filterId: string, value: FilterValue) => void} [onChange] - Callback ao alterar um filtro
 * @param {() => void} [onReset] - Callback ao resetar todos os filtros
 * @param {'horizontal' | 'vertical' | 'grid'} [layout] - Layout dos filtros
 */
export interface FilterGroupProps {
  filters: FilterConfig[];
  values?: Record<string, FilterValue>;
  onChange?: (filterId: string, value: FilterValue) => void;
  onReset?: () => void;
  layout?: 'horizontal' | 'vertical' | 'grid';
}

export const FilterGroup = React.forwardRef<HTMLDivElement, FilterGroupProps>(
  (
    { filters, values = {}, onChange, onReset, layout = 'horizontal' },
    ref
  ) => {
    const handleInputChange = (filterId: string, value: FilterValue) => {
      onChange?.(filterId, value);
    };

    const renderFilter = (filter: FilterConfig) => {
      const currentValue = (values[filter.id] ?? filter.value ?? '') as string;

      switch (filter.type) {
        case 'select':
          return (
            <div key={filter.id} className={"FilterGroup_filterItem"}>
              <label htmlFor={filter.id} className={"FilterGroup_label"}>
                {filter.label}
              </label>
              <select
                id={filter.id}
                className={"FilterGroup_select"}
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
            <div key={filter.id} className={"FilterGroup_filterItem"}>
              <label htmlFor={filter.id} className={"FilterGroup_label"}>
                {filter.label}
              </label>
              <input
                type="date"
                id={filter.id}
                className={"FilterGroup_input"}
                value={currentValue}
                onChange={(e) => handleInputChange(filter.id, e.target.value)}
              />
            </div>
          );

        case 'input':
        default:
          return (
            <div key={filter.id} className={"FilterGroup_filterItem"}>
              <label htmlFor={filter.id} className={"FilterGroup_label"}>
                {filter.label}
              </label>
              <input
                type="text"
                id={filter.id}
                className={"FilterGroup_input"}
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
      <div className={"FilterGroup_container"} ref={ref}>
        <div className={`${"FilterGroup_filters"} ${`FilterGroup_${layout}`}`}>
          {filters.map((filter) => renderFilter(filter))}
        </div>
        {onReset && (
          <button
            type="button"
            className={`${"FilterGroup_resetButton"} ${
              hasActiveFilters ? "FilterGroup_active" : ''
            }`}
            onClick={onReset}
            disabled={!hasActiveFilters}
          >
            <svg
              className={"FilterGroup_resetIcon"}
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
