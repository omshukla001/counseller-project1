import { useState } from 'react'
import { Phone, CheckCircle } from 'lucide-react'
import { saveLead } from '../utils/leads'

export default function CounselorSidebar({ onApply }) {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', phone: '' })

  const submit = async e => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await saveLead({ ...form, rank: '', branch: '', source: 'Sidebar Callback' })
      setSent(true)
    } catch (err) {
      setError(err.message || 'Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="hidden lg:block sticky top-20 w-72 shrink-0">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-[#102C57] px-5 py-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-[#1E3A8A] rounded-full animate-pulse" />
            <span className="text-white/70 text-xs">Expert Available Now</span>
          </div>
          <h3 className="text-white font-bold text-base">Request a Callback</h3>
          <p className="text-white/50 text-xs mt-0.5">Free 30-min counselling</p>
        </div>

        {sent ? (
          <div className="p-6 text-center">
            <CheckCircle size={40} className="text-[#1E3A8A] mx-auto mb-2" />
            <p className="font-bold text-[#102C57]">We'll call you soon!</p>
            <p className="text-gray-400 text-xs mt-1">Within 30 minutes</p>
          </div>
        ) : (
          <form onSubmit={submit} className="p-5 space-y-3">
            <input required placeholder="Your Name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1E3A8A]" />
            <input required placeholder="Phone Number" type="tel" value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1E3A8A]" />
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full bg-[#1E3A8A] hover:bg-blue-800 disabled:opacity-60 text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
              <Phone size={14} /> {submitting ? 'Sending…' : 'Request Callback'}
            </button>
          </form>
        )}

        <div className="px-5 pb-5 space-y-2">
          {['KCET Guidance', 'COMEDK Support', 'Quota Application Help', 'Application Support'].map(s => (
            <div key={s} className="flex items-center gap-2 text-xs text-gray-500">
              <CheckCircle size={12} className="text-[#1E3A8A]" />
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
