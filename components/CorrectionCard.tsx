'use client'

import { Corrections } from '@/lib/types'

interface Props {
  corrections: Corrections
}

export default function CorrectionCard({ corrections }: Props) {
  if (!corrections.hasErrors && corrections.alternatives.length === 0) return null

  return (
    <div className="mb-3 max-w-[85%] bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <span className="bg-purple-800 text-white text-[10px] font-bold tracking-widest uppercase rounded px-2 py-0.5">
          Feedback
        </span>
        {corrections.errors.map((err, i) => (
          <span key={i} className="bg-pink-500/10 text-pink-500 text-xs font-medium rounded-full px-3 py-0.5 border border-pink-500/20">
            {err.original} → {err.correction}
          </span>
        ))}
        {corrections.errors[0] && (
          <span className="text-xs text-purple-800/70">
            — {corrections.errors[0].explanation}
          </span>
        )}
      </div>

      {corrections.errors.length > 1 && corrections.errors.slice(1).map((err, i) => (
        <div key={i} className="flex items-center gap-2 flex-wrap mt-1">
          <span className="bg-pink-500/10 text-pink-500 text-xs font-medium rounded-full px-3 py-0.5 border border-pink-500/20">
            {err.original} → {err.correction}
          </span>
          <span className="text-xs text-purple-800/70">— {err.explanation}</span>
        </div>
      ))}

      {corrections.alternatives.length > 0 && (
        <div className="mt-2 pt-2 border-t border-purple-100">
          <p className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider mb-1">Also natural</p>
          <div className="flex flex-wrap gap-1.5">
            {corrections.alternatives.map((alt, i) => (
              <span key={i} className="text-xs text-purple-700 bg-purple-50 rounded-full px-2.5 py-0.5">
                {alt}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
