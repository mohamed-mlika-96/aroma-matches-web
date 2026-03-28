export type Locale = 'fr' | 'en'

export const LOCALE: Locale =
  process.env.NEXT_PUBLIC_SITE === 'en' ? 'en' : 'fr'

interface Translations {
  // Site
  siteUrl: string
  ogLocale: string
  htmlLang: string
  siteTitle: string
  siteDescription: string
  schemaDescription: string
  availableLanguage: string

  // Hero / Search
  heroTitle: string
  searchPlaceholder: string
  searchBtn: string
  searchAriaLabel: string
  suggestionsLabel: string

  // Nav
  searchHint: string
  backAriaLabel: string
  cartAriaLabel: string
  profileAriaLabel: string
  searchIconAriaLabel: string

  // Trending
  trendingTitle: string
  trendingDesc: string
  trendingAllBtn: string
  altInspiredBy: string
  theAlternative: string
  seeAlternatives: string
  discoverAccord: string

  // Promo
  promoTitle: string
  promoText: string
  submitDupe: string
  learnMore: string

  // Edu
  eduLabel: string
  eduTitle: string
  note1Title: string
  note1Desc: string
  note2Title: string
  note2Desc: string
  note3Title: string
  note3Desc: string
  pill1: string
  pill2: string
  pill3: string
  pill4: string
  pill5: string
  eduImgAlt: string
  quote: string

  // Footer
  footerTagline: string
  footerDiscover: string
  footerAbout: string
  footerContact: string
  footerLegalNotice: string
  footerPrivacy: string
  footerTerms: string
  footerCookies: string
  footerAccessibility: string
  newsletterDesc: string
  emailPlaceholder: string
  emailAriaLabel: string
  subscribeAriaLabel: string

  // Detail page
  back: string
  resultsLabel: string
  matchFound: (count: number) => string
  noMatch: string
  iconicQuote: string
  sexLabel: Record<string, string>
  luxe: string
  unavailable: string
  breadcrumbHome: string

  // DupeCard accord legend
  woody: string
  floral: string
  musky: string

  // Data
  priceLocale: string
  divainDomain: string
}

const FR: Translations = {
  siteUrl: 'https://aromamatches.fr',
  ogLocale: 'fr_FR',
  htmlLang: 'fr',
  siteTitle: 'Aroma Matches — Trouvez le dupe de votre parfum de luxe',
  siteDescription: "Trouvez des alternatives abordables aux parfums de luxe. Même sillage, jusqu'à 90% moins cher. Parcourez 1 000+ alternatives.",
  schemaDescription: "Trouvez des alternatives abordables aux parfums de luxe. Même sillage, jusqu'à 90% moins cher.",
  availableLanguage: 'French',

  heroTitle: "Trouver l'alternative parfaite",
  searchPlaceholder: "Entrez le nom d'un parfum de luxe...",
  searchBtn: 'Trouver',
  searchAriaLabel: 'Rechercher un parfum',
  suggestionsLabel: 'Suggestions :',

  searchHint: 'Rechercher une fragrance...',
  backAriaLabel: 'Retour',
  cartAriaLabel: 'Panier',
  profileAriaLabel: 'Profil',
  searchIconAriaLabel: 'Rechercher',

  trendingTitle: 'Tendances du moment',
  trendingDesc: "Découvrez les correspondances les plus populaires de notre communauté d'experts et passionnés.",
  trendingAllBtn: 'Voir tout le catalogue',
  altInspiredBy: 'Alternatives inspirées par',
  theAlternative: "L'Alternative",
  seeAlternatives: 'Voir les alternatives →',
  discoverAccord: "Découvrir l'accord",

  promoTitle: 'Aidez-nous à grandir',
  promoText: "Notre bibliothèque s'enrichit grâce à votre expertise. Vous avez découvert une alternative bluffante ? Partagez-la avec la communauté et devenez un contributeur de l'Atelier Aroma Matches.",
  submitDupe: 'Soumettre un dupe',
  learnMore: 'En savoir plus',

  eduLabel: "L'Art de la Parfumerie",
  eduTitle: 'Comprendre la pyramide olfactive',
  note1Title: 'Notes de Tête',
  note1Desc: "L'envolée du parfum. Ce sont les senteurs volatiles que l'on perçoit immédiatement : agrumes, herbes aromatiques, notes aquatiques.",
  note2Title: 'Notes de Cœur',
  note2Desc: "Le caractère du parfum. Elles se développent après quelques minutes et constituent la signature olfactive : floral, fruité ou épicé.",
  note3Title: 'Notes de Fond',
  note3Desc: "Le sillage. Elles assurent la tenue du parfum pendant plusieurs heures : bois précieux, muscs, ambre, vanille.",
  pill1: 'Boisé',
  pill2: 'Floral',
  pill3: 'Musqué',
  pill4: 'Ambré',
  pill5: 'Hespéridé',
  eduImgAlt: 'Ingrédients botaniques',
  quote: 'Le parfum est le frère de la respiration.',

  footerTagline: "L'art de la découverte olfactive sublimé par la technologie. Trouvez votre signature, explorez les alternatives.",
  footerDiscover: 'Découvrir',
  footerAbout: 'À propos',
  footerContact: 'Contact',
  footerLegalNotice: 'Mentions légales',
  footerPrivacy: 'Politique de confidentialité',
  footerTerms: "Conditions d'utilisation",
  footerCookies: 'Cookies',
  footerAccessibility: 'Accessibilité',
  newsletterDesc: 'Inscrivez-vous pour recevoir nos curations hebdomadaires.',
  emailPlaceholder: 'votre@email.com',
  emailAriaLabel: 'Adresse email',
  subscribeAriaLabel: "S'inscrire",

  back: 'Retour',
  resultsLabel: 'Résultats :',
  matchFound: (count) =>
    `${count} correspondance${count !== 1 ? 's' : ''} trouvée${count !== 1 ? 's' : ''} dans notre Atelier Digital`,
  noMatch: 'Aucune correspondance pour le moment. Revenez bientôt !',
  iconicQuote: "Une fragrance iconique qui a redéfini les codes de la parfumerie contemporaine.",
  sexLabel: { M: 'Homme', F: 'Femme', U: 'Mixte' },
  luxe: 'Luxe',
  unavailable: 'Indisponible',
  breadcrumbHome: 'Accueil',

  woody: 'Boisé',
  floral: 'Floral',
  musky: 'Musqué',

  priceLocale: 'fr-FR',
  divainDomain: 'divainparfums.fr',
}

