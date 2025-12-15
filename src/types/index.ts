/**
 * Type definitions for application-wide types
 * Centralized type definitions for better maintainability
 * @updated December 2024
 */

/** Navigation link configuration */
export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

/** Social media link configuration */
export interface SocialLink {
  name: string;
  href: string;
  icon: string;
  ariaLabel: string;
}

/** Project data structure */
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  link: string;
  repo: string;
  image?: string;
  year: string;
  featured?: boolean;
}

/** Skill category structure */
export interface SkillCategory {
  category: string;
  skills: string[];
}

/** Experience/work history structure */
export interface Experience {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string[];
  technologies?: string[];
}

/** Contact form data */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/** API response wrapper */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/** Error response structure */
export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp?: string;
}

/** Theme options */
export type Theme = 'light' | 'dark' | 'system';

/** Animation variant names */
export type AnimationVariant = 'hidden' | 'visible' | 'hover' | 'tap';

/** HTTP methods */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** Page metadata */
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
}

/** SEO data structure */
export interface SEOData extends PageMetadata {
  url: string;
  siteName: string;
  author: string;
  publishedTime?: string;
  modifiedTime?: string;
}

/** Filter options for projects */
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

/** Sort options */
export interface SortOption {
  label: string;
  value: string;
  direction: 'asc' | 'desc';
}

/** Pagination info */
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Analytics event */
export interface AnalyticsEvent {
  name: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
}

/** Web Vitals metrics */
export interface WebVital {
  id: string;
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

/** Toast notification */
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

/** User preferences */
export interface UserPreferences {
  theme: Theme;
  reduceMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
  language: string;
}

/** File upload info */
export interface FileInfo {
  name: string;
  size: number;
  type: string;
  url?: string;
}

/** Breadcrumb item */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** Modal props */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

/** Card component props */
export interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

/** Button variant types */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';

/** Button size types */
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Icon position types */
export type IconPosition = 'left' | 'right';

/** Loading state */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/** Form field state */
export interface FieldState {
  value: string;
  error?: string;
  touched: boolean;
  dirty: boolean;
}

/** Validation rule */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean | string;
}

/** API error types */
export type ApiErrorType =
  | 'network_error'
  | 'validation_error'
  | 'authentication_error'
  | 'authorization_error'
  | 'not_found_error'
  | 'rate_limit_error'
  | 'server_error';

/** Route configuration */
export interface RouteConfig {
  path: string;
  title: string;
  description: string;
  showInNav?: boolean;
  protected?: boolean;
}

/** Feature flag */
export interface FeatureFlag {
  name: string;
  enabled: boolean;
  description: string;
}

/** Cache entry */
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

/** Request options */
export interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  cache?: RequestCache;
  signal?: AbortSignal;
}

/** Image dimensions */
export interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio?: number;
}

/** Color theme */
export interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
}

/** Typography scale */
export interface TypographyScale {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

/** Spacing scale */
export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32;

/** Utility types */

/** Make all properties optional recursively */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** Make all properties required recursively */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/** Extract the type of array elements */
export type ArrayElement<T extends readonly unknown[]> = T extends readonly (infer U)[] ? U : never;

/** Make specified keys required */
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Make specified keys optional */
export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Type-safe object keys */
export type ObjectKeys<T> = keyof T;

/** Type-safe object values */
export type ObjectValues<T> = T[keyof T];

/** Awaited return type */
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

/** Function with specific parameters and return type */
export type Func<TParams extends unknown[] = [], TReturn = void> = (...args: TParams) => TReturn;

/** Async function type */
export type AsyncFunc<TParams extends unknown[] = [], TReturn = void> = (
  ...args: TParams
) => Promise<TReturn>;

/** Event handler type */
export type EventHandler<T = Event> = (event: T) => void;

/** Change handler type for form inputs */
export type ChangeHandler = EventHandler<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>;

/** Click handler type */
export type ClickHandler = EventHandler<React.MouseEvent<HTMLElement>>;

/** Submit handler type */
export type SubmitHandler = EventHandler<React.FormEvent<HTMLFormElement>>;
