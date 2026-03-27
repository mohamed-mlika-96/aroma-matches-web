import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://aromamatches.fr'),
  title: {
    default: 'Aroma Matches — Trouvez le dupe de votre parfum de luxe',
    template: '%s — Aroma Matches',
  },
  description: "Trouvez des alternatives abordables aux parfums de luxe. Même sillage, jusqu'à 90% moins cher. Parcourez 1 000+ alternatives.",
  openGraph: {
    type: 'website',
    siteName: 'Aroma Matches',
    locale: 'fr_FR',
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
    url: 'https://aromamatches.fr',
    description: "Trouvez des alternatives abordables aux parfums de luxe. Même sillage, jusqu'à 90% moins cher.",
    inLanguage: 'fr-FR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://aromamatches.fr/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Aroma Matches',
    url: 'https://aromamatches.fr',
    logo: 'https://aromamatches.fr/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'aroma.matches31@gmail.com',
      contactType: 'customer service',
      availableLanguage: 'French',
    },
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
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
      </body>
    </html>
  )
}
