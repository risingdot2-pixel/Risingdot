// components/ui/MagneticCursor.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/components/ThemeContext';
import { gsap } from 'gsap';

export const MagneticCursor = () => {
  const { isDark } = useTheme();
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);

  // Setup cursor elements
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create cursor elements if they don't exist
    if (!cursorRef.current) {
      const cursor = document.createElement('div');
      cursor.id = 'advanced-cursor';
      cursor.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: ${isDark ? 'linear-gradient(135deg, #8B5CF6, #3B82F6)' : 'linear-gradient(135deg, #4F46E5, #2563EB)'};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate3d(-50%, -50%, 0);
        mix-blend-mode: difference;
        filter: drop-shadow(0 0 4px rgba(139, 92, 246, 0.5));
        transition: width 0.3s, height 0.3s;
      `;
      document.body.appendChild(cursor);
      cursorRef.current = cursor;
    }

    if (!followerRef.current) {
      const follower = document.createElement('div');
      follower.id = 'cursor-follower';
      follower.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid ${isDark ? 'rgba(139, 92, 246, 0.7)' : 'rgba(79, 70, 229, 0.7)'};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate3d(-50%, -50%, 0);
        mix-blend-mode: difference;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        background: transparent;
      `;
      document.body.appendChild(follower);
      followerRef.current = follower;
    }

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
      mouseYRef.current = e.clientY;
      
      if (!isVisible) {
        setIsVisible(true);
        if (cursorRef.current) cursorRef.current.style.opacity = '1';
        if (followerRef.current) followerRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
      if (followerRef.current) followerRef.current.style.opacity = '0';
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover events for magnetic elements
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    magneticElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        setHoveredElement(el as HTMLElement);
      });
      
      el.addEventListener('mouseleave', () => {
        setHoveredElement(null);
      });
    });

    // Animation loop
    const animate = () => {
      if (!cursorRef.current || !followerRef.current) return;

      // Update cursor position instantly
      cursorRef.current.style.transform = `translate3d(${mouseXRef.current}px, ${mouseYRef.current}px, 0)`;
      
      // Calculate target position for follower with easing
      targetXRef.current += (mouseXRef.current - targetXRef.current) / 5;
      targetYRef.current += (mouseYRef.current - targetYRef.current) / 5;
      
      followerRef.current.style.transform = `translate3d(${targetXRef.current}px, ${targetYRef.current}px, 0)`;

      // Apply magnetic effect when hovering magnetic elements
      if (hoveredElement) {
        const rect = hoveredElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(centerY - targetYRef.current, centerX - targetXRef.current);
        const distance = Math.min(50, Math.sqrt(
          Math.pow(centerX - targetXRef.current, 2) + 
          Math.pow(centerY - targetYRef.current, 2)
        ));
        
        const moveX = Math.cos(angle) * distance * 0.2;
        const moveY = Math.sin(angle) * distance * 0.2;
        
        followerRef.current.style.transform = `
          translate3d(${targetXRef.current + moveX}px, ${targetYRef.current + moveY}px, 0)
        `;
        
        // Enlarge follower when near magnetic element
        followerRef.current.style.width = '60px';
        followerRef.current.style.height = '60px';
        followerRef.current.style.borderColor = isDark ? '#8B5CF6' : '#4F46E5';
      } else {
        // Reset follower to normal size
        followerRef.current.style.width = '40px';
        followerRef.current.style.height = '40px';
        followerRef.current.style.borderColor = isDark ? 'rgba(139, 92, 246, 0.7)' : 'rgba(79, 70, 229, 0.7)';
      }

      requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      if (cursorRef.current && cursorRef.current.parentNode) {
        cursorRef.current.parentNode.removeChild(cursorRef.current);
      }
      
      if (followerRef.current && followerRef.current.parentNode) {
        followerRef.current.parentNode.removeChild(followerRef.current);
      }
    };
  }, [isDark]);

  // Update cursor colors when theme changes
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.background = isDark 
        ? 'linear-gradient(135deg, #8B5CF6, #3B82F6)' 
        : 'linear-gradient(135deg, #4F46E5, #2563EB)';
      
      if (hoveredElement) {
        cursorRef.current.style.transform = 'scale(1.3)';
      } else {
        cursorRef.current.style.transform = 'scale(1)';
      }
    }
    
    if (followerRef.current) {
      followerRef.current.style.borderColor = isDark 
        ? 'rgba(139, 92, 246, 0.7)' 
        : 'rgba(79, 70, 229, 0.7)';
    }
  }, [isDark, hoveredElement]);

  return null; // Cursor is rendered directly to the DOM
};