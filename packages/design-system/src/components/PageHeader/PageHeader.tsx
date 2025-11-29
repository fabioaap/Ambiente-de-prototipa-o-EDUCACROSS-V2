'use client';

import React from 'react';
import './PageHeader.css';

/**
 * Props para o componente PageHeader
 * @param {string} title - Título principal da página
 * @param {number} [count] - Contador opcional exibido como badge
 * @param {string} [subtitle] - Subtítulo descritivo
 * @param {React.ReactNode} [actions] - Slot para botões de ação no canto superior direito
 */
export interface PageHeaderProps {
  title: string;
  count?: number;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, count, subtitle, actions }, ref) => {
    return (
      <div className={"PageHeader_header"} ref={ref}>
        <div className={"PageHeader_content"}>
          <div className={"PageHeader_titleWrapper"}>
            <h1 className={"PageHeader_title"}>
              {title}
              {count !== undefined && (
                <span className={"PageHeader_count"}>{count}</span>
              )}
            </h1>
            {subtitle && <p className={"PageHeader_subtitle"}>{subtitle}</p>}
          </div>
          {actions && <div className={"PageHeader_actions"}>{actions}</div>}
        </div>
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';
