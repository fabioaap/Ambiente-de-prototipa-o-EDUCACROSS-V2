'use client';

import React from 'react';
import styles from './ToolbarButtons.module.css';

/**
 * Props para o componente ToolbarButtons
 * @param {() => void} [onImport] - Callback disparado ao clicar no botão de importar
 * @param {() => void} [onExport] - Callback disparado ao clicar no botão de exportar
 * @param {string} [importLabel] - Label customizado para o botão de importar
 * @param {string} [exportLabel] - Label customizado para o botão de exportar
 * @param {boolean} [disabled] - Desabilita ambos os botões
 */
export interface ToolbarButtonsProps {
  onImport?: () => void;
  onExport?: () => void;
  importLabel?: string;
  exportLabel?: string;
  disabled?: boolean;
}

export const ToolbarButtons = React.forwardRef<
  HTMLDivElement,
  ToolbarButtonsProps
>(
  (
    {
      onImport,
      onExport,
      importLabel = 'Importar',
      exportLabel = 'Exportar',
      disabled = false,
    },
    ref
  ) => {
    return (
      <div className={styles.toolbar} ref={ref}>
        {onImport && (
          <button
            type="button"
            className={styles.button}
            onClick={onImport}
            disabled={disabled}
            aria-label={importLabel}
          >
            <svg
              className={styles.icon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 14V6M10 6L7 9M10 6L13 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 14V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>{importLabel}</span>
          </button>
        )}
        {onExport && (
          <button
            type="button"
            className={styles.button}
            onClick={onExport}
            disabled={disabled}
            aria-label={exportLabel}
          >
            <svg
              className={styles.icon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 6V14M10 14L7 11M10 14L13 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 14V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>{exportLabel}</span>
          </button>
        )}
      </div>
    );
  }
);

ToolbarButtons.displayName = 'ToolbarButtons';
