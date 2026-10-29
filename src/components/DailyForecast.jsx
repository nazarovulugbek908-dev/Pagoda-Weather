import { useTranslation } from '../i18n/useTranslation'
import { WeatherIcon, getWeatherCondition } from '../utils/weatherUtils'
import { formatDayName, formatMonthDay } from '../utils/dateUtils'
import { Droplets } from 'lucide-react'

export default function DailyForecast({ daily, units }) {
  const { t, locale } = useTranslation()

  if (!daily?.time?.length) return null

  const tempUnit = units === 'celsius' ? '°C' : '°F'

  return (
    <div className="relative z-10 w-full select-none">
      <div className="bg-white/80 dark:bg-slate-900/65 backdrop-blur-2xl rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl p-5 sm:p-6 transition-colors duration-300">
        <h3 className="text-slate-900 dark:text-white font-bold text-base sm:text-lg mb-4 tracking-tight">
          {t('forecast.daily')}
        </h3>

        <div className="flex flex-col gap-2">
          {daily.time.slice(0, 7).map((dateStr, i) => {
            const date = new Date(dateStr)
            date.setHours(12, 0, 0, 0)
            const isToday = i === 0
            const isTomorrow = i === 1
            const code = daily.weathercode?.[i] ?? 0
            const max = daily.temperature_2m_max?.[i]
            const min = daily.temperature_2m_min?.[i]
            const precipProb = daily.precipitation_probability_max?.[i] ?? 0
            const cond = getWeatherCondition(code, t)

            let dayLabel
            if (isToday) dayLabel = t('forecast.today')
            else if (isTomorrow) dayLabel = t('forecast.tomorrow')
            else dayLabel = formatDayName(date, locale, 'long')

            const dateLabel = formatMonthDay(date, locale)

            return (
              <div
                key={dateStr}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl border transition-all ${
                  isToday
                    ? 'bg-sky-500/10 dark:bg-sky-500/15 border-sky-500/30 shadow-sm'
                    : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/60 dark:border-white/5 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                }`}
              >
                {/* Day and Date */}
                <div className="w-28 sm:w-36 flex-shrink-0">
                  <p className={`font-semibold text-sm capitalize ${isToday ? 'text-sky-600 dark:text-sky-400 font-bold' : 'text-slate-800 dark:text-white'}`}>
                    {dayLabel}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-400 capitalize">
                    {dateLabel}
                  </p>
                </div>

                {/* Weather Icon + Condition description */}
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <WeatherIcon code={code} isDay={true} size={20} />
                  </div>
                  <span className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-medium truncate capitalize">
                    {cond}
                  </span>
                </div>

                {/* Precipitation Probability */}
                <div className="flex items-center gap-1.5 w-16 sm:w-20 justify-end flex-shrink-0">
                  {precipProb > 0 ? (
                    <span className="flex items-center gap-1 text-xs font-semibold text-sky-500 dark:text-sky-400">
                      <Droplets size={12} />
                      {precipProb}%
                    </span>
                  ) : (
                    <span className="text-xs text-slate-300 dark:text-slate-700">-</span>
                  )}
                </div>

                {/* Temperature Min / Max */}
                <div className="flex items-center gap-2 w-24 sm:w-28 justify-end flex-shrink-0 text-sm font-mono">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {max !== undefined ? `${Math.round(max)}${tempUnit}` : '--'}
                  </span>
                  <span className="text-slate-400 dark:text-slate-400">
                    {min !== undefined ? `${Math.round(min)}${tempUnit}` : '--'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
