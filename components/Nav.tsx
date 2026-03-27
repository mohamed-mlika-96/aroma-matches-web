'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

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
        aria-label={isDetail ? 'Retour' : 'Menu'}
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
            data-page="discover"
            href="/"
          >
            Discover
          </Link>
          <a className="nav-link" href="#">Shop</a>
          <a className="nav-link" href="#">About</a>
          <a className="nav-link" href="#">Contact</a>
        </div>
      </div>

      <div className="nav-right-group">
        {!isDetail && (
          <div className="nav-search-pill nav-desktop-only" onClick={focusSearch}>
            <span className="material-symbols-outlined">search</span>
            <span className="nav-search-hint">Rechercher une fragrance...</span>
          </div>
        )}
        <div className="nav-icons">
          {!isDetail && (
            <button className="nav-icon-btn" aria-label="Rechercher" onClick={focusSearch}>
              <span className="material-symbols-outlined">search</span>
            </button>
          )}
          <button className="nav-icon-btn nav-desktop-only" aria-label="Panier">
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
          <button className="nav-icon-btn nav-desktop-only" aria-label="Profil">
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
