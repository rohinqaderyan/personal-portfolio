# Code Splitting

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
<!-- Reviewed 2026-02-20 -->
