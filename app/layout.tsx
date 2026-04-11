import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { t, LOCALE } from '@/lib/i18n'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  metadataBase: new URL(t.siteUrl),
  title: {
    default: t.siteTitle,
    template: '%s — Aroma Matches',
  },
  description: t.siteDescription,
  openGraph: {
    type: 'website',
    siteName: 'Aroma Matches',
    locale: t.ogLocale,
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

const SITE_JSONLD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Aroma Matches',
    url: t.siteUrl,
    description: t.schemaDescription,
    inLanguage: LOCALE === 'en' ? 'en-US' : 'fr-FR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${t.siteUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Aroma Matches',
    url: t.siteUrl,
    logo: `${t.siteUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'aroma.matches31@gmail.com',
      contactType: 'customer service',
      availableLanguage: t.availableLanguage,
    },
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={t.htmlLang}>
      <head>
        <meta name="theme-color" content="#012d1d" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="https://wtcbwpwgicshmflhgwiw.supabase.co" />
        <link rel="preconnect" href="https://wtcbwpwgicshmflhgwiw.supabase.co" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSONLD) }}
        />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
