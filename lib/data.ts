import { cache } from 'react'
import { supabase } from './supabase'
import { toSlug, normalize } from './utils'
import type { Perfume, PerfumeDetail } from './types'

export const getAllPerfumes = cache(async (): Promise<Perfume[]> => {
  const all: Perfume[] = []
  let from = 0

  while (true) {
    const { data, error } = await supabase
      .from('original_perfume')
      .select('id, name, sex, image_url, brand:brand_id(name)')
      .order('name')
      .range(from, from + 999)

    if (error || !data) break
    all.push(...(data as unknown as Perfume[]))
    if (data.length < 1000) break
    from += 1000
  }

  return all
})

export const getPerfumeBySlug = cache(async (slug: string): Promise<PerfumeDetail | null> => {
  const perfumes = await getAllPerfumes()

  const found = /^\d+$/.test(slug)
    ? perfumes.find(p => p.id === parseInt(slug))
    : perfumes.find(p => toSlug(p.brand?.name || '', p.name) === slug)

  if (!found) return null

  const { data, error } = await supabase
    .from('original_perfume')
    .select(`
      id, name, sex, image_url,
      brand:brand_id(name),
      dupe_mapping(
        dupe_product:dupe_product_id(
          id, name, price, currency, link, image_url,
          dupe_brand:dupe_brand_id(name, website)
        )
      )
    `)
    .eq('id', found.id)
    .single()

  if (error || !data) return null
  return data as unknown as PerfumeDetail
})

export async function getTrendingPerfumes(): Promise<Perfume[]> {
  const perfumes = await getAllPerfumes()

  const targets = ['baccarat rouge', 'sauvage', 'aventus', 'black opium']
  const found: Perfume[] = []

  for (const target of targets) {
    const p = perfumes.find(p =>
      normalize((p.brand?.name || '') + ' ' + p.name).includes(target)
    )
    if (p && !found.includes(p)) found.push(p)
  }

  // Fallback: any perfume with an image
  if (found.length < 4) {
    for (const p of perfumes) {
      if (p.image_url && !found.includes(p)) {
        found.push(p)
        if (found.length >= 4) break
      }
    }
  }

  return found.slice(0, 4)
}
