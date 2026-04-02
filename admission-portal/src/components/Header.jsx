import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header({ onApply, onNav }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleNav = (item) => {
    setOpen(false)
    if (item === 'About') { onNav('about'); window.scrollTo(0, 0); return }
    onNav('home')
    setTimeout(() => {
      const el = document.getElementById(item.toLowerCase())
      el ? el.scrollIntoView({ behavior: 'smooth' }) : window.scrollTo(0, 0)
    }, 50)
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 bg-gray-900/95 backdrop-blur shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => handleNav('Home')} className="flex items-center gap-2.5">
          <div className="relative">
            <img src="/logo2.png" alt="Knowledge Park 360"
              className="h-10 w-10 md:h-11 md:w-11 object-contain rounded-xl bg-white p-0.5 shadow-md shadow-blue-700/20" />
            <span className="absolute -bottom-1 -right-1 bg-blue-700 text-white text-[7px] font-black px-1 rounded-full leading-tight">360</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-white font-black text-sm md:text-base tracking-tight">Knowledge Park 360</span>
            <span className="text-blue-500 font-semibold text-[9px] md:text-[10px] tracking-widest uppercase">Admission Experts</span>
          </div>
        </button>

        <nav className="hidden md:flex gap-6">
          {['Home', 'Colleges', 'About', 'Contact'].map(n => (
            <button key={n} onClick={() => handleNav(n)}
              className="text-white/80 hover:text-blue-500 text-sm font-medium transition-colors">
              {n}
            </button>
          ))}
        </nav>

        <button onClick={onApply} className="hidden md:block bg-[#1E3A8A] hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors">
          Apply Now
        </button>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur px-4 pb-4 flex flex-col gap-3">
          {['Home', 'Colleges', 'About', 'Contact'].map(n => (
            <button key={n} onClick={() => handleNav(n)} className="text-white/80 hover:text-blue-500 text-sm font-medium py-1 text-left">
              {n}
            </button>
          ))}
          <button onClick={() => { setOpen(false); onApply() }} className="bg-[#1E3A8A] text-white text-sm font-semibold px-5 py-2 rounded-full w-fit">
            Apply Now
          </button>
        </div>
      )}
    </header>
  )
}
