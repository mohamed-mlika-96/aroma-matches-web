import { formatPrice, getScore } from '@/lib/utils'
import type { DupeProduct } from '@/lib/types'
import { t } from '@/lib/i18n'

interface Props {
  dupe: DupeProduct
  index: number
  origNoteSet?: Set<string>
}

export default function DupeCard({ dupe, index, origNoteSet = new Set() }: Props) {
  const score    = getScore(index)
  const priceStr = dupe.price != null
    ? `${formatPrice(dupe.price, t.priceLocale)}\u202f${dupe.currency || 'EUR'}`
    : null
  const link = dupe.link?.replace('divainparfums.fr', t.divainDomain) ?? null

  const hasNotes   = dupe.notes_top?.length || dupe.notes_middle?.length || dupe.notes_base?.length
  const hasAccords = dupe.accords?.length
  const hasData    = hasNotes || hasAccords

  const sharedCount = hasNotes
    ? [...(dupe.notes_top || []), ...(dupe.notes_middle || []), ...(dupe.notes_base || [])]
        .filter(n => origNoteSet.has(n.toLowerCase())).length
    : 0

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

        {hasData && (
          <div className="dupe-notes-section">
            <div className="dupe-notes-header">
              <span className="accord-label">Notes du dupe</span>
              {sharedCount > 0 && (
                <span className="dupe-shared-legend">
                  ★ {sharedCount} note{sharedCount > 1 ? 's' : ''} en commun
                </span>
              )}
            </div>
            {hasNotes && (
              <div className="dupe-notes-rows">
                <DupeNotesRow icon="↑" notes={dupe.notes_top}    tier="top"    origNoteSet={origNoteSet} />
                <DupeNotesRow icon="◆" notes={dupe.notes_middle} tier="middle" origNoteSet={origNoteSet} />
                <DupeNotesRow icon="↓" notes={dupe.notes_base}   tier="base"   origNoteSet={origNoteSet} />
              </div>
            )}
            {hasAccords && (
              <div className="dupe-accord-pills">
                {dupe.accords!.map(a => (
                  <span key={a} className="dupe-accord">{a}</span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="match-footer">
          <span className="match-price">{priceStr || '—'}</span>
          {link
            ? <a className="match-details-btn" href={link} target="_blank" rel="noopener noreferrer">See Details</a>
            : <span className="match-unavailable">{t.unavailable}</span>
          }
        </div>
      </div>
    </article>
  )
}

function DupeNotesRow({
  icon, notes, tier, origNoteSet,
}: {
  icon: string
  notes: string[] | null | undefined
  tier: 'top' | 'middle' | 'base'
  origNoteSet: Set<string>
}) {
  if (!notes?.length) return null
  return (
    <div className="dupe-notes-row">
      <span className="dupe-notes-tier">{icon}</span>
      <div className="dupe-notes-pills">
        {notes.map(n => {
          const shared = origNoteSet.has(n.toLowerCase())
          return (
            <span
              key={n}
              className={`dupe-note dupe-note--${tier}${shared ? ' dupe-note--shared' : ''}`}
            >
              {n}
            </span>
          )
        })}
      </div>
    </div>
  )
}
