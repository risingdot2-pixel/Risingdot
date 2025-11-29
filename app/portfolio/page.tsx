// app/portfolio/page.tsx
'use client';

import { useMemo, useState } from 'react';
import { useTheme } from '@/components/ThemeContext';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { AnimatedHeader } from '@/components/layout/AnimatedHeader';
import { AccessibilityControls } from '@/components/accessibility/AccessibilityControls';
import { SEOHead } from '@/components/seo/SEOHead';
import { AnalyticsTracker } from '@/components/monitoring/AnalyticsTracker';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'E-commerce Automation',
    category: 'N8N',
    description: 'Automated workflow for inventory management',
    technologies: ['N8N', 'Shopify', 'Stripe'],
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 2,
    title: 'AI Chatbot',
    category: 'Chatbot',
    description: 'Intelligent conversational interface',
    technologies: ['Dialogflow', 'TensorFlow', 'React'],
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 3,
    title: 'Corporate Website',
    category: 'Web Design',
    description: 'Modern responsive corporate website',
    technologies: ['Next.js', 'Tailwind', 'GraphQL'],
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 4,
    title: 'SEO Campaign',
    category: 'SEO',
    description: 'Complete SEO strategy implementation',
    technologies: ['Google Analytics', 'Ahrefs', 'Schema'],
    gradient: 'from-green-500 to-teal-600'
  },
  {
    id: 5,
    title: 'WordPress Migration',
    category: 'WordPress',
    description: 'Large-scale content migration project',
    technologies: ['WordPress', 'PHP', 'MySQL'],
    gradient: 'from-indigo-500 to-blue-600'
  },
  {
    id: 6,
    title: 'Shopify Plus Store',
    category: 'Shopify',
    description: 'Enterprise e-commerce solution',
    technologies: ['Shopify Plus', 'React', 'Node.js'],
    gradient: 'from-rose-500 to-red-600'
  }
];

const portfolioDescription = 'Explore our portfolio of successful digital projects. See our work in N8N Automations, Chatbot Development, Web Design, WordPress, Shopify, and SEO. Discover how we\'ve transformed businesses with our solutions.';

const portfolioKeywords = [
  'portfolio',
  'case studies',
  'web design portfolio',
  'n8n automation examples',
  'chatbot projects',
  'shopify stores',
  'wordpress sites',
  'seo case studies',
  'digital solutions portfolio'
];

export default function PortfolioPage() {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'N8N', 'Chatbot', 'Web Design', 'WordPress', 'Shopify', 'SEO'];

  const filteredProjects = useMemo(() => (
    selectedCategory === 'All'
      ? projects
      : projects.filter(project => project.category === selectedCategory)
  ), [selectedCategory]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SEOHead
        title="Portfolio - Rising Dot Agency"
        description={portfolioDescription}
        path="/portfolio"
        type="website"
        keywords={portfolioKeywords}
        author="Rising Dot Agency"
      />

      <AnalyticsTracker
        pageName="portfolio-page"
        category="portfolio"
        customData={{ pageType: 'portfolio', industry: 'digital-agency' }}
      />
      <MagneticCursor />
      <AnimatedHeader />
      <main id="main-content" className="pt-20">
        <section className="py-20 px-6 bg-gradient-to-b from-violet-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-20">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Our <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">Portfolio</span>
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                Explore our showcase of innovative projects where technology meets creativity to deliver exceptional results.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? isDark
                        ? 'bg-gradient-to-r from-violet-600 to-blue-700 text-white'
                        : 'bg-gradient-to-r from-violet-500 to-blue-600 text-white'
                      : isDark
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:transform hover:-translate-y-2 group ${
                    isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={`aspect-video ${
                    isDark ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                  } flex items-center justify-center`}>
                    <div className="text-center p-8">
                      <div className="text-5xl mb-4">🚀</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{project.category}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 text-sm rounded-full ${
                            isDark
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button className={`w-full py-3 rounded-full font-medium ${
                      isDark
                        ? `bg-gradient-to-r ${project.gradient} text-white hover:opacity-90`
                        : `bg-gradient-to-r ${project.gradient} text-white hover:opacity-90`
                    } transition-opacity`}>
                      View Project
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-white dark:bg-gray-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Something <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">Missing?</span>
            </h2>
            <p className="text-xl mb-10 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have a specific project in mind? We can create custom solutions tailored to your requirements.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-violet-500 to-blue-600 text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
            >
              Start Your Project
            </a>
          </div>
        </section>
      </main>
      <AccessibilityControls />
    </div>
  );
}
