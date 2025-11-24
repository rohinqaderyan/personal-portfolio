import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Share2 } from 'lucide-react'
import { Section } from '@/components/Section'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { getAllProjects, getProjectById, getProjectPost } from '@/lib/content'
import { getSiteConfig } from '@/lib/content'
import { generateProjectMetadata } from '@/lib/seo'
import { getLinkedInShareUrl, getConfig } from '@/lib/config'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    slug: project.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = getProjectById(params.slug)
  const config = getSiteConfig()

  if (!project) {
    return {}
  }

  return generateProjectMetadata(project.title, project.description, config, project.id)
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectById(params.slug)
  const projectPost = getProjectPost(params.slug)
  const config = getSiteConfig()
  const appConfig = getConfig()

  if (!project) {
    notFound()
  }

  const projectUrl = `${appConfig.siteUrl}/projects/${project.id}`
  const linkedInShareUrl = getLinkedInShareUrl(projectUrl, appConfig)

  return (
    <>
      <Section className="pt-24">
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground focus-ring rounded"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
        </div>

        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mb-6 text-xl text-muted-foreground">{project.description}</p>

          {/* Meta info */}
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {project.year}
            </span>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline focus-ring rounded"
              >
                <ExternalLink className="h-4 w-4" />
                View Live Demo
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground focus-ring rounded"
              >
                <Github className="h-4 w-4" />
                View Code
              </a>
            )}
            <a
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground focus-ring rounded"
            >
              <Share2 className="h-4 w-4" />
              Share on LinkedIn
            </a>
          </div>

          {/* Tags */}
          <div className="mb-12 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Project content */}
          {projectPost ? (
            <MarkdownRenderer content={projectPost.content} />
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-semibold">Overview</h2>
                <p className="text-muted-foreground">
                  {project.longDescription || project.description}
                </p>
              </div>

              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h2 className="mb-4 text-2xl font-semibold">Key Highlights</h2>
                  <ul className="space-y-3">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
