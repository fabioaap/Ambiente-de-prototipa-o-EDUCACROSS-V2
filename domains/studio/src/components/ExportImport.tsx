'use client';

import { useState } from 'react';
import styles from './ExportImport.module.css';

interface ExportImportProps {
  onImportComplete?: () => void;
}

type ExportFormat = 'csv' | 'json' | 'xml';

export function ExportImport({ onImportComplete }: ExportImportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('json');
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/dashboard/pages/export?format=${exportFormat}`);

      if (!response.ok) {
        throw new Error('Export failed');
      }

      // Get filename from Content-Disposition header or generate
      const contentDisposition = response.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch?.[1] || `pages-export.${exportFormat}`;

      // Download file
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setMessage({
        type: 'success',
        text: `Exported pages successfully as ${exportFormat.toUpperCase()}`,
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
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/dashboard/pages/import', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Import failed');
      }

      const result = await response.json();

      setMessage({
        type: 'success',
        text: result.message || `Successfully imported ${result.imported} pages`,
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
        <div className={styles.exportControls}>
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
            disabled={isExporting}
            className={styles.formatSelector}
            aria-label="Export format selector"
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="xml">XML</option>
          </select>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={styles.button}
            aria-label={`Export all pages as ${exportFormat.toUpperCase()}`}
          >
            {isExporting ? 'Exporting...' : `Download as ${exportFormat.toUpperCase()}`}
          </button>
        </div>
        <p className={styles.description}>
          Download all pages as {exportFormat.toUpperCase()} file for backup or sharing.
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
