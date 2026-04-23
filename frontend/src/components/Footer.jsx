import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

const SocialIcons = [
  { label: 'FB', href: 'https://www.facebook.com/KnowledgeParkEducation' },
  { label: 'IG', href: 'https://www.instagram.com/KnowledgeParkEducation' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subbed, setSubbed] = useState(false)
  const navigate = useNavigate()

  const navTo = (path) => {
    navigate(path)
  }

  return (
    <footer id="contact" className="bg-[#0A192F] text-white">
      <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <img src="/logo2.png" alt="logo" className="h-10 w-10 object-contain rounded-xl bg-white p-0.5" />
            <div className="flex flex-col leading-tight">
              <span className="text-white font-black text-sm">Knowledge Park 360</span>
              <span className="text-[#1E3A8A] font-bold text-[9px] tracking-widest uppercase">360</span>
            </div>
          </div>
          <p className="text-white/70 text-sm md:text-base leading-relaxed">
            Trusted engineering admission consultancy. 6+ years, 13,000+ students placed.
          </p>
          <div className="flex gap-3 mt-4">
            {SocialIcons.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="w-8 h-8 bg-white/10 hover:bg-[#1E3A8A] rounded-full flex items-center justify-center transition-colors text-xs font-bold">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-[#1E3A8A] uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm md:text-base text-white/70">
            {['Direct Admission Guidance', 'Management Quota Seats', 'KCET Counselling', 'COMEDK Guidance', 'Top 10 Colleges', 'College Predictor'].map(l => (
              <li key={l}><a href="#" className="hover:text-[#1E3A8A] transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-[#1E3A8A] uppercase tracking-wider">Contact Us</h4>
          <div className="space-y-3 text-sm md:text-base text-white/70">
            <div className="flex gap-2"><MapPin size={14} className="text-[#1E3A8A] shrink-0 mt-0.5" /><span>17/B/5 & 17/B/5, Samruddhi, 3rd Floor, Opp. Rail Wheel Factory, Doddaballapura Road, Bangalore – 560064</span></div>
            <div className="flex gap-2"><MapPin size={14} className="text-[#1E3A8A] shrink-0 mt-0.5" /><span>House No. 43, Kumar Sinha, Bailey Road, Near Shiv Mandir, Kusumpuram Colony, Patna, Bihar – 801503</span></div>
            <div className="flex gap-2"><Phone size={14} className="text-[#1E3A8A] shrink-0 mt-0.5" /><div className="flex flex-col"><a href="tel:+917296087953" className="hover:text-white transition-colors">+91 72960 87953</a><a href="tel:+919108783191" className="hover:text-white transition-colors">+91 91087 83191</a><a href="tel:+918217033492" className="hover:text-white transition-colors">+91 82170 33492</a></div></div>
            <div className="flex gap-2"><Mail size={14} className="text-[#1E3A8A]" /><span>knowledgeparkedu360@gmail.com</span></div>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-[#1E3A8A] uppercase tracking-wider">Newsletter</h4>
          <p className="text-white/70 text-sm md:text-base mb-3">Get KCET cutoffs, college updates & admission alerts.</p>
          {subbed ? (
            <p className="text-[#1E3A8A] text-sm font-semibold">✓ Subscribed! Check your inbox.</p>
          ) : (
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#1E3A8A]" />
              <button onClick={() => email && setSubbed(true)}
                className="bg-[#1E3A8A] hover:bg-blue-800 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
                Go
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <p className="text-white/50 text-xs md:text-sm leading-relaxed">
            <strong className="text-white/70">Disclaimer:</strong> Knowledge Park 360 is an independent educational consultancy. We are <strong>not</strong> the official admission office of any college or university listed on this website. All institution names, logos, placement data, and rankings are used for informational purposes only and belong to their respective owners. We do not guarantee admission to any institution. Information provided is based on publicly available data and may change without notice. Please verify all details directly with the respective institutions.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-sm">
            © 2024 Knowledge Park 360. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <button onClick={() => navTo('/privacy')} className="text-white/50 hover:text-[#1E3A8A] transition-colors">
              Privacy Policy
            </button>
            <span className="text-white/20">|</span>
            <button onClick={() => navTo('/terms')} className="text-white/50 hover:text-[#1E3A8A] transition-colors">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
