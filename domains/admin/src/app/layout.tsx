import type { Metadata } from 'next';
import './globals.css';
import ThemeProviderClient from '@/components/theme/ThemeProviderClient';

export const metadata: Metadata = {
    title: 'EDUCACROSS Admin',
    description: 'Página principal - acesso completo ao projeto',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body>
                <ThemeProviderClient>{children}</ThemeProviderClient>
            </body>
        </html>
    );
}
