// app/about/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { AnimatedHeader } from '@/components/layout/AnimatedHeader';
import { AccessibilityControls } from '@/components/accessibility/AccessibilityControls';
import { SEOHead } from '@/components/seo/SEOHead';
import { AnalyticsTracker } from '@/components/monitoring/AnalyticsTracker';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading about page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SEOHead
        title="About Us - Rising Dot Agency"
        description="Learn about Rising Dot Agency, our mission, values, and team of experts specializing in N8N Automations, Chatbots, Web Design, WordPress, Shopify, and SEO services."
        path="/about"
        type="website"
        keywords={['about us', 'digital agency', 'team', 'mission', 'values', 'n8n automation agency', 'chatbot development team', 'web design company', 'wordpress developers', 'shopify experts', 'seo agency']}
        author="Rising Dot Agency"
      />
      <AnalyticsTracker 
        pageName="about-page"
        category="about"
        customData={{ pageType: 'about', companyInfo: 'profile' }}
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
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                About <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Rising Dot</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We're a team of passionate creators, developers, and strategists dedicated to bringing your digital vision to life with innovative solutions and exceptional craftsmanship.
              </p>
            </motion.div>

            {/* Company Story */}
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                      Founded in 2023, Rising Dot emerged from a simple belief: that technology should be a force for positive change. We started as a small team with a big dream to revolutionize the way businesses interact with digital solutions.
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                      Today, we're a growing collective of designers, developers, and strategists who share a passion for creating meaningful digital experiences that solve real problems and drive growth for our clients.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-xl">
                        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">50+</div>
                        <div className="text-gray-600 dark:text-gray-400">Projects Delivered</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-xl">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">98%</div>
                        <div className="text-gray-600 dark:text-gray-400">Client Retention</div>
                      </div>
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-6 rounded-xl">
                        <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">24/7</div>
                        <div className="text-gray-600 dark:text-gray-400">Support Available</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🚀</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Team Collaboration</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Innovating together since 2023</p>
                      </div>
                    </div>
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full opacity-20"></div>
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-20"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Our Values */}
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Core Values</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Innovation',
                    description: 'We constantly explore new technologies and methodologies to deliver cutting-edge solutions.',
                    icon: '💡'
                  },
                  {
                    title: 'Excellence',
                    description: 'We maintain the highest standards in every project, ensuring quality in every detail.',
                    icon: '⭐'
                  },
                  {
                    title: 'Integrity',
                    description: 'We believe in honest communication, transparency, and ethical business practices.',
                    icon: '🤝'
                  },
                  {
                    title: 'Collaboration',
                    description: 'We work closely with our clients to understand their needs and exceed expectations.',
                    icon: '👥'
                  },
                  {
                    title: 'Sustainability',
                    description: 'We develop solutions that are environmentally conscious and future-focused.',
                    icon: '🌱'
                  },
                  {
                    title: 'Growth',
                    description: 'We foster continuous learning and development for our team and clients.',
                    icon: '📈'
                  }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Meet the Team */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                Meet Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Team</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    name: 'Alex Johnson',
                    role: 'Founder & CEO',
                    bio: 'Visionary leader with 10+ years in digital innovation.',
                    avatar: 'AJ'
                  },
                  {
                    name: 'Maria Garcia',
                    role: 'Creative Director',
                    bio: 'Award-winning designer specializing in UX/UI and brand identity.',
                    avatar: 'MG'
                  },
                  {
                    name: 'Sam Chen',
                    role: 'Lead Developer',
                    bio: 'Full-stack engineer with expertise in modern web technologies.',
                    avatar: 'SC'
                  },
                  {
                    name: 'Emma Wilson',
                    role: 'Product Strategist',
                    bio: 'Expert in product development and customer experience design.',
                    avatar: 'EW'
                  }
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                      {member.avatar}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">{member.role}</p>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-10 text-indigo-100 max-w-2xl mx-auto">
              Join the companies who've elevated their digital presence with our innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                className="px-8 py-4 rounded-full font-bold text-lg bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-0.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
              </motion.button>
              <motion.button
                className="px-8 py-4 rounded-full font-bold text-lg bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Call
              </motion.button>
            </div>
          </div>
        </section>
      </main>
      <AccessibilityControls />
    </div>
  );
}