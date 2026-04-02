import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

// Scroll progress bar
export function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-transparent">
      <div className="h-full bg-[#1E3A8A] transition-all duration-100" style={{ width: `${pct}%` }} />
    </div>
  )
}

// WhatsApp FAB
export function WhatsAppFAB() {
  const [tip, setTip] = useState(false)
  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
      {tip && (
        <div className="bg-white text-[#102C57] text-xs font-semibold px-3 py-2 rounded-xl shadow-lg whitespace-nowrap">
          Chat with Admission Expert
        </div>
      )}
      <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
        onMouseEnter={() => setTip(true)} onMouseLeave={() => setTip(false)}
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg animate-pulse2 hover:scale-110 transition-transform">
        <MessageCircle size={26} className="text-white fill-white" />
      </a>
    </div>
  )
}
