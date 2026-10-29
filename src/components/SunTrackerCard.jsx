import { useMemo } from 'react'
import { Sunset, Sunrise } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'
import { isoToHHMM } from '../utils/dateUtils'
import TiltCard from './TiltCard'

export default function SunTrackerCard({ sunrise, sunset, timezone }) {
  const { t } = useTranslation()

  const sunriseTime = sunrise ? isoToHHMM(sunrise, timezone) : '06:00'
  const sunsetTime = sunset ? isoToHHMM(sunset, timezone) : '18:00'

  // Calculate sun position percentage along the 180° arc
  const sunProgress = useMemo(() => {
    if (!sunrise || !sunset) return 0.65
    const now = Date.now()
    const rise = new Date(sunrise).getTime()
    const set = new Date(sunset).getTime()
    if (now <= rise) return 0.05
    if (now >= set) return 0.95
    return Math.max(0.05, Math.min(0.95, (now - rise) / (set - rise)))
  }, [sunrise, sunset])

  // Coordinates on semicircle (radius = 70, cx = 100, cy = 85)
  // Angle goes from Math.PI (left, sunrise) to 0 (right, sunset)
  const angle = Math.PI * (1 - sunProgress)
  const cx = 100
  const cy = 82
  const r = 68
  const sunX = cx + r * Math.cos(angle)
  const sunY = cy - r * Math.sin(angle)

  return (
    <TiltCard
      maxTilt={5}
      className="relative overflow-hidden rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 p-4 sm:p-5 shadow-xl select-none transition-all hover:bg-white/20"
    >
      {/* Header */}
      <div className="flex items-center justify-between text-white mb-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-wide text-white drop-shadow-sm">
          <Sunset size={14} className="text-white drop-shadow-sm" />
          <span>{t('weather.sunset')}</span>
        </div>
        <div className="text-right font-mono text-xs text-white drop-shadow-sm">
          {sunsetTime}
        </div>
      </div>

      {/* Semicircular Arc Visualization */}
      <div className="relative w-full h-24 flex items-center justify-center my-1">
        <svg viewBox="0 0 200 95" className="w-full h-full overflow-visible">
          {/* Base Horizon Line */}
          <line
            x1="20"
            y1="82"
            x2="180"
            y2="82"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1.2"
          />

          {/* Dotted Celestial Trajectory Arc */}
          <path
            d="M 32 82 A 68 68 0 0 1 168 82"
            fill="none"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="2"
            strokeDasharray="3 4"
            filter="drop-shadow(0 0 2px rgba(255,255,255,0.4))"
          />

          {/* Minimalist Horizon Sun Graphic inside arc */}
          <g transform="translate(100, 78) scale(0.68)" opacity="0.8">
            <path
              d="M -15 0 A 15 15 0 0 1 15 0 Z"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            {/* Sun rays radiating upwards */}
            <line x1="0" y1="-20" x2="0" y2="-27" stroke="white" strokeWidth="2" />
            <line x1="-14" y1="-14" x2="-19" y2="-19" stroke="white" strokeWidth="2" />
            <line x1="14" y1="-14" x2="19" y2="-19" stroke="white" strokeWidth="2" />
            <line x1="-20" y1="0" x2="-27" y2="0" stroke="white" strokeWidth="2" />
            <line x1="20" y1="0" x2="27" y2="0" stroke="white" strokeWidth="2" />
          </g>

          {/* Glowing Golden Sun Indicator on the trajectory */}
          <circle
            cx={sunX}
            cy={sunY}
            r="5"
            fill="#fef08a"
            stroke="#ffffff"
            strokeWidth="1.8"
            filter="drop-shadow(0px 0px 6px rgba(254, 240, 138, 1))"
          />
        </svg>
      </div>

      {/* Sunrise & Sunset Time Footers */}
      <div className="flex items-center justify-between text-[11px] text-white/80 pt-1 font-medium">
        <span className="flex items-center gap-1 font-mono drop-shadow-sm">
          <Sunrise size={11} className="text-amber-200" />
          {sunriseTime}
        </span>
        <span className="flex items-center gap-1 font-mono drop-shadow-sm">
          <Sunset size={11} className="text-orange-200" />
          {sunsetTime}
        </span>
      </div>
    </TiltCard>
  )
}
