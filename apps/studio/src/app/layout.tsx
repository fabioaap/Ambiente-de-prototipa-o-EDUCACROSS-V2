import type { Metadata } from 'next';
import '@prototipo/tokens/tokens.css';
import '@measured/puck/puck.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Studio - EDUCACROSS Prototipação',
  description: 'Ambiente de prototipação visual com Puck',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
