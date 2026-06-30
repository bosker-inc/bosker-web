'use client';

import { useEffect } from 'react';
import { measureWebVitals, observePerformance } from '@/lib/performance';

/**
 * Performance monitoring component
 * Add to your root layout to enable performance tracking
 *
 * Usage:
 * <PerformanceMonitor />
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // Measure Web Vitals (LCP, FID, CLS, etc.)
    measureWebVitals();

    // Observe performance entries
    const observer = observePerformance();

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // This component doesn't render anything
  return null;
}
