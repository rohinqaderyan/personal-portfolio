# Google Analytics Setup Guide

> 📊 GA4 Integration | Real-time analytics | Privacy-focused

## Quick Start

### 1. Create Google Analytics Account

1. Go to [analytics.google.com](https://analytics.google.com)
2. Sign in with your Google account
3. Click "Start measuring"
4. Enter account name: "Rohin Qaderyan Portfolio"
5. Configure data sharing settings (recommended defaults)

### 2. Set Up Property

1. Property name: "Portfolio Website"
2. Reporting time zone: Your timezone
3. Currency: USD
4. Click "Next"

### 3. Choose Platform

1. Select "Web"
2. Enter website URL: `https://your-domain.vercel.app`
3. Enter stream name: "Portfolio Website"
4. Click "Create stream"

### 4. Get Measurement ID

1. You'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
2. Copy this ID

### 5. Add to Your Project

Open `.env.local` and update:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

(Replace `G-XXXXXXXXXX` with your actual ID)

### 6. Deploy

Push to Vercel and your analytics will start tracking!

## What You'll Track

### Automatic Events

- Page views
- Scrolls
- Outbound clicks
- File downloads
- Video engagement

### Custom Events (Built-in)

- Project views
- Contact form submissions
- Resume downloads
- LinkedIn profile clicks
- GitHub profile clicks

## Viewing Your Data

### Real-Time Reports

- See live visitors
- Current page views
- Traffic sources

### Key Metrics

- **Visitors**: Unique users
- **Sessions**: Total visits
- **Bounce Rate**: Single-page visits
- **Average Session Duration**: Time on site
- **Top Pages**: Most viewed pages
- **Traffic Sources**: Where visitors come from

### Important Reports

1. **Acquisition** → Where visitors come from
2. **Engagement** → What they do on site
3. **Demographics** → Who your visitors are
4. **Tech** → Devices and browsers used

## Privacy-Friendly Alternative: Plausible

Already configured! Plausible is:

- ✅ GDPR compliant
- ✅ No cookie banner needed
- ✅ Lightweight (< 1KB)
- ✅ Simple dashboard

### Setup Plausible

1. Go to [plausible.io](https://plausible.io)
2. Create account ($9/month)
3. Add your domain
4. It's already configured in your `.env.local`!

## Recommendations

### For Personal Portfolio

**Use Plausible** - Clean, privacy-focused, professional

### For Client Work

**Use Google Analytics** - More detailed insights, free

### Use Both?

Yes! They complement each other:

- Plausible for quick daily checks
- Google Analytics for deep analysis

## Current Configuration

Your `.env.local` has:

```bash
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=rohin-qaderyan-portfolio.vercel.app
NEXT_PUBLIC_GA_MEASUREMENT_ID=  # Add your ID here
```

## Next Steps

1. ⏳ Create Google Analytics account
2. 📋 Copy Measurement ID
3. ✏️ Update `.env.local`
4. 🚀 Deploy to Vercel
5. 📊 Monitor your traffic!

## Questions?

Google Analytics Help: [support.google.com/analytics](https://support.google.com/analytics)
