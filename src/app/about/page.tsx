/**
 * About Page
 * @description Personal bio and background information
 */
import { Section } from '@/components/Section';
import { getSiteConfig } from '@/lib/content';
import { generateMetadata as genMeta } from '@/lib/seo';
import { Download, MapPin } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

const config = getSiteConfig();

export const metadata: Metadata = genMeta(
  'About',
  `Learn more about ${config.name} - ${config.about.headline}`,
  config,
  '/about'
);

export default function AboutPage() {
  return (
    <>
      <Section title="About Me" description={config.about.headline} className="pt-24">
        <div className="mx-auto max-w-3xl space-y-6">
          {config.about.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Highlights */}
        {config.about.highlights && config.about.highlights.length > 0 && (
          <div className="mx-auto mt-12 max-w-3xl">
            <h3 className="mb-6 text-2xl font-semibold">Key Highlights</h3>
            <ul className="space-y-3">
              {config.about.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Personal Info */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span>{config.location}</span>
          </div>
          <Link
            href={config.resumeFile}
            download
            className="focus-ring inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </Link>
        </div>
      </Section>

      {/* Certifications */}
      {config.features.showCertifications &&
        config.certifications &&
        config.certifications.length > 0 && (
          <Section
            title="Certifications"
            description="Professional certifications and credentials"
            className="bg-muted/30"
          >
            <div className="mx-auto max-w-3xl space-y-4">
              {config.certifications.map((cert, index) => (
                <div key={index} className="rounded-lg border border-border bg-card p-6">
                  <h4 className="mb-1 text-lg font-semibold">{cert.name}</h4>
                  <p className="mb-2 text-sm text-muted-foreground">
                    {cert.issuer} • {cert.date}
                  </p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      View Credential →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

      {/* Publications */}
      {config.features.showPublications &&
        config.publications &&
        config.publications.length > 0 && (
          <Section title="Publications" description="Articles and writing">
            <div className="mx-auto max-w-3xl space-y-4">
              {config.publications.map((pub, index) => (
                <div key={index} className="rounded-lg border border-border bg-card p-6">
                  <h4 className="mb-1 text-lg font-semibold">{pub.title}</h4>
                  <p className="mb-2 text-sm text-muted-foreground">
                    {pub.publisher} • {pub.date}
                  </p>
                  {pub.url && (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Read Article →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}
    </>
  );
}
