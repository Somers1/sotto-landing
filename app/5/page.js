'use client'
import { useEffect, useRef, useState } from 'react'

const sections = [
  {
    id: 'q1',
    content: (
      <div className="min-h-screen flex items-center justify-center px-6">
        <p className="text-2xl sm:text-4xl text-neutral-300 font-light text-center leading-relaxed max-w-lg">
          When's the last time you forgot something important?
        </p>
      </div>
    ),
  },
  {
    id: 'q2',
    content: (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <p className="text-lg sm:text-xl text-neutral-500 text-center max-w-md leading-relaxed">
          Not something huge. You'd remember that.<br /><br />
          Something small. Something that mattered to someone.
        </p>
      </div>
    ),
  },
  {
    id: 'examples',
    content: (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="max-w-sm space-y-6 text-neutral-500">
          <p>Your friend mentioned they had a job interview today.</p>
          <p>Your partner asked you to grab milk.</p>
          <p>You said you'd call your mum back.</p>
          <p className="text-neutral-600 text-sm pt-4">
            All of it was in your notifications. You just... didn't connect the dots.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'phone',
    content: (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-neutral-600 text-sm tracking-wider uppercase mb-6">the thing is</p>
          <p className="text-xl sm:text-2xl text-neutral-300 font-light max-w-md leading-relaxed">
            Your phone already knows everything.<br />
            It just doesn't care.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'what-if',
    content: (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-2xl sm:text-3xl text-neutral-200 font-light leading-relaxed mb-8">
            What if it did?
          </p>
          <div className="space-y-4 text-neutral-500 text-left max-w-sm mx-auto">
            <p>What if your phone noticed the conflict between your meeting and the airport pickup?</p>
            <p>What if it reminded you about the lunch order before it closed?</p>
            <p>What if it told you your friend's birthday gift would arrive a day late — and had a backup plan?</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'not',
    content: (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="max-w-sm space-y-3">
          <p className="text-neutral-600">It's not a chatbot.</p>
          <p className="text-neutral-600">It's not an assistant you have to talk to.</p>
          <p className="text-neutral-600">It's not another app demanding your attention.</p>
          <p className="text-neutral-400 pt-4">It's a quiet presence that pays attention so you don't have to.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'name',
    content: (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-3xl sm:text-5xl text-neutral-200 font-light tracking-tight mb-4">
            Sotto
          </p>
          <p className="text-neutral-500 text-sm italic">
            sotto voce — "in a quiet voice"
          </p>
          <p className="text-neutral-500 text-sm mt-6 max-w-xs mx-auto">
            An AI that lives on your phone, reads your notifications, 
            and speaks up only when it has something worth saying.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'end',
    content: (
      <div className="min-h-[50vh] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-neutral-500 mb-8">
            You've read this far. That probably means<br />
            you've forgotten something this week.
          </p>
          <a
            href="/#beta"
            className="text-neutral-300 border border-neutral-700 px-6 py-3 rounded-full text-sm hover:bg-neutral-800 transition-colors"
          >
            Let Sotto remember for you
          </a>
          <p className="text-neutral-700 text-xs mt-8">
            Android beta. Waitlist open.
          </p>
        </div>
      </div>
    ),
  },
]

function Section({ children, id }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVis(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {children}
    </div>
  )
}

export default function AntiLandingPage() {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    // After 3 seconds, begin a very slow auto-scroll to hint there's more
    const timer = setTimeout(() => {
      setStarted(true)
      let scrollY = 0
      const drift = setInterval(() => {
        scrollY += 0.5
        window.scrollTo({ top: scrollY, behavior: 'auto' })
        // Stop once user takes over or we've nudged enough
        if (window.scrollY > 80 || window.scrollY < scrollY - 10) {
          clearInterval(drift)
        }
      }, 16)
      // Also stop on any user interaction
      const stop = () => { clearInterval(drift); cleanup() }
      const cleanup = () => {
        window.removeEventListener('wheel', stop)
        window.removeEventListener('touchstart', stop)
        window.removeEventListener('keydown', stop)
      }
      window.addEventListener('wheel', stop, { once: true })
      window.addEventListener('touchstart', stop, { once: true })
      window.addEventListener('keydown', stop, { once: true })
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {sections.map((s) => (
        <Section key={s.id} id={s.id}>{s.content}</Section>
      ))}
      <div className="h-[20vh]" />
    </div>
  )
}
