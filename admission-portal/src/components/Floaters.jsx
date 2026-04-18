import { useEffect, useState } from 'react'

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

// Real WhatsApp SVG icon
function WhatsAppIcon({ size = 28 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="white">
      <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.745 3.054 9.378L1.056 31.22l6.088-1.96a15.9 15.9 0 008.86 2.684C24.828 31.944 32 24.77 32 16.004 32 7.176 24.828 0 16.004 0zm9.35 22.614c-.396 1.116-1.97 2.042-3.234 2.312-.864.182-1.992.328-5.794-1.246-4.862-2.012-7.988-6.94-8.23-7.262-.232-.32-1.952-2.6-1.952-4.96s1.234-3.518 1.672-3.998c.438-.48.956-.6 1.276-.6.32 0 .636.002.914.016.294.014.688-.112 1.076.822.396.954 1.35 3.278 1.468 3.516.118.238.198.516.04.832-.158.316-.238.514-.476.792-.238.278-.5.62-.714.832-.238.238-.486.496-.208.972.278.476 1.234 2.034 2.65 3.296 1.82 1.622 3.354 2.124 3.83 2.362.476.238.754.198 1.032-.118.278-.318 1.192-1.39 1.51-1.868.316-.478.634-.396 1.07-.238.438.16 2.762 1.302 3.236 1.54.476.238.792.356.91.554.118.198.118 1.148-.278 2.264v-.006z" />
    </svg>
  )
}

// WhatsApp FAB
export function WhatsAppFAB() {
  const [tip, setTip] = useState(false)
  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5">
      {tip && (
        <div className="bg-white text-[#102C57] text-xs font-semibold px-3.5 py-2.5 rounded-xl shadow-xl whitespace-nowrap border border-gray-100">
          Chat on WhatsApp
        </div>
      )}
      <a href="https://wa.me/917296087953" target="_blank" rel="noreferrer"
        onMouseEnter={() => setTip(true)} onMouseLeave={() => setTip(false)}
        onClick={() => setTip(false)}
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all">
        <WhatsAppIcon size={28} />
      </a>
    </div>
  )
}
