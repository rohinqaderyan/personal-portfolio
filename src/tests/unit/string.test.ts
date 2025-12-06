import { describe, it, expect } from 'vitest'
import {
  capitalize,
  toTitleCase,
  toKebabCase,
  toCamelCase,
  toSnakeCase,
  truncate,
  truncateWords,
  stripHtml,
} from '@/lib/string'

describe('String Utilities', () => {
  describe('capitalize', () => {
    it('capitalizes first letter of a string', () => {
      expect(capitalize('hello')).toBe('Hello')
    })

    it('handles single character', () => {
      expect(capitalize('a')).toBe('A')
    })

    it('handles empty string', () => {
      expect(capitalize('')).toBe('')
    })

    it('lowercases remaining letters', () => {
      expect(capitalize('hELLO')).toBe('Hello')
    })

    it('handles already capitalized string', () => {
      expect(capitalize('Hello')).toBe('Hello')
    })
  })

  describe('toTitleCase', () => {
    it('converts string to title case', () => {
      expect(toTitleCase('hello world')).toBe('Hello World')
    })

    it('handles mixed case input', () => {
      expect(toTitleCase('hELLO wORLD')).toBe('Hello World')
    })

    it('handles single word', () => {
      expect(toTitleCase('hello')).toBe('Hello')
    })

    it('handles empty string', () => {
      expect(toTitleCase('')).toBe('')
    })
  })

  describe('toKebabCase', () => {
    it('converts camelCase to kebab-case', () => {
      expect(toKebabCase('helloWorld')).toBe('hello-world')
    })

    it('converts spaces to hyphens', () => {
      expect(toKebabCase('hello world')).toBe('hello-world')
    })

    it('converts underscores to hyphens', () => {
      expect(toKebabCase('hello_world')).toBe('hello-world')
    })

    it('handles multiple consecutive separators', () => {
      expect(toKebabCase('hello  __world')).toBe('hello-world')
    })

    it('handles PascalCase', () => {
      expect(toKebabCase('HelloWorld')).toBe('hello-world')
    })

    it('preserves already kebab-cased strings', () => {
      expect(toKebabCase('hello-world')).toBe('hello-world')
    })
  })

  describe('toCamelCase', () => {
    it('converts kebab-case to camelCase', () => {
      expect(toCamelCase('hello-world')).toBe('helloWorld')
    })

    it('converts snake_case to camelCase', () => {
      expect(toCamelCase('hello_world')).toBe('helloWorld')
    })

    it('converts spaces to camelCase', () => {
      expect(toCamelCase('hello world')).toBe('helloWorld')
    })

    it('handles multiple separators', () => {
      expect(toCamelCase('hello-_world')).toBe('helloWorld')
    })

    it('handles single word', () => {
      expect(toCamelCase('hello')).toBe('hello')
    })
  })

  describe('toSnakeCase', () => {
    it('converts camelCase to snake_case', () => {
      expect(toSnakeCase('helloWorld')).toBe('hello_world')
    })

    it('converts kebab-case to snake_case', () => {
      expect(toSnakeCase('hello-world')).toBe('hello_world')
    })

    it('converts spaces to underscores', () => {
      expect(toSnakeCase('hello world')).toBe('hello_world')
    })

    it('handles PascalCase', () => {
      expect(toSnakeCase('HelloWorld')).toBe('hello_world')
    })

    it('handles multiple separators', () => {
      expect(toSnakeCase('hello- world')).toBe('hello_world')
    })

    it('preserves already snake_cased strings', () => {
      expect(toSnakeCase('hello_world')).toBe('hello_world')
    })
  })

  describe('truncate', () => {
    it('does not truncate strings shorter than maxLength', () => {
      expect(truncate('Hello', 10)).toBe('Hello')
    })

    it('uses custom suffix', () => {
      expect(truncate('Hello World', 8, '→')).toBe('Hello W→')
    })

    it('handles exact length', () => {
      expect(truncate('Hello', 5)).toBe('Hello')
    })

    it('handles empty string', () => {
      expect(truncate('', 5)).toBe('')
    })
  })

  describe('truncateWords', () => {
    it('does not truncate short strings', () => {
      expect(truncateWords('Hello', 10)).toBe('Hello')
    })

    it('handles no space before maxLength', () => {
      const result = truncateWords('HelloWorldTest', 10)
      expect(result).toContain('...')
    })
  })

  describe('stripHtml', () => {
    it('removes HTML tags from string', () => {
      expect(stripHtml('<p>Hello</p>')).toBe('Hello')
    })

    it('removes nested HTML tags', () => {
      expect(stripHtml('<div><p>Hello</p></div>')).toBe('Hello')
    })

    it('handles self-closing tags', () => {
      expect(stripHtml('Hello<br/>World')).toBe('HelloWorld')
    })

    it('handles tags with attributes', () => {
      expect(stripHtml('<a href="test">Link</a>')).toBe('Link')
    })

    it('preserves text outside tags', () => {
      expect(stripHtml('Hello<p>World</p>')).toBe('HelloWorld')
    })

    it('handles empty string', () => {
      expect(stripHtml('')).toBe('')
    })

    it('handles string with no tags', () => {
      expect(stripHtml('Plain text')).toBe('Plain text')
    })
  })
})
