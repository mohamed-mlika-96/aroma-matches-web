import type { Metadata } from 'next'
import SearchBar from '@/components/SearchBar'
import TrendingSection from '@/components/TrendingSection'
import PromoSection from '@/components/PromoSection'
import EduSection from '@/components/EduSection'
import { getTrendingPerfumes } from '@/lib/data'
import { t } from '@/lib/i18n'

export const metadata: Metadata = {
  title: t.siteTitle,
  description: t.siteDescription,
  openGraph: {
    title: t.siteTitle,
    description: t.siteDescription,
    url: `${t.siteUrl}/`,
  },
  alternates: { canonical: `${t.siteUrl}/` },
}

export default async function HomePage() {
  const trending = await getTrendingPerfumes()

  return (
    <>
      <div id="view-header">
        <section className="hero">
          <div className="hero-bg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1400&q=85"
              alt=""
              className="hero-bg-img"
            />
            <div className="hero-overlay"></div>
          </div>
          <div className="hero-content">
            <h1 className="hero-title">{t.heroTitle}</h1>
            <SearchBar />
          </div>
        </section>
      </div>

      <main id="main-panel">
        <div id="main-content">
          <TrendingSection perfumes={trending} />
          <PromoSection />
          <EduSection />
        </div>
      </main>
    </>
  )
}
