import { useState, useEffect, useRef } from 'react'
import { Map as MapIcon, Globe, ChevronDown, Check, Clock } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'
import { formatMonthDay } from '../utils/dateUtils'
import NubilaLogo from './NubilaLogo'
import SearchBar from './SearchBar'

const LANGUAGES = [
  { code: 'uz', short: 'UZ', label: "O'zbekcha" },
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'ru', short: 'RU', label: 'Русский' },
]

function LivePrecisionClock({ timezone, locale }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let animId
    const update = () => {
      setNow(new Date())
      animId = requestAnimationFrame(update)
    }
    animId = requestAnimationFrame(update)
    return () => {
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  const dateStr = formatMonthDay(now, locale, timezone)

  const timeFormatted = (() => {
    try {
      const opts = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      if (timezone && timezone !== 'auto') {
        opts.timeZone = timezone
      }
      const parts = new Intl.DateTimeFormat('en-GB', opts).formatToParts(now)
      const h = parts.find((p) => p.type === 'hour')?.value || '00'
      const m = parts.find((p) => p.type === 'minute')?.value || '00'
      const s = parts.find((p) => p.type === 'second')?.value || '00'
      const ms = String(now.getMilliseconds()).padStart(3, '0')
      return { h, m, s, ms }
    } catch {
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      const s = String(now.getSeconds()).padStart(2, '0')
      const ms = String(now.getMilliseconds()).padStart(3, '0')
      return { h, m, s, ms }
    }
  })()

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-sm text-white transition-all select-none">
      <Clock size={13} className="text-amber-200 flex-shrink-0" />
      <span className="hidden sm:inline text-xs font-medium capitalize text-white/90 drop-shadow-sm">
        {dateStr}
      </span>
      <span className="hidden sm:inline text-white/40">•</span>
      <div className="flex items-baseline font-mono drop-shadow-sm tracking-tight">
        <span className="text-xs font-bold text-white">
          {timeFormatted.h}:{timeFormatted.m}:{timeFormatted.s}
        </span>
        <span className="text-[10px] font-semibold text-amber-200 ml-1 bg-white/15 px-1 py-0.5 rounded border border-white/20 font-mono">
          .{timeFormatted.ms}
        </span>
      </div>
    </div>
  )
}

export default function TopBar({
  city,
  units,
  onToggleUnits,
  activeNav,
  onSelectNav,
  onSelectCity,
}) {
  const { t, language, setLanguage, locale } = useTranslation()
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const langRef = useRef(null)

  // Outside click to close language menu
  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangMenuOpen(false)
      }
    }
    if (langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [langMenuOpen])

  return (
    <header className="relative z-30 w-full mb-6 select-none">
      <div className="flex items-center justify-between gap-3 sm:gap-4 py-2 px-1 text-white">
        {/* Brand / Title: Nubila Logo */}
        <div
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer transition-opacity hover:opacity-90"
          onClick={() => onSelectNav('home')}
        >
          <NubilaLogo size={28} />
        </div>

        {/* Center: Single Unified Search Bar + Map Toggle */}
        <div className="flex items-center gap-2 flex-1 max-w-xs sm:max-w-sm md:max-w-md justify-center mx-1 sm:mx-3">
          <SearchBar onSelectCity={onSelectCity} />

          {/* Map View Toggle */}
          <button
            type="button"
            onClick={() => onSelectNav(activeNav === 'map' ? 'home' : 'map')}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all text-xs font-medium shadow-sm flex-shrink-0 ${
              activeNav === 'map'
                ? 'bg-white/40 border-white/60 text-white shadow-white/20'
                : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
            }`}
            title={t('nav.map')}
            aria-label={t('nav.map')}
          >
            <MapIcon size={15} className="drop-shadow-sm" />
          </button>
        </div>

        {/* Right Section: High-Precision Live Clock, Unit Toggle, Language Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          {/* Isolated High-Precision Live Clock */}
          <LivePrecisionClock timezone={city?.timezone} locale={locale} />

          {/* Unit Toggle °C / °F */}
          <button
            type="button"
            onClick={onToggleUnits}
            className="px-2.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-xs font-semibold text-white transition-all shadow-sm"
            title={t('a11y.toggleUnits')}
          >
            <span className={units === 'celsius' ? 'font-bold text-amber-200' : 'opacity-70'}>°C</span>
            <span className="opacity-40 mx-0.5">/</span>
            <span className={units === 'fahrenheit' ? 'font-bold text-amber-200' : 'opacity-70'}>°F</span>
          </button>

          {/* Language Switcher */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen((v) => !v)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-xs font-semibold text-white transition-all shadow-sm"
              aria-label={t('a11y.selectLanguage')}
            >
              <Globe size={13} className="text-white/80" />
              <span>{language.toUpperCase()}</span>
              <ChevronDown size={11} className={`transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 rounded-2xl bg-slate-900/90 backdrop-blur-2xl border border-white/20 p-1.5 shadow-2xl z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    type="button"
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code)
                      setLangMenuOpen(false)
                    }}
                    className={`w-full px-3 py-1.5 rounded-xl text-left flex items-center justify-between text-xs transition-colors ${
                      language === lang.code
                        ? 'bg-white/25 text-white font-bold'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{lang.label}</span>
                    {language === lang.code && <Check size={13} className="text-amber-200" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
