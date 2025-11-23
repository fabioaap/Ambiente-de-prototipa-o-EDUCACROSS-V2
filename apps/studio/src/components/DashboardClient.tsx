'use client';

import React, { useState } from 'react';
import { PageCard } from '@/components/PageCard';
import type { PageMetadata } from '@/types/page';
import { Text, Layout } from '@prototipo/design-system';

interface DashboardClientProps {
  initialPages: PageMetadata[];
}

type DomainFilter = 'Todos' | 'BackOffice' | 'FrontOffice' | 'Game' | 'Geral';

export function DashboardClient({ initialPages }: DashboardClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('Todos');

  const filteredPages = initialPages.filter((page) => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = domainFilter === 'Todos' || page.domain === domainFilter;
    return matchesSearch && matchesDomain;
  });

  const domains: DomainFilter[] = ['Todos', 'BackOffice', 'FrontOffice', 'Game', 'Geral'];

  return (
    <Layout maxWidth="2xl">
      <div style={{ padding: '24px 16px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <Text as="h1" size="4xl" weight="bold" color="primary">
            Dashboard
          </Text>
          <Text as="p" size="base" weight="normal" color="muted">
            Gerencie seus protótipos de páginas
          </Text>
        </div>

        {/* Filtros e busca */}
        <div style={{ marginBottom: '24px' }}>
          {/* Barra de busca */}
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Buscar por título ou slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '1px solid var(--color-neutral-300)',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
              }}
            />
          </div>

          {/* Filtros de domínio */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setDomainFilter(domain)}
                style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: domainFilter === domain 
                    ? '2px solid var(--color-primary)' 
                    : '1px solid var(--color-neutral-300)',
                  borderRadius: '8px',
                  backgroundColor: domainFilter === domain 
                    ? 'var(--color-primary-50)' 
                    : 'white',
                  color: domainFilter === domain 
                    ? 'var(--color-primary)' 
                    : 'var(--color-neutral-700)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Contador de resultados */}
        <div style={{ marginBottom: '16px' }}>
          <Text as="p" size="sm" weight="normal" color="muted">
            {filteredPages.length} {filteredPages.length === 1 ? 'página encontrada' : 'páginas encontradas'}
          </Text>
        </div>

        {/* Lista de páginas */}
        {filteredPages.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '64px 16px',
            backgroundColor: 'var(--color-neutral-50)',
            borderRadius: '8px',
            border: '1px dashed var(--color-neutral-300)',
          }}>
            <Text as="h2" size="xl" weight="semibold" color="muted">
              Nenhuma página encontrada
            </Text>
            <Text as="p" size="base" weight="normal" color="muted">
              {searchTerm || domainFilter !== 'Todos' 
                ? 'Tente ajustar os filtros de busca.' 
                : 'Crie sua primeira página no Studio.'}
            </Text>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px',
          }}>
            {filteredPages.map((page) => (
              <PageCard key={page.slug} page={page} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
