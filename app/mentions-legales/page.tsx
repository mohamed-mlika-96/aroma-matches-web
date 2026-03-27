import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: "Mentions légales d'Aroma Matches : éditeur, hébergement, propriété intellectuelle, données personnelles et droit applicable.",
  robots: { index: false, follow: true },
}

export default function MentionsLegales() {
  return (
    <main style={{ background: 'var(--bg)' }}>
      <div className="legal-wrap">
        <Link href="/" className="back-link">← Retour à l&apos;accueil</Link>

        <h1>Mentions légales</h1>
        <p className="subtitle">
          Conformément à la loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l&apos;Économie Numérique (LCEN)
        </p>

        <div className="legal-section">
          <h2>1. Éditeur du site</h2>
          <p>Le site <strong>Aroma Matches</strong> (ci-après « le Site ») est édité à titre personnel et non commercial par un particulier.</p>
          <p>Conformément à l&apos;article 6-III-2 de la loi LCEN, les coordonnées de l&apos;éditeur ont été communiquées à l&apos;hébergeur du site et sont disponibles sur simple demande à l&apos;adresse suivante :</p>
          <p><strong>Contact :</strong> <a href="mailto:aroma.matches31@gmail.com">aroma.matches31@gmail.com</a></p>
          <p>Le Site est exploité à titre strictement non commercial et ne génère aucun revenu direct.</p>
        </div>

        <div className="legal-section">
          <h2>2. Hébergement</h2>
          <p>Le Site est hébergé par :</p>
          <ul>
            <li>
              <strong>Supabase Inc.</strong> — 970 Toa Payoh North, Singapour 318992 —{' '}
              <a href="https://supabase.com" target="_blank" rel="noopener">supabase.com</a>
            </li>
          </ul>
          <p>Les données sont stockées sur des serveurs situés dans l&apos;Union Européenne.</p>
        </div>

        <div className="legal-section">
          <h2>3. Propriété intellectuelle</h2>
          <p>Le contenu du Site (textes, structure, code) est la propriété de son éditeur. Toute reproduction, même partielle, est interdite sans autorisation préalable.</p>
          <p>
            Les marques commerciales, noms de parfums et logos des maisons de parfumerie mentionnés sur ce site
            (Chanel, Dior, Yves Saint Laurent, Hermès, Giorgio Armani, etc.) sont la propriété exclusive de leurs
            détenteurs respectifs. Leur utilisation sur ce site s&apos;inscrit exclusivement dans le cadre de la{' '}
            <strong>publicité comparative licite</strong>, telle que définie par la directive européenne 2006/114/CE
            et l&apos;article L.122-1 du Code de la consommation français.
          </p>
        </div>

        <div className="legal-section">
          <h2>4. Déclaration de non-affiliation</h2>
          <div className="disclaimer-box">
            <p>
              Aroma Matches n&apos;est affilié à aucune des marques de parfumerie mentionnées sur ce site.
              Les noms de parfums originaux sont cités uniquement à titre de comparaison, afin d&apos;aider les
              consommateurs à identifier des alternatives abordables. Les produits alternatifs présentés sont des
              créations indépendantes, fabriquées et commercialisées par des tiers. Aroma Matches ne vend aucun
              produit et n&apos;est pas responsable de la qualité, de la conformité ou de la disponibilité des
              produits référencés.
            </p>
          </div>
          <p style={{ marginTop: '12px' }}>
            Les termes « inspiré de », « dupe » ou « alternative » ne signifient pas que les produits sont
            identiques aux originaux, ni qu&apos;ils sont approuvés, fabriqués ou distribués par les maisons
            de parfumerie citées.
          </p>
        </div>

        <div className="legal-section">
          <h2>5. Limitation de responsabilité</h2>
          <p>
            Aroma Matches s&apos;efforce de maintenir les informations publiées à jour et exactes, mais ne saurait
            garantir l&apos;exhaustivité ou l&apos;exactitude des données présentées (prix, disponibilité,
            caractéristiques des produits).
          </p>
          <p>
            L&apos;éditeur ne pourra être tenu responsable de tout dommage direct ou indirect résultant de
            l&apos;utilisation du Site ou des produits référencés.
          </p>
        </div>

        <div className="legal-section">
          <h2>6. Données personnelles et cookies</h2>
          <p>
            Le Site ne collecte aucune donnée personnelle identifiable. Aucun formulaire d&apos;inscription,
            aucun compte utilisateur et aucun cookie de traçage publicitaire ne sont utilisés.
          </p>
          <p>
            Des cookies techniques strictement nécessaires au fonctionnement du site peuvent être déposés.
            Ils ne nécessitent pas de consentement préalable conformément aux lignes directrices de la CNIL.
          </p>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679),
            vous disposez d&apos;un droit d&apos;accès et de rectification en contactant :{' '}
            <a href="mailto:aroma.matches31@gmail.com">aroma.matches31@gmail.com</a>
          </p>
        </div>

        <div className="legal-section">
          <h2>7. Droit applicable</h2>
          <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
          <p style={{ color: 'var(--outline)', fontSize: '0.8rem' }}>Dernière mise à jour : mars 2026</p>
        </div>
      </div>
    </main>
  )
}
