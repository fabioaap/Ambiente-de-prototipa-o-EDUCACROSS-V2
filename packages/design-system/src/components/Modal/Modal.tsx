'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

/**
 * Props para o componente Modal
 * @param {boolean} open - Controla visibilidade do modal
 * @param {() => void} onClose - Callback ao fechar o modal
 * @param {string} [title] - Título exibido no cabeçalho
 * @param {React.ReactNode} children - Conteúdo do modal
 * @param {React.ReactNode} [footer] - Conteúdo do rodapé (normalmente botões)
 * @param {'small' | 'medium' | 'large' | 'fullscreen'} [size] - Tamanho do modal
 * @param {boolean} [closeOnOverlayClick] - Permite fechar ao clicar no overlay
 * @param {boolean} [closeOnEsc] - Permite fechar com tecla ESC
 */
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      children,
      footer,
      size = 'medium',
      closeOnOverlayClick = true,
      closeOnEsc = true,
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (open) {
        previousActiveElement.current = document.activeElement as HTMLElement;
        
        // Focus trap
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements?.[0] as HTMLElement;
        firstElement?.focus();

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        return () => {
          document.body.style.overflow = '';
          previousActiveElement.current?.focus();
        };
      }
    }, [open]);

    useEffect(() => {
      if (!closeOnEsc || !open) return;

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }, [closeOnEsc, open, onClose]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    };

    if (!open) return null;

    const modalContent = (
      <div
        className={`${"Modal_overlay"} ${open ? "Modal_show" : ''}`}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        <div
          className={`${"Modal_modal"} ${`Modal_${size}`}`}
          ref={modalRef}
          role="document"
        >
          <div className={"Modal_header"}>
            {title && (
              <h2 id="modal-title" className={"Modal_title"}>
                {title}
              </h2>
            )}
            <button
              type="button"
              className={"Modal_closeButton"}
              onClick={onClose}
              aria-label="Fechar modal"
            >
              <svg
                className={"Modal_closeIcon"}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
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
          </div>
          <div className={"Modal_body"} ref={ref}>
            {children}
          </div>
          {footer && <div className={"Modal_footer"}>{footer}</div>}
        </div>
      </div>
    );

    return createPortal(modalContent, document.body);
  }
);

Modal.displayName = 'Modal';
