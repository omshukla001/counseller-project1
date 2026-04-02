import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'

export default function LeadModal({ onClose }) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', rank: '', branch: '' })

  const submit = e => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}>
        <motion.div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          onClick={e => e.stopPropagation()}>

          <div className="bg-[#102C57] px-6 py-5 flex justify-between items-center">
            <div>
              <h3 className="text-white font-black text-lg">Get Free Guidance</h3>
              <p className="text-white/60 text-xs mt-0.5">Our expert will call you within 30 minutes</p>
            </div>
            <button onClick={onClose}><X size={20} className="text-white/60 hover:text-white" /></button>
          </div>

          {sent ? (
            <div className="p-8 text-center">
              <CheckCircle size={52} className="text-[#1E3A8A] mx-auto mb-3" />
              <h4 className="text-[#102C57] font-black text-xl">You're All Set!</h4>
              <p className="text-gray-500 text-sm mt-2">Our counselor will call you within 30 minutes.</p>
              <button onClick={onClose} className="mt-5 bg-[#1E3A8A] text-white font-bold px-8 py-2.5 rounded-xl">Done</button>
            </div>
          ) : (
            <form onSubmit={submit} className="p-6 space-y-4">
              {[
                { key: 'name', label: 'Full Name', placeholder: 'Your name', type: 'text' },
                { key: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel' },
                { key: 'rank', label: 'KCET / COMEDK Rank', placeholder: 'e.g. 5000', type: 'text' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-gray-700 text-sm font-medium block mb-1">{f.label}</label>
                  <input required type={f.type} placeholder={f.placeholder} value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E3A8A]" />
                </div>
              ))}
              <div>
                <label className="text-gray-700 text-sm font-medium block mb-1">Preferred Branch</label>
                <select required value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E3A8A]">
                  <option value="">Select branch</option>
                  {['Computer Science', 'ECE', 'Mechanical', 'Civil', 'AI & ML', 'Data Science'].map(b => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="w-full bg-[#1E3A8A] hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-colors">
                Request Free Callback →
              </button>
              <p className="text-center text-xs text-gray-400">🔒 Your data is 100% secure and private</p>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
