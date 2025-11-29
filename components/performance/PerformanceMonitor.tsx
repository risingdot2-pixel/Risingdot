// components/performance/PerformanceMonitor.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePerformanceOptimizer } from '@/lib/performance/performanceOptimizer';

export const PerformanceMonitor = () => {
  const [showMetrics, setShowMetrics] = useState(false);
  const { metrics, qualitySettings } = usePerformanceOptimizer();

  // Toggle performance metrics display
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setShowMetrics(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!showMetrics) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg font-mono text-sm z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Performance Metrics</h3>
        <button 
          onClick={() => setShowMetrics(false)}
          className="text-gray-300 hover:text-white ml-2"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-1">
        <div>FPS: <span className={metrics.fps < 30 ? 'text-red-400' : metrics.fps < 45 ? 'text-yellow-400' : 'text-green-400'}>{metrics.fps}</span></div>
        <div>QC: {qualitySettings.animationComplexity}</div>
        <div>PC: {qualitySettings.particleCount}</div>
        <div>TR: {qualitySettings.textureResolution}</div>
        <div>AA: {qualitySettings.antiAliasing}</div>
      </div>
    </div>
  );
};