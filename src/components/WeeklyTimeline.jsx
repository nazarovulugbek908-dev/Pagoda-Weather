import { useMemo } from 'react'
import { useTranslation } from '../i18n/useTranslation'
import { WeatherIcon } from './WeatherIcon'
import { formatDayName } from '../utils/dateUtils'
import AnimatedCounter from './AnimatedCounter'
import TiltCard from './TiltCard'

export default function WeeklyTimeline({ daily, units }) {
  const { t, locale } = useTranslation()

  const tempUnit = units === 'celsius' ? '°' : '°F'

  // Extract 7 days of forecast telemetry
  const daysData = useMemo(() => {
    const times = daily?.time || []
    if (!times.length) {
      const sampleDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      const sampleTemps = [26, 28, 24, 26, 23, 26, 27]
      const sampleCodes = [1, 0, 2, 0, 3, 2, 1]
      return sampleDays.map((name, i) => ({
        dayLabel: name,
        temp: sampleTemps[i],
        code: sampleCodes[i],
        isToday: i === 0,
      }))
    }

    return times.slice(0, 7).map((dateStr, i) => {
      const date = new Date(dateStr)
      date.setHours(12, 0, 0, 0)
      const isToday = i === 0
      const isTomorrow = i === 1
      const max = daily.temperature_2m_max?.[i]
      const code = daily.weathercode?.[i] ?? 0

      let dayLabel = ''
      if (isToday) dayLabel = t('forecast.today')
      else if (isTomorrow) dayLabel = t('forecast.tomorrow')
      else dayLabel = formatDayName(date, locale, 'long')

      return {
        dateStr,
        dayLabel,
        temp: max !== undefined ? Math.round(max) : 25,
        code,
        isToday,
      }
    })
  }, [daily, locale, t])

  // Calculate smooth SVG curve coordinates threading through all 7 nodes
  const { pathData, points } = useMemo(() => {
    const width = 700
    const height = 80
    const paddingX = 50

    const minTemp = Math.min(...daysData.map((d) => d.temp))
    const maxTemp = Math.max(...daysData.map((d) => d.temp))
    const tempRange = maxTemp - minTemp || 1

    const step = (width - paddingX * 2) / (daysData.length - 1)

    // Calculate (x, y) for each of the 7 days
    const pts = daysData.map((d, i) => {
      const x = paddingX + i * step
      const normalized = (d.temp - minTemp) / tempRange
      // Invert Y so warmer temperature curves higher
      const y = height - (normalized * 36 + 22)
      return { x, y, percentX: (x / width) * 100, percentY: (y / height) * 100 }
    })

    // Construct smooth continuous cubic bezier curve
    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i]
      const p1 = pts[i + 1]
      const cpX1 = p0.x + (p1.x - p0.x) / 2
      const cpY1 = p0.y
      const cpX2 = cpX1
      const cpY2 = p1.y
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`
    }

    return { pathData: d, points: pts }
  }, [daysData])

  return (
    <TiltCard
      maxTilt={3}
      className="relative overflow-hidden rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 p-5 sm:p-7 shadow-xl select-none transition-all w-full"
    >
      {/* 7-Day Columns: Day Names & Temperatures */}
      <div className="grid grid-cols-7 gap-2 text-center text-white mb-1">
        {daysData.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-medium text-white/80 capitalize truncate w-full drop-shadow-sm">
              {item.dayLabel}
            </span>
            <span className="text-sm sm:text-lg font-bold text-white tracking-tight mt-0.5 drop-shadow-sm">
              <AnimatedCounter value={item.temp} />{tempUnit}
            </span>
          </div>
        ))}
      </div>

      {/* Smooth Curved SVG Temperature Line with Weather Icon Nodes */}
      <div className="relative w-full h-20 sm:h-24">
        {/* Continuous Bezier Curve Connecting All 7 Temperature Nodes */}
        <svg
          viewBox="0 0 700 80"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        >
          <defs>
            <linearGradient id="curveGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.95)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.45)" />
            </linearGradient>
            <filter id="glowShadow" x="-10%" y="-20%" width="120%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(255,255,255,0.7)" />
            </filter>
          </defs>

          {/* Smooth Curved Temperature Trend Line */}
          <path
            d={pathData}
            fill="none"
            stroke="url(#curveGlow)"
            strokeWidth="2.4"
            strokeLinecap="round"
            filter="url(#glowShadow)"
          />
        </svg>

        {/* 7 Circular Frosted Glass Nodes Placed Directly on the Spline Points */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {points.map((pt, idx) => {
            const item = daysData[idx]
            return (
              <div
                key={idx}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{
                  left: `${pt.percentX}%`,
                  top: `${pt.percentY}%`,
                }}
              >
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-transform hover:scale-110 shadow-md ${
                    item.isToday
                      ? 'bg-white/45 border-white/70 shadow-white/30 ring-2 ring-white/30'
                      : 'bg-white/25 border-white/35 hover:bg-white/35'
                  }`}
                  title={`${item.dayLabel}: ${item.temp}${tempUnit}`}
                >
                  <WeatherIcon code={item.code} isDay={true} size={16} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </TiltCard>
  )
}
