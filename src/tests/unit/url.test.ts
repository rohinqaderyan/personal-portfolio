/**
 * @fileoverview Unit tests for URL utility functions
 * @description Comprehensive tests for URL manipulation and validation utilities
 */

import { describe, it, expect } from 'vitest'
import {
  buildUrl,
  parseQueryParams,
  setQueryParam,
  removeQueryParam,
  getDomain,
  isAbsoluteUrl,
  toAbsoluteUrl,
  normalizeUrl,
  isSameUrl,
  getPath,
  getHash,
  setHash,
  isValidUrl,
} from '@/lib/url'

describe('URL utilities', () => {
  describe('buildUrl', () => {
    it('returns base URL when no params provided', () => {
      const result = buildUrl('https://example.com/path')
      expect(result).toBe('https://example.com/path')
    })

    it('returns base URL when params is empty object', () => {
      const result = buildUrl('https://example.com/path', {})
      expect(result).toBe('https://example.com/path')
    })

    it('adds query parameters to URL', () => {
      const result = buildUrl('https://example.com', { foo: 'bar', baz: 123 })
      expect(result).toBe('https://example.com/?foo=bar&baz=123')
    })

    it('skips null and undefined values', () => {
      const result = buildUrl('https://example.com', {
        foo: 'bar',
        empty: null,
        missing: undefined,
      })
      expect(result).toBe('https://example.com/?foo=bar')
    })

    it('handles boolean values', () => {
      const result = buildUrl('https://example.com', { active: true, disabled: false })
      expect(result).toContain('active=true')
      expect(result).toContain('disabled=false')
    })

    it('encodes special characters', () => {
      const result = buildUrl('https://example.com', { query: 'hello world' })
      expect(result).toContain('hello%20world')
    })
  })

  describe('parseQueryParams', () => {
    it('parses query parameters from URL', () => {
      const result = parseQueryParams('https://example.com?foo=bar&baz=123')
      expect(result).toEqual({ foo: 'bar', baz: '123' })
    })

    it('returns empty object for URL without params', () => {
      const result = parseQueryParams('https://example.com/path')
      expect(result).toEqual({})
    })

    it('decodes URL-encoded values', () => {
      const result = parseQueryParams('https://example.com?query=hello%20world')
      expect(result.query).toBe('hello world')
    })

    it('handles multiple values for same key (last wins)', () => {
      const result = parseQueryParams('https://example.com?key=first&key=second')
      expect(result.key).toBe('second')
    })
  })

  describe('setQueryParam', () => {
    it('adds new parameter', () => {
      const result = setQueryParam('https://example.com', 'foo', 'bar')
      expect(result).toBe('https://example.com/?foo=bar')
    })

    it('updates existing parameter', () => {
      const result = setQueryParam('https://example.com?foo=old', 'foo', 'new')
      expect(result).toBe('https://example.com/?foo=new')
    })

    it('preserves other parameters', () => {
      const result = setQueryParam('https://example.com?existing=value', 'new', 'param')
      expect(result).toContain('existing=value')
      expect(result).toContain('new=param')
    })
  })

  describe('removeQueryParam', () => {
    it('removes specified parameter', () => {
      const result = removeQueryParam('https://example.com?foo=bar&baz=123', 'foo')
      expect(result).toBe('https://example.com/?baz=123')
    })

    it('handles non-existent parameter gracefully', () => {
      const result = removeQueryParam('https://example.com?foo=bar', 'missing')
      expect(result).toBe('https://example.com/?foo=bar')
    })

    it('removes all params when last one removed', () => {
      const result = removeQueryParam('https://example.com?foo=bar', 'foo')
      expect(result).toBe('https://example.com/')
    })
  })

  describe('getDomain', () => {
    it('extracts domain from URL', () => {
      expect(getDomain('https://example.com/path')).toBe('example.com')
    })

    it('extracts subdomain', () => {
      expect(getDomain('https://sub.example.com')).toBe('sub.example.com')
    })

    it('handles port numbers', () => {
      expect(getDomain('https://example.com:8080')).toBe('example.com')
    })
  })

  describe('isAbsoluteUrl', () => {
    it('returns true for http URLs', () => {
      expect(isAbsoluteUrl('http://example.com')).toBe(true)
    })

    it('returns true for https URLs', () => {
      expect(isAbsoluteUrl('https://example.com')).toBe(true)
    })

    it('returns false for relative paths', () => {
      expect(isAbsoluteUrl('/path/to/page')).toBe(false)
    })

    it('returns false for protocol-relative URLs', () => {
      expect(isAbsoluteUrl('//example.com')).toBe(false)
    })

    it('is case insensitive', () => {
      expect(isAbsoluteUrl('HTTPS://example.com')).toBe(true)
      expect(isAbsoluteUrl('HTTP://example.com')).toBe(true)
    })
  })

  describe('toAbsoluteUrl', () => {
    it('returns URL unchanged if already absolute', () => {
      const url = 'https://example.com/path'
      expect(toAbsoluteUrl(url, 'https://other.com')).toBe(url)
    })

    it('converts relative URL to absolute', () => {
      const result = toAbsoluteUrl('/path/to/page', 'https://example.com')
      expect(result).toBe('https://example.com/path/to/page')
    })

    it('handles relative paths without leading slash', () => {
      const result = toAbsoluteUrl('page.html', 'https://example.com/folder/')
      expect(result).toBe('https://example.com/folder/page.html')
    })
  })

  describe('normalizeUrl', () => {
    it('removes trailing slash', () => {
      expect(normalizeUrl('https://example.com/')).toBe('https://example.com')
    })

    it('preserves single slash for root', () => {
      expect(normalizeUrl('/')).toBe('https:///')
    })

    it('adds https protocol if missing', () => {
      expect(normalizeUrl('example.com')).toBe('https://example.com')
    })

    it('trims whitespace', () => {
      expect(normalizeUrl('  https://example.com  ')).toBe('https://example.com')
    })

    it('preserves http protocol', () => {
      expect(normalizeUrl('http://example.com')).toBe('http://example.com')
    })
  })

  describe('isSameUrl', () => {
    it('returns true for identical URLs', () => {
      expect(isSameUrl('https://example.com/path', 'https://example.com/path')).toBe(true)
    })

    it('ignores query parameters', () => {
      expect(isSameUrl('https://example.com/path?foo=1', 'https://example.com/path?bar=2')).toBe(
        true
      )
    })

    it('ignores hash', () => {
      expect(isSameUrl('https://example.com/path#section1', 'https://example.com/path#section2')).toBe(
        true
      )
    })

    it('returns false for different paths', () => {
      expect(isSameUrl('https://example.com/path1', 'https://example.com/path2')).toBe(false)
    })

    it('returns false for different domains', () => {
      expect(isSameUrl('https://example.com/path', 'https://other.com/path')).toBe(false)
    })
  })

  describe('getPath', () => {
    it('extracts path from URL', () => {
      expect(getPath('https://example.com/path/to/page')).toBe('/path/to/page')
    })

    it('returns / for root URL', () => {
      expect(getPath('https://example.com')).toBe('/')
    })

    it('ignores query parameters', () => {
      expect(getPath('https://example.com/path?foo=bar')).toBe('/path')
    })

    it('ignores hash', () => {
      expect(getPath('https://example.com/path#section')).toBe('/path')
    })
  })

  describe('getHash', () => {
    it('extracts hash without # symbol', () => {
      expect(getHash('https://example.com/path#section')).toBe('section')
    })

    it('returns empty string when no hash', () => {
      expect(getHash('https://example.com/path')).toBe('')
    })

    it('handles hash with special characters', () => {
      expect(getHash('https://example.com#section-1')).toBe('section-1')
    })
  })

  describe('setHash', () => {
    it('adds hash to URL', () => {
      const result = setHash('https://example.com/path', 'section')
      expect(result).toBe('https://example.com/path#section')
    })

    it('handles hash with # prefix', () => {
      const result = setHash('https://example.com', '#section')
      expect(result).toBe('https://example.com/#section')
    })

    it('replaces existing hash', () => {
      const result = setHash('https://example.com#old', 'new')
      expect(result).toBe('https://example.com/#new')
    })
  })

  describe('isValidUrl', () => {
    it('returns true for valid http URL', () => {
      expect(isValidUrl('http://example.com')).toBe(true)
    })

    it('returns true for valid https URL', () => {
      expect(isValidUrl('https://example.com/path?query=value')).toBe(true)
    })

    it('returns false for invalid URL', () => {
      expect(isValidUrl('not a url')).toBe(false)
    })

    it('returns false for empty string', () => {
      expect(isValidUrl('')).toBe(false)
    })

    it('returns false for relative paths', () => {
      expect(isValidUrl('/path/to/page')).toBe(false)
    })

    it('returns true for complex valid URLs', () => {
      expect(isValidUrl('https://user:pass@example.com:8080/path?query=value#hash')).toBe(true)
    })
  })
})
