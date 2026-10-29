import { useRef, useCallback, useEffect } from 'react'

/**
 * 3D Tilt Card Container with interactive hover perspective & optional rain trickle
 * High-performance RAF-driven transform with zero React re-renders on mousemove
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 5,
  isRain = false,
  ...props
}) {
  const cardRef = useRef(null)
  const glareRef = useRef(null)
  const rafId = useRef(null)

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Calculate rotation angles
      const rotateX = ((y - centerY) / centerY) * -maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt

      // Glare position percentage
      const glareX = (x / rect.width) * 100
      const glareY = (y / rect.height) * 100

      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        if (!cardRef.current) return
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
        cardRef.current.style.transition = 'transform 0.08s ease-out'

        if (glareRef.current) {
          glareRef.current.style.background = `radial-gradient(circle at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, rgba(255, 255, 255, 0.35) 0%, transparent 60%)`
          glareRef.current.style.opacity = '0.12'
        }
      })
    },
    [maxTilt]
  )

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0'
    }
  }, [])

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative will-change-transform ${className}`}
      {...props}
    >
      {/* 3D dynamic specular glare reflection */}
      <div
        ref={glareRef}
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 overflow-hidden z-20 opacity-0"
      />

      {/* Glass Window Rain Trickle Condensation Effect */}
      {isRain && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden z-10 opacity-70">
          {/* Static condensation micro-droplets on the glass */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1.5px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Animated realistic trickling water trails */}
          <div
            className="absolute top-0 left-[18%] w-[1.5px] h-12 bg-gradient-to-b from-white/60 to-transparent rounded-full animate-rain-trickle"
            style={{ animationDelay: '0.4s', animationDuration: '4.5s' }}
          />
          <div
            className="absolute top-0 left-[45%] w-[2px] h-16 bg-gradient-to-b from-white/70 to-transparent rounded-full animate-rain-trickle"
            style={{ animationDelay: '1.8s', animationDuration: '3.8s' }}
          />
          <div
            className="absolute top-0 left-[78%] w-[1.5px] h-10 bg-gradient-to-b from-white/60 to-transparent rounded-full animate-rain-trickle"
            style={{ animationDelay: '2.6s', animationDuration: '5.2s' }}
          />
        </div>
      )}

      {children}
    </div>
  )
}
