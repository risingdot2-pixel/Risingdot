// lib/analytics/analyticsWrapper.ts
declare global {
  interface Window {
    gtag: any;
    hotjar: any;
    dataLayer: any[];
  }
}

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export class AnalyticsWrapper {
  private initialized = false;
  private debugMode = false;

  constructor(debug = false) {
    this.debugMode = debug;
  }

  init() {
    // Initialize based on environment variables
    if (process.env.NEXT_PUBLIC_GA_ID) {
      this.initializeGoogleAnalytics(process.env.NEXT_PUBLIC_GA_ID);
    }

    if (process.env.NEXT_PUBLIC_HOTJAR_ID) {
      this.initializeHotjar(parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID, 10));
    }

    this.initialized = true;
  }

  private initializeGoogleAnalytics(gaId: string) {
    // Load Google Analytics script dynamically
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', gaId, {
        page_path: window.location.pathname,
        debug_mode: this.debugMode
      });

      if (this.debugMode) {
        console.log('[Analytics] Google Analytics initialized with ID:', gaId);
      }
    };
  }

  private initializeHotjar(hotjarId: number) {
    // Initialize Hotjar
    const hjScript = document.createElement('script');
    hjScript.innerHTML = `
      (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h.hj.l=1*new Date();
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h.otj+'/h-embed.js?sv=';
          a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;
    
    document.head.appendChild(hjScript);

    if (this.debugMode) {
      console.log('[Analytics] Hotjar initialized with ID:', hotjarId);
    }
  }

  trackEvent(event: AnalyticsEvent) {
    if (!this.initialized) {
      if (this.debugMode) {
        console.warn('[Analytics] Analytics not initialized yet');
      }
      return;
    }

    if (window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      });

      if (this.debugMode) {
        console.log('[Analytics] Event tracked:', event);
      }
    }
  }

  trackPageView(path: string, title?: string) {
    if (!this.initialized) return;

    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
        page_path: path,
        page_title: title || document.title
      });

      if (this.debugMode) {
        console.log('[Analytics] Page view tracked:', path);
      }
    }

    // Notify Hotjar of state change
    if (window.hotjar) {
      window.hotjar('stateChange', path);
    }
  }

  trackConversion(conversionId: string, value?: number, currency?: string) {
    if (!this.initialized) return;

    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${process.env.NEXT_PUBLIC_GA_ID}/${conversionId}`,
        value: value,
        currency: currency
      });

      if (this.debugMode) {
        console.log('[Analytics] Conversion tracked:', conversionId, value);
      }
    }
  }

  setUserProperties(properties: Record<string, any>) {
    if (!this.initialized) return;

    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
        user_properties: properties
      });

      if (this.debugMode) {
        console.log('[Analytics] User properties set:', properties);
      }
    }
  }

  setUserId(userId: string) {
    if (!this.initialized) return;

    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
        user_id: userId
      });

      if (this.debugMode) {
        console.log('[Analytics] User ID set:', userId);
      }
    }
  }

  enableDebugMode() {
    this.debugMode = true;
    console.log('[Analytics] Debug mode enabled');
  }

  disableDebugMode() {
    this.debugMode = false;
    console.log('[Analytics] Debug mode disabled');
  }
}

// Singleton instance
let analyticsInstance: AnalyticsWrapper | null = null;

export const getAnalytics = (): AnalyticsWrapper => {
  if (!analyticsInstance) {
    analyticsInstance = new AnalyticsWrapper(process.env.NODE_ENV === 'development');
  }
  return analyticsInstance;
};

// React Hook for analytics
export const useAnalytics = () => {
  const analytics = getAnalytics();

  if (typeof window !== 'undefined' && !analytics.initialized) {
    analytics.init();
  }

  return analytics;
};