import SignupForm from './signup-form'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Sotto" className="h-8 w-auto invert" />
            <span className="text-lg font-medium tracking-tight">Sotto</span>
          </div>
          <a
            href="#beta"
            className="text-sm text-warm-200/80 hover:text-warm-200 transition-colors"
          >
            Join the beta
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-warm-400 text-sm font-mono tracking-widest uppercase mb-6 animate-fade-up">
            Sotto voce
          </p>
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.05] animate-fade-up animate-fade-up-delay-1">
            Your phone,<br />
            <span className="text-warm-200">paying attention</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-neutral-400 max-w-xl mx-auto leading-relaxed animate-fade-up animate-fade-up-delay-2">
            A quiet AI that lives on your Android. It reads your notifications, 
            learns about your life, and speaks up when it matters.
          </p>
          <p className="mt-4 text-sm text-neutral-500 animate-fade-up animate-fade-up-delay-3">
            Not a chatbot — a presence.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <Feature
              icon="◉"
              title="Learns your world"
              description="People, places, patterns. Sotto builds a quiet understanding of who and what matters to you."
            />
            <Feature
              icon="⟁"
              title="Connects the dots"
              description="Cross-notification intelligence. It sees the thread between your calendar, messages, and alerts."
            />
            <Feature
              icon="◈"
              title="Speaks up when it matters"
              description="Proactive nudges, not noise. Sotto only interrupts when it has something worth saying."
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* How it works */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold tracking-tight text-center mb-16">
            How it works
          </h2>
          <div className="space-y-12">
            <Step
              number="01"
              title="Install & grant notification access"
              description="Sotto reads your notifications — that's its only input. No microphone, no contacts sync, no cloud."
            />
            <Step
              number="02"
              title="It watches and learns"
              description="Over days, Sotto builds a model of your life. Who texts you, what your calendar looks like, what apps matter."
            />
            <Step
              number="03"
              title="It speaks up"
              description={`A gentle nudge when something connects. "Your flight is in 3 hours and there's traffic on the M1." That kind of thing.`}
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* CTA */}
      <section id="beta" className="py-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            Join the beta
          </h2>
          <p className="text-neutral-400 mb-10">
            Android only. Early access rolling out soon.
          </p>
          <SignupForm />
          <div className="mt-8">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              Coming to Play Store
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-neutral-500 text-sm">
            <img src="/logo.svg" alt="" className="h-5 w-auto invert opacity-40" />
            <span>Sotto</span>
          </div>
          <p className="text-neutral-600 text-xs">
            The quiet voice.
          </p>
        </div>
      </footer>
    </main>
  )
}

function Feature({ icon, title, description }) {
  return (
    <div className="group">
      <div className="text-2xl mb-4 text-warm-400">{icon}</div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function Step({ number, title, description }) {
  return (
    <div className="flex gap-6">
      <div className="text-warm-400/40 font-mono text-sm pt-1 shrink-0">{number}</div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
