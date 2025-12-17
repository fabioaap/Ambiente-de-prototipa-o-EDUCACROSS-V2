'use client';

import { FrontOfficeSidebar } from '../../../../../FrontOffice/components/FrontOfficeSidebar';
import styles from './page.module.css';

/**
 * Página de teste da jornada: Painel Inicial Front Office
 * 
 * Rota: /frontoffice/painel-inicial
 * Design Figma: https://www.figma.com/design/5MQ9H24Zojzd8jcnHO61lK/?node-id=6482-6149
 */
export default function PainelInicialPage() {
    return (
        <div className={styles.container}>
            <FrontOfficeSidebar activeRoute="/frontoffice/painel-inicial" />
            <main className={styles.content}>
                <h2>Painel Inicial - Front Office</h2>
                <p>Conteúdo principal será adicionado aqui</p>
            </main>
        </div>
    );
}
