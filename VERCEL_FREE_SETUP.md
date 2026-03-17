# 🎯 Step-by-Step: Change Your Vercel Project URL (FREE)

<!-- Last reviewed: 2026-03-17 -->

<!-- Vercel free tier setup guide -->
<!-- Version: 1.0.1 -->

> 🆓 No credit card required | Free tier friendly

## Current Situation

Your current URL: `https://personal-portfolio-ten-ruby-92.vercel.app/`
Your team namespace: `rohinqaderyan.projects`

## Goal

Get a clean URL like: `https://rohinqaderyan.vercel.app/`

---

## 📍 EXACT STEPS TO FOLLOW

### Step 1: Navigate to Your Project

1. From where you are now, click the **Vercel logo** (top left) to go to Dashboard
2. You'll see a list of your projects
3. Find the project called: **"personal-portfolio"** (or similar name)
4. **Click on that project** (not the Settings, just click the project name/card)

### Step 2: Go to Project Settings

1. Once you're viewing your project, look at the top navigation tabs
2. Click the **Settings** tab (next to Deployments, Analytics, etc.)
3. You should now see **PROJECT Settings** (not Team Settings)

### Step 3: Change Project Name

In the Project Settings page, you'll see:

1. **General** section (first one)
2. Look for **"Project Name"** field
3. Current value will be something like: `personal-portfolio-ten-ruby-92` or `personal-portfolio`
4. **Change it to:** `rohinqaderyan`
5. Click **"Save"** button

### Step 4: Verify New URL

After saving:

- Your new production URL will be: `https://rohinqaderyan.vercel.app/`
- Old URLs will automatically redirect
- Takes effect immediately!

---

## 🔍 What If the Name is Taken?

If `rohinqaderyan` is already taken, try these alternatives:

1. `rohin-qaderyan` (with dash)
2. `rqaderyan` (no dash)
3. `rohinq-dev`
4. `rohinqaderyan-portfolio`
5. `rq-portfolio`

All are professional and FREE!

---

## 🎨 Visual Guide - Where to Click

```
Dashboard View:
┌─────────────────────────────────────┐
│  ◀ Vercel    [Your Projects]        │
├─────────────────────────────────────┤
│                                     │
│  📦 personal-portfolio              │ ← CLICK HERE
│     personal-portfolio-ten-r...     │
│     Last deployed 2 hours ago       │
│                                     │
└─────────────────────────────────────┘

Then in Project View:
┌─────────────────────────────────────┐
│  Overview | Deployments | Settings  │ ← CLICK Settings
├─────────────────────────────────────┤
│  General                            │
│                                     │
│  Project Name:                      │
│  [personal-portfolio-ten-ruby-92]   │ ← CHANGE THIS
│                                     │
│  [Save]                             │ ← CLICK Save
└─────────────────────────────────────┘
```

---

## ⚡ Alternative Method: Using Vercel CLI

If you prefer using the command line:

```bash
# 1. Install Vercel CLI globally (if not installed)
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Link your project
vercel link

# 4. Check current settings
vercel inspect

# 5. Set production domain alias
vercel alias set <current-url> rohinqaderyan.vercel.app
```

---

## ✅ After Changing the Name

Your URLs will be:

- **Production:** `rohinqaderyan.vercel.app`
- **Preview (branches):** `rohinqaderyan-git-<branch>.vercel.app`
- **Deployment previews:** `rohinqaderyan-<hash>.vercel.app`

All completely FREE and professional! 🚀

---

## 🆘 Troubleshooting

**Issue:** "Can't find Project Settings"

- **Solution:** Make sure you're in the PROJECT view, not Team Settings

**Issue:** "Name is taken"

- **Solution:** Try variations with dashes or add "-dev" or "-portfolio"

**Issue:** "Don't see Save button"

- **Solution:** You might not have edit permissions. Check you're logged in as the owner.

**Issue:** "Changes not reflecting"

- **Solution:** Wait 30 seconds and refresh. Vercel DNS updates are instant but browser cache might delay.

---

## 📱 Share Your New URL

Once changed, update:

- ✅ LinkedIn profile
- ✅ Resume/CV
- ✅ GitHub profile/README
- ✅ Email signature
- ✅ Business cards

Your professional portfolio URL is ready! 🎉
