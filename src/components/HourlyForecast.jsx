import { useRef } from 'react'
import { useTranslation } from '../i18n/useTranslation'
import { WeatherIcon } from '../utils/weatherUtils'
import { Droplets } from 'lucide-react'

export default function HourlyForecast({ hourly, units }) {
  const { t, locale } = useTranslation()
  const scrollRef = useRef(null)

  if (!hourly?.time?.length) return null

  const tempUnit = units === 'celsius' ? '°C' : '°F'
  const now = new Date()

  // Get 24 hours from current hour
  const currentHourIndex = hourly.time.findIndex((timeStr) => {
    const d = new Date(timeStr)
    return d >= now
  })
  const startIdx = currentHourIndex >= 0 ? currentHourIndex : 0
  const slice = hourly.time.slice(startIdx, startIdx + 24)

  return (
    <div className="relative z-10 w-full select-none">
      <div className="bg-white/80 dark:bg-slate-900/65 backdrop-blur-2xl rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl p-5 sm:p-6 transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900 dark:text-white font-bold text-base sm:text-lg tracking-tight">
            {t('forecast.hourly')}
          </h3>
          <span className="text-xs text-slate-400 dark:text-slate-400 font-medium">
            24h
          </span>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent"
        >
          {slice.map((timeStr, i) => {
            const idx = startIdx + i
            const d = new Date(timeStr)
            const isNow = i === 0
            const temp = hourly.temperature_2m?.[idx]
            const code = hourly.weathercode?.[idx] ?? 0
            const isDay = hourly.is_day?.[idx] !== undefined ? Boolean(hourly.is_day[idx]) : true
            const precip = hourly.precipitation_probability?.[idx] ?? 0

            const hourLabel = isNow
              ? t('time.now')
              : d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false })

            return (
              <div
                key={`${timeStr}-${idx}`}
                className={`flex-shrink-0 flex flex-col items-center gap-2 px-3.5 py-3 rounded-2xl border transition-all min-w-[76px] ${
                  isNow
                    ? 'bg-sky-500/10 dark:bg-sky-500/20 border-sky-500/40 shadow-sm'
                    : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/60 dark:border-white/5 hover:bg-slate-100/80 dark:hover:bg-slate-800/70'
                }`}
              >
                <span className={`text-xs font-semibold ${isNow ? 'text-sky-600 dark:text-sky-400' : 'text-slate-500 dark:text-slate-400'}`}>
                  {hourLabel}
                </span>

                <div className="my-0.5">
                  <WeatherIcon code={code} isDay={isDay} size={22} />
                </div>

                <span className="text-slate-900 dark:text-white font-extrabold text-sm">
                  {temp !== undefined ? `${Math.round(temp)}${tempUnit}` : '--'}
                </span>

                <div className="h-4 flex items-center justify-center">
                  {precip > 0 ? (
                    <span className="flex items-center gap-0.5 text-[11px] font-semibold text-sky-500 dark:text-sky-400">
                      <Droplets size={10} />
                      {precip}%
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-300 dark:text-slate-700">-</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
