import Link from 'next/link'
import { toSlug } from '@/lib/utils'
import type { Perfume } from '@/lib/types'
import { t } from '@/lib/i18n'

const BADGE_SCORES = ['94%', '92%', '89%', '96%']

export default function TrendingSection({ perfumes }: { perfumes: Perfume[] }) {
  return (
    <section className="trending-section">
      <div className="section-container">
        <div className="trending-header">
          <div>
            <h2 className="trending-title">{t.trendingTitle}</h2>
            <p className="trending-desc">{t.trendingDesc}</p>
          </div>
          <button className="trending-all-btn">{t.trendingAllBtn}</button>
        </div>

        <div className="trending-grid">
          {perfumes.map((p, i) => (
            <Link
              key={p.id}
              href={`/parfum/${toSlug(p.brand?.name || '', p.name)}`}
              className="trend-card"
              style={{ textDecoration: 'none' }}
            >
              <div className="trend-img-wrap">
                {p.image_url
                  /* eslint-disable-next-line @next/next/no-img-element */
                  ? <img src={p.image_url} className="trend-img" alt={p.name} loading="lazy" referrerPolicy="no-referrer" />
                  : <div className="trend-img trend-img--empty"></div>
                }
                <div className="trend-badge">{BADGE_SCORES[i]} Match</div>
              </div>
              <div className="trend-body">
                <p className="trend-label">{t.altInspiredBy}</p>
                <h3 className="trend-name">{p.name}</h3>
                <p className="trend-brand">{p.brand?.name || ''}</p>
                <div className="trend-divider"></div>
                <p className="trend-alt-label">{t.theAlternative}</p>
                <p className="trend-alt-name">{t.seeAlternatives}</p>
                <span className="trend-btn">{t.discoverAccord}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
