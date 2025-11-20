'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './ConfirmDialog.module.css';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

export interface ConfirmDialogProps {
  /**
   * Se o diálogo está visível
   */
  isOpen: boolean;
  /**
   * Callback ao confirmar a ação
   */
  onConfirm: () => void;
  /**
   * Callback ao cancelar ou fechar
   */
  onCancel: () => void;
  /**
   * Título do diálogo
   */
  title: string;
  /**
   * Mensagem de confirmação
   */
  message: string;
  /**
   * Texto do botão de confirmar (padrão: "Confirmar")
   */
  confirmLabel?: string;
  /**
   * Texto do botão de cancelar (padrão: "Cancelar")
   */
  cancelLabel?: string;
  /**
   * Variante que define o tom da ação
   */
  variant?: 'danger' | 'warning' | 'info';
}

/**
 * Componente ConfirmDialog - Modal de confirmação para ações críticas
 */
export const ConfirmDialog = React.forwardRef<HTMLDivElement, ConfirmDialogProps>(
  (
    {
      isOpen,
      onConfirm,
      onCancel,
      title,
      message,
      confirmLabel = 'Confirmar',
      cancelLabel = 'Cancelar',
      variant = 'info',
    },
    ref
  ) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          onCancel();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    const confirmButtonVariant = variant === 'danger' ? 'primary' : 'primary';

    const dialogContent = (
      <div className={styles.overlay} onClick={onCancel}>
        <div
          ref={ref}
          className={`${styles.dialog} ${styles[variant]}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
          <div className={styles.header}>
            <Text
              as="h2"
              size="2xl"
              weight="semibold"
              color="default"
            >
              {title}
            </Text>
          </div>

          <div className={styles.body}>
            <Text as="p" size="base" weight="normal" color="muted">
              {message}
            </Text>
          </div>

          <div className={styles.footer}>
            <Button
              variant="outline"
              size="md"
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
            <Button
              variant={confirmButtonVariant}
              size="md"
              onClick={onConfirm}
              autoFocus
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    );

    return typeof document !== 'undefined'
      ? createPortal(dialogContent, document.body)
      : null;
  }
);

ConfirmDialog.displayName = 'ConfirmDialog';
