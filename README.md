# Ahmad Rohin Qaderyan - Portfolio Website

<!-- Last updated: 2026-02-19 -->

A modern, high-performance personal portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Optimized for FAANG-level technical interviews and showcasing enterprise-scale projects.

[![CI/CD Pipeline](https://github.com/rohinqaderyan/personal-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/rohinqaderyan/personal-portfolio/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-1.3.1-green)](https://github.com/rohinqaderyan/personal-portfolio/releases/tag/v1.3.1)
[![Live Demo](https://img.shields.io/badge/Demo-Live-success)](https://rqdev.vercel.app)

![Portfolio Screenshot](public/og-image.png)

## ✨ Features

### Design & UX

- 🎨 **Modern Design**: Clean, minimal interface with smooth animations and glassmorphism effects
- 🌓 **Dark/Light Mode**: Persistent theme switching with system preference support
- 📱 **Fully Responsive**: Optimized for all device sizes (mobile, tablet, desktop)
- ♿ **Accessible**: WCAG 2.1 AA compliant with proper ARIA labels and keyboard navigation
- 🎭 **Stunning Visuals**: Professional gradient project images with modern design standards

### Performance & SEO

- ⚡ **Lightning Fast**: Lighthouse scores ≥90 across all metrics
- 🔍 **SEO Optimized**: Open Graph and Twitter Card meta tags for rich social sharing
- 📊 **Analytics Ready**: Plug-and-play support for Vercel Analytics and Google Analytics
- 🗜️ **Optimized Assets**: Image optimization, code splitting, and lazy loading

### Technical Features

- 💼 **LinkedIn Integration**: Profile linking, rich previews, and share buttons
- 📝 **Content Management**: Easy-to-edit JSON files for projects, skills, and experience
- 📧 **Flexible Contact Form**: Support for Flask backend or client-side mailto fallback
- 🧪 **Fully Tested**: Unit tests (Vitest) and E2E tests (Playwright)
- 🔒 **Security Headers**: CSP, XSS protection, and secure defaults
- 🌐 **Cross-Browser**: Tested on Chrome, Firefox, Safari, Edge

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/personal-portfolio.git
   cd personal-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   copy .env.example .env.local
   ```

   Edit `.env.local` with your configuration (see [Configuration](#configuration) below).

4. **Update content**
   Edit the JSON files in the `/content` directory:
   - `site.config.json` - Personal information, social links, site settings
   - `projects.json` - Your portfolio projects
   - `skills.json` - Your technical skills grouped by category
   - `experience.json` - Your work experience timeline

5. **Add your resume**
   Replace `public/Resume_Doe.pdf` with your actual resume (keep the naming format `Resume_YourLastName.pdf`).

6. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see your site.

## 📋 Configuration

### Environment Variables

Create a `.env.local` file from `.env.example`:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Contact Form Mode: 'flask' or 'client-only'
NEXT_PUBLIC_CONTACT_MODE=client-only

# Flask Backend URL (only needed if CONTACT_MODE=flask)
FLASK_API_URL=http://localhost:5000

# Analytics (choose one or both)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_LINKEDIN_EMBED=false
```

### Content Configuration

All content is managed through JSON files in the `/content` directory:

#### `site.config.json`

Core site settings including name, role, bio, social links, and feature flags.

#### `projects.json`

Array of project objects with:

- `id`: Unique identifier (slug-friendly)
- `title`: Project name
- `description`: Brief description
- `longDescription`: Detailed markdown content (optional)
- `tags`: Array of technology tags
- `link`: Live demo URL
- `repo`: GitHub repository URL
- `image`: Project thumbnail path

#### `skills.json`

Skills grouped by categories (Languages, Frameworks, Data/ML, Cloud/DevOps, Tools).

#### `experience.json`

Work experience with role, company, dates, location, and bullet points.

## 📧 Contact Form Setup

The portfolio supports two contact form modes:

### Mode 1: Client-Only (Default)

Uses `mailto:` links with prefilled content. No backend required.

```bash
NEXT_PUBLIC_CONTACT_MODE=client-only
```

### Mode 2: Flask Backend

Submits to a Flask microservice that sends emails via a transactional email provider.

1. Set environment variable:

   ```bash
   NEXT_PUBLIC_CONTACT_MODE=flask
   FLASK_API_URL=http://localhost:5000
   ```

2. Set up the Flask backend (see `/flask-backend/README.md`):
   ```bash
   cd flask-backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   python app.py
   ```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and import your repository
3. Configure environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically deploy on every push to your main branch.

### GitHub Pages

1. Uncomment the export configuration in `next.config.js`:

   ```js
   output: 'export',
   basePath: '/your-repo-name',
   assetPrefix: '/your-repo-name/',
   ```

2. Build and export:

   ```bash
   npm run build
   ```

3. Deploy the `out` folder to GitHub Pages

**Note**: GitHub Pages doesn't support server-side features. Contact form will work in client-only mode.

### Netlify

1. Connect your repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Set environment variables in Netlify dashboard
4. Deploy!

## 💼 Adding to LinkedIn

### 1. Add Website to Profile

1. Go to your LinkedIn profile
2. Click "Edit" on the "Contact info" section
3. Under "Websites", click "Add website"
4. Select "Portfolio" or "Personal Website"
5. Paste your portfolio URL

### 2. Share Your Portfolio

Create a post on LinkedIn:

1. Click "Start a post"
2. Paste your portfolio URL
3. LinkedIn will generate a rich preview with your Open Graph image
4. Add a brief description of your work
5. Include hashtags like #WebDevelopment #Portfolio #OpenToWork

**Pro Tip**: The Open Graph image (`public/og-image.png`) is what appears in the preview. Customize it with your name and role for maximum impact.

## 🧪 Testing

### Unit Tests

```bash
npm run test        # Run tests
npm run test:ui     # Run tests with UI
```

### E2E Tests

```bash
npm run e2e         # Run Playwright tests
npm run e2e:ui      # Run with Playwright UI
```

### Type Checking

```bash
npm run type-check
```

### Linting & Formatting

```bash
npm run lint        # ESLint
npm run format      # Prettier (auto-fix)
npm run format:check # Prettier (check only)
```

## 📁 Project Structure

```
├── public/              # Static assets
│   ├── favicon.ico
│   ├── site-icon.png
│   ├── og-image.png
│   └── Resume_Doe.pdf
├── content/             # Editable content (JSON)
│   ├── site.config.json
│   ├── projects.json
│   ├── skills.json
│   ├── experience.json
│   └── posts/          # Markdown project details (optional)
├── src/
│   ├── app/            # Next.js 14 App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx    # Home
│   │   ├── about/
│   │   ├── projects/
│   │   ├── skills/
│   │   ├── experience/
│   │   ├── contact/
│   │   └── api/        # API routes
│   ├── components/     # React components
│   ├── lib/           # Utilities
│   ├── styles/        # Global styles
│   └── tests/         # Unit and E2E tests
├── flask-backend/      # Optional Flask microservice
└── [config files]
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the primary color palette:

```js
colors: {
  primary: {
    500: '#0ea5e9', // Main brand color
    // ... other shades
  },
}
```

### Fonts

Update `src/app/layout.tsx` to use different Google Fonts or system fonts.

### Animations

Modify Framer Motion variants in components or add new ones in `tailwind.config.js`.

## 📊 Performance & Accessibility

This portfolio is built to meet high standards:

- ✅ **Lighthouse Performance**: ≥90
- ✅ **Accessibility**: ≥95 (WCAG 2.1 AA)
- ✅ **Best Practices**: ≥95
- ✅ **SEO**: ≥90

Features ensuring these scores:

- Next.js Image optimization with AVIF/WebP
- Lazy loading and code splitting
- Proper semantic HTML and ARIA labels
- Keyboard navigation support
- Color contrast ratios meeting WCAG standards
- Optimized fonts and critical CSS

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## ❓ Frequently Asked Questions

### Q: Can I use this portfolio for free?

**A:** Yes! This project is open-source under the MIT license. Feel free to fork, customize, and deploy it.

### Q: How do I add my own projects?

**A:** Edit `content/projects.json` and add your project details with title, description, tags, and links.

### Q: How do I deploy to Vercel?

**A:** Push your code to GitHub, import the repository in Vercel, and it auto-deploys. See [DEPLOYMENT.md](./DEPLOYMENT.md) for details.

### Q: How do I enable Google Analytics?

**A:** Set `gaEnabled: true` in `content/site.config.json` and add your GA_ID to `.env.local`.

### Q: Can I customize the theme?

**A:** Yes! Edit `tailwind.config.js` to modify colors, fonts, and spacing using CSS custom properties.

### Q: How do I test my changes locally?

**A:** Run `npm run dev` for development or `npm run build && npm run start` for production testing.

### Q: Is the site SEO friendly?

**A:** Yes! Includes meta tags, Open Graph support, structured data, and XML sitemap. See [SEO.md](./SEO.md).

### Q: How do I handle contact form submissions?

**A:** By default uses client-side `mailto:`. For backend processing, see [DOCKER.md](./DOCKER.md) for Flask backend setup.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)

---

## 🔗 Connect With Me

- **Email**: [rohin.aryain@gmail.com](mailto:rohin.aryain@gmail.com)
- **LinkedIn**: [Ahmad Rohin Qaderyan](https://www.linkedin.com/in/rohinqaderyan)
- **GitHub**: [@rohinqaderyan](https://github.com/rohinqaderyan)
- **Location**: Alexandria, VA

**Built with ❤️ and Next.js 14 by Ahmad Rohin Qaderyan**  
Senior Full Stack Developer & Data Scientist @ Pfizer
