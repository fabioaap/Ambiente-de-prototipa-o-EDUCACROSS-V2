'use client';

import { useEffect, useState } from 'react';

const HIGH_CONTRAST_KEY = 'educacross-high-contrast';

export function useHighContrast() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    // Load preference from localStorage
    const stored = localStorage.getItem(HIGH_CONTRAST_KEY);
    if (stored === 'true') {
      setIsHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    }
  }, []);

  const toggleHighContrast = () => {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);
    
    if (newValue) {
      document.documentElement.classList.add('high-contrast');
      localStorage.setItem(HIGH_CONTRAST_KEY, 'true');
    } else {
      document.documentElement.classList.remove('high-contrast');
      localStorage.setItem(HIGH_CONTRAST_KEY, 'false');
    }
  };

  return { isHighContrast, toggleHighContrast };
}
