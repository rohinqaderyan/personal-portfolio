/**
 * Privacy Policy Page
 * @description Legal privacy policy document
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Rohin Qaderyan',
  description: 'Privacy policy for rohinqaderyan.com',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Privacy Policy</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="lead">Last updated: December 3, 2025</p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Introduction</h2>
          <p className="text-muted-foreground">
            This privacy policy describes how I collect, use, and protect your personal information
            when you visit this website. I respect your privacy and am committed to protecting your
            personal data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Information I Collect</h2>
          <p className="mb-4 text-muted-foreground">
            I may collect the following types of information:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong>Contact Information:</strong> When you use the contact form, I collect your
              name, email address, and message content.
            </li>
            <li>
              <strong>Usage Data:</strong> I may collect information about how you interact with the
              website, including pages visited and time spent on each page.
            </li>
            <li>
              <strong>Technical Data:</strong> I may collect information about your device, browser
              type, and IP address for analytics purposes.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">How I Use Your Information</h2>
          <p className="mb-4 text-muted-foreground">
            I use the collected information for the following purposes:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>To respond to your inquiries and contact requests</li>
            <li>To improve the website and user experience</li>
            <li>To analyze website traffic and usage patterns</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Data Protection</h2>
          <p className="text-muted-foreground">
            I implement appropriate security measures to protect your personal information from
            unauthorized access, alteration, disclosure, or destruction. However, no method of
            transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Third-Party Services</h2>
          <p className="text-muted-foreground">
            This website may use third-party services for analytics and functionality. These
            services may collect information about your use of this website. I encourage you to
            review their privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Your Rights</h2>
          <p className="mb-4 text-muted-foreground">You have the right to:</p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Request access to your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Cookies</h2>
          <p className="text-muted-foreground">
            This website may use cookies to enhance your browsing experience. You can configure your
            browser to refuse cookies, but this may limit some features of the website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Changes to This Policy</h2>
          <p className="text-muted-foreground">
            I may update this privacy policy from time to time. Any changes will be posted on this
            page with an updated revision date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
          <p className="text-muted-foreground">
            If you have questions about this privacy policy or your personal data, please contact me
            at{' '}
            <a href="mailto:rohin.aryain@gmail.com" className="text-primary hover:underline">
              rohin.aryain@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
