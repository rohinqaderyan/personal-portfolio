# SEO Optimization Guide

<!-- Search engine optimization guide -->
<!-- Version: 1.2.9 -->
<!-- Last reviewed: 2026-01-28 -->

> 🔍 Lighthouse SEO Score: **100/100**

## Overview

This guide covers SEO strategies implemented in the portfolio and best practices for maintaining optimal search engine visibility.

## Current SEO Status

### Core Optimizations

✅ Semantic HTML structure  
✅ Meta tags (title, description, OG, Twitter)  
✅ XML sitemap  
✅ robots.txt  
✅ Canonical URLs  
✅ Schema.org structured data  
✅ Mobile-friendly design  
✅ Fast page load times  
✅ HTTPS enabled  
✅ Clean URL structure

## Meta Tags

### Page-Level Meta

Each page should have unique meta tags:

```typescript
// app/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ahmad Rohin Qaderyan | Senior Full Stack Developer & Data Scientist',
  description:
    'Portfolio of Ahmad Rohin Qaderyan, a Senior Full Stack Developer and Data Scientist with expertise in React, Next.js, Python, and cloud technologies.',
  keywords: [
    'Full Stack Developer',
    'Data Scientist',
    'React Developer',
    'Next.js Expert',
    'Python Developer',
    'Cloud Engineer',
    'FAANG Engineer',
  ],
  authors: [{ name: 'Ahmad Rohin Qaderyan' }],
  creator: 'Ahmad Rohin Qaderyan',
  publisher: 'Ahmad Rohin Qaderyan',
  openGraph: {
    title: 'Ahmad Rohin Qaderyan | Senior Full Stack Developer',
    description: 'Portfolio showcasing full-stack development and data science projects',
    url: 'https://rqdev.vercel.app',
    siteName: 'RQ Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ahmad Rohin Qaderyan Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmad Rohin Qaderyan | Senior Full Stack Developer',
    description: 'Portfolio showcasing full-stack development and data science projects',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};
```

### Dynamic Metadata

For dynamic pages:

```typescript
// app/projects/[id]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const project = await getProject(params.id);

  return {
    title: `${project.title} | RQ Projects`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}
```

## Structured Data

### Person Schema

```typescript
// app/layout.tsx
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ahmad Rohin Qaderyan',
  alternateName: 'RQ',
  jobTitle: 'Senior Full Stack Developer & Data Scientist',
  url: 'https://rqdev.vercel.app',
  sameAs: [
    'https://linkedin.com/in/rohinqaderyan',
    'https://github.com/rohinqaderyan',
  ],
  email: 'ahmad.qaderyan@pfizer.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Alexandria',
    addressRegion: 'VA',
    addressCountry: 'US',
  },
  knowsAbout: [
    'Full Stack Development',
    'Data Science',
    'React',
    'Next.js',
    'Python',
    'TypeScript',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Project Schema

```typescript
const projectSchema = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Pharmaceutical Analytics Platform',
  description: 'Enterprise-grade analytics platform for pharmaceutical research',
  creator: {
    '@type': 'Person',
    name: 'Ahmad Rohin Qaderyan',
  },
  datePublished: '2024-01-15',
  url: 'https://rqdev.vercel.app/projects/pharma-analytics',
  keywords: ['React', 'Python', 'Data Science', 'Healthcare'],
};
```

## XML Sitemap

### Static Sitemap

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rqdev.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
```

### Dynamic Sitemap

```typescript
export default async function sitemap(): MetadataRoute.Sitemap {
  const projects = await getAllProjects();

  const projectUrls = projects.map((project) => ({
    url: `https://rqdev.vercel.app/projects/${project.id}`,
    lastModified: project.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projectUrls];
}
```

## Robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
    ],
    sitemap: 'https://rqdev.vercel.app/sitemap.xml',
  };
}
```

## URL Structure

### Best Practices

```
✅ Good URLs:
/projects
/projects/pharma-analytics
/about
/contact

❌ Bad URLs:
/p?id=123
/page.php?name=projects
/projects/123456
```

### Implementation

```typescript
// Use descriptive slugs
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');
```

## Image SEO

### Alt Text

```typescript
// ✅ Good - Descriptive
<img
  src="/projects/pharma-analytics.svg"
  alt="Pharmaceutical Analytics Platform dashboard showing patient data visualization"
/>

// ❌ Bad - Generic
<img src="/image.svg" alt="image" />
```

### Image Metadata

