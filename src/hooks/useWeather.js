import { useState, useEffect, useRef } from 'react'

const BASE_URL = 'https://api.open-meteo.com/v1/forecast'

export function useWeather(cityName, lat, lon, units = 'celsius', locale = 'en-GB') {
  const [weather, setWeather] = useState(null)
  const [hourly, setHourly] = useState(null)
  const [daily, setDaily] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  useEffect(() => {
    if (lat === null || lat === undefined || lon === null || lon === undefined) return

    if (abortRef.current) {
      abortRef.current.abort()
    }
    const controller = new AbortController()
    abortRef.current = controller

    const windUnit = units === 'fahrenheit' ? 'mph' : 'kmh'
    const tempUnit = units === 'fahrenheit' ? 'fahrenheit' : 'celsius'

    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      hourly: [
        'temperature_2m',
        'precipitation_probability',
        'windspeed_10m',
        'relativehumidity_2m',
        'apparent_temperature',
        'weathercode',
        'uv_index',
        'visibility',
        'dewpoint_2m',
        'winddirection_10m',
        'is_day',
      ].join(','),
      daily: [
        'weathercode',
        'temperature_2m_max',
        'temperature_2m_min',
        'sunrise',
        'sunset',
        'precipitation_sum',
        'precipitation_probability_max',
        'windspeed_10m_max',
      ].join(','),
      current_weather: true,
      timezone: 'auto',
      wind_speed_unit: windUnit,
      temperature_unit: tempUnit,
    })

    setLoading(true)
    setError(null)

    fetch(`${BASE_URL}?${params}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const cw = data.current_weather || null
        if (cw) {
          // Normalize weathercode / weather_code
          cw.weathercode = cw.weathercode !== undefined ? cw.weathercode : cw.weather_code
        }
        setWeather(cw)
        setHourly(data.hourly || null)
        setDaily(data.daily || null)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message || 'Failed to fetch weather data')
        setLoading(false)
      })

    return () => controller.abort()
  }, [lat, lon, units])

  return { weather, hourly, daily, loading, error }
}

export default useWeather
