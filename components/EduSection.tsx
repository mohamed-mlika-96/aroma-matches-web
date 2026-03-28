import { t } from '@/lib/i18n'

export default function EduSection() {
  return (
    <section className="edu-section">
      <div className="section-container edu-grid">
        <div className="edu-text">
          <span className="edu-label">{t.eduLabel}</span>
          <h2 className="edu-title">{t.eduTitle}</h2>
          <div className="edu-steps">
            <div className="edu-step">
              <div className="edu-step-num edu-step-num--1">1</div>
              <div>
                <h4 className="edu-step-title">{t.note1Title}</h4>
                <p className="edu-step-desc">{t.note1Desc}</p>
              </div>
            </div>
            <div className="edu-step">
              <div className="edu-step-num edu-step-num--2">2</div>
              <div>
                <h4 className="edu-step-title">{t.note2Title}</h4>
                <p className="edu-step-desc">{t.note2Desc}</p>
              </div>
            </div>
            <div className="edu-step">
              <div className="edu-step-num edu-step-num--3">3</div>
              <div>
                <h4 className="edu-step-title">{t.note3Title}</h4>
                <p className="edu-step-desc">{t.note3Desc}</p>
              </div>
            </div>
          </div>
          <div className="note-pills">
            <span className="note-pill">{t.pill1}</span>
            <span className="note-pill">{t.pill2}</span>
            <span className="note-pill">{t.pill3}</span>
            <span className="note-pill">{t.pill4}</span>
            <span className="note-pill">{t.pill5}</span>
          </div>
        </div>

        <div className="edu-image-wrap">
          <div className="edu-image-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1608181831718-e2a6a399e8f1?w=800&q=85"
              className="edu-img"
              alt={t.eduImgAlt}
              loading="lazy"
            />
            <div className="edu-img-overlay"></div>
            <div className="edu-quote">
              <p className="edu-quote-text">&ldquo;{t.quote}&rdquo;</p>
              <p className="edu-quote-author">— Yves Saint Laurent</p>
            </div>
          </div>
          <div className="edu-deco-rings" aria-hidden="true">
            <div className="edu-ring edu-ring--1"></div>
            <div className="edu-ring edu-ring--2"></div>
            <div className="edu-ring edu-ring--3"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