const EN: Translations = {
  siteUrl: 'https://aromamatches.com',
  ogLocale: 'en_US',
  htmlLang: 'en',
  siteTitle: 'Aroma Matches — Find your luxury perfume dupe',
  siteDescription: 'Find affordable alternatives to luxury fragrances. Same scent, up to 90% cheaper. Browse 1,000+ alternatives.',
  schemaDescription: 'Find affordable alternatives to luxury fragrances. Same scent, up to 90% cheaper.',
  availableLanguage: 'English',

  heroTitle: 'Find the perfect alternative',
  searchPlaceholder: 'Enter a luxury fragrance name...',
  searchBtn: 'Find',
  searchAriaLabel: 'Search a fragrance',
  suggestionsLabel: 'Suggestions:',

  searchHint: 'Search a fragrance...',
  backAriaLabel: 'Back',
  cartAriaLabel: 'Cart',
  profileAriaLabel: 'Profile',
  searchIconAriaLabel: 'Search',

  trendingTitle: 'Trending right now',
  trendingDesc: 'Discover the most popular matches from our community of experts and enthusiasts.',
  trendingAllBtn: 'Browse all',
  altInspiredBy: 'Alternatives inspired by',
  theAlternative: 'The Alternative',
  seeAlternatives: 'See alternatives →',
  discoverAccord: 'Explore the match',

  promoTitle: 'Help us grow',
  promoText: 'Our library grows thanks to your expertise. Found a stunning alternative? Share it with the community and become a contributor to the Aroma Matches Atelier.',
  submitDupe: 'Submit a dupe',
  learnMore: 'Learn more',

  eduLabel: 'The Art of Perfumery',
  eduTitle: 'Understanding the olfactory pyramid',
  note1Title: 'Top Notes',
  note1Desc: 'The opening of the fragrance. These are the volatile scents perceived immediately: citrus, aromatic herbs, aquatic notes.',
  note2Title: 'Heart Notes',
  note2Desc: 'The character of the fragrance. They develop after a few minutes and form the olfactory signature: floral, fruity or spicy.',
  note3Title: 'Base Notes',
  note3Desc: 'The sillage. They ensure the fragrance lasts for hours: precious woods, musks, amber, vanilla.',
  pill1: 'Woody',
  pill2: 'Floral',
  pill3: 'Musky',
  pill4: 'Amber',
  pill5: 'Citrus',
  eduImgAlt: 'Botanical ingredients',
  quote: 'Perfume is the brother of breathing.',

  footerTagline: 'The art of olfactory discovery elevated by technology. Find your signature, explore the alternatives.',
  footerDiscover: 'Discover',
  footerAbout: 'About',
  footerContact: 'Contact',
  footerLegalNotice: 'Legal notice',
  footerPrivacy: 'Privacy policy',
  footerTerms: 'Terms of use',
  footerCookies: 'Cookies',
  footerAccessibility: 'Accessibility',
  newsletterDesc: 'Subscribe to receive our weekly curations.',
  emailPlaceholder: 'your@email.com',
  emailAriaLabel: 'Email address',
  subscribeAriaLabel: 'Subscribe',

  back: 'Back',
  resultsLabel: 'Results:',
  matchFound: (count) =>
    `${count} match${count !== 1 ? 'es' : ''} found in our Digital Atelier`,
  noMatch: 'No matches yet. Check back soon!',
  iconicQuote: 'An iconic fragrance that redefined contemporary perfumery.',
  sexLabel: { M: 'Men', F: 'Women', U: 'Unisex' },
  luxe: 'Luxury',
  unavailable: 'Unavailable',
  breadcrumbHome: 'Home',

  woody: 'Woody',
  floral: 'Floral',
  musky: 'Musky',

  priceLocale: 'en-US',
  divainDomain: 'divainparfums.com',
}

export const t: Translations = LOCALE === 'en' ? EN : FR
