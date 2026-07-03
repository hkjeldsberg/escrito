'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError('Incorrect password.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-purple-800 flex items-center justify-center">
      {/* Top accent bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-pink-500" />

      <div className="w-full max-w-sm px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Where <span className="font-display italic text-pink-500">Spanish</span> and practice meet
          </h1>
          <p className="mt-3 text-sm text-white/40">Enter your password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-purple-700/40 border border-purple-600/30 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/60 text-sm"
            autoFocus
          />
          {error && <p className="text-pink-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-40 text-white rounded-xl px-4 py-3 text-sm font-semibold transition-colors"
          >
            {loading ? 'Checking...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}
