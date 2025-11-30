import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { ProjectCard } from '@/components/ProjectCard'
import { getSiteConfig, getFeaturedProjects } from '@/lib/content'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  const config = getSiteConfig()
  const featuredProjects = getFeaturedProjects().slice(0, 3)

  return (
    <>
      <Hero config={config} />

      {/* Featured Projects */}
      <Section
        id="featured-projects"
        title="Featured Projects"
        description="A selection of my recent work"
        className="bg-muted/30"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline focus-ring rounded"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary/5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            I&apos;m always interested in hearing about new projects and opportunities.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg focus-ring"
          >
            Get in touch
          </Link>
        </div>
      </Section>
    </>
  )
}
