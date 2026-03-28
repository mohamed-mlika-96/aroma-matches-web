import type { MetadataRoute } from 'next'
import { t } from '@/lib/i18n'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${t.siteUrl}/sitemap.xml`,
  }
}
