'use client';

import { ReactNode, useState, Suspense } from 'react';
import { PagesList } from './PagesList';
import { HighContrastToggle } from './HighContrastToggle';
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
          <Suspense fallback={<div style={{ padding: '1rem', textAlign: 'center', color: '#6b7280' }}>Carregando...</div>}>
            <PagesList />
          </Suspense>
        </nav>

        <div className={styles.sidebarFooter}>
          <HighContrastToggle />
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
