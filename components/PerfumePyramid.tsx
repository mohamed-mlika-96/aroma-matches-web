interface Props {
  notesTop:    string[] | null
  notesMiddle: string[] | null
  notesBase:   string[] | null
  accords:     string[] | null
}

export default function PerfumePyramid({ notesTop, notesMiddle, notesBase, accords }: Props) {
  const hasNotes   = notesTop?.length || notesMiddle?.length || notesBase?.length
  const hasAccords = accords?.length
  if (!hasNotes && !hasAccords) return null

  return (
    <div className="pyramid-section">
      <h3 className="pyramid-title">Pyramide Olfactive</h3>

      {hasNotes && (
        <div className="pyramid-layers">
          <PyramidLayer icon="↑" label="Tête"  notes={notesTop}    tier="top"    />
          <PyramidLayer icon="◆" label="Cœur"  notes={notesMiddle} tier="middle" />
          <PyramidLayer icon="↓" label="Fond"  notes={notesBase}   tier="base"   />
        </div>
      )}

      {hasAccords && (
        <div className="pyramid-accords">
          <span className="pyramid-accords-label">Accords principaux</span>
          <div className="pyramid-accord-pills">
            {accords!.map(a => (
              <span key={a} className="pyramid-accord">{a}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function PyramidLayer({
  icon, label, notes, tier,
}: {
  icon: string
  label: string
  notes: string[] | null | undefined
  tier: 'top' | 'middle' | 'base'
}) {
  if (!notes?.length) return null
  return (
    <div className="pyramid-layer">
      <div className="pyramid-layer-header">
        <span className={`pyramid-layer-icon pyramid-layer-icon--${tier}`}>{icon}</span>
        <span className="pyramid-layer-label">{label}</span>
      </div>
      <div className="pyramid-notes-wrap">
        {notes.map(n => (
          <span key={n} className={`pyramid-note pyramid-note--${tier}`}>{n}</span>
        ))}
      </div>
    </div>
  )
}
