// components/monitoring/MonitoringProvider.tsx
'use client';

import { createContext, useContext, useEffect } from 'react';
import { useMonitoring } from '@/lib/monitoring/monitoringSystem';
import { useAnalytics } from '@/lib/analytics/analyticsWrapper';

interface MonitoringContextType {
  updateMetrics: (metrics: any) => void;
  trackEvent: (event: string, props?: Record<string, any>) => void;
  trackPageView: () => void;
  getMetrics: () => any;
}

const MonitoringContext = createContext<MonitoringContextType | undefined>(undefined);

export function MonitoringProvider({ children }: { children: React.ReactNode }) {
  const { updateMetrics, trackEvent, trackPageView, getMetrics } = useMonitoring();
  const analytics = useAnalytics();

  useEffect(() => {
    // Track initial page view
    if (analytics) {
      analytics.trackPageView(window.location.pathname, document.title);
    }
  }, [analytics]);

  useEffect(() => {
    // Track route changes if using a router
    const handleRouteChange = () => {
      if (analytics) {
        analytics.trackPageView(window.location.pathname, document.title);
      }
    };

    // Example for Next.js router - would need to implement based on routing solution
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [analytics]);

  const contextValue: MonitoringContextType = {
    updateMetrics,
    trackEvent: (event: string, props?: Record<string, any>) => {
      trackEvent(event, props);
      if (analytics) {
        analytics.trackEvent({
          action: event,
          category: props?.category || 'engagement',
          label: props?.label,
          value: props?.value
        });
      }
    },
    trackPageView,
    getMetrics
  };

  return (
    <MonitoringContext.Provider value={contextValue}>
      {children}
    </MonitoringContext.Provider>
  );
}

export function useMonitoringContext() {
  const context = useContext(MonitoringContext);
  if (context === undefined) {
    throw new Error('useMonitoringContext must be used within a MonitoringProvider');
  }
  return context;
}