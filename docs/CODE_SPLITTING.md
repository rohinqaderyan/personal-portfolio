# Code Splitting

<!-- Last reviewed: 2026-04-06 -->

## Dynamic Imports

```javascript
const Component = dynamic(() => import('./Component'));
```

## Route-based Splitting

- Automatic with Next.js
- Each route is a separate chunk

## Component-based Splitting

- Split heavy components
- Load on interaction
- Use loading states

## Analysis

- Use webpack bundle analyzer
- Monitor chunk sizes
- Optimize dependencies
<!-- Reviewed: 2026-03-18 -->
