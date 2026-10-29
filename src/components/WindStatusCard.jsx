import { useMemo } from 'react'
import { Wind } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'
import TiltCard from './TiltCard'

export default function WindStatusCard({ hourly, currentSpeed, units }) {
  const { t, language } = useTranslation()

  const windUnit = units === 'celsius'
    ? (language === 'ru' ? 'км/ч' : language === 'uz' ? 'km/s' : 'km/h')
    : (language === 'ru' ? 'миль/ч' : 'mph')

  const speedDisplay = currentSpeed !== undefined && currentSpeed !== null
    ? Number(currentSpeed).toFixed(2)
    : '3.40'

  // Extract next 12 hours of windspeed telemetry
  const sparkData = useMemo(() => {
    const list = hourly?.windspeed_10m || []
    if (!list.length) {
      return [3.1, 3.4, 2.9, 3.8, 3.2, 2.7, 3.5, 4.1, 3.0, 3.6, 2.8, 3.4]
    }
    const now = new Date().getHours()
    const slice = list.slice(now, now + 14)
    return slice.length >= 6 ? slice : list.slice(0, 14)
  }, [hourly])

  // Generate smooth SVG Bezier path for the sparkline
  const { pathData, bars } = useMemo(() => {
    const min = Math.min(...sparkData)
    const max = Math.max(...sparkData)
    const range = max - min || 1
    const width = 240
    const height = 48

    const points = sparkData.map((val, idx) => {
      const x = (idx / (sparkData.length - 1)) * width
      const normalized = (val - min) / range
      const y = height - normalized * (height - 12) - 6
      return { x, y, val, normalized }
    })

    let d = `M ${points[0].x} ${points[0].y}`
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i]
      const p1 = points[i + 1]
      const cpX1 = p0.x + (p1.x - p0.x) / 2
      const cpY1 = p0.y
      const cpX2 = cpX1
      const cpY2 = p1.y
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`
    }

    const barList = sparkData.map((v, i) => {
      const norm = (v - min) / range
      return {
        x: (i / sparkData.length) * 100,
        height: Math.max(15, Math.round(norm * 85)),
      }
    })

    return { pathData: d, bars: barList }
  }, [sparkData])

  return (
    <TiltCard
      maxTilt={5}
      className="relative overflow-hidden rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 p-4 sm:p-5 shadow-xl select-none transition-all hover:bg-white/20"
    >
      {/* Header */}
      <div className="flex items-center justify-between text-white mb-3">
        <div className="flex items-center gap-2">
          <Wind size={15} className="text-white drop-shadow-sm" />
          <span className="text-xs sm:text-sm font-medium tracking-wide text-white drop-shadow-sm">
            {t('weather.windSpeed')}
          </span>
        </div>
        <div className="text-right">
          <span className="text-sm sm:text-base font-semibold tracking-tight text-white drop-shadow-sm">
            {speedDisplay}
          </span>
          <span className="text-[11px] font-normal text-white/80 ml-1">
            {windUnit}
          </span>
        </div>
      </div>

      {/* Sleek Sparkline Wave */}
      <div className="relative w-full h-14 flex items-center justify-center my-1">
        <svg
          viewBox="0 0 240 48"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="windGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
              <stop offset="50%" stopColor="rgba(255,255,255,1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.7)" />
            </linearGradient>
          </defs>
          <path
            d={pathData}
            fill="none"
            stroke="url(#windGlow)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="drop-shadow(0 1px 3px rgba(255,255,255,0.4))"
          />
        </svg>
      </div>

      {/* Minimalist Bar Histogram */}
      <div className="flex items-end justify-between gap-1 h-4 pt-1 px-1 opacity-75">
        {bars.slice(0, 20).map((bar, i) => (
          <div
            key={i}
            className="w-1 bg-white/70 rounded-full transition-all duration-300"
            style={{ height: `${bar.height}%` }}
          />
        ))}
      </div>
    </TiltCard>
  )
}
