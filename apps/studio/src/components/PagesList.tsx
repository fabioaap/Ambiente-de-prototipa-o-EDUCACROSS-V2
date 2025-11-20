'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './PagesList.module.css';

interface PageInfo {
  slug: string;
  title: string;
  lastModified: string;
}

export function PagesList() {
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPageSlug, setNewPageSlug] = useState('');

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const response = await fetch('/api/pages');
      if (!response.ok) throw new Error('Failed to load pages');
      const { pages } = await response.json();
      setPages(pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const deletePage = async (slug: string) => {
    if (!confirm(`Tem certeza que deseja deletar "${slug}"?`)) return;

    try {
      const response = await fetch(`/api/pages/${slug}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete page');
      setPages(pages.filter((p) => p.slug !== slug));
    } catch (err) {
      alert('Erro ao deletar página: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const createNewPage = () => {
    if (!newPageSlug.trim()) {
      alert('Digite um nome para a página');
      return;
    }
    window.location.href = `/studio?page=${encodeURIComponent(newPageSlug)}`;
    setNewPageSlug('');
  };

  if (loading) return <div className={styles.loading}>Carregando páginas...</div>;

  return (
    <div className={styles.container}>
      <h2>📄 Minhas Páginas</h2>

      {/* Criar nova página */}
      <div className={styles.newPageForm}>
        <input
          type="text"
          placeholder="nome-da-página"
          value={newPageSlug}
          onChange={(e) => setNewPageSlug(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') createNewPage();
          }}
          className={styles.newPageInput}
        />
        <button onClick={createNewPage} className={styles.newPageBtn}>
          +
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}
      {pages.length === 0 ? (
        <p className={styles.empty}>Nenhuma página criada ainda.</p>
      ) : (
        <ul className={styles.list}>
          {pages.map((page) => (
            <li key={page.slug} className={styles.item}>
              <div className={styles.itemContent}>
                <Link href={`/studio?page=${page.slug}`} className={styles.itemTitle}>
                  {page.title}
                </Link>
                <span className={styles.itemSlug}>{page.slug}</span>
              </div>
              <button
                onClick={() => deletePage(page.slug)}
                className={styles.deleteBtn}
                title="Deletar página"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
