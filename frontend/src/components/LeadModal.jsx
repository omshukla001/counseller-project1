import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Phone, ShieldCheck, Clock, Sparkles } from 'lucide-react'
import { saveLead } from '../utils/leads'

export default function LeadModal({ onClose, college, onSubmitted }) {
  const navigate = useNavigate()
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', rank: '', branch: '' })
  const [consent, setConsent] = useState(false)

  const source = college ? `${college} Counselling` : 'Lead Modal'
  const title = college ? `Get ${college} Counselling` : 'Book a Counselling Call'
  const subtitle = college
    ? `Free counselling for ${college} applicants — we'll call within 30 minutes`
    : 'A counsellor will call you within 30 minutes to discuss your options'

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const submit = async e => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await saveLead({ ...form, source, college: college || '' })
      setSent(true)
      onSubmitted?.()
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end md:items-center justify-center md:p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}>

        <motion.div
          className="bg-white w-full md:w-auto md:max-w-md md:rounded-2xl rounded-t-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] md:max-h-[92vh]"
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.4 }}
          onDragEnd={(_, info) => { if (info.offset.y > 140) onClose() }}
          onClick={e => e.stopPropagation()}>

          {/* Drag handle — mobile only */}
          <div className="md:hidden flex justify-center pt-2.5 pb-1.5 shrink-0">
            <div className="w-11 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          <div className="relative bg-gradient-to-br from-[#102C57] via-[#1e3a8a] to-[#102C57] px-5 md:px-6 pt-4 md:pt-5 pb-4 md:pb-5 shrink-0 overflow-hidden">
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative flex justify-between items-start gap-3">
              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center gap-1 bg-yellow-400/20 text-yellow-200 text-[10px] font-black px-2 py-0.5 rounded-full border border-yellow-400/30 mb-1.5">
                  <Sparkles size={10} /> NO COST TO STUDENTS
                </div>
                <h3 className="text-white font-black text-lg md:text-xl leading-tight">{title}</h3>
                <p className="text-white/70 text-[12px] md:text-sm mt-0.5 leading-snug">{subtitle}</p>
              </div>
              <button onClick={onClose}
                aria-label="Close"
                className="p-2 -mt-1 -mr-1 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors shrink-0">
                <X size={20} className="text-white/80" />
              </button>
            </div>

            {/* Trust row — mobile and desktop */}
            <div className="relative mt-3 flex gap-2">
              {[
                { icon: Clock, text: '30 min callback' },
                { icon: ShieldCheck, text: 'Verified counselors' },
              ].map(t => (
                <div key={t.text} className="flex items-center gap-1 bg-white/10 border border-white/15 rounded-full px-2.5 py-1 text-white/90 text-[10px] md:text-[11px] font-semibold">
                  <t.icon size={10} /> {t.text}
                </div>
              ))}
            </div>
          </div>

          {sent ? (
            <div className="p-6 md:p-8 text-center flex-1 overflow-y-auto">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-16 h-16 md:w-20 md:h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-green-100">
                <CheckCircle size={36} className="text-green-600" />
              </motion.div>
              <h4 className="text-[#102C57] font-black text-xl md:text-2xl">You're All Set!</h4>
              <p className="text-gray-600 text-sm md:text-base mt-2 leading-relaxed">
                {college
                  ? `Our counselor will call you about ${college} admission within 30 minutes.`
                  : 'Our counselor will call you within 30 minutes.'}
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mt-5 text-left">
                <p className="text-blue-900 text-xs md:text-sm">
                  <strong>Tip:</strong> Save our number <a href="tel:+917296087953" className="underline font-bold">+91 72960 87953</a> so you don't miss the call.
                </p>
              </div>
              <button onClick={onClose}
                className="mt-5 bg-[#1E3A8A] active:bg-blue-900 text-white font-bold px-8 py-3.5 rounded-xl text-sm w-full transition-colors">
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col flex-1 min-h-0">
              {/* Scrollable fields area */}
              <div className="p-5 md:p-6 space-y-3.5 md:space-y-4 overflow-y-auto flex-1">
                {college && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                    <p className="text-blue-800 text-sm font-semibold truncate">{college}</p>
                  </div>
                )}

                {/* Form purpose */}
                <p className="text-gray-500 text-[12px] md:text-[13px] leading-snug">
                  Share your details and a counsellor will call you within 30 minutes to discuss admission options. No fees charged to students.
                </p>


                {[
                  { key: 'name', label: 'Full Name', placeholder: 'Enter your name', type: 'text', inputMode: 'text', autoComplete: 'name' },
                  { key: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', type: 'tel', inputMode: 'tel', autoComplete: 'tel' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-gray-700 text-[13px] md:text-sm font-semibold block mb-1.5">{f.label}</label>
                    <input required type={f.type} placeholder={f.placeholder} value={form[f.key]}
                      inputMode={f.inputMode} autoComplete={f.autoComplete}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 md:py-3 text-[16px] md:text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
                ))}

                <div>
                  <label className="text-gray-700 text-[13px] md:text-sm font-semibold block mb-1.5">
                    {college && /srm/i.test(college) ? 'SRMJEE Rank' : 'KCET / COMEDK / SRMJEE Rank'}
                  </label>
                  <input required type="text"
                    inputMode="numeric"
                    placeholder={college && /srm/i.test(college) ? 'e.g. 12000' : 'e.g. KCET 5000 / COMEDK 3200'}
                    value={form.rank}
                    onChange={e => setForm({ ...form, rank: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 md:py-3 text-[16px] md:text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all" />
                  {!college && (
                    <p className="text-gray-400 text-[11px] md:text-xs mt-1.5">Mention the exam and rank you wrote.</p>
                  )}
                </div>

                {!college && (
                  <div>
                    <label className="text-gray-700 text-[13px] md:text-sm font-semibold block mb-1.5">Preferred Branch</label>
                    <select required value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 md:py-3 text-[16px] md:text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all bg-white">
                      <option value="">Select branch</option>
                      {['Computer Science', 'ECE', 'Mechanical', 'Civil', 'AI & ML', 'Data Science'].map(b => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Consent */}
                <label className="flex items-start gap-2 cursor-pointer select-none pt-1">
                  <input type="checkbox" required checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#1E3A8A] shrink-0" />
                  <span className="text-gray-600 text-[12px] md:text-[13px] leading-snug">
                    I agree to be contacted by Knowledge Park 360 about admission counselling, and I have read the{' '}
                    <button type="button" onClick={() => { onClose(); navigate('/privacy') }} className="text-blue-600 underline">Privacy Policy</button>.
                  </span>
                </label>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-red-700 text-[13px] text-center">
                    {error}
                  </div>
                )}
              </div>

              {/* Sticky submit bar */}
              <div className="shrink-0 border-t border-gray-100 bg-white/95 backdrop-blur px-5 md:px-6 pt-3 pb-[max(env(safe-area-inset-bottom),12px)] md:pb-5 space-y-2">
                <button type="submit" disabled={submitting || !consent}
                  className="w-full bg-gradient-to-r from-[#1E3A8A] to-indigo-700 active:from-blue-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all text-[15px] md:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                  <Phone size={16} /> {submitting ? 'Sending…' : 'Request Counselling Callback'}
                </button>
                <p className="text-center text-[11px] md:text-xs text-gray-400">
                  🔒 We don't sell your data. See our{' '}
                  <button type="button" onClick={() => { onClose(); navigate('/privacy') }} className="text-blue-600 underline">Privacy Policy</button>.
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
