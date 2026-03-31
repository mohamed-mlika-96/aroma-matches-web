import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { t } from '@/lib/i18n'

export const revalidate = 86400

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: post.coverImage ? { images: [{ url: post.coverImage }] } : undefined,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="blog-post">
      <div className="section-container">
        <nav className="blog-breadcrumb">
          <Link href="/">{t.breadcrumbHome}</Link>
          <span>/</span>
          <Link href="/blog">{t.blogTitle}</Link>
          <span>/</span>
          <span>{post.title}</span>
        </nav>

        <article className="blog-article">
          <header className="blog-article__header">
            <time className="blog-card__date">
              {new Date(post.date).toLocaleDateString(t.priceLocale, { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <h1 className="blog-article__title">{post.title}</h1>
            <p className="blog-article__desc">{post.description}</p>
          </header>

          {post.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.coverImage} alt={post.title} className="blog-article__cover" />
          )}

          <div className="blog-article__content prose">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </div>
    </main>
  )
}
