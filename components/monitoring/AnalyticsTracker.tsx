// components/monitoring/AnalyticsTracker.tsx
'use client';

import { useEffect } from 'react';
import { useMonitoringContext } from '@/components/monitoring/MonitoringProvider';

interface AnalyticsTrackerProps {
  pageName: string;
  category?: string;
  customData?: Record<string, any>;
}

export const AnalyticsTracker = ({ 
  pageName, 
  category = 'page_view',
  customData = {} 
}: AnalyticsTrackerProps) => {
  const { trackEvent, trackPageView } = useMonitoringContext();

  useEffect(() => {
    // Track page view
    trackPageView();

    // Track page view event
    trackEvent('page_view', {
      category,
      label: pageName,
      ...customData
    });

    // Track time on page
    const startTime = Date.now();
    const handleBeforeUnload = () => {
      const timeSpent = (Date.now() - startTime) / 1000; // in seconds
      trackEvent('time_on_page', {
        category: 'engagement',
        value: Math.round(timeSpent),
        page: pageName
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pageName, category, customData, trackEvent, trackPageView]);

  return null; // This component doesn't render anything
};