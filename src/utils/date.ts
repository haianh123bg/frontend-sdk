/**
 * Format a date object, string, or timestamp into a localized string.
 * @param date - The date to format.
 * @param locale - The locale to use (default: 'vi-VN').
 * @param options - Intl.DateTimeFormatOptions.
 * @returns Formatted date string.
 */
export const formatDate = (
    date: Date | string | number,
    locale: string = 'vi-VN',
    options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }
): string => {
    try {
        const dateObj = new Date(date)
        if (isNaN(dateObj.getTime())) return ''
        return new Intl.DateTimeFormat(locale, options).format(dateObj)
    } catch (e) {
        return ''
    }
}

/**
 * Format a date object, string, or timestamp into a localized time string.
 * @param date - The date to format.
 * @param locale - The locale to use (default: 'vi-VN').
 * @param options - Intl.DateTimeFormatOptions.
 * @returns Formatted time string.
 */
export const formatTime = (
    date: Date | string | number,
    locale: string = 'vi-VN',
    options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
    }
): string => {
    try {
        const dateObj = new Date(date)
        if (isNaN(dateObj.getTime())) return ''
        return new Intl.DateTimeFormat(locale, options).format(dateObj)
    } catch (e) {
        return ''
    }
}

/**
 * Format a date object, string, or timestamp into a localized date and time string.
 * @param date - The date to format.
 * @param locale - The locale to use (default: 'vi-VN').
 * @returns Formatted date and time string.
 */
export const formatDateTime = (
    date: Date | string | number,
    locale: string = 'vi-VN'
): string => {
    return `${formatDate(date, locale)} ${formatTime(date, locale)}`
}

/**
 * Returns a relative time string (e.g., "5 minutes ago").
 * Note: This is a simplified implementation. For full localization, consider a library or larger implementation.
 * @param date - The date to compare.
 * @returns Relative time string.
 */
export const timeAgo = (date: Date | string | number): string => {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) return ''

    const now = new Date()
    const seconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

    // Future dates
    if (seconds < 0) return 'vừa xong'

    const interval = {
        năm: 31536000,
        tháng: 2592000,
        tuần: 604800,
        ngày: 86400,
        giờ: 3600,
        phút: 60,
    }

    if (seconds < 60) return 'vừa xong'

    for (const [unit, value] of Object.entries(interval)) {
        const count = Math.floor(seconds / value)
        if (count >= 1) {
            return `${count} ${unit} trước`
        }
    }

    return 'vừa xong'
}
