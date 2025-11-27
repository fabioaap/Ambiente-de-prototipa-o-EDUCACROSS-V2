'use client';

import { FlowBuilder } from '../../components/flow';
import styles from './flow.module.css';

/**
 * Página do Flow Builder
 * 
 * Interface visual drag-and-drop para criar e editar
 * fluxos de navegação entre páginas do sistema.
 */
export default function FlowPage() {
  return (
    <div className={styles.page}>
      <FlowBuilder />
    </div>
  );
}
