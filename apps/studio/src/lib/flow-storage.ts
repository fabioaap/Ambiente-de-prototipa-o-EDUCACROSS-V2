'use client';

import type { Node, Edge } from '@xyflow/react';

/**
 * Chave para armazenamento do fluxo no localStorage
 */
const FLOW_STORAGE_KEY = 'educacross_flow_data';

/**
 * Interface para dados do fluxo armazenados
 */
export interface FlowData {
  nodes: Node[];
  edges: Edge[];
  lastModified: string;
  version: string;
}

/**
 * Interface para informações de uma página
 */
export interface PageInfo {
  id: string;
  slug: string;
  title: string;
  domain: string;
  lastModified: string;
  status: string;
}

/**
 * Salva os dados do fluxo no localStorage
 */
export function saveFlow(nodes: Node[], edges: Edge[]): void {
  if (typeof window === 'undefined') return;

  const flowData: FlowData = {
    nodes,
    edges,
    lastModified: new Date().toISOString(),
    version: '1.0.0',
  };

  try {
    localStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(flowData));
  } catch (error) {
    console.error('Erro ao salvar fluxo:', error);
  }
}

/**
 * Carrega os dados do fluxo do localStorage
 */
export function loadFlow(): FlowData | null {
  if (typeof window === 'undefined') return null;

  try {
    const data = localStorage.getItem(FLOW_STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data) as FlowData;
  } catch (error) {
    console.error('Erro ao carregar fluxo:', error);
    return null;
  }
}

/**
 * Limpa os dados do fluxo do localStorage
 */
export function clearFlow(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(FLOW_STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar fluxo:', error);
  }
}

/**
 * Busca páginas existentes da API
 */
export async function fetchPages(): Promise<PageInfo[]> {
  try {
    const response = await fetch('/api/pages');
    if (!response.ok) {
      throw new Error('Falha ao carregar páginas');
    }
    const { pages } = await response.json();
    return pages || [];
  } catch (error) {
    console.error('Erro ao buscar páginas:', error);
    return [];
  }
}

/**
 * Converte páginas em nós do React Flow
 */
export function pagesToNodes(pages: PageInfo[]): Node[] {
  return pages.map((page, index) => ({
    id: page.id || page.slug,
    type: 'pageNode',
    position: {
      x: 100 + (index % 3) * 300,
      y: 100 + Math.floor(index / 3) * 200,
    },
    data: {
      label: page.title,
      slug: page.slug,
      domain: page.domain,
      status: page.status,
      lastModified: page.lastModified,
    },
  }));
}

/**
 * Gera um ID único para novos nós
 */
export function generateNodeId(): string {
  return `page-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Exporta o fluxo como JSON para download
 */
export function exportFlowAsJson(nodes: Node[], edges: Edge[]): void {
  const flowData: FlowData = {
    nodes,
    edges,
    lastModified: new Date().toISOString(),
    version: '1.0.0',
  };

  const blob = new Blob([JSON.stringify(flowData, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `flow-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Importa fluxo de um arquivo JSON
 */
export function importFlowFromJson(file: File): Promise<FlowData | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string) as FlowData;
        if (data.nodes && data.edges) {
          resolve(data);
        } else {
          reject(new Error('Formato de arquivo inválido'));
        }
      } catch {
        reject(new Error('Erro ao ler arquivo JSON'));
      }
    };
    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.readAsText(file);
  });
}
