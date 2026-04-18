import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-200 shadow-2xl px-4 py-4 md:py-5"
        >
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <p className="text-gray-800 text-sm md:text-base font-semibold mb-1">We use cookies</p>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                We use cookies and similar technologies to improve your experience, analyse traffic, and show personalised ads via Google Ads.
                By clicking "Accept All", you consent to our use of cookies. Read our{' '}
                <button onClick={() => { accept(); window.__navTo?.('privacy') }} className="text-blue-700 underline font-medium">Privacy Policy</button> for more details.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={decline}
                className="border border-gray-300 text-gray-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                Decline
              </button>
              <button onClick={accept}
                className="bg-[#1E3A8A] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
