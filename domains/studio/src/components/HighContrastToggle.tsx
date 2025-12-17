'use client';

import { useHighContrast } from '@/lib/hooks/useHighContrast';
import { Button } from '@prototipo/design-system';
import { Contrast } from 'lucide-react';

export function HighContrastToggle() {
  const { isHighContrast, toggleHighContrast } = useHighContrast();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleHighContrast}
      aria-label={isHighContrast ? 'Disable high contrast' : 'Enable high contrast'}
      aria-pressed={isHighContrast}
      title={isHighContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
    >
      <Contrast className="h-5 w-5" />
      {isHighContrast && <span className="ml-2">Alto Contraste</span>}
    </Button>
  );
}
