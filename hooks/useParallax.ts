// hooks/useParallax.ts
import { useState, useEffect } from 'react';

export const useParallax = (speed: number = 0.5, element?: HTMLElement) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const newOffset = scrollPosition * speed;
      setOffset(newOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return { offset };
};