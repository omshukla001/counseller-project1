import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'
import { COLLEGES } from '../data'

const BRANCHES = ['Computer Science', 'Electronics & Communication', 'Mechanical', 'Civil', 'AI & ML', 'Data Science', 'Information Science', 'Electrical']

function PredictModal({ results, onClose }) {
  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}>
        <motion.div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[80vh] overflow-y-auto"
          initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-[#102C57] font-black text-xl">Your College Matches 🎯</h3>
            <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
          </div>
          <p className="text-gray-500 text-sm mb-4">Based on your rank, here are the colleges you're likely eligible for:</p>
          <div className="space-y-3">
            {results.map((c, i) => (
              <motion.div key={c.short} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}>
                <CheckCircle size={18} className="text-[#1E3A8A] shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-[#102C57] text-sm">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.location} · {c.highlight}</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded-full">#{c.rank}</span>
              </motion.div>
            ))}
          </div>
          <button onClick={onClose} className="mt-5 w-full bg-[#102C57] text-white font-bold py-3 rounded-xl hover:bg-[#1E3A8A] transition-colors">
            Get Free Expert Guidance
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Predictor() {
  const [form, setForm] = useState({ exam: '', rank: '', branch: '' })
  const [results, setResults] = useState(null)

  const predict = () => {
    const rank = parseInt(form.rank) || 99999
    // Simple mock logic: lower rank = more colleges
    const eligible = COLLEGES.filter((_, i) => {
      if (form.exam === 'KCET') return rank <= 5000 + i * 3000
      if (form.exam === 'COMEDK') return rank <= 10000 + i * 5000
      return true // JEE / management
    })
    setResults(eligible.length ? eligible : COLLEGES.slice(0, 3))
  }

  return (
    <section id="predictor" className="py-16 bg-[#102C57]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white">College Predictor</h2>
          <p className="text-white/60 mt-2">Find which Bangalore college you can get into — instantly</p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-white/70 text-xs font-medium mb-1.5 block">Select Exam</label>
              <select value={form.exam} onChange={e => setForm({ ...form, exam: e.target.value })}
                className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A]">
                <option value="" className="text-gray-800">Choose Exam</option>
                <option value="KCET" className="text-gray-800">KCET</option>
                <option value="COMEDK" className="text-gray-800">COMEDK</option>
                <option value="JEE" className="text-gray-800">JEE / Management</option>
              </select>
            </div>
            <div>
              <label className="text-white/70 text-xs font-medium mb-1.5 block">Enter Rank</label>
              <input type="number" placeholder="e.g. 5000" value={form.rank}
                onChange={e => setForm({ ...form, rank: e.target.value })}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A]" />
            </div>
            <div>
              <label className="text-white/70 text-xs font-medium mb-1.5 block">Preferred Branch</label>
              <select value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })}
                className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A]">
                <option value="" className="text-gray-800">Select Branch</option>
                {BRANCHES.map(b => <option key={b} value={b} className="text-gray-800">{b}</option>)}
              </select>
            </div>
          </div>
          <button onClick={predict}
            disabled={!form.exam || !form.rank}
            className="w-full sm:w-auto bg-[#1E3A8A] disabled:opacity-50 hover:bg-blue-800 text-white font-bold px-10 py-3 rounded-xl transition-all hover:scale-105">
            Predict Now →
          </button>
        </div>
      </div>

      {results && <PredictModal results={results} onClose={() => setResults(null)} />}
    </section>
  )
}
