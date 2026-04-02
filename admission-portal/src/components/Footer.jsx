import { useState } from 'react'
import { Mail, Phone, MapPin, Share2 } from 'lucide-react'

const SocialIcons = [
  { label: 'FB', href: '#' },
  { label: 'IG', href: '#' },
  { label: 'YT', href: '#' },
  { label: 'X', href: '#' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subbed, setSubbed] = useState(false)

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
          <p className="text-white/50 text-sm leading-relaxed">
            Bangalore's most trusted engineering admission consultancy. 15+ years, 30,000+ students placed.
          </p>
          <div className="flex gap-3 mt-4">
            {SocialIcons.map(s => (
              <a key={s.label} href={s.href} className="w-8 h-8 bg-white/10 hover:bg-[#1E3A8A] rounded-full flex items-center justify-center transition-colors text-xs font-bold">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-[#1E3A8A] uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/60">
            {['Direct Admission Guidance', 'Management Quota Seats', 'KCET Counselling', 'COMEDK Guidance', 'Top 10 Colleges', 'College Predictor'].map(l => (
              <li key={l}><a href="#" className="hover:text-[#1E3A8A] transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-[#1E3A8A] uppercase tracking-wider">Contact Us</h4>
          <div className="space-y-3 text-sm text-white/60">
            <div className="flex gap-2"><MapPin size={14} className="text-[#1E3A8A] shrink-0 mt-0.5" /><span>42, 1st Floor, Residency Road, Bangalore – 560025</span></div>
            <div className="flex gap-2"><Phone size={14} className="text-[#1E3A8A]" /><span>+91 98765 43210</span></div>
            <div className="flex gap-2"><Mail size={14} className="text-[#1E3A8A]" /><span>info@admitbangalore.com</span></div>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-[#1E3A8A] uppercase tracking-wider">Newsletter</h4>
          <p className="text-white/50 text-sm mb-3">Get KCET cutoffs, college updates & admission alerts.</p>
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

      <div className="border-t border-white/10 py-4 text-center text-white/30 text-xs">
        © 2024 Knowledge Park. All rights reserved. | Not affiliated with any college.
      </div>
    </footer>
  )
}
