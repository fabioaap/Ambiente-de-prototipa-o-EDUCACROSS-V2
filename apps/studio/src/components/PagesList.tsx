'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './PagesList.module.css';

interface PageInfo {
  slug: string;
  title: string;
  lastModified: string;
}

export function PagesList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSlug = searchParams.get('page');

  const [pages, setPages] = useState<PageInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPageSlug, setNewPageSlug] = useState('');
  const [renamingSlug, setRenamingSlug] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

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
      if (currentSlug === slug) {
        router.push('/studio');
      }
    } catch (err) {
      alert('Erro ao deletar página: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const startRename = (slug: string) => {
    const page = pages.find((p) => p.slug === slug);
    if (page) {
      setRenamingSlug(slug);
      setRenameValue(page.slug);
    }
  };

  const finishRename = async () => {
    if (!renamingSlug || !renameValue.trim() || renameValue === renamingSlug) {
      setRenamingSlug(null);
      return;
    }

    try {
      // Nota: A API atual não suporta rename direto
      // Implementação seria: copiar dados, deletar antigo
      // Por enquanto, apenas mostrar aviso
      alert('Rename ainda não implementado na API. Será adicionado em breve.');
      setRenamingSlug(null);
    } catch (err) {
      alert('Erro ao renomear: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const createNewPage = () => {
    if (!newPageSlug.trim()) {
      alert('Digite um nome para a página');
      return;
    }
    router.push(`/studio?page=${encodeURIComponent(newPageSlug)}`);
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
            if (e.key === 'Escape') setNewPageSlug('');
          }}
          className={styles.newPageInput}
          aria-label="Nome da nova página"
        />
        <button
          onClick={createNewPage}
          className={styles.newPageBtn}
          title="Criar nova página (Enter)"
          aria-label="Criar página"
        >
          +
        </button>
      </div>

      {error && <div className={styles.error} role="alert">{error}</div>}
      {pages.length === 0 ? (
        <p className={styles.empty}>Nenhuma página criada ainda.</p>
      ) : (
        <ul className={styles.list} role="navigation" aria-label="Lista de páginas">
          {pages.map((page) => (
            <li
              key={page.slug}
              className={`${styles.item} ${currentSlug === page.slug ? styles.active : ''}`}
            >
              <div className={styles.itemContent}>
                <Link
                  href={`/studio?page=${page.slug}`}
                  className={styles.itemTitle}
                  title={`Abrir página: ${page.slug}`}
                >
                  {page.title}
                </Link>
                <span className={styles.itemSlug}>{page.slug}</span>
              </div>
              <div className={styles.itemActions}>
                <button
                  onClick={() => startRename(page.slug)}
                  className={styles.actionBtn}
                  title="Renomear página"
                  aria-label={`Renomear ${page.slug}`}
                >
                  ✎
                </button>
                <button
                  onClick={() => deletePage(page.slug)}
                  className={styles.deleteBtn}
                  title="Deletar página"
                  aria-label={`Deletar ${page.slug}`}
                >
                  ✕
                </button>
              </div>

              {renamingSlug === page.slug && (
                <div className={styles.renameForm}>
                  <input
                    type="text"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') finishRename();
                      if (e.key === 'Escape') setRenamingSlug(null);
                    }}
                    autoFocus
                    className={styles.renameInput}
                    aria-label="Novo nome da página"
                  />
                  <button
                    onClick={finishRename}
                    className={styles.renameBtn}
                    aria-label="Confirmar renomear"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => setRenamingSlug(null)}
                    className={styles.cancelBtn}
                    aria-label="Cancelar renomear"
                  >
                    ✕
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
