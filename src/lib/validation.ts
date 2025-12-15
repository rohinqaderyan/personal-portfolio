/**
 * Validation utility functions
 * @module validation
 * Comprehensive validation helpers for forms and user input
 */

import { FORM_VALIDATION, PATTERNS } from './constants';

/** Validation result */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates email format
 * @param email - Email address to validate
 * @returns Validation result
 */
export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  if (!FORM_VALIDATION.EMAIL_PATTERN.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
}

/**
 * Validates name field
 * @param name - Name to validate
 * @returns Validation result
 */
export function validateName(name: string): ValidationResult {
  if (!name || !name.trim()) {
    return { isValid: false, error: 'Name is required' };
  }

  if (name.length < FORM_VALIDATION.NAME_MIN_LENGTH) {
    return {
      isValid: false,
      error: `Name must be at least ${FORM_VALIDATION.NAME_MIN_LENGTH} characters`,
    };
  }

  if (name.length > FORM_VALIDATION.NAME_MAX_LENGTH) {
    return {
      isValid: false,
      error: `Name must not exceed ${FORM_VALIDATION.NAME_MAX_LENGTH} characters`,
    };
  }

  return { isValid: true };
}

/**
 * Validates message/textarea field
 * @param message - Message to validate
 * @returns Validation result
 */
export function validateMessage(message: string): ValidationResult {
  if (!message || !message.trim()) {
    return { isValid: false, error: 'Message is required' };
  }

  if (message.length < FORM_VALIDATION.MESSAGE_MIN_LENGTH) {
    return {
      isValid: false,
      error: `Message must be at least ${FORM_VALIDATION.MESSAGE_MIN_LENGTH} characters`,
    };
  }

  if (message.length > FORM_VALIDATION.MESSAGE_MAX_LENGTH) {
    return {
      isValid: false,
      error: `Message must not exceed ${FORM_VALIDATION.MESSAGE_MAX_LENGTH} characters`,
    };
  }

  return { isValid: true };
}

/**
 * Validates URL format
 * @param url - URL to validate
 * @param required - Whether URL is required
 * @returns Validation result
 */
export function validateUrl(url: string, required: boolean = false): ValidationResult {
  if (!url) {
    return required ? { isValid: false, error: 'URL is required' } : { isValid: true };
  }

  if (!PATTERNS.URL.test(url)) {
    return { isValid: false, error: 'Please enter a valid URL' };
  }

  return { isValid: true };
}

/**
 * Validates phone number format
 * @param phone - Phone number to validate
 * @param required - Whether phone is required
 * @returns Validation result
 */
export function validatePhone(phone: string, required: boolean = false): ValidationResult {
  if (!phone) {
    return required ? { isValid: false, error: 'Phone number is required' } : { isValid: true };
  }

  if (!PATTERNS.PHONE.test(phone)) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }

  return { isValid: true };
}

/**
 * Validates slug format (URL-friendly string)
 * @param slug - Slug to validate
 * @returns Validation result
 */
export function validateSlug(slug: string): ValidationResult {
  if (!slug) {
    return { isValid: false, error: 'Slug is required' };
  }

  if (!PATTERNS.SLUG.test(slug)) {
    return {
      isValid: false,
      error: 'Slug must contain only lowercase letters, numbers, and hyphens',
    };
  }

  return { isValid: true };
}

/**
 * Validates username format
 * @param username - Username to validate
 * @returns Validation result
 */
export function validateUsername(username: string): ValidationResult {
  if (!username) {
    return { isValid: false, error: 'Username is required' };
  }

  if (!PATTERNS.USERNAME.test(username)) {
    return {
      isValid: false,
      error:
        'Username must be 3-20 characters and contain only letters, numbers, hyphens, or underscores',
    };
  }

  return { isValid: true };
}

/**
 * Validates password strength
 * @param password - Password to validate
 * @returns Validation result with strength indicator
 */
export function validatePassword(password: string): ValidationResult & { strength?: string } {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;

  if (strength < 3) {
    return {
      isValid: false,
      error: 'Password must include uppercase, lowercase, numbers, and special characters',
      strength: 'weak',
    };
  }

  return {
    isValid: true,
    strength: strength === 4 ? 'strong' : 'medium',
  };
}

