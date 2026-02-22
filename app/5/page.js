'use client'
import { useEffect, useRef, useState } from 'react'

const blocks = [
  { lines: ["When's the last time you forgot something important?"], style: 'text-2xl sm:text-4xl text-neutral-300 font-light' },
  { lines: ["Not something huge. You'd remember that."], style: 'text-lg sm:text-xl text-neutral-500' },
  { lines: ["Something small.", "Something that mattered to someone."], style: 'text-lg sm:text-xl text-neutral-500' },
  { lines: ["Your friend mentioned they had a job interview today.", "Your partner asked you to grab milk.", "You said you'd call your mum back."], style: 'text-neutral-500' },
  { lines: ["All of it was in your notifications.", "You just... didn't connect the dots."], style: 'text-neutral-600 text-sm' },
  { lines: ["Your phone already knows everything."], style: 'text-xl sm:text-2xl text-neutral-300 font-light' },
  { lines: ["It just doesn't care."], style: 'text-xl sm:text-2xl text-neutral-300 font-light' },
  { lines: ["What if it did?"], style: 'text-2xl sm:text-3xl text-neutral-200 font-light' },
  { lines: ["It's not a chatbot.", "It's not an assistant you have to talk to.", "It's not another app demanding your attention."], style: 'text-neutral-600' },
  { lines: ["It's a quiet presence that pays attention", "so you don't have to."], style: 'text-neutral-400' },
  { type: 'reveal' },
]

function Block({ block, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  if (block.type === 'reveal') {
    return (
      <div ref={ref} className="min-h-[60vh] flex items-center justify-center px-6">
        <div className={`text-center space-y-4 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
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
    )
  }

  return (
    <div ref={ref} className="min-h-[50vh] flex items-center justify-center px-6">
      <div className={`text-center max-w-lg space-y-2 ${block.style}`}>
        {block.lines.map((line, i) => (
          <p
            key={i}
            className={`transition-all ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDuration: `${700 + i * 200}ms`, transitionDelay: `${i * 400}ms` }}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function AntiLandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {blocks.map((block, i) => (
        <Block key={i} block={block} index={i} />
      ))}
      <div className="h-[15vh]" />
    </div>
  )
}
