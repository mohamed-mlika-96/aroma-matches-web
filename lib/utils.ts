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

export function getAccordSegments(i: number): [number, number, number] {
  const table: [number, number, number][] = [
    [50, 30, 20], [45, 30, 25], [40, 35, 25], [35, 40, 25],
    [55, 25, 20], [48, 32, 20], [42, 38, 20], [38, 35, 27],
  ]
  return table[i % table.length]
}
