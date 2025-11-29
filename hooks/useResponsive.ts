// hooks/useResponsive.ts
import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState('mobile');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });

      // Determine device type
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);

      // Determine breakpoint
      if (width < 640) {
        setCurrentBreakpoint('xs');
      } else if (width < 768) {
        setCurrentBreakpoint('sm');
      } else if (width < 1024) {
        setCurrentBreakpoint('md');
      } else if (width < 1280) {
        setCurrentBreakpoint('lg');
      } else if (width < 1536) {
        setCurrentBreakpoint('xl');
      } else {
        setCurrentBreakpoint('2xl');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    currentBreakpoint,
    // Breakpoint helpers
    isXs: currentBreakpoint === 'xs',
    isSm: currentBreakpoint === 'sm',
    isMd: currentBreakpoint === 'md',
    isLg: currentBreakpoint === 'lg',
    isXl: currentBreakpoint === 'xl',
    is2Xl: currentBreakpoint === '2xl',
  };
};