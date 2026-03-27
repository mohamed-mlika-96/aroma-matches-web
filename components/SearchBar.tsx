'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getBrowserClient } from '@/lib/supabase-browser'
import { toSlug, normalize } from '@/lib/utils'
import type { Perfume } from '@/lib/types'

const SEX_SYMBOL: Record<string, string> = { M: '♂', F: '♀', U: '⚲' }

export default function SearchBar() {
  const router = useRouter()
  const [perfumes, setPerfumes] = useState<Perfume[]>([])
  const [query, setQuery] = useState('')
  const [matches, setMatches] = useState<Perfume[]>([])
  const [activeIdx, setActiveIdx] = useState(-1)
  const [showList, setShowList] = useState(false)
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    async function load() {
      const client = getBrowserClient()
      const all: Perfume[] = []
      let from = 0
      while (true) {
        const { data } = await client
          .from('original_perfume')
          .select('id, name, sex, image_url, brand:brand_id(name)')
          .order('name')
          .range(from, from + 999)
        if (!data || data.length === 0) break
        all.push(...(data as unknown as Perfume[]))
        if (data.length < 1000) break
        from += 1000
      }
      setPerfumes(all)
    }
    load()
  }, [])

  const getMatches = useCallback((q: string): Perfume[] => {
    const words = normalize(q.trim()).split(/\s+/).filter(w => w.length > 0)
    if (words.length === 0 || words.join('').length < 2) return []
    return perfumes
      .filter(p => {
        const haystack = normalize((p.brand?.name || '') + ' ' + p.name)
        return words.every(w => haystack.includes(w))
      })
      .slice(0, 9)
  }, [perfumes])

  function navigateTo(perfume: Perfume) {
    if (blurTimer.current) clearTimeout(blurTimer.current)
    setShowList(false)
    setQuery('')
    setActiveIdx(-1)
    const slug = toSlug(perfume.brand?.name || '', perfume.name)
    router.push('/parfum/' + slug)
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setQuery(val)
    const m = getMatches(val)
    setMatches(m)
    setActiveIdx(-1)
    setShowList(m.length > 0)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, matches.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const target = activeIdx >= 0 ? matches[activeIdx] : matches[0]
      if (target) navigateTo(target)
    } else if (e.key === 'Escape') {
      setShowList(false)
      setActiveIdx(-1)
    }
  }

  function setSuggestion(term: string) {
    const m = getMatches(term)
    setQuery(term)
    setMatches(m)
    setActiveIdx(-1)
    setShowList(m.length > 0)
    document.getElementById('search')?.focus()
  }

  return (
    <>
      <div className="hero-search-wrap">
        <input
          type="search"
          id="search"
          className="hero-search-input"
          placeholder="Entrez le nom d'un parfum de luxe..."
          autoComplete="off"
          spellCheck={false}
          aria-autocomplete="list"
          aria-controls="ac-list"
          aria-label="Rechercher un parfum"
          value={query}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (blurTimer.current) clearTimeout(blurTimer.current)
            if (query.length >= 2) setShowList(matches.length > 0)
          }}
          onBlur={() => {
            blurTimer.current = setTimeout(() => {
              setShowList(false)
              setActiveIdx(-1)
            }, 200)
          }}
        />
        <button
          className="hero-search-btn"
          onClick={() => { if (matches.length > 0) navigateTo(matches[0]) }}
        >
          Trouver <span className="material-symbols-outlined">arrow_forward</span>
        </button>

        {showList && matches.length > 0 && (
          <ul id="ac-list" className="ac-list" role="listbox" aria-label="Suggestions">
            {matches.map((p, i) => (
              <li
                key={p.id}
                className={`ac-item${i === activeIdx ? ' ac-item--active' : ''}`}
                role="option"
                tabIndex={-1}
                onMouseDown={(e) => { e.preventDefault(); navigateTo(p) }}
              >
                {p.image_url
                  ? <img className="ac-thumb" src={p.image_url} alt="" loading="lazy" referrerPolicy="no-referrer" />
                  : <span className="ac-thumb ac-thumb--empty"></span>
                }
                <span className="ac-text">
                  <span className="ac-brand">{p.brand?.name || ''}</span>
                  <span className="ac-name">{p.name}</span>
                </span>
                {p.sex && <span className="ac-sex">{SEX_SYMBOL[p.sex] || ''}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="hero-suggestions">
        <span className="suggestion-label">Suggestions :</span>
        <button className="suggestion-pill" onClick={() => setSuggestion('Baccarat Rouge')}>Baccarat Rouge</button>
        <button className="suggestion-pill" onClick={() => setSuggestion('Aventus')}>Aventus</button>
        <button className="suggestion-pill" onClick={() => setSuggestion('Sauvage')}>Sauvage</button>
      </div>
    </>
  )
}
