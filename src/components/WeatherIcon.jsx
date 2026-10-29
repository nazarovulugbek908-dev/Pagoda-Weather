import React from 'react'
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudHail,
} from 'lucide-react'

/**
 * Render a professional Lucide weather icon based on WMO code and day/night state.
 */
export function WeatherIcon({ code, isDay = true, className = '', size = 24 }) {
  const c = Number(code)

  if (c === 0) {
    return isDay ? (
      <Sun size={size} className={`text-amber-500 drop-shadow-md ${className}`} />
    ) : (
      <Moon size={size} className={`text-sky-300 drop-shadow-md ${className}`} />
    )
  }

  if (c === 1) {
    return isDay ? (
      <CloudSun size={size} className={`text-amber-500 drop-shadow-md ${className}`} />
    ) : (
      <CloudMoon size={size} className={`text-sky-300 drop-shadow-md ${className}`} />
    )
  }

  if (c === 2) {
    return isDay ? (
      <CloudSun size={size} className={`text-sky-400 drop-shadow-md ${className}`} />
    ) : (
      <CloudMoon size={size} className={`text-slate-300 drop-shadow-md ${className}`} />
    )
  }

  if (c === 3) {
    return <Cloud size={size} className={`text-slate-400 drop-shadow-md ${className}`} />
  }

  if (c === 45 || c === 48) {
    return <CloudFog size={size} className={`text-slate-400 drop-shadow-md ${className}`} />
  }

  if (c >= 51 && c <= 55) {
    return <CloudDrizzle size={size} className={`text-sky-400 drop-shadow-md ${className}`} />
  }

  if (c === 56 || c === 57) {
    return <CloudSnow size={size} className={`text-cyan-300 drop-shadow-md ${className}`} />
  }

  if (c >= 61 && c <= 65) {
    return <CloudRain size={size} className={`text-blue-500 drop-shadow-md ${className}`} />
  }

  if (c === 66 || c === 67) {
    return <CloudSnow size={size} className={`text-cyan-300 drop-shadow-md ${className}`} />
  }

  if (c >= 71 && c <= 77) {
    return <CloudSnow size={size} className={`text-sky-200 drop-shadow-md ${className}`} />
  }

  if (c >= 80 && c <= 82) {
    return <CloudRain size={size} className={`text-blue-500 drop-shadow-md ${className}`} />
  }

  if (c === 85 || c === 86) {
    return <CloudSnow size={size} className={`text-cyan-200 drop-shadow-md ${className}`} />
  }

  if (c === 95) {
    return <CloudLightning size={size} className={`text-amber-500 drop-shadow-md ${className}`} />
  }

  if (c >= 96) {
    return <CloudHail size={size} className={`text-purple-400 drop-shadow-md ${className}`} />
  }

  return isDay ? (
    <Sun size={size} className={`text-amber-500 ${className}`} />
  ) : (
    <Moon size={size} className={`text-sky-300 ${className}`} />
  )
}

export default WeatherIcon

