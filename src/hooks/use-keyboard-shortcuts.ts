/**
 * Keyboard Shortcuts Hook
 *
 * Provides global keyboard shortcuts for power users
 */

import { useEffect } from 'react'

export interface KeyboardShortcut {
    key: string
    ctrl?: boolean
    shift?: boolean
    alt?: boolean
    meta?: boolean // Cmd on Mac, Windows key on Windows
    callback: () => void
    description?: string
}

/**
 * Register global keyboard shortcuts
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[], enabled = true) {
    useEffect(() => {
        if (!enabled) return

        const handleKeyDown = (event: KeyboardEvent) => {
            for (const shortcut of shortcuts) {
                const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase()
                const ctrlMatches = shortcut.ctrl ? event.ctrlKey : !event.ctrlKey
                const shiftMatches = shortcut.shift ? event.shiftKey : !event.shiftKey
                const altMatches = shortcut.alt ? event.altKey : !event.altKey
                const metaMatches = shortcut.meta ? event.metaKey : !event.metaKey

                if (keyMatches && ctrlMatches && shiftMatches && altMatches && metaMatches) {
                    event.preventDefault()
                    shortcut.callback()
                    break
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [shortcuts, enabled])
}

/**
 * Hook for command palette (Cmd+K / Ctrl+K)
 */
export function useCommandPalette(onOpen: () => void, enabled = true) {
    useKeyboardShortcuts(
        [
            {
                key: 'k',
                meta: true, // Cmd+K on Mac
                callback: onOpen,
                description: 'Open command palette',
            },
            {
                key: 'k',
                ctrl: true, // Ctrl+K on Windows/Linux
                callback: onOpen,
                description: 'Open command palette',
            },
        ],
        enabled
    )
}

/**
 * Common keyboard shortcuts for the app
 */
export const KEYBOARD_SHORTCUTS = {
    // Navigation
    DASHBOARD: { key: 'd', meta: true, shift: true, description: 'Go to Dashboard' },
    CONTACTS: { key: 'c', meta: true, shift: true, description: 'Go to Contacts' },
    PROJECTS: { key: 'p', meta: true, shift: true, description: 'Go to Projects' },
    TASKS: { key: 't', meta: true, shift: true, description: 'Go to Tasks' },
    INVOICES: { key: 'i', meta: true, shift: true, description: 'Go to Invoices' },
    CHAT: { key: 'm', meta: true, shift: true, description: 'Go to AI Chat' },

    // Actions
    NEW: { key: 'n', meta: true, description: 'Create new item' },
    SAVE: { key: 's', meta: true, description: 'Save current item' },
    SEARCH: { key: 'f', meta: true, description: 'Focus search' },
    COMMAND_PALETTE: { key: 'k', meta: true, description: 'Open command palette' },

    // UI
    ESCAPE: { key: 'Escape', description: 'Close modal/dialog' },
    REFRESH: { key: 'r', meta: true, description: 'Refresh current view' },
}
