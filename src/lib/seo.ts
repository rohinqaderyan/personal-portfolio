/**
 * SEO Utilities
 * @module seo
 * @description Metadata and structured data generation
 */
import { Metadata } from 'next';
import { SiteConfig } from './content';

export function generateMetadata(
  title: string,
  description: string,
  config: SiteConfig,
  path: string = ''
): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = `${siteUrl}${path}`;
  const ogImage = `${siteUrl}${config.seo.ogImage}`;

  return {
    title: {
      default: title,
      template: `%s | ${config.name}`,
    },
    description,
    keywords: config.seo.keywords,
    authors: [{ name: config.name, url: siteUrl }],
    creator: config.name,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title,
      description,
      siteName: config.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${config.name} - ${config.role}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: config.seo.twitterHandle,
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
    icons: {
      icon: '/favicon.ico',
      shortcut: '/site-icon.png',
      apple: '/site-icon.png',
    },
    manifest: '/manifest.json',
  };
}

export function generateProjectMetadata(
  projectTitle: string,
  projectDescription: string,
  config: SiteConfig,
  projectId: string
): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = `${siteUrl}/projects/${projectId}`;
  const ogImage = `${siteUrl}${config.seo.ogImage}`;

  return {
    title: projectTitle,
    description: projectDescription,
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url,
      title: projectTitle,
      description: projectDescription,
      siteName: config.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: projectTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: projectTitle,
      description: projectDescription,
      images: [ogImage],
      creator: config.seo.twitterHandle,
    },
  };
}

export function generateStructuredData(config: SiteConfig) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config.name,
    url: siteUrl,
    image: `${siteUrl}${config.seo.ogImage}`,
    jobTitle: config.role,
    description: config.bio,
    email: config.email,
    sameAs: [config.social.linkedin, config.social.github, config.social.twitter].filter(Boolean),
    address: {
      '@type': 'PostalAddress',
      addressLocality: config.location,
    },
  };
}
