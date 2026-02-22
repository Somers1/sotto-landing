'use client'

export default function SignupForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col sm:flex-row gap-3"
    >
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-warm-400/50 focus:ring-1 focus:ring-warm-400/20 transition-all"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-warm-400 text-black font-medium rounded-lg hover:bg-warm-200 transition-colors whitespace-nowrap"
      >
        Get early access
      </button>
    </form>
  )
}
