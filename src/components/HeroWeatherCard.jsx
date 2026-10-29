import { useMemo } from 'react'
import { MapPin, Sun } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'
import { getWeatherCondition } from '../utils/weatherUtils'
import AnimatedCounter from './AnimatedCounter'
import TiltCard from './TiltCard'

export default function HeroWeatherCard({ weather, city, units, hourly, daily }) {
  const { t, language } = useTranslation()

  const code = weather?.weathercode ?? daily?.weathercode?.[0] ?? 0
  const isRain = (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95
  const temp = weather ? Math.round(weather.temperature) : 26
  const tempUnit = units === 'celsius' ? '°' : '°F'

  // Daily High / Low
  const maxTemp = daily?.temperature_2m_max?.[0] !== undefined ? Math.round(daily.temperature_2m_max[0]) : null
  const minTemp = daily?.temperature_2m_min?.[0] !== undefined ? Math.round(daily.temperature_2m_min[0]) : null

  // Current UV Index
  const uvIndex = hourly?.uv_index?.[0] ?? 2

  const conditionTitle = getWeatherCondition(code, t)

  // Subtitle & narrative generation based on real data (guaranteed non-redundant)
  const { subtitle, narrative } = useMemo(() => {
    if (language === 'uz') {
      if (code === 0 || code === 1) {
        return {
          subtitle: 'toza havo va mayin shabada',
          narrative: "Kam bulutli musaffo osmon. Mayin shabada haroratni mo'tadil saqlaydi, iliq tush va salqin oqshom kutiladi.",
        }
      }
      if (code === 2 || code === 3) {
        return {
          subtitle: "yoqimli o'rtacha sharoit",
          narrative: "Vaqti-vaqti bilan bulutli havo. Shamol tezligi qulay bo'lib, kun davomida yoqimli havo harorati hukm suradi.",
        }
      }
      if (code >= 51 && code <= 67) {
        return {
          subtitle: 'nam va salqin atmosfera',
          narrative: "Yog'ingarchilik kutilmoqda. Tashqariga chiqqanda o'zingiz bilan soyabon olishingiz tavsiya etiladi.",
        }
      }
      return {
        subtitle: "barqaror mo'tadil harorat",
        narrative: "Ob-havo sharoiti barqaror, harorat me'yorida bo'lib, ochiq havoda sayr qilish uchun mos.",
      }
    }

    if (language === 'ru') {
      if (code === 0 || code === 1) {
        return {
          subtitle: 'чистый воздух и комфортная прохлада',
          narrative: 'Ясное небо с редкими облаками. Легкий ветер обеспечивает комфортную температуру, теплый день и свежий вечер.',
        }
      }
      if (code === 2 || code === 3) {
        return {
          subtitle: 'мягкий рассеянный свет',
          narrative: 'Периодическая облачность. Приятный ветер сохраняет комфортные условия на протяжении всего дня.',
        }
      }
      if (code >= 51 && code <= 67) {
        return {
          subtitle: 'влажная и свежая атмосфера',
          narrative: 'Возможны осадки. Рекомендуется взять с собой зонт и одеваться по погоде.',
        }
      }
      return {
        subtitle: 'стабильная температура',
        narrative: 'Стабильные метеоусловия, комфортная температура воздуха для прогулок на свежем воздухе.',
      }
    }

    // Default English
    if (code === 0 || code === 1) {
      return {
        subtitle: 'fresh air and gentle breeze',
        narrative: 'Clear skies with occasional clouds. Light winds keep temperatures comfortable, warm afternoons, and cooler evenings.',
      }
    }
    if (code === 2 || code === 3) {
      return {
        subtitle: 'pleasant scattered clouds',
        narrative: 'Scattered clouds throughout the day with pleasant ambient warmth and gentle atmospheric breezes.',
      }
    }
    if (code >= 51 && code <= 67) {
      return {
        subtitle: 'fresh humid air',
        narrative: 'Active rainfall observed across the region. Consider carrying an umbrella for outdoor activities.',
      }
    }
    return {
      subtitle: 'stable seasonal conditions',
      narrative: 'Fair atmospheric conditions with steady ambient temperatures and mild wind speeds.',
    }
  }, [code, language])

  const titleLength = (conditionTitle || '').length

  return (
    <TiltCard
      isRain={isRain}
      maxTilt={4}
      className="flex flex-col justify-between overflow-hidden rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl p-5 sm:p-7 select-none transition-all w-full"
    >
      {/* Top Headline Section with adaptive typography */}
      <div className="w-full min-w-0">
        <h2
          className={`font-semibold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] leading-[1.15] break-words ${
            titleLength > 18
              ? 'text-xl sm:text-2xl'
              : titleLength > 12
              ? 'text-2xl sm:text-3xl'
              : 'text-3xl sm:text-4xl'
          }`}
        >
          {conditionTitle || 'Mostly Sunny'}
        </h2>

        <p className="text-sm sm:text-base font-medium text-white/90 mt-1.5 capitalize tracking-wide drop-shadow-sm truncate">
          {subtitle}
        </p>

        <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-md mt-3.5 font-normal drop-shadow-sm">
          {narrative}
        </p>
      </div>

      {/* Hero Temperature & Location Meta Section */}
      <div className="mt-6 pt-3">
        <div className="flex items-baseline gap-3">
          <span className="text-6xl sm:text-7xl font-light text-white tracking-tighter drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
            <AnimatedCounter value={temp} />
            {tempUnit}
          </span>

          {maxTemp !== null && minTemp !== null ? (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-white/85 font-mono drop-shadow-sm">
              <span className="flex items-center">+<AnimatedCounter value={maxTemp} />°</span>
              <span className="opacity-40">/</span>
              <span className="flex items-center">-<AnimatedCounter value={minTemp} />°</span>
            </div>
          ) : (
            <span className="text-white/60 text-lg font-light">+/-</span>
          )}
        </div>

        {/* City & UV Meta Details */}
        <div className="flex items-center gap-4 text-xs sm:text-sm text-white/90 mt-3 font-medium drop-shadow-sm">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin size={15} className="text-white drop-shadow flex-shrink-0" />
            <span className="truncate">{city?.name || 'New York'}</span>
          </div>

          <span className="text-white/40">•</span>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Sun size={14} className="text-amber-200 drop-shadow flex-shrink-0" />
            <span>UV Ind: {Math.round(uvIndex)}</span>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}
