'use client';

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  BackgroundVariant,
  ConnectionMode,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { PageNode, type PageNodeData } from './PageNode';
import { FlowSidebar } from './FlowSidebar';
import {
  saveFlow,
  loadFlow,
  clearFlow,
  fetchPages,
  pagesToNodes,
  generateNodeId,
  exportFlowAsJson,
  importFlowFromJson,
} from '../../lib/flow-storage';
import styles from './FlowBuilder.module.css';

/**
 * Tipos de nós customizados registrados
 */
const nodeTypes: NodeTypes = {
  pageNode: PageNode,
};

/**
 * Estilo padrão para novas edges
 */
const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: '#3b82f6' },
  type: 'smoothstep',
  animated: true,
};

/**
 * Props do componente FlowBuilder
 */
export interface FlowBuilderProps {
  /** Classe CSS adicional */
  className?: string;
}

/**
 * Componente principal do Flow Builder
 * Permite visualizar e editar fluxos de navegação entre páginas
 */
export function FlowBuilder({ className = '' }: FlowBuilderProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<PageNodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [loading, setLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  /**
   * Carrega o fluxo ao montar o componente
   */
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // Tenta carregar fluxo salvo
        const savedFlow = loadFlow();
        
        if (savedFlow && savedFlow.nodes.length > 0) {
          setNodes(savedFlow.nodes as Node<PageNodeData>[]);
          setEdges(savedFlow.edges);
          setLastSaved(savedFlow.lastModified);
        } else {
          // Se não há fluxo salvo, carrega páginas existentes
          const pages = await fetchPages();
          if (pages.length > 0) {
            const pageNodes = pagesToNodes(pages) as Node<PageNodeData>[];
            setNodes(pageNodes);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [setNodes, setEdges]);

  /**
   * Salva o fluxo automaticamente quando há mudanças
   */
  useEffect(() => {
    if (!loading && (nodes.length > 0 || edges.length > 0)) {
      const timeoutId = setTimeout(() => {
        saveFlow(nodes, edges);
        setLastSaved(new Date().toISOString());
      }, 500); // Debounce de 500ms

      return () => clearTimeout(timeoutId);
    }
  }, [nodes, edges, loading]);

  /**
   * Callback para conectar nós
   */
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, ...defaultEdgeOptions }, eds));
    },
    [setEdges]
  );

  /**
   * Adiciona uma nova página ao fluxo
   */
  const handleAddPage = useCallback(
    (name: string) => {
      const slug = name.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      const newNode: Node<PageNodeData> = {
        id: generateNodeId(),
        type: 'pageNode',
        position: {
          x: Math.random() * 400 + 100,
          y: Math.random() * 300 + 100,
        },
        data: {
          label: name,
          slug,
          domain: 'FrontOffice',
          status: 'draft',
        },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  /**
   * Limpa todo o fluxo
   */
  const handleClearFlow = useCallback(() => {
    setNodes([]);
    setEdges([]);
    clearFlow();
    setLastSaved(null);
  }, [setNodes, setEdges]);

  /**
   * Exporta o fluxo como JSON
   */
  const handleExportFlow = useCallback(() => {
    exportFlowAsJson(nodes, edges);
  }, [nodes, edges]);

  /**
   * Importa fluxo de arquivo JSON
   */
  const handleImportFlow = useCallback(
    async (file: File) => {
      try {
        const flowData = await importFlowFromJson(file);
        if (flowData) {
          setNodes(flowData.nodes as Node<PageNodeData>[]);
          setEdges(flowData.edges);
          setLastSaved(new Date().toISOString());
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Erro ao importar fluxo');
      }
    },
    [setNodes, setEdges]
  );

  /**
   * Sincroniza com páginas existentes
   */
  const handleSyncPages = useCallback(async () => {
    setLoading(true);
    try {
      const pages = await fetchPages();
      const existingIds = nodes.map((n) => n.data.slug);
      
      // Adiciona apenas páginas que ainda não estão no fluxo
      const newPages = pages.filter((p) => !existingIds.includes(p.slug));
      if (newPages.length > 0) {
        const newNodes = pagesToNodes(newPages) as Node<PageNodeData>[];
        // Posiciona novos nós à direita dos existentes
        const maxX = Math.max(...nodes.map((n) => n.position.x), 0);
        newNodes.forEach((node, i) => {
          node.position.x = maxX + 350 + (i % 3) * 300;
          node.position.y = 100 + Math.floor(i / 3) * 200;
        });
        setNodes((nds) => [...nds, ...newNodes]);
      } else {
        alert('Todas as páginas já estão no fluxo!');
      }
    } catch (error) {
      console.error('Erro ao sincronizar páginas:', error);
      alert('Erro ao sincronizar páginas');
    } finally {
      setLoading(false);
    }
  }, [nodes, setNodes]);

  /**
   * Cores do minimap baseadas no domínio
   */
  const nodeColor = useCallback((node: Node) => {
    const domain = (node.data as PageNodeData)?.domain;
    switch (domain) {
      case 'BackOffice':
        return '#8b5cf6';
      case 'Game':
        return '#10b981';
      case 'FrontOffice':
      default:
        return '#3b82f6';
    }
  }, []);

  /**
   * Formata a data do último salvamento
   */
  const formattedLastSaved = useMemo(() => {
    if (!lastSaved) return null;
    return new Date(lastSaved).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [lastSaved]);

  if (loading) {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.loading}>
          <span className={styles.spinner}></span>
          <p>Carregando Flow Builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <FlowSidebar
        onAddPage={handleAddPage}
        onClearFlow={handleClearFlow}
        onExportFlow={handleExportFlow}
        onImportFlow={handleImportFlow}
        onSyncPages={handleSyncPages}
        loading={loading}
        nodeCount={nodes.length}
        edgeCount={edges.length}
      />

      <div className={styles.canvas}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionMode={ConnectionMode.Loose}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.1}
          maxZoom={2}
          attributionPosition="bottom-left"
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#d1d5db"
          />
          <Controls
            showZoom
            showFitView
            showInteractive
            position="bottom-right"
          />
          <MiniMap
            nodeColor={nodeColor}
            nodeStrokeWidth={3}
            zoomable
            pannable
            position="top-right"
          />

          {/* Painel de status */}
          <Panel position="top-left" className={styles.statusPanel}>
            {lastSaved && (
              <span className={styles.savedIndicator}>
                ✓ Salvo às {formattedLastSaved}
              </span>
            )}
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

export default FlowBuilder;
