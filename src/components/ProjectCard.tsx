'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card'
import type { Project } from '@/lib/content'
import { motion } from 'framer-motion'
import { memo } from 'react'

interface ProjectCardProps {
  project: Project
  index?: number
}

export const ProjectCard = memo(function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.id}`}>
        <Card hover>
          {project.image && (
            <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-md bg-muted">
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                <span className="text-4xl font-bold text-muted-foreground/20">
                  {project.title.charAt(0)}
                </span>
              </div>
            </div>
          )}
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.year}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" />
                Demo
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4" />
                Code
              </a>
            )}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
})
