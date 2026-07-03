'use client'

import { useState } from 'react'
import { Corrections } from '@/lib/types'

interface Props {
  corrections: Corrections
}

export default function CorrectionCard({ corrections }: Props) {
  const [open, setOpen] = useState(false)

  if (!corrections.hasErrors && corrections.alternatives.length === 0) return null

  return (
    <div className="mb-2 max-w-[85%]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors"
      >
        <span className={`transition-transform ${open ? 'rotate-90' : ''}`}>▶</span>
        {corrections.hasErrors
          ? `${corrections.errors.length} correction${corrections.errors.length !== 1 ? 's' : ''}`
          : 'Tip'}
        {corrections.alternatives.length > 0 && !corrections.hasErrors ? '' : ''}
      </button>

      {open && (
        <div className="mt-2 border border-amber-900/50 bg-amber-950/20 rounded-lg p-3 text-xs space-y-3">
          {corrections.errors.map((err, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-start gap-2">
                <span className="text-red-400 shrink-0">✗</span>
                <span className="text-zinc-400 line-through">{err.original}</span>
              </div>
              <div className="flex items-start gap-2 pl-4">
                <span className="text-green-400 shrink-0">✓</span>
                <span className="text-zinc-200">{err.correction}</span>
              </div>
              <p className="pl-4 text-zinc-500 leading-relaxed">{err.explanation}</p>
            </div>
          ))}

          {corrections.alternatives.length > 0 && (
            <div>
              <p className="text-zinc-500 mb-1">Alternative phrasing:</p>
              <ul className="space-y-1">
                {corrections.alternatives.map((alt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 shrink-0">→</span>
                    <span className="text-zinc-300">{alt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
