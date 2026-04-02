import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ChevronRight, TrendingUp, ChevronLeft, CheckCircle, Sparkles } from 'lucide-react'
import { COLLEGES, SRM_COLLEGE } from '../data'

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
                <h3 className="font-black text-[#102C57] text-sm">{c.short}</h3>
                <span className="bg-blue-50 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded-full">{c.highestPkg} pkg</span>
              </div>
              <p className="text-gray-500 text-xs truncate">{c.name}</p>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
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
                      <span className="text-xs font-semibold text-blue-900">{c.highlight}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[['Seats', c.seats], ['Highest Pkg', c.highestPkg]].map(([l, v]) => (
                        <div key={l} className="bg-gray-50 rounded-xl p-2.5 text-center border border-gray-100">
                          <div className="text-[#102C57] font-black text-xs">{v}</div>
                          <div className="text-gray-400 text-[9px] mt-0.5">{l}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {c.courses.slice(0, 5).map(course => (
                        <span key={course} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">{course}</span>
                      ))}
                      {c.courses.length > 5 && <span className="text-[10px] text-gray-400">+{c.courses.length - 5} more</span>}
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
                      <button onClick={onApply}
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
  const [tab, setTab] = useState('srm')

  return (
    <section id="colleges" className="py-10 md:py-20">
      {/* Header */}
      <div className="text-center mb-6 px-2">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-[#1E3A8A] font-semibold text-xs md:text-sm uppercase tracking-wider">Admissions 2026–27</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-xl md:text-4xl font-black text-[#102C57] mt-1 leading-tight">
          Find Your Dream College
        </motion.h2>
      </div>

      {/* Tab switcher */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-full p-1 flex gap-1">
          <button onClick={() => setTab('srm')}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${tab === 'srm' ? 'bg-gradient-to-r from-[#1e3a8a] to-indigo-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-800'}`}>
            ⭐ SRM Chennai
          </button>
          <button onClick={() => setTab('blr')}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${tab === 'blr' ? 'bg-gradient-to-r from-[#1e3a8a] to-indigo-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-800'}`}>
            🏙️ Bangalore Colleges
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'srm' && (
          <motion.div key="srm"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] rounded-3xl p-6 md:p-10 text-white relative overflow-hidden">
            {/* bg glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid md:grid-cols-2 gap-8 items-center relative">
              {/* Left */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-2.5 shadow-lg">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-white">{SRM_COLLEGE.short}</h3>
                    <p className="text-white/60 text-xs flex items-center gap-1"><MapPin size={10} />{SRM_COLLEGE.location}</p>
                  </div>
                </div>

                <p className="text-white/80 text-sm leading-relaxed">
                  India's top-ranked private engineering university. Get expert guidance for <strong className="text-yellow-300">SRMJEE Phase 1 & 2</strong> and <strong className="text-cyan-300">Management Quota</strong> admissions.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-2">
                  {SRM_COLLEGE.stats.map(([v, l]) => (
                    <div key={l} className="bg-white/10 backdrop-blur rounded-xl p-3 text-center border border-white/15">
                      <div className="text-white font-black text-sm">{v}</div>
                      <div className="text-white/55 text-[9px] mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>

                {/* Courses */}
                <div className="flex flex-wrap gap-2">
                  {SRM_COLLEGE.courses.map(c => (
                    <span key={c} className="flex items-center gap-1 text-[11px] text-white bg-white/10 border border-white/15 px-2.5 py-1 rounded-full">
                      <CheckCircle size={9} className="text-cyan-400" /> {c}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button onClick={onApply}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-black text-sm px-6 py-2.5 rounded-full hover:scale-105 transition-transform shadow-lg shadow-yellow-500/30">
                    Apply for SRM →
                  </button>
                  <button onClick={onApply}
                    className="border-2 border-white/30 text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
                    Free Counselling
                  </button>
                </div>
              </div>

              {/* Right: image */}
              <div className="relative rounded-2xl overflow-hidden h-64 shadow-2xl">
                <img src={SRM_COLLEGE.img} alt="SRM Campus" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-3">
                    <p className="text-white font-bold text-xs">Admission Open 2026–27</p>
                    <p className="text-white/60 text-[10px] mt-0.5">SRMJEE Phase 2 & Management Quota seats available</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {tab === 'blr' && (
          <motion.div key="blr"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <BangaloreAccordion onApply={onApply} onViewCollege={onViewCollege} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
