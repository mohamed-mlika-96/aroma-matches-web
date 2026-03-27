export default function EduSection() {
  return (
    <section className="edu-section">
      <div className="section-container edu-grid">
        <div className="edu-text">
          <span className="edu-label">L&apos;Art de la Parfumerie</span>
          <h2 className="edu-title">Comprendre la pyramide olfactive</h2>
          <div className="edu-steps">
            <div className="edu-step">
              <div className="edu-step-num edu-step-num--1">1</div>
              <div>
                <h4 className="edu-step-title">Notes de Tête</h4>
                <p className="edu-step-desc">
                  L&apos;envolée du parfum. Ce sont les senteurs volatiles que l&apos;on perçoit immédiatement :
                  agrumes, herbes aromatiques, notes aquatiques.
                </p>
              </div>
            </div>
            <div className="edu-step">
              <div className="edu-step-num edu-step-num--2">2</div>
              <div>
                <h4 className="edu-step-title">Notes de Cœur</h4>
                <p className="edu-step-desc">
                  Le caractère du parfum. Elles se développent après quelques minutes et constituent la
                  signature olfactive : floral, fruité ou épicé.
                </p>
              </div>
            </div>
            <div className="edu-step">
              <div className="edu-step-num edu-step-num--3">3</div>
              <div>
                <h4 className="edu-step-title">Notes de Fond</h4>
                <p className="edu-step-desc">
                  Le sillage. Elles assurent la tenue du parfum pendant plusieurs heures :
                  bois précieux, muscs, ambre, vanille.
                </p>
              </div>
            </div>
          </div>
          <div className="note-pills">
            <span className="note-pill">Boisé</span>
            <span className="note-pill">Floral</span>
            <span className="note-pill">Musqué</span>
            <span className="note-pill">Ambré</span>
            <span className="note-pill">Hespéridé</span>
          </div>
        </div>

        <div className="edu-image-wrap">
          <div className="edu-image-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1608181831718-e2a6a399e8f1?w=800&q=85"
              className="edu-img"
              alt="Ingrédients botaniques"
              loading="lazy"
            />
            <div className="edu-img-overlay"></div>
            <div className="edu-quote">
              <p className="edu-quote-text">&ldquo;Le parfum est le frère de la respiration.&rdquo;</p>
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
