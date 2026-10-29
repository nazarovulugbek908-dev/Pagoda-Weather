import { useState, useEffect, useCallback } from 'react'
import { LanguageProvider } from './i18n/LanguageContext'
import { useTranslation } from './i18n/useTranslation'
import { useWeather } from './hooks/useWeather'
import { getWeatherAnimation } from './utils/weatherUtils'
import { getDayNight } from './utils/dateUtils'

import WeatherBackground from './components/WeatherBackground'
import TopBar from './components/TopBar'
import HeroWeatherCard from './components/HeroWeatherCard'
import CentralWeatherHero from './components/CentralWeatherHero'
import WindStatusCard from './components/WindStatusCard'
import SunTrackerCard from './components/SunTrackerCard'
import WeeklyTimeline from './components/WeeklyTimeline'
import WeatherMap from './components/WeatherMap'
import LoadingScreen from './components/LoadingScreen'
import ErrorBoundary from './components/ErrorBoundary'
import { AlertTriangle, RefreshCw, WifiOff } from 'lucide-react'

const DEFAULT_CITY = {
  name: 'Tashkent',
  country: 'Uzbekistan',
  admin1: 'Tashkent',
  latitude: 41.2995,
  longitude: 69.2401,
  timezone: 'Asia/Tashkent',
}

function loadStorage(key, fallback) {
  try {
    const val = localStorage.getItem(key)
    if (val === null) return fallback
    return JSON.parse(val)
  } catch {
    return fallback
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

function AppInner() {
  const { t, locale } = useTranslation()

  const [city, setCity] = useState(() => loadStorage('pagoda-city', DEFAULT_CITY))
  const [units, setUnits] = useState(() => loadStorage('pagoda-units', 'celsius'))
  const [activeNav, setActiveNav] = useState('home')
  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Persist settings
  useEffect(() => { saveStorage('pagoda-city', city) }, [city])
  useEffect(() => { saveStorage('pagoda-units', units) }, [units])

  const { weather, hourly, daily, loading, error } = useWeather(
    city?.name,
    city?.latitude,
    city?.longitude,
    units,
    locale
  )

  const isDay = weather?.is_day !== undefined
    ? Boolean(weather.is_day)
    : getDayNight(daily?.sunrise?.[0], daily?.sunset?.[0], new Date())

  const currentWeatherCode = weather?.weathercode ?? daily?.weathercode?.[0] ?? 0
  const animationType = getWeatherAnimation(currentWeatherCode, isDay)

  const handleSelectCity = useCallback((newCity) => {
    setCity(newCity)
    setActiveNav('home')
    setSearchModalOpen(false)
  }, [])

  const toggleUnits = () => setUnits((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'))

  return (
    <div className="relative min-h-screen font-sans text-white select-none overflow-x-hidden flex flex-col justify-center items-center py-4 px-3 sm:py-6 sm:px-6">
      {/* Realistic Atmosphere Background matching Dribbble reference */}
      <WeatherBackground
        animationType={animationType}
        isDay={isDay}
        windSpeed={weather?.windspeed}
      />

      {/* Main Glassmorphic Dashboard Container (spans widely with open center) */}
      <div className="relative z-10 w-full max-w-6xl rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/25 shadow-2xl p-4 sm:p-7 transition-all flex flex-col justify-between gap-6">
        {/* Offline Warning Banner */}
        {isOffline && (
          <div className="bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs py-2 px-4 rounded-xl flex items-center justify-center gap-2 mb-2 animate-in fade-in">
            <WifiOff size={14} className="flex-shrink-0" />
            <span>{t('error.network') || "Tarmoq bilan aloqa uzildi. Keshdagi ma'lumotlar ko'rsatilmoqda."}</span>
          </div>
        )}

        {/* Top Navigation Bar: Single Unified Bar with Search */}
        <TopBar
          city={city}
          units={units}
          onToggleUnits={toggleUnits}
          activeNav={activeNav}
          onSelectNav={setActiveNav}
          onSelectCity={handleSelectCity}
        />

        {/* Loading State */}
        {loading && <LoadingScreen />}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-16 px-4">
            <div className="inline-flex p-4 rounded-3xl bg-rose-500/20 text-rose-200 border border-rose-500/30 mb-4">
              <AlertTriangle size={36} />
            </div>
            <h3 className="text-xl font-bold text-white">
              {t('error.fetchFailed')}
            </h3>
            <p className="text-white/70 text-sm mt-1 max-w-md mx-auto">
              {error}
            </p>
            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition-colors border border-white/30"
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={14} />
              <span>{t('error.retry')}</span>
            </button>
          </div>
        )}

        {/* Normal Content: Home Dashboard */}
        {!loading && !error && activeNav === 'home' && (
          <div className="flex flex-col gap-6">
            {/* Upper Section: Left Hero + Central 3D Weather Art & Insight + Right Edge Widgets */}
            <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 min-h-[340px]">
              {/* Left Edge: Hero Weather Information pushed tightly to left */}
              <div className="w-full lg:w-[380px] lg:max-w-[400px] flex flex-col justify-between flex-shrink-0">
                <HeroWeatherCard
                  weather={weather}
                  city={city}
                  units={units}
                  hourly={hourly}
                  daily={daily}
                />
              </div>

              {/* Central Featured Weather Art & Insight (The Hero Element) */}
              <div className="w-full lg:flex-1 flex flex-col items-center justify-center py-2 px-2 lg:px-6 z-20">
                <CentralWeatherHero
                  weather={weather}
                  daily={daily}
                  hourly={hourly}
                  isDay={isDay}
                  units={units}
                />
              </div>

              {/* Right Edge: Stacked Wind Status + Sunset Arc Tracker widgets */}
              <div className="w-full lg:w-[280px] flex flex-col gap-4 justify-between flex-shrink-0">
                <WindStatusCard
                  hourly={hourly}
                  currentSpeed={weather?.windspeed}
                  units={units}
                />

                <SunTrackerCard
                  sunrise={daily?.sunrise?.[0]}
                  sunset={daily?.sunset?.[0]}
                  timezone={city?.timezone}
                />
              </div>
            </div>

            {/* Bottom Section: Weekly Forecast Timeline spanning widely across the bottom */}
            <div className="w-full">
              <WeeklyTimeline daily={daily} units={units} />
            </div>
          </div>
        )}

        {/* Interactive Map View */}
        {!loading && activeNav === 'map' && (
          <div className="my-2">
            <WeatherMap city={city} onSelectCity={handleSelectCity} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AppInner />
      </LanguageProvider>
    </ErrorBoundary>
  )
}