```typescript
<meta property="og:image" content="/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Ahmad Rohin Qaderyan Portfolio" />
```

## Content Optimization

### Heading Hierarchy

```html
<!-- ✅ Good -->
<h1>Ahmad Rohin Qaderyan</h1>
<h2>About Me</h2>
<h3>Work Experience</h3>
<h4>Senior Full Stack Developer</h4>

<!-- ❌ Bad -->
<h1>About</h1>
<h3>Experience</h3>
<h2>Projects</h2>
```

### Keyword Optimization

**Primary Keywords:**

- Full Stack Developer
- Data Scientist
- React Developer
- Next.js Expert
- Python Developer

**Long-tail Keywords:**

- Senior Full Stack Developer Alexandria VA
- FAANG software engineer portfolio
- React Next.js TypeScript developer
- Healthcare data science projects

### Content Guidelines

1. **Title Tags**: 50-60 characters
2. **Meta Descriptions**: 150-160 characters
3. **H1**: One per page, include primary keyword
4. **Content**: 300+ words minimum, natural keyword usage
5. **Internal Links**: 3-5 per page to related content
6. **External Links**: Reputable sources only

## Performance SEO

### Core Web Vitals

Google ranking factors:

```
✅ LCP (Largest Contentful Paint): < 2.5s
✅ FID (First Input Delay): < 100ms
✅ CLS (Cumulative Layout Shift): < 0.1
```

### Mobile Optimization

```typescript
// Responsive meta tag
<meta name="viewport" content="width=device-width, initial-scale=1" />

// Mobile-friendly design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## Technical SEO

### Canonical URLs

```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://rqdev.vercel.app/projects',
  },
};
```

### Hreflang Tags

For international sites:

```html
<link rel="alternate" hreflang="en" href="https://rqdev.vercel.app/en" />
<link rel="alternate" hreflang="es" href="https://rqdev.vercel.app/es" />
```

### Breadcrumbs

```typescript
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://rqdev.vercel.app',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Projects',
      item: 'https://rqdev.vercel.app/projects',
    },
  ],
};
```

## Local SEO

### Local Business Schema

```typescript
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Ahmad Rohin Qaderyan - Software Development',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Alexandria',
    addressRegion: 'VA',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.8048,
    longitude: -77.0469,
  },
};
```

## Link Building

### Internal Linking

```typescript
// Link related content
<Link href="/projects/pharma-analytics">
  View Pharmaceutical Analytics Project
</Link>

<Link href="/about#skills">
  Learn more about my skills
</Link>
```

### External Links

```typescript
// Add rel="noopener noreferrer" to external links
<a
  href="https://github.com/rohinqaderyan"
  target="_blank"
  rel="noopener noreferrer"
>
  GitHub Profile
</a>
```

## Analytics & Tracking

### Google Search Console

```typescript
// Add verification meta tag
<meta name="google-site-verification" content="your-code" />
```

### Track SEO Metrics

```typescript
// Monitor in Google Analytics
- Organic traffic
- Bounce rate
- Time on page
- Conversion rate
- Page load speed
```

## SEO Checklist

### Pre-Launch

- [ ] Unique title and description per page
- [ ] All images have alt text
- [ ] Proper heading hierarchy (H1-H6)
- [ ] XML sitemap generated
- [ ] robots.txt configured
- [ ] Schema.org markup added
- [ ] Mobile-friendly test passed
- [ ] Page speed score ≥90
- [ ] HTTPS enabled
- [ ] No broken links

### Post-Launch

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Google Analytics
- [ ] Monitor Core Web Vitals
- [ ] Check indexing status
- [ ] Monitor keyword rankings
- [ ] Review organic traffic
- [ ] Build quality backlinks

## Tools

### Analysis

- [Google Search Console](https://search.google.com/search-console)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Ahrefs](https://ahrefs.com/) (paid)
- [SEMrush](https://www.semrush.com/) (paid)

### Testing

- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

### Monitoring

- [Google Analytics](https://analytics.google.com/)
- [Vercel Analytics](https://vercel.com/analytics)
- [Cloudflare Analytics](https://www.cloudflare.com/analytics/)

## Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Next.js SEO](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org/)
- [Moz SEO Learning Center](https://moz.com/learn/seo)

## Support

SEO questions or optimization help?

- **Email**: ahmad.qaderyan@pfizer.com
- **Issues**: https://github.com/rohinqaderyan/personal-portfolio/issues
<!-- Reviewed 2026-01-26 -->
