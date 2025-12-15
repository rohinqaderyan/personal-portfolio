/**
 * String utility functions
 * @module string
 * Helper functions for string manipulation and formatting
 */

/**
 * Capitalizes the first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts a string to title case
 * @param str - String to convert
 * @returns Title cased string
 */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * Converts a string to kebab-case
 * @param str - String to convert
 * @returns Kebab-cased string
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Converts a string to camelCase
 * @param str - String to convert
 * @returns Camel-cased string
 */
export function toCamelCase(str: string): string {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}

/**
 * Converts a string to snake_case
 * @param str - String to convert
 * @returns Snake-cased string
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * Truncates a string to specified length with ellipsis
 * @param str - String to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated string
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Truncates string at word boundary
 * @param str - String to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add
 * @returns Truncated string at word boundary
 */
export function truncateWords(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) return str;

  const truncated = str.slice(0, maxLength - suffix.length);
  const lastSpace = truncated.lastIndexOf(' ');

  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + suffix;
}

/**
 * Removes HTML tags from string
 * @param str - String containing HTML
 * @returns Plain text string
 */
export function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}

/**
 * Escapes HTML special characters
 * @param str - String to escape
 * @returns Escaped string
 */
export function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return str.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Converts string to slug format
 * @param str - String to slugify
 * @returns URL-friendly slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Extracts initials from a name
 * @param name - Full name
 * @param maxInitials - Maximum number of initials (default: 2)
 * @returns Initials (e.g., "JD" for "John Doe")
 */
export function getInitials(name: string, maxInitials: number = 2): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, maxInitials)
    .map((word) => word[0].toUpperCase())
    .join('');
}

/**
 * Pluralizes a word based on count
 * @param word - Word to pluralize
 * @param count - Count to determine pluralization
 * @param plural - Custom plural form (optional)
 * @returns Pluralized word
 */
export function pluralize(word: string, count: number, plural?: string): string {
  if (count === 1) return word;
  return plural || `${word}s`;
}

/**
 * Formats a number with word
 * @param count - Number to format
 * @param singular - Singular form
 * @param plural - Plural form (optional)
 * @returns Formatted string (e.g., "5 items")
 */
export function formatCount(count: number, singular: string, plural?: string): string {
  return `${count} ${pluralize(singular, count, plural)}`;
}

/**
 * Checks if string contains substring (case-insensitive)
 * @param str - String to search in
 * @param searchStr - String to search for
 * @returns True if found
 */
export function includesIgnoreCase(str: string, searchStr: string): boolean {
  return str.toLowerCase().includes(searchStr.toLowerCase());
}

/**
 * Highlights search term in text
 * @param text - Text to search in
 * @param searchTerm - Term to highlight
 * @param className - CSS class for highlight
 * @returns Text with highlighted term
 */
export function highlightText(
  text: string,
  searchTerm: string,
  className: string = 'highlight'
): string {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
  return text.replace(regex, `<span class="${className}">$1</span>`);
}

/**
 * Escapes special regex characters in string
 * @param str - String to escape
 * @returns Escaped string for use in RegExp
 */
export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Pads string to specified length
 * @param str - String to pad
 * @param length - Target length
 * @param char - Character to pad with (default: ' ')
 * @param position - Pad position ('start' or 'end')
 * @returns Padded string
 */
export function pad(
  str: string,
  length: number,
  char: string = ' ',
  position: 'start' | 'end' = 'start'
): string {
  const padLength = Math.max(0, length - str.length);
  const padding = char.repeat(padLength);

  return position === 'start' ? padding + str : str + padding;
}

/**
 * Reverses a string
 * @param str - String to reverse
 * @returns Reversed string
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Counts occurrences of substring in string
 * @param str - String to search in
 * @param searchStr - Substring to count
 * @param caseSensitive - Whether search is case-sensitive
 * @returns Number of occurrences
 */
export function countOccurrences(
  str: string,
  searchStr: string,
  caseSensitive: boolean = true
): number {
  const text = caseSensitive ? str : str.toLowerCase();
  const search = caseSensitive ? searchStr : searchStr.toLowerCase();

  return (text.match(new RegExp(escapeRegExp(search), 'g')) || []).length;
}

/**
 * Extracts numbers from string
 * @param str - String containing numbers
 * @returns Array of numbers
 */
export function extractNumbers(str: string): number[] {
  const matches = str.match(/-?\d+\.?\d*/g);
  return matches ? matches.map(Number) : [];
}

/**
 * Calculates reading time for text
 * @param text - Text to calculate reading time for
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Formats reading time as string
 * @param text - Text to calculate reading time for
 * @param wordsPerMinute - Average reading speed
 * @returns Formatted reading time (e.g., "5 min read")
 */
export function formatReadingTime(text: string, wordsPerMinute: number = 200): string {
  const minutes = calculateReadingTime(text, wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Checks if string is valid email
 * @param email - Email to validate
 * @returns True if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Masks sensitive data in string
 * @param str - String to mask
 * @param visibleChars - Number of visible characters at start and end
 * @param maskChar - Character to use for masking
 * @returns Masked string
 */
export function maskString(str: string, visibleChars: number = 4, maskChar: string = '*'): string {
  if (str.length <= visibleChars * 2) return str;

  const start = str.slice(0, visibleChars);
  const end = str.slice(-visibleChars);
  const maskLength = str.length - visibleChars * 2;

  return `${start}${maskChar.repeat(maskLength)}${end}`;
}

/**
 * Generates random string
 * @param length - Length of string
 * @param charset - Characters to use
 * @returns Random string
 */
export function randomString(
  length: number,
  charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}
