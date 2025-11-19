'use client';

import { Puck, Data } from '@measured/puck';
import { puckConfig } from '@/config/puck.config';
import { useState, useEffect } from 'react';

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

export default function StudioPage() {
  const [data, setData] = useState<Data>(initialData);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Carregar dados salvos do localStorage
    const saved = localStorage.getItem('puck-data');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  const handleSave = (newData: Data) => {
    setData(newData);
    localStorage.setItem('puck-data', JSON.stringify(newData));
  };

  if (!mounted) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        Carregando editor...
      </div>
    );
  }

  return (
    <Puck
      config={puckConfig}
      data={data}
      onPublish={handleSave}
      onChange={handleSave}
    />
  );
}
