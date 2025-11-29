// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { PhysicsEngine } from '@/lib/physics/physicsEngine';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { ParticleSystem } from '@/components/visual/ParticleSystem';
import { AnimatedHeader } from '@/components/layout/AnimatedHeader';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ScrollStorySection } from '@/components/visual/ScrollStorySection';
import { MultiLayerParallax } from '@/components/visual/MultiLayerParallax';
import { AccessibilityControls } from '@/components/accessibility/AccessibilityControls';
import { SEOHead } from '@/components/seo/SEOHead';
import { PerformanceMonitor } from '@/components/performance/PerformanceMonitor';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Initialize physics engine
    const physicsEngine = new PhysicsEngine();
    physicsEngine.init();

    // Cleanup function
    return () => {
      physicsEngine.destroy();
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <SEOHead
          title="Rising Dot Agency - Premium Digital Solutions"
          description="Rising Dot Agency specializes in N8N Automations, Chatbot Development, Web Design, WordPress, Shopify, and SEO services. Transform your digital presence with our cutting-edge solutions."
          keywords={['digital agency', 'n8n automation', 'chatbot development', 'web design', 'seo services', 'wordpress development', 'shopify development']}
          author="Rising Dot Agency"
        />
        <MagneticCursor />
        <AnimatedHeader />
        <main id="main-content" className="pt-20">
          <HeroSection />
          <MultiLayerParallax />
          <ServicesSection />
          <ScrollStorySection />
          <ContactSection />
        </main>
        <AccessibilityControls />
        <PerformanceMonitor />
      </div>
  );
}