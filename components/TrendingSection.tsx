import Link from 'next/link'
import { toSlug } from '@/lib/utils'
import type { Perfume } from '@/lib/types'

const BADGE_SCORES = ['94%', '92%', '89%', '96%']

export default function TrendingSection({ perfumes }: { perfumes: Perfume[] }) {
  return (
    <section className="trending-section">
      <div className="section-container">
        <div className="trending-header">
          <div>
            <h2 className="trending-title">Tendances du moment</h2>
            <p className="trending-desc">
              Découvrez les correspondances les plus populaires de notre communauté d&apos;experts et passionnés.
            </p>
          </div>
          <button className="trending-all-btn">Voir tout le catalogue</button>
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
                <p className="trend-label">Alternatives inspirées par</p>
                <h3 className="trend-name">{p.name}</h3>
                <p className="trend-brand">{p.brand?.name || ''}</p>
                <div className="trend-divider"></div>
                <p className="trend-alt-label">L&apos;Alternative</p>
                <p className="trend-alt-name">Voir les alternatives →</p>
                <span className="trend-btn">Découvrir l&apos;accord</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
