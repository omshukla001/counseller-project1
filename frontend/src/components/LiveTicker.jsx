// Auto-scrolling top strip — runs above the header
const TICKER_ITEMS = [
  '🎓 Admissions Open 2026–27',
  '📞 Talk to a senior counsellor: +91 72960 87953',
  '✨ 100% free counselling · No hidden charges',
  '🏆 Trusted admission consultancy · 6+ years experience',
  '⚡ Get your personalised college list in 30 seconds',
  '🎯 Specialists for KCET · COMEDK · SRMJEE',
  '📚 12+ partner colleges in Bangalore + SRM Chennai',
  '💼 Guidance for KCET · COMEDK · SRMJEE · Management & NRI quota',
]

export default function LiveTicker() {
  // Duplicate the list so the marquee loop is seamless
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="bg-gradient-to-r from-[#0A192F] via-[#1E3A8A] to-[#0A192F] text-white overflow-hidden border-b border-white/10 relative">
      <div className="ticker-track flex whitespace-nowrap py-2">
        {items.map((t, i) => (
          <span key={i} className="text-xs md:text-sm font-medium px-6 flex items-center gap-2 shrink-0">
            <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-60" />
            {t}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes kp-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-track { animation: kp-ticker 38s linear infinite; will-change: transform; }
        .ticker-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }
      `}</style>
    </div>
  )
}
