'use client'

import { useState, useCallback } from 'react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      const trimmed = email.trim()
      if (!trimmed) {
        setErrorMessage('Please enter your email address.')
        setStatus('error')
        return
      }
      if (!EMAIL_REGEX.test(trimmed)) {
        setErrorMessage('Please enter a valid email address.')
        setStatus('error')
        return
      }

      setStatus('submitting')
      setErrorMessage('')

      // Simulate API call — replace with real endpoint in production
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200))
        setStatus('success')
      } catch {
        setErrorMessage('Something went wrong. Please try again.')
        setStatus('error')
      }
    },
    [email]
  )

  if (status === 'success') {
    return (
      <div
        className="rounded-xl border border-warm-400/20 bg-warm-400/[0.04] px-6 py-5 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-warm-200 font-medium mb-1">You&apos;re on the list</p>
        <p className="text-neutral-400 text-sm">
          We&apos;ll reach out when early access is ready.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="email-input" className="sr-only">
          Email address
        </label>
        <input
          id="email-input"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') {
              setStatus('idle')
              setErrorMessage('')
            }
          }}
          disabled={status === 'submitting'}
          aria-invalid={status === 'error' ? 'true' : undefined}
          aria-describedby={status === 'error' ? 'email-error' : undefined}
          className="flex-1 px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-warm-400/50 focus-visible:ring-2 focus-visible:ring-warm-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed aria-[invalid=true]:border-red-400/50"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-6 py-3 bg-warm-400 text-[#0a0a0a] font-medium rounded-lg hover:bg-warm-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] transition-all duration-200 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-warm-400"
        >
          {status === 'submitting' ? (
            <span className="inline-flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="60"
                  strokeDashoffset="20"
                  strokeLinecap="round"
                />
              </svg>
              Joining…
            </span>
          ) : (
            'Get early access'
          )}
        </button>
      </div>
      {status === 'error' && errorMessage && (
        <p id="email-error" className="text-red-400 text-sm text-left" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  )
}
