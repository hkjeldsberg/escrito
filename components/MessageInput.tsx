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
    if (!disabled && textareaRef.current) {
      textareaRef.current.focus()
    }
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
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  function handleInput() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }

  return (
    <div className="border-t border-zinc-800 bg-zinc-950 px-4 py-3">
      <div className="flex items-end gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2">
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => { setValue(e.target.value); handleInput() }}
          onKeyDown={handleKeyDown}
          placeholder="Type your Spanish response..."
          disabled={disabled}
          className="flex-1 bg-transparent resize-none text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none leading-relaxed py-1 max-h-40"
        />
        <button
          onClick={submit}
          disabled={!value.trim() || disabled}
          className="shrink-0 mb-1 w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-700 hover:bg-zinc-600 disabled:opacity-30 transition-colors text-zinc-300"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
      <p className="text-xs text-zinc-700 mt-1.5 pl-1">Enter to send · Shift+Enter for newline</p>
    </div>
  )
}
