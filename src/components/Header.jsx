import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../i18n/useTranslation'
import { formatLiveClock } from '../utils/dateUtils'
import { Sun, Moon, Globe, ChevronDown, Check, Clock, MapPin } from 'lucide-react'

const LANGUAGES = [
  { code: 'uz', label: "O'zbekcha", short: 'UZ' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ru', label: 'Русский', short: 'RU' },
]

function PagodaLogo() {
  return (
    <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-md shadow-sky-500/20 text-white flex-shrink-0">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v3" />
        <path d="M4 10l8-4 8 4" />
        <path d="M6 10v4" />
        <path d="M18 10v4" />
        <path d="M2 17l10-3 10 3" />
        <path d="M5 17v4" />
        <path d="M19 17v4" />
        <path d="M2 21h20" />
      </svg>
    </div>
  )
}

export default function Header({
  city,
  theme,
  onToggleTheme,
  units,
  onToggleUnits,
}) {
  const { t, language, setLanguage, locale } = useTranslation()
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(() => new Date())
  const langMenuRef = useRef(null)

  // Live clock updating every second
  useEffect(() => {
    setCurrentTime(new Date())
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [city?.timezone, language])

  // Click outside to close language dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setLangMenuOpen(false)
      }
    }
    if (langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [langMenuOpen])

  const timeString = formatLiveClock(currentTime, locale, city?.timezone)
  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0]

  return (
    <header className="relative z-30 w-full transition-colors duration-300">
      <div className="backdrop-blur-xl bg-white/75 dark:bg-slate-900/70 border-b border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between gap-3 flex-wrap">
          {/* Brand + City Telemetry */}
          <div className="flex items-center gap-3">
            <PagodaLogo />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-extrabold tracking-wider bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-500 dark:from-sky-400 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
                  PAGODA WEATHER
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-md border border-sky-500/20">
                  LIVE
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {city && (
                  <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                    <MapPin size={12} className="text-sky-500 flex-shrink-0" />
                    <span>{city.name}</span>
                    {city.country && <span className="text-slate-400 dark:text-slate-500">({city.country})</span>}
                  </span>
                )}
                {timeString && (
                  <>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="flex items-center gap-1 font-mono font-medium text-slate-600 dark:text-slate-300">
                      <Clock size={12} className="text-sky-500" />
                      {timeString}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Unit Toggle */}
            <button
              type="button"
              onClick={onToggleUnits}
              className="flex items-center justify-center px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-sm bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 border-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              title={t('a11y.toggleUnits')}
              aria-label={t('a11y.toggleUnits')}
            >
              <span className={units === 'celsius' ? 'text-sky-600 dark:text-sky-400 font-extrabold' : 'text-slate-400'}>
                °C
              </span>
              <span className="mx-1 text-slate-300 dark:text-slate-600">/</span>
              <span className={units === 'fahrenheit' ? 'text-sky-600 dark:text-sky-400 font-extrabold' : 'text-slate-400'}>
                °F
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 rounded-xl transition-all border shadow-sm bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 border-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              aria-label={t('a11y.toggleTheme')}
              title={t('a11y.toggleTheme')}
            >
              {theme === 'dark' ? (
                <Sun size={16} className="text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon size={16} className="text-slate-700 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-sm bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 border-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                aria-label={t('a11y.selectLanguage')}
                aria-expanded={langMenuOpen}
              >
                <Globe size={14} className="text-sky-500" />
                <span className="font-bold">{currentLangObj.short}</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-40 rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700/80 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {LANGUAGES.map((lang) => {
                    const isSelected = language === lang.code
                    return (
                      <button
                        type="button"
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code)
                          setLangMenuOpen(false)
                        }}
                        className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between text-xs font-medium transition-colors ${
                          isSelected
                            ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] uppercase text-slate-400">
                            {lang.short}
                          </span>
                          <span>{lang.label}</span>
                        </div>
                        {isSelected && <Check size={14} className="text-sky-500" />}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
