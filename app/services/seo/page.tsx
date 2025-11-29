// app/services/seo/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { AnimatedHeader } from '@/components/layout/AnimatedHeader';
import { AccessibilityControls } from '@/components/accessibility/AccessibilityControls';
import { SEOHead } from '@/components/seo/SEOHead';
import { AnalyticsTracker } from '@/components/monitoring/AnalyticsTracker';
import { motion } from 'framer-motion';

export default function SEOPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading SEO page...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <SEOHead 
          title="SEO Optimization Services - Rising Dot Agency"
          description="Comprehensive SEO optimization services including keyword research, on-page optimization, technical SEO, and content strategy. Improve rankings and organic traffic with our proven SEO tactics."
          path="/services/seo"
          type="article"
          keywords={['seo optimization', 'search engine optimization', 'keyword research', 'on-page SEO', 'technical SEO', 'content strategy', 'local SEO', 'seo audit', 'seo services']},
          author="Rising Dot Agency"
        />
        <AnalyticsTracker 
          pageName="seo-optimization-services"
          category="service_page"
          customData={{ serviceType: 'seo', industry: 'digital-marketing' }}
        />
        <MagneticCursor />
        <AnimatedHeader />
        <main id="main-content" className="pt-20">
          <section className="py-20 px-6 bg-gradient-to-b from-amber-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-20">
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-amber-500 to-purple-500 bg-clip-text text-transparent">
                    Search Engine
                  </span>{' '}
                  <span className="text-gray-900 dark:text-white">Optimization</span>
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Drive targeted organic traffic and grow your business with our comprehensive SEO strategies. We combine technical expertise with proven tactics to improve your search rankings and visibility.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    Strategic SEO Excellence
                  </h2>
                  <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                    Our data-driven approach combines technical optimization with content strategy to achieve sustainable, long-term search success that drives qualified traffic to your business.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Comprehensive SEO audit and analysis',
                      'Keyword research and competitor analysis',
                      'On-page optimization and content strategy',
                      'Technical SEO and site architecture',
                      'Local SEO for location-based businesses',
                      'Continuous monitoring and reporting'
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
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
                    className="px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-amber-500 to-purple-600 text-white hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Improve Your Rankings
                  </motion.button>
                </motion.div>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <div className="aspect-video bg-gradient-to-br from-amber-100 to-purple-200 dark:from-amber-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">SEO Dashboard</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Ranking and performance metrics</p>
                      </div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-amber-500/10 dark:bg-amber-500/5"></div>
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-purple-500/10 dark:bg-purple-500/5"></div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-white dark:bg-gray-900">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  Our SEO <span className="bg-gradient-to-r from-amber-500 to-purple-600 bg-clip-text text-transparent">Services</span>
                </h2>
                <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                  Comprehensive search engine optimization solutions for sustainable growth
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Technical SEO',
                    description: 'Site audits, crawl optimization, schema markup, and page speed improvements.',
                    icon: '⚙️'
                  },
                  {
                    title: 'Content Strategy',
                    description: 'Keyword research, content planning, and creation for maximum search visibility.',
                    icon: '📝'
                  },
                  {
                    title: 'Local SEO',
                    description: 'Google My Business optimization and local citation building.',
                    icon: '📍'
                  },
                  {
                    title: 'Link Building',
                    description: 'High-quality backlink acquisition from authoritative sources.',
                    icon: '🔗'
                  },
                  {
                    title: 'Competitor Analysis',
                    description: 'Detailed analysis of competitor strategies and market positioning.',
                    icon: '📊'
                  },
                  {
                    title: 'SEO Reporting',
                    description: 'Monthly reports with insights, progress metrics, and actionable recommendations.',
                    icon: '📈'
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
                    SEO <span className="bg-gradient-to-r from-amber-500 to-purple-600 bg-clip-text text-transparent">Benefits</span>
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        title: 'Increased Visibility',
                        description: 'Higher rankings lead to more organic traffic and brand exposure.'
                      },
                      {
                        title: 'Cost Effective',
                        description: 'Better ROI compared to paid advertising with sustainable long-term results.'
                      },
                      {
                        title: 'Targeted Traffic',
                        description: 'Attract high-intent visitors actively searching for your services.'
                      },
                      {
                        title: 'Trust and Credibility',
                        description: 'Top search rankings improve brand trust and perceived authority.'
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 mt-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center">
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
                    <div className="aspect-square bg-gradient-to-br from-amber-100 to-purple-200 dark:from-amber-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📈</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Traffic Growth</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Average 300% increase</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-gradient-to-r from-amber-500 to-purple-600">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Dominate Search?
              </h2>
              <p className="text-xl mb-10 text-amber-100 max-w-2xl mx-auto">
                Improve your search rankings and attract more qualified customers with our proven SEO strategies.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  className="px-8 py-4 rounded-full font-semibold text-lg bg-white text-amber-600 hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get SEO Analysis
                </motion.button>
                <motion.button
                  className="px-8 py-4 rounded-full font-semibold text-lg bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View SEO Results
                </motion.button>
              </div>
            </div>
          </section>
        </main>
        <AccessibilityControls />
      </div>
  );
}