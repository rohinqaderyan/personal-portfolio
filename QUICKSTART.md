# Quick Start Guide

<!-- Fast setup instructions -->
<!-- Version: 1.0 -->

> ⏱️ Estimated setup time: **5 minutes**

Get your portfolio up and running in minutes!

## 🚀 Installation

### 1. Install Dependencies

```powershell
npm install
```

This installs all required packages including Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and testing tools.

### 2. Configure Environment

The `.env.local` file has been created with default settings. You're ready to run in development mode!

**For production**, update these values:

- `NEXT_PUBLIC_SITE_URL` - Your domain (e.g., https://yourdomain.com)
- Analytics keys (optional)

### 3. Customize Your Content

Edit the JSON files in the `/content` directory:

#### **`content/site.config.json`**

Update with your personal information:

```json
{
  "name": "Your Name",
  "role": "Your Job Title",
  "location": "Your City, State",
  "email": "your.email@example.com",
  "bio": "Your bio...",
  "social": {
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername",
    "twitter": "https://twitter.com/yourhandle",
    "email": "your.email@example.com"
  }
}
```

#### **`content/projects.json`**

Add your projects:

```json
[
  {
    "id": "my-project",
    "title": "My Awesome Project",
    "description": "Brief description",
    "tags": ["React", "TypeScript", "Next.js"],
    "link": "https://demo.com",
    "repo": "https://github.com/you/project",
    "featured": true,
    "year": 2024
  }
]
```

#### **`content/skills.json`**

Update your skills by category.

#### **`content/experience.json`**

Add your work experience.

### 4. Add Your Assets

Replace placeholder files in `/public`:

- **`Resume_Doe.pdf`** → Your resume (keep format: `Resume_YourLastName.pdf`)
- **`site-icon.png`** → Your icon/logo (192x192px or larger)
- **`og-image.png`** → Social media preview image (1200x630px)
- **`favicon.ico`** → Browser favicon (16x16 and 32x32)

### 5. Run Development Server

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio! 🎉

The page auto-updates as you edit files.

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#0ea5e9', // Change this to your brand color
        // ... other shades
      },
    },
  },
}
```

### Change Fonts

Edit `src/app/layout.tsx`:

```typescript
import { Inter, YourFont } from 'next/font/google';

const yourFont = YourFont({ subsets: ['latin'] });
```

### Add More Projects

Create detailed project pages by adding Markdown files to `/content/posts/your-project-id.md`.

## 📧 Contact Form Setup

### Option 1: Client-Only Mode (Default)

Already configured! When users submit the form, it opens their email client with pre-filled content.

### Option 2: Flask Backend Mode

For server-side email sending:

1. **Set up Flask backend**:

   ```powershell
   cd flask-backend
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Configure email provider** (see `flask-backend/README.md`):
   - Edit `flask-backend/.env`
   - Add your email API key (SendGrid, Mailgun, etc.)

3. **Run Flask server**:

   ```powershell
   python app.py
   ```

4. **Update Next.js config**:
   In `.env.local`:
   ```env
   NEXT_PUBLIC_CONTACT_MODE=flask
   FLASK_API_URL=http://localhost:5000
   ```

## 🧪 Testing

```powershell
# Run linter
npm run lint

# Format code
npm run format

# Type check
npm run type-check

# Unit tests
npm run test

# E2E tests
npm run e2e
```

## 📦 Build for Production

```powershell
npm run build
npm run start
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set environment variables
4. Deploy!

### GitHub Pages

1. Uncomment export config in `next.config.js`
2. Build: `npm run build`
3. Deploy the `out` folder

### Netlify

1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`

## 🔗 Add to LinkedIn

1. **Link in Profile**:
   - Edit LinkedIn profile → Contact Info → Add Website
   - Paste your portfolio URL

2. **Share as Post**:
   - Create post with your portfolio URL
   - LinkedIn will show your OG image preview
   - Add hashtags: #WebDevelopment #Portfolio #OpenToWork

## 📊 Analytics (Optional)

### Plausible (Privacy-Friendly)

1. Sign up at [plausible.io](https://plausible.io)
2. Add site
3. Update `.env.local`:
   ```env
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
   ```

### Google Analytics

1. Create GA4 property
2. Update `.env.local`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

## 🆘 Troubleshooting

### TypeScript Errors

Run: `npm run type-check` to see all type errors.

### Tailwind Not Working

1. Restart dev server
2. Check `tailwind.config.js` paths
3. Verify `globals.css` imports

### Build Fails

1. Run `npm run lint` to check for errors
2. Ensure all JSON files are valid
3. Check console for specific error messages

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)

## 💡 Tips

1. **Content First**: Update all content before deploying
2. **Test Everything**: Try all links, forms, and navigation
3. **Optimize Images**: Use proper image sizes for faster loading
4. **SEO**: Update meta descriptions for each page
5. **Mobile Testing**: Test on multiple devices
6. **Accessibility**: Run Lighthouse audits

## 🤝 Need Help?

- Check [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
- Open an issue on GitHub
- Review the README.md for detailed documentation

---

**You're all set!** Start customizing and make it yours. 🚀
