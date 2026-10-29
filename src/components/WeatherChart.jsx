import { useState, useMemo } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { useTranslation } from '../i18n/useTranslation'
import { Thermometer, Droplets, Wind, Gauge } from 'lucide-react'

const TABS = [
  { id: 'temperature', icon: Thermometer },
  { id: 'precipitation', icon: Droplets },
  { id: 'wind', icon: Wind },
  { id: 'humidity', icon: Gauge },
]

function CustomTooltip({ active, payload, label, units, tab, t, language }) {
  if (!active || !payload?.length) return null
  const val = payload[0]?.value
  let unit = ''
  if (tab === 'temperature') unit = units === 'celsius' ? '°C' : '°F'
  else if (tab === 'precipitation') unit = '%'
  else if (tab === 'wind') unit = units === 'celsius' ? (language === 'ru' ? ' км/ч' : language === 'uz' ? ' km/s' : ' km/h') : (language === 'ru' ? ' миль/ч' : ' mph')
  else if (tab === 'humidity') unit = '%'

  return (
    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-3.5 py-2.5 rounded-2xl shadow-xl text-xs border border-slate-200 dark:border-slate-700">
      <p className="font-medium text-slate-400 dark:text-slate-400 mb-0.5">{label}</p>
      <p className="font-bold text-base text-slate-900 dark:text-white">
        {typeof val === 'number' ? Math.round(val) : val}
        <span className="text-xs font-normal text-sky-500 dark:text-sky-400 ml-1">{unit}</span>
      </p>
    </div>
  )
}

export default function WeatherChart({ hourly, units, theme = 'light' }) {
  const { t, locale, language } = useTranslation()
  const [activeTab, setActiveTab] = useState('temperature')

  const chartData = useMemo(() => {
    if (!hourly?.time) return []
    const now = new Date()
    const startIdx = hourly.time.findIndex((ts) => new Date(ts) >= now)
    const idx = startIdx >= 0 ? startIdx : 0

    return hourly.time.slice(idx, idx + 24).map((ts, i) => {
      const d = new Date(ts)
      const label = d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false })
      const realIdx = idx + i
      return {
        time: label,
        temperature: hourly.temperature_2m?.[realIdx] ?? null,
        precipitation: hourly.precipitation_probability?.[realIdx] ?? null,
        wind: hourly.windspeed_10m?.[realIdx] ?? null,
        humidity: hourly.relativehumidity_2m?.[realIdx] ?? null,
      }
    })
  }, [hourly, locale])

  if (!chartData.length) return null

  const isDark = theme === 'dark'
  const gridStroke = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  const tickColor = isDark ? '#94a3b8' : '#64748b'

  const tabConfig = {
    temperature: { color: '#0284c7', key: 'temperature', type: 'line' },
    precipitation: { color: '#3b82f6', key: 'precipitation', type: 'bar' },
    wind: { color: '#10b981', key: 'wind', type: 'line' },
    humidity: { color: '#8b5cf6', key: 'humidity', type: 'line' },
  }

  const cfg = tabConfig[activeTab]

  const yLabel = () => {
    if (activeTab === 'temperature') return units === 'celsius' ? '°C' : '°F'
    if (activeTab === 'precipitation') return '%'
    if (activeTab === 'wind') return units === 'celsius' ? (language === 'ru' ? 'км/ч' : language === 'uz' ? 'km/s' : 'km/h') : 'mph'
    if (activeTab === 'humidity') return '%'
    return ''
  }

  return (
    <div className="relative z-10 w-full select-none">
      <div className="bg-white/80 dark:bg-slate-900/65 backdrop-blur-2xl rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl p-5 sm:p-6 transition-colors duration-300">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h3 className="text-slate-900 dark:text-white font-bold text-base sm:text-lg tracking-tight">
            {t(`chart.${activeTab}`)}
          </h3>

          {/* Metric Selector Tabs */}
          <div className="flex gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5 flex-wrap">
            {TABS.map((item) => {
              const Icon = item.icon
              const isSelected = activeTab === item.id
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon size={13} />
                  <span>{t(`chart.${item.id}`)}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            {cfg.type === 'line' ? (
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis
                  dataKey="time"
                  tick={{ fill: tickColor, fontSize: 11, fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                  interval={3}
                />
                <YAxis
                  tick={{ fill: tickColor, fontSize: 11, fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                  unit={yLabel()}
                />
                <Tooltip
                  content={
                    <CustomTooltip
                      units={units}
                      tab={activeTab}
                      t={t}
                      language={language}
                    />
                  }
                />
                <Line
                  type="monotone"
                  dataKey={cfg.key}
                  stroke={cfg.color}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, fill: cfg.color, stroke: isDark ? '#0f172a' : '#ffffff', strokeWidth: 2 }}
                />
              </LineChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis
                  dataKey="time"
                  tick={{ fill: tickColor, fontSize: 11, fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                  interval={3}
                />
                <YAxis
                  tick={{ fill: tickColor, fontSize: 11, fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                  unit="%"
                  domain={[0, 100]}
                />
                <Tooltip
                  content={
                    <CustomTooltip
                      units={units}
                      tab={activeTab}
                      t={t}
                      language={language}
                    />
                  }
                />
                <Bar
                  dataKey={cfg.key}
                  fill={cfg.color}
                  radius={[6, 6, 0, 0]}
                  fillOpacity={0.85}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
