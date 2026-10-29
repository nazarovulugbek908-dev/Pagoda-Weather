# Pagoda Weather 🌤️

A trilingual (Uzbek / English / Russian) weather platform built with React 18 + Vite.

## Features

- 🌍 **Trilingual**: Full UI in Uzbek (UZ), English (EN), Russian (RU) — instant switching, no page reload
- 🌦️ **Live Weather**: Real-time data from [Open-Meteo](https://open-meteo.com/) (free, no API key needed)
- 🎨 **Cinematic Backgrounds**: Animated weather backgrounds — sunny rays, rain drops, snowfall, lightning, stars
- 📊 **Charts**: Recharts-powered hourly temperature, precipitation, wind, humidity charts
- 🗺️ **Map**: Leaflet world map — click to select any city
- ❤️ **Favorites**: Save favourite cities, persisted to localStorage
- 🌗 **Dark / Light Mode**: DaisyUI themes
- 🌡️ **°C / °F**: Toggle between Celsius and Fahrenheit

## Tech Stack

| Tool | Version |
|------|---------|
| React | 18.3 |
| Vite | 5.4 |
| Tailwind CSS | 3.4 |
| daisyUI | 4.12 |
| Leaflet / react-leaflet | 1.9 / 4.2 |
| Recharts | 2.12 |
| lucide-react | 0.447 |

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Data Sources

- Weather: [Open-Meteo Forecast API](https://open-meteo.com/en/docs)
- City Search: [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- Map Tiles: [OpenStreetMap](https://www.openstreetmap.org/)

## localStorage Keys

| Key | Value |
|-----|-------|
| `pagoda-language` | `uz` \| `en` \| `ru` |
| `pagoda-theme` | `light` \| `dark` |
| `pagoda-units` | `celsius` \| `fahrenheit` |
| `pagoda-city` | `{name, latitude, longitude, ...}` |
| `pagoda-favorites` | Array of city objects |
| `pagoda-recent-searches` | Array of recent city objects |

## Default City

Tashkent, Uzbekistan (lat: 41.2995, lon: 69.2401)

