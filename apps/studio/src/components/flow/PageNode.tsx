'use client';

import React, { memo } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import styles from './PageNode.module.css';

/**
 * Dados customizados do nó de página
 */
export interface PageNodeData extends Record<string, unknown> {
  label: string;
  slug: string;
  domain: string;
  status: string;
  lastModified?: string;
}

/**
 * Tipo do nó de página
 */
export type PageNodeType = Node<PageNodeData, 'pageNode'>;

/**
 * Mapeia domínios para cores de indicador
 */
const domainColors: Record<string, string> = {
  BackOffice: '#8b5cf6',
  FrontOffice: '#3b82f6',
  Game: '#10b981',
};

/**
 * Mapeia status para estilos
 */
const statusStyles: Record<string, string> = {
  active: styles.statusActive,
  draft: styles.statusDraft,
  archived: styles.statusArchived,
};

/**
 * Componente de nó customizado para representar páginas no fluxo
 */
function PageNodeComponent({ data, selected }: NodeProps<PageNodeType>) {
  const domainColor = domainColors[data.domain] || '#6b7280';
  const statusClass = statusStyles[data.status] || styles.statusActive;

  return (
    <div
      className={`${styles.pageNode} ${selected ? styles.selected : ''}`}
      role="button"
      tabIndex={0}
      aria-label={`Página: ${data.label}`}
    >
      {/* Handle de entrada (topo) */}
      <Handle
        type="target"
        position={Position.Top}
        className={styles.handle}
        id="top"
      />

      {/* Indicador de domínio */}
      <div
        className={styles.domainIndicator}
        style={{ backgroundColor: domainColor }}
        title={`Domínio: ${data.domain}`}
      />

      {/* Conteúdo do nó */}
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.icon}>📄</span>
          <h3 className={styles.title}>{data.label}</h3>
        </div>

        <div className={styles.info}>
          <span className={styles.slug}>/{data.slug}</span>
          <span className={`${styles.status} ${statusClass}`}>
            {data.status}
          </span>
        </div>

        <div className={styles.domain}>
          <span
            className={styles.domainBadge}
            style={{ backgroundColor: `${domainColor}20`, color: domainColor }}
          >
            {data.domain}
          </span>
        </div>
      </div>

      {/* Handle de saída (baixo) */}
      <Handle
        type="source"
        position={Position.Bottom}
        className={styles.handle}
        id="bottom"
      />

      {/* Handles laterais para conexões horizontais */}
      <Handle
        type="source"
        position={Position.Right}
        className={styles.handle}
        id="right"
      />
      <Handle
        type="target"
        position={Position.Left}
        className={styles.handle}
        id="left"
      />
    </div>
  );
}

/**
 * Exportação memorizada para melhor performance
 */
export const PageNode = memo(PageNodeComponent);
PageNode.displayName = 'PageNode';
