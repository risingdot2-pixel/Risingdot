// components/sections/ServicesSection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeContext';
import { useResponsive } from '@/hooks/useResponsive';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
  isDark: boolean;
}

const ServiceCard = ({ title, description, icon, index, isDark }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile } = useResponsive();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative p-6 sm:p-8 rounded-2xl transition-all duration-300 overflow-hidden group ${
        isDark
          ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700'
          : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
      }`}
      onMouseEnter={() => !isMobile && setIsHovered(true)} // Disable hover effects on mobile
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -right-10 -top-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full ${
          isDark ? 'bg-indigo-500/10' : 'bg-blue-500/10'
        } transition-all duration-500 ${isHovered ? 'scale-150' : 'scale-100'}`}></div>
        <div className={`absolute -left-10 -bottom-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full ${
          isDark ? 'bg-purple-500/10' : 'bg-indigo-500/10'
        } transition-all duration-700 ${isHovered ? 'scale-150' : 'scale-100'}`}></div>
      </div>

      <div className="relative z-10">
        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-6 ${
          isDark
            ? 'bg-gradient-to-br from-indigo-600 to-purple-600'
            : 'bg-gradient-to-br from-blue-500 to-indigo-600'
        }`}>
          <span className="text-white text-xl sm:text-2xl">{icon}</span>
        </div>

        <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h3>

        <p className={`text-sm sm:text-base mb-4 sm:mb-6 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {description}
        </p>

        <motion.button
          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
            isDark
              ? 'bg-gray-700 text-white hover:bg-indigo-600'
              : 'bg-gray-100 text-gray-900 hover:bg-indigo-500 hover:text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </div>

      {/* Hover effect overlay */}
      {!isMobile && ( // Disable hover effect overlay on mobile
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
          animate={isHovered ? { opacity: 0.1 } : { opacity: 0 }}
        />
      )}
    </motion.div>
  );
};

export const ServicesSection = () => {
  const { isDark } = useTheme();
  const { isMobile } = useResponsive();

  const services = [
    {
      title: 'N8N Automations',
      description: 'Custom workflow automation solutions that streamline your business processes and boost efficiency.',
      icon: '⚙️'
    },
    {
      title: 'Chatbot Development',
      description: 'AI-powered conversational interfaces that enhance customer engagement and support.',
      icon: '🤖'
    },
    {
      title: 'Web Designing',
      description: 'Modern, responsive websites crafted with user experience and conversion in mind.',
      icon: '🎨'
    },
    {
      title: 'WordPress',
      description: 'Custom WordPress solutions optimized for performance, security, and scalability.',
      icon: '🌐'
    },
    {
      title: 'Shopify',
      description: 'E-commerce stores designed to maximize conversions and provide seamless shopping experiences.',
      icon: '🛒'
    },
    {
      title: 'SEO Services',
      description: 'Comprehensive SEO strategies to improve your search rankings and online visibility.',
      icon: '📈'
    }
  ];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We provide cutting-edge digital solutions tailored to your business needs.
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-2 lg:grid-cols-3 gap-8'}`}>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={index}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
};