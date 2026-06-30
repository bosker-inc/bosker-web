/**
 * Performance monitoring utilities
 * Tracks Core Web Vitals and sends to analytics
 */

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

/**
 * Send performance metrics to analytics
 */
export function reportWebVital(metric: WebVitalMetric) {
  // Only send in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('Web Vital:', metric);
    return;
  }

  // Send to your analytics service
  // Example: Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
      rating: metric.rating,
    });
  }
}

/**
 * Measure performance metrics
 */
export function measureWebVitals() {
  if (typeof window === 'undefined') return;

  // Try to use the Web Vitals library if available
  try {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(reportWebVital);
      getFID(reportWebVital);
      getFCP(reportWebVital);
      getLCP(reportWebVital);
      getTTFB(reportWebVital);
    });
  } catch (e) {
    // Web vitals not available, use fallback
    console.log('Web Vitals library not available');
  }
}

/**
 * Measure route performance
 */
export function measureRouteChange(routeName: string) {
  if (process.env.NODE_ENV !== 'production') {
    console.time(`Route: ${routeName}`);
  }

  return () => {
    if (process.env.NODE_ENV !== 'production') {
      console.timeEnd(`Route: ${routeName}`);
    }
  };
}

/**
 * Performance observer for monitoring
 */
export function observePerformance() {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Performance entry:', entry);
        }

        // Send to analytics
        if ((window as any).gtag && entry.name) {
          (window as any).gtag('event', 'performance', {
            event_category: 'performance',
            name: entry.name,
            value: entry.duration,
          });
        }
      }
    });

    // Observe long tasks
    if (PerformanceObserver.supportedEntryTypes?.includes('longtask')) {
      observer.observe({ entryTypes: ['longtask'] });
    }

    return observer;
  } catch (e) {
    // Performance Observer not supported
    return null;
  }
}

/**
 * Get performance metrics for debugging
 */
export function getPerformanceMetrics() {
  if (typeof window === 'undefined') return null;

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');

  return {
    // Navigation timings
    domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
    loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
    domInteractive: navigation?.domInteractive - navigation?.fetchStart,

    // Paint timings
    firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
    firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,

    // Resources
    resourceCount: performance.getEntriesByType('resource').length,
  };
}
