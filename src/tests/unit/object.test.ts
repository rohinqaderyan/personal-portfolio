/**
 * @fileoverview Unit tests for object utility functions
 * @description Comprehensive tests for object manipulation and processing utilities
 */

import { describe, it, expect } from 'vitest'
import {
  deepClone,
  deepMerge,
  isObject,
  get,
  set,
  pick,
} from '@/lib/object'

describe('object utilities', () => {
  describe('deepClone', () => {
    it('clones primitive values', () => {
      expect(deepClone(5)).toBe(5)
      expect(deepClone('hello')).toBe('hello')
      expect(deepClone(true)).toBe(true)
      expect(deepClone(null)).toBe(null)
    })

    it('clones arrays', () => {
      const arr = [1, 2, 3]
      const cloned = deepClone(arr)
      expect(cloned).toEqual(arr)
      expect(cloned).not.toBe(arr)
    })

    it('clones nested arrays', () => {
      const arr = [[1, 2], [3, 4]]
      const cloned = deepClone(arr)
      expect(cloned).toEqual(arr)
      expect(cloned[0]).not.toBe(arr[0])
    })

    it('clones simple objects', () => {
      const obj = { a: 1, b: 2 }
      const cloned = deepClone(obj)
      expect(cloned).toEqual(obj)
      expect(cloned).not.toBe(obj)
    })

    it('clones nested objects', () => {
      const obj = { a: { b: { c: 1 } } }
      const cloned = deepClone(obj)
      expect(cloned).toEqual(obj)
      expect(cloned.a).not.toBe(obj.a)
      expect(cloned.a.b).not.toBe(obj.a.b)
    })

    it('clones Date objects', () => {
      const date = new Date('2025-06-15')
      const cloned = deepClone(date)
      expect(cloned).toEqual(date)
      expect(cloned).not.toBe(date)
      expect(cloned.getTime()).toBe(date.getTime())
    })

    it('clones mixed nested structures', () => {
      const obj = {
        name: 'test',
        items: [1, 2, { nested: true }],
        metadata: { created: new Date('2025-01-01') },
      }
      const cloned = deepClone(obj)
      expect(cloned).toEqual(obj)
      expect(cloned.items).not.toBe(obj.items)
      expect(cloned.metadata).not.toBe(obj.metadata)
    })

    it('mutations do not affect original', () => {
      const obj = { a: { b: 1 } }
      const cloned = deepClone(obj)
      cloned.a.b = 2
      expect(obj.a.b).toBe(1)
    })
  })

  describe('deepMerge', () => {
    it('merges simple objects', () => {
      const target = { a: 1, b: 2 }
      const source = { b: 3, c: 4 }
      const result = deepMerge(target, source)
      expect(result).toEqual({ a: 1, b: 3, c: 4 })
    })

    it('merges nested objects', () => {
      const target = { user: { name: 'John', age: 30 } }
      const source = { user: { name: 'John', age: 31 } }
      const result = deepMerge(target, source)
      expect(result).toEqual({ user: { name: 'John', age: 31 } })
    })

    it('does not mutate original objects', () => {
      const target = { a: 1 }
      const source = { a: 2 }
      const original = { ...target }
      deepMerge(target, source)
      expect(target).toEqual(original)
    })

    it('replaces arrays instead of merging', () => {
      const target = { items: [1, 2, 3] }
      const source = { items: [4, 5] }
      const result = deepMerge(target, source)
      expect(result.items).toEqual([4, 5])
    })

    it('handles deeply nested merges', () => {
      const target = {
        level1: {
          level2: {
            level3: { a: 1, b: 2 },
          },
        },
      }
      const source = {
        level1: {
          level2: {
            level3: { a: 1, b: 3 },
          },
        },
      }
      const result = deepMerge(target, source)
      expect(result.level1.level2.level3).toEqual({ a: 1, b: 3 })
    })
  })

  describe('isObject', () => {
    it('returns true for plain objects', () => {
      expect(isObject({})).toBe(true)
      expect(isObject({ a: 1 })).toBe(true)
    })

    it('returns false for arrays', () => {
      expect(isObject([])).toBe(false)
      expect(isObject([1, 2, 3])).toBe(false)
    })

    it('returns false for null', () => {
      expect(isObject(null)).toBe(false)
    })

    it('returns false for primitives', () => {
      expect(isObject(5)).toBe(false)
      expect(isObject('string')).toBe(false)
      expect(isObject(true)).toBe(false)
      expect(isObject(undefined)).toBe(false)
    })

    it('returns false for functions', () => {
      expect(isObject(() => {})).toBe(false)
    })

    it('returns true for objects created with Object.create', () => {
      expect(isObject(Object.create(null))).toBe(true)
    })
  })

  describe('get', () => {
    const testObj = {
      user: {
        name: 'John',
        address: {
          city: 'New York',
          zip: '10001',
        },
        tags: ['developer', 'designer'],
      },
      active: true,
    }

    it('gets top-level property', () => {
      expect(get(testObj, 'active')).toBe(true)
    })

    it('gets nested property', () => {
      expect(get(testObj, 'user.name')).toBe('John')
    })

    it('gets deeply nested property', () => {
      expect(get(testObj, 'user.address.city')).toBe('New York')
    })

    it('returns undefined for non-existent path', () => {
      expect(get(testObj, 'user.email')).toBeUndefined()
    })

    it('returns default value for non-existent path', () => {
      expect(get(testObj, 'user.email', 'default@email.com')).toBe('default@email.com')
    })

    it('handles null in path', () => {
      const obj = { user: null }
      expect(get(obj, 'user.name')).toBeUndefined()
    })

    it('handles undefined in path', () => {
      const obj = { user: undefined }
      expect(get(obj, 'user.name', 'default')).toBe('default')
    })

    it('works with array indices', () => {
      expect(get(testObj, 'user.tags.0')).toBe('developer')
    })
  })

  describe('set', () => {
    it('sets top-level property', () => {
      const obj = { a: 1 }
      set(obj, 'b', 2)
      expect(obj).toEqual({ a: 1, b: 2 })
    })

    it('sets nested property', () => {
      const obj = { user: { name: 'John' } }
      set(obj, 'user.age', 30)
      expect(obj.user).toEqual({ name: 'John', age: 30 })
    })

    it('creates intermediate objects if needed', () => {
      const obj: Record<string, unknown> = {}
      set(obj, 'user.address.city', 'New York')
      expect(obj).toEqual({ user: { address: { city: 'New York' } } })
    })

    it('overwrites existing values', () => {
      const obj = { user: { name: 'John' } }
      set(obj, 'user.name', 'Jane')
      expect(obj.user.name).toBe('Jane')
    })

    it('returns the modified object', () => {
      const obj = { a: 1 }
      const result = set(obj, 'b', 2)
      expect(result).toBe(obj)
    })

    it('handles deeply nested paths', () => {
      const obj: Record<string, unknown> = {}
      set(obj, 'a.b.c.d.e', 'value')
      expect(get(obj, 'a.b.c.d.e')).toBe('value')
    })
  })

  describe('pick', () => {
    it('picks specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 }
      const result = pick(obj, ['a', 'c'])
      expect(result).toEqual({ a: 1, c: 3 })
    })

    it('ignores non-existent keys', () => {
      const obj = { a: 1, b: 2 }
      const result = pick(obj, ['a', 'c' as keyof typeof obj])
      expect(result).toEqual({ a: 1 })
    })

    it('returns empty object for empty keys array', () => {
      const obj = { a: 1, b: 2 }
      const result = pick(obj, [])
      expect(result).toEqual({})
    })

    it('does not mutate original object', () => {
      const obj = { a: 1, b: 2, c: 3 }
      pick(obj, ['a'])
      expect(obj).toEqual({ a: 1, b: 2, c: 3 })
    })

    it('preserves value types', () => {
      const obj = { name: 'John', age: 30, active: true }
      const result = pick(obj, ['name', 'active'])
      expect(result).toEqual({ name: 'John', active: true })
      expect(typeof result.name).toBe('string')
      expect(typeof result.active).toBe('boolean')
    })

    it('handles objects with nested values', () => {
      const obj = { user: { name: 'John' }, meta: { id: 1 } }
      const result = pick(obj, ['user'])
      expect(result).toEqual({ user: { name: 'John' } })
      // Reference should be the same (shallow pick)
      expect(result.user).toBe(obj.user)
    })
  })
})
