/**
 * Application-wide constants
 * @module constants
 * @description Centralized configuration values for maintainability
 */

/** Animation timing constants (in seconds) */
export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 0.8,
} as const;

/** Animation delays for stagger effects */
export const ANIMATION_DELAY = {
  NONE: 0,
  SHORT: 0.05,
  MEDIUM: 0.1,
  LONG: 0.2,
} as const;

/** Animation easing curves */
export const ANIMATION_EASE = {
  DEFAULT: [0.6, -0.05, 0.01, 0.99],
  SMOOTH: [0.43, 0.13, 0.23, 0.96],
  BOUNCE: [0.68, -0.55, 0.265, 1.55],
} as const;

/** Breakpoints for responsive design (matching Tailwind) */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

/** Z-index layers for consistent stacking */
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
} as const;

/** Page metadata defaults */
export const DEFAULT_METADATA = {
  TITLE_TEMPLATE: '%s | Ahmad Rohin Qaderyan',
  DESCRIPTION:
    'Senior Full Stack Developer & Data Scientist at Pfizer. Expertise in Python, React, TypeScript, and Machine Learning. Building enterprise-scale solutions.',
  KEYWORDS: [
    'Full Stack Developer',
    'Data Scientist',
    'Python',
    'React',
    'TypeScript',
    'Next.js',
    'Machine Learning',
    'AWS',
    'PostgreSQL',
    'Docker',
  ],
  OG_IMAGE: '/og-image.png',
  OG_TYPE: 'website',
} as const;

/** Social media links */
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/rohinqaderyan',
  LINKEDIN: 'https://www.linkedin.com/in/rohinqaderyan',
  EMAIL: 'rohin.aryain@gmail.com',
} as const;

/** Form validation constants */
export const FORM_VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 1000,
} as const;

/** Performance budgets (in KB) */
export const PERFORMANCE_BUDGET = {
  FIRST_LOAD_JS: 150,
  ROUTE_BUNDLE: 50,
  SHARED_BUNDLE: 100,
} as const;

/** HTTP status codes */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/** API rate limiting */
export const RATE_LIMIT = {
  MAX_REQUESTS: 10,
  WINDOW_MS: 60 * 1000, // 1 minute
} as const;

/** Cache durations (in seconds) */
export const CACHE_DURATION = {
  STATIC_ASSET: 31536000, // 1 year
  PAGE: 3600, // 1 hour
  API: 300, // 5 minutes
  REVALIDATE: 60, // 1 minute
} as const;

/** Feature flags */
export const FEATURES = {
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID !== undefined,
  ENABLE_BLOG: false, // TODO: Enable when blog is implemented
  ENABLE_DARK_MODE: true,
  ENABLE_ANIMATIONS: true,
} as const;

/** External API URLs */
export const API_URLS = {
  GITHUB_API: 'https://api.github.com',
  FLASK_BACKEND: process.env.FLASK_API_URL || 'http://localhost:5000',
} as const;

/** File size limits (in bytes) */
export const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
} as const;

/** Pagination defaults */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 9,
  MAX_PAGE_SIZE: 50,
} as const;

/** Error messages */
export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again later.',
  NETWORK: 'Network error. Please check your connection.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
} as const;

/** Success messages */
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Thank you! Your message has been sent successfully.',
  COPIED_TO_CLIPBOARD: 'Copied to clipboard!',
  SETTINGS_SAVED: 'Settings saved successfully.',
} as const;

/** Local storage keys */
export const STORAGE_KEYS = {
  THEME: 'theme',
  FILTERS: 'project-filters',
  PREFERENCES: 'user-preferences',
} as const;

/** Cookie names */
export const COOKIE_NAMES = {
  CONSENT: 'cookie-consent',
  SESSION: 'session',
} as const;

/** Date formats */
export const DATE_FORMATS = {
  FULL: 'MMMM d, yyyy',
  SHORT: 'MMM yyyy',
  ISO: 'yyyy-MM-dd',
} as const;

/** Regex patterns */
export const PATTERNS = {
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  PHONE: /^\+?[\d\s-()]+$/,
  URL: /^https?:\/\/.+/,
} as const;

/** Content limits */
export const CONTENT_LIMITS = {
  PROJECT_DESCRIPTION: 200,
  PROJECT_LONG_DESCRIPTION: 2000,
  BIO: 500,
  SKILL_ITEMS: 50,
  EXPERIENCE_ITEMS: 20,
} as const;
