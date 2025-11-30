import { Section } from '@/components/Section'
import { getAllSkills, getSiteConfig } from '@/lib/content'
import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'

const config = getSiteConfig()

export const metadata: Metadata = genMeta(
  'Skills',
  `Technical skills and expertise of ${config.name}`,
  config,
  '/skills'
)

export default function SkillsPage() {
  const { categories } = getAllSkills()

  const levelColors = {
    Beginner: 'bg-gray-200 dark:bg-gray-700',
    Intermediate: 'bg-blue-200 dark:bg-blue-800',
    Advanced: 'bg-green-200 dark:bg-green-800',
    Expert: 'bg-purple-200 dark:bg-purple-800',
  }

  return (
    <Section
      title="Skills & Technologies"
      description="Technologies and tools I work with"
      className="pt-24"
    >
      <div className="space-y-12">
        {categories.map((category) => (
          <div key={category.name} className="mx-auto max-w-5xl">
            <h3 className="mb-6 text-2xl font-semibold">{category.name}</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skill.name}
                  className="rounded-lg border border-border bg-card p-5 transition-all hover:shadow-md"
                  style={{
                    animationDelay: `${skillIndex * 50}ms`,
                  }}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <h4 className="font-semibold">{skill.name}</h4>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        levelColors[skill.level]
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'} of
                    experience
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
