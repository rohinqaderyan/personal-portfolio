# Deployment Guide

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
