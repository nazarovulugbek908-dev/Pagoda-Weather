import { useEffect, useRef, useMemo } from 'react'

/**
 * Animated glowing sun element with slow rotating rays & ambient halo
 */
function SunHero() {
  return (
    <div className="absolute top-[26%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] pointer-events-none select-none">
      {/* Outer ambient radiant glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(254, 240, 138, 0.45) 0%, rgba(253, 230, 138, 0.2) 40%, rgba(186, 230, 253, 0.08) 65%, transparent 80%)',
          filter: 'blur(35px)',
          animation: 'pulse-glow 5s ease-in-out infinite',
        }}
      />

      {/* Gentle rotating sun rays */}
      <div
        className="absolute inset-[15%] pointer-events-none opacity-45"
        style={{
          animation: 'ray-rotate 40s linear infinite',
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="20"
              x2="100"
              y2="42"
              stroke="rgba(254, 240, 138, 0.75)"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
        </svg>
      </div>

      {/* Inner luminous solar core */}
      <div
        className="absolute inset-[30%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(254, 243, 199, 0.7) 45%, rgba(251, 191, 36, 0.3) 75%, transparent 100%)',
          filter: 'blur(10px)',
        }}
      />
    </div>
  )
}

/**
 * Faint Atmospheric Wind Streaks Engine
 */
function WindStreaksCanvas({ windSpeed = 12 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let streaks = []

    const count = Math.min(18, Math.max(8, Math.round((Number(windSpeed) || 10) * 0.8)))

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      streaks = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.8) + 40,
        len: 80 + Math.random() * 140,
        speed: 2.5 + Math.random() * 3.5,
        opacity: 0.08 + Math.random() * 0.14,
        wave: Math.random() * Math.PI * 2,
        amplitude: 4 + Math.random() * 6,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      streaks.forEach((s) => {
        s.wave += 0.02
        s.x += s.speed

        const cy = s.y + Math.sin(s.wave) * s.amplitude

        const grad = ctx.createLinearGradient(s.x, cy, s.x + s.len, cy)
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)')
        grad.addColorStop(0.5, `rgba(255, 255, 255, ${s.opacity})`)
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.beginPath()
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.2
        ctx.moveTo(s.x, cy)
        ctx.quadraticCurveTo(s.x + s.len / 2, cy - s.amplitude, s.x + s.len, cy)
        ctx.stroke()

        if (s.x > canvas.width + 50) {
          s.x = -s.len - 30
          s.y = Math.random() * (canvas.height * 0.8) + 40
        }
      })

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => {
      window.removeEventListener('resize', resize)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [windSpeed])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />
  )
}

/**
 * High-performance Canvas Rain & Snow Engine
 */
function PrecipitationCanvas({ type = 'rain', count = 80 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const isRain = type === 'rain' || type === 'thunderstorm'
    const isSnow = type === 'snow'

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * (canvas.width + 120),
        y: Math.random() * canvas.height,
        len: isRain ? 15 + Math.random() * 22 : 0,
        speed: isRain ? (type === 'thunderstorm' ? 12 + Math.random() * 8 : 8.5 + Math.random() * 6.5) : 0.7 + Math.random() * 1.4,
        opacity: isRain ? 0.2 + Math.random() * 0.4 : 0.3 + Math.random() * 0.55,
        r: isSnow ? 1.2 + Math.random() * 2.2 : 0,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: 0.015 + Math.random() * 0.02,
        width: isRain ? (Math.random() > 0.8 ? 1.5 : 1) : 0,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isRain) {
        particles.forEach((d) => {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(186, 230, 253, ${d.opacity})`
          ctx.lineWidth = d.width
          ctx.moveTo(d.x, d.y)
          ctx.lineTo(d.x - 2.5, d.y + d.len)
          ctx.stroke()

          d.y += d.speed
          d.x -= 1

          if (d.y > canvas.height) {
            d.y = -d.len
            d.x = Math.random() * (canvas.width + 120)
          }
        })
      } else if (isSnow) {
        particles.forEach((s) => {
          s.swing += s.swingSpeed
          s.y += s.speed
          s.x += Math.sin(s.swing) * 0.65
          if (s.y > canvas.height) {
            s.y = -5
            s.x = Math.random() * canvas.width
          }
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`
          ctx.fill()
        })
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => {
      window.removeEventListener('resize', resize)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [type, count])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />
  )
}

