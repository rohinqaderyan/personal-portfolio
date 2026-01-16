# Deployment Guide

<!-- Deployment instructions for multiple platforms -->
<!-- Updated: 2026-01-16 -->

> 🚀 Supports Vercel, Netlify, Docker, and self-hosted deployments

Comprehensive guide for deploying this Next.js portfolio to various platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
- [Alternative Platforms](#alternative-platforms)
- [Environment Configuration](#environment-configuration)
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring & Observability](#monitoring--observability)
- [Troubleshooting](#troubleshooting)
- [Rollback Procedures](#rollback-procedures)

## Prerequisites

Before deploying, ensure you have:

- [ ] Node.js 18+ installed locally
- [ ] npm 9+ installed
- [ ] Git configured
- [ ] All tests passing (`npm run test:run`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Environment variables documented

## Vercel Deployment (Recommended)

### Prerequisites

- GitHub account
- Vercel account (free tier is sufficient)

### Steps

1. **Fork/Clone Repository**

   ```bash
   git clone https://github.com/rohinqaderyan/personal-portfolio.git
   cd personal-portfolio
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Test Locally**

   ```bash
   npm run dev
   ```

5. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your Git repository
   - Vercel auto-detects Next.js
   - Add environment variables in Vercel dashboard
   - Deploy!

### Custom Domain Setup

1. Go to Vercel Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate auto-generated

### Environment Variables

Set these in Vercel dashboard:

- `NEXT_PUBLIC_SITE_URL` - Your production URL
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - (optional) Google Analytics
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` - (optional) Plausible Analytics

## Alternative Platforms

### Netlify

```bash
npm run build
# Deploy the .next folder
```

### AWS Amplify

- Connect Git repository
- Build settings: `npm run build`
- Publish directory: `.next`

### Docker

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## CI/CD

GitHub Actions automatically:

- Runs tests on PR
- Checks linting
- Verifies TypeScript
- Runs Lighthouse audits

## Performance Tips

- Enable Vercel Analytics for monitoring
- Use their Image Optimization
- Enable caching headers
- Minimize bundle size

## Pre-Deployment Checklist

### Code Quality

- [ ] All tests pass: `npm run test:run`
- [ ] Type check passes: `npm run type-check`
- [ ] Lint passes: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] No console.log statements in production code

### Environment

- [ ] All required environment variables documented
- [ ] Secrets not committed to repository
- [ ] `.env.example` up to date
- [ ] Production URLs configured correctly

### Performance

- [ ] Images optimized (using `next/image`)
- [ ] Bundle size under 100KB (First Load JS)
- [ ] Lighthouse score ≥90 for Performance
- [ ] Core Web Vitals within thresholds

### Security

- [ ] Dependencies audited: `npm audit`
- [ ] No known vulnerabilities in production deps
- [ ] HTTPS enforced
- [ ] Security headers configured

## Monitoring & Observability

### Vercel Analytics (Built-in)

Enable in `vercel.json`:

```json
{
  "analytics": {
    "web-vitals": true
  }
}
```

**Metrics Tracked:**

- Core Web Vitals (LCP, FID, CLS)
- Real User Monitoring (RUM)
- Page views by route
- Geographic distribution

### Error Tracking

Consider integrating:

- **Sentry**: Real-time error tracking
- **LogRocket**: Session replay
- **Datadog**: Full-stack observability

Example Sentry setup:

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Health Checks

Create a health endpoint at `/api/health`:

```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV,
  });
}
```

## Troubleshooting

### Common Issues

#### Build Fails on Vercel

**Symptom:** Build fails with memory errors

**Solution:**

```json
// vercel.json
{
  "functions": {
    "api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

#### Environment Variables Not Loading

**Symptom:** `undefined` values in production

**Checklist:**

1. Verify variables are set in Vercel dashboard
2. Check variable names start with `NEXT_PUBLIC_` for client-side access
3. Redeploy after adding new variables
4. Verify correct environment (Production/Preview/Development)

#### 404 on Direct Page Access

**Symptom:** Direct URLs return 404

**Solution:** Ensure `vercel.json` has proper rewrites:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

#### API Routes Not Working

**Symptom:** API calls fail in production

**Checklist:**

1. Check function logs in Vercel dashboard
2. Verify environment variables are set
3. Check CORS configuration
4. Verify API route file structure (`app/api/route.ts`)

### Debug Mode

Enable verbose logging:

```bash
# Set in Vercel Environment Variables
DEBUG=true
```

## Rollback Procedures

### Instant Rollback (Vercel)

1. Go to Vercel Dashboard → Deployments
2. Find the previous working deployment
3. Click "..." → "Promote to Production"
4. Verify the rollback

### Git Rollback

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit (use with caution)
git reset --hard <commit-hash>
git push --force origin main
```

### Emergency Procedures

1. **Immediate:** Rollback via Vercel dashboard
2. **Investigate:** Check error logs and metrics
3. **Fix:** Create hotfix branch
4. **Test:** Verify fix in preview deployment
5. **Deploy:** Merge and redeploy

## Advanced Configuration

### Custom Build Command

```json
// vercel.json
{
  "buildCommand": "npm run validate && npm run build",
  "installCommand": "npm ci"
}
```

### Function Configuration

```json
// vercel.json
{
  "functions": {
    "api/contact/route.ts": {
      "memory": 512,
      "maxDuration": 10
    }
  }
}
```

### Edge Functions

For faster global response:

```typescript
// src/app/api/example/route.ts
export const runtime = 'edge';

export async function GET() {
  return new Response('Hello from Edge!');
}
```

---

**Last Updated:** December 2025
**Deployment Target:** Vercel (Primary)
**Minimum Node Version:** 18.0.0
