import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle, MapPin, TrendingUp } from 'lucide-react'
import { TESTIMONIALS, WHY_BLR, WHY_SRM, SRM_COLLEGE, EXPERTISE } from '../data'

const BLR_BG = 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1400&q=80'
const EXPERTISE_BG = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80'

const SRM_PHOTOS = [
  'https://upload.wikimedia.org/wikipedia/commons/9/9d/Tech_Park.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/3/3e/0J9A0195.jpg',
  'https://images.unsplash.com/photo-1562774053-701939374585?w=1400&q=80',
  'https://upload.wikimedia.org/wikipedia/commons/4/4e/SRM_University_Auditorium.JPG',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80',
  'https://upload.wikimedia.org/wikipedia/commons/8/82/Biotech_Block_1.jpg',
]

function SRMPhotoSlider() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % SRM_PHOTOS.length), 3500)
    return () => clearInterval(t)
  }, [])
  return (
    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      className="relative rounded-3xl overflow-hidden h-64 md:h-72 shadow-2xl">
      {/* Sliding images */}
      <AnimatePresence mode="wait">
        <motion.img key={idx} src={SRM_PHOTOS[idx]} alt="SRM Campus"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover" />
      </AnimatePresence>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 relative z-10">
        <p className="text-white font-black text-xl md:text-2xl">SRM Institute of Science</p>
        <p className="text-white/80 text-sm flex items-center gap-1 mt-1"><MapPin size={12} /> Kattankulathur, Chennai</p>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {SRM_COLLEGE.stats.map(([v, l]) => (
            <div key={l} className="bg-white/10 backdrop-blur rounded-lg p-2 text-center border border-white/15">
              <div className="text-white font-black text-sm">{v}</div>
              <div className="text-white/70 text-[10px]">{l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div className="absolute top-3 right-3 flex gap-1.5 z-10">
        {SRM_PHOTOS.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`rounded-full transition-all duration-300 ${i === idx ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'}`} />
        ))}
      </div>
    </motion.div>
  )
}

