# Custom Domain Setup for Vercel

<!-- Custom domain configuration -->
<!-- Version: 1.0.2 -->

> 🌐 Connect your custom domain in under 10 minutes

## Step 1: Purchase Your Domain

### Recommended Registrars:

1. **Namecheap** (https://www.namecheap.com)
   - Affordable: ~$8-15/year
   - Free WHOIS privacy
   - Easy DNS management

2. **Google Domains** (https://domains.google)
   - Clean interface
   - ~$12/year
   - Integrated with Google services

3. **Cloudflare Registrar** (https://www.cloudflare.com/products/registrar/)
   - At-cost pricing (cheapest)
   - Built-in security

4. **GoDaddy** (https://www.godaddy.com)
   - Popular choice
   - Frequent sales

## Step 2: Connect Domain to Vercel

### In Vercel Dashboard:

1. Go to your project: https://vercel.com/rohinqaderyan/personal-portfolio
2. Click **"Settings"** → **"Domains"**
3. Enter your custom domain (e.g., `rohinqaderyan.com`)
4. Click **"Add"**

### Configure DNS Records:

Vercel will show you DNS records to add. You'll need to add these in your domain registrar:

#### For Root Domain (rohinqaderyan.com):

```
Type: A
Name: @
Value: 76.76.21.21
```

#### For WWW Subdomain:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### In Your Domain Registrar (e.g., Namecheap):

1. Log into your registrar account
2. Find **DNS Management** or **Advanced DNS**
3. Add the A and CNAME records provided by Vercel
4. Save changes

**Note:** DNS propagation takes 1-48 hours (usually ~2-4 hours)

## Step 3: Verify Domain in Vercel

1. Wait for DNS propagation
2. Vercel will automatically verify your domain
3. SSL certificate will be automatically provisioned (FREE)
4. Your site will be live at your custom domain!

## Step 4: Set as Production Domain

1. In Vercel → Settings → Domains
2. Click the **three dots** next to your domain
3. Select **"Set as Primary Domain"**
4. This redirects all traffic to your custom domain

## Free Alternatives (No Purchase Required):

### Option A: Use Free Vercel Subdomain

- Keep: `personal-portfolio-ten-ruby-92.vercel.app`
- Change to: `rohinqaderyan.vercel.app` (if available)

Steps:

1. Vercel Dashboard → Settings → General
2. Change project name to `rohinqaderyan`
3. New URL: `rohinqaderyan.vercel.app`

### Option B: Use GitHub Pages Custom Domain (Free)

- Format: `rohinqaderyan.github.io`
- Completely free through GitHub

## Recommended Budget-Friendly Approach:

**Year 1:** Use `rohinqaderyan.vercel.app` (FREE)

- Professional enough for job applications
- No cost while building portfolio
- Easy to upgrade later

**Year 2+:** Buy `rohinqaderyan.com` (~$12/year)

- More professional
- Better for personal branding
- Easier to remember

## Domain Pricing Comparison:

| Domain Extension | Average Cost/Year | Best For                     |
| ---------------- | ----------------- | ---------------------------- |
| .com             | $12-15            | Most professional, universal |
| .dev             | $12-15            | Perfect for developers       |
| .io              | $30-40            | Tech startups, trendy        |
| .tech            | $15-20            | Technology focus             |
| .me              | $20-25            | Personal branding            |
| .app             | $15-20            | Web applications             |

## Pro Tips:

1. ✅ **Check Availability First:** Use https://instantdomainsearch.com
2. ✅ **Enable WHOIS Privacy:** Protects your personal info
3. ✅ **Auto-Renew:** Don't lose your domain
4. ✅ **SSL/HTTPS:** Automatic with Vercel (FREE)
5. ✅ **Email Forwarding:** Many registrars offer free email forwarding
   - Example: contact@rohinqaderyan.com → rohin.aryain@gmail.com

## Quick Start Command (if using custom domain):

```bash
# Update your .env.local with production URL
NEXT_PUBLIC_SITE_URL=https://rohinqaderyan.com
```

Then rebuild and deploy!

<!-- Reviewed 2026-01-26 -->
