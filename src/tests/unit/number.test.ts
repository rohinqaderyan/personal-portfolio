/**
 * @fileoverview Unit tests for number utility functions
 * @description Comprehensive tests for number formatting, manipulation, and validation utilities
 */

import { describe, it, expect } from 'vitest'
import {
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatCompact,
  formatBytes,
  clamp,
  inRange,
  round,
  randomInt,
} from '@/lib/number'

describe('number utilities', () => {
  describe('formatNumber', () => {
    it('formats numbers with commas', () => {
      expect(formatNumber(1234567)).toBe('1,234,567')
    })

    it('handles small numbers without commas', () => {
      expect(formatNumber(999)).toBe('999')
    })

    it('handles negative numbers', () => {
      expect(formatNumber(-1234567)).toBe('-1,234,567')
    })

    it('handles zero', () => {
      expect(formatNumber(0)).toBe('0')
    })

    it('handles decimal numbers', () => {
      const result = formatNumber(1234.56)
      expect(result).toContain('1,234')
    })
  })

  describe('formatCurrency', () => {
    it('formats as USD by default', () => {
      const result = formatCurrency(1234.56)
      expect(result).toMatch(/\$1,234\.56/)
    })

    it('formats with different currencies', () => {
      const result = formatCurrency(1234.56, 'EUR', 'de-DE')
      expect(result).toContain('1.234,56')
      expect(result).toContain('€')
    })

    it('handles negative amounts', () => {
      const result = formatCurrency(-500)
      expect(result).toMatch(/-?\$500\.00/)
    })

    it('handles zero', () => {
      const result = formatCurrency(0)
      expect(result).toMatch(/\$0\.00/)
    })

    it('rounds to two decimal places', () => {
      const result = formatCurrency(1234.567)
      expect(result).toMatch(/\$1,234\.57/)
    })
  })

  describe('formatPercentage', () => {
    it('formats decimal as percentage', () => {
      expect(formatPercentage(0.5)).toBe('50%')
    })

    it('formats with decimal places', () => {
      expect(formatPercentage(0.1234, 2)).toBe('12.34%')
    })

    it('handles zero', () => {
      expect(formatPercentage(0)).toBe('0%')
    })

    it('handles 100%', () => {
      expect(formatPercentage(1)).toBe('100%')
    })

    it('handles values over 100%', () => {
      expect(formatPercentage(1.5)).toBe('150%')
    })

    it('uses 0 decimal places by default', () => {
      expect(formatPercentage(0.126)).toBe('13%')
    })
  })

  describe('formatCompact', () => {
    it('formats thousands with K suffix', () => {
      expect(formatCompact(1500)).toBe('1.5K')
    })

    it('formats millions with M suffix', () => {
      expect(formatCompact(1500000)).toBe('1.5M')
    })

    it('formats billions with B suffix', () => {
      expect(formatCompact(1500000000)).toBe('1.5B')
    })

    it('formats trillions with T suffix', () => {
      expect(formatCompact(1500000000000)).toBe('1.5T')
    })

    it('leaves small numbers unchanged', () => {
      expect(formatCompact(999)).toBe('999')
    })

    it('handles custom decimal places', () => {
      expect(formatCompact(1234, 2)).toBe('1.23K')
    })

    it('handles negative numbers', () => {
      expect(formatCompact(-1500)).toBe('-1.5K')
    })
  })

  describe('formatBytes', () => {
    it('formats bytes', () => {
      expect(formatBytes(500)).toBe('500 Bytes')
    })

    it('formats kilobytes', () => {
      expect(formatBytes(1024)).toBe('1 KB')
    })

    it('formats megabytes', () => {
      expect(formatBytes(1048576)).toBe('1 MB')
    })

    it('formats gigabytes', () => {
      expect(formatBytes(1073741824)).toBe('1 GB')
    })

    it('formats with decimal places', () => {
      expect(formatBytes(1536)).toBe('1.5 KB')
    })

    it('handles zero bytes', () => {
      expect(formatBytes(0)).toBe('0 Bytes')
    })

    it('uses custom decimal places', () => {
      expect(formatBytes(1500, 3)).toBe('1.465 KB')
    })
  })

  describe('clamp', () => {
    it('returns value if within range', () => {
      expect(clamp(5, 0, 10)).toBe(5)
    })

    it('returns min if value is below range', () => {
      expect(clamp(-5, 0, 10)).toBe(0)
    })

    it('returns max if value is above range', () => {
      expect(clamp(15, 0, 10)).toBe(10)
    })

    it('handles equal min and max', () => {
      expect(clamp(5, 5, 5)).toBe(5)
    })

    it('handles negative ranges', () => {
      expect(clamp(-5, -10, -1)).toBe(-5)
      expect(clamp(-15, -10, -1)).toBe(-10)
    })

    it('handles decimal values', () => {
      expect(clamp(0.5, 0, 1)).toBe(0.5)
      expect(clamp(1.5, 0, 1)).toBe(1)
    })
  })

  describe('inRange', () => {
    it('returns true if value is within range', () => {
      expect(inRange(5, 0, 10)).toBe(true)
    })

    it('returns true if value equals min', () => {
      expect(inRange(0, 0, 10)).toBe(true)
    })

    it('returns true if value equals max', () => {
      expect(inRange(10, 0, 10)).toBe(true)
    })

    it('returns false if value is below range', () => {
      expect(inRange(-1, 0, 10)).toBe(false)
    })

    it('returns false if value is above range', () => {
      expect(inRange(11, 0, 10)).toBe(false)
    })

    it('handles negative ranges', () => {
      expect(inRange(-5, -10, 0)).toBe(true)
    })

    it('handles decimal values', () => {
      expect(inRange(0.5, 0, 1)).toBe(true)
      expect(inRange(1.01, 0, 1)).toBe(false)
    })
  })

  describe('round', () => {
    it('rounds to integer by default', () => {
      expect(round(5.5)).toBe(6)
      expect(round(5.4)).toBe(5)
    })

    it('rounds to specified decimal places', () => {
      expect(round(5.567, 2)).toBe(5.57)
    })

    it('handles negative numbers', () => {
      expect(round(-5.5)).toBe(-5)
      expect(round(-5.6)).toBe(-6)
    })

    it('handles zero decimal places', () => {
      expect(round(5.9, 0)).toBe(6)
    })

    it('handles many decimal places', () => {
      expect(round(5.123456789, 5)).toBe(5.12346)
    })
  })

  describe('randomInt', () => {
    it('generates integer within range', () => {
      for (let i = 0; i < 100; i++) {
        const result = randomInt(1, 10)
        expect(result).toBeGreaterThanOrEqual(1)
        expect(result).toBeLessThanOrEqual(10)
        expect(Number.isInteger(result)).toBe(true)
      }
    })

    it('handles same min and max', () => {
      expect(randomInt(5, 5)).toBe(5)
    })

    it('handles negative ranges', () => {
      for (let i = 0; i < 50; i++) {
        const result = randomInt(-10, -1)
        expect(result).toBeGreaterThanOrEqual(-10)
        expect(result).toBeLessThanOrEqual(-1)
      }
    })

    it('includes both min and max values', () => {
      const results = new Set<number>()
      for (let i = 0; i < 1000; i++) {
        results.add(randomInt(1, 3))
      }
      expect(results.has(1)).toBe(true)
      expect(results.has(2)).toBe(true)
      expect(results.has(3)).toBe(true)
    })
  })
})
