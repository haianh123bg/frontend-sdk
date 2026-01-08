/**
 * Format a number with grouping separators.
 * @param value - The number to format.
 * @param locale - The locale to use (default: 'vi-VN').
 * @param options - Intl.NumberFormatOptions.
 * @returns Formatted number string.
 */
export const formatNumber = (
    value: number,
    locale: string = 'vi-VN',
    options?: Intl.NumberFormatOptions
): string => {
    if (isNaN(value)) return '0'
    return new Intl.NumberFormat(locale, options).format(value)
}

/**
 * Format a number as currency.
 * @param value - The number to format.
 * @param currency - The currency code (default: 'VND').
 * @param locale - The locale to use (default: 'vi-VN').
 * @returns Formatted currency string.
 */
export const formatCurrency = (
    value: number,
    currency: string = 'VND',
    locale: string = 'vi-VN'
): string => {
    if (isNaN(value)) return '0'
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(value)
}

/**
 * Format a large number into a compact string (e.g., 1.2k, 1.5M).
 * @param value - The number to format.
 * @param locale - The locale to use (default: 'vi-VN').
 * @returns Compact number string.
 */
export const compactNumber = (
    value: number,
    locale: string = 'en-US' // Default to en-US for conventional 1k, 1M styles which are common in tech
): string => {
    if (isNaN(value)) return '0'
    return new Intl.NumberFormat(locale, {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(value)
}

/**
 * Format a percentage (0.1 -> 10%).
 * @param value - The number to format (0-1).
 * @param fractionDigits - Number of decimal places.
 * @returns Formatted percentage string.
 */
export const formatPercentage = (value: number, fractionDigits: number = 0): string => {
    if (isNaN(value)) return '0%'
    return `${(value * 100).toFixed(fractionDigits)}%`
}
