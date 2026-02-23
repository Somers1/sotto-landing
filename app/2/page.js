'use client'

export default function AnaloguePage() {
  return (
    <div className="min-h-screen" style={{ background: '#f4ede4' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=Lora:ital,wght@0,400;0,500;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
        .font-hand { font-family: 'Caveat', cursive; }
        .font-serif { font-family: 'Lora', serif; }
        .font-garamond { font-family: 'EB Garamond', serif; }
        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
        }
        .ruled-line {
          background-image: repeating-linear-gradient(
            transparent, transparent 31px, #d4c5b2 31px, #d4c5b2 32px
          );
        }
        .stamp { border: 2px solid #8b6f4e; border-radius: 2px; padding: 8px 16px; transform: rotate(-3deg); }
        .tape {
          background: rgba(255,248,220,0.7);
          height: 24px;
          width: 80px;
          transform: rotate(-2deg);
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
      `}</style>

      {/* Letter header */}
      <div className="max-w-lg mx-auto px-6 pt-16 pb-8">
        <div className="flex justify-end mb-12">
          <div className="stamp text-xs" style={{ color: '#8b6f4e' }}>
            <span className="font-hand text-lg">Sotto</span>
          </div>
        </div>

        <div className="font-garamond text-right text-sm mb-12" style={{ color: '#8b6f4e' }}>
          <p className="italic">Melbourne, 2025</p>
        </div>

        <div className="font-serif leading-relaxed space-y-6" style={{ color: '#3d3428' }}>
          <p className="text-lg">Dear You,</p>

          <p>
            We built something and we weren't sure how to tell you about it.
            It's not an app, exactly. It's more like... a habit your phone develops.
            A good one.
          </p>

          <p>
            You know how you sometimes forget things? Not big things — you'd remember those. 
            The small ones. The ones that slip through because life is loud and your 
            brain is full.
          </p>

          <p className="font-hand text-2xl leading-relaxed" style={{ color: '#6b5740' }}>
            Your mum mentioned your dad's flight time in a text you half-read while 
            making coffee. Your dentist appointment is the same day as that deadline. 
            Your friend's birthday is tomorrow and the gift arrives the day after.
          </p>

          <p>
            Sotto notices these things. Not because we told it to — because it's 
            paying attention the way a thoughtful friend would.
          </p>
        </div>
      </div>

      {/* Divider - like a page fold */}
      <div className="max-w-lg mx-auto px-6 py-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: '#d4c5b2' }} />
          <span className="font-hand text-lg" style={{ color: '#b09a7e' }}>~</span>
          <div className="flex-1 h-px" style={{ background: '#d4c5b2' }} />
        </div>
      </div>

      {/* Notebook section */}
      <div className="max-w-lg mx-auto px-6 pb-8">
        <div className="ruled-line p-8 rounded-sm" style={{ background: '#faf6f0', boxShadow: '2px 2px 8px rgba(0,0,0,0.06)' }}>
          <p className="font-hand text-xl mb-4" style={{ color: '#6b5740' }}>How it actually works:</p>
          <div className="space-y-4 font-hand text-lg" style={{ color: '#5a4a38' }}>
            <p>📱 It lives on your phone (Android for now)</p>
            <p>👀 It reads your notifications — with your permission</p>
            <p>🧠 It remembers what matters and connects the dots</p>
            <p>💬 It speaks up when it has something useful to say</p>
            <p className="text-base pt-2" style={{ color: '#9a8670' }}>
              (and it stays quiet the rest of the time — that's the whole point)
            </p>
          </div>
        </div>
      </div>

      {/* Margin notes */}
      <div className="max-w-lg mx-auto px-6 py-12">
        <div className="font-serif space-y-8" style={{ color: '#3d3428' }}>
          <p>
            That's what Sotto is. Not an assistant that shouts. A presence that whispers 
            when it has something worth saying.
          </p>

          <div className="pl-8 border-l-2" style={{ borderColor: '#d4c5b2' }}>
            <p className="font-hand text-xl" style={{ color: '#8b6f4e' }}>
              "It's like having a thoughtful friend who reads all your notifications 
              and occasionally taps you on the shoulder."
            </p>
          </div>

          <p>
            We're not trying to replace anything. We're not trying to be your calendar 
            or your to-do list or your AI girlfriend. We're just trying to make your 
            phone a little more considerate.
          </p>
        </div>
      </div>

      {/* Postcard CTA */}
      <div className="max-w-lg mx-auto px-6 pb-20">
        <div className="p-8 rounded-sm text-center" style={{ background: '#faf6f0', border: '1px solid #d4c5b2', boxShadow: '3px 3px 0 #d4c5b2' }}>
          <p className="font-serif mb-2" style={{ color: '#3d3428' }}>
            We're opening up the beta soon.
          </p>
          <p className="font-hand text-xl mb-6" style={{ color: '#6b5740' }}>
            Leave your name and we'll write you back.
          </p>
          <a
            href="/#beta"
            className="inline-block font-serif text-sm px-6 py-3 rounded-sm transition-colors"
            style={{ background: '#5a4a38', color: '#f4ede4' }}
          >
            Join the waitlist →
          </a>
          <p className="font-hand text-sm mt-6" style={{ color: '#b09a7e' }}>
            Warmly,<br/>The Sotto team
          </p>
        </div>
      </div>
    </div>
  )
}
