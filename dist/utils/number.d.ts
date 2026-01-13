/**
 * Format a number with grouping separators.
 * @param value - The number to format.
 * @param locale - The locale to use (default: 'vi-VN').
 * @param options - Intl.NumberFormatOptions.
 * @returns Formatted number string.
 */
export declare const formatNumber: (value: number, locale?: string, options?: Intl.NumberFormatOptions) => string;
/**
 * Format a number as currency.
 * @param value - The number to format.
 * @param currency - The currency code (default: 'VND').
 * @param locale - The locale to use (default: 'vi-VN').
 * @returns Formatted currency string.
 */
export declare const formatCurrency: (value: number, currency?: string, locale?: string) => string;
/**
 * Format a large number into a compact string (e.g., 1.2k, 1.5M).
 * @param value - The number to format.
 * @param locale - The locale to use (default: 'vi-VN').
 * @returns Compact number string.
 */
export declare const compactNumber: (value: number, locale?: string) => string;
/**
 * Format a percentage (0.1 -> 10%).
 * @param value - The number to format (0-1).
 * @param fractionDigits - Number of decimal places.
 * @returns Formatted percentage string.
 */
export declare const formatPercentage: (value: number, fractionDigits?: number) => string;
