'use client';

import React from 'react';
import { Card, Text } from '@prototipo/design-system';
import type { PageMetadata } from '@/types/page';
import Link from 'next/link';

interface PageCardProps {
  page: PageMetadata;
}

const STATUS_LABELS = {
  draft: 'Rascunho',
  published: 'Publicado',
} as const;

export function PageCard({ page }: PageCardProps) {
  const formattedDate = new Date(page.lastModified).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card variant="bordered" padding="md">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <Text as="h3" size="lg" weight="semibold" color="default">
              {page.title}
            </Text>
            <Text as="p" size="sm" weight="normal" color="muted">
              {page.slug}
            </Text>
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'flex-end'
          }}>
            <span style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 500,
              backgroundColor: 'var(--color-neutral-100)',
              color: 'var(--color-neutral-700)',
            }}>
              {page.domain}
            </span>
            <span style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 500,
              backgroundColor: page.status === 'published' 
                ? 'var(--color-success-100)' 
                : 'var(--color-warning-100)',
              color: page.status === 'published' 
                ? 'var(--color-success-700)' 
                : 'var(--color-warning-700)',
            }}>
              {STATUS_LABELS[page.status]}
            </span>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text as="p" size="xs" weight="normal" color="muted">
            Última modificação: {formattedDate}
          </Text>
          <Link href={`/studio/${page.slug}`} passHref legacyBehavior>
            <a style={{ textDecoration: 'none' }}>
              <button
                style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-600)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                }}
              >
                Editar
              </button>
            </a>
          </Link>
        </div>
      </div>
    </Card>
  );
}
