'use client';

import React, { useState } from 'react';
import './Sidebar.css';

export interface SidebarItemBase {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  active?: boolean;
}

export interface SidebarItemSimple extends SidebarItemBase {
  expandable?: false;
}

export interface SidebarItemExpandable extends SidebarItemBase {
  expandable: true;
  children?: SidebarItemSimple[];
}

export type SidebarItem = SidebarItemSimple | SidebarItemExpandable;

/**
 * Props para o componente Sidebar
 * @param {Array} items - Array de itens de navegação
 * @param {string} [activeItem] - ID do item ativo
 * @param {boolean} [collapsed] - Define se o sidebar está colapsado
 * @param {React.ReactNode} [logo] - Logo exibido no topo do sidebar
 * @param {(id: string) => void} [onItemClick] - Callback ao clicar em um item
 */
export interface SidebarProps {
  items: SidebarItem[];
  activeItem?: string;
  collapsed?: boolean;
  logo?: React.ReactNode;
  onItemClick?: (id: string, href?: string) => void;
  className?: string;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ items, activeItem, collapsed = false, logo, onItemClick, className = '' }, ref) => {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const handleItemClick = (
      e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
      itemId: string,
      href?: string,
      expandable?: boolean
    ) => {
      if (expandable) {
        e.preventDefault();
        setExpandedItems((prev) => {
          const next = new Set(prev);
          if (next.has(itemId)) {
            next.delete(itemId);
          } else {
            next.add(itemId);
          }
          return next;
        });
      } else if (onItemClick) {
        e.preventDefault();
        onItemClick(itemId, href);
      }
    };

    const renderItem = (item: SidebarItem, depth = 0) => {
      const isActive = item.active || item.id === activeItem;
      const isExpandable = 'expandable' in item && item.expandable;
      const isExpanded = expandedItems.has(item.id);
      const hasChildren = isExpandable && 'children' in item && item.children && item.children.length > 0;

      const itemClasses = [
        'Sidebar_link',
        isActive && 'Sidebar_active',
        depth > 0 && 'Sidebar_child',
      ]
        .filter(Boolean)
        .join(' ');

      const content = (
        <>
          {item.icon && <span className="Sidebar_icon">{item.icon}</span>}
          <span className="Sidebar_label">{item.label}</span>
          {isExpandable && (
            <svg
              className={`Sidebar_chevron ${isExpanded ? 'Sidebar_chevronExpanded' : ''}`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </>
      );

      return (
        <li key={item.id} className="Sidebar_item">
          {isExpandable ? (
            <button
              className={itemClasses}
              onClick={(e) => handleItemClick(e, item.id, item.href, true)}
              aria-expanded={isExpanded}
              aria-current={isActive ? 'page' : undefined}
            >
              {content}
            </button>
          ) : (
            <a
              href={item.href || '#'}
              className={itemClasses}
              onClick={(e) => handleItemClick(e, item.id, item.href)}
              aria-current={isActive ? 'page' : undefined}
            >
              {content}
            </a>
          )}
          {hasChildren && isExpanded && (
            <ul className="Sidebar_submenu">
              {(item as SidebarItemExpandable).children?.map((child) => renderItem(child, depth + 1))}
            </ul>
          )}
        </li>
      );
    };

    return (
      <aside
        className={`Sidebar_sidebar ${collapsed ? 'Sidebar_collapsed' : ''} ${className}`}
        ref={ref}
        aria-label="Menu de navegação"
      >
        {logo && <div className="Sidebar_logo">{logo}</div>}
        <nav className="Sidebar_nav">
          <ul className="Sidebar_list">{items.map((item) => renderItem(item))}</ul>
        </nav>
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';
