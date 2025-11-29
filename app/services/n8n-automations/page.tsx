// app/services/n8n-automations/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { AnimatedHeader } from '@/components/layout/AnimatedHeader';
import { AccessibilityControls } from '@/components/accessibility/AccessibilityControls';
import { SEOHead } from '@/components/seo/SEOHead';
import { AnalyticsTracker } from '@/components/monitoring/AnalyticsTracker';
import { motion } from 'framer-motion';

export default function N8NAutomationPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading N8N Automation page...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <SEOHead 
          title="N8N Automation Services - Rising Dot Agency"
          description="Expert N8N workflow automation solutions to streamline your business processes, boost efficiency, and drive growth. Custom integrations and automations for your unique business needs."
          path="/services/n8n-automations"
          type="article"
          keywords={['n8n automation', 'workflow automation', 'business process automation', 'integration platform', 'no-code automation', 'process optimization']}
          author="Rising Dot Agency"
        />
        <AnalyticsTracker 
          pageName="n8n-automation-services"
          category="service_page"
          customData={{ serviceType: 'n8n-automation', industry: 'automation' }}
        />
        <MagneticCursor />
        <AnimatedHeader />
        <main id="main-content" className="pt-20">
          <section className="py-20 px-6 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-20">
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                    N8N Workflow
                  </span>{' '}
                  <span className="text-gray-900 dark:text-white">Automation</span>
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Transform your business processes with custom N8N automation solutions that streamline operations and boost efficiency.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    Streamline Complex Workflows
                  </h2>
                  <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                    Our expert team designs and implements custom N8N automation solutions that integrate your existing tools, eliminating manual tasks and reducing operational overhead.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Custom workflow design and implementation',
                      'Integration with 300+ apps and services',
                      'Trigger-based automation logic',
                      'Data transformation and mapping',
                      'Error handling and monitoring',
                      'Scalable process design'
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
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
                    className="px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Discuss Your Workflow
                  </motion.button>
                </motion.div>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl mb-4">⚙️</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">N8N Workflow Visualization</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Custom automation flow</p>
                      </div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-blue-500/10 dark:bg-blue-500/5"></div>
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5"></div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-white dark:bg-gray-900">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  Our N8N <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Automation Services</span>
                </h2>
                <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                  We provide end-to-end N8N automation solutions tailored to your business needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Workflow Design',
                    description: 'Custom workflow architecture tailored to your specific business processes and requirements.',
                    icon: '🏗️'
                  },
                  {
                    title: 'System Integration',
                    description: 'Connect disparate systems and applications to create seamless data flows.',
                    icon: '🔗'
                  },
                  {
                    title: 'Process Optimization',
                    description: 'Analyze and optimize existing processes to improve efficiency and reduce costs.',
                    icon: '⚡'
                  },
                  {
                    title: 'Automated Workflows',
                    description: 'Design automated processes triggered by specific events or conditions.',
                    icon: '🔄'
                  },
                  {
                    title: 'Data Transformation',
                    description: 'Transform and manipulate data as it flows between different systems.',
                    icon: '📊'
                  },
                  {
                    title: 'Monitoring & Support',
                    description: 'Ongoing monitoring, maintenance, and optimization of your automation systems.',
                    icon: '👁️'
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
                    Why Choose Our N8N <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Automation Services</span>
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        title: 'Expert Implementation',
                        description: 'Our certified N8N specialists ensure optimal setup and configuration for your unique requirements.'
                      },
                      {
                        title: 'Cost Efficiency',
                        description: 'Reduce operational costs by automating repetitive tasks and eliminating manual errors.'
                      },
                      {
                        title: 'Scalable Solutions',
                        description: 'Designed to grow with your business, adapting to changing needs and complexities.'
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 mt-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
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
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📈</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">ROI Improvement</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Average 300% ROI in first year</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Transform Your Operations?
              </h2>
              <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
                Discover how our N8N automation solutions can streamline your workflows and accelerate your business growth.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  className="px-8 py-4 rounded-full font-semibold text-lg bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Consultation
                </motion.button>
                <motion.button
                  className="px-8 py-4 rounded-full font-semibold text-lg bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Case Studies
                </motion.button>
              </div>
            </div>
          </section>
        </main>
        <AccessibilityControls />
      </div>
  );
}