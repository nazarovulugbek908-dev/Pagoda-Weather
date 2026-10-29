import { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../i18n/useTranslation'
import { MapPin, MousePointerClick } from 'lucide-react'

// Dynamically import leaflet
let L = null

async function getLeaflet() {
  if (L) return L
  L = await import('leaflet')
  return L
}

async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { 'Accept-Language': 'en' } }
    )
    const data = await res.json()
    const name =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      data.name ||
      `${lat.toFixed(2)}, ${lon.toFixed(2)}`
    const country = data.address?.country || ''
    const admin1 = data.address?.state || ''
    return { name, country, admin1, latitude: lat, longitude: lon, timezone: 'auto' }
  } catch {
    return {
      name: `${lat.toFixed(2)}, ${lon.toFixed(2)}`,
      country: '',
      admin1: '',
      latitude: lat,
      longitude: lon,
      timezone: 'auto',
    }
  }
}

export default function WeatherMap({ city, onSelectCity }) {
  const { t } = useTranslation()
  const mapRef = useRef(null)
  const leafletMapRef = useRef(null)
  const markerRef = useRef(null)
  const [loadingLocation, setLoadingLocation] = useState(false)

  useEffect(() => {
    let mounted = true
    let map = null

    async function initMap() {
      const leaflet = await getLeaflet()
      if (!mounted || !mapRef.current || leafletMapRef.current) return

      // Fix default icon paths in bundler environments
      delete leaflet.Icon.Default.prototype._getIconUrl
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      // Whole world map view initialization
      map = leaflet.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 18,
        worldCopyJump: true,
        zoomControl: true,
        attributionControl: false,
      })

      // Keyless, free OpenStreetMap tile layer
      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          minZoom: 2,
          maxZoom: 18,
          noWrap: false,
        })
        .addTo(map)

      leafletMapRef.current = map

      // Render marker if city is available
      if (city && city.latitude && city.longitude) {
        const marker = leaflet
          .marker([city.latitude, city.longitude])
          .addTo(map)
          .bindPopup(
            `<div style="font-family: inherit; font-size: 13px; font-weight: 600; color: #0f172a;">${city.name}${city.country ? `, <span style="font-weight: 400; color: #64748b;">${city.country}</span>` : ''}</div>`
          )
        markerRef.current = marker
      }

      // Interactive map click to select city
      map.on('click', async (e) => {
        const { lat, lng } = e.latlng
        setLoadingLocation(true)
        const result = await reverseGeocode(lat, lng)
        setLoadingLocation(false)
        if (mounted && onSelectCity) onSelectCity(result)
      })
    }

    initMap()

    return () => {
      mounted = false
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
        markerRef.current = null
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update marker position when selected city changes
  useEffect(() => {
    if (!leafletMapRef.current || !city || !city.latitude || !city.longitude) return

    import('leaflet').then((mod) => {
      const leaflet = mod.default || mod
      if (!leafletMapRef.current) return

      if (markerRef.current) {
        markerRef.current.remove()
        markerRef.current = null
      }

      const marker = leaflet
        .marker([city.latitude, city.longitude])
        .addTo(leafletMapRef.current)
        .bindPopup(
          `<div style="font-family: inherit; font-size: 13px; font-weight: 600; color: #0f172a;">${city.name}${city.country ? `, <span style="font-weight: 400; color: #64748b;">${city.country}</span>` : ''}</div>`
        )
        .openPopup()
      markerRef.current = marker

      // Smoothly pan without overriding world zoom drastically
      const currentZoom = leafletMapRef.current.getZoom()
      leafletMapRef.current.setView([city.latitude, city.longitude], Math.max(currentZoom, 4), {
        animate: true,
      })
    })
  }, [city])

  return (
    <div className="relative z-10 w-full select-none">
      <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden transition-colors duration-300">
        <div className="px-5 py-3.5 border-b border-white/15 flex items-center justify-between flex-wrap gap-2 text-white">
          <div className="flex items-center gap-2">
            <MapPin size={17} className="text-amber-200" />
            <h3 className="text-white font-semibold text-sm sm:text-base tracking-wide">
              {t('map.title')}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/80">
            <MousePointerClick size={14} className="text-amber-200" />
            <span>{loadingLocation ? t('loading.searching') : t('map.clickToSelect')}</span>
          </div>
        </div>
        <div ref={mapRef} style={{ height: 440 }} className="w-full z-0" />
      </div>
    </div>
  )
}
