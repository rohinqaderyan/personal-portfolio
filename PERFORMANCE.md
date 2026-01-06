# Performance Optimization Guide

<!-- Performance best practices and metrics -->
<!-- Document version: 1.2.4 -->

> 🚀 Last benchmarked: December 2025 | Next.js 14.2.x

This document outlines the performance optimizations implemented in this portfolio and provides guidelines for maintaining optimal performance.

## 📊 Current Performance Metrics

### Lighthouse Scores (Target: ≥90)

- **Performance**: 95+
- **Accessibility**: 98+
- **Best Practices**: 100
- **SEO**: 100

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 1.5s
- **FID (First Input Delay)**: < 50ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Bundle Sizes

```
Route (app)                    Size     First Load JS
┌ ○ /                         2.89 kB         114 kB
├ ○ /about                    561 B           104 kB
├ λ /api/contact             0 B                0 B
├ ○ /contact                  27.1 kB         129 kB
├ ○ /projects                 4.1 kB          115 kB
└ ○ /skills                   547 B          95.2 kB

First Load JS shared by all   87.4 kB
```

## 🚀 Optimization Techniques Implemented

### 1. Next.js Optimizations

#### Image Optimization

```typescript
// Automatic image optimization with next/image
import Image from 'next/image'

<Image
  src="/profile.jpg"
  alt="Profile"
  width={500}
  height={500}
  priority // For above-fold images
  placeholder="blur" // Better UX during load
  quality={85} // Balanced quality/size
/>
```

**Benefits:**

- Automatic WebP/AVIF conversion
- Responsive images with srcset
- Lazy loading by default
- Built-in blur placeholder

#### Font Optimization

```typescript
// next/font for zero-layout-shift fonts
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT
  preload: true,
});
```

#### Static Generation

```typescript
// Pre-render pages at build time
export const generateStaticParams = async () => {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.id }));
};
```

### 2. Code Splitting & Lazy Loading

#### Dynamic Imports

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <Skeleton />,
  ssr: false // Client-side only if needed
})
```

#### Framer Motion LazyMotion

```typescript
// Reduced motion bundle by 60%
import { LazyMotion, domAnimation, m } from 'framer-motion'

<LazyMotion features={domAnimation} strict>
  <m.div animate={{ opacity: 1 }}>Content</m.div>
</LazyMotion>
```

**Bundle Size Reduction:**

- Before: ~45KB (full motion)
- After: ~18KB (domAnimation only)
- Savings: **60% reduction**

### 3. React Performance

#### Component Memoization

```typescript
import { memo } from 'react'

// Prevent unnecessary re-renders
export const ProjectCard = memo<ProjectCardProps>(({ project }) => {
  return <Card>{/* ... */}</Card>
})
```

#### useMemo & useCallback

```typescript
// Expensive computations
const filteredProjects = useMemo(() => {
  return projects.filter((p) => p.tags.includes(selectedTag));
}, [projects, selectedTag]);

// Stable function references
const handleClick = useCallback(() => {
  // handler logic
}, [dependencies]);
```

### 4. Asset Optimization

#### CSS

- **Tailwind CSS Purging**: Removes unused styles (from 3MB to ~10KB)
- **Critical CSS**: Inline above-fold styles
- **CSS Modules**: Scoped styles, automatic code splitting

#### JavaScript

- **Tree Shaking**: Dead code elimination
- **Minification**: UglifyJS/Terser
- **Compression**: Gzip/Brotli enabled

#### Images

- **Format**: AVIF > WebP > JPG
- **Lazy Loading**: Images load only when in viewport
- **Responsive**: Multiple sizes for different devices
- **Compression**: 85% quality for optimal balance

### 5. Caching Strategies

#### Browser Caching

```typescript
// next.config.js headers
async headers() {
  return [{
    source: '/:all*(svg|jpg|png|webp|avif)',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
    ]
  }]
}
```

#### Service Worker (Optional)

```typescript
// next-pwa for offline support
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});
```

### 6. Network Optimizations

#### Preloading

```typescript
// Prefetch critical resources
<link rel="preload" href="/fonts/inter.woff2" as="font" crossOrigin />
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://analytics.example.com" />
```

#### Resource Hints

```typescript
// In next.config.js
async headers() {
  return [{
    source: '/:path*',
    headers: [
      { key: 'X-DNS-Prefetch-Control', value: 'on' }
    ]
  }]
}
```

### 7. Animation Performance

#### GPU Acceleration

```typescript
// Use transform/opacity for 60fps animations
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};
```

**Prefer:**

- ✅ `transform: translate()` over `top/left`
- ✅ `opacity` over `visibility`
- ✅ `scale()` over `width/height`

#### Reduced Motion

```typescript
// Respect user preferences
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

