import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">

          <div className="footer-col">
            <span className="footer-brand">Aroma Matches</span>
            <p className="footer-tagline">
              L&apos;art de la découverte olfactive sublimé par la technologie.
              Trouvez votre signature, explorez les alternatives.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-link" aria-label="Site web">
                <span className="material-symbols-outlined">public</span>
              </a>
              <a href="#" className="footer-social-link" aria-label="Partager">
                <span className="material-symbols-outlined">share</span>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">Navigation</h5>
            <ul className="footer-links">
              <li><a href="#">Scent Journal</a></li>
              <li><a href="#">Découvrir</a></li>
              <li><a href="#">À propos</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">Informations</h5>
            <ul className="footer-links">
              <li><Link href="/mentions-legales">Mentions légales</Link></li>
              <li><a href="#">Politique de confidentialité</a></li>
              <li><a href="#">Conditions d&apos;utilisation</a></li>
              <li><a href="#">Cookies</a></li>
              <li><a href="#">Accessibilité</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">Newsletter</h5>
            <p className="footer-newsletter-desc">
              Inscrivez-vous pour recevoir nos curations hebdomadaires.
            </p>
            <div className="footer-newsletter-form">
              <input
                className="footer-newsletter-input"
                type="email"
                placeholder="votre@email.com"
                aria-label="Adresse email"
              />
              <button className="footer-newsletter-btn" aria-label="S'inscrire">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© 2024 Aroma Matches. The Digital Atelier.</p>
          <div className="footer-status">
            <span className="footer-status-dot"></span>
            <span>Global Atelier Status: Online</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