export default function WeatherBackground({ animationType = 'sunny', isDay = true, windSpeed = 8 }) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Determine normalized weather state
  const isThunder = animationType === 'thunderstorm'
  const isRain = animationType === 'rainy' || isThunder
  const isSnow = animationType === 'snowy'
  const isCloudy = animationType === 'cloudy' || animationType === 'partly-cloudy' || animationType === 'foggy'
  const isSunny = !isRain && !isSnow && (animationType === 'sunny' || animationType === 'partly-cloudy') && isDay
  const showWindStreaks = (Number(windSpeed) >= 12 || isThunder || isRain) && !prefersReducedMotion

  // Atmospheric background gradients
  const skyBackground = useMemo(() => {
    if (isThunder) {
      return 'linear-gradient(160deg, #161f2c 0%, #202b3a 30%, #2b394b 65%, #182230 100%)'
    }
    if (isRain) {
      return 'linear-gradient(160deg, #2b3948 0%, #3a4b5b 30%, #4a5c6d 60%, #334352 100%)'
    }
    if (isSnow) {
      return 'linear-gradient(160deg, #586f82 0%, #71889a 35%, #8fa6b8 70%, #687f91 100%)'
    }
    if (isCloudy && !isSunny) {
      return 'linear-gradient(160deg, #4d6880 0%, #627f98 35%, #7a97af 70%, #5a758d 100%)'
    }
    if (!isDay) {
      return 'linear-gradient(160deg, #090e1a 0%, #121c2e 40%, #18243c 75%, #0c1424 100%)'
    }
    return 'linear-gradient(160deg, #52799c 0%, #678ea8 25%, #7ea6c6 55%, #92b9d6 85%, #7ba2c2 100%)'
  }, [isThunder, isRain, isSnow, isCloudy, isSunny, isDay])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none transition-all duration-1000"
    >
      {/* 1. Base Atmospheric Sky Gradient */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{ background: skyBackground }}
      />

      {/* 2. Sunny / Clear Weather: Animated Glowing Sun with Gentle Rotating Rays */}
      {isSunny && !prefersReducedMotion && <SunHero />}

      {/* 3. Soft Floating Clouds Deck */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Upper drifting cloud layer */}
          <div
            className={`absolute -top-12 left-[-10%] w-[120%] h-[360px] blur-2xl transition-all duration-1000 ${
              isRain ? 'opacity-70' : isSnow ? 'opacity-55' : 'opacity-40'
            }`}
            style={{
              background: isRain
                ? 'radial-gradient(ellipse at 50% 30%, rgba(30,41,59,0.85) 0%, rgba(51,65,85,0.45) 50%, transparent 80%)'
                : 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.7) 0%, rgba(240,249,255,0.3) 50%, transparent 80%)',
            }}
          />

          {/* Mid-level slow-floating volumetric clouds */}
          <div
            className={`absolute top-[24%] left-[18%] w-[760px] h-[280px] rounded-full blur-2xl animate-fog-drift transition-all duration-1000 ${
              isRain ? 'opacity-80' : isSnow ? 'opacity-65' : 'opacity-55'
            }`}
            style={{
              background: isRain
                ? 'radial-gradient(ellipse at 50% 50%, rgba(38,50,68,0.9) 0%, rgba(55,71,90,0.5) 45%, transparent 80%)'
                : 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.4) 45%, transparent 80%)',
              animationDuration: isRain ? '28s' : '36s',
            }}
          />

          {/* Secondary drifting cloud bank */}
          {(isCloudy || isRain) && (
            <div
              className={`absolute top-[40%] right-[10%] w-[640px] h-[250px] rounded-full blur-2xl animate-fog-drift transition-all duration-1000 ${
                isRain ? 'opacity-75' : 'opacity-50'
              }`}
              style={{
                background: isRain
                  ? 'radial-gradient(ellipse at 50% 50%, rgba(30,41,59,0.85) 0%, rgba(45,60,78,0.5) 45%, transparent 80%)'
                  : 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.65) 0%, rgba(240,249,255,0.3) 45%, transparent 80%)',
                animationDuration: '32s',
                animationDelay: '-12s',
              }}
            />
          )}

          {/* Lower atmospheric horizon mist */}
          <div
            className={`absolute -bottom-16 inset-x-0 h-72 blur-3xl transition-all duration-1000 ${
              isRain ? 'opacity-60' : 'opacity-40'
            }`}
            style={{
              background: isRain
                ? 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.4) 50%, transparent 100%)'
                : 'linear-gradient(to top, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
            }}
          />
        </div>
      )}

      {/* 4. Thunderstorm: Subtle distant lightning flash */}
      {isThunder && !prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none animate-lightning" />
      )}

      {/* 5. Atmospheric Flowing Wind Streaks */}
      {showWindStreaks && <WindStreaksCanvas windSpeed={windSpeed} />}

      {/* 6. Precipitation: Rain or Snow Falling Engine */}
      {!prefersReducedMotion && (
        <>
          {isRain && <PrecipitationCanvas type={isThunder ? 'thunderstorm' : 'rain'} count={isThunder ? 110 : 85} />}
          {isSnow && <PrecipitationCanvas type="snow" count={55} />}
        </>
      )}

      {/* 7. Subtle Vignette for Optimal Glassmorphism Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/15 pointer-events-none" />
    </div>
  )
}
