// components/layout/AnimatedHeader.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export const AnimatedHeader = () => {
  const { isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLHeadElement>(null);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
                  : 'bg-gradient-to-br from-blue-500 to-indigo-600'
              }`}>
                <span className="text-white font-bold text-lg">RD</span>
              </div>
              {/* Animated ring effect */}
              <div className={`absolute -inset-2 rounded-xl border-2 ${
                isDark ? 'border-indigo-500/30' : 'border-blue-500/30'
              } group-hover:border-indigo-400/50 transition-all duration-500 scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100`}></div>
            </div>
            <span className={`font-bold text-xl transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Rising<span className="text-indigo-500">Dot</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group ${
                  isDark 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Contact button */}
            <Link 
              href="/contact"
              className={`hidden md:block px-6 py-2 rounded-full font-medium transition-all duration-300 group ${
                isDark
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
              } hover:shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-0.5`}
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg"
            >
              <div className={`w-6 h-0.5 rounded-full transition-all duration-300 ${
                isDark ? 'bg-white' : 'bg-gray-900'
              } ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-6 h-0.5 rounded-full my-1.5 transition-all duration-300 ${
                isDark ? 'bg-white' : 'bg-gray-900'
              } ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 rounded-full transition-all duration-300 ${
                isDark ? 'bg-white' : 'bg-gray-900'
              } ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-6 pb-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                  isDark 
                    ? 'text-gray-300 hover:bg-gray-800' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              href="/contact"
              className={`block text-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                isDark
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};