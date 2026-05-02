import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MapPin, TrendingUp, Sparkles, ArrowRight, ChevronRight, CheckCircle, ShieldCheck, Clock, Phone } from 'lucide-react'
import { COLLEGES, SRM_COLLEGE } from '../data'
import { saveLead } from '../utils/leads'

const ALL = [SRM_COLLEGE, ...COLLEGES]
const BRANCHES = ['Computer Science', 'ECE', 'Mechanical', 'Civil', 'AI & ML', 'Data Science', 'Other']

function CollegesLeadForm() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', email: '', rank: '', branch: '', college: '', message: '' })
  const [consent, setConsent] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await saveLead({ ...form, source: 'Colleges Page Form' })
      setSent(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="relative mt-14 bg-gradient-to-br from-[#0A192F] via-[#102C57] to-[#0A192F] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '36px 36px' }} />

      <div className="relative grid lg:grid-cols-5 gap-8 p-6 md:p-10 lg:p-14">
        {/* LEFT — copy */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="lg:col-span-2 text-white">
          <div className="inline-flex items-center gap-1.5 bg-yellow-400/15 text-yellow-300 text-xs font-black px-3 py-1 rounded-full border border-yellow-400/30 mb-4">
            <Sparkles size={12} /> FREE COUNSELLING — NO COST TO STUDENTS
          </div>
          <h2 className="text-2xl md:text-4xl font-black leading-tight mb-3">
            Plan Your Application to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-cyan-300">a Top Engineering College</span>
          </h2>
          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
            Pick your preferred college, share a few details, and a senior counsellor will call within 30 minutes to discuss a shortlist based on your rank and preferences.
          </p>

          <div className="space-y-3">
            {[
              { icon: Clock, text: 'Callback within 30 minutes' },
              { icon: ShieldCheck, text: '6+ years admission experience' },
              { icon: CheckCircle, text: 'No spam — your details stay private' },
            ].map(t => (
              <div key={t.text} className="flex items-center gap-3 text-white/85 text-sm md:text-base">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                  <t.icon size={16} className="text-cyan-300" />
                </div>
                {t.text}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 mt-7 pt-5 border-t border-white/10">
            <a href="tel:+917296087953" className="flex items-center gap-2 text-white/85 hover:text-white text-sm font-semibold">
              <Phone size={16} className="text-cyan-300" /> +91 72960 87953
            </a>
            <span className="w-px h-4 bg-white/15" />
            <span className="text-white/60 text-xs">Or call us directly</span>
          </div>
        </motion.div>

        {/* RIGHT — form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3 bg-white rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">
          {sent ? (
            <div className="p-8 md:p-12 text-center">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5 ring-4 ring-green-100">
                <CheckCircle size={44} className="text-green-600" />
              </motion.div>
              <h3 className="text-[#102C57] font-black text-2xl md:text-3xl">You're All Set!</h3>
              <p className="text-gray-600 text-base mt-3 leading-relaxed max-w-md mx-auto">
                Thanks {form.name?.split(' ')[0] || 'there'}! Our counsellor will call you on{' '}
                <span className="font-semibold text-[#102C57]">{form.phone}</span> within 30 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="p-6 md:p-8">
              <h3 className="text-[#102C57] font-black text-xl md:text-2xl mb-1">Request a Counselling Callback</h3>
              <p className="text-gray-500 text-sm mb-5">Takes less than 30 seconds. We'll call you to discuss admission options — no cost to students.</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 text-sm font-semibold block mb-1.5">Full Name *</label>
                  <input required type="text" placeholder="Your name" value={form.name}
                    autoComplete="name"
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold block mb-1.5">Phone Number *</label>
                  <input required type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone}
                    inputMode="tel" autoComplete="tel"
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-gray-700 text-sm font-semibold block mb-1.5">Email (optional)</label>
                  <input type="email" placeholder="you@example.com" value={form.email}
                    autoComplete="email"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold block mb-1.5">Preferred College *</label>
                  <select required value={form.college}
                    onChange={e => setForm({ ...form, college: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all bg-white">
                    <option value="">Select college</option>
                    {ALL.map(c => <option key={c.slug} value={c.fullName || c.name}>{c.short}</option>)}
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold block mb-1.5">Preferred Branch *</label>
                  <select required value={form.branch}
                    onChange={e => setForm({ ...form, branch: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all bg-white">
                    <option value="">Select branch</option>
                    {BRANCHES.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-gray-700 text-sm font-semibold block mb-1.5">KCET / COMEDK / SRMJEE Rank *</label>
                  <input required type="text" inputMode="numeric"
                    placeholder="e.g. KCET 5000"
                    value={form.rank}
                    onChange={e => setForm({ ...form, rank: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-gray-700 text-sm font-semibold block mb-1.5">Message (optional)</label>
                  <textarea rows={3} placeholder="Tell us your preferences — location, budget, etc."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all resize-none" />
                </div>
              </div>

              {/* Consent */}
              <label className="mt-5 flex items-start gap-2.5 cursor-pointer select-none">
                <input type="checkbox" required checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#1E3A8A] shrink-0" />
                <span className="text-gray-600 text-[13px] leading-snug">
                  I agree to be contacted by Knowledge Park 360 about admission counselling, and I have read the{' '}
                  <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>.
                </span>
              </label>

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-red-700 text-sm text-center">
                  {error}
                </div>
              )}

              <button type="submit" disabled={submitting || !consent}
                className="mt-6 w-full bg-gradient-to-r from-[#1E3A8A] to-indigo-700 hover:from-blue-900 hover:to-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                {submitting ? 'Sending…' : <>Request Counselling Callback <ArrowRight size={18} /></>}
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                🔒 We don't sell your data. See our <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default function CollegesPage({ onApply }) {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[#1E3A8A] font-semibold text-sm md:text-base uppercase tracking-wider">All Colleges</span>
          <h1 className="text-3xl md:text-5xl font-black text-[#102C57] mt-2 leading-tight">
            Explore Top Engineering Colleges
          </h1>
          <p className="text-gray-600 text-sm md:text-base mt-3 max-w-2xl mx-auto">
            Browse SRMIST and the top engineering colleges in Bangalore. Click any college to view placements, courses, eligibility, and apply.
          </p>
        </div>

        {/* Grid of attractive square cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {ALL.map((c, i) => (
            <motion.button
              key={c.slug}
              onClick={() => navigate(`/college/${c.slug}`)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -6 }}
              className="group relative aspect-square rounded-3xl overflow-hidden text-left shadow-md hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 ring-1 ring-gray-200 hover:ring-[#1E3A8A]/30">

              {/* image */}
              <img src={c.img} alt={c.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />

              {/* overlays — base + hover deepen */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102C57]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* shimmer sweep on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

              {/* rank / featured badge */}
              {c.slug === 'srm' ? (
                <span className="absolute top-3 left-3 flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 text-[10px] md:text-xs font-black px-2.5 py-1 rounded-full shadow-lg shadow-yellow-500/40">
                  <Sparkles size={10} /> FEATURED
                </span>
              ) : (
                <span className="absolute top-3 left-3 bg-[#1E3A8A] text-white text-[10px] md:text-xs font-black px-2.5 py-1 rounded-full shadow-lg shadow-blue-900/40">
                  #{c.rank}
                </span>
              )}

              {/* package pill */}
              <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur text-[#102C57] text-[10px] md:text-xs font-black px-2.5 py-1 rounded-full shadow-lg">
                <TrendingUp size={10} className="text-green-600" /> {c.highestPkg}
              </span>

              {/* bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                <h3 className="font-black text-base md:text-lg leading-tight drop-shadow">{c.short}</h3>
                <p className="text-white/90 text-[11px] md:text-xs mt-0.5 line-clamp-2 drop-shadow">{c.name}</p>
                <div className="flex items-center gap-1 text-[10px] md:text-[11px] text-white/80 mt-1.5">
                  <MapPin size={10} className="shrink-0 text-cyan-300" />
                  <span className="truncate">{c.location}</span>
                </div>
                {/* "View Details" reveal on hover */}
                <div className="overflow-hidden mt-0 group-hover:mt-2.5 max-h-0 group-hover:max-h-10 transition-all duration-300">
                  <span className="inline-flex items-center gap-1 bg-white text-[#1E3A8A] font-black text-[10px] md:text-xs px-2.5 py-1 rounded-full shadow-md">
                    View Details <ChevronRight size={10} />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Lead form */}
        <CollegesLeadForm />
      </div>
    </main>
  )
}
