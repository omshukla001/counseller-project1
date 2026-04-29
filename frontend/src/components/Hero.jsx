import { useEffect, useState, useRef, useReducer } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Star, ArrowRight, CheckCircle, Sparkles, MapPin, ChevronDown, Shield } from 'lucide-react'

const COLLEGES = [
  { name: 'SRM Chennai', img: 'https://images.unsplash.com/photo-1568626231555-03e303627953?w=1600&q=80&auto=format&fit=crop' },
  { name: 'RVCE Bangalore', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/RV_College_Admin_block.JPG' },
  { name: 'BMSCE Bangalore', img: 'https://images.unsplash.com/photo-1635403981075-f639da783aac?w=1600&q=80&auto=format&fit=crop' },
  { name: 'MSRIT Bangalore', img: 'https://upload.wikimedia.org/wikipedia/commons/a/af/MSRIT_from_front_gate.jpg' },
  { name: 'PES University', img: 'https://images.unsplash.com/photo-1614460646652-2094b060b5be?w=1600&q=80&auto=format&fit=crop' },
  { name: 'BMSIT Bangalore', img: 'https://images.unsplash.com/photo-1600903308878-bf5e554ab841?w=1600&q=80&auto=format&fit=crop' },
  { name: 'BIT Bangalore', img: 'https://images.unsplash.com/photo-1642915680258-6aaca62d3849?w=1600&q=80&auto=format&fit=crop' },
  { name: 'DSCE Bangalore', img: 'https://images.unsplash.com/photo-1622650049370-3957f114ec60?w=1600&q=80&auto=format&fit=crop' },
  { name: 'NMIT Bangalore', img: 'https://images.unsplash.com/photo-1680060731105-325991d05343?w=1600&q=80&auto=format&fit=crop' },
  { name: 'RNSIT Bangalore', img: 'https://images.unsplash.com/photo-1592066575517-58df903152f2?w=1600&q=80&auto=format&fit=crop' },
  { name: 'Sir MVIT Bangalore', img: 'https://images.unsplash.com/photo-1542404937-2132aa1fa6fc?w=1600&q=80&auto=format&fit=crop' },
  { name: 'Jain University', img: 'https://images.unsplash.com/photo-1617584387223-5dd8f36511a0?w=1600&q=80&auto=format&fit=crop' },
]

function RotatingCollege({ idx }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span key={idx}
        initial={{ y: 24, opacity: 0, filter: 'blur(4px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        exit={{ y: -24, opacity: 0, filter: 'blur(4px)' }}
        transition={{ duration: 0.35 }}
        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-cyan-400 drop-shadow-sm">
        {COLLEGES[idx].name}
      </motion.span>
    </AnimatePresence>
  )
}

function CircularProgress({ pct = 96 }) {
  const r = 42, circ = 2 * Math.PI * r
  const [offset, setOffset] = useState(circ)
  useEffect(() => {
    const t = setTimeout(() => setOffset(circ - (pct / 100) * circ), 600)
    return () => clearTimeout(t)
  }, [circ, pct])
  return (
    <div className="relative w-24 h-24 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="url(#ringGrad)" strokeWidth="7"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="text-xl font-black">{pct}%</span>
        <span className="text-[8px] text-blue-300 font-semibold">Satisfaction</span>
      </div>
    </div>
  )
}

const fadeUp = (d = 0) => ({ initial: { opacity: 0, y: 25 }, animate: { opacity: 1, y: 0, transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] } } })

// 3-step process — sets honest expectations, no scarcity claims.
function HowItWorks({ compact = false }) {
  const steps = [
    { n: 1, t: 'Free 15-min call' },
    { n: 2, t: 'Personalised college shortlist' },
    { n: 3, t: 'We help with the application' },
  ]
  return (
    <div className={`flex flex-wrap items-center ${compact ? 'gap-1.5' : 'gap-2'}`}>
      {steps.map((s, i) => (
        <span key={s.n} className="inline-flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 bg-white/[0.08] border border-white/[0.15] backdrop-blur rounded-full text-white/90 ${compact ? 'pl-1 pr-2.5 py-0.5 text-[11px]' : 'pl-1.5 pr-3 py-1 text-xs'} font-semibold`}>
            <span className={`bg-cyan-400 text-[#0a1230] rounded-full flex items-center justify-center font-black ${compact ? 'w-4 h-4 text-[9px]' : 'w-5 h-5 text-[10px]'}`}>{s.n}</span>
            {s.t}
          </span>
          {i < steps.length - 1 && <ArrowRight size={compact ? 10 : 12} className="text-white/30" />}
        </span>
      ))}
    </div>
  )
}

export default function Hero({ onApply }) {
  const [idx, setIdx] = useState(0)
  const loadedRef = useRef(new Set([0]))
  const [, forceRender] = useReducer(x => x + 1, 0)

  // Preload every slide image once on mount so rotation is instant
  useEffect(() => {
    COLLEGES.forEach((c, i) => {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
        loadedRef.current.add(i)
        forceRender()
      }
      img.src = c.img
    })
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(cur => {
        for (let step = 1; step <= COLLEGES.length; step++) {
          const next = (cur + step) % COLLEGES.length
          if (loadedRef.current.has(next)) return next
        }
        return cur
      })
    }, 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">

      {/* BG — slides with college name */}
      <div className="absolute inset-0 overflow-hidden bg-[#080e1e]">
        <AnimatePresence mode="sync">
          <motion.div key={idx}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0">
            <img src={COLLEGES[idx].img} alt={`${COLLEGES[idx].name} campus`} loading="eager" decoding="async"
              fetchPriority={idx === 0 ? 'high' : 'auto'}
              className="w-full h-full object-cover scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080e1e]/70 via-[#12244a]/55 to-[#080e1e]/80" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/15 via-transparent to-indigo-900/15" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Glows */}
      <motion.div className="absolute -top-20 -right-20 w-[28rem] h-[28rem] bg-blue-500/15 rounded-full blur-[80px] pointer-events-none"
        animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 8, repeat: Infinity }} />
      <motion.div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"
        animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 10, repeat: Infinity }} />

      {/* ─── MOBILE ─── */}
      <div className="md:hidden relative flex flex-col min-h-[100svh]">

        {/* Top bar */}
        <motion.div {...fadeUp(0.1)} className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-[72px] pb-2 z-10">
          <span className="inline-flex items-center gap-1.5 bg-white/[0.08] border border-white/[0.12] rounded-full px-3 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-white/90 text-xs font-semibold">Admissions Open 2026–27</span>
          </span>
          <span className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />)}
            <span className="text-white/50 text-[10px] font-semibold ml-1">4.9 · 11 Google reviews</span>
          </span>
        </motion.div>

        <div className="flex-1 flex flex-col px-5 pt-[140px] pb-16">

          {/* Headline */}
          <motion.div {...fadeUp(0.15)} className="mb-3">
            <div role="heading" aria-level="2" className="text-[2rem] font-extrabold leading-[1.12] tracking-tight text-white">
              Secure Your Seat at
              <br />
              <span className="inline-block min-h-[1.2em]"><RotatingCollege idx={idx} /></span>
            </div>
            <p className="text-white/45 text-sm font-bold mt-1.5">& Top Engineering Colleges</p>
          </motion.div>

          {/* Description */}
          <motion.p {...fadeUp(0.2)} className="text-white/65 text-sm leading-relaxed">
            Expert guidance for <span className="text-white font-semibold">SRMJEE, KCET & COMEDK</span>.{' '}
            Honest counselling — no false promises.
          </motion.p>

          {/* How it works — mobile */}
          <motion.div {...fadeUp(0.25)} className="mt-3">
            <HowItWorks compact />
          </motion.div>

          {/* CTA + boxes pinned to bottom */}
          <div className="mt-auto flex flex-col gap-2">
            {/* CTA buttons */}
            <motion.div {...fadeUp(0.25)} className="flex flex-col gap-2 mb-3">
              <button onClick={onApply}
                className="w-full bg-white text-[#0f172a] font-extrabold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-lg active:scale-[0.97] transition-transform">
                Get Free Consultation <ArrowRight size={15} />
              </button>
              <div className="grid grid-cols-2 gap-2">
                <a href="tel:+917296087953"
                  className="border border-white/20 text-white font-semibold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1.5 backdrop-blur-sm active:scale-[0.97] transition-transform">
                  <Phone size={13} /> 72960 87953
                </a>
                <a href="https://wa.me/917296087953" target="_blank" rel="noreferrer"
                  className="bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-semibold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1.5 backdrop-blur-sm active:scale-[0.97] transition-transform">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.71-1.233A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.37 0-4.567-.818-6.296-2.186l-.44-.352-3.263.855.87-3.178-.386-.461A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Trust strip */}
            <motion.div {...fadeUp(0.35)} className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 text-white/55 text-[11px]">
              <span className="flex items-center gap-1.5"><Shield size={11} className="text-blue-400" /> Free · 6+ Years Trusted</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── DESKTOP ─── */}
      <div className="hidden md:block relative">
        <div className="max-w-7xl mx-auto px-12 lg:px-16 min-h-screen flex items-center">
          <div className="grid grid-cols-5 gap-10 items-center w-full">

            {/* LEFT — 3 cols */}
            <div className="col-span-3">
              <motion.div {...fadeUp(0.1)} className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 bg-white/[0.07] border border-white/[0.12] rounded-full px-4 py-2 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-white/90 text-xs font-semibold tracking-wide">Admissions Open 2026–27</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-400/20 rounded-full px-3.5 py-2 backdrop-blur-sm text-emerald-300 text-xs font-bold">
                  100% Free · No fees from students
                </span>
              </motion.div>

              <motion.h1 {...fadeUp(0.2)}
                className="text-[2.6rem] lg:text-[3.2rem] font-extrabold leading-[1.08] tracking-[-0.01em] text-white mb-4">
                Secure Your Seat at{' '}
                <span className="relative inline-block">
                  <RotatingCollege idx={idx} />
                  <motion.span className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-yellow-400 via-cyan-400 to-blue-400 rounded-full"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 0.6 }} style={{ transformOrigin: 'left' }} />
                </span>
                <br />
                <span className="text-white/45 font-bold text-[0.52em]">& Top Engineering Colleges</span>
              </motion.h1>

              <motion.p {...fadeUp(0.3)} className="text-white/65 text-base max-w-xl leading-relaxed mb-5">
                Expert counselling for <span className="text-white font-semibold">SRMJEE, KCET & COMEDK</span>.
                {' '}Personalised guidance to help you secure a seat in India's top engineering colleges.
              </motion.p>

              {/* How it works — desktop */}
              <motion.div {...fadeUp(0.35)} className="mb-6">
                <HowItWorks />
              </motion.div>

              <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3 mb-6">
                <button onClick={onApply}
                  className="group bg-white text-[#0f172a] font-extrabold px-7 py-3 rounded-full flex items-center gap-2 text-sm shadow-xl shadow-white/10 hover:shadow-white/20 hover:scale-[1.03] transition-all">
                  Get Free Consultation
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="tel:+917296087953"
                  className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-semibold px-5 py-3 rounded-full border border-white/20 hover:border-white/40 transition-colors backdrop-blur-sm">
                  <Phone size={15} /> +91 72960 87953
                </a>
              </motion.div>

              <motion.div {...fadeUp(0.45)} className="flex flex-wrap gap-2 mb-5">
                {['SRMJEE', 'KCET', 'COMEDK', 'Management Quota'].map(b => (
                  <span key={b} className="flex items-center gap-1.5 text-xs text-white font-semibold bg-white/[0.12] border border-white/[0.2] px-3.5 py-1.5 rounded-full shadow-sm shadow-white/5 backdrop-blur-sm">
                    <CheckCircle size={11} className="text-cyan-400" /> {b}
                  </span>
                ))}
              </motion.div>

              <motion.div {...fadeUp(0.5)}
                className="flex items-center gap-4 text-white/50 text-xs pt-4 border-t border-white/[0.07]">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
                  <span className="ml-1 text-white font-bold">4.9</span>
                  <span className="ml-1 text-white/60 font-semibold">· 11 Google reviews</span>
                </div>
                <span className="w-px h-3 bg-white/15" />
                <span className="flex items-center gap-1"><CheckCircle size={11} className="text-emerald-400" /> 6+ Years Trusted</span>
              </motion.div>
            </div>

            {/* RIGHT — 2 cols */}
            <motion.div {...fadeUp(0.3)} className="col-span-2 flex flex-col items-center gap-3">

              {/* SRM Card */}
              <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 200 }}
                className="relative bg-white/[0.08] backdrop-blur-xl rounded-2xl w-full max-w-xs border border-white/[0.15] shadow-2xl overflow-hidden">
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-yellow-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/15 px-5 py-4 border-b border-white/[0.1]">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-2 shadow-lg">
                      <Sparkles size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">SRM Institute of Science</p>
                      <p className="text-white/45 text-[11px] flex items-center gap-1 mt-0.5"><MapPin size={9} /> Chennai, Tamil Nadu</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 divide-x divide-white/[0.08]">
                  {[['Top 10', 'NIRF Rank'], ['50k+', 'Students'], ['92 LPA', 'Highest Pkg']].map(([v, l]) => (
                    <div key={l} className="py-3 text-center">
                      <div className="text-white font-bold text-sm">{v}</div>
                      <div className="text-white/50 text-[10px] mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3.5 space-y-1.5 border-t border-white/[0.08]">
                  {['SRMJEE Phase 1 & 2 Guidance', 'Management Quota Available', 'CSE, AI/ML, Data Science & more'].map(t => (
                    <div key={t} className="flex items-center gap-2 text-xs text-white/75">
                      <CheckCircle size={11} className="text-cyan-400 shrink-0" /> {t}
                    </div>
                  ))}
                </div>
                <div className="px-5 pb-4">
                  <button onClick={() => onApply('SRM Chennai')}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow">
                    Apply for SRM <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>

              {/* Progress + Call row */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                <motion.div whileHover={{ y: -3 }}
                  className="bg-white/[0.08] backdrop-blur-xl rounded-2xl p-3 text-center border border-white/[0.12] shadow-xl">
                  <CircularProgress pct={96} />
                  <p className="text-white/60 text-[10px] font-medium mt-1">Students Guided</p>
                </motion.div>
                <motion.div whileHover={{ y: -3 }}
                  className="bg-white/[0.08] backdrop-blur-xl rounded-2xl p-4 border border-white/[0.12] shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-2 shadow-lg shadow-blue-500/30">
                      <Phone size={16} className="text-white" />
                    </div>
                    <p className="text-white font-bold text-sm leading-tight">Talk to Expert</p>
                    <p className="text-white/55 text-[11px] mt-0.5">+91 72960 87953</p>
                  </div>
                  <a href="tel:+917296087953"
                    className="mt-2 bg-white/[0.12] hover:bg-white/[0.18] text-white text-[11px] font-bold py-1.5 rounded-lg text-center transition-colors border border-white/[0.15]">
                    Call Now
                  </a>
                </motion.div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <path d="M0,30 C480,70 960,0 1440,40 L1440,60 L0,60 Z" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  )
}
