/**
 * Time Formatting Utilities
 *
 * Format timestamps in human-readable relative formats
 */

/**
 * Format a date to relative time (e.g., "2 hours ago", "3 days ago")
 */
export function formatRelativeTime(date: Date | string): string {
    const timestamp = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000)

    // Future dates
    if (diffInSeconds < 0) {
        return 'just now'
    }

    // Less than a minute
    if (diffInSeconds < 60) {
        return 'just now'
    }

    // Less than an hour
    if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
    }

    // Less than a day
    if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
    }

    // Less than a week
    if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400)
        return `${days} ${days === 1 ? 'day' : 'days'} ago`
    }

    // Less than a month
    if (diffInSeconds < 2592000) {
        const weeks = Math.floor(diffInSeconds / 604800)
        return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
    }

    // Less than a year
    if (diffInSeconds < 31536000) {
        const months = Math.floor(diffInSeconds / 2592000)
        return `${months} ${months === 1 ? 'month' : 'months'} ago`
    }

    // Over a year
    const years = Math.floor(diffInSeconds / 31536000)
    return `${years} ${years === 1 ? 'year' : 'years'} ago`
}

/**
 * Format a date to absolute format (e.g., "Jan 15, 2026 at 3:45 PM")
 */
export function formatAbsoluteTime(date: Date | string): string {
    const timestamp = typeof date === 'string' ? new Date(date) : date

    return timestamp.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })
}

/**
 * Format a date to short format (e.g., "Jan 15, 2026")
 */
export function formatShortDate(date: Date | string): string {
    const timestamp = typeof date === 'string' ? new Date(date) : date

    return timestamp.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

/**
 * Format timestamp with smart selection between relative and absolute
 * - Recent dates (< 7 days): Relative (e.g., "2 hours ago")
 * - Older dates: Absolute (e.g., "Jan 15, 2026")
 */
export function formatSmartTime(date: Date | string): string {
    const timestamp = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000)

    // If within the last week, use relative time
    if (diffInSeconds < 604800) {
        return formatRelativeTime(timestamp)
    }

    // Otherwise, use absolute date (without time)
    return formatShortDate(timestamp)
}
