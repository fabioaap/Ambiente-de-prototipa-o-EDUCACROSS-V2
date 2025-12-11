'use client';

import React from 'react';
import { FrontOfficeSidebar } from '../FrontOfficeSidebar';
import styles from './FrontOfficeLayout.module.css';

interface FrontOfficeLayoutProps {
    children: React.ReactNode;
    activeRoute?: string;
    className?: string;
}

/**
 * Layout padrão para todas as páginas do Front Office
 * Inclui a sidebar fixa com menu de navegação
 * 
 * @example
 * ```tsx
 * <FrontOfficeLayout activeRoute="/frontoffice/painel-inicial">
 *   <h1>Conteúdo da página</h1>
 * </FrontOfficeLayout>
 * ```
 */
export const FrontOfficeLayout = React.forwardRef<
    HTMLDivElement,
    FrontOfficeLayoutProps
>(({ children, activeRoute, className }, ref) => {
    return (
        <div ref={ref} className={`${styles.layout} ${className || ''}`}>
            <FrontOfficeSidebar activeRoute={activeRoute} />
            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
});

FrontOfficeLayout.displayName = 'FrontOfficeLayout';
