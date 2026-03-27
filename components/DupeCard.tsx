import { formatPrice, getScore, getAccordSegments } from '@/lib/utils'
import type { DupeProduct } from '@/lib/types'

interface Props {
  dupe: DupeProduct
  index: number
}

export default function DupeCard({ dupe, index }: Props) {
  const score = getScore(index)
  const segs  = getAccordSegments(index)
  const priceStr = dupe.price != null
    ? `${formatPrice(dupe.price)}\u202f${dupe.currency || 'EUR'}`
    : null

  return (
    <article
      className="match-card"
      style={{ '--delay': `${Math.min(index * 0.06, 0.54)}s` } as React.CSSProperties}
    >
      <div className="match-img-wrap">
        {dupe.image_url
          /* eslint-disable-next-line @next/next/no-img-element */
          ? <img src={dupe.image_url} className="match-img" alt={dupe.name} loading="lazy" referrerPolicy="no-referrer" />
          : <div className="match-img match-img--empty"></div>
        }
        <div className="match-score-badge">{score}% Match</div>
      </div>
      <div className="match-body">
        <p className="match-brand-label">{dupe.dupe_brand?.name || ''}</p>
        <h3 className="match-name">{dupe.name}</h3>
        <div className="accord-wrap">
          <span className="accord-label">Accord Balance</span>
          <div className="accord-bar">
            <div className="accord-seg accord-seg--1" style={{ width: `${segs[0]}%` }}></div>
            <div className="accord-seg accord-seg--2" style={{ width: `${segs[1]}%` }}></div>
            <div className="accord-seg accord-seg--3" style={{ width: `${segs[2]}%` }}></div>
          </div>
          <div className="accord-legend">
            <span className="accord-legend-item">
              <span className="legend-dot legend-dot--1"></span> Boisé
            </span>
            <span className="accord-legend-item">
              <span className="legend-dot legend-dot--2"></span> Floral
            </span>
            <span className="accord-legend-item">
              <span className="legend-dot legend-dot--3"></span> Musqué
            </span>
          </div>
        </div>
        <div className="match-footer">
          <span className="match-price">{priceStr || '—'}</span>
          {dupe.link
            ? <a className="match-details-btn" href={dupe.link} target="_blank" rel="noopener noreferrer">See Details</a>
            : <span className="match-unavailable">Indisponible</span>
          }
        </div>
      </div>
    </article>
  )
}
