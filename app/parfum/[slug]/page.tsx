import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPerfumes, getPerfumeBySlug } from '@/lib/data'
import { toSlug } from '@/lib/utils'
import DupeCard from '@/components/DupeCard'
import type { DupeProduct } from '@/lib/types'
import { t, LOCALE } from '@/lib/i18n'

export const revalidate = 86400 // Re-génère les pages toutes les 24h

export async function generateStaticParams() {
  const perfumes = await getAllPerfumes()
  return perfumes.map(p => ({
    slug: toSlug(p.brand?.name || '', p.name),
  }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const perfume = await getPerfumeBySlug(slug)
  if (!perfume) return {}

  const brandName = perfume.brand?.name || ''
  const title = `Alternatives ${perfume.name} ${brandName}`.trim()
  const description = LOCALE === 'en'
    ? `Find affordable dupes and alternatives for ${perfume.name} by ${brandName}. Same scent, up to 90% cheaper.`
    : `Trouvez des dupes et alternatives abordables pour ${perfume.name} de ${brandName}. Même sillage, jusqu'à 90% moins cher.`
  const url = `${t.siteUrl}/parfum/${slug}`
  const image = perfume.image_url || `${t.siteUrl}/og-image.jpg`

  return {
    title,
    description,
    openGraph: { title, description, url, images: [{ url: image }] },
    twitter: { title, description, images: [image] },
    alternates: { canonical: url },
  }
}


export default async function PerfumePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const perfume = await getPerfumeBySlug(slug)
  if (!perfume) notFound()

  const brandName = perfume.brand?.name || ''
  const pageUrl   = `${t.siteUrl}/parfum/${slug}`

  const dupes: DupeProduct[] = perfume.dupe_mapping
    .map(m => m.dupe_product)
    .filter((d): d is DupeProduct =>
      d !== null &&
      d.image_url !== null &&
      !(d.dupe_brand?.name === 'Zara' && !d.link)
    )
    .sort((a, b) => {
      if (a.link && !b.link) return -1
      if (!a.link && b.link) return 1
      if (a.price != null && b.price != null) return a.price - b.price
      if (a.price != null) return -1
      if (b.price != null) return 1
      return 0
    })

  const count    = dupes.length
  const shopLink = dupes.find(d => d.link)?.link

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumbHome, item: t.siteUrl },
      { '@type': 'ListItem', position: 2, name: `${perfume.name} — ${brandName}`, item: pageUrl },
    ],
  }

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${perfume.name} — ${brandName}`,
    ...(perfume.image_url && { image: perfume.image_url }),
    description: LOCALE === 'en'
      ? `Affordable alternatives and dupes for ${perfume.name} by ${brandName}. Same scent, up to 90% cheaper.`
      : `Alternatives et dupes abordables pour ${perfume.name} de ${brandName}. Même sillage, jusqu'à 90% moins cher.`,
    brand: { '@type': 'Brand', name: brandName },
    offers: dupes
      .filter(d => d.price != null && d.link)
      .map(d => ({
        '@type': 'Offer',
        name: d.name,
        price: d.price!.toFixed(2),
        priceCurrency: d.currency || 'EUR',
        url: d.link,
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: d.dupe_brand?.name || '' },
      })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />

      {/* Page header */}
      <div id="view-header">
        <div className="results-page-header">
          <div className="section-container">
            <Link href="/" className="back-link">
              <span className="material-symbols-outlined">arrow_back</span> {t.back}
            </Link>
            <h1 className="results-title">{t.resultsLabel} {perfume.name}</h1>
            <p className="results-subtitle">{t.matchFound(count)}</p>
          </div>
        </div>
      </div>

      {/* Main */}
      <main id="main-panel">
        <div className="results-container section-container">
          <div className="results-layout">

            {/* Original perfume card */}
            <aside className="results-original">
              <div className="original-card">
                <div className="original-img-wrap">
                  {perfume.image_url
                    /* eslint-disable-next-line @next/next/no-img-element */
                    ? <img src={perfume.image_url} className="original-img" alt={perfume.name} loading="lazy" referrerPolicy="no-referrer" />
                    : <div className="original-img original-img--empty"></div>
                  }
                  <div className="original-badge">Reference Fragrance</div>
                </div>
                <div className="original-meta">
                  <h2 className="original-name">{perfume.name}</h2>
                  <p className="original-brand">{brandName}</p>
                  <p className="original-quote">&ldquo;{t.iconicQuote}&rdquo;</p>
                  <div className="original-pills">
                    {perfume.sex && <span className="note-pill">{t.sexLabel[perfume.sex] || ''}</span>}
                    <span className="note-pill">{t.luxe}</span>
                    <span className="note-pill">Signature</span>
                  </div>
                  {shopLink
                    ? <a className="original-shop-btn" href={shopLink} target="_blank" rel="noopener noreferrer">
                        Shop Original <span className="material-symbols-outlined">open_in_new</span>
                      </a>
                    : <button className="original-shop-btn" disabled>
                        Shop Original <span className="material-symbols-outlined">open_in_new</span>
                      </button>
                  }
                </div>
              </div>
            </aside>

            {/* Dupes */}
            <section className="results-matches">
              {count === 0 ? (
                <div className="state-msg" style={{ minHeight: '320px' }}>
                  <span className="state-icon">◈</span>
                  <span>{t.noMatch}</span>
                </div>
              ) : (
                <div className="matches-grid">
                  {dupes.map((d, i) => <DupeCard key={d.id} dupe={d} index={i} />)}
                </div>
              )}
            </section>

          </div>
        </div>
      </main>
    </>
  )
}
