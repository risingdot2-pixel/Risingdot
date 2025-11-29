// app/services/shopify/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { AnimatedHeader } from '@/components/layout/AnimatedHeader';
import { AccessibilityControls } from '@/components/accessibility/AccessibilityControls';
import { SEOHead } from '@/components/seo/SEOHead';
import { AnalyticsTracker } from '@/components/monitoring/AnalyticsTracker';
import { motion } from 'framer-motion';

export default function ShopifyPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Shopify page...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <SEOHead 
          title="Shopify E-commerce Development - Rising Dot Agency"
          description="Expert Shopify development services with custom themes, store optimization, and conversion-focused designs. Boost sales with our Shopify e-commerce solutions tailored to your business needs."
          path="/services/shopify"
          type="article"
          keywords={['shopify development', 'ecommerce store', 'custom shopify theme', 'shopify optimization', 'conversion rate optimization', 'shopify app development', 'shopify plus', 'ecommerce design']},
          author="Rising Dot Agency"
        />
        <AnalyticsTracker 
          pageName="shopify-development-services"
          category="service_page"
          customData={{ serviceType: 'shopify', industry: 'ecommerce' }}
        />
        <MagneticCursor />
        <AnimatedHeader />
        <main id="main-content" className="pt-20">
          <section className="py-20 px-6 bg-gradient-to-b from-emerald-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-20">
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                    Shopify
                  </span>{' '}
                  <span className="text-gray-900 dark:text-white">E-commerce</span>
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Transform your e-commerce vision into reality with our expert Shopify development services. We create conversion-focused stores that boost sales and provide exceptional shopping experiences.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    Conversion-Focused E-commerce
                  </h2>
                  <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                    Our Shopify experts create stores designed not just to showcase products, but to convert visitors into paying customers through strategic design and optimized user journeys.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Custom Shopify theme development',
                      'Conversion optimization strategies',
                      'Mobile-first responsive design',
                      'Advanced Shopify Plus features',
                      'Payment gateway integration',
                      'Inventory management system'
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        </div>
                        <span className="ml-3 text-gray-600 dark:text-gray-300">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.button
                    className="px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-emerald-500 to-cyan-600 text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Build Your Store
                  </motion.button>
                </motion.div>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <div className="aspect-video bg-gradient-to-br from-emerald-100 to-cyan-200 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl mb-4">🛍️</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Shopify Storefront</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Conversion-optimized design</p>
                      </div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5"></div>
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-cyan-500/10 dark:bg-cyan-500/5"></div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-white dark:bg-gray-900">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  Our Shopify <span className="bg-gradient-to-r from-emerald-500 to-cyan-600 bg-clip-text text-transparent">Services</span>
                </h2>
                <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                  Comprehensive Shopify development and optimization solutions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Custom Themes',
                    description: 'Unique, conversion-focused Shopify themes built for performance and user experience.',
                    icon: '🎨'
                  },
                  {
                    title: 'Shopify Plus',
                    description: 'Enterprise-level features and customizations for large-scale operations.',
                    icon: '🏢'
                  },
                  {
                    title: 'App Development',
                    description: 'Custom Shopify apps to extend functionality and integrate with third-party services.',
                    icon: '🔌'
                  },
                  {
                    title: 'Conversion Optimization',
                    description: 'A/B testing, checkout optimization, and conversion-focused design strategies.',
                    icon: '📈'
                  },
                  {
                    title: 'Payment Integration',
                    description: 'Multiple payment gateway setups with security best practices.',
                    icon: '💳'
                  },
                  {
                    title: 'Migration Services',
                    description: 'Seamless migration from other platforms to Shopify with no data loss.',
                    icon: '🚚'
                  }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="text-5xl mb-6">{service.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                    E-commerce <span className="bg-gradient-to-r from-emerald-500 to-cyan-600 bg-clip-text text-transparent">Advantages</span>
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        title: 'Scalability',
                        description: 'Built to grow with your business from startup to enterprise level.'
                      },
                      {
                        title: 'Mobile Optimization',
                        description: 'Fully responsive designs optimized for mobile commerce.'
                      },
                      {
                        title: 'Security',
                        description: 'Enterprise-grade security with PCI compliance and SSL certificates.'
                      },
                      {
                        title: 'Speed',
                        description: 'Optimized for Core Web Vitals and fast page loading.'
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 mt-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
                            <span className="text-white font-bold">{index + 1}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                          <p className="mt-2 text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8">
                    <div className="aspect-square bg-gradient-to-br from-emerald-100 to-cyan-200 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🛒</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sales Growth</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Average 150% increase</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-gradient-to-r from-emerald-500 to-cyan-600">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Launch Your Store?
              </h2>
              <p className="text-xl mb-10 text-emerald-100 max-w-2xl mx-auto">
                Transform your product ideas into a high-converting Shopify store that drives revenue.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  className="px-8 py-4 rounded-full font-semibold text-lg bg-white text-emerald-600 hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Selling
                </motion.button>
                <motion.button
                  className="px-8 py-4 rounded-full font-semibold text-lg bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Request Consultation
                </motion.button>
              </div>
            </div>
          </section>
        </main>
        <AccessibilityControls />
      </div>
  );
}