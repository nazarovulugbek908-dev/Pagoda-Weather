import React from 'react'

/**
 * Official Nubila Brand Logo Component
 * Matches the reference two-tone cloud mark with diagonal lightning split and modern rounded logotype.
 */
export default function NubilaLogo({
  className = '',
  size = 30,
  showText = true,
  textColor = 'text-white',
}) {
  return (
    <div className={`flex items-center gap-2 select-none group ${className}`}>
      {/* Interlocking Two-Tone Cloud Mark */}
      <svg
        viewBox="0 0 72 64"
        width={size * 1.12}
        height={size}
        className="flex-shrink-0 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="nubila-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7ad5e6" />
            <stop offset="100%" stopColor="#55bed3" />
          </linearGradient>
          <linearGradient id="nubila-slate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5a7a96" />
            <stop offset="100%" stopColor="#43647f" />
          </linearGradient>
        </defs>

        {/* Top Half: Sky Cyan Cloud */}
        <path
          d="M 12 34
             C 8 30, 8 20, 16 15
             C 23 10, 30 11, 33 14
             C 37 6, 51 6, 56 14
             C 63 20, 63 29, 58 34
             L 41 34
             L 28 44
             L 15 44
             C 12 44, 11 39, 12 34 Z"
          fill="url(#nubila-cyan)"
        />

        {/* Bottom Half: Slate Blue Inverted Cloud */}
        <path
          d="M 14 50
             C 11 50, 9 46, 14 46
             L 27 46
             L 40 36
             L 57 36
             C 61 36, 61 41, 58 45
             C 63 50, 61 58, 55 60
             C 48 64, 38 64, 34 59
             C 30 63, 20 63, 16 57
             C 13 54, 13 51, 14 50 Z"
          fill="url(#nubila-slate)"
        />
      </svg>

      {/* Modern Rounded "nubila" Wordmark */}
      {showText && (
        <span
          className={`text-lg sm:text-xl font-bold tracking-tight lowercase ${textColor} drop-shadow-sm`}
          style={{
            letterSpacing: '-0.04em',
            fontFamily: "'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          nubila
        </span>
      )}
    </div>
  )
}
