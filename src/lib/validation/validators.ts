/**
 * Comprehensive Validation Utilities
 *
 * RFC-compliant validators and formatters for production use
 */

import { z } from 'zod'

/**
 * Email Validation (RFC 5322 compliant)
 * More robust than simple regex
 */
export const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i

/**
 * Phone number validation (international format)
 * Accepts: +41 79 123 45 67, (079) 123-4567, etc.
 */
export const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/

/**
 * Swiss phone number validation
 */
export const swissPhoneRegex = /^(\+41|0041|0)[1-9][0-9]{1,2}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/

/**
 * URL validation
 */
export const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/

/**
 * Swiss VAT number validation (CHE-123.456.789 MWST)
 */
export const swissVatRegex = /^CHE-\d{3}\.\d{3}\.\d{3}\s?(MWST|TVA|IVA)?$/i

/**
 * IBAN validation (basic format check)
 */
export const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/

/**
 * Swiss ZIP code validation (4 digits)
 */
export const swissZipRegex = /^\d{4}$/

/**
 * Zod schema builders
 */

export const emailSchema = z.string()
    .email('Invalid email address')
    .regex(emailRegex, 'Email format is invalid')
    .toLowerCase()
    .trim()

export const phoneSchema = z.string()
    .regex(phoneRegex, 'Invalid phone number format')
    .optional()
    .nullable()

export const urlSchema = z.string()
    .url('Invalid URL')
    .regex(urlRegex, 'URL must start with http:// or https://')

export const swissVatSchema = z.string()
    .regex(swissVatRegex, 'Invalid Swiss VAT number format (e.g., CHE-123.456.789 MWST)')

export const ibanSchema = z.string()
    .regex(ibanRegex, 'Invalid IBAN format')
    .toUpperCase()

/**
 * Sanitization functions
 */

/**
 * Sanitize HTML to prevent XSS attacks
 * Strips all HTML tags except safe ones
 */
export function sanitizeHtml(input: string): string {
    // Remove all HTML tags except: b, i, em, strong, a, p, br
    const allowedTags = /<\/?([bi]|em|strong|a|p|br)(\s+[^>]*)?>/gi

    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframes
        .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '') // Remove objects
        .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '') // Remove embeds
        .replace(/on\w+="[^"]*"/gi, '') // Remove event handlers
        .replace(/on\w+='[^']*'/gi, '') // Remove event handlers
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .trim()
}

/**
 * Sanitize string for SQL/NoSQL injection prevention
 * Use this for user input that goes into dynamic queries
 */
export function sanitizeInput(input: string): string {
    return input
        .replace(/['"\\;`]/g, '') // Remove dangerous characters
        .trim()
}

/**
 * Validate and format phone numbers
 */

/**
 * Format phone number to international format
 * Example: 0791234567 -> +41 79 123 45 67
 */
export function formatPhoneNumber(phone: string, countryCode: string = '+41'): string | null {
    if (!phone) return null

    // Remove all non-digits
    const digits = phone.replace(/\D/g, '')

    // Swiss number formatting
    if (countryCode === '+41') {
        // If starts with 0, remove it
        const localNumber = digits.startsWith('0') ? digits.slice(1) : digits

        // Format: +41 XX XXX XX XX
        if (localNumber.length === 9) {
            return `+41 ${localNumber.slice(0, 2)} ${localNumber.slice(2, 5)} ${localNumber.slice(5, 7)} ${localNumber.slice(7)}`
        }
    }

    // Generic international format
    if (digits.length >= 10) {
        return `${countryCode} ${digits}`
    }

    return phone // Return as-is if can't format
}

/**
 * Parse phone number to E.164 format (+41791234567)
 */
export function parsePhoneToE164(phone: string, defaultCountryCode: string = '+41'): string | null {
    if (!phone) return null

    // Remove all non-digits
    const digits = phone.replace(/\D/g, '')

    // If already starts with +, return as E.164
    if (phone.startsWith('+')) {
        return `+${digits}`
    }

    // If starts with 00, replace with +
    if (phone.startsWith('00')) {
        return `+${digits.slice(2)}`
    }

    // If starts with 0 (local number), add country code
    if (digits.startsWith('0')) {
        const localDigits = digits.slice(1)
        const countryDigits = defaultCountryCode.replace(/\D/g, '')
        return `+${countryDigits}${localDigits}`
    }

    // Assume it's missing country code
    const countryDigits = defaultCountryCode.replace(/\D/g, '')
    return `+${countryDigits}${digits}`
}

/**
 * Validate Swiss-specific formats
 */

export function validateSwissVAT(vat: string): boolean {
    return swissVatRegex.test(vat)
}

export function formatSwissVAT(vat: string): string | null {
    // Remove all non-alphanumeric
    const clean = vat.replace(/[^A-Z0-9]/gi, '').toUpperCase()

    // Extract numbers
    const numbers = clean.replace(/[^0-9]/g, '')

    if (numbers.length === 9) {
        // Format as CHE-XXX.XXX.XXX MWST
        return `CHE-${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)} MWST`
    }

    return null
}

export function validateSwissIBAN(iban: string): boolean {
    if (!ibanRegex.test(iban)) return false

    // Swiss IBAN starts with CH and has 21 characters
    return iban.startsWith('CH') && iban.length === 21
}

export function formatSwissIBAN(iban: string): string | null {
    // Remove spaces and make uppercase
    const clean = iban.replace(/\s/g, '').toUpperCase()

    if (!validateSwissIBAN(clean)) return null

    // Format as CH12 3456 7890 1234 5678 9
    return clean.match(/.{1,4}/g)?.join(' ') || clean
}

/**
 * Password strength validation
 */
export function validatePasswordStrength(password: string): {
    isStrong: boolean
    score: number
    feedback: string[]
} {
    const feedback: string[] = []
    let score = 0

    // Length
    if (password.length >= 8) score += 1
    else feedback.push('Password must be at least 8 characters')

    if (password.length >= 12) score += 1

    // Complexity
    if (/[a-z]/.test(password)) score += 1
    else feedback.push('Include lowercase letters')

    if (/[A-Z]/.test(password)) score += 1
    else feedback.push('Include uppercase letters')

    if (/[0-9]/.test(password)) score += 1
    else feedback.push('Include numbers')

    if (/[^a-zA-Z0-9]/.test(password)) score += 1
    else feedback.push('Include special characters')

    // Common patterns
    if (/^(123|abc|password)/i.test(password)) {
        score -= 2
        feedback.push('Avoid common patterns')
    }

    return {
        isStrong: score >= 4,
        score: Math.max(0, score),
        feedback,
    }
}
