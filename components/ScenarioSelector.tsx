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
      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold text-zinc-100">¿De qué quieres hablar?</h2>
        <p className="mt-2 text-sm text-zinc-500">Choose a scenario or describe your own</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 w-full mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-zinc-800/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 w-full mb-6">
          {scenarios.map((s, i) => (
            <button
              key={i}
              onClick={() => onSelect(s)}
              className="text-left p-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <p className="text-sm font-medium text-zinc-200 mb-1">{s.title}</p>
              <p className="text-xs text-zinc-500 leading-relaxed">{s.description}</p>
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
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
        />
        <button
          type="submit"
          disabled={!custom.trim()}
          className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
        >
          Start
        </button>
      </form>
    </div>
  )
}
