import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Phone } from 'lucide-react'
import { saveLead } from '../utils/leads'

export default function LeadModal({ onClose, college }) {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', rank: '', branch: '' })

  const source = college ? `${college} Admission` : 'Lead Modal'
  const title = college ? `Apply for ${college}` : 'Get Free Guidance'
  const subtitle = college
    ? `Get expert guidance for ${college} admission`
    : 'Our expert will call you within 30 minutes'

  const submit = async e => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await saveLead({ ...form, source, college: college || '' })
      setSent(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/70 z-50 flex items-end md:items-center justify-center md:p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}>

        <motion.div
          className="bg-white w-full md:w-auto md:max-w-md md:rounded-2xl rounded-t-3xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto"
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}>

          {/* Drag handle — mobile only */}
          <div className="md:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          <div className="bg-[#102C57] px-5 md:px-6 py-4 md:py-5 flex justify-between items-center">
            <div>
              <h3 className="text-white font-black text-base md:text-lg">{title}</h3>
              <p className="text-white/60 text-xs md:text-sm mt-0.5">{subtitle}</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
              <X size={18} className="text-white/60 hover:text-white" />
            </button>
          </div>

          {sent ? (
            <div className="p-6 md:p-8 text-center">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={32} className="text-[#1E3A8A]" />
              </div>
              <h4 className="text-[#102C57] font-black text-lg md:text-xl">You're All Set!</h4>
              <p className="text-gray-500 text-sm md:text-base mt-2">
                {college
                  ? `Our counselor will call you about ${college} admission within 30 minutes.`
                  : 'Our counselor will call you within 30 minutes.'}
              </p>
              <button onClick={onClose} className="mt-5 bg-[#1E3A8A] text-white font-bold px-8 py-3 rounded-xl text-sm w-full md:w-auto">Done</button>
            </div>
          ) : (
            <form onSubmit={submit} className="p-5 md:p-6 space-y-3.5 md:space-y-4">
              {college && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                  <p className="text-blue-800 text-sm font-semibold">{college}</p>
                </div>
              )}
              {(() => {
                const isSRM = college && /srm/i.test(college)
                return [
                  { key: 'name', label: 'Full Name', placeholder: 'Enter your name', type: 'text' },
                  { key: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', type: 'tel' },
                  {
                    key: 'rank',
                    label: isSRM ? 'SRMJEE Rank' : 'KCET / COMEDK Rank',
                    placeholder: 'e.g. 5000',
                    type: 'text',
                  },
                ]
              })().map(f => (
                <div key={f.key}>
                  <label className="text-gray-700 text-[13px] md:text-sm font-semibold block mb-1.5">{f.label}</label>
                  <input required type={f.type} placeholder={f.placeholder} value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] md:text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
              ))}
              {!college && (
                <div>
                  <label className="text-gray-700 text-[13px] md:text-sm font-semibold block mb-1.5">Preferred Branch</label>
                  <select required value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] md:text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all bg-white">
                    <option value="">Select branch</option>
                    {['Computer Science', 'ECE', 'Mechanical', 'Civil', 'AI & ML', 'Data Science'].map(b => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>
              )}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <button type="submit" disabled={submitting} className="w-full bg-[#1E3A8A] hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors text-[15px] md:text-base flex items-center justify-center gap-2">
                <Phone size={16} /> {submitting ? 'Sending…' : (college ? `Apply for ${college}` : 'Request Free Callback')}
              </button>
              <p className="text-center text-[11px] md:text-xs text-gray-400 pb-1">
                🔒 Your data is protected per our{' '}
                <button type="button" onClick={() => { onClose(); window.__navTo?.('privacy') }} className="text-blue-600 underline">Privacy Policy</button>
              </p>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
