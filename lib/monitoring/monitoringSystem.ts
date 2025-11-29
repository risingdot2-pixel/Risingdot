// lib/monitoring/monitoringSystem.ts
import { useEffect, useRef } from 'react';

export interface PerformanceMetrics {
  fps: number;
  renderTime: number;
  memoryUsage?: number;
  cpuUsage?: number;
  activeAnimations: number;
  particleCount: number;
}

export interface UserInteraction {
  type: string;
  element: string;
  timestamp: number;
  pageUrl: string;
  sessionId: string;
}

export interface ErrorLog {
  message: string;
  stack: string;
  url: string;
  userAgent: string;
  timestamp: number;
  sessionId: string;
}

export class MonitoringSystem {
  private metrics: PerformanceMetrics = {
    fps: 60,
    renderTime: 0,
    activeAnimations: 0,
    particleCount: 0
  };
  
  private sessionData = {
    sessionId: this.generateSessionId(),
    startTime: Date.now(),
    pageViews: 0,
    interactions: [] as UserInteraction[],
    errors: [] as ErrorLog[]
  };
  
  private performanceObserver: PerformanceObserver | null = null;
  private errorHandlersAttached = false;
  private frameCount = 0;
  private lastTime = performance.now();
  private animationFrameId: number | null = null;
  
