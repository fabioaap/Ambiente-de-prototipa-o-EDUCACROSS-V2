'use client';

import { Puck, Data } from '@measured/puck';
import { puckConfig } from '@/config/puck.config';
import { useState, useEffect, useCallback } from 'react';

const initialData: Data = {
  content: [
    {
      type: 'Layout',
      props: {
        maxWidth: 'xl',
        id: 'layout-1',
        children: [
          {
            type: 'Text',
            props: {
              id: 'text-1',
              content: 'Bem-vindo ao Studio',
              as: 'h1',
              size: '4xl',
              weight: 'bold',
              color: 'primary',
            },
          },
          {
            type: 'Text',
            props: {
              id: 'text-2',
              content: 'Comece a construir sua jornada arrastando componentes da barra lateral.',
              as: 'p',
              size: 'lg',
              weight: 'normal',
              color: 'muted',
            },
          },
        ],
      },
    },
  ],
  root: { props: { title: 'Nova Página' } },
  zones: {},
};

const DEFAULT_PAGE_SLUG = 'home';

export default function StudioPage() {
  const [data, setData] = useState<Data>(initialData);
  const [mounted, setMounted] = useState(false);
  const [currentSlug, setCurrentSlug] = useState<string>(DEFAULT_PAGE_SLUG);
  const [saving, setSaving] = useState(false);

  // Carregar página ao montar
  useEffect(() => {
    setMounted(true);
    loadPage(DEFAULT_PAGE_SLUG);
  }, []);

  const loadPage = async (slug: string) => {
    try {
      const response = await fetch(`/api/pages/${slug}`);
      if (response.ok) {
        const { data: pageData } = await response.json();
        setData(pageData);
        setCurrentSlug(slug);
      } else {
        // Página não existe, usar dados iniciais
        console.log(`Page ${slug} not found, using initial data`);
        setData(initialData);
        setCurrentSlug(slug);
      }
    } catch (error) {
      console.error('Error loading page:', error);
      // Fallback para localStorage se API falhar
      const saved = localStorage.getItem('puck-data');
      if (saved) {
        try {
          setData(JSON.parse(saved));
        } catch (e) {
          console.error('Error parsing localStorage data:', e);
        }
      }
    }
  };

  const savePage = useCallback(
    async (newData: Data) => {
      setData(newData);
      setSaving(true);

      try {
        // Tentar salvar na API
        const response = await fetch(`/api/pages/${currentSlug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: newData }),
        });

        if (response.status === 404) {
          // Página não existe, criar nova
          const createResponse = await fetch('/api/pages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: currentSlug, data: newData }),
          });

          if (!createResponse.ok) {
            throw new Error('Failed to create page');
          }
        } else if (!response.ok) {
          throw new Error('Failed to save page');
        }

        // Backup em localStorage
        localStorage.setItem('puck-data', JSON.stringify(newData));
      } catch (error) {
        console.error('Error saving page:', error);
        // Fallback para localStorage
        localStorage.setItem('puck-data', JSON.stringify(newData));
      } finally {
        setSaving(false);
      }
    },
    [currentSlug]
  );

  const handlePublish = useCallback(
    async (newData: Data) => {
      await savePage(newData);
      alert('Página publicada com sucesso!');
    },
    [savePage]
  );

  if (!mounted) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        Carregando editor...
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      {saving && (
        <div
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            background: '#4CAF50',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            zIndex: 9999,
            fontSize: '0.875rem',
          }}
        >
          Salvando...
        </div>
      )}
      <Puck
        config={puckConfig}
        data={data}
        onPublish={handlePublish}
        onChange={savePage}
      />
    </div>
  );
}
