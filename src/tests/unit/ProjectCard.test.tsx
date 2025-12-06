import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectCard } from '@/components/ProjectCard'
import type { Project } from '@/lib/content'

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A comprehensive test project',
  image: '/test-image.jpg',
  tags: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Testing'],
  year: 2024,
  link: 'https://example.com',
  repo: 'https://github.com/test/project',
  featured: true,
}

describe('ProjectCard Component', () => {
  it('renders project title', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Test Project')).toBeTruthy()
  })

  it('renders project year', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('2024')).toBeTruthy()
  })

  it('renders project description', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('A comprehensive test project')).toBeTruthy()
  })

  it('renders project image with correct alt text', () => {
    render(<ProjectCard project={mockProject} />)
    const image = screen.getByAltText('Test Project') as HTMLImageElement
    expect(image).toBeTruthy()
    expect(image.src).toContain('/test-image.jpg')
  })

  it('renders all project tags when count is 4 or less', () => {
    const projectWithFewTags = {
      ...mockProject,
      tags: ['React', 'TypeScript', 'Next.js'],
    }
    render(<ProjectCard project={projectWithFewTags} />)
    expect(screen.getByText('React')).toBeTruthy()
    expect(screen.getByText('TypeScript')).toBeTruthy()
    expect(screen.getByText('Next.js')).toBeTruthy()
  })

  it('shows +N indicator when tags exceed 4', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('+1')).toBeTruthy()
  })

  it('renders demo link when project has link', () => {
    render(<ProjectCard project={mockProject} />)
    const demoLink = screen.getByText('Demo').closest('a')
    expect(demoLink).toBeTruthy()
    expect(demoLink?.href).toContain('example.com')
  })

  it('renders code link when project has repo', () => {
    render(<ProjectCard project={mockProject} />)
    const codeLink = screen.getByText('Code').closest('a')
    expect(codeLink).toBeTruthy()
    expect(codeLink?.href).toContain('github.com/test/project')
  })

  it('does not render demo link when project has no link', () => {
    const projectWithoutLink = { ...mockProject, link: undefined }
    render(<ProjectCard project={projectWithoutLink} />)
    expect(screen.queryByText('Demo')).toBeFalsy()
  })

  it('does not render code link when project has no repo', () => {
    const projectWithoutRepo = { ...mockProject, repo: undefined }
    render(<ProjectCard project={projectWithoutRepo} />)
    expect(screen.queryByText('Code')).toBeFalsy()
  })

  it('does not render image when project has no image', () => {
    const projectWithoutImage = { ...mockProject, image: undefined }
    render(<ProjectCard project={projectWithoutImage} />)
    expect(screen.queryByAltText('Test Project')).toBeFalsy()
  })

  it('wraps in a link to project detail page', () => {
    render(<ProjectCard project={mockProject} />)
    const link = screen.getByText('Test Project').closest('a')?.closest('a')
    expect(link?.href).toContain('/projects/test-project')
  })
})
