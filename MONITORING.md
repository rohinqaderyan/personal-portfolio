# Monitoring & Observability

## Overview

This guide covers monitoring, logging, and observability for your portfolio.

## Vercel Analytics

### Setup

1. Enable Vercel Analytics in your project dashboard
2. Add the environment variable:
   ```
   NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_id
   ```

### Metrics Tracked

- **Page views**
- **Unique visitors**
- **Web Vitals (CLS, FID, LCP)**
- **Geographic distribution**
- **Device breakdown**

## Google Analytics

### Setup

1. Create a GA4 property
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### Custom Events

Track important user interactions:

```typescript
import { trackEvent } from '@/lib/analytics'

// Track downloads
trackEvent('resume_download', { format: 'pdf' })

// Track contact form
trackEvent('contact_form_submit', { source: 'contact_page' })

// Track project views
trackEvent('project_view', { project_id: 'project-name' })
```

## Error Monitoring

### Sentry Integration (Optional)

```bash
npm install @sentry/nextjs
```

Configure in `sentry.client.config.js`:

```javascript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
```

## Performance Monitoring

### Lighthouse CI

Automated performance testing runs on every deployment:

```bash
npm run lighthouse
```

### Web Vitals Tracking

Monitor Core Web Vitals:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## Logging

### Development Logs

```typescript
// Use structured logging
console.log('[INFO]', 'User action', { userId, action })
console.error('[ERROR]', 'API failed', { endpoint, error })
```

### Production Logs

View logs in Vercel dashboard:

1. Go to project → Deployments
2. Click deployment → Functions
3. View real-time logs

## Uptime Monitoring

### UptimeRobot (Free)

1. Sign up at uptimerobot.com
2. Add HTTP(s) monitor
3. URL: https://yourdomain.com
4. Check interval: 5 minutes
5. Alert contacts: Your email

### Vercel Status

Built-in health checks:

- Automatic failure detection
- Email notifications
- Status page integration

## Custom Metrics Dashboard

### KPIs to Track

1. **Traffic Metrics**
   - Daily/Weekly/Monthly visitors
   - Top pages
   - Traffic sources

2. **Engagement Metrics**
   - Average session duration
   - Bounce rate
   - Pages per session

3. **Conversion Metrics**
   - Resume downloads
   - Contact form submissions
   - GitHub profile clicks

4. **Performance Metrics**
   - Page load time
   - Time to interactive
   - Server response time

## Alerts & Notifications

### Set Up Alerts For

- ⚠️ Site downtime (>1 minute)
- ⚠️ Error rate spike (>5%)
- ⚠️ Performance degradation (LCP >4s)
- ⚠️ Traffic anomalies

### Notification Channels

- Email
- Slack
- SMS (critical only)

## Best Practices

1. **Monitor actively** - Check dashboard weekly
2. **Set realistic thresholds** - Avoid alert fatigue
3. **Document incidents** - Learn from issues
4. **Regular audits** - Review metrics monthly
5. **Privacy compliance** - Respect user privacy
