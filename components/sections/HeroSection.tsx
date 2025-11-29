// components/sections/HeroSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeContext';
import { useResponsive } from '@/hooks/useResponsive';

export const HeroSection = () => {
  const { isDark } = useTheme();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [textIndex, setTextIndex] = useState(0);
  const rotatingTexts = ['Automations', 'Chatbots', 'Web Design', 'WordPress', 'Shopify', 'SEO'];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % rotatingTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Adjust animation intensity based on device
  const animationIntensity = isMobile ? 0.5 : isTablet ? 0.75 : 1;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Animated background elements - reduced on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isMobile ? 8 : 20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              isDark ? 'bg-indigo-500/10' : 'bg-blue-500/10'
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: isMobile
                ? `${Math.random() * 40 + 10}px`
                : `${Math.random() * 100 + 20}px`,
              height: isMobile
                ? `${Math.random() * 40 + 10}px`
                : `${Math.random() * 100 + 20}px`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * (isMobile ? 50 : 100)],
              y: [0, (Math.random() - 0.5) * (isMobile ? 50 : 100)],
            }}
            transition={{
              duration: isMobile
                ? Math.random() * 10 + 5  // Slower on mobile
                : Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className={`flex flex-col ${isMobile ? 'text-center' : 'lg:flex-row'} items-center justify-between gap-8 ${isMobile ? 'gap-12' : 'gap-12'}`}>
          <div className={`${isMobile ? 'w-full' : 'lg:w-1/2'} ${isMobile ? 'text-center' : 'lg:text-left'}`}>
            <motion.h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className={isDark ? 'text-white' : 'text-gray-900'}>Elevate Your</span><br />
              <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Digital Presence
              </span>
            </motion.h1>

            <motion.p
              className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We craft <span className="font-semibold relative">
                <motion.span
                  key={textIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-1 rounded transform -rotate-1"
                />
                <span className="relative z-10">
                  {rotatingTexts[textIndex]}
                </span>
              </span> solutions that transform your business.
            </motion.p>

            <motion.div
              className={`flex flex-col sm:flex-row gap-4 justify-center ${isMobile ? 'w-full' : 'lg:justify-start'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 ${
                  isDark
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                } hover:shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-0.5`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Services
              </motion.button>

              <motion.button
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg border-2 transition-all duration-300 ${
                  isDark
                    ? 'border-indigo-500 text-white hover:bg-indigo-500/10'
                    : 'border-gray-900 text-gray-900 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Portfolio
              </motion.button>
            </motion.div>
          </div>

          {!isMobile && ( // Hide the graphic on mobile to focus on content
            <motion.div
              className="lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className={`relative w-full max-w-md aspect-square rounded-2xl overflow-hidden ${
                isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-100 to-white'
              } shadow-2xl`}>
                {/* 3D mockup or animation placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-4/5 h-4/5 rounded-full ${
                    isDark ? 'bg-gradient-to-br from-indigo-900/30 to-purple-900/30' : 'bg-gradient-to-br from-blue-100 to-indigo-100'
                  } flex items-center justify-center`}>
                    <div className="text-center p-4 sm:p-8">
                      <div className={`text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>Rising Dot</div>
                      <div className={`text-base sm:text-lg ${
                        isDark ? 'text-indigo-300' : 'text-indigo-600'
                      }`}>
                        Advanced Digital Solutions
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated elements */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute rounded-full ${
                      isDark ? 'bg-indigo-500/20' : 'bg-blue-500/20'
                    }`}
                    style={{
                      width: `${Math.random() * 40 + 20}px`,
                      height: `${Math.random() * 40 + 20}px`,
                      top: `${Math.random() * 80 + 10}%`,
                      left: `${Math.random() * 80 + 10}%`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};