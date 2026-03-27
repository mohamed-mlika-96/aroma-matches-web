import type { Metadata } from 'next'
import SearchBar from '@/components/SearchBar'
import TrendingSection from '@/components/TrendingSection'
import PromoSection from '@/components/PromoSection'
import EduSection from '@/components/EduSection'
import { getTrendingPerfumes } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Aroma Matches — Trouvez le dupe de votre parfum de luxe',
  description: "Trouvez des alternatives abordables aux parfums de luxe. Même sillage, jusqu'à 90% moins cher. Parcourez 1 000+ alternatives.",
  openGraph: {
    title: 'Aroma Matches — Trouvez le dupe de votre parfum',
    description: "Trouvez des alternatives abordables aux parfums de luxe. Même sillage, jusqu'à 90% moins cher. Parcourez 1 000+ alternatives.",
    url: 'https://aromamatches.fr/',
  },
  alternates: { canonical: 'https://aromamatches.fr/' },
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
            <h1 className="hero-title">Trouver l&apos;alternative parfaite</h1>
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
