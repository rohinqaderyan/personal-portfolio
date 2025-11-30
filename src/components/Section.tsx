'use client'

import { m as motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionProps {
  id?: string
  title?: string
  description?: string
  children: ReactNode
  className?: string
  containerClassName?: string
}

export function Section({
  id,
  title,
  description,
  children,
  className = '',
  containerClassName = '',
}: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className={`mx-auto max-w-7xl px-6 lg:px-8 ${containerClassName}`}>
        {(title || description) && (
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {title && (
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            )}
            {description && (
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{description}</p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}
