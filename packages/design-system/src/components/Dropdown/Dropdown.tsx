'use client';

import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import styles from './Dropdown.module.css';

/**
 * Props para o componente Dropdown root
 */
export interface DropdownProps {
  /**
   * Conteúdo do dropdown (trigger e menu)
   */
  children: React.ReactNode;
  /**
   * Controle externo do estado aberto/fechado
   */
  open?: boolean;
  /**
   * Callback quando o estado muda
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Valor padrão para estado não controlado
   */
  defaultOpen?: boolean;
  /**
   * Direção de leitura para suporte a i18n
   */
  dir?: 'ltr' | 'rtl';
  /**
   * Previne fechamento ao interagir com elementos fora
   */
  modal?: boolean;
}

/**
 * Componente Dropdown - Container root para o dropdown menu
 * Baseado em Radix UI para acessibilidade e navegação por teclado
 */
export const Dropdown = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Root>,
  DropdownProps
>(({ children, open, onOpenChange, defaultOpen, dir, modal = true }, _ref) => {
  return (
    <DropdownMenuPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      dir={dir}
      modal={modal}
    >
      {children}
    </DropdownMenuPrimitive.Root>
  );
});

Dropdown.displayName = 'Dropdown';

/**
 * Props para o DropdownTrigger
 */
export interface DropdownTriggerProps {
  /**
   * Elemento que abre o dropdown ao clicar
   */
  children: React.ReactNode;
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * Se o trigger está desabilitado
   */
  disabled?: boolean;
  /**
   * Label acessível para screen readers
   */
  'aria-label'?: string;
}

/**
 * DropdownTrigger - Elemento que abre o dropdown ao clicar
 */
export const DropdownTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  DropdownTriggerProps
>(({ children, className = '', disabled, 'aria-label': ariaLabel, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Trigger
      ref={ref}
      className={`${styles.trigger} ${className}`}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
});

DropdownTrigger.displayName = 'DropdownTrigger';

/**
 * Props para o DropdownContent
 */
export interface DropdownContentProps {
  /**
   * Conteúdo do menu dropdown
   */
  children: React.ReactNode;
  /**
   * Alinhamento do conteúdo em relação ao trigger
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Lado preferencial para exibição
   */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * Offset em pixels do trigger
   */
  sideOffset?: number;
  /**
   * Se deve evitar colisões com viewport
   */
  avoidCollisions?: boolean;
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * Loop de foco ao navegar com teclado
   */
  loop?: boolean;
}

/**
 * DropdownContent - Container do conteúdo do dropdown
 */
export const DropdownContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownContentProps
>(
  (
    {
      children,
      align = 'start',
      side = 'bottom',
      sideOffset = 4,
      avoidCollisions = true,
      className = '',
      loop = true,
      ...props
    },
    ref
  ) => {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={ref}
          className={`${styles.content} ${className}`}
          align={align}
          side={side}
          sideOffset={sideOffset}
          avoidCollisions={avoidCollisions}
          loop={loop}
          {...props}
        >
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    );
  }
);

DropdownContent.displayName = 'DropdownContent';

/**
 * Props para o DropdownItem
 */
export interface DropdownItemProps {
  /**
   * Conteúdo do item
   */
  children: React.ReactNode;
  /**
   * Se o item está desabilitado
   */
  disabled?: boolean;
  /**
   * Callback ao selecionar o item
   */
  onSelect?: (event: Event) => void;
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * Indica um item destrutivo (ex: deletar)
   */
  destructive?: boolean;
  /**
   * Ícone opcional à esquerda do texto
   */
  icon?: React.ReactNode;
  /**
   * Atalho de teclado opcional (apenas visual)
   */
  shortcut?: string;
}

/**
 * DropdownItem - Item clicável do menu dropdown
 */
export const DropdownItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownItemProps
>(
  (
    {
      children,
      disabled,
      onSelect,
      className = '',
      destructive = false,
      icon,
      shortcut,
      ...props
    },
    ref
  ) => {
    const itemClassName = `${styles.item} ${
      destructive ? styles.destructive : ''
    } ${className}`;

    return (
      <DropdownMenuPrimitive.Item
        ref={ref}
        className={itemClassName}
        disabled={disabled}
        onSelect={onSelect}
        {...props}
      >
        {icon && <span className={styles.itemIcon}>{icon}</span>}
        <span className={styles.itemText}>{children}</span>
        {shortcut && <span className={styles.itemShortcut}>{shortcut}</span>}
      </DropdownMenuPrimitive.Item>
    );
  }
);

DropdownItem.displayName = 'DropdownItem';

/**
 * Props para o DropdownLabel
 */
export interface DropdownLabelProps {
  /**
   * Conteúdo do label
   */
  children: React.ReactNode;
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

/**
 * DropdownLabel - Label para agrupar itens no menu
 */
export const DropdownLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownLabelProps
>(({ children, className = '', ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={`${styles.label} ${className}`}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Label>
  );
});

DropdownLabel.displayName = 'DropdownLabel';

/**
 * Props para o DropdownSeparator
 */
export interface DropdownSeparatorProps {
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

/**
 * DropdownSeparator - Separador visual entre grupos de itens
 */
export const DropdownSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownSeparatorProps
>(({ className = '', ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={`${styles.separator} ${className}`}
      {...props}
    />
  );
});

DropdownSeparator.displayName = 'DropdownSeparator';

/**
 * Props para o DropdownCheckboxItem
 */
export interface DropdownCheckboxItemProps {
  /**
   * Conteúdo do item
   */
  children: React.ReactNode;
  /**
   * Estado checked do checkbox
   */
  checked?: boolean;
  /**
   * Callback quando o estado muda
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Se o item está desabilitado
   */
  disabled?: boolean;
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

/**
 * DropdownCheckboxItem - Item com checkbox para seleção múltipla
 */
export const DropdownCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownCheckboxItemProps
>(
  (
    { children, checked, onCheckedChange, disabled, className = '', ...props },
    ref
  ) => {
    return (
      <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        className={`${styles.checkboxItem} ${className}`}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        {...props}
      >
        <DropdownMenuPrimitive.ItemIndicator className={styles.itemIndicator}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3333 4L6 11.3333L2.66667 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </DropdownMenuPrimitive.ItemIndicator>
        {children}
      </DropdownMenuPrimitive.CheckboxItem>
    );
  }
);

DropdownCheckboxItem.displayName = 'DropdownCheckboxItem';

/**
 * Props para o DropdownGroup
 */
export interface DropdownGroupProps {
  /**
   * Itens do grupo
   */
  children: React.ReactNode;
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

/**
 * DropdownGroup - Agrupa itens relacionados
 */
export const DropdownGroup = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Group>,
  DropdownGroupProps
>(({ children, className = '', ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Group
      ref={ref}
      className={`${styles.group} ${className}`}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Group>
  );
});

DropdownGroup.displayName = 'DropdownGroup';
