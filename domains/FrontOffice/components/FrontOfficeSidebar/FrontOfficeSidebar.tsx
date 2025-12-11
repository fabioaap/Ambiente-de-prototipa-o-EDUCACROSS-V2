'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './FrontOfficeSidebar.module.css';

interface MenuItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    href: string;
    hasArrow?: boolean;
}

export interface FrontOfficeSidebarProps {
    activeRoute?: string;
    className?: string;
}

const menuItems: MenuItem[] = [
    {
        id: 'relatorios',
        label: 'Relatórios Gerais',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="7" height="7" fill="#4CAF50" />
                <rect x="11" y="2" width="7" height="7" fill="#2196F3" />
                <rect x="2" y="11" width="7" height="7" fill="#FFC107" />
                <rect x="11" y="11" width="7" height="7" fill="#F44336" />
            </svg>
        ),
        href: '/frontoffice/relatorios',
        hasArrow: true,
    },
    {
        id: 'missoes',
        label: 'Missões da Escola',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 18H17L10 2Z" fill="#E91E63" />
            </svg>
        ),
        href: '/frontoffice/missoes',
        hasArrow: true,
    },
    {
        id: 'sistema-ensino',
        label: 'Sistema de Ensino',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="4" y="3" width="12" height="14" rx="1" fill="#4CAF50" />
                <rect x="6" y="6" width="8" height="1" fill="white" />
                <rect x="6" y="9" width="8" height="1" fill="white" />
                <rect x="6" y="12" width="8" height="1" fill="white" />
            </svg>
        ),
        href: '/frontoffice/sistema-ensino',
    },
    {
        id: 'eventos',
        label: 'Eventos',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="4" width="14" height="13" rx="1" fill="#9C27B0" />
                <rect x="6" y="2" width="2" height="3" fill="#9C27B0" />
                <rect x="12" y="2" width="2" height="3" fill="#9C27B0" />
            </svg>
        ),
        href: '/frontoffice/eventos',
    },
    {
        id: 'expedicao-leitura',
        label: 'Expedição Leitura',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="5" y="2" width="10" height="16" rx="1" fill="#2196F3" />
                <rect x="7" y="5" width="6" height="1" fill="white" />
                <rect x="7" y="8" width="6" height="1" fill="white" />
                <rect x="7" y="11" width="6" height="1" fill="white" />
            </svg>
        ),
        href: '/frontoffice/expedicao-leitura',
    },
    {
        id: 'cadastros',
        label: 'Cadastros',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="6" r="3" fill="#9C27B0" />
                <circle cx="6" cy="14" r="2" fill="#9C27B0" />
                <circle cx="14" cy="14" r="2" fill="#9C27B0" />
            </svg>
        ),
        href: '/frontoffice/cadastros',
        hasArrow: true,
    },
    {
        id: 'ajudas',
        label: 'Ajudas e Materiais',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3V13M10 13L6 9M10 13L14 9" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" />
                <rect x="4" y="15" width="12" height="2" fill="#2196F3" />
            </svg>
        ),
        href: '/frontoffice/ajudas',
    },
];

export const FrontOfficeSidebar = React.forwardRef<
    HTMLElement,
    FrontOfficeSidebarProps
>(({ activeRoute, className }, ref) => {
    const router = useRouter();

    const handleItemClick = (href: string) => {
        router.push(href);
    };

    return (
        <aside ref={ref} className={`${styles.sidebar} ${className || ''}`}>
            {/* Header */}
            <div className={styles.header}>
                <span className={styles.headerIcon}>⊞</span>
                <h1 className={styles.headerTitle}>Painel Inicial</h1>
            </div>

            {/* Menu Items */}
            <nav className={styles.nav}>
                {menuItems.map((item) => {
                    const isActive = activeRoute === item.href;

                    return (
                        <button
                            key={item.id}
                            className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
                            onClick={() => handleItemClick(item.href)}
                            type="button"
                        >
                            <span className={styles.menuIcon}>{item.icon}</span>
                            <span className={styles.menuLabel}>{item.label}</span>
                            {item.hasArrow && (
                                <span className={styles.menuArrow}>›</span>
                            )}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
});

FrontOfficeSidebar.displayName = 'FrontOfficeSidebar';
