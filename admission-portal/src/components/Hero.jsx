import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Star, ArrowRight, CheckCircle, Sparkles, MapPin } from 'lucide-react'

const HERO_BG = 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80'

function CircularProgress({ pct = 98 }) {
  const r = 54, circ = 2 * Math.PI * r
  const [offset, setOffset] = useState(circ)
  useEffect(() => {
    const t = setTimeout(() => setOffset(circ - (pct / 100) * circ), 600)
    return () => clearTimeout(t)
  }, [circ, pct])
  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <circle cx="60" cy="60" r={r} fill="none" stroke="url(#ringGrad)" strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="text-3xl font-black">{pct}%</span>
        <span className="text-[10px] text-blue-300 font-semibold tracking-wide">Success Rate</span>
      </div>
    </div>
  )
}

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const stagger = { show: { transition: { staggerChildren: 0.13 } } }

const PARTICLES = [
  { top: '15%', left: '8%', size: 3, delay: 0 },
  { top: '25%', left: '92%', size: 2, delay: 1.5 },
  { top: '60%', left: '5%', size: 4, delay: 0.8 },
  { top: '75%', left: '88%', size: 2, delay: 2 },
  { top: '40%', left: '50%', size: 2, delay: 1 },
  { top: '85%', left: '30%', size: 3, delay: 0.4 },
]

