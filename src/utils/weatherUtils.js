export { WeatherIcon } from '../components/WeatherIcon.jsx'

/**
 * Returns an animation type string for a given WMO weather code.
 * @param {number} code - WMO weather code
 * @param {boolean} isDay - whether it's daytime
 * @returns {'sunny'|'cloudy'|'rainy'|'snowy'|'thunderstorm'|'foggy'|'night'|'partly-cloudy'|'night-cloudy'}
 */
export function getWeatherAnimation(code, isDay = true) {
  const c = Number(code)
  if (isNaN(c)) return isDay ? 'sunny' : 'night'

  if (c >= 95) return 'thunderstorm'
  if ((c >= 71 && c <= 77) || c === 85 || c === 86) return 'snowy'
  if ((c >= 51 && c <= 67) || (c >= 80 && c <= 82)) return 'rainy'
  if (c === 45 || c === 48) return 'foggy'
  if (c === 3) return isDay ? 'cloudy' : 'night-cloudy'
  if (c === 1 || c === 2) return isDay ? 'partly-cloudy' : 'night-cloudy'
  if (c === 0) return isDay ? 'sunny' : 'night'

  return isDay ? 'sunny' : 'night'
}

/**
 * Returns a UV risk level label and color.
 * @param {number} uvIndex
 * @param {function} t
 * @returns {{ label: string, color: string }}
 */
export function getUVInfo(uvIndex, t) {
  if (uvIndex === null || uvIndex === undefined) {
    return { label: '--', color: 'text-slate-400 dark:text-slate-400' }
  }
  const val = Number(uvIndex)
  if (val <= 2) {
    return { label: t ? t('uvLevels.low') : 'Low', color: 'text-emerald-500 dark:text-emerald-400' }
  }
  if (val <= 5) {
    return { label: t ? t('uvLevels.moderate') : 'Moderate', color: 'text-amber-500 dark:text-amber-400' }
  }
  if (val <= 7) {
    return { label: t ? t('uvLevels.high') : 'High', color: 'text-orange-500 dark:text-orange-400' }
  }
  if (val <= 10) {
    return { label: t ? t('uvLevels.veryHigh') : 'Very High', color: 'text-rose-500 dark:text-rose-400' }
  }
  return { label: t ? t('uvLevels.extreme') : 'Extreme', color: 'text-purple-500 dark:text-purple-400' }
}

/**
 * Returns a translated compass direction from degrees.
 * @param {number} degrees
 * @param {function} t
 * @returns {string}
 */
export function formatWindDir(degrees, t) {
  if (degrees === undefined || degrees === null) return 'N'
  const keys = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
  ]
  const idx = Math.round(((degrees % 360) + 360) % 360 / 22.5) % 16
  const key = keys[idx]
  return t ? t(`windDirections.${key}`, key) : key
}

/**
 * Get localized condition string for a WMO code with fallback.
 * @param {number} code
 * @param {function} t
 * @returns {string}
 */
export function getWeatherCondition(code, t) {
  if (code === undefined || code === null) return ''
  const c = Number(code)
  return t ? t(`wmo.${c}`, `Condition (${c})`) : `Code ${c}`
}
