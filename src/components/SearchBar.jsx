import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../i18n/useTranslation'
import { useGeocoding } from '../hooks/useGeocoding'
import { Search, X, Clock, MapPin, Loader2 } from 'lucide-react'

const RECENT_KEY = 'pagoda-recent-searches'
const MAX_RECENT = 5

function loadRecent() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]')
  } catch {
    return []
  }
}

function saveRecent(items) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(items))
  } catch { }
}

export default function SearchBar({ onSelectCity, autoFocus = false, onClose, className = '' }) {
  const { t } = useTranslation()
  const { results, loading, search } = useGeocoding()
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [recent, setRecent] = useState(loadRecent)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  useEffect(() => {
    search(query)
    setActiveIndex(-1)
  }, [query, search])

  // Dismiss on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
        if (onClose && !query) onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose, query])

  const handleSelect = (city) => {
    const newRecent = [
      {
        id: city.id,
        name: city.name,
        country: city.country,
        admin1: city.admin1,
        latitude: city.latitude,
        longitude: city.longitude,
        timezone: city.timezone,
      },
      ...recent.filter((r) => r.name !== city.name || r.country !== city.country),
    ].slice(0, MAX_RECENT)

    setRecent(newRecent)
    saveRecent(newRecent)
    setQuery('')
    setIsOpen(false)
    if (onSelectCity) onSelectCity(city)
    if (onClose) onClose()
  }

  const clearRecent = (e) => {
    e.stopPropagation()
    setRecent([])
    saveRecent([])
  }

  const allItems = query.trim().length >= 2 ? results : []
  const showDropdown = isOpen && (allItems.length > 0 || (query.trim().length < 2 && recent.length > 0) || (query.trim().length >= 2 && !loading && allItems.length === 0))

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true)
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => Math.min(prev + 1, allItems.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => Math.max(prev - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0 && allItems[activeIndex]) {
        handleSelect(allItems[activeIndex])
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
      if (onClose) onClose()
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className || 'w-full max-w-xs sm:max-w-sm md:max-w-md'}`}
      onKeyDown={handleKeyDown}
    >
      {/* Search Input Box */}
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200 border shadow-sm backdrop-blur-md ${
          isOpen
            ? 'bg-white/30 border-white/60 ring-2 ring-white/20'
            : 'bg-white/20 border-white/30 hover:bg-white/25'
        }`}
      >
        <Search size={14} className="text-white drop-shadow-sm flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={t('search.placeholder')}
          aria-label={t('a11y.searchCity')}
          className="flex-1 bg-transparent text-white placeholder-white/70 text-xs outline-none select-text min-w-0"
          autoComplete="off"
          spellCheck="false"
        />

        {loading && (
          <Loader2 size={13} className="animate-spin text-white/80 flex-shrink-0" />
        )}

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            className="p-0.5 rounded text-white/60 hover:text-white transition-colors flex-shrink-0"
            aria-label="Clear search query"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 sm:right-auto sm:w-80 mt-2 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50 max-h-80 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
          {query.trim().length >= 2 ? (
            allItems.length > 0 ? (
              <div className="p-1.5 space-y-0.5">
                {allItems.map((city, idx) => (
                  <button
                    type="button"
                    key={city.id || `${city.name}-${city.latitude}-${idx}`}
                    onClick={() => handleSelect(city)}
                    className={`w-full px-3.5 py-2.5 rounded-xl flex items-center gap-3 text-left transition-colors ${
                      idx === activeIndex
                        ? 'bg-white/25 text-white'
                        : 'text-white/85 hover:bg-white/15'
                    }`}
                  >
                    <MapPin size={15} className="text-amber-200 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-xs sm:text-sm truncate text-white">{city.name}</p>
                      <p className="text-[11px] text-white/60 truncate">
                        {[city.admin1, city.country].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              !loading && (
                <div className="px-4 py-8 text-center text-white/60 text-xs sm:text-sm">
                  {t('search.noResults')}
                </div>
              )
            )
          ) : (
            <div>
              <div className="px-3.5 py-2 flex items-center justify-between border-b border-white/10">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">
                  {t('search.recentSearches')}
                </span>
                <button
                  type="button"
                  onClick={clearRecent}
                  className="text-xs font-medium text-amber-200 hover:text-white transition-colors"
                >
                  {t('search.clearAll')}
                </button>
              </div>
              <div className="p-1.5 space-y-0.5">
                {recent.map((city, idx) => (
                  <button
                    type="button"
                    key={`${city.name}-${idx}`}
                    onClick={() => handleSelect(city)}
                    className="w-full px-3.5 py-2.5 rounded-xl flex items-center gap-3 text-left text-white/85 hover:bg-white/15 transition-colors"
                  >
                    <Clock size={14} className="text-white/60 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs sm:text-sm truncate text-white">{city.name}</p>
                      {city.country && (
                        <p className="text-[11px] text-white/60 truncate">{city.country}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
