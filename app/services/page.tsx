// app/services/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from '@/components/ThemeContext';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { AnimatedHeader } from '@/components/layout/AnimatedHeader';
import { AccessibilityControls } from '@/components/accessibility/AccessibilityControls';
import { SEOHead } from '@/components/seo/SEOHead';
import { AnalyticsTracker } from '@/components/monitoring/AnalyticsTracker';

export default function ServicesPage() {
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
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading services...</p>
        </div>
      </div>
    );
  }

  const services = [
    {
      title: 'N8N Automations',
      description: 'Custom workflow automation solutions that streamline your business processes and boost efficiency.',
      icon: '⚙️',
      features: [
        'Business process automation',
        'API integration',
        'Custom workflow design',
        'Data synchronization'
      ]
    },
    {
      title: 'Chatbot Development',
      description: 'AI-powered conversational interfaces that enhance customer engagement and support.',
      icon: '🤖',
      features: [
        'Natural language processing',
        'Multi-platform deployment',
        'Custom conversation flows',
        'Integration with CRM systems'
      ]
    },
    {
      title: 'Web Designing',
      description: 'Modern, responsive websites crafted with user experience and conversion in mind.',
      icon: '🎨',
      features: [
        'Responsive design',
        'Performance optimization',
        'Conversion-focused layouts',
        'Modern aesthetics'
      ]
    },
    {
      title: 'WordPress',
      description: 'Custom WordPress solutions optimized for performance, security, and scalability.',
      icon: '🌐',
      features: [
        'Custom theme development',
        'Performance optimization',
        'Security hardening',
        'E-commerce solutions'
      ]
    },
    {
      title: 'Shopify',
      description: 'E-commerce stores designed to maximize conversions and provide seamless shopping experiences.',
      icon: '🛒',
      features: [
        'Custom storefront design',
        'Checkout optimization',
        'Inventory management',
        'Marketing automation'
      ]
    },
    {
      title: 'SEO Services',
      description: 'Comprehensive SEO strategies to improve your search rankings and online visibility.',
      icon: '📈',
      features: [
        'Technical SEO audit',
        'Keyword optimization',
        'Content strategy',
        'Performance monitoring'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SEOHead
        title="Services - Rising Dot Agency"
        description="Explore our comprehensive suite of digital services including N8N Automations, Chatbot Development, Web Design, WordPress, Shopify, and SEO. Transform your business with our cutting-edge solutions."
        path="/services"
        type="website"
        keywords={['digital services', 'n8n automation', 'chatbot development', 'web design', 'wordpress development', 'shopify development', 'seo services', 'automation services']}
        author="Rising Dot Agency"
      />
      <AnalyticsTracker
        pageName="services-page"
        category="services"
        customData={{ pageType: 'service-listing', industry: 'digital-agency' }}
      />
      <MagneticCursor />
      <AnimatedHeader />
      <main id="main-content" className="pt-20">
          <section className="py-20 px-6 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-20">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Our <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Services</span>
                </h1>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                  We provide cutting-edge digital solutions tailored to your business needs, combining innovation with practical implementation to drive results.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className={`p-8 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                      isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 to-white'
                    }`}
                  >
                    <div className="text-5xl mb-6">{service.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mt-1 mr-2">✓</span>
                          <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-3 rounded-lg font-medium ${
                      isDark 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:opacity-90' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:opacity-90'
                    } transition-opacity`}>
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-white dark:bg-gray-800">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Why Choose <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Rising Dot?</span>
              </h2>
              <p className="text-xl mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We combine technical expertise with creative innovation to deliver solutions that truly transform your business.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className={`p-6 rounded-xl ${
                  isDark ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Fast Delivery</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Rapid development cycles without compromising on quality
                  </p>
                </div>
                
                <div className={`p-6 rounded-xl ${
                  isDark ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Secure Solutions</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enterprise-grade security for all our implementations
                  </p>
                </div>
                
                <div className={`p-6 rounded-xl ${
                  isDark ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="text-4xl mb-4">📈</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Measurable Results</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Trackable outcomes with comprehensive analytics
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
                Join the companies who've transformed their digital presence with our solutions.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-4 rounded-full font-semibold text-lg bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-300">
                  Get Started
                </button>
                <button className="px-8 py-4 rounded-full font-semibold text-lg bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </section>
        </main>
        <AccessibilityControls />
      </div>
  );
}