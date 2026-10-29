import { useMemo } from 'react'
import { Sparkles, Wind, Droplets, Sun, Compass } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'
import { getWeatherAnimation } from '../utils/weatherUtils'

/**
 * 3D-styled SVG Illustrations for each weather state
 */
function WeatherIllustration3D({ condition, isDay = true }) {
  if (condition === 'sunny' && isDay) {
    return (
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
        {/* Rotating Sun Rays Corona */}
        <div className="absolute inset-0 animate-ray-rotate opacity-75">
          <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="18"
                x2="100"
                y2="38"
                stroke="url(#sun-ray-grad)"
                strokeWidth="4"
                strokeLinecap="round"
                transform={`rotate(${i * 30} 100 100)`}
              />
            ))}
            <defs>
              <linearGradient id="sun-ray-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 3D Sun Sphere */}
        <svg viewBox="0 0 160 160" className="w-32 h-32 sm:w-36 sm:h-36 drop-shadow-[0_12px_24px_rgba(245,158,11,0.45)]">
          <defs>
            <radialGradient id="sun-sphere-3d" cx="36%" cy="34%" r="66%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#fef08a" />
              <stop offset="55%" stopColor="#fbbf24" />
              <stop offset="85%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>
            <filter id="sun-inner-glow">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>
          <circle cx="80" cy="80" r="54" fill="url(#sun-sphere-3d)" filter="url(#sun-inner-glow)" />
        </svg>

        {/* Puffy 3D Cloud Floating Over Sun Bottom-Right */}
        <div className="absolute -bottom-1 -right-1 w-28 h-20 sm:w-32 sm:h-22 animate-float">
          <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]">
            <defs>
              <linearGradient id="puffy-cloud-3d" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#f0f9ff" />
                <stop offset="75%" stopColor="#e0f2fe" />
                <stop offset="100%" stopColor="#bae6fd" />
              </linearGradient>
            </defs>
            <path
              d="M30 62 h60 a18 18 0 0 0 4 -35.5 a24 24 0 0 0 -44 -12 a18 18 0 0 0 -20 16 a16 16 0 0 0 0 31.5 z"
              fill="url(#puffy-cloud-3d)"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="1.2"
            />
          </svg>
        </div>
      </div>
    )
  }

  if (condition === 'partly-cloudy') {
    return (
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
        {/* Sun peeking from top-left */}
        <div className="absolute top-2 left-3 w-24 h-24 sm:w-28 sm:h-28">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_8px_18px_rgba(245,158,11,0.5)]">
            <defs>
              <radialGradient id="sun-peeking-3d" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#fef08a" />
                <stop offset="70%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>
            </defs>
            <circle cx="60" cy="60" r="42" fill="url(#sun-peeking-3d)" />
          </svg>
        </div>

        {/* Foreground 3D Cloud */}
        <div className="relative z-10 w-36 h-26 sm:w-44 sm:h-30 mt-4 ml-4 animate-float">
          <svg viewBox="0 0 140 90" className="w-full h-full drop-shadow-[0_12px_22px_rgba(15,23,42,0.28)]">
            <defs>
              <linearGradient id="cloud-partly-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#f8fafc" />
                <stop offset="80%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
            </defs>
            <path
              d="M34 72 h74 a20 20 0 0 0 4 -39.5 a28 28 0 0 0 -52 -13.5 a20 20 0 0 0 -26 21 a18 18 0 0 0 0 32 z"
              fill="url(#cloud-partly-grad)"
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="1.4"
            />
          </svg>
        </div>
      </div>
    )
  }

  if (condition === 'rainy' || condition === 'thunderstorm') {
    return (
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex flex-col items-center justify-center">
        {/* Dark Moody 3D Storm Cloud */}
        <div className="relative z-10 w-36 h-24 sm:w-42 sm:h-28 drop-shadow-[0_12px_24px_rgba(15,23,42,0.45)] animate-float">
          <svg viewBox="0 0 140 90" className="w-full h-full">
            <defs>
              <linearGradient id="cloud-storm-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="45%" stopColor="#475569" />
                <stop offset="85%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
            </defs>
            <path
              d="M34 72 h74 a20 20 0 0 0 4 -39.5 a28 28 0 0 0 -52 -13.5 a20 20 0 0 0 -26 21 a18 18 0 0 0 0 32 z"
              fill="url(#cloud-storm-grad)"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="1.2"
            />
          </svg>

          {/* Electric Lightning Bolt for Thunderstorms */}
          {condition === 'thunderstorm' && (
            <div className="absolute left-[45%] top-[55%] -translate-x-1/2 w-8 h-14 drop-shadow-[0_0_12px_rgba(250,204,21,0.9)] animate-pulse">
              <svg viewBox="0 0 30 60" className="w-full h-full fill-amber-300 stroke-yellow-100">
                <polygon points="18,0 4,32 16,32 10,60 28,24 16,24" />
              </svg>
            </div>
          )}
        </div>

        {/* Animated Rain Drops Falling Under Cloud */}
        <div className="flex justify-center gap-4 mt-1 px-4 z-0">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="w-1.5 h-4.5 rounded-full bg-gradient-to-b from-sky-200 to-sky-400 opacity-90 shadow-sm animate-raindrop-fall"
              style={{
                animationDelay: `${idx * 0.28}s`,
                transform: 'rotate(15deg)',
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (condition === 'snowy') {
    return (
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex flex-col items-center justify-center">
        {/* Frosted Icy 3D Cloud */}
        <div className="relative z-10 w-36 h-24 sm:w-42 sm:h-28 drop-shadow-[0_12px_22px_rgba(56,189,248,0.25)] animate-float">
          <svg viewBox="0 0 140 90" className="w-full h-full">
            <defs>
              <linearGradient id="cloud-snow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#f0f9ff" />
                <stop offset="80%" stopColor="#e0f2fe" />
                <stop offset="100%" stopColor="#bae6fd" />
              </linearGradient>
            </defs>
            <path
              d="M34 72 h74 a20 20 0 0 0 4 -39.5 a28 28 0 0 0 -52 -13.5 a20 20 0 0 0 -26 21 a18 18 0 0 0 0 32 z"
              fill="url(#cloud-snow-grad)"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="1.4"
            />
          </svg>
        </div>

        {/* Floating Crystalline Snowflakes */}
        <div className="flex justify-center gap-5 mt-1 px-2 z-0">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse"
              style={{ animationDelay: `${idx * 0.4}s` }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (condition === 'night' || !isDay) {
    return (
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
        {/* Twinkling Stars Background */}
        <div className="absolute inset-2 pointer-events-none">
          <div className="absolute top-2 left-6 w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="absolute top-8 right-6 w-2 h-2 rounded-full bg-amber-100 animate-pulse" style={{ animationDelay: '0.8s' }} />
          <div className="absolute bottom-6 left-10 w-1.5 h-1.5 rounded-full bg-sky-200 animate-pulse" style={{ animationDelay: '1.4s' }} />
        </div>

        {/* 3D Crescent Moon */}
        <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 drop-shadow-[0_10px_25px_rgba(167,139,250,0.4)] animate-float">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id="moon-3d-grad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#fef08a" />
                <stop offset="75%" stopColor="#fde047" />
                <stop offset="100%" stopColor="#eab308" />
              </radialGradient>
            </defs>
            <path
              d="M75 15 A42 42 0 1 0 85 85 A34 34 0 1 1 75 15 Z"
              fill="url(#moon-3d-grad)"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        {/* Gentle Night Mist Cloud */}
        <div className="absolute -bottom-1 -right-2 w-28 h-18 opacity-85">
          <svg viewBox="0 0 120 70" className="w-full h-full drop-shadow-[0_6px_12px_rgba(15,23,42,0.4)]">
            <defs>
              <linearGradient id="cloud-night-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>
            <path
              d="M26 56 h68 a16 16 0 0 0 4 -31.5 a22 22 0 0 0 -40 -11 a16 16 0 0 0 -18 15 a14 14 0 0 0 0 27.5 z"
              fill="url(#cloud-night-grad)"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
    )
  }

  // Default: Cloudy / Overcast 3D scene
  return (
    <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
      {/* Background Cloud */}
      <div className="absolute top-2 left-2 w-32 h-22 opacity-70 animate-float" style={{ animationDelay: '-2s' }}>
        <svg viewBox="0 0 120 70" className="w-full h-full">
          <defs>
            <linearGradient id="cloud-back-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          <path
            d="M26 56 h68 a16 16 0 0 0 4 -31.5 a22 22 0 0 0 -40 -11 a16 16 0 0 0 -18 15 a14 14 0 0 0 0 27.5 z"
            fill="url(#cloud-back-grad)"
          />
        </svg>
      </div>

      {/* Foreground Volumetric Cloud */}
      <div className="relative z-10 w-38 h-26 sm:w-44 sm:h-30 mt-3 animate-float drop-shadow-[0_12px_24px_rgba(15,23,42,0.3)]">
        <svg viewBox="0 0 140 90" className="w-full h-full">
          <defs>
            <linearGradient id="cloud-front-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#f8fafc" />
              <stop offset="80%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>
          <path
            d="M34 72 h74 a20 20 0 0 0 4 -39.5 a28 28 0 0 0 -52 -13.5 a20 20 0 0 0 -26 21 a18 18 0 0 0 0 32 z"
            fill="url(#cloud-front-grad)"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1.4"
          />
        </svg>
      </div>
    </div>
  )
}

/**
 * Central Featured Weather Art & Insight Hero Component
 */
export default function CentralWeatherHero({ weather, daily, hourly, isDay = true, units }) {
  const { language } = useTranslation()

  const code = weather?.weathercode ?? daily?.weathercode?.[0] ?? 0
  const condition = getWeatherAnimation(code, isDay)
  const uvVal = hourly?.uv_index?.[0] ?? 2
  const humidityVal = hourly?.relativehumidity_2m?.[0] ?? 48
  const windVal = weather?.windspeed ? Math.round(weather.windspeed) : 12

  // Atmosphere themes & contextual tips based on weather condition
  const theme = useMemo(() => {
    if (condition === 'sunny' && isDay) {
      return {
        ambientGlow: 'radial-gradient(circle, rgba(251,191,36,0.45) 0%, rgba(245,158,11,0.22) 45%, rgba(254,240,138,0.05) 70%, transparent 85%)',
        radarRingColor: 'text-amber-300',
        aqiValue: 32,
        aqiLevel: { uz: 'Juda Yaxshi', en: 'Excellent', ru: 'Отличное' },
        bestTime: {
          uz: 'Sayr qilish uchun ajoyib vaqt!',
          en: 'Great time for outdoor activities!',
          ru: 'Отличное время для прогулок!',
        },
        tip: {
          uz: "Musaffo osmon va toza havo. Ochiq havoda mashg'ulotlar uchun juda qulay.",
          en: 'Clear skies and crisp air. Perfect conditions for outdoor plans.',
          ru: 'Ясное небо и свежий воздух. Прекрасно для дел на открытом воздухе.',
        },
      }
    }

    if (condition === 'rainy' || condition === 'thunderstorm') {
      return {
        ambientGlow: 'radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(14,165,233,0.18) 50%, transparent 80%)',
        radarRingColor: 'text-sky-300',
        aqiValue: 24,
        aqiLevel: { uz: 'Toza & Yangilangan', en: 'Fresh & Clean', ru: 'Свежо и чисто' },
        bestTime: {
          uz: 'Soyabon olishni unutmang!',
          en: 'Keep your umbrella handy!',
          ru: 'Не забудьте взять зонт!',
        },
        tip: {
          uz: "Yog'ingarchilik kutilmoqda. Issiq kiyining va transportda ehtiyot bo'ling.",
          en: 'Rain showers in progress. Stay dry and drive with extra care.',
          ru: 'Ожидаются осадки. Одевайтесь по погоде и будьте осторожны.',
        },
      }
    }

    if (condition === 'snowy') {
      return {
        ambientGlow: 'radial-gradient(circle, rgba(224,242,254,0.45) 0%, rgba(186,230,253,0.2) 50%, transparent 80%)',
        radarRingColor: 'text-cyan-200',
        aqiValue: 18,
        aqiLevel: { uz: 'Musaffo Qorli', en: 'Crisp & Pure', ru: 'Кристально чистый' },
        bestTime: {
          uz: 'Issiq choy va qulaylik vaqti',
          en: 'Cozy up with warm drinks',
          ru: 'Время для теплого чая и уюта',
        },
        tip: {
          uz: "Yumshoq qor yog'ishi. Qalin kiyim kiying va qorli manzaradan bahramand bo'ling.",
          en: 'Gentle snowflakes drifting. Dress warmly and enjoy the scene.',
          ru: 'Снегопад. Одевайтесь теплее и берегите себя на дорогах.',
        },
      }
    }

    if (condition === 'night' || !isDay) {
      return {
        ambientGlow: 'radial-gradient(circle, rgba(167,139,250,0.35) 0%, rgba(99,102,241,0.18) 50%, transparent 80%)',
        radarRingColor: 'text-indigo-300',
        aqiValue: 26,
        aqiLevel: { uz: 'Tinch & Osuda', en: 'Calm & Pure', ru: 'Тихо и спокойно' },
        bestTime: {
          uz: 'Sokin va yulduzli tun',
          en: 'Peaceful and starry night',
          ru: 'Спокойная звездная ночь',
        },
        tip: {
          uz: "Tungi havo harorati mo'tadil. Yaxshi dam oling va maroqli hordiq chiqaring.",
          en: 'Mild nighttime conditions. Relax and have a restful evening.',
          ru: 'Приятная ночная прохлада. Желаем спокойного отдыха.',
        },
      }
    }

    // Default: Cloudy / Overcast
    return {
      ambientGlow: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(203,213,225,0.15) 50%, transparent 80%)',
      radarRingColor: 'text-white/60',
      aqiValue: 36,
      aqiLevel: { uz: 'Qulay', en: 'Good', ru: 'Хорошее' },
      bestTime: {
        uz: 'Yoqimli va qulay ob-havo',
        en: 'Comfortable day for all plans',
        ru: 'Комфортная погода для планов',
      },
      tip: {
        uz: "Mo'tadil havo harorati, kundalik yumushlar va sayr qilishga juda qulay.",
        en: 'Pleasant temperatures and calm breeze throughout the city.',
        ru: 'Умеренная температура, комфортные условия для любых прогулок.',
      },
    }
  }, [condition, isDay])

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto select-none transition-all">
      {/* Central 3D Weather Art Container with Ambient Pulsing Glow & Hover Parallax */}
      <div className="relative flex items-center justify-center animate-bounce-slow hover:scale-105 transition-transform duration-500 cursor-pointer group">
        {/* Pulsing Concentric Radar Rings & Glowing Halo */}
        <div className="absolute -inset-6 sm:-inset-10 flex items-center justify-center pointer-events-none">
          {/* Outer radar ring */}
          <div
            className={`absolute w-52 h-52 sm:w-68 sm:h-68 rounded-full border border-current opacity-20 animate-radar-pulse ${theme.radarRingColor}`}
          />
          {/* Inner radar ring */}
          <div
            className={`absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full border border-current opacity-30 animate-radar-pulse ${theme.radarRingColor}`}
            style={{ animationDelay: '-1.8s' }}
          />
          {/* Radiant ambient glow */}
          <div
            className="absolute w-44 h-44 sm:w-60 sm:h-60 rounded-full blur-3xl opacity-75 transition-all duration-700"
            style={{ background: theme.ambientGlow }}
          />
        </div>

        {/* Dynamic 3D-styled Weather Illustration */}
        <WeatherIllustration3D condition={condition} isDay={isDay} />
      </div>

      {/* Weather Insights & Tips Glassmorphism Box */}
      <div className="relative mt-2 w-full max-w-[360px] rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 p-4 text-center shadow-xl transition-all duration-300 group/card">
        {/* Air Quality Indicator Header */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </span>
            <span className="text-xs font-semibold text-white tracking-wide drop-shadow-sm">
              AQI: {theme.aqiValue} • {theme.aqiLevel[language] || theme.aqiLevel.uz}
            </span>
          </div>

          <span className="text-[11px] font-medium text-emerald-200 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
            <Sparkles size={11} className="text-emerald-300" />
            <span>
              {language === 'ru' ? 'Индекс чистоты' : language === 'en' ? 'Fresh Air' : 'Toza havo'}
            </span>
          </span>
        </div>

        {/* Main Recommendation / Highlight */}
        <div className="my-1.5">
          <p className="text-sm sm:text-base font-semibold text-white drop-shadow-sm">
            {theme.bestTime[language] || theme.bestTime.uz}
          </p>
          <p className="text-xs text-white/80 mt-1 leading-relaxed font-normal drop-shadow-sm">
            {theme.tip[language] || theme.tip.uz}
          </p>
        </div>

        {/* Micro-Metrics Row */}
        <div className="mt-3 pt-2.5 border-t border-white/10 grid grid-cols-3 gap-1.5 text-center text-[11px] text-white/90">
          <div className="flex flex-col items-center bg-white/5 py-1 px-1.5 rounded-xl border border-white/10">
            <span className="text-white/60 text-[10px] flex items-center gap-1">
              <Sun size={11} className="text-amber-200" />
              UV
            </span>
            <span className="font-semibold text-white mt-0.5">
              {Math.round(uvVal)} • {uvVal <= 2 ? 'Past' : uvVal <= 5 ? "O'rta" : 'Yuqori'}
            </span>
          </div>

          <div className="flex flex-col items-center bg-white/5 py-1 px-1.5 rounded-xl border border-white/10">
            <span className="text-white/60 text-[10px] flex items-center gap-1">
              <Droplets size={11} className="text-sky-300" />
              {language === 'ru' ? 'Влажность' : language === 'en' ? 'Humidity' : 'Namlik'}
            </span>
            <span className="font-semibold text-white mt-0.5">{humidityVal}%</span>
          </div>

          <div className="flex flex-col items-center bg-white/5 py-1 px-1.5 rounded-xl border border-white/10">
            <span className="text-white/60 text-[10px] flex items-center gap-1">
              <Wind size={11} className="text-teal-200" />
              {language === 'ru' ? 'Ветер' : language === 'en' ? 'Wind' : 'Shamol'}
            </span>
            <span className="font-semibold text-white mt-0.5">
              {windVal} {units === 'celsius' ? 'km/h' : 'mph'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

