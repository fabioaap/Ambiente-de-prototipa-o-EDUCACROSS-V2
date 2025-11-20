'use client';

import { useState } from 'react';
import styles from './ExportImport.module.css';

interface ExportImportProps {
  onImportComplete?: () => void;
}

export function ExportImport({ onImportComplete }: ExportImportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/pages/export?format=json');

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const data = await response.json();

      // Criar blob e download
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pages-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setMessage({
        type: 'success',
        text: `Exported ${data.totalPages} pages successfully`,
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setMessage(null);

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      const response = await fetch('/api/pages/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, mode: importMode }),
      });

      if (!response.ok) {
        throw new Error('Import failed');
      }

      const result = await response.json();

      setMessage({
        type: 'success',
        text: result.message,
      });

      onImportComplete?.();
    } catch (error) {
      setMessage({
        type: 'error',
        text: `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setIsImporting(false);
      // Reset file input
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3>Export Pages</h3>
        <button
          onClick={handleExport}
          disabled={isExporting}
          className={styles.button}
          aria-label="Export all pages as JSON"
        >
          {isExporting ? 'Exporting...' : 'Download as JSON'}
        </button>
        <p className={styles.description}>
          Download all pages as a JSON file for backup or sharing.
        </p>
      </div>

      <div className={styles.section}>
        <h3>Import Pages</h3>
        <div className={styles.modeSelector}>
          <label>
            <input
              type="radio"
              value="merge"
              checked={importMode === 'merge'}
              onChange={(e) =>
                setImportMode(e.target.value as 'merge' | 'replace')
              }
              disabled={isImporting}
            />
            Merge (keep existing)
          </label>
          <label>
            <input
              type="radio"
              value="replace"
              checked={importMode === 'replace'}
              onChange={(e) =>
                setImportMode(e.target.value as 'merge' | 'replace')
              }
              disabled={isImporting}
            />
            Replace (delete all first)
          </label>
        </div>

        <label className={styles.fileInput}>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            disabled={isImporting}
            aria-label="Select JSON file to import"
          />
          <span className={styles.button}>
            {isImporting ? 'Importing...' : 'Choose File'}
          </span>
        </label>

        <p className={styles.description}>
          Upload a JSON file exported from another project.
        </p>
      </div>

      {message && (
        <div
          className={`${styles.message} ${styles[message.type]}`}
          role="alert"
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
