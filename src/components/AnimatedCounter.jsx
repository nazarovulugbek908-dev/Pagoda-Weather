import { useState, useEffect, useRef } from 'react'

/**
 * Animated rolling number counter for temperatures and metrics
 */
export default function AnimatedCounter({ value, duration = 800 }) {
  const [displayValue, setDisplayValue] = useState(value)
  const prevValueRef = useRef(value)
  const startTimeRef = useRef(null)
  const animFrameRef = useRef(null)

  useEffect(() => {
    const startVal = prevValueRef.current
    const endVal = Number(value) || 0

    if (startVal === endVal) {
      setDisplayValue(endVal)
      return
    }

    startTimeRef.current = performance.now()

    const animate = (now) => {
      const elapsed = now - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Smooth ease-out cubic curve: 1 - (1 - t)^3
      const ease = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(startVal + (endVal - startVal) * ease)

      setDisplayValue(current)

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        prevValueRef.current = endVal
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [value, duration])

  return <span>{displayValue}</span>
}

