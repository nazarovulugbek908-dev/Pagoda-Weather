import { useTranslation } from '../i18n/useTranslation'
import { WeatherIcon, getUVInfo, formatWindDir, getWeatherCondition } from '../utils/weatherUtils'
import { formatDuration, isoToHHMM } from '../utils/dateUtils'
import {
  Droplets,
  Wind,
  Eye,
  Thermometer,
  Sunrise,
  Sunset,
  Clock,
  Compass,
  ArrowUp,
  ArrowDown,
  Sun,
} from 'lucide-react'

function StatCard({ icon: Icon, label, value, unit, highlightClass = '' }) {
  return (
    <div className="bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-3.5 flex flex-col justify-between border border-slate-200/60 dark:border-white/5 transition-all hover:border-slate-300 dark:hover:border-white/10 shadow-sm">
      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium">
        <Icon size={14} className="text-sky-500 dark:text-sky-400 flex-shrink-0" />
        <span className="truncate">{label}</span>
      </div>
      <div className={`mt-2 font-bold text-lg text-slate-800 dark:text-white leading-tight flex items-baseline gap-1 ${highlightClass}`}>
        <span>{value}</span>
        {unit && <span className="text-xs font-normal text-slate-400 dark:text-slate-400">{unit}</span>}
      </div>
    </div>
  )
}

export default function CurrentWeather({ weather, hourly, daily, city, units }) {
  const { t, language, locale } = useTranslation()

  if (!weather) return null

  const code = weather.weathercode ?? daily?.weathercode?.[0] ?? 0
  const isDay = weather.is_day !== undefined ? Boolean(weather.is_day) : true
  const temp = Math.round(weather.temperature)
  const tempUnit = units === 'celsius' ? '°C' : '°F'
  const windUnit = units === 'celsius'
    ? (language === 'ru' ? 'км/ч' : language === 'uz' ? 'km/s' : 'km/h')
    : (language === 'ru' ? 'миль/ч' : 'mph')

  // Find corresponding hourly index
  const now = new Date()
  const currentHour = now.getHours()
  const hourlyTimes = hourly?.time || []
  const currentHourIndex = hourlyTimes.findIndex((t) => {
    const d = new Date(t)
    return d.getHours() === currentHour && d.getDate() === now.getDate()
  })
  const idx = currentHourIndex >= 0 ? currentHourIndex : 0

  const feelsLike = hourly?.apparent_temperature?.[idx] ?? null
  const humidity = hourly?.relativehumidity_2m?.[idx] ?? null
  const visibility = hourly?.visibility?.[idx] ?? null
  const dewPoint = hourly?.dewpoint_2m?.[idx] ?? null
  const uvIndex = hourly?.uv_index?.[idx] ?? null
  const windDir = hourly?.winddirection_10m?.[idx] ?? weather.winddirection ?? null

  // Daily extremes
  const todayMax = daily?.temperature_2m_max?.[0] ?? null
  const todayMin = daily?.temperature_2m_min?.[0] ?? null
  const sunrise = daily?.sunrise?.[0] ?? null
  const sunset = daily?.sunset?.[0] ?? null

  // Daylight duration
  let daylightStr = ''
  if (sunrise && sunset) {
    const riseMs = new Date(sunrise).getTime()
    const setMs = new Date(sunset).getTime()
    const diffMin = Math.round((setMs - riseMs) / 60000)
    daylightStr = formatDuration(diffMin, language)
  }

  const conditionText = getWeatherCondition(code, t)
  const visKm = visibility ? (visibility / 1000).toFixed(1) : null
  const uvInfo = getUVInfo(uvIndex, t)

  return (
    <div className="relative z-10 w-full select-none">
      <div className="bg-white/80 dark:bg-slate-900/65 backdrop-blur-2xl rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl dark:shadow-2xl p-6 sm:p-8 transition-colors duration-300">
        {/* City and Context Heading */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {city?.name || ''}
              </h2>
              {city?.country && (
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  {[city.admin1, city.country].filter(Boolean).join(', ')}
                </span>
              )}
            </div>
            <p className="text-xs uppercase tracking-wider font-semibold text-sky-600 dark:text-sky-400 mt-1">
              {t('weather.currentWeather')}
            </p>
          </div>
        </div>

        {/* Temperature & Hero Weather Icon */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-5">
            <div className="p-4 rounded-2xl bg-sky-500/10 dark:bg-white/5 border border-sky-500/20 dark:border-white/10 shadow-inner flex items-center justify-center">
              <WeatherIcon code={code} isDay={isDay} size={56} />
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                {temp}<span className="text-3xl sm:text-4xl font-normal text-sky-600 dark:text-sky-400">{tempUnit}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-200 font-semibold text-lg mt-1.5 capitalize">
                {conditionText}
              </p>
              {feelsLike !== null && (
                <p className="text-slate-400 dark:text-slate-400 text-xs mt-0.5">
                  {t('weather.feelsLike')} <span className="font-semibold text-slate-600 dark:text-slate-300">{Math.round(feelsLike)}{tempUnit}</span>
                </p>
              )}
            </div>
          </div>

          {/* High / Low summary badge */}
          {todayMax !== null && todayMin !== null && (
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5 text-sm">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-white">
                <ArrowUp size={15} className="text-rose-500" />
                <span>{Math.round(todayMax)}{tempUnit}</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-white">
                <ArrowDown size={15} className="text-sky-500" />
                <span>{Math.round(todayMin)}{tempUnit}</span>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Meteorological Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-6">
          {humidity !== null && (
            <StatCard
              icon={Droplets}
              label={t('weather.humidity')}
              value={`${humidity}`}
              unit="%"
            />
          )}

          {weather.windspeed !== null && weather.windspeed !== undefined && (
            <StatCard
              icon={Wind}
              label={t('weather.windSpeed')}
              value={`${Math.round(weather.windspeed)}`}
              unit={windUnit}
            />
          )}

          {windDir !== null && (
            <StatCard
              icon={Compass}
              label={t('weather.windDirection')}
              value={formatWindDir(windDir, t)}
            />
          )}

          {visKm && (
            <StatCard
              icon={Eye}
              label={t('weather.visibility')}
              value={visKm}
              unit="km"
            />
          )}

          {dewPoint !== null && (
            <StatCard
              icon={Thermometer}
              label={t('weather.dewPoint')}
              value={`${Math.round(dewPoint)}`}
              unit={tempUnit}
            />
          )}

          {uvIndex !== null && (
            <StatCard
              icon={Sun}
              label={t('weather.uvIndex')}
              value={`${Math.round(uvIndex)} (${uvInfo.label})`}
              highlightClass={uvInfo.color}
            />
          )}

          {sunrise && (
            <StatCard
              icon={Sunrise}
              label={t('weather.sunrise')}
              value={isoToHHMM(sunrise, city?.timezone)}
            />
          )}

          {sunset && (
            <StatCard
              icon={Sunset}
              label={t('weather.sunset')}
              value={isoToHHMM(sunset, city?.timezone)}
            />
          )}

          {daylightStr && (
            <StatCard
              icon={Clock}
              label={t('weather.daylight')}
              value={daylightStr}
            />
          )}
        </div>
      </div>
    </div>
  )
}
