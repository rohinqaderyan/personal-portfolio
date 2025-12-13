/**
 * Number utility functions
 * @module number
 * Helper functions for number formatting and manipulation
 */

/**
 * Formats number with commas
 * @param num - Number to format
 * @returns Formatted string (e.g., "1,234,567")
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Formats number as currency
 * @param amount - Amount to format
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Formats number as percentage
 * @param value - Value to format (0-1 for percentage)
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Formats large numbers with suffixes (K, M, B, T)
 * @param num - Number to format
 * @param decimals - Number of decimal places
 * @returns Formatted string (e.g., "1.2K", "3.5M")
 */
export function formatCompact(num: number, decimals: number = 1): string {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const tier = Math.floor(Math.log10(Math.abs(num)) / 3);

  if (tier === 0) return num.toString();

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;

  return scaled.toFixed(decimals) + suffix;
}

/**
 * Formats bytes to human-readable size
 * @param bytes - Number of bytes
 * @param decimals - Number of decimal places
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

/**
 * Clamps number between min and max
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Checks if number is between min and max (inclusive)
 * @param value - Value to check
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns True if in range
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Rounds number to specified decimal places
 * @param value - Value to round
 * @param decimals - Number of decimal places
 * @returns Rounded value
 */
export function round(value: number, decimals: number = 0): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Generates random integer between min and max (inclusive)
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random integer
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates random float between min and max
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random float
 */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Calculates percentage of value relative to total
 * @param value - Part value
 * @param total - Total value
 * @returns Percentage (0-100)
 */
export function percentage(value: number, total: number): number {
  return total === 0 ? 0 : (value / total) * 100;
}

/**
 * Calculates percentage change between two values
 * @param oldValue - Original value
 * @param newValue - New value
 * @returns Percentage change
 */
export function percentageChange(oldValue: number, newValue: number): number {
  return oldValue === 0 ? 0 : ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Linear interpolation between two values
 * @param start - Start value
 * @param end - End value
 * @param t - Interpolation factor (0-1)
 * @returns Interpolated value
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Maps value from one range to another
 * @param value - Value to map
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @returns Mapped value
 */
export function map(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Checks if number is even
 * @param num - Number to check
 * @returns True if even
 */
export function isEven(num: number): boolean {
  return num % 2 === 0;
}

/**
 * Checks if number is odd
 * @param num - Number to check
 * @returns True if odd
 */
export function isOdd(num: number): boolean {
  return num % 2 !== 0;
}

/**
 * Checks if number is prime
 * @param num - Number to check
 * @returns True if prime
 */
export function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }

  return true;
}

/**
 * Calculates factorial of number
 * @param num - Number to calculate factorial for
 * @returns Factorial
 */
export function factorial(num: number): number {
  if (num < 0) return NaN;
  if (num === 0 || num === 1) return 1;
  return num * factorial(num - 1);
}

/**
 * Calculates greatest common divisor
 * @param a - First number
 * @param b - Second number
 * @returns GCD
 */
export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Calculates least common multiple
 * @param a - First number
 * @param b - Second number
 * @returns LCM
 */
export function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

/**
 * Calculates Fibonacci number at position
 * @param n - Position in sequence
 * @returns Fibonacci number
 */
export function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

/**
 * Converts degrees to radians
 * @param degrees - Angle in degrees
 * @returns Angle in radians
 */
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Converts radians to degrees
 * @param radians - Angle in radians
 * @returns Angle in degrees
 */
export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Calculates average of array of numbers
 * @param numbers - Array of numbers
 * @returns Average
 */
export function average(numbers: number[]): number {
  return numbers.length === 0 ? 0 : numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

/**
 * Calculates standard deviation
 * @param numbers - Array of numbers
 * @returns Standard deviation
 */
export function standardDeviation(numbers: number[]): number {
  const avg = average(numbers);
  const squareDiffs = numbers.map((num) => Math.pow(num - avg, 2));
  return Math.sqrt(average(squareDiffs));
}

/**
 * Pads number with leading zeros
 * @param num - Number to pad
 * @param length - Target length
 * @returns Padded string
 */
export function padZero(num: number, length: number): string {
  return String(num).padStart(length, '0');
}

/**
 * Formats number as ordinal (1st, 2nd, 3rd, etc.)
 * @param num - Number to format
 * @returns Ordinal string
 */
export function toOrdinal(num: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = num % 100;
  return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

/**
 * Converts number to Roman numeral
 * @param num - Number to convert (1-3999)
 * @returns Roman numeral string
 */
export function toRoman(num: number): string {
  if (num < 1 || num > 3999) return '';

  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let result = '';

  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += symbols[i];
      num -= values[i];
    }
  }

  return result;
}
