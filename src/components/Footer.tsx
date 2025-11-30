'use client'

import Link from 'next/link'
import { SocialIcons } from './SocialIcons'
import type { SiteConfig } from '@/lib/content'

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Experience', href: '/experience' },
    { name: 'Contact', href: '/contact' },
  ],
}

interface FooterProps {
  config: SiteConfig
}

export function Footer({ config }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link
                href={item.href}
                className="focus-ring rounded text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>

        <div className="mt-10 flex justify-center">
          <SocialIcons social={config.social} size="md" />
        </div>

        <p className="mt-10 text-center text-xs leading-5 text-muted-foreground">
          &copy; {currentYear} {config.name}. Built with Next.js, TypeScript, and Tailwind CSS.
        </p>

        <p className="mt-2 text-center text-xs leading-5 text-muted-foreground">
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            Privacy Policy
          </Link>
          {' • '}
          <Link href="/terms" className="transition-colors hover:text-foreground">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  )
}
