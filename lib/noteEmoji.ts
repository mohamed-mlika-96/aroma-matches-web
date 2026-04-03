/**
 * Mapping note name → emoji
 * Covers English and French names, case-insensitive via getNoteEmoji()
 */
const NOTE_EMOJI: Record<string, string> = {
  // ── Citrus / Hespéridé ──────────────────────────────────
  'bergamot': '🍋', 'bergamote': '🍋',
  'lemon': '🍋', 'citron': '🍋',
  'lime': '🍈', 'citron vert': '🍈',
  'orange': '🍊',
  'grapefruit': '🍊', 'pamplemousse': '🍊',
  'mandarin': '🍊', 'mandarine': '🍊', 'tangerine': '🍊',
  'yuzu': '🍋',
  'clementine': '🍊', 'clémentine': '🍊',
  'kumquat': '🍊',
  'blood orange': '🍊', 'orange sanguine': '🍊',
  'petitgrain': '🍋',
  'lemon verbena': '🌿', 'verveine citron': '🌿', 'verbena': '🌿', 'verveine': '🌿',

  // ── Floral ───────────────────────────────────────────────
  'rose': '🌹', 'rose de mai': '🌹', 'turkish rose': '🌹', 'bulgarian rose': '🌹',
  'jasmine': '🌸', 'jasmin': '🌸', 'jasmin sambac': '🌸', 'sambac jasmine': '🌸',
  'iris': '🪷', 'orris': '🪷', 'orris root': '🪷', 'iris root': '🪷',
  'violet': '🌸', 'violette': '🌸', 'violet leaf': '🌸', 'feuille de violette': '🌸',
  'lavender': '💜', 'lavande': '💜', 'lavandin': '💜',
  'lily': '🌷', 'lys': '🌷', 'lily of the valley': '🌷', 'muguet': '🌷',
  'peony': '🌸', 'pivoine': '🌸',
  'gardenia': '🌼',
  'tuberose': '🌺', 'tubéreuse': '🌺',
  'ylang-ylang': '🌺', 'ylang ylang': '🌺',
  'neroli': '🌸',
  'orange blossom': '🌸', 'fleur d\'oranger': '🌸', 'fleur d\'orange': '🌸',
  'magnolia': '🌸',
  'freesia': '🌸',
  'mimosa': '🌼',
  'geranium': '🌺', 'géranium': '🌺', 'rose geranium': '🌺',
  'heliotrope': '🌼',
  'carnation': '🌺', 'oeillet': '🌺',
  'chrysanthemum': '🌼', 'chrysanthème': '🌼',
  'narcissus': '🌼', 'narcisse': '🌼',
  'cherry blossom': '🌸', 'fleur de cerisier': '🌸',
  'wisteria': '🌸', 'glycine': '🌸',
  'lotus': '🌸',
  'white flowers': '🌸', 'fleurs blanches': '🌸',
  'floral notes': '🌸', 'notes florales': '🌸',

  // ── Fruity ───────────────────────────────────────────────
  'apple': '🍎', 'pomme': '🍎',
  'pear': '🍐', 'poire': '🍐',
  'peach': '🍑', 'pêche': '🍑',
  'apricot': '🍑', 'abricot': '🍑',
  'plum': '🫐', 'prune': '🫐',
  'raspberry': '🫐', 'framboise': '🫐',
  'blackcurrant': '🫐', 'cassis': '🫐', 'black currant': '🫐',
  'strawberry': '🍓', 'fraise': '🍓',
  'cherry': '🍒', 'cerise': '🍒',
  'fig': '🍇', 'figue': '🍇',
  'mango': '🥭', 'mangue': '🥭',
  'pineapple': '🍍', 'ananas': '🍍',
  'blueberry': '🫐', 'myrtille': '🫐',
  'blackberry': '🫐', 'mûre': '🫐',
  'lychee': '🍈', 'litchi': '🍈',
  'melon': '🍈',
  'passion fruit': '🍈', 'fruit de la passion': '🍈',
  'grape': '🍇', 'raisin': '🍇',
  'quince': '🍐', 'coing': '🍐',
  'fruity notes': '🍑', 'notes fruitées': '🍑',

  // ── Woody / Boisé ────────────────────────────────────────
  'sandalwood': '🪵', 'santal': '🪵', 'australian sandalwood': '🪵',
  'cedarwood': '🌲', 'cèdre': '🌲', 'cedar': '🌲', 'virginia cedar': '🌲', 'atlas cedar': '🌲',
  'vetiver': '🌾',
  'patchouli': '🌿',
  'oud': '🪵', 'agarwood': '🪵', 'oud wood': '🪵',
  'oakmoss': '🌿', 'mousse de chêne': '🌿',
  'birch': '🌲', 'bouleau': '🌲', 'birch tar': '🌲',
  'pine': '🌲', 'pin': '🌲',
  'cypress': '🌲', 'cyprès': '🌲',
  'guaiac wood': '🪵', 'bois de gaïac': '🪵',
  'cashmere wood': '🪵', 'bois de cachemire': '🪵',
  'rosewood': '🪵', 'bois de rose': '🪵',
  'teak': '🪵',
  'mahogany': '🪵', 'acajou': '🪵',
  'woody notes': '🪵', 'notes boisées': '🪵',
  'driftwood': '🪵', 'bois flotté': '🪵',

  // ── Oriental / Warm ──────────────────────────────────────
  'vanilla': '🫘', 'vanille': '🫘', 'vanilla bean': '🫘',
  'amber': '✨', 'ambre': '✨', 'ambergris': '✨', 'ambre gris': '✨',
  'benzoin': '🫙', 'benjoin': '🫙',
  'tonka bean': '🫘', 'fève tonka': '🫘', 'tonka': '🫘',
  'coumarin': '🌿', 'coumarine': '🌿',
  'labdanum': '🫙',
  'balsam': '🫙', 'baume': '🫙',
  'peru balsam': '🫙', 'baume du pérou': '🫙',
  'styrax': '🫙',
  'myrrh': '🫙', 'myrrhe': '🫙',
  'olibanum': '🕯️', 'frankincense': '🕯️', 'encens': '🕯️',
  'incense': '🕯️',
  'resins': '🫙', 'résine': '🫙',

  // ── Musky ────────────────────────────────────────────────
  'musk': '🌫️', 'musc': '🌫️',
  'white musk': '🌫️', 'musc blanc': '🌫️',
  'ambrette': '🌫️', 'ambrette seed': '🌫️',
  'cashmeran': '🌫️',
  'musks': '🌫️',

  // ── Spicy / Épicé ────────────────────────────────────────
  'pepper': '🌶️', 'poivre': '🌶️', 'black pepper': '🌶️', 'poivre noir': '🌶️',
  'pink pepper': '🌶️', 'poivre rose': '🌶️',
  'sichuan pepper': '🌶️',
  'cardamom': '🫚', 'cardamome': '🫚',
  'cinnamon': '🍂', 'cannelle': '🍂',
  'clove': '🌿', 'girofle': '🌿',
  'nutmeg': '🫘', 'muscade': '🫘', 'noix de muscade': '🫘',
  'ginger': '🫚', 'gingembre': '🫚',
  'saffron': '🌼', 'safran': '🌼',
  'star anise': '🌿', 'anis étoilé': '🌿', 'anise': '🌿', 'anis': '🌿',
  'cumin': '🫚',
  'coriander': '🌿', 'coriandre': '🌿',
  'allspice': '🌿', 'quatre-épices': '🌿',
  'bay leaf': '🌿', 'feuille de laurier': '🌿',
  'spicy notes': '🌶️', 'notes épicées': '🌶️',

  // ── Aquatic / Fresh ──────────────────────────────────────
  'sea': '🌊', 'mer': '🌊',
  'aquatic': '💧', 'aquatique': '💧',
  'marine': '🌊',
  'water': '💧', 'eau': '💧',
  'sea salt': '🌊', 'sel marin': '🌊',
  'sea breeze': '🌊', 'brise marine': '🌊',
  'ozonic': '💨', 'ozonique': '💨',
  'rain': '🌧️', 'pluie': '🌧️',
  'fresh notes': '💧', 'notes fraîches': '💧',

  // ── Gourmand ─────────────────────────────────────────────
  'chocolate': '🍫', 'chocolat': '🍫',
  'coffee': '☕', 'café': '☕',
  'caramel': '🍮',
  'honey': '🍯', 'miel': '🍯',
  'almond': '🌰', 'amande': '🌰',
  'praline': '🍮', 'praliné': '🍮',
  'sugar': '🍬', 'sucre': '🍬',
  'marshmallow': '🍬',
  'milk': '🥛', 'lait': '🥛',
  'cream': '🥛', 'crème': '🥛',
  'coconut': '🥥', 'noix de coco': '🥥',
  'rum': '🥃', 'rhum': '🥃',
  'wine': '🍷', 'vin': '🍷',
  'tea': '🍵', 'thé': '🍵', 'green tea': '🍵', 'thé vert': '🍵',

  // ── Herbal / Green ───────────────────────────────────────
  'basil': '🌿', 'basilic': '🌿',
  'mint': '🌿', 'menthe': '🌿', 'peppermint': '🌿',
  'green': '🌿', 'vert': '🌿',
  'grass': '🌿', 'herbe': '🌿',
  'rosemary': '🌿', 'romarin': '🌿',
  'thyme': '🌿', 'thym': '🌿',
  'sage': '🌿', 'sauge': '🌿',
  'tarragon': '🌿', 'estragon': '🌿',
  'bay': '🌿', 'laurier': '🌿',
  'galbanum': '🌿',
  'green leaves': '🌿', 'feuilles vertes': '🌿',
  'fern': '🌿', 'fougère': '🌿',
  'myrtle': '🌿', 'myrte': '🌿',
  'eucalyptus': '🌿',
  'artemisia': '🌿',

  // ── Earthy / Mossy ───────────────────────────────────────
  'moss': '🌿', 'mousse': '🌿',
  'earth': '🌍', 'terre': '🌍',
  'mud': '🌍', 'boue': '🌍',
  'truffle': '🌍', 'truffe': '🌍',
  'mushroom': '🍄', 'champignon': '🍄',

  // ── Leather / Tobacco ────────────────────────────────────
  'leather': '🪢', 'cuir': '🪢',
  'suede': '🪢', 'daim': '🪢',
  'tobacco': '🍂', 'tabac': '🍂',
  'hay': '🌾', 'foin': '🌾',
  'smoke': '💨', 'fumée': '💨',

  // ── Powdery ──────────────────────────────────────────────
  'iris powder': '🪷',
  'powder': '🌸', 'poudre': '🌸',
  'powdery': '🌸',

  // ── Woody / Additional ───────────────────────────────────
  'bamboo': '🎋', 'bambou': '🎋',
}

/**
 * Returns the emoji for a given note name (case-insensitive).
 * Falls back to a generic 🌿 if not found.
 */
export function getNoteEmoji(note: string): string {
  const key = note.toLowerCase().trim()
  return NOTE_EMOJI[key] ?? '🌿'
}
