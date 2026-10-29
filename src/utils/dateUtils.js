/**
 * Format a date using Intl.DateTimeFormat with timezone support.
 * @param {Date|string|number} date
 * @param {string} [locale]
 * @param {Intl.DateTimeFormatOptions} [options]
 * @param {string} [timezone]
 * @returns {string}
 */
export function formatDate(date, locale = 'en-GB', options = {}, timezone = '') {
  try {
    const d = date instanceof Date ? date : new Date(date)
    /** @type {Intl.DateTimeFormatOptions} */
    const opts = { ...options }
    if (timezone && timezone !== 'auto') {
      opts.timeZone = timezone
    }
    return new Intl.DateTimeFormat(locale, opts).format(d)
  } catch {
    return String(date)
  }
}

/**
 * Format a live clock string with seconds.
 * @param {Date} date
 * @param {string} [locale]
 * @param {string} [timezone]
 * @returns {string}
 */
export function formatLiveClock(date, locale = 'en-GB', timezone = '') {
  try {
    const d = date instanceof Date ? date : new Date(date)
    /** @type {Intl.DateTimeFormatOptions} */
    const opts = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: locale.startsWith('en'),
    }
    if (timezone && timezone !== 'auto') {
      opts.timeZone = timezone
    }
    return new Intl.DateTimeFormat(locale, opts).format(d)
  } catch {
    return date.toLocaleTimeString()
  }
}

/**
 * Format a time string (hours and minutes).
 * @param {Date|string} date
 * @param {string} [locale]
 * @param {string} [timezone]
 * @returns {string}
 */
export function formatTime(date, locale = 'en-GB', timezone = '') {
  try {
    const d = date instanceof Date ? date : new Date(date)
    /** @type {Intl.DateTimeFormatOptions} */
    const opts = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: locale.startsWith('en'),
    }
    if (timezone && timezone !== 'auto') {
      opts.timeZone = timezone
    }
    return new Intl.DateTimeFormat(locale, opts).format(d)
  } catch {
    return ''
  }
}

/**
 * Format a day name.
 * @param {Date|string} date
 * @param {string} [locale]
 * @param {'short'|'long'|'narrow'} [length]
 * @param {string} [timezone]
 * @returns {string}
 */
export function formatDayName(date, locale = 'en-GB', length = 'short', timezone = '') {
  try {
    const d = date instanceof Date ? date : new Date(date)
    /** @type {Intl.DateTimeFormatOptions} */
    const opts = { weekday: length }
    if (timezone && timezone !== 'auto') {
      opts.timeZone = timezone
    }
    return new Intl.DateTimeFormat(locale, opts).format(d)
  } catch {
    return ''
  }
}

/**
 * Format a month-day string like "15 Nov".
 * @param {Date|string} date
 * @param {string} [locale]
 * @param {string} [timezone]
 * @returns {string}
 */
export function formatMonthDay(date, locale = 'en-GB', timezone = '') {
  try {
    const d = date instanceof Date ? date : new Date(date)
    /** @type {Intl.DateTimeFormatOptions} */
    const opts = { day: 'numeric', month: 'short' }
    if (timezone && timezone !== 'auto') {
      opts.timeZone = timezone
    }
    return new Intl.DateTimeFormat(locale, opts).format(d)
  } catch {
    return ''
  }
}

/**
 * Format a duration in minutes to human-readable format.
 * @param {number} minutes
 * @param {string} [language]
 * @returns {string}
 */
export function formatDuration(minutes, language = 'en') {
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  if (language === 'uz') return `${h}s ${m}daq`
  if (language === 'ru') return `${h}ч ${m}мин`
  return `${h}h ${m}m`
}

/**
 * Determine whether it is daytime based on sunrise and sunset ISO strings or fallback.
 * @param {string} sunrise
 * @param {string} sunset
 * @param {Date} [currentTime]
 * @returns {boolean}
 */
export function getDayNight(sunrise, sunset, currentTime = new Date()) {
  try {
    if (!sunrise || !sunset) {
      const h = currentTime.getHours()
      return h >= 6 && h < 19
    }
    const now = currentTime.getTime()
    const rise = new Date(sunrise).getTime()
    const set = new Date(sunset).getTime()
    return now >= rise && now <= set
  } catch {
    return true
  }
}

/**
 * Format ISO datetime string to HH:MM.
 * @param {string} isoString
 * @param {string} [timezone]
 * @returns {string}
 */
export function isoToHHMM(isoString, timezone = '') {
  try {
    const d = new Date(isoString)
    /** @type {Intl.DateTimeFormatOptions} */
    const opts = { hour: '2-digit', minute: '2-digit', hour12: false }
    if (timezone && timezone !== 'auto') {
      opts.timeZone = timezone
    }
    return new Intl.DateTimeFormat('en-GB', opts).format(d)
  } catch {
    return String(isoString).slice(11, 16)
  }
}
