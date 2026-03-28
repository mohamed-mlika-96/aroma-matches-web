import Link from 'next/link'
import { t } from '@/lib/i18n'

export default function Footer() {
  return (
    <footer id="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">

          <div className="footer-col">
            <span className="footer-brand">Aroma Matches</span>
            <p className="footer-tagline">{t.footerTagline}</p>
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
              <li><a href="#">{t.footerDiscover}</a></li>
              <li><a href="#">{t.footerAbout}</a></li>
              <li><a href="#">{t.footerContact}</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">Informations</h5>
            <ul className="footer-links">
              <li><Link href="/mentions-legales">{t.footerLegalNotice}</Link></li>
              <li><a href="#">{t.footerPrivacy}</a></li>
              <li><a href="#">{t.footerTerms}</a></li>
              <li><a href="#">{t.footerCookies}</a></li>
              <li><a href="#">{t.footerAccessibility}</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">Newsletter</h5>
            <p className="footer-newsletter-desc">{t.newsletterDesc}</p>
            <div className="footer-newsletter-form">
              <input
                className="footer-newsletter-input"
                type="email"
                placeholder={t.emailPlaceholder}
                aria-label={t.emailAriaLabel}
              />
              <button className="footer-newsletter-btn" aria-label={t.subscribeAriaLabel}>
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
