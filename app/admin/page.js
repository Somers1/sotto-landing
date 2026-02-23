'use client'

import { useState } from 'react'
import { getBetaSignups } from '../actions'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [signups, setSignups] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await getBetaSignups(password)
    setLoading(false)
    if (result.error) return setError(result.error)
    setSignups(result.signups)
  }

  async function refresh() {
    const result = await getBetaSignups(password)
    if (!result.error) setSignups(result.signups)
  }

  if (!signups) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="text-neutral-200 text-xl font-light text-center">Sotto Admin</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-neutral-800 text-neutral-200 rounded-lg hover:bg-neutral-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'View signups'}
          </button>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-neutral-200">Beta Signups</h1>
            <p className="text-neutral-500 text-sm mt-1">{signups.length} total</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={refresh}
              className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-700 transition-colors text-sm"
            >
              Refresh
            </button>
            <button
              onClick={() => {
                const csv = 'email,signed_up\n' + signups.map(s => `${s.email},${s.created_at}`).join('\n')
                const blob = new Blob([csv], { type: 'text/csv' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url; a.download = 'sotto-beta-signups.csv'; a.click()
              }}
              className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-700 transition-colors text-sm"
            >
              Export CSV
            </button>
          </div>
        </div>

        {signups.length === 0 ? (
          <p className="text-neutral-500 text-center py-12">No signups yet</p>
        ) : (
          <div className="border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-neutral-500 text-xs uppercase tracking-wider font-semibold">#</th>
                  <th className="text-left px-4 py-3 text-neutral-500 text-xs uppercase tracking-wider font-semibold">Email</th>
                  <th className="text-left px-4 py-3 text-neutral-500 text-xs uppercase tracking-wider font-semibold">Signed up</th>
                </tr>
              </thead>
              <tbody>
                {signups.map((s, i) => (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-neutral-600 text-sm">{signups.length - i}</td>
                    <td className="px-4 py-3 text-neutral-200 text-sm font-mono">{s.email}</td>
                    <td className="px-4 py-3 text-neutral-500 text-sm">
                      {new Date(s.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
