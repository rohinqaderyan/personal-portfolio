# Google Analytics - Quick Setup for Rohin

> ⏱️ Complete setup in under 10 minutes

## Step 1: Create Account (5 minutes)

1. Go to: https://analytics.google.com
2. Sign in with your Gmail (rohin.aryain@gmail.com or any Google account)
3. Click **"Start measuring"**

## Step 2: Account Setup

**Account Name:** `Rohin Qaderyan Portfolio`

- ✅ Check all data sharing settings (recommended)
- Click **"Next"**

## Step 3: Property Setup

**Property Name:** `Portfolio Website`
**Reporting Time Zone:** `(GMT-05:00) Eastern Time`
**Currency:** `United States Dollar ($)`

- Click **"Next"**

## Step 4: Business Information

**Industry Category:** `Technology`
**Business Size:** `Small` (1-10 employees)
**Click all that apply:**

- ✅ Examine user behavior
- ✅ Get baseline reports
- Click **"Next"**

## Step 5: Choose Platform

Select: **"Web"**

- Click **"Next"**

## Step 6: Data Stream Setup

**Website URL:** `https://rohin-qaderyan-portfolio.vercel.app` (update after deploying)
**Stream Name:** `Portfolio Website`

- ✅ Enable enhanced measurement (recommended)
- Click **"Create stream"**

## Step 7: Get Your Measurement ID

You'll see a screen with:

```
Measurement ID
G-XXXXXXXXXX
```

**Copy this ID!** It looks like: `G-ABC1234DEF`

## Step 8: Add to Your Project

Open: `c:\Users\qadera01\My Profile Website\.env.local`

Find this line:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

Update it to:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

(Use your actual ID)

Also enable it:

```bash
# In content/site.config.json, change:
"gaEnabled": false
# To:
"gaEnabled": true
```

## Step 9: Test It

```bash
npm run dev
# Open: http://localhost:3000
# Click around the site
```

Go back to Google Analytics:

- Click **"Reports"** → **"Realtime"**
- You should see yourself as 1 active user!

## Step 10: Deploy to Vercel

Once you see yourself in Realtime reports:

```bash
git add .
git commit -m "Add Google Analytics"
git push
```

Then in Vercel dashboard:

1. Settings → Environment Variables
2. Add: `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`
3. Redeploy

## What You'll See

### Realtime (Immediate)

- Current visitors
- Pages they're viewing
- Where they came from

### Reports (After 24 hours)

- **Acquisition**: Traffic sources (LinkedIn, GitHub, direct)
- **Engagement**: Page views, time on site
- **Demographics**: Location, devices, browsers
- **Events**: Contact clicks, resume downloads

## Custom Events Already Tracked

Your site automatically tracks:

- 📄 Page views
- 📧 Contact form submissions
- 📥 Resume downloads
- 🔗 LinkedIn profile clicks
- 🐙 GitHub profile clicks
- 📱 Project views
- ⏱️ Time on page

## Pro Tips

1. **Check Weekly**: See which projects get most views
2. **Track Sources**: Know if LinkedIn or GitHub drives traffic
3. **Monitor Bounce Rate**: Aim for < 50%
4. **Page Performance**: Find slow pages
5. **Demographics**: See where recruiters are located

## Privacy Note

You're using both:

- ✅ **Plausible** (privacy-friendly, no cookies)
- ✅ **Google Analytics** (detailed insights)

This is perfect! Plausible for daily checks, GA for deep analysis.

## Need Help?

Common issues:

- **Not seeing data?** Wait 24 hours for reports
- **Realtime not working?** Clear browser cache
- **Wrong domain?** Update in GA admin → Data Streams

---

**Ready?** Go create your account now! Takes 5 minutes.
https://analytics.google.com
