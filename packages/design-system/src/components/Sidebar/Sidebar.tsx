'use client';

import React from 'react';
import './Sidebar.css';

/**
 * Props para o componente Sidebar
 * @param {Array} items - Array de itens de navegação
 * @param {string} [activeItem] - ID do item ativo
 * @param {boolean} [collapsed] - Define se o sidebar está colapsado
 * @param {React.ReactNode} [logo] - Logo exibido no topo do sidebar
 * @param {(id: string) => void} [onItemClick] - Callback ao clicar em um item
 */
export interface SidebarProps {
  items: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    href: string;
    active?: boolean;
    badge?: string;
  }>;
  activeItem?: string;
  collapsed?: boolean;
  logo?: React.ReactNode;
  onItemClick?: (id: string) => void;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ items, activeItem, collapsed = false, logo, onItemClick }, ref) => {
    const handleItemClick = (
      e: React.MouseEvent<HTMLAnchorElement>,
      itemId: string
    ) => {
      if (onItemClick) {
        e.preventDefault();
        onItemClick(itemId);
      }
    };

    return (
      <aside
        className={`${"Sidebar_sidebar"} ${collapsed ? "Sidebar_collapsed" : ''}`}
        ref={ref}
      >
        {logo && <div className={"Sidebar_logo"}>{logo}</div>}
        <nav className={"Sidebar_nav"}>
          <ul className={"Sidebar_list"}>
            {items.map((item) => {
              const isActive = item.active || item.id === activeItem;
              return (
                <li key={item.id} className={"Sidebar_item"}>
                  <a
                    href={item.href}
                    className={`${"Sidebar_link"} ${isActive ? "Sidebar_active" : ''}`}
                    onClick={(e) => handleItemClick(e, item.id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.icon && (
                      <span className={"Sidebar_icon"}>{item.icon}</span>
                    )}
                    <span className={"Sidebar_label"}>{item.label}</span>
                    {item.badge && (
                      <span className={"Sidebar_badge"}>{item.badge}</span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';
