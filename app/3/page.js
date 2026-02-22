'use client'
import { useEffect, useRef, useState } from 'react'

const lines = [
  { text: 'sotto voce', style: 'italic text-neutral-400 text-sm tracking-[0.3em]' },
  { text: '', spacer: true },
  { text: '', spacer: true },
  { text: 'the quiet voice', style: 'text-neutral-300 text-2xl sm:text-3xl font-light' },
  { text: '', spacer: true },
  { text: '', spacer: true },
  { text: '', spacer: true },
  { text: 'your phone sees everything.', style: 'text-neutral-500 text-lg' },
  { text: '', spacer: true },
  { text: 'messages from people you love.', style: 'text-neutral-500 text-lg' },
  { text: 'calendar reminders you\'ll forget.', style: 'text-neutral-500 text-lg' },
  { text: 'the small things that slip through.', style: 'text-neutral-500 text-lg' },
  { text: '', spacer: true },
  { text: '', spacer: true },
  { text: '', spacer: true },
  { text: 'what if it paid attention?', style: 'text-neutral-300 text-xl sm:text-2xl font-light' },
  { text: '', spacer: true },
  { text: '', spacer: true },
  { text: '', spacer: true },
  { text: '', spacer: true },
  { text: 'not loudly.', style: 'text-neutral-500' },
  { text: '', spacer: true },
  { text: 'not constantly.', style: 'text-neutral-500' },
  { text: '', spacer: true },
  { text: 'just enough.', style: 'text-neutral-400 text-lg' },
  { text: '', spacer: true },
  { text: '', spacer: true },
  { text: '', spacer: true },
  { text: '', spacer: true },
  { text: '', spacer: true },
  { text: 'sotto', style: 'text-neutral-300 text-xl tracking-wider' },
  { text: '', spacer: true },
  { text: 'a presence, not a product.', style: 'text-neutral-500 text-sm' },
  { text: '', spacer: true },
  { text: '', spacer: true },
  { text: '', spacer: true },
  { text: '', spacer: true },
]

export default function QuietPage() {
  const [visible, setVisible] = useState(new Set())
  const refs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx)
            setVisible(prev => new Set([...prev, idx]))
          }
        })
      },
      { threshold: 0.5 }
    )

    refs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-md mx-auto px-6">
        {/* Empty space to start */}
        <div className="h-[60vh]" />

        <div className="space-y-0">
          {lines.map((line, i) => (
            <div
              key={i}
              ref={el => refs.current[i] = el}
              data-idx={i}
              className="text-center"
              style={{
                minHeight: line.spacer ? '8vh' : 'auto',
                padding: line.spacer ? 0 : '2vh 0',
              }}
            >
              {!line.spacer && (
                <p
                  className={`transition-all duration-[2000ms] ${line.style}`}
                  style={{
                    opacity: visible.has(i) ? 1 : 0,
                    transform: visible.has(i) ? 'none' : 'translateY(8px)',
                  }}
                >
                  {line.text}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* CTA — barely there */}
        <div className="h-[40vh] flex items-center justify-center">
          <a
            href="/#beta"
            className="text-neutral-600 text-xs tracking-[0.2em] hover:text-neutral-400 transition-colors duration-1000"
          >
            join the quiet →
          </a>
        </div>

        <div className="h-[30vh]" />
      </div>
    </div>
  )
}
