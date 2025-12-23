/**
 * Object utility functions
 * @module object
 * @description Helper functions for object manipulation and processing
 */

/**
 * Deep clones an object
 * @param obj - Object to clone
 * @returns Deep cloned object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as T;
  if (obj instanceof Object) {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
}

/**
 * Deep merges two objects
 * @param target - Target object
 * @param source - Source object to merge
 * @returns Merged object
 */
export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const output = { ...target };

  for (const key in source) {
    if (Object.hasOwn(source, key)) {
      const targetValue = output[key];
      const sourceValue = source[key];

      if (isObject(targetValue) && isObject(sourceValue)) {
        output[key] = deepMerge(targetValue as any, sourceValue as any);
      } else {
        output[key] = sourceValue as T[Extract<keyof T, string>];
      }
    }
  }

  return output;
}

/**
 * Checks if value is a plain object
 * @param value - Value to check
 * @returns True if plain object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Gets nested property value from object
 * @param obj - Object to query
 * @param path - Property path (e.g., 'user.address.city')
 * @param defaultValue - Default value if path not found
 * @returns Property value or default
 */
export function get<T>(obj: unknown, path: string, defaultValue?: T): T | undefined {
  const keys = path.split('.');
  let result: unknown = obj;

  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue;
    }
    result = (result as Record<string, unknown>)[key];
  }

  return result !== undefined ? (result as T) : defaultValue;
}

/**
 * Sets nested property value in object
 * @param obj - Object to modify
 * @param path - Property path
 * @param value - Value to set
 * @returns Modified object
 */
export function set<T extends object>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  let current: any = obj;

  for (const key of keys) {
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }

  current[lastKey] = value;
  return obj;
}

/**
 * Picks specified properties from object
 * @param obj - Source object
 * @param keys - Keys to pick
 * @returns New object with picked properties
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }

  return result;
}

/**
 * Omits specified properties from object
 * @param obj - Source object
 * @param keys - Keys to omit
 * @returns New object without omitted properties
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };

  for (const key of keys) {
    delete result[key];
  }

  return result;
}

/**
 * Maps object values
 * @param obj - Object to map
 * @param fn - Mapping function
 * @returns New object with mapped values
 */
export function mapValues<T extends object, R>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T) => R
): Record<keyof T, R> {
  const result = {} as Record<keyof T, R>;

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      result[key] = fn(obj[key], key);
    }
  }

  return result;
}

/**
 * Maps object keys
 * @param obj - Object to map
 * @param fn - Mapping function
 * @returns New object with mapped keys
 */
export function mapKeys<T extends object>(
  obj: T,
  fn: (key: keyof T, value: T[keyof T]) => string
): Record<string, T[keyof T]> {
  const result: Record<string, T[keyof T]> = {};

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const newKey = fn(key, obj[key]);
      result[newKey] = obj[key];
    }
  }

  return result;
}

/**
 * Inverts object keys and values
 * @param obj - Object to invert
 * @returns Inverted object
 */
export function invert<T extends Record<string, string | number>>(obj: T): Record<string, keyof T> {
  const result: Record<string, keyof T> = {};

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      result[String(obj[key])] = key;
    }
  }

  return result;
}

/**
 * Checks if object is empty
 * @param obj - Object to check
 * @returns True if empty
 */
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Gets all keys from object (typed)
 * @param obj - Object to get keys from
 * @returns Array of keys
 */
export function keys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

/**
 * Gets all values from object
 * @param obj - Object to get values from
 * @returns Array of values
 */
export function values<T extends object>(obj: T): T[keyof T][] {
  return Object.values(obj);
}

/**
 * Gets all entries from object (typed)
 * @param obj - Object to get entries from
 * @returns Array of [key, value] tuples
 */
export function entries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

/**
 * Compares two objects for equality
 * @param obj1 - First object
 * @param obj2 - Second object
 * @returns True if deeply equal
 */
export function isEqual(obj1: unknown, obj2: unknown): boolean {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!isEqual((obj1 as any)[key], (obj2 as any)[key])) return false;
  }

  return true;
}

/**
 * Flattens nested object with dot notation keys
 * @param obj - Object to flatten
 * @param prefix - Prefix for keys
 * @returns Flattened object
 */
export function flatten(obj: Record<string, any>, prefix: string = ''): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (isObject(obj[key]) && !Array.isArray(obj[key])) {
        Object.assign(result, flatten(obj[key], newKey));
      } else {
        result[newKey] = obj[key];
      }
    }
  }

  return result;
}

/**
 * Unflattens object with dot notation keys
 * @param obj - Flattened object
 * @returns Nested object
 */
export function unflatten(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      set(result, key, obj[key]);
    }
  }

  return result;
}

/**
 * Removes undefined values from object
 * @param obj - Object to clean
 * @returns Object without undefined values
 */
export function compact<T extends object>(obj: T): Partial<T> {
  const result: Partial<T> = {};

  for (const key in obj) {
    if (Object.hasOwn(obj, key) && obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }

  return result;
}

/**
 * Freezes object deeply (immutable)
 * @param obj - Object to freeze
 * @returns Frozen object
 */
export function deepFreeze<T extends object>(obj: T): Readonly<T> {
  Object.freeze(obj);

  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = (obj as any)[prop];
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  });

  return obj;
}

/**
 * Converts object to query string
 * @param obj - Object to convert
 * @returns Query string
 */
export function toQueryString(obj: Record<string, any>): string {
  return Object.entries(obj)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
}

/**
 * Parses query string to object
 * @param queryString - Query string to parse
 * @returns Parsed object
 */
export function fromQueryString(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

/**
 * Groups object by property
 * @param obj - Object to group
 * @param fn - Grouping function
 * @returns Grouped object
 */
export function groupBy<T>(
  obj: Record<string, T>,
  fn: (value: T, key: string) => string
): Record<string, Record<string, T>> {
  const result: Record<string, Record<string, T>> = {};

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const groupKey = fn(obj[key], key);
      if (!result[groupKey]) {
        result[groupKey] = {};
      }
      result[groupKey][key] = obj[key];
    }
  }

  return result;
}
