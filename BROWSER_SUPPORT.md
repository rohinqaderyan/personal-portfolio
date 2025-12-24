# Browser Support

<!-- Browser compatibility information -->

> 🌐 Tested on Chrome, Firefox, Safari, Edge | 95%+ global coverage

## Supported Browsers

### Desktop

| Browser | Version | Support Level |
| ------- | ------- | ------------- |
| Chrome  | Last 2  | ✅ Full       |
| Firefox | Last 2  | ✅ Full       |
| Safari  | Last 2  | ✅ Full       |
| Edge    | Last 2  | ✅ Full       |
| Opera   | Last 2  | ✅ Full       |

### Mobile

| Browser          | Version | Support Level |
| ---------------- | ------- | ------------- |
| iOS Safari       | Last 2  | ✅ Full       |
| Chrome Android   | Last 2  | ✅ Full       |
| Samsung Internet | Last 2  | ✅ Full       |

## Browser Features Used

### Modern JavaScript (ES2020+)

- Optional chaining (`?.`)
- Nullish coalescing (`??`)
- BigInt
- Dynamic imports

### CSS Features

- CSS Grid
- Flexbox
- CSS Variables (Custom Properties)
- CSS Animations
- backdrop-filter (glassmorphism)

### Web APIs

- Intersection Observer
- ResizeObserver
- matchMedia (responsive)
- localStorage
- fetch API

## Polyfills

Not required for supported browsers. Modern browsers have native support for all features used.

## Graceful Degradation

### No JavaScript

- Core content remains accessible
- Progressive enhancement approach
- Semantic HTML structure

### Older Browsers

Users on unsupported browsers will see:

- Standard layouts (no animations)
- System fonts
- Basic functionality

## Testing Matrix

### Cross-Browser Testing

```bash
# Using Playwright
npm run e2e

# Test specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Device Testing

- Desktop: 1920x1080, 1366x768
- Tablet: 768x1024
- Mobile: 375x667, 414x896

## Performance Targets

| Metric | Target  | Browser Support |
| ------ | ------- | --------------- |
| LCP    | < 2.5s  | All             |
| FID    | < 100ms | All             |
| CLS    | < 0.1   | All             |

## Known Issues

### Safari

- backdrop-filter may have rendering issues on some versions
- Smooth scrolling behavior may differ

### Firefox

- Some CSS animations may render slightly differently

## Recommendations

For best experience:

- Use latest Chrome, Firefox, Safari, or Edge
- Enable JavaScript
- Minimum screen width: 320px
- Stable internet connection

## Future Considerations

- Monitor browser usage analytics
- Add polyfills if needed for wider support
- Consider removing older browser support in future versions
