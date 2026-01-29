# Performance Optimization Guide

<!-- Performance tips and benchmarks -->
<!-- Version: 1.1.9 -->
<!-- Last reviewed: 2026-01-29 -->

> ⚡ Lighthouse Performance: 95+ | Core Web Vitals: Passing

This portfolio is highly optimized for performance. Here are the key optimizations:

## Image Optimization

- SVG images for crisp rendering at any size
- Lazy loading for all images
- Optimized gradient backgrounds

## Code Splitting

- Dynamic imports for heavy components
- Route-based code splitting via Next.js

## Bundle Optimization

- Tree-shaking for unused code removal
- Minification and compression in production
- SWC for faster builds

## Caching Strategy

- Static asset caching (1 year)
- API route caching where applicable
- CDN distribution via Vercel

## Performance Metrics

Target Lighthouse scores:

- Performance: ≥95
- Accessibility: ≥95
- Best Practices: ≥95
- SEO: ≥95

## Monitoring

Use Vercel Analytics or Google Lighthouse CI for continuous monitoring.

<!-- Reviewed 2026-01-26 -->
