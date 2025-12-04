import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Rohin Qaderyan',
  description: 'Terms of service for rohinqaderyan.com',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Terms of Service</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="lead">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-muted-foreground">
            Welcome to my personal portfolio website. By accessing or using this website, you agree 
            to be bound by these Terms of Service. If you do not agree with any part of these terms, 
            please do not use this website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Use of Website</h2>
          <p className="text-muted-foreground mb-4">
            You may use this website for lawful purposes only. You agree not to:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Use the website in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to any part of the website</li>
            <li>Interfere with or disrupt the website or servers</li>
            <li>Use automated systems to access the website without permission</li>
            <li>Reproduce, duplicate, or copy material from the website without permission</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p className="text-muted-foreground">
            All content on this website, including but not limited to text, graphics, logos, images, 
            and code, is the property of Rohin Qaderyan unless otherwise stated. You may not use, 
            reproduce, or distribute any content without explicit permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Project Showcase</h2>
          <p className="text-muted-foreground">
            Projects displayed on this website are for demonstration purposes only. Some projects 
            may be proprietary work done for employers or clients. Unauthorized reproduction or 
            use of these projects is prohibited.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">External Links</h2>
          <p className="text-muted-foreground">
            This website may contain links to external websites. I am not responsible for the 
            content, privacy policies, or practices of third-party websites. Accessing external 
            links is at your own risk.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Disclaimer of Warranties</h2>
          <p className="text-muted-foreground">
            This website is provided &quot;as is&quot; without warranties of any kind, either express or 
            implied. I do not warrant that the website will be uninterrupted, error-free, or free 
            of viruses or other harmful components.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p className="text-muted-foreground">
            To the fullest extent permitted by law, I shall not be liable for any indirect, 
            incidental, special, consequential, or punitive damages arising out of or related to 
            your use of this website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
          <p className="text-muted-foreground">
            By using the contact form, you agree that your message may be stored and used to 
            respond to your inquiry. Your information will be handled in accordance with the 
            Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Code Samples</h2>
          <p className="text-muted-foreground">
            Code samples and technical content on this website are provided for educational 
            purposes. While I strive for accuracy, I make no guarantees about the correctness 
            or suitability of any code for production use.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p className="text-muted-foreground">
            I reserve the right to modify these terms at any time. Changes will be effective 
            immediately upon posting. Your continued use of the website after changes constitutes 
            acceptance of the modified terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
          <p className="text-muted-foreground">
            These terms shall be governed by and construed in accordance with the laws of the 
            United States and the Commonwealth of Virginia, without regard to conflict of law 
            principles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-muted-foreground">
            If you have questions about these Terms of Service, please contact me at{' '}
            <a 
              href="mailto:rohin.aryain@gmail.com" 
              className="text-primary hover:underline"
            >
              rohin.aryain@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
