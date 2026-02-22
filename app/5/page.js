'use client'
import { useEffect, useState, useRef } from 'react'

const lines = [
  { text: "When's the last time you forgot something important?", style: 'text-2xl sm:text-4xl text-neutral-300 font-light', pause: 2500 },
  { text: "Not something huge. You'd remember that.", style: 'text-lg sm:text-xl text-neutral-500', pause: 2000 },
  { text: "Something small.", style: 'text-lg sm:text-xl text-neutral-500', pause: 1200 },
  { text: "Something that mattered to someone.", style: 'text-lg sm:text-xl text-neutral-500', pause: 2200 },
  { text: "", style: 'h-4', pause: 800 },
  { text: "Your friend mentioned they had a job interview today.", style: 'text-neutral-500', pause: 2000 },
  { text: "Your partner asked you to grab milk.", style: 'text-neutral-500', pause: 1800 },
  { text: "You said you'd call your mum back.", style: 'text-neutral-500', pause: 2000 },
  { text: "", style: 'h-2', pause: 600 },
  { text: "All of it was in your notifications.", style: 'text-neutral-600 text-sm', pause: 1800 },
  { text: "You just... didn't connect the dots.", style: 'text-neutral-600 text-sm', pause: 2500 },
  { text: "", style: 'h-6', pause: 1000 },
  { text: "Your phone already knows everything.", style: 'text-xl sm:text-2xl text-neutral-300 font-light', pause: 2200 },
  { text: "It just doesn't care.", style: 'text-xl sm:text-2xl text-neutral-300 font-light', pause: 2800 },
  { text: "", style: 'h-6', pause: 800 },
  { text: "What if it did?", style: 'text-2xl sm:text-3xl text-neutral-200 font-light', pause: 3000 },
  { text: "", style: 'h-4', pause: 600 },
  { text: "It's not a chatbot.", style: 'text-neutral-600', pause: 1400 },
  { text: "It's not an assistant you have to talk to.", style: 'text-neutral-600', pause: 1600 },
  { text: "It's not another app demanding your attention.", style: 'text-neutral-600', pause: 2200 },
  { text: "", style: 'h-4', pause: 800 },
  { text: "It's a quiet presence that pays attention", style: 'text-neutral-400', pause: 1800 },
  { text: "so you don't have to.", style: 'text-neutral-400', pause: 3000 },
  { type: 'reveal' },
]

export default function AntiLandingPage() {
  const [count, setCount] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const bottomRef = useRef(null)
  const timerRef = useRef(null)

  // Auto-advance lines on a timer
  useEffect(() => {
    if (count >= lines.length) return
    const current = lines[count]
    if (current?.type === 'reveal') { setRevealed(true); return }

    timerRef.current = setTimeout(() => {
      setCount(c => c + 1)
    }, current.pause)

    return () => clearTimeout(timerRef.current)
  }, [count])

  // Keep latest line in view
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [count])

  // Scroll down = reveal everything instantly
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !skipped) {
        setSkipped(true)
        clearTimeout(timerRef.current)
        // Show all lines at once
        setCount(lines.length - 1)
        setRevealed(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [skipped])

  const visible = lines.slice(0, count).filter(l => !l.type)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-lg mx-auto px-6 pt-[40vh] pb-20 text-center space-y-3">
        {visible.map((line, i) => (
          line.text === ''
            ? <div key={i} className={line.style} />
            : <p key={i} className={`${line.style} animate-fade-in`}>{line.text}</p>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className={`transition-all duration-1000 ${revealed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center space-y-4">
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
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
