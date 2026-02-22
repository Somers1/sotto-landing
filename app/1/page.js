'use client'
import { useState, useEffect, useRef } from 'react'

const messages = [
  { type: 'system', text: 'Sotto is listening...', delay: 800 },
  { type: 'notif', app: 'Messages', text: 'Mom: Can you pick up Dad from the airport tomorrow? Flight lands at 3pm', delay: 1500 },
  { type: 'sotto', text: 'Noted — your dad arrives tomorrow at 3pm. I\'ll remind you to leave by 2:15 based on traffic.', delay: 2500 },
  { type: 'notif', app: 'Gmail', text: 'RE: Quarterly Review — Meeting moved to 2pm tomorrow', delay: 2000 },
  { type: 'sotto', text: 'Heads up — your meeting tomorrow conflicts with airport pickup. Want me to draft a message to Mom about the overlap?', delay: 3000 },
  { type: 'user', text: 'Yeah, can you suggest something?', delay: 1500 },
  { type: 'sotto', text: '"Hey Mom, my 2pm meeting just got moved. Can Dad grab an Uber or should I see if Sarah can pick him up? Sorry about the last minute change 💛"', delay: 2000 },
  { type: 'user', text: 'Perfect, send that', delay: 1000 },
  { type: 'system', text: '✓ Message sent to Mom', delay: 800 },
  { type: 'spacer', delay: 1500 },
  { type: 'notif', app: 'Calendar', text: 'Sarah\'s Birthday — Next Tuesday', delay: 1500 },
  { type: 'notif', app: 'Amazon', text: 'Your order has shipped — arrives Wednesday', delay: 1200 },
  { type: 'sotto', text: 'Sarah\'s birthday is Tuesday but her gift arrives Wednesday. Want me to find a nearby store with something similar, just in case?', delay: 2500 },
  { type: 'user', text: 'Oh shit, good catch. Yeah please', delay: 1200 },
  { type: 'sotto', text: 'Found 3 options within 10 min drive. I\'ll save them for you.', delay: 1800 },
  { type: 'spacer', delay: 2000 },
  { type: 'notif', app: 'Bank', text: 'Direct deposit: $3,240.00 received', delay: 1200 },
  { type: 'sotto', text: 'Payday. Rent ($1,850) is due in 3 days. After that and your usual spending, you\'ll have about $800 left this month. A bit tighter than usual.', delay: 2800 },
  { type: 'spacer', delay: 2000 },
  { type: 'system', text: 'Evening — 9:47pm', delay: 1000 },
  { type: 'sotto', text: 'Quick recap of your day:\n• Meeting moved to 2pm ✓\n• Mom\'s handling airport pickup with Sarah\n• Sarah\'s birthday gift might be late — backup plan saved\n• You\'re $800 after rent this month\n\nNothing else needs your attention. Goodnight.', delay: 3000 },
  { type: 'spacer', delay: 2000 },
  { type: 'cta', delay: 1000 },
]

function Message({ msg, visible }) {
  if (!visible) return null

  if (msg.type === 'spacer') return <div className="h-8" />

  if (msg.type === 'cta') return (
    <div className="flex flex-col items-center py-12 animate-msg">
      <p className="text-neutral-500 text-sm mb-2">This is Sotto.</p>
      <p className="text-neutral-400 text-lg mb-6">The quiet voice on your phone.</p>
      <a href="/#beta" className="px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors">
        Join the beta
      </a>
    </div>
  )

  if (msg.type === 'system') return (
    <div className="flex justify-center animate-msg">
      <span className="text-xs text-neutral-500 bg-neutral-800/50 px-3 py-1 rounded-full">{msg.text}</span>
    </div>
  )

  if (msg.type === 'notif') return (
    <div className="animate-msg max-w-[85%]">
      <div className="bg-neutral-800/60 border border-neutral-700/50 rounded-2xl px-4 py-3">
        <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">{msg.app}</span>
        <p className="text-sm text-neutral-300 mt-1">{msg.text}</p>
      </div>
    </div>
  )

  if (msg.type === 'sotto') return (
    <div className="animate-msg max-w-[85%]">
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 rounded-full bg-amber-900/30 border border-amber-800/40 flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-amber-400 text-[10px]">S</span>
        </div>
        <div className="bg-amber-950/20 border border-amber-900/20 rounded-2xl rounded-tl-md px-4 py-3">
          <p className="text-sm text-amber-100/90 whitespace-pre-line">{msg.text}</p>
        </div>
      </div>
    </div>
  )

  if (msg.type === 'user') return (
    <div className="animate-msg flex justify-end">
      <div className="max-w-[85%] bg-blue-600/90 rounded-2xl rounded-tr-md px-4 py-3">
        <p className="text-sm text-white">{msg.text}</p>
      </div>
    </div>
  )

  return null
}

export default function ConversationPage() {
  const [visibleCount, setVisibleCount] = useState(0)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (visibleCount >= messages.length) return
    const timer = setTimeout(() => {
      setVisibleCount(c => c + 1)
    }, messages[visibleCount]?.delay || 1000)
    return () => clearTimeout(timer)
  }, [visibleCount])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleCount])

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Phone frame */}
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Status bar */}
        <div className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-neutral-800/50 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500/80 animate-pulse" />
            <span className="text-xs text-neutral-500 font-medium tracking-wide">SOTTO</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <Message key={i} msg={msg} visible={i < visibleCount} />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <style jsx>{`
        .animate-msg {
          animation: msgIn 0.4s ease-out forwards;
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
