// components/ui/ThemeToggle.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@/components/ThemeContext';
import { gsap } from 'gsap';

export const ThemeToggle = () => {
  const { isDark, toggleTheme, themeLoaded } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize theme and animate the toggle button
  useEffect(() => {
    if (!themeLoaded) return;
    
    // Animate the toggle button based on theme
    if (isAnimating) return;
    
    setIsAnimating(true);
    gsap.to('.theme-toggle', {
      rotation: isDark ? 180 : 0,
      duration: 0.6,
      ease: "back.out(1.7)",
      onComplete: () => setIsAnimating(false)
    });
  }, [isDark, themeLoaded, isAnimating]);

  // Handle theme toggle
  const handleClick = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    toggleTheme();
    
    // Additional animation for the toggle
    gsap.to('.theme-toggle', {
      rotation: isDark ? 0 : 180,
      duration: 0.6,
      ease: "back.out(1.7)",
      onComplete: () => setIsAnimating(false)
    });
  }, [toggleTheme, isDark, isAnimating]);

  if (!themeLoaded) {
    return (
      <div className="w-16 h-8 flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="theme-toggle group relative flex items-center justify-center w-16 h-8 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 transform hover:scale-[1.05] active:scale-[0.95]"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Toggle track with gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-blue-500 dark:to-indigo-700 opacity-20 transition-opacity duration-300" />

      {/* Toggle ball */}
      <div
        className="absolute rounded-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-500 will-change-transform"
        style={{
          width: '1.75rem',
          height: '1.75rem',
          transform: `translateX(${isDark ? 'calc(100% - 1.75rem - 0.5rem)' : '0.25rem'})`,
          left: '0.25rem',
          top: '0.125rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.08)'
        }}
      >
        {/* Sun icon for light mode */}
        <svg
          className={`absolute inset-0 m-auto w-3 h-3 text-yellow-500 transition-opacity duration-300 ${
            isDark ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M12 17.314l.707.707m0-12.728l.707-.707M6.343 17.657l.707.707M17.657 6.343l.707-.707M6.343 6.343l-.707-.707m12.728 12.728l-.707.707"
          />
        </svg>

        {/* Moon icon for dark mode */}
        <svg
          className={`absolute inset-0 m-auto w-3 h-3 text-blue-300 transition-opacity duration-300 ${
            isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </div>

      {/* Ambient light effect */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
          transform: 'scale(1.5)',
          filter: 'blur(20px)'
        }}
      />
    </button>
  );
};