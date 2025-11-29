// lib/performance/performanceOptimizer.ts
import { useEffect, useState, useRef } from 'react';

export interface PerformanceMetrics {
  fps: number;
  memoryUsage?: number;
  cpuUsage?: number;
  animationCount: number;
  particleCount: number;
  activeAnimations: number;
  renderTime: number;
}

export interface QualitySettings {
  particleCount: number;
  animationComplexity: 'low' | 'medium' | 'high' | 'ultra';
  textureResolution: 'low' | 'medium' | 'high';
  shadowQuality: 'off' | 'low' | 'medium' | 'high';
  antiAliasing: 'off' | 'fxaa' | 'smaa' | 'msaa';
  postProcessing: boolean;
}

export class PerformanceOptimizer {
  private metrics: PerformanceMetrics = {
    fps: 60,
    animationCount: 0,
    particleCount: 0,
    activeAnimations: 0,
    renderTime: 0
  };
  
  private qualitySettings: QualitySettings = {
    particleCount: 2500,
    animationComplexity: 'high',
    textureResolution: 'high',
    shadowQuality: 'high',
    antiAliasing: 'msaa',
    postProcessing: true
  };
  
  private isOptimizing = false;
  private frameCount = 0;
  private lastTime = performance.now();
  private animationFrameId: number | null = null;
  
  // Thresholds for performance adjustments
  private readonly thresholds = {
    fps: 45, // Target FPS
    maxRenderTime: 16, // Max render time in ms (for 60fps)
    maxMemory: 1000 // Max memory usage in MB
  };
  
  constructor() {
    this.startMonitoring();
  }
  
  private startMonitoring() {
    const updateMetrics = () => {
      const now = performance.now();
      const delta = now - this.lastTime;
      this.frameCount++;
      
      if (delta >= 1000) { // Update every second
        this.metrics.fps = Math.round((this.frameCount * 1000) / delta);
        this.frameCount = 0;
        this.lastTime = now;
        
        // Adjust quality based on performance
        this.adjustQuality();
      }
      
      this.animationFrameId = requestAnimationFrame(updateMetrics);
    };
    
    updateMetrics();
  }
  
  public adjustQuality() {
    // If FPS is too low, reduce quality
    if (this.metrics.fps < this.thresholds.fps) {
      this.reduceQuality();
    } else if (this.metrics.fps > this.thresholds.fps + 10) {
      // If FPS is significantly higher than target, consider increasing quality
      this.increaseQuality();
    }
  }
  
  private reduceQuality() {
    // Reduce particle count
    if (this.qualitySettings.particleCount > 500) {
      this.qualitySettings.particleCount = Math.max(500, this.qualitySettings.particleCount - 500);
    }
    
    // Reduce animation complexity
    if (this.qualitySettings.animationComplexity === 'ultra') {
      this.qualitySettings.animationComplexity = 'high';
    } else if (this.qualitySettings.animationComplexity === 'high') {
      this.qualitySettings.animationComplexity = 'medium';
    } else if (this.qualitySettings.animationComplexity === 'medium') {
      this.qualitySettings.animationComplexity = 'low';
    }
    
    // Reduce texture resolution
    if (this.qualitySettings.textureResolution === 'high') {
      this.qualitySettings.textureResolution = 'medium';
    } else if (this.qualitySettings.textureResolution === 'medium') {
      this.qualitySettings.textureResolution = 'low';
    }
    
    // Reduce shadow quality
    if (this.qualitySettings.shadowQuality === 'high') {
      this.qualitySettings.shadowQuality = 'medium';
    } else if (this.qualitySettings.shadowQuality === 'medium') {
      this.qualitySettings.shadowQuality = 'low';
    } else if (this.qualitySettings.shadowQuality === 'low') {
      this.qualitySettings.shadowQuality = 'off';
    }
    
    // Disable anti-aliasing
    if (this.qualitySettings.antiAliasing === 'msaa') {
      this.qualitySettings.antiAliasing = 'smaa';
    } else if (this.qualitySettings.antiAliasing === 'smaa') {
      this.qualitySettings.antiAliasing = 'fxaa';
    } else if (this.qualitySettings.antiAliasing === 'fxaa') {
      this.qualitySettings.antiAliasing = 'off';
    }
    
    // Disable post-processing
    this.qualitySettings.postProcessing = false;
    
    // Notify about quality change
    this.onQualityChange('reduce');
  }
  
