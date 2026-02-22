'use client'
import { useEffect, useRef, useState } from 'react'

const timeline = [
  {
    time: '7:12 AM',
    period: 'morning',
    notifs: [
      { app: 'Alarm', text: 'Good morning' },
      { app: 'Gmail', text: '3 new emails overnight' },
      { app: 'Calendar', text: 'Team standup — 9:00 AM' },
    ],
    sotto: null,
  },
  {
    time: '7:34 AM',
    period: 'morning',
    notifs: [
      { app: 'Messages', text: 'Jess: Hey are we still on for dinner tonight? That new Thai place?' },
    ],
    sotto: null,
  },
  {
    time: '8:15 AM',
    period: 'morning',
    notifs: [
      { app: 'Gmail', text: 'From: Dr. Chen\'s Office — Appointment reminder for Thursday 2pm' },
    ],
    sotto: 'Your Thursday 2pm is already blocked for the client presentation. Want me to reschedule the dentist?',
  },
  {
    time: '9:45 AM',
    period: 'midday',
    notifs: [
      { app: 'Slack', text: '#general: Lunch order going in at 11:30 — reply with your order' },
    ],
    sotto: null,
  },
  {
    time: '11:22 AM',
    period: 'midday',
    notifs: [],
    sotto: 'Slack lunch order closes in 8 minutes. You haven\'t replied yet.',
  },
  {
    time: '1:15 PM',
    period: 'afternoon',
    notifs: [
      { app: 'Bank', text: 'Transaction: $47.50 at BWS' },
    ],
    sotto: 'You\'re having dinner with Jess tonight — is this wine for that? Nice.',
  },
  {
    time: '3:30 PM',
    period: 'afternoon',
    notifs: [
      { app: 'Calendar', text: 'Mom\'s birthday — 5 days away' },
      { app: 'Amazon', text: 'Item in your cart is now 20% off' },
    ],
    sotto: 'That cashmere scarf in your Amazon cart — it\'s for your mum, right? It\'s 20% off now and would arrive 2 days before her birthday.',
  },
  {
    time: '5:48 PM',
    period: 'evening',
    notifs: [
      { app: 'Maps', text: 'Usual traffic on route home — 22 min' },
    ],
    sotto: 'Dinner with Jess is at 7:30. Thai place is 15 min from your apartment. You\'ve got time to shower and change.',
  },
  {
    time: '9:47 PM',
    period: 'evening',
    notifs: [],
    sotto: null,
    summary: true,
  },
]

function TimelineEvent({ event, isVisible }) {
  const bgColor = {
    morning: 'from-amber-500/5',
    midday: 'from-orange-500/5',
    afternoon: 'from-rose-500/5',
    evening: 'from-indigo-500/5',
  }[event.period]

  return (
    <div
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className={`relative pl-12 pb-12`}>
        {/* Timeline dot and line */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center">
          <div className={`w-3 h-3 rounded-full border-2 ${
            event.sotto ? 'border-amber-500 bg-amber-500/30' : 'border-neutral-600 bg-neutral-800'
          }`} />
          <div className="flex-1 w-px bg-neutral-800" />
        </div>

        {/* Time */}
        <p className="text-xs text-neutral-500 font-mono mb-3">{event.time}</p>

        {/* Notifications */}
        {event.notifs.map((n, i) => (
          <div key={i} className="mb-2 bg-neutral-900/50 border border-neutral-800/50 rounded-lg px-3 py-2">
            <span className="text-[10px] uppercase tracking-wider text-neutral-600">{n.app}</span>
            <p className="text-sm text-neutral-400 mt-0.5">{n.text}</p>
          </div>
        ))}

        {/* Sotto insight */}
        {event.sotto && (
          <div className="mt-3 bg-amber-950/20 border border-amber-900/20 rounded-lg px-4 py-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-[10px] uppercase tracking-wider text-amber-600">Sotto</span>
            </div>
            <p className="text-sm text-amber-100/80">{event.sotto}</p>
          </div>
        )}

        {/* Evening summary */}
        {event.summary && (
          <div className="mt-2 bg-neutral-900/30 border border-neutral-800/30 rounded-lg px-4 py-4">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-[10px] uppercase tracking-wider text-amber-600">Evening Summary</span>
            </div>
            <div className="space-y-2 text-sm text-neutral-400">
              <p>✓ Dentist rescheduled to next Monday</p>
              <p>✓ Mum's scarf ordered — arrives Saturday</p>
              <p>✓ Dinner with Jess — great Thai place</p>
              <p className="text-neutral-600 pt-1 text-xs">Tomorrow: Team standup, client prep, nothing else urgent.</p>
            </div>
            <p className="text-neutral-600 text-xs mt-4 italic">Goodnight. I'll be here tomorrow.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function DayRewindPage() {
  const [visible, setVisible] = useState(new Set())
  const refs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(prev => new Set([...prev, Number(entry.target.dataset.idx)]))
          }
        })
      },
      { threshold: 0.2 }
    )
    refs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="max-w-lg mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-neutral-600 text-xs tracking-[0.3em] uppercase mb-4">A day with Sotto</p>
        <h1 className="text-3xl sm:text-4xl font-light text-neutral-200 tracking-tight">
          Tuesday, March 18
        </h1>
        <p className="text-neutral-500 text-sm mt-3">28 notifications. 5 that actually mattered.</p>
        <div className="mt-8 w-px h-16 bg-neutral-800 mx-auto" />
      </div>

      {/* Timeline */}
      <div className="max-w-lg mx-auto px-6 pb-12">
        {timeline.map((event, i) => (
          <div key={i} ref={el => refs.current[i] = el} data-idx={i}>
            <TimelineEvent event={event} isVisible={visible.has(i)} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-lg mx-auto px-6 pb-24 text-center">
        <div className="w-px h-16 bg-neutral-800 mx-auto mb-8" />
        <p className="text-neutral-400 text-lg mb-2">28 notifications.</p>
        <p className="text-neutral-300 text-xl mb-8">What if your phone handled the noise?</p>
        <a
          href="/#beta"
          className="inline-block px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-full text-sm font-medium transition-colors"
        >
          Try Sotto →
        </a>
      </div>
    </div>
  )
}
