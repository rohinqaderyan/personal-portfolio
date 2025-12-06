import { describe, it, expect } from 'vitest'
import { unique, groupBy, chunk, flatten, compact, shuffle, sum, average } from '@/lib/array'

describe('Array Utilities', () => {
  describe('unique', () => {
    it('removes duplicate values', () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
    })

    it('handles empty arrays', () => {
      expect(unique([])).toEqual([])
    })

    it('returns same array if no duplicates', () => {
      expect(unique([1, 2, 3])).toEqual([1, 2, 3])
    })

    it('works with strings', () => {
      expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c'])
    })

    it('preserves first occurrence order', () => {
      const result = unique([3, 1, 2, 1, 3])
      expect(result).toContain(1)
      expect(result).toContain(2)
      expect(result).toContain(3)
    })
  })

  describe('groupBy', () => {
    it('groups objects by key function', () => {
      const data = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 25 },
        { name: 'Charlie', age: 30 },
      ]
      const result = groupBy(data, (item) => item.age.toString())
      expect(result['25']).toHaveLength(2)
      expect(result['30']).toHaveLength(1)
    })

    it('groups numbers by value', () => {
      const result = groupBy([1, 2, 1, 3, 2], (n) => n.toString())
      expect(result['1']).toHaveLength(2)
      expect(result['2']).toHaveLength(2)
      expect(result['3']).toHaveLength(1)
    })

    it('handles empty arrays', () => {
      const result = groupBy([] as number[], (x: number) => x.toString())
      expect(result).toEqual({})
    })
  })

  describe('chunk', () => {
    it('chunks array into specified size', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    })

    it('handles exact division', () => {
      expect(chunk([1, 2, 3, 4], 2)).toEqual([
        [1, 2],
        [3, 4],
      ])
    })

    it('handles chunk size larger than array', () => {
      expect(chunk([1, 2, 3], 10)).toEqual([[1, 2, 3]])
    })

    it('handles empty arrays', () => {
      expect(chunk([], 2)).toEqual([])
    })

    it('handles size of 1', () => {
      expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]])
    })
  })

  describe('flatten', () => {
    it('flattens nested arrays', () => {
      expect(
        flatten([
          [1, 2],
          [3, 4],
        ])
      ).toEqual([1, 2, 3, 4])
    })

    it('respects depth parameter', () => {
      const deep = [[[1, 2]], [[3, 4]]]
      expect(flatten(deep, 1)).toEqual([
        [1, 2],
        [3, 4],
      ])
      expect(flatten(deep, 2)).toEqual([1, 2, 3, 4])
    })

    it('handles mixed nesting', () => {
      expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4])
    })

    it('handles empty arrays', () => {
      expect(flatten([])).toEqual([])
      expect(flatten([[], []])).toEqual([])
    })
  })

  describe('compact', () => {
    it('removes falsy values', () => {
      expect(compact([1, 0, 2, null, 3, undefined, '', false])).toEqual([1, 2, 3])
    })

    it('preserves truthy values', () => {
      expect(compact([1, 'hello', true, { a: 1 }])).toEqual([1, 'hello', true, { a: 1 }])
    })

    it('handles empty arrays', () => {
      expect(compact([])).toEqual([])
    })

    it('handles arrays with only falsy values', () => {
      expect(compact([null, undefined, false, 0, ''])).toEqual([])
    })
  })

  describe('shuffle', () => {
    it('returns array of same length', () => {
      const arr = [1, 2, 3, 4, 5]
      expect(shuffle(arr)).toHaveLength(arr.length)
    })

    it('contains all original elements', () => {
      const original = [1, 2, 3, 4, 5]
      const shuffled = shuffle([...original])
      expect(shuffled.sort()).toEqual(original.sort())
    })

    it('handles empty arrays', () => {
      expect(shuffle([])).toEqual([])
    })

    it('handles single element', () => {
      expect(shuffle([1])).toEqual([1])
    })
  })

  describe('sum', () => {
    it('calculates sum of numbers', () => {
      expect(sum([1, 2, 3, 4])).toBe(10)
    })

    it('handles empty arrays', () => {
      expect(sum([])).toBe(0)
    })

    it('handles negative numbers', () => {
      expect(sum([1, -2, 3, -1])).toBe(1)
    })

    it('handles decimals', () => {
      expect(sum([1.5, 2.5, 3])).toBeCloseTo(7)
    })
  })

  describe('average', () => {
    it('calculates average of numbers', () => {
      expect(average([2, 4, 6])).toBe(4)
    })

    it('handles single element', () => {
      expect(average([5])).toBe(5)
    })

    it('handles decimals', () => {
      expect(average([1.5, 2.5, 3])).toBeCloseTo(2.33, 1)
    })

    it('handles empty arrays', () => {
      expect(average([])).toBe(0)
    })

    it('handles negative numbers', () => {
      expect(average([-1, 0, 1])).toBe(0)
    })
  })
})
