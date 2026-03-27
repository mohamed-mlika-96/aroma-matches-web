export default function PromoSection() {
  return (
    <section className="promo-section">
      <div className="promo-deco" aria-hidden="true">
        <span className="material-symbols-outlined">spa</span>
      </div>
      <div className="promo-inner">
        <h2 className="promo-title">Aidez-nous à grandir</h2>
        <p className="promo-text">
          Notre bibliothèque s&apos;enrichit grâce à votre expertise. Vous avez découvert une alternative bluffante ?
          Partagez-la avec la communauté et devenez un contributeur de l&apos;Atelier Aroma Matches.
        </p>
        <div className="promo-btns">
          <button className="btn-gold">Soumettre un dupe</button>
          <button className="btn-outline">En savoir plus</button>
        </div>
      </div>
    </section>
  )
}
