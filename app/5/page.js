'use client'
import { useEffect, useState, useRef } from 'react'

const lines = [
  { text: "When's the last time you forgot something important?", style: 'text-2xl sm:text-4xl text-neutral-300 font-light', delay: 1500 },
  { text: "Not something huge. You'd remember that.", style: 'text-lg sm:text-xl text-neutral-500', delay: 3500 },
  { text: "Something small. Something that mattered to someone.", style: 'text-lg sm:text-xl text-neutral-500', delay: 3000 },
  { text: "Your friend mentioned they had a job interview today.", style: 'text-neutral-500', delay: 3000 },
  { text: "Your partner asked you to grab milk.", style: 'text-neutral-500', delay: 2500 },
  { text: "You said you'd call your mum back.", style: 'text-neutral-500', delay: 2500 },
  { text: "All of it was in your notifications. You just... didn't connect the dots.", style: 'text-neutral-600 text-sm', delay: 3500 },
  { text: "the thing is", style: 'text-neutral-600 text-sm tracking-wider uppercase', delay: 2500 },
  { text: "Your phone already knows everything.", style: 'text-xl sm:text-2xl text-neutral-300 font-light', delay: 3000 },
  { text: "It just doesn't care.", style: 'text-xl sm:text-2xl text-neutral-300 font-light', delay: 3000 },
  { text: "What if it did?", style: 'text-2xl sm:text-3xl text-neutral-200 font-light', delay: 3500 },
  { text: "It's not a chatbot.", style: 'text-neutral-600', delay: 2000 },
  { text: "It's not an assistant you have to talk to.", style: 'text-neutral-600', delay: 2000 },
  { text: "It's not another app demanding your attention.", style: 'text-neutral-600', delay: 2000 },
  { text: "It's a quiet presence that pays attention so you don't have to.", style: 'text-neutral-400', delay: 3500 },
  { type: 'reveal' },
]

function Line({ text, style, visible }) {
  return (
    <p className={`transition-all duration-700 ease-out ${style} ${visible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
      {text}
    </p>
  )
}

export default function AntiLandingPage() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [paused, setPaused] = useState(false)
  const containerRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (paused || visibleCount >= lines.length) return

    const current = lines[visibleCount]
    if (current?.type === 'reveal') {
      setRevealed(true)
      return
    }

    timerRef.current = setTimeout(() => {
      setVisibleCount(c => c + 1)
    }, current?.delay || 2500)

    return () => clearTimeout(timerRef.current)
  }, [visibleCount, paused])

  // Scroll to keep latest line centered
  useEffect(() => {
    if (containerRef.current && visibleCount > 0) {
      const children = containerRef.current.children
      const latest = children[Math.min(visibleCount - 1, children.length - 1)]
      if (latest) {
        latest.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [visibleCount])

  // Pause auto-advance on user scroll, resume after 3s idle
  useEffect(() => {
    let resumeTimer
    const handleScroll = () => {
      setPaused(true)
      clearTimeout(resumeTimer)
      resumeTimer = setTimeout(() => setPaused(false), 3000)
    }
    window.addEventListener('wheel', handleScroll)
    window.addEventListener('touchmove', handleScroll)
    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
      clearTimeout(resumeTimer)
    }
  }, [])

  const displayLines = lines.filter(l => !l.type).slice(0, visibleCount)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <div ref={containerRef} className="flex-1 flex flex-col items-center justify-center px-6 py-20 space-y-6 max-w-lg mx-auto text-center">
        {displayLines.map((line, i) => (
          <Line key={i} text={line.text} style={line.style} visible={true} />
        ))}
      </div>

      {/* Final reveal */}
      <div className={`transition-all duration-1000 ${revealed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center space-y-4">
          <p className="text-3xl sm:text-5xl text-neutral-200 font-light tracking-tight">Sotto</p>
          <p className="text-neutral-500 text-sm italic">sotto voce — "in a quiet voice"</p>
          <p className="text-neutral-500 text-sm max-w-xs mx-auto mt-4">
            An AI that lives on your phone, reads your notifications,
            and speaks up only when it has something worth saying.
          </p>
          <div className="pt-8">
            <a href="/#beta" className="text-neutral-300 border border-neutral-700 px-6 py-3 rounded-full text-sm hover:bg-neutral-800 transition-colors">
              Let Sotto remember for you
            </a>
          </div>
          <p className="text-neutral-700 text-xs mt-6">Android beta. Waitlist open.</p>
        </div>
        <div className="h-[15vh]" />
      </div>
    </div>
  )
}
