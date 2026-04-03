export function toSlug(brand: string, name: string): string {
  return [brand, name]
    .join(' ')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[°№&']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function normalize(str: string): string {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function formatPrice(n: number, priceLocale = 'fr-FR'): string {
  return Number(n).toLocaleString(priceLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function getScore(i: number): number {
  const scores = [98, 92, 85, 79, 74, 69, 65, 61, 58, 55]
  return scores[i] !== undefined ? scores[i] : Math.max(50, 55 - (i - 9) * 4)
}
