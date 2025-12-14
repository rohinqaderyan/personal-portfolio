/**
 * Experience Page
 * @description Work history and career timeline
 */
import { Section } from '@/components/Section';
import { getAllExperience, getSiteConfig } from '@/lib/content';
import { generateMetadata as genMeta } from '@/lib/seo';
import { formatDateRange, calculateDuration } from '@/lib/utils';
import { MapPin, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

const config = getSiteConfig();

export const metadata: Metadata = genMeta(
  'Experience',
  `Work experience and career history of ${config.name}`,
  config,
  '/experience'
);

export default function ExperiencePage() {
  const experiences = getAllExperience();

  return (
    <Section
      title="Work Experience"
      description="My professional journey and achievements"
      className="pt-24"
    >
      <div className="mx-auto max-w-4xl">
        <div className="relative space-y-12">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 h-full w-px bg-border md:left-[29px]" />

          {experiences.map((experience) => (
            <div key={experience.id} className="relative pl-0 md:pl-16">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 hidden h-[15px] w-[15px] rounded-full border-4 border-background bg-primary md:left-[22px] md:block" />

              <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="mb-1 text-xl font-semibold">{experience.role}</h3>
                  <p className="mb-2 text-lg text-primary">{experience.company}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDateRange(
                          experience.startDate,
                          experience.endDate,
                          experience.current
                        )}{' '}
                        • {calculateDuration(experience.startDate, experience.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-4 text-muted-foreground">{experience.description}</p>

                {/* Responsibilities */}
                {experience.responsibilities && experience.responsibilities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold">Key Responsibilities:</h4>
                    <ul className="space-y-2">
                      {experience.responsibilities.map((responsibility, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {experience.technologies && experience.technologies.length > 0 && (
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {experience.achievements && experience.achievements.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold">Achievements:</h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
