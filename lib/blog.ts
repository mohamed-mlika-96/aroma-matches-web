import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { LOCALE } from './i18n'

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  coverImage?: string
  content: string
}

function getBlogDir() {
  return path.join(process.cwd(), 'content', 'blog', LOCALE)
}

export function getAllPosts(): Omit<BlogPost, 'content'>[] {
  const dir = getBlogDir()
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        description: data.description ?? '',
        coverImage: data.coverImage,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(getBlogDir(), `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    description: data.description ?? '',
    coverImage: data.coverImage,
    content,
  }
}
