// components/accessibility/AccessibilityProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { accessibilityManager } from '@/lib/accessibility/accessibilityManager';

type AccessibilityContextType = {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: number;
  toggleReducedMotion: () => void;
  toggleHighContrast: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  setFontSize: (size: number) => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSizeState] = useState(16);

  useEffect(() => {
    accessibilityManager.init();
    
    // Set initial states based on system preferences
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setHighContrast(window.matchMedia('(prefers-contrast: high)').matches);
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleReducedMotionChange);
    contrastQuery.addEventListener('change', handleHighContrastChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
      contrastQuery.removeEventListener('change', handleHighContrastChange);
    };
  }, []);

  const toggleReducedMotion = () => {
    const newReducedMotion = !reducedMotion;
    setReducedMotion(newReducedMotion);
    
    if (newReducedMotion) {
      document.documentElement.classList.add('reduce-motion');
      // Disable animations globally
      const style = document.createElement('style');
      style.id = 'reduced-motion-style';
      style.innerHTML = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      document.documentElement.classList.remove('reduce-motion');
      const existingStyle = document.getElementById('reduced-motion-style');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    }
  };

  const toggleHighContrast = () => {
    const newHighContrast = !highContrast;
    setHighContrast(newHighContrast);
    
    if (newHighContrast) {
      document.documentElement.classList.add('high-contrast');
      document.documentElement.style.setProperty('--hc-primary', '#000000');
      document.documentElement.style.setProperty('--hc-background', '#ffffff');
      document.documentElement.style.setProperty('--hc-text', '#000000');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 2, 24);
    setFontSizeState(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 2, 14);
    setFontSizeState(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  const setFontSize = (size: number) => {
    const clampedSize = Math.max(14, Math.min(24, size));
    setFontSizeState(clampedSize);
    document.documentElement.style.fontSize = `${clampedSize}px`;
  };

  const value = {
    reducedMotion,
    highContrast,
    fontSize,
    toggleReducedMotion,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    setFontSize,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}