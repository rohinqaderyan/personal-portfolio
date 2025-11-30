/**
 * Performance monitoring utilities
 */

export function reportWebVitals(metric: any) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics
    if (window.gtag && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // Plausible
    if (window.plausible) {
      window.plausible('Web Vitals', {
        props: {
          metric: metric.name,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        },
      });
    }
  }
}

// Prefetch critical resources
export function prefetchResources() {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Prefetch critical routes
      const criticalRoutes = ['/projects', '/about', '/contact'];
      criticalRoutes.forEach(route => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        document.head.appendChild(link);
      });
    });
  }
}

// Lazy load images with Intersection Observer
export function lazyLoadImages() {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// Type declarations for analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (event: string, options?: any) => void;
  }
}
