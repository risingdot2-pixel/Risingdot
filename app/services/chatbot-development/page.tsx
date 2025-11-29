// app/services/chatbot-development/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { AnimatedHeader } from '@/components/layout/AnimatedHeader';
import { AccessibilityControls } from '@/components/accessibility/AccessibilityControls';
import { SEOHead } from '@/components/seo/SEOHead';
import { AnalyticsTracker } from '@/components/monitoring/AnalyticsTracker';
import { motion } from 'framer-motion';

export default function ChatbotDevelopmentPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Chatbot Development page...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <SEOHead 
          title="AI Chatbot Development - Rising Dot Agency"
          description="Advanced AI chatbot development services with NLP, custom integrations, and conversational interfaces. Enhance customer experience and automate support with our intelligent chatbot solutions."
          path="/services/chatbot-development"
          type="article"
          keywords={['ai chatbot', 'nlp chatbot', 'chatbot development', 'conversational AI', 'customer support automation', 'chatbot integration', 'dialogflow', 'custom chatbot']}
          author="Rising Dot Agency"
        />
        <AnalyticsTracker 
          pageName="chatbot-development-services"
          category="service_page"
          customData={{ serviceType: 'chatbot-development', industry: 'ai' }}
        />
        <MagneticCursor />
        <AnimatedHeader />
        <main id="main-content" className="pt-20">
          <section className="py-20 px-6 bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-20">
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    AI Chatbot
                  </span>{' '}
                  <span className="text-gray-900 dark:text-white">Development</span>
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Create intelligent conversational experiences that engage customers 24/7 and transform your support operations with our cutting-edge AI chatbot solutions.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    Intelligent Conversational AI
                  </h2>
                  <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                    Our chatbots leverage advanced Natural Language Processing (NLP) and machine learning to understand context, sentiment, and user intent for truly engaging conversations.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Advanced NLP and sentiment analysis',
                      'Multi-channel deployment (website, messenger, etc.)',
                      'Custom conversation flows and logic',
                      'Seamless CRM and database integration',
                      'Real-time analytics and reporting',
                      'Continuous learning and improvement'
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
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
                    className="px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Conversation
                  </motion.button>
                </motion.div>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-200 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl mb-4">🤖</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI Chatbot Interface</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Conversational UI demonstration</p>
                      </div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-purple-500/10 dark:bg-purple-500/5"></div>
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-blue-500/10 dark:bg-blue-500/5"></div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-white dark:bg-gray-900">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  Our Chatbot <span className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">Development Services</span>
                </h2>
                <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                  Comprehensive chatbot development services tailored to your business needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Chatbot Strategy',
                    description: 'Consultation to define chatbot goals, scope, and optimal implementation for your business.',
                    icon: '🎯'
                  },
                  {
                    title: 'NLP Training',
                    description: 'Training custom NLP models to understand your specific domain and terminology.',
                    icon: '🧠'
                  },
                  {
                    title: 'Conversation Design',
                    description: 'Designing intuitive conversation flows that provide exceptional user experiences.',
                    icon: '💬'
                  },
                  {
                    title: 'Platform Integration',
                    description: 'Seamless integration with your existing systems, CRM, and business tools.',
                    icon: '🔗'
                  },
                  {
                    title: 'Multi-Channel Deployment',
                    description: 'Deploy chatbots across multiple channels: website, mobile, social media, and more.',
                    icon: '🌐'
                  },
                  {
                    title: 'Analytics & Optimization',
                    description: 'Continuous monitoring and optimization based on user interactions and feedback.',
                    icon: '📊'
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
                    Business Benefits of <span className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">AI Chatbots</span>
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        title: '24/7 Availability',
                        description: 'Provide round-the-clock support and service without staffing costs.'
                      },
                      {
                        title: 'Enhanced Customer Experience',
                        description: 'Deliver instant, accurate responses that improve customer satisfaction.'
                      },
                      {
                        title: 'Operational Efficiency',
                        description: 'Reduce workload on human agents by handling routine inquiries automatically.'
                      },
                      {
                        title: 'Scalable Support',
                        description: 'Handle thousands of concurrent conversations without additional staff.'
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 mt-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
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
                    <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-200 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📈</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Satisfaction</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">90%+ satisfaction rate</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-gradient-to-r from-purple-500 to-blue-600">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Transform Customer Experience?
              </h2>
              <p className="text-xl mb-10 text-purple-100 max-w-2xl mx-auto">
                Discover how our AI chatbot solutions can revolutionize your customer service and business operations.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  className="px-8 py-4 rounded-full font-semibold text-lg bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Demo
                </motion.button>
                <motion.button
                  className="px-8 py-4 rounded-full font-semibold text-lg bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Portfolio
                </motion.button>
              </div>
            </div>
          </section>
        </main>
        <AccessibilityControls />
      </div>
  );
}