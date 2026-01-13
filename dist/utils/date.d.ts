/**
 * Format a date object, string, or timestamp into a localized string.
 * @param date - The date to format.
 * @param locale - The locale to use (default: 'vi-VN').
 * @param options - Intl.DateTimeFormatOptions.
 * @returns Formatted date string.
 */
export declare const formatDate: (date: Date | string | number, locale?: string, options?: Intl.DateTimeFormatOptions) => string;
/**
 * Format a date object, string, or timestamp into a localized time string.
 * @param date - The date to format.
 * @param locale - The locale to use (default: 'vi-VN').
 * @param options - Intl.DateTimeFormatOptions.
 * @returns Formatted time string.
 */
export declare const formatTime: (date: Date | string | number, locale?: string, options?: Intl.DateTimeFormatOptions) => string;
/**
 * Format a date object, string, or timestamp into a localized date and time string.
 * @param date - The date to format.
 * @param locale - The locale to use (default: 'vi-VN').
 * @returns Formatted date and time string.
 */
export declare const formatDateTime: (date: Date | string | number, locale?: string) => string;
/**
 * Returns a relative time string (e.g., "5 minutes ago").
 * Note: This is a simplified implementation. For full localization, consider a library or larger implementation.
 * @param date - The date to compare.
 * @returns Relative time string.
 */
export declare const timeAgo: (date: Date | string | number) => string;
