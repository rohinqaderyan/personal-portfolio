'use client'

import { Linkedin, Github, Twitter, Mail } from 'lucide-react'
import { m as motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SocialIconsProps {
  social: {
    linkedin: string
    github: string
    twitter?: string
    email: string
  }
  size?: 'sm' | 'md' | 'lg'
  showLabels?: boolean
}

export function SocialIcons({ social, size = 'md' }: SocialIconsProps) {
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  const buttonSizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  }

  const socials = [
    {
      name: 'LinkedIn',
      href: social.linkedin,
      icon: Linkedin,
      color: 'hover:text-[#0A66C2]',
    },
    {
      name: 'GitHub',
      href: social.github,
      icon: Github,
      color: 'hover:text-foreground',
    },
    ...(social.twitter
      ? [
          {
            name: 'Twitter',
            href: social.twitter,
            icon: Twitter,
            color: 'hover:text-[#1DA1F2]',
          },
        ]
      : []),
    {
      name: 'Email',
      href: `mailto:${social.email}`,
      icon: Mail,
      color: 'hover:text-primary',
    },
  ]

  return (
    <div className="flex items-center gap-3">
      {socials.map((item, index) => (
        <motion.a
          key={item.name}
          href={item.href}
          target={item.name !== 'Email' ? '_blank' : undefined}
          rel={item.name !== 'Email' ? 'noopener noreferrer' : undefined}
          className={cn(
            'rounded-full text-muted-foreground transition-colors focus-ring',
            item.color,
            buttonSizes[size]
          )}
          aria-label={item.name}
          title={item.name}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <item.icon className={iconSizes[size]} />
        </motion.a>
      ))}
    </div>
  )
}
