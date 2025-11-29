// app/contact/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { AnimatedHeader } from '@/components/layout/AnimatedHeader';
import { AccessibilityControls } from '@/components/accessibility/AccessibilityControls';
import { SEOHead } from '@/components/seo/SEOHead';
import { AnalyticsTracker } from '@/components/monitoring/AnalyticsTracker';
import { SimpleContactForm } from '@/components/forms/SimpleContactForm';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading contact page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SEOHead
        title="Contact Us - Rising Dot Agency"
        description="Get in touch with Rising Dot Agency. Reach out for N8N Automations, Chatbot Development, Web Design, WordPress, Shopify, or SEO services. We're here to help transform your digital presence."
        path="/contact"
        type="website"
        keywords={['contact', 'get in touch', 'digital agency contact', 'hire developers', 'project inquiry', 'agency contact form']},
        author="Rising Dot Agency"
      />
      <AnalyticsTracker
        pageName="contact-page"
        category="contact"
        customData={{ pageType: 'contact-form', userIntent: 'inquiry' }}
      />
      <MagneticCursor />
      <AnimatedHeader />
      <main id="main-content" className="pt-20">
        <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Get In <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Touch</span>
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                Have a project in mind? Reach out to us and let's discuss how we can help bring your vision to life.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div
                className="space-y-12"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className={`p-8 rounded-2xl shadow-xl ${
                  isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'
                }`}>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h2>
                  
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 p-3 rounded-lg ${
                        isDark ? 'bg-gradient-to-br from-blue-600 to-indigo-700' : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                      }`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Phone</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className={`flex-shrink-0 p-3 rounded-lg ${
                        isDark ? 'bg-gradient-to-br from-purple-600 to-pink-700' : 'bg-gradient-to-br from-purple-500 to-pink-600'
                      }`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">hello@risindot.agency</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className={`flex-shrink-0 p-3 rounded-lg ${
                        isDark ? 'bg-gradient-to-br from-amber-600 to-orange-700' : 'bg-gradient-to-br from-amber-500 to-orange-600'
                      }`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Location</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">New York, NY</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className={`flex-shrink-0 p-3 rounded-lg ${
                        isDark ? 'bg-gradient-to-br from-emerald-600 to-teal-700' : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                      }`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Business Hours</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                          Monday-Friday: 9AM - 6PM<br />
                          Saturday: 10AM - 4PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  className={`p-8 rounded-2xl text-center ${
                    isDark ? 'bg-gradient-to-br from-indigo-600 to-purple-700' : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                  } text-white`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h3 className="text-2xl font-bold mb-4">Why Choose Rising Dot?</h3>
                  <ul className="space-y-3 text-indigo-100 text-left max-w-xs mx-auto">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-indigo-300 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Industry-leading expertise in automation & AI
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-indigo-300 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Dedicated project management
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-indigo-300 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Ongoing support & maintenance
                    </li>
                  </ul>
                </motion.div>
              </motion.div>

              <SimpleContactForm />
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-10 text-indigo-100 max-w-2xl mx-auto">
              Join the companies who've transformed their digital presence with our solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 rounded-full font-semibold text-lg bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-300">
                Schedule a Call
              </button>
              <button className="px-8 py-4 rounded-full font-semibold text-lg bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-300">
                View Pricing
              </button>
            </div>
          </div>
        </section>
      </main>
      <AccessibilityControls />
    </div>
  );
}