  private increaseQuality() {
    // Only increase quality if we have headroom
    if (this.metrics.fps > this.thresholds.fps + 15) {
      // Increase particle count (carefully)
      if (this.qualitySettings.particleCount < 2000) {
        this.qualitySettings.particleCount = Math.min(2000, this.qualitySettings.particleCount + 250);
      }
      
      // Increase animation complexity
      if (this.qualitySettings.animationComplexity === 'low') {
        this.qualitySettings.animationComplexity = 'medium';
      } else if (this.qualitySettings.animationComplexity === 'medium') {
        this.qualitySettings.animationComplexity = 'high';
      } else if (this.qualitySettings.animationComplexity === 'high') {
        this.qualitySettings.animationComplexity = 'ultra';
      }
      
      // Increase texture resolution
      if (this.qualitySettings.textureResolution === 'low') {
        this.qualitySettings.textureResolution = 'medium';
      } else if (this.qualitySettings.textureResolution === 'medium') {
        this.qualitySettings.textureResolution = 'high';
      }
      
      // Increase shadow quality
      if (this.qualitySettings.shadowQuality === 'off') {
        this.qualitySettings.shadowQuality = 'low';
      } else if (this.qualitySettings.shadowQuality === 'low') {
        this.qualitySettings.shadowQuality = 'medium';
      } else if (this.qualitySettings.shadowQuality === 'medium') {
        this.qualitySettings.shadowQuality = 'high';
      }
      
      // Enable anti-aliasing
      if (this.qualitySettings.antiAliasing === 'off') {
        this.qualitySettings.antiAliasing = 'fxaa';
      } else if (this.qualitySettings.antiAliasing === 'fxaa') {
        this.qualitySettings.antiAliasing = 'smaa';
      } else if (this.qualitySettings.antiAliasing === 'smaa') {
        this.qualitySettings.antiAliasing = 'msaa';
      }
      
      // Enable post-processing if fps is really good
      if (this.metrics.fps > this.thresholds.fps + 20) {
        this.qualitySettings.postProcessing = true;
      }
      
      this.onQualityChange('increase');
    }
  }
  
  private onQualityChange(type: 'reduce' | 'increase') {
    // Dispatch event for other parts of the app to adjust accordingly
    window.dispatchEvent(new CustomEvent('performanceQualityChange', {
      detail: {
        type,
        settings: this.qualitySettings,
        metrics: this.metrics
      }
    }));
  }
  
  public updateMetrics(metrics: Partial<PerformanceMetrics>) {
    this.metrics = { ...this.metrics, ...metrics };
  }
  
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }
  
  public getQualitySettings(): QualitySettings {
    return { ...this.qualitySettings };
  }
  
  public destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
  
  // Check if device is capable of high-performance tasks
  public getDeviceCapability(): 'low' | 'medium' | 'high' {
    // Simple heuristic based on device properties
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Check for known low-end devices
    if (userAgent.includes('android') && navigator.deviceMemory && navigator.deviceMemory < 4) {
      return 'low';
    }
    
    // Check for known high-end devices
    if (navigator.deviceMemory && navigator.deviceMemory >= 8) {
      return 'high';
    }
    
    // Default to medium
    return 'medium';
  }
}

// React hook for performance optimization
export const usePerformanceOptimizer = () => {
  const [optimizer] = useState(() => new PerformanceOptimizer());
  const [qualitySettings, setQualitySettings] = useState<QualitySettings>(optimizer.getQualitySettings());
  
  useEffect(() => {
    const handleQualityChange = (e: CustomEvent) => {
      setQualitySettings(e.detail.settings);
    };
    
    window.addEventListener('performanceQualityChange', handleQualityChange as EventListener);
    
    return () => {
      window.removeEventListener('performanceQualityChange', handleQualityChange as EventListener);
      optimizer.destroy();
    };
  }, [optimizer]);
  
  return {
    qualitySettings,
    metrics: optimizer.getMetrics(),
    updateMetrics: optimizer.updateMetrics.bind(optimizer),
    getDeviceCapability: optimizer.getDeviceCapability.bind(optimizer)
  };
};