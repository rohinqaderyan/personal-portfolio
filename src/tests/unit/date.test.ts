/**
 * @fileoverview Unit tests for date utility functions
 * @description Comprehensive tests for date formatting, manipulation, and validation utilities
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  formatDate,
  getRelativeTime,
  calculateDuration,
  isPast,
  isFuture,
  startOfDay,
  endOfDay,
  addDays,
  toISODateString,
  parseDate,
  getAge,
  isSameDay,
  getDateRange,
} from '@/lib/date'

describe('date utilities', () => {
  // Use a fixed date for consistent testing
  const fixedDate = new Date('2025-06-15T12:00:00.000Z')

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(fixedDate)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('formatDate', () => {
    it('formats date in full format by default', () => {
      const result = formatDate('2025-06-15')
      expect(result).toMatch(/June 15, 2025/)
    })

    it('formats date in short format', () => {
      const result = formatDate('2025-06-15', 'short')
      expect(result).toMatch(/Jun 2025/)
    })

    it('formats date in relative format', () => {
      const pastDate = new Date('2025-06-14T12:00:00.000Z')
      const result = formatDate(pastDate, 'relative')
      expect(result).toBe('1 day ago')
    })

    it('accepts Date object as input', () => {
      const date = new Date('2025-06-15')
      const result = formatDate(date, 'full')
      expect(result).toMatch(/June/)
    })
  })

  describe('getRelativeTime', () => {
    it('returns "just now" for very recent dates', () => {
      const date = new Date('2025-06-15T11:59:30.000Z')
      const result = getRelativeTime(date, fixedDate)
      expect(result).toBe('just now')
    })

    it('returns minutes ago for dates within an hour', () => {
      const date = new Date('2025-06-15T11:30:00.000Z')
      const result = getRelativeTime(date, fixedDate)
      expect(result).toBe('30 minutes ago')
    })

    it('returns singular form for 1 minute', () => {
      const date = new Date('2025-06-15T11:59:00.000Z')
      const result = getRelativeTime(date, fixedDate)
      expect(result).toBe('1 minute ago')
    })

    it('returns hours ago for dates within a day', () => {
      const date = new Date('2025-06-15T06:00:00.000Z')
      const result = getRelativeTime(date, fixedDate)
      expect(result).toBe('6 hours ago')
    })

    it('returns singular form for 1 hour', () => {
      const date = new Date('2025-06-15T11:00:00.000Z')
      const result = getRelativeTime(date, fixedDate)
      expect(result).toBe('1 hour ago')
    })

    it('returns days ago for dates within a month', () => {
      const date = new Date('2025-06-10T12:00:00.000Z')
      const result = getRelativeTime(date, fixedDate)
      expect(result).toBe('5 days ago')
    })

    it('returns singular form for 1 day', () => {
      const date = new Date('2025-06-14T12:00:00.000Z')
      const result = getRelativeTime(date, fixedDate)
      expect(result).toBe('1 day ago')
    })

    it('returns months ago for dates within a year', () => {
      const date = new Date('2025-03-15T12:00:00.000Z')
      const result = getRelativeTime(date, fixedDate)
      expect(result).toBe('3 months ago')
    })

    it('returns years ago for old dates', () => {
      const date = new Date('2023-06-15T12:00:00.000Z')
      const result = getRelativeTime(date, fixedDate)
      expect(result).toBe('2 years ago')
    })
  })

  describe('calculateDuration', () => {
    it('calculates duration in years and months', () => {
      const start = '2023-03-15'
      const end = '2025-06-15'
      const result = calculateDuration(start, end)
      expect(result).toBe('2 years 3 months')
    })

    it('returns only years if no extra months', () => {
      const start = '2023-06-15'
      const end = '2025-06-15'
      const result = calculateDuration(start, end)
      expect(result).toBe('2 years')
    })

    it('returns only months for duration less than a year', () => {
      const start = '2025-01-15'
      const end = '2025-06-15'
      const result = calculateDuration(start, end)
      expect(result).toBe('5 months')
    })

    it('returns "Less than a month" for very short durations', () => {
      const start = '2025-06-10'
      const end = '2025-06-15'
      const result = calculateDuration(start, end)
      expect(result).toBe('Less than a month')
    })

    it('uses current date when end is not provided', () => {
      const start = '2024-06-15'
      const result = calculateDuration(start)
      expect(result).toBe('1 year')
    })

    it('handles Date objects as input', () => {
      const start = new Date('2024-06-15')
      const end = new Date('2025-06-15')
      const result = calculateDuration(start, end)
      expect(result).toBe('1 year')
    })
  })

  describe('isPast', () => {
    it('returns true for past dates', () => {
      const pastDate = new Date('2020-01-01')
      expect(isPast(pastDate)).toBe(true)
    })

    it('returns false for future dates', () => {
      const futureDate = new Date('2030-01-01')
      expect(isPast(futureDate)).toBe(false)
    })

    it('accepts string dates', () => {
      expect(isPast('2020-01-01')).toBe(true)
      expect(isPast('2030-01-01')).toBe(false)
    })
  })

  describe('isFuture', () => {
    it('returns true for future dates', () => {
      const futureDate = new Date('2030-01-01')
      expect(isFuture(futureDate)).toBe(true)
    })

    it('returns false for past dates', () => {
      const pastDate = new Date('2020-01-01')
      expect(isFuture(pastDate)).toBe(false)
    })

    it('accepts string dates', () => {
      expect(isFuture('2030-01-01')).toBe(true)
      expect(isFuture('2020-01-01')).toBe(false)
    })
  })

  describe('startOfDay', () => {
    it('returns date at midnight', () => {
      const date = new Date('2025-06-15T15:30:45.123Z')
      const result = startOfDay(date)
      expect(result.getHours()).toBe(0)
      expect(result.getMinutes()).toBe(0)
      expect(result.getSeconds()).toBe(0)
      expect(result.getMilliseconds()).toBe(0)
    })

    it('uses current date when no argument provided', () => {
      const result = startOfDay()
      expect(result.getHours()).toBe(0)
    })

    it('preserves the date part', () => {
      const date = new Date('2025-06-15T15:30:45.123Z')
      const result = startOfDay(date)
      expect(result.getDate()).toBe(date.getDate())
      expect(result.getMonth()).toBe(date.getMonth())
      expect(result.getFullYear()).toBe(date.getFullYear())
    })
  })

  describe('endOfDay', () => {
    it('returns date at 23:59:59.999', () => {
      const date = new Date('2025-06-15T15:30:45.123Z')
      const result = endOfDay(date)
      expect(result.getHours()).toBe(23)
      expect(result.getMinutes()).toBe(59)
      expect(result.getSeconds()).toBe(59)
      expect(result.getMilliseconds()).toBe(999)
    })

    it('uses current date when no argument provided', () => {
      const result = endOfDay()
      expect(result.getHours()).toBe(23)
    })
  })

  describe('addDays', () => {
    it('adds days to a date', () => {
      const date = new Date('2025-06-15')
      const result = addDays(date, 5)
      expect(result.getDate()).toBe(20)
    })

    it('subtracts days with negative value', () => {
      const date = new Date('2025-06-15')
      const result = addDays(date, -5)
      expect(result.getDate()).toBe(10)
    })

    it('handles month overflow', () => {
      const date = new Date('2025-06-28')
      const result = addDays(date, 5)
      expect(result.getMonth()).toBe(6) // July (0-indexed)
      expect(result.getDate()).toBe(3)
    })

    it('does not mutate original date', () => {
      const date = new Date('2025-06-15')
      const originalTime = date.getTime()
      addDays(date, 5)
      expect(date.getTime()).toBe(originalTime)
    })
  })

  describe('toISODateString', () => {
    it('formats date as YYYY-MM-DD', () => {
      const date = new Date('2025-06-15T15:30:00.000Z')
      const result = toISODateString(date)
      expect(result).toBe('2025-06-15')
    })

    it('uses current date when no argument provided', () => {
      const result = toISODateString()
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
  })

  describe('parseDate', () => {
    it('parses ISO format dates', () => {
      const result = parseDate('2025-06-15')
      expect(result).toBeInstanceOf(Date)
      expect(result?.getFullYear()).toBe(2025)
    })

    it('returns null for invalid dates', () => {
      const result = parseDate('not-a-date')
      expect(result).toBeNull()
    })

    it('parses ISO datetime strings', () => {
      const result = parseDate('2025-06-15T12:00:00.000Z')
      expect(result).toBeInstanceOf(Date)
    })
  })

  describe('getAge', () => {
    it('calculates age correctly', () => {
      const birthdate = '1990-06-15'
      const result = getAge(birthdate)
      expect(result).toBe(35)
    })

    it('accounts for birthday not yet occurred this year', () => {
      const birthdate = '1990-12-25' // After June 15
      const result = getAge(birthdate)
      expect(result).toBe(34)
    })

    it('accounts for birthday already occurred this year', () => {
      const birthdate = '1990-01-01' // Before June 15
      const result = getAge(birthdate)
      expect(result).toBe(35)
    })

    it('accepts Date object', () => {
      const birthdate = new Date('1990-06-15')
      const result = getAge(birthdate)
      expect(result).toBe(35)
    })
  })

  describe('isSameDay', () => {
    it('returns true for same day', () => {
      const date1 = new Date('2025-06-15T08:00:00')
      const date2 = new Date('2025-06-15T20:00:00')
      expect(isSameDay(date1, date2)).toBe(true)
    })

    it('returns false for different days', () => {
      const date1 = new Date('2025-06-15')
      const date2 = new Date('2025-06-16')
      expect(isSameDay(date1, date2)).toBe(false)
    })

    it('returns false for different months', () => {
      const date1 = new Date('2025-06-15')
      const date2 = new Date('2025-07-15')
      expect(isSameDay(date1, date2)).toBe(false)
    })

    it('returns false for different years', () => {
      const date1 = new Date('2025-06-15')
      const date2 = new Date('2024-06-15')
      expect(isSameDay(date1, date2)).toBe(false)
    })
  })

  describe('getDateRange', () => {
    it('returns array of dates between start and end', () => {
      const start = new Date('2025-06-15')
      const end = new Date('2025-06-18')
      const result = getDateRange(start, end)
      expect(result).toHaveLength(4)
    })

    it('returns single date when start equals end', () => {
      const date = new Date('2025-06-15')
      const result = getDateRange(date, date)
      expect(result).toHaveLength(1)
    })

    it('returns dates in chronological order', () => {
      const start = new Date('2025-06-15')
      const end = new Date('2025-06-17')
      const result = getDateRange(start, end)
      expect(result[0].getDate()).toBe(15)
      expect(result[1].getDate()).toBe(16)
      expect(result[2].getDate()).toBe(17)
    })

    it('does not mutate input dates', () => {
      const start = new Date('2025-06-15')
      const end = new Date('2025-06-17')
      const startTime = start.getTime()
      const endTime = end.getTime()
      getDateRange(start, end)
      expect(start.getTime()).toBe(startTime)
      expect(end.getTime()).toBe(endTime)
    })
  })
})
