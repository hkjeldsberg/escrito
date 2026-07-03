'use client'

import { useState, useEffect, FormEvent } from 'react'
import { Scenario } from '@/lib/types'

interface Props {
  onSelect: (scenario: Scenario) => void
}

export default function ScenarioSelector({ onSelect }: Props) {
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [loading, setLoading] = useState(true)
  const [custom, setCustom] = useState('')

  useEffect(() => {
    fetch('/api/scenarios')
      .then((r) => r.json())
      .then((data) => { setScenarios(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  function handleCustom(e: FormEvent) {
    e.preventDefault()
    if (!custom.trim()) return
    onSelect({ title: custom.trim(), description: custom.trim() })
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 max-w-2xl mx-auto w-full">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white leading-tight">
          Where <span className="font-display italic text-pink-500">Spanish</span> and practice meet
        </h2>
        <p className="mt-2 text-sm text-white/50">Choose a scenario to get started</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 w-full mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-purple-700/30 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 w-full mb-6">
          {scenarios.map((s, i) => (
            <button
              key={i}
              onClick={() => onSelect(s)}
              className="text-left p-4 rounded-xl border border-purple-600/30 bg-purple-700/20 hover:bg-purple-700/40 hover:border-pink-500/30 transition-all"
            >
              <p className="text-sm font-semibold text-white mb-1">{s.title}</p>
              <p className="text-xs text-white/50 leading-relaxed">{s.description}</p>
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleCustom} className="flex gap-2 w-full">
        <input
          type="text"
          placeholder="Or describe your own topic..."
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          className="flex-1 bg-purple-700/30 border border-purple-600/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50"
        />
        <button
          type="submit"
          disabled={!custom.trim()}
          className="bg-pink-500 hover:bg-pink-600 disabled:opacity-40 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors"
        >
          Start
        </button>
      </form>
    </div>
  )
}
