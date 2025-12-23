/**
 * Date utility functions
 * @module date
 * @description Helper functions for date formatting and manipulation
 */

/**
 * Formats a date string into a readable format
 * @param dateString - ISO date string or Date object
 * @param format - Format type ('full', 'short', 'relative')
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string | Date,
  format: 'full' | 'short' | 'relative' = 'full'
): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;

  if (format === 'relative') {
    return getRelativeTime(date);
  }

  const options: Intl.DateTimeFormatOptions =
    format === 'full'
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : { year: 'numeric', month: 'short' };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Gets relative time string (e.g., "2 days ago", "in 3 hours")
 * @param date - Date to compare
 * @param baseDate - Base date for comparison (defaults to now)
 * @returns Relative time string
 */
export function getRelativeTime(date: Date, baseDate: Date = new Date()): string {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = baseDate.getTime() - date.getTime();

  if (elapsed < msPerMinute) {
    return 'just now';
  } else if (elapsed < msPerHour) {
    const minutes = Math.round(elapsed / msPerMinute);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (elapsed < msPerDay) {
    const hours = Math.round(elapsed / msPerHour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (elapsed < msPerMonth) {
    const days = Math.round(elapsed / msPerDay);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (elapsed < msPerYear) {
    const months = Math.round(elapsed / msPerMonth);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.round(elapsed / msPerYear);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}

/**
 * Calculates duration between two dates
 * @param start - Start date
 * @param end - End date (defaults to now)
 * @returns Human-readable duration (e.g., "2 years 3 months")
 */
export function calculateDuration(start: Date | string, end: Date | string = new Date()): string {
  const startDate = typeof start === 'string' ? new Date(start) : start;
  const endDate = typeof end === 'string' ? new Date(end) : end;

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);

  return parts.join(' ') || 'Less than a month';
}

/**
 * Checks if a date is in the past
 * @param date - Date to check
 * @returns True if date is in the past
 */
export function isPast(date: Date | string): boolean {
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  return checkDate < new Date();
}

/**
 * Checks if a date is in the future
 * @param date - Date to check
 * @returns True if date is in the future
 */
export function isFuture(date: Date | string): boolean {
  return !isPast(date);
}

/**
 * Gets the start of day for a given date
 * @param date - Date to process
 * @returns Date at 00:00:00
 */
export function startOfDay(date: Date = new Date()): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Gets the end of day for a given date
 * @param date - Date to process
 * @returns Date at 23:59:59.999
 */
export function endOfDay(date: Date = new Date()): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Adds days to a date
 * @param date - Starting date
 * @param days - Number of days to add (can be negative)
 * @returns New date with days added
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Formats a date as ISO string (YYYY-MM-DD)
 * @param date - Date to format
 * @returns ISO date string
 */
export function toISODateString(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

/**
 * Parses various date formats into Date object
 * @param dateString - Date string to parse
 * @returns Date object or null if invalid
 */
export function parseDate(dateString: string): Date | null {
  // Try ISO format first
  let date = new Date(dateString);
  if (!isNaN(date.getTime())) return date;

  // Try common formats
  const formats = [
    /^(\d{4})-(\d{2})-(\d{2})$/, // YYYY-MM-DD
    /^(\d{2})\/(\d{2})\/(\d{4})$/, // MM/DD/YYYY
    /^(\d{2})-(\d{2})-(\d{4})$/, // DD-MM-YYYY
  ];

  for (const format of formats) {
    const match = dateString.match(format);
    if (match) {
      date = new Date(match[0]);
      if (!isNaN(date.getTime())) return date;
    }
  }

  return null;
}

/**
 * Gets age from birthdate
 * @param birthdate - Date of birth
 * @returns Age in years
 */
export function getAge(birthdate: Date | string): number {
  const birth = typeof birthdate === 'string' ? new Date(birthdate) : birthdate;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

/**
 * Checks if two dates are the same day
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Gets array of dates between start and end
 * @param start - Start date
 * @param end - End date
 * @returns Array of dates
 */
export function getDateRange(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  const currentDate = new Date(start);

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
