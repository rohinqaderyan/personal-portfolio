import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getSiteConfig } from '@/lib/content'
import { generateMetadata as genMeta, generateStructuredData } from '@/lib/seo'
import '@/styles/globals.css'
import '@/styles/theme.css'
import 'highlight.js/styles/github-dark.css'

const inter = Inter({ subsets: ['latin'] })

const config = getSiteConfig()

export const metadata: Metadata = genMeta(
  config.seo.title,
  config.seo.description,
  config,
  ''
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = generateStructuredData(config)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer config={config} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
