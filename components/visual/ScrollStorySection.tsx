// components/visual/ScrollStorySection.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '@/components/ThemeContext';

interface StoryStep {
  id: string;
  title: string;
  description: string;
  image?: string;
  backgroundColor: string;
  textColor: string;
}

export const ScrollStorySection = () => {
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Define story steps
  const storySteps: StoryStep[] = [
    {
      id: "step1",
      title: "Innovation Begins",
      description: "We start by understanding your unique business challenges and opportunities.",
      backgroundColor: isDark ? "#0f172a" : "#f8fafc",
      textColor: isDark ? "text-white" : "text-gray-900"
    },
    {
      id: "step2",
      title: "Strategic Design",
      description: "Our team crafts innovative solutions tailored to your specific needs.",
      backgroundColor: isDark ? "#1e293b" : "#e2e8f0",
      textColor: isDark ? "text-white" : "text-gray-900"
    },
    {
      id: "step3",
      title: "Development",
      description: "We bring your vision to life with cutting-edge technology and craftsmanship.",
      backgroundColor: isDark ? "#334155" : "#cbd5e1",
      textColor: isDark ? "text-white" : "text-gray-900"
    },
    {
      id: "step4",
      title: "Launch & Optimize",
      description: "We deploy and continuously optimize your digital solution for success.",
      backgroundColor: isDark ? "#475569" : "#94a3b8",
      textColor: isDark ? "text-white" : "text-gray-900"
    }
  ];

  // Create different scroll progress values for each element
  const titleY = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);
  const descriptionY = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  // Create spring values for smoother animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate which step is active based on scroll progress
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const unsubscribe = smoothProgress.onChange((latest) => {
      const stepIndex = Math.min(Math.floor(latest * storySteps.length), storySteps.length - 1);
      setActiveStep(Math.max(0, stepIndex));
    });

    return () => unsubscribe();
  }, [smoothProgress, storySteps.length]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[400vh] overflow-hidden"
    >
      {/* Background that changes with scroll */}
      <motion.div 
        className="sticky top-0 h-screen w-full"
        style={{ 
          backgroundColor: storySteps[activeStep]?.backgroundColor || (isDark ? "#0f172a" : "#f8fafc")
        }}
      >
        <div className="container mx-auto h-full flex items-center justify-center px-6">
          <div className="max-w-4xl w-full">
            {/* Animated elements that move with scroll */}
            <motion.div 
              className="mb-12"
              style={{ y: titleY, opacity }}
            >
              <motion.h2 
                className={`text-5xl md:text-7xl font-bold mb-6 ${storySteps[activeStep]?.textColor}`}
                key={activeStep}
              >
                {storySteps[activeStep]?.title}
              </motion.h2>
            </motion.div>

            <motion.div 
              style={{ y: descriptionY, opacity }}
            >
              <motion.p 
                className={`text-xl md:text-2xl mb-12 ${storySteps[activeStep]?.textColor}`}
                key={activeStep}
              >
                {storySteps[activeStep]?.description}
              </motion.p>
            </motion.div>

            {/* Progress indicator */}
            <div className="flex justify-center space-x-2 mb-12">
              {storySteps.map((_, index) => (
                <div 
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    index === activeStep 
                      ? (isDark ? 'bg-indigo-400 scale-125' : 'bg-indigo-600 scale-125') 
                      : (isDark ? 'bg-gray-600' : 'bg-gray-400')
                  }`}
                ></div>
              ))}
            </div>

            {/* Scroll indicator */}
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className={`w-8 h-12 rounded-full border-2 ${
                  isDark ? 'border-gray-400' : 'border-gray-600'
                } flex justify-center`}
              >
                <motion.div 
                  className={`w-2 h-2 rounded-full mt-2 ${
                    isDark ? 'bg-gray-400' : 'bg-gray-600'
                  }`}
                  animate={{ y: [0, 12, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
              <span className={`mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Scroll to explore
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Layered parallax elements */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${20 + i * 10} h-${20 + i * 10} rounded-full ${
              isDark ? 'bg-indigo-500/10' : 'bg-blue-500/10'
            }`}
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -50 - i * 10, 0],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  );
};