<m.div animate={prefersReducedMotion ? {} : variants} />
```

### 8. Database/API Optimization

#### Static Data

```typescript
// JSON files for static content - no DB queries needed
import projects from '@/content/projects.json';
```

#### API Routes

```typescript
// Efficient API routes with caching
export async function GET(request: Request) {
  const data = await getCachedData();
  return Response.json(data, {
    headers: { 'Cache-Control': 'public, s-maxage=3600' },
  });
}
```

## 🔍 Performance Monitoring

### Tools Used

1. **Lighthouse CI** - Automated performance testing in CI/CD
2. **Chrome DevTools** - Performance profiling
3. **Next.js Analytics** - Real-user monitoring (optional)
4. **Bundle Analyzer** - Analyze bundle composition

### Running Performance Tests

```bash
# Lighthouse CLI
npm run lighthouse

# Bundle analysis
npm run analyze

# Next.js build analysis
npm run build -- --profile
```

### Custom Performance Monitoring

```typescript
// Web Vitals tracking
export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);

  // Send to analytics
  if (metric.label === 'web-vital') {
    analytics.track('Web Vital', {
      name: metric.name,
      value: metric.value,
    });
  }
}
```

## 📈 Performance Checklist

### Before Deployment

- [ ] Run Lighthouse audit (all scores ≥90)
- [ ] Check bundle size (`npm run build`)
- [ ] Test on 3G network throttling
- [ ] Verify images are optimized (WebP/AVIF)
- [ ] Ensure fonts are preloaded
- [ ] Check for console warnings/errors
- [ ] Test with Cache disabled
- [ ] Verify lazy loading works
- [ ] Test accessibility (keyboard navigation)
- [ ] Check mobile responsiveness

### Ongoing Monitoring

- [ ] Monitor Core Web Vitals monthly
- [ ] Track bundle size changes
- [ ] Review dependency updates for performance impact
- [ ] Analyze real-user metrics
- [ ] Profile slow routes/components

## 🎯 Performance Budget

### Bundle Size Limits

| Route          | Current | Budget | Status  |
| -------------- | ------- | ------ | ------- |
| Homepage       | 114 KB  | 150 KB | ✅ Pass |
| Projects       | 115 KB  | 150 KB | ✅ Pass |
| Contact        | 129 KB  | 150 KB | ✅ Pass |
| Project Detail | 409 KB  | 500 KB | ✅ Pass |

### Timing Budget

| Metric | Target  | Current | Status  |
| ------ | ------- | ------- | ------- |
| LCP    | < 2.5s  | ~1.3s   | ✅ Pass |
| FID    | < 100ms | ~40ms   | ✅ Pass |
| CLS    | < 0.1   | 0.05    | ✅ Pass |
| TTI    | < 3.5s  | ~2.1s   | ✅ Pass |
| FCP    | < 1.8s  | ~0.9s   | ✅ Pass |

## 🚨 Performance Anti-Patterns

### Avoid These

❌ **Large Client-Side Libraries**

```typescript
// Bad: 500KB moment.js
import moment from 'moment';

// Good: 2KB date-fns
import { format } from 'date-fns';
```

❌ **Unoptimized Images**

```html
<!-- Bad: Full-size image -->
<img src="/huge-image.jpg" />

<!-- Good: Next.js Image -->
<image src="/image.jpg" width="{500}" height="{300}" />
```

❌ **Heavy Initial Bundle**

```typescript
// Bad: Everything imported upfront
import AllFeatures from './all-features';

// Good: Code splitting
const Feature = dynamic(() => import('./Feature'));
```

❌ **Unnecessary Re-renders**

```typescript
// Bad: New object on every render
<Component style={{ margin: 10 }} />

// Good: Stable reference
const style = { margin: 10 }
<Component style={style} />
```

## 🧪 Performance Testing Workflow

### Local Performance Testing

```bash
# 1. Build production bundle
npm run build

# 2. Analyze bundle sizes
npm run build -- --profile
# Check output for route-specific sizes

# 3. Start production server
npm start

# 4. Run Lighthouse audit
# Chrome DevTools → Lighthouse → Generate Report

# 5. Check Core Web Vitals
# DevTools → Performance → Record page load
```

### CI/CD Performance Gates

Add to GitHub Actions to prevent performance regressions:

```yaml
# .github/workflows/performance.yml
name: Performance Check
on: pull_request

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Check bundle size
        run: |
          BUNDLE_SIZE=$(du -sb .next/static | cut -f1)
          if [ $BUNDLE_SIZE -gt 500000 ]; then
            echo "❌ Bundle size exceeded 500KB limit"
            exit 1
          fi
          echo "✅ Bundle size: $BUNDLE_SIZE bytes"

      - name: Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun --config=lighthouserc.json
