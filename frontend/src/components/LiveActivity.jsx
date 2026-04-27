import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'

const FEED = [
  { name: 'Aditya R.', city: 'Mysore', college: 'RVCE · CSE', mins: 4 },
  { name: 'Sneha P.', city: 'Bengaluru', college: 'BMSCE · ECE', mins: 11 },
  { name: 'Rohan M.', city: 'Hyderabad', college: 'SRM Chennai · Data Science', mins: 18 },
  { name: 'Ananya D.', city: 'Mangaluru', college: 'PES University · AI & ML', mins: 27 },
  { name: 'Kavya S.', city: 'Mysuru', college: 'MSRIT · ISE', mins: 39 },
  { name: 'Vishal P.', city: 'Hubli', college: 'DSCE · CSE', mins: 52 },
  { name: 'Karthik N.', city: 'Bengaluru', college: 'Jain University · BBA', mins: 64 },
  { name: 'Meghna I.', city: 'Mysore', college: 'BMSIT · CSE', mins: 78 },
]

const FIRST_DELAY_MS = 18000
const INTERVAL_MS = 28000
const VISIBLE_MS = 6000

export default function LiveActivity() {
  const [item, setItem] = useState(null)
  const [idx, setIdx] = useState(0)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    if (muted) return
    let hideTimer
    let nextTimer
    const show = () => {
      setItem(FEED[idx % FEED.length])
      setIdx(i => i + 1)
      hideTimer = setTimeout(() => setItem(null), VISIBLE_MS)
      nextTimer = setTimeout(show, INTERVAL_MS)
    }
    const first = setTimeout(show, FIRST_DELAY_MS)
    return () => { clearTimeout(first); clearTimeout(hideTimer); clearTimeout(nextTimer) }
  }, [muted])

  const dismiss = () => {
    setItem(null)
    setMuted(true)
  }

  if (muted) return null

  return (
    <div className="fixed top-20 right-4 md:right-6 z-40 pointer-events-none">
      <AnimatePresence>
        {item && (
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="pointer-events-auto bg-white rounded-2xl shadow-2xl shadow-black/20 border border-gray-100 px-4 py-3 max-w-[300px] flex items-center gap-3">

            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 size={20} className="text-white" />
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Just admitted</p>
              <p className="text-sm font-bold text-[#102C57] leading-tight truncate">
                {item.name} · {item.city}
              </p>
              <p className="text-[12px] text-gray-600 leading-tight mt-0.5 truncate">
                🎓 {item.college} · {item.mins} min ago
              </p>
            </div>

            <button onClick={dismiss} aria-label="Dismiss"
              className="p-1 -mr-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
