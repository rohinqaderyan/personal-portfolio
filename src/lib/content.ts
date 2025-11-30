import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import hljs from 'highlight.js'

// Configure marked with syntax highlighting
marked.setOptions({
  breaks: true,
  gfm: true,
})

// Custom renderer for code blocks with syntax highlighting
const renderer = new marked.Renderer()
renderer.code = function (code: string, language: string | undefined) {
  if (language && hljs.getLanguage(language)) {
    try {
      const highlighted = hljs.highlight(code, { language }).value
      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`
    } catch (err) {
      console.error('Error highlighting code:', err)
    }
  }
  return `<pre><code>${code}</code></pre>`
}

marked.use({ renderer })

const contentDirectory = path.join(process.cwd(), 'content')

export interface SiteConfig {
  name: string
  role: string
  location: string
  email: string
  bio: string
  tagline: string
  resumeFile: string
  social: {
    linkedin: string
    github: string
    twitter?: string
    email: string
  }
  features: {
    enableLinkedInEmbed: boolean
    linkedInEmbedUrl?: string
    showPublications: boolean
    showCertifications: boolean
  }
  analytics: {
    plausibleEnabled: boolean
    gaEnabled: boolean
  }
  seo: {
    title: string
    description: string
    keywords: string[]
    ogImage: string
    twitterHandle?: string
  }
  about: {
    headline: string
    paragraphs: string[]
    highlights: string[]
  }
  certifications?: Array<{
    name: string
    issuer: string
    date: string
    credentialUrl?: string
  }>
  publications?: Array<{
    title: string
    publisher: string
    date: string
    url?: string
  }>
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  link?: string
  repo?: string
  image?: string
  featured: boolean
  year: number
  highlights?: string[]
}

export interface Skill {
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  yearsOfExperience: number
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export interface Experience {
  id: string
  role: string
  company: string
  location: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string
  responsibilities: string[]
  technologies: string[]
  achievements?: string[]
}

export interface ProjectPost {
  id: string
  content: string
  data: {
    title?: string
    description?: string
    date?: string
    [key: string]: any
  }
}

// Load site configuration
export function getSiteConfig(): SiteConfig {
  const configPath = path.join(contentDirectory, 'site.config.json')
  const fileContents = fs.readFileSync(configPath, 'utf8')
  return JSON.parse(fileContents)
}

// Load all projects
export function getAllProjects(): Project[] {
  const projectsPath = path.join(contentDirectory, 'projects.json')
  const fileContents = fs.readFileSync(projectsPath, 'utf8')
  return JSON.parse(fileContents)
}

// Get featured projects
export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured)
}

// Get a single project by ID
export function getProjectById(id: string): Project | null {
  const projects = getAllProjects()
  return projects.find((project) => project.id === id) || null
}

// Load all skills
export function getAllSkills(): { categories: SkillCategory[] } {
  const skillsPath = path.join(contentDirectory, 'skills.json')
  const fileContents = fs.readFileSync(skillsPath, 'utf8')
  return JSON.parse(fileContents)
}

// Load all experience
export function getAllExperience(): Experience[] {
  const experiencePath = path.join(contentDirectory, 'experience.json')
  const fileContents = fs.readFileSync(experiencePath, 'utf8')
  return JSON.parse(fileContents)
}

// Load markdown post for a project
export function getProjectPost(id: string): ProjectPost | null {
  try {
    const postsDirectory = path.join(contentDirectory, 'posts')
    const fullPath = path.join(postsDirectory, `${id}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const htmlContent = marked(content)

    return {
      id,
      content: htmlContent as string,
      data,
    }
  } catch (error) {
    console.error(`Error loading project post ${id}:`, error)
    return null
  }
}

// Get all unique tags from projects
export function getAllProjectTags(): string[] {
  const projects = getAllProjects()
  const tagsSet = new Set<string>()

  projects.forEach((project) => {
    project.tags.forEach((tag) => tagsSet.add(tag))
  })

  return Array.from(tagsSet).sort()
}

// Search projects by query
export function searchProjects(query: string): Project[] {
  const projects = getAllProjects()
  const lowerQuery = query.toLowerCase()

  return projects.filter((project) => {
    const matchesTitle = project.title.toLowerCase().includes(lowerQuery)
    const matchesDescription = project.description.toLowerCase().includes(lowerQuery)
    const matchesTags = project.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))

    return matchesTitle || matchesDescription || matchesTags
  })
}

// Filter projects by tag
export function filterProjectsByTag(tag: string): Project[] {
  const projects = getAllProjects()
  return projects.filter((project) =>
    project.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}