export function WhySRM({ onApply }) {
  return (
    <section className="py-14 md:py-20 bg-gradient-to-br from-[#0c1631] via-[#162d6e] to-[#0e1a3d] overflow-hidden relative">
      {/* bg pattern + glows */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-blue-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="text-center mb-10">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="inline-block bg-yellow-400/20 text-yellow-300 text-sm font-bold px-4 py-1.5 rounded-full border border-yellow-400/30 mb-3">
            ⭐ Featured University
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-2xl md:text-4xl font-black text-white">Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-cyan-300">SRM Chennai?</span></motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-white/80 mt-2 max-w-lg mx-auto text-sm md:text-base">
            India's top-ranked private university with world-class placements, research & campus life.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: sliding photo banner */}
          <SRMPhotoSlider />

          {/* Right: why cards */}
          <div className="grid grid-cols-2 gap-3">
            {WHY_SRM.map((w, i) => (
              <motion.div key={w.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white/8 backdrop-blur border border-white/10 rounded-xl p-4 hover:border-blue-400/40 transition-all cursor-default">
                <div className="text-2xl mb-2">{w.icon}</div>
                <h3 className="font-bold text-white text-sm leading-tight">{w.title}</h3>
                <p className="text-white/70 text-xs mt-1">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Courses strip */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white/80 text-sm font-semibold mb-3 uppercase tracking-wider">Popular Courses at SRM Chennai</p>
          <div className="flex flex-wrap gap-2">
            {SRM_COLLEGE.courses.map(c => (
              <span key={c} className="flex items-center gap-1.5 text-sm text-white bg-white/10 border border-white/15 px-3 py-1.5 rounded-full">
                <CheckCircle size={10} className="text-cyan-400" /> {c}
              </span>
            ))}
          </div>
          <button onClick={() => onApply('SRM Chennai')}
            className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-black text-sm px-6 py-2.5 rounded-full hover:scale-105 transition-transform shadow-lg shadow-yellow-500/30">
            Apply for SRM Admission →
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export function WhyBangalore() {
  return (
    <section className="py-14 md:py-20 bg-[#f0f4ff] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="inline-block bg-blue-100 text-[#1e3a8a] text-sm font-bold px-4 py-1.5 rounded-full border border-blue-200 mb-3">
            Why Bangalore?
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-2xl md:text-4xl font-black text-gray-900">India's Engineering Capital</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-gray-600 mt-2 max-w-lg mx-auto text-sm md:text-base px-2">
            Home to 2000+ IT companies, world-class research institutes, and India's highest engineering placements.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {WHY_BLR.map((w, i) => (
            <motion.div key={w.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(16,185,129,0.15)' }}
              className="bg-white border border-blue-200 rounded-xl md:rounded-2xl p-4 md:p-6 text-center shadow-sm transition-all cursor-default group">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-100 group-hover:bg-blue-200 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 transition-colors text-2xl md:text-3xl">
                {w.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight">{w.title}</h3>
              <p className="text-gray-600 text-xs md:text-sm mt-1 leading-snug">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Expertise() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="inline-block bg-blue-50 text-[#1e3a8a] text-sm font-bold px-4 py-1.5 rounded-full border border-blue-200 mb-3">
            Our Services
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-gray-900">Why Choose Us</motion.h2>
        </div>

        {/* Photo banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden h-52 mb-12 shadow-xl">
          <img src={EXPERTISE_BG} alt="students" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/85 via-[#1e3a8a]/50 to-transparent flex items-center px-10">
            <div>
              <p className="text-white font-black text-3xl">13,000+ Students</p>
              <p className="text-blue-400 font-semibold text-lg mt-1">Successfully Placed in Top Colleges</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {EXPERTISE.map((e, i) => (
            <motion.div key={e.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(16,185,129,0.12)' }}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 transition-all group">
              <div className="w-14 h-14 bg-blue-100 group-hover:bg-blue-200 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 transition-colors">
                {e.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base">{e.title}</h3>
              <p className="text-gray-600 text-xs md:text-sm mt-1.5 leading-relaxed">{e.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Testimonials() {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setIdx(i => (i + 1) % TESTIMONIALS.length)

  // Auto-slide every 4 seconds
  useEffect(() => {
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [])

  const t = TESTIMONIALS[idx]

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="inline-block bg-blue-50 text-[#1e3a8a] text-xs font-bold px-4 py-1.5 rounded-full border border-blue-200 mb-3">
          Student Stories
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black text-gray-900 mb-12">What Our Students Say</motion.h2>

        <div className="relative overflow-hidden"
          onTouchStart={e => { const x = e.touches[0].clientX; e.currentTarget.dataset.tx = x }}
          onTouchEnd={e => {
            const dx = e.changedTouches[0].clientX - Number(e.currentTarget.dataset.tx)
            if (Math.abs(dx) > 40) dx < 0 ? next() : prev()
          }}>
          <AnimatePresence mode="wait">
            <motion.div key={idx}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="bg-white rounded-3xl p-8 md:p-12 relative shadow-lg border border-gray-100">
              <Quote size={48} className="text-blue-100 absolute top-6 left-6" />
              <div className="flex justify-center mb-5">
                {[...Array(t.stars)].map((_, i) => <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-700 text-sm md:text-base italic mb-8 max-w-2xl mx-auto leading-relaxed">"{t.text}"</p>
              <div className="flex items-center justify-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shadow" />
                <div className="text-left">
                  <p className="font-black text-gray-900 text-base">{t.name}</p>
                  <p className="text-[#1e3a8a] text-sm md:text-base font-medium">{t.college}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Auto-progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-1 mt-6 overflow-hidden">
          <motion.div key={idx} className="h-full bg-[#1e3a8a] rounded-full"
            initial={{ width: '0%' }} animate={{ width: '100%' }}
            transition={{ duration: 4, ease: 'linear' }} />
        </div>

        <div className="flex justify-center gap-3 mt-8">
          <button onClick={prev} className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-blue-500 hover:text-[#1e3a8a] transition-colors">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2 items-center">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className={`rounded-full transition-all duration-300 ${i === idx ? 'bg-[#1e3a8a] w-6 h-2.5' : 'bg-gray-300 w-2.5 h-2.5'}`} />
            ))}
          </div>
          <button onClick={next} className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-blue-500 hover:text-[#1e3a8a] transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