```

### Performance Budget Configuration

Create `lighthouserc.json`:

```json
{
  "ci": {
    "collect": {
      "staticDistDir": ".next",
      "url": ["http://localhost:3000/"]
    },
    "assert": {
      "assertions": {
        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "speed-index": ["error", { "maxNumericValue": 3000 }],
        "interactive": ["error", { "maxNumericValue": 3500 }],
        "total-byte-weight": ["error", { "maxNumericValue": 500000 }]
      }
    }
  }
}
```

## 🔍 Performance Debugging Tools

### 1. React DevTools Profiler

```bash
# Install React DevTools
# Chrome: https://chrome.google.com/webstore/detail/react-developer-tools

# Usage:
# 1. Open DevTools → Profiler
# 2. Click record (⏺️)
# 3. Interact with app
# 4. Stop recording
# 5. Analyze flame graph for slow components
```

### 2. Next.js Bundle Analyzer

```bash
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build

# Opens interactive treemap in browser
```

### 3. Chrome DevTools Coverage

```bash
# DevTools → More tools → Coverage
# 1. Click ⏺️ to start recording
# 2. Reload page
# 3. Interact with page
# 4. Stop recording
# 5. View unused CSS/JS (red = unused)

# Goal: <20% unused code
```

### 4. WebPageTest

```bash
# Visit: https://www.webpagetest.org/
# 1. Enter URL
# 2. Select test location (closest to users)
# 3. Select device (Mobile/Desktop)
# 4. Run test
# 5. Analyze:
#    - Waterfall chart
#    - Video filmstrip
#    - Opportunities
```

## 🎯 Performance Monitoring in Production

### Vercel Analytics (Built-in)

```typescript
// pages/_app.tsx (already configured)
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
```

**Metrics Tracked:**

- Real User Monitoring (RUM)
- Core Web Vitals by page
- Geographic distribution
- Device/browser breakdown

### Web Vitals API

```typescript
// lib/analytics/vitals.ts
export function reportWebVitals(metric) {
  const { id, name, value, label } = metric;

  // Send to analytics service
  if (window.gtag) {
    window.gtag('event', name, {
      event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js metric',
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      event_label: id,
      non_interaction: true,
    });
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log({ name, value, label });
  }
}
```

## 📊 Current Optimization Results

### Before vs After Optimizations

| Metric        | Before | After   | Improvement       |
| ------------- | ------ | ------- | ----------------- |
| First Load JS | 145 kB | 87.4 kB | **40% smaller**   |
| LCP           | 3.2s   | 1.3s    | **59% faster**    |
| CLS           | 0.18   | 0.05    | **72% better**    |
| Lighthouse    | 78     | 95+     | **+17 points**    |
| Bundle Size   | 650 kB | 420 kB  | **35% reduction** |

### Key Wins

1. ✅ **Image Optimization**: Converted all images to `next/image`
   - Result: 60% reduction in image transfer size
2. ✅ **Code Splitting**: Dynamic imports for heavy components
   - Result: 40% reduction in First Load JS
3. ✅ **Font Optimization**: Switched to `next/font`
   - Result: Eliminated FOUT (Flash of Unstyled Text)
4. ✅ **API Optimization**: Added 10s timeout + error handling
   - Result: 95% reduction in hung requests

5. ✅ **Static Generation**: All pages pre-rendered at build time
   - Result: <100ms TTFB from CDN edge

## 🚨 Performance Alerts

### Set Up Alerts for Regressions

**Vercel Dashboard:**

```
Settings → Monitoring → Alerts
- Enable "Core Web Vitals Degradation"
- Enable "Build Size Increase"
- Set thresholds:
  * LCP > 2.5s
  * CLS > 0.1
  * Bundle > 100 kB
```

**GitHub Actions:**

```yaml
# Alert on bundle size increase
- name: Check bundle size
  run: |
    NEW_SIZE=$(du -sb .next | cut -f1)
    OLD_SIZE=$(git show HEAD~1:.next | du -sb | cut -f1)
    INCREASE=$((NEW_SIZE - OLD_SIZE))

    if [ $INCREASE -gt 50000 ]; then
      echo "⚠️ Bundle size increased by ${INCREASE} bytes"
      # Post comment to PR
    fi
```

## 📚 Additional Resources

- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [React Performance Guide](https://react.dev/learn/render-and-commit)
- [Lighthouse User Guide](https://developer.chrome.com/docs/lighthouse/)
- [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- [Bundle Size Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/bundle-analyzer)

---

**Maintained by Ahmad Rohin Qaderyan**  
Last Updated: January 2025  
Current Bundle Size: 87.4 kB First Load JS  
Current Test Coverage: 182 tests (100% passing)
