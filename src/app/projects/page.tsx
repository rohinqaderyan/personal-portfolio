import { Section } from '@/components/Section'
import { ProjectsClient } from '@/components/ProjectsClient'
import { getAllProjects, getAllProjectTags } from '@/lib/content'

export default function ProjectsPage() {
  const allProjects = getAllProjects()
  const allTags = getAllProjectTags()

  return (
    <Section
      title="Projects"
      description="A collection of my work and side projects"
      className="pt-24"
    >
      <ProjectsClient allProjects={allProjects} allTags={allTags} />
    </Section>
  )
}
