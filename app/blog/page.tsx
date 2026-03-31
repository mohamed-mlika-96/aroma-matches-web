import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { t } from '@/lib/i18n'

export const metadata: Metadata = {
  title: t.blogTitle,
  description: t.blogDescription,
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="blog-listing">
      <div className="section-container">
        <header className="blog-header">
          <p className="section-label">{t.blogLabel}</p>
          <h1 className="blog-heading">{t.blogTitle}</h1>
          <p className="blog-subheading">{t.blogDescription}</p>
        </header>

        {posts.length === 0 ? (
          <p className="blog-empty">{t.blogEmpty}</p>
        ) : (
          <div className="blog-grid">
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                {post.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.coverImage} alt={post.title} className="blog-card__img" />
                )}
                <div className="blog-card__body">
                  <time className="blog-card__date">{new Date(post.date).toLocaleDateString(t.priceLocale, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  <h2 className="blog-card__title">{post.title}</h2>
                  <p className="blog-card__desc">{post.description}</p>
                  <span className="blog-card__read">{t.blogReadMore}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
