/**
 * @fileoverview Unit tests for general utility functions
 * @description Comprehensive tests for cn, debounce, slugify, and other utilities
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { cn, formatDate, formatDateRange, calculateDuration, debounce, slugify } from '@/lib/utils'

describe('utils', () => {
  describe('cn (classNames merger)', () => {
    it('merges simple class names', () => {
      const result = cn('class1', 'class2')
      expect(result).toBe('class1 class2')
    })

    it('handles conditional classes', () => {
      const isActive = true
      const result = cn('base', isActive && 'active')
      expect(result).toBe('base active')
    })

    it('filters out falsy values', () => {
      const result = cn('class1', false, null, undefined, 'class2')
      expect(result).toBe('class1 class2')
    })

    it('handles array of classes', () => {
      const result = cn(['class1', 'class2'])
      expect(result).toBe('class1 class2')
    })

    it('handles object notation', () => {
      const result = cn({ active: true, disabled: false })
      expect(result).toBe('active')
    })

    it('merges Tailwind classes correctly', () => {
      const result = cn('px-2 py-1', 'px-4')
      expect(result).toBe('py-1 px-4')
    })

    it('handles conflicting Tailwind classes', () => {
      const result = cn('text-red-500', 'text-blue-500')
      expect(result).toBe('text-blue-500')
    })

    it('handles empty inputs', () => {
      const result = cn()
      expect(result).toBe('')
    })
  })

  describe('formatDate', () => {
    it('formats date string to short format', () => {
      const result = formatDate('2025-06-15')
      expect(result).toMatch(/Jun 2025/)
    })

    it('handles full ISO date string', () => {
      const result = formatDate('2025-06-15T12:00:00.000Z')
      expect(result).toMatch(/Jun 2025/)
    })

    it('handles different months', () => {
      expect(formatDate('2025-01-15')).toMatch(/Jan 2025/)
      expect(formatDate('2025-12-15')).toMatch(/Dec 2025/)
    })
  })

  describe('formatDateRange', () => {
    it('formats date range with end date', () => {
      const result = formatDateRange('2022-01-01', '2023-12-31', false)
      expect(result).toContain('Jan 2022')
      expect(result).toContain('Dec 2023')
      expect(result).toContain(' - ')
    })

    it('shows Present for current positions', () => {
      const result = formatDateRange('2022-01-01', null, true)
      expect(result).toContain('Present')
    })

    it('handles null end date when not current', () => {
      const result = formatDateRange('2022-01-01', null, false)
      expect(result).toContain('Jan 2022')
    })
  })

  describe('calculateDuration', () => {
    it('calculates months for short durations', () => {
      const result = calculateDuration('2025-01-01', '2025-06-01')
      expect(result).toBe('5 months')
    })

    it('calculates years for long durations', () => {
      const result = calculateDuration('2022-01-01', '2024-01-01')
      expect(result).toBe('2 years')
    })

    it('calculates years and months combined', () => {
      const result = calculateDuration('2022-01-01', '2024-06-01')
      expect(result).toBe('2 years, 5 months')
    })

    it('uses singular for 1 month', () => {
      const result = calculateDuration('2025-01-01', '2025-02-01')
      expect(result).toBe('1 month')
    })

    it('uses singular for 1 year', () => {
      const result = calculateDuration('2024-01-01', '2025-01-01')
      expect(result).toBe('1 year')
    })

    it('calculates from start to now when end is null', () => {
      const pastDate = new Date()
      pastDate.setFullYear(pastDate.getFullYear() - 1)
      const result = calculateDuration(pastDate.toISOString(), null)
      expect(result).toMatch(/1 year|12 months/)
    })
  })

  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('delays function execution', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100)

      debouncedFn()
      expect(fn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('only executes once for rapid calls', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('resets timer on each call', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100)

      debouncedFn()
      vi.advanceTimersByTime(50)
      debouncedFn()
      vi.advanceTimersByTime(50)
      expect(fn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(50)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('passes arguments to debounced function', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100)

      debouncedFn('arg1', 'arg2')
      vi.advanceTimersByTime(100)

      expect(fn).toHaveBeenCalledWith('arg1', 'arg2')
    })

    it('uses latest arguments when called multiple times', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100)

      debouncedFn('first')
      debouncedFn('second')
      debouncedFn('third')

      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledWith('third')
    })
  })

  describe('slugify', () => {
    it('converts text to lowercase slug', () => {
      expect(slugify('Hello World')).toBe('hello-world')
    })

    it('removes special characters', () => {
      expect(slugify('Hello! World?')).toBe('hello-world')
    })

    it('handles multiple spaces', () => {
      expect(slugify('Hello   World')).toBe('hello-world')
    })

    it('handles leading and trailing spaces', () => {
      expect(slugify('  Hello World  ')).toBe('hello-world')
    })

    it('replaces multiple dashes with single dash', () => {
      expect(slugify('Hello - - World')).toBe('hello-world')
    })

    it('preserves numbers', () => {
      expect(slugify('Hello World 123')).toBe('hello-world-123')
    })

    it('handles empty string', () => {
      expect(slugify('')).toBe('')
    })

    it('handles string with only special characters', () => {
      expect(slugify('!@#$%')).toBe('')
    })

    it('handles unicode characters', () => {
      expect(slugify('Hello Wörld')).toBe('hello-wrld')
    })
  })
})
