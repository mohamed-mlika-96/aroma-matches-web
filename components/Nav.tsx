'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { t } from '@/lib/i18n'

export default function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const isDetail = pathname.startsWith('/parfum/')

  function focusSearch() {
    const input = document.getElementById('search') as HTMLInputElement | null
    if (input) {
      input.focus()
      input.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <nav id="site-nav">
      <button
        className="nav-icon-btn nav-mobile-only"
        aria-label={isDetail ? t.backAriaLabel : 'Menu'}
        onClick={() => isDetail && router.push('/')}
      >
        <span className="material-symbols-outlined">
          {isDetail ? 'arrow_back' : 'menu'}
        </span>
      </button>

      <div className="nav-brand-group">
        <Link className="nav-brand" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Aroma Matches" className="nav-logo-img" />
          <span className="nav-brand-text">Aroma Matches</span>
        </Link>
        <div className="nav-links nav-desktop-only">
          <Link
            className={`nav-link${pathname === '/' ? ' nav-link--active' : ''}`}
            href="/"
          >
            {t.footerDiscover}
          </Link>
          <Link
            className={`nav-link${pathname.startsWith('/blog') ? ' nav-link--active' : ''}`}
            href="/blog"
          >
            Blog
          </Link>
          <a className="nav-link" href="#">{t.footerAbout}</a>
          <a className="nav-link" href="#">{t.footerContact}</a>
        </div>
      </div>

      <div className="nav-right-group">
        {!isDetail && (
          <div className="nav-search-pill nav-desktop-only" onClick={focusSearch}>
            <span className="material-symbols-outlined">search</span>
            <span className="nav-search-hint">{t.searchHint}</span>
          </div>
        )}
        <div className="nav-icons">
          {!isDetail && (
            <button className="nav-icon-btn" aria-label={t.searchIconAriaLabel} onClick={focusSearch}>
              <span className="material-symbols-outlined">search</span>
            </button>
          )}
          <button className="nav-icon-btn nav-desktop-only" aria-label={t.cartAriaLabel}>
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
          <button className="nav-icon-btn nav-desktop-only" aria-label={t.profileAriaLabel}>
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
