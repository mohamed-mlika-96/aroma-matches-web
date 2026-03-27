import type { MetadataRoute } from 'next'
import { getAllPerfumes } from '@/lib/data'
import { toSlug } from '@/lib/utils'

export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const perfumes = await getAllPerfumes()

  const perfumeUrls: MetadataRoute.Sitemap = perfumes.map(p => ({
    url: `https://aromamatches.fr/parfum/${toSlug(p.brand?.name || '', p.name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: 'https://aromamatches.fr/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...perfumeUrls,
  ]
}
