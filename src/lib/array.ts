/**
 * Array utility functions
 * @module array
 * Helper functions for array manipulation and processing
 */

/**
 * Removes duplicate values from array
 * @param array - Array with potential duplicates
 * @returns Array with unique values
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Groups array elements by key
 * @param array - Array to group
 * @param keyFn - Function to extract grouping key
 * @returns Object with grouped elements
 */
export function groupBy<T>(array: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return array.reduce(
    (acc, item) => {
      const key = keyFn(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}

/**
 * Chunks array into smaller arrays of specified size
 * @param array - Array to chunk
 * @param size - Size of each chunk
 * @returns Array of chunks
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Flattens nested array to specified depth
 * @param array - Array to flatten
 * @param depth - Depth to flatten (default: 1)
 * @returns Flattened array
 */
export function flatten<T>(array: T[], depth: number = 1): T[] {
  if (depth === 0) return array;

  return array.reduce((acc: T[], item) => {
    if (Array.isArray(item)) {
      acc.push(...flatten(item, depth - 1));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}

/**
 * Shuffles array randomly
 * @param array - Array to shuffle
 * @returns Shuffled array (new array)
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Returns random element from array
 * @param array - Array to pick from
 * @returns Random element
 */
export function sample<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Returns n random elements from array
 * @param array - Array to pick from
 * @param n - Number of elements to pick
 * @returns Array of random elements
 */
export function sampleSize<T>(array: T[], n: number): T[] {
  const shuffled = shuffle(array);
  return shuffled.slice(0, Math.min(n, array.length));
}

/**
 * Sorts array by property
 * @param array - Array to sort
 * @param key - Property key to sort by
 * @param order - Sort order ('asc' or 'desc')
 * @returns Sorted array (new array)
 */
export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * Partitions array into two arrays based on predicate
 * @param array - Array to partition
 * @param predicate - Function to test each element
 * @returns Tuple of [passing, failing] arrays
 */
export function partition<T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];

  array.forEach((item) => {
    if (predicate(item)) {
      pass.push(item);
    } else {
      fail.push(item);
    }
  });

  return [pass, fail];
}

/**
 * Counts occurrences of each element in array
 * @param array - Array to count
 * @returns Object with counts
 */
export function countBy<T>(array: T[]): Record<string, number> {
  return array.reduce(
    (acc, item) => {
      const key = String(item);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
}

/**
 * Finds difference between two arrays
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns Elements in arr1 but not in arr2
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter((item) => !set2.has(item));
}

/**
 * Finds intersection of two arrays
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns Elements common to both arrays
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter((item) => set2.has(item));
}

/**
 * Finds union of two arrays (all unique elements)
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns All unique elements from both arrays
 */
export function union<T>(arr1: T[], arr2: T[]): T[] {
  return unique([...arr1, ...arr2]);
}

/**
 * Zips multiple arrays together
 * @param arrays - Arrays to zip
 * @returns Array of tuples
 */
export function zip<T>(...arrays: T[][]): T[][] {
  const maxLength = Math.max(...arrays.map((arr) => arr.length));
  const result: T[][] = [];

  for (let i = 0; i < maxLength; i++) {
    result.push(arrays.map((arr) => arr[i]));
  }

  return result;
}

/**
 * Creates object from array of key-value pairs
 * @param pairs - Array of [key, value] tuples
 * @returns Object
 */
export function fromPairs<T>(pairs: [string, T][]): Record<string, T> {
  return Object.fromEntries(pairs);
}

/**
 * Plucks property from array of objects
 * @param array - Array of objects
 * @param key - Property key to extract
 * @returns Array of property values
 */
export function pluck<T, K extends keyof T>(array: T[], key: K): T[K][] {
  return array.map((item) => item[key]);
}

/**
 * Compacts array by removing falsy values
 * @param array - Array to compact
 * @returns Array without falsy values
 */
export function compact<T>(array: (T | null | undefined | false | 0 | '')[]): T[] {
  return array.filter(Boolean) as T[];
}

/**
 * Takes first n elements from array
 * @param array - Source array
 * @param n - Number of elements to take
 * @returns First n elements
 */
export function take<T>(array: T[], n: number): T[] {
  return array.slice(0, n);
}

/**
 * Takes last n elements from array
 * @param array - Source array
 * @param n - Number of elements to take
 * @returns Last n elements
 */
export function takeLast<T>(array: T[], n: number): T[] {
  return array.slice(-n);
}

/**
 * Drops first n elements from array
 * @param array - Source array
 * @param n - Number of elements to drop
 * @returns Array without first n elements
 */
export function drop<T>(array: T[], n: number): T[] {
  return array.slice(n);
}

/**
 * Drops last n elements from array
 * @param array - Source array
 * @param n - Number of elements to drop
 * @returns Array without last n elements
 */
export function dropLast<T>(array: T[], n: number): T[] {
  return array.slice(0, -n);
}

/**
 * Finds index of element matching predicate
 * @param array - Array to search
 * @param predicate - Function to test each element
 * @returns Index of first match or -1
 */
export function findIndex<T>(array: T[], predicate: (item: T) => boolean): number {
  return array.findIndex(predicate);
}

/**
 * Finds last index of element matching predicate
 * @param array - Array to search
 * @param predicate - Function to test each element
 * @returns Index of last match or -1
 */
export function findLastIndex<T>(array: T[], predicate: (item: T) => boolean): number {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) return i;
  }
  return -1;
}

/**
 * Checks if array includes all specified elements
 * @param array - Array to check
 * @param elements - Elements to look for
 * @returns True if all elements are present
 */
export function includesAll<T>(array: T[], elements: T[]): boolean {
  return elements.every((el) => array.includes(el));
}

/**
 * Checks if array includes any of specified elements
 * @param array - Array to check
 * @param elements - Elements to look for
 * @returns True if any element is present
 */
export function includesAny<T>(array: T[], elements: T[]): boolean {
  return elements.some((el) => array.includes(el));
}

/**
 * Creates range array from start to end
 * @param start - Start number
 * @param end - End number (exclusive)
 * @param step - Step size (default: 1)
 * @returns Array of numbers
 */
export function range(start: number, end: number, step: number = 1): number[] {
  const result: number[] = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * Moves element in array from one index to another
 * @param array - Source array
 * @param fromIndex - Current index
 * @param toIndex - Target index
 * @returns New array with moved element
 */
export function move<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  const result = [...array];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

/**
 * Rotates array elements by n positions
 * @param array - Array to rotate
 * @param n - Number of positions (positive = right, negative = left)
 * @returns Rotated array
 */
export function rotate<T>(array: T[], n: number): T[] {
  const len = array.length;
  const offset = ((n % len) + len) % len;
  return [...array.slice(offset), ...array.slice(0, offset)];
}

/**
 * Gets sum of numbers in array
 * @param array - Array of numbers
 * @returns Sum
 */
export function sum(array: number[]): number {
  return array.reduce((acc, val) => acc + val, 0);
}

/**
 * Gets average of numbers in array
 * @param array - Array of numbers
 * @returns Average
 */
export function average(array: number[]): number {
  return array.length === 0 ? 0 : sum(array) / array.length;
}

/**
 * Gets minimum value in array
 * @param array - Array of numbers
 * @returns Minimum value
 */
export function min(array: number[]): number {
  return Math.min(...array);
}

/**
 * Gets maximum value in array
 * @param array - Array of numbers
 * @returns Maximum value
 */
export function max(array: number[]): number {
  return Math.max(...array);
}

/**
 * Gets median value in array
 * @param array - Array of numbers
 * @returns Median value
 */
export function median(array: number[]): number {
  const sorted = [...array].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}
