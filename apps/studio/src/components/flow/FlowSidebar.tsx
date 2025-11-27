'use client';

import React, { useState, useRef, type ChangeEvent } from 'react';
import Link from 'next/link';
import styles from './FlowSidebar.module.css';

/**
 * Props do componente FlowSidebar
 */
export interface FlowSidebarProps {
  /** Callback para adicionar nova página ao fluxo */
  onAddPage: (name: string) => void;
  /** Callback para limpar o fluxo */
  onClearFlow: () => void;
  /** Callback para exportar o fluxo */
  onExportFlow: () => void;
  /** Callback para importar fluxo de arquivo */
  onImportFlow: (file: File) => void;
  /** Callback para sincronizar com páginas existentes */
  onSyncPages: () => void;
  /** Indica se está carregando */
  loading?: boolean;
  /** Contagem de nós no fluxo */
  nodeCount: number;
  /** Contagem de conexões no fluxo */
  edgeCount: number;
}

/**
 * Sidebar do Flow Builder para adicionar nós e controlar o fluxo
 */
export function FlowSidebar({
  onAddPage,
  onClearFlow,
  onExportFlow,
  onImportFlow,
  onSyncPages,
  loading = false,
  nodeCount,
  edgeCount,
}: FlowSidebarProps) {
  const [newPageName, setNewPageName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddPage = () => {
    const trimmedName = newPageName.trim();
    if (!trimmedName) {
      return;
    }
    onAddPage(trimmedName);
    setNewPageName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPage();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportFlow(file);
      // Limpar input para permitir reimportação do mesmo arquivo
      e.target.value = '';
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o fluxo? Esta ação não pode ser desfeita.')) {
      onClearFlow();
    }
  };

  return (
    <aside className={styles.sidebar} aria-label="Controles do Flow Builder">
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.icon}>🔀</span>
          Flow Builder
        </h2>
        <p className={styles.subtitle}>
          Crie fluxos de navegação entre páginas
        </p>
      </div>

      {/* Estatísticas */}
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Páginas</span>
          <span className={styles.statValue}>{nodeCount}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Conexões</span>
          <span className={styles.statValue}>{edgeCount}</span>
        </div>
      </div>

      {/* Adicionar nova página */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Adicionar Página</h3>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={newPageName}
            onChange={(e) => setNewPageName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="nome-da-pagina"
            className={styles.input}
            aria-label="Nome da nova página"
            disabled={loading}
          />
          <button
            onClick={handleAddPage}
            className={styles.addButton}
            disabled={loading || !newPageName.trim()}
            title="Adicionar página (Enter)"
            aria-label="Adicionar página"
          >
            +
          </button>
        </div>
        <p className={styles.hint}>
          Arraste o nó para posicioná-lo no canvas
        </p>
      </div>

      {/* Ações do fluxo */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Ações</h3>
        <div className={styles.actions}>
          <button
            onClick={onSyncPages}
            className={`${styles.actionButton} ${styles.syncButton}`}
            disabled={loading}
            title="Sincronizar com páginas existentes"
          >
            <span className={styles.buttonIcon}>🔄</span>
            Sincronizar Páginas
          </button>

          <button
            onClick={onExportFlow}
            className={`${styles.actionButton} ${styles.exportButton}`}
            disabled={loading || nodeCount === 0}
            title="Exportar fluxo como JSON"
          >
            <span className={styles.buttonIcon}>📤</span>
            Exportar
          </button>

          <button
            onClick={handleImportClick}
            className={`${styles.actionButton} ${styles.importButton}`}
            disabled={loading}
            title="Importar fluxo de arquivo JSON"
          >
            <span className={styles.buttonIcon}>📥</span>
            Importar
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className={styles.fileInput}
            aria-label="Selecionar arquivo de fluxo"
          />

          <button
            onClick={handleClear}
            className={`${styles.actionButton} ${styles.clearButton}`}
            disabled={loading || nodeCount === 0}
            title="Limpar todo o fluxo"
          >
            <span className={styles.buttonIcon}>🗑️</span>
            Limpar Fluxo
          </button>
        </div>
      </div>

      {/* Dicas */}
      <div className={styles.tips}>
        <h3 className={styles.sectionTitle}>💡 Dicas</h3>
        <ul className={styles.tipsList}>
          <li>Arraste entre handles para criar conexões</li>
          <li>Clique em um nó para selecioná-lo</li>
          <li>Use a roda do mouse para zoom</li>
          <li>Arraste o canvas para navegar</li>
          <li>O fluxo é salvo automaticamente</li>
        </ul>
      </div>

      {/* Links */}
      <div className={styles.links}>
        <Link href="/studio" className={styles.link}>
          ← Voltar ao Studio
        </Link>
      </div>
    </aside>
  );
}

export default FlowSidebar;
