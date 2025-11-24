import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/Hero'
import type { SiteConfig } from '@/lib/content'

const mockConfig: SiteConfig = {
  name: 'John Doe',
  role: 'Senior Developer',
  location: 'San Francisco',
  email: 'john@example.com',
  bio: 'Test bio',
  tagline: 'Test tagline',
  resumeFile: '/resume.pdf',
  social: {
    linkedin: 'https://linkedin.com/in/test',
    github: 'https://github.com/test',
    email: 'john@example.com',
  },
  features: {
    enableLinkedInEmbed: false,
    showPublications: false,
    showCertifications: false,
  },
  analytics: {
    plausibleEnabled: false,
    gaEnabled: false,
  },
  seo: {
    title: 'Test',
    description: 'Test',
    keywords: [],
    ogImage: '/og.png',
  },
  about: {
    headline: 'Test',
    paragraphs: [],
    highlights: [],
  },
}

describe('Hero Component', () => {
  it('renders name correctly', () => {
    render(<Hero config={mockConfig} />)
    expect(screen.getByText(/John/i)).toBeDefined()
  })

  it('renders role', () => {
    render(<Hero config={mockConfig} />)
    expect(screen.getByText('Senior Developer')).toBeDefined()
  })

  it('renders tagline', () => {
    render(<Hero config={mockConfig} />)
    expect(screen.getByText('Test tagline')).toBeDefined()
  })

  it('renders bio', () => {
    render(<Hero config={mockConfig} />)
    expect(screen.getByText('Test bio')).toBeDefined()
  })

  it('renders CTA buttons', () => {
    render(<Hero config={mockConfig} />)
    expect(screen.getByText('View My Work')).toBeDefined()
    expect(screen.getByText('Get In Touch')).toBeDefined()
  })
})
