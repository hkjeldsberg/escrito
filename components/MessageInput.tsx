'use client'

import { useState, KeyboardEvent, useRef, useEffect } from 'react'

interface Props {
  onSend: (message: string) => void
  disabled?: boolean
}

export default function MessageInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!disabled && textareaRef.current) textareaRef.current.focus()
  }, [disabled])

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  function submit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  function handleInput() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }

  return (
    <div className="px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex items-end gap-3 bg-purple-700/40 border border-purple-600/30 rounded-xl px-4 py-3">
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => { setValue(e.target.value); handleInput() }}
          onKeyDown={handleKeyDown}
          placeholder="Start typing for free..."
          disabled={disabled}
          className="flex-1 bg-transparent resize-none text-base sm:text-sm text-white placeholder-white/30 focus:outline-none leading-relaxed py-0.5 max-h-40"
        />
        <button
          onClick={submit}
          disabled={!value.trim() || disabled}
          className="shrink-0 mb-0.5 w-8 h-8 flex items-center justify-center rounded-lg bg-pink-500 hover:bg-pink-600 disabled:opacity-30 transition-colors text-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
