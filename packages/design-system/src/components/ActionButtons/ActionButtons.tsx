'use client';

import React from 'react';
import './ActionButtons.css';

/**
 * Props para o componente ActionButtons
 * @param {() => void} [onEdit] - Callback para ação de editar
 * @param {() => void} [onView] - Callback para ação de visualizar
 * @param {() => void} [onDelete] - Callback para ação de deletar
 * @param {string} [editLabel] - Label acessível para botão de editar
 * @param {string} [viewLabel] - Label acessível para botão de visualizar
 * @param {string} [deleteLabel] - Label acessível para botão de deletar
 * @param {'small' | 'medium' | 'large'} [size] - Tamanho dos botões
 * @param {Record<'edit' | 'view' | 'delete', React.ReactNode>} [icons] - Ícones customizados por ação (sobrescreve os padrões)
 */
export interface ActionButtonsProps {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  editLabel?: string;
  viewLabel?: string;
  deleteLabel?: string;
  size?: 'small' | 'medium' | 'large';
  icons?: Partial<Record<'edit' | 'view' | 'delete', React.ReactNode>>;
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
      icons,
    },
    ref
  ) => {
    const sizeClass = `ActionButtons_${size}`;

    // Ícone padrão para visualizar
    const ViewIcon = icons?.view ? (
      <>{icons.view}</>
    ) : (
      <svg
        className={"ActionButtons_icon"}
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
    );

    // Ícone padrão para editar
    const EditIcon = icons?.edit ? (
      <>{icons.edit}</>
    ) : (
      <svg
        className={"ActionButtons_icon"}
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
    );

    // Ícone padrão para deletar
    const DeleteIcon = icons?.delete ? (
      <>{icons.delete}</>
    ) : (
      <svg
        className={"ActionButtons_icon"}
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
    );

    return (
      <div className={`${"ActionButtons_actions"} ${sizeClass}`} ref={ref}>
        {onView && (
          <button
            type="button"
            className={`${"ActionButtons_button"} ${"ActionButtons_view"}`}
            onClick={onView}
            aria-label={viewLabel}
            title={viewLabel}
          >
            {ViewIcon}
          </button>
        )}
        {onEdit && (
          <button
            type="button"
            className={`${"ActionButtons_button"} ${"ActionButtons_edit"}`}
            onClick={onEdit}
            aria-label={editLabel}
            title={editLabel}
          >
            {EditIcon}
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            className={`${"ActionButtons_button"} ${"ActionButtons_delete"}`}
            onClick={onDelete}
            aria-label={deleteLabel}
            title={deleteLabel}
          >
            {DeleteIcon}
          </button>
        )}
      </div>
    );
  }
);

ActionButtons.displayName = 'ActionButtons';
