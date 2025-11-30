# LinkedIn Embed - How to Update

LinkedIn embeds are now **ENABLED** on your About page!

## Current Setup

A placeholder LinkedIn post is embedded. To show YOUR actual posts:

## How to Get Your LinkedIn Post Embed URL

### Method 1: From Desktop

1. Go to LinkedIn and find a post you want to embed
2. Click the **three dots (...)** in the top right of the post
3. Click **"Embed this post"**
4. Copy the embed code (looks like):

```html
<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:1234567890123456789"
```

5. Find the URL part: `urn:li:share:1234567890123456789`

### Method 2: From Post URL

1. Open your LinkedIn post
2. The URL looks like: `linkedin.com/posts/rohinqaderyan_topic-123456789`
3. The numbers at the end are part of the URN

### Method 3: Inspect Element (Easiest)

1. Open your LinkedIn post
2. Right-click on the post → "Inspect"
3. Look for `data-urn="urn:li:share:7135791898765238272"`
4. Copy that URN

## Update Your Portfolio

Edit: `content/site.config.json`

Find:

```json
"linkedInEmbedUrl": "https://www.linkedin.com/embed/feed/update/urn:li:share:7135791898765238272"
```

Replace with YOUR post URN:

```json
"linkedInEmbedUrl": "https://www.linkedin.com/embed/feed/update/urn:li:share:YOUR_URN_HERE"
```

## Which Post to Feature?

Choose a post that shows:

- ✅ Technical expertise
- ✅ Professional achievement
- ✅ Thought leadership
- ✅ Good engagement (likes/comments)

**Examples:**

- "Excited to share our new AI platform at Pfizer..."
- "Just completed cloud migration for 200+ VMs..."
- "Thoughts on the future of healthcare tech..."
- "Proud to announce [achievement/award]..."

## Multiple Posts?

Currently shows 1 post. To show more:

- Create a LinkedIn feed component (advanced)
- Or update the embed URL periodically with your latest post

## Disable Embeds

To turn off LinkedIn embeds:

```json
"enableLinkedInEmbed": false
```

## Pro Tip

**Start Posting on LinkedIn!** Share:

- Project launches
- Technical tutorials
- Industry insights
- Career milestones
- Code snippets

This will:

- Increase portfolio credibility
- Show you're active in tech community
- Give recruiters more touchpoints
- Build your personal brand

**Frequency:** 1-2 posts per week is ideal for devs

## Current Status

✅ LinkedIn embeds: **ENABLED**
⏳ Waiting for: Your actual post URN

Once you add your post URN, it will appear on your About page automatically!
