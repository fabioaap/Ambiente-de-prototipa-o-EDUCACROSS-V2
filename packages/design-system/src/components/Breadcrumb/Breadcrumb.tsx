'use client';

import React from 'react';
import './Breadcrumb.css';

/**
 * Props para o componente Breadcrumb
 * @param {Array} items - Array de itens de navegação hierárquica
 * @param {React.ReactNode} [separator] - Separador customizado entre itens (padrão: '/')
 */
export interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
    icon?: React.ReactNode;
  }>;
  separator?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator = '/' }, ref) => {
    return (
      <nav className={"Breadcrumb_breadcrumb"} aria-label="Breadcrumb" ref={ref}>
        <ol className={"Breadcrumb_list"}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className={"Breadcrumb_item"}>
                {item.href && !isLast ? (
                  <a href={item.href} className={"Breadcrumb_link"}>
                    {item.icon && (
                      <span className={"Breadcrumb_icon"}>{item.icon}</span>
                    )}
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <span
                    className={`${"Breadcrumb_text"} ${isLast ? "Breadcrumb_current" : ''}`}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.icon && (
                      <span className={"Breadcrumb_icon"}>{item.icon}</span>
                    )}
                    <span>{item.label}</span>
                  </span>
                )}
                {!isLast && (
                  <span className={"Breadcrumb_separator"} aria-hidden="true">
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';
