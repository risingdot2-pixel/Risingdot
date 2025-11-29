// components/sections/ContactSection.tsx
'use client';

import { useTheme } from '@/components/ThemeContext';
import { useResponsive } from '@/hooks/useResponsive';
import { PhysicsContactForm } from '@/components/forms/PhysicsContactForm';
import { motion } from 'framer-motion';

export const ContactSection = () => {
  const { isDark } = useTheme();
  const { isMobile } = useResponsive();

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          className="text-center mb-8 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Get In <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Have a project in mind? Let's discuss how we can help bring your vision to life.
          </p>
        </motion.div>

        <PhysicsContactForm />

        <motion.div
          className="mt-8 sm:mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className={`text-base ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Or reach us at{' '}
            <a
              href="mailto:hello@risingdot.agency"
              className="text-indigo-500 hover:underline text-base sm:text-lg"
            >
              hello@risingdot.agency
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};