import { t } from '@/lib/i18n'

export default function PromoSection() {
  return (
    <section className="promo-section">
      <div className="promo-deco" aria-hidden="true">
        <span className="material-symbols-outlined">spa</span>
      </div>
      <div className="promo-inner">
        <h2 className="promo-title">{t.promoTitle}</h2>
        <p className="promo-text">{t.promoText}</p>
        <div className="promo-btns">
          <button className="btn-gold">{t.submitDupe}</button>
          <button className="btn-outline">{t.learnMore}</button>
        </div>
      </div>
    </section>
  )
}