export default function Hero({ onApply }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="campus" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e]/60 via-[#1e3a8a]/40 to-[#0a0f1e]/55" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/5 to-transparent" />
      </div>

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i}
          className="absolute rounded-full bg-blue-300/50 pointer-events-none"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
          animate={{ y: [-8, 8, -8], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: p.delay }} />
      ))}

      {/* Glows */}
      <motion.div className="absolute top-24 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 7, repeat: Infinity }} />
      <motion.div className="absolute bottom-20 left-1/4 w-[28rem] h-[28rem] bg-blue-600/15 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.35, 0.1] }} transition={{ duration: 9, repeat: Infinity }} />
      <motion.div className="absolute top-1/2 -left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 11, repeat: Infinity }} />

      <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-20 grid md:grid-cols-2 gap-10 items-center w-full">

        {/* LEFT */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="text-white space-y-6">

          {/* Badge */}
          <motion.span variants={fadeUp}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/10 text-yellow-200 text-xs font-bold px-4 py-2 rounded-full border border-yellow-400/40 backdrop-blur tracking-wide shadow-lg shadow-yellow-500/10">
            <Sparkles size={13} className="text-yellow-300" /> India's #1 SRM & Bangalore Admission Experts
          </motion.span>

          {/* Headline */}
          <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] font-black leading-[1.08] tracking-tight drop-shadow-lg">
            Secure Your Seat at{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-cyan-300 to-blue-300">
                SRM Chennai
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-yellow-400 via-cyan-400 to-blue-400 rounded-full"
                initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.9, duration: 0.7 }} />
            </span>
            <br />
            <span className="text-white drop-shadow-md">& Top Bangalore Colleges</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-white/90 text-base md:text-lg max-w-lg leading-relaxed font-normal drop-shadow">
            Expert guidance for <strong className="text-yellow-300 font-bold">SRMJEE, KCET & COMEDK</strong>.{' '}
            <strong className="text-cyan-300 font-bold">30,000+ students</strong> placed in SRM, RVCE, BMSCE & top colleges.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <button onClick={onApply}
              className="group relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-black px-7 py-3.5 rounded-full transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 flex items-center gap-2 text-sm overflow-hidden">
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              Get Free Consultation
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#colleges"
              className="border-2 border-white/30 hover:border-cyan-400/70 text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:bg-white/10 hover:text-cyan-200 backdrop-blur text-sm">
              Explore Colleges
            </a>
          </motion.div>

          {/* Tags */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
            {['SRMJEE Guidance', 'KCET Support', 'COMEDK Help', 'Management Quota', 'Direct Admission'].map(b => (
              <span key={b} className="flex items-center gap-1.5 text-xs text-white font-medium bg-white/10 border border-white/20 px-3 py-1 rounded-full">
                <CheckCircle size={11} className="text-cyan-400" /> {b}
              </span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="grid grid-cols-4 gap-2 pt-1">
            {[['15+', 'Years Exp.'], ['50+', 'Institutes'], ['30k+', 'Students'], ['98%', 'Success']].map(([v, l]) => (
              <motion.div key={l}
                className="bg-white/10 backdrop-blur rounded-xl p-3 text-center border border-white/20 hover:border-cyan-400/50 hover:bg-white/15 transition-all cursor-default"
                whileHover={{ y: -3, scale: 1.04 }}>
                <div className="text-xl font-black text-white drop-shadow">{v}</div>
                <div className="text-[9px] sm:text-[10px] text-white/80 mt-0.5 leading-tight font-medium">{l}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }} className="hidden md:flex flex-col items-center gap-4">

          {/* SRM spotlight card */}
          <motion.div
            className="relative bg-white/8 backdrop-blur-xl rounded-3xl p-6 w-full max-w-sm border border-white/15 shadow-2xl overflow-hidden"
            whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-2.5 shadow-lg shadow-yellow-500/30">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-black text-sm">SRM Institute of Science</p>
                <p className="text-white/60 text-xs flex items-center gap-1"><MapPin size={10} /> Kattankulathur, Chennai</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[['Top 10', 'NIRF Rank'], ['50k+', 'Students'], ['92 LPA', 'Highest Pkg']].map(([v, l]) => (
                <div key={l} className="bg-white/8 rounded-xl p-2.5 text-center border border-white/10">
                  <div className="text-white font-bold text-sm">{v}</div>
                  <div className="text-white/60 text-[10px]">{l}</div>
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              {['SRMJEE Phase 1 & 2 Guidance', 'Management Quota Seats Available', 'CSE, AI/ML, Data Science & more'].map(t => (
                <div key={t} className="flex items-center gap-2 text-xs text-white/80">
                  <CheckCircle size={11} className="text-yellow-400 shrink-0" /> {t}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Success rate card */}
          <motion.div
            className="relative bg-white/8 backdrop-blur-xl rounded-3xl px-6 py-4 w-full max-w-sm text-center border border-white/15 shadow-2xl overflow-hidden"
            whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
            <p className="text-white/80 text-xs mb-3 font-medium tracking-wide">Admission Success Rate 2024</p>
            <CircularProgress pct={98} />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[['5,200+', 'Seats Filled'], ['50+ Colleges', 'Pan India']].map(([v, l]) => (
                <div key={l} className="bg-white/8 rounded-xl p-2.5 text-center border border-white/10">
                  <div className="text-white font-bold text-sm">{v}</div>
                  <div className="text-white/60 text-xs">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Call card */}
          <motion.div className="bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl p-4 w-full max-w-sm shadow-2xl flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }} whileHover={{ y: -4 }}>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-3 shrink-0 shadow-lg shadow-blue-500/40">
              <Phone size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">Talk to an Expert Now</p>
              <p className="text-white/55 text-xs">Free 30-min counselling session</p>
            </div>
            <button onClick={onApply}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-3 py-2 rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all shadow-md whitespace-nowrap">
              Call Now
            </button>
          </motion.div>

          {/* Stars */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="flex items-center gap-2 text-white/70 text-sm bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur">
            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />)}</div>
            <span>4.9/5 from 2,400+ reviews</span>
          </motion.div>
        </motion.div>

        {/* Mobile call card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="md:hidden bg-white/8 backdrop-blur rounded-2xl p-4 flex items-center gap-3 border border-white/15">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-2.5 shrink-0">
            <Phone size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-sm">Talk to an Expert</p>
            <p className="text-white/60 text-xs">Free 30-min counselling</p>
          </div>
          <button onClick={onApply} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap">
            Call Now
          </button>
        </motion.div>
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
