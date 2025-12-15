/**
 * URL utility functions
 * @module url
 * Helper functions for URL manipulation and validation
 */

/**
 * Builds URL with query parameters
 * @param baseUrl - Base URL
 * @param params - Query parameters object
 * @returns Complete URL with query string
 */
export function buildUrl(baseUrl: string, params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) return baseUrl;

  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
}

/**
 * Parses URL query parameters
 * @param url - URL string
 * @returns Object with query parameters
 */
export function parseQueryParams(url: string): Record<string, string> {
  const urlObj = new URL(url);
  const params: Record<string, string> = {};

  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

/**
 * Adds or updates query parameter in URL
 * @param url - URL string
 * @param key - Parameter key
 * @param value - Parameter value
 * @returns Updated URL
 */
export function setQueryParam(url: string, key: string, value: string): string {
  const urlObj = new URL(url);
  urlObj.searchParams.set(key, value);
  return urlObj.toString();
}

/**
 * Removes query parameter from URL
 * @param url - URL string
 * @param key - Parameter key to remove
 * @returns Updated URL
 */
export function removeQueryParam(url: string, key: string): string {
  const urlObj = new URL(url);
  urlObj.searchParams.delete(key);
  return urlObj.toString();
}

/**
 * Gets domain from URL
 * @param url - URL string
 * @returns Domain name
 */
export function getDomain(url: string): string {
  const urlObj = new URL(url);
  return urlObj.hostname;
}

/**
 * Checks if URL is absolute
 * @param url - URL string
 * @returns True if absolute URL
 */
export function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

/**
 * Converts relative URL to absolute
 * @param url - Relative URL
 * @param baseUrl - Base URL
 * @returns Absolute URL
 */
export function toAbsoluteUrl(url: string, baseUrl: string): string {
  if (isAbsoluteUrl(url)) return url;
  return new URL(url, baseUrl).toString();
}

/**
 * Normalizes URL (removes trailing slash, etc.)
 * @param url - URL to normalize
 * @returns Normalized URL
 */
export function normalizeUrl(url: string): string {
  let normalized = url.trim();

  // Remove trailing slash
  if (normalized.endsWith('/') && normalized.length > 1) {
    normalized = normalized.slice(0, -1);
  }

  // Ensure protocol
  if (!normalized.startsWith('http')) {
    normalized = `https://${normalized}`;
  }

  return normalized;
}

/**
 * Checks if two URLs are the same (ignoring query params and hash)
 * @param url1 - First URL
 * @param url2 - Second URL
 * @returns True if same
 */
export function isSameUrl(url1: string, url2: string): boolean {
  const u1 = new URL(url1);
  const u2 = new URL(url2);

  return u1.origin === u2.origin && u1.pathname === u2.pathname;
}

/**
 * Extracts path from URL
 * @param url - URL string
 * @returns Path portion
 */
export function getPath(url: string): string {
  const urlObj = new URL(url);
  return urlObj.pathname;
}

/**
 * Extracts hash from URL
 * @param url - URL string
 * @returns Hash portion (without #)
 */
export function getHash(url: string): string {
  const urlObj = new URL(url);
  return urlObj.hash.slice(1);
}

/**
 * Builds URL with hash
 * @param baseUrl - Base URL
 * @param hash - Hash value
 * @returns URL with hash
 */
export function setHash(baseUrl: string, hash: string): string {
  const urlObj = new URL(baseUrl);
  urlObj.hash = hash.startsWith('#') ? hash : `#${hash}`;
  return urlObj.toString();
}

/**
 * Checks if URL is valid
 * @param url - URL string to validate
 * @returns True if valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Gets file extension from URL
 * @param url - URL string
 * @returns File extension (without dot)
 */
export function getFileExtension(url: string): string {
  const pathname = new URL(url).pathname;
  const match = pathname.match(/\.([^.]+)$/);
  return match ? match[1] : '';
}

/**
 * Checks if URL points to image
 * @param url - URL string
 * @returns True if image URL
 */
export function isImageUrl(url: string): boolean {
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'];
  const ext = getFileExtension(url).toLowerCase();
  return imageExts.includes(ext);
}

/**
 * Encodes URL component safely
 * @param str - String to encode
 * @returns Encoded string
 */
export function encodeUrl(str: string): string {
  return encodeURIComponent(str);
}

/**
 * Decodes URL component safely
 * @param str - String to decode
 * @returns Decoded string
 */
export function decodeUrl(str: string): string {
  return decodeURIComponent(str);
}

/**
 * Joins URL paths safely
 * @param parts - URL path parts
 * @returns Joined path
 */
export function joinPaths(...parts: string[]): string {
  return parts
    .map((part, i) => {
      if (i === 0) return part.replace(/\/$/, '');
      return part.replace(/^\//, '').replace(/\/$/, '');
    })
    .filter(Boolean)
    .join('/');
}

/**
 * Opens URL in new tab
 * @param url - URL to open
 * @param features - Window features
 */
export function openInNewTab(url: string, features?: string): void {
  window.open(url, '_blank', features);
}

/**
 * Creates mailto link
 * @param email - Email address
 * @param subject - Email subject
 * @param body - Email body
 * @returns Mailto URL
 */
export function createMailtoLink(email: string, subject?: string, body?: string): string {
  const params: string[] = [];

  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);

  const queryString = params.length > 0 ? `?${params.join('&')}` : '';
  return `mailto:${email}${queryString}`;
}

/**
 * Creates tel link
 * @param phoneNumber - Phone number
 * @returns Tel URL
 */
export function createTelLink(phoneNumber: string): string {
  return `tel:${phoneNumber.replace(/\s/g, '')}`;
}

/**
 * Gets URL-safe slug from string
 * @param str - String to convert
 * @returns URL-safe slug
 */
export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
