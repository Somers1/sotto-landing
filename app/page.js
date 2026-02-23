import SignupForm from './signup-form'
import AnimatedSection from './animated-section'

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav
        className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto  flex items-center justify-end">
          <a
            href="#beta"
            className="text-sm text-warm-200/70 hover:text-warm-200 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-400/50 rounded-md px-2 py-1"
          >
            Join the beta
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-28 sm:pb-32 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto text-center">

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] hero-fade hero-fade-2">
            Your phone,<br />
            <span className="text-warm-200">paying attention</span>
          </h1>
          <p className="mt-8 text-base sm:text-xl text-neutral-400 max-w-xl mx-auto leading-relaxed hero-fade hero-fade-3">
            A quiet AI that lives on your Android. It reads your notifications,
            learns about your life, and speaks up when it matters.
          </p>
          <p className="mt-4 text-sm text-neutral-500 hero-fade hero-fade-4">
            Not a chatbot — a presence.
          </p>
        </div>
      </section>

      <Divider />

      {/* Features */}
      <section className="py-24 sm:py-32 px-6 sm:px-8" aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">Features</h2>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 md:gap-10">
            <AnimatedSection delay={0}>
              <Feature
                icon={<LearnIcon />}
                title="Learns your world"
                description="People, places, patterns. Sotto builds a quiet understanding of who and what matters to you."
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <Feature
                icon={<ConnectIcon />}
                title="Connects the dots"
                description="Cross-notification intelligence. It sees the thread between your calendar, messages, and alerts."
              />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <Feature
                icon={<SpeakIcon />}
                title="Speaks up when it matters"
                description="Proactive nudges, not noise. Sotto only interrupts when it has something worth saying."
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Divider />

      {/* How it works */}
      <section className="py-24 sm:py-32 px-6 sm:px-8" aria-labelledby="how-heading">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <h2 id="how-heading" className="text-2xl sm:text-3xl font-semibold tracking-tight text-center mb-16 sm:mb-20">
              How it works
            </h2>
          </AnimatedSection>
          <div className="space-y-10 sm:space-y-14">
            <AnimatedSection delay={0}>
              <Step
                number="01"
                title="Install & grant notification access"
                description="Sotto reads your notifications — that's its only input. No microphone, no contacts sync, no cloud."
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <Step
                number="02"
                title="It watches and learns"
                description="Over days, Sotto builds a model of your life. Who texts you, what your calendar looks like, what apps matter."
              />
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <Step
                number="03"
                title="It speaks up"
                description={`A gentle nudge when something connects. "Your flight is in 3 hours and there's traffic on the M1." That kind of thing.`}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Divider />

      {/* CTA */}
      <section id="beta" className="py-24 sm:py-32 px-6 sm:px-8 scroll-mt-20" aria-labelledby="beta-heading">
        <div className="max-w-lg mx-auto text-center">
          <AnimatedSection>
            <h2 id="beta-heading" className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              Join the beta
            </h2>
            <p className="text-neutral-400 mb-10">
              Android only. Early access rolling out soon.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <SignupForm />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="mt-8">
              <span
                className="inline-flex items-center gap-2 text-sm text-neutral-500"
                aria-label="Coming soon to Google Play Store"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                Coming to Play Store
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </main>
  )
}

function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8">
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </div>
  )
}

function Feature({ icon, title, description }) {
  return (
    <div className="group p-6 -m-6 rounded-2xl transition-colors duration-300 hover:bg-white/[0.02]">
      <div className="mb-5 text-warm-400/80 transition-colors duration-300 group-hover:text-warm-400">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2 tracking-tight">{title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function Step({ number, title, description }) {
  return (
    <div className="group flex gap-6 sm:gap-8 p-4 -m-4 rounded-xl transition-colors duration-300 hover:bg-white/[0.02]">
      <div className="text-warm-400/30 font-mono text-sm pt-0.5 shrink-0 tabular-nums transition-colors duration-300 group-hover:text-warm-400/60">
        {number}
      </div>
      <div>
        <h3 className="font-medium mb-1.5 tracking-tight">{title}</h3>
        <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function LearnIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="4" fill="currentColor" />
    </svg>
  )
}

function ConnectIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="8" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10.5" y1="13" x2="17.5" y2="9" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10.5" y1="15" x2="17.5" y2="19" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function SpeakIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="8" width="8" height="12" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 11C17.1 11.6 17.8 12.7 17.8 14C17.8 15.3 17.1 16.4 16 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 8.5C21 9.8 22.3 11.8 22.3 14C22.3 16.2 21 18.2 19 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
