'use client';

import React from 'react';
import styles from './ActionButtons.module.css';

/**
 * Props para o componente ActionButtons
 * @param {() => void} [onEdit] - Callback para ação de editar
 * @param {() => void} [onView] - Callback para ação de visualizar
 * @param {() => void} [onDelete] - Callback para ação de deletar
 * @param {string} [editLabel] - Label acessível para botão de editar
 * @param {string} [viewLabel] - Label acessível para botão de visualizar
 * @param {string} [deleteLabel] - Label acessível para botão de deletar
 * @param {'small' | 'medium' | 'large'} [size] - Tamanho dos botões
 */
export interface ActionButtonsProps {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  editLabel?: string;
  viewLabel?: string;
  deleteLabel?: string;
  size?: 'small' | 'medium' | 'large';
}

export const ActionButtons = React.forwardRef<
  HTMLDivElement,
  ActionButtonsProps
>(
  (
    {
      onEdit,
      onView,
      onDelete,
      editLabel = 'Editar',
      viewLabel = 'Visualizar',
      deleteLabel = 'Deletar',
      size = 'medium',
    },
    ref
  ) => {
    const sizeClass = styles[size];

    return (
      <div className={`${styles.actions} ${sizeClass}`} ref={ref}>
        {onView && (
          <button
            type="button"
            className={`${styles.button} ${styles.view}`}
            onClick={onView}
            aria-label={viewLabel}
            title={viewLabel}
          >
            <svg
              className={styles.icon}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 4C5.5 4 2 10 2 10s3.5 6 8 6 8-6 8-6-3.5-6-8-6z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="10"
                cy="10"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        )}
        {onEdit && (
          <button
            type="button"
            className={`${styles.button} ${styles.edit}`}
            onClick={onEdit}
            aria-label={editLabel}
            title={editLabel}
          >
            <svg
              className={styles.icon}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5 2.5a2.121 2.121 0 113 3L7 16l-4 1 1-4L14.5 2.5z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            className={`${styles.button} ${styles.delete}`}
            onClick={onDelete}
            aria-label={deleteLabel}
            title={deleteLabel}
          >
            <svg
              className={styles.icon}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 5h14M8 5V3h4v2m-5 0v10m4-10v10M5 5l1 12h8l1-12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

ActionButtons.displayName = 'ActionButtons';
