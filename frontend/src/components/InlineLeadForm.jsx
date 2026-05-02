import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Phone, ShieldCheck, Clock, Sparkles, ArrowRight } from 'lucide-react'
import { saveLead } from '../utils/leads'

const BRANCHES = ['Computer Science', 'ECE', 'Mechanical', 'Civil', 'AI & ML', 'Data Science', 'Other']

export default function InlineLeadForm() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', email: '', rank: '', branch: '', message: '' })
  const [consent, setConsent] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await saveLead({ ...form, source: 'Inline Homepage Form', college: '' })
      setSent(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="apply" className="relative bg-gradient-to-br from-[#0A192F] via-[#102C57] to-[#0A192F] py-16 md:py-24 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 grid lg:grid-cols-5 gap-10 items-center">

        {/* LEFT — copy */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 text-white">
          <div className="inline-flex items-center gap-1.5 bg-yellow-400/15 text-yellow-300 text-xs font-black px-3 py-1 rounded-full border border-yellow-400/30 mb-4">
            <Sparkles size={12} /> FREE COUNSELLING — NO COST TO STUDENTS
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
            Ready to Plan Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-cyan-300">Engineering Application?</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
            Share your details and a senior counsellor will call you within 30 minutes to discuss college and branch options based on your rank.
          </p>

          <div className="space-y-3">
            {[
              { icon: Clock, text: 'Callback within 30 minutes' },
              { icon: ShieldCheck, text: 'Verified counsellors, 6+ years experience' },
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

          <div className="hidden lg:flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
            <a href="tel:+917296087953" className="flex items-center gap-2 text-white/85 hover:text-white text-sm font-semibold">
              <Phone size={16} className="text-cyan-300" /> +91 72960 87953
            </a>
            <span className="w-px h-4 bg-white/15" />
            <span className="text-white/60 text-xs">Or call us directly</span>
          </div>
        </motion.div>

        {/* RIGHT — form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-3 bg-white rounded-3xl shadow-2xl shadow-black/30 overflow-hidden">

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
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-6 text-left max-w-md mx-auto">
                <p className="text-blue-900 text-sm">
                  <strong>Tip:</strong> Save our number{' '}
                  <a href="tel:+917296087953" className="underline font-bold">+91 72960 87953</a>{' '}
                  so you don't miss the call.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="p-6 md:p-10">
              <h3 className="text-[#102C57] font-black text-xl md:text-2xl mb-1">Request a Counselling Callback</h3>
              <p className="text-gray-500 text-sm mb-6">Takes less than 30 seconds. We'll call you to discuss admission options — no cost to students.</p>

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
                  <label className="text-gray-700 text-sm font-semibold block mb-1.5">KCET / COMEDK / SRMJEE Rank *</label>
                  <input required type="text" inputMode="numeric"
                    placeholder="e.g. KCET 5000"
                    value={form.rank}
                    onChange={e => setForm({ ...form, rank: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all" />
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
                  <label className="text-gray-700 text-sm font-semibold block mb-1.5">Message (optional)</label>
                  <textarea rows={3} placeholder="Tell us what you're looking for — preferred college, location, etc."
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
                {submitting ? 'Sending…' : (
                  <>Request Counselling Callback <ArrowRight size={18} /></>
                )}
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
