import { useState, useEffect, useRef, useCallback } from 'react'

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const DEBOUNCE_MS = 400

export function useGeocoding() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const timerRef = useRef(null)
  const abortRef = useRef(null)

  const search = useCallback((query) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!query || query.trim().length < 2) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    timerRef.current = setTimeout(() => {
      if (abortRef.current) abortRef.current.abort()
      const controller = new AbortController()
      abortRef.current = controller

      const params = new URLSearchParams({
        name: query.trim(),
        count: 10,
        language: 'en',
        format: 'json',
      })

      fetch(`${GEOCODING_URL}?${params}`, { signal: controller.signal })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          return res.json()
        })
        .then((data) => {
          const mapped = (data.results || []).map((r) => ({
            id: r.id,
            name: r.name,
            country: r.country,
            country_code: r.country_code,
            admin1: r.admin1 || '',
            latitude: r.latitude,
            longitude: r.longitude,
            timezone: r.timezone || 'UTC',
          }))
          setResults(mapped)
          setLoading(false)
        })
        .catch((err) => {
          if (err.name === 'AbortError') return
          setError(err.message || 'Search failed')
          setResults([])
          setLoading(false)
        })
    }, DEBOUNCE_MS)
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (abortRef.current) abortRef.current.abort()
    }
  }, [])

  return { results, loading, error, search }
}

export default useGeocoding

