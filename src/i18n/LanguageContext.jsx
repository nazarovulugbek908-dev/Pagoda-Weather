import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import translations from './translations'

const VALID_LANGUAGES = ['uz', 'en', 'ru']
const STORAGE_KEY = 'pagoda-language'
const DEFAULT_LANGUAGE = 'uz'

export const LOCALE_MAP = {
  uz: 'uz-UZ',
  en: 'en-GB',
  ru: 'ru-RU',
}

function getSavedLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && VALID_LANGUAGES.includes(saved)) return saved
  } catch {
    // localStorage not available
  }
  return DEFAULT_LANGUAGE
}

function getNestedValue(obj, keyPath) {
  if (!obj || !keyPath) return undefined
  return keyPath.split('.').reduce((current, key) => {
    if (current === null || current === undefined) return undefined
    return current[key]
  }, obj)
}

export const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getSavedLanguage)

  const setLanguage = useCallback((lang) => {
    if (!VALID_LANGUAGES.includes(lang)) return
    setLanguageState(lang)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
      document.documentElement.lang = lang
    } catch {
      // localStorage not available
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const t = useCallback(
    (key, fallback) => {
      const dict = translations[language] || translations[DEFAULT_LANGUAGE]
      const value = getNestedValue(dict, key)
      if (value !== undefined && value !== null) return String(value)

      // Fallback to English dictionary if key missing in current language
      if (language !== 'en') {
        const enVal = getNestedValue(translations.en, key)
        if (enVal !== undefined && enVal !== null) return String(enVal)
      }

      return fallback !== undefined ? fallback : key
    },
    [language]
  )

  const locale = LOCALE_MAP[language] || 'en-GB'

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, locale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
