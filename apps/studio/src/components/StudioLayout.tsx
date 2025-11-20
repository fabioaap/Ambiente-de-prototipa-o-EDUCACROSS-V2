'use client';

import { ReactNode, useState } from 'react';
import { PagesList } from './PagesList';
import styles from './StudioLayout.module.css';

interface StudioLayoutProps {
  children: ReactNode;
}

export function StudioLayout({ children }: StudioLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={styles.container}>
      {/* Mobile toggle button */}
      <button
        className={styles.mobileToggle}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        title={sidebarOpen ? 'Fechar barra lateral' : 'Abrir barra lateral'}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.sidebarTitle}>Studio</h1>
          <button
            className={styles.sidebarClose}
            onClick={() => setSidebarOpen(false)}
            title="Fechar barra lateral"
          >
            ✕
          </button>
        </div>

        <nav className={styles.sidebarContent}>
          <PagesList />
        </nav>

        <div className={styles.sidebarFooter}>
          <p className={styles.footerText}>
            <strong>Dica:</strong> Use a barra lateral para navegar entre páginas criadas.
          </p>
        </div>
      </aside>

      {/* Main content - Editor */}
      <main className={styles.main}>{children}</main>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
