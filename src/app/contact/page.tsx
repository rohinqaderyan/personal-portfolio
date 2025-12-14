/**
 * Contact Page
 * @description Contact form and social links
 */
import { Section } from '@/components/Section';
import { ContactForm } from '@/components/ContactForm';
import { SocialIcons } from '@/components/SocialIcons';
import { getSiteConfig } from '@/lib/content';
import { generateMetadata as genMeta } from '@/lib/seo';
import { Mail, MapPin, Linkedin } from 'lucide-react';
import type { Metadata } from 'next';

const config = getSiteConfig();

export const metadata: Metadata = genMeta(
  'Contact',
  `Get in touch with ${config.name}`,
  config,
  '/contact'
);

export default function ContactPage() {
  return (
    <>
      <Section
        title="Get In Touch"
        description="I'd love to hear from you. Send me a message and I'll get back to you as soon as possible."
        className="pt-24"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm email={config.email} />
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="mb-6 text-xl font-semibold">Contact Information</h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${config.email}`}
                    className="focus-ring flex items-start gap-3 rounded text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Mail className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span>{config.email}</span>
                  </a>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span>{config.location}</span>
                  </div>
                  <a
                    href={config.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring flex items-start gap-3 rounded text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Linkedin className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-semibold">Follow Me</h3>
                <SocialIcons social={config.social} size="lg" />
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-6">
                <h4 className="mb-2 font-semibold">Availability</h4>
                <p className="text-sm text-muted-foreground">
                  I&apos;m currently open to new opportunities and interesting projects. Feel free
                  to reach out!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
