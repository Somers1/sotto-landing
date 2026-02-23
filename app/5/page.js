'use client'
import { useEffect, useState } from 'react'

const FADE = {
  fast: 300,
  normal: 1000,
  slow: 1200,
}

const rows = [
  {
    style: 'text-xl sm:text-2xl text-neutral-300 font-light',
    chunks: [
      { text: "When's the last time you forgot something important?", pause: 1000, fade: FADE.normal },
    ],
  },
  {
    style: 'text-sm sm:text-base text-neutral-500',
    chunks: [
      { text: "Not something huge.", pause: 1500, fade: FADE.normal },
      { text: "You'd remember that.", pause: 1000, fade: FADE.normal },
    ],
  },
  {
    style: 'text-sm sm:text-base text-neutral-500',
    chunks: [{ text: "Something small.", pause: 1000, fade: FADE.normal }],
  },
  {
    style: 'text-sm sm:text-base text-neutral-500',
    chunks: [{ text: "Something that mattered to someone.", pause: 1000, fade: FADE.slow }],
  },
  { spacer: 'h-3', pause: 1000 },
  {
    style: 'text-lg sm:text-xl text-neutral-300 font-light',
    chunks: [{ text: "Your phone already knows everything.", pause: 1000, fade: FADE.normal }],
  },
  { spacer: 'h-0', pause: 1000 },
  {
    style: 'text-lg sm:text-xl text-neutral-300 font-light',
    chunks: [{ text: "It just doesn't care.", pause: 1000, fade: FADE.normal }],
  },
  { spacer: 'h-3', pause: 1000 },
  {
    style: 'text-xl sm:text-2xl text-neutral-200 font-light',
    chunks: [{ text: "What if it did?", pause: 1000, fade: FADE.slow }],
  },
  { spacer: 'h-3', pause: 1000 },
  {
    style: 'text-neutral-400',
    chunks: [{ text: "A quiet presence that pays attention", pause: 1000, fade: FADE.normal }],
  },
  {
    style: 'text-neutral-400',
    chunks: [{ text: "so you don't have to.", pause: 1000, fade: FADE.normal }],
  },
  { cta: true, pause: 1000, fade: FADE.slow },
]

const sequence = []
let chunkCount = 0
rows.forEach((row, rowIdx) => {
  if (row.spacer) {
    sequence.push({ type: 'spacer', rowIdx, pause: row.pause })
  } else if (row.cta) {
    sequence.push({ type: 'cta', pause: row.pause, fade: row.fade })
  } else {
    row.chunks.forEach((chunk) => {
      sequence.push({ type: 'chunk', rowIdx, text: chunk.text, pause: chunk.pause, fade: chunk.fade, idx: chunkCount++ })
    })
  }
})

export default function AntiLandingPage() {
  const [step, setStep] = useState(0)
  const [ctaVisible, setCtaVisible] = useState(false)

  useEffect(() => {
    if (step >= sequence.length) return
    const entry = sequence[step]
    if (entry.type === 'cta') {
      const t = setTimeout(() => { setCtaVisible(true); setStep(s => s + 1) }, entry.pause)
      return () => clearTimeout(t)
    }
    const timer = setTimeout(() => setStep(s => s + 1), entry.pause)
    return () => clearTimeout(timer)
  }, [step])

  const revealed = sequence.slice(0, step).filter(e => e.type === 'chunk').length
  const ctaEntry = sequence.find(e => e.type === 'cta')

  return (
    <div className="h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="max-w-lg text-center space-y-2">
        {rows.map((row, rowIdx) => {
          if (row.spacer || row.cta) return row.spacer ? <div key={rowIdx} className={row.spacer} /> : null
          return (
            <p key={rowIdx} className={row.style}>
              {row.chunks.map((chunk, i) => {
                const global = sequence.find(e => e.type === 'chunk' && e.rowIdx === rowIdx && e.text === chunk.text)
                const visible = global && global.idx < revealed
                return (
                  <span
                    key={i}
                    className={`transition-opacity ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDuration: `${chunk.fade}ms` }}
                  >
                    {i > 0 && ' '}{chunk.text}
                  </span>
                )
              })}
            </p>
          )
        })}
      </div>

      <div
        className={`mt-10 text-center transition-opacity ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ transitionDuration: `${ctaEntry?.fade ?? 1000}ms` }}
      >
        <p className="text-2xl sm:text-4xl text-neutral-200 font-light tracking-tight">Sotto</p>
        <p className="text-neutral-500 text-xs sm:text-sm max-w-xs mx-auto mt-3">
          An AI that lives on your phone, reads your notifications,
          and speaks up only when it has something worth saying.
        </p>
        <div className="pt-5">
          <a href="/#beta" className="text-neutral-300 border border-neutral-700 px-5 py-2.5 rounded-full text-sm hover:bg-neutral-800 transition-colors">
            Let Sotto remember for you
          </a>
        </div>
        <p className="text-neutral-700 text-xs mt-4">Android beta. Waitlist open.</p>
      </div>
    </div>
  )
}
