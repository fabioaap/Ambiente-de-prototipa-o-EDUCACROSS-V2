'use client';

import React from 'react';
import './Chip.module.css';

export interface ChipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Conteúdo do chip */
  children: React.ReactNode;
  /** Variante visual do chip */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  /** Tamanho do chip */
  size?: 'sm' | 'md' | 'lg';
  /** Se o chip pode ser clicado */
  clickable?: boolean;
  /** Se o chip pode ser deletado */
  deletable?: boolean;
  /** Se o chip está selecionado */
  selected?: boolean;
  /** Se o chip está desabilitado */
  disabled?: boolean;
  /** Ícone ou avatar à esquerda */
  icon?: React.ReactNode;
  /** Avatar à esquerda (alternativa ao icon) */
  avatar?: React.ReactNode;
  /** Callback quando o chip é clicado */
  onClick?: (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
  /** Callback quando o botão de deletar é clicado */
  onDelete?: (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => void;
  /** Label acessível para o botão de deletar */
  deleteLabel?: string;
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      clickable = false,
      deletable = false,
      selected = false,
      disabled = false,
      icon,
      avatar,
      onClick,
      onDelete,
      deleteLabel = 'Remover',
      className = '',
      ...props
    },
    ref
  ) => {
    const isInteractive = (clickable || deletable) && !disabled;

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !clickable) return;
      onClick?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;

      // Enter ou Space para selecionar (se clickable)
      if (clickable && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        onClick?.(event);
      }

      // Delete ou Backspace para remover (se deletable)
      if (deletable && (event.key === 'Delete' || event.key === 'Backspace')) {
        event.preventDefault();
        const syntheticEvent = event as unknown as React.KeyboardEvent<HTMLButtonElement>;
        onDelete?.(syntheticEvent);
      }
    };

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (disabled) return;
      onDelete?.(event);
    };

    const handleDeleteKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      
      // Enter ou Space para deletar
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        onDelete?.(event);
      }
    };

    const classNames = [
      'Chip_chip',
      `Chip_${variant}`,
      `Chip_${size}`,
      clickable && 'Chip_clickable',
      selected && 'Chip_selected',
      disabled && 'Chip_disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const chipProps = {
      ref,
      className: classNames,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      role: clickable ? 'button' : undefined,
      tabIndex: isInteractive ? 0 : undefined,
      'aria-pressed': clickable ? selected : undefined,
      'aria-disabled': disabled,
      ...props,
    };

    return (
      <div {...chipProps}>
        {(icon || avatar) && (
          <span className="Chip_iconWrapper">
            {avatar || icon}
          </span>
        )}
        <span className="Chip_label">{children}</span>
        {deletable && (
          <button
            type="button"
            className="Chip_deleteButton"
            onClick={handleDeleteClick}
            onKeyDown={handleDeleteKeyDown}
            aria-label={deleteLabel}
            disabled={disabled}
            tabIndex={-1}
          >
            <svg
              className="Chip_deleteIcon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
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

Chip.displayName = 'Chip';
