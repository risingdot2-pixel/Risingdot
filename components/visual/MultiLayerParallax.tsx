// components/visual/MultiLayerParallax.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeContext';

export const MultiLayerParallax = () => {
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Create different parallax speeds for different layers
  // The deeper the layer, the slower it moves (creating depth illusion)
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const layer4Y = useTransform(scrollYProgress, [0, 1], [0, 50]);
  
  // Rotation effects for more dynamic parallax
  const layer1Rotation = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const layer2Rotation = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const layer3Rotation = useTransform(scrollYProgress, [0, 1], [0, 2]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[200vh] overflow-hidden"
    >
      {/* Fixed container for parallax elements */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background layer - slowest movement */}
        <motion.div 
          className="absolute inset-0"
          style={{ 
            y: layer1Y,
            rotate: layer1Rotation,
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(248, 250, 252, 0.9)'
          }}
        >
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-4 h-4 rounded-full ${
                  isDark ? 'bg-indigo-500' : 'bg-blue-500'
                }`}
                style={{
                  top: `${(i * 17) % 100}%`,
                  left: `${(i * 13) % 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 4 + i % 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Middle layer - medium movement */}
        <motion.div 
          className="absolute inset-0"
          style={{ 
            y: layer2Y,
            rotate: layer2Rotation,
            opacity: 0.7
          }}
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 blur-3xl" />
        </motion.div>

        {/* Content layer - faster movement */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ 
            y: layer3Y,
            rotate: layer3Rotation
          }}
        >
          <div className="text-center px-6">
            <motion.h2 
              className={`text-5xl md:text-7xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Depth & Motion
              </span>
            </motion.h2>
            <motion.p 
              className={`text-xl md:text-2xl max-w-2xl mx-auto ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Experience our layered storytelling approach with physics-based animations.
            </motion.p>
          </div>
        </motion.div>

        {/* Foreground layer - fastest movement */}
        <motion.div 
          className="absolute inset-0"
          style={{ 
            y: layer4Y,
            opacity: 0.9
          }}
        >
          {/* Floating geometric shapes */}
          <motion.div
            className={`absolute w-16 h-16 rounded-lg ${
              isDark ? 'bg-indigo-600' : 'bg-blue-500'
            }`}
            style={{
              top: '20%',
              left: '10%',
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className={`absolute w-12 h-12 rounded-full ${
              isDark ? 'bg-purple-600' : 'bg-purple-500'
            }`}
            style={{
              top: '60%',
              right: '15%',
            }}
            animate={{
              y: [0, 25, 0],
              rotate: [0, -15, 0, 15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          
          <motion.div
            className={`absolute w-20 h-20 ${
              isDark ? 'bg-cyan-600' : 'bg-cyan-500'
            }`}
            style={{
              top: '40%',
              left: '70%',
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 20, 0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} // Triangle shape
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className={`w-8 h-12 rounded-full border-2 ${
              isDark ? 'border-gray-400' : 'border-gray-600'
            } flex justify-center`}
          >
            <motion.div 
              className={`w-2 h-2 rounded-full mt-2 ${
                isDark ? 'bg-gray-400' : 'bg-gray-600'
              }`}
              animate={{ y: [0, 12, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
          <span className={`mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
};