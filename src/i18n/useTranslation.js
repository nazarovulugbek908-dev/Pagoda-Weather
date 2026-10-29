import { useLanguage } from './LanguageContext'

export function useTranslation() {
  const { t, language, setLanguage, locale } = useLanguage()
  return { t, language, setLanguage, locale }
}

export default useTranslation

