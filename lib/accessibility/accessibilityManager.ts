// lib/accessibility/accessibilityManager.ts
import { useEffect } from 'react';

class AccessibilityManager {
  private reducedMotion: boolean;
  private highContrast: boolean;
  private fontSize: number;

  constructor() {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.highContrast = false; // Will be determined via CSS or user preference
    this.fontSize = 16; // Default font size in pixels
  }

  init() {
    // Listen for reduced motion preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
      this.applyReducedMotion();
    });

    // Listen for high contrast preference changes (if supported)
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      this.highContrast = true;
      this.applyHighContrast();
    }

    window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
      this.highContrast = e.matches;
      this.applyHighContrast();
    });
  }

  applyReducedMotion() {
    if (this.reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
      // Disable animations globally
      const style = document.createElement('style');
      style.innerHTML = `
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }

  applyHighContrast() {
    if (this.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }

  setFontSize(size: number) {
    this.fontSize = Math.max(14, Math.min(24, size)); // Limit between 14px and 24px
    document.documentElement.style.fontSize = `${this.fontSize}px`;
  }

  increaseFontSize() {
    this.setFontSize(this.fontSize + 2);
  }

  decreaseFontSize() {
    this.setFontSize(this.fontSize - 2);
  }
}

export const accessibilityManager = new AccessibilityManager();