  constructor() {
    this.initPerformanceMonitoring();
    this.initErrorMonitoring();
    this.initUserInteractionTracking();
  }
  
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private initPerformanceMonitoring() {
    // FPS monitoring
    const measureFPS = () => {
      const now = performance.now();
      const deltaTime = now - this.lastTime;
      this.frameCount++;
      
      if (deltaTime >= 1000) {
        this.metrics.fps = Math.round((this.frameCount * 1000) / deltaTime);
        this.frameCount = 0;
        this.lastTime = now;
        
        // Report performance metrics
        this.reportPerformanceMetrics();
      }
      
      this.animationFrameId = requestAnimationFrame(measureFPS);
    };
    
    measureFPS();
    
    // Performance Observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
      this.performanceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (entry.entryType === 'largest-contentful-paint') {
            this.reportMetric('lcp', entry.startTime);
          } else if (entry.entryType === 'first-input') {
            this.reportMetric('fid', (entry as PerformanceEventTiming).processingStart - entry.startTime);
          } else if (entry.entryType === 'layout-shift') {
            this.reportMetric('cls', entry.value);
          } else if (entry.entryType === 'navigation') {
            this.reportMetric('fcp', (entry as PerformanceNavigationTiming).domContentLoadedEventEnd);
          }
        });
      });
      
      this.performanceObserver.observe({
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'navigation']
      });
    }
  }
  
  private initErrorMonitoring() {
    if (this.errorHandlersAttached) return;
    
    // JavaScript error tracking
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        stack: event.error?.stack || 'No stack trace',
        url: event.filename,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        sessionId: this.sessionData.sessionId
      });
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: `Unhandled promise rejection: ${(event.reason as Error)?.message || event.reason}`,
        stack: (event.reason as Error)?.stack || 'No stack trace',
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        sessionId: this.sessionData.sessionId
      });
    });
    
    this.errorHandlersAttached = true;
  }
  
  private initUserInteractionTracking() {
    // Track user interactions
    const interactionEvents = ['click', 'scroll', 'keydown', 'touchstart', 'mousewheel'];
    
    interactionEvents.forEach(eventType => {
      document.addEventListener(eventType, (e) => {
        const element = e.target as HTMLElement;
        if (element && element.tagName) {
          this.sessionData.interactions.push({
            type: eventType,
            element: this.getElementSelector(element),
            timestamp: Date.now(),
            pageUrl: window.location.href,
            sessionId: this.sessionData.sessionId
          });
          
          // Send interaction data
          this.sendInteractionData({
            type: eventType,
            element: this.getElementSelector(element),
            timestamp: Date.now(),
            pageUrl: window.location.href,
            sessionId: this.sessionData.sessionId
          });
        }
      }, { capture: true, passive: true });
    });
  }
  
  private getElementSelector(element: HTMLElement): string {
    if (element.id) {
      return `#${element.id}`;
    }
    
    if (element.className && typeof element.className === 'string') {
      const classes = element.className.trim().split(/\s+/).join('.');
      return `${element.tagName.toLowerCase()}.${classes}`;
    }
    
    return element.tagName.toLowerCase();
  }
  
  public updateMetrics(metrics: Partial<PerformanceMetrics>) {
    this.metrics = { ...this.metrics, ...metrics };
  }
  
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }
  
  public getSessionData() {
    return { ...this.sessionData };
  }
  
  private reportPerformanceMetrics() {
    // Send to analytics endpoint
    if (typeof window !== 'undefined') {
      const analyticsData = {
        sessionId: this.sessionData.sessionId,
        timestamp: Date.now(),
        metrics: this.metrics,
        url: window.location.href,
        userAgent: navigator.userAgent
      };
      
      // In production, send to analytics server
      // This is a mock implementation - would connect to actual analytics service
      console.debug('[Performance Metrics]', analyticsData);
    }
  }
  
  private reportMetric(name: string, value: number) {
    if (typeof window !== 'undefined') {
      const metricData = {
        type: 'metric',
        name,
        value,
        sessionId: this.sessionData.sessionId,
        timestamp: Date.now(),
        url: window.location.href
      };
      
      console.debug(`[Core Web Vital] ${name}:`, value);
    }
  }
  
  private logError(error: ErrorLog) {
    this.sessionData.errors.push(error);
    
    // Send to error tracking service
    console.error('[Error Logged]', error);
    
    // In production, send to error tracking service like Sentry
    // This is a mock implementation
    this.sendErrorData(error);
  }
  
  private sendErrorData(error: ErrorLog) {
    // In a real implementation, this would send to an error tracking service
    // For example, to a custom endpoint or third-party service
    console.debug('[Sending Error Data]', error);
  }
  
  private sendInteractionData(interaction: UserInteraction) {
    // In a real implementation, this would send to an analytics service
    console.debug('[Sending Interaction Data]', interaction);
  }
  
  public trackPageView() {
    this.sessionData.pageViews++;
    
    // Track page view
    const pageViewData = {
      sessionId: this.sessionData.sessionId,
      pageUrl: window.location.href,
      pageTitle: document.title,
      timestamp: Date.now(),
      referrer: document.referrer
    };
    
    console.debug('[Page View Tracked]', pageViewData);
  }
  
  public trackEvent(eventName: string, properties: Record<string, any> = {}) {
    // Track custom events
    const eventData = {
      sessionId: this.sessionData.sessionId,
      eventName,
      properties,
      timestamp: Date.now(),
      url: window.location.href
    };
    
    console.debug('[Event Tracked]', eventData);
  }
  
  public destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }
  }
}

// React hook for monitoring
export const useMonitoring = () => {
  const monitoringRef = useRef<MonitoringSystem | null>(null);
  
  useEffect(() => {
    monitoringRef.current = new MonitoringSystem();
    
    // Track initial page view
    if (monitoringRef.current) {
      monitoringRef.current.trackPageView();
    }
    
    return () => {
      if (monitoringRef.current) {
        monitoringRef.current.destroy();
      }
    };
  }, []);
  
  return {
    updateMetrics: (metrics: Partial<PerformanceMetrics>) => {
      if (monitoringRef.current) {
        monitoringRef.current.updateMetrics(metrics);
      }
    },
    trackEvent: (eventName: string, properties: Record<string, any> = {}) => {
      if (monitoringRef.current) {
        monitoringRef.current.trackEvent(eventName, properties);
      }
    },
    trackPageView: () => {
      if (monitoringRef.current) {
        monitoringRef.current.trackPageView();
      }
    },
    getMetrics: () => {
      if (monitoringRef.current) {
        return monitoringRef.current.getMetrics();
      }
      return null;
    }
  };
};