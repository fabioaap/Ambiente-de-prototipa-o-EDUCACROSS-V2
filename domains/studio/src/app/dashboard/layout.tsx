import { StudioLayout } from '@/components/StudioLayout';

/**
 * Layout wrapper para a rota /dashboard
 * Inclui a sidebar de navegação do Studio
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudioLayout>{children}</StudioLayout>;
}
