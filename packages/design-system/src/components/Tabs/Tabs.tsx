'use client';

import React, { useState } from 'react';
import styles from './Tabs.module.css';

/**
 * Props para o componente Tabs
 * @param {Array} tabs - Array de abas com conteúdo
 * @param {string} [defaultValue] - ID da aba ativa por padrão (modo não controlado)
 * @param {string} [value] - ID da aba ativa (modo controlado)
 * @param {(id: string) => void} [onChange] - Callback disparado ao trocar de aba
 * @param {'line' | 'enclosed'} [variant] - Estilo visual das abas
 */
export interface TabsProps {
  tabs: Array<{
    id: string;
    label: string;
    badge?: string | number;
    content?: React.ReactNode;
  }>;
  defaultValue?: string;
  value?: string;
  onChange?: (id: string) => void;
  variant?: 'line' | 'enclosed';
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ tabs, defaultValue, value, onChange, variant = 'line' }, ref) => {
    const [internalValue, setInternalValue] = useState(
      defaultValue || tabs[0]?.id
    );
    
    const activeTab = value !== undefined ? value : internalValue;
    const isControlled = value !== undefined;

    const handleTabClick = (tabId: string) => {
      if (!isControlled) {
        setInternalValue(tabId);
      }
      onChange?.(tabId);
    };

    const activeTabData = tabs.find((tab) => tab.id === activeTab);

    return (
      <div className={styles.container} ref={ref}>
        <div
          className={`${styles.tabList} ${styles[variant]}`}
          role="tablist"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                className={`${styles.tab} ${isActive ? styles.active : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <span className={styles.label}>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={styles.badge}>{tab.badge}</span>
                )}
              </button>
            );
          })}
        </div>
        {activeTabData?.content && (
          <div
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className={styles.panel}
          >
            {activeTabData.content}
          </div>
        )}
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';
