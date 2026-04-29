import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ChevronRight, TrendingUp, ChevronLeft, CheckCircle, Sparkles } from 'lucide-react'
import { COLLEGES, SRM_COLLEGE } from '../data'

const SRM_PHOTOS = [
  '/srm-photo-4.jpg',
  '/srm-photo-1.jpg',
  '/srm-photo-2.jpg',
  '/srm-photo-3.jpg',
  '/srm-photo-6.jpg',
]

function SRMSlider() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % SRM_PHOTOS.length), 3500)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="relative rounded-2xl overflow-hidden h-64 shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.img key={idx} src={SRM_PHOTOS[idx]} alt="SRM Campus"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover" />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-3">
          <p className="text-white font-bold text-sm">Admission Open 2026–27</p>
          <p className="text-white/70 text-xs mt-0.5">SRMJEE Phase 2 & Management Quota seats available</p>
        </div>
      </div>
      <div className="absolute top-3 right-3 flex gap-1.5 z-10">
        {SRM_PHOTOS.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`rounded-full transition-all duration-300 ${i === idx ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'}`} />
        ))}
      </div>
    </div>
  )
}

function BangaloreAccordion({ onApply, onViewCollege }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="space-y-2">
      {COLLEGES.map((c, i) => (
        <motion.div key={c.short}
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.04 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Header row — always visible */}
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
              <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
              <span className="absolute top-0.5 left-0.5 bg-[#1e3a8a] text-white text-[8px] font-black px-1 rounded">#{c.rank}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-black text-[#102C57] text-base">{c.short}</h3>
                <span className="bg-blue-50 text-blue-700 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full">{c.highestPkg} pkg</span>
              </div>
              <p className="text-gray-600 text-sm truncate">{c.name}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <MapPin size={9} />{c.location}
              </div>
            </div>
            <ChevronRight size={16} className={`text-gray-400 shrink-0 transition-transform duration-300 ${open === i ? 'rotate-90' : ''}`} />
          </button>

          {/* Expanded content */}
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                className="overflow-hidden border-t border-gray-100">
                <div className="p-4 grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2">
                      <TrendingUp size={13} className="text-[#1e3a8a]" />
                      <span className="text-sm font-semibold text-blue-900">{c.highlight}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[['Seats', c.seats], ['Highest Pkg', c.highestPkg]].map(([l, v]) => (
                        <div key={l} className="bg-gray-50 rounded-xl p-2.5 text-center border border-gray-100">
                          <div className="text-[#102C57] font-black text-sm">{v}</div>
                          <div className="text-gray-500 text-[10px] mt-0.5">{l}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {c.courses.slice(0, 5).map(course => (
                        <span key={course} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-full">{course}</span>
                      ))}
                      {c.courses.length > 5 && <span className="text-xs text-gray-500">+{c.courses.length - 5} more</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 justify-end">
                    <div className="relative rounded-xl overflow-hidden h-28">
                      <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute bottom-2 left-2 text-white font-bold text-xs">{c.accreditation}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => onViewCollege(c)}
                        className="flex-1 border border-gray-300 text-gray-700 text-xs font-semibold py-2 rounded-xl hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all">
                        View Details
                      </button>
                      <button onClick={() => onApply(c.name)}
                        className="flex-1 bg-[#1E3A8A] text-white text-xs font-semibold py-2 rounded-xl hover:bg-blue-700 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

export default function CollegeGrid({ onApply, onViewCollege }) {
  return (
    <section id="colleges" className="py-10 md:py-20">
      {/* Header */}
      <div className="text-center mb-6 px-2">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-[#1E3A8A] font-semibold text-sm md:text-base uppercase tracking-wider">Admissions 2026–27</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-xl md:text-4xl font-black text-[#102C57] mt-1 leading-tight">
          Find Your Dream College
        </motion.h2>
      </div>

      {/* SRM Featured Block */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4 px-1">
          <span className="bg-yellow-400 text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-full">FEATURED</span>
          <h3 className="text-lg md:text-xl font-black text-[#102C57]">⭐ SRM Chennai</h3>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-to-br from-[#0c1631] via-[#162d6e] to-[#0e1a3d] rounded-3xl p-6 md:p-10 text-white relative overflow-hidden">
            {/* bg pattern + glows */}
            <div className="absolute inset-0 opacity-[0.03] rounded-3xl" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="grid md:grid-cols-2 gap-8 items-center relative">
              {/* Left */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-2.5 shadow-lg">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-white">SRM Chennai</h3>
                    <p className="text-white/70 text-sm flex items-center gap-1"><MapPin size={11} />{SRM_COLLEGE.location}</p>
                  </div>
                </div>

                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                  India's top-ranked private engineering university. Get expert guidance for <strong className="text-yellow-300">SRMJEE Phase 1 & 2</strong> and <strong className="text-cyan-300">Management Quota</strong> admissions.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-2">
                  {SRM_COLLEGE.stats.map(([v, l]) => (
                    <div key={l} className="bg-white/10 backdrop-blur rounded-xl p-3 text-center border border-white/15">
                      <div className="text-white font-black text-base">{v}</div>
                      <div className="text-white/70 text-[10px] mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>

                {/* Courses */}
                <div className="flex flex-wrap gap-2">
                  {SRM_COLLEGE.courses.map(c => (
                    <span key={c} className="flex items-center gap-1 text-xs md:text-sm text-white bg-white/10 border border-white/15 px-2.5 py-1 rounded-full">
                      <CheckCircle size={9} className="text-cyan-400" /> {c}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button onClick={() => onViewCollege(SRM_COLLEGE)}
                    className="bg-white text-[#102C57] font-black text-sm px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors shadow-lg">
                    View SRM Details →
                  </button>
                  <button onClick={() => onApply('SRM Chennai')}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-black text-sm px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-lg shadow-yellow-500/30">
                    Apply for SRM
                  </button>
                  <button onClick={() => onApply('SRM Chennai')}
                    className="border-2 border-white/30 text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
                    Free Counselling
                  </button>
                </div>
              </div>

              {/* Right: sliding photos */}
              <SRMSlider />
            </div>
        </motion.div>
      </div>

      {/* Bangalore Colleges — always visible */}
      <div>
        <div className="flex items-center gap-2 mb-4 px-1">
          <span className="bg-blue-100 text-[#1e3a8a] text-[10px] font-black px-2 py-0.5 rounded-full">TOP 11</span>
          <h3 className="text-lg md:text-xl font-black text-[#102C57]">🏙️ Bangalore Colleges</h3>
        </div>
        <BangaloreAccordion onApply={onApply} onViewCollege={onViewCollege} />
      </div>
    </section>
  )
}
