'use client'

import { useEffect, useCallback } from 'react'

interface ShortcutHandlers {
    onSearch?: () => void
    onEscape?: () => void
}

export const useKeyboardShortcuts = ({ onSearch, onEscape }: ShortcutHandlers) => {
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        // Don't trigger shortcuts when typing in input fields
        const target = event.target as HTMLElement
        const isInputField = target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.isContentEditable

        if (event.key === '/' && !isInputField) {
            event.preventDefault()
            onSearch?.()
        }

        if (event.key === 'Escape') {
            onEscape?.()
        }
    }, [onSearch, onEscape])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])
}
