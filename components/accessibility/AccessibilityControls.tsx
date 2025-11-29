// components/accessibility/AccessibilityControls.tsx
'use client';

import { useState } from 'react';
import { useAccessibility } from '@/components/accessibility/AccessibilityProvider';
import { motion } from 'framer-motion';

export const AccessibilityControls = () => {
  const {
    reducedMotion,
    highContrast,
    fontSize,
    toggleReducedMotion,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
  } = useAccessibility();
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <div className={`flex flex-col items-end gap-3 mb-3 ${isOpen ? 'flex' : 'hidden'}`}>
        {/* High Contrast Toggle */}
        <motion.div 
          className={`flex items-center gap-2 p-3 rounded-full shadow-lg ${
            highContrast 
              ? 'bg-black text-white' 
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
          }`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
        >
          <span className="text-sm font-medium">High Contrast</span>
          <button
            onClick={toggleHighContrast}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              highContrast 
                ? 'bg-indigo-600 justify-end' 
                : 'bg-gray-300 dark:bg-gray-600 justify-start'
            }`}
            aria-label={`Toggle high contrast mode, currently ${highContrast ? 'on' : 'off'}`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
          </button>
        </motion.div>

        {/* Reduced Motion Toggle */}
        <motion.div 
          className={`flex items-center gap-2 p-3 rounded-full shadow-lg ${
            reducedMotion 
              ? 'bg-black text-white' 
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
          }`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
        >
          <span className="text-sm font-medium">Reduced Motion</span>
          <button
            onClick={toggleReducedMotion}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              reducedMotion 
                ? 'bg-indigo-600 justify-end' 
                : 'bg-gray-300 dark:bg-gray-600 justify-start'
            }`}
            aria-label={`Toggle reduced motion, currently ${reducedMotion ? 'on' : 'off'}`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
          </button>
        </motion.div>

        {/* Font Size Controls */}
        <motion.div 
          className="flex items-center gap-2 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
        >
          <span className="text-sm font-medium">Text Size</span>
          <div className="flex items-center gap-1">
            <button
              onClick={decreaseFontSize}
              className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Decrease text size"
            >
              A
            </button>
            <span className="text-sm mx-1">{fontSize}px</span>
            <button
              onClick={increaseFontSize}
              className="w-10 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Increase text size"
            >
              Aa
            </button>
          </div>
        </motion.div>
      </div>

      {/* Toggle Button */}
      <motion.button
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center ${
          isOpen 
            ? 'bg-red-500 text-white' 
            : 'bg-indigo-600 text-white'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close accessibility controls" : "Open accessibility controls"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
};