/**
 * Validates required field
 * @param value - Value to validate
 * @param fieldName - Name of field for error message
 * @returns Validation result
 */
export function validateRequired(value: string, fieldName: string = 'Field'): ValidationResult {
  if (!value || !value.trim()) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true };
}

/**
 * Validates minimum length
 * @param value - Value to validate
 * @param minLength - Minimum required length
 * @param fieldName - Name of field for error message
 * @returns Validation result
 */
export function validateMinLength(
  value: string,
  minLength: number,
  fieldName: string = 'Field'
): ValidationResult {
  if (value.length < minLength) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${minLength} characters`,
    };
  }

  return { isValid: true };
}

/**
 * Validates maximum length
 * @param value - Value to validate
 * @param maxLength - Maximum allowed length
 * @param fieldName - Name of field for error message
 * @returns Validation result
 */
export function validateMaxLength(
  value: string,
  maxLength: number,
  fieldName: string = 'Field'
): ValidationResult {
  if (value.length > maxLength) {
    return {
      isValid: false,
      error: `${fieldName} must not exceed ${maxLength} characters`,
    };
  }

  return { isValid: true };
}

/**
 * Validates value matches pattern
 * @param value - Value to validate
 * @param pattern - RegExp pattern to match
 * @param errorMessage - Custom error message
 * @returns Validation result
 */
export function validatePattern(
  value: string,
  pattern: RegExp,
  errorMessage: string = 'Invalid format'
): ValidationResult {
  if (!pattern.test(value)) {
    return { isValid: false, error: errorMessage };
  }

  return { isValid: true };
}

/**
 * Validates number is within range
 * @param value - Number to validate
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Validation result
 */
export function validateRange(value: number, min: number, max: number): ValidationResult {
  if (value < min || value > max) {
    return {
      isValid: false,
      error: `Value must be between ${min} and ${max}`,
    };
  }

  return { isValid: true };
}

/**
 * Validates file type
 * @param file - File to validate
 * @param allowedTypes - Array of allowed MIME types
 * @returns Validation result
 */
export function validateFileType(file: File, allowedTypes: string[]): ValidationResult {
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type must be one of: ${allowedTypes.join(', ')}`,
    };
  }

  return { isValid: true };
}

/**
 * Validates file size
 * @param file - File to validate
 * @param maxSize - Maximum size in bytes
 * @returns Validation result
 */
export function validateFileSize(file: File, maxSize: number): ValidationResult {
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
    return {
      isValid: false,
      error: `File size must not exceed ${maxSizeMB}MB`,
    };
  }

  return { isValid: true };
}

/**
 * Validates date is not in the past
 * @param date - Date to validate
 * @returns Validation result
 */
export function validateFutureDate(date: Date | string): ValidationResult {
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();

  if (checkDate < now) {
    return { isValid: false, error: 'Date must be in the future' };
  }

  return { isValid: true };
}

/**
 * Validates date is not in the future
 * @param date - Date to validate
 * @returns Validation result
 */
export function validatePastDate(date: Date | string): ValidationResult {
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();

  if (checkDate > now) {
    return { isValid: false, error: 'Date must be in the past' };
  }

  return { isValid: true };
}

/**
 * Combines multiple validation results
 * @param results - Array of validation results
 * @returns Combined validation result
 */
export function combineValidations(results: ValidationResult[]): ValidationResult {
  const errors = results.filter((r) => !r.isValid).map((r) => r.error);

  return {
    isValid: errors.length === 0,
    error: errors.join(', '),
  };
}

/**
 * Sanitizes HTML input to prevent XSS
 * @param input - User input to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates and sanitizes user input
 * @param input - User input
 * @param validator - Validation function
 * @returns Validation result with sanitized value
 */
export function validateAndSanitize(
  input: string,
  validator: (value: string) => ValidationResult
): ValidationResult & { sanitized?: string } {
  const result = validator(input);

  if (result.isValid) {
    return {
      ...result,
      sanitized: sanitizeInput(input),
    };
  }

  return result;
}
