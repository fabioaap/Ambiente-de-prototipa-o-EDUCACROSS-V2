import type { Metadata } from 'next';
import '@prototipo/tokens/tokens.css';
import '@prototipo/design-system/index.css';
import '@measured/puck/puck.css';
import './globals.css';

import { normalizeRootAttributes } from '@/lib/hydration/normalizeRootAttributes';
import { StudioRoot } from '@/components/StudioRoot';
import { AnalyticsProvider } from '@/lib/analytics/AnalyticsProvider';

export const metadata: Metadata = {
  title: 'Studio - EDUCACROSS Prototipação',
  description: 'Ambiente de prototipação visual com Puck',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootAttributes = normalizeRootAttributes();

  return (
    <html {...rootAttributes.attributes} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <StudioRoot>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </StudioRoot>
      </body>
    </html>
  );
}
