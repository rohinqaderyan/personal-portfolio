'use client';

/**
 * Hero Component
 * @description Hero section with animated introduction
 */
import { m as motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { SocialIcons } from './SocialIcons';
import Link from 'next/link';
import type { SiteConfig } from '@/lib/content';

interface HeroProps {
  config: SiteConfig;
}

export function Hero({ config }: HeroProps) {
  return (
    <section
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-12"
      aria-label="Introduction"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I&apos;m <span className="gradient-text">{config.name.split(' ')[0]}</span>
          </h1>
        </motion.div>

        <motion.p
          className="mb-4 text-2xl font-semibold text-primary sm:text-3xl"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          {config.role}
        </motion.p>

        <motion.p
          className="mb-8 text-lg text-muted-foreground sm:text-xl"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {config.tagline}
        </motion.p>

        <motion.p
          className="mx-auto mb-10 max-w-2xl text-base text-muted-foreground sm:text-lg"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {config.bio}
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link
            href="/projects"
            className="focus-ring inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
            aria-label="View my projects and portfolio work"
          >
            View My Work
          </Link>
          <Link
            href="/contact"
            className="focus-ring inline-flex items-center justify-center rounded-lg border border-border bg-background px-8 py-3 text-sm font-semibold shadow-sm transition-all hover:bg-accent hover:shadow-md"
            aria-label="Get in touch with me"
          >
            Get In Touch
          </Link>
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <SocialIcons social={config.social} size="lg" />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={false}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
